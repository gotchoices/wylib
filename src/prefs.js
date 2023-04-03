//A global object to maintain preferences across an application
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Fill in default text descriptions
//X- Build object of preferences when launched
//X- Make routine to build menu items for editing prefs
//- Generate pull-down to select supported languages from menu
//-   Language changes in one step--not a character at a time
//-   Call wyseman.newLanguage with new language setting, app updates reactively
//-   How does prefs call to refill wyseman cache when language changes?
//- Can the pref field descriptions pull from the database?
//- Defer building Prefs until init explicitly called (which includes saved prefs)
//- Create initialize routine
//-   Fills in any missing properties from default structure
//- Should start with an empty config
//-   Modules should supply their own prefs for the array (including app)

const Config = {
  language:		{def: 'eng',		mod:'app', inp:'text',	lang: 'Language'},
  
  dataBackground:	{def: '#fefefe',	mod:'app', inp:'color',	lang: 'Data Entry Background'},
  frameBackground:	{def: '#f4f4f4',	mod:'app', inp:'color',	lang: 'Container Background'},
  titleBackground:	{def: '#dfdfdf',	mod:'app', inp:'color',	lang: 'Title Background'},
  highlightBackground:	{def: '#ddffff',	mod:'app', inp:'color',	lang: 'Highlight Background'},
  dragOverBackground:	{def: '#ffd8a0',	mod:'app', inp:'color',	lang: 'Dragover Background'},

  butHoverColor:	{def: '#88ff88',	mod:'app', inp:'color',	lang: 'Button Hover'},
  butActiveColor:	{def: '#55cc55',	mod:'app', inp:'color',	lang: 'Button Active Color'},
  butToggledColor:	{def: '#66aa66',	mod:'app', inp:'color',	lang: 'Button Toggled Color'},
  butBackground:	{def: '#f4f6f0',	mod:'app', inp:'color',	lang: 'Button Background'},
  butIconFill:		{def: '#2482a4',	mod:'app', inp:'color',	lang: 'Button Icon Fill'},
  butIconStroke:	{def: '#222222',	mod:'app', inp:'color',	lang: 'Button Icon Stroke'},
  butCloseColor:	{def: '#ffdddd',	mod:'app', inp:'color',	lang: 'Close Button Color'},
  butCloseHoverColor:	{def: '#ffbbbb',	mod:'app', inp:'color',	lang: 'Close Button Hover Color'},
  butDisabledColor:	{def: '#aaaaaa',	mod:'app', inp:'color',	lang: 'Button Disabled Color'},
  butDisabledBackground:{def: '#eeeeee',	mod:'app', inp:'color',	lang: 'Button Disabled Background'},
  butSize:		{def: 1.5,		mod:'app', inp:{type:'number', min:0.5, max:100, step:0.1},	lang: 'Button Size'},
  
  winBorderColor:	{def:'#c0c0c0',		mod:'win', inp:'color',	lang: 'Border Color'},
  winHighlightColor:	{def:'#202060',		mod:'win', inp:'color',	lang: 'Highlight Color'},
  winHeadColorHigh:	{def:'#f0f0f8',		mod:'win', inp:'color',	lang: 'Header Gradient Light'},
  winHeadColorLow:	{def:'#b8b8c0',		mod:'win', inp:'color',	lang: 'Header Gradient Dark'},
  winBorderWidth:	{def:2,			mod:'win', inp:{type:'number', min:0, max:20, step:1},	lang:'Border Width'},
  winBorderRad:		{def:5,			mod:'win', inp:{type:'number', min:0, max:20, step:1},	lang:'Border Radius'},
  winOpacity:		{def:0.94,		mod:'win', inp:{type:'number', min:0, max:1, step:0.05},lang:'Opacity'},
  winFullHeader:	{def:22,		mod:'win', inp:{type:'number', min:8, max:50, step:1},	lang:'Large Header Height'},
  winSmallHeader:	{def:12,		mod:'win', inp:{type:'number', min:4, max:50, step:1},	lang:'Small Header Height'},
  winSubWindowX:	{def:40,		mod:'win', inp:{type:'number', min:0, max:500, step:10},lang:'Sub Offset X'},
  winSubWindowY:	{def:40,		mod:'win', inp:{type:'number', min:0, max:500, step:10},lang:'Sub Offset Y'},
  
  dewInvalidColor:	{def:'#f02020',		mod:'app', inp:'color',	lang: 'Data Invalid Color'},
  dewDirtyColor:	{def:'#f0a020',		mod:'app', inp:'color',	lang: 'Data Dirty Color'},
  dewBorderColor:	{def:'#808080',		mod:'app', inp:'color',	lang: 'Entry Border Color'},
  dewFlagWidth:		{def:4,			mod:'app', inp:{type:'number', min:1, max:10, step:1},	lang:'Data Flag Width'},
  dewMleHeight:		{def:2,			mod:'app', inp:{type:'number', min:1, max:40, step:1},	lang:'Text Area Height'},
  dewMleWidth:		{def:40,		mod:'app', inp:{type:'number', min:10, max:100, step:1},lang:'Text Area Width'},
  dewEntWidth:		{def:4,			mod:'app', inp:{type:'number', min:1, max:80, step:1},	lang:'Text Entry Min Width'},

  mlbMinWidth:		{def:20,		mod:'mlb', inp:{type:'number', min:1, max:100, step:1},	lang:'Minimum Width'},
  mlbMaxWidth:		{def:200,		mod:'mlb', inp:{type:'number', min:1, max:500, step:1},	lang:'Maximum Width'},
  mlbDefWidth:		{def:80,		mod:'mlb', inp:{type:'number', min:1, max:500, step:1},	lang:'Default Width'},
  mlbCharWidth:		{def:10,		mod:'mlb', inp:{type:'number', min:1, max:16, step:1},	lang:'Character Width'},

}

