//Edit a financial transaction block
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X-   Individual lines with Reference, Memo, account, debit, credit
//X- Anchor other fields near top when description expands to multi-line
//X- Display a close button to remove a split
//X- On addSplit, default debit, credit to balancing amount
//X- On focus-in to debit or credit, default to, and highlight balancing amount
//X- On focus-out from debit or credit, math.eval(what is in the cell)
//X- Leave focus in Number field after adding new split
//X- Expand width on Enter and top + button
//- Use wyseman language data
//- Put this in a top-level to enter data in ledger
//- Disable enter button until:
//-   Only debit or credit filled out per split
//X-   Credits == debits (sum = 0)
//-   Then emit 'enter' event, return JSON structure of transaction
//- 
//- Later:
//- Make account selector widget popup on focus to those fields
//- 
//- 
<template>
  <div class="wylib wylib-trans">
    <div class="entries">
      <table>
        <tr class="header">
          <td/>
          <td>Date</td>
          <td>Description</td>
          <td v-if="!splitMode">Debit</td><td v-else/>
          <td v-if="!splitMode">Amount</td><td v-else/>
          <td v-if="!splitMode">Credit</td><td v-else>Sum</td>
        </tr>
        <tr class="data">
          <td/>
          <td><wylib-indate :style="bordStyle" class="date" size=11 v-model="trData.date" placeholder="Select date" title="The date the transaction is posted to"/></td>
          <td><div contenteditable :style="[fontStyle, bordStyle]" class="memo" @input="change($event,null,'memo')" v-html="trData.memo" title="A description of the transaction block"/></td>
          <td v-if="!splitMode"><input :style="bordStyle" size=12 v-model="trData.splits[0].account" title="The account that will be debited, or made more positive"/></td>
          <td v-else/>
          <td v-if="!splitMode"><input :style="bordStyle" class="numeric" size=12 v-model="trData.splits[0].debit" title="The amount of this transaction, assuming equal debit and credit"/></td>
          <td v-else/>
          <td v-if="!splitMode"><input :style="bordStyle" size=12 v-model="trData.splits[1].account" title="The account that will be credited, or made more negative"/></td>
          <td v-else><input disabled :style="bordStyle" class="numeric" size=12 :value="netSum" title="The total of debits, minus credits on this transaction so far"/></td>
        </tr>
        <tr>
          <td><button style="visibility: hidden;" title="Dummy to maintain spacing">+</button></td>
          <td v-if="!splitMode"><button class="widebutton" :disabled="!okToEnter" @click="enter" title="Process this transaction">Enter</button></td>
          <td v-else><button @click="addSplit" class="widebutton" title="Add another split line (credit or debit) to the transaction">+</button></td>
          <td><button class="widebutton" :disabled="splitMode && !canUnSplit" :style="splitStyle" @click="split" title="Allow for entry/editing of individual debits and credits">Split</button></td>
          <td v-if="!splitMode"><button class="widebutton" @click="cancel" title="Abort editing this transaction">Cancel</button></td>
        </tr>
        <tr v-if="splitMode" class="header">
          <td/><td>Number</td><td>Memo</td><td>Account</td><td>Debit</td><td>Credit</td>
        </tr>
        <tr v-if="splitMode" class="data" v-for="sp,idx in trData.splits" :key="idx">
          <td class="header"><button @click="delSplit(idx)" title="Remove this split from the transaction">-</button></td>
          <td><input ref="ref" :style="bordStyle" class="numeric" size=11 v-model="sp.ref" title="A check number, invoice number or other relevant reference for this split"/></td>
          <td><div contenteditable :style="[fontStyle, bordStyle]" class="memo" @input="change($event,idx,'memo')" v-html="memos[idx]" title="A description of this particular debit or credit in the transaction"/></td>
          <td><input :style="bordStyle" size=12 v-model="sp.account" title="The account this split will debit or credit"/></td>
          <td><input :style="bordStyle" class="numeric" size=12 v-model="sp.debit" @focus="focus($event, idx,'debit')" @blur="blur(idx,'debit')" title="Input a number here to debit this account"/></td>
          <td><input :style="bordStyle" class="numeric" size=12 v-model="sp.credit" @focus="focus($event, idx,'credit')" @blur="blur(idx,'credit')" @keyup.13="enter" title="Input a number here to credit this account"></td>
        </tr>
        <tr>
          <td v-if="splitMode"><button @click="addSplit" title="Add another split line to the transaction">+</button></td>
          <td v-if="splitMode" colspan="2"><button class="widebutton" :disabled="!okToEnter" @click="enter" title="Process this transaction">Enter</button></td>
          <td v-if="splitMode"><button class="widebutton" @click="cancel" title="Abort editing this transaction">Cancel</button></td>
        </tr>
      </table>
    </div>
    <div ref="subwindows" class="subwindows">
      <input ref="sampleInput" v-show=false>
<!--
      <textarea style="height: 300px; width: 200px;">
        Splits: {{ JSON.stringify(trData.splits,null,2) }}
      </textarea>
-->
    </div>
  </div>
</template>

<script>
const Com = require('./common.js')
const Icons = require('./icons.js')
//const Math = require('mathjs')
import InDate from './indate.vue'

