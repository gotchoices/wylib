//Query dialog component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Make it work under a toplevel window
//-Did report.vue obsolete the iframe/component stuff?
//-
//- Keepopen status of buttons should be a config status--not the handler return value
//- Test under a modal frame
//-
<template>
  <div class="wylib wylib-dialog">
    <div v-if="message && reason" class="title" v-html="reason + ': ' + message" :title="help"/>
<!--
    <component ref="component" v-if="state.component" :is="'wylib-'+stateVar('component','type')" :state="stateVar('component','state')" @submit="submit"/>
    <iframe ref="iframe" v-if="state.iframe" :src="stateVar('iframe','src')" :name="stateVar('iframe','name')" :height="stateVar('iframe','width','100%')"/>
-->
    <wylib-mdew v-if="state.dews" :config="state.dews" :env="env" :data="state.data" @input="change" @submit="submit"/>
    <div v-if="buttons" class="buttons">
      <button v-for="but in buttons" :disabled="!but.able" :key="but.tag" @click="submit($event,but.tag)" v-html="but.lang ? but.lang.title : '?'" :title="but.lang ? but.lang.help : 'Confirm'"/>
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const Wyseman = require('./wyseman.js')
import Mdew from './mdew.vue'
import Strdoc from './strdoc.vue'

const WmDefs = {		//English defaults, as we may not yet be connected
  diaQuery:	{title:'Query', help:'Please provide your input'},
  diaCancel:	{title:'Cancel', help:'Dismiss the query'},
  diaConfirm:	{title:'Confirm', help:'Asking for user confirmation of notice'},
  diaError:	{title:'Error', help:'Confirm the error message'},
  diaYes:	{title:'Yes', help:'Answer affirmatively'},
  diaOK:	{title:'OK', help:'Confirm dialog'},
}

export default {
  name: 'wylib-dialog',
  components: {'wylib-mdew': Mdew, 'wylib-strdoc': Strdoc},
  props: {
    state:	{type: Object, default: () => ({})},
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
    valid:	true,
    stateTpt:	{message: Com.langTpt, buttons: ['diaOK'], dews: null, data: {}, tag:'dialog', iframe:null, component:null, check:null},
  }},

  computed: {
    id() {return 'dialog_' + this._uid + '_'},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    message() {
      let msg = this.state.message
      if (typeof msg == 'string') return msg
      if (msg && typeof msg == 'object' && 'title' in msg)
        return msg.title
    },
    reason() {
      let wmReason = this.wm[this.state.reason]
      return (wmReason ? wmReason.title : this.state.reason) || 'Notice'
    },
    help() {
      if (typeof this.state.message == 'object') return this.state.message.help
    },
    buttons() {
      let butArr = []
//console.log("Buttons:", this.state.buttons)
      if (this.state.buttons) this.state.buttons.forEach(b=>{
        let rec = b
        if (typeof b == 'string')
          rec = {tag: b, lang: this.wm[b] || {title:b}}
//        else if (rec.tag && !rec.lang && this.wm[rec.tag])	//Not sure we use this case
//          rec.lang = this.wm[rec.tag]
        rec.able = (rec.tag == 'diaCancel' || this.valid)
        butArr.push(rec)
      })
      return butArr
    },
  },

  methods: {
    stateVar(sub1, sub2, def) {
      return (this.state[sub1] ? this.state[sub1][sub2] : def)
    },
    submit(ev, butTag = 'diaYes', data = this.state.data) {
//console.log("Dia submit:", ev, butTag, data)
      if (!this.valid) return
      if (this.state.cb)			//Callback for the dialog; Will not be persistent across reloads!
        this.state.cb(butTag, data)

      this.$parent.$emit('submit', ev, butTag, this.state.tag, data)	//wylib-win with dialog in slot needs this
      this.$emit('submit', ev, butTag, this.state.tag, data)		//dialog in pop uses this
    },
    change(value, field, dirty, valid) {	//When data changed
      let checked = true
//console.log("Dialog press:", field, value, dirty, valid, this.state.data[field])
      this.state.data[field] = value
      if (this.state.check && typeof this.state.check == 'function')
        checked = this.state.check(this.state.data)
      this.valid = (checked && valid)
    },
  },

  created: function() {
    Wyseman.langDefs(this.env.wm, WmDefs)
  },

  beforeMount: function() {
    Com.stateCheck(this)
//console.log("Dialog state:", this.state)
    this.$parent.$emit('customize', this.state.report ? this.wm.diaReport : this.wm.diaDialog, 'dia:'+ this.state.tag, this.state.iframe != null)
  },

  beforeDestroy: function() {
//console.log("Dialog destroy:", this.state)
    this.state.destroyed = true			//At least report module needs to know
  },
}
</script>

<style lang='less'>
  .wylib-dialog {
    height: 100%;
//    border: 1px solid green;
  }
  .wylib-dialog .buttons {
    padding:	5px;
    width:	100%;
    text-align: right;
  }
  .wylib-dialog .title {
    padding: 10px 10px 10px 4px;
//border: 1px solid violet;
  }
  .wylib-dialog iframe {
    width: 100%;
    height: 100%;
    border: 0;
//border: 1px solid red;
  }
  .wylib-dialog .buttons button {
    margin: 0 2px 0 2px;
  }
</style>
