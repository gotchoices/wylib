//Database record editing component
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Keep track of clean/dirty status (by tracking changed events from dews)
//X- Generate update JSON structure
//X- Generate delete JSON structure
//X- Generate insert JSON structure
//X- Make modal work
//X- Update preview after insert, update, delete
//X- Clear needs to somehow reload any default values
//X- Show invalid data on init, and after clear
//X- Works well enough to add, modify, delete users, documents
//- Can launch subordinate previews
//- 
//- Bugs:
//- Change to username field turns off Add button?
//- 
//- Later:
//- Should filter nulls out of insert fields?
//- Present records in a grid layout
//- Optionally, ask for confirmation on:
//-  delete
//-  clear, overwrite dirty record
//- Only update if record dirty
//- 

<template>
  <div class="wylib wylib-dbe">
    <div class="header">
      <wylib-menudock ref="headMenu" :state="state.dock" :config="dockConfig" :height="headerHeight" llang="wm.dbeMenu"/>
      <div class="headerfill"/>
      <div ref="headStatus" class="wylib-dbe headstatus" :title="wm.dbePrimary?wm.dbePrimary.help:null">PK:<input disabled :value="state.key" :size="keyEntSize"/></div>
    </div>
    <div class="subwindows">
    </div>
    <wylib-mdew ref="mdew" :top="top" :state="state.dews" :data="dbData" @input="change" :bus="msgBus"/>
  </div>
</template>

<script>
import Com from './common.js'
import Bus from './bus.js'
import Wyseman from './wyseman.js'
import Mdew from './mdew.vue'
import MenuDock from './menudock.vue'

