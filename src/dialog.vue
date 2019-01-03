//Query dialog component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Make it work under a toplevel window
//- Keepopen status of buttons should be a config status--not the handler return value
//- Test under a modal frame
//-
<template>
  <div class="wylib wylib-dialog">
    <div class="title" v-html="reason + ': ' + message" :title="help"/>
    <wylib-mdew :config="state.dews" :data="state.data" @input="change" @submit="submit"/>
    <div class="buttons">
      <button v-for="but in buttons" :key="but.tag" @click="press(but.tag)" v-html="but.lang ? but.lang.title : '?'" :title="but.lang ? but.lang.help : 'Confirm'"/>
    </div>
  </div>
</template>

<script>
import Com from './common.js'
import Mdew from './mdew.vue'
import Wyseman from './wyseman.js'

export default {
  name: 'wylib-dialog',
  components: {'wylib-mdew': Mdew},
  props: {
    state:	{type: Object, default: () => ({})},
  },
  data() { return {
    pr:		require('./prefs'),
    wm:		{},
    stateTpt:	{message: Com.langTemplate, buttons: ['diaOK'], dews: [], data: {}, tag:'dialog'},
  }},

  computed: {
    id: function() {return 'dialog_' + this._uid + '_'},
    message: function() {
      if (typeof this.state.message == 'string') return this.state.message
      if (typeof this.state.message == 'object') return this.state.message.title
    },
    help: function() {
      if (typeof this.state.message == 'object') return this.state.message.help
    },
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
  },

  methods: {
    submit() {
//console.log("Modal submit")
      this.press('diaYes')
    },
    press(tag) {
//console.log("Button:", tag, this.state)
      if (this.state.cb)		//Callback for the dialog; Will not be persistent across reloads!
        this.state.cb(tag)
      this.$parent.$emit('submit', tag, this.state.tag, this.state.data)
    },
    change(value, field, dirty, valid) {	//When data changed
//console.log("Dialog press:", field, value, dirty, valid, this.state.data[field])
      this.state.data[field] = value
    },
  },

  created: function() {
    Wyseman.register(this.id+'wm', 'wylib.data', (data) => {this.wm = data.msg})
  },

  beforeMount: function() {
    Com.stateCheck(this)
//console.log("Dialog state:", this.state)
    this.$parent.$emit('customize', this.wm.dia, 'dia:'+ this.state.tag)
  },
}
</script>

<style lang='less'>
//  .wylib-dialog {
//  }
  .wylib-dialog .buttons {
    padding:	5px;
    width:	100%;
    text-align: right;
//border: 1px solid red;
  }
  .wylib-dialog .title {
    padding: 10px 10px 10px 4px;
  }
  .wylib-dialog .buttons button {
    margin: 0 2px 0 2px;
  }
</style>
