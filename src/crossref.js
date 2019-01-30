//Class for supporting a custom cross-reference HTML tag
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//- 
const Attrs = ['name', 'value']
module.exports = class extends HTMLElement {
  static get observedAttributes() {return Attrs}
  
  constructor() {
    super()
//console.log('xConst n:', this.name, 'v:', this.value)
    Attrs.forEach(att=>{		//Establish attribute setters/getters
      Object.defineProperty(this, att, {
        get: function() {return this.getAttribute(att)},
        set: function(val) {
          if (val) this.setAttribute(att, val); else this.removeAttribute(att)
        }
      })
    })
    let shadowRoot = this.attachShadow({mode: 'open'})
      , shadowSpan = document.createElement('span')	//Our actual display element
    shadowRoot.appendChild(shadowSpan)
    this.update()
  }
  
  update() {
    let dispEl = this.shadowRoot.firstChild
    if (this.value)
      dispEl.innerText = this.value
    else
      dispEl.innerHTML = this.innerHTML
  }

  connectedCallback() {
    let ev = new CustomEvent('connect', {bubbles: true, detail: {name:this.name, value:this.value}})
//console.log('xConn n:', this.name, 'v:', this.value)
    this.update()
    this.dispatchEvent(ev)
  }

  disconnectedCallback() {
//console.log('xDisc n:', this.name, 'v:', this.value)
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    let ev = new CustomEvent('change', {detail: {attrName, newValue, oldValue}})
//console.log('xChange', attrName, oldValue, newValue)
    this.update()
    this.dispatchEvent(ev)
  }
}
