var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-deck-panel", class: _vm.classes, style: _vm.styles }, [_vm._t("default")], 2);
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
function unit(value, uom = "px") {
  return value !== null && value !== void 0 && value !== false && isFinite(value) ? `${value}${uom}` : value;
}
const __vue2_script$1 = {
  props: {
    align: {
      type: String,
      default: "right"
    },
    minWidth: [Number, String],
    maxWidth: [Number, String],
    width: [Number, String]
  },
  computed: {
    classes() {
      return {
        [`slide-${this.align}`]: true
      };
    },
    styles() {
      return {
        width: this.width ? unit(this.width) : null,
        minWidth: this.minWidth ? unit(this.minWidth) : null,
        maxWidth: this.maxWidth ? unit(this.maxWidth) : null
      };
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
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slide-panel", style: {
    zIndex: _vm.zIndex,
    display: _vm.isDisplaying ? "flex" : "none"
  }, on: { "mouseenter": function($event) {
    if ($event.target !== $event.currentTarget) {
      return null;
    }
    return _vm.onMouseenter.apply(null, arguments);
  }, "mouseleave": function($event) {
    if ($event.target !== $event.currentTarget) {
      return null;
    }
    return _vm.onMouseleave.apply(null, arguments);
  }, "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
      return null;
    }
    return _vm.onEsc.apply(null, arguments);
  } } }, [_c("transition", { attrs: { "name": "slide" }, on: { "after-enter": _vm.onAfterEnter, "after-leave": _vm.onAfterLeave } }, [_vm.isShowing ? _c("div", { staticClass: "slide-panel-content", class: { show: _vm.isShowing }, style: { transitionDuration: _vm.duration }, on: { "click": _vm.onClick } }, [_c("div", { staticClass: "slide-panel-content-inner" }, [_vm._t("default")], 2), _c("div", [_c("a", { staticClass: "slide-panel-close", attrs: { "href": "#" }, on: { "click": function($event) {
    $event.preventDefault();
    return _vm.onClickCancel.apply(null, arguments);
  } } }, [_c("span", [_vm._v("\xD7")])])])]) : _vm._e()])], 1);
};
var staticRenderFns = [];
var SlidePanel_vue_vue_type_style_index_0_lang = "";
const registry = {
  zIndex: 0,
  panels: []
};
const __vue2_script = {
  props: {
    cancel: {
      type: Function,
      default(e) {
        return true;
      }
    },
    duration: {
      type: String,
      default: "500ms"
    },
    width: {
      type: [String, Number],
      default: 50
    },
    registry: {
      type: Object,
      default: () => registry
    },
    show: Boolean
  },
  data() {
    return {
      isDisplaying: false,
      isHover: false,
      isShowing: false,
      isTopSlide: false,
      zIndex: -1
    };
  },
  computed: {
    classes() {
      return {
        "show": this.isShowing,
        "slide-top": !!this.isTopSlide
      };
    }
  },
  watch: {
    ["registry.panels"](value) {
      const index = this.registry.panels.indexOf(this);
      this.isTopSlide = index > -1 && index + 1 === this.registry.panels.length;
    },
    isShowing(value) {
      if (value) {
        this.isDisplaying = true;
        this.zIndex = ++this.registry.zIndex;
        this.registry.panels.push(this);
      }
    },
    isDisplaying(value) {
      const index = this.registry.panels.indexOf(this);
      if (!value) {
        this.registry.panels.splice(index, 1);
      }
    },
    show(value) {
      this.isShowing = value;
    }
  },
  mounted() {
    if (this.show) {
      this.open();
    }
  },
  methods: {
    close() {
      this.isShowing = false;
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
    styles() {
      if (this.registry.panels.indexOf(this) > -1) {
        return {
          zIndex: this.zIndex
        };
      }
    },
    toggle() {
      if (!this.isShowing) {
        this.open();
      } else {
        this.cancel();
      }
      return this;
    },
    onAfterEnter() {
      this.$emit("open");
    },
    onAfterLeave() {
      this.isDisplaying = false;
      this.$emit("close");
    },
    onClick() {
      const index = this.registry.panels.indexOf(this);
      console.log("onClick", index);
    },
    onClickCancel() {
      Promise.resolve(this.cancel(this)).then((response) => {
        if (response !== false) {
          this.close();
        }
      });
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
export { SlideDeck, SlidePanel };
