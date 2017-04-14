var ripple =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function hadlerFactory(el, rippleFactory) {
  // scoping
  return function () {
    var ripples = [];
    var startTimeDate = undefined;

    var startHandler = function startHandler(event, new_target) {
      var target = new_target || el;
      startTimeDate = Date.now();
      ripples.push({
        effect: rippleFactory.create(),
        state: 'shown'
      });
      ripples[ripples.length - 1].effect.show(target, event);
    };

    var endHandler = function endHandler(event) {
      var _loop = function _loop(_i) {
        var ripple = ripples[_i];
        switch (ripple.state) {
          case 'shown':
            ripple.state = 'hiding';
            ripple.effect.hide(function () {
              ripple.state = 'hidden';
            });
          case 'hidden':
            ripples.splice(_i, 1);
            _i--;
        }
        i = _i;
      };

      for (var i = 0; i < ripples.length; i++) {
        _loop(i);
      }
    };

    // Debouncing
    var endAdapter = function endAdapter(event) {
      var delta = Date.now() - startTimeDate;
      if (delta <= 100) {
        setTimeout(endAdapter, 100 - delta);
      } else {
        endHandler();
      }
    };

    return {
      end: endAdapter,
      start: startHandler
    };
  }();
}

function bind(elements, rippleFactory) {
  var bounds = [];

  elements.forEach(function (el) {
    var handle = hadlerFactory(el, rippleFactory);
    bounds.push({ el: el, handle: handle });

    el.addEventListener('mousedown', handle.start);

    el.addEventListener('mouseup', handle.end);
    el.addEventListener('mouseout', handle.end);
  });

  function unBind() {
    bounds.forEach(function (bound) {
      bound.el.removeEventListener('mousedown', bound.handle.start);

      bound.el.removeEventListener('mouseup', bound.handle.end);
      bound.el.removeEventListener('mouseout', bound.handle.end);
    });
  }

  return unBind;
}

function watch() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
  var rippleFactory = arguments[1];
  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

  var handle = hadlerFactory(scope, rippleFactory);

  var startAdapter = function startAdapter(event) {
    var el = event.target;

    while (el !== scope) {
      if (el.matches(selector)) {
        el.classList.add('ripple--mouseout-protected');
        handle.start(event, el);
        break;
      }
      el = el.parentNode;
    }
  };

  var endAdapter = function endAdapter(event, handler) {
    if (event.target.matches(selector)) {
      handle.end(event, event.target);
      event.target.classList.remove('ripple--mouseout-protected');
    }
  };

  scope.addEventListener('mousedown', startAdapter);

  scope.addEventListener('mouseup', endAdapter);
  scope.addEventListener('mouseout', endAdapter);

  function unWatch() {
    scope.removeEventListener('mousedown', startAdapter);

    scope.removeEventListener('mouseup', endAdapter);
    scope.removeEventListener('mouseout', endAdapter);
  }

  return unWatch;
}

var binders = {
  bind: bind,
  watch: watch
};

exports.default = binders;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setDefaults = setDefaults;
exports.getDefaults = getDefaults;
/**
 * Describes default ripple properties
 * @type {Object}
 */
var defaults = {
  color: "#757575",
  opacity: 0.15,
  borderRadius: 'auto',
  borderWidth: 'auto',
  zIndex: 999,
  transitionDuration: 375,
  timingFunction: "cubic-bezier(.4,0`,.42,1)", //timing function
  constant: false // enlarging speed is constant
};

function setDefaults(changes) {
  defaults = _extends(defaults, changes);
}