export default {
  name: 'wylib-trans',
  components: {'wylib-indate': InDate},
  props: {
    config:	Array,
    state:	{type: Object, default: () => ({})},	//Fixme: use this
    env:	{type: Object, default: Com.envTpt},
  },
  data() { return {
//    pr:		require('./prefs'),
    splitMode:	false,
//    state:	{},
    trData:	{
      date: '2018-Feb-01',
      memo: 'Now is the time for all good men to come to the aid of their country',
      splits: [
        {ref: 12345, memo: 'This is a debit memo', account: '123.456.789', debit: 3456.78, credit: null},
        {ref: 98765, memo: 'This is a credit memo', account: '978.654.342', debit: null, credit: 2345.67},
    ]},
    inputFont: null,
    memos: [],
  }},
  computed: {
//    pr() {return this.env.pr},
    wm() {return this.env.wm},
    pr() {return this.env.pr},
    fontStyle() {return {font: this.inputFont}},
    bordStyle() {return {border: '1px solid ' + this.pr.winBorderColor}},
    splitStyle() {return {
      background: this.splitMode ? this.pr.butToggledColor : this.pr.butBackground,
    }},

    canUnSplit() {		//Can only unsplit under specific conditions
      let s = this.trData.splits
//console.log("Credit0:", s[0].credit, "Debit1:", s[1].debit)
      if ((s.length != 2) || s[0].credit || s[1].debit || !(s[0].debit == s[1].credit)) return false
      return true
    },

    okToEnter() {		//Transaction ready to be entered
      if (this.netSum != 0) return false
//Fixme: check dates and accounts all filled out here
      return true
    },

    netSum() {
      let sum = 0.0
      this.trData.splits.forEach(sp => {
        let debit = parseFloat(sp.debit || 0), credit = parseFloat(sp.credit || 0)
        sum += (debit - credit)
      })
      return Math.round(sum,2)
    },
  },
  methods: {
    split(ev) {
      if (!this.splitMode) this.splitMode = true; else if (this.canUnSplit) this.splitMode = false
    },

    enter(ev) {
console.log("Enter:", ev)		//Fixme: verify zero sum
    },
    cancel(ev) {			//Fixme: emit here?
console.log("Cancel:", ev)
    },

    addSplit() {
//console.log("Add Split:")
      let newSplit = {ref: null, memo: null, account: null, debit: null, credit: null}
      this.trData.splits.push(newSplit)

      let idx = this.trData.splits.length - 1
//console.log(" refs:", this.$refs, idx)
      this.$nextTick(() => {let el = this.$refs['ref'][idx]; if (el) el.focus()})
    },

    delSplit(idx) {
console.log("Delete Split:", idx)
      this.trData.splits.splice(idx, 1)
    },

    update() {			//Descriptions (contenteditable) are not reactive, so render them now
      this.trData.splits.forEach((rec,idx) => {
        this.memos[idx] = rec.memo
      })
    },

    change(ev, idx, field) {	//Grab changed value from (non-reactive) descriptions
//console.log("Change:", ev, idx, field)
      if (idx < 0) 
        this.trData[field] = ev.target.innerHTML
      else
        this.trData.splits[idx][field] = ev.target.innerHTML
    },

    focus(ev, idx, field) {		//When entering a debit or credit field
//console.log("Focus:", ev, idx, field)
      let sp = this.trData.splits[idx]
      if (!sp['credit'] && !sp['debit']) {
        if (field == 'debit' && this.netSum < 0) sp[field] = -this.netSum
        if (field == 'credit' && this.netSum > 0) sp[field] = this.netSum
      }
      if (sp[field]) this.$nextTick(() => ev.target.select())
    },

    blur(idx, field) {			//When leaving a debit or credit field
//console.log("Blur:", idx, field)
      let sp = this.trData.splits[idx]
      if (sp[field]) sp[field] = Math.round(Math.eval(sp[field]), 2)
    },
  },

  mounted: function() {
    this.inputFont = window.getComputedStyle(this.$refs.sampleInput, null).getPropertyValue('font')
    this.update()
  },
}
</script>

<style lang='less'>
  .wylib-trans {
// border: 1px solid blue; border-radius: 6px;
  }
  .wylib-trans table {
    table-layout: fixed;
    border-collapse: collapse;
  }
  .wylib-trans table th {
    text-align: left;
    padding: 2px 0 0 4px;
  }
  .wylib-trans table tr.header td {
//    border: 1px solid red;
    padding: 2px 4px 0 4px;
  }
  .wylib-trans table tr.data td {
    vertical-align: top;
//    border: 1px solid green;
  }
  .wylib-trans table td input {
    position: relative;
    top: 0;
    border-radius: 4px;
    padding: 3px;
  }
  .wylib-trans table td .memo {
    padding: 3px;
    border-radius: 4px;
  }
  .wylib-trans table td .widebutton {
    width: 100%;
  }
  .wylib-trans input.numeric {
    text-align: right;
  }
  .wylib-trans .description {
    font: 400 normal 11px system-ui;
    min-width: 16em;
  }
</style>
