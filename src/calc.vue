//Calculator component
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
//- 
<template>
  <div class="wylib wylib-calc">
    <input :value="expr"/>
    <table>
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
import math from 'mathjs'

export default {
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
      this.expr = math.eval(this.expr)
      this.nextClear = true
    }
  }
}
</script>

<style>
.wylib-calc {
  border: 1px solid green;
  width: 100%;
  height: 100%;
}

.wylib-calc input {
  width: 94%;
  text-align: right;
  font-size: 1.25em;
  margin: 0.2em;
  height: 15%;
}

.wylib-calc table {
  height: 78%;
  width: 100%;
  table-layout: fixed;
}

.wylib-calc button {
  width: 100%;
  height: 100%;
}
</style>
