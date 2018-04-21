//A grid implemented entirely in vue.  Sluggish and not very scalable.
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Get rid of red outlining on column drag
//X- Get rid of id=myTable (use ref instead)
//X- Make columns resizable
//X- Test with bigger data
//- Lock header, body, footer widths to greater of (header, body)
//- Event to resize height of body when outer container resizes
//- 
//- Add clusterize support
//- Configure fields as right-justified
//- Get sorting to work tri-state
//- Call native sort routine, or can re-fetch data from sort spec
//- 

<template>
  <div class="wylib wylib-mlb" :title="title">
    <div>
      {{ label }}:
    </div>
    <table ref="gridTable">
      <thead>
        <tr ref="gridHeaderRow">
          <th v-for="col in columns">
            <span @click="colClick(col.field)" class="wylib-mlb-dragger">
              {{ col.label }}
              <span class="arrow" :class="sortOrders[col.field] > 0 ? 'asc' : 'dsc'"/>
            </span>
            <span class="sizer" draggable=true v-on:dragstart="grab" v-on:drag="drag" v-on:dragend="drop">&nbsp</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody ref="gridColumns">
        <tr v-for="entry in filteredData">
          <td v-for="col in columns" style="position: relative;">
<!--            <div style="position: absolute; top:0px; left: 0px; width: inherit; white-space: nowrap; overflow: hidden;"> -->
              {{entry[col.field]}}
<!--            </div> -->
          </td>
        </tr>
      </tbody>
      <tfoot v-if="footerOn">
        <tr ref="gridFooterRow">
          <td v-for="col in columns">
              F: {{ col.label }}
          </td>
        </tr>
      </tfoot>
    </table>
    <button @click="alignColumns()">Align</button>
  </div>
</template>

<script>
import tableDragger from 'table-dragger'

export default {
  props: {
    label: null,
    title: null,
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
//    var sortOrders = {}
//    this.columns.forEach(function (col) {
//      sortOrders[col.field] = 1
//    })
    return {
      sortKey: '',
      sortOrders: {},
      grabX: null,
      grabWidth: null,
      footerOn: true
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  methods: {
    colClick: function (key) {
      this.sortKey = key
console.log("key: " + key + " val:" + this.sortOrders[key])
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    resize: function (key) {
//console.log("resize: " + key)
    },
    grab(ev) {
      this.grabX = ev.clientX;
      let parElem = ev.target.parentElement
      let padLeft = parseFloat(window.getComputedStyle(parElem, null).getPropertyValue('padding-left'))
      let padRight = parseFloat(window.getComputedStyle(parElem, null).getPropertyValue('padding-right'))
//console.log("Pad left: " + padLeft + " right: " + padRight)
      this.grabWidth = parElem.clientWidth - padLeft - padRight
//console.log("Grab: " + this.grabX + " Width: " + this.grabWidth)
    },
    drag(ev) {
      if (ev.clientX == 0 && ev.clientY == 0) return
      let deltaX = ev.clientX - this.grabX
      ev.target.parentElement.style.width = (this.grabWidth + deltaX) + 'px';
console.log("Delta: " + deltaX)
      this.alignColumns(true)
    },
    drop(ev) {
      this.alignColumns(true)
    },
    alignColumns(force = false) {	//Sync column, header and footer widths
      var headers = this.$refs.gridHeaderRow.childNodes;
      var columns = this.$refs.gridColumns.firstChild.childNodes;	//First row of data
      var footers = this.$refs.gridFooterRow.childNodes;
//console.log("Has H children: " + this.$refs.gridHeaderRow.hasChildNodes())
//console.log("    H children: " + JSON.stringify(headers))
//console.log("Has C children: " + this.$refs.gridColumns.hasChildNodes())
//console.log("    C children: " + JSON.stringify(columns))
//console.log("Has F children: " + this.$refs.gridFooterRow.hasChildNodes())
//console.log("    F children: " + JSON.stringify(footers))
      if (!headers || !columns) return
      for (let i = 0; i < headers.length; i++) {
        let hwid = parseInt(getComputedStyle(headers[i]).width)
        let cwid = parseInt(getComputedStyle(columns[i]).width)
console.log("Header: " + i + " Width: " + hwid + " Column: " + cwid)
        if (force || (hwid > cwid)) {
          let w = hwid + 'px'
console.log("Set columns to: " + w)
//w = '40px'
          columns[i].style.width = w
          columns[i].style.minWidth = w
//          columns[i].style.maxWidth = w
columns[i].style.background = 'lightyellow'
          footers[i].style.width = w
        } else {
          let w = cwid + 'px'
console.log("Set header to: " + w)
          headers[i].style.width = w
          footers[i].style.width = w
        }
      }
    }
  },
  beforeMount: function() {
//    this.$nextTick( function () {    
      this.columns.forEach( (col) => {
        this.sortOrders[col.field] = 1
      })
console.log("sortOrders:", JSON.stringify(this.sortOrders))
//    })
  },
  mounted: function() {
//    var el = document.getElementById('myTable')
    var dragger = tableDragger(this.$refs.gridTable, {
      dragHandler: '.wylib-mlb-dragger',
      animation: 1000
    })
    dragger.on('drop', function(from, to) {
      console.log("From: " + from)
      console.log("To: " + to)
    })
/*    this.alignColumns() */
  }
}
</script>

<style>
.wylib-mlb {
/*  max-height: 200px; */
}

.wylib-mlb table {
  border: 0px;
  background: #ccc;
  border-collapse: collapse;
/*  table-layout: fixed; */
}
.wylib-mlb thead, .wylib-mlb tbody, .wylib-mlb tfoot {
  display: table;
  table-layout: fixed;
}
.wylib-mlb thead th, .wylib-mlb tbody td, .wylib-mlb tfoot td {
  padding: .15em 2px .15em 2px;
  margins: 0px;
  height: 1em;
  border: 1px solid #ccc;
/*  overflow-x: hidden;
  white-space: nowrap; */
}
.wylib-mlb tbody {
  height: 140px;		/* Will need to be auto calculated */
  overflow-y: auto;
/*  overflow-x: hidden; */
  display: block;
}

.wylib-mlb th {
  background: linear-gradient(to top, #d4d4d4, #f0f0f0);
  text-align: left;
  position: relative;
  user-select: none;		/* Also taken care of in table-dragger */
}

.wylib-mlb tr:nth-child(odd) {
  background-color: #ffffff;
}
.wylib-mlb tr:nth-child(even) {
  background-color: #f4f4f4;
}

/* .wylib-mlb tbody td {
  overflow-x: hidden;
  text-overflow: ellipsis;
} */

.wylib-mlb-dragger {
/*  border: 1px solid red; */
/*  cursor: hand; */
}

.wylib-mlb th .arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 4px;
  border-left: 0.5em solid transparent;
  border-right: 0.5em solid transparent;
/*  background: white; */
}

.wylib-mlb th .sizer {
  display: inline;
/*  min-width: 2px; */
  width: 3px;
  min-height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 0px;
  cursor: col-resize;
}

.wylib-mlb th .sizer:hover {
  background-color: #88f;
}

.wylib-mlb th .arrow.non {
}
.wylib-mlb th .arrow.asc {
  border-bottom: 0.5em solid #222;
}
.wylib-mlb th .arrow.dsc {
  border-top: 0.5em solid #222;
}
</style>
