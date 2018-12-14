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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _connect = __webpack_require__(/*! ./connect.vue */ "./src/connect.vue");

var _connect2 = _interopRequireDefault(_connect);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _dbp = __webpack_require__(/*! ../src/dbp.vue */ "./src/dbp.vue");

var _dbp2 = _interopRequireDefault(_dbp);

var _modal = __webpack_require__(/*! ./modal.vue */ "./src/modal.vue");

var _modal2 = _interopRequireDefault(_modal);

var _win = __webpack_require__(/*! ./win.vue */ "./src/win.vue");

var _win2 = _interopRequireDefault(_win);

var _state = __webpack_require__(/*! ./state.js */ "./src/state.js");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'wylib-app',
  components: { 'wylib-connect': _connect2.default, 'wylib-button': _button2.default, 'wylib-menu': _menu2.default, 'wylib-win': _win2.default, 'wylib-modal': _modal2.default, 'wylib-dbp': _dbp2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    title: { type: String },
    help: { type: String },
    tabs: { type: Array },
    tag: { type: String },
    current: { type: String },
    tryEvery: { default: 5 },
    lang: { type: Object, default: _common2.default.langTemplate }
  },
  data: function data() {
    var _this = this;

    return {
      conMenuPosted: true,
      appMenu: { posted: false, client: {}, title: 'Application menu' },
      modal: { posted: false, dews: {}, data: {} },
      currentSite: null,
      siteTry: '',
      retryIn: null,
      menuTitle: '',
      wm: {},
      persistent: true,
      top: new _common2.default.topHandler(function (st) {
        Object.assign(_this.modal, st);
      }),
      restoreMenu: [],
      previews: [{ posted: false, client: { dbView: 'wylib.data_v' } }],
      lastLoadIdx: null
    };
  },
  provide: function provide() {
    return {
      top: this.top
    };
  },

  computed: {
    id: function id() {
      return 'app_' + this._uid + '_';
    },
    tagTitle: function tagTitle() {
      return this.tag || this.title;
    },
    tabHeight: function tabHeight() {
      return 20;
    },
    appMenuConfig: function appMenuConfig() {
      var _this2 = this;

      var wm = this.wm;
      return [{ idx: 'sav', lang: wm.appSave, icon: 'upload', call: this.saveState }, { idx: 'sas', lang: wm.appSaveAs, icon: 'upload2', call: this.saveStateAs }, { idx: 'res', lang: wm.appRestore, icon: 'download', menu: this.restoreMenu, layout: ['lang', 'owner', 'access'] }, { idx: 'def', lang: wm.appDefault, icon: 'home', call: this.defaultState }, { idx: 'edi', lang: wm.appEditState, icon: 'pencil', call: function call() {
          _this2.previews[0].posted = true;
        } }];
    }
  },
  watch: {
    currentSite: function currentSite(val, oldVal) {
      if (!val && oldVal) {
        //If connection lost
        this.conMenuPosted = true;
        this.retryConnect();
      }
    }
  },
  methods: {
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
    retryConnect: function retryConnect() {
      //console.log("retryConnect", this.current)
      if (this.currentSite) {
        this.retryIn = null;return;
      }
      if (this.retryIn == 0) _wyseman2.default.connect();
      if (!this.retryIn) {
        this.retryIn = this.tryEvery;
      } else {
        this.retryIn--;
      }
      setTimeout(this.retryConnect, 1000);
    },
    saveStateAs: function saveStateAs() {
      var _this3 = this;

      var resp = { t: 'Default' },
          dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]]);
      this.top.query(this.wm.appStatePrompt.help, dewArr, resp, function (yesNo, tag) {
        if (yesNo) _state2.default.saveas(_this3.tag, resp.t, resp.h, _this3.state, _this3.top.error, function (ruid) {
          _this3.lastLoadIdx = ruid;
        });
      });
    },
    saveState: function saveState() {
      if (this.lastLoadIdx) _state2.default.save(this.lastLoadIdx, this.state, this.top);else this.saveStateAs();
    },
    defaultState: function defaultState() {
      var _this4 = this;

      this.top.confirm(this.wm.appDefault.help, function (yesNo, tag) {
        if (yesNo) {
          _this4.persistent = false;location.reload();
        }
      });
    },
    beforeUnload: function beforeUnload() {
      //console.log("About to unload.  Saving state:", JSON.stringify(this.state))
      if (this.persistent) _common2.default.saveState(this.tagTitle, this.state);else _common2.default.clearState(this.tagTitle);
    }
  },

  created: function created() {
    var _this5 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this5.wm = data.msg;
    });
  },

  beforeMount: function beforeMount() {
    var savedState = _common2.default.getState(this.tagTitle);
    //console.log("Restoring state:", JSON.stringify(savedState))
    if (savedState) Object.assign(this.state, savedState); //Comment line for debugging from default state

    //    Com.react(this, {})
  },

  mounted: function mounted() {
    var _this6 = this;

    _wyseman2.default.request('_main', 'connect', { stay: true }, function (addr) {
      if (_this6.currentSite = addr) _this6.conMenuPosted = false;
    });
    _wyseman2.default.connect();
    window.addEventListener('beforeunload', this.beforeUnload);

    _state2.default.listen(this.id + 'sl', this.tag, function (menuData) {
      var _restoreMenu;

      //console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
      var menuItems = menuData.map(function (el) {
        return Object.assign(el, { call: function call() {
            Object.assign(_this6.state, el.data);
            _this6.lastLoadIdx = el.idx;
          } });
      });
      (_restoreMenu = _this6.restoreMenu).splice.apply(_restoreMenu, [0, _this6.restoreMenu.length].concat(_toConsumableArray(menuItems)));
    }, this.top.error);
  },

  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnload);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************/
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

var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");