function getDefaults() {
  return defaults;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RippleFactory = exports.Ripple = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binders = __webpack_require__(0);

var _binders2 = _interopRequireDefault(_binders);

var _defaults = __webpack_require__(1);

var _utility = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** The actual ripple effect presentational class */
var Ripple = exports.Ripple = function () {
  function Ripple(props) {
    _classCallCheck(this, Ripple);

    this.props = props;

    this.$ = document.createElement('div');

    this.$.classList.add('ripple');

    this.$.innerHTML = '<div class="ripple__effect ripple__effect--hidden"></div>';
    this.$effect = this.$.querySelector('.ripple__effect');

    this.$.style.zIndex = props.zIndex;
    document.body.appendChild(this.$);
  }

  _createClass(Ripple, [{
    key: 'show',
    value: function show(target, event) {
      // setup
      var self = this;
      var rect = this.getRect(target);

      var pageX = 0;
      var pageY = 0;

      if (event instanceof TouchEvent) {
        pageX = event.touches[0].pageX;
        pageY = event.touches[0].pageY;
      } else {
        pageX = event.pageX;
        pageY = event.pageY;
      }

      var effectCenter = {
        left: Math.abs(rect.left - pageX),
        top: Math.abs(rect.top - pageY)
      };

      var borderWidth = undefined;
      var borderRadius = undefined;

      this.radius = this.calcRadius(effectCenter, rect);
      var transitionTime = this.calcTransition();
      var maskStyle = this.$.style;
      var effectStyle = this.$effect.style;

      if (this.props.borderRadius === 'auto') {
        borderRadius = parseInt((0, _utility.getStyle)(target, 'border-radius'));
      } else {
        borderRadius = this.props.borderRadius;
      }
      if (this.props.borderWidth === 'auto') {
        borderWidth = parseInt((0, _utility.getStyle)(target, 'border-width'));
      } else {
        borderWidth = this.props.borderWidth;
      }

      // position of mask
      maskStyle.left = rect.left + 'px';
      maskStyle.top = rect.top + 'px';
      maskStyle.width = rect.width + 'px';
      maskStyle.height = rect.height + 'px';

      //resize & position ripple effect (this is all for performace)
      effectStyle.width = this.radius * 2 + 'px';
      effectStyle.height = this.radius * 2 + 'px';

      effectStyle.left = effectCenter.left - this.radius - borderWidth + 'px';
      effectStyle.top = effectCenter.top - this.radius - borderWidth + 'px';

      // modifying mask to avoid edge breaking
      maskStyle.borderRadius = borderRadius + 'px';
      maskStyle.borderWidth = borderWidth + 'px';

      // set transition properties
      effectStyle.transitionTimingFunction = this.props.timingFunction;
      effectStyle.transitionDuration = transitionTime + 'ms';

      // set cosmetic props
      effectStyle.background = this.props.color;
      effectStyle.opacity = this.props.opacity;

      // workaround to provide 100% chance of transition
      setTimeout(function () {
        self.$effect.classList.remove('ripple__effect--hidden');
      }, 1);
    }
  }, {
    key: 'hide',
    value: function hide(cb) {
      var self = this;
      var transitionTime = this.calcTransition();
      this.$effect.style.transitionDuration = transitionTime + 'ms';

      this.$effect.classList.add('ripple__effect--hide');
      setTimeout(function () {
        cb();
        self.$.remove();
        delete self.$;
      }, transitionTime);
    }
  }, {
    key: 'calcTransition',
    value: function calcTransition() {
      var transitionTime = 0;

      if (this.props.constant) {
        transitionTime = this.props.transitionDuration;
      } else {
        transitionTime = this.props.transitionDuration + this.radius;
      }

      return transitionTime;
    }
  }, {
    key: 'calcRadius',
    value: function calcRadius(point, rect) {
      var vertical = Math.max(point.top, rect.height - point.top);

      var horizontal = Math.max(point.left, rect.width - point.left);

      return Math.sqrt(vertical * vertical + horizontal * horizontal);
    }
  }, {
    key: 'getRect',
    value: function getRect(target) {
      var bodyRect = document.body.getBoundingClientRect(); //for scroll fix
      var targetRect = target.getBoundingClientRect();
      var marginTop = parseInt((0, _utility.getStyle)(document.body, 'margin-top'));
      var marginLeft = parseInt((0, _utility.getStyle)(document.body, 'margin-left'));

      var rect = {
        top: targetRect.top - bodyRect.top + marginTop,
        left: targetRect.left - bodyRect.left + marginLeft,
        width: targetRect.width,
        height: targetRect.height
      };

      return rect;
    }
  }]);

  return Ripple;
}();

/** Factrory that creates {Ripple} based on its props */


var RippleFactory = exports.RippleFactory = function () {
  function RippleFactory(rippleProps) {
    _classCallCheck(this, RippleFactory);

    rippleProps = rippleProps || {};
    this.rippleProps = _extends({}, (0, _defaults.getDefaults)(), rippleProps);
  }

  _createClass(RippleFactory, [{
    key: 'create',
    value: function create() {
      return new Ripple(this.rippleProps);
    }
  }]);

  return RippleFactory;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _binders = __webpack_require__(0);

var _binders2 = _interopRequireDefault(_binders);

var _defaults = __webpack_require__(1);

var _ripple = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * will automatically call ripple on given elemets
 * @param  {Element[]} elements elements to call ripple on
 * @param  {Object} options any modification of default for these ripples
 * @return {RippleFactory} generates ripple effects for your elem`ets
 */
function bind_to(elements, options) {
  if (elements instanceof NodeList) {
    var old = elements;
    elements = [];
    for (var i = 0; i < old.length; i++) {
      elements.push(old[i]);
    }
  }

  if (elements instanceof Node) {
    elements = [elements];
  }

  var factory = new _ripple.RippleFactory(options);
  var unBind = _binders2.default.bind(elements, factory);

  return {
    factory: factory,
    remove: unBind
  };
}

/**
 * will automatically call ripple on any node matching selector in scope
 * @param  {String} selector css selector for Elements to call ripple on
 * @param  {Object} options any modification of default for these ripples
 * @param  {Element} scope can be used for optimization, default is {Document}
 * @return {RippleFactory} generates ripple effects for your elemets
 */
function watch(selector, options, scope) {
  var factory = new _ripple.RippleFactory(options);
  var unWatch = _binders2.default.watch(selector, factory, scope);

  return {
    factory: factory,
    remove: unWatch
  };
}

exports.bind_to = bind_to;
exports.watch = watch;
exports.setDefaults = _defaults.setDefaults;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyle = getStyle;
window.Element && function (ElementPrototype) {
  ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
    var node = this,
        nodes = (node.parentNode || node.document).querySelectorAll(selector),
        i = -1;
    while (nodes[++i] && nodes[i] != node) {}
    return !!nodes[i];
  };
}(Element.prototype);

// Create remove function if not exist (IE 10)
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

function getStyle(el, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(el, null).getPropertyValue(strCssRule);
  } else if (el.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = el.currentStyle[strCssRule];
  }
  return strValue;
}

/***/ })
/******/ ]);
//# sourceMappingURL=ripple.js.map