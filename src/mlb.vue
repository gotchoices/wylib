//Multi-column list box / data grid component
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Settable callback to execute on double click
//X- Show priority number by column sort arrow
//X- Menu shows atop data fields
//X- Integrate state variable
//X-   Visible columns
//X-   Columns widths
//X-   Column order
//X- Right click column menu
//X- Get rid of height prop?
//X- Automatically adapt scroll height to the height of the container
//-   Hide this column
//-   Autosize this column
//-   Set/clear individual column visibility
//- Clear icon to remove all rows
//- 
//- Level 2:
//- Auto-size column width
//- Can turn on/off footer row
//- Can query sort columns and priority
//- Main widget menu
//- Can show/hide columns
//- 
//- Level 3:
//- Native sort routine
//- Native summary routines
//- 

<template>
  <div class="wylib wylib-mlb">
    <div v-once ref="gridTable" class="slickgrid-container"></div>
  </div>
</template>

<script>
import Com from './common.js'
import { Grid, Data, Formatters, Plugins } from 'slickgrid-es6'
import ElementResize from 'element-resize-detector'
var elementResize = ElementResize({strategy: 'scroll'})

var options = {
  enableCellNavigation: true,
  enableColumnReorder: true,
  multiColumnSort: true,
  syncColumnCellResize: true,
  createFooterRow: true,
  showFooterRow: false,		//Fixme: https://github.com/6pac/SlickGrid/blob/master/examples/example-footer-totals.html
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
    bus:	null,
  },
  data: function () {return {
    orderBoxes:   {},		//Div elements that show sort order in header field
    gridInstance: null,
  }},

  computed: {
    id: function() {return 'mlb_' + this._uid + '_'},
  },

  methods: {
    slickColumns() {		//Convert wylib column spec to what slickgrid expects
      let cols = []
      let sorted = this.state.columns.slice(0)		//Make a copy
      sorted.sort(function(a,b) {return (a.order - b.order)})
//console.log("Sorted cols:", sorted)
      sorted.forEach( function(elem) {
        if (('visible' in elem) && !elem.visible) return
//console.log("Sort col:", JSON.stringify(elem))
        cols.push({
          id:		elem.field, 
          field:	elem.field, 
          name:		elem.title, 
          toolTip:	elem.help, 
          sortable:	true,
          minWidth:	20,
          width:	elem.width || 80,
          cssClass:	elem.just ? 'align-' + elem.just : '',
          header: {
            buttons: [{cssClass: 'slick-header-column-order slick-header-column-field-' + elem.field}]
          }
        })
      })
//console.log("cols: " + JSON.stringify(cols))
      return cols;
    },
    
    getSelection() {
      return this.gridInstance.getSelectedRows();
    },

    dblClickHandler(e,args) {
//console.log("DblClick: " + args.row + ", " + args.cell + " Sel: " + this.getSelection())
      this.$emit('execute', this.getSelection())
    },

    menuHandler(e) {
console.log("Context Menu: " + e.target)
      e.preventDefault()
    },
    
    headerMenuHandler(e) {
      e.preventDefault()
      let head = e.target.closest('.slick-header-column')		//header above me
      let ord = head.querySelector('.slick-header-column-order')	//custom button below that
      let idx = null
      for (let i = 0; i < ord.classList.length; i++) {			//hack way to find this column field name
        if (/^slick-header-column-field-/.test(ord.classList[i])) {idx = ord.classList[i].replace('slick-header-column-field-','')}
      }
      let mlbBox = this.$el.getBoundingClientRect()
//console.log("Header Menu:", e, "Index:", idx, mlbBox, e.clientX, e.clientY)
      this.$emit('headerMenu', e, idx, e.clientX - parseInt(mlbBox.x), e.clientY - parseInt(mlbBox.y))
    },
    
    updateSortNumbers() {
      let cols = this.gridInstance.getSortColumns(), i = cols.length
      Object.keys(this.orderBoxes).forEach(key => {this.orderBoxes[key].innerHTML = ''})
      if (i > 1) cols.forEach(rec => {
        this.orderBoxes[rec.columnId].innerHTML = i--
      })
    },
    
    sortHandler(e, args) {
      let { multiColumnSort, sortCols, grid } = args
//console.log("Sort columns: ", multiColumnSort, sortCols)
      this.state.sortColumns = grid.getSortColumns()
      this.updateSortNumbers()
      this.$emit('sort', this.state.sortColumns)
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

    reorderHandler(e, args) {
//console.log("Reordered:", e, "Args:", args)
      let i = 0
      args.grid.getColumns().forEach(c => {
        this.state.columns.find(e => (e.field == c.field)).order = i++
      })
//console.log(" cols:", JSON.stringify(this.state.columns))
      this.$emit('geometry', e)
    },

    winSizeHandler(el) {
//      let el = ev.target
//console.log("Window resize:", el.style.height)
      let height = parseInt(el.getBoundingClientRect().height)
      this.$refs.gridTable.style.height = height + 'px'		//Change height of grid div
      this.gridInstance.resizeCanvas()				//Let slickgrid know about it
    },

    see(line) {							//Make a certain line visible
      if (line) 
        this.gridInstance.scrollRowIntoView(line, false)
      else if (this.state.see == 'top')
        this.gridInstance.scrollRowIntoView(0, false)
      else
        this.gridInstance.scrollRowIntoView(this.data.length, true)
    },

    advance(delta = 1) {
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
  },

  watch: {
    'state.see': function (val) {this.see()},
    'state.columns': function (val) {
//console.log("Watched columns changed")
      this.gridInstance.setColumns(this.slickColumns())
      let headers = this.$refs.gridTable.querySelector('.slick-header')
      this.state.columns.forEach( col => {	//Find and remember all the divs holding sort order numbers
        let field = col.field
        this.orderBoxes[field] = headers.querySelector('.slick-header-column-field-' + field)
//console.log(" field: " + field + " Box: ", this.orderBoxes[field])
      })
    },

    data: function (val) {		//Reload grid when data changes
//console.log("Watched data changed: " + JSON.stringify(val))
      this.gridInstance.setData(val, false)
      this.see()
      this.gridInstance.render();
    },
  },

  beforeMount: function() {
//console.log("Mlb before, state:", this.id, this.state);
    Com.react(this, {FooterOn: false, sorting: {}, columns: [], see: 'top', sortColumns: null})
    if (this.bus) this.bus.register(this.id, (msg, data) => {
      if (msg == 'advance') return this.advance(data)
    })
  },

  mounted: function() {
    elementResize.listenTo(this.$el, this.winSizeHandler)
  
    this.$refs.gridTable.style.height = '200px'			//Init to some known height, for now
//console.log("data: " + JSON.stringify(this.data))
    let gi = this.gridInstance = new Grid(this.$refs.gridTable, this.data, this.slickColumns(), options)
    gi.setSelectionModel(new Plugins.RowSelectionModel())
    gi.registerPlugin(new Plugins.HeaderButtons())		//For showing sort order
    gi.init()

    gi.onContextMenu.subscribe(this.menuHandler)
    gi.onSort.subscribe(this.sortHandler)
    gi.onDblClick.subscribe(this.dblClickHandler)
    gi.onColumnsResized.subscribe(this.resizeHandler)
    gi.onColumnsReordered.subscribe(this.reorderHandler)
    gi.onHeaderContextMenu.subscribe(this.headerMenuHandler)	//Prevent annoying right-click behavior on header fields
    if (this.state.sortColumns) {
      gi.setSortColumns(this.state.sortColumns)
      this.updateSortNumbers
    }
  },

  beforeDestroy: function() {
    elementResize.removeListener(this.$el, this.winSizeHandler)
  }
}
</script>

<style lang='less'>
  @grid-border-color: #a0a0a0;
  @grid-border-style: solid;
  @grid-header-background: #d8d8d8;

  @grid-cell-color: #f0f0f0;
  @grid-cell-color-odd: #fafaff;
  @grid-cell-selected-color: #e8e8ff;

  @cell-padding-top: 4px;
  @cell-padding-right: 4px;
  @cell-padding-bottom: 4px;
  @cell-padding-left: 4px;
  
  @import './slick.grid.less';
  @import './slick.theme.less';

  .wylib-mlb {
//    border: 1px solid green;
    height: 100%;
  }
//  .wylib-mlb .slickgrid-container {
//    border: 1px solid red;
//  }
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
