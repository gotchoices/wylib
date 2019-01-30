//Common support functions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//X- Add a trim option to stateCheck to remove obsolete properties?
//- 
const storeKey = 'wylibState_'

module.exports = {

  langTemplate() {return {title: null, help: null}},

  stateCheck(context, st = context.state, prune = false, properties = context.stateTpt) {		//Initialize any needed properties in a component's state
//console.log("stateCheck:", context, properties, st)
    if (st && properties) {
      Object.keys(properties).forEach(key => {
        if (!(key in st)) {
          context.$set(st, key, properties[key])
//console.log("    init key:", key, properties[key])
        }
      })
      if (prune) Object.keys(st).forEach(key => {
        if (!(key in properties)) {
//console.log("    pruning key:", key)
          delete st[key]
        }
      })
    }
  },

  clone: function(o) {				//Deep object copy
    let output = Array.isArray(o) ? [] : {}, v, key
    for (key in o) {
      v = o[key]
//console.log('clone:', key, o[key], v, typeof v)
      output[key] = ((v != null && typeof v === "object") ? this.clone(v) : v)
    }
    return output
  },

  deepCloneWithStyles: function(node) {		//For printable popup (big and slow)
    let style = node.style ? window.getComputedStyle(node) : null
      , clone = node.cloneNode(false)
//console.log("clone:", node, style)
    if (clone.style && style && style.cssText)
      clone.style.cssText = style.cssText
    for (let child of node.childNodes) 
      clone.appendChild(this.deepCloneWithStyles(child))
    return clone
  },

  saveState: function(tag, data) {		//Save a component's state in local storage
    localStorage.setItem(storeKey + tag, JSON.stringify(data))
  },
    
  getState: function(tag) {			//Retrieve a stored state from local storage
    let st = localStorage.getItem(storeKey + tag)
//console.log("Getting:", st)
    return ((st && st != 'undefined') ? JSON.parse(st) : null)
  },
    
  clearState: function(tag) {			//Delete state data stored in local storage
    if (tag) {					//Clear a single state item
      localStorage.removeItem(storeKey + tag)
    } else {					//Clear all state items
      let re = new RegExp('^' + storeKey)
      for (var i = 0, len = localStorage.length; i < len; i++) {
        let key = localStorage.key(i)
//console.log("Storage key:", key, typeof key)
        if (key && key.match(re)) localStorage.removeItem(key)
      }
    }
  },
  
  addWindow(winObj, template, ctx, placement, clone) {	//Create a new subwindow in an array of config objects
//console.log("Add Window", template, placement)
    var newState = clone ? this.clone(template) : template
    if (clone) newState.template = this.clone(template)	//Remember how to reset myself
    if (placement) {
      if (typeof placement == 'object') {
        newState.x = placement.x || 0
        newState.y = placement.y || 0
      } else {
        newState.x += (Math.random() - 0.5) * 100
        newState.y += (Math.random() - 0.5) * 100
      }
    }

    for(var newIndex = 0; newIndex in winObj; newIndex++);	// console.log('test', newIndex);
    ctx.$set(winObj, newIndex, newState)
//console.log(" at:", newIndex)
    return newIndex
  },

  closeWindow(winObj, idx, ctx, reopen) {
    let { x, y, template } = winObj[idx]
//console.log("Close Window", idx, reopen)
    if (reopen && template)
      this.addWindow(winObj, template, ctx, {x, y})	//Force to open in a new slot
    ctx.$delete(winObj, idx)
//console.log(" after:", winObj)
  },
    
}
