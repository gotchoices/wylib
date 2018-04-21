//Modal dialog component
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Buttons emit events to close window, return result
//X- Can post from function, execute callback on result
//X- Configurable for any number of other buttons
//X- Returns user response
//- Can display any arbitrary number of editing fields
//- Returns user input
//-
//- Later: 
//- Optionally expands to mask whole browser window?
//- 
<template>
  <div class="wylib wylib-modal" :style="screenStyle">
    <div class="dialog" :style="dialogStyle">
      <div v-html="reason + ': ' + state.message"/>
      <wylib-mdew :state="state.dews" :data="modalData"/>
      <div class="buttons">
        <button v-for="but in buttons" :key="but.tag" @click="press(but.tag)" v-html="but.lang ? but.lang.title : 'OK'" :title="but.lang ? but.lang.help : 'Confirm'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import Mdew from './mdew.vue'
import Wyseman from './wyseman.js'

export default {
  name: 'wylib-modal',
  components: {'wylib-mdew': Mdew},
  props: {
    state:	{type: Object, default: () => ({})},
  },
  data() { return {
    pr:		require('./prefs'),
    wm:		{},
    modalData:	{},
  }},

  computed: {
    id: function() {return 'modal_' + this._uid + '_'},
    buttons: function() {
      let butArr = []
//console.log("Buttons:", this.state.buttons)
      if (this.state.buttons) this.state.buttons.forEach((b) => {
        if (typeof b == 'string' && this.wm[b])
          butArr.push({tag: b, lang: this.wm[b]})
        else if (b.tag && !b.lang && this.wm[b])
          butArr.push({tag: b.tag, lang: this.wm[b]})
        else
          butArr.push(b)
      })
      return butArr
    },
    reason: function() {
      let wmReason = this.wm[this.state.reason]
      return (wmReason ? wmReason.title : this.state.reason) || 'Notice'
    },
    screenStyle: function() {return {
      display:		this.state.posted ? 'flex' : 'none',
    }},
    dialogStyle: function() {return {
      background:	this.pr.dataBackground,
      borderColor:	this.pr.winHighlightColor,
      borderWidth:	this.pr.winBorderWidth
    }},
  },

  methods: {
    press(tag) {
console.log("Button:", tag, this.state.affirm)
      this.$emit('press')
      this.state.posted = false		//Unpost our menu
      let butRec = this.state.buttons.find(e=>(e.tag==tag))
      if (butRec && butRec.cb)
        butRec.cb(tag == this.state.affirm, tag)
      else if (this.state.cb)
        this.state.cb(tag == this.state.affirm, tag)
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
  },

  beforeMount: function() {
    Com.react(this, {posted: false, buttons: ['modOK'], affirm: 'modOK'})
  },
}
</script>

<style lang='less'>
  .wylib-modal {
    position:	absolute;
    justify-content: center;
    align-items: center;
    min-width:	100%;
    min-height:	100%;
    left:	0;
    top:	0;
    background: rgba(230,230,230,0.5);
    z-index:	2;
//border: 1px solid red;
  }
  .wylib-modal .dialog {
    position:	relative;
    flex: 0 0 auto;
    min-width:	50%;
    max-width:  90%;
    padding:	5px;
    border-radius: 6px;
    border-style: solid;
  }
  .wylib-modal .buttons {
    padding:	5px;
    width:	100%;
    text-align: right;
//border: 1px solid red;
  }
  .wylib-modal .buttons button {
    margin: 0 2px 0 2px;
  }
</style>
