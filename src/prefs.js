//A global object to maintain preferences across an application
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Fill in default text descriptions
//X- Build object of preferences when launched
//X- Make routine to build menu items for editing prefs
//X- Generate pull-down to select supported languages from menu
//X-   Language changes in one step--not a character at a time
//X-   Call wyseman.newLanguage with new language setting, app updates reactively
//X-   How does prefs call to refill wyseman cache when language changes?
//- Can the pref field descriptions pull from the database?
//- Defer building Prefs until init explicitly called (which includes saved prefs)
//- Create initialize routine
//-   Fills in any missing properties from default structure
//- Should start with an empty config
//-   Modules should supply their own prefs for the array (including app)
//- Prefs are saved with app state

const Wyseman = require('./wyseman.js')
const Config = {
  language:		{m:'app', d: 'eng',	input:'text', special:'scm', data: 'language', template: /[a-z]{3}/, lang: 'Language'},
  
  dataBackground:	{m:'app', d: '#fefefe',	input:'color',	lang: 'Data Entry Background'},
  frameBackground:	{m:'app', d: '#f4f4f4',	input:'color',	lang: 'Container Background'},
  titleBackground:	{m:'app', d: '#dfdfdf',	input:'color',	lang: 'Title Background'},
  highlightBackground:	{m:'app', d: '#ddffff',	input:'color',	lang: 'Highlight Background'},
  dragOverBackground:	{m:'app', d: '#ffd8a0',	input:'color',	lang: 'Dragover Background'},

  butHoverColor:	{m:'app', d: '#88ff88',	input:'color',	lang: 'Button Hover'},
  butActiveColor:	{m:'app', d: '#55cc55',	input:'color',	lang: 'Button Active Color'},
  butToggledColor:	{m:'app', d: '#66aa66',	input:'color',	lang: 'Button Toggled Color'},
  butBackground:	{m:'app', d: '#f4f6f0',	input:'color',	lang: 'Button Background'},
  butIconFill:		{m:'app', d: '#2482a4',	input:'color',	lang: 'Button Icon Fill'},
  butIconStroke:	{m:'app', d: '#222222',	input:'color',	lang: 'Button Icon Stroke'},
  butCloseColor:	{m:'app', d: '#ffdddd',	input:'color',	lang: 'Close Button Color'},
  butCloseHoverColor:	{m:'app', d: '#ffbbbb',	input:'color',	lang: 'Close Button Hover Color'},
  butDisabledColor:	{m:'app', d: '#aaaaaa',	input:'color',	lang: 'Button Disabled Color'},
  butDisabledBackground:{m:'app', d: '#eeeeee',	input:'color',	lang: 'Button Disabled Background'},
  butSize:		{m:'app', d: 1.5,	input:'number', min:0.5, max:100, step:0.1,	lang: 'Button Size'},
  
  winBorderColor:	{m:'win', d:'#c0c0c0',	input:'color',	lang: 'Border Color'},
  winHighlightColor:	{m:'win', d:'#202060',	input:'color',	lang: 'Highlight Color'},
  winHeadColorHigh:	{m:'win', d:'#f0f0f8',	input:'color',	lang: 'Header Gradient Light'},
  winHeadColorLow:	{m:'win', d:'#b8b8c0',	input:'color',	lang: 'Header Gradient Dark'},
  winBorderWidth:	{m:'win', d:2,		input:'number', min:0, max:20, step:1,	lang:'Border Width'},
  winBorderRad:		{m:'win', d:5,		input:'number', min:0, max:20, step:1,	lang:'Border Radius'},
  winOpacity:		{m:'win', d:0.94,	input:'number', min:0, max:1, step:0.05,lang:'Opacity'},
  winFullHeader:	{m:'win', d:22,		input:'number', min:8, max:50, step:1,	lang:'Large Header Height'},
  winSmallHeader:	{m:'win', d:12,		input:'number', min:4, max:50, step:1,	lang:'Small Header Height'},
  winSubWindowX:	{m:'win', d:40,		input:'number', min:0, max:500, step:10,lang:'Sub Offset X'},
  winSubWindowY:	{m:'win', d:40,		input:'number', min:0, max:500, step:10,lang:'Sub Offset Y'},
  
  dewInvalidColor:	{m:'app', d:'#f02020',	input:'color',	lang: 'Data Invalid Color'},
  dewDirtyColor:	{m:'app', d:'#f0a020',	input:'color',	lang: 'Data Dirty Color'},
  dewBorderColor:	{m:'app', d:'#808080',	input:'color',	lang: 'Entry Border Color'},
  dewFlagWidth:		{m:'app', d:4,		input:'number', min:1, max:10, step:1,	lang:'Data Flag Width'},
  dewMleHeight:		{m:'app', d:2,		input:'number', min:1, max:40, step:1,	lang:'Text Area Height'},
  dewMleWidth:		{m:'app', d:40,		input:'number', min:10, max:100, step:1,lang:'Text Area Width'},
  dewEntWidth:		{m:'app', d:4,		input:'number', min:1, max:80, step:1,	lang:'Text Entry Min Width'},

  mlbMinWidth:		{m:'mlb', d:20,		input:'number', min:1, max:100, step:1,	lang:'Minimum Width'},
  mlbMaxWidth:		{m:'mlb', d:200,	input:'number', min:1, max:500, step:1,	lang:'Maximum Width'},
  mlbDefWidth:		{m:'mlb', d:80,		input:'number', min:1, max:500, step:1,	lang:'Default Width'},
  mlbCharWidth:		{m:'mlb', d:10,		input:'number', min:1, max:16, step:1,	lang:'Character Width'},

}

const Preferences = {}

Object.defineProperty(Preferences, 'menu', {
  enumerable: false,
  value: function(module) {
    let rest = 'Restore Defaults'
      , confArr = [{idx: 'restore', lang:rest, config:{input:'button'}, input:(v)=>{
//if (v) console.log("Restore:", v)
          if (v != undefined) for (let idx in Config) {
            let {d, m} = Config[idx]
            if (m == module) this[idx] = d
          }
        }}]
//console.log('Prefs menu:', module)
    for (let idx in Config) {				//For each configuration item
      let config = Object.assign({}, Config[idx])
      let mod = config.m; delete config.m
        , def = config.d; delete config.d
        , lang = config.lang; delete config.lang
      if (mod != module) continue			//Include only the ones in the desired module (win, dbe, etc)
      if (!config.input)
        config.input = 'text'
      if (!config.size)
        config.size = config.input == 'text' ? 20 : 10		//Better way to do this?
//console.log("Pref config:", idx, lang, JSON.stringify(config))
      let elem = {idx, lang, config, input:(va, ix, d, v)=>{	//When item changed by user
//console.log("Pref input:", idx, va, ix, d, v)
        if (ix == 'language' && va && v) {		//console.log("Prefs language change:", va)
          Wyseman.newLanguage(va)
        }
        if (va != null && va != undefined && ix)	//Change the preference
          this[ix] = va
        return this[idx]
      }}
      confArr.push(elem)				//;console.log('  push:', idx)
    }							//;console.log("Pref conf:", confArr)
    return confArr
  }
})
  
//Temporary init; replace with initialization call from app
for (let key in Config) {
  Preferences[key] = Config[key].d
}

module.exports = Preferences
