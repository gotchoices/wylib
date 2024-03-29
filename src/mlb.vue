//Multi-column list box / data grid component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Width calcs in auto-size (render into a hidden element, and measure it)
//- Can turn on/off footer row
//- Main widget menu
//- Native sort routine
//- Native summary routines
//- Custom formatters per column?
//- 
<template>
  <div class="wylib wylib-mlb" ref="root">
    <div v-once ref="gridTable" class="slickgrid-container" :style="{width: gridWidth}"></div>
  </div>
</template>

<script>
const { Grid, Data, Formatters, Plugins } = require('slickgrid-es6')
const Com = require('./common.js')
const Prefs = require('./prefs.js')
const ElementResize = require('element-resize-detector')
var elementResize = ElementResize({strategy: 'scroll'})
Prefs.mod('mlb', {
  mlbMinWidth:		{m:'mlb', d:20,		input:'number', min:1, max:100, step:1,	lang:'Minimum Width'},
  mlbMaxWidth:		{m:'mlb', d:200,	input:'number', min:1, max:500, step:1,	lang:'Maximum Width'},
  mlbDefWidth:		{m:'mlb', d:80,		input:'number', min:1, max:500, step:1,	lang:'Default Width'},
  mlbCharWidth:		{m:'mlb', d:10,		input:'number', min:1, max:16, step:1,	lang:'Character Width'},
})

var options = {
  enableCellNavigation: true,
  enableColumnReorder: true,
  multiColumnSort: true,
  syncColumnCellResize: true,
  createFooterRow: true,
  showFooterRow: true,		//Fixme: https://github.com/6pac/SlickGrid/blob/master/examples/example-footer-totals.html
  explicitInitialization: true,		//Init after plugins registered
//  autoHeight: true			//Disables scrolling
//  enableTextSelectionOnCells: true,	//Undesirable side effects (select all on right click?)
//  multiSelect: true,
//  autoEdit: false
}

