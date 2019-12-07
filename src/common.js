//Common support functions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//X- Add a trim option to stateCheck to remove obsolete properties?
//- 
module.exports = {

  langTemplate() {return {title: null, help: null}},

  stateCheck(context, st = context.state, prune = false, props = context.stateTpt) {		//Initialize any needed properties in a component's state
//console.log("stateCheck:", context, props, st)
    if (st && props) {
      Object.keys(props).forEach(key => {		//Make sure all required properties are present
        if (!(key in st) || (st[key] == undefined && props[key] != undefined)) {
          context.$set(st, key, this.clone(props[key]))
//console.log("    init key:", key, st.key, props[key])
        }
      })
      if (prune) Object.keys(st).forEach(key => {	//Trim out unofficial properties
        if (!(key in props)) {
//console.log("    pruning key:", key)
          delete st[key]
        }
      })
    }
  },

  clone: function(o) {				//Deep object copy
    let output = {}
    if (o == null || o == undefined || typeof o != 'object') return o
    if (Array.isArray(o)) output = []
    for (let key in o) {
      let v = o[key]
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

  addWindow(winObj, template, ctx, placement, clone) {	//Create a new subwindow in an array of config objects
//console.log("Add Window", template, placement)
    template.x = null; template.y = null
    var newState = clone ? this.clone(template) : template
    if (clone) newState.template = this.clone(template)	//Remember how to reset myself
    if (placement) {
      newState.x = placement.x || (Math.random() - 0.5) * 50 + 150
      newState.y = placement.y || (Math.random() - 0.5) * 100 + 250
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

  fileReader(target, timeout, cb) {		//Read a JSON file
    for (let i = 0, f; f = target.files[i]; i++) {
      let reader = new FileReader();
      reader.onload = ()=>{
        let fileData = JSON.parse(reader.result)
//console.log("fileData:", fileData)
        cb(fileData)
      }
      reader.readAsText(f)
    }
    if (timeout) setTimeout(()=>{target.value = null}, timeout)
  },

  ajax(url, cb) {			//Read JSON data from a URL
    let data, xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = () => {
//console.log('ajax back:' + xmlhttp.status, xmlhttp.readyState, xmlhttp.responseText)
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//console.log('responseText:' + xmlhttp.responseText)
        try {
          data = JSON.parse(xmlhttp.responseText)
        } catch(err) {
//console.log(err.message + " in " + xmlhttp.responseText)
          return
        }
        cb(data)
      }
    }
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
  },

  buf2hex(buffer) {			//Convert ArrayBuffer to hex string
    var s = '', h = '0123456789ABCDEF'
    ;(new Uint8Array(buffer)).forEach((v) => { s += h[v >> 4] + h[v & 15]; })
    return s
  },

  hex2buf(hexStr) {
    return Buffer(hexStr, 'hex')
//    return new Uint8Array(hexStr.match(/.{2}/g).map(h => parseInt(h, 16)));
  },

  str2buf(str) {
    return new TextEncoder("utf-8").encode(str);
  },
  
  buf2str(buffer) {
    return new TextDecoder("utf-8").decode(buffer);
  },
    
  deriveKey: function(password, salt) {
    salt = salt || crypto.getRandomValues(new Uint8Array(8))
    return crypto.subtle.importKey("raw", this.str2buf(password), "PBKDF2", false, ["deriveKey"])
      .then(key => crypto.subtle.deriveKey({
        name: "PBKDF2", 
        salt, 
        iterations: 1000, 
        hash: "SHA-256"
      }, key, {
        name: "AES-GCM",
        length: 256
      }, false, ["encrypt", "decrypt"])).then(key => [key, salt])
  },
  
  encrypt: function(password, plain) {
    let iv = crypto.getRandomValues(new Uint8Array(12))
      , data = this.str2buf(plain);
    return this.deriveKey(password).then(([key, salt]) =>
      crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data).then(ciphertext => 
        this.buf2hex(salt) +':'+ this.buf2hex(iv) +':'+ this.buf2hex(ciphertext)))
  },

  decrypt: function(password, encrypted) {
    let [salt, iv, data] = encrypted.split(':').map(this.hex2buf)
    return this.deriveKey(password, salt).then(([key]) => 
      crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data)).then(v => 
        this.buf2str(new Uint8Array(v)))
  },
  
  unabbrev(short, longs) {		//Turn an abbreviated string into one of a set of full strings
    let regex = new RegExp('^' + short)
      , match = longs.find(el=>(el.match(regex)))
//console.log("Unabbrev:", short, longs, match)
    return match || short
  }
}
