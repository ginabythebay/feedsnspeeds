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
})({"data/drill_lookup.json":[function(require,module,exports) {
module.exports = {
  "#80": 0.0135,
  "#79": 0.0145,
  "#78": 0.016,
  "#77": 0.018,
  "#76": 0.02,
  "#75": 0.021,
  "#74": 0.0225,
  "#73": 0.024,
  "#72": 0.025,
  "#71": 0.026,
  "#70": 0.028,
  "#69": 0.0292,
  "#68": 0.031,
  "#67": 0.032,
  "#66": 0.033,
  "#65": 0.035,
  "#64": 0.036,
  "#63": 0.037,
  "#62": 0.038,
  "#61": 0.039,
  "#60": 0.04,
  "#59": 0.041,
  "#58": 0.042,
  "#56": 0.0465,
  "#55": 0.052,
  "#54": 0.055,
  "#53": 0.0595,
  "#52": 0.0635,
  "#51": 0.067,
  "#50": 0.07,
  "#49": 0.073,
  "#48": 0.076,
  "#47": 0.0785,
  "#46": 0.081,
  "#45": 0.082,
  "#44": 0.086,
  "#43": 0.089,
  "#42": 0.0935,
  "#41": 0.096,
  "#40": 0.098,
  "#39": 0.0995,
  "#38": 0.1015,
  "#37": 0.104,
  "#36": 0.1065,
  "#35": 0.11,
  "#34": 0.111,
  "#33": 0.113,
  "#32": 0.116,
  "#31": 0.12,
  "#30": 0.1285,
  "#29": 0.136,
  "#28": 0.1405,
  "#27": 0.144,
  "#26": 0.147,
  "#25": 0.1495,
  "#24": 0.152,
  "#23": 0.154,
  "#22": 0.157,
  "#21": 0.159,
  "#20": 0.161,
  "#19": 0.166,
  "#18": 0.1695,
  "#17": 0.173,
  "#16": 0.177,
  "#15": 0.18,
  "#14": 0.182,
  "#13": 0.185,
  "#12": 0.189,
  "#11": 0.191,
  "#10": 0.1935,
  "#9": 0.196,
  "#8": 0.199,
  "#7": 0.201,
  "#6": 0.204,
  "#5": 0.2055,
  "#4": 0.209,
  "#3": 0.213,
  "#2": 0.221,
  "#1": 0.228,
  "A": 0.234,
  "B": 0.238,
  "C": 0.242,
  "D": 0.246,
  "E": 0.25,
  "F": 0.257,
  "G": 0.261,
  "H": 0.266,
  "I": 0.272,
  "J": 0.277,
  "K": 0.281,
  "L": 0.29,
  "M": 0.295,
  "N": 0.302,
  "O": 0.316,
  "P": 0.323,
  "Q": 0.332,
  "R": 0.339,
  "S": 0.348,
  "T": 0.358,
  "U": 0.368,
  "V": 0.377,
  "W": 0.386,
  "X": 0.397,
  "Y": 0.404,
  "Z": 0.413
};
},{}],"data/material_lookup.json":[function(require,module,exports) {
module.exports = {
  "Aluminum": {
    "6061: Solution Treated and Aged": {
      "fr_offset": 5,
      "drill_sfm": 350
    },
    "6061: Cold Drawn": {
      "fr_offset": 5,
      "drill_sfm": 400
    }
  },
  "Steel": {
    "4140, 4150: 250-300": {
      "fr_offset": 3,
      "drill_sfm": 55
    }
  },
  "Stainless Steel": {
    "316: 135-185": {
      "fr_offset": 1,
      "drill_sfm": 50
    },
    "203EZ, 303, 303Se, 303MA, 303Pb, 303Cu, 303 Plus X: 135-185": {
      "fr_offset": 1,
      "drill_sfm": 55
    },
    "203EZ, 303, 303Se, 303MA, 303Pb, 303Cu, 303 Plus X: 225-275": {
      "fr_offset": 1,
      "drill_sfm": 50
    }
  }
};
},{}],"drill.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var drill_lookup_json_1 = __importDefault(require("./data/drill_lookup.json"));

var drillLookup = drill_lookup_json_1.default;

var material_lookup_json_1 = __importDefault(require("./data/material_lookup.json"));

var materialLookup = material_lookup_json_1.default; // Data from Machinery's Handbook 31 page 1128.

var feedRates = [{
  minDiameter: 0,
  maxDiameter: .125,
  minFr: .001,
  maxFr: .003
}, {
  minDiameter: .125,
  maxDiameter: .251,
  minFr: .002,
  maxFr: .006
}, {
  minDiameter: .251,
  maxDiameter: .501,
  minFr: .004,
  maxFr: .010
}, {
  minDiameter: .501,
  maxDiameter: 1.01,
  minFr: .007,
  maxFr: .015
}, {
  minDiameter: 1.01,
  maxDiameter: 0,
  minFr: .010,
  maxFr: .025
}];
var fractionRe = /((\d+)\s+)?(\d+)\/(\d+)/;
var mmRe = /(\d+(\.\d+)?)\s*mm/;
var possibleEvents = new Set(["input", "onpropertychange", "keyup", "change", "paste"]);

window.onload = function () {
  var materialsMenu = document.getElementById("material");
  var typesMenu = document.getElementById("material_type");
  var drillInput = document.getElementById("drill_diameter");
  var calculator = new Calculator(typesMenu, drillInput);
  var page = new DrillPage(materialsMenu, typesMenu);
  possibleEvents.forEach(function (eventName) {
    drillInput.addEventListener(eventName, function () {
      calculator.calc();
    });
  });

  for (var m in materialLookup) {
    var option = document.createElement("option");
    option.text = m;
    materialsMenu.options.add(option);
  }

  materialsMenu.onchange = function () {
    page.reloadTypes();
    calculator.calc();
  };

  page.reloadTypes();

  typesMenu.onchange = function () {
    calculator.calc();
  }; // calcs value on page reload if something was already entered


  calculator.calc();
};

var DrillPage =
/** @class */
function () {
  function DrillPage(materialsMenu, typesMenu) {
    this.materialsMenu = materialsMenu;
    this.typesMenu = typesMenu;
  }

  DrillPage.prototype.reloadTypes = function () {
    var _this = this;

    removeOptions(this.typesMenu);
    var material = this.materialsMenu.item(this.materialsMenu.selectedIndex);
    var types = materialLookup[material.text];
    Object.keys(types).forEach(function (name) {
      var option = document.createElement("option");
      var sfm = types[name]["drill_sfm"];
      option.text = name + " (" + sfm + ")";
      option.type = types[name];

      _this.typesMenu.options.add(option);
    });
  };

  ;
  return DrillPage;
}();

;

function removeOptions(selectElement) {
  var L = selectElement.options.length - 1;

  for (var i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

;

var Calculator =
/** @class */
function () {
  function Calculator(typessMenu, diameterElement) {
    this.typesMenu = typessMenu.options;
    this.diameterElement = diameterElement;
  }

  Calculator.prototype.calc = function () {
    var typeOption = this.typesMenu.item(this.typesMenu.selectedIndex);
    var type = typeOption.type;
    var sfm = Number(type["drill_sfm"]);
    setLabel("sfm", displayNum(sfm));
    var input = this.diameterElement.value;
    var diameter = 0.0;

    if (input in drillLookup) {
      diameter = drillLookup[input];
      setLabel("diameter_note", input + " has a diameter of " + diameter);
    } else {
      diameter = Number(input);

      if (!diameter) {
        var match = input.match(fractionRe);

        if (match) {
          var inches = Number(match[2]);

          if (!inches) {
            inches = 0;
          }

          var numerator = Number(match[3]);
          var denominator = Number(match[4]);
          diameter = inches + numerator / denominator;

          if (inches) {
            setLabel("diameter_note", "Diameter " + inches + " " + numerator + "/" + denominator + "=" + diameter + "\"");
          } else {
            setLabel("diameter_note", "Diameter  " + numerator + "/" + denominator + "=" + diameter + "\"");
          }
        } else {
          match = input.match(mmRe);

          if (match) {
            var mm = Number(match[1]);
            diameter = mm / 25.4;
            setLabel("diameter_note", "Diameter " + mm + "mm=" + diameter.toPrecision(4) + "\"");
          } else {
            setLabel("diameter_note", "Enter diameter like .25, 1/4, 3mm, A or #23");
          }
        }
      } else {
        setLabel("diameter_note", "Diameter " + diameter + "\"");
      }
    } // the call to recommend below can throw and error if given an
    // invalid diameter.  To avoid displaying invalid parameters,
    // we start by zeroing out the display before the potential
    // error.


    setLabel("rpm", "--");
    setLabel("ipr", "--");
    setLabel("ipm", "--");
    setLabel("depth", "--");

    if (diameter) {
      var reco = recommend(sfm, diameter, Number(type["fr_offset"]));
      setLabel("rpm", displayNum(reco.rpm));
      setLabel("ipr", fixedDisplayNum(reco.ipr, 3));
      setLabel("ipm", fixedDisplayNum(reco.ipm, 1));
      setLabel("depth", fixedDisplayNum(reco.maxDepth, 3) + "\"");
    }
  };

  return Calculator;
}();

function displayNum(value) {
  if (Number.isNaN(value) || value == Infinity || !value) {
    return "--";
  } else {
    return String(value);
  }
}

function fixedDisplayNum(value, precision) {
  if (Number.isNaN(value) || value == Infinity || !value) {
    return "--";
  } else {
    return value.toFixed(precision);
  }
}

function recommend(sfm, diameter, fr_offset) {
  var ipr = calcIpr(diameter, fr_offset);
  var rpm = Math.round(3.8197 / diameter * sfm);
  return {
    rpm: rpm,
    ipr: ipr,
    ipm: ipr * rpm,
    maxDepth: diameter * 4
  };
}

exports.recommend = recommend; // diameter is inches
// fr_offset is a value between 1 and 5
//
// once we find a range, we apply the fr_offset to it.  Imagining a range of 1 to 11, we distribute it like this:
// range  fr_offset
// 1      1
// 2
// 3
// 3.5    2
// 4
// 5
// 6      3
// 7
// 8
// 8.5    4
// 9
// 10
// 11     5

function calcIpr(diameter, fr_offset) {
  if (fr_offset < 1 || fr_offset > 5) {
    throw new RangeError('fr_offset must bet between 1 and 5: ${fr_offset} is invalid');
  }

  for (var _i = 0, feedRates_1 = feedRates; _i < feedRates_1.length; _i++) {
    var frr = feedRates_1[_i];

    if (diameter >= frr.minDiameter && (frr.maxDiameter == 0 || diameter < frr.maxDiameter)) {
      if (fr_offset == 1) {
        return frr.minFr;
      }

      if (fr_offset == 5) {
        return frr.maxFr;
      }

      var offset = .25 * (fr_offset - 1);
      var range = frr.maxFr - frr.minFr;
      return frr.minFr + range * offset;
    }
  }

  throw new RangeError("Unable to find range for diameter of " + diameter);
}

exports.calcIpr = calcIpr;

function setLabel(id, value) {
  var output = document.getElementById(id);
  output.innerHTML = String(value);
}
},{"./data/drill_lookup.json":"data/drill_lookup.json","./data/material_lookup.json":"data/material_lookup.json"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42675" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","drill.ts"], null)
//# sourceMappingURL=/drill.a0ddc7ae.js.map