//Manage saving states to and restoring them from the database
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Support separately save and save-as for states
//- On initial call, query for all (or maybe certain common) components (to avoid multiple calls in the startup)
//- How to report errors to the correct toplevel? (See Fixme below)
//- 

import Wyseman from './wyseman.js'

const StateManager = {
  itemCache: {},
  listens: {},
  pending: {},

  listen: function(id, comp, loadCB, errCB) {
    if (!loadCB && this.listens[comp] && this.listens[comp][id]) {	//If no callback,
      delete this.listens[comp][id]				//then un-listen
      return
    }
    if (!this.listens[comp]) this.listens[comp] = {}		//If no one listening for this component yet
//console.log("State listen", id, "for:", comp, this.pending[comp])
    this.listens[comp][id] = {errCB, loadCB}			//Remember our callbacks
    if (!(comp in this.pending)) this.pending[comp] = false	//Build pending flag for this component
    if (this.itemCache[comp]) {					//If this component already cached
//console.log("cb cache")
      loadCB(this.itemCache[comp])				//return the cached value
    } else if (!this.pending[comp]) {				//else if no pending query for this component,
//console.log("callQuery", this.pending[comp])
      this.queryData(comp, id)					//launch one
    }
  },

  saveas: function(comp, name, descr, state, errCB, okCB) {
    let view = 'wylib.set_data(text, text, text, int, jsonb)'
      , params = [comp, name, descr, null, JSON.stringify(state)]
    Wyseman.request(this.id+'ss', 'tuple', {view, params}, (res, err)=>{
//console.log("Insert res:", res)
      if (err) errCB(err); else okCB(res.set_data)
    })
  },

  save: function(ruid, state, top) {
//console.log("Save:", ruid, top)
    let view = 'wylib.data_v', fields = {data:JSON.stringify(state)}, where = {ruid}
    Wyseman.request(this.id+'ss', 'update', {view, fields, where}, (res, err)=>{
      if (err && top) top.error(err)
    })
  },

  queryData: function(component, id) {
    let view = 'wylib.data_v', fields = ['ruid','own_name','access','name','descr','data'], where = {component}, order=[3]
        , compListen = id ? this.listens[component][id] : null
    this.pending[component] = true
//console.log("Will query for:", component, this.pending[component])
    Wyseman.request('state_qd_'+component, 'select', {view, fields, where, order}, (rows, err) => {
      this.pending[component] = false
      if (err) {compListen.errCB(err); return}
      let items = rows.map(r=>{return ({idx:r.ruid, owner:r.own_name, access:r.access, lang:{title:r.name, help:r.descr}, data:r.data})})
      if (items.length <= 0) items = [{idx:'None', lang:'No saved states found'}]
      this.itemCache[component] = items
      if (compListen) {
//console.log("Calling one:", component)
        compListen.loadCB(items)
      } else {
//console.log("Will call all:", component)
        if (this.listens[component]) Object.values(this.listens[component]).forEach(listen=>{
          listen.loadCB(items)
        })
      }
    })
  },
  
}

Wyseman.listen('state_listen', 'wylib', msg =>{
console.log("Got async wylib message:", msg)
  if (msg.target == "data") StateManager.queryData(msg.component)	//Refresh restore states menu
})

module.exports = StateManager