export default {
  name: 'wylib-dbe',
  components: {'wylib-mdew': Mdew, 'wylib-menudock': MenuDock},
  props: {
    state:	{type: Object, default: () => ({})},
    top:	null,		//From parent window
    bus:	null,
  },

  data() { return {
    pr:		require('./prefs'),
    wm:		{},
    viewMeta:	null,
    dbData:	{},		//Data as fetched from the database
    dirty:	false,
    valid:	false,
    msgBus:	new Bus.messageBus(this),
  }},

  computed: {
    id: function() {return 'dbe_' + this._uid + '_'},
    actMenu: function() {
      let acts = []
//console.log("actMenu:", this.viewMeta.ui)
      if (this.viewMeta && this.viewMeta.ui) this.viewMeta.ui.actions.forEach(act => {
        acts.push({idx: act, lang: this.viewMeta.msg[act] || {title:act}, call: ()=>{this.perform(act)}})
      })
    return acts
    },
    subMenu: function() {
      let subs = []
      if (this.viewMeta && this.viewMeta.ui) this.viewMeta.ui.subs.forEach(sub => {
        subs.push({idx: sub, lang: this.viewMeta.msg[sub] || {title:sub}, call: ()=>{this.preview(sub)}})
      })
    return subs
    },
    dockConfig: function() { return [
      {idx: 'act', lang: this.wm.dbeActions, menu: this.actMenu, icon: 'wand'},
      {idx: 'sub', lang: this.wm.dbeSubords, menu: this.subMenu, icon: 'table'},
      {idx: 'adr', lang: this.wm.dbeInsert,  call: this.insert,  icon: 'upload', shortcut: true, disabled: !this.valid},
      {idx: 'upd', lang: this.wm.dbeUpdate,  call: this.update,  icon: 'floppy', shortcut: true, disabled: !this.dirty || !this.valid},
      {idx: 'del', lang: this.wm.dbeDelete,  call: this.delete,  icon: 'bin',    disabled: !!this.state.key},
      {idx: 'clr', lang: this.wm.dbeClear,   call: this.clear,   icon: 'sun',    shortcut: true},
      {idx: 'ldr', lang: this.wm.dbeLoadRec, call: this.loadRec, icon: 'target'},
      {idx: 'pre', lang: this.wm.dbePreview, call: this.docPrev, icon: 'filetext', shortcut: true},
    ]},
    headerHeight: function() {
      return this.pr.winFullHeader - 1	//Fit in parent header, plus top border
    },
    keyEntSize: function() {
      let len = 4
      if (this.state.key) len = this.state.key.join(',').length
      if (len > 16) len = 16
      return len
    }
  },

  methods: {
    loadRec() {
      let resp = {q:null}
      this.top.query(this.wm.dbeLoadPrompt.help, this.top.dewArray('q', this.wm.dbeRecordID), resp, (yes) => {
console.log("Load record:", yes, resp.q)
      })
    },
    keyWhere(key = this.state.key) {		//Return an object with the where clause to identify this record
      let whereObj = {}
      this.viewMeta.pkey.forEach((fld,i) => {whereObj[fld] = key[i]})
//console.log("Where:", whereObj)
      return whereObj
    },
    load(key) {
//console.log("Key:", this.state.key)
      this.dirty = false
      this.valid = true
      this.dataRequest('tuple', {where: this.keyWhere(key), fields: '*'}, false, () => {this.state.key = key})
    },

    insert() {
      let fields = Object.assign({}, this.dbData, this.$refs.mdew.userData)
console.log("Insert:", fields)
      this.state.dews.fields.forEach((fld,idx) => {		//Remove any fields that shouldn't get written to the DB
//console.log(  "field:", fld.field, fld.styles.write, !fld.styles.write || fld.styles.write==0)
        if (fld.styles && ('write' in fld.styles) && (!fld.styles.write || fld.styles.write==0)) {
//console.log(  "deleting", fld.field)
          delete fields[fld.field]
        }
      })
console.log("insert:", fields)
      this.dataRequest('insert', {fields}, true, (data)=>{
        let keyVal = []; this.viewMeta.pkey.forEach(fld => {
          keyVal.push(data[fld])
        })
        this.state.key = keyVal
      })
    },

    update() {
      let fields = this.$refs.mdew.userData
console.log("Update:", this.dbData, fields)
      this.dataRequest('update', {fields, where: this.keyWhere()})
    },

    delete() {
console.log("Delete")
      this.dataRequest('delete', {where: this.keyWhere()}, true, ()=>{this.state.key = null})
//console.log(" after delete:", this.dbData)
    },

    clear() {
      let answers = this.msgBus.notify('clear')[0]
//console.log("Clear", answers)
      answers.forEach((el,ix) => {
        let value, field
        [ value, field, this.dirty, this.valid ] = el
//console.log("Dbe clear:", field, value, this.dirty, this.valid)
        this.dbData[field] = value
      })
      this.top.posted()				//Act like we just posted
    },

    change(value, field, dirty, valid) {	//Respond to changes on the data inputs
      this.dirty = dirty
      this.valid = valid
//console.log("Dbe input:", field, value, dirty, valid)
    },

    dataRequest(action, options, modifies = true, cb) {
//console.log("Dbe dataRequest:", action, options)
      Wyseman.request(this.id+'dr', action, Object.assign({view: this.state.dbView}, options), (data, err) => {
//console.log("   data:", err, data)
        if (err) this.top.error(err)
        else {
          if (data) this.dbData = data			//If a record was returned
          if (modifies) this.$emit('modified', data)	//Tell parent dbp to update
          if (cb) cb(data)
        }
      })
    },
    docPrev() {Com.docView(this.state.dbView)},

    mdewLayout() {		//Make the column description format mdew is looking for
      let fieldArray = []
      if (this.viewMeta) this.viewMeta.columns.forEach(meta => {
//console.log("Col:", meta.col, " Meta:", meta.styles)
        let stateElem = this.state.dews.fields.find(e => (e.field == meta.col))
        if (!stateElem) stateElem = {
          field:	meta.col,
          lang:		{title:	meta.title || meta.col, help: meta.title + ' (' + meta.col + '):\n' + meta.help},
          styles:	meta.styles,
          values:	meta.values
        }
//console.log("Col:", meta.col, JSON.stringify(stateElem))
        fieldArray.push(stateElem)
      })
      return fieldArray
    },
    perform(act) {
console.log("Perform action:", act)
    },
    preview(sub) {
console.log("Open preview:", sub)
    },
  },

  watch: {
//    'state.key': function(key) {
//console.log("Watched key changed:", key)
//      if (key && key.length > 0) this.load(key); else this.dbData = {}
//    },
    'state.dbView': function() {			//If we change our view, reset data, columns
      this.recData = []
      this.viewMeta = null
      Wyseman.request(this.id+'xm', 'meta', this.state.dbView, (data) => {this.viewMeta = data})
    },
    viewMeta: function() {this.state.dews.fields = this.mdewLayout()},
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
    if (this.state.dbView)
      Wyseman.register(this.id+'cv', this.state.dbView, (data) => {this.viewMeta = data})
  },

  beforeMount: function() {
//console.log("Dbe before, state: ", this.state);
    Com.react(this, {dock: {}, dbView: '', key:[], dews: {fields: []}})
    if (this.bus) this.bus.register(this.id, (msg, data) => {
//console.log("Dbe bus message: ", msg, data);
      if (msg == 'load') return this.load(data)
    })
  },

  mounted: function() {
//console.log("Dbe refs: ", this.$refs);
    this.$parent.$emit('swallow', this.$refs['headMenu'], this.$refs['headStatus'])
  },
}
</script>

<style lang='less'>
  .wylib-dbe {
//    border: 1px solid red;
  }
  .wylib-dbe .header {
    background: linear-gradient(to top, #c0c0c0, #e0e0e0);	//Fixme: Prefs
    width: 100%;
    display: flex;
  }
  .wylib-dbe .header wylib-menudock {
    flex: 0 0 auto;
  }
  .wylib-dbe .header .headerfill {
    flex: 1 1 auto;
  }
  .wylib-dbe.headstatus {
    flex: 0 0 auto;
    white-space: nowrap;
    display: flex;
    align-items: flex-end;
  }
</style>