exports.default = {
  name: 'wylib-button',
  props: {
    icon: String,
    color: String,
    hoverColor: String,
    activeColor: String,
    fill: String,
    stroke: String,
    toggled: Boolean,
    disabled: { type: Boolean, default: false },
    size: { type: Number, default: 20 }
  },
  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      isHover: false,
      isActive: false
    };
  },

  methods: {
    mouseEnter: function mouseEnter(ev) {
      if (this.disabled) return;this.isHover = true;this.$emit('mouseenter', ev);
    },
    mouseLeave: function mouseLeave(ev) {
      if (this.disabled) return;this.isHover = false;this.$emit('mouseenter', ev);
    },
    mouseDown: function mouseDown(ev) {
      if (this.disabled) return;this.isActive = true;this.$emit('mousedown', ev);
    },
    mouseUp: function mouseUp(ev) {
      if (this.disabled) return;this.isActive = false;this.$emit('mouseup', ev);
    },
    click: function click(ev) {
      if (this.disabled) return;this.$emit('click', ev);
    }
  },
  computed: {
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
        width: (this.size || this.pr.butSize) + 'px',
        height: (this.size || this.pr.butSize) + 'px',
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    siteKey: { type: String, default: 'wylib_sites' },
    default: { type: String, default: '' },
    port: { type: Number, default: 54320 }
  },
  data: function data() {
    return {
      newSite: this.default,
      sites: []
    };
  },

  watch: {
    default: function _default(val) {
      this.newSite = this.default;
    }
  },
  methods: {
    connectSite: function connectSite(addr) {
      //Force connection to a specified site
      //console.log("Connecting to: " + addr)
      _wyseman2.default.connect(addr);
    },
    addSite: function addSite(addr) {
      //Add favorite site to our list
      //console.log("Add: " + addr)
      if (addr != '' && (this.sites.length == 0 || this.sites.indexOf(addr) < 0)) this.sites.push(addr);
      localStorage.setItem(this.siteKey, JSON.stringify(this.sites));
    },
    removeSite: function removeSite(addr) {
      //Remove site from our favorites list
      //console.log("Remove: " + addr)
      this.sites.splice(this.sites.indexOf(addr), 1);
      localStorage.setItem(this.siteKey, JSON.stringify(this.sites));
    }
  },

  mounted: function mounted() {
    //When this GUI element is activated
    //console.log("Mounted:", this.sites)
    this.$nextTick(function () {
      if (localStorage[this.siteKey]) //Get our list of favorites
        this.sites = JSON.parse(localStorage.getItem(this.siteKey));

      var suggested = window.location.hostname + ":" + this.port;
      if (this.sites.length == 0 || this.sites.indexOf(suggested) < 0) this.newSite = suggested; //Offer a resonable default to connect to
      //console.log("newSite:", this.newSite)
    });
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");

var _bus2 = _interopRequireDefault(_bus);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

var _mdew = __webpack_require__(/*! ./mdew.vue */ "./src/mdew.vue");

var _mdew2 = _interopRequireDefault(_mdew);

var _menudock = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue");

var _menudock2 = _interopRequireDefault(_menudock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'wylib-dbe',
  components: { 'wylib-mdew': _mdew2.default, 'wylib-menudock': _menudock2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    bus: null
  },
  inject: ['top'],
  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      wm: {},
      viewMeta: null,
      dbData: {}, //Data as fetched from the database
      dirty: false,
      valid: false,
      msgBus: new _bus2.default.messageBus(this)
    };
  },


  computed: {
    id: function id() {
      return 'dbe_' + this._uid + '_';
    },
    actMenu: function actMenu() {
      var _this = this;

      var acts = [];
      //console.log("actMenu:", this.viewMeta.ui)
      if (this.viewMeta && this.viewMeta.ui) this.viewMeta.ui.actions.forEach(function (act) {
        acts.push({ idx: act, lang: _this.viewMeta.msg[act] || { title: act }, call: function call() {
            _this.perform(act);
          } });
      });
      return acts;
    },
    subMenu: function subMenu() {
      var _this2 = this;

      var subs = [];
      if (this.viewMeta && this.viewMeta.ui) this.viewMeta.ui.subs.forEach(function (sub) {
        subs.push({ idx: sub, lang: _this2.viewMeta.msg[sub] || { title: sub }, call: function call() {
            _this2.preview(sub);
          } });
      });
      return subs;
    },
    dockConfig: function dockConfig() {
      return [{ idx: 'act', lang: this.wm.dbeActions, menu: this.actMenu, icon: 'wand' }, { idx: 'sub', lang: this.wm.dbeSubords, menu: this.subMenu, icon: 'table' }, { idx: 'adr', lang: this.wm.dbeInsert, call: this.insert, icon: 'upload', shortcut: true, disabled: !this.valid }, { idx: 'upd', lang: this.wm.dbeUpdate, call: this.update, icon: 'floppy', shortcut: true, disabled: !this.dirty || !this.valid }, { idx: 'del', lang: this.wm.dbeDelete, call: this.delete, icon: 'bin', disabled: !!this.state.key }, { idx: 'clr', lang: this.wm.dbeClear, call: this.clear, icon: 'sun', shortcut: true }, { idx: 'ldr', lang: this.wm.dbeLoadRec, call: this.loadRec, icon: 'target' }, { idx: 'pre', lang: this.wm.dbePreview, call: this.docPrev, icon: 'filetext', shortcut: true }];
    },
    headerHeight: function headerHeight() {
      return this.pr.winFullHeader - 1; //Fit in parent header, plus top border
    },
    keyEntSize: function keyEntSize() {
      var len = 4;
      if (this.state.key) len = this.state.key.join(',').length;
      if (len > 16) len = 16;
      return len;
    }
  },

  methods: {
    loadRec: function loadRec() {
      var resp = { q: null };
      this.top().query(this.wm.dbeLoadPrompt.help, this.top().dewArray('q', this.wm.dbeRecordID), resp, function (yes) {
        console.log("Load record:", yes, resp.q);
      });
    },
    keyWhere: function keyWhere() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.key;
      //Return an object with the where clause to identify this record
      var whereObj = {};
      this.viewMeta.pkey.forEach(function (fld, i) {
        whereObj[fld] = key[i];
      });
      //console.log("Where:", whereObj)
      return whereObj;
    },
    load: function load(key) {
      var _this3 = this;

      //console.log("Key:", this.state.key)
      this.dirty = false;
      this.valid = true;
      this.dataRequest('tuple', { where: this.keyWhere(key), fields: '*' }, false, function () {
        _this3.state.key = key;
      });
    },
    insert: function insert() {
      var _this4 = this;

      var fields = Object.assign({}, this.dbData, this.$refs.mdew.userData);
      console.log("Insert:", fields);
      this.state.dews.fields.forEach(function (fld, idx) {
        //Remove any fields that shouldn't get written to the DB
        //console.log(  "field:", fld.field, fld.styles.write, !fld.styles.write || fld.styles.write==0)
        if (fld.styles && 'write' in fld.styles && (!fld.styles.write || fld.styles.write == 0)) {
          //console.log(  "deleting", fld.field)
          delete fields[fld.field];
        }
      });
      console.log("insert:", fields);
      this.dataRequest('insert', { fields: fields }, true, function (data) {
        var keyVal = [];_this4.viewMeta.pkey.forEach(function (fld) {
          keyVal.push(data[fld]);
        });
        _this4.state.key = keyVal;
      });
    },
    update: function update() {
      var fields = this.$refs.mdew.userData;
      console.log("Update:", this.dbData, fields);
      this.dataRequest('update', { fields: fields, where: this.keyWhere() });
    },
    delete: function _delete() {
      var _this5 = this;

      console.log("Delete");
      this.dataRequest('delete', { where: this.keyWhere() }, true, function () {
        _this5.state.key = null;
      });
      //console.log(" after delete:", this.dbData)
    },
    clear: function clear() {
      var _this6 = this;

      var answers = this.msgBus.notify('clear')[0];
      //console.log("Clear", answers)
      answers.forEach(function (el, ix) {
        var value = void 0,
            field = void 0;

        //console.log("Dbe clear:", field, value, this.dirty, this.valid)
        var _el = _slicedToArray(el, 4);

        value = _el[0];
        field = _el[1];
        _this6.dirty = _el[2];
        _this6.valid = _el[3];
        _this6.dbData[field] = value;
      });
      this.top().posted(); //Act like we just posted
    },
    change: function change(value, field, dirty, valid) {
      //Respond to changes on the data inputs
      this.dirty = dirty;
      this.valid = valid;
      //console.log("Dbe input:", field, value, dirty, valid)
    },
    dataRequest: function dataRequest(action, options) {
      var _this7 = this;

      var modifies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var cb = arguments[3];

      //console.log("Dbe dataRequest:", action, options)
      _wyseman2.default.request(this.id + 'dr', action, Object.assign({ view: this.state.dbView }, options), function (data, err) {
        //console.log("   data:", err, data)
        if (err) _this7.top().error(err);else {
          if (data) _this7.dbData = data; //If a record was returned
          if (modifies) _this7.$emit('modified', data); //Tell parent dbp to update
          if (cb) cb(data);
        }
      });
    },
    docPrev: function docPrev() {
      _common2.default.docView(this.state.dbView);
    },
    mdewLayout: function mdewLayout() {
      var _this8 = this;

      //Make the column description format mdew is looking for
      var fieldArray = [];
      if (this.viewMeta) this.viewMeta.columns.forEach(function (meta) {
        //console.log("Col:", meta.col, " Meta:", meta.styles, meta.values)
        var stateElem = _this8.state.dews.fields.find(function (e) {
          return e.field == meta.col;
        });
        if (!stateElem) stateElem = {
          field: meta.col,
          lang: { title: meta.title || meta.col, help: meta.title + ' (' + meta.col + '):\n' + meta.help },
          styles: meta.styles,
          values: meta.values
          //console.log("Col:", meta.col, JSON.stringify(stateElem))
        };fieldArray.push(stateElem);
      });
      return fieldArray;
    },
    perform: function perform(act) {
      console.log("Perform action:", act);
    },
    preview: function preview(sub) {
      console.log("Open preview:", sub);
    }
  },

  watch: {
    //    'state.key': function(key) {
    //console.log("Watched key changed:", key)
    //      if (key && key.length > 0) this.load(key); else this.dbData = {}
    //    },
    'state.dbView': function stateDbView() {
      var _this9 = this;

      //If we change our view, reset data, columns
      this.recData = [];
      this.viewMeta = null;
      _wyseman2.default.request(this.id + 'xm', 'meta', this.state.dbView, function (data) {
        _this9.viewMeta = data;
      });
    },
    viewMeta: function viewMeta() {
      this.state.dews.fields = this.mdewLayout();
    }
  },

  created: function created() {
    var _this10 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this10.wm = data.msg;
    });
    if (this.state.dbView) _wyseman2.default.register(this.id + 'cv', this.state.dbView, function (data) {
      _this10.viewMeta = data;
    });
  },

  beforeMount: function beforeMount() {
    var _this11 = this;

    //console.log("Dbe before, state: ", this.state);
    _common2.default.react(this, { dock: {}, dbView: '', key: [], dews: { fields: [] } });
    if (this.bus) this.bus.register(this.id, function (msg, data) {
      //console.log("Dbe bus message: ", msg, data);
      if (msg == 'load') return _this11.load(data);
    });
  },

  mounted: function mounted() {
    //console.log("Dbe refs: ", this.$refs);
    this.$parent.$emit('swallow', this.$refs['headMenu'], this.$refs['headStatus']);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");

var _bus2 = _interopRequireDefault(_bus);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _menudock = __webpack_require__(/*! ./menudock.vue */ "./src/menudock.vue");

var _menudock2 = _interopRequireDefault(_menudock);

var _mlb = __webpack_require__(/*! ./mlb.vue */ "./src/mlb.vue");

var _mlb2 = _interopRequireDefault(_mlb);

var _dbs = __webpack_require__(/*! ./dbs.vue */ "./src/dbs.vue");

var _dbs2 = _interopRequireDefault(_dbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'wylib-dbp',
  components: { 'wylib-mlb': _mlb2.default, 'wylib-menudock': _menudock2.default, 'wylib-menu': _menu2.default, 'wylib-dbs': _dbs2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    autoEdit: { type: Boolean, default: true }
  },
  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      wm: {},
      viewMeta: null,
      gridData: [],
      lastMenu: null,
      mlbBus: new _bus2.default.messageBus(this),
      dbeBus: new _bus2.default.messageBus(this),
      lastSpec: {}
    };
  },

  inject: ['top'],
  computed: {
    id: function id() {
      return 'dbp_' + this._uid + '_';
    },
    editLang: function editLang() {
      return { title: (this.wm.dbe ? this.wm.dbe.title : null) + ':' + this.state.dbView, help: (this.wm.dbe ? this.wm.dbe.help : null) + ': ' + this.state.dbView };
    },
    logicFields: function logicFields() {
      var flds = [];
      this.state.grid.columns.forEach(function (col) {
        flds.push({ tag: col.field, title: col.title, help: col.help });
      });
      return flds;
    },
    dockConfig: function dockConfig() {
      var _this = this;

      return [{ idx: 'lod', lang: this.wm.dbpLoad, call: function call(ev) {
          return _this.load();
        }, icon: 'download', shortcut: false }, { idx: 'rld', lang: this.wm.dbpReload, call: function call(ev) {
          return _this.reload();
        }, icon: 'spinner', shortcut: true }, { idx: 'all', lang: this.wm.dbpLoadAll, call: this.loadAll, icon: 'download2', shortcut: false }, { idx: 'fil', lang: this.wm.dbpFilter, call: this.loadBy, icon: 'filter', shortcut: true, toggled: this.state.filter.posted }, { idx: 'edi', lang: this.wm.dbe, call: this.editTog, icon: 'pencil', shortcut: true, toggled: this.state.edit.posted }, { idx: 'prv', lang: this.wm.dbpPrev, call: this.prev, icon: 'arrowup', shortcut: true }, { idx: 'nxt', lang: this.wm.dbpNext, call: this.next, icon: 'arrowdown', shortcut: true }, { idx: 'dec', lang: this.wm.dbpDefault, call: this.defColumns, icon: 'sun' }, { idx: 'tst', lang: { title: 'Test', help: 'XYZ!' }, call: this.test, icon: 'cirdot' }, { idx: 'cvi', lang: this.wm.dbpVisible, icon: 'eye', menu: [{ idx: 'c1', lang: this.wm.dbpVisCheck, input: 'checkbox' }, { idx: 'c2', lang: this.wm.dbpVisCheck, input: 'checkbox' }, { idx: 'c3', lang: this.wm.dbpVisCheck, input: 'checkbox' }, { idx: 'c4', lang: this.wm.dbpVisCheck, input: 'checkbox' }] }];
    },
    colMenuConfig: function colMenuConfig() {
      return [{ idx: 'siz', lang: this.wm.dbpColAuto, call: this.autoSize, icon: 'circle' }, { idx: 'hid', lang: this.wm.dbpColHide, call: this.hideColumn, icon: 'circle' }];
    },
    headerHeight: function headerHeight() {
      return this.pr.winFullHeader - 1; //Fit in parent header, plus top border
    }
  },

  watch: {
    'state.dbView': function stateDbView(newVal, oldVal) {
      var _this2 = this;

      //If we change our view, reset data, columns
      console.log("Dbp dbView changed!");
      this.gridData = [];
      this.viewMeta = null;
      var zid = this.id + 'cv'; //Must be the same as in created:
      if (oldVal) _wyseman2.default.register(zid, oldVal); //Un-register
      if (newVal) _wyseman2.default.register(zid, newVal, function (data) {
        _this2.viewMeta = data;
      });
    },
    viewMeta: function viewMeta(newVal, oldVal) {
      console.log("viewMeta updated");
      this.state.grid.columns = this.mlbLayout();
    },
    gridData: function gridData() {
      this.state.loaded = this.gridData && this.gridData.length > 0;
    }

    //    'state.loaded': function() {
    //console.log("Loaded changed!")
    //      this.$nextTick(() => {if (this.state.loaded) this.reload(); else this.clear();})
    //    }
  },

  methods: {
    mlbLayout: function mlbLayout() {
      var _this3 = this;

      //Make the column description format mlb is looking for
      var colArray = [];
      //console.log("updateGrid:", this.state.grid.columns, this.viewMeta.col)
      if (this.viewMeta) this.viewMeta.columns.forEach(function (meta) {
        //For each column element
        var stateElem = _this3.state.grid.columns.find(function (e) {
          return e.field == meta.col;
        }),
            maxWidth = void 0;
        if (meta.styles && 'size' in meta.styles && meta.styles.size) {
          maxWidth = meta.styles.size.split(' ')[0] * _this3.pr.mlbCharWidth;
        }
        //console.log("Col:", this.state.dbView, meta.col, maxWidth, "Styles:", meta.styles)
        if (!stateElem) stateElem = {
          field: meta.col,
          order: parseInt(meta.styles.display || 9999),
          visible: 'display' in meta.styles ? !!meta.styles.display : false,
          width: maxWidth && maxWidth < _this3.pr.mlbDefWidth ? maxWidth : _this3.pr.mlbDefWidth,
          title: meta.title || meta.col,
          just: meta.type.match(/(int|float)[0-9]/) ? 'right' : 'left',
          help: meta.help
          //console.log(" col:", meta.col, stateElem)
        };colArray.push(stateElem);
      });
      //console.log("colArray:", JSON.stringify(colArray))
      return colArray;
    },
    editTog: function editTog(ev) {
      //Toggle the editing window
      this.state.edit.posted = !this.state.edit.posted;
      if (this.state.edit.posted) this.executeRows(this.$refs.mlb.getSelection());
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
      //console.log("Execute rows: ", selection, this.viewMeta.pkey)
      if (!selection || selection.length <= 0) return;
      var idx = selection[0],
          row = this.gridData[idx],
          keyVal = [];
      this.viewMeta.pkey.forEach(function (fld) {
        keyVal.push(row[fld]);
      });
      //console.log("   row: ", row, keyVal)
      if (this.autoEdit) {
        this.state.edit.posted = true;
        this.dbeBus.notify('load', keyVal);
      } else this.$emit('execute', row, this.viewMeta.pkey, keyVal);
    },
    load: function load(spec) {
      var _this4 = this;

      //console.log("Dbp load:", spec)
      _wyseman2.default.request('dbp_' + this._uid, 'select', Object.assign({ view: this.state.dbView, fields: '*' }, spec), function (data, err) {
        //console.log("  data:", data)
        if (err) _this4.top().error(err);else _this4.gridData = data;
      });
      this.lastSpec = spec;
    },
    reload: function reload(spec) {
      this.load(Object.assign(this.lastSpec, spec));
    },
    loadAll: function loadAll(ev) {
      this.load({ where: null });
    },
    clear: function clear() {
      this.gridData = [];
    },
    //Fixme: Should dbe also get cleared or not?

    modified: function modified(data) {
      this.reload();
    },
    //On signal from dbe
    sort: function sort(cols) {
      this.reload({ order: cols.reverse() });
    },
    search: function search(where) {
      this.reload({ where: where });
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
      var _this5 = this;

      var col = this.state.grid.columns.find(function (e) {
        return e.field == _this5.lastMenu;
      });
      console.log("Auto size:", this.lastMenu, "Col:", col);
      //    Fixme: call slickgrid autosize function?
    },
    defColumns: function defColumns(ev) {
      console.log("Not yet implemented");
    },
    test: function test() {
      this.top().confirm('A test message', function (yesno, tag) {
        console.log("Modal answers:", yesno, tag);
      });
    },
    geometry: function geometry(ev) {
      console.log("Geometry changed:", top, ev);
      this.top().emit('geometry', ev);
    },
    hideCol: function hideCol() {
      var _this6 = this;

      var col = this.state.grid.columns.find(function (e) {
        return e.field == _this6.lastMenu;
      });
      console.log("Hide Column:", this.lastMenu, "Col:", col);
      col.visible = false;
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-dbe'] = __webpack_require__(/*! ./dbe.vue */ "./src/dbe.vue").default;
    this.$options.components['wylib-win'] = __webpack_require__(/*! ./win.vue */ "./src/win.vue").default;
  },

  created: function created() {
    var _this7 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this7.wm = data.msg;
    });
    if (this.state.dbView) _wyseman2.default.register(this.id + 'cv', this.state.dbView, function (data) {
      //console.log("Dbp got new metadata:", data.help)
      _this7.viewMeta = data;
    }); //Fixme: what is this doing?
  },

  beforeMount: function beforeMount() {
    //console.log("Dbp before, state: ", this.state);
    _common2.default.react(this, {
      dock: {},
      loaded: true, lastLoad: {}, colMenu: { x: 100, y: 0 },
      edit: { x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: this.pr.winInitHeight, client: { dbView: this.state.dbView } },
      filter: { x: this.pr.winSubWindowX, y: this.pr.winSubWindowY, height: 120, client: {} },
      grid: { footerOn: false, sorting: {}, columns: [] }
    });
  },

  mounted: function mounted() {
    var _this8 = this;

    this.$parent.$emit('swallow', this.$refs['header']);
    if (this.state.loaded) {
      //Better handled here or in watch?
      console.log('Was loaded, reloading');
      this.$nextTick(function () {
        _this8.reload();
      }); //If state says we had data loaded, reload now
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _loglist = __webpack_require__(/*! ./loglist.vue */ "./src/loglist.vue");

var _loglist2 = _interopRequireDefault(_loglist);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

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
//
//
//
//

exports.default = {
  name: 'wylib-dbs',
  components: { 'wylib-loglist': _loglist2.default, 'wylib-menudock': _menudock2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    fields: { type: Array }
  },

  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      wm: {},
      viewMeta: null,
      viewLang: null,
      dbData: [],
      operators: [{ tag: '=', title: '=', help: 'The left and right are the same value' }, { tag: '<', title: '<', help: 'The left value compares less than the right value' }, { tag: '<=', title: '<=', help: 'The left value compares less than or equal to the right value' }, { tag: '>', title: '>', help: 'The left value compares more than the right value' }, { tag: '>=', title: '>=', help: 'The left value compares more than or equal to the right value' }, { tag: '!=', title: 'Not =', help: 'The left and right side have different values' }, { tag: '~', title: '~', help: 'The left side matches the regular expression given on the right' }, { tag: 'in', title: 'In', help: 'The left value exists in a list or array expressed on the right side' }]
    };
  },


  computed: { //Fixme: get langauge from wyseman/db
    id: function id() {
      return 'dbp_' + this._uid + '_';
    },
    logicConfig: function logicConfig() {
      //console.log("logicConf:", this.fields)
      return { left: this.fields, oper: this.operators, right: this.fields };
    },
    dockConfig: function dockConfig() {
      return [{ idx: 'sch', lang: this.wm.dbsSearch, call: this.search, icon: 'wand', shortcut: true }];
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
    save: function save() {
      //console.log("Dbs save (not implemented)")
    },
    recall: function recall() {
      //console.log("Dbs recall (not implemented)")
    },
    geometry: function geometry(vm) {//Fixme: auto adjust parent geometry?
      //console.log("Dbs check geometry", vm.$el.getBoundingClientRect())
    }
  },

  created: function created() {
    var _this = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this.wm = data.msg;
    });
  },

  beforeMount: function beforeMount() {
    _common2.default.react(this, { logic: { and: true, items: [{ left: null, oper: '=' }] }, dock: {} });
  },

  mounted: function mounted() {
    this.$parent.$emit('swallow', this.$refs['header']);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _indate = __webpack_require__(/*! ./indate.vue */ "./src/indate.vue");

var _indate2 = _interopRequireDefault(_indate);

var _date = __webpack_require__(/*! ./date.js */ "./src/date.js");

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'wylib-dew',
  components: { 'wylib-indate': _indate2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } }, //Configuration
    lang: { type: Object },
    value: { default: null }, //value to compare dirty to
    values: { type: Array, default: function _default() {
        return [];
      } }, //valid values for select
    field: { default: null }, //column or field code
    bus: null //message bus from parent
  },
  inject: ['top'],
  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      userValue: this.value, //Value, as modified by user
      datePicker: null
    };
  },


  computed: {
    disabled: function disabled() {
      //No user data entry, just for looking at
      return this.state.style == 'inf' || this.state.state == 'readonly' || this.state.hide;
    },
    dirty: function dirty() {
      //The user has changed the value
      var dirty = this.userValue != this.value;
      //console.log("dirty:", this.field, this.value, this.userValue, dirty)
      return dirty;
    },
    valid: function valid() {
      //The value matches the specified template pattern or seems otherwise valid, given the field type
      //console.log("Valid:", this.field, this.userValue, this.state.template)
      var isValid = false;
      if (this.state.style == 'chk' || this.state.style == 'inf') {
        isValid = true;
      } else if (this.state.style == 'pdm') {
        //console.log(' values:', this.userValues ? this.values.map(e=>(e.value)) : null)
        isValid = this.values ? this.values.map(function (e) {
          return e.value;
        }).includes(this.userValue || '') : true;
      } else if (!this.state.template) {
        isValid = true;
      } else if (RegExp(this.state.template).test(this.userValue)) {
        isValid = true;
      }
      return isValid;
    },
    genStyle: function genStyle() {
      return { //Generate style, based on data state
        borderLeftColor: this.disabled ? this.pr.dataBackground : this.valid ? this.pr.dewBorderColor : this.pr.dewInvalidColor,
        borderRightColor: this.disabled || !this.dirty ? this.pr.dewBorderColor : this.pr.dewDirtyColor,
        background: 'background' in this.state ? this.state.background : this.pr.dataBackground,
        borderLeftWidth: this.pr.dewFlagWidth + 'px',
        borderRightWidth: this.pr.dewFlagWidth + 'px',
        borderColor: this.disabled ? this.pr.dataBackground : this.pr.dewBorderColor
      };
    },

    height: function height() {
      //console.log("Height:", this.state.size)
      return this.state.size.split(' ')[1] || this.pr.dewDefHeight || 2;
    },
    width: function width() {
      //console.log("Width:", this.state.size)
      return this.state.size.split(' ')[0] || this.pr.dewDefWidth || 40;
    }
  },

  watch: {
    value: function value(val) {
      this.userValue = val;
      //console.log("Watched value:", this.field, val, this.userValue)
    }
  },

  methods: {
    input: function input(ev) {
      this.changed(ev.target.value);
    },
    submit: function submit(ev) {
      this.$emit('submit');
    },
    changed: function changed(val) {
      //console.log("Dew input:", this.field, val)
      this.userValue = val;
      this.$emit('input', val, this.field, this.dirty, this.valid);
    },
    focus: function focus() {
      //Focus cursor on this entry field
      //console.log("Focusing:", this.$refs, this.field)
      this.$refs.input.focus();
    },
    set: function set(val) {
      return [this.userValue = val, this.field, this.dirty, this.valid];
    },
    clear: function clear() {
      return this.set(this.state.initial);
    }
    //    init() {return this.set(this.value)},

  },

  beforeMount: function beforeMount() {
    var _this = this;

    //console.log("Dew state:", this.field, JSON.stringify(this.state))
    _common2.default.react(this, { style: 'ent', size: null, state: null, template: null, special: {} });

    if (!('initial' in this.state)) this.state.initial = null;
    //console.log(" Refs:", this.field, this.state.initial, JSON.stringify(this.$refs))

    if (this.bus) this.bus.register(this.field, function (msg, data) {
      //console.log('dew', this.field, 'got bus message:', msg, data)
      if (msg == 'clear') return _this.clear();else if (msg == 'set') return _this.set(data);
      //      else if (msg == 'init') return this.init(data)
    });
  },

  mounted: function mounted() {
    var _this2 = this;

    //console.log(" refs:", this.field, this.state.initial, JSON.stringify(this.$refs))
    if (this.state.special == 'cal') this.datePicker = new _date2.default(this.$refs.input);
    if (this.state.focus && this.top) this.top().onPosted(function () {
      _this2.focus();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.datePicker) this.datePicker.destroy();
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/indate.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/indate.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flatpickr = __webpack_require__(/*! flatpickr */ "flatpickr");

var _flatpickr2 = _interopRequireDefault(_flatpickr);

__webpack_require__(/*! ../node_modules/flatpickr/dist/themes/light.css */ "./node_modules/flatpickr/dist/themes/light.css");

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
    this.picker = (0, _flatpickr2.default)('.date', {
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

var _interactjs = __webpack_require__(/*! interactjs */ "interactjs");

var _interactjs2 = _interopRequireDefault(_interactjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragTarget = null; //Communicate with each other about drag/drop through this

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'wylib-logitem',
  components: { 'wylib-button': _button2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    config: Object,
    index: Number
  },
  data: function data() {
    return {
      dragOver: false,
      pr: __webpack_require__(/*! ./prefs.js */ "./src/prefs.js"),
      wm: {}
    };
  },

  computed: {
    id: function id() {
      return 'lit_' + this._uid + '_';
    },
    rhValue: function rhValue() {
      return this.state.right == "_";
    },
    background: function background() {
      return this.dragOver ? this.pr.dragOverBackground : this.pr.titleBackground;
    }
  },
  methods: {
    wMsg: function wMsg(msg) {
      var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'help';
      return this.wm[msg] ? this.wm[msg][sub] : null;
    },
    submit: function submit(ev) {
      this.$emit('submit');
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
  created: function created() {
    var _this2 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this2.wm = data.msg;
    });
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.$emit('geometry', _this3);
    });
    //console.log("LogItem state: ", JSON.stringify(this.state))
    //console.log("       config: ", JSON.stringify(this.config))
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

var _logitem = __webpack_require__(/*! ./logitem.vue */ "./src/logitem.vue");

var _logitem2 = _interopRequireDefault(_logitem);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

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

exports.default = {
  name: 'wylib-loglist',
  components: { 'wylib-logitem': _logitem2.default, 'wylib-button': _button2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    config: Object,
    index: Number,
    defOper: { type: String, default: '=' }
  },

  data: function data() {
    return {
      isAnd: true,
      childYs: [],
      wm: {}
    };
  },


  computed: {
    joinFunction: function joinFunction() {
      return this.state.and ? 'And' : 'Or';
    }
  },

  methods: {
    wMsg: function wMsg(msg) {
      var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'help';
      return this.wm[msg] ? this.wm[msg][sub] : null;
    },
    addNew: function addNew() {
      this.state.items.push({ left: null, oper: this.defOper });
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

  watch: {
    state: function state() {
      //console.log("LogList state: ", JSON.stringify(this.state))
    }
  },

  beforeUpdated: function beforeUpdated() {
    this.conPath = "M 0 0"; //Start to build connector pathway
    this.childPaths = 0;
    this.conLastY = 0;
  },
  updated: function updated() {
    //console.log("Updated:", this.index)
    this.$emit('geometry', this, true);
  },
  created: function created() {
    var _this2 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this2.wm = data.msg;
    });
  },
  beforeMount: function beforeMount() {
    _common2.default.react(this, { and: true, items: [] });
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.$emit('geometry', _this3, true);
    });
    //console.log("LogList state: ", JSON.stringify(this.state))
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");

var _bus2 = _interopRequireDefault(_bus);

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
//
//
//
//
//
//
//
//

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
    bus: null,
    height: { type: Number, default: 300 } //Fixme: used?
  },
  data: function data() {
    return {
      valid: null,
      dirtys: {},
      userData: {},
      dewBus: new _bus2.default.messageBus(this)
    };
  },


  computed: {
    id: function id() {
      return 'mdew_' + this._uid + '_';
    },
    dirty: function dirty() {
      return Object.values(this.dirtys).every(function (v) {
        return v;
      });
    }
  },

  methods: {
    submit: function submit(ev) {
      this.$emit('submit');
    },
    input: function input(value, field, dirty, valid) {
      //An input has been changed
      this.$set(this.dirtys, field, dirty);
      this.valid = valid;
      this.userData[field] = value;
      //console.log("Mdew input:", field, value, dirty, valid, this.dirty)
      this.$emit('input', value, field, this.dirty, valid);
    }
  },

  beforeMount: function beforeMount() {
    var _this = this;

    _common2.default.react(this, { fields: [] });
    if (this.bus) this.bus.register(this.id, function (msg, data) {
      return _this.dewBus.notify(msg, data); //Pass down to children
    });
    //console.log("Mdew before:", this.id, this.state, this.data)
  }
  //  mounted: function() {
  //  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");
//import Win from './win.vue'		//Recursive, so defined in beforeCreate

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'wylib-menu',
  //components: {'wylib-win': Win}
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    layout: { type: Array, default: function _default() {
        return ['icon', 'lang', 'input'];
      } },
    config: Array
  },
  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js")
    };
  },

  computed: {},
  methods: {
    iconSvg: function iconSvg(icon) {
      return Icons(icon);
    },
    enterItem: function enterItem(ev, item) {
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
        if (theSub.x == null || theSub.y == null) {
          //If this is the first time posted
          //console.log("Refs:", this.$refs)
          var itemBBox = ev.target.getBoundingClientRect(),
              menuBBox = ev.target.closest('.wylib-menu').getBoundingClientRect(),
              viewWidth = window.innerWidth || document.documentElement.clientWidth,
              rightGap = viewWidth - (menuBBox.x + menuBBox.width),
              subComp = this.$refs.submenu.find(function (cur) {
            return cur.state == theSub;
          }),
              subElem = subComp ? subComp.$el : null,
              subBBox = subElem ? subElem.getBoundingClientRect() : null,
              subWidth = subBBox ? subBBox.width : 200;
          //console.log("Posting sub:", theSub.x, theSub.y, "Item:",itemBBox, "Menu:",menuBBox, viewWidth, "Comp:", subComp, "Elem:", subElem)
          theSub.y = itemBBox.y - menuBBox.y - itemBBox.height; //Place the menu relevant to the invoking menu item
          theSub.x = rightGap < subWidth ? -(menuBBox.width + subWidth) : 0;
        }
      }
      //console.log("  Posted: ", theSub)
    },
    execute: function execute(cb) {
      //Execute the specified callback
      this.$emit('done');
      if (cb) cb();
    }
  },

  beforeCreate: function beforeCreate() {
    this.$options.components['wylib-win'] = __webpack_require__(/*! ./win.vue */ "./src/win.vue").default;
  },

  created: function created() {
    var _this = this;

    _common2.default.react(this, { subs: {} });
    //console.log("Menu state: ", JSON.stringify(this.state))

    this.config.forEach(function (item, x) {
      //Set any object properties that are not known until now
      if (item.menu && !_this.state.subs[item.idx]) {
        _this.$set(_this.state.subs, item.idx, { posted: false, pinned: false, x: null, y: null, client: {} });
        //console.log("Set default for: ", item.idx, "State:", this.state.subs[item.idx])
      }
    });
  },

  mounted: function mounted() {
    //console.log("Menu components: " + JSON.stringify(this.$options.components))
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

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

exports.default = {
  name: 'wylib-menudock',
  components: { 'wylib-win': _win2.default, 'wylib-menu': _menu2.default, 'wylib-button': _button2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    lang: { type: Object, default: _common2.default.langTemplate },
    config: Array,
    height: { type: Number, default: 18 }
  },

  beforeMount: function beforeMount() {
    //console.log("MenuDock:", JSON.stringify(this.config))
    _common2.default.react(this, { menu: { client: {} } });
  },
  mounted: function mounted() {}
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _slickgridEs = __webpack_require__(/*! slickgrid-es6 */ "slickgrid-es6");

var _elementResizeDetector = __webpack_require__(/*! element-resize-detector */ "element-resize-detector");

var _elementResizeDetector2 = _interopRequireDefault(_elementResizeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elementResize = (0, _elementResizeDetector2.default)({ strategy: 'scroll' }); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var options = {
  enableCellNavigation: true,
  enableColumnReorder: true,
  multiColumnSort: true,
  syncColumnCellResize: true,
  createFooterRow: true,
  showFooterRow: false, //Fixme: https://github.com/6pac/SlickGrid/blob/master/examples/example-footer-totals.html
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
    bus: null
  },
  data: function data() {
    return {
      orderBoxes: {}, //Div elements that show sort order in header field
      gridInstance: null
    };
  },

  computed: {
    id: function id() {
      return 'mlb_' + this._uid + '_';
    }
  },

  methods: {
    slickColumns: function slickColumns() {
      //Convert wylib column spec to what slickgrid expects
      var cols = [];
      var sorted = this.state.columns.slice(0); //Make a copy
      sorted.sort(function (a, b) {
        return a.order - b.order;
      });
      //console.log("Sorted cols:", sorted)
      sorted.forEach(function (elem) {
        if ('visible' in elem && !elem.visible) return;
        //console.log("Sort col:", JSON.stringify(elem))
        cols.push({
          id: elem.field,
          field: elem.field,
          name: elem.title,
          toolTip: elem.help,
          sortable: true,
          minWidth: 20,
          width: elem.width || 80,
          cssClass: elem.just ? 'align-' + elem.just : '',
          header: {
            buttons: [{ cssClass: 'slick-header-column-order slick-header-column-field-' + elem.field }]
          }
        });
      });
      //console.log("cols: " + JSON.stringify(cols))
      return cols;
    },
    getSelection: function getSelection() {
      return this.gridInstance.getSelectedRows();
    },
    dblClickHandler: function dblClickHandler(e, args) {
      //console.log("DblClick: " + args.row + ", " + args.cell + " Sel: " + this.getSelection())
      this.$emit('execute', this.getSelection());
    },
    menuHandler: function menuHandler(e) {
      console.log("Context Menu: " + e.target);
      e.preventDefault();
    },
    headerMenuHandler: function headerMenuHandler(e) {
      e.preventDefault();
      var head = e.target.closest('.slick-header-column'); //header above me
      var ord = head.querySelector('.slick-header-column-order'); //custom button below that
      var idx = null;
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
      var _this = this;

      var cols = this.gridInstance.getSortColumns(),
          i = cols.length;
      Object.keys(this.orderBoxes).forEach(function (key) {
        _this.orderBoxes[key].innerHTML = '';
      });
      if (i > 1) cols.forEach(function (rec) {
        _this.orderBoxes[rec.columnId].innerHTML = i--;
      });
    },
    sortHandler: function sortHandler(e, args) {
      var multiColumnSort = args.multiColumnSort,
          sortCols = args.sortCols,
          grid = args.grid;
      //console.log("Sort columns: ", multiColumnSort, sortCols)

      this.state.sortColumns = grid.getSortColumns();
      this.updateSortNumbers();
      this.$emit('sort', this.state.sortColumns);
    },
    resizeHandler: function resizeHandler(e, args) {
      var _this2 = this;

      var _loop = function _loop(i, cols) {
        var col = args.grid.getColumns()[i];
        if (!col.previousWidth || col.width != col.previousWidth) {
          //console.log(" setting:", col.field)
          _this2.state.columns.find(function (e) {
            return e.field == col.field;
          }).width = col.width;
        }
      };

      //Handle a column resize
      //console.log("Resized:", e, "Args:", args)
      for (var i = 0, cols = args.grid.getColumns().length; i < cols; i++) {
        _loop(i, cols);
      }
      this.$emit('geometry', e);
    },
    reorderHandler: function reorderHandler(e, args) {
      var _this3 = this;

      //console.log("Reordered:", e, "Args:", args)
      var i = 0;
      args.grid.getColumns().forEach(function (c) {
        _this3.state.columns.find(function (e) {
          return e.field == c.field;
        }).order = i++;
      });
      //console.log(" cols:", JSON.stringify(this.state.columns))
      this.$emit('geometry', e);
    },
    winSizeHandler: function winSizeHandler(el) {
      //      let el = ev.target
      //console.log("Window resize:", el.style.height)
      var height = parseInt(el.getBoundingClientRect().height);
      this.$refs.gridTable.style.height = height + 'px'; //Change height of grid div
      this.gridInstance.resizeCanvas(); //Let slickgrid know about it
    },
    see: function see(line) {
      //Make a certain line visible
      if (line) this.gridInstance.scrollRowIntoView(line, false);else if (this.state.see == 'top') this.gridInstance.scrollRowIntoView(0, false);else this.gridInstance.scrollRowIntoView(this.data.length, true);
    },
    advance: function advance() {
      var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

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
    }
  },

  watch: {
    'state.see': function stateSee(val) {
      this.see();
    },
    'state.columns': function stateColumns(val) {
      var _this4 = this;

      //console.log("Watched columns changed")
      this.gridInstance.setColumns(this.slickColumns());
      var headers = this.$refs.gridTable.querySelector('.slick-header');
      this.state.columns.forEach(function (col) {
        //Find and remember all the divs holding sort order numbers
        var field = col.field;
        _this4.orderBoxes[field] = headers.querySelector('.slick-header-column-field-' + field);
        //console.log(" field: " + field + " Box: ", this.orderBoxes[field])
      });
    },

    data: function data(val) {
      //Reload grid when data changes
      //console.log("Watched data changed: " + JSON.stringify(val))
      this.gridInstance.setData(val, false);
      this.see();
      this.gridInstance.render();
    }
  },

  beforeMount: function beforeMount() {
    var _this5 = this;

    //console.log("Mlb before, state:", this.id, this.state);
    _common2.default.react(this, { FooterOn: false, sorting: {}, columns: [], see: 'top', sortColumns: null });
    if (this.bus) this.bus.register(this.id, function (msg, data) {
      if (msg == 'advance') return _this5.advance(data);
    });
  },

  mounted: function mounted() {
    elementResize.listenTo(this.$el, this.winSizeHandler);

    this.$refs.gridTable.style.height = '200px'; //Init to some known height, for now
    //console.log("data: " + JSON.stringify(this.data))
    var gi = this.gridInstance = new _slickgridEs.Grid(this.$refs.gridTable, this.data, this.slickColumns(), options);
    gi.setSelectionModel(new _slickgridEs.Plugins.RowSelectionModel());
    gi.registerPlugin(new _slickgridEs.Plugins.HeaderButtons()); //For showing sort order
    gi.init();

    gi.onContextMenu.subscribe(this.menuHandler);
    gi.onSort.subscribe(this.sortHandler);
    gi.onDblClick.subscribe(this.dblClickHandler);
    gi.onColumnsResized.subscribe(this.resizeHandler);
    gi.onColumnsReordered.subscribe(this.reorderHandler);
    gi.onHeaderContextMenu.subscribe(this.headerMenuHandler); //Prevent annoying right-click behavior on header fields
    if (this.state.sortColumns) {
      gi.setSortColumns(this.state.sortColumns);
      this.updateSortNumbers;
    }
  },

  beforeDestroy: function beforeDestroy() {
    elementResize.removeListener(this.$el, this.winSizeHandler);
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _mdew = __webpack_require__(/*! ./mdew.vue */ "./src/mdew.vue");

var _mdew2 = _interopRequireDefault(_mdew);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'wylib-modal',
  components: { 'wylib-mdew': _mdew2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } }
  },
  data: function data() {
    return {
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      wm: {},
      top: null
      //    modalData:	{},
    };
  },


  computed: {
    id: function id() {
      return 'modal_' + this._uid + '_';
    },
    buttons: function buttons() {
      var _this = this;

      var butArr = [];
      //console.log("Buttons:", this.state.buttons)
      if (this.state.buttons) this.state.buttons.forEach(function (b) {
        if (typeof b == 'string' && _this.wm[b]) butArr.push({ tag: b, lang: _this.wm[b] });else if (b.tag && !b.lang && _this.wm[b]) butArr.push({ tag: b.tag, lang: _this.wm[b] });else butArr.push(b);
      });
      return butArr;
    },
    reason: function reason() {
      var wmReason = this.wm[this.state.reason];
      return (wmReason ? wmReason.title : this.state.reason) || 'Notice';
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
        borderWidth: this.pr.winBorderWidth
      };
    }
  },

  methods: {
    submit: function submit() {
      //console.log("Modal submit")
      this.press('modYes');
    },
    press: function press(tag) {
      //console.log("Button:", tag, this.state.affirm, this.state)
      this.$emit('press');
      this.state.posted = false; //Unpost our menu
      var butRec = this.state.buttons.find(function (e) {
        return e.tag == tag;
      });
      if (butRec && butRec.cb) //Call-back specific to our button
        butRec.cb(tag == this.state.affirm, tag);else if (this.state.cb) //Callback for the dialog
        this.state.cb(tag == this.state.affirm, tag);
    },
    change: function change(value, field, dirty, valid) {
      //When data changed
      //console.log("Dbe input:", field, value, dirty, valid, this.state.data[field])
      this.state.data[field] = value;
    }
  },

  watch: { //Let parent and any content clients, we just posted
    'state.posted': function statePosted(isPosted) {
      var _this2 = this;

      //console.log("Posted, children:", this.$scopedSlots)
      if (isPosted) this.$nextTick(function () {
        _this2.$emit('posted'); //Tell parent
        if (_this2.top) _this2.top.posted(); //Tell anyone else who might be listening
      });
    }
  },

  created: function created() {
    var _this3 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this3.wm = data.msg;
    });
  },

  beforeMount: function beforeMount() {
    _common2.default.react(this, { posted: false, buttons: ['modOK'], affirm: 'modOK', dews: {}, data: {} });
  },

  mounted: function mounted() {
    this.top = new _common2.default.topHandler();
  }

}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _bus = __webpack_require__(/*! ./bus.js */ "./src/bus.js");