const Preferences = {}

Object.defineProperty(Preferences, 'menu', {
  enumerable: false,
  value: function(module) {
    let rest = 'Restore Defaults'
      , conf = [{idx: 'restore', lang:rest, config:{input:'button'}, input:(v)=>{
if (v) console.log("Restore:", v)
          if (v != undefined) for (let idx in Config) {
            let {def, mod} = Config[idx]
            if (mod == module) this[idx] = def
          }
        }}]
//console.log('Prefs menu')
    for (let idx in Config) {				//For each configuration item
      let {def, mod, inp, lang} = Config[idx]
      if (mod != module) continue			//Include only the ones in the desired module (win, dbe, etc)
      let input = inp, other				//Default to string input type
      if (inp != null && typeof inp == 'object') {	//If more complex than just a string
        input = inp.type || 'text'			//Get the type from the object
        other = Object.assign({}, inp); delete other.type	//Other properties to apply to the input
      }
      let size = input == 'text' ? 20 : 10		//Better way to do this?
        , config = {input, lang, other, size}		//dew configuration
//console.log("Pref config:", JSON.stringify(config))
        , elem = {idx, lang, config, input:(va, ix, d, v)=>{	//Menu configuration
//console.log("Pref input:", idx, va, ix, this[idx])
        if (ix == 'language') {
console.log("Prefs detects language change:", va)
        }
        if (va != null && va != undefined && ix)	//Change the preference
          this[ix] = va
        return this[idx]
      }}
      conf.push(elem)
    }
//console.log("Pref conf:", conf)
    return conf
  }
})
  
//  _callbacks:			{},
//  _currentLanguage:		'eng',
//
//  get language() {return this._currentLanguage},
//  set language(lang) {
//console.log("Set language:", lang)
//    this._currentLanguage = lang
//    Object.keys(this._callbacks).forEach( (id) => {	//Notify all listeners
//      this._callbacks[id](this._currentLanguage)
//    })
//  },
//  register(id, cb) {		//Remember a component to call back if language changes
//console.log("Prefs register ID:", id)
//    if (cb) this._callbacks[id] = cb; else delete this._callbacks[id]
//  }

//Temporary init; replace with initialization call from app
for (let key in Config) {
  let {def, mod, inp, title} = Config[key]
  Preferences[key] = def
}

module.exports = Preferences