export default {
  name: 'wylib-mlb',
  props: {
    state:	{type: Object, default: () => ({})},
    data:	{type: Array, default: () => []},
    config:	{type: Object, default: () => ({})},
    bus:	null,		//To receive commands from parent dbp
    env:	{type: Object, default: Com.envTpt},
  },
  data: function () {return {
    orderBoxes:		{},		//Div elements that show sort order in header field
    gridInstance:	null,		//Keep pointer to our grid
    stateTpt:		{footerOn: false, sorting: {}, columns: [], see: 'top', sortColumns: null},
  }},

  computed: {
    id() {return 'mlb_' + this.$.uid},
    pr() {return this.env.pr},
    slickColumns() {			//Convert wyseman column spec to what slickgrid expects
      let cols = []
//console.log("SlickColumns cols:", this.state.columns)
      if (this.state.columns === undefined) return cols		//If we are too early in the lifecycle to have data yet
      for (let field in this.config) {
        let conf = this.config[field]
          , col = this.state.columns.find(e => (e.field == field))
          , visible = col?.visible ?? true
        if (!col) continue
//console.log("field:", field, col?.width, conf.title, visible)
        if (visible) cols.push({	//Create the missing column
          id:		field,	field,		sortable:	true,	
          order:	col?.order,		width:		col?.width ?? 4,
          name:		conf.title,		toolTip:	field + '\n' + conf.help,	
          minWidth:	this.pr.mlbMinWidth,	
          cssClass:	conf.just ? 'align-' + conf.just : '',
          header: {
            buttons: [{cssClass: 'slick-header-column-order slick-header-column-field-' + field}]
          }
        })
      }
      cols.sort((a,b) => {return (a.order - b.order)})
//console.log("sorted: ", cols)
      return cols;
    },
    gridWidth() {
      if (this.state.columns === undefined) return 0	//If we are too early to have data yet
      let wid = this.state.columns.reduce((acc, el) => {
        return acc + (el.visible ? el.width : 0)
      }, 0)
//console.log("Width: ", wid)
      return wid + 4 + 'px'
    },
  },

  methods: {
    getSelection() {
      return this.gridInstance.getSelectedRows();
    },

    dblClickHandler(e, args) {
//console.log("DblClick: ", args.row, ", ", args.cell, " Sel: ", this.getSelection())
      this.$emit('execute', this.getSelection())
    },

    headerClickHandler(e, args) {
//console.log("Header Click: ", e, "field:", args.column.field)
      if (e.target.className == 'slick-resizable-handle') {
        if (args.column.clickTimer) {		//Detect a double click on the resize button
//console.log("  resize!")
          this.autoSize(args.column.field)
        } else {
          args.column.clickTimer = true
          setTimeout(()=>{args.column.clickTimer = false}, 200)
        }
      }
    },

    menuHandler(e) {
console.log("Context Menu: " + e.target)
      e.preventDefault()
      this.$emit('contextMenu', e)	//Fixme: would need same code as headerMenuHandler to pass idx
    },
    
    headerMenuHandler(e) {
      e.preventDefault()
      let head = e.target.closest('.slick-header-column')		//header above me
        , ord = head.querySelector('.slick-header-column-order')	//custom button below that
        , idx = null
      for (let i = 0; i < ord.classList.length; i++) {			//hack way to find this column field name
        if (/^slick-header-column-field-/.test(ord.classList[i])) {idx = ord.classList[i].replace('slick-header-column-field-','')}
      }
      let mlbBox = this.$refs.root?.getBoundingClientRect()
//console.log("Header Menu:", e, "Index:", idx, mlbBox, e.clientX, e.clientY)
      this.$emit('headerMenu', e, idx, e.clientX - parseInt(mlbBox.x), e.clientY - parseInt(mlbBox.y))
    },
    
    updateSortNumbers() {			//Update the numbers in our custom order boxes
      let cols = this.gridInstance.getSortColumns(), i = cols.length
//console.log("Update sort:", cols)
      Object.keys(this.orderBoxes).forEach(key => {
        if (this.orderBoxes[key]) this.orderBoxes[key].innerHTML = ''
      })
      if (i > 1) cols.forEach(rec => {
//console.log("  field:", rec.columnId, i)
        this.orderBoxes[rec.columnId].innerHTML = i--
      })
    },
    
    sortHandler(e, args) {			//Called when we re-sort
      let { multiColumnSort, sortCols, grid } = args
//console.log("Mlb sortHandler: ", multiColumnSort, JSON.stringify(this.state.sortColumns))
      this.state.sortColumns = Com.clone(grid.getSortColumns())
//console.log("  sortHandler: ", JSON.stringify(this.state.sortColumns))
//      this.updateSortNumbers()		//Will catch from watch state.sortColumns
//      this.$emit('sort', this.state.sortColumns)
    },

    resizeHandler(e, args) {			//Handle a column resize
//console.log("Resized:", e, "Args:", args)
      for(let i = 0, cols = args.grid.getColumns().length; i < cols; i++) {
        let col = args.grid.getColumns()[i]
        if (!col.previousWidth || col.width != col.previousWidth) {
//console.log(" setting:", col.field)
          this.state.columns.find(e => (e.field == col.field)).width = col.width
        }
      }
      this.$emit('geometry', e)
    },

    reorderHandler(e, args) {			//Called after dragging a column
//console.log("Reordered:", e, "Args:", args)
      let i = 0
      args.grid.getColumns().forEach(c => {
        this.state.columns.find(e => (e.field == c.field)).order = i++
      })
//console.log(" cols:", JSON.stringify(this.state.columns))
      this.$emit('geometry', e)
    },

    winSizeHandler(el) {			//Called when our container gets resized
//console.log("Window resize:", el.style.height)
      let height = parseInt(el.getBoundingClientRect().height)
        , table = this.$refs.gridTable
      if (table && table.style) table.style.height = height + 'px'	//Set height of grid div to fill available space
      this.gridInstance.resizeCanvas()				//Let slickgrid know about it
    },

    see(line) {					//Make a certain line visible
      let i = this.gridInstance
//console.log("Mlb see:", line)
      if (!i) return
      if (line) 
        i.scrollRowIntoView(line, false)
      else if (this.state.see == 'top')
        i.scrollRowIntoView(0, false)
      else
        i.scrollRowIntoView(this.data.length, true)
    },

    advance(delta = 1) {			//Move current line forward or backward
      let sel = this.getSelection()[0], was = (sel == null ? -1 : sel), line = was
      line = line + delta
//console.log("Advance:", delta, was, sel, line)
      if (line < 0) line = 0
      if (line >= this.data.length) line = this.data.length - 1
      if (line != was) {
        this.gridInstance.setSelectedRows([line])
        this.$emit('execute', this.getSelection())
        return line
      }
    },

    autoSize(field) {			//Move current line forward or backward
      let idx = this.state.columns.findIndex(e => (e.field == field))
        , maxLen = 2
        , aCell = this.$refs.root?.querySelector('.slick-cell')
        , fontSize = aCell ? parseFloat(window.getComputedStyle(aCell, null).getPropertyValue('font-size')) : 16
//console.log("Mlb autosize:", field, idx, fontSize)
      for (let dat of this.data) {
        let content = dat[field]
          , len = content ? content.toString().length : 0
        if (len > maxLen) maxLen = len
      }
//console.log("  maxLen:", maxLen, fontSize, this.pr.mlbMaxWidth)
      this.state.columns[idx].width = Math.min((maxLen+1) * fontSize * 0.48, this.pr.mlbMaxWidth)	//Estimate of width/font size
    },

    checkFields() {			//Compare fields in state with fields in config
//console.log("Check fields:")
      for (let field in this.config) {
        let conf = this.config[field]
          , col = this.state.columns.find(e => (e.field == field))
          , visible = col?.visible ?? true
        if (!col) {					//Add any missing column using defaults
//console.log(" add:", field)
          col = {field, order:conf.order, width:conf.width || this.pr.mlbDefWidth, visible}
          this.state.columns.push(col)
        }
      }
      this.state.columns.forEach((col,idx)=>{		//Get rid of any columns not described in config
//console.log("  drop: ", col.field)
        if (!(col.field in this.config)) this.state.columns.splice(idx,1)
      })
    },
  },

  watch: {
    'state.see': function (val) {this.see()},
    'state.footerOn': function (val) {
//console.log("Footer:", this.state.footerOn, val)
      this.gridInstance.setOptions({showFooterRow: val})
//      this.gridInstance.setOptions({showFooterRow: val, createFooterRow: true})
      this.gridInstance.resizeCanvas()
    },
    'state.sortColumns': function (newVal, oldVal) {	//In case change came from state update
      let newStr = JSON.stringify(newVal)
        , oldStr = JSON.stringify(oldVal)
//console.log("Watched sortColumns changed:", newStr != oldStr, oldStr, newStr)
      this.updateSortNumbers()
      if (newVal && newStr != oldStr) {
        this.gridInstance.setSortColumns(Com.clone(this.state.sortColumns))
        this.$emit('sort', this.state.sortColumns)
      }
    },
    'state.columns': function (val) {
      this.checkFields()
    },
    'config': function (val) {
      this.checkFields()
    },
    'slickColumns': function (val) {
      let i = this.gridInstance
//console.log("Watched slickColumns changed")
      if (!i) return
      i.setColumns(this.slickColumns)
      let headers = this.$refs.gridTable.querySelector('.slick-header')
      this.state.columns.forEach( col => {	//Find and remember all the divs holding sort order numbers
        let field = col.field
          , sortBox = headers.querySelector('.slick-header-column-field-' + field)
        if (sortBox) this.orderBoxes[field] = sortBox
//console.log(" field: " + field + " Box: ", this.orderBoxes[field])
      })
    },
    'gridWidth': function (val) {
      let gt = this.$refs.gridTable
      if (gt?.style) gt.style.width = this.gridWidth
    },

    data: function (val) {		//Reload grid when data changes
//console.log("Watched data changed: ", val)
      this.gridInstance.setData(val, false)
      this.see()
      this.gridInstance.render();
    },
  },

  created: function() {			//console.log("Mlb created:")
    this.checkFields()
  },

  beforeMount: function() {		//console.log("Mlb before, state:", this.id, this.state, this.$refs)

    if (this.bus) this.bus.register(this.id, (msg, data) => {
      if (msg == 'advance') return this.advance(data)
      else if (msg == 'autosize') return this.autoSize(data)
    })
//    for (let field in this.config) {
//      let con = this.config[field]
//      let visible = con.visible === undefined ? true: con.visible
//      if (!this.state.columns.find(e => (e.field == field)))	//Make sure we have a column for all known fields
//        this.state.columns.push({field, order:con.order, width:con.width || this.pr.mlbDefWidth, visible})
//    }
  },

  mounted: function() {
//console.log("Mlb mounted, state:", this.id, this.state, this.$refs);
    Com.stateCheck(this)
    elementResize.listenTo(this.$refs.root, this.winSizeHandler)	//Event when our component div size gets changed
  
    this.$refs.gridTable.style.height = '200px'			//Init to some known height, for now
//console.log("data: " + JSON.stringify(this.data))
    let gi = this.gridInstance = new Grid(this.$refs.gridTable, this.data, this.slickColumns, options)
    gi.setSelectionModel(new Plugins.RowSelectionModel())
    gi.registerPlugin(new Plugins.HeaderButtons())		//For showing sort order
    gi.setOptions({showFooterRow: this.state.footerOn})
    gi.init()

    gi.onContextMenu.subscribe(this.menuHandler)
    gi.onSort.subscribe(this.sortHandler)
    gi.onDblClick.subscribe(this.dblClickHandler)
    gi.onHeaderClick.subscribe(this.headerClickHandler)
    gi.onColumnsResized.subscribe(this.resizeHandler)
    gi.onColumnsReordered.subscribe(this.reorderHandler)
    gi.onHeaderContextMenu.subscribe(this.headerMenuHandler)	//Prevent annoying right-click behavior on header fields
    if (this.state.sortColumns) {				//Initialize sort column display
      gi.setSortColumns(Com.clone(this.state.sortColumns))
      this.updateSortNumbers
    }
//console.log("Mlb sorting:", this.state.sortColumns)
  },

  beforeUnmount: function() {
    elementResize.removeListener(this.$refs.root, this.winSizeHandler)
  }
}
</script>

<style lang='scss'>
  $grid-border-color: #a0a0a0;
  $grid-border-style: solid;
  $grid-header-background: #d8d8d8;

  $grid-cell-color: #f0f0fc;
  $grid-cell-color-odd: #fafaff;
  $grid-cell-selected-color: #e8e8ff;

  $cell-padding-top: 4px;
  $cell-padding-right: 4px;
  $cell-padding-bottom: 4px;
  $cell-padding-left: 4px;

  @import './slick.grid.scss';
  @import './slick.theme.scss';

  .wylib-mlb {
//    border: 1px solid green;
    height: 100%;
    max-width: 80vw;
  }
  .wylib-mlb .slickgrid-container {
//    border: 1px solid red;
//    width: auto;
  }
  .wylib-mlb .align-right {
    text-align: right;
  }
  .wylib-mlb .align-center {
    text-align: center;
  }
  .wylib-mlb .align-left {
    text-align: left;
  }
</style>
