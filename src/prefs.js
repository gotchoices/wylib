//A global object to maintain preferences across an application
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Defer building Prefs until init explicitly called (which includes saved prefs)
//X- Create initialize routine
//X- Should start with an empty config
//X-   Modules should supply their own prefs for the array (including app)
//X- Prefs are saved with app state
//- Reset button doesn't show default eng language in selector
//- Can the pref field descriptions pull from the database?
//- 
const Wyseman = require('./wyseman.js')
const Local = require('./local.js')
const prefTag = 'prefs'
const values = {}
const Config = {
  language:	{m:'app', d: 'eng',	input:'text', special:'scm', data: 'language', template: /[a-z]{3}/, lang: 'Language'},
}
Object.keys(Config).forEach(k => {values[k] = Config[k].d})

const init = function() {		//Call when saved prefs can be read
  let prefs = Local.get(prefTag)		//;console.log("Z:", prefs)
  if (prefs) Object.keys(prefs).forEach(k => {
    values[k] = prefs[k]
    if (k == 'language')
      Wyseman.newLanguage(prefs[k])
  })
}

const menu = function (module) {
  let rest = 'Restore Defaults'
    , confArr = [{idx: 'restore', lang:rest, config:{input:'button'}, input:(v)=>{
        if (v === undefined) return
//if (v) console.log("Restore:", v)
        Local.set(prefTag)			//Clear all saved prefs
        for (let idx in Config) {
          let {d, m} = Config[idx]
          if (m == module) values[idx] = d
        }
      }}]					//;console.log('Prefs menu:', module)

  for (let idx in Config) {			//For each configuration item
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
      if (va != null && va != undefined && ix) {	//Change the preference
        let prefs = Object.assign({}, Local.get(prefTag))
        prefs[ix] = va
        Local.set(prefTag, prefs)			//;console.log("Pref set:", ix, va, values)
        values[ix] = va					//;console.log("Q:", Local.get(prefTag))
      }
      return values[idx]
    }}
    confArr.push(elem)					//;console.log('  push:', idx)
  }							//;console.log("Pref conf:", confArr)
  return confArr
}

// Initialize prefs for a particular code module
const mod = function(module, prefs) {			//console.log('Prefs init:', module)

  if (prefs) Object.keys(prefs).forEach(key => {
    let pSets = prefs[key]
    pSets.m = module
    Config[key] = pSets
    if (!values[key])					//If no prior saved preference
      values[key] = pSets.d
  })
}
  
module.exports = {
  values,
  menu,
  mod,
  init,
}
