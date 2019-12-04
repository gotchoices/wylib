//Structured document component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Makes a document such as a manual or contract which is composed of nested
// sections, paragraphs, and so forth.
//TODO:
//X- Combine addChild with addSubs?
//X- What to do with illegally added sections in paragraph 0?
//X- Launch this component as action from mychips contract dbe
//- Call new Icons.url
//- 
//- Chief contains readonly: title, author, language, version, released, hash
//- All are displayed, printable in preview mode
//- Tag is fixed for chief as Author-Main_Title-Version-Language
//- 
//- Make a way to include other documents by reference
//- 
//- 
//- Call back to database with update command
//- Can edit contracts in database
//- Can mark a cross reference link from contenteditable view (insertHTML)
//- 
//- Later:
//- Paragraphs created automatically editLeave don't exit direct editing right away on dblclick
//- Implement headers/footers for printing
//- Implement undo stack for state
//- Scan for illegal codes when leaving textarea
//- Drag/drop doesn't always land where you expect; More testing.
//- Can indent/undent by dragging to the right
//- 
<template>
  <div class="wylib wylib-strdoc">
    <div ref="header" class="header">
      <wylib-menudock class="menudock" :config="dockConfig" :state="state.dock" :env="env" :lang="wm.sdcMenu"/>
      <div class="headerfill"/>
    </div>
    <div class="content" draggable='true' v-on:dblclick="togEdit" :style="comStyle"
          v-on:mouseover.stop="over=true" v-on:mouseout="over=false" 
          v-on:dragstart.stop="dragStart" v-on:dragend.stop="dragDrop" v-on:dragover.stop="zoneOver" v-on:dragleave.stop="zoneLeave">
      <div v-show="state.edit" class="edit" :title="lang('sdcEdit')">
        <span>
          <x-r :name="state.tag" :value="secNumber" @connect="targetChange" @change="targetChange"></x-r>.
          {{lang('sdcTitle','t','Title')}}:
        </span>
        <span draggable='false' :title="lang('sdcTitle')"><input class="input title" v-model="state.title" spellcheck="spellCheck" :placeholder="lang('sdcTitle','')" @input="change"></span>
        <span>{{lang('sdcTag','t','Tag')}}:</span>
        <span draggable='false' :title="lang('sdcTag')"><input class="input tag" v-model="state.tag" :placeholder="lang('sdcTag','t')" @input="change"></span>
        <span draggable='false'><button class="input" @click="addChild">+</button></span>
        <span v-if="level > 0" draggable='false'><button class="input" @click="$emit('delete',index)">X</button></span>
        <div>
          <textarea class="input" ref="textarea" :rows="6" v-model="state.text" draggable='false' spellcheck="spellCheck" :title="lang('sdcText')" :placeholder="lang('sdcText','t')" @input="change"/>
        </div>
      </div>
      <div v-if="!state.edit" class="preview">
        <div v-if="level <= 0 && state.title" class="title" v-html="state.title" :title="lang('sdcPreview')"/>
        <div v-if="titledText" class="text input" v-html="titledText" :style="parStyle" contenteditable="true" spellcheck="spellCheck" @focus="editEnter" @blur="editLeave" @connect="crossChange" :title="secHelp" @input="change"/>
      </div>
      <div class="subs" v-for="(sub, idx) in state.subs">
        <wylib-strdoc :key="idx" :index="idx+1" :prefix="nextPrefix" :level="level+1" :state="sub" :bus="useBus" @delete="deleteSub(idx)" @add="(arr,skip)=>{addSubs(idx,arr,skip)}"/>
      </div>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import Bus from './bus.js'
import Interact from 'interactjs'
import Icons from './icons.js'
//import Wyseman from './wyseman.js'
import FileSaver from 'file-saver'
import CrossRef from './crossref.js'
//import DiffPatch from 'jsondiffpatch'

const IconBin = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 0 32 32'>${Icons.code.bin}</svg>`
var iconBin = `url("${encodeURI(IconBin)}") 7 7, pointer`
  
const LegalTags = ['b','i','u','x-r']
var dragTarget = null			//Communicate with others about drag/drop
var dragee = null

