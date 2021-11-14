(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connect = __webpack_require__(/*! ./connect.vue */ "./src/connect.vue");

var _connect2 = _interopRequireDefault(_connect);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _dbp = __webpack_require__(/*! ../src/dbp.vue */ "./src/dbp.vue");

var _dbp2 = _interopRequireDefault(_dbp);

var _modal = __webpack_require__(/*! ./modal.vue */ "./src/modal.vue");

var _modal2 = _interopRequireDefault(_modal);

var _dialog = __webpack_require__(/*! ./dialog.vue */ "./src/dialog.vue");

var _dialog2 = _interopRequireDefault(_dialog);

var _win = __webpack_require__(/*! ./win.vue */ "./src/win.vue");

var _win2 = _interopRequireDefault(_win);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Local = __webpack_require__(/*! ./local.js */ "./src/local.js");
var TopHandler = __webpack_require__(/*! ./top.js */ "./src/top.js");
var Wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");
var State = __webpack_require__(/*! ./state.js */ "./src/state.js");


var WmDefs = { //English defaults, as we may not yet be connected
  appServer: { title: 'Server', help: 'Toggle menu for connecting to various servers' },
  appServerURL: { title: 'Server URL', help: 'The domain and port of the server you are currently connected to' },
  appNoConnect: { title: 'Not Connected', help: 'The application is not connected to a backend server' },
  appSave: { title: 'Save State', help: 'Save application state to the backend' },
  appSaveAs: { title: 'Save State As', help: 'Save application state to the backend using a named configuration' },
  appRestore: { title: 'Load State', help: 'Load application from a previously saved state' },
  appPrefs: { title: 'Preferences', help: 'Change preferred settings' },
  appDefault: { title: 'Default State', help: 'Initialize the application to a default state' },
  appEditState: { title: 'Edit State', help: 'Preview a list of saved states for this application' }
};

exports.default = {
  name: 'wylib-app',
  components: { 'wylib-connect': _connect2.default, 'wylib-button': _button2.default, 'wylib-menu': _menu2.default, 'wylib-win': _win2.default, 'wylib-dialog': _dialog2.default, 'wylib-modal': _modal2.default, 'wylib-dbp': _dbp2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    title: { default: 'Application' },
    tabs: { type: Array },
    tag: { type: String },
    current: { type: String },
    db: null
  },
  data: function data() {
    return {
      conMenuPosted: true,
      appMenu: { posted: false, client: {}, title: 'Application menu' },
      modal: { posted: false, client: {} },
      currentSite: null,
      menuTitle: '',
      pw: { ready: false, prompt: 'Password', checked: false },
      persistent: true,
      top: null,
      restoreMenu: [],
      previews: [{ posted: false, x: null, y: null, client: { dbView: 'wylib.data_v' } }],
      lastLoadIdx: null,
      env: { wm: Wyseman.langDefs({}, WmDefs), pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js") }
    };
  },
  provide: function provide() {
    var _this = this;

    return {
      top: function top() {
        return _this.top;
      },
      app: function app() {
        return _this.top;
      }
    };
  },

  computed: {
    id: function id() {
      return 'app_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    siteConnected: function siteConnected() {
      return this.currentSite || this.wm.t.appNoConnect || 'Not Connected';
    },
    tagTitle: function tagTitle() {
      return this.tag || this.title;
    },
    appLang: function appLang() {
      return (this.wm ? this.wm['app.' + this.tag] : null) || (this.title.title ? this.title : { title: this.title });
    }
  },
  methods: {
    //    lang(key, title, defVal) {
    //      return this.wm[key] ? this.wm[key][title?'title':'help'] : defVal
    //    },
    appMenuConfig: function appMenuConfig() {
      var _this2 = this;

      var wm = this.wm;
      return [{ idx: 'sav', lang: wm.appSave, icon: 'upload', call: this.saveState }, { idx: 'sas', lang: wm.appSaveAs, icon: 'upload2', call: this.saveStateAs }, { idx: 'res', lang: wm.appRestore, icon: 'download', menu: this.restoreMenu, layout: ['lang', 'owner', 'access'] }, { idx: 'prf', lang: wm.appPrefs, icon: 'cog', menu: this.pr.menu('app'), layout: ['lang', 'dew'] }, { idx: 'def', lang: wm.appDefault, icon: 'home', call: this.defaultState }, { idx: 'edi', lang: wm.appEditState, icon: 'pencil', call: function call() {
          _this2.previews[0].posted = true;
        } }];
    },
    appClick: function appClick(ev) {
      //Any click in the app
      //console.log("Got app click")
      this.top.notifyClick(ev);
    },
    siteChange: function siteChange(site) {
      //console.log("App site change:", site)
      this.currentSite = site;
      this.conMenuPosted = !site;
      if (this.pw.checked) Local.check(site); //If this is not the first run, check the new site storage situation
    },
    postAppMenu: function postAppMenu(ev) {
      //console.log("postAppMenu:", ev, this.appMenu.x, this.appMenu.y, this.appMenu)
      if (!(this.appMenu.posted = !this.appMenu.posted)) return;
      if (this.appMenu.x == null || this.appMenu.y == null) {
        //If this is the first time posted
        this.appMenu.x = 0; //Place the menu to miss the button
        this.appMenu.y = ev.target.getBoundingClientRect().height + 4;
      }
    },
    tabClass: function tabClass(tag) {
      return {
        tab: true,
        active: this.current == tag ? true : false
      };
    },
    tabSelect: function tabSelect(idx) {
      //console.log("tabSelect:", idx)
      this.$emit('tab', idx);
    },
    saveStateAs: function saveStateAs() {
      var _this3 = this;

      var resp = { t: 'Default' },
          dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]]);
      this.top.query('!appStatePrompt', dewArr, resp, function (tag) {
        if (tag == 'diaYes') State.saveAs(_this3.tag, resp.t, resp.h, _this3.state, _this3.top.error, function (ruid) {
          _this3.lastLoadIdx = ruid;
        });
      });
    },
    saveState: function saveState() {
      if (this.lastLoadIdx) State.save(this.lastLoadIdx, this.state, this.top);else this.saveStateAs();
    },
    defaultState: function defaultState() {
      var _this4 = this;

      this.top.confirm('!appDefault', function (tag) {
        if (tag == 'diaYes') {
          _this4.persistent = false;
          location.reload();
        }
      });
    },
    beforeUnload: function beforeUnload() {
      //console.log("About to unload.  Saving state:", JSON.stringify(this.state, null, 2))
      if (this.persistent) Local.set(this.tagTitle, this.state, true); //Save state
      else Local.reset(this.tagTitle); //Clear any saved state
    },
    submitPW: function submitPW(ev) {
      if (!Local.pw(ev)) {
        //If the user signaled a reset?
        this.persistent = false;
        location.reload();
      }
    },
    initApp: function initApp() {
      var _this5 = this;

      //Call when app ready to run
      Wyseman.register(this.id + 'wm', 'wylib.data', function (data, err) {
        if (data.msg) Object.assign(_this5.env.wm, data.msg); //Don't overwrite what might be in WmDefs
        //console.log("App wm:", this.wm)
        if (!_this5.pw.checked) Local.check(); //If this is the first run, we should now have enough wm data for the dialog to work
      });

      var savedState = Local.get(this.tagTitle);
      //console.log("Restoring state:", JSON.stringify(savedState, null, 2))
      if (savedState) this.$nextTick(function () {
        Object.assign(_this5.state, savedState);
      }); //Comment line for debugging from default state

      State.listen(this.id + 'sl', this.tag, function (menuData) {
        var _restoreMenu;

        //console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
        var menuItems = menuData.map(function (el) {
          return Object.assign(el, { call: function call() {
              Object.assign(_this5.state, el.data);
              _this5.lastLoadIdx = el.idx;
            } });
        });
        (_restoreMenu = _this5.restoreMenu).splice.apply(_restoreMenu, [0, _this5.restoreMenu.length].concat(_toConsumableArray(menuItems)));
      }, this.top.error);
    }
  },

  created: function created() {
    var _this6 = this;

    //console.log("app created:", this.env)
    this.top = new TopHandler(this);
    Local.init(this, this.pw, this.tag, function (isReady) {
      if (_this6.pw.ready = isReady) _this6.initApp();
    });
  },

  beforeMount: function beforeMount() {
    var _this7 = this;

    if (this.ready) this.initApp();
    this.$on('customize', function (tag, lang) {
      //Allow child to set the tab title
      //console.log("Customize tab", tag, lang, this.tabs)
      var tabIdx = _this7.tabs.findIndex(function (el) {
        return el.tag == tag;
      });
      if (tabIdx >= 0) _this7.tabs[tabIdx].lang = lang;
    });
  },

  mounted: function mounted() {
    window.addEventListener('beforeunload', this.beforeUnload);
  },

  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//

var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");
var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");

exports.default = {
  name: 'wylib-button',
  props: {
    icon: String,
    color: String,
    hoverColor: String,
    activeColor: String,
    toggledColor: String,
    fill: String,
    stroke: String,
    toggled: Boolean,
    disabled: { type: Boolean, default: false },
    size: { default: 1.2 },
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      //    pr:		require('./prefs'),
      isHover: false,
      isActive: false
    };
  },

  methods: {
    mouseEnter: function mouseEnter(ev) {
      if (this.disabled) return;this.isHover = true;this.$emit('mouseenter', ev);
    },
    mouseLeave: function mouseLeave(ev) {
      if (this.disabled) return;this.isHover = false;this.$emit('mouseleave', ev);
    },
    //    mouseDown:	function(ev) {if (this.disabled) return; this.isActive = true;	this.$emit('mousedown',ev)},
    //    mouseUp:	function(ev) {if (this.disabled) return; this.isActive = false;	this.$emit('mouseup',ev)},
    click: function click(ev) {
      if (this.disabled) return;this.$emit('click', ev);
    }
  },
  computed: {
    pr: function pr() {
      return this.env.pr;
    },
    iconSvg: function iconSvg() {
      return Icons(this.icon);
    },
    iconStyle: function iconStyle() {
      return {
        fill: this.disabled ? this.pr.butDisabledColor : this.fill || this.pr.butIconfill,
        stroke: this.disabled ? this.pr.butDisabledColor : this.stroke || this.pr.butIconStroke
      };
    },
    buttonStyle: function buttonStyle() {
      return {
        width: (this.size || this.pr.butSize) + 'em',
        height: (this.size || this.pr.butSize) + 'em',
        padding: parseInt(this.size / 10) + 'px',
        backgroundColor: this.backgroundColor
      };
    },
    backgroundColor: function backgroundColor() {
      if (this.disabled) return this.pr.butDisabledBackground;else if (this.isActive) return this.activeColor || this.pr.butActiveColor;else if (this.isHover) return this.hoverColor || this.pr.butHoverColor;else if (this.toggled) return this.toggledColor || this.pr.butToggledColor;
      return this.color || this.pr.butBackground;
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _menudock = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue");

var _menudock2 = _interopRequireDefault(_menudock);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var CountDown = 7;
var Subtle = window.crypto.subtle;
var KeyConfig = {
  name: 'RSA-PSS',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256'
};
var SignConfig = { //For signing with RSA-PSS
  name: 'RSA-PSS',
  saltLength: 128
};

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Local = __webpack_require__(/*! ./local.js */ "./src/local.js");
var Wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");
var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");
var FileSaver = __webpack_require__(/*! file-saver */ "file-saver");


var WmDefs = { //English defaults, as we may not yet be connected
  conmenu: { title: 'Connect Menu', help: 'Functions controlling how you connect to server sites' },
  conTitle: { title: 'Connection Keys', help: 'A list of servers where you normally connect' },
  conConnect: { title: 'Connect', help: 'Connect/disconnect with this server' },
  conDelete: { title: 'Delete', help: 'Remove this server from my list' },
  conImport: { title: 'Import Key', help: 'Drag/drop file here or click to use a connection key or one-time access ticket' },
  conExport: { title: 'Export Keys', help: 'Save connection keys to a file' },
  conRetry: { title: 'Retrying in', help: 'Will attempt to connect again in this many seconds' },
  conUsername: { title: 'Username', help: 'Input the authorized username you will connect by' },
  conNoCrypto: { title: 'No Crypto', help: 'No crypto library found in browser.  Make sure you are connected by https.' },
  conCryptErr: { title: 'Generating Key', help: 'There was an error generating a connection key pair' },
  conExpFile: { title: 'Export Filename', help: 'The name of the file the browser will export keys to in your download area' },
  conExpPass: { title: 'Passphrase', help: 'A secret passphrase used to encrypt/decrypt saved private keys' },
  conExpPass2: { title: 'Retype Passphrase', help: 'Enter passphrase again' },
  conConErr: { title: 'Connection Error', help: 'Your connection credentials may be invalid' }
  //  conDiscon: {title:'Server Disconnected', help:'The backend server disconnected unexpectedly'},	Not used?
};var SiteKey = 'connectSites'; //Hard-coded keys for localStorage
var LastKey = 'lastSite';

exports.default = {
  name: 'wylib-connect',
  components: { 'wylib-button': _button2.default, 'wylib-menudock': _menudock2.default },
  props: {
    db: null,
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      sites: null, //site keys we have in memory
      lastSelect: null, //index of the last one clicked on
      lastConnected: null, //site object we were last connected to
      dock: {}, //State for menu dock
      currentSite: null, //URL we are connected to, if any
      status: null, //Status message to display in window
      tryEvery: CountDown, //Fixme: reimplement auto retry
      retryIn: CountDown,
      tryTimer: null
    };
  },

  inject: ['top'],
  computed: {
    id: function id() {
      return 'con_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    selectedSite: function selectedSite() {
      return this.lastSelect == null ? null : this.sites[this.lastSelect];
    },
    connected: function connected() {
      return !!this.currentSite;
    },
    dockConfig: function dockConfig() {
      return [{ idx: 'con', lang: this.wm.conConnect, call: this.togConn, icon: 'link', shortcut: true, toggled: this.connected }, { idx: 'sub', lang: this.wm.conDelete, call: this.delSites, icon: 'minus', shortcut: true }, { idx: 'exp', lang: this.wm.conExport, call: this.exportKeys, icon: 'boxout' }];
    }
  },
  methods: {
    keyIcon: function keyIcon(site) {
      //What icon to display in the site list
      var icon = site.priv ? 'key' : site.token ? 'ticket' : 'exclaim';
      return Icons(icon);
    },
    keyStyle: function keyStyle(site) {
      //How the key/ticket icon displays in the site list
      var color = site.priv ? 'gold' : site.token && site.user ? 'green' : 'red';
      return {
        height: '1.1em', width: '1.1em',
        fill: color, stroke: color,
        backgroundColor: '#888888'
      };
    },
    rowStyle: function rowStyle(sel) {
      return {
        backgroundColor: sel ? this.pr.highlightBackground : this.pr.dataBackground,
        userSelect: 'none'
      };
    },
    selectSite: function selectSite(ev, idx) {
      //Select, deselect a site from the list
      if (ev.shiftKey) {
        //Range select
        if (this.lastSelect != null) {
          var min = Math.min(this.lastSelect, idx),
              max = Math.max(this.lastSelect, idx);
          for (var i = min; i <= max; i++) {
            this.sites[i].selected = true;
          }
        } else {
          this.sites[idx].selected = true;
        }
      } else if (ev.ctrlKey || ev.metaKey) {
        //Multiple select
        this.sites[idx].selected = !this.sites[idx].selected;
      } else {
        //Single select
        this.sites.forEach(function (el) {
          el.selected = false;
        });
        this.sites[idx].selected = true;
      }
      this.lastSelect = idx;
      //console.log("Select:", this.lastSelect, this.sites)
    },
    togConn: function togConn(ev) {
      var _this = this;

      //Connect/disconnect
      //console.log("Toggle Connection:", this.connected, this.lastSelect, this.selectedSite)
      if (this.connected) {
        this.disconnect();
      } else {
        if (this.selectedSite) this.$nextTick(function () {
          _this.connectSite();
        });
        if (this.tryTimer) clearTimeout(this.tryTimer);
        this.status = null;
        this.retryIn = this.tryEvery = CountDown; //Retry if disconnected again
      }
    },
    keyCheck: function keyCheck(site, cb) {
      var _this2 = this;

      //Check for, and possibly generate connection keys
      console.log("Key check:");
      if (location.protocol == 'http:') {
        site.proto = 'ws:'; //Try to connect insecurely
        cb(site);
      } else if (site.priv) {
        //We already have a private key
        cb(site);
      } else if (Subtle) {
        //Subtle API found
        //console.log("  generating key:")
        Subtle.generateKey(KeyConfig, true, ['sign', 'verify']).then(function (keyPair) {
          site.priv = keyPair.privateKey;
          return Subtle.exportKey('jwk', keyPair.publicKey);
        }).then(function (pubKey) {
          //console.log("  jwk:", Object.keys(pubKey), pubKey, JSON.stringify(pubKey))
          site.pub = btoa(JSON.stringify(pubKey)); //Transmit base64 version of jwk
          //console.log("  pub:", site.pub)
          cb(site);
        }).catch(function (err) {
          console.log("Error in keyCheck:", err.message);
          _this2.top().error(_this2.wm.conCryptErr, err.message);
        });
      } else {
        this.top().error(this.wm.conNoCrypto);
      }
    },
    userCheck: function userCheck(site, cb) {
      var _this3 = this;

      //Make sure the key has a username
      //console.log("User check:", site, this.db)
      if (this.db) {
        //Pass db config info to connect query
        site.db = Com.buf2b64url(Buffer.from(JSON.stringify(this.db)));
      }
      if (site.user) cb();else this.top().input(this.wm.conUsername, function (ans, data) {
        //Prompt for username
        if (ans == 'diaYes' && data.value) {
          var oldIdx = _this3.sites.findIndex(function (el) {
            return el.host == site.host && el.port == site.port && el.user == data.value;
          });
          //console.log("Delete old key:", oldIdx)
          if (oldIdx >= 0) _this3.sites.splice(oldIdx, 1); //Delete old key by same name if one exists
          site.user = data.value;
          cb();
        }
      });
    },
    signCheck: function signCheck(site, cb) {
      var _this4 = this;

      //Add a current signature with the key
      //console.log("Sign check:", site)
      if (site.token) cb(); //Don't need to sign if our credential is a connection token
      else Com.ajax(window.location.origin + '/clientinfo', function (data) {
          var encoder = new TextEncoder(),
              ip = data.ip,
              cookie = data.cookie,
              userAgent = data.userAgent,
              date = data.date,
              message = JSON.stringify({ ip: ip, cookie: cookie, userAgent: userAgent, date: date }); //Must rebuild in this same order in the backend!
          //console.log("  Client data:", data, date, site.priv, Subtle)
          //console.log("  Message:", message)
          if (site.proto == 'ws:') {
            cb(site);
          } else if (Subtle) {
            Subtle.sign(SignConfig, site.priv, encoder.encode(message)).then(function (sign) {
              //console.log("  signed:", sign, typeof sign, date)
              site.sign = Com.buf2b64url(Buffer.from(sign));
              site.date = date;
              cb();
            }, function (err) {
              console.log("Error in signCheck:", err.message);
              _this4.top().error(_this4.wm.conCryptErr, err.message);
            });
          }
        });
    },
    connectSite: function connectSite() {
      var _this5 = this;

      var site = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectedSite;
      //Make connection to a specified site
      //console.log("Connecting to:", site, window.location.origin)
      this.keyCheck(site, function () {
        return _this5.userCheck(site, function () {
          _this5.signCheck(site, function () {
            _this5.tryEvery = CountDown; //Retry if disconnected
            _this5.lastConnected = site; //Remember where we last connected to
            Wyseman.connect(site, function (errCode) {
              _this5.top().error(_this5.wm[errCode]);
            });
            delete site.token; //No longer a connection token, now a credential
            Local.set(LastKey, { host: site.host, port: site.port, user: site.user });
            _this5.exportList(_this5.sites, function (keyData) {
              //Save keys locally in exportable format
              Local.set(SiteKey, keyData);
            });
          });
        });
      });
    },
    delSites: function delSites(ev) {
      //Remove site from our favorites list
      for (var i = this.sites.length - 1; i >= 0; i--) {
        //console.log("Remove site", i, this.sites[i].selected)
        if (this.sites[i].selected) this.sites.splice(i, 1);
      }
      Local.set(SiteKey, this.sites);
    },
    exportList: function exportList(sites, cb) {
      var _this6 = this;

      //Create exportable array of sites/keys
      var expData = [],
          expKeys = sites.slice(); //Make local copy
      console.log(" exportList:", this.sites, expKeys);
      if (!Subtle) return; //Can't do this for insecure connections?

      var _loop = function _loop(i) {
        Subtle.exportKey('jwk', expKeys[i].priv).then(function (keyData) {
          var k = expKeys[i];
          console.log(" key data:", keyData);
          expData.unshift({ host: k.host, port: k.port, user: k.user, key: keyData });
          expKeys.splice(i, 1); //remove this key from our list
          if (expKeys.length <= 0) cb(expData); //when last one done, run callback
        }, function (err) {
          //console.log("Error in exportSites:", err.message)
          _this6.top().error(_this6.wm.conCryptErr, err.message);
        });
      };

      for (var i = expKeys.length - 1; i >= 0; i--) {
        _loop(i);
      }
    },
    exportKeys: function exportKeys(ev) {
      var _this7 = this;

      //Write selected keys to a file
      console.log("Export:", ev);
      var expKeys = []; //Make local copy of the keys
      for (var i = this.sites.length - 1; i >= 0; i--) {
        //Get just the selected ones, in reverse order
        if (this.sites[i].selected && this.sites[i].priv) expKeys.push(this.sites[i]);
      }
      if (expKeys.length <= 0) expKeys = this.sites.slice().reverse(); //Export all keys
      if (expKeys.length <= 0) return; //Nothing to export

      var resp = { file: 'keys.json' //Prepare to prompt user
      },
          inp = 'password',
          dews = this.top().dewArray([['file', this.wm.conExpFile], ['p1', this.wm.conExpPass, inp], ['p2', this.wm.conExpPass2, inp]]);
      //console.log("ExportList:", dews)
      this.top().query(this.wm.conExport, dews, resp, function (ans) {
        //Prompt for a filename, passphrase
        if (ans != 'diaYes' || !resp.file) return;
        _this7.exportList(expKeys, function (keyData) {
          console.log("Export file:", resp.file, resp.p1, keyData.length, keyData);
          keyData = keyData.map(function (el) {
            return { login: el };
          }); //Prefix each element with a descriptor
          if (keyData.length == 1) keyData = keyData[0]; //Write 1 element long array as a single object rather than an array
          var keysString = JSON.stringify(keyData),
              saveIt = function saveIt(data) {
            var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blob, resp.file); //File saved as a browser download
          };
          if (resp.p1) //User provided a password
            Com.encrypt(resp.p1, keysString).then(saveIt); //So encrypt the file
          else saveIt(keysString); //Save unencrypted
        });
      }, function (d) {
        //Validity check callback
        return d.file && d.p1 == d.p2 || !d.p1 && !d.p2; //Passwords must match
      });
    },
    installKey: function installKey(obj) {
      var _this8 = this;

      //Store a key or ticket object
      var site;
      console.log("  installKey:", obj);
      for (var keyType in obj) {
        site = obj[keyType];
        if (keyType == 'ticket' || keyType == 'login') {
          var oldIdx = this.sites.findIndex(function (el) {
            return el.host == site.host && el.port == site.port && el.user == site.user;
          });
          if (!site.user) site.user = null; //Empty stubs so user is reactive
          site.priv = null;
          site.selected = null;
          console.log("Adding:", oldIdx, oldIdx >= 0);
          if (oldIdx >= 0) //Is there already a key for this same connection?
            this.sites.splice(oldIdx, 1, site); //Replace old key
          else this.sites.splice(0, 0, site); //Add in as a new one
          if (site.key) Subtle.importKey('jwk', site.key, KeyConfig, true, ['sign']).then(function (priv) {
            site.priv = priv;
            Local.set(SiteKey, _this8.sites);
          }, function (err) {
            console.log("Error installing Key:", err.message);
            _this8.top().error(_this8.wm.conCryptErr, err.message);
          });
        }
      }
      return site;
    },
    importKeys: function importKeys(ev) {
      var _this9 = this;

      //Set/get ticket value
      Com.fileReader(ev.target, 1500, function (fileData) {
        //console.log("Keys data:", typeof fileData, fileData)
        var installEm = function installEm(jsonData) {
          if (Array.isArray(jsonData)) jsonData.forEach(function (el) {
            _this9.installKey(el);
          });else if ((typeof jsonData === 'undefined' ? 'undefined' : _typeof(jsonData)) == 'object') _this9.installKey(jsonData);
        };
        if (!fileData.s || !fileData.i || !fileData.d) {
          //Doesn't appear to be encrypted
          installEm(fileData);
        } else {
          //Will try decrypting
          var resp = {},
              dews = _this9.top().dewArray([['p', _this9.wm.conExpPass, 'password']]);
          _this9.top().query('!diaQuery', dews, resp, function (ans) {
            //Prompt for password
            if (ans != 'diaYes' || !resp.p) return;
            Com.decrypt(resp.p, JSON.stringify(fileData)).then(function (d) {
              //console.log("Decrypted::", d)
              installEm(JSON.parse(d));
            });
          });
        }
      });
    },
    disconnect: function disconnect() {
      //console.log("Disconnect:")
      this.tryEvery = null; //And don't retry connect
      Wyseman.close();
    },
    retryConnect: function retryConnect() {
      //console.log("Retry connect", this.lastConnected, this.tryEvery, this.retryIn, this.currentSite)
      if (this.retryIn <= 0) {
        //If we counted down to zero
        //console.log("  try connect:", this.lastConnected, "retryIn:", this.retryIn)
        if (this.lastConnected) this.connectSite(this.lastConnected); //Try a reconnect
        this.retryIn = this.tryEvery + CountDown; //next time we'll wait longer
      } else {
        this.retryIn--; //Else keep counting down
        //console.log("  decrement", this.retryIn)
      }
      this.status = this.wm.t.conRetry + ' (' + this.retryIn + ')'; //Update status message
      if (this.tryTimer) clearTimeout(this.tryTimer);
      this.tryTimer = setTimeout(this.retryConnect, 1000);
    }
  },

  created: function created() {
    Wyseman.langDefs(this.env.wm, WmDefs);
    //    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
    //      if (data.msg) this.wm = data.msg
    //    })
  },

  mounted: function mounted() {
    var _this10 = this;

    var last = Local.get(LastKey),
        parms = Com.urlParms(),
        conSite = void 0;

    this.sites = Local.get(SiteKey) || []; //Get our saved list of credentials

    if (parms) {
      //In case a ticket was specified in our URL
      var ticket = function (_ref) {
        var token = _ref.token,
            host = _ref.host,
            port = _ref.port,
            user = _ref.user;
        return { token: token, host: host, port: port, user: user };
      }(parms); //Reduce to object with only the allowed attributes
      console.log("  URL ticket:", ticket);
      if (!ticket.host) ticket.host = location.hostname;
      if (ticket.token && ticket.host && ticket.port) {
        var _conSite = this.installKey({ ticket: ticket });
        this.connectSite(_conSite); //Automatically connect
      }
    }

    //console.log("Connect sites:", this.sites)
    this.sites.forEach(function (site) {
      //Create digital in-memory key info for each credential
      _this10.$set(site, 'selected', null); //GUI needs to react to this
      console.log("Processing saved key:", site);
      if (site.key) Subtle.importKey('jwk', site.key, KeyConfig, true, ['sign']).then(function (priv) {
        site.priv = priv;
        if (!conSite && site.host == last.host && site.port == last.port && site.user == last.user) _this10.connectSite(site); //Automatically connect
      }, function (err) {
        _this10.top().error(_this10.wm.conCryptErr, err.message);
      });
    });

    Wyseman.request('_main', 'connect', { stay: true }, function (addr) {
      //console.log("Connect callback addr:", addr, "retryIn:", this.retryIn)
      _this10.$emit('site', _this10.currentSite = addr); //Tell my parent about connection change

      if (!addr && _this10.tryEvery && !_this10.tryTimer) {
        //Failed to connect
        _this10.retryConnect();
      } else if (addr) {
        //Success
        //console.log("Success parms:", parms, "loc:", location)
        if (parms) {
          //If loaded from a ticket, any reload should happen without query fields in the URL
          history.replaceState(null, '', location.origin + location.pathname);
        }
        _this10.status = null;
        _this10.retryIn = _this10.tryEvery = CountDown; //Retry if disconnected again
        if (_this10.tryTimer) {
          clearTimeout(_this10.tryTimer);_this10.tryTimer = null;
        }
      }
    });
  } //mounted
  //component

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menudock = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue");

var _menudock2 = _interopRequireDefault(_menudock);

var _mdew = __webpack_require__(/*! ./mdew.vue */ "./src/mdew.vue");

var _mdew2 = _interopRequireDefault(_mdew);

var _dbp = __webpack_require__(/*! ./dbp.vue */ "./src/dbp.vue");

var _dbp2 = _interopRequireDefault(_dbp);

var _win = __webpack_require__(/*! ./win.vue */ "./src/win.vue");

var _win2 = _interopRequireDefault(_win);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");
exports.default = {
  name: 'wylib-dbe',
  components: { 'wylib-mdew': _mdew2.default, 'wylib-menudock': _menudock2.default, 'wylib-dbp': _dbp2.default, 'wylib-win': _win2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    bus: null, //Commands from my parent dbp
    master: null, //Key info for my master, if any
    env: { type: Object, default: Com.envTpt }
  },
  inject: ['top'], //My toplevel window
  data: function data() {
    return {
      viewMeta: null,
      dbData: {}, //Data as fetched from the database
      dirty: false,
      valid: false,
      lastView: null,
      mdewBus: new Bus.messageBus(this),
      subBus: new Bus.messageBus(this, this.reportQuery),
      stateTpt: { dock: {}, dbView: '', key: {}, loaded: false, subs: {}, dews: { fields: [] } },
      reports: {}
    };
  },


  computed: {
    id: function id() {
      return 'dbe_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    metaStyles: function metaStyles() {
      return this.viewMeta && this.viewMeta.styles ? this.viewMeta.styles : {};
    },
    actMenu: function actMenu() {
      var _this = this;

      var acts = [];
      //console.log("actMenu:", this.metaStyles)
      if (this.metaStyles.actions) this.metaStyles.actions.forEach(function (act) {
        var name = act.name;
        acts.push({ idx: name, icon: 'wand', lang: _this.viewMeta.msg[name] || { title: name }, call: function call(ev) {
            _this.perform(ev, act);
          } });
      });
      return acts;
    },
    subMenu: function subMenu() {
      var _this2 = this;

      var subs = [];
      //console.log("subMenu:", this.metaStyles)
      if (this.metaStyles.subviews) this.metaStyles.subviews.forEach(function (sub) {
        var viewName = typeof sub == 'string' ? sub : sub.view,
            lang = sub.lang || { title: viewName, help: null };
        subs.push({ idx: viewName, lang: lang, icon: 'table', call: function call() {
            _this2.addWin(sub.view);
          } });
      });
      return subs.length > 0 ? subs : null; //Don't create an empty menu
    },
    dockConfig: function dockConfig() {
      return [{ idx: 'act', lang: this.wm.dbeActions, menu: this.actMenu, icon: 'wand' }, { idx: 'sub', lang: this.wm.dbeSubords, menu: this.subMenu, icon: 'table' }, { idx: 'adr', lang: this.wm.dbeInsert, call: this.insert, icon: 'upload', shortcut: true, disabled: !this.valid }, { idx: 'upd', lang: this.wm.dbeUpdate, call: this.update, icon: 'floppy', shortcut: true, disabled: !this.dirty || !this.valid || !this.keyValues }, { idx: 'del', lang: this.wm.dbeDelete, call: this.delete, icon: 'bin', disabled: !!this.keyValues }, { idx: 'clr', lang: this.wm.dbeClear, call: this.clear, icon: 'sun', shortcut: true }, { idx: 'ldr', lang: this.wm.dbeLoadRec, call: this.loadRec, icon: 'target' }, { idx: 'opt', lang: this.wm.dbeOption, call: this.opTog, icon: 'eye', type: 'checkbox', toggled: this.state.dews.optional, input: this.showOptValue }];
    },
    headerHeight: function headerHeight() {
      return this.pr.winFullHeader - 1; //Fit in parent header, plus top border
    },
    keyEntSize: function keyEntSize() {
      var len = 4;
      if (this.keyValues) len = this.keyValues.join(',').length;
      if (len > 16) len = 16;
      return len;
    },
    mdewConfig: function mdewConfig() {
      //Make the column description format mdew is looking for
      var fieldArray = [];
      if (this.viewMeta) this.viewMeta.columns.forEach(function (meta) {
        //console.log("Col:", meta.col, " Meta:", meta, meta.styles, meta.values)
        fieldArray.push({
          field: meta.col,
          lang: { title: meta.title || meta.col, help: meta.title + ' (' + meta.col + '):\n' + meta.help },
          styles: meta.styles,
          values: meta.values,
          nonull: meta.nonull
        });
      });
      return fieldArray;
    },
    pKey: function pKey() {
      var _this3 = this;

      //object describing current PK fields and their values
      var ret = {};
      if (this.viewMeta) this.viewMeta.pkey.forEach(function (fld) {
        ret[fld] = _this3.dbData[fld];
      });
      this.state.key = ret; //side effect
      //console.log("Dbe pKey:", ret)
      return ret;
    },
    keyValues: function keyValues() {
      var _this4 = this;

      //An array of current PK values
      var keyVals = [];
      Object.keys(this.pKey).forEach(function (fld) {
        if (_this4.dbData[fld] != undefined) keyVals.push(_this4.dbData[fld]);
      });
      //console.log("Dbe keyValues:", keyVals)
      return keyVals.length > 0 ? keyVals : undefined;
    },
    keyMaster: function keyMaster() {
      var _this5 = this;

      return { //Record with all key data consolidated
        view: this.state.dbView,
        pKey: this.pKey,
        keys: this.viewMeta.pkey,
        values: this.keyValues,
        get: function get(field) {
          return _this5.dbData[field];
        }
        //      fields: this.dbData
      };
    }
  },

  methods: {
    showOptValue: function showOptValue(v) {
      //Set/get value for showing optional fields
      if (v != null) this.state.dews.optional = v;
      return this.state.dews.optional;
    },
    loadRec: function loadRec() {
      var _this6 = this;

      //Prompt for a primary key and load that record
      var resp = {};
      var dews = [];this.mdewConfig.forEach(function (el, ix) {
        if (_this6.viewMeta.pkey.includes(el.field)) {
          var pkEl = Object.assign({}, el);
          if (pkEl.styles) {
            delete pkEl.styles.hide;delete pkEl.styles.subframe;delete pkEl.focus;
          }
          dews.push(pkEl);
        }
      });
      dews[0].focus = true; //Doesn't seem to work
      this.top().query('!dbeLoadPrompt', dews, resp, function (tag) {
        //console.log("Load record:", yes, resp)
        if (tag == 'diaYes') _this6.load(resp);
      });
    },
    keyWhere: function keyWhere() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.keyValues;
      //Return a 'where' object identifying this record
      var whereObj = {};
      this.keyMaster.keys.forEach(function (fld, i) {
        whereObj[fld] = key[i];
      });
      //console.log("Where:", whereObj)
      return whereObj;
    },
    load: function load(where) {
      var _this7 = this;

      //Fetch a record from the database, by its primary key
      //console.log("Dbe load:", where)
      if (Array.isArray(where)) where = this.keyWhere(where); //if only key values passed in
      this.dataRequest('tuple', { where: where, fields: '*' }, false, function () {
        _this7.dirty = false;
      });
    },
    fieldCheck: function fieldCheck(fields) {
      this.mdewConfig.forEach(function (fld, idx) {
        //Remove any fields that shouldn't get written to the DB
        //console.log(  "field:", fld.field, fld.styles.write, !fld.styles.write || fld.styles.write==0)
        if (fld.styles && 'write' in fld.styles && (!fld.styles.write || fld.styles.write == 0)) {
          //console.log(  "deleting", fld.field)
          delete fields[fld.field];
        }
      });
    },
    insert: function insert() {
      var _this8 = this;

      var fields = this.mdewBus.notify('userData')[0];

      if (this.master) {
        var _master = this.master,
            view = _master.view,
            keys = _master.keys,
            hisPKey = keys.join(','),
            fKeyLinks = this.viewMeta.fkeys.filter(function (el) {
          return el.table == view;
        }),
            fKeyLink = fKeyLinks && fKeyLinks.length == 1 ? fKeyLinks[0] : fKeyLinks.find(function (el) {
          return el.foreign.join('.') == hisPKey;
        });
        //console.log("insert:", fields, "keyMaster:", this.master, "k:", hisPKey, "fKeyLink:", fKeyLink)

        if (fKeyLink) fKeyLink.columns.forEach(function (key, idx) {
          var fKeyField = fKeyLink.foreign[idx],
              fValue = _this8.master.get(fKeyField);
          //console.log("  field:", key, "=", fValue)
          fields[key] = fValue;
        });
      }

      console.log("Insert:", fields);
      this.fieldCheck(fields);
      this.dataRequest('insert', { fields: fields }, true, function () {
        _this8.dirty = false;
      });
    },
    update: function update(ev, fields) {
      var _this9 = this;

      console.log("Update data:", ev, JSON.stringify(fields));
      if (!fields) fields = this.mdewBus.notify('userData', true)[0];
      this.fieldCheck(fields);
      this.dataRequest('update', { fields: fields, where: this.keyWhere() }, true, function () {
        _this9.dirty = false;
      });
    },
    delete: function _delete() {
      //console.log("Delete")
      this.dataRequest('delete', { where: this.keyWhere() });
    },
    clear: function clear() {
      var _this10 = this;

      var answers = this.mdewBus.notify('clear')[0];
      //console.log("Dbe Clear", answers)
      answers.forEach(function (el) {
        //Update data pushed into mdew
        var value = el.value,
            field = el.field,
            dirty = el.dirty,
            valid = el.valid;
        //console.log("  field:", field, value, this.dirty, this.valid)

        _this10.dbData[field] = value;
      });
      this.dirty = false;
      this.valid = false;
      this.top().posted(); //Act like we just posted
      Object.keys(this.pKey).forEach(function (fld) {
        _this10.dbData[fld] = null;
      }); //Force PK fields, even if they don't display
      this.state.loaded = false;
      this.subBus.notify('clear'); //Clear any subordinate previews
    },
    change: function change(value, field, dirty, valid) {
      //Respond to changes on the data inputs
      this.dirty = dirty; //dirty, valid state of whole mdew
      this.valid = valid;
      //console.log("Dbe input:", field, value, dirty, valid)
    },
    dataRequest: function dataRequest(action, options) {
      var _this11 = this;

      var modifies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var cb = arguments[3];

      //console.log("Dbe dataRequest:", action, options)
      Wyseman.request(this.id + 'dr', action, Object.assign({ view: this.state.dbView }, options), function (data, err) {
        //console.log("Dbe data received:", err, data)
        if (err) {
          _this11.top().error(err);
        } else {
          if (data) {
            _this11.dbData = data;
            _this11.$nextTick(function () {
              _this11.mdewBus.notify('set');
            });
          }
          if (modifies) _this11.$emit('modified', data); //Tell parent dbp to update
          if (cb) cb(data);
          _this11.state.loaded = true;
          //console.log("Loaded:", this.viewMeta.pkey)
          _this11.$nextTick(function () {
            _this11.subBus.notify('load', _this11.pKey);
          }); //Tell child dbp to update itself
        }
      });
    },
    addWin: function addWin(view) {
      //console.log("Open preview window:", view)
      Com.addWindow(this.state.subs, { posted: true, client: { dbView: view } }, this, true);
    },
    closeWin: function closeWin(idx, reopen) {
      Com.closeWindow(this.state.subs, idx, this, reopen);
    },
    reportQuery: function reportQuery(request, data, rptKey, cb) {
      var _this12 = this;

      //Handle editor requests from a launched report
      //console.log("Dbe got request from report:", request, data, "k:", this.keyValues, rptKey)
      if (!request || request == 'pKey') {
        //Default to asking for currently loaded key
        return this.keyValues ? [this.pKey] : null;
      } else if (request == 'update') {
        var uData = {};
        this.mdewConfig.forEach(function (el) {
          //Grab only valid and changed fields
          var key = el.field;
          //console.log("  checking:", key, this.dbData[key], data[key])
          if (key in data && JSON.stringify(data[key]) != JSON.stringify(_this12.dbData[key])) {
            uData[key] = data[key];
          }
        });
        //console.log("  update:", uData, rptKey, this.pkey)
        var key = rptKey || this.pKey; //Try to link to current record if one is loaded
        if (key) {
          this.fieldCheck(uData);
          this.dataRequest('update', { fields: uData, where: rptKey }, true, cb);
        } else {
          //If not use, whatever key the report loaded with
          this.top().error(this.wm.dbeNoPkey);
        }
      }
    },
    perform: function perform(event, action) {
      console.log("Perform action:", action, event.shiftKey);
      var data = {},
          view = this.state.dbView,
          diaTag = ['action', view, action.name].join(':');
      if (action.options) {
        //Do we need to prompt for report options?
        this.top().dialog(action.lang, action.options, data, null, diaTag + ':opts', this.top().diaButs3);
      } else {
        this.top().actionLaunch(view, action, { popUp: event.shiftKey }, this.subBus); //Go direct to action/report
      }
    },
    metaListen: function metaListen() {
      var _this13 = this;

      //Register which DB view we are dealing with
      var zid = this.id + 'cv';
      if (this.lastView) Wyseman.register(zid, this.lastView); //Un-register any prior view
      if (this.state.dbView) Wyseman.register(this.id + 'cv', this.state.dbView, function (data) {
        //console.log("Dbe got metadata for:", this.state.dbView, data)
        _this13.viewMeta = data;
        _this13.lastView = _this13.state.dbView;

        var lang = { title: _this13.wm.t.dbeMenu + ': ' + data.title, help: _this13.state.dbView + ':\n' + data.help };
        _this13.$parent.$emit('customize', lang, 'dbe:' + _this13.state.dbView, false, function () {
          return _this13.dirty;
        });

        if (_this13.metaStyles.actions) _this13.metaStyles.actions.forEach(function (act) {
          //Make menu options for any actions associated with this view
          _this13.top().registerDialog(['action', _this13.state.dbView, act.name].join(':'), function (dia, info) {
            //console.log("Dbe got action callback:", dia, act, info)
            return _this13.top().actionLaunch(_this13.state.dbView, act, info, _this13.subBus);
          });
        });
      });
    }
  },

  watch: {
    'state.dbView': function stateDbView(newVal, oldVal) {
      //If we change our view, reset data, columns
      //console.log("Dbe dbView changed!")
      this.recData = [];
      this.viewMeta = null;
      if (newVal != oldVal) this.metaListen();
    }
  },

  created: function created() {
    //console.log("Dbe created; top:", this.top())
    this.metaListen();
    //    this.subBus = new Bus.messageBus(this, (msg)=>{
    //console.log("Dbe got sub message:", msg)
    //    })
  },

  beforeMount: function beforeMount() {
    var _this14 = this;

    //console.log("Dbe before, state:", JSON.stringify(this.state.key))
    Com.stateCheck(this);
    var preloadKey = this.state.key;
    this.$nextTick(function () {
      //Attempt reload to previous state
      if (_this14.state.loaded && Object.keys(preloadKey).length > 0) {
        //console.log("Dbe reload:", this.state.loaded, JSON.stringify(preloadKey))
        _this14.load(preloadKey);
      }
    });
  },

  mounted: function mounted() {
    var _this15 = this;

    //console.log("Dbe refs: ", this.$refs, JSON.stringify(this.state.key))
    this.$parent.$emit('swallow', this.$refs['headMenu'], this.$refs['headStatus']);

    if (this.bus) this.bus.register(this.id, function (msg, data) {
      //Commands from my parent dbp
      //console.log("Dbe bus message: ", msg, data);
      if (msg == 'load') return _this15.load(data);
    });
  },

  beforeDestroy: function beforeDestroy() {
    //console.log("Dbe closing popups:", this.reports)
    Object.values(this.reports).forEach(function (popup) {
      popup.close();
    }); //Fixme: Doesn't really get called much--create onunload handler?
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _menudock = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue");

var _menudock2 = _interopRequireDefault(_menudock);

var _mlb = __webpack_require__(/*! ./mlb.vue */ "./src/mlb.vue");

var _mlb2 = _interopRequireDefault(_mlb);

var _dbs = __webpack_require__(/*! ./dbs.vue */ "./src/dbs.vue");

var _dbs2 = _interopRequireDefault(_dbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");
var FileSaver = __webpack_require__(/*! file-saver */ "file-saver");
exports.default = {
  name: 'wylib-dbp',
  components: { 'wylib-mlb': _mlb2.default, 'wylib-menudock': _menudock2.default, 'wylib-menu': _menu2.default, 'wylib-dbs': _dbs2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    autoEdit: { type: Boolean, default: true },
    bus: null, //My master dbe, if any
    master: null, //Current key info of my master, if any
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      viewMeta: null,
      gridData: [],
      lastMenu: null,
      mlbBus: new Bus.messageBus(this),
      dbeBus: new Bus.messageBus(this),
      dbsBus: new Bus.messageBus(this),
      lastView: null,
      editPosts: 0, //Don't instantiate until we've posted once
      filtPosts: 0
    };
  },

  inject: ['top'],

  computed: {
    id: function id() {
      return 'dbp_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    stateTpt: function stateTpt() {
      return {
        dock: {}, loaded: 0, autoLoad: false, lastLoad: {}, colMenu: { x: 100, y: 0 },
        edit: { posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: { dbView: this.state.dbView } },
        filter: { posted: false, x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {} },
        grid: { footerOn: false, sorting: {}, columns: [] }
      };
    },
    logicFields: function logicFields() {
      var flds = [];
      for (var key in this.mlbConfig) {
        var conf = this.mlbConfig[key];
        flds.push({ tag: key, title: conf.title, help: key + "\n" + conf.help });
      }
      return flds.sort(function (a, b) {
        return a.title > b.title ? 1 : -1;
      });
    },
    loadedSize: function loadedSize() {
      var len = 3;
      if (this.loaded) len = this.loaded.length > 8 ? 8 : this.loaded.length;
      return len;
    },
    dockConfig: function dockConfig() {
      var _this = this;

      return [{ idx: 'lod', lang: this.wm.dbpLoad, call: function call(ev) {
          return _this.load();
        }, icon: 'download', shortcut: true }, { idx: 'all', lang: this.wm.dbpLoadAll, call: this.loadAll, icon: 'download2' }, { idx: 'rld', lang: this.wm.dbpReload, call: function call(ev) {
          return _this.reload();
        }, icon: 'spinner', shortcut: true }, { idx: 'clr', lang: this.wm.dbpClear, call: function call(ev) {
          return _this.clear();
        }, icon: 'sun' }, { idx: 'fil', lang: this.wm.dbpFilter, call: this.loadBy, icon: 'filter', shortcut: true, toggled: this.state.filter.posted }, { idx: 'edi', lang: this.wm.dbe, call: this.editTog, icon: 'pencil', shortcut: true, toggled: this.state.edit.posted }, { idx: 'ald', lang: this.wm.dbpAutoLoad, call: this.autoTog, icon: 'truck', type: 'checkbox', toggled: this.state.autoLoad, input: this.autoLoadValue }, { idx: 'sum', lang: this.wm.dbpShowSum, call: this.sumTog, icon: 'circle', type: 'checkbox', toggled: this.state.showSum, input: this.showSumValue }, { idx: 'exp', lang: this.wm.dbpExport, call: this.export, icon: 'boxout' }, { idx: 'prv', lang: this.wm.dbpPrev, call: this.prev, icon: 'arrowup', shortcut: true }, { idx: 'nxt', lang: this.wm.dbpNext, call: this.next, icon: 'arrowdown', shortcut: true }, { idx: 'dec', lang: this.wm.dbpDefault, call: this.defColumns, icon: 'sun' },
      //      {idx: 'tst', lang: {title: 'T', help: 'H'}, call: this.test, icon:'circle', shortcut: true},
      { idx: 'cvi', lang: this.wm.dbpVisible, icon: 'eye', menu: this.visibleMenu }];
    },
    visibleMenu: function visibleMenu() {
      var _this2 = this;

      var items = [],
          conf = this.mlbConfig;
      //console.log("Visible:", this.state.dbView)
      Object.keys(this.mlbConfig).sort(function (a, b) {
        return conf[a].title < conf[b].title ? -1 : 1;
      }).forEach(function (key) {
        var col = _this2.state.grid.columns.find(function (e) {
          return e.field == key;
        });
        items.push({ idx: key, lang: { title: conf[key].title, help: key + '\n' + conf[key].help }, type: 'checkbox', input: function input(v) {
            //console.log("inp:", key, v, col.visible)
            if (v != null && col) {
              col.visible = v;
            }
            return col ? col.visible : null;
          } });
      });
      return items;
    },
    colMenuConfig: function colMenuConfig() {
      return [{ idx: 'siz', lang: this.wm.dbpColAuto, call: this.autoSize, icon: 'width' }, { idx: 'hid', lang: this.wm.dbpColHide, call: this.hideColumn, icon: 'eyeblock' }];
    },
    headerHeight: function headerHeight() {
      return this.pr.winFullHeader - 1; //Fit in parent header, plus top border
    },
    mlbConfig: function mlbConfig() {
      var _this3 = this;

      //Make the column description format mlb expects
      var colConfigs = {},
          foundDisplay = false;
      //console.log("mlbConfig:", this.state.dbView, this.viewMeta)
      if (this.viewMeta) this.viewMeta.columns.forEach(function (meta) {
        //For each column element
        var defWidth = void 0,
            key = meta.col;
        if (meta.styles && 'size' in meta.styles && meta.styles.size) {
          defWidth = meta.styles.size.split(' ')[0] * _this3.pr.mlbCharWidth;
        }
        if ('display' in meta.styles) foundDisplay = true;
        var config = {
          field: key,
          title: meta.title || key,
          help: meta.help,
          order: parseInt(meta.styles.display || 9999),
          just: meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
          width: defWidth ? defWidth <= _this3.pr.mlbMaxWidth ? defWidth : _this3.pr.mlbMaxWidth : _this3.pr.mlbDefWidth,
          visible: 'display' in meta.styles ? !!parseInt(meta.styles.display) : false
          //console.log("  width:", key, meta.styles.size, "d:", defWidth, "->", config.width)
        };colConfigs[key] = config;
      });
      //console.log("colConfigs:", colConfigs)
      if (!foundDisplay) Object.keys(colConfigs).forEach(function (key) {
        colConfigs[key].visible = true;
      }); //If no display data, display them all
      return colConfigs;
    }
  },

  methods: {
    //    test() {
    //console.log("Test!", this.top)
    //      this.top().confirm('A test message', (tag) => {
    //console.log("Modal answers:", tag)
    //      })
    //    },
    autoTog: function autoTog(ev) {
      //Toggle auto loading mode
      this.state.autoLoad = !this.state.autoLoad;
    },
    autoLoadValue: function autoLoadValue(v) {
      //Set/get autoload value
      if (v != null) this.state.autoLoad = v;
      return this.state.autoLoad;
    },
    sumTog: function sumTog(ev) {
      //Toggle column summaries
      this.state.showSum = !this.state.showSum;
    },
    showSumValue: function showSumValue(v) {
      //Set/get showSumm value
      if (v != null) this.state.grid.footerOn = this.state.showSum = v;
      return this.state.showSum;
    },
    editTog: function editTog(ev) {
      //Toggle the editing window
      this.state.edit.posted = !this.state.edit.posted;
      if (this.state.edit.posted) {
        //        this.editPosts++
        this.executeRows();
      }
    },
    advance: function advance() {
      var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.mlbBus.notify('advance', delta);
    },
    next: function next(ev) {
      this.advance(1);
    },
    prev: function prev(ev) {
      this.advance(-1);
    },
    executeRows: function executeRows(selection) {
      var _this4 = this;

      if (!selection) selection = this.$refs.mlb.getSelection();
      //console.log("Dbp execute rows: ", selection, this.viewMeta.pkey)
      if (selection.length <= 0) return;
      if (!this.viewMeta || !this.viewMeta.pkey) {
        this.top().error(this.wm.dbpNoPkey);return;
      }
      var idx = selection[0],
          row = this.gridData[idx],
          keyVal = [];
      if (row) this.viewMeta.pkey.forEach(function (fld) {
        keyVal.push(row[fld]);
      });
      //console.log("   row: ", row, keyVal)
      if (row && this.autoEdit) {
        this.state.edit.posted = true;
        //        this.editPosts++
        this.$nextTick(function () {
          _this4.dbeBus.notify('load', keyVal);
        });
      } else this.$emit('execute', row, this.viewMeta.pkey, keyVal);
    },
    selectWhere: function selectWhere(selection) {
      var _this5 = this;

      //Generate new where-clause based on selected records
      if (!selection) selection = this.$refs.mlb.getSelection();
      if (!this.viewMeta || !this.viewMeta.pkey) return 'false';
      var keys = [],
          left = this.viewMeta.pkey,
          oldWhere = this.state.lastLoad.where;
      if (selection.length <= 0 || selection.length >= this.state.loaded) return oldWhere; //Including all loaded records
      console.log("selectWhere: ", this.viewMeta, oldWhere, left);
      selection.forEach(function (idx) {
        var row = _this5.gridData[idx],
            keyVal = left.map(function (el) {
          return row[el];
        });
        keys.push(keyVal);
      });
      var thisWhere = { left: left, oper: 'in', entry: keys };
      console.log("  in (" + keys.join(',') + ')');
      if (oldWhere) return { and: true, items: [oldWhere, thisWhere] };
      return thisWhere;
    },
    load: function load(spec) {
      var _this6 = this;

      if (!spec) {
        if (this.viewMeta.styles && this.viewMeta.styles.where) spec = { where: this.viewMeta.styles.where };
      }
      //console.log("Dbp load:", this.state.dbView, spec, this.viewMeta)
      Wyseman.request('dbp_' + this._uid, 'select', Object.assign({ view: this.state.dbView, fields: '*' }, spec), function (data, err) {
        //console.log("  data:", data)
        if (err) _this6.top().error(err);else _this6.gridData = data;
        if (_this6.state.edit.posted && _this6.state.autoLoad) _this6.executeRows();
      });
      if (spec) this.state.lastLoad = spec;
    },
    reload: function reload(spec) {
      //console.log("Dbp reload:", this.state.dbView, this.state.lastLoad, spec)
      this.load(Object.assign(this.state.lastLoad, spec));
    },
    loadAll: function loadAll(ev) {
      this.load({ where: null });
    },
    clear: function clear() {
      this.gridData = [];
    },
    modified: function modified(data) {
      this.reload();
    },
    //On signal from dbe
    sort: function sort(cols) {
      //console.log("Dbp sort:", cols)
      this.reload(cols ? { order: cols.reverse() } : null);
    },
    search: function search(where) {
      this.reload({ where: where });
    },
    dbsDefault: function dbsDefault() {
      //console.log("Dbp default logic:")
      if (this.viewMeta.styles && this.viewMeta.styles.where) this.dbsBus.notify('load', Com.clone(this.viewMeta.styles.where));
    },
    loadBy: function loadBy() {
      this.state.filter.posted = !this.state.filter.posted;
    },
    colMenuHandler: function colMenuHandler(e, index, x, y) {
      //console.log("Menu handler:", index, x, y)
      if (index != this.lastMenu) {
        this.state.colMenu.posted = true;
      } else {
        this.state.colMenu.posted = !this.state.colMenu.posted;
      }
      if (this.state.colMenu.posted) {
        this.state.colMenu.x = x - 10;
        this.state.colMenu.y = y;
      }
      this.lastMenu = index;
    },
    autoSize: function autoSize() {
      var _this7 = this;

      var col = this.state.grid.columns.find(function (e) {
        return e.field == _this7.lastMenu;
      });
      //console.log("Auto size:", this.lastMenu, "Col:", col)
      this.mlbBus.notify('autosize', col.field);
    },
    hideColumn: function hideColumn() {
      var _this8 = this;

      var col = this.state.grid.columns.find(function (e) {
        return e.field == _this8.lastMenu;
      });
      //console.log("Hide:", this.lastMenu, "Col:", col)
      if (col) col.visible = false;
    },
    defColumns: function defColumns(ev) {
      var _this9 = this;

      var _loop = function _loop(key) {
        var conf = _this9.mlbConfig[key],
            col = _this9.state.grid.columns.find(function (e) {
          return e.field == key;
        });
        //console.log("Dbp defColumns:", key, col)
        col.visible = conf.visible;
        col.order = conf.order;
        col.width = conf.width;
      };

      for (var key in this.mlbConfig) {
        _loop(key);
      }
    },
    geometry: function geometry(ev) {
      //console.log("Geometry changed:", top, ev)
      this.top().emit('geometry', ev);
    },
    hideCol: function hideCol() {
      var _this10 = this;

      var col = this.state.grid.columns.find(function (e) {
        return e.field == _this10.lastMenu;
      });
      //console.log("Hide Column:", this.lastMenu, "Col:", col)
      col.visible = false;
    },
    metaListen: function metaListen() {
      var _this11 = this;

      //Register which view we are dealing with
      var zid = this.id + 'cv';
      if (this.lastView) Wyseman.register(zid, this.lastView); //Un-register
      if (this.state.dbView) Wyseman.register(this.id + 'cv', this.state.dbView, function (data, err) {
        if (err) {
          _this11.top().error(err);return;
        }
        //console.log("Dbp got metadata for:", this.state.dbView, data)
        _this11.viewMeta = data;
        var title = (_this11.wm.t.dbp || '') + ': ' + data.title;
        _this11.$parent.$emit('customize', { title: title, help: _this11.state.dbView + ':\n' + data.help }, 'dbp:' + _this11.state.dbView);
      });
    },
    followMaster: function followMaster() {
      var _this12 = this;

      //Handle a load request from a master dbe
      var _master = this.master,
          view = _master.view,
          keys = _master.keys,
          hisPKey = keys.join(','),
          fKeyLinks = this.viewMeta.fkeys.filter(function (el) {
        return el.table == view;
      }),
          fKeyLink = fKeyLinks && fKeyLinks.length == 1 ? fKeyLinks[0] : fKeyLinks.find(function (el) {
        return el.foreign.join('.') == hisPKey;
      });
      //console.log("Got load from master dbe:", this.state.dbView, "h:", hisPKey, "m:", this.master, "fks:", fKeyLinks, "l:", JSON.stringify(fKeyLink))
      //this.viewMeta.fkeys.forEach(el=>{if (el.table == view) console.log("  el:", el.table, el.foreign.join(','))})

      if (fKeyLink) {
        var where = {};
        fKeyLink.columns.forEach(function (key, idx) {
          var fKeyField = fKeyLink.foreign[idx],
              fValue = _this12.master.get(fKeyField);
          //console.log("  w:", key, fKeyField, fValue)
          where[key] = fValue;
        });
        //console.log("  where:", where)
        this.load({ where: where });
      }
    },
    export: function _export() {
      var _this13 = this;

      //Export selected records
      var resp = { file: (this.viewMeta.title || this.state.dbView || 'Document') + '.json' },
          dews = [{ field: 'file', lang: this.wm.dbpExportAsk, styles: { focus: true } }, { field: 'pretty', lang: this.wm.dbpExportFmt, styles: { input: 'chk' } }];
      //console.log("Meta:", this.viewMeta)
      this.top().query('!dbpExportAsk', dews, resp, function (ans) {
        if (ans == 'diaYes' && resp.file) {
          var selects = _this13.$refs.mlb.getSelection(),
              where = _this13.selectWhere(),
              spec = { view: _this13.state.dbView, fields: 'json', where: where },
              tag = (_this13.viewMeta.styles ? _this13.viewMeta.styles.export : null) || _this13.viewMeta.obj; //Identifies the record type on export
          //console.log("Export:", resp.file, selects, where)

          Wyseman.request('dbp_x_' + _this13._uid, 'select', spec, function (data, err) {
            //console.log("  err:", err, " data:", data)
            if (err) {
              _this13.top().error(err);return;
            }
            var expData = data.map(function (el) {
              return _defineProperty({}, tag, el.json);
            }),
                blob = new Blob([JSON.stringify(expData, null, resp.pretty ? 2 : null)], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(blob, resp.file);
            //console.log(" to file:", resp.file, expData)
          });
        }
      });
    }
  },

  watch: {
    'state.edit.posted': function stateEditPosted(newVal, oldVal) {
      if (!oldVal && newVal) this.editPosts++;
    },
    'state.filter.posted': function stateFilterPosted(newVal, oldVal) {
      //console.log("filter (de)posted:", newVal)
      if (!oldVal && newVal) this.filtPosts++;
    },
    'state.dbView': function stateDbView(newVal, oldVal) {
      //If we change our view, reset data, columns
      //console.log("Dbp dbView changed!")
      this.gridData = [];
      this.viewMeta = null;
      if (newVal != oldVal) this.metaListen();
    },
    gridData: function gridData() {
      this.state.loaded = this.gridData ? this.gridData.length : 0;
      //console.log("Dbp gridData changed:", this.state.loaded)
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-dbe'] = __webpack_require__(/*! ./dbe.vue */ "./src/dbe.vue").default;
    this.$options.components['wylib-win'] = __webpack_require__(/*! ./win.vue */ "./src/win.vue").default;
  },

  created: function created() {
    //    Wyseman.register(this.id+'wm', 'wylib.data', (data, err) => {
    //      if (data.msg) this.wm = data.msg
    //    })
    this.metaListen();
  },

  beforeMount: function beforeMount() {
    var _this14 = this;

    //console.log("Dbp before, state: ", JSON.stringify(this.state, null, 2))
    if (this.bus) this.bus.register(this.id, function (msg) {
      //Respond to commands from a master dbe
      //console.log("Dbp got from master: ", msg)
      if (msg == 'clear') {
        _this14.clear();
      } else if (msg == 'load') {
        _this14.followMaster();
      }
    });
    Com.stateCheck(this);
    //console.log("Dbp after, state: ", this.state)
  },

  mounted: function mounted() {
    var _this15 = this;

    this.$parent.$emit('swallow', this.$refs['headMenu'], this.$refs['headStatus']);
    //console.log('Dbp mounted state:', this.id, this.state)
    this.$nextTick(function () {
      if (_this15.state.edit && _this15.state.edit.posted) _this15.editPosts = 1; //What was posted before we quit
      if (_this15.state.filter && _this15.state.filter.posted) _this15.filtPosts = 1;
      //console.log('Was loaded, reload?', this.id, this.state.loaded, this.state.lastLoad)
      if (_this15.state.loaded > 0) //If state says we had data loaded before, reload now
        _this15.reload();
      //      else if (this.bus)			//Too early, master not yet loaded
      //        this.followMaster()
    });
  }

  //  beforeDestroy: function() {
  //console.log('Dbp about to die:', this.state)
  //  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loglist = __webpack_require__(/*! ./loglist.vue */ "./src/loglist.vue");

var _loglist2 = _interopRequireDefault(_loglist);

var _menudock = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue");

var _menudock2 = _interopRequireDefault(_menudock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
exports.default = {
  name: 'wylib-dbs',
  components: { 'wylib-loglist': _loglist2.default, 'wylib-menudock': _menudock2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    bus: null, //Commands from my parent dbp
    fields: { type: Array },
    env: { type: Object, default: Com.envTpt }
  },

  data: function data() {
    return {
      stateTpt: { logic: { and: true, items: [{ left: null, not: false, oper: '=' }] }, dock: {} }
    };
  },


  computed: {
    //Fixme: get langauge from wyseman/db
    id: function id() {
      return 'dbs_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    logicConfig: function logicConfig() {
      //console.log("logicConf:", this.fields)
      return { left: this.fields, oper: this.operators, right: this.fields };
    },
    operators: function operators() {
      return [{ tag: '=', lang: this.wm.dbsEqual }, { tag: '<', lang: this.wm.dbsLess }, { tag: '<=', lang: this.wm.dbsLessEq }, { tag: '>', lang: this.wm.dbsMore }, { tag: '>=', lang: this.wm.dbsMoreEq }, { tag: '~', lang: this.wm.dbsRexExp }, { tag: 'in', lang: this.wm.dbsIn }, { tag: 'isnull', lang: this.wm.dbsNull }, { tag: 'true', lang: this.wm.dbsTrue }, { tag: 'diff', lang: this.wm.dbsDiff }, { tag: 'nop', lang: this.wm.dbsNop }];
    },
    dockConfig: function dockConfig() {
      return [{ idx: 'sch', lang: this.wm.dbsSearch, call: this.search, icon: 'wand', shortcut: true }, { idx: 'clr', lang: this.wm.dbsClear, call: this.clear, icon: 'sun', shortcut: true }, { idx: 'def', lang: this.wm.dbsDefault, call: this.default, icon: 'download' }];
    },
    headerHeight: function headerHeight() {
      return this.pr.winFullHeader - 1; //Fit in parent header, plus top border
    }
  },

  methods: {
    addNew: function addNew() {
      //console.log("Adding")
      var newItem = Object.assign({}, this.logicState.items.slice(-1)[0]);
      this.logic.items.push(newItem);
    },
    search: function search() {
      this.$emit('search', this.state.logic);
    },
    default: function _default() {
      this.$emit('default'); //Request default load logic from dbp
    },
    clear: function clear() {
      this.state.logic = this.stateTpt.logic;
    },
    geometry: function geometry() {//Fixme: auto adjust parent geometry?
      //console.log("Dbs check geometry", vm.$el.getBoundingClientRect())
    }
  },

  //  created: function() {
  //  },

  beforeMount: function beforeMount() {
    Com.stateCheck(this);
    //console.log("Dbs beforeMount state: ", this.state)
  },

  mounted: function mounted() {
    var _this = this;

    this.$parent.$emit('swallow', this.$refs['header']);
    this.$parent.$emit('customize', this.wm.dbs);

    if (this.bus) this.bus.register(this.id, function (msg, data) {
      //Commands from my parent dbp
      //console.log("Dbs bus message: ", msg, data);
      if (msg == 'load') _this.state.logic = data;
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var DatePicker = __webpack_require__(/*! ./date.js */ "./src/date.js");
//import InDate from './indate.vue'
var shortHints = {
  date: 'YYYY-MM-DD'
};
var shortTpts = {
  alpha: '^[a-zA-Z.]*$',
  alnum: '^[\\w.]*$',
  date: '^\\d{4}[-/\\.](\\d{1,2}|[\\w]{3})[-/\\.]\\d{1,2}$'
};

exports.default = {
  name: 'wylib-dew',
  //  components: {'wylib-indate': InDate},
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } }, //Configuration
    lang: null,
    value: { default: null }, //value to compare dirty to
    values: { type: Array, default: function _default() {
        return [];
      } }, //valid values for select
    field: { default: null }, //column or field code
    nonull: { type: Boolean, default: false }, //No nulls allowed
    bus: null, //message bus from parent
    env: { type: Object, default: Com.envTpt }
  },
  inject: ['top'],
  data: function data() {
    return {
      userValue: null, //Value, as modified by user
      datePicker: null,
      stateTpt: { input: 'ent', size: null, state: null, template: null, special: {}, initial: null }
    };
  },


  computed: {
    pr: function pr() {
      return this.env.pr;
    },
    pdmValues: function pdmValues() {
      var vals = [];
      this.values.forEach(function (el) {
        if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) != 'object') {
          el = { value: el, title: el, help: null };
        } else if ('value' in el && !('title' in el)) {
          el.title = el.value;
        }
        vals.push(el);
      });
      return vals;
    },
    hint: function hint() {
      var hint = this.state ? this.state.hint : null;
      if (hint in shortHints) return shortHints[hint];else return hint;
    },
    template: function template() {
      var temp = this.state ? this.state.template : null;
      if (temp in shortTpts) return shortTpts[temp];else return temp;
    },
    disabled: function disabled() {
      //No user data entry, just for looking at
      return this.state.input == 'inf' || this.state.state == 'readonly' || this.state.hide || false;
    },
    mapValue: function mapValue() {
      //console.log("mapValue", this.field, this.value, typeof this.value)
      return this.value != null && _typeof(this.value) == 'object' ? JSON.stringify(this.value, null, 2) : this.value;
    },
    dirty: function dirty() {
      //The user has changed the value
      var dirty = this.userValue != this.mapValue;
      //console.log("dirty:", this.field, this.mapValue, this.userValue, dirty)
      return dirty;
    },
    valid: function valid() {
      //The value matches the specified template pattern or seems otherwise valid, given the field type
      var isValid = false;
      if (this.state.input == 'chk' || this.state.input == 'inf') {
        isValid = true;
      } else if (this.state.input == 'pdm') {
        //console.log(' values:', this.userValues ? this.values.map(e=>(e.value)) : null)
        isValid = this.values ? this.pdmValues.map(function (e) {
          return e.value;
        }).includes(this.userValue || '') : true;
      } else if (this.template == null) {
        isValid = true;
      } else {
        if (this.userValue == '' || this.userValue == null) isValid = true;else isValid = RegExp(this.template).test(this.userValue);
      }
      //console.log("Valid:", this.field, this.userValue, this.template, this.disabled, isValid)
      return isValid;
    },
    genStyle: function genStyle() {
      return { //Generate style, based on data state
        borderLeftColor: this.disabled ? this.pr.dataBackground : this.valid ? this.pr.dewBorderColor : this.pr.dewInvalidColor,
        borderRightColor: this.disabled || !this.dirty ? this.pr.dewBorderColor : this.pr.dewDirtyColor,
        borderBottomColor: this.disabled ? this.pr.dataBackground : this.pr.dewBorderColor,
        background: 'background' in this.state ? this.state.background : this.pr.dataBackground,
        borderLeftWidth: this.pr.dewFlagWidth + 'px',
        borderRightWidth: this.pr.dewFlagWidth + 'px',
        //x:console.log("width:", this.field, this.width),
        minWidth: this.width / 2 + 'em' //Better way to compare to actual text size?
      };
    },
    dims: function dims() {
      if (typeof this.state.size == 'string') return this.state.size.split(' ');
      return typeof this.state.size == 'number' ? [this.state.size] : [];
    },
    height: function height() {
      //Specified height in characters
      //console.log("Height:", this.state.size, this.dims)
      return this.dims[1] || this.pr.dewMleHeight || 1;
    },
    width: function width() {
      //In characters
      //console.log("Width:", this.field, this.state.size, this.pr.dewEntWidth)
      return this.dims[0] || (this.state.input == 'mle' ? this.pr.dewMleWidth || 40 : this.state.input != 'chk' ? this.pr.dewEntWidth || 4 : 2);
    }
  },

  methods: {
    input: function input(ev) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ev.target.value;

      //console.log("Dew input:", ev, this.nonull, value)
      if (this.state.input == 'file' && ev.target.files) {
        //Special handler for file selectors
        value = ev.target.files;
      } else {
        if (!this.nonull && !value) value = null; //Map '' to null if allowed
        this.userValue = value;
      }
      this.$emit('input', value, this.field, this.dirty, this.valid);
    },
    submit: function submit(ev) {
      this.$emit('submit');
    },
    focus: function focus() {
      //Focus cursor on this entry field
      //console.log("Focusing:", this.$refs, this.field)
      this.$refs.input.focus();
    },
    set: function set(val) {
      return { value: this.userValue = val, field: this.field, dirty: this.dirty, valid: this.valid };
    },
    clear: function clear() {
      return this.set(this.state.initial);
    }
  },

  created: function created() {
    //console.log("Dew init:", this.field, this.mapValue)
    this.userValue = this.mapValue;
  },
  beforeMount: function beforeMount() {
    var _this = this;

    //console.log("Dew state:", this.field, this.value, this.userValue, JSON.stringify(this.state))
    Com.stateCheck(this);

    //    if (!('initial' in this.state)) this.state.initial = null
    //console.log(" Refs:", this.field, this.state.initial, JSON.stringify(this.$refs))

    if (this.bus) this.bus.register(this.field, function (msg, data) {
      //console.log('dew', this.field, 'got bus message:', msg, data)
      if (msg == 'clear') //Set to default value
        return _this.clear();else if (msg == 'set') //User value = current top-down value
        return _this.set(_this.mapValue);
    });
  },

  mounted: function mounted() {
    var _this2 = this;

    //console.log(" Dew mounted:", this.field, this.state, this.mapValue, typeof this.mapValue)
    if (this.state.special == 'cal') this.datePicker = new DatePicker(this.$refs.input);
    if (this.state.focus && this.top) this.top().onPosted(function () {
      _this2.focus();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.datePicker) this.datePicker.destroy();
  },

  render: function render(h, context) {
    var _this3 = this;

    var entry = void 0,
        st = this.state,
        domProps = { value: this.userValue },
        attrs = { autofocus: st.focus, disabled: this.disabled },
        on = { input: this.input },
        style = this.genStyle,
        ref = 'input',
        conf = { ref: ref, style: style, attrs: attrs, domProps: domProps, on: on
      //console.log("Dew render:", this.field, st)
    };if (st.other) attrs = Object.assign(attrs, st.other);
    if (st.input == 'mle') {
      //Multi-line entry / textarea
      Object.assign(attrs, { rows: this.height, cols: this.width });
      entry = h('textarea', conf);
    } else if (st.input == 'chk') {
      //Checkbox
      Object.assign(attrs, { type: 'checkbox' });
      entry = h('div', { class: 'check', style: style }, [h('input', { ref: ref, attrs: attrs, domProps: { checked: this.userValue }, on: { change: function change(ev) {
            return _this3.input(ev, ev.target.checked);
          } } })]);
    } else if (st.input == 'pdm') {
      //Pull-down menu
      var optList = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.pdmValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var val = _step.value;

          optList.push(h('option', {
            attrs: { label: val.title, title: val.help },
            domProps: { value: val.value }
          }, val.title));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      entry = h('select', conf, optList);
    } else if (st.input == 'button') {
      //Action button
      //console.log("button lang:", this.lang)
      var txt = this.lang ? this.lang.title || this.lang : 'Reset',
          innerHTML = txt.split(' ')[0];
      Object.assign(on, { click: function click(ev) {
          return _this3.input(ev, true);
        } });
      Object.assign(conf, { domProps: { innerHTML: innerHTML } });
      entry = h('button', conf);
    } else {
      //Text or other input type
      Object.assign(attrs, { type: st.input == 'ent' ? 'text' : st.input, placeholder: this.hint });
      Object.assign(conf, { class: 'text' });
      Object.assign(on, { keyup: function keyup(ev) {
          if (ev.code == 'Enter') _this3.submit();
        } });
      //console.log("Render:", this.field, attrs, conf, on)
      entry = st.input ? h('input', conf) : null;
    }
    return h('div', {
      class: "wylib wylib-dew",
      attrs: { title: this.lang ? this.lang.help || this.lang.title || this.lang : null }
    }, [entry]);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/dialog.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mdew = __webpack_require__(/*! ./mdew.vue */ "./src/mdew.vue");

var _mdew2 = _interopRequireDefault(_mdew);

var _strdoc = __webpack_require__(/*! ./strdoc.vue */ "./src/strdoc.vue");

var _strdoc2 = _interopRequireDefault(_strdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");


var WmDefs = { //English defaults, as we may not yet be connected
  diaQuery: { title: 'Query', help: 'Please provide your input' },
  diaCancel: { title: 'Cancel', help: 'Dismiss the query' },
  diaConfirm: { title: 'Confirm', help: 'Asking for user confirmation of notice' },
  diaError: { title: 'Error', help: 'Confirm the error message' },
  diaYes: { title: 'Yes', help: 'Answer affirmatively' },
  diaOK: { title: 'OK', help: 'Confirm dialog' }
};

exports.default = {
  name: 'wylib-dialog',
  components: { 'wylib-mdew': _mdew2.default, 'wylib-strdoc': _strdoc2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      valid: true,
      stateTpt: { message: Com.langTpt, buttons: ['diaOK'], dews: null, data: {}, tag: 'dialog', iframe: null, component: null, check: null }
    };
  },


  computed: {
    id: function id() {
      return 'dialog_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    message: function message() {
      var msg = this.state.message;
      if (typeof msg == 'string') return msg;
      if (msg && (typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) == 'object' && 'title' in msg) return msg.title;
    },
    reason: function reason() {
      var wmReason = this.wm[this.state.reason];
      return (wmReason ? wmReason.title : this.state.reason) || 'Notice';
    },
    help: function help() {
      if (_typeof(this.state.message) == 'object') return this.state.message.help;
    },
    buttons: function buttons() {
      var _this = this;

      var butArr = [];
      //console.log("Buttons:", this.state.buttons)
      if (this.state.buttons) this.state.buttons.forEach(function (b) {
        var rec = b;
        if (typeof b == 'string') rec = { tag: b, lang: _this.wm[b] || { title: b }
          //        else if (rec.tag && !rec.lang && this.wm[rec.tag])	//Not sure we use this case
          //          rec.lang = this.wm[rec.tag]
        };rec.able = rec.tag == 'diaCancel' || _this.valid;
        butArr.push(rec);
      });
      return butArr;
    }
  },

  methods: {
    stateVar: function stateVar(sub1, sub2, def) {
      return this.state[sub1] ? this.state[sub1][sub2] : def;
    },
    submit: function submit(ev) {
      var butTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'diaYes';
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.data;

      //console.log("Dia submit:", ev, butTag, data)
      if (!this.valid) return;
      if (this.state.cb) //Callback for the dialog; Will not be persistent across reloads!
        this.state.cb(butTag, data);

      this.$parent.$emit('submit', ev, butTag, this.state.tag, data); //wylib-win with dialog in slot needs this
      this.$emit('submit', ev, butTag, this.state.tag, data); //dialog in pop uses this
    },
    change: function change(value, field, dirty, valid) {
      //When data changed
      var checked = true;
      //console.log("Dialog press:", field, value, dirty, valid, this.state.data[field])
      this.state.data[field] = value;
      if (this.state.check && typeof this.state.check == 'function') checked = this.state.check(this.state.data);
      this.valid = checked && valid;
    }
  },

  created: function created() {
    Wyseman.langDefs(this.env.wm, WmDefs);
  },

  beforeMount: function beforeMount() {
    Com.stateCheck(this);
    //console.log("Dialog state:", this.state)
    this.$parent.$emit('customize', this.state.report ? this.wm.diaReport : this.wm.diaDialog, 'dia:' + this.state.tag, this.state.iframe != null);
  },

  beforeDestroy: function beforeDestroy() {
    //console.log("Dialog destroy:", this.state)
    this.state.destroyed = true; //At least report module needs to know
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/indate.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/indate.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! ../node_modules/flatpickr/dist/themes/light.css */ "./node_modules/flatpickr/dist/themes/light.css");

//
//
//
//
//
//
//
//
//

var Flatpickr = __webpack_require__(/*! flatpickr */ "flatpickr");
exports.default = {
  name: 'wylib-indate',
  props: {
    container: { default: null }
  },
  data: function data() {
    return {
      picker: {}
    };
  },

  mounted: function mounted() {
    this.picker = Flatpickr('.date', {
      defaultDate: 'today',
      allowInput: true,
      appendTo: this.container || window.body,
      onClose: function onClose() {
        var dstrg = this.element.value,
            now = new Date();
        if (/\s*^[0-9]{1,2}\s*$/.test(dstrg)) {
          //Adapt to some incomplete date formats
          dstrg = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + dstrg;
        } else if (/^\s*[0-9]{1,2}[/-][0-9]{1,2}\s*$/.test(dstrg)) {
          dstrg = now.getFullYear() + '-' + dstrg;
        } else if (/^\s*[A-Za-z]\s*[,]*\s*[0-9]{1,2}\s*$/.test(dstrg)) {
          dstrg = dstrg + now.getFullYear();
        }
        console.log("Now:", now, "dstrg:", dstrg);
        var date = new Date(dstrg);
        console.log("Check date:", this.element.value, date);
        if (date == 'Invalid Date') this.element.value = '';else this.element.value = this.formatDate(date, 'Y-m-d');
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/launch.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _win = __webpack_require__(/*! ./win.vue */ "./src/win.vue");

var _win2 = _interopRequireDefault(_win);

var _dbp = __webpack_require__(/*! ../src/dbp.vue */ "./src/dbp.vue");

var _dbp2 = _interopRequireDefault(_dbp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");
exports.default = {
  name: 'wylib-launch',
  components: { 'wylib-win': _win2.default, 'wylib-dbp': _dbp2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    view: { type: String },
    tag: { type: String },
    env: { type: Object, default: Com.envTpt }
  },
  inject: ['app', 'top'],
  data: function data() {
    return {
      stateTpt: { windows: {} },
      viewMeta: null,
      launchData: null
    };
  },


  computed: {
    id: function id() {
      return 'launch_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    viewMsg: function viewMsg() {
      return this.viewMeta ? this.viewMeta.msg : null;
    },
    insTitle: function insTitle() {
      var title = this.viewMsg ? this.viewMsg['launch.title'] : null;
      return title ? title.help : null;
    },
    instructions: function instructions() {
      var instruct = this.viewMsg ? this.viewMsg['launch.instruct'] : null;
      return instruct ? instruct.help : null;
    },
    launchNum: function launchNum() {
      return this.launchData ? this.launchData.initial : 1;
    }
  },
  methods: {
    addWin: function addWin() {
      var newState = { posted: true, client: { dbView: this.view } };
      Com.addWindow(this.state.windows, newState, this, true);
    },
    closeWin: function closeWin(idx, reopen) {
      Com.closeWindow(this.state.windows, idx, this, reopen);
    },
    importFile: function importFile(ev) {
      var _this = this;

      Com.fileReader(ev.target, 1000, function (data) {
        var spec = { view: _this.launchData.import + '(jsonb)', params: [data] };
        console.log("Launch got file import:", data, "spec:", spec);
        Wyseman.request('import.' + _this.id, 'tuple', spec, function (res, err) {
          if (err) _this.top().error(err);
        });
      });
    }
  },

  beforeMount: function beforeMount() {
    var _this2 = this;

    Com.stateCheck(this);
    Wyseman.register(this.id + 'vm', this.view, function (data, err) {
      if (err) {
        console.log(err.msg);return;
      }
      _this2.viewMeta = data;
      _this2.launchData = _this2.viewMeta && _this2.viewMeta.styles ? _this2.viewMeta.styles.launch : null;
      //console.log("Launch got meta data:", this.view, data, this.launchData)

      var launchLang = _this2.viewMeta.msg['launch.title'] || { title: _this2.viewMeta.title, help: _this2.viewMeta.help };
      if (_this2.viewMeta.title) _this2.$parent.$emit('customize', _this2.tag, launchLang);
      if (_this2.launchNum > 0 && Object.keys(_this2.state.windows).length <= 0) for (var i = 0; i < _this2.launchNum; i++) {
        _this2.addWin();
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Interact = __webpack_require__(/*! interactjs */ "interactjs");

var dragTarget = null; //Communicate with each other about drag/drop through this

exports.default = {
  name: 'wylib-logitem',
  components: { 'wylib-button': _button2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    config: Object,
    index: Number,
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      dragOver: false
    };
  },

  computed: {
    id: function id() {
      return 'lit_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    notFunction: function notFunction() {
      return this.state.not ? 'Not' : 'Is';
    },
    isBinary: function isBinary() {
      return this.state.oper != 'isnull' && this.state.oper != 'true';
    },
    selRight: function selRight() {
      return this.state.right && this.state.right != '';
    },
    showEntry: function showEntry() {
      return this.isBinary && !this.selRight;
    },
    rhValue: function rhValue() {
      return this.state.right == "_";
    },
    background: function background() {
      return this.dragOver ? this.pr.dragOverBackground : this.pr.titleBackground;
    }
  },
  methods: {
    help: function help(opt) {
      return opt.lang ? opt.lang.help : opt.help;
    },
    title: function title(opt) {
      return opt.lang ? opt.lang.title : opt.title;
    },
    wMsg: function wMsg(msg) {
      var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'help';
      return this.wm[msg] ? this.wm[msg][sub] : null;
    },
    submit: function submit(ev) {
      this.$emit('submit', ev);
    },
    drop: function drop(ev) {
      //Event for the one being dragged
      if (!dragTarget || dragTarget == this) return; //Aborted drag
      //console.log("This (dragged):" + this.index, " State:" + JSON.stringify(this.state))
      //console.log("Target:" + dragTarget.index + " State:" + JSON.stringify(dragTarget.state))
      dragTarget.$emit('insert', dragTarget.index, this.state);
      dragTarget.dragOver = false; //Clear target highlighting
      this.$forceUpdate();
      //this.$emit('close')	Can't use close because index can change as a result of the above insert
      var closeIndex = dragTarget.$parent === this.$parent && this.index > dragTarget.index ? this.index + 1 : this.index;
      //console.log("Delete:" + closeIndex)
      this.$parent.closeChild(closeIndex);
      dragTarget = null;
    },
    zoneEnter: function zoneEnter(ev) {
      //Events for the one being dragged over
      this.dragOver = true; //Illuminate me (the drag target)
      dragTarget = this; //And remember who I am
      //console.log("Over item: " + JSON.stringify(this.state))
    },
    zoneLeave: function zoneLeave(ev) {
      if (ev.clientX == 0 && ev.clientY == 0) return; //Extra leave event fired at end of drag
      this.dragOver = false;
      dragTarget = null;
      //console.log("Leave: " + JSON.stringify(this.state))
    },
    notMe: function notMe(ev) {
      //console.log("Notting:", ev, this.state.not)
      this.state.not = !this.state.not;
    }
  },
  watch: {
    state: function state() {
      //console.log("Watch state: ", JSON.stringify(this.state))
    }
  },
  updated: function updated() {
    var _this = this;

    this.$nextTick(function () {
      _this.$emit('geometry', _this);
    });
  },
  //  created: function() {
  //  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.$emit('geometry', _this2);
    });
    //console.log("LogItem state: ", JSON.stringify(this.state))
    //console.log("       config: ", JSON.stringify(this.config))
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logitem = __webpack_require__(/*! ./logitem.vue */ "./src/logitem.vue");

var _logitem2 = _interopRequireDefault(_logitem);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
exports.default = {
  name: 'wylib-loglist',
  components: { 'wylib-logitem': _logitem2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    config: Object,
    index: Number,
    defOper: { type: String, default: '=' },
    env: { type: Object, default: Com.envTpt }
  },

  data: function data() {
    return {
      //    wm:		{},
      isAnd: true,
      childYs: [],
      stateTpt: { and: true, items: [] }
    };
  },


  computed: {
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    joinFunction: function joinFunction() {
      return this.state.and ? 'And' : 'Or';
    }
  },

  methods: {
    wMsg: function wMsg(msg) {
      var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'help';
      return this.wm[msg] ? this.wm[msg][sub] : null;
    },
    submit: function submit(ev) {
      this.$emit('submit', ev);
    },
    addNew: function addNew() {
      this.state.items.push({ left: null, not: false, oper: this.defOper });
      this.$emit('geometry', this, true);
    },
    closeChild: function closeChild(idx) {
      //console.log("Close: " + idx)
      this.$delete(this.state.items, idx);
      if (this.state.items.length <= 0) this.$emit('close');
      this.$emit('geometry', this, true);
      this.drawConnectors(); //Remove connector to this item
    },
    lower: function lower(idx) {
      //Turn an item component into a list component
      console.log("Lower: " + idx);
      var itemState = Object.assign({}, this.state.items[idx]);
      this.$set(this.state.items, idx, { and: 'true', items: [itemState] });
    },
    insert: function insert(idx, state) {
      console.log("Insert:" + idx + " State:" + state);
      this.state.items.splice(idx, 0, state);
    },
    childGeometry: function childGeometry(child, cascade) {
      var _this = this;

      //When a child has just rendered itself, capture its position
      var childBox = child.$el.getBoundingClientRect();
      var parBox = this.$el.getBoundingClientRect();
      //console.log("Child rendered:", childBox, "\n par box:", parBox)
      var halfHeight = Math.round(childBox.height / 2);
      var childY = Math.round(childBox.y) - Math.round(parBox.y) + halfHeight;
      this.childYs[child.index] = childY;
      //console.log(" index:" + child.index + " half:" + halfHeight + " Casc:" + cascade)
      if (cascade) this.$children.forEach(function (c) {
        //Recheck geometry of children below this one
        if (c.index > child.index) c.$forceUpdate();
      });
      this.$nextTick(function () {
        _this.drawConnectors();
      });
      this.$emit('geometry', this, true);
    },
    drawConnectors: function drawConnectors() {
      var path = "M 0 0";
      var hfudge = 5; //Move right to ready item
      var vfudge = 28; //Move down to first item
      var rad = 6;
      this.childYs.splice(this.state.items.length); //trim array if necessary of any old values
      for (var i = 0; i < this.childYs.length; i++) {
        //console.log(" child:", i, "Y:", this.childYs[i])
        if (i == 0) {
          path += ' v ' + (this.childYs[i] - vfudge); //First vertical stub
        } else {
          path += ' v ' + (this.childYs[i] - this.childYs[i - 1] - 2 * rad); //Down from last item
        }
        path += ' a ' + rad + ' ' + rad + ' 90 0 0 ' + rad + ' ' + rad; //Entry radius
        path += ' h ' + hfudge + ' h ' + -hfudge;
        if (i < this.childYs.length - 1) {
          path += ' a ' + rad + ' ' + rad + ' 90 0 0 ' + -rad + ' ' + rad;
        }
      }
      //console.log("  path:", JSON.stringify(path))
      this.$refs.connectPath.setAttribute('d', path);
      this.$refs.connector.style.height = this.childYs[this.childYs.length - 1] + 10 + 'px';
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-loglist'] = __webpack_require__(/*! ./loglist.vue */ "./src/loglist.vue").default;
  },

  //  watch: {
  //    state: function() {
  //console.log("LogList state: ", JSON.stringify(this.state))
  //    }
  //  },

  beforeUpdated: function beforeUpdated() {
    this.conPath = "M 0 0"; //Start to build connector pathway
    this.childPaths = 0;
    this.conLastY = 0;
  },
  updated: function updated() {
    //console.log("Updated:", this.index)
    this.$emit('geometry', this, true);
  },
  //  created: function() {
  //  },
  beforeMount: function beforeMount() {
    Com.stateCheck(this);
    //console.log("Loglist stateCheck:", this.state)
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.$emit('geometry', _this2, true);
    });
    //console.log("LogList state: ", JSON.stringify(this.state))
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dew = __webpack_require__(/*! ./dew.vue */ "./src/dew.vue");

var _dew2 = _interopRequireDefault(_dew);

var _indate = __webpack_require__(/*! ./indate.vue */ "./src/indate.vue");

var _indate2 = _interopRequireDefault(_indate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
exports.default = {
  name: 'wylib-mdew',
  components: { 'wylib-dew': _dew2.default, 'wylib-indate': _indate2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    data: { type: Object, default: function _default() {
        return {};
      } },
    config: { type: Array, default: function _default() {
        return [];
      } },
    bus: null,
    height: { type: Number, default: 300 }, //Fixme: used?
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      //    wm:		{},
      valids: {},
      dirtys: {},
      userData: {},
      dewBus: new Bus.messageBus(this),
      stateTpt: { optional: false, fields: [] }
    };
  },


  computed: {
    id: function id() {
      return 'mdew_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    dirty: function dirty() {
      return Object.values(this.dirtys).some(function (v) {
        return v;
      });
    },
    valid: function valid() {
      return Object.values(this.valids).every(function (v) {
        return v;
      });
    },
    hideOpts: function hideOpts() {
      return !this.state.optional;
    },
    optStyle: function optStyle() {
      return {
        background: this.state.optional ? this.pr.butToggledColor : this.pr.butBackground
      };
    },
    gridConfig: function gridConfig() {
      //Build a 2D grid from flat configuration data
      var minX = void 0,
          maxX = void 0,
          rows = [],
          noSpecs = [],
          nextRow = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.config[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var con = _step.value;

          //console.log("Mdew config rec:", con)
          var styles = con.styles;
          if (styles && styles.hide != null && styles.hide) continue;
          if (styles && styles.subframe) {
            //Does this field have any placement styling
            var _styles$subframe$spli = styles.subframe.split(' ').map(function (el) {
              return parseInt(el);
            }),
                _styles$subframe$spli2 = _slicedToArray(_styles$subframe$spli, 4),
                x = _styles$subframe$spli2[0],
                y = _styles$subframe$spli2[1],
                xSpan = _styles$subframe$spli2[2],
                ySpan = _styles$subframe$spli2[3];

            con.grid = { x: x, y: y, xSpan: xSpan, ySpan: ySpan
              //console.log("  grid:", y, con.grid)
            };if (x == null) x = 0;
            if (y == null) y = nextRow;
            if (rows[y] == null) rows[y] = [];
            rows[y][x] = con;
            if (minX == null || x < minX) minX = x;
            if (maxX == null || x > maxX) maxX = x;
            if (y >= nextRow) nextRow = y + 1;
          } else {
            noSpecs.push(con);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (minX > 0) rows = rows.map(function (row) {
        //Trim off any unfilled leading columns, such as 0
        var len = row.length;
        return row.slice(minX, len - minX + 1);
      });
      //console.log("  noSpecs:", noSpecs)
      noSpecs.forEach(function (con) {
        //Handle any columns with no explicit grid info
        if (nextRow > 0) Object.assign(con, { grid: { x: minX, y: nextRow++, xSpan: maxX - minX } });
        rows.push([con]);
      });
      //console.log("  rows:", rows)
      return rows;
    }
  },

  methods: {
    wmLang: function wmLang(tag) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'title';
      return this.wm[tag] ? this.wm[tag][type] : tag;
    },
    togOption: function togOption() {
      this.state.optional = !this.state.optional;
    },
    submit: function submit(ev) {
      this.$emit('submit', ev);
    },
    input: function input(value, field, dirty, valid) {
      //An input has been changed
      this.$set(this.dirtys, field, dirty);
      this.$set(this.valids, field, valid);
      this.userData[field] = value;
      //console.log("Mdew input:", field, value, dirty, valid, this.dirty, this.valid)
      this.$emit('input', value, field, this.dirty, this.valid);
    }
  },

  //  created: function() {
  //  },

  beforeMount: function beforeMount() {
    var _this = this;

    Com.stateCheck(this);
    if (this.bus) this.bus.register(this.id, function (msg, data) {
      if (msg == 'userData') {
        if (!data) return _this.userData; //Get all records
        var retData = {}; //Otherwise, get only dirty records
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.entries(_this.userData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref = _step2.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var val = _ref2[1];

            if (_this.dirtys[key]) retData[key] = val;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return retData;
      } else {
        //set or clear
        var answers = _this.dewBus.notify(msg, data); //Pass down to children
        //console.log("Mdew bus: ", msg, answers)
        answers.forEach(function (el) {
          //These don't generate input events, so grab values now
          var value = el.value,
              field = el.field,
              dirty = el.dirty,
              valid = el.valid;

          _this.userData[field] = value;
          _this.$set(_this.dirtys, field, dirty);
          _this.$set(_this.valids, field, valid);
        });
        return answers;
      }
    });
    //console.log("Mdew before:", this.config, this.data)
  },

  render: function render(h, context) {
    //console.log("Rendering", context)
    var rowOpts = void 0,
        tabRows = [];
    for (var y = 0; y < this.gridConfig.length; y++) {
      //Iterate through the rows
      var row = this.gridConfig[y],
          tabItems = [],
          colCount = 0,
          rowOptional = false,
          len = row ? row.length : 0; //How many fields on this row
      for (var x = 0; x < len; x++) {
        //Iterate through them
        //console.log("  item:", item)
        var item = row[x],
            col = item && item.grid ? item.grid.x : null,
            xSpan = (item && item.grid ? item.grid.xSpan : null) || 1,
            ySpan = (item && item.grid ? item.grid.ySpan : null) || 1;
        //console.log("    row:", y, "item:", x, col, colCount, item)
        if (item) {
          if (item.styles && item.styles.optional != null && item.styles.optional) rowOptional = true;
          var dew = h('wylib-dew', { //Make our data editing widget
            attrs: { value: this.data[item.field] },
            props: { field: item.field, state: item.styles, lang: item.lang, values: item.values, nonull: item.nonull, bus: this.dewBus, env: this.env },
            on: { input: this.input, submit: this.submit }
          });
          tabItems.push(h('td', { class: "label" }, item.lang ? item.lang.title + ':' : null));
          tabItems.push(h('td', { attrs: { colspan: xSpan * 2 - 1, rowspan: ySpan } }, [dew]));
        } else if (colCount < col) {
          //Assuming prior columns haven't spanned available space
          tabItems.push(h('td')); //pad it with dead cells
          tabItems.push(h('td'));
        }
        colCount += xSpan;
      }
      if (rowOpts == null && rowOptional) {
        //Time for the 'optional' button?
        var optButton = h('div', {
          class: "wylib-mdew-option",
          attrs: { title: this.wmLang('mdewMore', 'help') },
          style: this.optStyle,
          //          domProps:{innerHTML: this.wmLang('mdewMore')},
          on: { click: this.togOption }
        });
        rowOpts = { class: { //All rows optional from here on
            'wylib-mdew-hide': this.hideOpts
          } };
        tabRows.push(h('tr', { class: 'wylib-mdew-optline' }, [optButton]));
      }
      if (tabItems.length > 0) tabRows.push(h('tr', rowOpts, tabItems));
    }

    return h('div', { class: "wylib wylib-mdew" }, [h('table', {}, tabRows)]);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dew = __webpack_require__(/*! ./dew.vue */ "./src/dew.vue");

var _dew2 = _interopRequireDefault(_dew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");

//import Win from './win.vue'		//Recursive, so defined in beforeCreate

exports.default = {
  name: 'wylib-menu',
  components: { 'wylib-dew': _dew2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    layout: { type: Array, default: function _default() {
        return ['icon', 'lang', 'input'];
      } },
    config: Array,
    lang: { type: Object, default: Com.langTpt },
    top: null,
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      //    pr:		require('./prefs'),
      stateTpt: { subs: {} }
    };
  },

  computed: {
    id: function id() {
      return 'menu_' + this._uid + '_';
    },
    pr: function pr() {
      return this.env.pr;
    }
  },
  methods: {
    iconSvg: function iconSvg(icon) {
      return Icons(icon);
    },
    iconStyle: function iconStyle(tog) {
      return {
        backgroundColor: tog ? this.pr.butToggledColor : this.pr.butBackground
      };
    },
    enterItem: function enterItem(ev, item) {
      var _this = this;

      var idx = item.idx,
          theSubs = this.state.subs,
          theSub = theSubs[idx];
      //console.log("Entering item: ", idx, "menu:", item.menu, "Subs:", theSubs, "Sub:", theSub)
      if (!theSubs || theSubs.length <= 0) return;
      Object.keys(this.state.subs).forEach(function (key) {
        //Close any subwindows when moving around
        if (theSubs[key] && !theSubs[key].pinned) theSubs[key].posted = false;
      });

      if (item.menu && theSub) {
        //But open any submenu associated with this line
        theSub.posted = true;
        if (theSub.x == null || theSub.y == null) this.$nextTick(function () {
          //If this is the first time posted, let it post, then place it
          //console.log("Refs:", this.$refs)
          var itemBBox = ev.target.getBoundingClientRect(),
              menuBBox = ev.target.closest('.wylib-menu').getBoundingClientRect(),
              viewWidth = window.innerWidth || document.documentElement.clientWidth,
              rightGap = viewWidth - (menuBBox.x + menuBBox.width),
              subComp = _this.$refs.submenu.find(function (cur) {
            return cur.state == theSub;
          }),
              subElem = subComp ? subComp.$el : null,
              subBBox = subElem ? subElem.getBoundingClientRect() : null,
              subWidth = subBBox ? subBBox.width : 200;
          //console.log("rightGap:", rightGap, "subWidth:", subWidth, "Menu wid:", menuBBox.width, "sub:", subElem.getBoundingClientRect())
          theSub.y = itemBBox.y - menuBBox.y - itemBBox.height; //Place the menu relevant to the invoking menu item
          theSub.x = rightGap < subWidth ? -(menuBBox.width + subWidth) : 0;
          //console.log("Posting sub:", theSub.x, theSub.y, "Item:",itemBBox, "Menu:",menuBBox, viewWidth, "Comp:", subComp, "Elem:", subElem)
        });
      }
      //console.log("  Posted: ", theSub)
    },
    execute: function execute(cb, ev, item) {
      //Execute the specified callback
      if (cb) cb(ev);
      //console.log("Menu Execute: ", item.idx, ev)
      if (item.menu) {
        //Clicking on sub-menu selector
        var idx = item.idx,
            sub = this.state.subs[idx];

        sub.posted = sub.pinnable && sub.pinned ? true : !sub.posted; //Toggle sub-menu
      } else if (item.input) {//Is this a data input item, don't execute anything
        //console.log("  Input menu item: ", item.idx)
      } else {
        this.$emit('done');
      }
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-win'] = __webpack_require__(/*! ./win.vue */ "./src/win.vue").default;
  },

  created: function created() {
    var _this2 = this;

    Com.stateCheck(this);
    //console.log("Menu state: ", this.lang.title, this.state)

    this.config.forEach(function (item, x) {
      //Set any object properties that are not known until now
      if (item.menu && !_this2.state.subs[item.idx]) {
        _this2.$set(_this2.state.subs, item.idx, { posted: false, pinned: false, x: null, y: null, client: {} });
        //console.log("Set default for: ", item.idx, "State:", this.state.subs[item.idx])
      }
    });
  },

  mounted: function mounted() {
    //console.log("Menu components: " + JSON.stringify(this.$options.components))
    //    this.$on('customize', (lang, tag)=>{this.$parent.$emit(lang, tag)})
    this.$parent.$emit('customize', this.lang);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.top) this.top.listenClick(this.id); //De-register
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _win = __webpack_require__(/*! ./win.vue */ "./src/win.vue");

var _win2 = _interopRequireDefault(_win);

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
exports.default = {
  name: 'wylib-menudock',
  components: { 'wylib-win': _win2.default, 'wylib-menu': _menu2.default, 'wylib-button': _button2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    lang: { type: Object, default: Com.langTpt },
    config: Array,
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      stateTpt: { menu: { client: {}, posted: false } }
    };
  },


  beforeMount: function beforeMount() {
    //console.log("Menudock state: ", JSON.stringify(this.state, null, 2))
    Com.stateCheck(this);
    this.$parent.$emit('customize', this.lang);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _require = __webpack_require__(/*! slickgrid-es6 */ "slickgrid-es6"),
    Grid = _require.Grid,
    Data = _require.Data,
    Formatters = _require.Formatters,
    Plugins = _require.Plugins;

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var ElementResize = __webpack_require__(/*! element-resize-detector */ "element-resize-detector");
var elementResize = ElementResize({ strategy: 'scroll' });

var options = {
  enableCellNavigation: true,
  enableColumnReorder: true,
  multiColumnSort: true,
  syncColumnCellResize: true,
  createFooterRow: true,
  showFooterRow: true, //Fixme: https://github.com/6pac/SlickGrid/blob/master/examples/example-footer-totals.html
  explicitInitialization: true //Init after plugins registered
  //  autoHeight: true			//Disables scrolling
  //  enableTextSelectionOnCells: true,	//Undesirable side effects (select all on right click?)
  //  multiSelect: true,
  //  autoEdit: false
};

exports.default = {
  name: 'wylib-mlb',
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    data: { type: Array, default: function _default() {
        return [];
      } },
    config: { type: Object, default: function _default() {
        return {};
      } },
    bus: null, //To receive commands from parent dbp
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      //    pr:		require('./prefs'),
      orderBoxes: {}, //Div elements that show sort order in header field
      gridInstance: null, //Keep pointer to our grid
      stateTpt: { footerOn: false, sorting: {}, columns: [], see: 'top', sortColumns: null }
    };
  },

  computed: {
    id: function id() {
      return 'mlb_' + this._uid + '_';
    },
    pr: function pr() {
      return this.env.pr;
    },
    slickColumns: function slickColumns() {
      var _this = this;

      //Convert wyseman column spec to what slickgrid expects
      var cols = [];
      //console.log("SlickColumns cols:", this.state.columns)
      if (this.state.columns === undefined) return cols; //If we are too early in the lifecycle to have data yet

      var _loop = function _loop(field) {
        var conf = _this.config[field],
            col = _this.state.columns.find(function (e) {
          return e.field == field;
        }),
            visible = !conf || conf.visible === undefined ? true : conf.visible; //visibility defaults to true
        if (!col) {
          //Add any missing column using defaults
          col = { field: field, order: conf.order, width: conf.width || _this.pr.mlbDefWidth, visible: visible };
          _this.state.columns.push(col);
        }
        //console.log("field:", col.field, col.width, conf.title, visible)
        if (visible) cols.push({ //Create the missing column
          id: field, field: field, sortable: true,
          order: col.order, width: col.width,
          name: conf.title, toolTip: col.field + '\n' + conf.help,
          minWidth: _this.pr.mlbMinWidth,
          cssClass: conf.just ? 'align-' + conf.just : '',
          header: {
            buttons: [{ cssClass: 'slick-header-column-order slick-header-column-field-' + col.field }]
          }
        });
      };

      for (var field in this.config) {
        _loop(field);
      }
      this.state.columns.forEach(function (col, idx) {
        //Get rid of any columns not described in config
        if (!(col.field in _this.config)) _this.state.columns.splice(idx, 1);
      });
      cols.sort(function (a, b) {
        return a.order - b.order;
      });
      //console.log("sorted: ", cols)
      return cols;
    },
    gridWidth: function gridWidth() {
      if (this.state.columns === undefined) return 0; //If we are too early to have data yet
      var wid = this.state.columns.reduce(function (acc, el) {
        return acc + (el.visible ? el.width : 0);
      }, 0);
      //console.log("Width: ", wid)
      return wid + 4 + 'px';
    }
  },

  methods: {
    getSelection: function getSelection() {
      return this.gridInstance.getSelectedRows();
    },
    dblClickHandler: function dblClickHandler(e, args) {
      //console.log("DblClick: ", args.row, ", ", args.cell, " Sel: ", this.getSelection())
      this.$emit('execute', this.getSelection());
    },
    headerClickHandler: function headerClickHandler(e, args) {
      //console.log("Header Click: ", e, "field:", args.column.field)
      if (e.target.className == 'slick-resizable-handle') {
        if (args.column.clickTimer) {
          //Detect a double click on the resize button
          //console.log("  resize!")
          this.autoSize(args.column.field);
        } else {
          args.column.clickTimer = true;
          setTimeout(function () {
            args.column.clickTimer = false;
          }, 200);
        }
      }
    },
    menuHandler: function menuHandler(e) {
      console.log("Context Menu: " + e.target);
      e.preventDefault();
      this.$emit('contextMenu', e); //Fixme: would need same code as headerMenuHandler to pass idx
    },
    headerMenuHandler: function headerMenuHandler(e) {
      e.preventDefault();
      var head = e.target.closest('.slick-header-column') //header above me
      ,
          ord = head.querySelector('.slick-header-column-order') //custom button below that
      ,
          idx = null;
      for (var i = 0; i < ord.classList.length; i++) {
        //hack way to find this column field name
        if (/^slick-header-column-field-/.test(ord.classList[i])) {
          idx = ord.classList[i].replace('slick-header-column-field-', '');
        }
      }
      var mlbBox = this.$el.getBoundingClientRect();
      //console.log("Header Menu:", e, "Index:", idx, mlbBox, e.clientX, e.clientY)
      this.$emit('headerMenu', e, idx, e.clientX - parseInt(mlbBox.x), e.clientY - parseInt(mlbBox.y));
    },
    updateSortNumbers: function updateSortNumbers() {
      var _this2 = this;

      //Update the numbers in our custom order boxes
      var cols = this.gridInstance.getSortColumns(),
          i = cols.length;
      //console.log("Update sort:", cols)
      Object.keys(this.orderBoxes).forEach(function (key) {
        if (_this2.orderBoxes[key]) _this2.orderBoxes[key].innerHTML = '';
      });
      if (i > 1) cols.forEach(function (rec) {
        //console.log("  field:", rec.columnId, i)
        _this2.orderBoxes[rec.columnId].innerHTML = i--;
      });
    },
    sortHandler: function sortHandler(e, args) {
      //Called when we re-sort
      var multiColumnSort = args.multiColumnSort,
          sortCols = args.sortCols,
          grid = args.grid;
      //console.log("Mlb sortHandler: ", multiColumnSort, JSON.stringify(this.state.sortColumns))

      this.state.sortColumns = Com.clone(grid.getSortColumns());
      //console.log("  sortHandler: ", JSON.stringify(this.state.sortColumns))
      //      this.updateSortNumbers()		//Will catch from watch state.sortColumns
      //      this.$emit('sort', this.state.sortColumns)
    },
    resizeHandler: function resizeHandler(e, args) {
      var _this3 = this;

      var _loop2 = function _loop2(i, cols) {
        var col = args.grid.getColumns()[i];
        if (!col.previousWidth || col.width != col.previousWidth) {
          //console.log(" setting:", col.field)
          _this3.state.columns.find(function (e) {
            return e.field == col.field;
          }).width = col.width;
        }
      };

      //Handle a column resize
      //console.log("Resized:", e, "Args:", args)
      for (var i = 0, cols = args.grid.getColumns().length; i < cols; i++) {
        _loop2(i, cols);
      }
      this.$emit('geometry', e);
    },
    reorderHandler: function reorderHandler(e, args) {
      var _this4 = this;

      //Called after dragging a column
      //console.log("Reordered:", e, "Args:", args)
      var i = 0;
      args.grid.getColumns().forEach(function (c) {
        _this4.state.columns.find(function (e) {
          return e.field == c.field;
        }).order = i++;
      });
      //console.log(" cols:", JSON.stringify(this.state.columns))
      this.$emit('geometry', e);
    },
    winSizeHandler: function winSizeHandler(el) {
      //Called when our container gets resized
      //console.log("Window resize:", el.style.height)
      var height = parseInt(el.getBoundingClientRect().height),
          table = this.$refs.gridTable;
      if (table && table.style) table.style.height = height + 'px'; //Set height of grid div to fill available space
      this.gridInstance.resizeCanvas(); //Let slickgrid know about it
    },
    see: function see(line) {
      //Make a certain line visible
      if (line) this.gridInstance.scrollRowIntoView(line, false);else if (this.state.see == 'top') this.gridInstance.scrollRowIntoView(0, false);else this.gridInstance.scrollRowIntoView(this.data.length, true);
    },
    advance: function advance() {
      var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      //Move current line forward or backward
      var sel = this.getSelection()[0],
          was = sel == null ? -1 : sel,
          line = was;
      line = line + delta;
      //console.log("Advance:", delta, was, sel, line)
      if (line < 0) line = 0;
      if (line >= this.data.length) line = this.data.length - 1;
      if (line != was) {
        this.gridInstance.setSelectedRows([line]);
        this.$emit('execute', this.getSelection());
        return line;
      }
    },
    autoSize: function autoSize(field) {
      //Move current line forward or backward
      var idx = this.state.columns.findIndex(function (e) {
        return e.field == field;
      }),
          maxLen = 2,
          aCell = this.$el.querySelector('.slick-cell'),
          fontSize = aCell ? parseFloat(window.getComputedStyle(aCell, null).getPropertyValue('font-size')) : 16;
      //console.log("Mlb autosize:", field, idx, fontSize)
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dat = _step.value;

          var content = dat[field],
              len = content ? content.toString().length : 0;
          if (len > maxLen) maxLen = len;
        }
        //console.log("  maxLen:", maxLen, fontSize, this.pr.mlbMaxWidth)
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.state.columns[idx].width = Math.min((maxLen + 1) * fontSize * 0.48, this.pr.mlbMaxWidth); //Estimate of width/font size
    }
  },

  watch: {
    'state.see': function stateSee(val) {
      this.see();
    },
    'state.footerOn': function stateFooterOn(val) {
      console.log("Footer:", this.state.footerOn, val);
      this.gridInstance.setOptions({ showFooterRow: val });
      //      this.gridInstance.setOptions({showFooterRow: val, createFooterRow: true})
      this.gridInstance.resizeCanvas();
    },
    'state.sortColumns': function stateSortColumns(newVal, oldVal) {
      //In case change came from state update
      var newStr = JSON.stringify(newVal),
          oldStr = JSON.stringify(oldVal);
      //console.log("Watched sortColumns changed:", newStr != oldStr, oldStr, newStr)
      this.updateSortNumbers();
      if (newVal && newStr != oldStr) {
        this.gridInstance.setSortColumns(Com.clone(this.state.sortColumns));
        this.$emit('sort', this.state.sortColumns);
      }
    },
    'slickColumns': function slickColumns(val) {
      var _this5 = this;

      //console.log("Watched slickColumns changed")
      this.gridInstance.setColumns(this.slickColumns);
      var headers = this.$refs.gridTable.querySelector('.slick-header');
      this.state.columns.forEach(function (col) {
        //Find and remember all the divs holding sort order numbers
        var field = col.field,
            sortBox = headers.querySelector('.slick-header-column-field-' + field);
        if (sortBox) _this5.orderBoxes[field] = sortBox;
        //console.log(" field: " + field + " Box: ", this.orderBoxes[field])
      });
    },
    'gridWidth': function gridWidth(val) {
      this.$refs.gridTable.style.width = this.gridWidth;
    },

    data: function data(val) {
      //Reload grid when data changes
      //console.log("Watched data changed: ", val)
      this.gridInstance.setData(val, false);
      this.see();
      this.gridInstance.render();
    }
  },

  beforeMount: function beforeMount() {
    var _this6 = this;

    //console.log("Mlb before, state:", this.id, this.state);
    Com.stateCheck(this);

    if (this.bus) this.bus.register(this.id, function (msg, data) {
      if (msg == 'advance') return _this6.advance(data);else if (msg == 'autosize') return _this6.autoSize(data);
    });

    var _loop3 = function _loop3(field) {
      var con = _this6.config[field];
      var visible = con.visible === undefined ? true : con.visible;
      if (!_this6.state.columns.find(function (e) {
        return e.field == field;
      })) //Make sure we have a column for all known fields
        _this6.state.columns.push({ field: field, order: con.order, width: con.width || _this6.pr.mlbDefWidth, visible: visible });
    };

    for (var field in this.config) {
      _loop3(field);
    }
  },

  mounted: function mounted() {
    elementResize.listenTo(this.$el, this.winSizeHandler); //Event when our component div size gets changed

    this.$refs.gridTable.style.height = '200px'; //Init to some known height, for now
    //console.log("data: " + JSON.stringify(this.data))
    var gi = this.gridInstance = new Grid(this.$refs.gridTable, this.data, this.slickColumns, options);
    gi.setSelectionModel(new Plugins.RowSelectionModel());
    gi.registerPlugin(new Plugins.HeaderButtons()); //For showing sort order
    gi.setOptions({ showFooterRow: this.state.footerOn });
    gi.init();

    gi.onContextMenu.subscribe(this.menuHandler);
    gi.onSort.subscribe(this.sortHandler);
    gi.onDblClick.subscribe(this.dblClickHandler);
    gi.onHeaderClick.subscribe(this.headerClickHandler);
    gi.onColumnsResized.subscribe(this.resizeHandler);
    gi.onColumnsReordered.subscribe(this.reorderHandler);
    gi.onHeaderContextMenu.subscribe(this.headerMenuHandler); //Prevent annoying right-click behavior on header fields
    if (this.state.sortColumns) {
      //Initialize sort column display
      gi.setSortColumns(Com.clone(this.state.sortColumns));
      this.updateSortNumbers;
    }
    //console.log("Mlb sorting:", this.state.sortColumns)
  },

  beforeDestroy: function beforeDestroy() {
    elementResize.removeListener(this.$el, this.winSizeHandler);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var TopHandler = __webpack_require__(/*! ./top.js */ "./src/top.js");

exports.default = {
  name: 'wylib-modal',
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      //    pr:		require('./prefs'),
      top: null,
      stateTpt: { posted: false, client: {} }
    };
  },

  computed: {
    id: function id() {
      return 'modal_' + this._uid + '_';
    },
    pr: function pr() {
      return this.env.pr;
    },
    screenStyle: function screenStyle() {
      return {
        display: this.state.posted ? 'flex' : 'none'
      };
    },
    dialogStyle: function dialogStyle() {
      return {
        background: this.pr.dataBackground,
        borderColor: this.pr.winHighlightColor,
        borderWidth: this.pr.winBorderWidth + 'px'
      };
    }
  },
  watch: { //Let parent and any content clients, we just posted
    'state.posted': function statePosted(isPosted) {
      var _this = this;

      //console.log("Posted, children:", this.$scopedSlots)
      if (isPosted) this.$nextTick(function () {
        _this.$emit('posted'); //Tell parent
        if (_this.top) _this.top.posted(); //and anyone else who might be listening
      });
    }
  },

  beforeMount: function beforeMount() {
    var _this2 = this;

    Com.stateCheck(this);
    this.$on('submit', function (tag) {
      //console.log("Modal got submit:", tag)
      _this2.state.posted = false;
    });
  },
  mounted: function mounted() {
    this.top = new TopHandler();
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/pop.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dialog = __webpack_require__(/*! ./dialog.vue */ "./src/dialog.vue");

var _dialog2 = _interopRequireDefault(_dialog);

var _modal = __webpack_require__(/*! ./modal.vue */ "./src/modal.vue");

var _modal2 = _interopRequireDefault(_modal);

var _strdoc = __webpack_require__(/*! ./strdoc.vue */ "./src/strdoc.vue");

var _strdoc2 = _interopRequireDefault(_strdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var TopHandler = __webpack_require__(/*! ./top.js */ "./src/top.js");
exports.default = {
  name: 'wylib-pop',
  components: { 'wylib-modal': _modal2.default, 'wylib-dialog': _dialog2.default, 'wylib-strdoc': _strdoc2.default },
  //  props: {
  //    tag:	{type: String},
  //  },
  data: function data() {
    return {
      state: { format: 'dialog', content: {} },
      modal: { posted: false, client: {} },
      top: null,
      env: { wm: { h: {}, t: {} }, pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js") },
      compBus: new Bus.messageBus(this)
      //    config:	{}			//Any applicable report configuration
    };
  },
  provide: function provide() {
    var _this = this;

    return {
      top: function top() {
        return _this.top;
      },
      app: function app() {
        return _this.top;
      }
    };
  },

  computed: {
    id: function id() {
      return 'pop_' + this._uid + '_';
    },
    compName: function compName() {
      //What standard component we will use
      if (!this.state.format || this.state.format == 'html') return null;
      if (this.state.format.includes('-')) return this.state.format;
      return 'wylib-' + this.state.format;
    }
  },
  methods: {
    submit: function submit(request, data) {
      //If the widget we contain emits 'submit'
      //console.log("Pop got submit:", request, data)
      this.top.momWin({ request: request, data: data });
    }
  },

  created: function created() {
    //console.log("Pop env:", this.env)
    this.top = new TopHandler(this, true);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.top.momWin({ request: 'control' }); //Let parent window know we are ready to load content

    this.top.listenWin('', function (request, data) {
      //Listen for messages from '' (master window)
      //console.log("Popup got message:", request, "Data:", data)
      if (request == 'populate' && data.format) {
        //console.log("Popup got populate:", format, content, config)
        var format = data.format,
            content = data.content,
            config = data.config,
            _ref = config || {},
            action = _ref.action;

        _this2.state.format = format;
        _this2.state.content = content;
        //        this.config = config				//Save original report configuration
        if (window.opener && action) window.document.title = action.lang.title;
        if (format != 'html') _this2.top.momWin({ request: 'env' }); //Components will need language and prefs
      } else if (request == 'env' && data) {
        Object.assign(_this2.env, data);
        //console.log("Popup got env:", this.env)
      } else if (request == 'child' && data) {
        //console.log("Popup send to child:", data)
        _this2.compBus.notify(data);
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/report.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");

exports.default = {
  name: 'wylib-report',
  //  components: {'wylib-menudock': MenuDock},	//To avoid recursion problems
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    ready: { type: Function },
    render: { type: Boolean },
    bus: { default: null }, //Communication from parent window
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    return {
      stateTpt: { src: '', name: '', config: null },
      dirty: false
    };
  },

  inject: ['top'],
  computed: {
    id: function id() {
      return 'report_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },

    //    tagTitle() {return this.tag || this.title},
    dockConfig: function dockConfig() {
      return [{ idx: 'run', lang: this.wm.repRun, call: this.run, icon: 'wand', shortcut: true }];
    }
  },
  methods: {
    run: function run(ev) {
      console.log("Run report:", ev);
    },
    reload: function reload(req, data) {
      //console.log("Reloading iframe:", this.state.src)
      var win = this.$refs.iframe ? this.$refs.iframe.contentWindow : null,
          location = win ? win.location : null;
      if (location) location.reload();
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-menudock'] = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue").default; //Seems to work better here to avoid recursion problems
  },

  beforeMount: function beforeMount() {
    var _this = this;

    Com.stateCheck(this);
    if (this.bus) this.bus.register(this.id, this.state.name, function (req, data) {
      //console.log("Report got request:", req, data)
      if (req == 'reload') _this.reload();else if (req == 'dirty') _this.dirty = data;
    });
  },

  mounted: function mounted() {
    var _this2 = this;

    var action = this.state.config ? this.state.config.action : null,
        actTag = this.state.config ? this.state.config.actTag : null;
    //console.log("Report mounted:", this.ready, this.state.config, actTag)
    if (actTag) this.$parent.$emit('customize', action.lang, actTag, true, function () {
      return _this2.dirty;
    });
    //    this.$parent.$emit('swallow', this.$refs.header)		//Only if we re-enable a report menu

    if (this.ready && typeof this.ready == 'function') {
      this.ready(this.$refs.iframe);
    } else if (!this.ready && this.state.config) {
      //console.log("Report restoring from config:", this.state.config, this.bus)
      if (this.bus) this.$nextTick(function () {
        _this2.bus.master.$emit('report', _this2.state.config);
      });
    }
  }

  //  beforeDestroy: function() {
  //  },
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/strdoc.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");
var CrossRef = __webpack_require__(/*! ./crossref.js */ "./src/crossref.js");
var Interact = __webpack_require__(/*! interactjs */ "interactjs");
//const DiffPatch = require('jsondiffpatch')
var FileSaver = __webpack_require__(/*! file-saver */ "file-saver");


var IndentOff = 50;
var PtrString = ' 7 7, pointer';
var TrashPtr = Icons.url('bin') + PtrString;
var Pointers = {
  movebef: Icons.url('redo') + PtrString,
  moveaft: Icons.url('forward') + PtrString,
  moveapp: Icons.url('arrowdr') + PtrString,
  copybef: Icons.url('replus') + PtrString,
  copyaft: Icons.url('forplus') + PtrString,
  copyapp: Icons.url('adrplus') + PtrString
};

var LegalTags = ['b', 'i', 'u', 'x-r'];
var dragTarget = null; //Communicate with others about drag/drop
var dragee = null;

customElements.define('x-r', CrossRef);
//DiffPatch.create({
//  objectHash: function(obj, index) {
//    return obj.title + obj.tag + obj.text || '$$index:' + index;
//  }
//})

exports.default = {
  name: 'wylib-strdoc',
  components: { 'wylib-button': _button2.default }, //To avoid recursion problems
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    indent: { type: Number, default: 1 },
    parSpace: { type: Number, default: 0.4 },
    level: { type: Number, default: 0 },
    prefix: { type: String, default: null },
    index: { type: Number, default: 0 },
    editable: { type: Boolean, default: true },
    env: { type: Object, default: Com.envTpt },
    bus: { default: null } //Commands from the toplevel strdoc
  },
  data: function data() {
    return {
      dragOver: false, //Kept by the dragged-onto
      dragType: null, //null, 'move', 'copy', 'trash', kept by the dragged
      inPoint: null, //'bef', 'aft', 'app', kept by the dragged
      dragOrigin: null, //X,Y where we started dragging
      over: false,
      dirty: false,
      contEdit: false,
      undoStack: [],
      crossVals: {},
      spellCheck: true,
      subBus: this.bus,
      stateTpt: { title: null, text: null, tag: null, sections: [], source: null, edit: false }
    };
  },

  inject: ['top'],
  computed: {
    id: function id() {
      return 'sdc_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    iAmChief: function iAmChief() {
      return this.level <= 0;
    },
    useBus: function useBus() {
      return this.iAmChief ? this.subBus : this.bus;
    },
    headerHeight: function headerHeight() {
      return this.pr.winFullHeader - 1;
    },
    //Fit in parent header, plus top border
    nextPrefix: function nextPrefix() {
      //Prefix to send to my children
      return this.iAmChief ? '' : (this.prefix || '') + (this.index || '') + '.';
    },
    secNumber: function secNumber() {
      return (this.prefix || '') + (this.index == null ? '' : this.index);
    },
    numTitle: function numTitle() {
      //Full, numbered title
      return this.secNumber + '.' + (this.state.title ? '<b>' + this.state.title + '</b>' : '');
    },
    titledText: function titledText() {
      return this.iAmChief ? this.state.text : this.numTitle + (this.state.title ? ':' : '') + (' ' + this.state.text || false);
    },
    secHelp: function secHelp() {
      return (this.wm.t.sdcSection || "Section") + ': ' + this.state.title || '' + '(' + this.state.tag || '' + '); ' + (this.wm.h.sdcSection || '');
    },
    sourceURL: function sourceURL() {
      var _ref = this.state.source ? this.state.source.split('/') : [],
          _ref2 = _slicedToArray(_ref, 2),
          domain = _ref2[0],
          path = _ref2[1],
          _ref3 = path ? path.split('?') : [],
          _ref4 = _slicedToArray(_ref3, 2),
          host = _ref4[0],
          query = _ref4[1],
          qArray = query ? query.split('&') : [];
      //console.log("sourceURL:", domain, "h:", host, "q:", query)


      if (domain) qArray.push('domain=' + domain);
      return [host, qArray.join('&')].join('?');
    },
    iconStyle: function iconStyle() {
      return {
        fill: this.pr.butIconfill,
        stroke: this.pr.butIconStroke,
        height: '1em',
        width: '1em'
      };
    },
    dragCursor: function dragCursor() {
      var cur = 'move',
          typeP = this.dragType + this.inPoint;
      //console.log("dragCursor:", this.dragType, typeP)
      if (this.dragType == 'trash') cur = TrashPtr;else if (typeP && typeP in Pointers) cur = Pointers[typeP];
      return cur;
    },
    comStyle: function comStyle() {
      return {
        background: this.dragOver ? this.pr.dragOverBackground : this.over ? this.pr.highlightBackground : this.pr.dataBackground,
        padding: '' + this.parSpace + 'em 0px 0px ' + this.indent + 'em',
        border: this.state.edit ? '2px solid ' + this.pr.highlightBackground : 'none',
        cursor: this.dragCursor
      };
    },
    parStyle: function parStyle() {
      return {
        textIndent: this.contEdit ? '0px' : this.iAmChief ? '1em' : '-1em'
      };
    },
    dockConfig: function dockConfig() {
      var _this = this;

      return [{ idx: 'und', lang: this.wm.sdcUndo, call: this.undo, icon: 'undo', shortcut: true, disabled: !this.undoStack.length }, { idx: 'upd', lang: this.wm.sdcUpdate, call: this.update, icon: 'floppy', shortcut: true, disabled: !this.dirty }, { idx: 'clr', lang: this.wm.sdcClear, call: this.clear, icon: 'sun', shortcut: true }, { idx: 'imp', lang: this.wm.sdcImport, call: this.import, icon: 'boxin', disabled: !this.dirty }, { idx: 'exp', lang: this.wm.sdcExport, call: this.export, icon: 'boxout', shortcut: true }, { idx: 'spl', lang: this.wm.sdcSpell, call: this.spellTog, icon: 'spell', type: 'checkbox', toggled: this.spellCheck, input: this.spellCheckValue }, { idx: 'eda', lang: this.wm.sdcEditAll, icon: 'pencil', shortcut: true, call: function call(ev) {
          return _this.subBus.notify('edit');
        } }, { idx: 'pra', lang: this.wm.sdcPrevAll, icon: 'document', shortcut: true, call: function call(ev) {
          return _this.subBus.notify('preview');
        } }, { idx: 'bld', lang: this.wm.sdcBold, icon: 'bold', shortcut: true, call: function call(ev) {
          return _this.markUp(ev, 'bold');
        } }, { idx: 'ita', lang: this.wm.sdcItalic, icon: 'italic', shortcut: true, call: function call(ev) {
          return _this.markUp(ev, 'italic');
        } }, { idx: 'uln', lang: this.wm.sdcUnder, icon: 'underline', shortcut: true, call: function call(ev) {
          return _this.markUp(ev, 'underline');
        } }, { idx: 'sec', lang: this.wm.sdcCross, icon: 'pilcrow', shortcut: true, call: function call(ev) {
          return _this.markUp(ev, 'crossref', 'x-r');
        } }];
    }
  },
  methods: {
    change: function change(ev) {
      //console.log('Strdoc change', this.index, this.iAmChief, ev)
      if (this.iAmChief) this.dirty = true; //Chief marks itself
      else this.bus.master.$emit('dirty'); //Children emit on Chief
    },
    iconSvg: function iconSvg(icon) {
      return Icons(icon);
    },
    butHelp: function butHelp(tag) {
      return this.wm.t[tag] + ' (' + this.wm.h[tag] + ')';
    },
    processXrefs: function processXrefs(ev) {
      var name = ev.target.name,
          value = ev.target.value;
      //console.log('Proc xref!', this.secNumber, 'n:', name, 'v:', value)
      this.crossVals[name] = value; //Cache cross reference values
      this.$el.querySelectorAll('x-r:not([name])').forEach(function (el) {
        //console.log('   xref', el.value, el.innerHTML, value)
        if (el.innerHTML == name) el.value = value;
      });
    },
    targetChange: function targetChange(ev) {
      //Cross reference has changed
      //console.log(`Target ${ev.type}:`, this.secNumber, ev.detail, 'n:', ev.target.name, 'v:', ev.target.value)
      if (this.iAmChief) this.processXrefs(ev);else this.bus.master.$emit('xref', ev); //Send up to the chief
    },
    crossChange: function crossChange(ev) {
      //Cross reference has been reconstructed
      var master = this.iAmChief ? this : this.bus.master,
          link = ev.target.innerHTML,
          value = master.crossVals[link];
      //console.log(`Cross ${ev.type}:`, this.secNumber, ev.detail, 'n:', ev.target.name, 'v:', ev.target.value, 'l:', link, 'v:', value)
      ev.target.value = value;
    },
    spellTog: function spellTog(ev) {
      //Toggle auto loading mode
      this.spellCheck = !this.spellCheck;
    },
    spellCheckValue: function spellCheckValue(v) {
      //Set/get spell check value
      if (v != null) this.spellCheck = v;
      return this.spellCheck;
    },
    markUp: function markUp(ev, mode) {
      var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : mode[0];
      //Insert a markup tag around the preview selection(s)
      var sel = window.getSelection();
      if (!sel || !sel.anchorNode) return;
      console.log("Mark up as:", mode, tag, sel.rangeCount, sel, sel.anchorNode);
      if (sel.anchorNode.nodeName == '#text') {
        if (mode == 'crossref') document.execCommand('insertHTML', '<x-r>zzyzx</x-r>');else document.execCommand(tag);
      }
      if (this.iAmChief) this.subBus.notify('markup', tag); //If any children have textareas open
    },
    markTextArea: function markTextArea(tag) {
      //Insert markup tag in the direct editing textarea
      var taElem = this.$refs.textarea,
          start = taElem.selectionStart,
          end = taElem.selectionEnd,
          text = taElem.value;
      //console.log("  selection:", start, end)
      if (text && end > start) {
        var s1 = text.substring(0, start),
            s2 = text.substring(start, end),
            s3 = text.substring(end);
        this.state.text = s1 + '<' + tag + '>' + s2 + '</' + tag + '>' + s3;
      }
    },
    editEnter: function editEnter(ev) {
      //console.log("Entered direct edit", this.state.text)
      this.contEdit = true;
      ev.target.innerHTML = this.state.text;
    },
    editLeave: function editLeave(ev) {
      //If the user created paragraphs in a single section
      var doc = ev.target //break them up into multiple sections
      ,
          changes = false,
          newSections = [],
          lastNode = null;
      console.log("Left direct edit", doc, doc.childNodes);
      for (var idx = doc.childNodes.length - 1; idx >= 0; idx--) {
        //Did the edit produce multiple nodes
        var node = doc.childNodes[idx],
            name = node.nodeName.toLowerCase();
        console.log("  node:", idx, node, name);
        if (node.nodeName != '#text' && name && !LegalTags.includes(name)) {
          console.log("    remove:", idx, name, node.childNodes, 'last:', lastNode);
          if (name == 'div') {
            newSections.unshift(node.innerHTML);
          }
          doc.removeChild(node);
          lastNode = name;
          changes = true;
        }
      }

      if (newSections.length > 0) this.$emit('add', newSections, 1); //Add new sections as peers after me
      //      if (newSections.length > 0) this.addSubs(0, newSections)	//Add them as my immediate children)

      //console.log(" after parse", changes, 'toAdd:', newSections)
      this.contEdit = false;
      this.state.text = doc.innerHTML; //Get possibly amended text
      doc.innerHTML = this.titledText; //Reload the title, if necessary
      //      this.$nextTick(()=>{ev.target.innerHTML = this.titledText})
    },
    update: function update() {
      this.$emit('submit', 'editor', { request: 'update', data: this.state });
    },
    clear: function clear() {
      var _this2 = this;

      //Empty workspace
      var doIt = function doIt() {
        var tmpState = Com.clone(_this2.stateTpt);
        _this2.state = Object.assign(_this2.state, tmpState);
        _this2.state.edit = true;
        _this2.dirty = false;
      };
      if (this.dirty) this.top().confirm('!sdcClearAsk', function (ans) {
        if (ans == 'diaYes') doIt();
      });else doIt();
    },
    export: function _export() {
      var _this3 = this;

      var resp = { file: 'document.json' },
          dews = this.top().dewArray([['file', this.wm.sdcExportAsk], ['pretty', this.wm.sdcExportFmt, 'chk']]);
      //        , dews = [
      //            {field:'file', lang:this.wm.sdcExportAsk, styles:{focus:true}},
      //            {field:'pretty', lang:this.wm.sdcExportFmt, styles:{input:'chk'}}]
      this.top().query('!sdcExportAsk', dews, resp, function (ans) {
        if (ans == 'diaYes' && resp.file) {
          //console.log("Export file:", resp.file)
          var blob = new Blob([JSON.stringify(_this3.state, null, resp.pretty ? 2 : null)], { type: "text/plain;charset=utf-8" });
          FileSaver.saveAs(blob, resp.file);
        }
      });
    },
    import: function _import() {
      var _this4 = this;

      var resp = {},
          dews = [{ field: 'files', lang: this.wm.sdcImportAsk, styles: { input: 'file', focus: true } }];
      this.top().query('!sdcImportAsk', dews, resp, function (ans) {
        console.log("Import file:", ans, resp);
        if (ans == 'diaYes' && resp.files && resp.files.length >= 1) {
          var reader = new FileReader(),
              file = resp.files[0];
          reader.onload = function () {
            var data = JSON.parse(reader.result);
            //console.log("Import data:", data)
            Com.stateCheck(_this4, data, true);
            Object.assign(_this4.state, data);
            _this4.$nextTick(function () {
              return _this4.subBus.notify('check');
            });
          };
          reader.readAsText(file);
        }
      });
    },
    deleteSub: function deleteSub(idx) {
      //Remove a sub-paragraph from my sections
      //console.log('Got delete:', this.index, 'level:', this.level, 'index:', idx)
      if (idx != null && idx >= 0) this.state.sections.splice(idx, 1);
      this.change();
    },
    addSubs: function addSubs(idx) {
      var _this5 = this;

      var addArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      //Add sub-paragraphs
      //console.log("Got add:", this.secNumber, 'lev:', this.level, 'idx:', idx, addArr, 'skip:', skip)
      idx += skip;
      addArr.forEach(function (el) {
        if (typeof el == 'string') el = { text: el //Make state object if given a string
        };_this5.state.sections.splice(idx++, 0, el);
      });
      this.change();
    },
    addChild: function addChild(ev) {
      //When add section button pushed
      var newSec = Object.assign({}, this.stateTpt);
      //console.log("Add child:", this.state, ev.shiftKey)
      if (ev.shiftKey) this.$emit('add', [newSec], 1);else this.state.sections.push(newSec);
      this.change();
    },
    undo: function undo() {
      this.top().notice('Not yet implemented');
    },
    dragStart: function dragStart(ev) {
      //Event for the one being dragged
      console.log("dragStart:", this.index, this.secNumber);
      dragee = this; //Global: who is getting dragged
      this.dragOrigin = ev.clientX;
    },
    zoneOver: function zoneOver(ev) {
      //Events for the one being dragged over
      var dType = void 0,
          iPoint = void 0;
      if (!dragee) return; //Ignore if no drag started
      this.dragOver = true; //Illuminate me (the drag target)
      dragTarget = this; //And remember who I am
      if (this.iAmChief) {
        dType = 'trash';
      } else {
        var bBox = this.$refs.content.getBoundingClientRect(),
            mid = bBox.y + bBox.height / 2;
        //console.log("Move where:", dragee.dragOrigin, ev.clientX, ev.clientY, parseInt(mid))
        if (ev.clientX - dragee.dragOrigin > IndentOff) //Appending to target's sections
          iPoint = 'app';else if (ev.clientY > mid) iPoint = 'aft'; //Where we land in the target
        else iPoint = 'bef';
        dType = ev.shiftKey ? 'copy' : 'move';
        if (this == dragee && !ev.shiftKey) dType = null; //Can't move myself to myself
      }
      dragee.dragType = dType;
      dragee.inPoint = iPoint;
      //console.log("zoneOver:", this.secNumber, dragee.secNumber, dragee.dragType, dragee.inPoint, this.dragCursor)
    },
    zoneLeave: function zoneLeave(ev) {
      //Fired for the zone being moved over
      //console.log("ZL:", ev.clientX, ev.clientY, ev)
      if (!ev.buttons || ev.clientX == 0 && ev.clientY == 0) return; //Extra leave event fired at end of drag
      //console.log("zoneLeave:", this.secNumber, ev.clientX, ev.clientY, ev.shiftKey)
      this.dragOver = false;
      dragee.dragType = null;
      dragee.dragPoint = null;
      dragTarget = null;
    },
    dragDrop: function dragDrop(ev) {
      //Fired for the one being dragged
      var dType = this.dragType,
          iPoint = this.inPoint;
      this.dragType = null;
      this.inPoint = null; //Restore default cursor
      dragee = null;
      //console.log("ZD:", dragTarget)
      if (!dragTarget) return; //Aborted drag, not over a peer
      if (this.$refs.text) this.$refs.text.blur(); //Don't keep focus, otherwise vue will reuse divs and leave focus on the slot we just moved from
      //console.log("ZDrop:", dragTarget, 'gee:', dType, 'to:', dragTarget.dragType)
      dragTarget.dragType = null; //Restore default pointer (needed?)
      dragTarget.dragOver = false; //Clear target highlighting
      //console.log("Zone drop:", this.secNumber, dragTarget.secNumber, dType, iPoint)
      if (dragTarget == this && dType != 'copy') return; //Aborted drag, over myself
      if (dType == 'trash') {
        this.$emit('delete'); //Delete me
        return;
      }
      var stateCopy = Com.clone(this.state);
      //console.log("Clone:", JSON.stringify(stateCopy))
      if (iPoint == 'app') {
        dragTarget.$emit('append', [stateCopy]); //Tell drag target to append to its list
      } else if (iPoint) {
        var offset = iPoint == 'bef' ? 0 : 1;
        dragTarget.$emit('add', [stateCopy], offset); //Tell target's parent to insert
      }
      if (dType == 'move') {
        var delIndex = this.$parent === dragTarget.$parent && this.index > dragTarget.index ? this.index : this.index - 1;
        //console.log(" delete index:", delIndex)
        this.$emit('delete', delIndex); //Delete me under my new post-move index
      }
    },
    togSource: function togSource(ev) {
      var st = this.state;
      //console.log("Toggle source:", this.secNumber, st.source, st.text)
      if (st.source) {
        st.text = st.source;
        st.source = null;
      } else {
        st.source = st.text || '';
        st.text = null;
      }
    },
    togEdit: function togEdit(ev) {
      //console.log("Toggle edit:", this.secNumber, this.state.edit, ev.target, ev.currentTarget)
      if (this.editable && !ev.target.classList.contains('input')) {
        this.state.edit = !this.state.edit;
        ev.stopPropagation();
      }
    }
  },

  watch: {
    dirty: function dirty(data) {
      if (this.iAmChief) this.$parent.$emit('submit', 'report', { request: 'dirty', data: data }); //Let my container know my clear/dirty status
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-menudock'] = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue").default; //Seems to work better here to avoid recursion problems
  },
  created: function created() {
    var _this6 = this;

    if (this.bus) this.bus.register(this.id, function (msg) {
      //console.log("Strdoc got msg", this.dirty, this.iAmChief, msg)
      if (msg == 'clear') {
        _this6.clear();
      } else if (msg == 'clean') {
        _this6.dirty = false;
      } else if (msg == 'load') {
        if (_this6.dirty) _this6.top().confirm('!sdcClearAsk', function (ans) {
          if (ans == 'diaYes') _this6.$emit('submit', 'control');
        });else _this6.$emit('submit', 'control');
      }
    });
  },
  beforeMount: function beforeMount() {
    var _this7 = this;

    Com.stateCheck(this, this.state, true);
    //console.log("Strdoc state:", this.state)

    if (this.iAmChief) {
      this.subBus = new Bus.messageBus(this); //Parent
      this.$on('xref', function (ev) {
        _this7.processXrefs(ev);
      }); //Xref events from sub-sections
      this.$on('dirty', function () {
        _this7.dirty = true;
      });
    }
    this.$on('append', function (subs) {
      var _state$sections;

      (_state$sections = _this7.state.sections).push.apply(_state$sections, _toConsumableArray(subs));
    });
    if (this.subBus) this.subBus.register(this.id, function (msg, data) {
      //Children (and parent) listen
      //console.log("Got bus message:", this.secNumber, msg, data, this.state)
      if (msg == 'edit') _this7.state.edit = true;else if (msg == 'preview') _this7.state.edit = false;else if (msg == 'markup' && _this7.state.edit) _this7.markTextArea(data);else if (msg == 'check') Com.stateCheck(_this7, _this7.state, true);
    });
  },
  mounted: function mounted() {
    if (this.iAmChief) {
      this.top().context.$emit('swallow', this.$refs.header);
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var Interact = __webpack_require__(/*! interactjs */ "interactjs");
var LinkColor = 'blue';
var nodeBus = new Bus.eventBus(undefined); //Discover vms by a given tag

exports.default = {
  name: 'wylib-svgnode',
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } }
  },
  data: function data() {
    return {
      stateTpt: { x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, body: '', links: [], ends: [], radius: 0 }
    };
  },

  computed: {
    transform: function transform() {
      //Moves the object around when we change x or y
      return 'translate(' + this.state.x + ', ' + this.state.y + ') rotate(' + this.state.rotate + ') scale(' + this.state.xScale + ', ' + this.state.yScale + ')';
    },
    cent: function cent() {
      //My center, relative to my local node origin
      var xSum = 0,
          ySum = 0,
          count = 0;
      this.state.ends.forEach(function (el) {
        xSum += el.x;ySum += el.y;count++;
      });
      return { x: xSum / count, y: ySum / count //Calculate center of mass for my connections
      };
    },
    center: function center() {
      //Compute my centroid in absolute terms inside the SVG
      return { x: this.state.x + this.cent.x, y: this.state.y + this.cent.y };
    },
    objStyle: function objStyle() {
      return { //Change the cursor to show our object as movable
        cursor: this.state.drag ? 'move' : 'arrow'
      };
    },
    connectors: function connectors() {
      var _this = this;

      //Generate SVG code for connector lines to other objects
      var paths = {};
      this.state.links.forEach(function (lk) {
        //For each node I point to
        var link = lk //Assume node is a simple box
        ,
            noDraw = false,
            reverse = false,
            ends = _this.state.ends,
            center = _this.cent,
            index = void 0,
            hub = void 0,
            radius = _this.state.radius || _this.state.width / 2;
        if ((typeof lk === 'undefined' ? 'undefined' : _typeof(lk)) == 'object') {
          index = lk.index; //But if it is not, get hub-specific data

          link = lk.link;
          noDraw = lk.noDraw;
          reverse = lk.reverse;
          center = lk.center;
          ends = lk.ends;
          hub = lk.hub;
        }
        if (!index && typeof link == 'string') index = link; //If no separate index specified, use link value
        //console.log("SVG Link:", link, typeof(link), "Index:", index)

        if (!noDraw) {
          //Draw a link line, in addition to any optional hub
          var d = void 0,
              refState = void 0,
              refPoint = void 0,
              refVM = nodeBus.notify(link)[0];
          //console.log("Connecting:", this.state.tag, 'at', this.state.x+center.x, this.state.y+center.y, 'to', link, 'I:', index)
          if (refVM) {
            //If it has already been build/rendered
            refState = refVM.state; //Generate connection
            refPoint = refVM.connection({ x: _this.state.x + center.x, y: _this.state.y + center.y }, index); //Ask for coordinates of the other node's connection point
            //if (refPoint) console.log("  found his connection:", refPoint.x, refPoint.y)
          }
          if (!refVM || !refPoint) {
            //Create placeholder, for now
            if (refState = _this.$parent.nodeState(link)) refPoint = { x: refState.x, y: refState.y, xs: refState.x, ys: refState.y };else refPoint = { x: 0, y: 0, xs: 0, ys: 0 };
          }
          //if (refState) console.log(" at:", refState.x, refState.y)
          var myPoint = _this.closest(_this.state, ends, refPoint); //Now find closest point on me, to other node's point
          //console.log("  found my connection:", myPoint.x, myPoint.y)
          var xMyC = myPoint.x * 2 - center.x,
              yMyC = myPoint.y * 2 - center.y; //Curve control point on my end
          var xEnd = refPoint.x - _this.state.x,
              yEnd = refPoint.y - _this.state.y; //Convert his closest point to relative x,y
          var xEnC = refPoint.xs - _this.state.x,
              yEnC = refPoint.ys - _this.state.y; //Curve control point on his end, as relative coordinates
          if (reverse) {
            d = 'M' + myPoint.x + ',' + myPoint.y + ' C' + xMyC + ',' + yMyC + ', ' + xEnC + ',' + yEnC + ', ' + xEnd + ',' + yEnd;
          } else {
            d = 'M' + xEnd + ',' + yEnd + ' C' + xEnC + ',' + yEnC + ', ' + xMyC + ',' + yMyC + ', ' + myPoint.x + ',' + myPoint.y;
          }
          paths[index] = d;
        }
      });
      //console.log('Connectors:', paths)
      return paths;
    },
    hubs: function hubs() {
      //Generate SVG code for appendages where connecting arrows should terminate
      var code = {};
      this.state.links.forEach(function (lk) {
        //For each node I point to
        if ('hub' in lk) {
          code[lk.index] = lk.hub();
        }
      });
      return code;
    }
  },

  methods: {
    linkIndex: function linkIndex(link) {
      //Link might be a node name, or an object with more data including the node name
      if ((typeof link === 'undefined' ? 'undefined' : _typeof(link)) == 'object') {
        return link.index;
      } else {
        return link;
      }
    },
    linkColor: function linkColor(link) {
      //Link might be a node name, or an object with more data including the node name
      //console.log("linkColor:", link)
      if ((typeof link === 'undefined' ? 'undefined' : _typeof(link)) == 'object' && link.color) {
        return link.color;
      } else {
        return LinkColor;
      }
    },
    closest: function closest(base, points, point) {
      //Find closest vertex from a list of points, to a specified point
      var x = 0,
          y = 0,
          lenMin = Number.MAX_SAFE_INTEGER; //Base(state) and point contain absolute coordinates
      //console.log("Closest:", base, points, point)			//points are relative to object
      points.forEach(function (p) {
        var len = Math.sqrt(Math.pow(base.x + p.x - point.x, 2) + Math.pow(base.y + p.y - point.y, 2));
        if (len < lenMin) {
          x = p.x;y = p.y;lenMin = len;
        } //if smallest distance yet, remember it
      });
      return { x: x, y: y //Return closest point, relative to base
      };
    },
    connection: function connection(him, index) {
      //Return my closest connection point to other coordinate 'him'
      var center = this.cent,
          ends = this.state.ends,
          me = this.state;
      if (index) this.state.links.forEach(function (lk) {
        //Find the matching hub, if there is one
        if (lk.index == index) {
          center = lk.center;
          ends = lk.ends;
        }
      });
      //console.log("him: (", him.x, him.y,")", this.state.tag, "@", me.x, me.y, index)
      var cp = this.closest(this.state, ends, him) //cp=closest point, 'ends' describes possible relative locations to terminate connector lines
      ,
          xs = cp.x * 2 - center.x + me.x //Compute curve control points
      ,
          ys = cp.y * 2 - center.y + me.y,
          x = me.x + cp.x //Compute absolute connection point
      ,
          y = me.y + cp.y;
      return { x: x, y: y, xs: xs, ys: ys };
    }
  },
  created: function created() {
    var _this2 = this;

    nodeBus.register(this.state.tag, this.state.tag, function (dat) {
      //Listen for anyone asking for me by tag
      return _this2;
    });
  },

  beforeMount: function beforeMount() {
    var _this3 = this;

    //console.log("Node beforeMount:", this.state.x, this.state.y)
    Com.stateCheck(this);
    if (this.state.x == null) Object.assign(this.state, this.stateTpt); //Recover from garbage in stored state
    //console.log("     beforeMount:", this.state)
    this.state.links.forEach(function (lk) {
      //Initialize empty stubs for hub routines
      if ((typeof lk === 'undefined' ? 'undefined' : _typeof(lk)) == 'object' && !lk.hub) _this3.$set(lk, 'hub', function () {});
    });
  },

  mounted: function mounted() {
    var _this4 = this;

    //console.log("Node Mount:", this.state.tag, this.state)
    Interact(this.$el).draggable({
      inertia: true,
      onmove: function onmove(event) {
        _this4.$emit('drag', event, _this4.state);
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _svgnode = __webpack_require__(/*! ./svgnode.vue */ "./src/svgnode.vue");

var _svgnode2 = _interopRequireDefault(_svgnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var vector = __webpack_require__(/*! ./vector.js */ "./src/vector.js");
var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");
var Interact = __webpack_require__(/*! interactjs */ "interactjs");
exports.default = {
  name: 'wylib-svg',
  components: { 'wylib-svgnode': _svgnode2.default },
  props: {
    state: { type: Object, default: null },
    bumpTimer: { default: 400 },
    startTime: { default: 500 },
    repeatTime: { default: 200 }
  },
  data: function data() {
    return {
      startTimer: null,
      repeatTimer: null,
      toolX: 0,
      toolY: 0,
      stateTpt: { minX: 0, minY: 0, maxX: 400, maxY: 400, nodes: {}, pushForce: 50, pullForce: 50, randForce: 0, aspForce: 1, gravForce: 50, autoBump: true }
    };
  },


  computed: {
    viewCoords: function viewCoords() {
      //Viewport of SVG space
      //console.log('Re-render')
      return [this.state.minX, this.state.minY, this.state.maxX - this.state.minX, this.state.maxY - this.state.minY].join(' ');
    },
    border: function border() {
      //Outline the normal drawing area
      return 'M ' + this.state.minX + ' ' + this.state.maxX + ' H ' + this.state.maxX + ' V ' + this.state.maxY + ' H ' + this.state.minX + ' V ' + this.state.minY;
    },
    boundBox: function boundBox() {
      return {
        x: this.state.minX, y: this.state.minY, width: this.state.maxX - this.state.minX, height: this.state.maxY - this.state.minY
      };
    },
    toolStyle: function toolStyle() {
      return {
        transform: 'translate(' + this.toolX + 'px, ' + this.toolY + 'px)'
      };
    }
  },

  methods: {
    iconSvg: function iconSvg(icon) {
      return Icons(icon);
    },
    nodeState: function nodeState(n) {
      //Return the state object for the named node
      //console.log("nodestate:", n, this.state.nodes)
      return this.state.nodes[n];
    },
    buttonDown: function buttonDown() {
      var _this = this;

      //Make arrange button repeat if it is held down
      //console.log("Button down")
      if (this.startTimer) clearTimeout(this.startTimer);
      if (this.repeatTimer) clearInterval(this.repeatTimer);
      this.startTimer = setTimeout(function () {
        //After initial timeout
        _this.startTimer = null;
        _this.repeatTimer = setInterval(_this.bump, _this.repeatTime); //Start repeating more rapidly
      }, this.startTime);
    },
    buttonUp: function buttonUp() {
      //console.log("Button up")
      if (this.startTimer) {
        //If waiting for button to repeat	
        clearTimeout(this.startTimer); //Cancel that
        this.startTimer = null;
        this.bump(); //And do a single bump
      }
      if (this.repeatTimer) {
        //If we have already been repeating
        clearInterval(this.repeatTimer); //Just quit
        this.repeatTimer = null;
      }
    },
    moveHandler: function moveHandler(event, state) {
      //Called when dragging nodes
      //console.log("Move handler", this.state.minX, this.state.maxX, this.$el.getBoundingClientRect().width, ratio)
      var ratio = (this.state.maxX - this.state.minX) / this.$el.getBoundingClientRect().width; //Scale moves by the current scale of the svg
      state.x += event.dx * ratio;
      state.y += event.dy * ratio;
    },
    clip: function clip(val, max) {
      var i = val;
      if (val > max) return max;
      if (val < -max) return -max;
      return val;
    },
    bump: function bump() {
      var _this2 = this;

      //Nudge each object according to the computed forces on it
      var forces = [],
          xSize = this.state.maxX - this.state.minX,
          ySize = this.state.maxY - this.state.minY,
          svgAsp = xSize / ySize,
          winAsp = window.innerWidth / (window.innerHeight * 0.80) //Estimate vertical space used for display of SVG
      ,
          adjAsp = Math.log10(winAsp / svgAsp),
          maxMove = Math.min(xSize, ySize) / 5;
      //console.log("Bump:", maxMove, svgAsp, winAsp, adjAsp)
      this.$refs.node.forEach(function (vm, ix) {
        forces[ix] = { x: 0, y: 0 };
      }); //Init forces
      this.$refs.node.forEach(function (vm1, ix1) {
        //console.log("vm1:", vm1.state.x, vm1.state.y)
        _this2.$refs.node.forEach(function (vm2, ix2) {
          if (ix1 != ix2) {
            var rect12 = vector.sub(vm2.center, vm1.center) //Distance between 2 nodes
            ,
                polar12 = vector.rtop(rect12),
                aspectBias = { x: vm2.center.x / 10 * adjAsp, y: -vm2.center.y / 10 * adjAsp //Squish vertically a little
            },
                mag = Math.max(polar12.r - vm1.state.radius - vm2.state.radius, 10) //Ignore closer than 2, or negative
            ,
                maxPull = Math.min(maxMove, mag / 10),
                push = Math.min(_this2.state.pushForce * 100 / Math.pow(mag, 2), maxMove / 20),
                pull = _this2.state.gravForce * mag / 50000 //All objects have a little attractive gravity
            ,
                randPull = 0,
                link = vm1.state.links.find(function (el) {
              return el.link == vm2.state.tag;
            }),
                linkBias = void 0;

            if (link) {
              //console.log("link:", ix1, ix2, link)
              if (link.bias) linkBias = link.bias();
              pull += _this2.state.pullForce * Math.pow(mag, 2) / 200; //Linked objects have a lot more attraction
              if (_this2.state.randForce && Math.random() < 0.02) {
                //Inject an extra random burst 2% of the time
                randPull = pull * (Math.random() - 0.5) * _this2.state.randForce;
              }
            }
            pull = Math.min(pull, maxPull);
            //console.log("PP:", ix1, ix2, push.toFixed(4), pull.toFixed(4), maxPull.toFixed(1))	//, adjAsp, aspectBias)
            //console.log("vals:", vm1.center, vm2.center, rect12, polar12, linkBias)
            forces[ix1] = vector.add(forces[ix1], { r: -push + pull + randPull, a: polar12.a }, linkBias);
            forces[ix2] = vector.add(forces[ix2], { r: push - pull + randPull, a: polar12.a }, aspectBias);
            //console.log("  pp:", forces[ix1], forces[ix2])
          }
        });
      });
      var minX = Number.MAX_VALUE,
          minY = minX,
          maxX = -Number.MAX_VALUE,
          maxY = maxX;
      this.$refs.node.forEach(function (vm, ix) {
        //Now do the nudging
        //console.log("Nudge:", ix, forces[ix].x.toFixed(3), forces[ix].y.toFixed(3), maxMove.toFixed(1))
        vm.state.x += _this2.clip(forces[ix].x, maxMove); //Nudge
        vm.state.y += _this2.clip(forces[ix].y, maxMove);

        var hubs = vm.$el.getElementsByClassName("hubs"),
            bBox = hubs.length >= 1 ? hubs[0].getBBox() : vm.$el.getBBox(),
            range = { minX: vm.state.x + Math.min(bBox.x, 0), minY: vm.state.y + Math.min(bBox.y, 0), maxX: vm.state.x + Math.max(bBox.width + bBox.x, vm.state.width), maxY: vm.state.y + Math.max(bBox.height + bBox.y, vm.state.height)

          //console.log(" size:", vm.state.width, vm.state.height, range)
        };if (range.maxX > maxX) maxX = range.maxX; //Determine proper range of canvas
        if (range.maxY > maxY) maxY = range.maxY;
        if (range.minX < minX) minX = range.minX;
        if (range.minY < minY) minY = range.minY;
      });
      //console.log("  mins:", minX, minY)
      this.$refs.node.forEach(function (vm, ix) {
        //Move all objects back relative to origin
        vm.state.x -= minX - 20;
        vm.state.y -= minY - 20;
        //console.log("x:", vm.state.x, "y:", vm.state.y)
      });
      this.state.minX = this.state.minY = 0; //And adjust SVG viewport to show all objects
      this.state.maxX = maxX - minX + 60;
      this.state.maxY = maxY - minY + 60;
    },
    zoom: function zoom(ev) {
      var delta = ev.deltaY //Magnitude of zoom
      ,
          st = this.state,
          bBox = this.$refs.svg.getBoundingClientRect() //DOM coordinates of svg
      ,
          xRat = bBox.width / (st.maxX - st.minX) //ratio of DOM scale to SVG scale
      ,
          yRat = bBox.height / (st.maxY - st.minY),
          wid = bBox.width || 1 //Control nulls
      ,
          hei = bBox.height || 1,
          h1 = ev.clientX - bBox.left || 1,
          h2 = bBox.right - ev.clientX || 1,
          v1 = ev.clientY - bBox.top || 1,
          v2 = bBox.bottom - ev.clientY || 1;

      //console.log("zoom:", parseInt(st.minX), parseInt(st.minY), parseInt(st.maxX), parseInt(st.maxY), 'box:', parseInt(bBox.left), parseInt(bBox.top), parseInt(bBox.right), parseInt(bBox.bottom), 'cur:', ev.clientX, ev.clientY)
      //console.log("h1:", parseInt(h1), "v1:", parseInt(v1), "h2:", parseInt(h2), "v2:", parseInt(v2))
      st.minX -= delta / xRat * h1 / wid; //Adjust SVG view coordinates
      st.minY -= delta / yRat * v1 / hei;
      st.maxX += delta / xRat * h2 / wid;
      st.maxy += delta / yRat * v2 / hei;
    }
  },

  beforeMount: function beforeMount() {
    Com.stateCheck(this);
    if (this.state.maxX == null) Object.assign(this.state, this.stateTpt); //Recover from garbage in stored state
    //console.log("SVGraph beforeMount:", this.state)
  },

  mounted: function mounted() {
    var _this3 = this;

    Interact(this.$refs.tools).draggable({
      onmove: function onmove(event) {
        _this3.toolX += event.dx;_this3.toolY += event.dy;
      },
      ignoreFrom: '.nodrag'
    });
    this.$on('bump', function () {
      _this3.bump();
    });
    this.$on('change', function () {
      //console.log("Change:", this.state.autoBump)
      if (_this3.state.autoBump) _this3.bump();
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

var _dialog = __webpack_require__(/*! ./dialog.vue */ "./src/dialog.vue");

var _dialog2 = _interopRequireDefault(_dialog);

var _report = __webpack_require__(/*! ./report.vue */ "./src/report.vue");

var _report2 = _interopRequireDefault(_report);

var _modal = __webpack_require__(/*! ./modal.vue */ "./src/modal.vue");

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var MenuLayer = 1000;

var Bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");
var Com = __webpack_require__(/*! ./common.js */ "./src/common.js");
var Local = __webpack_require__(/*! ./local.js */ "./src/local.js");
var State = __webpack_require__(/*! ./state.js */ "./src/state.js");
var TopHandler = __webpack_require__(/*! ./top.js */ "./src/top.js");
var Interact = __webpack_require__(/*! interactjs */ "interactjs");

//console.log("Interact:", Interact)

exports.default = {
  name: 'wylib-win',
  components: { 'wylib-menu': _menu2.default, 'wylib-button': _button2.default, 'wylib-dialog': _dialog2.default, 'wylib-modal': _modal2.default, 'wylib-report': _report2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    topLevel: { default: false }, //Full header and window menu
    fullHeader: { default: false }, //Full header only
    pinnable: { default: false }, //Include pinning button/function
    env: { type: Object, default: Com.envTpt }
  },
  data: function data() {
    var _ref;

    return _ref = {
      lang: { title: null, help: null },
      stateTag: 'win',
      top: null,
      modal: { posted: false, client: {} },
      restoreMenu: [],
      lastLoadIdx: null,
      lastLoadName: null,
      popWin: null,
      dirty: null,
      printable: false,
      repBus: new Bus.eventBus(this),
      winMenu: { client: {} }, client: {} }, _defineProperty(_ref, 'modal', { posted: false }), _defineProperty(_ref, 'stateTpt', { x: null, y: null, posted: false, pinned: false, layer: 10, minim: false, dialogs: {}, reports: {}, height: null, width: null, fresh: true }), _ref;
  },

  inject: ['app'],
  provide: function provide() {
    var _this = this;

    return {
      top: function top() {
        return _this.top;
      }
    };
  },

  computed: {
    id: function id() {
      return 'win_' + this._uid + '_';
    },
    wm: function wm() {
      return this.env.wm;
    },
    pr: function pr() {
      return this.env.pr;
    },
    buttonSize: function buttonSize() {
      return this.topLevel || this.fullHeader ? 1.25 : 0.8;
    },
    headerHeight: function headerHeight() {
      return this.topLevel || this.fullHeader ? this.pr.winFullHeader : this.pr.winSmallHeader;
    },
    saveTitle: function saveTitle() {
      var lang = Object.assign({}, this.wm.winSave);
      if (this.lastLoadName) lang.title += ' (' + this.lastLoadName + ')';
      return lang;
    },
    winStyleS: function winStyleS() {
      return {
        borderColor: this.pr.winBorderColor,
        background: this.pr.dataBackground,
        borderWidth: this.pr.winBorderWidth + 'px',
        opacity: this.pr.winOpacity,
        borderRadius: this.pr.winBorderRad + 'px',
        zIndex: this.topLevel ? this.state.layer : MenuLayer
      };
    },
    winStyleF: function winStyleF() {
      return { //Faster moves with these separate?
        transform: 'translate(' + this.state.x + 'px, ' + this.state.y + 'px)',
        height: this.state.minim ? this.headerHeight + 6 + 'px' : this.state.height ? this.state.height + 'px' : null,
        width: this.state.width ? this.state.width + 'px' : null
      };
    },
    headerStyle: function headerStyle() {
      return {
        borderRadius: this.pr.winBorderRad - 1 + 'px',
        background: 'linear-gradient(to top, ' + this.pr.winHeadColorLow + ', ' + this.pr.winHeadColorHigh + ')'
      };
    }
  },
  methods: {
    winMenuConfig: function winMenuConfig() {
      var _this2 = this;

      var wm = this.wm;
      var prElem = this.printable ? { idx: 'prn', lang: wm.winPrint, icon: 'printer', call: this.print } : { idx: 'pop', lang: wm.winPopUp, icon: 'rocket', call: this.popup };
      return [{ idx: 'sav', lang: this.saveTitle, icon: 'upload', call: this.saveState }, { idx: 'sas', lang: wm.winSaveAs, icon: 'upload2', call: this.saveStateAs }, { idx: 'res', lang: wm.winRestore, icon: 'download', menu: this.restoreMenu, layout: ['lang', 'owner', 'access'] }, { idx: 'def', lang: wm.winDefault, icon: 'home', call: this.defaultState }, { idx: 'geo', lang: wm.winGeom, icon: 'shrink', call: this.defaultSize }, prElem, { idx: 'prf', lang: wm.appPrefs, icon: 'cog', menu: this.pr.menu('win'), layout: ['lang', 'dew'] }, { idx: 'top', lang: wm.winToTop, icon: 'arrowup', call: function call() {
          _this2.top.layer(1);
        } }, { idx: 'bot', lang: wm.winToBottom, icon: 'arrowdown', call: function call() {
          _this2.top.layer(-1);
        } }, { idx: 'min', lang: wm.winMinimize, icon: 'eyeblock', call: this.minimize }, { idx: 'cls', lang: wm.winClose, icon: 'close', call: this.close }];
    },
    close: function close(ev) {
      var _this3 = this;

      //console.log("In close", this.id, this.dirty, this.dirty ? this.dirty() : null)
      var closeIt = function closeIt() {
        _this3.state.pinned = false;
        _this3.$emit('close');
      };
      if (this.dirty ? this.dirty() : false) this.top.confirm('!winModified', function (tag) {
        if (tag == 'diaYes') closeIt();
      });else closeIt();
    },
    headerClick: function headerClick() {//Capture this to keep it away from the app toplevel (for moving windows around while menus posted)
    },
    minimize: function minimize() {
      this.state.minim = !this.state.minim;
    },
    print: function print() {
      var frame = this.$el.querySelector('iframe');
      //console.log("Found iframe:", frame)
      if (frame) frame.contentWindow.print();
    },
    popup: function popup() {
      var pop = this.popWin,
          body = void 0,
          style = void 0,
          popId = this.id + 'popUp';
      console.log("Clone to popup:", popId);
      if (!pop || pop.closed) {
        pop = this.popWin = window.open('', popId, 'height=9in,width=7in');
        pop.document.write('<html><head></head><body></body></html>');
        pop.document.close();
      }
      if (body = pop.document.body) {
        if (body.firstChild) body.firstChild.remove();
      }
      var fragment = Com.deepCloneWithStyles(this.$refs.content),
          newNode = pop.document.importNode(fragment, true);
      pop.document.body.appendChild(newNode);
    },
    saveStateAs: function saveStateAs() {
      var _this4 = this;

      var resp = { t: 'Default' },
          dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]]);
      this.top.query('!appStatePrompt', dewArr, resp, function (tag) {
        //console.log("tag", tag)
        if (tag == 'diaYes') State.saveAs(_this4.stateTag, resp.t, resp.h, _this4.state, _this4.top.error, function (ruid) {
          _this4.lastLoadIdx = ruid;
          _this4.lastLoadName = resp.t;
        });
      });
    },
    saveState: function saveState() {
      if (this.lastLoadIdx) State.save(this.lastLoadIdx, this.state, this.top);else this.saveStateAs();
    },
    storeState: function storeState() {
      //Redundant with stored app state?
      //console.log("Storing window state:", this.stateTag)
      if (this.topLevel && this.stateTag) Local.set(this.stateTag, this.state);
    },
    defaultSize: function defaultSize() {
      this.state.width = this.state.height = null;
      this.storeState();
    },
    defaultState: function defaultState() {
      var _this5 = this;

      this.top.confirm(this.wm.h.winDefault, function (tag) {
        if (tag == 'diaYes') {
          Local.set(_this5.stateTag);
          _this5.$emit('close', true);
        }
      });
    },
    moveHandler: function moveHandler(event) {
      //console.log("Moving: ", event, this.state, this.winStyleF);
      this.state.x += event.dx;
      this.state.y += event.dy;
    },
    sizeHandler: function sizeHandler(event) {
      //console.log("Sizing: " + JSON.stringify(event.rect));
      this.state.width = event.rect.width;
      this.state.height = event.rect.height;
      this.state.x += event.deltaRect.left;
      this.state.y += event.deltaRect.top;
    },
    swallowMenu: function swallowMenu(childMenu, childStatus) {
      //Eat the menu bar, and optionally status bar of a child component
      //console.log("Swallow Menu:", childMenu, childStatus)
      if (childMenu && '$el' in childMenu) childMenu = childMenu.$el; //Can pass in element or vue object
      if (childStatus && '$el' in childStatus) childStatus = childStatus.$el;
      var cmenu = this.$refs['childMenu'],
          cstat = this.$refs['childStatus'];
      cmenu.innerHTML = ''; //Get rid of any prior contents
      cstat.innerHTML = '';
      cmenu.appendChild(childMenu);
      if (childStatus) cstat.appendChild(childStatus);
    },


    //    addDia(...args) {return Com.addWindow(this.state.dialogs, ...args)},	//Obsolete?
    closeDia: function closeDia(idx, reopen) {
      Com.closeWindow(this.state.dialogs, idx, this, reopen);
    },
    dialogSubmit: function dialogSubmit(dialogIndex, ev, buttonTag, dialogTag, options) {
      //console.log("Dialog submit", dialogIndex, dialogTag, buttonTag, options, ev)
      if (this.top) if (this.top.submitDialog(dialogTag, { buttonTag: buttonTag, options: options, dialogIndex: dialogIndex, popUp: event.shiftKey })) this.closeDia(dialogIndex);
    },
    reportWin: function reportWin(repTag, src, config) {
      var _this6 = this;

      var winState = this.state.reports[repTag],
          popUp = config.info ? config.info.popUp : null,
          ready = function ready(iframe) {} //Dummy function can't survive reload in state
      ,
          wasPosted = winState ? winState.posted : null,
          foundState = false;
      //console.log("Report win state:", winState, repTag, this.state.reports)
      if (!winState) {
        winState = { posted: false, x: 25, y: 25, client: { src: src, name: repTag }, ready: ready };
        this.$set(this.state.reports, repTag, winState); //Create new report record
      } else {
        if (!winState.ready) winState.ready = ready; //Will have been lost in any reload
        foundState = true; //Found existing report status
      }
      winState.client.config = config;
      if (popUp) {
        //Generate browser popup
        winState.posted = false;
        this.$nextTick(function () {
          //Let any report iframe die before launching the popup
          //console.log("!pop:")
          var win = window.open(src, repTag, 'height=600,width=600').onbeforeunload = function () {
            //console.log("Pop closed:", repTag, winState.posted)
            if (!winState.posted) _this6.closeRep(repTag); //If user closed the window
          };
        });
      } else {
        //Regular internal report window
        //console.log("!regular:", winState, winState.posted)
        winState.posted = true;
        if (foundState) {
          if (wasPosted) //If existing internal window
            this.repBus.notify(repTag, 'reload'); //reload it
          else //If there was a popup open
            window.open('', repTag, 'height=600,width=600').close(); //find it and close it
        }
      }
    },
    closeRep: function closeRep(repTag, reopen) {
      console.log("Close regular report:", repTag);
      var oldState = this.state.reports[repTag];
      this.$delete(this.state.reports, repTag);
      if (reopen) this.reportWin(repTag, oldState.src, oldState.client.config);
      if (oldState.popWin) oldState.popWin.close();
    }
  },

  watch: { //Let parent and any content clients know we just posted
    'state.posted': function statePosted(isPosted) {
      var _this7 = this;

      //console.log("Posted, children:", this.$scopedSlots, this.state.x, this.state.y)
      if (isPosted) this.$nextTick(function () {
        _this7.$emit('posted'); //Tell parent
        if (_this7.top) _this7.top.posted(); //Tell anyone else who might be listening
        if (_this7.pinnable) _this7.app().listenClick(_this7.id, function () {
          //console.log("win", this.id, "sees app click")
          _this7.state.posted = _this7.state.pinned; //Unpost me on external clicks
        });
      });else this.app().listenClick(this.id); //Un-listen for clicks
    }
  },

  created: function created() {
    if (this.topLevel) this.top = new TopHandler(this);
    //console.log("Win created; top:", this.id, this.topLevel, this.top)
    this.$on('swallow', this.swallowMenu);
  },

  beforeMount: function beforeMount() {
    var _this8 = this;

    //Create any state properties that don't yet exist
    Com.stateCheck(this);
    //if (this.topLevel) console.log("Win state:", this.state);

    if (this.topLevel) this.$on('customize', function (lang, tag, print, dirty) {
      //Allow child to set the window's title and tagging ID
      //console.log("Customize", this.id, lang, tag, print, dirty)
      _this8.lang = lang;
      if (tag) _this8.stateTag = tag;
      _this8.printable = print;
      if (dirty) _this8.dirty = dirty;

      State.listen(_this8.id + 'sl', _this8.stateTag, function (menuData) {
        var _restoreMenu;

        //Handle response from the database containing stored states for this window
        //console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
        var menuItems = menuData.map(function (el) {
          return Object.assign(el, { call: function call() {
              Object.assign(_this8.state, Com.clone(el.data));
              Com.stateCheck(_this8);
              _this8.lastLoadIdx = el.idx;
              _this8.lastLoadName = el.lang.title;
            } });
        });
        (_restoreMenu = _this8.restoreMenu).splice.apply(_restoreMenu, [0, _this8.restoreMenu.length].concat(_toConsumableArray(menuItems)));
        //console.log("WMC:", 1, this.winMenuConfig)
      }, _this8.top.error);
    });

    this.$on('report', function (config) {
      var action = config.action,
          repTag = config.repTag,
          info = config.info;
      //console.log("Win got message to launch report: ", config)

      _this8.top.submitDialog(repTag, info);
    });
  },

  mounted: function mounted() {
    var _this9 = this;

    var wId = '#win' + this._uid;
    Interact(this.$el).resizable({ //Set up moving/resizing of windows
      inertia: true,
      margin: 7,
      edges: { top: true, left: true, right: true, bottom: true },
      restrictSize: { min: { width: 50, height: 50 } },
      ignoreFrom: wId + ' .subwindows',
      //      allowFrom: wId + '> .content',
      onmove: this.sizeHandler,
      onend: this.storeState
    }).draggable({
      //      ignoreFrom: '.wylib-win-nodrag',	//Do we need this?
      allowFrom: '.wylib-win .handle',
      inertia: true,
      onmove: this.moveHandler
    });
    //console.log("Mounted; this: ", wId, this.title, "topLevel:", this.topLevel, "top:", this.top)

    this.$on('geometry', function (ev) {
      _this9.storeState();
    }); //When window layout changes, save it in localstorage

    if (this.topLevel && this.state.fresh) {
      //This is a brand new window--not one restored from saved state
      this.state.fresh = false; //Mark so we don't overwrite stored state next time
      var savedState = Local.get(this.stateTag);
      //console.log("Win state template:", this.id, this.stateTag, this.state.fresh, savedState)
      if (savedState) {
        delete savedState.x;delete savedState.y; //So window doesn't land right on top of the last one
        Object.assign(this.state, savedState); //Comment line for debugging from default state
        //console.log("Win restoring state:", this.id, savedState)
      }
    }
    //Object.keys(this.state.reports).forEach(key=>{let rep = this.state.reports[key]; console.log("Rep:",key, rep, JSON.stringify(rep.client.config))})	//Debug
  }
};

/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "base64-js")
var ieee754 = __webpack_require__(/*! ieee754 */ "ieee754")
var isArray = __webpack_require__(/*! isarray */ "isarray")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./node_modules/flatpickr/dist/themes/light.css":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./node_modules/flatpickr/dist/themes/light.css ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".flatpickr-calendar {\n  background: transparent;\n  opacity: 0;\n  display: none;\n  text-align: center;\n  visibility: hidden;\n  padding: 0;\n  -webkit-animation: none;\n  animation: none;\n  direction: ltr;\n  border: 0;\n  font-size: 14px;\n  line-height: 24px;\n  border-radius: 5px;\n  position: absolute;\n  width: 307.875px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  -webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.08);\n}\n.flatpickr-calendar.open,\n.flatpickr-calendar.inline {\n  opacity: 1;\n  max-height: 640px;\n  visibility: visible;\n}\n.flatpickr-calendar.open {\n  display: inline-block;\n  z-index: 99999;\n}\n.flatpickr-calendar.animate.open {\n  -webkit-animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n  animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n}\n.flatpickr-calendar.inline {\n  display: block;\n  position: relative;\n  top: 2px;\n}\n.flatpickr-calendar.static {\n  position: absolute;\n  top: calc(100% + 2px);\n}\n.flatpickr-calendar.static.open {\n  z-index: 999;\n  display: block;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7) {\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1) {\n  -webkit-box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n  box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n}\n.flatpickr-calendar .hasWeeks .dayContainer,\n.flatpickr-calendar .hasTime .dayContainer {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.flatpickr-calendar .hasWeeks .dayContainer {\n  border-left: 0;\n}\n.flatpickr-calendar.hasTime .flatpickr-time {\n  height: 40px;\n  border-top: 1px solid #eceef1;\n}\n.flatpickr-calendar.hasTime .flatpickr-innerContainer {\n  border-bottom: 0;\n}\n.flatpickr-calendar.hasTime .flatpickr-time {\n  border: 1px solid #eceef1;\n}\n.flatpickr-calendar.noCalendar.hasTime .flatpickr-time {\n  height: auto;\n}\n.flatpickr-calendar:before,\n.flatpickr-calendar:after {\n  position: absolute;\n  display: block;\n  pointer-events: none;\n  border: solid transparent;\n  content: '';\n  height: 0;\n  width: 0;\n  left: 22px;\n}\n.flatpickr-calendar.rightMost:before,\n.flatpickr-calendar.arrowRight:before,\n.flatpickr-calendar.rightMost:after,\n.flatpickr-calendar.arrowRight:after {\n  left: auto;\n  right: 22px;\n}\n.flatpickr-calendar.arrowCenter:before,\n.flatpickr-calendar.arrowCenter:after {\n  left: 50%;\n  right: 50%;\n}\n.flatpickr-calendar:before {\n  border-width: 5px;\n  margin: 0 -5px;\n}\n.flatpickr-calendar:after {\n  border-width: 4px;\n  margin: 0 -4px;\n}\n.flatpickr-calendar.arrowTop:before,\n.flatpickr-calendar.arrowTop:after {\n  bottom: 100%;\n}\n.flatpickr-calendar.arrowTop:before {\n  border-bottom-color: #eceef1;\n}\n.flatpickr-calendar.arrowTop:after {\n  border-bottom-color: #eceef1;\n}\n.flatpickr-calendar.arrowBottom:before,\n.flatpickr-calendar.arrowBottom:after {\n  top: 100%;\n}\n.flatpickr-calendar.arrowBottom:before {\n  border-top-color: #eceef1;\n}\n.flatpickr-calendar.arrowBottom:after {\n  border-top-color: #eceef1;\n}\n.flatpickr-calendar:focus {\n  outline: 0;\n}\n.flatpickr-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.flatpickr-months {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flatpickr-months .flatpickr-month {\n  border-radius: 5px 5px 0 0;\n  background: #eceef1;\n  color: #5a6171;\n  fill: #5a6171;\n  height: 34px;\n  line-height: 1;\n  text-align: center;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n.flatpickr-months .flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month {\n  text-decoration: none;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  height: 34px;\n  padding: 10px;\n  z-index: 3;\n  color: #5a6171;\n  fill: #5a6171;\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,\n.flatpickr-months .flatpickr-next-month.flatpickr-disabled {\n  display: none;\n}\n.flatpickr-months .flatpickr-prev-month i,\n.flatpickr-months .flatpickr-next-month i {\n  position: relative;\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-prev-month {\n  /*\n      /*rtl:begin:ignore*/\n  /*\n      */\n  left: 0;\n  /*\n      /*rtl:end:ignore*/\n  /*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-next-month {\n  /*\n      /*rtl:begin:ignore*/\n  /*\n      */\n  right: 0;\n  /*\n      /*rtl:end:ignore*/\n  /*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month:hover,\n.flatpickr-months .flatpickr-next-month:hover {\n  color: #bbb;\n}\n.flatpickr-months .flatpickr-prev-month:hover svg,\n.flatpickr-months .flatpickr-next-month:hover svg {\n  fill: #f64747;\n}\n.flatpickr-months .flatpickr-prev-month svg,\n.flatpickr-months .flatpickr-next-month svg {\n  width: 14px;\n  height: 14px;\n}\n.flatpickr-months .flatpickr-prev-month svg path,\n.flatpickr-months .flatpickr-next-month svg path {\n  -webkit-transition: fill 0.1s;\n  transition: fill 0.1s;\n  fill: inherit;\n}\n.numInputWrapper {\n  position: relative;\n  height: auto;\n}\n.numInputWrapper input,\n.numInputWrapper span {\n  display: inline-block;\n}\n.numInputWrapper input {\n  width: 100%;\n}\n.numInputWrapper input::-ms-clear {\n  display: none;\n}\n.numInputWrapper input::-webkit-outer-spin-button,\n.numInputWrapper input::-webkit-inner-spin-button {\n  margin: 0;\n  -webkit-appearance: none;\n}\n.numInputWrapper span {\n  position: absolute;\n  right: 0;\n  width: 14px;\n  padding: 0 4px 0 2px;\n  height: 50%;\n  line-height: 50%;\n  opacity: 0;\n  cursor: pointer;\n  border: 1px solid rgba(72, 72, 72, 0.15);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.numInputWrapper span:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.numInputWrapper span:active {\n  background: rgba(0, 0, 0, 0.2);\n}\n.numInputWrapper span:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n}\n.numInputWrapper span.arrowUp {\n  top: 0;\n  border-bottom: 0;\n}\n.numInputWrapper span.arrowUp:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-bottom: 4px solid rgba(72, 72, 72, 0.6);\n  top: 26%;\n}\n.numInputWrapper span.arrowDown {\n  top: 50%;\n}\n.numInputWrapper span.arrowDown:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 4px solid rgba(72, 72, 72, 0.6);\n  top: 40%;\n}\n.numInputWrapper span svg {\n  width: inherit;\n  height: auto;\n}\n.numInputWrapper span svg path {\n  fill: rgba(90, 97, 113, 0.5);\n}\n.numInputWrapper:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.numInputWrapper:hover span {\n  opacity: 1;\n}\n.flatpickr-current-month {\n  font-size: 135%;\n  line-height: inherit;\n  font-weight: 300;\n  color: inherit;\n  position: absolute;\n  width: 75%;\n  left: 12.5%;\n  padding: 7.48px 0 0 0;\n  line-height: 1;\n  height: 34px;\n  display: inline-block;\n  text-align: center;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px);\n}\n.flatpickr-current-month span.cur-month {\n  font-family: inherit;\n  font-weight: 700;\n  color: inherit;\n  display: inline-block;\n  margin-left: 0.5ch;\n  padding: 0;\n}\n.flatpickr-current-month span.cur-month:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.flatpickr-current-month .numInputWrapper {\n  width: 6ch;\n  width: 7ch\\0;\n  display: inline-block;\n}\n.flatpickr-current-month .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #5a6171;\n}\n.flatpickr-current-month .numInputWrapper span.arrowDown:after {\n  border-top-color: #5a6171;\n}\n.flatpickr-current-month input.cur-year {\n  background: transparent;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: text;\n  padding: 0 0 0 0.5ch;\n  margin: 0;\n  display: inline-block;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  line-height: inherit;\n  height: auto;\n  border: 0;\n  border-radius: 0;\n  vertical-align: initial;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.flatpickr-current-month input.cur-year:focus {\n  outline: 0;\n}\n.flatpickr-current-month input.cur-year[disabled],\n.flatpickr-current-month input.cur-year[disabled]:hover {\n  font-size: 100%;\n  color: rgba(90, 97, 113, 0.5);\n  background: transparent;\n  pointer-events: none;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months {\n  appearance: menulist;\n  background: #eceef1;\n  border: none;\n  border-radius: 0;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: pointer;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  height: auto;\n  line-height: inherit;\n  margin: -1px 0 0 0;\n  outline: none;\n  padding: 0 0 0 0.5ch;\n  position: relative;\n  vertical-align: initial;\n  -webkit-box-sizing: border-box;\n  -webkit-appearance: menulist;\n  -moz-appearance: menulist;\n  width: auto;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months:focus,\n.flatpickr-current-month .flatpickr-monthDropdown-months:active {\n  outline: none;\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month {\n  background-color: #eceef1;\n  outline: none;\n  padding: 0;\n}\n.flatpickr-weekdays {\n  background: #eceef1;\n  text-align: center;\n  overflow: hidden;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 28px;\n}\n.flatpickr-weekdays .flatpickr-weekdaycontainer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\nspan.flatpickr-weekday {\n  cursor: default;\n  font-size: 90%;\n  background: #eceef1;\n  color: #5a6171;\n  line-height: 1;\n  margin: 0;\n  text-align: center;\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  font-weight: bolder;\n}\n.dayContainer,\n.flatpickr-weeks {\n  padding: 1px 0 0 0;\n}\n.flatpickr-days {\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  width: 307.875px;\n  border-left: 1px solid #eceef1;\n  border-right: 1px solid #eceef1;\n}\n.flatpickr-days:focus {\n  outline: 0;\n}\n.dayContainer {\n  padding: 0;\n  outline: 0;\n  text-align: left;\n  width: 307.875px;\n  min-width: 307.875px;\n  max-width: 307.875px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px);\n  opacity: 1;\n}\n.dayContainer + .dayContainer {\n  -webkit-box-shadow: -1px 0 0 #eceef1;\n  box-shadow: -1px 0 0 #eceef1;\n}\n.flatpickr-day {\n  background: none;\n  border: 1px solid transparent;\n  border-radius: 150px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: #484848;\n  cursor: pointer;\n  font-weight: 400;\n  width: 14.2857143%;\n  -webkit-flex-basis: 14.2857143%;\n  -ms-flex-preferred-size: 14.2857143%;\n  flex-basis: 14.2857143%;\n  max-width: 39px;\n  height: 39px;\n  line-height: 39px;\n  margin: 0;\n  display: inline-block;\n  position: relative;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center;\n}\n.flatpickr-day.inRange,\n.flatpickr-day.prevMonthDay.inRange,\n.flatpickr-day.nextMonthDay.inRange,\n.flatpickr-day.today.inRange,\n.flatpickr-day.prevMonthDay.today.inRange,\n.flatpickr-day.nextMonthDay.today.inRange,\n.flatpickr-day:hover,\n.flatpickr-day.prevMonthDay:hover,\n.flatpickr-day.nextMonthDay:hover,\n.flatpickr-day:focus,\n.flatpickr-day.prevMonthDay:focus,\n.flatpickr-day.nextMonthDay:focus {\n  cursor: pointer;\n  outline: 0;\n  background: #e2e2e2;\n  border-color: #e2e2e2;\n}\n.flatpickr-day.today {\n  border-color: #bbb;\n}\n.flatpickr-day.today:hover,\n.flatpickr-day.today:focus {\n  border-color: #bbb;\n  background: #bbb;\n  color: #fff;\n}\n.flatpickr-day.selected,\n.flatpickr-day.startRange,\n.flatpickr-day.endRange,\n.flatpickr-day.selected.inRange,\n.flatpickr-day.startRange.inRange,\n.flatpickr-day.endRange.inRange,\n.flatpickr-day.selected:focus,\n.flatpickr-day.startRange:focus,\n.flatpickr-day.endRange:focus,\n.flatpickr-day.selected:hover,\n.flatpickr-day.startRange:hover,\n.flatpickr-day.endRange:hover,\n.flatpickr-day.selected.prevMonthDay,\n.flatpickr-day.startRange.prevMonthDay,\n.flatpickr-day.endRange.prevMonthDay,\n.flatpickr-day.selected.nextMonthDay,\n.flatpickr-day.startRange.nextMonthDay,\n.flatpickr-day.endRange.nextMonthDay {\n  background: #ff5a5f;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  color: #fff;\n  border-color: #ff5a5f;\n}\n.flatpickr-day.selected.startRange,\n.flatpickr-day.startRange.startRange,\n.flatpickr-day.endRange.startRange {\n  border-radius: 50px 0 0 50px;\n}\n.flatpickr-day.selected.endRange,\n.flatpickr-day.startRange.endRange,\n.flatpickr-day.endRange.endRange {\n  border-radius: 0 50px 50px 0;\n}\n.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {\n  -webkit-box-shadow: -10px 0 0 #ff5a5f;\n  box-shadow: -10px 0 0 #ff5a5f;\n}\n.flatpickr-day.selected.startRange.endRange,\n.flatpickr-day.startRange.startRange.endRange,\n.flatpickr-day.endRange.startRange.endRange {\n  border-radius: 50px;\n}\n.flatpickr-day.inRange {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2;\n  box-shadow: -5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2;\n}\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover,\n.flatpickr-day.prevMonthDay,\n.flatpickr-day.nextMonthDay,\n.flatpickr-day.notAllowed,\n.flatpickr-day.notAllowed.prevMonthDay,\n.flatpickr-day.notAllowed.nextMonthDay {\n  color: rgba(72, 72, 72, 0.3);\n  background: transparent;\n  border-color: transparent;\n  cursor: default;\n}\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover {\n  cursor: not-allowed;\n  color: rgba(72, 72, 72, 0.1);\n}\n.flatpickr-day.week.selected {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;\n  box-shadow: -5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;\n}\n.flatpickr-day.hidden {\n  visibility: hidden;\n}\n.rangeMode .flatpickr-day {\n  margin-top: 1px;\n}\n.flatpickr-weekwrapper {\n  float: left;\n}\n.flatpickr-weekwrapper .flatpickr-weeks {\n  padding: 0 12px;\n  border-left: 1px solid #eceef1;\n}\n.flatpickr-weekwrapper .flatpickr-weekday {\n  float: none;\n  width: 100%;\n  line-height: 28px;\n}\n.flatpickr-weekwrapper span.flatpickr-day,\n.flatpickr-weekwrapper span.flatpickr-day:hover {\n  display: block;\n  width: 100%;\n  max-width: none;\n  color: rgba(72, 72, 72, 0.3);\n  background: transparent;\n  cursor: default;\n  border: none;\n}\n.flatpickr-innerContainer {\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  background: #fff;\n  border-bottom: 1px solid #eceef1;\n}\n.flatpickr-rContainer {\n  display: inline-block;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.flatpickr-time {\n  text-align: center;\n  outline: 0;\n  display: block;\n  height: 0;\n  line-height: 40px;\n  max-height: 40px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  background: #fff;\n  border-radius: 0 0 5px 5px;\n}\n.flatpickr-time:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.flatpickr-time .numInputWrapper {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  width: 40%;\n  height: 40px;\n  float: left;\n}\n.flatpickr-time .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #484848;\n}\n.flatpickr-time .numInputWrapper span.arrowDown:after {\n  border-top-color: #484848;\n}\n.flatpickr-time.hasSeconds .numInputWrapper {\n  width: 26%;\n}\n.flatpickr-time.time24hr .numInputWrapper {\n  width: 49%;\n}\n.flatpickr-time input {\n  background: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  border-radius: 0;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  height: inherit;\n  line-height: inherit;\n  color: #484848;\n  font-size: 14px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.flatpickr-time input.flatpickr-hour {\n  font-weight: bold;\n}\n.flatpickr-time input.flatpickr-minute,\n.flatpickr-time input.flatpickr-second {\n  font-weight: 400;\n}\n.flatpickr-time input:focus {\n  outline: 0;\n  border: 0;\n}\n.flatpickr-time .flatpickr-time-separator,\n.flatpickr-time .flatpickr-am-pm {\n  height: inherit;\n  float: left;\n  line-height: inherit;\n  color: #484848;\n  font-weight: bold;\n  width: 2%;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-align-self: center;\n  -ms-flex-item-align: center;\n  align-self: center;\n}\n.flatpickr-time .flatpickr-am-pm {\n  outline: 0;\n  width: 18%;\n  cursor: pointer;\n  text-align: center;\n  font-weight: 400;\n}\n.flatpickr-time input:hover,\n.flatpickr-time .flatpickr-am-pm:hover,\n.flatpickr-time input:focus,\n.flatpickr-time .flatpickr-am-pm:focus {\n  background: #eaeaea;\n}\n.flatpickr-input[readonly] {\n  cursor: pointer;\n}\n@-webkit-keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\nspan.flatpickr-day.selected {\n  font-weight: bold;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-app * {\n  box-sizing: border-box;\n}\n.wylib-app {\n  height: calc(100vh - 40px);\n  display: flex;\n  flex-direction: column;\n}\n.wylib-app > .header {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  font-size: 1.1em;\n  flex-grow: 0;\n}\n.wylib-app > hr {\n  width: 100%;\n}\n.wylib-app > .appbody {\n  width: 100%;\n  flex-grow: 1;\n}\n.wylib-app > .header .title {\n  font-size: 1.5em;\n  text-shadow: 1px 1px 2px #aaaacc;\n}\n.wylib-app .header .status {\n  position: relative;\n}\n.wylib-app .header .status .wylib-connect {\n  position: absolute;\n  right: 0;\n  top: 1.25em;\n  z-index: 100000;\n}\n.wylib-app .tabset {\n  width: 100%;\n  display: flex;\n}\n.wylib-app .tabset .tab {\n  min-height: 20px;\n  display: inline;\n  border: 1px solid #c0c0c0;\n  border-radius: 6px 6px 0 0;\n  padding: 0.25em 0.5em 0 0.5em;\n  margins: 0;\n  background-color: #e0e0e0;\n  flex: 0 0 auto;\n}\n.wylib-app .tabset .tab-filler {\n  flex: 1 1 auto;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-end;\n  border-bottom: 1px solid #c0c0c0;\n}\n.wylib-app .tabset .tab.active {\n  border-bottom-style: none;\n  background-color: #ffffff;\n}\n.wylib-app .tabset .tab:hover {\n  background-color: #fafaff;\n}\n.wylib-app .app-content {\n  width: 100%;\n  min-height: 100px;\n  height: 100%;\n  border-radius: 0 0 6px 6px;\n  border: 1px solid #c0c0c0;\n  border-top-style: none;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-button {\n  display: inline-block;\n  border-width: 1px;\n  border-radius: 4px;\n  margin: 0 1px 0 1px;\n}\n.wylib-button .icon {\n  display: block;\n  height: 100%;\n  width: 100%;\n  padding: 1px;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-connect {\n  border: 1px solid blue;\n  border-radius: 4px;\n  background: white;\n  padding: 4px;\n}\n.wylib-connect .header {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-between;\n}\n.wylib-connect input {\n  width: 100%;\n}\n.wylib-connect .label {\n  padding: 0.4em 0 0 0.1em;\n}\n.wylib-connect .sitelist {\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n  padding: 4px;\n  font-family: Helvetica;\n  font-size: 0.8em;\n  min-height: 6em;\n  max-height: 12em;\n  max-width: 30em;\n  min-width: 15em;\n  overflow-y: scroll;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-dbe .header {\n  background: linear-gradient(to top, #c0c0c0, #e0e0e0);\n  width: 100%;\n  display: flex;\n}\n.wylib-dbe .header wylib-menudock {\n  flex: 0 0 auto;\n}\n.wylib-dbe .header .headerfill {\n  flex: 1 1 auto;\n}\n.wylib-dbe.headstatus {\n  flex: 0 0 auto;\n  white-space: nowrap;\n  display: flex;\n  align-items: flex-end;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-dbp {\n  height: 100%;\n}\n.wylib-dbp > .header {\n  background: linear-gradient(to top, #c0c0c0, #e0e0e0);\n  width: 100%;\n  display: flex;\n}\n.wylib-dbp .header wylib-menudock {\n  flex: 0 0 auto;\n}\n.wylib-dbp .header .headerfill {\n  flex: 1 1 auto;\n}\n.wylib-dbp.headstatus {\n  flex: 0 0 auto;\n  white-space: nowrap;\n  display: flex;\n  align-items: flex-end;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-dbs > .header {\n  background: linear-gradient(to top, #c0c0c0, #e0e0e0);\n  width: 100%;\n  height: 1.4em;\n  display: flex;\n}\n.wylib-dbs .header wylib-menudock {\n  flex: 0 0 auto;\n}\n.wylib-dbs .header .headerfill {\n  flex: 1 1 auto;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-dew input.text,\n.wylib-dew div.check {\n  border-style: solid;\n  border-bottom-width: 1px;\n  border-top-width: 0;\n  border-radius: 3px;\n}\n.wylib-dew input.text,\nselect {\n  width: 100%;\n}\n.wylib-dew button {\n  height: 1.5em;\n  width: 100%;\n}\n.wylib-dew div.check {\n  width: 1.7em;\n}\n.wylib-dew input.checkbox {\n  margin: 0 0 2px 4px;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dialog.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-dialog {\n  height: 100%;\n}\n.wylib-dialog .buttons {\n  padding: 5px;\n  width: 100%;\n  text-align: right;\n}\n.wylib-dialog .title {\n  padding: 10px 10px 10px 4px;\n}\n.wylib-dialog iframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.wylib-dialog .buttons button {\n  margin: 0 2px 0 2px;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/launch.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-launch > .header {\n  font-size: 1.25em;\n  display: flex;\n  justify-content: space-between;\n}\n.wylib-launch .header > .controls {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.75em;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-logitem {\n  cursor: move;\n  padding: 3px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n}\n.wylib-logitem select {\n  margin: 0 4px 0 4px;\n}\n.wylib-logitem .right.inactive {\n  max-width: 2em;\n}\n.wylib-logitem .button.close:hover {\n  background: #ffcccc;\n}\n.wylib-logitem .button.lower:hover {\n  background: #ccffcc;\n}\n.wylib-loglist .button.isnot.not {\n  background: #ffdddd;\n}\n.wylib-loglist .button.isnot {\n  background: #f0f0f0;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-loglist {\n  padding: 2px;\n  border: 2px solid #cc9900;\n  border-radius: 8px;\n  background: #f8f8f8;\n  /*    width: 100%; */\n}\n.wylib-loglist .connector {\n  position: absolute;\n}\n.wylib-loglist .subdivision {\n  padding: 3px;\n  margin: 0 0 0 15px;\n  display: flex;\n  /* border: 1px solid orange; */\n}\n.wylib-loglist .header {\n  cursor: move;\n  position: relative;\n  background: #e0e0e0;\n}\n.wylib-loglist .connector {\n  position: absolute;\n  left: 8px;\n  top: 18px;\n  width: 16px;\n  height: auto;\n  fill: none;\n  stroke: #999999;\n  stroke-width: 2;\n}\n.wylib-loglist .spacer .lower {\n  position: absolute;\n  left: 6px;\n  top: 20px;\n  height: 12px;\n}\n.wylib-loglist .button {\n  border-radius: 4px;\n}\n.wylib-loglist .button .icon {\n  height: 12px;\n  width: 12px;\n}\n.wylib-loglist .button:hover {\n  background: #bbeebb;\n}\n.wylib-loglist .button.andor.and {\n  background: #aaaaee;\n}\n.wylib-loglist .button.andor {\n  background: #eeee88;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=style&index=0&lang=less& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-menu {\n  min-height: 3em;\n  display: flex;\n}\n.wylib-menu .menu,\n.wylib-menu .submenus {\n  display: inline;\n}\n.wylib-menu > .menu {\n  width: calc(100% - 6px);\n  position: relative;\n}\n.wylib-menu .menu tr:hover {\n  background: lightblue;\n}\n.wylib-menu .menu table {\n  border-collapse: collapse;\n  background: #f6f6f6;\n  user-select: none;\n}\n.wylib-menu .menu td {\n  white-space: nowrap;\n  padding-left: 4px;\n  padding-right: 4px;\n  border: 1px solid #f2f2f2;\n}\n.wylib-menu .icon {\n  display: block;\n  fill: #2482a4;\n  stroke: #222222;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-menudock {\n  border: 1px solid #666688;\n  border-bottom: 0;\n  border-radius: 4px 4px 0 0;\n  padding: 0;\n}\n.wylib-menudock .buttons {\n  display: flex;\n}\n.wylib-menudock wylib-button {\n  flex: 0 0 auto;\n}\n.wylib-menudock > .wylib-win {\n  position: relative;\n  top: 1em;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-modal {\n  position: absolute;\n  justify-content: center;\n  align-items: center;\n  min-width: 100%;\n  min-height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(230, 230, 230, 0.5);\n  z-index: 1000;\n}\n.wylib-modal .dialog {\n  position: relative;\n  flex: 0 0 auto;\n  min-width: 50%;\n  max-width: 90%;\n  padding: 5px;\n  border-radius: 6px;\n  border-style: solid;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pop.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-pop * {\n  box-sizing: border-box;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/report.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-rep {\n  width: 100%;\n  height: 100%;\n}\n.wylib-rep iframe {\n  width: 100%;\n  min-height: 100%;\n  border: 1px solid #c0c0c0;\n  border-radius: 4px;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/strdoc.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-strdoc {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n.wylib-strdoc .header {\n  position: absolute;\n  top: 0.5em;\n  left: 0.5em;\n  opacity: 0.26;\n}\n.wylib-strdoc .header:hover {\n  opacity: 0.94;\n}\n.wylib-strdoc .header .menudock {\n  border: 1px;\n}\n@media print {\n.wylib-strdoc .header {\n    display: none;\n}\n}\n.wylib-strdoc .preview .title {\n  font-size: 120%;\n  text-align: center;\n  width: 100%;\n  padding-bottom: 0.5em;\n}\n.wylib-strdoc .edit .editline {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  position: relative;\n  left: -1em;\n}\n.wylib-strdoc .input.title {\n  flex-grow: 2;\n}\n.wylib-strdoc .input.tag {\n  left: -1em;\n  flex-grow: 1;\n}\n.wylib-strdoc .sourceline {\n  width: 100%;\n  display: flex;\n}\n.wylib-strdoc .input.source {\n  flex-grow: 1;\n}\n.wylib-strdoc .content .input {\n  user-select: text;\n  cursor: text;\n}\n.wylib-strdoc textarea {\n  width: 100%;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-svg {\n  height: auto;\n  background: blue;\n  touch-action: none;\n}\n.wylib-svg .tools {\n  position: absolute;\n  right: 10px;\n}\n.wylib-svg button {\n  width: 100%;\n  padding: 4px;\n  background: #bbddff;\n}\n.wylib-svg .sliders input {\n  display: block;\n}\n.wylib-svg .menu {\n  position: absolute;\n  right: 0.25em;\n  top: 0.25em;\n}\n.wylib-svg .menu .icon {\n  height: 1em;\n  width: 1em;\n}\n.wylib-svg .toolbox {\n  opacity: 0.2;\n  display: none;\n  border: 1px solid blue;\n  border-radius: 4px;\n  padding: 4px;\n  transition: all 500ms ease-in-out;\n}\n.menu:hover + .toolbox {\n  display: block;\n  opacity: 1;\n}\n.wylib-svg .toolbox:hover {\n  opacity: 1;\n  display: block;\n}\n.wylib-svg .graph {\n  position: absolute;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-win {\n  touch-action: none;\n  position: absolute;\n  border-style: solid;\n}\n.wylib-win.toplevel {\n  z-index: 1;\n  min-width: 120px;\n  min-height: 14px;\n}\n.wylib-win > .header {\n  position: relative;\n  margin: 1px 1px 0 1px;\n  display: flex;\n  flex-flow: row nowrap;\n}\n.wylib-win > .menus,\n.wylib-win > .operations {\n  flex: 0 0 auto;\n}\n.wylib-win .header > .handle {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: flex;\n}\n.wylib-win .header .handle .label {\n  padding: 0 0 0 0.3em;\n  position: relative;\n  display: inline-block;\n  align-self: flex-end;\n  white-space: nowrap;\n}\n.wylib-win .headerbar {\n  display: flex;\n}\n.wylib-win .childmenu {\n  display: flex;\n  align-items: flex-end;\n}\n.wylib-win .content {\n  margin: 0px 2px 1px 2px;\n  user-select: none;\n  overflow-y: auto;\n  z-index: 1;\n}\n.wylib-win .wylib-menu {\n  z-index: 2;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".wylib-mdew table {\n  border-collapse: collapse;\n  width: 100%;\n}\n.wylib-mdew table .label {\n  text-align: right;\n}\n.wylib-mdew table tr:nth-child(even) .label {\n  background: #f0f0f0;\n}\n.wylib-mdew .wylib-mdew-hide {\n  display: none;\n  background: #ff8080;\n}\n.wylib-mdew-option {\n  height: 0.25em;\n  width: 100%;\n}\n.wylib-mdew-optline {\n  line-height: 0;\n}\n.wylib-mdew td {\n  border: 1px solid #e8e8e8;\n  white-space: nowrap;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/*\n * IMPORTANT:\n * In order to preserve the uniform grid appearance, all cell styles need to have padding, margin and border sizes.\n * No built-in (selected, editable, highlight, flashing, invalid, loading, :focus) or user-specified CSS\n * classes should alter those!\n */\n.slickgrid-container {\n  overflow: hidden;\n  outline: 0;\n  position: relative;\n  box-sizing: content-box;\n}\n.slickgrid-container .slick-group-header-columns {\n    position: relative;\n    white-space: nowrap;\n    cursor: default;\n    overflow: hidden;\n}\n.slickgrid-container .slick-group-header {\n    width: 100%;\n    overflow: hidden;\n    border-left: 0px;\n}\n.slickgrid-container .slick-group-header-column.ui-state-default {\n    position: relative;\n    display: inline-block;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n    text-overflow: ellipsis;\n    height: 16px;\n    line-height: 16px;\n    margin: 0;\n    padding: 4px;\n    border: 1px solid #a0a0a0;\n    order-left: 0px;\n    border-top: 0px;\n    border-bottom: 0px;\n    float: left;\n}\n.slickgrid-container .slick-viewport,\n  .slickgrid-container .slick-top-panel-scroller,\n  .slickgrid-container .slick-header,\n  .slickgrid-container .slick-headerrow,\n  .slickgrid-container .slick-footerrow {\n    position: relative;\n    width: 100%;\n    border: 1px solid #a0a0a0;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    border-right-width: 0;\n    border-bottom-width: 0;\n    margin: 0;\n    outline: 0;\n}\n.slickgrid-container .slick-viewport {\n    overflow: auto;\n}\n.slickgrid-container .slick-header,\n  .slickgrid-container .slick-headerrow,\n  .slickgrid-container .slick-footerrow {\n    overflow: hidden;\n}\n.slickgrid-container .slick-headerrow {\n    border-top-color: transparent;\n    border-top-width: 0;\n}\n.slickgrid-container .slick-top-panel,\n  .slickgrid-container .slick-header-columns,\n  .slickgrid-container .slick-headerrow-columns,\n  .slickgrid-container .slick-footerrow-columns {\n    position: relative;\n    white-space: nowrap;\n    cursor: default;\n    overflow: hidden;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n}\n.slickgrid-container .slick-cell,\n  .slickgrid-container .slick-header-column,\n  .slickgrid-container .slick-headerrow-column,\n  .slickgrid-container .slick-footerrow-column {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    border: 1px solid #a0a0a0;\n    border-top-color: transparent;\n    border-left-color: transparent;\n    border-top-width: 0;\n    border-left-width: 0;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n    vertical-align: middle;\n    white-space: nowrap;\n    cursor: default;\n}\n.slickgrid-container .slick-cell.slick-header-is-leaf,\n    .slickgrid-container .slick-header-column.slick-header-is-leaf,\n    .slickgrid-container .slick-headerrow-column.slick-header-is-leaf,\n    .slickgrid-container .slick-footerrow-column.slick-header-is-leaf {\n      border-bottom-color: transparent;\n      border-bottom-width: 0;\n}\n.slickgrid-container .slick-header-column.ui-state-default {\n    position: relative;\n    display: inline-block;\n    box-sizing: content-box !important;\n    overflow: hidden;\n    height: 1em;\n    line-height: 1em;\n    margin: 0;\n    padding: 4px;\n    border-right: 1px solid #a0a0a0;\n    border-left: 0px !important;\n    border-top: 0px !important;\n    border-bottom: 0px !important;\n    float: left;\n}\n.slickgrid-container .slick-cell {\n    box-sizing: border-box;\n    border-style: solid;\n    padding: 1px 2px 1px 2px;\n}\n.slickgrid-container .slick-header-column {\n    padding: 4px 4px 4px 4px;\n}\n.slickgrid-container .grid-canvas {\n    position: relative;\n    outline: 0;\n}\n.slickgrid-container .slick-row {\n    position: absolute;\n    border: 0;\n    width: 100%;\n}\n.slickgrid-container .slick-header-column-sorted {\n    font-style: italic;\n}\n.slickgrid-container .slick-sort-indicator {\n    display: inline-block;\n    width: 8px;\n    height: 5px;\n    margins: 0;\n    position: absolute;\n    left: 2px;\n    bottom: 3px;\n}\n.slickgrid-container .slick-header-column-order {\n    display: inline-block;\n    position: absolute;\n    width: 10px;\n    height: 16px;\n    margins: 0;\n    left: 4px;\n    bottom: 6px;\n    padding: 0;\n    font-size: 0.75em;\n}\n.slickgrid-container .slick-sort-indicator-desc {\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-top: 5px solid black;\n}\n.slickgrid-container .slick-sort-indicator-asc {\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid black;\n}\n.slickgrid-container .slick-header-sortable .slick-column-name {\n    margin-left: 10px;\n}\n.slickgrid-container .slick-header.ui-state-default {\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.slickgrid-container .slick-resizable-handle {\n    position: absolute;\n    font-size: 0.1px;\n    display: block;\n    cursor: col-resize;\n    width: 5px;\n    right: 0;\n    top: 0;\n    height: 100%;\n}\n.slickgrid-container .slick-resizable-handle-hover {\n    background-color: #ccc;\n}\n.slickgrid-container .slick-sortable-placeholder {\n    background: silver;\n}\n.slickgrid-container .slick-group-toggle {\n    display: inline-block;\n}\n.slickgrid-container .slick-cell.highlighted {\n    background: lightskyblue;\n    background: rgba(0, 0, 255, 0.2);\n    transition: all 0.5s;\n}\n.slickgrid-container .slick-cell.flashing {\n    border: 1px solid red !important;\n}\n.slickgrid-container .slick-cell.editable {\n    overflow: visible;\n    background: white;\n    border-color: black;\n    border-style: solid;\n}\n.slickgrid-container .slick-cell:focus {\n    outline: none;\n}\n.slickgrid-container .slick-reorder-proxy {\n    display: inline-block;\n    background: blue;\n    opacity: 0.15;\n    cursor: move;\n}\n.slickgrid-container .slick-reorder-guide {\n    display: inline-block;\n    height: 2px;\n    background: blue;\n    opacity: 0.7;\n}\n.slickgrid-container .slick-selection {\n    position: absolute;\n    border: 2px dashed black;\n}\n.slickgrid-container .slick-pane {\n    position: absolute;\n    outline: 0;\n    overflow: hidden;\n    width: 100%;\n}\n.interact-placeholder {\n  background: red !important;\n  display: inline-block;\n  float: left;\n  transform: translate(0px, -100%);\n}\n.interact-drop-active {\n  box-shadow: inset 0 0 8px rgba(7, 67, 128, 0.5);\n}\n.interact-can-drop {\n  opacity: .9;\n}\n.scrollbar-fix::-webkit-scrollbar {\n  -webkit-appearance: none;\n}\n\n/*\n * IMPORTANT:\n * In order to preserve the uniform grid appearance, all cell styles need to have padding, margin and border sizes.\n * No built-in (selected, editable, highlight, flashing, invalid, loading, :focus) or user-specified CSS\n * classes should alter those!\n */\n.slickgrid-container .slick-header-columns,\n.slickgrid-container .slick-header-column {\n  background: #d8d8d8;\n}\n.slickgrid-container .slick-header-columns {\n  border-bottom: 1px solid #a0a0a0;\n}\n.slickgrid-container .slick-header-column {\n  border-right: 1px solid #a0a0a0;\n  border-bottom: 1px solid #a0a0a0;\n}\n.slickgrid-container .slick-header-column:hover {\n  background: lightgray;\n}\n.slickgrid-container .slick-header-column-active {\n  background: #cbcbcb !important;\n}\n.slickgrid-container .slick-headerrow {\n  background: #d8d8d8;\n}\n.slickgrid-container .slick-headerrow-column {\n  background: #fafafa;\n  border-bottom: 0;\n}\n.slickgrid-container .grid-canvas {\n  background: white;\n}\n.slickgrid-container .slick-row {\n  background: white;\n  border: 0;\n  line-height: 20px;\n}\n.slickgrid-container .slick-row .slick-cell {\n    background: white;\n    padding-top: 4px;\n    padding-bottom: 4px;\n    padding-left: 4px;\n    padding-right: 4px;\n    box-sizing: border-box;\n}\n.slickgrid-container .slick-row .slick-cell.invalid {\n      border-color: red;\n      -moz-animation-duration: 0.2s;\n      -webkit-animation-duration: 0.2s;\n      -moz-animation-name: slickgrid-invalid-hilite;\n      -webkit-animation-name: slickgrid-invalid-hilite;\n}\n.slickgrid-container .slick-row .slick-cell.selected {\n      background-color: #e8e8ff;\n}\n.slickgrid-container .slick-row .slick-cell.active {\n      border-color: rgba(0, 0, 0, 0.3);\n      border-style: solid;\n      border-width: 1px;\n      padding-top: 2px;\n      padding-left: 3px;\n}\n.slickgrid-container .slick-row .slick-cell.active input.editor-text {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        border: 0;\n        margin: 0;\n        background: transparent;\n        padding: 2px 3px 2px 3px;\n        transform: translate(-3px, -2px);\n}\n.slickgrid-container .slick-row.odd .slick-cell {\n    background: #fafaff;\n}\n.slickgrid-container .slick-row.odd .slick-cell.selected {\n      background-color: #e8e8ff;\n}\n.slickgrid-container .slick-row.active-row .slick-cell {\n    background-color: #e2fffd;\n}\n.slickgrid-container .slick-row.active-row .slick-cell.selected {\n      background-color: #e8e8ff;\n}\n.slickgrid-container .slick-row.active-row.odd .slick-cell {\n    background-color: #e2fffd;\n}\n.slickgrid-container .slick-row.active-row.odd .slick-cell.selected {\n      background-color: green;\n}\n.slickgrid-container .slick-row.loading {\n    opacity: 0.5;\n}\n.slickgrid-container .slick-group {\n  border-bottom: 2px solid silver;\n}\n.slickgrid-container .slick-group-toggle {\n  width: 9px;\n  height: 9px;\n  margin-right: 5px;\n}\n.slickgrid-container .slick-group-totals {\n  color: gray;\n  background: white;\n}\n.slickgrid-container .slick-sortable-placeholder {\n  background: silver !important;\n}\n@-moz-keyframes slickgrid-invalid-hilite {\nfrom {\n    box-shadow: 0 0 6px red;\n}\nto {\n    box-shadow: none;\n}\n}\n@-webkit-keyframes slickgrid-invalid-hilite {\nfrom {\n    box-shadow: 0 0 6px red;\n}\nto {\n    box-shadow: none;\n}\n}\n.slickgrid-container .slick-header-menubutton {\n  background-position: center center;\n  background-repeat: no-repeat;\n  border-left: thin ridge silver;\n  cursor: pointer;\n  display: inline-block;\n  position: absolute;\n}\n.slickgrid-container .slick-header-menu {\n  background: none repeat scroll 0 0 white;\n  border: 1px solid #BFBDBD;\n  min-width: 175px;\n  padding: 4px;\n  z-index: 9;\n  cursor: default;\n  display: inline-block;\n  margin: 0;\n  position: absolute;\n}\n.slickgrid-container .slick-header-menu button {\n    border: 1px solid #BFBDBD;\n    background-color: white;\n    width: 45px;\n    padding: 4px;\n    margin: 4px 4px 4px 0;\n}\n.slickgrid-container .slick-header-menu .filter {\n    border: 1px solid #BFBDBD;\n    font-size: 8pt;\n    height: 400px;\n    margin-top: 6px;\n    overflow: scroll;\n    padding: 4px;\n    white-space: nowrap;\n    width: 200px;\n}\n.slickgrid-container .slick-header-menu .textfilter > label {\n    display: inline-block;\n    margin-left: 5px;\n    margin-right: 10px;\n}\n.slickgrid-container .slick-header-menu .textfilter > input[type=text] {\n    width: 70%;\n}\n.slickgrid-container label {\n  display: block;\n  margin-bottom: 5px;\n}\n.slickgrid-container .slick-header-menuitem {\n  border: 1px solid transparent;\n  padding: 2px 4px;\n  cursor: pointer;\n  list-style: none outside none;\n  margin: 0;\n}\n.slickgrid-container .slick-header-menuicon {\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: inline-block;\n  height: 16px;\n  margin-right: 4px;\n  vertical-align: middle;\n  width: 16px;\n}\n.slickgrid-container .slick-header-menucontent {\n  display: inline-block;\n  vertical-align: middle;\n}\n.slickgrid-container .slick-header-menuitem:hover {\n  border-color: #BFBDBD;\n}\n.slickgrid-container .header-overlay,\n.slickgrid-container .cell-overlay,\n.slickgrid-container .selection-cell-overlay {\n  display: block;\n  position: absolute;\n  z-index: 4;\n}\n.slickgrid-container .slick-cell > .editor-select {\n  position: absolute;\n  left: 0;\n  right: 0;\n  width: auto;\n  top: 0;\n  bottom: 0;\n  max-width: 100%;\n  min-width: 0;\n  margin: 0;\n}\n.slickgrid-container .slick-range-decorator {\n  z-index: 5;\n  pointer-events: none;\n  background: transparent;\n  border: none;\n  outline: black;\n}\ndiv.slick-large-editor-text {\n  z-index: 5;\n  position: absolute;\n  background: #f0f0fc;\n  padding: 5px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);\n}\ndiv.slick-large-editor-text textarea {\n    backround: transparent;\n    width: 250px;\n    height: 80px;\n    border: 0;\n    outline: 0;\n}\ndiv.slick-large-editor-text div {\n    text-align: right;\n}\ndiv.slick-large-editor-text div button {\n      background-color: #c6c6f4;\n      border: 1px solid #a0a0a0;\n      cursor: pointer;\n      justify-content: center;\n      padding-left: 0.75em;\n      padding-right: 0.75em;\n      text-align: center;\n      white-space: nowrap;\n}\n.wylib-mlb {\n  height: 100%;\n}\n.wylib-mlb .slickgrid-container {\n  width: auto;\n}\n.wylib-mlb .align-right {\n  text-align: right;\n}\n.wylib-mlb .align-center {\n  text-align: center;\n}\n.wylib-mlb .align-left {\n  text-align: left;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/flatpickr/dist/themes/light.css":
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/themes/light.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader/dist/cjs.js!../../../less-loader/dist/cjs.js!./light.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./node_modules/flatpickr/dist/themes/light.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dialog.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dialog.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/launch.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./launch.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=style&index=0&lang=less& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=style&index=0&lang=less& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/pop.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./pop.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/report.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./report.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/strdoc.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./strdoc.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=template&id=5ef48958&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=template&id=5ef48958& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-app" }, [
    _c("div", { staticClass: "header" }, [
      _c("div", { staticClass: "title", attrs: { title: _vm.appLang.help } }, [
        _vm._v(_vm._s(_vm.appLang.title)),
      ]),
      _vm._v(" "),
      _vm.pw.ready
        ? _c(
            "div",
            { staticClass: "status" },
            [
              _c(
                "button",
                {
                  attrs: { title: _vm.wm.h.appServer },
                  on: {
                    click: function ($event) {
                      _vm.conMenuPosted = !_vm.conMenuPosted
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.wm.t.appServer || "Server") + ":")]
              ),
              _vm._v(" "),
              _c("span", { attrs: { title: _vm.wm.h.appServerURL } }, [
                _vm._v(_vm._s(_vm.siteConnected)),
              ]),
              _vm._v(" "),
              _c("wylib-connect", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.conMenuPosted,
                    expression: "conMenuPosted",
                  },
                ],
                attrs: { db: _vm.db, env: _vm.env },
                on: { site: _vm.siteChange },
              }),
            ],
            1
          )
        : _vm._e(),
    ]),
    _vm._v(" "),
    _c("hr"),
    _vm._v(" "),
    !_vm.pw.ready
      ? _c("label", [
          _vm._v(_vm._s(_vm.pw.prompt) + ":"),
          _c("input", {
            attrs: { type: "password", autofocus: "" },
            on: {
              keyup: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.submitPW.apply(null, arguments)
              },
            },
          }),
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.pw.ready
      ? _c("div", { staticClass: "appbody", on: { click: _vm.appClick } }, [
          _c(
            "div",
            { staticClass: "tabset" },
            [
              _vm._l(_vm.tabs, function (tab) {
                return _c(
                  "div",
                  {
                    staticClass: "tab",
                    class: _vm.tabClass(tab.tag),
                    attrs: { title: tab.lang ? tab.lang.help : null },
                    on: {
                      click: function ($event) {
                        return _vm.tabSelect(tab.tag)
                      },
                    },
                  },
                  [
                    _vm._v(
                      "\n        " +
                        _vm._s(
                          (tab.lang ? tab.lang.title : null) || tab.title
                        ) +
                        "\n      "
                    ),
                  ]
                )
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "tab-filler" },
                [
                  _c("wylib-button", {
                    attrs: {
                      icon: "menu",
                      env: _vm.env,
                      toggled: _vm.appMenu.posted,
                      title: _vm.appMenu.title,
                    },
                    on: {
                      click: function ($event) {
                        return _vm.postAppMenu($event)
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c(
                    "wylib-win",
                    {
                      attrs: {
                        state: _vm.appMenu,
                        env: _vm.env,
                        pinnable: "true",
                      },
                      on: {
                        close: function ($event) {
                          _vm.appMenu.posted = false
                        },
                      },
                    },
                    [
                      _vm.appMenu.posted
                        ? _c("wylib-menu", {
                            attrs: {
                              state: _vm.appMenu.client,
                              env: _vm.env,
                              config: _vm.appMenuConfig(),
                            },
                            on: {
                              done: function ($event) {
                                _vm.appMenu.posted = _vm.appMenu.pinned
                              },
                            },
                          })
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "subwindows" },
            [
              _vm.modal.posted
                ? _c("wylib-modal", {
                    attrs: { state: _vm.modal, env: _vm.env },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function (ws) {
                            return [
                              _c("wylib-dialog", {
                                attrs: { state: ws.state, env: _vm.env },
                              }),
                            ]
                          },
                        },
                      ],
                      null,
                      false,
                      523268791
                    ),
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.previews, function (win, idx) {
                return win.posted
                  ? _c(
                      "wylib-win",
                      {
                        key: idx,
                        attrs: { topLevel: "true", state: win, env: _vm.env },
                        on: {
                          close: function ($event) {
                            win.posted = false
                          },
                        },
                      },
                      [
                        _c("wylib-dbp", {
                          attrs: { state: win.client, env: _vm.env },
                        }),
                      ],
                      1
                    )
                  : _vm._e()
              }),
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "app-content" },
            [_vm._t("default", null, { env: _vm.env })],
            2
          ),
        ])
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=template&id=22b0d96a&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=template&id=22b0d96a& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wylib wylib-button button",
      style: _vm.buttonStyle,
      on: {
        mouseenter: _vm.mouseEnter,
        mouseleave: _vm.mouseLeave,
        click: function ($event) {
          $event.stopPropagation()
          return _vm.click.apply(null, arguments)
        },
      },
    },
    [
      _c("svg", {
        staticClass: "icon",
        style: _vm.iconStyle,
        domProps: { innerHTML: _vm._s(_vm.iconSvg) },
      }),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=template&id=8ee957be&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=template&id=8ee957be& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-connect" }, [
    _c(
      "div",
      { staticClass: "header" },
      [
        _c("wylib-menudock", {
          attrs: {
            config: _vm.dockConfig,
            state: _vm.dock,
            env: _vm.env,
            lang: _vm.wm.conMenu,
          },
        }),
        _vm._v(" "),
        _c("div", [_vm._v(_vm._s(_vm.status))]),
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "label", attrs: { title: _vm.wm.h.conTitle } }, [
      _vm._v(_vm._s(_vm.wm.t.conTitle) + ":"),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "sitelist", attrs: { title: _vm.wm.h.conTitle } },
      [
        _c(
          "table",
          _vm._l(_vm.sites, function (site, idx) {
            return _c(
              "tr",
              {
                style: _vm.rowStyle(site.selected),
                on: {
                  click: function ($event) {
                    return _vm.selectSite($event, idx)
                  },
                  dblclick: function () {
                    _vm.connectSite()
                  },
                },
              },
              [
                _c("td", [
                  _c("svg", {
                    style: _vm.keyStyle(site),
                    domProps: { innerHTML: _vm._s(_vm.keyIcon(site)) },
                  }),
                ]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(site.host))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(site.port))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(site.user))]),
              ]
            )
          }),
          0
        ),
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "label", attrs: { title: _vm.wm.h.conImport } }, [
      _vm._v(_vm._s(_vm.wm.t.conImport) + ":"),
      _c("input", { attrs: { type: "file" }, on: { input: _vm.importKeys } }),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=template&id=35af4044&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=template&id=35af4044& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-dbe" },
    [
      _c(
        "div",
        { staticClass: "header" },
        [
          _c("wylib-menudock", {
            ref: "headMenu",
            attrs: {
              state: _vm.state.dock,
              config: _vm.dockConfig,
              env: _vm.env,
              lang: _vm.wm.dbeMenu,
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "headerfill" }),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "headStatus",
              staticClass: "wylib-dbe headstatus",
              attrs: { title: _vm.wm.h.dbePrimary },
            },
            [
              _vm._v("PK:"),
              _c("input", {
                attrs: { disabled: "", size: _vm.keyEntSize },
                domProps: { value: _vm.keyValues },
              }),
            ]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "subwindows" },
        _vm._l(_vm.state.subs, function (sub, key) {
          return _c(
            "wylib-win",
            {
              key: key,
              attrs: { topLevel: "true", state: sub, env: _vm.env },
              on: {
                close: function (r) {
                  _vm.closeWin(key, r)
                },
              },
            },
            [
              _c("wylib-dbp", {
                attrs: {
                  state: sub.client,
                  env: _vm.env,
                  bus: _vm.subBus,
                  master: _vm.keyMaster,
                },
              }),
            ],
            1
          )
        }),
        1
      ),
      _vm._v(" "),
      _c("wylib-mdew", {
        ref: "mdew",
        attrs: {
          state: _vm.state.dews,
          env: _vm.env,
          config: _vm.mdewConfig,
          data: _vm.dbData,
          bus: _vm.mdewBus,
        },
        on: { input: _vm.change },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=template&id=34793b2e&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=template&id=34793b2e& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-dbp" },
    [
      _c(
        "div",
        { staticClass: "header" },
        [
          _c("wylib-menudock", {
            ref: "headMenu",
            attrs: {
              config: _vm.dockConfig,
              state: _vm.state.dock,
              env: _vm.env,
              lang: _vm.wm.dbpMenu,
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "headerfill" }),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "headStatus",
              staticClass: "wylib-dbp headstatus",
              attrs: { title: _vm.wm.h.dbpLoaded },
            },
            [
              _vm._v("#:"),
              _c("input", {
                attrs: { disabled: "", size: _vm.loadedSize },
                domProps: { value: _vm.state.loaded },
              }),
            ]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "subwindows" },
        [
          _c(
            "wylib-win",
            {
              attrs: { state: _vm.state.colMenu, env: _vm.env },
              on: {
                close: function ($event) {
                  _vm.state.colMenu.posted = false
                },
              },
            },
            [
              _c("wylib-menu", {
                attrs: {
                  state: _vm.state.colMenu.client,
                  env: _vm.env,
                  config: _vm.colMenuConfig,
                  lang: _vm.wm.dbpColumn,
                },
                on: {
                  done: function ($event) {
                    _vm.state.colMenu.posted = false
                  },
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          this.editPosts
            ? _c(
                "wylib-win",
                {
                  attrs: {
                    state: _vm.state.edit,
                    topLevel: "true",
                    env: _vm.env,
                  },
                  on: {
                    close: function ($event) {
                      _vm.state.edit.posted = false
                    },
                  },
                },
                [
                  _c("wylib-dbe", {
                    attrs: {
                      state: _vm.state.edit.client,
                      env: _vm.env,
                      bus: _vm.dbeBus,
                      master: _vm.master,
                    },
                    on: { modified: _vm.modified },
                  }),
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          this.filtPosts
            ? _c(
                "wylib-win",
                {
                  attrs: {
                    state: _vm.state.filter,
                    env: _vm.env,
                    topLevel: "true",
                  },
                  on: {
                    close: function ($event) {
                      _vm.state.filter.posted = false
                    },
                  },
                },
                [
                  _c("wylib-dbs", {
                    attrs: {
                      fields: _vm.logicFields,
                      state: _vm.state.filter.client,
                      env: _vm.env,
                      bus: _vm.dbsBus,
                    },
                    on: { search: _vm.search, default: _vm.dbsDefault },
                  }),
                ],
                1
              )
            : _vm._e(),
        ],
        1
      ),
      _vm._v(" "),
      _c("wylib-mlb", {
        ref: "mlb",
        attrs: {
          state: _vm.state.grid,
          env: _vm.env,
          data: _vm.gridData,
          config: _vm.mlbConfig,
          bus: _vm.mlbBus,
        },
        on: {
          execute: _vm.executeRows,
          headerMenu: _vm.colMenuHandler,
          sort: _vm.sort,
          geometry: _vm.geometry,
        },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=template&id=3424ae28&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=template&id=3424ae28& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-dbs" },
    [
      _c(
        "div",
        { ref: "header", staticClass: "header" },
        [
          _c("wylib-menudock", {
            attrs: {
              state: _vm.state.dock,
              env: _vm.env,
              config: _vm.dockConfig,
              label: "Search",
              title: "Functions relating to stored queries",
            },
          }),
          _vm._v(" "),
          _c("div", { staticClass: "headerfill" }),
        ],
        1
      ),
      _vm._v(" "),
      _c("wylib-loglist", {
        attrs: {
          state: _vm.state.logic,
          env: _vm.env,
          config: _vm.logicConfig,
        },
        on: { add: _vm.addNew, geometry: _vm.geometry, submit: _vm.search },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=template&id=f28b233e&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/dialog.vue?vue&type=template&id=f28b233e& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-dialog" },
    [
      _vm.message && _vm.reason
        ? _c("div", {
            staticClass: "title",
            attrs: { title: _vm.help },
            domProps: { innerHTML: _vm._s(_vm.reason + ": " + _vm.message) },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.state.dews
        ? _c("wylib-mdew", {
            attrs: {
              config: _vm.state.dews,
              env: _vm.env,
              data: _vm.state.data,
            },
            on: { input: _vm.change, submit: _vm.submit },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.buttons
        ? _c(
            "div",
            { staticClass: "buttons" },
            _vm._l(_vm.buttons, function (but) {
              return _c("button", {
                key: but.tag,
                attrs: {
                  disabled: !but.able,
                  title: but.lang ? but.lang.help : "Confirm",
                },
                domProps: {
                  innerHTML: _vm._s(but.lang ? but.lang.title : "?"),
                },
                on: {
                  click: function ($event) {
                    return _vm.submit($event, but.tag)
                  },
                },
              })
            }),
            0
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/indate.vue?vue&type=template&id=2baad5ec&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/indate.vue?vue&type=template&id=2baad5ec& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("input", { staticClass: "wylib wylib-indate" })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=template&id=0c4b3168&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/launch.vue?vue&type=template&id=0c4b3168& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-launch" }, [
    _c("div", { staticClass: "header" }, [
      _vm._v(
        _vm._s(_vm.insTitle || _vm.state.title || "Preview Launcher") + "\n    "
      ),
      _c("div", { staticClass: "controls" }, [
        _vm.launchData && _vm.launchData.import
          ? _c("label", [
              _vm._v("\n        " + _vm._s(_vm.wm.t.lchImport) + ":\n        "),
              _c("input", {
                attrs: {
                  type: "file",
                  accept: "*.json",
                  multiple: "",
                  title: _vm.wm.h.lchImport,
                },
                on: { change: _vm.importFile },
              }),
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          { attrs: { title: _vm.wm.h.lchAdd }, on: { click: _vm.addWin } },
          [_vm._v(_vm._s(_vm.wm.t.lchAdd))]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "subwindows" },
      _vm._l(_vm.state.windows, function (win, key) {
        return _c(
          "wylib-win",
          {
            key: key,
            attrs: { topLevel: "true", state: win, env: _vm.env },
            on: {
              close: function (r) {
                _vm.closeWin(key, r)
              },
            },
          },
          [_c("wylib-dbp", { attrs: { state: win.client, env: _vm.env } })],
          1
        )
      }),
      1
    ),
    _vm._v(" "),
    _vm.instructions
      ? _c("div", {
          staticClass: "instructions",
          domProps: { innerHTML: _vm._s(_vm.instructions) },
        })
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=template&id=08558de4&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=template&id=08558de4& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wylib wylib-logitem",
      style: { background: _vm.background },
      attrs: { draggable: "true" },
      on: {
        dragover: _vm.zoneEnter,
        dragleave: _vm.zoneLeave,
        dragend: _vm.drop,
      },
    },
    [
      _c("wylib-button", {
        staticClass: "button lower",
        attrs: {
          env: _vm.env,
          size: "1",
          icon: "play3",
          title: _vm.wMsg("litToSub"),
        },
        on: {
          click: function ($event) {
            return _vm.$emit("lower")
          },
        },
      }),
      _vm._v(" "),
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.state.left,
              expression: "state.left",
            },
          ],
          staticClass: "left",
          attrs: { title: _vm.wMsg("litLeft") },
          on: {
            change: function ($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function (o) {
                  return o.selected
                })
                .map(function (o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.$set(
                _vm.state,
                "left",
                $event.target.multiple ? $$selectedVal : $$selectedVal[0]
              )
            },
          },
        },
        _vm._l(_vm.config.left, function (opt) {
          return _c(
            "option",
            {
              attrs: { label: opt.title, title: opt.help },
              domProps: { value: opt.tag },
            },
            [_vm._v(_vm._s(opt.title))]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "button isnot",
          class: { not: _vm.state.not },
          attrs: { title: _vm.wMsg("lstNot") },
          on: { click: _vm.notMe },
        },
        [_vm._v(_vm._s(_vm.notFunction))]
      ),
      _vm._v(" "),
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.state.oper,
              expression: "state.oper",
            },
          ],
          staticClass: "operator",
          attrs: { title: _vm.wMsg("litCompare") },
          on: {
            change: function ($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function (o) {
                  return o.selected
                })
                .map(function (o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.$set(
                _vm.state,
                "oper",
                $event.target.multiple ? $$selectedVal : $$selectedVal[0]
              )
            },
          },
        },
        _vm._l(_vm.config.oper, function (opt) {
          return _c(
            "option",
            {
              attrs: { label: _vm.title(opt), title: _vm.help(opt) },
              domProps: { value: opt.tag },
            },
            [_vm._v(_vm._s(_vm.title(opt)))]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm.config.right
        ? _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.state.right,
                  expression: "state.right",
                },
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.isBinary,
                  expression: "isBinary",
                },
              ],
              staticClass: "right",
              class: { inactive: !_vm.selRight },
              attrs: { title: _vm.wMsg("litRight") },
              on: {
                change: function ($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function (o) {
                      return o.selected
                    })
                    .map(function (o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.$set(
                    _vm.state,
                    "right",
                    $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                  )
                },
              },
            },
            [
              _c("option", {
                attrs: {
                  value: "",
                  label: "<" + _vm.wMsg("litManual", "title") + ">",
                  title: _vm.wMsg("litManual"),
                },
              }),
              _vm._v(" "),
              _vm._l(_vm.config.right, function (opt) {
                return _c(
                  "option",
                  {
                    attrs: { label: opt.title, title: opt.help },
                    domProps: { value: opt.tag },
                  },
                  [_vm._v(_vm._s(opt.title))]
                )
              }),
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.state.entry,
            expression: "state.entry",
          },
          {
            name: "show",
            rawName: "v-show",
            value: _vm.showEntry,
            expression: "showEntry",
          },
        ],
        attrs: { title: _vm.wMsg("litRightVal") },
        domProps: { value: _vm.state.entry },
        on: {
          keyup: function ($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.submit.apply(null, arguments)
          },
          input: function ($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.state, "entry", $event.target.value)
          },
        },
      }),
      _vm._v(" "),
      _c("wylib-button", {
        staticClass: "button close",
        attrs: {
          env: _vm.env,
          size: "1",
          icon: "close",
          title: _vm.wMsg("litRemove"),
        },
        on: {
          click: function ($event) {
            return _vm.$emit("close")
          },
        },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=template&id=05dab119&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=template&id=05dab119& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-loglist" },
    [
      _c("div", { staticClass: "header" }, [
        _c("svg", { ref: "connector", staticClass: "connector" }, [
          _c("path", { ref: "connectPath" }),
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button andor",
            class: { and: _vm.state.and },
            attrs: { title: _vm.wMsg("lstAndOr") },
            on: {
              click: function ($event) {
                _vm.state.and = !_vm.state.and
              },
            },
          },
          [_vm._v(_vm._s(_vm.joinFunction))]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button add",
            attrs: { title: _vm.wMsg("lstAddCond") },
            on: { click: _vm.addNew },
          },
          [_vm._v("+")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button close",
            attrs: { title: _vm.wMsg("lstRemove") },
            on: {
              click: function ($event) {
                return _vm.$emit("close")
              },
            },
          },
          [_vm._v("X")]
        ),
      ]),
      _vm._v(" "),
      _vm._l(_vm.state.items, function (item, index) {
        return _c(
          "div",
          { staticClass: "subdivision" },
          [
            "and" in item
              ? _c("wylib-loglist", {
                  key: index,
                  attrs: {
                    index: index,
                    state: item,
                    env: _vm.env,
                    config: _vm.config,
                  },
                  on: {
                    input: function (val) {
                      item = val
                    },
                    close: function ($event) {
                      return _vm.closeChild(index)
                    },
                    geometry: _vm.childGeometry,
                  },
                })
              : _c("wylib-logitem", {
                  key: index,
                  attrs: {
                    index: index,
                    state: item,
                    env: _vm.env,
                    config: _vm.config,
                  },
                  on: {
                    input: function (val) {
                      item = val
                    },
                    submit: _vm.submit,
                    lower: function ($event) {
                      return _vm.lower(index)
                    },
                    close: function ($event) {
                      return _vm.closeChild(index)
                    },
                    insert: _vm.insert,
                    geometry: _vm.childGeometry,
                  },
                }),
          ],
          1
        )
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=template&id=18a44f38&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=template&id=18a44f38& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-menu" }, [
    _c("div", { staticClass: "menu", attrs: { title: "" } }, [
      _c(
        "table",
        _vm._l(_vm.config, function (item) {
          return _c(
            "tr",
            {
              key: item.idx,
              attrs: { title: item.lang ? item.lang.help : null },
              on: {
                click: function ($event) {
                  $event.stopPropagation()
                  return _vm.execute(item.call, $event, item)
                },
                mouseenter: function ($event) {
                  return _vm.enterItem($event, item)
                },
              },
            },
            _vm._l(_vm.layout, function (fld) {
              return _c(
                "td",
                { key: fld },
                [
                  fld == "icon"
                    ? _c("svg", {
                        staticClass: "icon",
                        staticStyle: { height: "1em", width: "1em" },
                        style: _vm.iconStyle(item.toggled),
                        domProps: { innerHTML: _vm._s(_vm.iconSvg(item.icon)) },
                      })
                    : fld == "lang"
                    ? _c("div", [
                        _vm._v(
                          "\n              " +
                            _vm._s(
                              (item.lang ? item.lang.title : null) ||
                                item.lang ||
                                item.idx
                            ) +
                            "\n            "
                        ),
                      ])
                    : fld == "input" && item.menu
                    ? _c("svg", {
                        staticClass: "icon",
                        staticStyle: { height: "1em", width: "1em" },
                        domProps: { innerHTML: _vm._s(_vm.iconSvg("play3")) },
                      })
                    : fld == "input" &&
                      item.input != undefined &&
                      item.type == "checkbox"
                    ? _c("input", {
                        attrs: { type: "checkbox" },
                        domProps: { checked: item.input() },
                        on: {
                          input: function ($event) {
                            return item.input($event.target.checked)
                          },
                        },
                      })
                    : fld == "input" && item.input != undefined
                    ? _c("input", {
                        attrs: { type: item.type },
                        domProps: { value: item.input() },
                        on: {
                          input: function ($event) {
                            return item.input($event.target.value, item.idx)
                          },
                        },
                      })
                    : fld == "dew"
                    ? _c("wylib-dew", {
                        attrs: {
                          env: _vm.env,
                          field: item.idx,
                          state: item.state,
                          values: item.values,
                          lang: item.lang,
                          value: item.input(),
                        },
                        on: {
                          input: function (va, ix, d, v) {
                            item.input(va, ix, d, v)
                          },
                        },
                      })
                    : _c("div", [
                        _vm._v(
                          "\n              " +
                            _vm._s(item[fld]) +
                            "\n            "
                        ),
                      ]),
                ],
                1
              )
            }),
            0
          )
        }),
        0
      ),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "submenus subwindows" },
      _vm._l(_vm.config, function (item) {
        return item.menu
          ? _c(
              "wylib-win",
              {
                key: item.idx,
                ref: "submenu",
                refInFor: true,
                attrs: {
                  state: _vm.state.subs[item.idx],
                  env: _vm.env,
                  pinnable: "true",
                },
                on: {
                  close: function ($event) {
                    _vm.state.subs[item.idx].posted = false
                  },
                },
              },
              [
                _c("wylib-menu", {
                  attrs: {
                    state: _vm.state.subs[item.idx].client,
                    env: _vm.env,
                    lang: item.lang,
                    config: item.menu,
                    layout: item.layout ? item.layout : _vm.layout,
                  },
                  on: {
                    done: function ($event) {
                      _vm.state.subs[item.idx].posted =
                        _vm.state.subs[item.idx].pinned
                      _vm.$emit("done")
                    },
                  },
                }),
              ],
              1
            )
          : _vm._e()
      }),
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=template&id=483c602a&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=template&id=483c602a& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-menudock" }, [
    _c(
      "div",
      { staticClass: "buttons" },
      [
        _c("wylib-button", {
          staticClass: "menubutton",
          attrs: {
            icon: "menu",
            env: _vm.env,
            toggled: _vm.state.menu.posted,
            title: _vm.lang.title,
          },
          on: {
            click: function ($event) {
              _vm.state.menu.posted = !_vm.state.menu.posted
            },
          },
        }),
        _vm._v(" "),
        _vm._l(_vm.config, function (conf) {
          return conf.shortcut
            ? _c("wylib-button", {
                key: conf.idx,
                staticClass: "shortcut",
                attrs: {
                  env: _vm.env,
                  icon: conf.icon,
                  toggled: conf.toggled,
                  disabled: "disabled" in conf ? conf.disabled : false,
                  title:
                    (conf.lang ? conf.lang.title : null) +
                    ":\n" +
                    (conf.lang ? conf.lang.help : null),
                },
                on: { click: conf.call },
              })
            : _vm._e()
        }),
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "subwindows" },
      [
        _c(
          "wylib-win",
          {
            attrs: { state: _vm.state.menu, env: _vm.env, pinnable: "true" },
            on: {
              close: function ($event) {
                _vm.state.menu.posted = false
              },
            },
          },
          [
            _c("wylib-menu", {
              attrs: {
                state: _vm.state.menu.client,
                env: _vm.env,
                config: _vm.config,
                lang: _vm.lang,
              },
              on: {
                done: function ($event) {
                  _vm.state.menu.posted = _vm.state.menu.pinned
                },
              },
            }),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=template&id=5bb2b64c&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=template&id=5bb2b64c& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-mlb" }, [_vm._m(0)])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", {
      ref: "gridTable",
      staticClass: "slickgrid-container",
      style: { width: _vm.gridWidth },
    })
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=template&id=4a49cfb8&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=template&id=4a49cfb8& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-modal", style: _vm.screenStyle },
    [
      _c(
        "div",
        { staticClass: "dialog", style: _vm.dialogStyle },
        [_vm._t("default", null, { state: _vm.state.client })],
        2
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=template&id=76bd2988&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pop.vue?vue&type=template&id=76bd2988& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-pop" }, [
    _c(
      "div",
      { staticClass: "subwindows" },
      [
        _vm.modal.posted
          ? _c("wylib-modal", {
              attrs: { state: _vm.modal, env: _vm.env },
              scopedSlots: _vm._u(
                [
                  {
                    key: "default",
                    fn: function (ws) {
                      return [
                        _c("wylib-dialog", {
                          attrs: { state: ws.state, env: _vm.env },
                        }),
                      ]
                    },
                  },
                ],
                null,
                false,
                523268791
              ),
            })
          : _vm._e(),
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "pop-content" },
      [
        _vm.state.format == "html"
          ? _c("div", { domProps: { innerHTML: _vm._s(_vm.state.content) } })
          : _c(_vm.compName, {
              tag: "component",
              attrs: {
                env: _vm.env,
                state: _vm.state.content,
                bus: _vm.compBus,
              },
              on: { submit: _vm.submit },
            }),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=template&id=4c66f04d&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/report.vue?vue&type=template&id=4c66f04d& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-rep" }, [
    _vm.render
      ? _c("iframe", {
          ref: "iframe",
          attrs: { src: _vm.state.src, name: _vm.state.name },
        })
      : _vm._e(),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=template&id=74829700&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/strdoc.vue?vue&type=template&id=74829700& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-strdoc" }, [
    _vm.iAmChief && _vm.editable
      ? _c(
          "div",
          { ref: "header", staticClass: "header" },
          [
            _c("wylib-menudock", {
              staticClass: "menudock",
              attrs: {
                config: _vm.dockConfig,
                state: _vm.state.dock,
                env: _vm.env,
                lang: _vm.wm.sdcMenu,
              },
            }),
            _vm._v(" "),
            _c("div", { staticClass: "headerfill" }),
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      {
        ref: "content",
        staticClass: "content",
        style: _vm.comStyle,
        attrs: { draggable: !_vm.iAmChief },
        on: {
          dblclick: _vm.togEdit,
          mouseover: function ($event) {
            $event.stopPropagation()
            _vm.over = true
          },
          mouseout: function ($event) {
            _vm.over = false
          },
          dragstart: function ($event) {
            $event.stopPropagation()
            return _vm.dragStart.apply(null, arguments)
          },
          dragend: function ($event) {
            $event.stopPropagation()
            return _vm.dragDrop.apply(null, arguments)
          },
          dragover: function ($event) {
            $event.stopPropagation()
            return _vm.zoneOver.apply(null, arguments)
          },
          dragleave: function ($event) {
            $event.stopPropagation()
            return _vm.zoneLeave.apply(null, arguments)
          },
        },
      },
      [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.state.edit,
                expression: "state.edit",
              },
            ],
            staticClass: "edit",
            attrs: { title: _vm.wm.h.sdcEdit, draggable: "true" },
            on: {
              dragstart: function ($event) {
                $event.preventDefault()
                $event.stopPropagation()
              },
              dragend: function ($event) {
                $event.preventDefault()
                $event.stopPropagation()
              },
              dragover: function ($event) {
                $event.preventDefault()
                $event.stopPropagation()
              },
              dragleave: function ($event) {
                $event.preventDefault()
                $event.stopPropagation()
              },
            },
          },
          [
            _c(
              "div",
              { staticClass: "editline" },
              [
                _c(
                  "div",
                  { staticClass: "secnum" },
                  [
                    _c("x-r", {
                      attrs: { name: _vm.state.tag, value: _vm.secNumber },
                      on: {
                        connect: _vm.targetChange,
                        change: _vm.targetChange,
                      },
                    }),
                    _vm._v(
                      ".\n          " +
                        _vm._s(_vm.wm.t.sdcTitle || "Title") +
                        ":\n        "
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.state.title,
                      expression: "state.title",
                    },
                  ],
                  staticClass: "input title",
                  attrs: {
                    spellcheck: "spellCheck",
                    placeholder: _vm.wm.t.sdcTitle,
                    title: _vm.wm.h.sdcTitle,
                  },
                  domProps: { value: _vm.state.title },
                  on: {
                    input: [
                      function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.state, "title", $event.target.value)
                      },
                      _vm.change,
                    ],
                  },
                }),
                _vm._v(" "),
                _c("div", [_vm._v(_vm._s(_vm.wm.t.sdcTag || "Tag") + ":")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.state.tag,
                      expression: "state.tag",
                    },
                  ],
                  staticClass: "input tag",
                  attrs: {
                    placeholder: _vm.wm.t.sdcTag,
                    title: _vm.wm.h.sdcTag,
                  },
                  domProps: { value: _vm.state.tag },
                  on: {
                    input: [
                      function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.state, "tag", $event.target.value)
                      },
                      _vm.change,
                    ],
                  },
                }),
                _vm._v(" "),
                _c("wylib-button", {
                  attrs: {
                    icon: "document",
                    env: _vm.env,
                    title: _vm.butHelp("sdcPreview"),
                  },
                  on: { click: _vm.togEdit },
                }),
                _vm._v(" "),
                _c("wylib-button", {
                  attrs: {
                    icon: "plus",
                    env: _vm.env,
                    title: _vm.butHelp("sdcAdd"),
                  },
                  on: { click: _vm.addChild },
                }),
                _vm._v(" "),
                _vm.level > 0
                  ? _c("wylib-button", {
                      attrs: {
                        icon: "target",
                        env: _vm.env,
                        title: _vm.butHelp("sdcTogSource"),
                      },
                      on: { click: _vm.togSource },
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.level > 0
                  ? _c("wylib-button", {
                      attrs: {
                        icon: "zap",
                        env: _vm.env,
                        title: _vm.butHelp("sdcDelete"),
                        color: _vm.pr.butCloseColor,
                        hoverColor: _vm.pr.butCloseHoverColor,
                      },
                      on: {
                        click: function ($event) {
                          return _vm.$emit("delete", _vm.index)
                        },
                      },
                    })
                  : _vm._e(),
              ],
              1
            ),
            _vm._v(" "),
            _vm.state.source == null
              ? _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.state.text,
                      expression: "state.text",
                    },
                  ],
                  ref: "textarea",
                  staticClass: "input",
                  attrs: {
                    rows: 6,
                    spellcheck: "spellCheck",
                    title: _vm.wm.h.sdcText,
                    placeholder: _vm.wm.t.sdcText,
                  },
                  domProps: { value: _vm.state.text },
                  on: {
                    input: [
                      function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.state, "text", $event.target.value)
                      },
                      _vm.change,
                    ],
                  },
                })
              : _c("div", { staticClass: "sourceline" }, [
                  _c("span", [
                    _vm._v(_vm._s(_vm.wm.t.sdcSource || "Source") + ":"),
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.state.source,
                        expression: "state.source",
                      },
                    ],
                    staticClass: "input source",
                    attrs: {
                      placeholder: _vm.wm.t.sdcSource,
                      title: _vm.wm.h.sdcSource,
                    },
                    domProps: { value: _vm.state.source },
                    on: {
                      input: [
                        function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.state, "source", $event.target.value)
                        },
                        _vm.change,
                      ],
                    },
                  }),
                ]),
          ]
        ),
        _vm._v(" "),
        !_vm.state.edit
          ? _c("div", { staticClass: "preview" }, [
              _vm.level <= 0 && _vm.state.title
                ? _c("div", {
                    staticClass: "title",
                    attrs: { title: _vm.wm.h.sdcPreview },
                    domProps: { innerHTML: _vm._s(_vm.state.title) },
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.level > 0 && _vm.state.source
                ? _c("div", { staticClass: "text", style: _vm.parStyle }, [
                    _vm._v("\n        " + _vm._s(_vm.secNumber) + ". "),
                    _c("b", {
                      domProps: {
                        innerHTML: _vm._s(
                          _vm.state.title || _vm.wm.t.sdcReference
                        ),
                      },
                    }),
                    _vm._v(
                      ": " + _vm._s(_vm.wm.h.sdcReference) + ":\n        "
                    ),
                    _c(
                      "a",
                      { attrs: { href: _vm.sourceURL, target: "_blank" } },
                      [_vm._v(_vm._s(_vm.sourceURL) + ".")]
                    ),
                  ])
                : _c("div", {
                    ref: "text",
                    staticClass: "text input",
                    style: _vm.parStyle,
                    attrs: {
                      contenteditable: _vm.editable,
                      spellcheck: "spellCheck",
                      title: _vm.secHelp,
                    },
                    domProps: { innerHTML: _vm._s(_vm.titledText) },
                    on: {
                      focus: _vm.editEnter,
                      blur: _vm.editLeave,
                      connect: _vm.crossChange,
                      input: _vm.change,
                    },
                  }),
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm._l(_vm.state.sections, function (sec, idx) {
          return _c(
            "div",
            { staticClass: "sections" },
            [
              _c("wylib-strdoc", {
                key: idx,
                attrs: {
                  index: idx + 1,
                  prefix: _vm.nextPrefix,
                  level: _vm.level + 1,
                  state: sec,
                  env: _vm.env,
                  bus: _vm.useBus,
                },
                on: {
                  delete: function (x) {
                    _vm.deleteSub(x || idx)
                  },
                  add: function (a, s) {
                    _vm.addSubs(idx, a, s)
                  },
                },
              }),
            ],
            1
          )
        }),
      ],
      2
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=template&id=8e4d50c6&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=template&id=8e4d50c6& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "g",
    { attrs: { transform: _vm.transform } },
    [
      _c("g", {
        style: _vm.objStyle,
        domProps: { innerHTML: _vm._s(_vm.state.body) },
      }),
      _vm._v(" "),
      _c(
        "g",
        { staticClass: "hubs" },
        _vm._l(_vm.state.links, function (link) {
          return _c("g", {
            domProps: { innerHTML: _vm._s(_vm.hubs[_vm.linkIndex(link)]) },
          })
        }),
        0
      ),
      _vm._v(" "),
      _vm._l(_vm.state.links, function (link) {
        return _c("g", { staticClass: "connectors" }, [
          _c("path", {
            attrs: {
              d: _vm.connectors[_vm.linkIndex(link)],
              "marker-end": "url(#marker-arrow)",
              stroke: _vm.linkColor(link),
              "stroke-width": "1",
              fill: "none",
            },
          }),
        ])
      }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=template&id=ef2988fc&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=template&id=ef2988fc& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wylib wylib-svg",
      on: {
        wheel: function ($event) {
          $event.preventDefault()
          return _vm.zoom.apply(null, arguments)
        },
      },
    },
    [
      _c(
        "svg",
        {
          ref: "svg",
          staticClass: "graph",
          attrs: { viewBox: _vm.viewCoords },
        },
        [
          _c("defs", [
            _c(
              "marker",
              {
                attrs: {
                  id: "marker-arrow",
                  markerWidth: "12",
                  markerHeight: "8",
                  refX: "12",
                  refY: "4",
                  orient: "auto",
                  markerUnits: "strokeWidth",
                  stroke: "inherit",
                  fill: "inherit",
                },
              },
              [_c("path", { attrs: { d: "M0,0 L0,8 L12,4 z" } })]
            ),
          ]),
          _vm._v(" "),
          _c("path", {
            attrs: {
              d: _vm.border,
              stroke: "grey",
              "stroke-width": "1",
              fill: "none",
            },
          }),
          _vm._v(" "),
          _vm._l(_vm.state.nodes, function (spr, idx) {
            return _c("wylib-svgnode", {
              key: idx,
              ref: "node",
              refInFor: true,
              attrs: { state: spr },
              on: { drag: _vm.moveHandler },
            })
          }),
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { ref: "tools", staticClass: "tools", style: _vm.toolStyle }, [
        _c("div", { staticClass: "menu" }, [
          _c("svg", {
            staticClass: "icon",
            staticStyle: { stroke: "black", fill: "black" },
            domProps: { innerHTML: _vm._s(_vm.iconSvg("menu")) },
          }),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "toolbox" }, [
          _c(
            "button",
            {
              staticClass: "nodrag",
              attrs: {
                title:
                  "Attempt to distribute objects on the chart (hold to repeat)",
              },
              on: {
                mousedown: _vm.buttonDown,
                mouseup: _vm.buttonUp,
                mouseleave: _vm.buttonUp,
              },
            },
            [_vm._v("Arrange")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "nodrag",
              attrs: { title: "Reload chart from its source data" },
              on: {
                click: function ($event) {
                  return _vm.$emit("refresh")
                },
              },
            },
            [_vm._v("Refresh")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "nodrag",
              attrs: { title: "Reload chart and reinitialize arrangement" },
              on: {
                click: function ($event) {
                  return _vm.$emit("reset")
                },
              },
            },
            [_vm._v("Reset")]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "sliders" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.state.pushForce,
                  expression: "state.pushForce",
                },
              ],
              staticClass: "slider nodrag",
              attrs: {
                type: "range",
                min: "0",
                max: "100",
                title: "How hard the nodes repel each other (r^3)",
              },
              domProps: { value: _vm.state.pushForce },
              on: {
                __r: function ($event) {
                  return _vm.$set(_vm.state, "pushForce", $event.target.value)
                },
              },
            }),
            _vm._v("Repel: " + _vm._s(_vm.state.pushForce)),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.state.pullForce,
                  expression: "state.pullForce",
                },
              ],
              staticClass: "slider nodrag",
              attrs: {
                type: "range",
                min: "0",
                max: "100",
                title: "How hard the links attract connected nodes (r^3)",
              },
              domProps: { value: _vm.state.pullForce },
              on: {
                __r: function ($event) {
                  return _vm.$set(_vm.state, "pullForce", $event.target.value)
                },
              },
            }),
            _vm._v("Attract: " + _vm._s(_vm.state.pullForce)),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.state.gravForce,
                  expression: "state.gravForce",
                },
              ],
              staticClass: "slider nodrag",
              attrs: {
                type: "range",
                min: "0",
                max: "100",
                title: "General linear attractive force",
              },
              domProps: { value: _vm.state.gravForce },
              on: {
                __r: function ($event) {
                  return _vm.$set(_vm.state, "gravForce", $event.target.value)
                },
              },
            }),
            _vm._v("Gravity: " + _vm._s(_vm.state.gravForce)),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.state.randForce,
                  expression: "state.randForce",
                },
              ],
              staticClass: "slider nodrag",
              attrs: {
                type: "range",
                min: "0",
                max: "100",
                title: "How much random force to introduce",
              },
              domProps: { value: _vm.state.randForce },
              on: {
                __r: function ($event) {
                  return _vm.$set(_vm.state, "randForce", $event.target.value)
                },
              },
            }),
            _vm._v("Random: " + _vm._s(_vm.state.randForce)),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.state.autoBump,
                  expression: "state.autoBump",
                },
              ],
              staticClass: "checkbox nodrag",
              attrs: {
                type: "checkbox",
                title: "Try to arrange nodes each time a change is registered",
              },
              domProps: {
                checked: Array.isArray(_vm.state.autoBump)
                  ? _vm._i(_vm.state.autoBump, null) > -1
                  : _vm.state.autoBump,
              },
              on: {
                change: function ($event) {
                  var $$a = _vm.state.autoBump,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(_vm.state, "autoBump", $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.state,
                          "autoBump",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.state, "autoBump", $$c)
                  }
                },
              },
            }),
            _vm._v("Auto Arrange:"),
          ]),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=template&id=42a0f4da&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=template&id=42a0f4da& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.state.posted,
          expression: "state.posted",
        },
      ],
      staticClass: "wylib wylib-win",
      class: { toplevel: _vm.topLevel },
      style: [_vm.winStyleS, _vm.winStyleF],
      attrs: { id: "win" + _vm._uid },
    },
    [
      _c(
        "div",
        {
          staticClass: "header",
          style: _vm.headerStyle,
          attrs: { title: _vm.lang.help },
          on: {
            click: function ($event) {
              $event.stopPropagation()
              return _vm.headerClick.apply(null, arguments)
            },
          },
        },
        [
          _c(
            "div",
            { staticClass: "headerbar" },
            [
              _vm.topLevel
                ? _c("wylib-button", {
                    attrs: {
                      icon: "menu",
                      env: _vm.env,
                      toggled: _vm.winMenu.posted,
                      title: _vm.wm.h.winMenu,
                    },
                    on: {
                      click: function ($event) {
                        _vm.winMenu.posted = !_vm.winMenu.posted
                      },
                    },
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.topLevel && _vm.pinnable
                ? _c("wylib-button", {
                    attrs: {
                      env: _vm.env,
                      icon: "pushpin",
                      size: _vm.buttonSize,
                      toggled: _vm.state.pinned,
                      title: _vm.wm.h.winPinned,
                    },
                    on: {
                      click: function ($event) {
                        _vm.state.pinned = !_vm.state.pinned
                      },
                    },
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("div", { ref: "childMenu", staticClass: "childmenu" }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "handle",
              on: {
                dblclick: _vm.minimize,
                click: function () {
                  if (_vm.top) {
                    _vm.top.layer(1)
                  }
                },
              },
            },
            [
              _c(
                "div",
                {
                  staticClass: "label",
                  style: {
                    "font-size":
                      _vm.headerHeight < 16
                        ? _vm.headerHeight - 2 + "px"
                        : "1em",
                  },
                },
                [_vm._v("\n        " + _vm._s(_vm.lang.title) + "\n      ")]
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "headerbar operations" },
            [
              _c("div", { ref: "childStatus", staticClass: "childstatus" }),
              _vm._v(" "),
              _vm.topLevel || _vm.state.pinned
                ? _c("wylib-button", {
                    staticClass: "closebutton",
                    attrs: {
                      icon: "close",
                      env: _vm.env,
                      size: _vm.buttonSize,
                      color: _vm.pr.butCloseColor,
                      hoverColor: _vm.pr.butCloseHoverColor,
                      title: _vm.wm.h.winClose,
                    },
                    on: { click: _vm.close },
                  })
                : _vm._e(),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "subwindows" },
        [
          _vm.topLevel
            ? _c(
                "wylib-win",
                {
                  attrs: { state: _vm.winMenu, env: _vm.env, pinnable: "true" },
                  on: {
                    close: function ($event) {
                      _vm.winMenu.posted = false
                    },
                  },
                },
                [
                  _vm.winMenu.posted
                    ? _c("wylib-menu", {
                        attrs: {
                          state: _vm.winMenu.client,
                          env: _vm.env,
                          config: _vm.winMenuConfig(),
                          lang: _vm.wm.winMenu,
                        },
                        on: {
                          done: function ($event) {
                            _vm.winMenu.posted = _vm.winMenu.pinned
                          },
                        },
                      })
                    : _vm._e(),
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.state.dialogs, function (dia, key) {
            return _c(
              "wylib-win",
              {
                key: key,
                attrs: { topLevel: "true", state: dia, env: _vm.env },
                on: {
                  close: function (r) {
                    _vm.closeDia(key, r)
                  },
                },
              },
              [
                _c("wylib-dialog", {
                  attrs: { state: dia.client, env: _vm.env },
                  on: {
                    submit: function () {
                      var a = [],
                        len = arguments.length
                      while (len--) a[len] = arguments[len]
                      _vm.dialogSubmit.apply(void 0, [key].concat(a))
                    },
                  },
                }),
              ],
              1
            )
          }),
          _vm._v(" "),
          _vm._l(_vm.state.reports, function (rep, key) {
            return _c(
              "wylib-win",
              {
                key: key,
                attrs: { topLevel: "true", state: rep, env: _vm.env },
                on: {
                  close: function (r) {
                    _vm.closeRep(key, r)
                  },
                  report: function (v, a, i, b) {
                    _vm.top.actionLaunch(v, a, i, b)
                  },
                },
              },
              [
                _c("wylib-report", {
                  attrs: {
                    bus: _vm.repBus,
                    render: rep.posted,
                    ready: rep.ready,
                    state: rep.client,
                    env: _vm.env,
                  },
                }),
              ],
              1
            )
          }),
          _vm._v(" "),
          _vm.topLevel && _vm.modal.posted
            ? _c("wylib-modal", {
                attrs: { state: _vm.modal, env: _vm.env },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function (ws) {
                        return [
                          _c("wylib-dialog", {
                            attrs: { state: ws.state, env: _vm.env },
                          }),
                        ]
                      },
                    },
                  ],
                  null,
                  false,
                  523268791
                ),
              })
            : _vm._e(),
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.state.minim,
              expression: "!state.minim",
            },
          ],
          ref: "content",
          staticClass: "content wylib-win-nodrag",
          style: { height: "calc(100% - " + (_vm.headerHeight + 4) + "px)" },
        },
        [_vm._t("default")],
        2
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=scss&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7eecfde0", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=scss&");
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("765dc18e", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/*!**************************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/addStylesClient.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/* harmony import */ var _listToStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listToStyles */ "./node_modules/vue-style-loader/lib/listToStyles.js");
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(_listToStyles__WEBPACK_IMPORTED_MODULE_0__["default"])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/*!***********************************************************!*\
  !*** ./node_modules/vue-style-loader/lib/listToStyles.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return listToStyles; });
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app.vue":
/*!*********************!*\
  !*** ./src/app.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_vue_vue_type_template_id_5ef48958___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=5ef48958& */ "./src/app.vue?vue&type=template&id=5ef48958&");
/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ "./src/app.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.vue?vue&type=style&index=0&lang=less& */ "./src/app.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _app_vue_vue_type_template_id_5ef48958___WEBPACK_IMPORTED_MODULE_0__["render"],
  _app_vue_vue_type_template_id_5ef48958___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/app.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/app.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/app.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/app.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/app.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/app.vue?vue&type=template&id=5ef48958&":
/*!****************************************************!*\
  !*** ./src/app.vue?vue&type=template&id=5ef48958& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_5ef48958___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=template&id=5ef48958& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=template&id=5ef48958&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_5ef48958___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_5ef48958___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/bus.js":
/*!********************!*\
  !*** ./src/bus.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Message bus
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//- Why is 'vm' an argument to messageBus?
//- 

module.exports = {
  messageBus: function messageBus(vm, masterCB) {
    //Bus for messages to be distributed to registered clients
    this.master = vm;
    this.masterCB = masterCB;
    this.clients = {};

    this.register = function (id, cb) {
      //Clients register to receive callbacks
      //console.log("Bus register:", id, cb)
      if (cb) this.clients[id] = cb;else if (id in this.clients && !cb) delete this.clients[id];
    }, this.mom = function (message) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      //Send a message to the bus master
      if (this.masterCB) return this.masterCB.apply(this, [message].concat(args));
    }, this.notify = function (message) {
      var _this = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      //Every registered client will get every message
      var replies = [];
      //console.log("Bus notify:", this.clients)
      Object.keys(this.clients).forEach(function (key) {
        var _clients;

        //console.log("Bus:", this.master, "notifying:", key)
        replies.push((_clients = _this.clients)[key].apply(_clients, [message].concat(args)));
      });
      //console.log("Bus ans:", this.master, replies)
      return replies;
    };
  },
  eventBus: function eventBus(vm) {
    //Like messageBus, but clients can listen for specific events
    this.master = vm;
    this.events = {};
    this.register = function (id, event, cb) {
      //I:ID am listening for events:event
      if (!(event in this.events)) this.events[event] = {};
      //console.log("Register id:", id, "event:", event)
      if (cb) {
        //Registering or re-registering
        this.events[event][id] = cb;
      } else if (id in this.events[event]) {
        //De-registering
        delete this.events[events][id];
      }
    };
    this.notify = function (event) {
      var _this2 = this;

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      //Invoke all listener callbacks for: event
      var replies = [];
      //console.log("Notify event:", event, this.events[event])
      if (this.events[event]) Object.keys(this.events[event]).forEach(function (id) {
        var _events$event;

        replies.push((_events$event = _this2.events[event])[id].apply(_events$event, args));
      });
      return replies;
    };
  }
};

/***/ }),

/***/ "./src/button.vue":
/*!************************!*\
  !*** ./src/button.vue ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button_vue_vue_type_template_id_22b0d96a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.vue?vue&type=template&id=22b0d96a& */ "./src/button.vue?vue&type=template&id=22b0d96a&");
/* harmony import */ var _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button.vue?vue&type=script&lang=js& */ "./src/button.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button.vue?vue&type=style&index=0&lang=less& */ "./src/button.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _button_vue_vue_type_template_id_22b0d96a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _button_vue_vue_type_template_id_22b0d96a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/button.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/button.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/button.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/button.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************!*\
  !*** ./src/button.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/button.vue?vue&type=template&id=22b0d96a&":
/*!*******************************************************!*\
  !*** ./src/button.vue?vue&type=template&id=22b0d96a& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_template_id_22b0d96a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=template&id=22b0d96a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=template&id=22b0d96a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_template_id_22b0d96a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_template_id_22b0d96a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Common support functions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//X- Add a trim option to stateCheck to remove obsolete properties?
//- 
var Crypto = window.crypto;
var Subtle = Crypto.subtle;
module.exports = {
  langTpt: function langTpt() {
    return { title: null, help: null };
  },
  envTpt: function envTpt() {
    return { wm: { t: {}, h: {} }, pr: __webpack_require__(/*! ./prefs.js */ "./src/prefs.js") };
  },
  stateCheck: function stateCheck(context) {
    var st = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : context.state;

    var _this = this;

    var prune = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : context.stateTpt;
    //Initialize any needed properties in a component's state
    //console.log("stateCheck:", context, props, st)
    if (st && props) {
      Object.keys(props).forEach(function (key) {
        //Make sure all required properties are present
        if (!(key in st) || st[key] == undefined && props[key] != undefined) {
          context.$set(st, key, _this.clone(props[key]));
          //console.log("    init key:", key, st.key, props[key])
        }
      });
      if (prune) Object.keys(st).forEach(function (key) {
        //Trim out unofficial properties
        if (!(key in props)) {
          //console.log("    pruning key:", key)
          delete st[key];
        }
      });
    }
  },


  clone: function clone(o) {
    //Deep object copy
    var output = {};
    if (o == null || o == undefined || (typeof o === 'undefined' ? 'undefined' : _typeof(o)) != 'object') return o;
    if (Array.isArray(o)) output = [];
    for (var key in o) {
      var v = o[key];
      //console.log('clone:', key, o[key], v, typeof v)
      output[key] = v != null && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === "object" ? this.clone(v) : v;
    }
    return output;
  },

  deepCloneWithStyles: function deepCloneWithStyles(node) {
    //For printable popup (big and slow)
    var style = node.style ? window.getComputedStyle(node) : null,
        clone = node.cloneNode(false);
    //console.log("clone:", node, style)
    if (clone.style && style && style.cssText) clone.style.cssText = style.cssText;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = node.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        clone.appendChild(this.deepCloneWithStyles(child));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return clone;
  },

  addWindow: function addWindow(winObj, template, ctx, placement, clone) {
    //Create a new subwindow in an array of config objects
    //console.log("Add Window", template, placement)
    template.x = null;template.y = null;
    var newState = clone ? this.clone(template) : template;
    if (clone) newState.template = this.clone(template); //Remember how to reset myself
    if (placement) {
      newState.x = placement.x || (Math.random() - 0.5) * 50 + 150;
      newState.y = placement.y || (Math.random() - 0.5) * 100 + 250;
    }
    for (var newIndex = 0; newIndex in winObj; newIndex++) {} // console.log('test', newIndex);
    ctx.$set(winObj, newIndex, newState);
    //console.log(" at:", newIndex)
    return newIndex;
  },
  closeWindow: function closeWindow(winObj, idx, ctx, reopen) {
    var _winObj$idx = winObj[idx],
        x = _winObj$idx.x,
        y = _winObj$idx.y,
        template = _winObj$idx.template;
    //console.log("Close Window", idx, reopen)

    if (reopen && template) this.addWindow(winObj, template, ctx, { x: x, y: y }); //Force to open in a new slot
    ctx.$delete(winObj, idx);
    //console.log(" after:", winObj)
  },
  fileReader: function fileReader(target, timeout, cb) {
    var _loop = function _loop(i, f) {
      var reader = new FileReader();
      reader.onload = function () {
        var fileData = JSON.parse(reader.result);
        //console.log("fileData:", fileData)
        cb(fileData);
      };
      reader.readAsText(f);
    };

    //Read a JSON file
    for (var i = 0, f; f = target.files[i]; i++) {
      _loop(i, f);
    }
    if (timeout) setTimeout(function () {
      target.value = null;
    }, timeout);
  },
  ajax: function ajax(url, cb) {
    //Read JSON data from a URL
    var data = void 0,
        xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      //console.log('ajax back:' + xmlhttp.status, xmlhttp.readyState, xmlhttp.responseText)
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //console.log('responseText:' + xmlhttp.responseText)
        try {
          data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          //console.log(err.message + " in " + xmlhttp.responseText)
          return;
        }
        cb(data);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },
  buf2b64url: function buf2b64url(buf) {
    //Convert ArrayBuffer to base64 url-safe
    return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },


  deriveKey: function deriveKey(password, salt) {
    salt = salt || Crypto.getRandomValues(new Uint8Array(8));
    return Subtle.importKey("raw", Buffer.from(password), "PBKDF2", false, ["deriveKey"]).then(function (key) {
      return Crypto.subtle.deriveKey({
        name: "PBKDF2",
        salt: salt,
        iterations: 10000,
        hash: "SHA-256"
      }, key, {
        name: "AES-GCM",
        length: 256
      }, false, ["encrypt", "decrypt"]);
    }).then(function (key) {
      return [key, salt];
    });
  },

  encrypt: function encrypt(password, plain) {
    //Encrypt a string to a JSON-encoded string
    var iv = Crypto.getRandomValues(new Uint8Array(12)),
        data = Buffer.from(plain);
    return this.deriveKey(password).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          salt = _ref2[1];

      return Subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data).then(function (ciphertext) {
        return '{"s":"' + Buffer.from(salt).toString('hex') + '","i":"' + Buffer.from(iv).toString('hex') + '","d":"' + Buffer.from(ciphertext).toString('base64') + '"}';
      });
    });
  },

  decrypt: function decrypt(password, encrypted) {
    //Decrypt a JSON-encoded string to a string
    var _JSON$parse = JSON.parse(encrypted),
        s = _JSON$parse.s,
        i = _JSON$parse.i,
        d = _JSON$parse.d,
        salt = Buffer.from(s, 'hex'),
        iv = Buffer.from(i, 'hex'),
        data = Buffer.from(d, 'base64');

    return this.deriveKey(password, salt).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          key = _ref4[0];

      return Subtle.decrypt({ name: "AES-GCM", iv: iv }, key, data);
    }).then(function (v) {
      return Buffer.from(new Uint8Array(v)).toString();
    });
  },

  unabbrev: function unabbrev(short, longs) {
    //Turn an abbreviated string into one of a set of full strings
    var regex = new RegExp('^' + short),
        match = longs.find(function (el) {
      return el.match(regex);
    });
    //console.log("Unabbrev:", short, longs, match)
    return match || short;
  },
  urlParms: function urlParms() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.search;
    //Return URL search parameters as an object
    var obj = void 0; //Returns null if nothing found
    url.substr(1).split("&").forEach(function (parm) {
      var _parm$split = parm.split('='),
          _parm$split2 = _slicedToArray(_parm$split, 2),
          p = _parm$split2[0],
          v = _parm$split2[1];

      if (p) {
        //Is this a real key (not leading gap before ?
        if (!obj) obj = {}; //Initialize object
        obj[p] = decodeURIComponent(v);
      }
    });
    return obj;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./src/connect.vue":
/*!*************************!*\
  !*** ./src/connect.vue ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _connect_vue_vue_type_template_id_8ee957be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connect.vue?vue&type=template&id=8ee957be& */ "./src/connect.vue?vue&type=template&id=8ee957be&");
/* harmony import */ var _connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./connect.vue?vue&type=script&lang=js& */ "./src/connect.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./connect.vue?vue&type=style&index=0&lang=less& */ "./src/connect.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _connect_vue_vue_type_template_id_8ee957be___WEBPACK_IMPORTED_MODULE_0__["render"],
  _connect_vue_vue_type_template_id_8ee957be___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/connect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/connect.vue?vue&type=script&lang=js&":
/*!**************************************************!*\
  !*** ./src/connect.vue?vue&type=script&lang=js& ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/connect.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/connect.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/connect.vue?vue&type=template&id=8ee957be&":
/*!********************************************************!*\
  !*** ./src/connect.vue?vue&type=template&id=8ee957be& ***!
  \********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_template_id_8ee957be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=template&id=8ee957be& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=template&id=8ee957be&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_template_id_8ee957be___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_template_id_8ee957be___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/crossref.js":
/*!*************************!*\
  !*** ./src/crossref.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
//Class for supporting a custom cross-reference HTML tag
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//- TODO:
//- 
var Attrs = ['name', 'value'];
module.exports = function (_CustomElement2) {
  _inherits(_class, _CustomElement2);

  _createClass(_class, null, [{
    key: 'observedAttributes',
    get: function get() {
      return Attrs;
    }
  }]);

  function _class() {
    _classCallCheck(this, _class);

    //console.log('xConst n:', this.name, 'v:', this.value)
    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

    Attrs.forEach(function (att) {
      //Establish attribute setters/getters
      Object.defineProperty(_this, att, {
        get: function get() {
          return this.getAttribute(att);
        },
        set: function set(val) {
          if (val) this.setAttribute(att, val);else this.removeAttribute(att);
        }
      });
    });
    var shadowRoot = _this.attachShadow({ mode: 'open' }),
        shadowSpan = document.createElement('span'); //Our actual display element
    shadowRoot.appendChild(shadowSpan);
    _this.update();
    return _this;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update() {
      var dispEl = this.shadowRoot.firstChild;
      if (this.value) dispEl.innerText = this.value;else dispEl.innerHTML = this.innerHTML;
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var ev = new CustomEvent('connect', { bubbles: true, detail: { name: this.name, value: this.value } });
      //console.log('xConn n:', this.name, 'v:', this.value)
      this.update();
      this.dispatchEvent(ev);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      //console.log('xDisc n:', this.name, 'v:', this.value)
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      var ev = new CustomEvent('change', { detail: { attrName: attrName, newValue: newValue, oldValue: oldValue } });
      //console.log('xChange', attrName, oldValue, newValue)
      this.update();
      this.dispatchEvent(ev);
    }
  }]);

  return _class;
}(_CustomElement);

/***/ }),

/***/ "./src/date.js":
/*!*********************!*\
  !*** ./src/date.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _flatpickr = __webpack_require__(/*! flatpickr */ "flatpickr");

var _flatpickr2 = _interopRequireDefault(_flatpickr);

__webpack_require__(/*! ../node_modules/flatpickr/dist/themes/light.css */ "./node_modules/flatpickr/dist/themes/light.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Date selectors for input components
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 

module.exports = function () {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.date';
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'today';
  var container = arguments[2];

  this.picker = (0, _flatpickr2.default)(selector, {
    allowInput: true,
    //    defaultDate: defaultValue,
    //    appendTo: container || window.body,
    onClose: this.closeHandler
  });

  this.closeHandler = function () {
    var dstrg = this.element.value,
        now = new Date();
    if (/\s*^[0-9]{1,2}\s*$/.test(dstrg)) {
      //Adapt to some incomplete date formats
      dstrg = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + dstrg;
    } else if (/^\s*[0-9]{1,2}[/-][0-9]{1,2}\s*$/.test(dstrg)) {
      dstrg = now.getFullYear() + '-' + dstrg;
    } else if (/^\s*[A-Za-z]\s*[,]*\s*[0-9]{1,2}\s*$/.test(dstrg)) {
      dstrg = dstrg + now.getFullYear();
    }
    //console.log("Now:", now, "dstrg:", dstrg)
    var date = new Date(dstrg);
    //console.log("Check date:", this.element.value, date)
    if (date == 'Invalid Date') this.element.value = '';else this.element.value = this.formatDate(date, 'Y-m-d');
  };

  this.destroy = function () {
    this.picker.destroy();
  };

  return this.picker;
};

/***/ }),

/***/ "./src/dbe.vue":
/*!*********************!*\
  !*** ./src/dbe.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dbe_vue_vue_type_template_id_35af4044___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbe.vue?vue&type=template&id=35af4044& */ "./src/dbe.vue?vue&type=template&id=35af4044&");
/* harmony import */ var _dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dbe.vue?vue&type=script&lang=js& */ "./src/dbe.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dbe.vue?vue&type=style&index=0&lang=less& */ "./src/dbe.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dbe_vue_vue_type_template_id_35af4044___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dbe_vue_vue_type_template_id_35af4044___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/dbe.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/dbe.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/dbe.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dbe.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dbe.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/dbe.vue?vue&type=template&id=35af4044&":
/*!****************************************************!*\
  !*** ./src/dbe.vue?vue&type=template&id=35af4044& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_template_id_35af4044___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=template&id=35af4044& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=template&id=35af4044&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_template_id_35af4044___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_template_id_35af4044___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/dbp.vue":
/*!*********************!*\
  !*** ./src/dbp.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dbp_vue_vue_type_template_id_34793b2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbp.vue?vue&type=template&id=34793b2e& */ "./src/dbp.vue?vue&type=template&id=34793b2e&");
/* harmony import */ var _dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dbp.vue?vue&type=script&lang=js& */ "./src/dbp.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dbp.vue?vue&type=style&index=0&lang=less& */ "./src/dbp.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dbp_vue_vue_type_template_id_34793b2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dbp_vue_vue_type_template_id_34793b2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/dbp.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/dbp.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/dbp.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dbp.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dbp.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/dbp.vue?vue&type=template&id=34793b2e&":
/*!****************************************************!*\
  !*** ./src/dbp.vue?vue&type=template&id=34793b2e& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_template_id_34793b2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=template&id=34793b2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=template&id=34793b2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_template_id_34793b2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_template_id_34793b2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/dbs.vue":
/*!*********************!*\
  !*** ./src/dbs.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dbs_vue_vue_type_template_id_3424ae28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbs.vue?vue&type=template&id=3424ae28& */ "./src/dbs.vue?vue&type=template&id=3424ae28&");
/* harmony import */ var _dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dbs.vue?vue&type=script&lang=js& */ "./src/dbs.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dbs.vue?vue&type=style&index=0&lang=less& */ "./src/dbs.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dbs_vue_vue_type_template_id_3424ae28___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dbs_vue_vue_type_template_id_3424ae28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/dbs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/dbs.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/dbs.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dbs.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dbs.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/dbs.vue?vue&type=template&id=3424ae28&":
/*!****************************************************!*\
  !*** ./src/dbs.vue?vue&type=template&id=3424ae28& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_template_id_3424ae28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=template&id=3424ae28& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=template&id=3424ae28&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_template_id_3424ae28___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_template_id_3424ae28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/dew.vue":
/*!*********************!*\
  !*** ./src/dew.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dew.vue?vue&type=script&lang=js& */ "./src/dew.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dew.vue?vue&type=style&index=0&lang=less& */ "./src/dew.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/dew.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/dew.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/dew.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dew.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dew.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/dialog.vue":
/*!************************!*\
  !*** ./src/dialog.vue ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dialog_vue_vue_type_template_id_f28b233e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog.vue?vue&type=template&id=f28b233e& */ "./src/dialog.vue?vue&type=template&id=f28b233e&");
/* harmony import */ var _dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialog.vue?vue&type=script&lang=js& */ "./src/dialog.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _dialog_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog.vue?vue&type=style&index=0&lang=less& */ "./src/dialog.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dialog_vue_vue_type_template_id_f28b233e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dialog_vue_vue_type_template_id_f28b233e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/dialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/dialog.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/dialog.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./dialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dialog.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************!*\
  !*** ./src/dialog.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dialog.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/dialog.vue?vue&type=template&id=f28b233e&":
/*!*******************************************************!*\
  !*** ./src/dialog.vue?vue&type=template&id=f28b233e& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_template_id_f28b233e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./dialog.vue?vue&type=template&id=f28b233e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dialog.vue?vue&type=template&id=f28b233e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_template_id_f28b233e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dialog_vue_vue_type_template_id_f28b233e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Icons;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Toplevel window
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Serve up SVG fragments to include as button icons
// See: https://icomoon.io/app/#/select
//TODO:
//- 

var Icons = (_Icons = {
  close: '\n    <path d="M 4 4 L 28 28 M 4 28 L 28 4" stroke-width="4" stroke-linecap="round"/>\n  ',
  menu: '\n    <path d="M 2 4 L 30 4 M 2 16 L 30 16 M 2 28 L 30 28" stroke-width="4" stroke-linecap="round"/>\n  ',
  plus: '\n    <path d="M 16 4 L 16 28 M 4 16 L 28 16" stroke-width="4" stroke-linecap="round"/>\n  ',
  minus: '\n    <path d="M 4 16 L 28 16" stroke-width="4" stroke-linecap="round"/>\n  ',
  menu2: '\n    <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path>\n  ',
  pencil2: '\n    <path d="M12 20l4-2 14-14-2-2-14 14-2 4zM9.041 27.097c-0.989-2.085-2.052-3.149-4.137-4.137l3.097-8.525 4-2.435 12-12h-6l-12 12-6 20 20-6 12-12v-6l-12 12-2.435 4z"></path>\n  ',
  cross: '\n    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>\n  ',
  pushpin: '\n    <path d="M17 0l-3 3 3 3-7 8h-7l5.5 5.5-8.5 11.269v1.231h1.231l11.269-8.5 5.5 5.5v-7l8-7 3 3 3-3-15-15zM14 17l-2-2 7-7 2 2-7 7z"></path>\n  ',
  pencil: '\n    <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>\n  ',
  qrcode: '\n    <path d="M10 2h-8v8h8v-8zM12 0v0 12h-12v-12h12zM4 4h4v4h-4zM30 2h-8v8h8v-8zM32 0v0 12h-12v-12h12zM24 4h4v4h-4zM10 22h-8v8h8v-8zM12 20v0 12h-12v-12h12zM4 24h4v4h-4zM14 0h2v2h-2zM16 2h2v2h-2zM14 4h2v2h-2zM16 6h2v2h-2zM14 8h2v2h-2zM16 10h2v2h-2zM14 12h2v2h-2zM14 16h2v2h-2zM16 18h2v2h-2zM14 20h2v2h-2zM16 22h2v2h-2zM14 24h2v2h-2zM16 26h2v2h-2zM14 28h2v2h-2zM16 30h2v2h-2zM30 16h2v2h-2zM2 16h2v2h-2zM4 14h2v2h-2zM0 14h2v2h-2zM8 14h2v2h-2zM10 16h2v2h-2zM12 14h2v2h-2zM18 16h2v2h-2zM20 14h2v2h-2zM22 16h2v2h-2zM24 14h2v2h-2zM26 16h2v2h-2zM28 14h2v2h-2zM30 20h2v2h-2zM18 20h2v2h-2zM20 18h2v2h-2zM22 20h2v2h-2zM26 20h2v2h-2zM28 18h2v2h-2zM30 24h2v2h-2zM18 24h2v2h-2zM20 22h2v2h-2zM24 22h2v2h-2zM26 24h2v2h-2zM28 22h2v2h-2zM30 28h2v2h-2zM20 26h2v2h-2zM22 28h2v2h-2zM24 26h2v2h-2zM26 28h2v2h-2zM20 30h2v2h-2zM24 30h2v2h-2zM28 30h2v2h-2z"></path>\n  ',
  clock: '\n    <path d="M20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414zM16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path>\n  ',
  hourglass: '\n    <path d="M22.781 16c4.305-2.729 7.219-7.975 7.219-14 0-0.677-0.037-1.345-0.109-2h-27.783c-0.072 0.655-0.109 1.323-0.109 2 0 6.025 2.914 11.271 7.219 14-4.305 2.729-7.219 7.975-7.219 14 0 0.677 0.037 1.345 0.109 2h27.783c0.072-0.655 0.109-1.323 0.109-2 0-6.025-2.914-11.271-7.219-14zM5 30c0-5.841 2.505-10.794 7-12.428v-3.143c-4.495-1.634-7-6.587-7-12.428v0h22c0 5.841-2.505 10.794-7 12.428v3.143c4.495 1.634 7 6.587 7 12.428h-22zM19.363 20.925c-2.239-1.27-2.363-2.918-2.363-3.918v-2.007c0-1 0.119-2.654 2.367-3.927 1.203-0.699 2.244-1.761 3.033-3.073h-12.799c0.79 1.313 1.832 2.376 3.036 3.075 2.239 1.27 2.363 2.918 2.363 3.918v2.007c0 1-0.119 2.654-2.367 3.927-2.269 1.318-3.961 3.928-4.472 7.073h15.677c-0.511-3.147-2.204-5.758-4.475-7.075z"></path>\n  ',
  warning: '\n    <path d="M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"></path>\n    <path d="M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>\n    <path d="M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"></path>\n  ',
  plus1: '\n    <path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path>\n  ',
  minus1: '\n    <path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"></path>\n  ',
  checkmark: '\n    <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>\n  ',
  play3: '\n    <path d="M6 4l20 12-20 12z"></path>\n  ',
  filter: '\n    <path d="M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z"></path>\n  ',
  spinner: '\n    <path d="M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z"></path>\n  ',
  wand: '\n    <path d="M8 6l-4-4h-2v2l4 4zM10 0h2v4h-2zM18 10h4v2h-4zM20 4v-2h-2l-4 4 2 2zM0 10h4v2h-4zM10 18h2v4h-2zM2 18v2h2l4-4-2-2zM31.563 27.563l-19.879-19.879c-0.583-0.583-1.538-0.583-2.121 0l-1.879 1.879c-0.583 0.583-0.583 1.538 0 2.121l19.879 19.879c0.583 0.583 1.538 0.583 2.121 0l1.879-1.879c0.583-0.583 0.583-1.538 0-2.121zM15 17l-6-6 2-2 6 6-2 2z"></path>\n  ',
  bin: '\n    <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>\n    <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>\n  ',
  upload2: '\n    <path d="M0 28h32v2h-32zM32 24v2h-32v-2l4-8h8v4h8v-4h8zM7 10l9-9 9 9h-7v8h-4v-8z"></path>\n  ',
  loop2: '\n    <path d="M27.802 5.197c-2.925-3.194-7.13-5.197-11.803-5.197-8.837 0-16 7.163-16 16h3c0-7.18 5.82-13 13-13 3.844 0 7.298 1.669 9.678 4.322l-4.678 4.678h11v-11l-4.198 4.197z"></path>\n    <path d="M29 16c0 7.18-5.82 13-13 13-3.844 0-7.298-1.669-9.678-4.322l4.678-4.678h-11v11l4.197-4.197c2.925 3.194 7.13 5.197 11.803 5.197 8.837 0 16-7.163 16-16h-3z"></path>\n  ',
  circle: '\n    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path>\n  ',
  arrowup: '\n    <path d="M16 1l-15 15h9v16h12v-16h9z"></path>\n  ',
  arrowdown: '\n    <path d="M16 31l15-15h-9v-16h-12v16h-9z"></path>\n  ',
  arrowright: '\n    <path d="M31 16l-15-15v9h-16v12h16v9z"></path>\n  ',
  arrowleft: '\n    <path d="M1 16l15 15v-9h16v-12h-16v-9z"></path>\n  ',
  arrowdr: '\n    <path d="M32 9l-8 8-17-17-7 7 17 17-8 8h23v-23z"></path>\n  ',
  arrowdl: '\n    <path d="M23 32l-8-8 17-17-7-7-17 17-8-8v23h23z"></path>\n  ',
  eye: '\n    <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>\n  ',
  eyeblock: '\n    <path d="M29.561 0.439c-0.586-0.586-1.535-0.586-2.121 0l-6.318 6.318c-1.623-0.492-3.342-0.757-5.122-0.757-6.979 0-13.028 4.064-16 10 1.285 2.566 3.145 4.782 5.407 6.472l-4.968 4.968c-0.586 0.586-0.586 1.535 0 2.121 0.293 0.293 0.677 0.439 1.061 0.439s0.768-0.146 1.061-0.439l27-27c0.586-0.586 0.586-1.536 0-2.121zM13 10c1.32 0 2.44 0.853 2.841 2.037l-3.804 3.804c-1.184-0.401-2.037-1.521-2.037-2.841 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.715 0.54 3.304 1.459 4.607l-1.904 1.904c-1.639-1.151-3.038-2.621-4.114-4.323z"></path>\n    <path d="M24 13.813c0-0.849-0.133-1.667-0.378-2.434l-10.056 10.056c0.768 0.245 1.586 0.378 2.435 0.378 4.418 0 8-3.582 8-8z"></path>\n    <path d="M25.938 9.062l-2.168 2.168c0.040 0.025 0.079 0.049 0.118 0.074 1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-1.208 0-2.403-0.149-3.561-0.439l-2.403 2.403c1.866 0.671 3.873 1.036 5.964 1.036 6.978 0 13.027-4.064 16-10-1.407-2.81-3.504-5.2-6.062-6.938z"></path>\n  ',
  foot: '\n    <g stroke-width="1" transform="rotate(-41.51396942138672 17.832151412963867,16.253065109252933)">\n      <path stroke-width="2.5" d="m15.691606,32.192988c6.600128,1.315072 8.84258,-10.319479 9.303856,-13.989592c0.461276,-3.670113 2.933067,-11.230846 -8.427532,-11.1911c-11.360599,0.039746 -1.402894,8.072277 -1.294311,12.401845c0.108583,4.329568 -6.182141,11.463775 0.417987,12.778847z"/>\n      <ellipse ry="2.914028" rx="2.113471" cy="2.446331" cx="11.718695"/>\n      <ellipse ry="1.761226" rx="1.152802" cy="1.805885" cx="16.073726"/>\n      <ellipse ry="1.761226" rx="1.152802" cy="2.446331" cx="19.275955"/>\n      <ellipse ry="1.761226" rx="1.152802" cy="3.791267" cx="22.414139"/>\n      <ellipse ry="1.505048" rx="1.152802" cy="5.77665" cx="25.424235"/>\n    </g>\n  ',
  target: '\n    <path d="M32 14h-3.154c-0.864-5.57-5.276-9.982-10.846-10.846v-3.154h-4v3.154c-5.57 0.864-9.982 5.276-10.846 10.846h-3.154v4h3.154c0.864 5.57 5.276 9.982 10.846 10.846v3.154h4v-3.154c5.57-0.864 9.982-5.276 10.846-10.846h3.154v-4zM24.776 14h-3.118c-0.603-1.705-1.953-3.056-3.658-3.658v-3.118c3.36 0.765 6.010 3.416 6.776 6.776zM16 18c-1.105 0-2-0.895-2-2s0.895-2 2-2c1.105 0 2 0.895 2 2s-0.895 2-2 2zM14 7.224v3.118c-1.705 0.603-3.056 1.953-3.658 3.658h-3.118c0.765-3.36 3.416-6.010 6.776-6.776zM7.224 18h3.118c0.603 1.705 1.953 3.056 3.658 3.658v3.118c-3.36-0.765-6.010-3.416-6.776-6.776zM18 24.776v-3.118c1.705-0.603 3.056-1.953 3.658-3.658h3.118c-0.765 3.36-3.416 6.010-6.776 6.776z"></path>\n  ',
  cirdot: '\n    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12zM10 16c0-3.314 2.686-6 6-6s6 2.686 6 6c0 3.314-2.686 6-6 6s-6-2.686-6-6z"></path>\n  ',
  home: '\n    <path d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>\n  ',
  filetext: '\n    <path d="M27 0h-24c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM26 28h-22v-24h22v24zM8 14h14v2h-14zM8 18h14v2h-14zM8 22h14v2h-14zM8 10h14v2h-14z"></path>\n  ',
  floppy: '\n    <path d="M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z"></path>\n  ',
  cog: '\n    <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>\n  ',
  cogs: '\n    <path d="M11.366 22.564l1.291-1.807-1.414-1.414-1.807 1.291c-0.335-0.187-0.694-0.337-1.071-0.444l-0.365-2.19h-2l-0.365 2.19c-0.377 0.107-0.736 0.256-1.071 0.444l-1.807-1.291-1.414 1.414 1.291 1.807c-0.187 0.335-0.337 0.694-0.443 1.071l-2.19 0.365v2l2.19 0.365c0.107 0.377 0.256 0.736 0.444 1.071l-1.291 1.807 1.414 1.414 1.807-1.291c0.335 0.187 0.694 0.337 1.071 0.444l0.365 2.19h2l0.365-2.19c0.377-0.107 0.736-0.256 1.071-0.444l1.807 1.291 1.414-1.414-1.291-1.807c0.187-0.335 0.337-0.694 0.444-1.071l2.19-0.365v-2l-2.19-0.365c-0.107-0.377-0.256-0.736-0.444-1.071zM7 27c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM32 12v-2l-2.106-0.383c-0.039-0.251-0.088-0.499-0.148-0.743l1.799-1.159-0.765-1.848-2.092 0.452c-0.132-0.216-0.273-0.426-0.422-0.629l1.219-1.761-1.414-1.414-1.761 1.219c-0.203-0.149-0.413-0.29-0.629-0.422l0.452-2.092-1.848-0.765-1.159 1.799c-0.244-0.059-0.492-0.109-0.743-0.148l-0.383-2.106h-2l-0.383 2.106c-0.251 0.039-0.499 0.088-0.743 0.148l-1.159-1.799-1.848 0.765 0.452 2.092c-0.216 0.132-0.426 0.273-0.629 0.422l-1.761-1.219-1.414 1.414 1.219 1.761c-0.149 0.203-0.29 0.413-0.422 0.629l-2.092-0.452-0.765 1.848 1.799 1.159c-0.059 0.244-0.109 0.492-0.148 0.743l-2.106 0.383v2l2.106 0.383c0.039 0.251 0.088 0.499 0.148 0.743l-1.799 1.159 0.765 1.848 2.092-0.452c0.132 0.216 0.273 0.426 0.422 0.629l-1.219 1.761 1.414 1.414 1.761-1.219c0.203 0.149 0.413 0.29 0.629 0.422l-0.452 2.092 1.848 0.765 1.159-1.799c0.244 0.059 0.492 0.109 0.743 0.148l0.383 2.106h2l0.383-2.106c0.251-0.039 0.499-0.088 0.743-0.148l1.159 1.799 1.848-0.765-0.452-2.092c0.216-0.132 0.426-0.273 0.629-0.422l1.761 1.219 1.414-1.414-1.219-1.761c0.149-0.203 0.29-0.413 0.422-0.629l2.092 0.452 0.765-1.848-1.799-1.159c0.059-0.244 0.109-0.492 0.148-0.743l2.106-0.383zM21 15.35c-2.402 0-4.35-1.948-4.35-4.35s1.948-4.35 4.35-4.35 4.35 1.948 4.35 4.35c0 2.402-1.948 4.35-4.35 4.35z"></path>\n  ',
  table: '\n    <path d="M0 6v22h32v-22h-32zM12 20v-4h8v4h-8zM20 22v4h-8v-4h8zM20 10v4h-8v-4h8zM10 10v4h-8v-4h8zM2 16h8v4h-8v-4zM22 16h8v4h-8v-4zM22 14v-4h8v4h-8zM2 22h8v4h-8v-4zM22 26v-4h8v4h-8z"></path>\n  ',
  share: '\n    <path d="M8 20c0 0 1.838-6 12-6v6l12-8-12-8v6c-8 0-12 4.99-12 10zM22 24h-18v-12h3.934c0.315-0.372 0.654-0.729 1.015-1.068 1.374-1.287 3.018-2.27 4.879-2.932h-13.827v20h26v-8.395l-4 2.667v1.728z"></path>\n  ',
  upload: '\n    <path d="M15 22h-15v8h30v-8h-15zM28 26h-4v-2h4v2zM7 10l8-8 8 8h-5v10h-6v-10z"></path>\n  '
}, _defineProperty(_Icons, 'upload2', '\n    <path d="M0 28h32v2h-32zM32 24v2h-32v-2l4-8h8v4h8v-4h8zM7 10l9-9 9 9h-7v8h-4v-8z"></path>\n  '), _defineProperty(_Icons, 'download', '\n    <path d="M23 14l-8 8-8-8h5v-12h6v12zM15 22h-15v8h30v-8h-15zM28 26h-4v-2h4v2z"></path>\n  '), _defineProperty(_Icons, 'download2', '\n    <path d="M28 16h-5l-7 7-7-7h-5l-4 8v2h32v-2l-4-8zM0 28h32v2h-32v-2zM18 10v-8h-4v8h-7l9 9 9-9h-7z"></path>\n  '), _defineProperty(_Icons, 'sun', '\n    <path d="M16 26c1.105 0 2 0.895 2 2v2c0 1.105-0.895 2-2 2s-2-0.895-2-2v-2c0-1.105 0.895-2 2-2zM16 6c-1.105 0-2-0.895-2-2v-2c0-1.105 0.895-2 2-2s2 0.895 2 2v2c0 1.105-0.895 2-2 2zM30 14c1.105 0 2 0.895 2 2s-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2zM6 16c0 1.105-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2c1.105 0 2 0.895 2 2zM25.899 23.071l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0zM6.101 8.929l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0zM25.899 8.929c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414zM6.101 23.071c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414z"></path>\n    <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM16 21c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"></path>\n  '), _defineProperty(_Icons, 'ticket', '\n    <path d="M18 10l4 4-8 8-4-4zM31.298 9.297l-2.297-2.297-1 1c-0.512 0.512-1.219 0.828-2 0.828-1.562 0-2.829-1.266-2.829-2.828 0-0.781 0.317-1.489 0.829-2.001l1-1-2.297-2.297c-0.936-0.936-2.469-0.936-3.405 0l-18.595 18.595c-0.936 0.936-0.936 2.469 0 3.405l2.297 2.297 0.999-0.999c0.512-0.513 1.22-0.83 2.001-0.83 1.562 0 2.828 1.266 2.828 2.828 0 0.781-0.317 1.489-0.829 2.001l-1 1 2.297 2.297c0.936 0.936 2.469 0.936 3.405 0l18.595-18.595c0.936-0.937 0.936-2.469 0-3.406zM14 26l-8-8 12-12 8 8-12 12z"></path>\n  '), _defineProperty(_Icons, 'width', '\n    <path d="M8 28v4l-6-5 6-5v4h16v-4l6 5-6 5v-4zM26 2v8l-2-4h-6v14h4v2h-12v-2h4v-14h-6l-2 4v-8z"></path>\n  '), _defineProperty(_Icons, 'tree', '\n    <path d="M30.5 24h-0.5v-6.5c0-1.93-1.57-3.5-3.5-3.5h-8.5v-4h0.5c0.825 0 1.5-0.675 1.5-1.5v-5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v5c0 0.825 0.675 1.5 1.5 1.5h0.5v4h-8.5c-1.93 0-3.5 1.57-3.5 3.5v6.5h-0.5c-0.825 0-1.5 0.675-1.5 1.5v5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-5c0-0.825-0.675-1.5-1.5-1.5h-0.5v-6h8v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-5c0-0.825-0.675-1.5-1.5-1.5h-0.5v-6h8v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-5c0-0.825-0.675-1.5-1.5-1.5zM6 30h-4v-4h4v4zM18 30h-4v-4h4v4zM14 8v-4h4v4h-4zM30 30h-4v-4h4v4z"></path>\n  '), _defineProperty(_Icons, 'truck', '\n    <path d="M32 18l-4-8h-6v-4c0-1.1-0.9-2-2-2h-18c-1.1 0-2 0.9-2 2v16l2 2h2.536c-0.341 0.588-0.536 1.271-0.536 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.536-2h11.073c-0.341 0.588-0.537 1.271-0.537 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.537-2h2.537v-6zM22 18v-6h4.146l3 6h-7.146z"></path>\n  '), _defineProperty(_Icons, 'rocket', '\n    <path d="M22 2l-10 10h-6l-6 8c0 0 6.357-1.77 10.065-0.94l-10.065 12.94 13.184-10.255c1.839 4.208-1.184 10.255-1.184 10.255l8-6v-6l10-10 2-10-10 2z"></path>\n  '), _defineProperty(_Icons, 'key', '\n    <path d="M22 0c-5.523 0-10 4.477-10 10 0 0.626 0.058 1.238 0.168 1.832l-12.168 12.168v6c0 1.105 0.895 2 2 2h2v-2h4v-4h4v-4h4l2.595-2.595c1.063 0.385 2.209 0.595 3.405 0.595 5.523 0 10-4.477 10-10s-4.477-10-10-10zM24.996 10.004c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>\n  '), _defineProperty(_Icons, 'printer', '\n    <path d="M8 2h16v4h-16v-4z"></path>\n    <path d="M30 8h-28c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h6v8h16v-8h6c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM4 14c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM22 28h-12v-10h12v10z"></path>\n  '), _defineProperty(_Icons, 'spell', '\n    <path d="M4 8h4v6h2v-12c0-1.1-0.9-2-2-2h-4c-1.1 0-2 0.9-2 2v12h2v-6zM4 2h4v4h-4v-4zM30 2v-2h-6c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h6v-2h-6v-10h6zM20 5v-3c0-1.1-0.9-2-2-2h-6v14h6c1.1 0 2-0.9 2-2v-3c0-1.1-0.275-2-1.375-2 1.1 0 1.375-0.9 1.375-2zM18 12h-4v-4h4v4zM18 6h-4v-4h4v4zM26 18l-13 14-7-9 2.563-2.188 4.438 4.625 11-9.438z"></path>\n  '), _defineProperty(_Icons, 'bold', '\n    <path d="M22.121 15.145c1.172-1.392 1.879-3.188 1.879-5.145 0-4.411-3.589-8-8-8h-10v28h12c4.411 0 8-3.589 8-8 0-2.905-1.556-5.453-3.879-6.855zM12 6h3.172c1.749 0 3.172 1.794 3.172 4s-1.423 4-3.172 4h-3.172v-8zM16.969 26h-4.969v-8h4.969c1.827 0 3.313 1.794 3.313 4s-1.486 4-3.313 4z"></path>\n  '), _defineProperty(_Icons, 'italic', '\n    <path d="M28 2v2h-4l-10 24h4v2h-14v-2h4l10-24h-4v-2z"></path>\n  '), _defineProperty(_Icons, 'underline', '\n    <path d="M22 2h4v13c0 4.971-4.477 9-10 9s-10-4.029-10-9v-13h4v13c0 1.255 0.57 2.459 1.605 3.391 1.153 1.038 2.714 1.609 4.395 1.609s3.242-0.572 4.395-1.609c1.035-0.931 1.605-2.136 1.605-3.391v-13zM6 26h20v4h-20z"></path>\n  '), _defineProperty(_Icons, 'pilcrow', '\n    <path d="M12 0h16v4h-4v28h-4v-28h-4v28h-4v-16c-4.418 0-8-3.582-8-8s3.582-8 8-8z"></path>\n  '), _defineProperty(_Icons, 'boxin', '\n    <path d="M26 2h-20l-6 6v21c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-21l-6-6zM16 26l-10-8h6v-6h8v6h6l-10 8zM4.828 6l2-2h18.343l2 2h-22.343z"></path>\n  '), _defineProperty(_Icons, 'boxout', '\n    <path d="M26 2h-20l-6 6v21c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-21l-6-6zM20 20v6h-8v-6h-6l10-8 10 8h-6zM4.828 6l2-2h18.343l2 2h-22.343z"></path>\n  '), _defineProperty(_Icons, 'document', '\n    <path d="M28 8v-4h-28v22c0 1.105 0.895 2 2 2h27c1.657 0 3-1.343 3-3v-17h-4zM26 26h-24v-20h24v20zM4 10h20v2h-20zM16 14h8v2h-8zM16 18h8v2h-8zM16 22h6v2h-6zM4 14h10v10h-10z"></path>\n  '), _defineProperty(_Icons, 'link', '\n    <path d="M13.757 19.868c-0.416 0-0.832-0.159-1.149-0.476-2.973-2.973-2.973-7.81 0-10.783l6-6c1.44-1.44 3.355-2.233 5.392-2.233s3.951 0.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743c-0.635 0.635-1.663 0.635-2.298 0s-0.635-1.663 0-2.298l2.743-2.743c1.706-1.706 1.706-4.481 0-6.187-0.826-0.826-1.925-1.281-3.094-1.281s-2.267 0.455-3.094 1.281l-6 6c-1.706 1.706-1.706 4.481 0 6.187 0.635 0.635 0.635 1.663 0 2.298-0.317 0.317-0.733 0.476-1.149 0.476z"></path>\n    <path d="M8 31.625c-2.037 0-3.952-0.793-5.392-2.233-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743c0.635-0.635 1.664-0.635 2.298 0s0.635 1.663 0 2.298l-2.743 2.743c-1.706 1.706-1.706 4.481 0 6.187 0.826 0.826 1.925 1.281 3.094 1.281s2.267-0.455 3.094-1.281l6-6c1.706-1.706 1.706-4.481 0-6.187-0.635-0.635-0.635-1.663 0-2.298s1.663-0.635 2.298 0c2.973 2.973 2.973 7.81 0 10.783l-6 6c-1.44 1.44-3.355 2.233-5.392 2.233z"></path>\n  '), _defineProperty(_Icons, 'unlink', '\n    <transform="translate(10,10)"><path d="M13.757 19.868c-0.416 0-0.832-0.159-1.149-0.476-2.973-2.973-2.973-7.81 0-10.783l6-6c1.44-1.44 3.355-2.233 5.392-2.233s3.951 0.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743c-0.635 0.635-1.663 0.635-2.298 0s-0.635-1.663 0-2.298l2.743-2.743c1.706-1.706 1.706-4.481 0-6.187-0.826-0.826-1.925-1.281-3.094-1.281s-2.267 0.455-3.094 1.281l-6 6c-1.706 1.706-1.706 4.481 0 6.187 0.635 0.635 0.635 1.663 0 2.298-0.317 0.317-0.733 0.476-1.149 0.476z"></path></transform>\n    <path d="M8 31.625c-2.037 0-3.952-0.793-5.392-2.233-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743c0.635-0.635 1.664-0.635 2.298 0s0.635 1.663 0 2.298l-2.743 2.743c-1.706 1.706-1.706 4.481 0 6.187 0.826 0.826 1.925 1.281 3.094 1.281s2.267-0.455 3.094-1.281l6-6c1.706-1.706 1.706-4.481 0-6.187-0.635-0.635-0.635-1.663 0-2.298s1.663-0.635 2.298 0c2.973 2.973 2.973 7.81 0 10.783l-6 6c-1.44 1.44-3.355 2.233-5.392 2.233z"></path>\n  '), _defineProperty(_Icons, 'search', '\n   <path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>\n  '), _defineProperty(_Icons, 'lock', '\n   <path d="M18.5 14h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 8c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z"></path>\n  '), _defineProperty(_Icons, 'unlock', '\n   <path d="M24 2c3.308 0 6 2.692 6 6v6h-4v-6c0-1.103-0.897-2-2-2h-4c-1.103 0-2 0.897-2 2v6h0.5c0.825 0 1.5 0.675 1.5 1.5v15c0 0.825-0.675 1.5-1.5 1.5h-17c-0.825 0-1.5-0.675-1.5-1.5v-15c0-0.825 0.675-1.5 1.5-1.5h12.5v-6c0-3.308 2.692-6 6-6h4z"></path>\n  '), _defineProperty(_Icons, 'lab', '\n   <path d="M29.884 25.14l-9.884-16.47v-6.671h1c0.55 0 1-0.45 1-1s-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v6.671l-9.884 16.47c-2.264 3.773-0.516 6.86 3.884 6.86h20c4.4 0 6.148-3.087 3.884-6.86zM7.532 20l6.468-10.779v-7.221h4v7.221l6.468 10.779h-16.935z"></path>\n  '), _defineProperty(_Icons, 'shield', '\n   <path d="M30 0l-14 4-14-4c0 0-0.141 1.616 0 4l14 4.378 14-4.378c0.141-2.384 0-4 0-4zM2.256 6.097c0.75 7.834 3.547 21.007 13.744 25.903 10.197-4.896 12.995-18.069 13.744-25.903l-13.744 5.167-13.744-5.167z"></path>\n  '), _defineProperty(_Icons, 'zap', '\n   <path d="M12 0l-12 16h12l-8 16 28-20h-16l12-12z"></path>\n  '), _defineProperty(_Icons, 'bookmark', '\n   <path d="M6 0v32l10-10 10 10v-32z"></path>\n  '), _defineProperty(_Icons, 'question', '\n   <path d="M14 22h4v4h-4zM22 8c1.105 0 2 0.895 2 2v6l-6 4h-4v-2l6-4v-2h-10v-4h12zM16 3c-3.472 0-6.737 1.352-9.192 3.808s-3.808 5.72-3.808 9.192c0 3.472 1.352 6.737 3.808 9.192s5.72 3.808 9.192 3.808c3.472 0 6.737-1.352 9.192-3.808s3.808-5.72 3.808-9.192c0-3.472-1.352-6.737-3.808-9.192s-5.72-3.808-9.192-3.808zM16 0v0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16z"></path>\n  '), _defineProperty(_Icons, 'blocked', '\n   <path d="M27.314 4.686c-3.022-3.022-7.040-4.686-11.314-4.686s-8.292 1.664-11.314 4.686c-3.022 3.022-4.686 7.040-4.686 11.314s1.664 8.292 4.686 11.314c3.022 3.022 7.040 4.686 11.314 4.686s8.292-1.664 11.314-4.686c3.022-3.022 4.686-7.040 4.686-11.314s-1.664-8.292-4.686-11.314zM28 16c0 2.588-0.824 4.987-2.222 6.949l-16.727-16.727c1.962-1.399 4.361-2.222 6.949-2.222 6.617 0 12 5.383 12 12zM4 16c0-2.588 0.824-4.987 2.222-6.949l16.727 16.727c-1.962 1.399-4.361 2.222-6.949 2.222-6.617 0-12-5.383-12-12z"></path>\n  '), _defineProperty(_Icons, 'exclaim', '\n   <path d="M16 3c-3.472 0-6.737 1.352-9.192 3.808s-3.808 5.72-3.808 9.192c0 3.472 1.352 6.737 3.808 9.192s5.72 3.808 9.192 3.808c3.472 0 6.737-1.352 9.192-3.808s3.808-5.72 3.808-9.192c0-3.472-1.352-6.737-3.808-9.192s-5.72-3.808-9.192-3.808zM16 0v0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16zM14 22h4v4h-4zM14 6h4v12h-4z"></path>\n  '), _defineProperty(_Icons, 'cancel', '\n   <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>\n   <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>\n  '), _defineProperty(_Icons, 'calc', '\n    <path d="M12 2h-10c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM12 10h-10v-2h10v2zM28 2h-10c-1.1 0-2 0.9-2 2v26c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-26c0-1.1-0.9-2-2-2zM28 20h-10v-2h10v2zM28 14h-10v-2h10v2zM12 18h-10c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM12 26h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"></path>\n  '), _defineProperty(_Icons, 'enlarge', '\n    <path d="M32 0v13l-5-5-6 6-3-3 6-6-5-5zM14 21l-6 6 5 5h-13v-13l5 5 6-6z"></path>\n  '), _defineProperty(_Icons, 'shrink', '\n    <path d="M14 18v13l-5-5-6 6-3-3 6-6-5-5zM32 3l-6 6 5 5h-13v-13l5 5 6-6z"></path>\n  '), _defineProperty(_Icons, 'undo', '\n    <path d="M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z"></path>\n  '), _defineProperty(_Icons, 'redo', '\n    <path d="M18 7.762v-7.762l12 12-12 12v-7.932c-13.961-0.328-13.362 9.493-9.808 15.932-8.772-9.482-6.909-24.674 9.808-24.238z"></path>\n  '), _defineProperty(_Icons, 'forward', '\n    <path d="M8.192 0c-3.554 6.439-4.153 16.259 9.808 15.932v-7.932l12 12-12 12v-7.762c-16.718 0.436-18.58-14.757-9.808-24.238z"></path>\n  '), _defineProperty(_Icons, 'replus', '\n    <path d="M18 7.762v-7.762l12 12-12 12v-7.932c-13.961-0.328-13.362 9.493-9.808 15.932-8.772-9.482-6.909-24.674 9.808-24.238z"></path>\n    <path d="M 25 32 V 19 h 1 V 32 z  M 32 25 H 19 v 1 H 32 z"></path>\n  '), _defineProperty(_Icons, 'forplus', '\n    <path d="M8.192 0c-3.554 6.439-4.153 16.259 9.808 15.932v-7.932l12 12-12 12v-7.762c-16.718 0.436-18.58-14.757-9.808-24.238z"></path>\n    <path d="M 25 0 V 13 h 1 V 0 z  M 32 7 H 19 v -1 H 32 z"></path>\n  '), _defineProperty(_Icons, 'adrplus', '\n    <path d="M32 9l-8 8-17-17-7 7 17 17-8 8h23v-23z"></path>\n    <path d="M 25 0 V 13 h 1 V 0 z  M 32 7 H 19 v -1 H 32 z"></path>\n  '), _defineProperty(_Icons, 'sphere', '\n    <path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM23.487 22c0.268-1.264 0.437-2.606 0.492-4h3.983c-0.104 1.381-0.426 2.722-0.959 4h-3.516zM6.513 12c-0.268 1.264-0.437 2.606-0.492 4h-3.983c0.104-1.381 0.426-2.722 0.959-4h3.516zM21.439 12c0.3 1.28 0.481 2.62 0.54 4h-5.979v-4h5.439zM16 10v-5.854c0.456 0.133 0.908 0.355 1.351 0.668 0.831 0.586 1.625 1.488 2.298 2.609 0.465 0.775 0.867 1.638 1.203 2.578h-4.852zM10.351 7.422c0.673-1.121 1.467-2.023 2.298-2.609 0.443-0.313 0.895-0.535 1.351-0.668v5.854h-4.852c0.336-0.94 0.738-1.803 1.203-2.578zM14 12v4h-5.979c0.059-1.38 0.24-2.72 0.54-4h5.439zM2.997 22c-0.533-1.278-0.854-2.619-0.959-4h3.983c0.055 1.394 0.224 2.736 0.492 4h-3.516zM8.021 18h5.979v4h-5.439c-0.3-1.28-0.481-2.62-0.54-4zM14 24v5.854c-0.456-0.133-0.908-0.355-1.351-0.668-0.831-0.586-1.625-1.488-2.298-2.609-0.465-0.775-0.867-1.638-1.203-2.578h4.852zM19.649 26.578c-0.673 1.121-1.467 2.023-2.298 2.609-0.443 0.312-0.895 0.535-1.351 0.668v-5.854h4.852c-0.336 0.94-0.738 1.802-1.203 2.578zM16 22v-4h5.979c-0.059 1.38-0.24 2.72-0.54 4h-5.439zM23.98 16c-0.055-1.394-0.224-2.736-0.492-4h3.516c0.533 1.278 0.855 2.619 0.959 4h-3.983zM25.958 10h-2.997c-0.582-1.836-1.387-3.447-2.354-4.732 1.329 0.636 2.533 1.488 3.585 2.54 0.671 0.671 1.261 1.404 1.766 2.192zM5.808 7.808c1.052-1.052 2.256-1.904 3.585-2.54-0.967 1.285-1.771 2.896-2.354 4.732h-2.997c0.504-0.788 1.094-1.521 1.766-2.192zM4.042 24h2.997c0.583 1.836 1.387 3.447 2.354 4.732-1.329-0.636-2.533-1.488-3.585-2.54-0.671-0.671-1.261-1.404-1.766-2.192zM24.192 26.192c-1.052 1.052-2.256 1.904-3.585 2.54 0.967-1.285 1.771-2.896 2.354-4.732h2.997c-0.504 0.788-1.094 1.521-1.766 2.192z"></path>\n  '), _defineProperty(_Icons, 'chip', '\n    <path d="M 14 16  C 14 13 8 14 8 10  C 8 2 24 2 24 10  C 24 14 18 13 18 16  C 18 19 24 18 24 22  C 24 30 8 30 8 22  C 8 18 14 19 14 16" fill="none" stroke-width="2.5"/>\n    <path d="M 13.75 1 V 31 M 18.25 1 V 31" stroke-width="1.75" stroke-linecap="round">\n  '), _defineProperty(_Icons, 'chipglass', '\n    <path d="M 10 29 L 16 19 L 22 29 M 13 9 L 16 14 L 19 9 Z" stroke-width="1"/>\n    <path d="M 6 4 L 26 4 M 6 28 L 26 28" stroke-width="3" stroke-linecap="round"/>\n    <path d="M 7 4 L 14 16 L 7 28  M 25 4 L 18 16 L 25 28" stroke-width="2" fill="none"/>\n    <path d="M 14 1 V 4 M 18 1 V 4 M 14 31 V 28 M 18 31 V 28" stroke-width="2" stroke-linecap="round"/>\n  '), _Icons);

module.exports = function (name) {
  if (name == null) return Object.keys(Icons);
  return '<svg viewBox="0 0 32 32">' + Icons[name] + '</svg>';
};

module.exports.code = Icons;

module.exports.svg = function (icon) {
  return encodeURI('data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16px\' height=\'16px\' viewBox=\'0 0 32 32\'>' + Icons[icon] + '</svg>');
};

module.exports.url = function (icon) {
  return 'url("' + this.svg(icon) + '")';
};

/***/ }),

/***/ "./src/indate.vue":
/*!************************!*\
  !*** ./src/indate.vue ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _indate_vue_vue_type_template_id_2baad5ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indate.vue?vue&type=template&id=2baad5ec& */ "./src/indate.vue?vue&type=template&id=2baad5ec&");
/* harmony import */ var _indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indate.vue?vue&type=script&lang=js& */ "./src/indate.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _indate_vue_vue_type_template_id_2baad5ec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _indate_vue_vue_type_template_id_2baad5ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/indate.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/indate.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/indate.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./indate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/indate.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/indate.vue?vue&type=template&id=2baad5ec&":
/*!*******************************************************!*\
  !*** ./src/indate.vue?vue&type=template&id=2baad5ec& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_template_id_2baad5ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./indate.vue?vue&type=template&id=2baad5ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/indate.vue?vue&type=template&id=2baad5ec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_template_id_2baad5ec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_template_id_2baad5ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------

module.exports = {
  Application: __webpack_require__(/*! ./app.vue */ "./src/app.vue").default,
  Common: __webpack_require__(/*! ./common.js */ "./src/common.js"),
  DataView: __webpack_require__(/*! ./dbp.vue */ "./src/dbp.vue").default,
  DataEdit: __webpack_require__(/*! ./dbe.vue */ "./src/dbe.vue").default,
  Dialog: __webpack_require__(/*! ./dialog.vue */ "./src/dialog.vue").default,
  MultiView: __webpack_require__(/*! ./mlb.vue */ "./src/mlb.vue").default,
  MultiEdit: __webpack_require__(/*! ./mdew.vue */ "./src/mdew.vue").default,
  Launcher: __webpack_require__(/*! ./launch.vue */ "./src/launch.vue").default,
  SvGraph: __webpack_require__(/*! ./svgraph.vue */ "./src/svgraph.vue").default,
  StructDoc: __webpack_require__(/*! ./strdoc.vue */ "./src/strdoc.vue").default,
  Window: __webpack_require__(/*! ./win.vue */ "./src/win.vue").default,
  Popup: __webpack_require__(/*! ./pop.vue */ "./src/pop.vue").default,
  Report: __webpack_require__(/*! ./report.vue */ "./src/report.vue").default,
  Wyseman: __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js")
};

/***/ }),

/***/ "./src/launch.vue":
/*!************************!*\
  !*** ./src/launch.vue ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _launch_vue_vue_type_template_id_0c4b3168___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./launch.vue?vue&type=template&id=0c4b3168& */ "./src/launch.vue?vue&type=template&id=0c4b3168&");
/* harmony import */ var _launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./launch.vue?vue&type=script&lang=js& */ "./src/launch.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _launch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./launch.vue?vue&type=style&index=0&lang=less& */ "./src/launch.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _launch_vue_vue_type_template_id_0c4b3168___WEBPACK_IMPORTED_MODULE_0__["render"],
  _launch_vue_vue_type_template_id_0c4b3168___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/launch.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/launch.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/launch.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./launch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/launch.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************!*\
  !*** ./src/launch.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./launch.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/launch.vue?vue&type=template&id=0c4b3168&":
/*!*******************************************************!*\
  !*** ./src/launch.vue?vue&type=template&id=0c4b3168& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_template_id_0c4b3168___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./launch.vue?vue&type=template&id=0c4b3168& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/launch.vue?vue&type=template&id=0c4b3168&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_template_id_0c4b3168___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_launch_vue_vue_type_template_id_0c4b3168___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/local.js":
/*!**********************!*\
  !*** ./src/local.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Manage localStorage using a cache object of all application state values
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Stores an object in localstorage[wylib_info] that tells what app profiles are
// stored and how.  The key is the application tag and the value is one of:
// null (don't store), '' (stored unencrypted), <prompt> (stored with a password).
// The app data itself is stored, if enabled, under the key: wylib_<appTag>
//- TODO:
//X- Optionally encrypt/decrypt data stored in localStorage
//- Erase local storage after N bad password attempts
//- 
//- 
var Com = __webpack_require__(/*! ./common */ "./src/common.js");

var LocalTag = 'wylib_';
var LocalInfo = LocalTag + 'info';
var localCache = {};

module.exports = {
  init: function init(context, pwState, appTag, cb) {
    this.context = context;
    this.appTag = appTag;
    this.readyCB = cb;
    var wylibInfo = this.getLocal(LocalInfo) //Stored passphrase prompts for any/all apps
    ,
        appInfo = this.appInfo = wylibInfo ? wylibInfo[appTag] : undefined //Prompt for this app
    ,
        appIdx = LocalTag + appTag;
    //console.log("Init local:", pwState, appTag, "info:", appInfo)
    if (appInfo) {
      //Is there a prompt specified
      pwState.prompt = appInfo;
    } else {
      //No password is enabled
      var savedCache = this.getLocal(appIdx);
      if (savedCache) localCache = savedCache; //Initialize our cache from what was last saved
      cb(true);
    }
  },

  check: function check(site) {
    var _this = this;

    //See if/how user wants to store state info locally
    var top = this.context.top,
        wm = this.context ? this.context.wm : {};
    //console.log("Local check mode for site", site, this.context)

    if (this.appInfo == undefined) {
      //This is a first-time run; no stored info yet
      var dewDat = { q: 'Passphrase' },
          p = 'password',
          dews = top.dewArray([['q', '!appLocalPrompt'], ['p1', '!appLocalP1', p], ['p2', '!appLocalP2', p]]);
      //console.log("Dews:", dews)
      top.query('!appLocalAsk', dews, dewDat, function (ans) {
        //Ask if user wants storage password protected
        if (ans != 'diaYes') _this.appInfo = null;else _this.appInfo = dewDat.p1 ? dewDat.q : '';
        _this.passPhrase = dewDat.p1;
        var wylibInfo = _this.setInfo(_this.appInfo);
        _this.flush();
      }, function (dat) {
        //Validity check callback
        return dat.q && dat.p1 == dat.p2 || !dat.p1 && !dat.p2; //Passwords must match
      });
    }
    //  Com.encrypt("hello", "world")
    //    .then(v => console.log("Encrypted:", v) || v)
    //    .then(v => Com.decrypt("hello", v) || v)
    //    .then(v => console.log("Decrypted:", v) || v)
  },

  setInfo: function setInfo(info) {
    //Change app info in localStorage
    var wylibInfo = this.getLocal(LocalInfo);
    if (!wylibInfo || (typeof wylibInfo === 'undefined' ? 'undefined' : _typeof(wylibInfo)) != 'object') wylibInfo = {}; //Make sure it is valid data
    if (info == undefined) delete wylibInfo[this.appTag];else wylibInfo[this.appTag] = info;
    //console.log("Write localInfo:", wylibInfo)
    localStorage.setItem(LocalInfo, JSON.stringify(wylibInfo));
    return info;
  },

  getLocal: function getLocal(idx) {
    //Retrieve information from local storage
    var strVal = localStorage.getItem(idx);
    return strVal && strVal != 'undefined' ? JSON.parse(strVal) : null;
  },

  flush: function flush() {
    //Optionaly write local cache to local storage
    var idx = LocalTag + this.appTag;
    if (this.appInfo) {
      var strVal = JSON.stringify(localCache);
      Com.encrypt(this.passPhrase, strVal).then(function (v) {
        localStorage.setItem(idx, v);
      });
    } else {
      localStorage.setItem(idx, JSON.stringify(localCache));
    }
    //console.log("Write local storage:", this.appInfo, "pass:", this.passPhrase, JSON.stringify(localCache,null,2))
  },

  pw: function pw(ev) {
    var _this2 = this;

    //Handle submission of user's password
    this.passPhrase = ev.target.value;
    //console.log("Got pw:", ev, this.passPhrase)
    ev.target.value = null;
    if (this.passPhrase == 'reset' && ev.shiftKey) return false;
    var idx = LocalTag + this.appTag,
        strVal = localStorage.getItem(idx);
    if (strVal && strVal != 'undefined') {
      Com.decrypt(this.passPhrase, strVal).then(function (v) {
        localCache = JSON.parse(v);
        //console.log("Got app data:", localCache)
        if (_this2.readyCB) _this2.readyCB(true);
      }).catch(function (err) {
        //console.log("Incorrect password:", err)
      });
    }
    return true;
  },

  set: function set(idx, data, flush) {
    //Save information in local storage
    //console.log("Saving local:", idx, data, flush)
    localCache[idx] = Com.clone(data);
    if (flush) this.flush();
  },

  get: function get(idx) {
    //Retrieve information from local storage
    //console.log("Getting local:", idx, localCache)
    return Com.clone(localCache[idx]);
  },

  clear: function clear(idx) {
    if (idx in localCache) delete localCache[idx];
  },

  reset: function reset() {
    //Delete all app information stored in local storage and reload
    var re = new RegExp('^' + LocalTag),
        idx = LocalTag + this.appTag;
    console.log("Resetting localStorage:", idx);
    localStorage.removeItem(idx); //Delete any state data
    this.setInfo(); //Delete passphrase prompt for this app
  }

};

/***/ }),

/***/ "./src/logitem.vue":
/*!*************************!*\
  !*** ./src/logitem.vue ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logitem_vue_vue_type_template_id_08558de4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logitem.vue?vue&type=template&id=08558de4& */ "./src/logitem.vue?vue&type=template&id=08558de4&");
/* harmony import */ var _logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logitem.vue?vue&type=script&lang=js& */ "./src/logitem.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logitem.vue?vue&type=style&index=0&lang=less& */ "./src/logitem.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _logitem_vue_vue_type_template_id_08558de4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _logitem_vue_vue_type_template_id_08558de4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/logitem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/logitem.vue?vue&type=script&lang=js&":
/*!**************************************************!*\
  !*** ./src/logitem.vue?vue&type=script&lang=js& ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/logitem.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/logitem.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/logitem.vue?vue&type=template&id=08558de4&":
/*!********************************************************!*\
  !*** ./src/logitem.vue?vue&type=template&id=08558de4& ***!
  \********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_template_id_08558de4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=template&id=08558de4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=template&id=08558de4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_template_id_08558de4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_template_id_08558de4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/loglist.vue":
/*!*************************!*\
  !*** ./src/loglist.vue ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loglist_vue_vue_type_template_id_05dab119___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loglist.vue?vue&type=template&id=05dab119& */ "./src/loglist.vue?vue&type=template&id=05dab119&");
/* harmony import */ var _loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loglist.vue?vue&type=script&lang=js& */ "./src/loglist.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loglist.vue?vue&type=style&index=0&lang=less& */ "./src/loglist.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _loglist_vue_vue_type_template_id_05dab119___WEBPACK_IMPORTED_MODULE_0__["render"],
  _loglist_vue_vue_type_template_id_05dab119___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/loglist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/loglist.vue?vue&type=script&lang=js&":
/*!**************************************************!*\
  !*** ./src/loglist.vue?vue&type=script&lang=js& ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/loglist.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/loglist.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/loglist.vue?vue&type=template&id=05dab119&":
/*!********************************************************!*\
  !*** ./src/loglist.vue?vue&type=template&id=05dab119& ***!
  \********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_template_id_05dab119___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=template&id=05dab119& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=template&id=05dab119&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_template_id_05dab119___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_template_id_05dab119___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/mdew.vue":
/*!**********************!*\
  !*** ./src/mdew.vue ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mdew.vue?vue&type=script&lang=js& */ "./src/mdew.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mdew_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mdew.vue?vue&type=style&index=0&lang=scss& */ "./src/mdew.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/mdew.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/mdew.vue?vue&type=script&lang=js&":
/*!***********************************************!*\
  !*** ./src/mdew.vue?vue&type=script&lang=js& ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/mdew.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************!*\
  !*** ./src/mdew.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/menu.vue":
/*!**********************!*\
  !*** ./src/menu.vue ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_vue_vue_type_template_id_18a44f38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.vue?vue&type=template&id=18a44f38& */ "./src/menu.vue?vue&type=template&id=18a44f38&");
/* harmony import */ var _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.vue?vue&type=script&lang=js& */ "./src/menu.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu.vue?vue&type=style&index=0&lang=less& */ "./src/menu.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _menu_vue_vue_type_template_id_18a44f38___WEBPACK_IMPORTED_MODULE_0__["render"],
  _menu_vue_vue_type_template_id_18a44f38___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/menu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/menu.vue?vue&type=script&lang=js&":
/*!***********************************************!*\
  !*** ./src/menu.vue?vue&type=script&lang=js& ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/menu.vue?vue&type=style&index=0&lang=less&":
/*!********************************************************!*\
  !*** ./src/menu.vue?vue&type=style&index=0&lang=less& ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/menu.vue?vue&type=template&id=18a44f38&":
/*!*****************************************************!*\
  !*** ./src/menu.vue?vue&type=template&id=18a44f38& ***!
  \*****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_template_id_18a44f38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=template&id=18a44f38& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=template&id=18a44f38&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_template_id_18a44f38___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_template_id_18a44f38___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/menudock.vue":
/*!**************************!*\
  !*** ./src/menudock.vue ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menudock_vue_vue_type_template_id_483c602a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menudock.vue?vue&type=template&id=483c602a& */ "./src/menudock.vue?vue&type=template&id=483c602a&");
/* harmony import */ var _menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menudock.vue?vue&type=script&lang=js& */ "./src/menudock.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menudock.vue?vue&type=style&index=0&lang=css& */ "./src/menudock.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _menudock_vue_vue_type_template_id_483c602a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _menudock_vue_vue_type_template_id_483c602a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/menudock.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/menudock.vue?vue&type=script&lang=js&":
/*!***************************************************!*\
  !*** ./src/menudock.vue?vue&type=script&lang=js& ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/menudock.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************!*\
  !*** ./src/menudock.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/menudock.vue?vue&type=template&id=483c602a&":
/*!*********************************************************!*\
  !*** ./src/menudock.vue?vue&type=template&id=483c602a& ***!
  \*********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_template_id_483c602a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=template&id=483c602a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=template&id=483c602a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_template_id_483c602a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_template_id_483c602a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/mlb.vue":
/*!*********************!*\
  !*** ./src/mlb.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mlb_vue_vue_type_template_id_5bb2b64c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mlb.vue?vue&type=template&id=5bb2b64c& */ "./src/mlb.vue?vue&type=template&id=5bb2b64c&");
/* harmony import */ var _mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mlb.vue?vue&type=script&lang=js& */ "./src/mlb.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mlb_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mlb.vue?vue&type=style&index=0&lang=scss& */ "./src/mlb.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mlb_vue_vue_type_template_id_5bb2b64c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mlb_vue_vue_type_template_id_5bb2b64c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/mlb.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/mlb.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/mlb.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/mlb.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************!*\
  !*** ./src/mlb.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/mlb.vue?vue&type=template&id=5bb2b64c&":
/*!****************************************************!*\
  !*** ./src/mlb.vue?vue&type=template&id=5bb2b64c& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_template_id_5bb2b64c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=template&id=5bb2b64c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=template&id=5bb2b64c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_template_id_5bb2b64c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_template_id_5bb2b64c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/modal.vue":
/*!***********************!*\
  !*** ./src/modal.vue ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal_vue_vue_type_template_id_4a49cfb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.vue?vue&type=template&id=4a49cfb8& */ "./src/modal.vue?vue&type=template&id=4a49cfb8&");
/* harmony import */ var _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.vue?vue&type=script&lang=js& */ "./src/modal.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.vue?vue&type=style&index=0&lang=less& */ "./src/modal.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _modal_vue_vue_type_template_id_4a49cfb8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _modal_vue_vue_type_template_id_4a49cfb8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/modal.vue?vue&type=script&lang=js&":
/*!************************************************!*\
  !*** ./src/modal.vue?vue&type=script&lang=js& ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/modal.vue?vue&type=style&index=0&lang=less&":
/*!*********************************************************!*\
  !*** ./src/modal.vue?vue&type=style&index=0&lang=less& ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/modal.vue?vue&type=template&id=4a49cfb8&":
/*!******************************************************!*\
  !*** ./src/modal.vue?vue&type=template&id=4a49cfb8& ***!
  \******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_template_id_4a49cfb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=template&id=4a49cfb8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=template&id=4a49cfb8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_template_id_4a49cfb8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_template_id_4a49cfb8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/pop.vue":
/*!*********************!*\
  !*** ./src/pop.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pop_vue_vue_type_template_id_76bd2988___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pop.vue?vue&type=template&id=76bd2988& */ "./src/pop.vue?vue&type=template&id=76bd2988&");
/* harmony import */ var _pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pop.vue?vue&type=script&lang=js& */ "./src/pop.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _pop_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pop.vue?vue&type=style&index=0&lang=less& */ "./src/pop.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _pop_vue_vue_type_template_id_76bd2988___WEBPACK_IMPORTED_MODULE_0__["render"],
  _pop_vue_vue_type_template_id_76bd2988___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/pop.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/pop.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/pop.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./pop.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/pop.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/pop.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./pop.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/pop.vue?vue&type=template&id=76bd2988&":
/*!****************************************************!*\
  !*** ./src/pop.vue?vue&type=template&id=76bd2988& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_template_id_76bd2988___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./pop.vue?vue&type=template&id=76bd2988& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/pop.vue?vue&type=template&id=76bd2988&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_template_id_76bd2988___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_pop_vue_vue_type_template_id_76bd2988___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/prefs.js":
/*!**********************!*\
  !*** ./src/prefs.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//A global object to maintain preferences across an application
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//X- Fill in default text descriptions
//X- Build object of preferences when launched
//- Defer building Prefs until init explicitly called (which includes saved prefs)
//- Generate pull-down to select supported languages from menu
//- Language changes in one swoop--not a character at a time
//- Call wyseman.newLanguage with new language setting, app updates reactively
//- Create initialize routine
//-   Fills in any missing properties from default structure
//- Make routine to build menu items for editing prefs
//- How does prefs call to refill wyseman cache when language changes?
//- We should start with an empty config
//-   Modules should supply their own prefs for the array (including app)
//- This makes a mobile/alternate version more able to use wyseman.js as-is
//- 

var Config = {
  language: { def: 'eng', mod: 'app', inp: 'text', lang: 'Language' },

  dataBackground: { def: '#fefefe', mod: 'app', inp: 'color', lang: 'Data Entry Background' },
  frameBackground: { def: '#f4f4f4', mod: 'app', inp: 'color', lang: 'Container Background' },
  titleBackground: { def: '#dfdfdf', mod: 'app', inp: 'color', lang: 'Title Background' },
  highlightBackground: { def: '#ddffff', mod: 'app', inp: 'color', lang: 'Highlight Background' },
  dragOverBackground: { def: '#ffd8a0', mod: 'app', inp: 'color', lang: 'Dragover Background' },

  butHoverColor: { def: '#88ff88', mod: 'app', inp: 'color', lang: 'Button Hover' },
  butActiveColor: { def: '#55cc55', mod: 'app', inp: 'color', lang: 'Button Active Color' },
  butToggledColor: { def: '#66aa66', mod: 'app', inp: 'color', lang: 'Button Tottled Color' },
  butBackground: { def: '#f4f6f0', mod: 'app', inp: 'color', lang: 'Button Background' },
  butIconFill: { def: '#2482a4', mod: 'app', inp: 'color', lang: 'Button Icon Fill' },
  butIconStroke: { def: '#222222', mod: 'app', inp: 'color', lang: 'Button Icon Stroke' },
  butCloseColor: { def: '#ffdddd', mod: 'app', inp: 'color', lang: 'Close Button Color' },
  butCloseHoverColor: { def: '#ffbbbb', mod: 'app', inp: 'color', lang: 'Close Button Hover Color' },
  butDisabledColor: { def: '#aaaaaa', mod: 'app', inp: 'color', lang: 'Button Disabled Color' },
  butDisabledBackground: { def: '#eeeeee', mod: 'app', inp: 'color', lang: 'Button Disabled Background' },
  butSize: { def: 1.5, mod: 'app', inp: { type: 'number', min: 0.5, max: 100, step: 0.1 }, lang: 'Button Size' },

  winBorderColor: { def: '#c0c0c0', mod: 'win', inp: 'color', lang: 'Border Color' },
  winHighlightColor: { def: '#202060', mod: 'win', inp: 'color', lang: 'Highlight Color' },
  winHeadColorHigh: { def: '#f0f0f8', mod: 'win', inp: 'color', lang: 'Header Gradient Light' },
  winHeadColorLow: { def: '#b8b8c0', mod: 'win', inp: 'color', lang: 'Header Gradient Dark' },
  winBorderWidth: { def: 2, mod: 'win', inp: { type: 'number', min: 0, max: 20, step: 1 }, lang: 'Border Width' },
  winBorderRad: { def: 5, mod: 'win', inp: { type: 'number', min: 0, max: 20, step: 1 }, lang: 'Border Radius' },
  winOpacity: { def: 0.94, mod: 'win', inp: { type: 'number', min: 0, max: 1, step: 0.05 }, lang: 'Opacity' },
  winFullHeader: { def: 22, mod: 'win', inp: { type: 'number', min: 8, max: 50, step: 1 }, lang: 'Large Header Height' },
  winSmallHeader: { def: 12, mod: 'win', inp: { type: 'number', min: 4, max: 50, step: 1 }, lang: 'Small Header Height' },
  winSubWindowX: { def: 40, mod: 'win', inp: { type: 'number', min: 0, max: 500, step: 10 }, lang: 'Sub Offset X' },
  winSubWindowY: { def: 40, mod: 'win', inp: { type: 'number', min: 0, max: 500, step: 10 }, lang: 'Sub Offset Y' },

  dewInvalidColor: { def: '#f02020', mod: 'app', inp: 'color', lang: 'Data Invalid Color' },
  dewDirtyColor: { def: '#f0a020', mod: 'app', inp: 'color', lang: 'Data Dirty Color' },
  dewBorderColor: { def: '#808080', mod: 'app', inp: 'color', lang: 'Entry Border Color' },
  dewFlagWidth: { def: 4, mod: 'app', inp: { type: 'number', min: 1, max: 10, step: 1 }, lang: 'Data Flag Width' },
  dewMleHeight: { def: 2, mod: 'app', inp: { type: 'number', min: 1, max: 40, step: 1 }, lang: 'Text Area Height' },
  dewMleWidth: { def: 40, mod: 'app', inp: { type: 'number', min: 10, max: 100, step: 1 }, lang: 'Text Area Width' },
  dewEntWidth: { def: 4, mod: 'app', inp: { type: 'number', min: 1, max: 80, step: 1 }, lang: 'Text Entry Min Width' },

  mlbMinWidth: { def: 20, mod: 'mlb', inp: { type: 'number', min: 1, max: 100, step: 1 }, lang: 'Minimum Width' },
  mlbMaxWidth: { def: 200, mod: 'mlb', inp: { type: 'number', min: 1, max: 500, step: 1 }, lang: 'Maximum Width' },
  mlbDefWidth: { def: 80, mod: 'mlb', inp: { type: 'number', min: 1, max: 500, step: 1 }, lang: 'Default Width' },
  mlbCharWidth: { def: 8, mod: 'mlb', inp: { type: 'number', min: 1, max: 16, step: 1 }, lang: 'Character Width' }

};

var Preferences = {};

Object.defineProperty(Preferences, 'menu', {
  enumerable: false,
  value: function value(module) {
    var _this = this;

    var rest = 'Restore Defaults',
        conf = [{ idx: 'restore', lang: rest, state: { input: 'button' }, input: function input(v) {
        if (v) console.log("Restore:", v);
        if (v != undefined) for (var idx in Config) {
          var _Config$idx = Config[idx],
              def = _Config$idx.def,
              mod = _Config$idx.mod;

          if (mod == module) _this[idx] = def;
        }
      } }];

    var _loop = function _loop(idx) {
      //For each configuration item
      var _Config$idx2 = Config[idx],
          def = _Config$idx2.def,
          mod = _Config$idx2.mod,
          inp = _Config$idx2.inp,
          lang = _Config$idx2.lang;

      if (mod != module) return 'continue'; //Include only the ones in the desired module (win, dbe, etc)
      var input = inp,
          other = void 0; //Default to string input type
      if (inp != null && (typeof inp === 'undefined' ? 'undefined' : _typeof(inp)) == 'object') {
        //If more complex than just a string
        input = inp.type || 'text'; //Get the type from the object
        other = Object.assign({}, inp);delete other.type; //Other properties to apply to the input
      }
      var size = input == 'text' ? 20 : 10 //Better way to do this?
      ,
          state = { input: input, lang: lang, other: other, size: size //dew configuration
        //console.log("Pref state:", JSON.stringify(state))
      },
          elem = { idx: idx, lang: lang, state: state, input: function input(va, ix, d, v) {
          //Menu configuration
          //console.log("Pref input:", idx, va, ix, this[idx])
          if (ix == 'language') {
            console.log("Prefs detects language change:", va);
          }
          if (va != null && va != undefined && ix) //Change the preference
            _this[ix] = va;
          return _this[idx];
        } };
      conf.push(elem);
    };

    for (var idx in Config) {
      var _ret = _loop(idx);

      if (_ret === 'continue') continue;
    }
    //console.log("Pref conf:", conf)
    return conf;
  }
});

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
for (var key in Config) {
  var _Config$key = Config[key],
      def = _Config$key.def,
      mod = _Config$key.mod,
      _inp = _Config$key.inp,
      title = _Config$key.title;

  Preferences[key] = def;
}

module.exports = Preferences;

/***/ }),

/***/ "./src/report.vue":
/*!************************!*\
  !*** ./src/report.vue ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _report_vue_vue_type_template_id_4c66f04d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./report.vue?vue&type=template&id=4c66f04d& */ "./src/report.vue?vue&type=template&id=4c66f04d&");
/* harmony import */ var _report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./report.vue?vue&type=script&lang=js& */ "./src/report.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _report_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./report.vue?vue&type=style&index=0&lang=less& */ "./src/report.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _report_vue_vue_type_template_id_4c66f04d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _report_vue_vue_type_template_id_4c66f04d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/report.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/report.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/report.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./report.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/report.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************!*\
  !*** ./src/report.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./report.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/report.vue?vue&type=template&id=4c66f04d&":
/*!*******************************************************!*\
  !*** ./src/report.vue?vue&type=template&id=4c66f04d& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_template_id_4c66f04d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./report.vue?vue&type=template&id=4c66f04d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/report.vue?vue&type=template&id=4c66f04d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_template_id_4c66f04d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_report_vue_vue_type_template_id_4c66f04d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StateManager = {
  itemCache: {},
  listens: {},
  pending: {},

  listen: function listen(id, comp, loadCB, errCB) {
    if (!loadCB && this.listens[comp] && this.listens[comp][id]) {
      //If no callback,
      delete this.listens[comp][id]; //then un-listen
      return;
    }
    if (!this.listens[comp]) this.listens[comp] = {}; //If no one listening for this component yet
    //console.log("State listen", id, "for:", comp, this.pending[comp])
    this.listens[comp][id] = { errCB: errCB, loadCB: loadCB //Remember our callbacks
    };if (!(comp in this.pending)) this.pending[comp] = false; //Build pending flag for this component
    if (this.itemCache[comp]) {
      //If this component already cached
      //console.log("cb cache")
      loadCB(this.itemCache[comp]); //return the cached value
    } else if (!this.pending[comp]) {
      //else if no pending query for this component,
      //console.log("callQuery", this.pending[comp])
      this.queryData(comp, id); //launch one
    }
  },

  saveAs: function saveAs(comp, name, descr, state, errCB, okCB) {
    var view = 'wylib.set_data(text, text, text, text, jsonb)',
        params = [comp, name, descr, null, JSON.stringify(state)];
    //console.log("Save as:", comp, name)
    _wyseman2.default.request(this.id + 'ss', 'tuple', { view: view, params: params }, function (res, err) {
      //console.log("Insert res:", res)
      if (err) errCB(err);else okCB(res.set_data);
    });
  },

  save: function save(ruid, state, top) {
    //console.log("Save:", ruid, top)
    var view = 'wylib.data_v',
        fields = { data: JSON.stringify(state) },
        where = { ruid: ruid };
    _wyseman2.default.request(this.id + 'ss', 'update', { view: view, fields: fields, where: where }, function (res, err) {
      if (err && top) top.error(err);
    });
  },

  queryData: function queryData(component, id) {
    var _this = this;

    var view = 'wylib.data_v',
        fields = ['ruid', 'own_name', 'access', 'name', 'descr', 'data'],
        where = { component: component },
        order = [4],
        compListen = id ? this.listens[component][id] : null;
    this.pending[component] = true;
    //console.log("Will query for:", component, this.pending[component])
    _wyseman2.default.request('state_qd_' + component, 'select', { view: view, fields: fields, where: where, order: order }, function (rows, err) {
      _this.pending[component] = false;
      if (err) {
        compListen.errCB(err);return;
      }
      var items = rows.map(function (r) {
        return { idx: r.ruid, owner: r.own_name, access: r.access, lang: { title: r.name, help: r.descr }, data: r.data };
      });
      if (items.length <= 0) items = [{ idx: 'None', lang: 'No saved states found' }];
      _this.itemCache[component] = items;
      if (compListen) {
        //console.log("Calling one:", component)
        compListen.loadCB(items);
      } else {
        //console.log("Will call all:", component)
        if (_this.listens[component]) Object.values(_this.listens[component]).forEach(function (listen) {
          listen.loadCB(items);
        });
      }
    });
  } //queryData
  //StateManager

}; //Manage saving states to and restoring them from the database
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Support separately save and save-as for states
//- On initial call, query for all (or maybe certain common) components (to avoid multiple calls in the startup)
//- How to report errors to the correct toplevel? (See Fixme below)
//- 

_wyseman2.default.listen('state_listen', 'wylib', function (msg) {
  //console.log("Got async wylib message:", msg)
  if (msg.target == "data") StateManager.queryData(msg.component); //Refresh restore states menu
});

module.exports = StateManager;

/***/ }),

/***/ "./src/strdoc.vue":
/*!************************!*\
  !*** ./src/strdoc.vue ***!
  \************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _strdoc_vue_vue_type_template_id_74829700___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strdoc.vue?vue&type=template&id=74829700& */ "./src/strdoc.vue?vue&type=template&id=74829700&");
/* harmony import */ var _strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strdoc.vue?vue&type=script&lang=js& */ "./src/strdoc.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _strdoc_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./strdoc.vue?vue&type=style&index=0&lang=less& */ "./src/strdoc.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _strdoc_vue_vue_type_template_id_74829700___WEBPACK_IMPORTED_MODULE_0__["render"],
  _strdoc_vue_vue_type_template_id_74829700___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/strdoc.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/strdoc.vue?vue&type=script&lang=js&":
/*!*************************************************!*\
  !*** ./src/strdoc.vue?vue&type=script&lang=js& ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./strdoc.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/strdoc.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************!*\
  !*** ./src/strdoc.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./strdoc.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/strdoc.vue?vue&type=template&id=74829700&":
/*!*******************************************************!*\
  !*** ./src/strdoc.vue?vue&type=template&id=74829700& ***!
  \*******************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_template_id_74829700___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./strdoc.vue?vue&type=template&id=74829700& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/strdoc.vue?vue&type=template&id=74829700&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_template_id_74829700___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_strdoc_vue_vue_type_template_id_74829700___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/svgnode.vue":
/*!*************************!*\
  !*** ./src/svgnode.vue ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svgnode_vue_vue_type_template_id_8e4d50c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgnode.vue?vue&type=template&id=8e4d50c6& */ "./src/svgnode.vue?vue&type=template&id=8e4d50c6&");
/* harmony import */ var _svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svgnode.vue?vue&type=script&lang=js& */ "./src/svgnode.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svgnode.vue?vue&type=style&index=0&lang=less& */ "./src/svgnode.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _svgnode_vue_vue_type_template_id_8e4d50c6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _svgnode_vue_vue_type_template_id_8e4d50c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/svgnode.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/svgnode.vue?vue&type=script&lang=js&":
/*!**************************************************!*\
  !*** ./src/svgnode.vue?vue&type=script&lang=js& ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/svgnode.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/svgnode.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/svgnode.vue?vue&type=template&id=8e4d50c6&":
/*!********************************************************!*\
  !*** ./src/svgnode.vue?vue&type=template&id=8e4d50c6& ***!
  \********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_template_id_8e4d50c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=template&id=8e4d50c6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=template&id=8e4d50c6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_template_id_8e4d50c6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_template_id_8e4d50c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/svgraph.vue":
/*!*************************!*\
  !*** ./src/svgraph.vue ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svgraph_vue_vue_type_template_id_ef2988fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgraph.vue?vue&type=template&id=ef2988fc& */ "./src/svgraph.vue?vue&type=template&id=ef2988fc&");
/* harmony import */ var _svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svgraph.vue?vue&type=script&lang=js& */ "./src/svgraph.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svgraph.vue?vue&type=style&index=0&lang=less& */ "./src/svgraph.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _svgraph_vue_vue_type_template_id_ef2988fc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _svgraph_vue_vue_type_template_id_ef2988fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/svgraph.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/svgraph.vue?vue&type=script&lang=js&":
/*!**************************************************!*\
  !*** ./src/svgraph.vue?vue&type=script&lang=js& ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/svgraph.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/svgraph.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/svgraph.vue?vue&type=template&id=ef2988fc&":
/*!********************************************************!*\
  !*** ./src/svgraph.vue?vue&type=template&id=ef2988fc& ***!
  \********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_template_id_ef2988fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=template&id=ef2988fc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=template&id=ef2988fc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_template_id_ef2988fc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_template_id_ef2988fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/top.js":
/*!********************!*\
  !*** ./src/top.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //Manage communication to/from the toplevel window primarily for generating dialogs and reports.
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// Z-Level Descriptions:
// 0-9: Features within a single window
// 10, 20, 30 ...: Toplevel windows, dbp, dbs, dbe, etc (10 .. 990)
// 1000: Popup menus
// 2000: 
// -----------------------------------------------------------------------------
//- TODO:
//- Moving windows to the front will eventually overflow 990
//- Allow a child window to move behind its parent?
//- Re-normalize all registered window layers after raise
//- 


var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _wincom = __webpack_require__(/*! ./wincom.js */ "./src/wincom.js");

var _wincom2 = _interopRequireDefault(_wincom);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReportFile = '/report.html';
var zLevelMod = 10;
var topWins = {}; //Keep the state of all toplevel windows

module.exports = function topHandler(context, amSlave) {
  var _this = this;

  this.postCB = null;
  this.context = context;
  this.amSlave = amSlave;
  this.dialogCB = {};
  this.clickCB = {};
  this.envCB = {};

  if (context && context.id) topWins[context.id] = context; //Keep a list of all participating windows
  //console.log("Registering ID", context ? context.id : null)
  //if (context.state) context.state.layer = 10		//Recover from trouble with layers (debug)

  this.env = function () {
    return _this.context.env;
  };

  this.listenWin = _wincom2.default.listen; //Make calls available to component
  this.momWin = _wincom2.default.mom;

  this.registerDialog = function (dialogTag, cb) {
    //Register handlers for our standard dialog actions
    //console.log("Top register:", dialogTag)		//so callbacks are persistent across reloads
    if (cb) this.dialogCB[dialogTag] = cb;else delete this.dialogCB[dialogTag];
  };

  this.submitDialog = function (dialogTag) {
    var actTag = dialogTag.split(':').slice(0, 3).join(':'); //First three define the action we will be calling
    //console.log("Top call:", dialogTag, actTag, ...args)
    if (this.dialogCB[actTag]) {
      var _dialogCB;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_dialogCB = this.dialogCB)[actTag].apply(_dialogCB, [dialogTag].concat(args));
    }
  };

  this.listenClick = function (tag, cb) {
    //Register for a callback upon any click in the toplevel
    //console.log("Top click register:", tag, !!cb)
    if (cb) this.clickCB[tag] = cb;else delete this.clickCB[tag];
  };

  this.notifyClick = function (ev) {
    var _this2 = this;

    //Notify any listers of clicks
    //console.log("Top notify click:", ev)
    Object.keys(this.clickCB).forEach(function (key) {
      return _this2.clickCB[key](ev);
    });
  };

  this.emit = function (code, ev) {
    //Do we still use this?
    this.context.$emit(code, ev);
  }, this.layer = function (layer) {
    if (!layer) return;
    var th = this.context,
        newLayer = void 0,
        maxLevel = -Number.MAX_VALUE,
        minLevel = Number.MAX_VALUE;
    //      , levArray = []
    //console.log("Layer request:", layer, "from:", th.id, th.$options.name, "cur:", th.state.layer)
    Object.keys(topWins).forEach(function (id) {
      var st = topWins[id].state,
          slay = st.layer;
      //console.log("  loop id:", id, slay)
      if (slay > maxLevel) maxLevel = slay;
      if (slay < minLevel) minLevel = slay;
      //      if (id != th.id) levArray.push({id, slay, st})	//List of every window except the one just raised/lowered
    });
    //console.log("      min:", minLevel, "max:", maxLevel)
    //WIP: attempt to get child windows to render below the parent
    //    levArray.sort((a,b)=>(b.slay - a.slay))		//Order windows top-down
    //console.log("Sorted::", levArray)
    //    let lCnt = -10
    //    levArray.forEach(el=>{
    //console.log(" set:", el.id, "to:", lCnt)
    //      el.st.layer = lCnt
    //      lCnt -= 10
    //    })
    //    th.layer = 100

    if (layer > 0) newLayer = maxLevel + zLevelMod;else newLayer = minLevel - zLevelMod;
    //console.log("Set:", th.id, "to:", newLayer)
    th.state.layer = newLayer;
    if (newLayer < 0) Object.values(topWins).forEach(function (vmthis) {
      //console.log("  adjusting", vmthis.id, "to:", vmthis.state.layer - newLayer)
      vmthis.state.layer -= newLayer;
    });
  };

  this.dewArray = function (arg1, arg2) {
    var _this3 = this;

    var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ent';
    //Make an array of objects suitable for mdew configuration
    var retArr = []; //Call as: field,lang,style or [[field,lang,style] [field,lang,style]]
    if (typeof arg1 == 'string') arg1 = [[arg1, arg2, arg3]]; //array of prompt fields
    if (Array.isArray(arg1)) {
      var focus = true;
      arg1.forEach(function (el) {
        var _el = _slicedToArray(el, 3),
            field = _el[0],
            lang = _el[1],
            input = _el[2];

        if (!input) input = arg3;
        retArr.push({ field: field, lang: _this3.wmCheck(lang), styles: { input: input, focus: focus } });
        focus = false;
      });
    }
    //console.log("retArr:", retArr)
    return retArr;
  }, this.wmCheck = function (msg) {
    //Is this a shortcut wyseman language code?
    if (msg[0] == '!' && 'env' in this.context) {
      var tag = msg.slice(1),
          wm = this.context.env.wm;
      //console.log("wmCheck", this.context.env)
      return wm[tag];
    } else return msg;
  }, this.makeMessage = function (msg) {
    //Make a dialog message, possibly from a message object
    //console.log("makeMessage:", msg, typeof msg, msg[0], this.context.wm)
    if (typeof msg == 'string') {
      return this.wmCheck(msg);
    } else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) == 'object') {
      if (msg.title && msg.help) return msg;else if (msg.lang && msg.lang.title && msg.lang.help) //reports may use this format
        return msg.lang;else if (msg.message) return msg.message;else if (msg.code) return this.context.wm.winUnCode.title + ": " + msg.code;else return this.makeMessage('!winUnknown');
    } else return msg;
  };

  this.postModal = function (message, conf) {
    if (this.context.modal) {
      var client = Object.assign({ message: this.makeMessage(message) }, conf);
      //console.log("Modal:", this.context.modal, client)
      Object.assign(this.context.modal, { posted: true, client: client });
    }
  };

  this.diaButs1 = ['diaOK'], this.diaButs2 = ['diaCancel', 'diaYes'], this.diaButs3 = ['diaCancel', 'diaApply', 'diaYes'], this.error = function (lang, cb) {
    this.postModal(lang, { reason: 'diaError', buttons: this.diaButs1, dews: [], data: {}, cb: cb });
  };
  this.notice = function (lang, cb) {
    this.postModal(lang, { reason: 'diaNotice', buttons: this.diaButs1, dews: [], data: {}, cb: cb });
  };
  this.confirm = function (lang, cb) {
    this.postModal(lang, { reason: 'diaConfirm', buttons: this.diaButs2, dews: [], data: {}, cb: cb });
  };
  this.query = function (lang, dews, data, cb, check) {
    this.postModal(lang, { reason: 'diaQuery', buttons: this.diaButs2, dews: dews, data: data, cb: cb, check: check });
  };
  this.input = function (lang, cb, defVal) {
    //Ask for one value in an entry
    var data = { value: defVal },
        dews = [{ field: 'value', lang: lang, styles: { focus: true } }];
    this.postModal(lang, { reason: 'diaQuery', buttons: this.diaButs2, dews: dews, data: data, cb: cb });
    return data; //Caller can also get reference to data here, in addition to callback
  };

  this.dialog = function (message, dews, data, cb) {
    var tag = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'dialog';
    var buttons = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.diaButs2;

    if (this.context.state && this.context.state.dialogs) {
      //console.log("Dialog launch", tag, dews, data)
      dews.forEach(function (dew) {
        if (!(dew.field in data)) data[dew.field] = null;
      });
      var client = { message: message, reason: 'diaQuery', buttons: buttons, dews: dews, data: data, tag: tag, cb: cb },
          newState = { posted: true, client: client, x: 50, y: 50 };
      _common2.default.addWindow(this.context.state.dialogs, newState, this.context);
    }
  };

  this.onPosted = function (cb) {
    //Register to get a callback when a dialog window posts
    //console.log("TopHandler got registration", cb)
    this.postCB = cb;
  };
  this.posted = function () {
    //Modal dialog should call this when it posts
    //console.log("TopHandler sees posted", this.postCB)
    if (this.postCB) this.postCB();
  };

  this.actionLaunch = function (view, action, info, bus) {
    var _this4 = this;

    //Handle request for a report/action
    if (typeof action == 'string') {
      return notImplemented(); //Fixme: fetch action metadata, and call actionLaunch recursively
    }

    var buttonTag = info.buttonTag,
        options = info.options,
        dialogIndex = info.dialogIndex,
        popUp = info.popUp,
        name = action.name,
        actTag = ['action', view, name].join(':'),
        getKeys = function getKeys() {
      //Try to get keys from dbe message bus, or fall back to key value in info
      var fromFunc = bus && bus.mom ? bus.mom() : null; //Will fail if restoring from saved state
      //console.log("Get keys:", fromFunc || info.keys)
      return fromFunc || info.keys; //We will have to rely on stored key from last session
    },
        repTag = dialogIndex != null ? actTag + ':' + dialogIndex : action.single ? actTag : _wincom2.default.unique(actTag),
        config = { repTag: repTag, view: view, action: action, info: info, actTag: actTag //Will save this for restore purposes
    };

    info.keys = getKeys(); //Remember the last key values too
    //console.log("Action Launcher:", view, "act:", action, "info:", info, "config:", config, "key:", JSON.stringify(info.keys))
    //console.log("  repTag:", repTag, "buttonTag:", buttonTag, "options:", options, "dialogIndex:", dialogIndex, "popUp:", popUp, "bus:", bus)

    if (buttonTag == 'diaCancel') {
      //If we came from a dialog, and user says cancel
      this.context.closeRep(repTag); //Close our window if it is open
      return true;
    }

    if (bus) bus.register(repTag, function (data, pKey) {
      //Relay messages from dbe to the report slave
      //console.log(" slave relay:", repTag, data, pKey, info.keys[0])

      //Fixme: move this back to the dbe:?
      if (data == 'load' && pKey) info.keys[0] = pKey; //New record, remember the new primary key

      _wincom2.default.child(repTag, { request: 'child', data: data });
    });

    var perform = function perform(target, message, win) {
      //Respond to messages from report window
      var _ref = message ? message : {},
          request = _ref.request,
          data = _ref.data;
      //console.log("Report query:", repTag, 'tgt:', target, message)

      if (target == 'report') {
        //console.log("Report:", repTag, "dirty:", data)
        _this4.context.repBus.notify(repTag, request, data);
      } else if (target == 'control') {
        //Report window content is mounted and asking for content from the control layer on the backend
        var _request = data,
            keys = getKeys();
        //console.log("DB request:", view, request, options, "k:", JSON.stringify(keys))
        _wyseman2.default.request(repTag, 'action', { view: view, name: name, data: { request: _request, options: options, keys: keys } }, function (content, error) {
          //console.log("DB answers:", content, "error:", error)
          if (error) {
            _this4.error(error);return;
          }
          if (win && content) win.postMessage({ request: 'populate', data: { format: action.format, content: content, config: config } }, location.origin); //send content to report window
        });
      } else if (target == 'editor') {
        //Content is a record editor and asking for an editing sub-command to be performed
        //console.log("Command for Dbe:", request, "data:", data, "keys:", info.keys)
        if (bus && bus.mom) bus.mom(request, data, info.keys[0], function () {
          win.postMessage({ request: 'child', data: 'clean' }, location.origin); //Confirm update with report window
        });
      } else if (target == 'env') {
        //Content is asking for data for its environment
        //console.log("Request for env", win)
        win.postMessage({ request: 'env', data: {
            wm: _this4.context.wm,
            pr: Object.assign({}, _this4.context.pr)
          } }, location.origin); //send prefs, language metadata to report window
      }
    };

    if (action.format) {
      //This action is a report, has a window
      _wincom2.default.listen(repTag, perform); //Get ready to communicate with it
      this.context.reportWin(repTag, ReportFile, config); //Create the window
    } else {
      //Immediate query, execute it
      perform('control');
    }
    return buttonTag != 'diaApply'; //Tell top window to close the options dialog, if any
  };
};

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Copyright WyattERP.org: See LICENSE in the root of this package
//Rectangular, polar 2D vector conversions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------

module.exports = {
  rtop: function rtop(rec) {
    if (!('x' in rec)) rec.x = 0;
    if (!('y' in rec)) rec.y = 0;
    var a = Math.atan2(rec.y, rec.x),
        r = Math.sqrt(Math.pow(rec.x, 2) + Math.pow(rec.y, 2));
    return { a: a, r: r };
  },

  ptor: function ptor(pol) {
    if (!('r' in pol)) pol.r = 0;
    if (!('a' in pol)) pol.a = 0;
    var x = pol.r * Math.cos(pol.a),
        y = pol.r * Math.sin(pol.a);
    return { x: x, y: y };
  },

  add: function add(v0) {
    var _this = this;

    var v1 = Object.assign({}, v0);
    if (!('x' in v1 || 'y' in v1)) v1 = this.ptor(v1); //convert to rectangular?

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    args.forEach(function (v2) {
      if (v2) {
        if (!('x' in v2 || 'y' in v2)) v2 = _this.ptor(v2);
        v1.x += v2.x;
        v1.y += v2.y;
      }
    });
    return v1;
  },

  sub: function sub(v0) {
    var _this2 = this;

    var v1 = Object.assign({}, v0);
    if (!('x' in v1 || 'y' in v1)) v1 = this.ptor(v1); //Convert to rectangular?

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    args.forEach(function (v2) {
      if (v2) {
        if (!('x' in v2 || 'y' in v2)) v2 = _this2.ptor(v2);
        v1.x -= v2.x;
        v1.y -= v2.y;
      }
    });
    return v1;
  }
};

/***/ }),

/***/ "./src/win.vue":
/*!*********************!*\
  !*** ./src/win.vue ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _win_vue_vue_type_template_id_42a0f4da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./win.vue?vue&type=template&id=42a0f4da& */ "./src/win.vue?vue&type=template&id=42a0f4da&");
/* harmony import */ var _win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./win.vue?vue&type=script&lang=js& */ "./src/win.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./win.vue?vue&type=style&index=0&lang=less& */ "./src/win.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _win_vue_vue_type_template_id_42a0f4da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _win_vue_vue_type_template_id_42a0f4da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/win.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/win.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/win.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--0!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/win.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/win.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/win.vue?vue&type=template&id=42a0f4da&":
/*!****************************************************!*\
  !*** ./src/win.vue?vue&type=template&id=42a0f4da& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_template_id_42a0f4da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=template&id=42a0f4da& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=template&id=42a0f4da&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_template_id_42a0f4da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_template_id_42a0f4da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/wincom.js":
/*!***********************!*\
  !*** ./src/wincom.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Manage communication between windows/reports/iframes
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//TODO:
//- Reports can submit requests back to the parent
//- Reports restore after reload
//- 
var winCBs = {}; //Callbacks for known report windows
var repWins = {}; //Track child windows

window.addEventListener('message', function (ev) {
  //Listen for messages from report popups/iframes
  var _ref = _typeof(ev.data) == 'object' ? ev.data : { request: ev.data },
      request = _ref.request,
      data = _ref.data,
      name = ev.source.name;
  //if (!ev.data.payload) console.log("WinCom got message:", ev.source, "Data:", ev.data, "wins:", Object.keys(winCBs).length)

  if (request && winCBs[name]) {
    //If this window is registered
    //console.log("Got window request:", request, "from:", name)
    if (!(name in repWins)) repWins[name] = ev.source; //Remember how to call this child
    winCBs[name](request, data, ev.source); //call its handler
  }
});

module.exports = {
  unique: function unique(inTag) {
    //Return a unique tag for a window, based on some base tag name such as the report name
    for (var i = 0; true; i++) {
      var winTag = inTag + ':u' + i;
      if (!(winTag in winCBs)) return winTag;
    }
  },

  mom: function mom(msg) {
    //Send a message to my parent or opener
    var to = window.opener || window.parent;
    to.postMessage(msg, location.origin);
  },

  child: function child(winTag, msg) {
    //Send a message to a report window/iframe
    if (winTag in repWins) {
      //console.log("wincom child:", winTag, msg)
      repWins[winTag].postMessage(msg, location.origin);
    }
  },

  listen: function listen(winTag, cb) {
    //Register a callack for the specified report tag
    if (cb) winCBs[winTag] = cb;else delete winCBs[winTag];
  }
};

/***/ }),

/***/ "./src/wyseman.js":
/*!************************!*\
  !*** ./src/wyseman.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Communicate with the wyseman backend, control and model layers
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
//This is one of multiple possible simultaneous front-end views
//Any GUI element can generate a request for data, for example:
//  id: A unique ID indicating the GUI element requesting the data
//  action: connect, fetch, insert, update, delete, meta, setting, etc.
//  cb: if a callback is given, we will store it until a response comes back tagged with the same action:view
//  options {
//    view: refers to a database view the action/request pertains to
//    data: other data applicable to the action: {k1: v1, k2: v2, ...}
//    stay: keep the callback registered for future actions (may be unsolicited)
//  }
//Messages from the backend will reference the original id and action, and also contains the relevant response data
// { id:id_string action: action_name, data: {k1: v1, k2: v2, ...}}
// -----------------------------------------------------------------------------
// TODO:
//- Make it so this module does not rely on wylib prefs
//- Instead initialize the object with cb to access current language
//- 
var Local = __webpack_require__(/*! ./local */ "./src/local.js");

var Wyseman = {
  address: '', //To remember node:port when we are currently connected
  sendQue: [], //Backlog of commands to send (in cases where channel is not yet available)
  handlers: {}, //Callbacks waiting for responses from the backend
  langCache: {}, //Store all language queries we have done
  metaCache: {}, //Store all table meta-data we have done
  cache: null, //Pointer to local copies of meta/language data
  pending: { meta: {}, lang: {} }, //Remember details of pending requests
  callbacks: {}, //Callbacks waiting for meta/language changes
  listens: {}, //Callbacks waiting for async messages
  localCache: {}, //Temporary cache just for calls from localStorage
  language: 'eng', //Current language

  close: function close() {
    //Close server connection from this end
    this.socket.close();
    this.notify(this.addr = '');
  },
  connect: function connect(authConfig, errorCB) {
    var _this = this;

    //Attempt to connect to backend server
    var proto = authConfig.proto,
        host = authConfig.host,
        port = authConfig.port,
        address = (proto || 'wss:') + '/' + host + ':' + port,
        query = function query() {
      //Build the URL query
      var qList = [];['user', 'db', 'token', 'pub', 'sign', 'date'].forEach(function (k) {
        if (k in authConfig) qList.push(k + '=' + authConfig[k]);
      });
      return qList.join('&');
    };
    //    if (!address) address = localStorage.siteSocket	//If no address given, default to the last used one


    if (!host || !port) return; //If still nothing to connect to, give up
    this.url = address + '/?' + query(); //Build websocket URL with username and token
    //console.log("Connect: ", this.url)
    this.socket = new WebSocket(this.url); //Try to connect

    this.socket.addEventListener('error', function (event) {
      //If we get an error connecting
      console.log("Error connecting to site:", address, event, event.error);
      _this.notify(_this.address = '');
      errorCB('conConErr');
    });

    this.socket.addEventListener('close', function (event) {
      //If the socket gets closed
      console.log("Connection closed to:", address, event);
      _this.notify(_this.address = '');
      //      errorCB('conDiscon')
    });

    this.socket.addEventListener('open', function (event) {
      //When socket is open and ready
      _this.notify(_this.address = address); //Tell everyone we're connected
      //      localStorage.setItem('siteSocket', address)	//Remember where we were connected
      //console.log("Connected to backend: " + address)

      _this.socket.addEventListener('message', function (ev) {
        //When we get packets from the backend
        var pkt = JSON.parse(ev.data); //Make it into an object
        var id = pkt.id,
            view = pkt.view,
            action = pkt.action,
            data = pkt.data,
            error = pkt.error;

        //console.log('Message from server: ', pkt, id, action, error)

        if (action == 'notify' && pkt.channel) {
          var chan = pkt.channel;
          if (_this.listens[chan]) Object.values(_this.listens[chan]).forEach(function (cb) {
            //console.log('Notify group: ', chan, data)
            cb(data); //Call any listeners
          });
        }

        if (!id || !view || !action) return; //Invalid packet

        if (data && (action == 'meta' || action == 'lang')) {
          //Special handling for meta and language data
          _this.procColumns(data); //Reorganize columns array as object
          var index = action + '~' + view; //Where we will save in local storage
          if (action == 'lang') {
            //console.log(" opt.language:", id, this.handlers[id], this.handlers[id].lang.language)
            var language = _this.handlers[id].lang.language || 'en';
            index = 'lang_' + language + '~' + view; //Save each language separately
            _this.procMessages(data); //Reorganize messages array as object
            _this.langCache[language][view] = data; //Cache language data for this view
          } else {
            //action == meta
            //console.log(" meta data:", data)
            _this.metaCache[view] = data; //Cache meta data
            _this.linkLang(view); //Can access language information from the view meta data
            if (data.styles && data.styles.subviews) data.styles.subviews.forEach(function (sv, ix) {
              //We will be needing meta data for these sub-views too
              //console.log("  meta subview:", sv)
              var svName = typeof sv == 'string' ? sv : sv.view,
                  inCache = _this.metaCache[svName];
              if (inCache) {
                data.styles.subviews.splice(ix, 1, { view: svName, lang: { title: inCache.title, help: inCache.help } });
              } else {
                _this.request(view + '~' + ix, 'meta', sv, function (dat) {
                  //console.log("   got subview meta:", dat)
                  data.styles.subviews.splice(ix, 1, { view: sv, lang: { title: dat.title, help: dat.help } });
                });
              }
            });

            //Fixme: also request language for any subordinate views
          }
          //console.log("To localStorage:", index)
          Local.set(index, data); //Save also to browser cache
          delete _this.localCache[index]; //Free up this cache, not needed now
          _this.pending[action][view] = false; //Mark pending as now complete
          setTimeout(function () {
            _this.procQueue();
          }, 50); //See if any other meta commands are queued up
        }

        if (_this.handlers[id] && _this.handlers[id][action] && _this.handlers[id][action].cb) {
          //If we have a registered handler,
          //console.log("Calling handler:", id, action, "data:", data, "error:", error)
          if (error && error.code && error.code.match(/^!\w*/)) {
            //If there is an error that needs translation
            var _error$code$slice$spl = error.code.slice(1).split('.'),
                _error$code$slice$spl2 = _slicedToArray(_error$code$slice$spl, 3),
                sch = _error$code$slice$spl2[0],
                tab = _error$code$slice$spl2[1],
                code = _error$code$slice$spl2[2],
                errView = [sch, tab].join('.'),
                cache = _this.cache.lang[errView];

            if (error) console.log("Error:", error, errView, code, cache);
            if (!cache) {
              //If we don't already have it
              _this.request('_wm_E_' + id, 'lang', { language: _this.language, view: errView }, function (d, e) {
                var cache = _this.cache.lang[errView]; //Get it and cache it
                //console.log("Now have:", error, errView, code, cache)
                if (cache.msg[code]) error.lang = cache.msg[code]; //No guaranty this language query worked (do we need to check for secondary errors?)
                _this.handlers[id][action].cb(data, error); //Execute call back
              });return;
            } else if (cache.msg[code]) {
              //We have it cached
              error.lang = cache.msg[code]; //So just provide translation
            }
          }
          _this.handlers[id][action].cb(data, error); //call back with what language info we may or may not have, will call back again (above) when we have language data
        } //handle message
      }); //message

      _this.procQueue(); //Process any queued requests
    }); //open
  },
  //connect

  procQueue: function procQueue() {
    //Process requests waiting in the queue
    //console.log('Processing queue:')
    var p = void 0,
        i = void 0,
        len = this.sendQue.length; //Handle only what is queued when we first enter this function
    for (i = 0; i < len; i++) {
      //Else we can go into a perpetual loop
      p = this.sendQue.shift();
      //console.log('  queue item:' + JSON.stringify(p) + " Len: ", this.sendQue.length)
      this.request.apply(this, _toConsumableArray(p));
    }
  },
  procColumns: function procColumns(data) {
    //Reindex columns array into column object
    if (!data) return;
    //console.log('Store meta/lang:', data)
    if (!data.columns) data.columns = [];
    if (!data.col) data.col = {}; //Make node of columns indexed by col
    data.columns.forEach(function (rec, idx) {
      data.col[rec['col']] = data.columns[idx];
    });
  },
  procMessages: function procMessages(data) {
    //Reindex messages array into message object
    if (!data) return;
    if (!data.messages) data.messages = [];
    if (!data.msg) data.msg = {}; //Make node of messages indexed by code
    var msg = data.msg;
    if (!msg.help) msg.h = {}; //Also make objects of just helps
    if (!msg.title) msg.t = {}; //and just titles
    data.messages.forEach(function (rec, idx) {
      var code = rec.code;
      //console.log("Proc msg:", code, rec)
      msg[code] = data.messages[idx];
      msg.h[code] = rec.help;
      msg.t[code] = rec.title;
    });
  },
  linkLang: function linkLang(view) {
    //Merge in table language data
    var lang = this.cache.lang[view],
        meta = this.cache.meta[view];
    if (!lang || !meta) return; //No language data...
    //console.log("LinkLang\n  lang:", lang, "  meta:", meta)
    if (!meta.msg) meta.msg = {};
    if (lang.msg) Object.assign(meta.msg, lang.msg);
    if (lang.help) meta.help = lang.help;
    if (lang.title) meta.title = lang.title;
    Object.keys(meta.col).forEach(function (key) {
      if (lang.col[key]) Object.assign(meta.col[key], lang.col[key]);
    });
    if (meta.styles && meta.styles.actions) meta.styles.actions.forEach(function (act) {
      act.lang = meta.msg[act.name];
      if (act.options) act.options.forEach(function (opt, x) {
        //Link to language for action options
        var langTag = act.name + '.' + opt.tag //Re-structure to look more like native table column data structure
        ,
            newElem = { field: opt.tag, lang: lang.msg[langTag], type: opt.type, styles: opt };
        act.options[x] = newElem;
        //console.log("  act:", act, x, act.name, newElem)
      });
    });
  },
  langDefs: function langDefs(langObj, defaults) {
    //Create a default language object from defaults
    if (!langObj) langObj = {};
    if (!langObj.h) langObj.h = {};
    if (!langObj.t) langObj.t = {};
    Object.keys(defaults).forEach(function (key) {
      langObj[key] = defaults[key];
      langObj.h[key] = defaults[key].help;
      langObj.t[key] = defaults[key].title;
    });
    //console.log('langDefs:', langObj)
    return langObj;
  },
  request: function request(id, action, opt, cb) {
    var _this2 = this;

    //Ask to receive specified information back asynchronously
    if (typeof opt === 'string') {
      opt = { view: opt };
    } //Shortcut: just give view rather than full options object
    //console.log("Request ID:", id, "Action:", action, "Opt", JSON.stringify(opt))
    var view = opt ? opt.view : null;
    if (!this.address || this.address == '') {
      //If connection not yet open
      this.sendQue.push([id, action, opt, cb]); //Queue the request for later

      if (action != 'connect') {
        var data = void 0,
            idx = action + '~' + view; //Where saved in local storage
        if (this.localCache[idx]) {
          //Did we already fetch this from local storage once?
          //console.log("From localCache:", idx, data)
          data = this.localCache[idx];
        } else {
          //Use any historic value from browser for now
          //console.log("From localStorage?:", idx, data)
          data = this.localCache[idx] = Local.get(idx);
        }
        if (data && cb) cb(data); //Call back with cached (possibly obsolete) data
      }
      return; //Nothing else we can do until connection made
    }

    //console.log("  processing: ", action, " View:", view)
    if (action == 'meta') {
      if (!this.cache.lang[view]) //Force language request before our meta data requested
        this.request('_wm_L_' + id, 'lang', { language: this.language, view: view });
    }

    if (action == 'meta' || action == 'lang') {
      if (this.cache[action][view]) {
        //If we already have this data in the cache
        //console.log("  got data from cache:", action, view, this.cache[action][view])
        if (cb) cb(this.cache[action][view]); //Use it
        return;
      } else if (this.pending[action][view]) {
        //If there is already a pending meta request for this view
        this.sendQue.push([id, action, opt, cb]); //Queue the request for later, see if the first request succeeds
        //console.log("  queuing data request:", action, view)
        return;
      }
      //console.log("  will send request: ", action, view)
      this.pending[action][view] = true; //Note a pending meta request for this view
      setTimeout(function () {
        _this2.pending[action][view] = false;
      }, 5000); //Can retry after 5 seconds and on next queue check
    }

    var hand = this.handlers;
    if (!hand[id]) hand[id] = {}; //If no handlers for this id yet
    if (!hand[id][action]) hand[id][action] = {}; //If no handler for this id, action yet
    Object.assign(hand[id][action], opt, { cb: cb }); //Remember the options from this request {view, data, stay}

    if (action == 'connect') {
      //Don't actually send a packet for connection status requests
      if (cb) cb(this.address); //Just update with our address, if anyone registered to get the callback
      return;
    }
    var msg = Object.assign({ id: id, action: action }, opt); //Construct message packet
    //console.log("Write to backend:","Data:" + JSON.stringify(msg))
    this.socket.send(JSON.stringify(msg)); //send it to the back end
  },
  //request

  notify: function notify(addr) {
    var _this3 = this;

    //Tell any registered parties about our connection status
    //console.log("Notify: " + addr + " Hands: ", this.handlers)
    Object.keys(this.handlers).forEach(function (id) {
      var tc = _this3.handlers[id].connect;
      if (tc && tc.cb) {
        tc.cb(addr);
        if (!tc.stay) delete _this3.handlers[id].connect;
      }
    });
  },
  register: function register(id, view, cb) {
    //Register to receive a call whenever view metadata updates
    if (!cb && this.callbacks[view] && this.callbacks[view][id]) {
      delete this.callbacks[view][id];
      return;
    }
    //console.log("Register:", id, view)
    if (!this.callbacks[view]) this.callbacks[view] = {};
    this.callbacks[view][id] = cb;
    this.request(id + '~' + view, 'meta', view, cb);
  },
  listen: function listen(id, chan, cb) {
    //Register to receive a call whenever asynchronous DB events happen
    if (!cb && this.listens[chan] && this.listens[chan][id]) {
      delete this.listens[chan][id];
      return;
    }
    if (!this.listens[chan]) this.listens[chan] = {};
    //console.log("Listening for:", id, chan)
    this.listens[chan][id] = cb;
  },
  newLanguage: function newLanguage(language) {
    var _this4 = this;

    //Call here if our language preference changes
    console.log("Wyseman new language:", language);
    this.language = language;
    if (!this.langCache[language]) this.langCache[language] = {};
    this.cache.lang = this.langCache[language]; //Point to stored data in the new language

    var view = 'wylib.data';
    this.request('_wyseman_' + view, 'lang', { language: language, view: view });

    Object.keys(this.cache.meta).forEach(function (view) {
      //Fetch all necessary text in new language
      _this4.request('_wyseman_' + view, 'lang', { language: language, view: view }, function (data) {
        _this4.linkLang(view);
        console.log("  got new language for:", view, data);
        Object.keys(_this4.callbacks[view]).forEach(function (id) {
          //console.log("    CB:", view, id, this.metaCache[view])
          _this4.callbacks[view][id](_this4.metaCache[view]);
        });
      });
    });
  }
};

if (!Wyseman.cache) {
  //Initialize local cache
  var lang = Wyseman.language;
  if (!Wyseman.langCache[lang]) Wyseman.langCache[lang] = {};
  Wyseman.cache = { meta: Wyseman.metaCache, lang: Wyseman.langCache[lang] };
}

module.exports = Wyseman;

/***/ }),

/***/ "base64-js":
/*!****************************!*\
  !*** external "base64-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("base64-js");

/***/ }),

/***/ "element-resize-detector":
/*!******************************************!*\
  !*** external "element-resize-detector" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("element-resize-detector");

/***/ }),

/***/ "file-saver":
/*!*****************************!*\
  !*** external "file-saver" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("file-saver");

/***/ }),

/***/ "flatpickr":
/*!****************************!*\
  !*** external "flatpickr" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("flatpickr");

/***/ }),

/***/ "ieee754":
/*!**************************!*\
  !*** external "ieee754" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ieee754");

/***/ }),

/***/ "interactjs":
/*!*****************************!*\
  !*** external "interactjs" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("interactjs");

/***/ }),

/***/ "isarray":
/*!**************************!*\
  !*** external "isarray" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),

/***/ "slickgrid-es6":
/*!********************************!*\
  !*** external "slickgrid-es6" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("slickgrid-es6");

/***/ })

/******/ });
});
//# sourceMappingURL=wylib-bundle.js.map