//Common support functions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//X- Add a trim option to stateCheck to remove obsolete properties?
//- 
const Crypto = window.crypto
const Subtle = Crypto.subtle
module.exports = {

  langTpt() {return {title: null, help: null}},
  envTpt() {return {wm: {t: {}, h: {}}, pr: require('./prefs.js')}},

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

  buf2b64url(buf) {			//Convert ArrayBuffer to base64 url-safe
    return Buffer.from(buf).toString('base64')
      .replace(/\+/g,'-').replace(/\//g,'_')
      .replace(/=+$/,'')
  },
  
  deriveKey: function(password, salt) {
    salt = salt || Crypto.getRandomValues(new Uint8Array(8))
    return Subtle.importKey("raw", Buffer.from(password), "PBKDF2", false, ["deriveKey"])
      .then(key => Crypto.subtle.deriveKey({
        name: "PBKDF2", 
        salt, 
        iterations: 10000,
        hash: "SHA-256"
      }, key, {
        name: "AES-GCM",
        length: 256
      }, false, ["encrypt", "decrypt"])).then(key => [key, salt])
  },
  
  encrypt: function(password, plain) {		//Encrypt a string to a JSON-encoded string
    let iv = Crypto.getRandomValues(new Uint8Array(12))
      , data = Buffer.from(plain)
    return this.deriveKey(password).then(([key, salt]) =>
      Subtle.encrypt({ name: "AES-GCM", iv }, key, data).then(ciphertext => (
           '{"s":"' + Buffer.from(salt).toString('hex')
        + '","i":"' + Buffer.from(iv).toString('hex')
        + '","d":"' + Buffer.from(ciphertext).toString('base64')
        + '"}'
      )))
  },

  decrypt: function(password, encrypted) {	//Decrypt a JSON-encoded string to a string
    let { s, i, d } = JSON.parse(encrypted)
      , salt = Buffer.from(s, 'hex')
      , iv = Buffer.from(i, 'hex')
      , data = Buffer.from(d, 'base64')
    return this.deriveKey(password, salt).then(([key]) => 
      Subtle.decrypt({ name: "AES-GCM", iv }, key, data)).then(v => 
        Buffer.from(new Uint8Array(v)).toString())
  },
  
  unabbrev(short, longs) {		//Turn an abbreviated string into one of a set of full strings
    let regex = new RegExp('^' + short)
      , match = longs.find(el=>(el.match(regex)))
//console.log("Unabbrev:", short, longs, match)
    return match || short
  },
  
  urlParms(url = location.search) {	//Return URL search parameters as an object
    let obj				//Returns null if nothing found
    url.substr(1).split("&").forEach(function(parm) {
      let [ p, v ] = parm.split('=')
      if (p) {				//Is this a real key (not leading gap before ?
        if (!obj) obj = {}		//Initialize object
        obj[p] = decodeURIComponent(v)
      }
    })
    return obj
  }  
}