var _bus2 = _interopRequireDefault(_bus);

var _interactjs = __webpack_require__(/*! interactjs */ "interactjs");

var _interactjs2 = _interopRequireDefault(_interactjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeBus = new _bus2.default.eventBus(); //Discover vms by a given tag

exports.default = {
  name: 'wylib-svgnode',
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } }
  },
  //  data() { return {
  //  }},
  computed: {
    transform: function transform() {
      //Moves the object around when we change x or y
      return 'translate(' + this.state.x + ', ' + this.state.y + ') rotate(' + this.state.rotate + ') scale(' + this.state.xScale + ', ' + this.state.yScale + ')';
    },
    cent: function cent() {
      //My center in relative terms
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
      //Compute my centroid in absolute terms
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
        var link = lk,
            draw = true,
            ends = _this.state.ends,
            center = _this.cent,
            index = void 0,
            hub = void 0,
            radius = _this.state.radius || _this.state.width / 2; //Assume node is a simple box
        if ((typeof lk === 'undefined' ? 'undefined' : _typeof(lk)) == 'object') {
          index = lk.index;
          link = lk.link;
          draw = lk.draw;
          center = lk.center;
          ends = lk.ends;
          hub = lk.hub;
        } //But if it is not, get hub-specific data

        if (draw) {
          //Draw a link line, in addition to any optional hub
          var d = void 0,
              refState = void 0,
              refPoint = void 0,
              refVM = nodeBus.notify(link)[0];
          //console.log("Connecting:", this.state.tag, 'at', this.state.x+center.x, this.state.y+center.y, 'to', link)
          if (refVM) {
            //If it already exists
            refState = refVM.state; //Generate connection
            refPoint = refVM.connection({ x: _this.state.x + center.x, y: _this.state.y + center.y }, index); //Ask for coordinates of the other node's connection point
            //console.log("  found his connection:", refPoint.x, refPoint.y)
          } else {
            //Create placeholder, for now
            refState = _this.$parent.nodeState(link);
            refPoint = { x: refState.x, y: refState.y, xs: refState.x, ys: refState.y };
          }
          //console.log(" at:", refState.x, refState.y)
          var myPoint = _this.closest(_this.state, ends, refPoint); //Now find closest point on me, to other node's point
          //console.log("  found my connection:", myPoint.x, myPoint.y)
          var xMyC = myPoint.x * 2 - center.x,
              yMyC = myPoint.y * 2 - center.y; //Curve control point on my end
          var xEnd = refPoint.x - _this.state.x,
              yEnd = refPoint.y - _this.state.y; //Convert his closest point to relative x,y
          var xEnC = refPoint.xs - _this.state.x,
              yEnC = refPoint.ys - _this.state.y; //Curve control point on his end, as relative coordinates
          d = 'M' + myPoint.x + ',' + myPoint.y + ' C' + xMyC + ',' + yMyC + ', ' + xEnC + ',' + yEnC + ', ' + xEnd + ',' + yEnd;
          //          d = `M${myPoint.x},${myPoint.y} L${xMyC},${yMyC}, L${xEnC},${yEnC}, L${xEnd},${yEnd}`
          paths[link] = d;
        }
      });
      return paths;
    },
    hubs: function hubs() {
      //Generate SVG code for appendages where connecting arrows should terminate
      var code = {};
      this.state.links.forEach(function (lk) {
        //For each node I point to
        if ((typeof lk === 'undefined' ? 'undefined' : _typeof(lk)) == 'object') {
          code[lk.index] = lk.hub();
        }
      });
      return code;
    }
  },

  methods: {
    linkName: function linkName(link) {
      //Link might be a node name, or an object with more data including the node name
      if ((typeof link === 'undefined' ? 'undefined' : _typeof(link)) == 'object') {
        return link.link;
      } else {
        return link;
      }
    },
    hubIndex: function hubIndex(link) {
      //Link might be a node name, or an object with more data including the node name
      if ((typeof link === 'undefined' ? 'undefined' : _typeof(link)) == 'object') {
        return link.index;
      } else {
        return link;
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
    connection: function connection(Him, index) {
      //Return my closest connection point to other coordinate 'Him'
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
      //console.log("Him: (", Him.x, Him.y,")", this.state.tag, "@", me.x, me.y, index)
      var cp = this.closest(this.state, ends, Him) //cp=closest point, 'ends' describes possible relative locations to terminate connector lines
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

    //console.log("Node beforeMount:", this.state.tag)
    _common2.default.react(this, { //Create any state properties that don't yet exist
      x: 0, y: 0, xScale: 1, yScale: 1, rotate: 0, drag: true, links: [], ends: [], radius: 0
    });
    this.state.links.forEach(function (lk) {
      //Initialize empty stubs for hub routines
      if ((typeof lk === 'undefined' ? 'undefined' : _typeof(lk)) == 'object' && !lk.hub) _this3.$set(lk, 'hub', function () {});
    });
  },

  mounted: function mounted() {
    var _this4 = this;

    //console.log("Node Mount:", this.state.tag)
    (0, _interactjs2.default)(this.$el).draggable({
      inertia: true,
      onmove: function onmove(event) {
        _this4.$emit('drag', event, _this4.state);
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _interactjs = __webpack_require__(/*! interactjs */ "interactjs");

var _interactjs2 = _interopRequireDefault(_interactjs);

var _svgnode = __webpack_require__(/*! ./svgnode.vue */ "./src/svgnode.vue");

var _svgnode2 = _interopRequireDefault(_svgnode);

var _vector = __webpack_require__(/*! ./vector.js */ "./src/vector.js");

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icons = __webpack_require__(/*! ./icons.js */ "./src/icons.js");

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
      pushForce: 50,
      pullForce: 50,
      randForce: 50,
      startTimer: null,
      repeatTimer: null,
      toolX: 0,
      toolY: 0
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
    bump: function bump() {
      var _this2 = this;

      //Nudge each object according to the computed forces on it
      var forces = [];
      this.$refs.node.forEach(function (vm, ix) {
        forces[ix] = { r: 0, a: 0 };
      });
      this.$refs.node.forEach(function (vm1, ix1) {
        var links = vm1.state.links.map(function (lk) {
          return (typeof lk === 'undefined' ? 'undefined' : _typeof(lk)) == 'object' ? lk.link : lk;
        }); //in case links involve a hub object
        //console.log("links:", links)
        _this2.$refs.node.forEach(function (vm2, ix2) {
          if (ix1 != ix2) {
            var rect12 = _vector2.default.sub(vm2.center, vm1.center) //Distance between 2 nodes
            ,
                polar12 = _vector2.default.rtop(rect12),
                maxMove = (_this2.state.maxX - _this2.state.minX) / 10 //Don't try to expand faster than this
            ,
                mag = Math.max(polar12.r - vm1.state.radius - vm2.state.radius, 10) //Ignore closer than 10 (or negative)
            ,
                push = Math.min(_this2.pushForce * 800 / Math.pow(mag, 2), maxMove),
                pull = _this2.pullForce * mag / 1000000000 //All objects have a little attractive gravity
            ,
                randPull = 0;
            //console.log("bump:", ix1, ix2, rect12, polar12, maxMove, push)

            if (links.includes(vm2.state.tag)) {
              pull += _this2.pullForce * Math.pow(mag, 2) / 1000000; //Linked objects have a lot more attraction
              if (Math.random() < 0.02) {
                randPull = pull * (Math.random() - 0.5) * _this2.randForce;
              } //Inject an extra random burst 2% of the time
            }
            forces[ix1] = _vector2.default.add(forces[ix1], { r: -push + pull + randPull, a: polar12.a });
            forces[ix2] = _vector2.default.add(forces[ix2], { r: push - pull + randPull, a: polar12.a });
          }
        });
      });
      var minX = Number.MAX_VALUE,
          minY = minX,
          maxX = -Number.MAX_VALUE,
          maxY = maxX;
      this.$refs.node.forEach(function (vm, ix) {
        //Now do the nudging
        //console.log("Bump:", ix, forces[ix])
        vm.state.x += forces[ix].x; //Nudge
        vm.state.y += forces[ix].y;

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
        vm.state.x -= minX - 10;
        vm.state.y -= minY - 10;
      });
      this.state.minX = this.state.minY = 0; //And adjust SVG viewport to show all objects
      this.state.maxX = maxX - minX + 20;
      this.state.maxY = maxY - minY + 20;
    }
  },

  beforeMount: function beforeMount() {
    //console.log("SVG state:", JSON.stringify(this.state))
    _common2.default.react(this, { minX: 0, minY: 0, maxX: 400, maxY: 400, nodes: {} });
  },

  mounted: function mounted() {
    var _this3 = this;

    (0, _interactjs2.default)(this.$refs.tools).draggable({
      onmove: function onmove(event) {
        _this3.toolX += event.dx;_this3.toolY += event.dy;
      },
      ignoreFrom: '.nodrag'
    });
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(/*! ./common.js */ "./src/common.js");

var _common2 = _interopRequireDefault(_common);

var _menu = __webpack_require__(/*! ./menu.vue */ "./src/menu.vue");

var _menu2 = _interopRequireDefault(_menu);

var _button = __webpack_require__(/*! ./button.vue */ "./src/button.vue");

var _button2 = _interopRequireDefault(_button);

var _interactjs = __webpack_require__(/*! interactjs */ "interactjs");

var _interactjs2 = _interopRequireDefault(_interactjs);

var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

var _modal = __webpack_require__(/*! ./modal.vue */ "./src/modal.vue");

var _modal2 = _interopRequireDefault(_modal);

var _state = __webpack_require__(/*! ./state.js */ "./src/state.js");

var _state2 = _interopRequireDefault(_state);

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

var MenuLayer = 1000;

//console.log("Interact:", Interact)

exports.default = {
  name: 'wylib-win',
  components: { 'wylib-menu': _menu2.default, 'wylib-button': _button2.default, 'wylib-modal': _modal2.default },
  props: {
    state: { type: Object, default: function _default() {
        return {};
      } },
    topLevel: { default: false }, //Full header and window menu
    fullHeader: { default: false }, //Full header only
    pinnable: { default: false }, //Include pinning button/function
    lang: { type: Object, default: _common2.default.langTemplate },
    tag: { type: String, default: 'win' }
  },
  data: function data() {
    return _defineProperty({
      pr: __webpack_require__(/*! ./prefs */ "./src/prefs.js"),
      wm: {},
      myTopElement: null,
      top: null,
      modal: { posted: false },
      restoreMenu: [],
      lastLoadIdx: null,
      winMenu: { client: {} }, client: {} }, 'modal', { posted: false });
  },
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
    headerHeight: function headerHeight() {
      return this.topLevel || this.fullHeader ? this.pr.winFullHeader : this.pr.winSmallHeader;
    },
    winMenuConfig: function winMenuConfig() {
      var _this2 = this;

      var wm = this.wm;
      return [{ idx: 'sav', lang: wm.winSave, icon: 'upload', call: this.saveState }, { idx: 'sas', lang: wm.winSaveAs, icon: 'upload2', call: this.saveStateAs }, { idx: 'res', lang: wm.winRestore, icon: 'download', menu: this.restoreMenu, layout: ['lang', 'owner', 'access'] }, { idx: 'def', lang: wm.winDefault, icon: 'home', call: this.defaultState }, { idx: 'top', lang: wm.winToTop, icon: 'arrowup', call: function call() {
          _this2.top.layer(1);
        } }, { idx: 'bot', lang: wm.winToBottom, icon: 'arrowdown', call: function call() {
          _this2.top.layer(-1);
        } }, { idx: 'min', lang: wm.winMinimize, icon: 'eyeblock', call: this.minimize }, { idx: 'cls', lang: wm.winClose, icon: 'close', call: function call() {
          _this2.$emit('close');
        } }];
    },
    winStyleS: function winStyleS() {
      return {
        borderColor: this.pr.winBorderColor,
        background: this.pr.dataBackground,
        borderWidth: this.pr.winBorderWidth + 'px',
        opacity: this.pr.winOpacity,
        borderRadius: this.pr.winBorderRad + 'px',
        visibility: this.state.posted ? 'visible' : 'hidden',
        zIndex: this.topLevel ? this.state.layer : MenuLayer
      };
    },
    winStyleF: function winStyleF() {
      return { //Faster moves with these separate?
        transform: 'translate(' + this.state.x + 'px, ' + this.state.y + 'px)',
        height: (this.state.minim ? this.headerHeight + 6 : this.state.height) + 'px',
        width: this.state.width + 'px'
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
    close: function close(ev) {
      this.state.pinned = false;
      //console.log("In close", this.id)
      this.$emit('close');
    },
    minimize: function minimize() {
      this.state.minim = !this.state.minim;
    },
    saveStateAs: function saveStateAs() {
      var _this3 = this;

      var resp = { t: 'Default' },
          dewArr = this.top.dewArray([['t', this.wm.appStateTag], ['h', this.wm.appStateDescr]]);
      this.top.query(this.wm.appStatePrompt.help, dewArr, resp, function (yesNo, tag) {
        if (yesNo) _state2.default.saveas(_this3.tag, resp.t, resp.h, _this3.state, _this3.top.error, function (ruid) {
          _this3.lastLoadIdx = ruid;
        });
      });
    },
    saveState: function saveState() {
      if (this.lastLoadIdx) _state2.default.save(this.lastLoadIdx, this.state, this.top);else this.saveStateAs();
    },
    storeState: function storeState() {
      console.log("Storing window state:", this.tag);
      if (this.topLevel && this.tag) _common2.default.saveState(this.tag, this.state);
    },
    defaultState: function defaultState() {
      var _this4 = this;

      this.top.confirm(this.wm.winDefault.help, function (yesNo, tag) {
        if (yesNo) {
          _common2.default.saveState(_this4.tag);
        }
      });
    },
    topClick: function topClick(ev) {
      //Any click in bounds of our toplevel window
      if (!this.state.posted) return; //Only posted windows need to check
      //console.log("Top window click:", ev.target.nodeName, "This:", this.$el.classList.value, "Target: ", ev.target.classList.value)
      if (ev.target.closest('.wylib-menu')) return; //Click came from another menu
      if (ev.target.closest('.wylib-button')) return; //Click came from the menu button itself
      if (this.$el.contains(ev.target)) return; //Click is within our own window
      //console.log("  pinnable:", this.pinnable, this.state.pinned)
      if (!this.pinnable || !this.state.pinned) this.$emit('close');
    },
    moveHandler: function moveHandler(event) {
      //console.log("Moving: " + JSON.stringify(event.rect));
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
      //console.log("Swallow Menu:", typeof childMenu)
      if (childMenu && '$el' in childMenu) childMenu = childMenu.$el; //Can pass in element or vue object
      if (childStatus && '$el' in childStatus) childStatus = childStatus.$el;
      var cmenu = this.$refs['childMenu'],
          cstat = this.$refs['childStatus'];
      cmenu.innerHTML = ''; //Get rid of any prior contents
      cstat.innerHTML = '';
      cmenu.appendChild(childMenu);
      if (childStatus) cstat.appendChild(childStatus);
    }
  },

  watch: { //Let parent and any content clients, we just posted
    'state.posted': function statePosted(isPosted) {
      var _this5 = this;

      //console.log("Posted, children:", this.$scopedSlots, this.state.x, this.state.y)
      if (isPosted) this.$nextTick(function () {
        _this5.$emit('posted'); //Tell parent
        if (_this5.top) _this5.top.posted(); //Tell anyone else who might be listening
      });
    }
  },

  created: function created() {
    var _this6 = this;

    _wyseman2.default.register(this.id + 'wm', 'wylib.data', function (data) {
      _this6.wm = data.msg;
    });
    this.$on('swallow', this.swallowMenu);

    if (this.topLevel) this.top = new _common2.default.topHandler(function (st) {
      Object.assign(_this6.modal, st);
    }, this);
  },

  beforeMount: function beforeMount() {
    //Create any state properties that don't yet exist
    if (this.topLevel && !('estab' in this.state)) {
      //Is this structure already established?
      var savedState = _common2.default.getState(this.tag);
      //console.log("Win state template:", this.state.estab, this.tag, savedState)
      if (savedState) Object.assign(this.state, savedState); //Comment line for debugging from default state
    }

    //console.log("Win State:", this.state);
    _common2.default.react(this, {
      x: null, y: null, posted: false, pinned: false, layer: 10, minim: false, estab: false,
      width: this.topLevel ? this.pr.winInitWidth : null,
      height: this.topLevel ? this.pr.winInitHeight : null
    });
  },

  mounted: function mounted() {
    var _this7 = this;

    (0, _interactjs2.default)(this.$el).resizable({
      inertia: true,
      margin: 3,
      edges: { top: true, left: true, right: true, bottom: true }, //Can't do top: true without losing dragability!
      restrictSize: { min: { width: 50, height: 50 } },
      onmove: this.sizeHandler,
      onend: this.storeState
    }).draggable({
      ignoreFrom: '.wylib-win-nodrag',
      allowFrom: '.wylib-win .handle',
      inertia: true,
      onmove: this.moveHandler
    });
    //console.log("Mounted; this: ", this.title, "topLevel:", this.topLevel, "top:", this.top)

    if (this.topLevel) {
      //      this.top = new Com.topHandler((st) => {this.modal = st}, this)
    } else {
      this.myTopElement = this.$el.closest('.wylib-win.toplevel');
    }
    if (this.myTopElement) this.myTopElement.addEventListener('click', this.topClick);
    //console.log("Win components: " + JSON.stringify(this.$options.components))

    if (this.topLevel) _state2.default.listen(this.id + 'sl', this.tag, function (menuData) {
      var _restoreMenu;

      //console.log("Process:", this.id, this.restoreMenu.length, "Data:", menuData);
      var menuItems = menuData.map(function (el) {
        return Object.assign(el, { call: function call() {
            Object.assign(_this7.state, el.data);
            _this7.lastLoadIdx = el.idx;
          } });
      });
      (_restoreMenu = _this7.restoreMenu).splice.apply(_restoreMenu, [0, _this7.restoreMenu.length].concat(_toConsumableArray(menuItems)));
      //console.log("WMC:", 1, this.winMenuConfig)
    }, this.top.error);

    this.$on('geometry', function (ev) {
      _this7.storeState();
    }); //When window layout changes
  },

  beforeDestroy: function beforeDestroy() {
    if (this.myTopElement) this.myTopElement.removeEventListener('click', this.topClick);
  }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/less-loader/dist/cjs.js!./node_modules/flatpickr/dist/themes/light.css":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./node_modules/flatpickr/dist/themes/light.css ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".flatpickr-calendar {\n  background: transparent;\n  opacity: 0;\n  display: none;\n  text-align: center;\n  visibility: hidden;\n  padding: 0;\n  -webkit-animation: none;\n  animation: none;\n  direction: ltr;\n  border: 0;\n  font-size: 14px;\n  line-height: 24px;\n  border-radius: 5px;\n  position: absolute;\n  width: 307.875px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  -webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.08);\n  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.08);\n}\n.flatpickr-calendar.open,\n.flatpickr-calendar.inline {\n  opacity: 1;\n  max-height: 640px;\n  visibility: visible;\n}\n.flatpickr-calendar.open {\n  display: inline-block;\n  z-index: 99999;\n}\n.flatpickr-calendar.animate.open {\n  -webkit-animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n  animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n}\n.flatpickr-calendar.inline {\n  display: block;\n  position: relative;\n  top: 2px;\n}\n.flatpickr-calendar.static {\n  position: absolute;\n  top: calc(100% + 2px);\n}\n.flatpickr-calendar.static.open {\n  z-index: 999;\n  display: block;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7) {\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1) {\n  -webkit-box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n  box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n}\n.flatpickr-calendar .hasWeeks .dayContainer,\n.flatpickr-calendar .hasTime .dayContainer {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.flatpickr-calendar .hasWeeks .dayContainer {\n  border-left: 0;\n}\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time {\n  height: 40px;\n  border-top: 1px solid #eceef1;\n}\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-innerContainer {\n  border-bottom: 0;\n}\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time {\n  border: 1px solid #eceef1;\n}\n.flatpickr-calendar.noCalendar.hasTime .flatpickr-time {\n  height: auto;\n}\n.flatpickr-calendar:before,\n.flatpickr-calendar:after {\n  position: absolute;\n  display: block;\n  pointer-events: none;\n  border: solid transparent;\n  content: '';\n  height: 0;\n  width: 0;\n  left: 22px;\n}\n.flatpickr-calendar.rightMost:before,\n.flatpickr-calendar.rightMost:after {\n  left: auto;\n  right: 22px;\n}\n.flatpickr-calendar:before {\n  border-width: 5px;\n  margin: 0 -5px;\n}\n.flatpickr-calendar:after {\n  border-width: 4px;\n  margin: 0 -4px;\n}\n.flatpickr-calendar.arrowTop:before,\n.flatpickr-calendar.arrowTop:after {\n  bottom: 100%;\n}\n.flatpickr-calendar.arrowTop:before {\n  border-bottom-color: #eceef1;\n}\n.flatpickr-calendar.arrowTop:after {\n  border-bottom-color: #eceef1;\n}\n.flatpickr-calendar.arrowBottom:before,\n.flatpickr-calendar.arrowBottom:after {\n  top: 100%;\n}\n.flatpickr-calendar.arrowBottom:before {\n  border-top-color: #eceef1;\n}\n.flatpickr-calendar.arrowBottom:after {\n  border-top-color: #eceef1;\n}\n.flatpickr-calendar:focus {\n  outline: 0;\n}\n.flatpickr-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.flatpickr-months {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flatpickr-months .flatpickr-month {\n  border-radius: 5px 5px 0 0;\n  background: #eceef1;\n  color: #5a6171;\n  fill: #5a6171;\n  height: 28px;\n  line-height: 1;\n  text-align: center;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n.flatpickr-months .flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month {\n  text-decoration: none;\n  cursor: pointer;\n  position: absolute;\n  top: 0px;\n  line-height: 16px;\n  height: 28px;\n  padding: 10px;\n  z-index: 3;\n  color: #5a6171;\n  fill: #5a6171;\n}\n.flatpickr-months .flatpickr-prev-month.disabled,\n.flatpickr-months .flatpickr-next-month.disabled {\n  display: none;\n}\n.flatpickr-months .flatpickr-prev-month i,\n.flatpickr-months .flatpickr-next-month i {\n  position: relative;\n}\n.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-prev-month {\n  /*\n      /*rtl:begin:ignore*/\n  /*\n      */\n  left: 0;\n  /*\n      /*rtl:end:ignore*/\n  /*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-next-month {\n  /*\n      /*rtl:begin:ignore*/\n  /*\n      */\n  right: 0;\n  /*\n      /*rtl:end:ignore*/\n  /*\n      */\n}\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month:hover,\n.flatpickr-months .flatpickr-next-month:hover {\n  color: #bbb;\n}\n.flatpickr-months .flatpickr-prev-month:hover svg,\n.flatpickr-months .flatpickr-next-month:hover svg {\n  fill: #f64747;\n}\n.flatpickr-months .flatpickr-prev-month svg,\n.flatpickr-months .flatpickr-next-month svg {\n  width: 14px;\n  height: 14px;\n}\n.flatpickr-months .flatpickr-prev-month svg path,\n.flatpickr-months .flatpickr-next-month svg path {\n  -webkit-transition: fill 0.1s;\n  transition: fill 0.1s;\n  fill: inherit;\n}\n.numInputWrapper {\n  position: relative;\n  height: auto;\n}\n.numInputWrapper input,\n.numInputWrapper span {\n  display: inline-block;\n}\n.numInputWrapper input {\n  width: 100%;\n}\n.numInputWrapper input::-ms-clear {\n  display: none;\n}\n.numInputWrapper span {\n  position: absolute;\n  right: 0;\n  width: 14px;\n  padding: 0 4px 0 2px;\n  height: 50%;\n  line-height: 50%;\n  opacity: 0;\n  cursor: pointer;\n  border: 1px solid rgba(72, 72, 72, 0.15);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.numInputWrapper span:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.numInputWrapper span:active {\n  background: rgba(0, 0, 0, 0.2);\n}\n.numInputWrapper span:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n}\n.numInputWrapper span.arrowUp {\n  top: 0;\n  border-bottom: 0;\n}\n.numInputWrapper span.arrowUp:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-bottom: 4px solid rgba(72, 72, 72, 0.6);\n  top: 26%;\n}\n.numInputWrapper span.arrowDown {\n  top: 50%;\n}\n.numInputWrapper span.arrowDown:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 4px solid rgba(72, 72, 72, 0.6);\n  top: 40%;\n}\n.numInputWrapper span svg {\n  width: inherit;\n  height: auto;\n}\n.numInputWrapper span svg path {\n  fill: rgba(90, 97, 113, 0.5);\n}\n.numInputWrapper:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.numInputWrapper:hover span {\n  opacity: 1;\n}\n.flatpickr-current-month {\n  font-size: 135%;\n  line-height: inherit;\n  font-weight: 300;\n  color: inherit;\n  position: absolute;\n  width: 75%;\n  left: 12.5%;\n  padding: 6.16px 0 0 0;\n  line-height: 1;\n  height: 28px;\n  display: inline-block;\n  text-align: center;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px);\n}\n.flatpickr-current-month span.cur-month {\n  font-family: inherit;\n  font-weight: 700;\n  color: inherit;\n  display: inline-block;\n  margin-left: 0.5ch;\n  padding: 0;\n}\n.flatpickr-current-month span.cur-month:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.flatpickr-current-month .numInputWrapper {\n  width: 6ch;\n  width: 7ch\\0;\n  display: inline-block;\n}\n.flatpickr-current-month .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #5a6171;\n}\n.flatpickr-current-month .numInputWrapper span.arrowDown:after {\n  border-top-color: #5a6171;\n}\n.flatpickr-current-month input.cur-year {\n  background: transparent;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: text;\n  padding: 0 0 0 0.5ch;\n  margin: 0;\n  display: inline-block;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  line-height: inherit;\n  height: auto;\n  border: 0;\n  border-radius: 0;\n  vertical-align: initial;\n}\n.flatpickr-current-month input.cur-year:focus {\n  outline: 0;\n}\n.flatpickr-current-month input.cur-year[disabled],\n.flatpickr-current-month input.cur-year[disabled]:hover {\n  font-size: 100%;\n  color: rgba(90, 97, 113, 0.5);\n  background: transparent;\n  pointer-events: none;\n}\n.flatpickr-weekdays {\n  background: #eceef1;\n  text-align: center;\n  overflow: hidden;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 28px;\n}\n.flatpickr-weekdays .flatpickr-weekdaycontainer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\nspan.flatpickr-weekday {\n  cursor: default;\n  font-size: 90%;\n  background: #eceef1;\n  color: #5a6171;\n  line-height: 1;\n  margin: 0;\n  text-align: center;\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  font-weight: bolder;\n}\n.dayContainer,\n.flatpickr-weeks {\n  padding: 1px 0 0 0;\n}\n.flatpickr-days {\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  width: 307.875px;\n  border-left: 1px solid #eceef1;\n  border-right: 1px solid #eceef1;\n}\n.flatpickr-days:focus {\n  outline: 0;\n}\n.dayContainer {\n  padding: 0;\n  outline: 0;\n  text-align: left;\n  width: 307.875px;\n  min-width: 307.875px;\n  max-width: 307.875px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px);\n  opacity: 1;\n}\n.dayContainer + .dayContainer {\n  -webkit-box-shadow: -1px 0 0 #eceef1;\n  box-shadow: -1px 0 0 #eceef1;\n}\n.flatpickr-day {\n  background: none;\n  border: 1px solid transparent;\n  border-radius: 150px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: #484848;\n  cursor: pointer;\n  font-weight: 400;\n  width: 14.2857143%;\n  -webkit-flex-basis: 14.2857143%;\n  -ms-flex-preferred-size: 14.2857143%;\n  flex-basis: 14.2857143%;\n  max-width: 39px;\n  height: 39px;\n  line-height: 39px;\n  margin: 0;\n  display: inline-block;\n  position: relative;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center;\n}\n.flatpickr-day.inRange,\n.flatpickr-day.prevMonthDay.inRange,\n.flatpickr-day.nextMonthDay.inRange,\n.flatpickr-day.today.inRange,\n.flatpickr-day.prevMonthDay.today.inRange,\n.flatpickr-day.nextMonthDay.today.inRange,\n.flatpickr-day:hover,\n.flatpickr-day.prevMonthDay:hover,\n.flatpickr-day.nextMonthDay:hover,\n.flatpickr-day:focus,\n.flatpickr-day.prevMonthDay:focus,\n.flatpickr-day.nextMonthDay:focus {\n  cursor: pointer;\n  outline: 0;\n  background: #e2e2e2;\n  border-color: #e2e2e2;\n}\n.flatpickr-day.today {\n  border-color: #bbb;\n}\n.flatpickr-day.today:hover,\n.flatpickr-day.today:focus {\n  border-color: #bbb;\n  background: #bbb;\n  color: #fff;\n}\n.flatpickr-day.selected,\n.flatpickr-day.startRange,\n.flatpickr-day.endRange,\n.flatpickr-day.selected.inRange,\n.flatpickr-day.startRange.inRange,\n.flatpickr-day.endRange.inRange,\n.flatpickr-day.selected:focus,\n.flatpickr-day.startRange:focus,\n.flatpickr-day.endRange:focus,\n.flatpickr-day.selected:hover,\n.flatpickr-day.startRange:hover,\n.flatpickr-day.endRange:hover,\n.flatpickr-day.selected.prevMonthDay,\n.flatpickr-day.startRange.prevMonthDay,\n.flatpickr-day.endRange.prevMonthDay,\n.flatpickr-day.selected.nextMonthDay,\n.flatpickr-day.startRange.nextMonthDay,\n.flatpickr-day.endRange.nextMonthDay {\n  background: #ff5a5f;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  color: #fff;\n  border-color: #ff5a5f;\n}\n.flatpickr-day.selected.startRange,\n.flatpickr-day.startRange.startRange,\n.flatpickr-day.endRange.startRange {\n  border-radius: 50px 0 0 50px;\n}\n.flatpickr-day.selected.endRange,\n.flatpickr-day.startRange.endRange,\n.flatpickr-day.endRange.endRange {\n  border-radius: 0 50px 50px 0;\n}\n.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {\n  -webkit-box-shadow: -10px 0 0 #ff5a5f;\n  box-shadow: -10px 0 0 #ff5a5f;\n}\n.flatpickr-day.selected.startRange.endRange,\n.flatpickr-day.startRange.startRange.endRange,\n.flatpickr-day.endRange.startRange.endRange {\n  border-radius: 50px;\n}\n.flatpickr-day.inRange {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2;\n  box-shadow: -5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2;\n}\n.flatpickr-day.disabled,\n.flatpickr-day.disabled:hover,\n.flatpickr-day.prevMonthDay,\n.flatpickr-day.nextMonthDay,\n.flatpickr-day.notAllowed,\n.flatpickr-day.notAllowed.prevMonthDay,\n.flatpickr-day.notAllowed.nextMonthDay {\n  color: rgba(72, 72, 72, 0.3);\n  background: transparent;\n  border-color: transparent;\n  cursor: default;\n}\n.flatpickr-day.disabled,\n.flatpickr-day.disabled:hover {\n  cursor: not-allowed;\n  color: rgba(72, 72, 72, 0.1);\n}\n.flatpickr-day.week.selected {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;\n  box-shadow: -5px 0 0 #ff5a5f, 5px 0 0 #ff5a5f;\n}\n.flatpickr-day.hidden {\n  visibility: hidden;\n}\n.rangeMode .flatpickr-day {\n  margin-top: 1px;\n}\n.flatpickr-weekwrapper {\n  display: inline-block;\n  float: left;\n}\n.flatpickr-weekwrapper .flatpickr-weeks {\n  padding: 0 12px;\n  border-left: 1px solid #eceef1;\n}\n.flatpickr-weekwrapper .flatpickr-weekday {\n  float: none;\n  width: 100%;\n  line-height: 28px;\n}\n.flatpickr-weekwrapper span.flatpickr-day,\n.flatpickr-weekwrapper span.flatpickr-day:hover {\n  display: block;\n  width: 100%;\n  max-width: none;\n  color: rgba(72, 72, 72, 0.3);\n  background: transparent;\n  cursor: default;\n  border: none;\n}\n.flatpickr-innerContainer {\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  background: #fff;\n  border-bottom: 1px solid #eceef1;\n}\n.flatpickr-rContainer {\n  display: inline-block;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.flatpickr-time {\n  text-align: center;\n  outline: 0;\n  display: block;\n  height: 0;\n  line-height: 40px;\n  max-height: 40px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  background: #fff;\n  border-radius: 0 0 5px 5px;\n}\n.flatpickr-time:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.flatpickr-time .numInputWrapper {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  width: 40%;\n  height: 40px;\n  float: left;\n}\n.flatpickr-time .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #484848;\n}\n.flatpickr-time .numInputWrapper span.arrowDown:after {\n  border-top-color: #484848;\n}\n.flatpickr-time.hasSeconds .numInputWrapper {\n  width: 26%;\n}\n.flatpickr-time.time24hr .numInputWrapper {\n  width: 49%;\n}\n.flatpickr-time input {\n  background: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  border-radius: 0;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  height: inherit;\n  line-height: inherit;\n  color: #484848;\n  font-size: 14px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.flatpickr-time input.flatpickr-hour {\n  font-weight: bold;\n}\n.flatpickr-time input.flatpickr-minute,\n.flatpickr-time input.flatpickr-second {\n  font-weight: 400;\n}\n.flatpickr-time input:focus {\n  outline: 0;\n  border: 0;\n}\n.flatpickr-time .flatpickr-time-separator,\n.flatpickr-time .flatpickr-am-pm {\n  height: inherit;\n  display: inline-block;\n  float: left;\n  line-height: inherit;\n  color: #484848;\n  font-weight: bold;\n  width: 2%;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-align-self: center;\n  -ms-flex-item-align: center;\n  align-self: center;\n}\n.flatpickr-time .flatpickr-am-pm {\n  outline: 0;\n  width: 18%;\n  cursor: pointer;\n  text-align: center;\n  font-weight: 400;\n}\n.flatpickr-time input:hover,\n.flatpickr-time .flatpickr-am-pm:hover,\n.flatpickr-time input:focus,\n.flatpickr-time .flatpickr-am-pm:focus {\n  background: #efefef;\n}\n.flatpickr-input[readonly] {\n  cursor: pointer;\n}\n@-webkit-keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\nspan.flatpickr-day.selected {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-app * {\n  box-sizing: border-box;\n}\n.wylib-app > .header {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  font-size: 1.1em;\n}\n.wylib-app > .header .title {\n  font-size: 1.5em;\n  text-shadow: 1px 1px 2px #aaaacc;\n}\n.wylib-app .header .status {\n  position: relative;\n}\n.wylib-app .header .status .wylib-connect {\n  position: absolute;\n  right: 0;\n  top: 1.25em;\n  z-index: 100000;\n}\n.wylib-app .tabset {\n  width: 100%;\n  display: flex;\n}\n.wylib-app .tabset .tab {\n  min-height: 20px;\n  display: inline;\n  border: 1px solid #c0c0c0;\n  border-radius: 6px 6px 0 0;\n  padding: 0.25em 0.5em 0 0.5em;\n  margins: 0;\n  user-select: none;\n  background-color: #e0e0e0;\n  flex: 0 0 auto;\n}\n.wylib-app .tabset .tab-filler {\n  flex: 1 1 auto;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-end;\n  border-bottom: 1px solid #c0c0c0;\n}\n.wylib-app .tabset .tab.active {\n  border-bottom-style: none;\n  background-color: #ffffff;\n}\n.wylib-app .tabset .tab:hover {\n  background-color: #fafaff;\n}\n.wylib-app .app-content {\n  width: 100%;\n  min-height: 100px;\n  border-radius: 2px;\n  border: 1px solid #c0c0c0;\n  border-top-style: none;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-button {\n  display: inline-block;\n  border-width: 1px;\n  border-radius: 4px;\n  margin: 0 1px 0 1px;\n}\n.wylib-button .icon {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-connect {\n  border: 1px solid black;\n  border-radius: 4px;\n  background: white;\n  padding: 4px;\n}\n.wylib-connect .header {\n  padding: 4px;\n}\n.wylib-connect table label {\n  font-family: Helvetica;\n  font-size: 0.8em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-dbe .header {\n  background: linear-gradient(to top, #c0c0c0, #e0e0e0);\n  width: 100%;\n  display: flex;\n}\n.wylib-dbe .header wylib-menudock {\n  flex: 0 0 auto;\n}\n.wylib-dbe .header .headerfill {\n  flex: 1 1 auto;\n}\n.wylib-dbe.headstatus {\n  flex: 0 0 auto;\n  white-space: nowrap;\n  display: flex;\n  align-items: flex-end;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-dbp {\n  height: 100%;\n}\n.wylib-dbp > .header {\n  background: linear-gradient(to top, #c0c0c0, #e0e0e0);\n  width: 100%;\n  height: 1.4em;\n  display: flex;\n}\n.wylib-dbp .header wylib-menudock {\n  flex: 0 0 auto;\n}\n.wylib-dbp .header .headerfill {\n  flex: 1 1 auto;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-dbs > .header {\n  background: linear-gradient(to top, #c0c0c0, #e0e0e0);\n  width: 100%;\n  height: 1.4em;\n  display: flex;\n}\n.wylib-dbs .header wylib-menudock {\n  flex: 0 0 auto;\n}\n.wylib-dbs .header .headerfill {\n  flex: 1 1 auto;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-dew input.text,\n.wylib-dew div.check {\n  border-style: solid;\n  border-bottom-width: 1px;\n  border-top-width: 0;\n  border-radius: 3px;\n}\n.wylib-dew input.text {\n  width: 100%;\n}\n.wylib-dew div.check {\n  width: 1.7em;\n}\n.wylib-dew input.checkbox {\n  margin: 0 0 2px 4px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-logitem {\n  cursor: move;\n  padding: 3px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n}\n.wylib-logitem select {\n  margin: 0 4px 0 4px;\n}\n.wylib-logitem .right.inactive {\n  max-width: 2em;\n}\n.wylib-logitem input.inactive {\n  max-width: 0;\n  visibility: hidden;\n}\n.wylib-logitem .button.close:hover {\n  background: #ffcccc;\n}\n.wylib-logitem .button.lower:hover {\n  background: #ccffcc;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-loglist {\n  padding: 2px;\n  border: 2px solid #cc9900;\n  border-radius: 8px;\n  background: #f8f8f8;\n  /*    width: 100%; */\n}\n.wylib-loglist .connector {\n  position: absolute;\n}\n.wylib-loglist .subdivision {\n  padding: 3px;\n  margin: 0 0 0 15px;\n  display: flex;\n  /* border: 1px solid orange; */\n}\n.wylib-loglist .header {\n  cursor: move;\n  position: relative;\n  background: #e0e0e0;\n}\n.wylib-loglist .connector {\n  position: absolute;\n  left: 8px;\n  top: 18px;\n  width: 16px;\n  height: auto;\n  fill: none;\n  stroke: #999999;\n  stroke-width: 2;\n}\n.wylib-loglist .spacer .lower {\n  position: absolute;\n  left: 6px;\n  top: 20px;\n  height: 12px;\n}\n.wylib-loglist .button {\n  border-radius: 4px;\n}\n.wylib-loglist .button .icon {\n  height: 12px;\n  width: 12px;\n}\n.wylib-loglist .button:hover {\n  background: #bbeebb;\n}\n.wylib-loglist .button.andor.and {\n  background: #aaaaee;\n}\n.wylib-loglist .button.andor {\n  background: #eeee88;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-mdew table {\n  border-collapse: collapse;\n  width: 100%;\n}\n.wylib-mdew table .label {\n  text-align: right;\n}\n.wylib-mdew table .titles {\n  width: 10%;\n}\n.wylib-mdew table tr:nth-child(even) .label {\n  background: #f0f0f0;\n}\n.wylib-mdew td {\n  border: 1px solid #e8e8e8;\n  white-space: nowrap;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=style&index=0&lang=less& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-menu {\n  min-height: 3em;\n  display: flex;\n}\n.wylib-menu .menu,\n.wylib-menu .submenus {\n  display: inline;\n}\n.wylib-menu > .menu {\n  width: calc(100% - 6px);\n  position: relative;\n}\n.wylib-menu .menu tr:hover {\n  background: lightblue;\n}\n.wylib-menu .menu table {\n  border-collapse: collapse;\n  background: #f6f6f6;\n  user-select: none;\n}\n.wylib-menu .menu td {\n  white-space: nowrap;\n  padding-left: 4px;\n  padding-right: 4px;\n  border: 1px solid #f2f2f2;\n}\n.wylib-menu .icon {\n  display: block;\n  fill: #2482a4;\n  stroke: #222222;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-menudock {\n  border: 1px solid black;\n  border-bottom: 0;\n  padding: 0;\n}\n.wylib-menudock .buttons {\n  display: flex;\n}\n.wylib-menudock wylib-button {\n  flex: 0 0 auto;\n}\n.wylib-menudock > .wylib-win {\n  position: relative;\n  top: 1em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n * IMPORTANT:\n * In order to preserve the uniform grid appearance, all cell styles need to have padding, margin and border sizes.\n * No built-in (selected, editable, highlight, flashing, invalid, loading, :focus) or user-specified CSS\n * classes should alter those!\n */\n.slickgrid-container {\n  overflow: hidden;\n  outline: 0;\n  position: relative;\n  box-sizing: content-box;\n}\n.slickgrid-container .slick-viewport,\n.slickgrid-container .slick-top-panel-scroller,\n.slickgrid-container .slick-header,\n.slickgrid-container .slick-headerrow,\n.slickgrid-container .slick-footerrow {\n  position: relative;\n  width: 100%;\n  border: 1px solid #a0a0a0;\n  border-right-color: transparent;\n  border-bottom-color: transparent;\n  border-right-width: 0;\n  border-bottom-width: 0;\n  margin: 0;\n  outline: 0;\n}\n.slickgrid-container .slick-viewport {\n  overflow: auto;\n}\n.slickgrid-container .slick-viewport.slickgrid-container .slick-viewport::-webkit-scrollbar {\n  -webkit-appearance: none;\n}\n.slickgrid-container .slick-viewport.slickgrid-container .slick-viewport::-webkit-scrollbar-thumb {\n  border-radius: 4px;\n  border: 2px solid white;\n  /* should match background, can't be transparent */\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.slickgrid-container .slick-header,\n.slickgrid-container .slick-headerrow,\n.slickgrid-container .slick-footerrow {\n  overflow: hidden;\n}\n.slickgrid-container .slick-headerrow {\n  border-top-color: transparent;\n  border-top-width: 0;\n}\n.slickgrid-container .slick-top-panel,\n.slickgrid-container .slick-header-columns,\n.slickgrid-container .slick-headerrow-columns,\n.slickgrid-container .slick-footerrow-columns {\n  position: relative;\n  white-space: nowrap;\n  cursor: default;\n  overflow: hidden;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n}\n.slickgrid-container .slick-cell,\n.slickgrid-container .slick-header-column,\n.slickgrid-container .slick-headerrow-column,\n.slickgrid-container .slick-footerrow-column {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  border: 1px solid #a0a0a0;\n  border-top-color: transparent;\n  border-left-color: transparent;\n  border-top-width: 0;\n  border-left-width: 0;\n  margin: 0;\n  padding: 0;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  vertical-align: middle;\n  white-space: nowrap;\n  cursor: default;\n}\n.slickgrid-container .slick-cell.slick-header-is-leaf,\n.slickgrid-container .slick-header-column.slick-header-is-leaf,\n.slickgrid-container .slick-headerrow-column.slick-header-is-leaf,\n.slickgrid-container .slick-footerrow-column.slick-header-is-leaf {\n  border-bottom-color: transparent;\n  border-bottom-width: 0;\n}\n.slickgrid-container .slick-header-column.ui-state-default {\n  position: relative;\n  display: inline-block;\n  box-sizing: content-box !important;\n  overflow: hidden;\n  height: 1em;\n  line-height: 1em;\n  margin: 0;\n  padding: 4px;\n  border-right: 1px solid #a0a0a0;\n  border-left: 0px !important;\n  border-top: 0px !important;\n  border-bottom: 0px !important;\n  float: left;\n}\n.slickgrid-container .slick-cell {\n  box-sizing: border-box;\n  border-style: solid;\n  padding: 1px 2px 1px 2px;\n}\n.slickgrid-container .slick-header-column {\n  padding: 4px 4px 4px 4px;\n}\n.slickgrid-container .grid-canvas {\n  position: relative;\n  outline: 0;\n}\n.slickgrid-container .slick-row {\n  position: absolute;\n  border: 0;\n  width: 100%;\n}\n.slickgrid-container .slick-header-column-sorted {\n  font-style: italic;\n}\n.slickgrid-container .slick-sort-indicator {\n  display: inline-block;\n  width: 10px;\n  height: 5px;\n  margins: 0;\n  position: absolute;\n  left: 2px;\n  bottom: 3px;\n}\n.slickgrid-container .slick-header-column-order {\n  display: inline-block;\n  position: absolute;\n  width: 10px;\n  height: 16px;\n  margins: 0;\n  left: 4px;\n  bottom: 6px;\n  padding: 0;\n  font-size: 0.75em;\n}\n.slickgrid-container .slick-sort-indicator-desc {\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid black;\n}\n.slickgrid-container .slick-sort-indicator-asc {\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid black;\n}\n.slickgrid-container .slick-header-sortable .slick-column-name {\n  margin-left: 10px;\n}\n.slickgrid-container .slick-header.ui-state-default {\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n}\n.slickgrid-container .slick-column-name {\n  position: absolute;\n}\n.slickgrid-container .slick-resizable-handle {\n  position: absolute;\n  font-size: 0.1px;\n  display: block;\n  cursor: col-resize;\n  width: 5px;\n  right: 0;\n  top: 0;\n  height: 100%;\n}\n.slickgrid-container .slick-resizable-handle-hover {\n  background-color: #ccc;\n}\n.slickgrid-container .slick-sortable-placeholder {\n  background: silver;\n}\n.slickgrid-container .slick-group-toggle {\n  display: inline-block;\n}\n.slickgrid-container .slick-cell.highlighted {\n  background: lightskyblue;\n  background: rgba(0, 0, 255, 0.2);\n  transition: all 0.5s;\n}\n.slickgrid-container .slick-cell.flashing {\n  border: 1px solid red !important;\n}\n.slickgrid-container .slick-cell.editable {\n  overflow: visible;\n  background: white;\n  border-color: black;\n  border-style: solid;\n}\n.slickgrid-container .slick-cell:focus {\n  outline: none;\n}\n.slickgrid-container .slick-reorder-proxy {\n  display: inline-block;\n  background: blue;\n  opacity: 0.15;\n  cursor: move;\n}\n.slickgrid-container .slick-reorder-guide {\n  display: inline-block;\n  height: 2px;\n  background: blue;\n  opacity: 0.7;\n}\n.slickgrid-container .slick-selection {\n  position: absolute;\n  border: 2px dashed black;\n}\n.slickgrid-container .slick-pane {\n  position: absolute;\n  outline: 0;\n  overflow: hidden;\n  width: 100%;\n}\n.interact-placeholder {\n  background: red !important;\n  display: inline-block;\n  float: left;\n  transform: translate(0px, -100%);\n}\n.interact-drop-active {\n  box-shadow: inset 0 0 8px rgba(7, 67, 128, 0.5);\n}\n.interact-can-drop {\n  opacity: 0.9;\n}\n.scrollbar-fix::-webkit-scrollbar {\n  -webkit-appearance: none;\n}\n/*\n * IMPORTANT:\n * In order to preserve the uniform grid appearance, all cell styles need to have padding, margin and border sizes.\n * No built-in (selected, editable, highlight, flashing, invalid, loading, :focus) or user-specified CSS\n * classes should alter those!\n */\n.slickgrid-container .slick-header-columns,\n.slickgrid-container .slick-header-column {\n  background: #d8d8d8;\n}\n.slickgrid-container .slick-header-columns {\n  border-bottom: 1px solid #a0a0a0;\n}\n.slickgrid-container .slick-header-column {\n  border-right: 1px solid #a0a0a0;\n  border-bottom: 1px solid #a0a0a0;\n}\n.slickgrid-container .slick-header-column:hover {\n  background: #d3d3d3;\n}\n.slickgrid-container .slick-header-column-active {\n  background: #cbcbcb !important;\n}\n.slickgrid-container .slick-headerrow {\n  background: #d8d8d8;\n}\n.slickgrid-container .slick-headerrow-column {\n  background: #fafafa;\n  border-bottom: 0;\n}\n.slickgrid-container .grid-canvas {\n  background: white;\n}\n.slickgrid-container .slick-row {\n  background: white;\n  border: 0;\n  line-height: 20px;\n}\n.slickgrid-container .slick-row .slick-cell {\n  background: white;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  padding-left: 4px;\n  padding-right: 4px;\n  box-sizing: border-box;\n}\n.slickgrid-container .slick-row .slick-cell.invalid {\n  border-color: red;\n  -moz-animation-duration: 0.2s;\n  -webkit-animation-duration: 0.2s;\n  -moz-animation-name: slickgrid-invalid-hilite;\n  -webkit-animation-name: slickgrid-invalid-hilite;\n}\n.slickgrid-container .slick-row .slick-cell.selected {\n  background-color: #e8e8ff;\n}\n.slickgrid-container .slick-row .slick-cell.active {\n  border-color: rgba(0, 0, 0, 0.3);\n  border-style: solid;\n  border-width: 1px;\n  padding-top: 2px;\n  padding-left: 3px;\n}\n.slickgrid-container .slick-row .slick-cell.active input.editor-text {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  margin: 0;\n  background: transparent;\n  padding: 2px 3px 2px 3px;\n  transform: translate(-3px, -2px);\n}\n.slickgrid-container .slick-row.odd .slick-cell {\n  background: #fafaff;\n}\n.slickgrid-container .slick-row.odd .slick-cell.selected {\n  background-color: #e8e8ff;\n}\n.slickgrid-container .slick-row.active-row .slick-cell {\n  background-color: #e2fffd;\n}\n.slickgrid-container .slick-row.active-row .slick-cell.selected {\n  background-color: #e8e8ff;\n}\n.slickgrid-container .slick-row.active-row.odd .slick-cell {\n  background-color: #e2fffd;\n}\n.slickgrid-container .slick-row.active-row.odd .slick-cell.selected {\n  background-color: green;\n}\n.slickgrid-container .slick-row.loading {\n  opacity: 0.5;\n}\n.slickgrid-container .slick-group {\n  border-bottom: 2px solid silver;\n}\n.slickgrid-container .slick-group-toggle {\n  width: 9px;\n  height: 9px;\n  margin-right: 5px;\n}\n.slickgrid-container .slick-group-totals {\n  color: gray;\n  background: white;\n}\n.slickgrid-container .slick-sortable-placeholder {\n  background: silver !important;\n}\n@-moz-keyframes slickgrid-invalid-hilite {\nfrom {\n    box-shadow: 0 0 6px red;\n}\nto {\n    box-shadow: none;\n}\n}\n@-webkit-keyframes slickgrid-invalid-hilite {\nfrom {\n    box-shadow: 0 0 6px red;\n}\nto {\n    box-shadow: none;\n}\n}\n.slickgrid-container .slick-header-menubutton {\n  background-position: center center;\n  background-repeat: no-repeat;\n  border-left: thin ridge silver;\n  cursor: pointer;\n  display: inline-block;\n  position: absolute;\n}\n.slickgrid-container .slick-header-menu {\n  background: none repeat scroll 0 0 white;\n  border: 1px solid #BFBDBD;\n  min-width: 175px;\n  padding: 4px;\n  z-index: 9;\n  cursor: default;\n  display: inline-block;\n  margin: 0;\n  position: absolute;\n}\n.slickgrid-container .slick-header-menu button {\n  border: 1px solid #BFBDBD;\n  background-color: white;\n  width: 45px;\n  padding: 4px;\n  margin: 4px 4px 4px 0;\n}\n.slickgrid-container .slick-header-menu .filter {\n  border: 1px solid #BFBDBD;\n  font-size: 8pt;\n  height: 400px;\n  margin-top: 6px;\n  overflow: scroll;\n  padding: 4px;\n  white-space: nowrap;\n  width: 200px;\n}\n.slickgrid-container .slick-header-menu .textfilter > label {\n  display: inline-block;\n  margin-left: 5px;\n  margin-right: 10px;\n}\n.slickgrid-container .slick-header-menu .textfilter > input[type=text] {\n  width: 70%;\n}\n.slickgrid-container label {\n  display: block;\n  margin-bottom: 5px;\n}\n.slickgrid-container .slick-header-menuitem {\n  border: 1px solid transparent;\n  padding: 2px 4px;\n  cursor: pointer;\n  list-style: none outside none;\n  margin: 0;\n}\n.slickgrid-container .slick-header-menuicon {\n  background-position: center center;\n  background-repeat: no-repeat;\n  display: inline-block;\n  height: 16px;\n  margin-right: 4px;\n  vertical-align: middle;\n  width: 16px;\n}\n.slickgrid-container .slick-header-menucontent {\n  display: inline-block;\n  vertical-align: middle;\n}\n.slickgrid-container .slick-header-menuitem:hover {\n  border-color: #BFBDBD;\n}\n.slickgrid-container .header-overlay,\n.slickgrid-container .cell-overlay,\n.slickgrid-container .selection-cell-overlay {\n  display: block;\n  position: absolute;\n  z-index: 4;\n}\n.slickgrid-container .slick-cell > .editor-select {\n  position: absolute;\n  left: 0;\n  right: 0;\n  width: auto;\n  top: 0;\n  bottom: 0;\n  max-width: 100%;\n  min-width: 0;\n  margin: 0;\n}\n.slickgrid-container .slick-range-decorator {\n  z-index: 5;\n  pointer-events: none;\n  background: transparent;\n  border: none;\n  outline: black;\n}\ndiv.slick-large-editor-text {\n  z-index: 5;\n  position: absolute;\n  background: #f0f0f0;\n  padding: 5px;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);\n}\ndiv.slick-large-editor-text textarea {\n  backround: transparent;\n  width: 250px;\n  height: 80px;\n  border: 0;\n  outline: 0;\n}\ndiv.slick-large-editor-text div {\n  text-align: right;\n}\ndiv.slick-large-editor-text div button {\n  background-color: #d7d7d7;\n  border: 1px solid #a0a0a0;\n  cursor: pointer;\n  justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  text-align: center;\n  white-space: nowrap;\n}\n.wylib-mlb {\n  height: 100%;\n}\n.wylib-mlb .align-right {\n  text-align: right;\n}\n.wylib-mlb .align-center {\n  text-align: center;\n}\n.wylib-mlb .align-left {\n  text-align: left;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-modal {\n  position: absolute;\n  justify-content: center;\n  align-items: center;\n  min-width: 100%;\n  min-height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(230, 230, 230, 0.5);\n  z-index: 1000;\n}\n.wylib-modal .dialog {\n  position: relative;\n  flex: 0 0 auto;\n  min-width: 50%;\n  max-width: 90%;\n  padding: 5px;\n  border-radius: 6px;\n  border-style: solid;\n}\n.wylib-modal .buttons {\n  padding: 5px;\n  width: 100%;\n  text-align: right;\n}\n.wylib-modal .buttons button {\n  margin: 0 2px 0 2px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-svg .tools {\n  position: absolute;\n  right: 10px;\n}\n.wylib-svg button {\n  width: 100%;\n  padding: 4px;\n  background: #bbddff;\n}\n.wylib-svg .sliders input {\n  display: block;\n}\n.wylib-svg .menu {\n  position: absolute;\n  right: 0.25em;\n  top: 0.25em;\n}\n.wylib-svg .menu .icon {\n  height: 1em;\n  width: 1em;\n}\n.wylib-svg .toolbox {\n  opacity: 0.2;\n  display: none;\n  border: 1px solid blue;\n  border-radius: 4px;\n  padding: 4px;\n  transition: all 500ms ease-in-out;\n}\n.menu:hover + .toolbox {\n  display: block;\n  opacity: 1;\n}\n.wylib-svg .toolbox:hover {\n  opacity: 1;\n  display: block;\n}\n.wylib-svg .graph {\n  position: absolute;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.wylib-win {\n  touch-action: none;\n  position: absolute;\n  border-style: solid;\n}\n.wylib-win.toplevel {\n  z-index: 1;\n  min-width: 120px;\n  min-height: 14px;\n}\n.wylib-win > .header {\n  margin: 1px 1px 0 1px;\n  display: flex;\n  flex-flow: row nowrap;\n}\n.wylib-win > .menus,\n.wylib-win > operations {\n  flex: 0 0 auto;\n}\n.wylib-win .header > .handle {\n  flex: 1 1 auto;\n  overflow: hidden;\n  display: flex;\n}\n.wylib-win .header .handle .label {\n  padding: 0 0 0 0.3em;\n  position: relative;\n  display: inline-block;\n  align-self: flex-end;\n  white-space: nowrap;\n}\n.wylib-win .headerbar {\n  display: flex;\n}\n.wylib-win .childmenu {\n  display: flex;\n  align-items: flex-end;\n}\n.wylib-win .content {\n  overflow-x: hidden;\n  overflow-y: scrolled;\n  z-index: 1;\n}\n.wylib-win .wylib-menu {\n  z-index: 2;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
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


var content = __webpack_require__(/*! !../../../css-loader!../../../less-loader/dist/cjs.js!./light.css */ "./node_modules/css-loader/index.js!./node_modules/less-loader/dist/cjs.js!./node_modules/flatpickr/dist/themes/light.css");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/button.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/connect.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbe.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbp.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dbs.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/logitem.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/loglist.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menu.vue?vue&type=style&index=0&lang=less& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/menudock.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/mlb.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/modal.vue?vue&type=style&index=0&lang=less& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgnode.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/svgraph.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/win.vue?vue&type=style&index=0&lang=less& ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&");

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

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
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
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
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

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
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

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-app" }, [
    _c("div", { staticClass: "header" }, [
      _c("div", { staticClass: "title", attrs: { title: _vm.help } }, [
        _vm._v(_vm._s(_vm.title))
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "status" },
        [
          _c(
            "button",
            {
              attrs: {
                title: "Open a dialog for connecting to backend servers"
              },
              on: {
                click: function($event) {
                  _vm.conMenuPosted = !_vm.conMenuPosted
                }
              }
            },
            [_vm._v("Site:")]
          ),
          _vm._v(" "),
          _c(
            "span",
            { attrs: { title: "The server you are currently connected to" } },
            [_vm._v(_vm._s(_vm.currentSite || "Not connected"))]
          ),
          _vm._v(
            "\n      " +
              _vm._s(_vm.retryIn ? " (" + _vm.retryIn + ")" : null) +
              "\n      "
          ),
          _vm.conMenuPosted
            ? _c("wylib-connect", { attrs: { default: _vm.siteTry } })
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("hr"),
    _vm._v(" "),
    _c("div", { staticClass: "application" }, [
      _c(
        "div",
        { staticClass: "tabset" },
        [
          _vm._l(_vm.tabs, function(tab) {
            return _c(
              "div",
              {
                staticClass: "tab",
                class: _vm.tabClass(tab.tag),
                on: {
                  click: function($event) {
                    _vm.tabSelect(tab.tag)
                  }
                }
              },
              [_vm._v("\n        " + _vm._s(tab.title) + "\n      ")]
            )
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "tab-filler" },
            [
              _c("wylib-button", {
                attrs: {
                  size: _vm.tabHeight,
                  icon: "menu",
                  toggled: _vm.appMenu.posted,
                  title: _vm.appMenu.title
                },
                on: {
                  click: function($event) {
                    _vm.postAppMenu($event)
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "wylib-win",
                {
                  attrs: {
                    state: _vm.appMenu,
                    pinnable: "true",
                    lang: _vm.lang
                  },
                  on: {
                    close: function($event) {
                      _vm.appMenu.posted = false
                    }
                  }
                },
                [
                  _c("wylib-menu", {
                    attrs: {
                      state: _vm.appMenu.client,
                      config: _vm.appMenuConfig
                    },
                    on: {
                      done: function($event) {
                        _vm.appMenu.posted = _vm.appMenu.pinned
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "subwindows" },
        [
          _vm.modal.posted
            ? _c("wylib-modal", { attrs: { state: _vm.modal } })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.previews, function(win, idx) {
            return win.posted
              ? _c(
                  "wylib-win",
                  {
                    key: idx,
                    attrs: {
                      topLevel: "true",
                      state: win,
                      tag: "dbp:" + win.client.dbView,
                      lang: {
                        title: win.client.dbView + ":" + idx,
                        help: "Preview listing of view: " + win.client.dbView
                      }
                    },
                    on: {
                      close: function($event) {
                        win.posted = false
                      }
                    }
                  },
                  [_c("wylib-dbp", { attrs: { state: win.client } })],
                  1
                )
              : _vm._e()
          })
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "app-content" }, [_vm._t("default")], 2)
    ])
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
var render = function() {
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
        mousedown: _vm.mouseDown,
        mouseup: _vm.mouseUp,
        click: _vm.click
      }
    },
    [
      _c("svg", {
        staticClass: "icon",
        style: _vm.iconStyle,
        domProps: { innerHTML: _vm._s(_vm.iconSvg) }
      })
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib-connect" }, [
    _c(
      "div",
      {
        staticClass: "header",
        attrs: {
          title: "Keeps a list of servers and ports you normally connect to"
        }
      },
      [_vm._v("Connections:")]
    ),
    _vm._v(" "),
    _c("table", [
      _c(
        "tbody",
        [
          _c("tr", [
            _c("td", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model:value",
                    value: _vm.newSite,
                    expression: "newSite",
                    arg: "value"
                  }
                ],
                attrs: {
                  title:
                    "Type in the URL (domain:port) of the server you want to connect to"
                },
                domProps: { value: _vm.newSite },
                on: {
                  keyup: function($event) {
                    if (!("button" in $event) && $event.keyCode !== 13) {
                      return null
                    }
                    _vm.addSite(_vm.newSite)
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.newSite = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("td", [
              _c(
                "button",
                {
                  attrs: {
                    title: "Connect to an application server at this URL"
                  },
                  on: {
                    click: function($event) {
                      _vm.connectSite(_vm.newSite)
                    }
                  }
                },
                [_vm._v("Connect")]
              )
            ]),
            _vm._v(" "),
            _c("td", [
              _c(
                "button",
                {
                  attrs: { title: "Add a new server URL to my list" },
                  on: {
                    click: function($event) {
                      _vm.addSite(_vm.newSite)
                    }
                  }
                },
                [_vm._v("+")]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(_vm.sites, function(site) {
            return _c("tr", [
              _c("td", [_c("label", [_vm._v(_vm._s(site))])]),
              _vm._v(" "),
              _c("td", [
                _c(
                  "button",
                  {
                    attrs: {
                      title: "Connect to an application server at this URL"
                    },
                    on: {
                      click: function($event) {
                        _vm.connectSite(site)
                      }
                    }
                  },
                  [_vm._v("Connect")]
                )
              ]),
              _vm._v(" "),
              _c("td", [
                _c(
                  "button",
                  {
                    attrs: { title: "Remove this server from my list" },
                    on: {
                      click: function($event) {
                        _vm.removeSite(site)
                      }
                    }
                  },
                  [_vm._v("-")]
                )
              ])
            ])
          })
        ],
        2
      )
    ])
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
var render = function() {
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
              height: _vm.headerHeight,
              llang: "wm.dbeMenu"
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "headerfill" }),
          _vm._v(" "),
          _c(
            "div",
            {
              ref: "headStatus",
              staticClass: "wylib-dbe headstatus",
              attrs: {
                title: _vm.wm.dbePrimary ? _vm.wm.dbePrimary.help : null
              }
            },
            [
              _vm._v("PK:"),
              _c("input", {
                attrs: { disabled: "", size: _vm.keyEntSize },
                domProps: { value: _vm.state.key }
              })
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "subwindows" }),
      _vm._v(" "),
      _c("wylib-mdew", {
        ref: "mdew",
        attrs: { state: _vm.state.dews, data: _vm.dbData, bus: _vm.msgBus },
        on: { input: _vm.change }
      })
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-dbp" },
    [
      _c(
        "div",
        { ref: "header", staticClass: "header" },
        [
          _c("wylib-menudock", {
            attrs: {
              config: _vm.dockConfig,
              height: _vm.headerHeight,
              state: _vm.state.dock,
              lang: _vm.wm.dbpMenu
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "headerfill" })
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
              attrs: {
                state: _vm.state.edit,
                topLevel: "true",
                tag: "dbe:" + _vm.state.dbView,
                lang: _vm.editLang
              },
              on: {
                close: function($event) {
                  _vm.state.edit.posted = false
                }
              }
            },
            [
              _c("wylib-dbe", {
                attrs: { state: _vm.state.edit.client, bus: _vm.dbeBus },
                on: { modified: _vm.modified }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "wylib-win",
            {
              attrs: { state: _vm.state.colMenu, lang: _vm.wm.dbeColMenu },
              on: {
                close: function($event) {
                  _vm.state.colMenu.posted = false
                }
              }
            },
            [
              _c("wylib-menu", {
                attrs: {
                  state: _vm.state.colMenu.client,
                  config: _vm.colMenuConfig
                },
                on: {
                  done: function($event) {
                    _vm.state.colMenu.posted = false
                  }
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "wylib-win",
            {
              attrs: {
                state: _vm.state.filter,
                topLevel: "true",
                tag: "dbs:" + _vm.state.dbView,
                lang: _vm.wm.dbs
              },
              on: {
                close: function($event) {
                  _vm.state.filter.posted = false
                }
              }
            },
            [
              _c("wylib-dbs", {
                attrs: {
                  fields: _vm.logicFields,
                  state: _vm.state.filter.client
                },
                on: { search: _vm.search }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("wylib-mlb", {
        ref: "mlb",
        attrs: { state: _vm.state.grid, data: _vm.gridData, bus: _vm.mlbBus },
        on: {
          execute: _vm.executeRows,
          headerMenu: _vm.colMenuHandler,
          sort: _vm.sort,
          geometry: _vm.geometry
        }
      })
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
var render = function() {
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
              config: _vm.dockConfig,
              height: _vm.headerHeight,
              label: "Search",
              title: "Functions relating to stored queries"
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "headerfill" })
        ],
        1
      ),
      _vm._v(" "),
      _c("wylib-loglist", {
        attrs: { state: _vm.state.logic, config: _vm.logicConfig },
        on: { add: _vm.addNew, geometry: _vm.geometry }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=template&id=2976de66&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/dew.vue?vue&type=template&id=2976de66& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wylib wylib-dew",
      attrs: { title: _vm.lang ? _vm.lang.help : null }
    },
    [
      _vm.state.style == "chk"
        ? _c("div", { staticClass: "check", style: _vm.genStyle }, [
            _c("input", {
              ref: "input",
              staticClass: "checkbox",
              attrs: {
                type: "checkbox",
                autofocus: _vm.state.focus,
                disabled: _vm.disabled
              },
              domProps: { checked: _vm.userValue },
              on: {
                change: function($event) {
                  _vm.changed($event.target.checked)
                }
              }
            })
          ])
        : _vm.state.style == "mle"
          ? _c("textarea", {
              ref: "input",
              style: _vm.genStyle,
              attrs: {
                rows: _vm.height,
                cols: _vm.width,
                autofocus: _vm.state.focus,
                disabled: _vm.disabled
              },
              domProps: { value: _vm.userValue },
              on: { input: _vm.input }
            })
          : _vm.state.style == "pdm"
            ? _c(
                "select",
                {
                  ref: "input",
                  style: _vm.genStyle,
                  attrs: { autofocus: _vm.state.focus, disabled: _vm.disabled },
                  domProps: { value: _vm.userValue },
                  on: { input: _vm.input }
                },
                _vm._l(_vm.values, function(val) {
                  return _c("option", {
                    attrs: { label: val.title, title: val.help },
                    domProps: { value: val.value }
                  })
                })
              )
            : _c("input", {
                ref: "input",
                staticClass: "text",
                style: _vm.genStyle,
                attrs: {
                  type: "text",
                  autofocus: _vm.state.focus,
                  placeholder: this.state.hint,
                  disabled: _vm.disabled
                },
                domProps: { value: _vm.userValue },
                on: {
                  input: _vm.input,
                  keyup: function($event) {
                    if (
                      !("button" in $event) &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.submit($event)
                  }
                }
              })
    ]
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("input", { staticClass: "wylib wylib-indate" })
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
var render = function() {
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
        dragend: _vm.drop
      }
    },
    [
      _c("wylib-button", {
        staticClass: "button lower",
        attrs: { size: 12, icon: "play3", title: _vm.wMsg("litToSub") },
        on: {
          click: function($event) {
            _vm.$emit("lower")
          }
        }
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
              expression: "state.left"
            }
          ],
          staticClass: "left",
          attrs: { title: _vm.wMsg("litLeft") },
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.$set(
                _vm.state,
                "left",
                $event.target.multiple ? $$selectedVal : $$selectedVal[0]
              )
            }
          }
        },
        _vm._l(_vm.config.left, function(opt) {
          return _c(
            "option",
            {
              attrs: { label: opt.title, title: opt.help },
              domProps: { value: opt.tag }
            },
            [_vm._v(_vm._s(opt.title))]
          )
        })
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
              expression: "state.oper"
            }
          ],
          staticClass: "operator",
          attrs: { title: _vm.wMsg("litCompare") },
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.$set(
                _vm.state,
                "oper",
                $event.target.multiple ? $$selectedVal : $$selectedVal[0]
              )
            }
          }
        },
        _vm._l(_vm.config.oper, function(opt) {
          return _c(
            "option",
            {
              attrs: { label: opt.title, title: opt.help },
              domProps: { value: opt.tag }
            },
            [_vm._v(_vm._s(opt.title))]
          )
        })
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
                  expression: "state.right"
                }
              ],
              staticClass: "right",
              class: { inactive: !_vm.state.right || _vm.state.right == "" },
              attrs: { title: _vm.wMsg("litRight") },
              on: {
                change: function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.$set(
                    _vm.state,
                    "right",
                    $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                  )
                }
              }
            },
            [
              _c("option", {
                attrs: {
                  value: "",
                  label: "<" + _vm.wm.litManual.title + ">",
                  title: _vm.wMsg("litManual")
                }
              }),
              _vm._v(" "),
              _vm._l(_vm.config.right, function(opt) {
                return _c(
                  "option",
                  {
                    attrs: { label: opt.title, title: opt.help },
                    domProps: { value: opt.tag }
                  },
                  [_vm._v(_vm._s(opt.title))]
                )
              })
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
            expression: "state.entry"
          }
        ],
        class: { inactive: _vm.state.right && _vm.state.right != "" },
        attrs: { title: _vm.wMsg("litRightVal") },
        domProps: { value: _vm.state.entry },
        on: {
          keyup: function($event) {
            if (
              !("button" in $event) &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.submit($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.$set(_vm.state, "entry", $event.target.value)
          }
        }
      }),
      _vm._v(" "),
      _c("wylib-button", {
        staticClass: "button close",
        attrs: { size: 12, icon: "close", title: _vm.wMsg("litRemove") },
        on: {
          click: function($event) {
            _vm.$emit("close")
          }
        }
      })
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wylib wylib-loglist" },
    [
      _c("div", { staticClass: "header" }, [
        _c("svg", { ref: "connector", staticClass: "connector" }, [
          _c("path", { ref: "connectPath" })
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button andor",
            class: { and: _vm.state.and },
            attrs: { title: _vm.wMsg("lstAndOr") },
            on: {
              click: function($event) {
                _vm.state.and = !_vm.state.and
              }
            }
          },
          [_vm._v(_vm._s(_vm.joinFunction))]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button add",
            attrs: { title: _vm.wMsg("lstAddCond") },
            on: { click: _vm.addNew }
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
              click: function($event) {
                _vm.$emit("close")
              }
            }
          },
          [_vm._v("X")]
        )
      ]),
      _vm._v(" "),
      _vm._l(_vm.state.items, function(item, index) {
        return _c(
          "div",
          { staticClass: "subdivision" },
          [
            "and" in item
              ? _c("wylib-loglist", {
                  key: index,
                  attrs: { index: index, state: item, config: _vm.config },
                  on: {
                    input: function(val) {
                      item = val
                    },
                    close: function($event) {
                      _vm.closeChild(index)
                    },
                    geometry: _vm.childGeometry
                  }
                })
              : _c("wylib-logitem", {
                  key: index,
                  attrs: { index: index, state: item, config: _vm.config },
                  on: {
                    input: function(val) {
                      item = val
                    },
                    lower: function($event) {
                      _vm.lower(index)
                    },
                    close: function($event) {
                      _vm.closeChild(index)
                    },
                    insert: _vm.insert,
                    geometry: _vm.childGeometry
                  }
                })
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=template&id=5702b53c&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/mdew.vue?vue&type=template&id=5702b53c& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-mdew" }, [
    _c(
      "table",
      { staticClass: "wylib-mdew-nodrag" },
      [
        _vm._m(0),
        _vm._v(" "),
        _vm._l(_vm.state.fields, function(f) {
          return _c(
            "tr",
            { key: f.field, attrs: { title: f.lang ? f.lang.help : null } },
            [
              _c("td", { staticClass: "label" }, [
                _vm._v(
                  "\n        " +
                    _vm._s(f.lang ? f.lang.title : null) +
                    ":\n      "
                )
              ]),
              _vm._v(" "),
              _c(
                "td",
                [
                  _c("wylib-dew", {
                    ref: "dew~" + f.field,
                    refInFor: true,
                    attrs: {
                      field: f.field,
                      state: f.styles,
                      value: _vm.data[f.field],
                      values: f.values,
                      lang: f.lang,
                      bus: _vm.dewBus
                    },
                    on: { input: _vm.input, submit: _vm.submit }
                  })
                ],
                1
              )
            ]
          )
        })
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("colgroup", [_c("col", { staticClass: "titles" })])
  }
]
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-menu" }, [
    _c("div", { staticClass: "menu", attrs: { title: "" } }, [
      _c(
        "table",
        _vm._l(_vm.config, function(item) {
          return _c(
            "tr",
            {
              key: item.idx,
              attrs: { title: item.lang ? item.lang.help : null },
              on: {
                click: function($event) {
                  _vm.execute(item.call)
                },
                mouseenter: function($event) {
                  _vm.enterItem($event, item)
                }
              }
            },
            _vm._l(_vm.layout, function(fld) {
              return _c("td", { key: fld }, [
                fld == "icon"
                  ? _c("svg", {
                      staticClass: "icon",
                      staticStyle: { height: "1em", width: "1em" },
                      domProps: { innerHTML: _vm._s(_vm.iconSvg(item.icon)) }
                    })
                  : fld == "lang"
                    ? _c("div", [
                        _vm._v(
                          _vm._s(
                            (item.lang ? item.lang.title : null) || item.idx
                          )
                        )
                      ])
                    : fld == "input" && item.input
                      ? _c("input", { attrs: { type: item.input } })
                      : fld == "input" && item.menu
                        ? _c("svg", {
                            staticClass: "icon",
                            staticStyle: { height: "1em", width: "1em" },
                            domProps: {
                              innerHTML: _vm._s(_vm.iconSvg("play3"))
                            }
                          })
                        : _c("div", [_vm._v(_vm._s(item[fld]))])
              ])
            })
          )
        })
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "submenus" },
      _vm._l(_vm.config, function(item) {
        return item.menu
          ? _c(
              "wylib-win",
              {
                key: item.idx,
                ref: "submenu",
                refInFor: true,
                attrs: {
                  state: _vm.state.subs[item.idx],
                  pinnable: "true",
                  lang: item.lang
                },
                on: {
                  close: function($event) {
                    _vm.state.subs[item.idx].posted = false
                  }
                }
              },
              [
                _c("wylib-menu", {
                  attrs: {
                    state: _vm.state.subs[item.idx].client,
                    config: item.menu,
                    layout: item.layout ? item.layout : _vm.layout
                  },
                  on: {
                    done: function($event) {
                      _vm.state.subs[item.idx].posted =
                        _vm.state.subs[item.idx].pinned
                      _vm.$emit("done")
                    }
                  }
                })
              ],
              1
            )
          : _vm._e()
      }),
      1
    )
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
var render = function() {
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
            size: _vm.height,
            toggled: _vm.state.menu.posted,
            title: _vm.lang.title
          },
          on: {
            mousedown: function($event) {
              _vm.state.menu.posted = !_vm.state.menu.posted
            }
          }
        }),
        _vm._v(" "),
        _vm._l(_vm.config, function(conf) {
          return conf.shortcut
            ? _c("wylib-button", {
                key: conf.idx,
                staticClass: "shortcut",
                attrs: {
                  size: _vm.height,
                  icon: conf.icon,
                  toggled: conf.toggled,
                  disabled: "disabled" in conf ? conf.disabled : false,
                  title:
                    (conf.lang ? conf.lang.title : null) +
                    ":\n" +
                    (conf.lang ? conf.lang.help : null)
                },
                on: { click: conf.call }
              })
            : _vm._e()
        })
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
            attrs: { state: _vm.state.menu, pinnable: "true", lang: _vm.lang },
            on: {
              close: function($event) {
                _vm.state.menu.posted = false
              }
            }
          },
          [
            _c("wylib-menu", {
              attrs: { state: _vm.state.menu.client, config: _vm.config },
              on: {
                done: function($event) {
                  _vm.state.menu.posted = _vm.state.menu.pinned
                }
              }
            })
          ],
          1
        )
      ],
      1
    )
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-mlb" }, [_vm._m(0)])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { ref: "gridTable", staticClass: "slickgrid-container" })
  }
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
var render = function() {
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
        [
          _c("div", {
            domProps: {
              innerHTML: _vm._s(_vm.reason + ": " + _vm.state.message)
            }
          }),
          _vm._v(" "),
          _c("wylib-mdew", {
            attrs: { state: _vm.state.dews, data: _vm.state.data },
            on: { input: _vm.change, submit: _vm.submit }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "buttons" },
            _vm._l(_vm.buttons, function(but) {
              return _c("button", {
                key: but.tag,
                attrs: { title: but.lang ? but.lang.help : "Confirm" },
                domProps: {
                  innerHTML: _vm._s(but.lang ? but.lang.title : "OK")
                },
                on: {
                  click: function($event) {
                    _vm.press(but.tag)
                  }
                }
              })
            })
          )
        ],
        1
      )
    ]
  )
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "g",
    { attrs: { transform: _vm.transform } },
    [
      _c("g", {
        style: _vm.objStyle,
        domProps: { innerHTML: _vm._s(_vm.state.code) }
      }),
      _vm._v(" "),
      _c(
        "g",
        { staticClass: "hubs" },
        _vm._l(_vm.state.links, function(link) {
          return _c("g", {
            domProps: { innerHTML: _vm._s(_vm.hubs[_vm.hubIndex(link)]) }
          })
        })
      ),
      _vm._v(" "),
      _vm._l(_vm.state.links, function(link) {
        return _c("g", { staticClass: "connectors" }, [
          _c("path", {
            attrs: {
              d: _vm.connectors[_vm.linkName(link)],
              "marker-end": "url(#marker-arrow)",
              stroke: "blue",
              "stroke-width": "1",
              fill: "none"
            }
          })
        ])
      })
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wylib wylib-svg" }, [
    _c(
      "svg",
      { staticClass: "graph", attrs: { viewBox: _vm.viewCoords } },
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
                fill: "inherit"
              }
            },
            [_c("path", { attrs: { d: "M0,0 L0,8 L12,4 z" } })]
          )
        ]),
        _vm._v(" "),
        _c("path", {
          attrs: {
            d: _vm.border,
            stroke: "grey",
            "stroke-width": "1",
            fill: "none"
          }
        }),
        _vm._v(" "),
        _vm._l(_vm.state.nodes, function(spr, idx) {
          return _c("wylib-svgnode", {
            key: idx,
            ref: "node",
            refInFor: true,
            attrs: { state: spr },
            on: { drag: _vm.moveHandler }
          })
        })
      ],
      2
    ),
    _vm._v(" "),
    _c("div", { ref: "tools", staticClass: "tools", style: _vm.toolStyle }, [
      _c("div", { staticClass: "menu" }, [
        _c("svg", {
          staticClass: "icon",
          staticStyle: { stroke: "black", fill: "black" },
          domProps: { innerHTML: _vm._s(_vm.iconSvg("menu")) }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "toolbox" }, [
        _c(
          "button",
          {
            staticClass: "nodrag",
            attrs: {
              title:
                "Attempt to distribute objects on the chart (hold to repeat)"
            },
            on: {
              mousedown: _vm.buttonDown,
              mouseup: _vm.buttonUp,
              mouseleave: _vm.buttonUp
            }
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
              click: function($event) {
                _vm.$emit("refresh")
              }
            }
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
              click: function($event) {
                _vm.$emit("reset")
              }
            }
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
                value: _vm.pushForce,
                expression: "pushForce"
              }
            ],
            staticClass: "slider nodrag",
            attrs: {
              type: "range",
              min: "1",
              max: "100",
              title: "How hard the nodes repel each other"
            },
            domProps: { value: _vm.pushForce },
            on: {
              __r: function($event) {
                _vm.pushForce = $event.target.value
              }
            }
          }),
          _vm._v("Repel: " + _vm._s(_vm.pushForce)),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.pullForce,
                expression: "pullForce"
              }
            ],
            staticClass: "slider nodrag",
            attrs: {
              type: "range",
              min: "1",
              max: "100",
              title: "How hard the links attract connected nodes"
            },
            domProps: { value: _vm.pullForce },
            on: {
              __r: function($event) {
                _vm.pullForce = $event.target.value
              }
            }
          }),
          _vm._v("Attract: " + _vm._s(_vm.pullForce)),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.randForce,
                expression: "randForce"
              }
            ],
            staticClass: "slider nodrag",
            attrs: {
              type: "range",
              min: "1",
              max: "100",
              title: "How much random force to introduce"
            },
            domProps: { value: _vm.randForce },
            on: {
              __r: function($event) {
                _vm.randForce = $event.target.value
              }
            }
          }),
          _vm._v("Random: " + _vm._s(_vm.randForce))
        ])
      ])
    ])
  ])
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
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wylib wylib-win",
      class: { toplevel: _vm.topLevel },
      style: [_vm.winStyleS, _vm.winStyleF]
    },
    [
      _c(
        "div",
        {
          staticClass: "header",
          style: _vm.headerStyle,
          attrs: { title: _vm.lang.help }
        },
        [
          _c(
            "div",
            { staticClass: "headerbar" },
            [
              _vm.topLevel
                ? _c("wylib-button", {
                    attrs: {
                      size: _vm.headerHeight,
                      icon: "menu",
                      toggled: _vm.winMenu.posted,
                      title: _vm.wm.winMenu ? _vm.wm.winMenu.help : null
                    },
                    on: {
                      click: function($event) {
                        _vm.winMenu.posted = !_vm.winMenu.posted
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.topLevel && _vm.pinnable
                ? _c("wylib-button", {
                    attrs: {
                      size: _vm.headerHeight,
                      icon: "pushpin",
                      toggled: _vm.state.pinned,
                      title: _vm.wm.winPinned ? _vm.wm.winPinned.help : null
                    },
                    on: {
                      click: function($event) {
                        _vm.state.pinned = !_vm.state.pinned
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("div", { ref: "childMenu", staticClass: "childmenu" })
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
                click: function() {
                  if (_vm.top) {
                    _vm.top.layer(1)
                  }
                }
              }
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
                        : "1em"
                  }
                },
                [_vm._v("\n        " + _vm._s(_vm.lang.title) + "\n      ")]
              )
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
                      size: _vm.headerHeight,
                      icon: "close",
                      color: _vm.pr.butCloseColor,
                      hoverColor: _vm.pr.butCloseHoverColor,
                      title: _vm.wm.winClose ? _vm.wm.winClose.help : null
                    },
                    on: { click: _vm.close }
                  })
                : _vm._e()
            ],
            1
          )
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
                  attrs: {
                    state: _vm.winMenu,
                    pinnable: "true",
                    lang: _vm.wm.winMenu
                  },
                  on: {
                    close: function($event) {
                      _vm.winMenu.posted = false
                    }
                  }
                },
                [
                  _c("wylib-menu", {
                    attrs: {
                      state: _vm.winMenu.client,
                      config: _vm.winMenuConfig
                    },
                    on: {
                      done: function($event) {
                        _vm.winMenu.posted = _vm.winMenu.pinned
                      }
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.topLevel && _vm.modal.posted
            ? _c("wylib-modal", { attrs: { state: _vm.modal } })
            : _vm._e()
        ],
        1
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
              expression: "!state.minim"
            }
          ],
          staticClass: "content wylib-win-nodrag",
          style: { height: "calc(100% - " + (_vm.headerHeight + 4) + "px)" }
        },
        [_vm._t("default")],
        2
      )
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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/app.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/app.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/app.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
  messageBus: function messageBus(vm) {
    //Bus for messages to be distributed to registered clients
    this.master = vm;
    this.clients = {};

    this.register = function (id, cb) {
      //Clients register to receive callbacks
      //console.log("Bus register:", id, cb)
      if (cb) this.clients[id] = cb;else if (id in this.clients && !cb) delete this.clients[id];
    }, this.notify = function (message, data) {
      var _this = this;

      //Every registered client will get every message
      var replies = [];
      //console.log("Bus notify:", this.clients)
      Object.keys(this.clients).forEach(function (key) {
        //console.log("Bus:", this.master, "notifying:", key)
        replies.push(_this.clients[key](message, data));
      });
      //console.log("Bus ans:", this.master, replies)
      return replies;
    };
  },
  eventBus: function eventBus() {
    //Like messageBus, but clients can listen for specific events
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
    this.notify = function (event, data) {
      var _this2 = this;

      //Invoke all listener callbacks for: event
      var replies = [];
      //console.log("Notify event:", event, this.events[event])
      if (this.events[event]) Object.keys(this.events[event]).forEach(function (id) {
        replies.push(_this2.events[event][id](data));
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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/button.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************!*\
  !*** ./src/button.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/button.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //Common support functions
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
//- Need to renormalize all registered windows after raise
//- 


var _wyseman = __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js");

var _wyseman2 = _interopRequireDefault(_wyseman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docIndex = 0;
var topWins = {};
var zLevelMod = 10;
var storeKey = 'wylibState_';

module.exports = {
  langTemplate: function langTemplate() {
    return { title: null, help: null };
  },
  react: function react(vm, properties) {
    var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : vm.state;
    //Initialize properties at a specified node in a component object
    Object.keys(properties).forEach(function (key) {
      //console.log("React:", key);
      if (!(key in node)) vm.$set(node, key, properties[key]);
      //      if (!(key in node)) vm.$set(node, key, null)
      //      if (!node[key]) node[key] = properties[key]
    });
  },
  topHandler: function topHandler(cb, context) {
    //Create a handler for communicating to/from the toplevel window and generating modal dialogs there
    this.modalCB = cb;
    this.postCB = null;
    this.context = context;

    if (context) topWins[context.id] = context; //Keep a list of all participating windows
    //console.log("Registering ID", context ? context.id : null)

    this.emit = function (code, ev) {
      this.context.$emit(code, ev);
    }, this.layer = function (layer) {
      if (!layer) return;
      var th = this.context,
          newLayer = void 0,
          maxLevel = -Number.MAX_VALUE,
          minLevel = Number.MAX_VALUE;
      //console.log("Layer request:", layer, "from:", th.id, th.$options.name, "cur:", th.state.layer)
      Object.keys(topWins).forEach(function (id) {
        var st = topWins[id].state;
        //console.log("  loop id:", id, st.layer)
        if (st.layer > maxLevel) maxLevel = st.layer;
        if (st.layer < minLevel) minLevel = st.layer;
      });
      //console.log("      min:", minLevel, "max:", maxLevel)
      if (layer > 0) newLayer = maxLevel + zLevelMod;else newLayer = minLevel - zLevelMod;
      //console.log("Set:", th.id, "to:", newLayer)
      th.state.layer = newLayer;
      if (newLayer < 0) Object.values(topWins).forEach(function (vmthis) {
        //console.log("  adjusting", vmthis.id, "to:", vmthis.state.layer - newLayer)
        vmthis.state.layer -= newLayer;
      });
    };

    this.makeMessage = function (msg) {
      //Make a dialog message, possibly from a message object
      if (typeof msg == 'string') return msg;
      if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) == 'object') {
        if (msg.lang && msg.lang.title && msg.lang.help) return msg.lang.title + ':<br>' + msg.lang.help + (msg.detail ? '<br>(' + msg.detail + ')' : '');
        if (msg.message) return msg.message;
      }
      return msg;
    };

    this.dewArray = function (arg1, arg2) {
      var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ent';
      //Make an array of objects suitable for mdew configuration
      var retArr = []; //Call as: field,lang,style or [[field,lang,style] [field,lang,style]]
      if (typeof arg1 == 'string' && (typeof arg2 === 'undefined' ? 'undefined' : _typeof(arg2)) == 'object') arg1 = [[arg1, arg2, arg3]];
      if (Array.isArray(arg1)) {
        var focus = true;
        arg1.forEach(function (el) {
          var _el = _slicedToArray(el, 3),
              field = _el[0],
              lang = _el[1],
              style = _el[2];

          if (!style) style = arg3;
          retArr.push({ field: field, lang: lang, styles: { style: style, focus: focus } });
          focus = false;
        });
      }
      //console.log("retArr:", retArr)
      return retArr;
    };

    this.error = function (msg, cb) {
      this.modalCB({ posted: true, reason: 'modError', message: this.makeMessage(msg), buttons: ['modOK'], affirm: 'modOK', dews: {}, data: {}, cb: cb });
    };
    this.notice = function (msg, cb) {
      this.modalCB({ posted: true, reason: 'modNotice', message: this.makeMessage(msg), buttons: ['modOK'], affirm: 'modOK', dews: {}, data: {}, cb: cb });
    };
    this.confirm = function (msg, cb) {
      this.modalCB({ posted: true, reason: 'modConfirm', message: this.makeMessage(msg), buttons: ['modCancel', 'modYes'], affirm: 'modYes', dews: {}, data: {}, cb: cb });
    };
    this.query = function (msg, fields, data, cb) {
      this.modalCB({ posted: true, reason: 'modQuery', message: this.makeMessage(msg), buttons: ['modCancel', 'modYes'], affirm: 'modYes', dews: { fields: fields }, data: data, cb: cb });
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
  },


  clone: function clone(o) {
    //Deep object copy
    var output = Array.isArray(o) ? [] : {},
        v = void 0,
        key = void 0;
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === "object" ? this.clone(v) : v;
    }
    return output;
  },

  saveState: function saveState(tag, data) {
    localStorage.setItem(storeKey + tag, JSON.stringify(data));
  },

  getState: function getState(tag) {
    var st = localStorage.getItem(storeKey + tag);
    //console.log("Getting:", st)
    return st && st != 'undefined' ? JSON.parse(st) : null;
  },

  clearState: function clearState(tag) {
    localStorage.removeItem(storeKey + tag);
  }

  //  docView: function(view) {
  //    docIndex++
  //console.log("Ddocument preview:", view)
  //    Wyseman.request('doc_'+docIndex, 'preview', {view}, (data) => {
  //console.log("Open document preview:", data)
  ////      window.open
  //    })
  //  }
};

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/connect.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/connect.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./connect.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/connect.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_connect_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dbe.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dbe.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbe.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbe.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbe_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dbp.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dbp.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbp.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbp.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbp_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dbs.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dbs.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dbs.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dbs.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dbs_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony import */ var _dew_vue_vue_type_template_id_2976de66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dew.vue?vue&type=template&id=2976de66& */ "./src/dew.vue?vue&type=template&id=2976de66&");
/* harmony import */ var _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dew.vue?vue&type=script&lang=js& */ "./src/dew.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dew.vue?vue&type=style&index=0&lang=less& */ "./src/dew.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _dew_vue_vue_type_template_id_2976de66___WEBPACK_IMPORTED_MODULE_0__["render"],
  _dew_vue_vue_type_template_id_2976de66___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dew.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/dew.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/dew.vue?vue&type=template&id=2976de66&":
/*!****************************************************!*\
  !*** ./src/dew.vue?vue&type=template&id=2976de66& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_template_id_2976de66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./dew.vue?vue&type=template&id=2976de66& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/dew.vue?vue&type=template&id=2976de66&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_template_id_2976de66___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_dew_vue_vue_type_template_id_2976de66___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
}, _defineProperty(_Icons, 'upload2', '\n    <path d="M0 28h32v2h-32zM32 24v2h-32v-2l4-8h8v4h8v-4h8zM7 10l9-9 9 9h-7v8h-4v-8z"></path>\n  '), _defineProperty(_Icons, 'download', '\n    <path d="M23 14l-8 8-8-8h5v-12h6v12zM15 22h-15v8h30v-8h-15zM28 26h-4v-2h4v2z"></path>\n  '), _defineProperty(_Icons, 'download2', '\n    <path d="M28 16h-5l-7 7-7-7h-5l-4 8v2h32v-2l-4-8zM0 28h32v2h-32v-2zM18 10v-8h-4v8h-7l9 9 9-9h-7z"></path>\n  '), _defineProperty(_Icons, 'sun', '\n    <path d="M16 26c1.105 0 2 0.895 2 2v2c0 1.105-0.895 2-2 2s-2-0.895-2-2v-2c0-1.105 0.895-2 2-2zM16 6c-1.105 0-2-0.895-2-2v-2c0-1.105 0.895-2 2-2s2 0.895 2 2v2c0 1.105-0.895 2-2 2zM30 14c1.105 0 2 0.895 2 2s-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2zM6 16c0 1.105-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2c1.105 0 2 0.895 2 2zM25.899 23.071l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0zM6.101 8.929l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0zM25.899 8.929c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414zM6.101 23.071c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414z"></path>\n    <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM16 21c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"></path>\n  '), _defineProperty(_Icons, 'ticket', '\n    <path d="M18 10l4 4-8 8-4-4zM31.298 9.297l-2.297-2.297-1 1c-0.512 0.512-1.219 0.828-2 0.828-1.562 0-2.829-1.266-2.829-2.828 0-0.781 0.317-1.489 0.829-2.001l1-1-2.297-2.297c-0.936-0.936-2.469-0.936-3.405 0l-18.595 18.595c-0.936 0.936-0.936 2.469 0 3.405l2.297 2.297 0.999-0.999c0.512-0.513 1.22-0.83 2.001-0.83 1.562 0 2.828 1.266 2.828 2.828 0 0.781-0.317 1.489-0.829 2.001l-1 1 2.297 2.297c0.936 0.936 2.469 0.936 3.405 0l18.595-18.595c0.936-0.937 0.936-2.469 0-3.406zM14 26l-8-8 12-12 8 8-12 12z"></path>\n  '), _Icons);

module.exports = function (name) {
  if (name == null) return Object.keys(Icons);
  return '<svg viewBox="0 0 32 32">' + Icons[name] + '</svg>';
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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./indate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/indate.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_indate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
//import Application	from './app.vue'
//import DataView		from './dbp.vue'
//import DataEdit		from './dbe.vue'
//import MultiView	from './mlb.vue'
//import MultiEdit	from './mdew.vue'
//import Window		from './win.vue'
//import Wyseman		from './wyseman.js'
//
//module.exports = {
//  Application,
//  DataView,
//  DataEdit,
//  MultiView,
//  MultiEdit,
//  Window,
//  Wyseman
//}

module.exports = {
  Application: __webpack_require__(/*! ./app.vue */ "./src/app.vue").default,
  Common: __webpack_require__(/*! ./common.js */ "./src/common.js"),
  DataView: __webpack_require__(/*! ./dbp.vue */ "./src/dbp.vue").default,
  DataEdit: __webpack_require__(/*! ./dbe.vue */ "./src/dbe.vue").default,
  MultiView: __webpack_require__(/*! ./mlb.vue */ "./src/mlb.vue").default,
  MultiEdit: __webpack_require__(/*! ./mdew.vue */ "./src/mdew.vue").default,
  SvGraph: __webpack_require__(/*! ./svgraph.vue */ "./src/svgraph.vue").default,
  Window: __webpack_require__(/*! ./win.vue */ "./src/win.vue").default,
  Wyseman: __webpack_require__(/*! ./wyseman.js */ "./src/wyseman.js")
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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/logitem.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/logitem.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./logitem.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/logitem.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_logitem_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/loglist.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/loglist.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./loglist.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/loglist.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_loglist_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony import */ var _mdew_vue_vue_type_template_id_5702b53c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mdew.vue?vue&type=template&id=5702b53c& */ "./src/mdew.vue?vue&type=template&id=5702b53c&");
/* harmony import */ var _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mdew.vue?vue&type=script&lang=js& */ "./src/mdew.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mdew.vue?vue&type=style&index=0&lang=css& */ "./src/mdew.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mdew_vue_vue_type_template_id_5702b53c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mdew_vue_vue_type_template_id_5702b53c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/mdew.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************!*\
  !*** ./src/mdew.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/mdew.vue?vue&type=template&id=5702b53c&":
/*!*****************************************************!*\
  !*** ./src/mdew.vue?vue&type=template&id=5702b53c& ***!
  \*****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_template_id_5702b53c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./mdew.vue?vue&type=template&id=5702b53c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/mdew.vue?vue&type=template&id=5702b53c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_template_id_5702b53c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mdew_vue_vue_type_template_id_5702b53c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/menu.vue?vue&type=style&index=0&lang=less&":
/*!********************************************************!*\
  !*** ./src/menu.vue?vue&type=style&index=0&lang=less& ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menu.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/menudock.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************!*\
  !*** ./src/menudock.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./menudock.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/menudock.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_menudock_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mlb.vue?vue&type=style&index=0&lang=less& */ "./src/mlb.vue?vue&type=style&index=0&lang=less&");
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/mlb.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/mlb.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./mlb.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/mlb.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_mlb_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/modal.vue?vue&type=style&index=0&lang=less&":
/*!*********************************************************!*\
  !*** ./src/modal.vue?vue&type=style&index=0&lang=less& ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./modal.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/modal.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_modal_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "./src/prefs.js":
/*!**********************!*\
  !*** ./src/prefs.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var Preferences = {
  dataBackground: '#fefefe', //Data entry areas
  frameBackground: '#f4f4f4', //Containers
  titleBackground: '#dfdfdf', //Labels, column headers, etc.
  dragOverBackground: '#ffa800',

  winBorderWidth: 2,
  winBorderRad: 5,
  winBorderColor: '#c0c0c0',
  winHighlightColor: '#202060',
  winOpacity: 0.94,
  winHeadColorHigh: '#f0f0f8',
  winHeadColorLow: '#b8b8c0',
  winFullHeader: 22,
  winSmallHeader: 12,
  winInitWidth: 500,
  winInitHeight: 300,
  winSubWindowX: 80,
  winSubWindowY: 30,

  butSize: 18,
  butHoverColor: '#88ff88',
  butActiveColor: '#55cc55',
  butToggledColor: '#66aa66',
  butBackground: '#f4f6f0',
  butIconFill: '#2482a4',
  butIconStroke: '#222222',
  butCloseColor: '#ffdddd',
  butCloseHoverColor: '#ffbbbb',
  butDisabledColor: '#aaaaaa',
  butDisabledBackground: '#eeeeee',

  dewInvalidColor: '#f02020',
  dewDirtyColor: '#f0a020',
  dewBorderColor: '#808080',
  dewFlagWidth: 3,
  dewDefHeight: 2, //Default textarea dimensions
  dewDefWidth: 40, //Default textarea dimensions

  mlbDefWidth: 100,
  mlbCharWidth: 8,

  _callbacks: {},
  _currentLanguage: 'en',

  get language() {
    return this._currentLanguage;
  },
  set language(lang) {
    var _this = this;

    //console.log("Set language:", lang)
    this._currentLanguage = lang;
    Object.keys(this._callbacks).forEach(function (id) {
      //Notify all listeners
      _this._callbacks[id](_this._currentLanguage);
    });
  },

  register: function register(id, cb) {
    //Remember a component to call back if language changes
    //console.log("Prefs register ID:", id)
    if (cb) this._callbacks[id] = cb;else delete this._callbacks[id];
  }
};

//Preferences.text = Preferences._textCache.en
module.exports = Preferences;

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

  saveas: function saveas(comp, name, descr, state, errCB, okCB) {
    var view = 'wylib.set_data(text, text, text, int, jsonb)',
        params = [comp, name, descr, null, JSON.stringify(state)];
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
        order = [3],
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
  }

}; //Manage saving states to and restoring them from the database
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------
// TODO:
//- Support separately save and save-as for states
//- On initial call, query for all (or maybe certain common) components (to avoid multiple calls in the startup)
//- How to report errors to the correct toplevel? (See Fixme below)
//- 

_wyseman2.default.listen('state_listen', 'wylib', function (msg) {
  console.log("Got async wylib message:", msg);
  if (msg.target == "data") StateManager.queryData(msg.component); //Refresh restore states menu
});

module.exports = StateManager;

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/svgnode.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/svgnode.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgnode.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgnode.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgnode_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/svgraph.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************!*\
  !*** ./src/svgraph.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./svgraph.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/svgraph.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_svgraph_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Copyright WyattERP.org: See LICENSE in the root of this package
//Rectangular, polar 2D vector conversions

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

  add: function add(v1, v2) {
    if (!('x' in v1 || 'y' in v1)) v1 = this.ptor(v1); //convert to rectangular?
    if (!('x' in v2 || 'y' in v2)) v2 = this.ptor(v2);
    return { x: v1.x + v2.x, y: v1.y + v2.y };
  },

  sub: function sub(v1, v2) {
    if (!('x' in v1 || 'y' in v1)) v1 = this.ptor(v1); //Convert to rectangular?
    if (!('x' in v2 || 'y' in v2)) v2 = this.ptor(v2);
    return { x: v1.x - v2.x, y: v1.y - v2.y };
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
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/win.vue?vue&type=style&index=0&lang=less&":
/*!*******************************************************!*\
  !*** ./src/win.vue?vue&type=style&index=0&lang=less& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader!../node_modules/css-loader!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/less-loader/dist/cjs.js!../node_modules/vue-loader/lib??vue-loader-options!./win.vue?vue&type=style&index=0&lang=less& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/win.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_win_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

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

/***/ "./src/wyseman.js":
/*!************************!*\
  !*** ./src/wyseman.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //Communicate with the wyseman backend, control and model layers
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
//- 


var _prefs = __webpack_require__(/*! ./prefs.js */ "./src/prefs.js");

var _prefs2 = _interopRequireDefault(_prefs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

  close: function close() {
    //Close server connection from this end
    this.socket.close();
    this.notify(this.addr = '');
  },
  connect: function connect(address) {
    var _this = this;

    //Attempt to connect to backend server
    //console.log("Connect: " + address)
    if (!address) address = localStorage.siteSocket; //If no address given, default to the last used one
    if (!address) return; //If still nothing to connect to, give up
    this.url = 'ws:/' + address; //Build websocket URL
    this.socket = new WebSocket(this.url); //Try to connect

    this.socket.addEventListener('error', function (event) {
      //If we get an error connecting
      //console.log("Error connecting to site:", address)
      _this.notify(_this.address = '');
    });

    this.socket.addEventListener('close', function (event) {
      //If the socket gets closed
      //console.log("Connection closed to:", address)
      _this.notify(_this.address = '');
    });

    this.socket.addEventListener('open', function (event) {
      //When socket is open and ready
      _this.notify(_this.address = address); //Tell everyone we're connected
      localStorage.setItem('siteSocket', address); //Remember where we were connected
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
            console.log('Notify group: ', chan, data);
            cb(data); //Call any listeners
          });
        }

        if (!id || !view || !action) return; //Invalid packet

        if (action == 'meta' || action == 'lang') {
          //Special handling for meta and language data
          _this.procColumns(data); //Reorganize columns array as object
          var index = action + '~' + view; //Where we will save in localStorage
          if (action == 'lang') {
            //console.log(" opt.language:", id, this.handlers[id], this.handlers[id].lang.language)
            var language = _this.handlers[id].lang.language || 'en';
            index = 'lang_' + language + '~' + view; //Save each language separately
            _this.procMessages(data); //Reorganize messages array as object
            _this.langCache[language][view] = data; //Cache language data for this view
          } else {
            _this.metaCache[view] = data; //Cache meta data
            _this.linkLang(view); //Can access language information from the view meta data
            if (pkt.ui) data.ui = pkt.ui; //Add in any user interface specification, if we got one
            //Fixme: also request language for any subordinate views
          }
          //console.log(" localStorage:", index)
          localStorage[index] = JSON.stringify(data); //Save also to browser cache
          _this.pending[action][view] = false; //Mark pending as now complete
          setTimeout(function () {
            _this.procQueue();
          }, 50); //See if any other meta commands are queued up
        }

        if (_this.handlers[id] && _this.handlers[id][action] && _this.handlers[id][action].cb) {
          //If we have a registered handler,
          //console.log("Calling:")
          if (error && error.code && error.code.match(/^!\w*/)) {
            //If there is an error that needs translation
            var _error$code$slice$spl = error.code.slice(1).split('.'),
                _error$code$slice$spl2 = _slicedToArray(_error$code$slice$spl, 3),
                sch = _error$code$slice$spl2[0],
                tab = _error$code$slice$spl2[1],
                code = _error$code$slice$spl2[2],
                errView = [sch, tab].join('.'),
                cache = _this.cache.lang[errView];
            //console.log("Error:", error, errView, code, cache)


            if (!cache) {
              //If we don't already have it
              _this.request('_wm_E_' + id, 'lang', { language: _prefs2.default.language, view: errView }, function (d, e) {
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
    data.messages.forEach(function (rec, idx) {
      data.msg[rec['code']] = data.messages[idx];
    });
  },
  linkLang: function linkLang(view) {
    //Merge in table language data
    var lang = this.cache.lang[view];
    var meta = this.cache.meta[view];
    if (!lang) return; //No language data...
    //console.log("LinkLang\n  lang:", lang, "  meta:", meta)
    if (!meta.msg) meta.msg = {};
    if (lang.msg) Object.assign(meta.msg, lang.msg);
    if (lang.help) meta.help = lang.help;
    if (lang.title) meta.title = lang.title;
    Object.keys(meta.col).forEach(function (key) {
      if (lang.col[key]) Object.assign(meta.col[key], lang.col[key]);
    });
  },
  //procColumns

  request: function request(id, action, opt, cb) {
    var _this2 = this;

    //Ask to receive specified information back asynchronously
    if (typeof opt === 'string') {
      opt = { view: opt };
    } //Shortcut: just give view for options
    //console.log("Request ID: " + id + " action: " + action + " Opt: " + JSON.stringify(opt))
    var view = opt ? opt.view : null;
    if (!this.address || this.address == '') {
      //If connection not yet open
      this.sendQue.push([id, action, opt, cb]); //Queue the request for later

      var idx = action + '~' + view; //Where saved in localStorage
      if (localStorage[idx]) {
        //Use any historic value from browser for now
        var data = JSON.parse(localStorage[idx]);
        //console.log("From localStorage:", data)
        if (cb) cb(data); //Call back with cached (possibly obsolete) data
      }
      return;
    }

    //console.log("  processing: ", action, " View:", view)
    if (action == 'meta') {
      if (!this.cache.lang[view]) //Force language request before our meta data requested
        this.request('_wm_L_' + id, 'lang', { language: _prefs2.default.language, view: view });
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
    //console.log("Write to backend:" + this.url + " Data:" + JSON.stringify(msg))
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
    console.log("Listening for:", chan);
    this.listens[chan][id] = cb;
  }
};

_prefs2.default.register('_wyseman', function (language) {
  //Register callback for when language changes
  console.log("Wyseman new language:", language);
  if (!Wyseman.langCache[language]) Wyseman.langCache[language] = {};
  Wyseman.cache.lang = Wyseman.langCache[language]; //Point to stored data in the new language

  var view = 'wylib.data';Wyseman.request('_wyseman_' + view, 'lang', { language: language, view: view });

  Object.keys(Wyseman.cache.meta).forEach(function (view) {
    //Fetch all necessary text in new language
    Wyseman.request('_wyseman_' + view, 'lang', { language: language, view: view }, function (data) {
      Wyseman.linkLang(view);
      //console.log("  got new language for:", view, data)
      Object.keys(Wyseman.callbacks[view]).forEach(function (id) {
        //console.log("    CB:", view, id, Wyseman.metaCache[view])
        Wyseman.callbacks[view][id](Wyseman.metaCache[view]);
      });
    });
  });
});

if (!Wyseman.cache) {
  var language = _prefs2.default.language;
  if (!Wyseman.langCache[language]) Wyseman.langCache[language] = {};
  Wyseman.cache = { meta: Wyseman.metaCache, lang: Wyseman.langCache[language] };
}

module.exports = Wyseman;

/***/ }),

/***/ "element-resize-detector":
/*!******************************************!*\
  !*** external "element-resize-detector" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("element-resize-detector");

/***/ }),

/***/ "flatpickr":
/*!****************************!*\
  !*** external "flatpickr" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("flatpickr");

/***/ }),

/***/ "interactjs":
/*!*****************************!*\
  !*** external "interactjs" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("interactjs");

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