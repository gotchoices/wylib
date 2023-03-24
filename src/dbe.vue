//Database record editing component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- If window closed/reopened, we lose dirty status
//X- Option to open reports in popup or wylib-win
//X- Only update field if it is dirty
//- Should we filter nulls out of insert fields?
//- Optionally, ask for confirmation on:
//-  delete
//-  clear, overwrite dirty record
//- See Fixme's below
//- 

<template>
  <div class="wylib wylib-dbe">
    <div class="header">
      <wylib-menudock ref="headMenu" :state="state.dock" :config="dockConfig" :env="env" :lang="wm.dbeMenu"/>
      <div class="headerfill"/>
      <div ref="headStatus" class="wylib-dbe headstatus" :title="wm.h.dbePrimary">PK:<input disabled :value="keyValues" :size="keyEntSize"/></div>
    </div>
    <div class="subwindows">
      <wylib-win v-for="sub,key in state.subs" topLevel=true :key="key" :state="sub" :env="env" @close="r=>{closeWin(key, r)}">
        <wylib-dbp :state="sub.client" :env="env" :bus="subBus" :master="keyMaster"/>
      </wylib-win>
    </div>
    <wylib-mdew ref="mdew" :state="state.dews" :env="env" :config="mdewConfig" :data="dbData" @input="change" :bus="mdewBus"/>
  </div>
</template>

<script>
const Bus = require('./bus.js')
const Com = require('./common.js')
const Wyseman = require('./wyseman.js')
import MenuDock from './menudock.vue'
import Mdew from './mdew.vue'
import Dbp from './dbp.vue'
import Win from './win.vue'

