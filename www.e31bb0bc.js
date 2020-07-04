// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/rusty-rogue-wasm/rusty_rogue_wasm_bg.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greet = greet;
exports.dbg_print = dbg_print;
exports.__wbindgen_throw = exports.__wbg_log_d85e484a8ba03c98 = exports.__wbg_error_4bb6c2a97407129a = exports.__wbg_stack_558ba5917b466edd = exports.__wbg_new_59cb74e423758ede = exports.__wbindgen_object_drop_ref = exports.__wbg_alert_5706036d1ab93680 = exports.__wbindgen_string_new = exports.Map = exports.TileType = void 0;

var wasm = _interopRequireWildcard(require("./rusty_rogue_wasm_bg.wasm"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
let cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
/**
*/


function greet() {
  wasm.greet();
}

let WASM_VECTOR_LEN = 0;
const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;
let cachedTextEncoder = new lTextEncoder('utf-8');
const encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function (arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
* @param {string} msg
*/


function dbg_print(msg) {
  var ptr0 = passStringToWasm0(msg, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.dbg_print(ptr0, len0);
}

let cachegetInt32Memory0 = null;

function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachegetInt32Memory0;
}
/**
*/


const TileType = Object.freeze({
  Wall: 0,
  Floor: 1
});
/**
*/

exports.TileType = TileType;

class Map {
  static __wrap(ptr) {
    const obj = Object.create(Map.prototype);
    obj.ptr = ptr;
    return obj;
  }

  free() {
    const ptr = this.ptr;
    this.ptr = 0;

    wasm.__wbg_map_free(ptr);
  }
  /**
  * @returns {number}
  */


  width() {
    var ret = wasm.map_width(this.ptr);
    return ret >>> 0;
  }
  /**
  * @returns {number}
  */


  height() {
    var ret = wasm.map_height(this.ptr);
    return ret >>> 0;
  }
  /**
  * @returns {number}
  */


  get_tiles() {
    var ret = wasm.map_get_tiles(this.ptr);
    return ret;
  }
  /**
  * @param {number} width
  * @param {number} height
  * @returns {Map}
  */


  static new(width, height) {
    var ret = wasm.map_new(width, height);
    return Map.__wrap(ret);
  }
  /**
  * @returns {string}
  */


  render() {
    try {
      wasm.map_render(8, this.ptr);
      var r0 = getInt32Memory0()[8 / 4 + 0];
      var r1 = getInt32Memory0()[8 / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
  */


  tick() {
    wasm.map_tick(this.ptr);
  }

}

exports.Map = Map;

const __wbindgen_string_new = function (arg0, arg1) {
  var ret = getStringFromWasm0(arg0, arg1);
  return addHeapObject(ret);
};

exports.__wbindgen_string_new = __wbindgen_string_new;

const __wbg_alert_5706036d1ab93680 = function (arg0, arg1) {
  alert(getStringFromWasm0(arg0, arg1));
};

exports.__wbg_alert_5706036d1ab93680 = __wbg_alert_5706036d1ab93680;

const __wbindgen_object_drop_ref = function (arg0) {
  takeObject(arg0);
};

exports.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref;

const __wbg_new_59cb74e423758ede = function () {
  var ret = new Error();
  return addHeapObject(ret);
};

exports.__wbg_new_59cb74e423758ede = __wbg_new_59cb74e423758ede;

const __wbg_stack_558ba5917b466edd = function (arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

exports.__wbg_stack_558ba5917b466edd = __wbg_stack_558ba5917b466edd;

const __wbg_error_4bb6c2a97407129a = function (arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(arg0, arg1);
  }
};

exports.__wbg_error_4bb6c2a97407129a = __wbg_error_4bb6c2a97407129a;

const __wbg_log_d85e484a8ba03c98 = function (arg0) {
  console.log(getObject(arg0));
};

exports.__wbg_log_d85e484a8ba03c98 = __wbg_log_d85e484a8ba03c98;

const __wbindgen_throw = function (arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
};

exports.__wbindgen_throw = __wbindgen_throw;
},{"./rusty_rogue_wasm_bg.wasm":"node_modules/rusty-rogue-wasm/rusty_rogue_wasm_bg.wasm"}],"node_modules/rusty-rogue-wasm/rusty_rogue_wasm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greet = greet;
exports.dbg_print = dbg_print;
exports.default = exports.Map = exports.TileType = void 0;
let wasm;
let cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
/**
*/


function greet() {
  wasm.greet();
}

let WASM_VECTOR_LEN = 0;
let cachedTextEncoder = new TextEncoder('utf-8');
const encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function (arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
* @param {string} msg
*/


function dbg_print(msg) {
  var ptr0 = passStringToWasm0(msg, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  wasm.dbg_print(ptr0, len0);
}

let cachegetInt32Memory0 = null;

function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachegetInt32Memory0;
}
/**
*/


const TileType = Object.freeze({
  Wall: 0,
  Floor: 1
});
/**
*/

exports.TileType = TileType;

class Map {
  static __wrap(ptr) {
    const obj = Object.create(Map.prototype);
    obj.ptr = ptr;
    return obj;
  }

  free() {
    const ptr = this.ptr;
    this.ptr = 0;

    wasm.__wbg_map_free(ptr);
  }
  /**
  * @returns {number}
  */


  width() {
    var ret = wasm.map_width(this.ptr);
    return ret >>> 0;
  }
  /**
  * @returns {number}
  */


  height() {
    var ret = wasm.map_height(this.ptr);
    return ret >>> 0;
  }
  /**
  * @returns {number}
  */


  get_tiles() {
    var ret = wasm.map_get_tiles(this.ptr);
    return ret;
  }
  /**
  * @param {number} width
  * @param {number} height
  * @returns {Map}
  */


  static new(width, height) {
    var ret = wasm.map_new(width, height);
    return Map.__wrap(ret);
  }
  /**
  * @returns {string}
  */


  render() {
    try {
      wasm.map_render(8, this.ptr);
      var r0 = getInt32Memory0()[8 / 4 + 0];
      var r1 = getInt32Memory0()[8 / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
  */


  tick() {
    wasm.map_tick(this.ptr);
  }

}

exports.Map = Map;

async function load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return {
        instance,
        module
      };
    } else {
      return instance;
    }
  }
}

async function init(input) {
  if (typeof input === 'undefined') {
    input = import.meta.url.replace(/\.js$/, '_bg.wasm');
  }

  const imports = {};
  imports.wbg = {};

  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };

  imports.wbg.__wbg_alert_5706036d1ab93680 = function (arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
  };

  imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
  };

  imports.wbg.__wbg_new_59cb74e423758ede = function () {
    var ret = new Error();
    return addHeapObject(ret);
  };

  imports.wbg.__wbg_stack_558ba5917b466edd = function (arg0, arg1) {
    var ret = getObject(arg1).stack;
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbg_error_4bb6c2a97407129a = function (arg0, arg1) {
    try {
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(arg0, arg1);
    }
  };

  imports.wbg.__wbg_log_d85e484a8ba03c98 = function (arg0) {
    console.log(getObject(arg0));
  };

  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
    input = fetch(input);
  }

  const {
    instance,
    module
  } = await load(await input, imports);
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  return wasm;
}

var _default = init;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _rusty_rogue_wasm_bg = require("rusty-rogue-wasm/rusty_rogue_wasm_bg");

var _rustyRogueWasm = require("rusty-rogue-wasm");

// Import the WebAssembly memory at the top of the file.
//import * as wasm from "hello-wasm-pack";
// Display deetz
var TILE_SIZE = 16; // px

var GRID_COLOR = "#CCCCCC";
var FLOOR_COLOR = "#FFFFFF";
var WALL_COLOR = "#000000"; // Init map

var MAP_WIDTH = 32;
var MAP_HEIGHT = 16;

var map = _rustyRogueWasm.Map.new(MAP_WIDTH, MAP_HEIGHT); // setup canvas


var canvas = document.getElementById("game-canvas");
canvas.height = (TILE_SIZE + 1) * MAP_HEIGHT + 1;
canvas.width = (TILE_SIZE + 1) * MAP_WIDTH + 1;
var ctx = canvas.getContext('2d');

var renderLoop = function renderLoop() {
  // map.Tick();
  //drawGrid();
  drawTiles();
  requestAnimationFrame(renderLoop);
};

var drawGrid = function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR; // just draw around outside for now
  // top

  ctx.moveTo(0, 0);
  ctx.lineTo(MAP_WIDTH, 0); // bottom

  ctx.moveTo(0, MAP_HEIGHT);
  ctx.lineTo(MAP_WIDTH, MAP_HEIGHT); // left

  ctx.moveTo(0, 0);
  ctx.lineTo(0, MAP_HEIGHT); //right

  ctx.moveTo(MAP_WIDTH, 0);
  ctx.lineTo(MAP_WIDTH, MAP_HEIGHT);
  ctx.stroke();
};

var getIndex = function getIndex(row, column) {
  return row * MAP_WIDTH + column;
};

var drawTiles = function drawTiles() {
  var tilesPtr = map.get_tiles();
  var tiles = new Uint8Array(_rusty_rogue_wasm_bg.memory.buffer, tilesPtr, MAP_WIDTH * MAP_HEIGHT);
  ctx.beginPath();

  for (var row = 0; row < MAP_HEIGHT; row++) {
    for (var col = 0; col < MAP_WIDTH; col++) {
      var idx = getIndex(row, col);
      ctx.fillStyle = tiles[idx] === _rustyRogueWasm.TileType.Floor ? FLOOR_COLOR : WALL_COLOR;
      ctx.fillRect(col * (TILE_SIZE + 1) + 1, row * (TILE_SIZE + 1) + 1, TILE_SIZE, TILE_SIZE);
    }
  }

  ctx.stroke();
};

requestAnimationFrame(renderLoop);
},{"rusty-rogue-wasm/rusty_rogue_wasm_bg":"node_modules/rusty-rogue-wasm/rusty_rogue_wasm_bg.js","rusty-rogue-wasm":"node_modules/rusty-rogue-wasm/rusty_rogue_wasm.js"}],"../../../Users/mikem/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54405" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/mikem/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/www.e31bb0bc.js.map