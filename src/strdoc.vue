//Structured document component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Makes a document such as a manual or contract which is composed of nested
// sections, paragraphs, and so forth.
//TODO:
//X- Can launch with no editing at all (preview only)
//X- Is sourceURL too MyCHIPs-centric?  Or will it work for other document inclusions
//X- Merge tag into name
//X- Can update resource strings to DB
//- Should call dbe/dbp to do export for us (to know proper record type tag)
//- Make good default name on file export
//- Generate/check digest on file export
//- Strip null/empty fields on file export
//- Double-click on section div sometimes waits for mouse motion to transition
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
  <div class="wylib wylib-strdoc" ref="root">
    <div v-if="iAmChief && editable" ref="header" class="header">
      <wylib-menudock class="menudock" :config="dockConfig" :state="state.dock" :env="env" :lang="wm.sdcMenu"/>
      <div class="headerfill"/>
    </div>
    <div class="content" ref="content" :draggable="!iAmChief" @dblclick="togEdit" :style="comStyle"
          @mouseover.stop="over=true" @mouseout="over=false" 
          @dragstart.stop="dragStart" @dragend.stop="dragDrop" @dragover.stop="zoneOver" @dragleave.stop="zoneLeave">
      <div v-show="state.edit" class="edit" :title="wm.h.sdcEdit" draggable="true" @dragstart.prevent.stop @dragend.prevent.stop @dragover.prevent.stop @dragleave.prevent.stop>
        <div class="editline">
          <div class="secnum">
            <x-r :name="state.name" :value="secNumber" @connect="targetChange" @change="targetChange"></x-r>.
            &nbsp;
          </div>
          <span v-if="state.source == null">
            {{wm.t.sdcTitle || 'Title'}}:
            <input class="input title" v-model="state.title" spellcheck="spellCheck" :placeholder="wm.t.sdcTitle" @input="change" :title="wm.h.sdcTitle">
          </span>
          <div>{{ wm.t.sdcName || 'Name' }}:</div>
          <input class="input name" v-model="state.name" :placeholder="wm.t.sdcName" @input="change" :title="wm.h.sdcName">
          <wylib-button icon='document' @activate="togEdit" :env="env" :title="butHelp('sdcPreview')"/>
          <wylib-button icon='plus' @activate="addChild" :env="env" :title="butHelp('sdcAdd')"/>
          <wylib-button v-if="level > 0" icon='target' @activate="togSource" :env="env" :title="butHelp('sdcTogSource')"/>
          <wylib-button v-if="level > 0" icon='zap' @activate="$emit('delete',index)" :env="env" :title="butHelp('sdcDelete')" :color="pr.butCloseColor" :hoverColor="pr.butCloseHoverColor"/>
        </div>
        <textarea v-if="state.source == null" class="input" ref="textarea" :rows="6" v-model="state.text" spellcheck="spellCheck" :title="wm.h.sdcText" :placeholder="wm.t.sdcText" @input="change"/>
        <div v-else class="sourceline">
          <span>{{wm.t.sdcSource || 'Source'}}:</span>
          <input class="input source" v-model="state.source" :placeholder="wm.t.sdcSource" @input="change" :title="wm.h.sdcSource">
        </div>
      </div>
      <div v-if="!state.edit" class="preview">
        <div v-if="level <= 0 && state.title" class="title" v-html="state.title" :title="wm.h.sdcPreview"/>
        <div v-if="level > 0 && state.source" class="text" :style="parStyle">
          {{secNumber}}. <b v-html="state.name || wm.t.sdcResource"></b>: {{ wm.h.sdcResource }}:
          <a :href="formatURI" target="_blank">{{ state.source }}.</a>
        </div>
        <div v-else="titledText" class="text input" ref="text" v-html="titledText" :style="parStyle" :contenteditable="editable" spellcheck="spellCheck" @focus="editEnter" @blur="editLeave" @connect="crossChange" :title="secHelp" @input="change"/>
      </div>
      <div class="sections" v-for="(sec, idx) in state.sections">
        <wylib-strdoc :key="idx" :index="idx+1" :master="master" :prefix="nextPrefix" :level="level+1" :state="subState(sec)" :env="env" :bus="useBus" @delete="(x)=>{deleteSub(x||idx)}" @add="(a,s)=>{addSubs(idx,a,s)}"/>
      </div>
    </div>
  </div>