export default {
  name: 'wylib-dbe',
  components: {'wylib-mdew': Mdew, 'wylib-menudock': MenuDock, 'wylib-dbp':Dbp, 'wylib-win':Win},
  props: {
    state:	{type: Object, default: () => ({})},
    bus:	null,			//Commands from my parent dbp
    master:	null,			//Key info for my master, if any
    env:	{type: Object, default: Com.envTpt},
  },
  inject: ['top'],		//My toplevel window
  data() { return {
    viewMeta:	null,
    dbData:	{},		//Data as fetched from the database
    dirty:	false,
    valid:	false,
    lastView:	null,
    mdewBus:	new Bus.messageBus(this),
    subBus:	new Bus.messageBus(this, this.reportQuery),
    stateTpt:	{dock:{}, dbView:'', key: {}, loaded:false, subs:{}, dews:{fields: []}},
    reports:	{},
  }},

  computed: {
    id() {return 'dbe_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    metaStyles() {return this.viewMeta?.styles ?? {}},
    actMenu() {
      let acts = []
//console.log("actMenu:", this.metaStyles)
      if (this.metaStyles.actions) this.metaStyles.actions.forEach(act => {
        let name = act.name			//;console.log("  act:", name, act)
        acts.push({idx: name, icon: 'wand', lang: this.viewMeta.msg[name] || {title:name}, call: (ev)=>{this.perform(ev, act)}})
      })
      return acts
    },
    subMenu() {
      let subs = []
//console.log("subMenu:", this.metaStyles)
      if (this.metaStyles.subviews) this.metaStyles.subviews.forEach(sub => {
        let viewName = (typeof sub == 'string') ? sub : sub.view
            , lang = sub.lang || {title: viewName, help:null}
        subs.push({idx: viewName, lang, icon: 'table', call: ()=>{this.addWin(sub.view)}})
      })
      return subs.length > 0 ? subs : null	//Don't create an empty menu
    },
    dockConfig() { return [
      {idx: 'act', lang: this.wm.dbeActions, menu: this.actMenu, icon: 'wand'},
      {idx: 'sub', lang: this.wm.dbeSubords, menu: this.subMenu, icon: 'table'},
      {idx: 'adr', lang: this.wm.dbeInsert,  call: this.insert,  icon: 'upload', shortcut: true, disabled: !this.valid},
      {idx: 'upd', lang: this.wm.dbeUpdate,  call: this.update,  icon: 'floppy', shortcut: true, disabled: !this.dirty || !this.valid || !this.keyValues},
      {idx: 'del', lang: this.wm.dbeDelete,  call: this.delete,  icon: 'bin',    disabled: !!this.keyValues},
      {idx: 'clr', lang: this.wm.dbeClear,   call: this.clear,   icon: 'sun',    shortcut: true},
      {idx: 'ldr', lang: this.wm.dbeLoadRec, call: this.loadRec, icon: 'target'},
      {idx: 'opt', lang: this.wm.dbeOption,  call: this.opTog,   icon: 'eye',    type: 'checkbox', toggled: this.state.dews.optional, input: this.showOptValue},
    ]},
    headerHeight() {
      return this.pr.winFullHeader - 1	//Fit in parent header, plus top border
    },
    keyEntSize() {
      let len = 4
      if (this.keyValues) len = this.keyValues.join(',').length
      if (len > 16) len = 16
      return len
    },
    mdewConfig() {			//Make the column description format mdew is looking for
      let fieldArray = []
      if (this.viewMeta) this.viewMeta.columns.forEach(meta => {
//console.log("Col:", meta.col, " Meta:", meta, meta.styles, meta.values)
        fieldArray.push({
          field:	meta.col,
          lang:		{title:	meta.title || meta.col, help: meta.title + ' (' + meta.col + '):\n' + meta.help},
          styles:	meta.styles ?? {},
          values:	meta.values,
          nonull:	meta.nonull
        })
      })
      return fieldArray
    },
    pKey() {		//object describing current PK fields and their values
      let ret = {}
      if (this.viewMeta) this.viewMeta.pkey.forEach(fld => {ret[fld] = this.dbData[fld]})
      this.state.key = ret	//side effect
//console.log("Dbe pKey:", ret)
      return ret
    },
    keyValues() {	//An array of current PK values
      let keyVals = []
      Object.keys(this.pKey).forEach(fld => {
        if (this.dbData[fld] != undefined) keyVals.push(this.dbData[fld])
      })
//console.log("Dbe keyValues:", keyVals)
      return keyVals.length > 0 ? keyVals : undefined
    },
    keyMaster() {return {			//Record with all key data consolidated
      view: this.state.dbView,
      pKey: this.pKey,
      keys: this.viewMeta.pkey,
      values: this.keyValues,
      get: (field)=>{return this.dbData[field]},
//      fields: this.dbData
    }},
  },

  methods: {
    showOptValue(v) {				//Set/get value for showing optional fields
      if (v != null) this.state.dews.optional = v
      return this.state.dews.optional
    },
    loadRec() {					//Prompt for a primary key and load that record
      let resp = {}
      let dews = []; this.mdewConfig.forEach((el,ix)=>{
        if (this.viewMeta.pkey.includes(el.field)) {
          let pkEl = Object.assign({}, el)
          if (pkEl.styles) {delete pkEl.styles.hide; delete pkEl.styles.subframe; delete pkEl.focus}
          dews.push(pkEl)
        }
      })
      dews[0].focus = true			//Doesn't seem to work
      this.top().query('!dbeLoadPrompt', dews, resp, (tag) => {
//console.log("Load record:", yes, resp)
        if (tag == 'diaYes') this.load(resp)
      })
    },

    keyWhere(key = this.keyValues) {		//Return a 'where' object identifying this record
      let whereObj = {}
      this.keyMaster.keys.forEach((fld,i) => {whereObj[fld] = key[i]})
//console.log("Where:", whereObj)
      return whereObj
    },
    load(where) {				//Fetch a record from the database, by its primary key
//console.log("Dbe load:", where)
      if (Array.isArray(where)) where = this.keyWhere(where)	//if only key values passed in
      this.dataRequest('tuple', {where, fields: '*'}, false, ()=>{this.dirty = false})
    },

    fieldCheck(fields) {
      this.mdewConfig.forEach((fld, idx) => {		//Remove any fields that shouldn't get written to the DB
//console.log(  "field:", fld.field, fld.styles.write, !fld.styles.write || fld.styles.write==0)
        if (fld.styles && ('write' in fld.styles) && (!fld.styles.write || fld.styles.write==0)) {
//console.log(  "deleting", fld.field)
          delete fields[fld.field]
        }
      })
    },

    insert() {
      let fields = this.mdewBus.notify('userData')[0]

      if (this.master) {
        let { view, keys } = this.master			//Populate foreign key fields from my master dbe, if any
          , hisPKey = keys.join(',')
          , fKeyLinks = this.viewMeta.fkeys.filter(el => (el.table == view))
          , fKeyLink = (fKeyLinks && fKeyLinks.length == 1) ? fKeyLinks[0] : fKeyLinks.find(el => (el.foreign.join('.') == hisPKey))
//console.log("insert:", fields, "keyMaster:", this.master, "k:", hisPKey, "fKeyLink:", fKeyLink)
        if (fKeyLink) fKeyLink.columns.forEach((key, idx)=>{
          let fKeyField = fKeyLink.foreign[idx]
            , fValue = this.master.get(fKeyField)
//console.log("  field:", key, "=", fValue)
          fields[key] = fValue
        })
      }

console.log("Insert:", fields)
      this.fieldCheck(fields)
      this.dataRequest('insert', {fields}, true, ()=> {this.dirty = false})
    },

    update(ev, fields) {
console.log("Update data:", ev, JSON.stringify(fields))
      if (!fields) fields = this.mdewBus.notify('userData',true)[0]
      this.fieldCheck(fields)
      this.dataRequest('update', {fields, where: this.keyWhere()}, true, ()=>{this.dirty = false})
    },

    delete() {
//console.log("Delete")
      this.dataRequest('delete', {where: this.keyWhere()})
    },

    clear() {
      let answers = this.mdewBus.notify('clear')[0]
//console.log("Dbe Clear", answers)
      answers.forEach(el => {			//Update data pushed into mdew
        let { value, field, dirty, valid } = el
//console.log("  field:", field, value, this.dirty, this.valid)
        this.dbData[field] = value
      })
      this.dirty = false
      this.valid = false
      this.top().posted()			//Act like we just posted
      Object.keys(this.pKey).forEach(fld => {this.dbData[fld] = null})	//Force PK fields, even if they don't display
      this.state.loaded = false
      this.subBus.notify('clear')		//Clear any subordinate previews
    },

    change(value, field, dirty, valid) {	//Respond to changes on the data inputs
      this.dirty = dirty			//dirty, valid state of whole mdew
      this.valid = valid
//console.log("Dbe input:", field, value, dirty, valid)
    },

    dataRequest(action, options, modifies = true, cb) {
//console.log("Dbe dataRequest:", action, options)
      Wyseman.request(this.id+'dr', action, Object.assign({view: this.state.dbView}, options), (data, err) => {
//console.log("Dbe data received:", err, data)
        if (err) {
          this.top().error(err)
        } else {
          if (data) {
            this.dbData = data
            this.$nextTick(()=>{this.mdewBus.notify('set')})
          }
          if (modifies) this.$emit('modified', data)	//Tell parent dbp to update
          if (cb) cb(data)
          this.state.loaded = true
//console.log("Loaded:", this.viewMeta.pkey)
          this.$nextTick(()=>{this.subBus.notify('load', this.pKey)})	//Tell child dbp to update itself
        }
      })
    },

    addWin(view) {
//console.log("Open preview window:", view)
      Com.addWindow(this.state.subs, {posted: true, client: {dbView: view}}, this, true)
    },
    closeWin(idx, reopen) {
      Com.closeWindow(this.state.subs, idx, this, reopen)
    },

    reportQuery(request, data, rptKey, cb) {	//Handle editor requests from a launched report
//console.log("Dbe got request from report:", request, data, "k:", this.keyValues, rptKey)
      if (!request || request == 'pKey') {	//Default to asking for currently loaded key
        return (this.keyValues ? [this.pKey] : null)
      } else if (request == 'update') {
        let uData = {}
        this.mdewConfig.forEach(el => {		//Grab only valid and changed fields
          let key = el.field
//console.log("  checking:", key, this.dbData[key], data[key])
          if ((key in data) && JSON.stringify(data[key]) != JSON.stringify(this.dbData[key])) {
            uData[key] = data[key]
          }
        })
//console.log("  update:", uData, rptKey, this.pkey)
        let key = rptKey || this.pKey		//Try to link to current record if one is loaded
        if (key) {
          this.fieldCheck(uData)
          this.dataRequest('update', {fields:uData, where: rptKey}, true, cb)
        } else {				//If not use, whatever key the report loaded with
          this.top().error(this.wm.dbeNoPkey)
        }
      }
    },
    
    perform(event, action) {
//console.log("Perform action:", action, event.shiftKey)
      let data = {}
        , view = this.state.dbView
        , diaTag = ['action', view, action.name].join(':')
      if (action.options) {			//Do we need to prompt for report options?
        this.top().dialog(action.lang, action.options, data, null, diaTag + ':opts', this.top().diaButs3)
      } else {
        this.top().actionLaunch(view, action, {popUp:event.shiftKey}, this.subBus)	//Go direct to action/report
      }
    },

    metaListen() {				//Register which DB view we are dealing with
      let zid = this.id+'cv'
      if (this.lastView) Wyseman.register(zid, this.lastView)		//Un-register any prior view
      if (this.state.dbView) Wyseman.register(this.id+'cv', this.state.dbView, (data) => {
//console.log("Dbe got metadata for:", this.state.dbView, data)
        this.viewMeta = data
        this.lastView = this.state.dbView
        
        let lang = {title: this.wm.t.dbeMenu+': '+data.title, help: this.state.dbView+':\n'+data.help}
        this.$parent.$emit('customize', lang, 'dbe:'+this.state.dbView, false, ()=>{return this.dirty})
        
        if (this.metaStyles.actions) this.metaStyles.actions.forEach(act => {		//Make menu options for any actions associated with this view
//console.log("Dbe register Dialog callback:", act)
          this.top().registerDialog(['action',this.state.dbView,act.name].join(':'), (dia, info)=>{
//console.log("Dbe got action callback:", dia, act, info)
            return this.top().actionLaunch(this.state.dbView, act, info, this.subBus)
          })
        })
      })
    },
  },

  watch: {
    'state.dbView': function(newVal, oldVal) {			//If we change our view, reset data, columns
//console.log("Dbe dbView changed!")
      this.recData = []
      this.viewMeta = null
      if (newVal != oldVal) this.metaListen()
    },
  },

  created: function() {
//console.log("Dbe created; top:", this.top())
    this.metaListen()
//    this.subBus = new Bus.messageBus(this, (msg)=>{
//console.log("Dbe got sub message:", msg)
//    })
  },

  beforeMount: function() {
//console.log("Dbe before, state:", JSON.stringify(this.state.key))
    Com.stateCheck(this)
    let preloadKey = this.state.key
    this.$nextTick(() => {		//Attempt reload to previous state
      if (this.state.loaded && Object.keys(preloadKey).length > 0) {
//console.log("Dbe reload:", this.state.loaded, JSON.stringify(preloadKey))
        this.load(preloadKey)
      }
    })
  },

  mounted: function() {
//console.log("Dbe refs: ", this.$refs, JSON.stringify(this.state.key))
    this.$parent.$emit('swallow', this.$refs['headMenu'], this.$refs['headStatus'])

    if (this.bus) this.bus.register(this.id, (msg, data) => {	//Commands from my parent dbp
//console.log("Dbe bus message: ", msg, data);
      if (msg == 'load') return this.load(data)
    })
  },

  beforeDestroy: function() {
//console.log("Dbe closing popups:", this.reports)
    Object.values(this.reports).forEach(popup=>{popup.close()})		//Fixme: Doesn't really get called much--create onunload handler?
  },
}
</script>

<style lang='less'>
  .wylib-dbe {
//    border: 1px solid red;
//    overflow-x: hidden;
//    overflow-y: scrolled;
  }
  .wylib-dbe .header {
    background: linear-gradient(to top, #c0c0c0, #e0e0e0);	//Fixme => Prefs
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
