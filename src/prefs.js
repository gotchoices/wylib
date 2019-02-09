//A global object to maintain preferences across an application
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//Components are responsible to tap into this object and bind to any
//style/theme properties they need.
//There is a language object at text: containing text for all the registered views:
//   viewname: {columns: {}, messages: {}}
//TODO:
//X- Allow for multiple callbacks per view
//X- Rely more on Wyseman module to cache (combine with meta special type)
//- 

const Preferences = {
  dataBackground:		'#fefefe',	//Data entry areas
  frameBackground:		'#f4f4f4',	//Containers
  titleBackground:		'#dfdfdf',	//Labels, column headers, etc.
  highlightBackground:		'#ddffff',
  dragOverBackground:		'#ffd8a0',
  
  winBorderWidth:		2,
  winBorderRad:			5,
  winBorderColor:		'#c0c0c0',
  winHighlightColor:		'#202060',
  winOpacity:			0.94,
  winHeadColorHigh:		'#f0f0f8',
  winHeadColorLow:		'#b8b8c0',
  winFullHeader:		22,
  winSmallHeader:		12,
//  winInitWidthx:		500,	//Deprecated
//  winInitHeight:		300,
  winSubWindowX:		40,
  winSubWindowY:		40,
  
  butSize:			1.5,
  butHoverColor:		'#88ff88',
  butActiveColor:		'#55cc55',
  butToggledColor:		'#66aa66',
  butBackground:		'#f4f6f0',
  butIconFill:			'#2482a4',
  butIconStroke:		'#222222',
  butCloseColor:		'#ffdddd',
  butCloseHoverColor:		'#ffbbbb',
  butDisabledColor:		'#aaaaaa',
  butDisabledBackground:	'#eeeeee',
  
  dewInvalidColor:		'#f02020',
  dewDirtyColor:		'#f0a020',
  dewBorderColor:		'#808080',
  dewFlagWidth:			4,
  dewDefHeight:			2,		//Default textarea dimensions
  dewDefWidth:			40,		//Default textarea dimensions

  mlbMinWidth:			20,
  mlbMaxWidth:			200,
  mlbDefWidth:			80,
  mlbCharWidth:			8,

  _callbacks:			{},
  _currentLanguage:		'eng',

  get language() {return this._currentLanguage},
  set language(lang) {
//console.log("Set language:", lang)
    this._currentLanguage = lang
    Object.keys(this._callbacks).forEach( (id) => {	//Notify all listeners
      this._callbacks[id](this._currentLanguage)
    })
  },

  register(id, cb) {		//Remember a component to call back if language changes
//console.log("Prefs register ID:", id)
    if (cb) this._callbacks[id] = cb; else delete this._callbacks[id]
  }
}

//Preferences.text = Preferences._textCache.en
module.exports = Preferences