</template>

<script>
const Bus = require('./bus.js')
const Com = require('./common.js')
const Icons = require('./icons.js')
const CrossRef = require('./crossref.js')
const Interact = require('interactjs')
//const DiffPatch = require('jsondiffpatch')
const FileSaver = require('file-saver')
import Button from './button.vue'
//import MenuDock from './menudock.vue'

const IndentOff = 50
const PtrString = ' 7 7, pointer'
const TrashPtr = Icons.url('bin')       + PtrString
const Pointers = {
  movebef: 	Icons.url('redo')       + PtrString,
  moveaft:  	Icons.url('forward')    + PtrString,
  moveapp:  	Icons.url('arrowdr')    + PtrString,
  copybef:  	Icons.url('replus')     + PtrString,
  copyaft:  	Icons.url('forplus')    + PtrString,
  copyapp:  	Icons.url('adrplus')    + PtrString,
}
  
const LegalTags = ['b','i','u','x-r']
var dragTarget = null			//Communicate with others about drag/drop
var dragee = null

customElements.define('x-r', CrossRef)
//DiffPatch.create({
//  objectHash: function(obj, index) {
//    return obj.title + obj.name + obj.text || '$$index:' + index;
//  }
//})

export default {
  name: 'wylib-strdoc',
  components: {'wylib-button': Button},
  props: {
    state:	{type: Object,	default: () => ({})},
    indent:	{type: Number,	default: 1},
    parSpace:	{type: Number,	default: 0.4},
    level:	{type: Number,	default: 0},
    prefix:	{type: String,	default: null},
    index:	{type: Number,	default: 0},
    editable:	{type: Boolean,	default: true},
    master:	{default: this},
    env:	{type: Object,	default: Com.envTpt},
    bus:	{default: null},		//Commands from the toplevel strdoc
  },
  data() { return {
    dragOver:		false,			//Kept by the dragged-onto
    dragType:		null,			//null, 'move', 'copy', 'trash', kept by the dragged
    inPoint:		null,			//'bef', 'aft', 'app', kept by the dragged
    dragOrigin:		null,			//X,Y where we started dragging
    over:		false,
    dirty:		false,
    contEdit:		false,
    undoStack:		[],
    crossVals:		{},
    spellCheck:		true,
    subBus:		this.bus,
    stateTpt:		{title: null, text:null, name:null, sections:[], source:null, edit:false, resource:null, dock:{}},
  }},
  inject: ['top'],
  computed: {
    id() {return 'sdc_' + this.$.uid},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    iAmChief() {return (this.level <= 0)},
    useBus() {return this.iAmChief ? this.subBus : this.bus},
    headerHeight() {return this.pr.winFullHeader - 1},	//Fit in parent header, plus top border
    nextPrefix() {						//Prefix to send to my children
      return (this.iAmChief) ? '' : (this.prefix || '') + (this.index || '') + '.'
    },
    secNumber() {
      return (this.prefix || '') + (this.index == null ? '' : this.index)
    },
    numTitle() {						//Full, numbered title
      return this.secNumber + '.' + (this.state.title ? '<b>' + this.state.title + '</b>' : '')
    },
    titledText() {
      return this.iAmChief ? this.state.text : 
      		(this.numTitle + (this.state.title ? ':' : '') + (' ' + this.state.text || ''))
    },
    secHelp() {
      return (this.wm.t.sdcSection||"Section") + ': ' + this.state.title||'' + '(' + this.state.name||'' + '); ' + (this.wm.h.sdcSection||'')
    },
    formatURI() {
      let path = this.state.resource || ''
        , cont = Com.buf2b64url(this.state.source)	//source may itself be a uri, so encode it
      return path + '/' + cont
    },
    iconStyle() {return {
      fill:	this.pr.butIconfill,
      stroke:	this.pr.butIconStroke,
      height:	'1em',
      width:	'1em',
    }},
    dragCursor() {
      let cur = 'move'
        , typeP = this.dragType + this.inPoint
//console.log("dragCursor:", this.dragType, typeP)
      if (this.dragType == 'trash')
        cur = TrashPtr
      else if (typeP && typeP in Pointers)
        cur = Pointers[typeP]
      return cur
    },
    comStyle() { return {
      background: this.dragOver ? this.pr.dragOverBackground : (this.over ? this.pr.highlightBackground : this.pr.dataBackground),
      padding: '' + this.parSpace + 'em 0px 0px ' + this.indent + 'em',
      border: this.state.edit ? '2px solid ' + this.pr.highlightBackground : 'none',
      cursor: this.dragCursor,
    }},
    parStyle() { return {
      textIndent: this.contEdit ? '0px' : (this.iAmChief ? '1em' : '-1em'),
    }},
    dockConfig() { return [
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
    change(ev) {
//console.log('Strdoc change', this.index, this.iAmChief, ev)
      if (this.iAmChief) this.dirty = true		//Chief marks itself
      else this.bus.mom('dirty')			//Children have chief keep track
    },
    iconSvg(icon) {return Icons(icon)},
    butHelp(tag) {
      return (this.wm.t[tag] + ' (' + this.wm.h[tag] + ')')
    },
    subState(sub) {				//Pass resource location down to subs
      sub.resource = this.state.resource
      return sub
    },
    processXrefs(ev) {
      let name = ev.target.name
        , value = ev.target.value
//console.log('Proc xref!', this.secNumber, 'n:', name, 'v:', value)
      this.crossVals[name] = value		//Cache cross reference values
      this.$refs?.root?.querySelectorAll('x-r:not([name])').forEach(el=>{
//console.log('   xref', el.value, el.innerHTML, value)
        if (el.innerHTML == name) el.value = value
      })
    },
    targetChange(ev) {				//Cross reference has changed
//console.log(`Target ${ev.type}:`, this.secNumber, ev.detail, 'n:', ev.target.name, 'v:', ev.target.value)
      if (this.iAmChief)
        this.processXrefs(ev)
      else
        this.bus.mom('xref', ev)		//Send up to the chief
    },
    crossChange(ev) {				//Cross reference has been reconstructed
      let link = ev.target.innerHTML
        , value = this.master.crossVals[link]
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
//console.log("Entered direct edit", this.state.text)
      this.contEdit = true
      ev.target.innerHTML = this.state.text
    },

    editLeave(ev) {				//If the user created paragraphs in a single section
      let doc = ev.target			//break them up into multiple sections
        , changes = false
        , newSections = []
        , lastNode = null
//console.log("Left direct edit", doc, doc.childNodes)
      for (let idx = doc.childNodes.length - 1; idx >= 0; idx--) {	//Did the edit produce multiple nodes
        let node = doc.childNodes[idx], name = node.nodeName.toLowerCase()
//console.log("  node:", idx, node, name)
        if (node.nodeName != '#text' && name && !LegalTags.includes(name)) {
//console.log("    remove:", idx, name, node.childNodes, 'last:', lastNode)
          if (name == 'div') {
            newSections.unshift(node.innerHTML)
          }
          doc.removeChild(node)
          lastNode = name
          changes = true
        }
      }

      if (newSections.length > 0) this.$emit('add', newSections, 1)	//Add new sections as peers after me
//      if (newSections.length > 0) this.addSubs(0, newSections)	//Add them as my immediate children)

//console.log(" after parse", changes, 'toAdd:', newSections)
      this.contEdit = false
      this.state.text = doc.innerHTML		//Get possibly amended text
      doc.innerHTML = this.titledText		//Reload the title, if necessary
//      this.$nextTick(()=>{ev.target.innerHTML = this.titledText})
    },
    update() {
      let secStrip = (sec) => {
        let {title, name, source, text, sections} = sec
          , newSec
          , subSecs = sections?.map(secStrip)
        if (source)
          newSec = {name, source}
        else
          newSec = {title, name, text, sections: subSecs?.length > 0 ? subSecs : null}
        return newSec
      }
        , data = secStrip(this.state)
//console.log("SD update", data)
      this.$emit('submit', 'editor', {request:'update', data})
    },

    clear() {				//Empty workspace
      let doIt = () => {
        let tmpState = Com.clone(this.stateTpt)
        this.state = Object.assign(this.state, tmpState)
        this.state.edit = true
        this.dirty = false
      }
      if (this.dirty) this.top().confirm('!sdcClearAsk', (ans) => {
        if (ans == 'diaYes') doIt()
      }); else doIt()
    },

    export() {
      let resp = {file:'document.json'}
        , dews = this.top().dewArray([['file', this.wm.sdcExportAsk], ['pretty', this.wm.sdcExportFmt, 'chk']])
//        , dews = [
//            {field:'file', lang:this.wm.sdcExportAsk, styles:{focus:true}},
//            {field:'pretty', lang:this.wm.sdcExportFmt, styles:{input:'chk'}}]
      this.top().query('!sdcExportAsk', dews, resp, (ans) => {
        if (ans == 'diaYes' && resp.file) {
//console.log("Export file:", resp.file)
          let blob = new Blob([JSON.stringify(this.state,null,resp.pretty?2:null)], {type: "text/plain;charset=utf-8"})
          FileSaver.saveAs(blob, resp.file)
        }
      })
    },

    import() {
      let resp = {}, dews = [{field:'files', lang:this.wm.sdcImportAsk, styles:{input:'file', focus:true}}]
      this.top().query('!sdcImportAsk', dews, resp, (ans) => {
console.log("Import file:", ans, resp)
        if (ans == 'diaYes' && resp.files && resp.files.length >= 1) {
          let reader = new FileReader(), file = resp.files[0]
          reader.onload = () => {
            let data = JSON.parse(reader.result)
//console.log("Import data:", data)
            Com.stateCheck(this, true, data)
            Object.assign(this.state, data)
            this.$nextTick(()=>this.subBus.notify('check'))
          }
          reader.readAsText(file)
        }
      })
    },

    deleteSub(idx) {				//Remove a sub-paragraph from my sections
//console.log('Got delete:', this.index, 'level:', this.level, 'index:', idx)
      if (idx != null && idx >= 0) this.state.sections.splice(idx,1)
      this.change()
    },

    addSubs(idx, addArr = [], skip=0) {			//Add sub-paragraphs
//console.log("Got add:", this.secNumber, 'lev:', this.level, 'idx:', idx, addArr, 'skip:', skip)
      idx += skip
      addArr.forEach(el=>{
        if (typeof el == 'string') el = {text:el}	//Make state object if given a string
        this.state.sections.splice(idx++, 0, el)
      })
      this.change()
    },

    addChild(ev) {					//When add section button pushed
      let newSec = Object.assign({}, this.stateTpt)
//console.log("Add child:", this.state, ev.shiftKey)
      if (ev.shiftKey)
        this.$emit('add', [newSec], 1)
      else
        this.state.sections.push(newSec)
      this.change()
    },

    undo() {
      this.top().notice('Not yet implemented')
    },

    dragStart(ev) {					//Event for the one being dragged
console.log("dragStart:", this.index, this.secNumber)
      dragee = this					//Global: who is getting dragged
      this.dragOrigin = ev.clientX
    },

    zoneOver(ev) {					//Events for the one being dragged over
      let dType, iPoint
      if (!dragee) return				//Ignore if no drag started
      this.dragOver = true				//Illuminate me (the drag target)
      dragTarget = this					//And remember who I am
      if (this.iAmChief) {
        dType = 'trash'
      } else {
        let bBox = this.$refs.content.getBoundingClientRect()
          , mid = bBox.y + bBox.height/2
//console.log("Move where:", dragee.dragOrigin, ev.clientX, ev.clientY, parseInt(mid))
        if ((ev.clientX - dragee.dragOrigin) > IndentOff)	//Appending to target's sections
          iPoint = 'app'
        else if (ev.clientY > mid)
          iPoint = 'aft'					//Where we land in the target
        else
          iPoint = 'bef'
        dType = ev.shiftKey ? 'copy' : 'move'
        if (this == dragee && !ev.shiftKey) dType = null	//Can't move myself to myself
      }
      dragee.dragType = dType
      dragee.inPoint = iPoint
//console.log("zoneOver:", this.secNumber, dragee.secNumber, dragee.dragType, dragee.inPoint, this.dragCursor)
    },

    zoneLeave(ev) {					//Fired for the zone being moved over
//console.log("ZL:", ev.clientX, ev.clientY, ev)
      if (!ev.buttons || (ev.clientX == 0 && ev.clientY == 0)) return	//Extra leave event fired at end of drag
//console.log("zoneLeave:", this.secNumber, ev.clientX, ev.clientY, ev.shiftKey)
      this.dragOver = false
      dragee.dragType = null
      dragee.dragPoint = null
      dragTarget = null
    },

    dragDrop(ev) {					//Fired for the one being dragged
      let dType = this.dragType
        , iPoint = this.inPoint
      this.dragType = null
      this.inPoint = null				//Restore default cursor
      dragee = null
//console.log("ZD:", dragTarget)
      if (!dragTarget) return				//Aborted drag, not over a peer
      if (this.$refs.text) this.$refs.text.blur()	//Don't keep focus, otherwise vue will reuse divs and leave focus on the slot we just moved from
//console.log("ZDrop:", dragTarget, 'gee:', dType, 'to:', dragTarget.dragType)
      dragTarget.dragType = null			//Restore default pointer (needed?)
      dragTarget.dragOver = false			//Clear target highlighting
//console.log("Zone drop:", this.secNumber, dragTarget.secNumber, dType, iPoint)
      if (dragTarget == this && dType != 'copy')
        return						//Aborted drag, over myself
      if (dType == 'trash') {
        this.$emit('delete')				//Delete me
        return
      }
      let stateCopy = Com.clone(this.state)
//console.log("Clone:", JSON.stringify(stateCopy))
      if (iPoint == 'app') {
        dragTarget.append([stateCopy])		//Tell drag target to append to its list
      } else if (iPoint) {
        let offset = (iPoint == 'bef') ? 0 : 1
        dragTarget.$emit('add', [stateCopy], offset)	//Tell target's parent to insert
      }
      if (dType == 'move') {
        let delIndex = (this.$parent === dragTarget.$parent && this.index > dragTarget.index ? this.index : this.index - 1)
//console.log(" delete index:", delIndex)
        this.$emit('delete', delIndex)			//Delete me under my new post-move index
      }
    },

    togSource(ev) {
      let st = this.state
//console.log("Toggle source:", this.secNumber, st.source, st.text)
      if (st.source) {
        st.text = st.source
        st.source = null
      } else {
        st.source = st.text || ''
        st.text = null
      }
    },
    togEdit(ev) {
//console.log("Toggle edit:", this.secNumber, this.state.edit, ev.target, ev.currentTarget)
      if (this.editable && !ev.target.classList.contains('input')) {
        this.state.edit = !this.state.edit
        ev.stopPropagation()
      }
    },
    append(subs) {				console.log("Append!", subs)
      this.state.sections.push(...subs)
    },
  },

  watch: {
    dirty(data) {
      if (this.iAmChief)
        this.$emit('submit', 'report', {request:'dirty', data})	//Let my container know my clear/dirty status
    },
  },

  beforeCreate() {
    this.$options.components['wylib-menudock'] = require('./menudock.vue').default	//Seems to work better here to avoid recursion problems
  },

  created() {
    if (this.bus) this.bus.register(this.id, msg =>{
//console.log("Strdoc got msg", this.dirty, this.iAmChief, msg)
      if (msg == 'clear') {
        this.clear()
      } else if (msg == 'clean') {
        this.dirty = false
      } else if (msg == 'load') {
        if (this.dirty) this.top().confirm('!sdcClearAsk', (ans) => {
          if (ans == 'diaYes') this.$emit('submit', 'control')
        }); else this.$emit('submit', 'control')
      }
    })
  },

  beforeMount() {
    Com.stateCheck(this, true)
//console.log("Strdoc state:", this.state)

    if (this.iAmChief) {
      this.subBus = new Bus.messageBus((msg, dat) => {		//Parent
//console.log("strdoc->strdoc event:", msg, dat)
        if (msg == 'xref') {
          this.processXrefs(dat)
        } else if (msg == 'dirty') {
          this.dirty = true
        }
      })
    }
    if (this.subBus) this.subBus.register(this.id, (msg, data) => {	//Children (and parent) listen
//console.log("Got bus message:", this.secNumber, msg, data, this.state)
      if (msg == 'edit') this.state.edit = true
      else if (msg == 'preview') this.state.edit = false
      else if (msg == 'markup' && this.state.edit) this.markTextArea(data)
      else if (msg == 'check') Com.stateCheck(this, true)
    })
  },
  mounted() {
//console.log("SS:", this.state.resource)
    if (this.iAmChief) {
      this.top().swallow(this.$refs.header)
    }
  },
}
</script>

<style lang='less'>
  .wylib-strdoc {
//    filter: blur(0);			//Doesn't seem to help.  Where should this go?
//    border: 1px solid blue;
    border: 0;
    margin: 0;
    padding: 0;
  }
  .wylib-strdoc .header {
//    position: fixed;			//Fixed makes menu fall behind content
    opacity: 0.26;
    transition: opacity 350ms ease-in;	//Had problem with blur on some chrome versions
  }
  .wylib-strdoc .header:hover {
    opacity: 0.94;
//    transition: opacity 100ms ease-in;
  }
  .wylib-strdoc .header .menudock {		//Override menudock default outline
    border: 1px;
  }
  @media print {
    .wylib-strdoc .header {
      display: none;
    }
  }
//  .wylib-strdoc .content {
//    margin: 0px;
//  }
  .wylib-strdoc .preview .title {
    font-size: 120%;
    text-align: center;
    width: 100%;
    padding-bottom: 0.5em;
  }
  .wylib-strdoc .edit .editline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;			//A little wierd, but aligns the left sides
    left: -1em;
//    border: 1px solid purple;
  }
  .wylib-strdoc .input.title {
    flex-grow: 2;
  }
  .wylib-strdoc .input.name {
    left: -1em;
    flex-grow: 1;
  }
  .wylib-strdoc .sourceline {
    width: 100%;
    display: flex;
  }
  .wylib-strdoc .input.source {
    flex-grow: 1;
  }
//  .wylib-strdoc div .text.input {
//    margin: 0px 1em 4px 0px;			//To see blue outline fully when editing (but leaves trash space between objects)
//    border: 1px solid purple;
//  }
  .wylib-strdoc .content .input {
    user-select: text;
    cursor: text;
  }
  .wylib-strdoc textarea {
    width: 100%;
  }
</style>
