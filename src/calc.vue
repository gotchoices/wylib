//Calculator component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
//- 
<template>
  <div class="wylib wylib-calc">
    <input :value="expr"/>
    <table class="keypad">
      <tr>
        <td><button @click="input('(')">(</button></td>
        <td><button @click="input(')')">)</button></td>
        <td><button @click="percent()">%</button></td>
        <td><button @click="clear()">C</button></td>
      </tr>
      <tr>
        <td><button @click="input('7')">7</button></td>
        <td><button @click="input('8')">8</button></td>
        <td><button @click="input('9')">9</button></td>
        <td><button @click="input('/',true)">/</button></td>
      </tr>
      <tr>
        <td><button @click="input('4')">4</button></td>
        <td><button @click="input('5')">5</button></td>
        <td><button @click="input('6')">6</button></td>
        <td><button @click="input('*',true)">x</button></td>
      </tr>
      <tr>
        <td><button @click="input('1')">1</button></td>
        <td><button @click="input('2')">2</button></td>
        <td><button @click="input('3')">3</button></td>
        <td><button @click="input('-',true)">-</button></td>
      </tr>
      <tr>
        <td><button @click="input('0')">0</button></td>
        <td><button @click="input('.')">.</button></td>
        <td><button @click="equal()">=</button></td>
        <td><button @click="input('+',true)">+</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
const math = require('mathjs')

export default {
  name: 'wylib-calc',
  props: {
    value: '',
  },
  data() { return {
    expr: '',
    nextClear: true
  }},
  methods: {
    input(c, oper = false) {
      if (this.nextClear && !oper) this.clear()
      this.nextClear = false
      this.expr += c
    },
    clear() {
      this.expr = ''
      this.nextClear = false
    },
    equal() {
      this.expr = math.evaluate(this.expr)
      this.nextClear = true
    }
  }
}
</script>

<style>
.wylib-calc {
  border: 1px solid green;
}

.wylib-calc input {
  width: 94%;
  text-align: right;
  font-size: 1.25em;
  margin: 0.2em;
  height: 15%;
}

.wylib-calc table {
  table-layout: fixed;
}

.wylib-calc table.keypad {
  width: auto;
}

.wylib-calc table button {
  width: 3em;
  height: 1.5em;
}
</style>