customElements.define('x-r', CrossRef)
//DiffPatch.create({
//  objectHash: function(obj, index) {
//    return obj.title + obj.tag + obj.text || '$$index:' + index;
//  }
//})

export default {
  name: 'wylib-strdoc',
//  components: {'wylib-menudock': MenuDock},	//To avoid recursion problems
  props: {
    state:	{type: Object, default: () => ({})},
    indent:	{type: Number, default: 1},
    parSpace:	{type: Number, default: 0.4},
    level:	{type: Number, default: 0},
    prefix:	{type: String, default: null},
    index:	{type: Number, default: 0},
    env:	{default: ()=>({wm:{}, pr:{}})},
    bus:	{default: null},		//Commands from the toplevel strdoc
  },
  data() { return {
//    pr:		{},
//    wm:		{},
    dragOver:	false,			//Kept by the dragged-onto
    dragType:	'move',			//'move', 'copy', 'none', 'trash', kept by the dragged
    over:	false,
    dirty:	false,
    contEdit:	false,
    undoStack:	[],
    crossVals:	{},
    spellCheck:	true,
    subBus:	this.bus,
    stateTpt:	{title: null, tag:null, edit:false, text:null, subs:[]}
  }},
  inject: ['top'],
  computed: {
    id: function() {return 'sdc_' + this._uid + '_'},
    iAmChief: function() {return (this.level <= 0)},
    wm: function() {return this.env.wm},
    pr: function() {return this.env.pr},
    useBus: function() {return this.iAmChief ? this.subBus : this.bus},
    headerHeight: function() {return this.pr.winFullHeader - 1},	//Fit in parent header, plus top border
    nextPrefix: function() {						//Prefix to send to my children
      return (this.iAmChief) ? '' : (this.prefix || '') + (this.index || '') + '.'
    },
    secNumber: function() {
      return (this.prefix || '') + (this.index == null ? '' : this.index)
    },
    numTitle: function() {						//Full, numbered title
      return this.secNumber + '.' + (this.state.title ? '<b>' + this.state.title + '</b>' : '')
    },
    titledText: function() {
      return this.iAmChief ? this.state.text : (this.numTitle + (this.state.title ? ': ' : '') + (this.state.text || ''))
    },
    secHelp: function() {
      return (this.wm.sdcSection?this.wm.sdcSection.title:"Section") + ': ' + this.state.title + '(' + this.state.tag + '); ' + (this.wm.sdcSection?this.wm.sdcSection.help:'')
    },
    dragCursor: function() {
      let cur = 'move'
      if (this.dragType == 'none') cur = 'no-drop'
      else if (this.dragType == 'trash') cur = iconBin
      else if (this.dragType == 'copy') cur = 'copy'
      return cur
    },
    comStyle: function() { return {
      background: this.dragOver ? this.pr.dragOverBackground : (this.over ? this.pr.highlightBackground : this.pr.dataBackground),
      padding: '' + this.parSpace + 'em 0px 0px ' + this.indent + 'em',
      border: this.state.edit ? '2px solid ' + this.pr.highlightBackground : 'none',
      cursor: this.dragCursor,
    }},
    parStyle: function() { return {
      textIndent: this.contEdit ? '0px' : (this.iAmChief ? '1em' : '-1em'),
    }},
    dockConfig: function() { return [
      {idx: 'und', lang: this.wm.sdcUndo,   call: this.undo,    icon: 'undo',   shortcut: true, disabled: !this.undoStack.length},
      {idx: 'upd', lang: this.wm.sdcUpdate, call: this.update,  icon: 'floppy', shortcut: true, disabled: !this.dirty},
      {idx: 'clr', lang: this.wm.sdcClear,  call: this.clear,   icon: 'sun',    shortcut: true},
      {idx: 'imp', lang: this.wm.sdcImport, call: this.import,  icon: 'boxin',  disabled: !this.dirty},
      {idx: 'exp', lang: this.wm.sdcExport, call: this.export,  icon: 'boxout', shortcut: true},
      {idx: 'spl', lang: this.wm.sdcSpell,  call: this.spellTog,icon: 'spell',  type: 'checkbox', toggled: this.spellCheck, input: this.spellCheckValue},
      {idx: 'eda', lang: this.wm.sdcEditAll,icon: 'pencil',     shortcut: true, call: ev=>this.subBus.notify('edit')},
      {idx: 'pra', lang: this.wm.sdcPrevAll,icon: 'document',   shortcut: true, call: ev=>this.subBus.notify('preview')},
      {idx: 'bld', lang: this.wm.sdcBold,   icon: 'bold',       shortcut: true, call: ev=>this.markUp(ev, 'bold')},
      {idx: 'ita', lang: this.wm.sdcItalic, icon: 'italic',     shortcut: true, call: ev=>this.markUp(ev, 'italic')},
      {idx: 'uln', lang: this.wm.sdcUnder,  icon: 'underline',  shortcut: true, call: ev=>this.markUp(ev, 'underline')},
      {idx: 'sec', lang: this.wm.sdcCross,  icon: 'pilcrow',    shortcut: true, call: ev=>this.markUp(ev, 'crossref', 'x-r')},
    ]},
  },
  methods: {
    lang(key, type='help', defVal) {
      return this.wm[key] ? this.wm[key][Com.unabbrev(type, ['title', 'help'])] : defVal
    },
    change(ev) {
      if (this.bus) this.bus.master.$emit('dirty')
      else this.dirty = true
    },

    processXrefs(ev) {
      let name = ev.target.name, value = ev.target.value
//console.log('Proc xref!', this.secNumber, 'n:', name, 'v:', value)
      this.crossVals[name] = value		//Cache cross reference values
      this.$el.querySelectorAll('x-r:not([name])').forEach(el=>{
//console.log('   xref', el.value, el.innerHTML, value)
        if (el.innerHTML == name) el.value = value
      })
    },
    targetChange(ev) {				//Cross reference has changed
//console.log(`Target ${ev.type}:`, this.secNumber, ev.detail, 'n:', ev.target.name, 'v:', ev.target.value)
      if (this.bus)
        this.bus.master.$emit('xref', ev)	//Send up to the chief
      else if (this.iAmChief)
        this.processXrefs(ev)
    },
    crossChange(ev) {				//Cross reference has been reconstructed
      let master = this.iAmChief ? this : this.bus.master
        , link = ev.target.innerHTML
        , value = master.crossVals[link]
//console.log(`Cross ${ev.type}:`, this.secNumber, ev.detail, 'n:', ev.target.name, 'v:', ev.target.value, 'l:', link, 'v:', value)
      ev.target.value = value
    },

    spellTog(ev) {				//Toggle auto loading mode
      this.spellCheck = !this.spellCheck
    },

    spellCheckValue(v) {			//Set/get spell check value
      if (v != null) this.spellCheck = v
      return this.spellCheck
    },

    markUp(ev, mode, tag = mode[0]) {		//Insert a markup tag around the preview selection(s)
      let sel = window.getSelection()
      if (!sel || !sel.anchorNode) return
console.log("Mark up as:", mode, tag, sel.rangeCount, sel, sel.anchorNode)
      if (sel.anchorNode.nodeName == '#text') {
        if (mode == 'crossref')
          document.execCommand('insertHTML', '<x-r>zzyzx</x-r>')
        else
          document.execCommand(tag)
      }
      if (this.iAmChief) this.subBus.notify('markup', tag)		//If any children have textareas open
    },
    markTextArea(tag) {				//Insert markup tag in the direct editing textarea
      let taElem = this.$refs.textarea
        , start = taElem.selectionStart
        , end = taElem.selectionEnd
        , text = taElem.value
//console.log("  selection:", start, end)
      if (text && end > start) {
        let s1 = text.substring(0, start)
          , s2 = text.substring(start, end)
          , s3 = text.substring(end)
        this.state.text = s1 + '<' + tag + '>' + s2 + '</' + tag + '>' + s3
      }
    },
    editEnter(ev) {
//console.log("Entered direct edit")
      this.contEdit = true
      ev.target.innerHTML = this.state.text
    },
//    checkDoc(doc) {
//      let changed = false
//      Object.keys(doc).forEach(key=>{		//Check data for illegal HTML
//        let tag = doc[key]
//      })
//      return changed
//    },
    editLeave(ev) {
      let doc = ev.target
        , changes = false
        , newSections = []
//console.log("Left direct edit", doc, doc.childNodes)
      for (let idx = doc.childNodes.length - 1; idx >= 0; idx--) {
        let node = doc.childNodes[idx], name = node.nodeName.toLowerCase()
//console.log("  node:", idx, node, name)
        if (node.nodeName != '#text' && name && !LegalTags.includes(name)) {
//console.log("    remove:", idx, name, node.childNodes)
          if (name == 'div') {
            newSections.unshift(node.innerHTML)
          }
          doc.removeChild(node)
          changes = true
        }
      }
//      if (newSections.length > 0) this.$emit('add', newSections, 1)	//Add as peers after me
      if (newSections.length > 0) this.addSubs(0, newSections)		//Add as my immediate children)
//console.log(" after parse", changes, 'toAdd:', newSections)
      this.contEdit = false
      this.state.text = doc.innerHTML		//Get possibly amended text
      doc.innerHTML = this.titledText		//Reload the title, if necessary
//      this.$nextTick(()=>{ev.target.innerHTML = this.titledText})
    },
    update() {
      this.$parent.$emit('submit', 'editor', {request:'update', data:this.state})
    },

    clear() {				//Empty workspace
      this.top().confirm('!sdcClearAsk', (ans) => {
        if (ans == 'diaYes') {
          let tmpState = Com.clone(this.stateTpt)
          this.state = Object.assign(this.state, tmpState)
          this.state.edit = true
          this.dirty = false
        }
      })
    },

    export() {
      let resp = {file:'document.json'}
        , dews = [
            {field:'file', lang:'!sdcExportAsk', styles:{style:'ent', focus:true}},
            {field:'pretty', lang:'!sdcExportFmt', styles:{style:'chk'}}]
      this.top().query('!sdcExportAsk', dews, resp, (ans) => {
        if (ans == 'diaYes' && resp.file) {
//console.log("Export file:", resp.file)
          let blob = new Blob([JSON.stringify(this.state,null,resp.pretty?2:null)], {type: "text/plain;charset=utf-8"})
          FileSaver.saveAs(blob, resp.file)
        }
      })
    },

    import() {
      let resp = {}, dews = [{field:'files', lang:this.wm.sdcImportAsk, styles:{style:'file', focus:true}}]
      this.top().query('!sdcImportAsk', dews, resp, (ans) => {
console.log("Import file:", ans, resp)
        if (ans == 'diaYes' && resp.files && resp.files.length >= 1) {
          let reader = new FileReader(), file = resp.files[0]
          reader.onload = () => {
            let data = JSON.parse(reader.result)
//console.log("Import data:", data)
            Com.stateCheck(this, data, true)
            Object.assign(this.state, data)
            this.$nextTick(()=>this.subBus.notify('check'))
          }
          reader.readAsText(file)
        }
      })
    },

    deleteSub(idx) {					//Remove a sub-paragraph
console.log('Got delete:', this.secNumber, 'level:', this.level, 'index:', idx)
      if (idx != null && idx >= 0) this.state.subs.splice(idx,1)
    },
    addSubs(idx, addArr, skip=0) {			//Add sub-paragraphs
console.log("Got add:", this.secNumber, 'idx:', idx, addArr, 'skip:', skip)
      idx += skip
      addArr.forEach(el=>{
        if (typeof el == 'string') el = {text:el}	//Make state object if given a string
        this.state.subs.splice(idx++, 0, el)
      })
    },
    addChild(ev) {					//Add empty sub-paragraph at end
//console.log("Add child:")
      this.state.subs.push({title:null, text:null, subs:[]})
    },

    undo() {
      this.top().notice('Not yet implemented')
    },

    dragStart(ev) {					//Event for the one being dragged
//console.log("dragStart:", this.secNumber)
      dragee = this
    },

    zoneOver(ev) {					//Events for the one being dragged over
      if (!dragee) dragee = this
      this.dragOver = true				//Illuminate me (the drag target)
      dragTarget = this					//And remember who I am
      if (this == dragee && !ev.shiftKey)
        dragee.dragType = 'none'
      else if (ev.shiftKey)
        dragee.dragType = (this.iAmChief ? 'none' : 'copy')
      else if (this.iAmChief)
        dragee.dragType = 'trash'
      else
        dragee.dragType = 'move'
//console.log("zoneOver:", this.secNumber, dragee.secNumber, dragee.dragType, this.dragCursor)
//      this.$forceUpdate()
    },

    zoneLeave(ev) {
      if (ev.clientX == 0 && ev.clientY == 0) return	//Extra leave event fired at end of drag
//console.log("zoneLeave:", this.secNumber, ev.clientX, ev.clientY, ev.shiftKey)
      this.dragOver = false
      this.dragType = 'move'
      dragTarget = null
    },

    dragDrop(ev) {					//Fired for the one being dragged
      dragee = null
      if (!dragTarget) return				//Aborted drag, not over a peer
      let dragType = dragTarget.dragType
      dragTarget.dragType = 'move'
      dragTarget.dragOver = false			//Clear target highlighting
//console.log("Zone drop:", this.secNumber, dragTarget.secNumber, dragType)
      if (dragTarget == this && dragType != 'copy')
        return						//Aborted drag, over myself
      let stateCopy = Com.clone(this.state)
      if (dragType == 'trash' || dragType == 'move')
        this.$emit('delete')				//Delete me
      if (dragType == 'copy' || dragType == 'move')
        dragTarget.$emit('add', [stateCopy])
    },

    togEdit(ev) {
//console.log("Toggle edit:", this.secNumber, this.state.edit, ev.target, ev.currentTarget)
      if (!ev.target.classList.contains('input')) {
        this.state.edit = !this.state.edit
        ev.stopPropagation()
      }
    },
  },

  watch: {
    dirty: function(data) {
      if (this.iAmChief)
        this.$parent.$emit('submit', 'report', {request:'dirty', data})	//Let my container know my clear/dirty status
    },
  },

  beforeCreate: function() {
    this.$options.components['wylib-menudock'] = require('./menudock.vue').default	//Seems to work better here to avoid recursion problems
  },
//  created: function() {
//    this.top().registerEnv(this.id, (env) => {		//Ask my toplevel for prefs, language data
//console.log("Strdoc got environment:", this.id, env)
////      this.set(this, 'pr', env.pr)
////      this.set(this, 'wm', env.wm)
//      Object.assign(this.pr, env.pr)
//      Object.assign(this.wm, env.wm)
//    })
//  },
  beforeMount: function() {
    Com.stateCheck(this)

    if (this.iAmChief) {
      this.subBus = new Bus.messageBus(this)		//Parent
      this.$on('xref', (ev)=>{this.processXrefs(ev)})	//Xref events from subs
      this.$on('dirty', ()=>{this.dirty = true})
    }
    if (this.subBus) this.subBus.register(this.id, (msg, data) => {	//Children (and parent) listen
//console.log("Got bus message:", this.secNumber, msg, data, this.state)
      if (msg == 'edit') this.state.edit = true
      else if (msg == 'preview') this.state.edit = false
      else if (msg == 'markup' && this.state.edit) this.markTextArea(data)
      else if (msg == 'check') Com.stateCheck(this, this.state, true)
    })
  },
  mounted: function() {
    if (this.iAmChief) {
      this.top().context.$emit('swallow', this.$refs.header)
    }
  },
}
</script>

<style lang='less'>
  .wylib-strdoc .header {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.20;
//    transition: opacity 800ms ease-in;	//Things go blurry during transition
  }
  .wylib-strdoc .header:hover {
    opacity: 0.94;
//    transition: opacity 50ms ease-in;
  }
  .wylib-strdoc .header .menudock {		//Override menudock default outline
    border: 0;
  }

  @media print {
    .wylib-strdoc .header {
      display: none;
    }
  }
  .wylib-strdoc .preview .title {
    font-size: 120%;
    text-align: center;
    width: 100%;
    padding-bottom: 0.5em;
  }
  .wylib-strdoc .edit .title {
    width: 30%;
  }
  .wylib-strdoc div .text.input {
    margin: 0px 1em 4px 0px;		//To see blue outline fully when editing
//    border: 1px solid purple;
  }
  .wylib-strdoc .content {
    cursor: move;
  }
  .wylib-strdoc .content .input {
    cursor: text;
  }
  .wylib-strdoc textarea {
    width: 100%;
  }
</style>
