var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-deck-panel-wrapper", style: { display: !_vm.display ? "none" : void 0 } }, [_vm.backdrop ? _c("div", { staticClass: "slide-deck-panel-backdrop", on: { "click": _vm.onClickBackdrop } }) : _vm._e(), _c("div", { ref: "panel", staticClass: "slide-deck-panel", class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2)]);
};
var staticRenderFns$1 = [];
var SlideDeck_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
function run$1(fns, ...args) {
  return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
}
const __vue2_script$1 = {
  props: {
    align: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right"].indexOf(value) > -1
    },
    backdrop: Boolean,
    registry: {
      type: Object,
      default() {
        const self = this;
        return {
          zIndex: 0,
          panels: [],
          get slideDeck() {
            return self;
          },
          get topSlide() {
            return this.panels.find((panel) => panel.isTopSlide);
          }
        };
      }
    }
  },
  data: () => ({
    display: false,
    isBackdropShowing: false
  }),
  computed: {
    classes() {
      return {
        [`slide-${this.align}`]: true,
        "has-slide-top": this.registry.panels.reduce((carry, panel) => carry || panel.isTopSlide, false)
      };
    },
    lastSlide() {
      return this.registry.panels[this.registry.panels.length - 1];
    },
    styles() {
      return {
        display: !this.display ? "none" : void 0,
        zIndex: this.registry.zIndex === 0 ? -1 : 1
      };
    }
  },
  watch: {
    ["registry.zIndex"](value) {
      this.display = value > 0;
    }
  },
  mounted() {
    window.addEventListener("keyup", ({ code }) => {
      if (code === "Escape" && this.registry.panels.length) {
        this.registry.panels[this.registry.panels.length - 1].close();
      }
    });
  },
  methods: {
    x() {
      return this.$el.getBoundingClientRect().x;
    },
    y() {
      return this.$el.getBoundingClientRect().y;
    },
    onClickBackdrop() {
      const fns = [...this.registry.panels].reverse().map((slide, i) => () => new Promise((resolve) => {
        slide.close((value) => {
          if (value !== false) {
            setTimeout(() => {
              resolve(value);
            }, Math.max(100, slide.duration / (this.registry.panels.length - i)));
          }
          return value;
        });
      }));
      run$1(fns);
    }
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var SlideDeck = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var conversions = {
  "px": {
    "px": 1,
    "cm": 96 / 2.54,
    "mm": 96 / 25.4,
    "in": 96,
    "pt": 96 / 72,
    "pc": 16
  },
  "cm": {
    "px": 2.54 / 96,
    "cm": 1,
    "mm": 0.1,
    "in": 2.54,
    "pt": 2.54 / 72,
    "pc": 2.54 / 6
  },
  "mm": {
    "px": 25.4 / 96,
    "cm": 10,
    "mm": 1,
    "in": 25.4,
    "pt": 25.4 / 72,
    "pc": 25.4 / 6
  },
  "in": {
    "px": 1 / 96,
    "cm": 1 / 2.54,
    "mm": 1 / 25.4,
    "in": 1,
    "pt": 1 / 72,
    "pc": 1 / 6
  },
  "pt": {
    "px": 0.75,
    "cm": 72 / 2.54,
    "mm": 72 / 25.4,
    "in": 72,
    "pt": 1,
    "pc": 12
  },
  "pc": {
    "px": 6 / 96,
    "cm": 6 / 2.54,
    "mm": 6 / 25.4,
    "in": 6,
    "pt": 6 / 72,
    "pc": 1
  },
  "deg": {
    "deg": 1,
    "grad": 0.9,
    "rad": 180 / Math.PI,
    "turn": 360
  },
  "grad": {
    "deg": 400 / 360,
    "grad": 1,
    "rad": 200 / Math.PI,
    "turn": 400
  },
  "rad": {
    "deg": Math.PI / 180,
    "grad": Math.PI / 200,
    "rad": 1,
    "turn": Math.PI * 2
  },
  "turn": {
    "deg": 1 / 360,
    "grad": 1 / 400,
    "rad": 0.5 / Math.PI,
    "turn": 1
  },
  "s": {
    "s": 1,
    "ms": 1 / 1e3
  },
  "ms": {
    "s": 1e3,
    "ms": 1
  },
  "Hz": {
    "Hz": 1,
    "kHz": 1e3
  },
  "kHz": {
    "Hz": 1 / 1e3,
    "kHz": 1
  },
  "dpi": {
    "dpi": 1,
    "dpcm": 1 / 2.54,
    "dppx": 1 / 96
  },
  "dpcm": {
    "dpi": 2.54,
    "dpcm": 1,
    "dppx": 2.54 / 96
  },
  "dppx": {
    "dpi": 96,
    "dpcm": 96 / 2.54,
    "dppx": 1
  }
};
var cssUnitConverter = function(value, sourceUnit, targetUnit, precision) {
  if (!conversions.hasOwnProperty(targetUnit))
    throw new Error("Cannot convert to " + targetUnit);
  if (!conversions[targetUnit].hasOwnProperty(sourceUnit))
    throw new Error("Cannot convert from " + sourceUnit + " to " + targetUnit);
  var converted = conversions[targetUnit][sourceUnit] * value;
  if (precision !== false) {
    precision = Math.pow(10, parseInt(precision) || 5);
    return Math.round(converted * precision) / precision;
  }
  return converted;
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-panel", class: _vm.classes, style: _vm.styles, on: { "mouseenter": function($event) {
    if ($event.target !== $event.currentTarget) {
      return null;
    }
    return _vm.onMouseenter.apply(null, arguments);
  }, "mouseleave": function($event) {
    if ($event.target !== $event.currentTarget) {
      return null;
    }
    return _vm.onMouseleave.apply(null, arguments);
  } } }, [_c("transition", { attrs: { "name": "slide" }, on: { "before-enter": _vm.onBeforeEnter, "enter": _vm.onEnter, "after-enter": _vm.onAfterEnter, "before-leave": _vm.onBeforeLeave, "leave": _vm.onLeave, "after-leave": _vm.onAfterLeave } }, [_vm.isShowing ? _c("div", { ref: "content", staticClass: "slide-panel-content", on: { "click": _vm.onClick } }, [_c("div", { ref: "inner", staticClass: "slide-panel-content-inner" }, [_vm._t("default")], 2), _c("div", [_c("a", { ref: "close", staticClass: "slide-panel-close", attrs: { "href": "#" }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.close.apply(null, arguments);
  } } }, [_c("span", [_vm._v("\xD7")])])])]) : _vm._e()])], 1);
};
var staticRenderFns = [];
var SlidePanel_vue_vue_type_style_index_0_lang = "";
function run(fns, ...args) {
  return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
}
const __vue2_script = {
  props: {
    align: {
      type: String,
      default() {
        return this.$parent.align;
      },
      validator: (value) => ["left", "right"].indexOf(value) > -1
    },
    registry: {
      type: Object,
      default() {
        return this.$parent.registry;
      }
    },
    show: Boolean,
    width: {
      type: String,
      default: "33%"
    }
  },
  data() {
    return {
      isDisplaying: false,
      isHover: false,
      isShowing: false,
      isTopSlide: false,
      translateX: 0,
      zIndex: -1
    };
  },
  computed: {
    classes() {
      return {
        "show": this.isShowing,
        "slide-top": !!this.isTopSlide
      };
    },
    duration() {
      return getComputedStyle(this.$refs.content).transitionDuration.split(",").map((value) => {
        const [
          parsed,
          number,
          unit
        ] = value.trim().match(/^([\d.]+)(\w+)$/);
        return cssUnitConverter(parseFloat(number), unit, "ms");
      }).sort((a, b) => {
        return a - b;
      }).shift();
    },
    styles() {
      const modifier = this.$parent.align === "left" ? 1 : -1;
      const order = this.registry.panels.length - 1 - this.registry.panels.indexOf(this);
      return {
        zIndex: this.isDisplaying ? this.zIndex : -1,
        display: this.isDisplaying ? "flex" : "none",
        transform: this.isShowing && `translateX(calc((${modifier} * ${order} * 3.5rem) - (${modifier * -1} * ${this.isHover && !this.isTopSlide ? "3.5rem" : "0rem"})))`
      };
    }
  },
  watch: {
    ["registry.panels"](value) {
      const index = this.registry.panels.indexOf(this);
      this.isTopSlide = index > -1 && index + 1 === this.registry.panels.length;
    },
    isShowing(value) {
      const index = this.registry.panels.indexOf(this);
      if (value) {
        this.isDisplaying = true;
        this.zIndex = ++this.registry.zIndex;
        this.registry.panels.push(this);
      } else {
        this.registry.panels.splice(index, 1);
      }
    },
    isDisplaying(value) {
      if (value) {
        this.$emit("open", this);
      } else if (!this.registry.panels.length) {
        this.registry.zIndex = 0;
      }
    },
    show(value) {
      if (value) {
        this.open();
      } else {
        this.close();
      }
    }
  },
  mounted() {
    if (this.show) {
      setTimeout(() => this.open(), 1);
    }
  },
  methods: {
    close(fn) {
      const event = new Event("close", {
        cancelable: true
      });
      new Promise((resolve) => {
        setTimeout(() => {
          this.$emit("close", event, resolve);
          if (!event.defaultPrevented) {
            resolve(true);
          }
        });
      }).then((value) => {
        if (typeof fn === "function") {
          value = fn(value);
        }
        return this.isShowing = value === false;
      });
      return this;
    },
    divide(numerator, denominator) {
      const matches = numerator.toString().match(/^(\d+)(.+)$/);
      if (matches[0]) {
        return `${parseInt(matches[1]) / denominator}${matches[2]}`;
      }
      return numerator;
    },
    open() {
      this.isShowing = true;
      return this;
    },
    toggle() {
      if (!this.isShowing) {
        this.open();
      } else {
        this.close();
      }
      return this;
    },
    translatePosition() {
    },
    x() {
      return this.$el && this.$el.getBoundingClientRect().x;
    },
    y() {
      return this.$el && this.$el.getBoundingClientRect().y;
    },
    onBeforeEnter() {
      this.$emit("before-enter", this);
    },
    onEnter() {
      this.$emit("enter", this);
    },
    onAfterEnter() {
      this.$emit("after-enter", this);
    },
    onBeforeLeave() {
      this.$emit("before-leave", this);
    },
    onLeave() {
      this.$emit("leave", this);
    },
    onAfterLeave() {
      this.isDisplaying = this.isShowing;
      this.$emit("after-leave", this);
    },
    onClick(e) {
      if (this.$refs.close) {
        const index = this.registry.panels.indexOf(this);
        const slides = this.registry.panels.slice(index + 1);
        const fns = slides.reverse().map((slide, i) => () => new Promise((resolve) => {
          slide.close((value) => {
            if (value !== false) {
              setTimeout(() => {
                resolve(value);
              }, Math.max(100, this.duration / (slides.length - i)));
            }
            return value;
          });
        }));
        run(fns);
      }
    },
    onClickClose() {
      this.close();
    },
    onMouseenter(el) {
      if (!this.isTopSlide) {
        this.registry.panels.slice(0, this.registry.panels.indexOf(this) + 1).forEach((slide) => {
          slide.isHover = true;
        });
      }
    },
    onMouseleave(el) {
      this.registry.panels.slice(0, this.registry.panels.indexOf(this) + 1).forEach((slide) => {
        slide.isHover = false;
      });
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var SlidePanel = /* @__PURE__ */ function() {
  return __component__.exports;
}();
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options) {
  var destination = {};
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}
function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
class SlidePanelFactory {
  constructor(vue) {
    this.$vue = vue;
  }
  register(type, options = {}) {
    const SlideDeckWrapper = this.$vue.extend({
      functional: true,
      render: (h) => h(SlideDeck, Object.assign({
        ref: "deck"
      }, options))
    });
    const slideDeckWrapper = new SlideDeckWrapper({
      el: document.body.appendChild(document.createElement("div"))
    });
    this[type] = (callback, options2 = {}) => {
      return new Promise((resolve) => {
        const SlidePanelWrapper = this.$vue.extend({
          beforeDestroy() {
            this.$root.$el.parentNode.removeChild(this.$root.$el);
            resolve();
          },
          render(h) {
            const context = cjs({
              ref: "panel",
              props: {
                show: true,
                align: slideDeckWrapper.$refs.deck.align
              },
              on: {
                ["after-leave"]: () => {
                  this.$nextTick(() => this.$destroy());
                }
              }
            }, options2);
            context.props.registry = slideDeckWrapper.$refs.deck.registry;
            return h(SlidePanel, context, [() => {
              return callback.apply(this.$refs.panel, [h, this.$refs.panel]);
            }]);
          }
        });
        new SlidePanelWrapper({
          el: slideDeckWrapper.$refs.deck.$refs.panel.appendChild(document.createElement("div"))
        });
      }).finally(() => {
      });
    };
  }
}
var SlidePanelPlugin = (Vue, options = {}) => {
  Vue.prototype.$store = options.store;
  Vue.prototype.$slidePanel = new SlidePanelFactory(Vue);
  Vue.prototype.$slidePanel.register("right", cjs({
    props: {
      align: "right"
    }
  }, options.right || {}));
  Vue.prototype.$slidePanel.register("left", cjs({
    props: {
      align: "left"
    }
  }, options.left || {}));
};
export { SlideDeck, SlidePanel, SlidePanelPlugin };
