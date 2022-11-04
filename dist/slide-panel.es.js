import { ref as O, reactive as $, computed as g, watch as D, onMounted as F, provide as A, openBlock as d, createElementBlock as h, normalizeClass as M, unref as x, normalizeStyle as P, createCommentVNode as z, createElementVNode as p, renderSlot as L, withModifiers as w, createVNode as H, Transition as N, withCtx as E, resolveComponent as I, createBlock as _, normalizeProps as R, guardReactiveProps as V, Fragment as X, renderList as K, mergeProps as Y, resolveDynamicComponent as q, render as G, h as C } from "vue";
const J = {
  __name: "SlideDeck",
  props: {
    align: {
      type: String,
      default: "right",
      validator: (e) => ["left", "right"].indexOf(e) > -1
    },
    backdrop: Boolean
  },
  setup(e) {
    const t = e;
    function n(l, ...f) {
      return l.reduce((y, v) => y.then(() => v(...f)), Promise.resolve());
    }
    const s = O(!1);
    O(!1);
    const r = $({
      zIndex: 0,
      panels: [],
      get topSlide() {
        return this.panels.find((l) => l.isTopSlide);
      }
    }), i = g(() => ({
      [`slide-${t.align}`]: !0,
      "has-slide-top": r.panels.reduce((l, f) => l || f.isTopSlide, !1)
    })), o = g(() => ({
      left: t.align === "left",
      right: t.align === "right"
    }));
    g(() => r.panels[r.panels.length - 1]);
    const a = g(() => ({
      display: s ? void 0 : "none",
      zIndex: r.zIndex === 0 ? -1 : 1
    }));
    D(() => r.zIndex, (l) => {
      s.value = l > 0;
    }), F(() => {
      window.addEventListener("keyup", ({ code: l }) => {
        l === "Escape" && r.panels.length && r.panels[r.panels.length - 1].close();
      });
    });
    function c() {
      const l = [...r.panels].reverse().map((f, y) => () => new Promise((v) => {
        f.close((b) => (b !== !1 && setTimeout(() => {
          v(b);
        }, Math.max(100, f.duration / (r.panels.length - y))), b));
      }));
      n(l);
    }
    return A("align", t.align), A("registry", r), (l, f) => (d(), h("div", {
      class: M(["slide-deck-panel-wrapper", x(o)]),
      style: P({ display: s.value ? void 0 : "none" })
    }, [
      e.backdrop ? (d(), h("div", {
        key: 0,
        class: "slide-deck-panel-backdrop",
        onClick: c
      })) : z("", !0),
      p("div", {
        ref: "panel",
        class: M(["slide-deck-panel", x(i)]),
        style: P(x(a))
      }, [
        L(l.$slots, "default")
      ], 6)
    ], 6));
  }
};
var S = {
  px: {
    px: 1,
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    in: 96,
    pt: 96 / 72,
    pc: 16
  },
  cm: {
    px: 2.54 / 96,
    cm: 1,
    mm: 0.1,
    in: 2.54,
    pt: 2.54 / 72,
    pc: 2.54 / 6
  },
  mm: {
    px: 25.4 / 96,
    cm: 10,
    mm: 1,
    in: 25.4,
    pt: 25.4 / 72,
    pc: 25.4 / 6
  },
  in: {
    px: 1 / 96,
    cm: 1 / 2.54,
    mm: 1 / 25.4,
    in: 1,
    pt: 1 / 72,
    pc: 1 / 6
  },
  pt: {
    px: 0.75,
    cm: 72 / 2.54,
    mm: 72 / 25.4,
    in: 72,
    pt: 1,
    pc: 12
  },
  pc: {
    px: 6 / 96,
    cm: 6 / 2.54,
    mm: 6 / 25.4,
    in: 6,
    pt: 6 / 72,
    pc: 1
  },
  deg: {
    deg: 1,
    grad: 0.9,
    rad: 180 / Math.PI,
    turn: 360
  },
  grad: {
    deg: 400 / 360,
    grad: 1,
    rad: 200 / Math.PI,
    turn: 400
  },
  rad: {
    deg: Math.PI / 180,
    grad: Math.PI / 200,
    rad: 1,
    turn: Math.PI * 2
  },
  turn: {
    deg: 1 / 360,
    grad: 1 / 400,
    rad: 0.5 / Math.PI,
    turn: 1
  },
  s: {
    s: 1,
    ms: 1 / 1e3
  },
  ms: {
    s: 1e3,
    ms: 1
  },
  Hz: {
    Hz: 1,
    kHz: 1e3
  },
  kHz: {
    Hz: 1 / 1e3,
    kHz: 1
  },
  dpi: {
    dpi: 1,
    dpcm: 1 / 2.54,
    dppx: 1 / 96
  },
  dpcm: {
    dpi: 2.54,
    dpcm: 1,
    dppx: 2.54 / 96
  },
  dppx: {
    dpi: 96,
    dpcm: 96 / 2.54,
    dppx: 1
  }
}, Q = function(e, t, n, s) {
  if (!S.hasOwnProperty(n))
    throw new Error("Cannot convert to " + n);
  if (!S[n].hasOwnProperty(t))
    throw new Error("Cannot convert from " + t + " to " + n);
  var r = S[n][t] * e;
  return s !== !1 ? (s = Math.pow(10, parseInt(s) || 5), Math.round(r * s) / s) : r;
};
const T = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
};
function W(e, ...t) {
  return e.reduce((n, s) => n.then(() => s(...t)), Promise.resolve());
}
const Z = {
  inject: ["align", "registry"],
  props: {
    show: Boolean,
    width: {
      type: String,
      default: "33%"
    }
  },
  data() {
    return {
      isDisplaying: !1,
      isHover: !1,
      isShowing: !1,
      isTopSlide: !1,
      translateX: 0,
      zIndex: -1
    };
  },
  computed: {
    classes() {
      return {
        show: this.isShowing,
        "slide-top": !!this.isTopSlide
      };
    },
    duration() {
      return getComputedStyle(this.$refs.content).transitionDuration.split(",").map((e) => {
        const [
          t,
          n,
          s
        ] = e.trim().match(/^([\d.]+)(\w+)$/);
        return Q(parseFloat(n), s, "ms");
      }).sort((e, t) => e - t).shift();
    },
    styles() {
      const e = this.align === "left" ? 1 : -1, t = this.registry.panels.length - 1 - this.registry.panels.indexOf(this);
      return {
        zIndex: this.isDisplaying ? this.zIndex : -1,
        display: this.isDisplaying ? "flex" : "none",
        transform: this.isShowing && `translateX(calc((${e} * ${t} * 3.5rem) - (${e * -1} * ${this.isHover && !this.isTopSlide ? "3.5rem" : "0rem"})))`
      };
    }
  },
  watch: {
    isShowing(e) {
      const t = this.registry.panels.indexOf(this);
      e ? (this.isDisplaying = !0, this.zIndex = ++this.registry.zIndex, this.registry.panels.push(this)) : this.registry.panels.splice(t, 1);
    },
    isDisplaying(e) {
      e ? this.$emit("open", this) : this.registry.panels.length || (this.registry.zIndex = 0);
    },
    show(e) {
      e ? this.open() : this.close();
    }
  },
  mounted() {
    this.show && setTimeout(() => this.open(), 1), this.$watch(() => this.registry.panels, () => {
      const e = this.registry.panels.indexOf(this);
      this.isTopSlide = e > -1 && e + 1 === this.registry.panels.length;
    }, { deep: !0 });
  },
  methods: {
    close(e) {
      const t = new Event("close", {
        cancelable: !0
      });
      return new Promise((n) => {
        setTimeout(() => {
          this.$emit("close", t, n), t.defaultPrevented || n(!0);
        });
      }).then((n) => (typeof e == "function" && (n = e(n)), this.isShowing = n === !1)), this;
    },
    divide(e, t) {
      const n = e.toString().match(/^(\d+)(.+)$/);
      return n[0] ? `${parseInt(n[1]) / t}${n[2]}` : e;
    },
    open() {
      return this.isShowing = !0, this;
    },
    toggle() {
      return this.isShowing ? this.close() : this.open(), this;
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
    onEnterFrom() {
      this.$emit("enter-from", this);
    },
    onAfterEnter() {
      this.$emit("after-enter", this);
    },
    onBeforeLeave() {
      this.$emit("before-leave", this);
    },
    onLeaveFrom() {
      this.$emit("leave-from", this);
    },
    onAfterLeave() {
      this.isDisplaying = this.isShowing, this.$emit("after-leave", this);
    },
    onClick(e) {
      if (this.$refs.close) {
        const t = this.registry.panels.indexOf(this), n = this.registry.panels.slice(t + 1), s = n.reverse().map((r, i) => () => new Promise((o) => {
          r.close((a) => (a !== !1 && setTimeout(() => {
            o(a);
          }, Math.max(100, this.duration / (n.length - i))), a));
        }));
        W(s);
      }
    },
    onClickClose() {
      this.close();
    },
    onMouseenter(e) {
      this.isTopSlide || this.registry.panels.slice(0, this.registry.panels.indexOf(this) + 1).forEach((t) => {
        t.isHover = !0;
      });
    },
    onMouseleave(e) {
      this.registry.panels.slice(0, this.registry.panels.indexOf(this) + 1).forEach((t) => {
        t.isHover = !1;
      });
    }
  }
}, U = {
  ref: "inner",
  class: "slide-panel-content-inner"
}, ee = /* @__PURE__ */ p("span", null, "\xD7", -1), te = [
  ee
];
function ne(e, t, n, s, r, i) {
  return d(), h("div", {
    class: M(["slide-panel", i.classes]),
    style: P(i.styles),
    onMouseenter: t[2] || (t[2] = w((...o) => i.onMouseenter && i.onMouseenter(...o), ["self"])),
    onMouseleave: t[3] || (t[3] = w((...o) => i.onMouseleave && i.onMouseleave(...o), ["self"]))
  }, [
    H(N, {
      name: "slide",
      onBeforeEnter: i.onBeforeEnter,
      onEnterFrom: i.onEnterFrom,
      onAfterEnter: i.onAfterEnter,
      onBeforeLeave: i.onBeforeLeave,
      onLeaveFrom: i.onLeaveFrom,
      onAfterLeave: i.onAfterLeave
    }, {
      default: E(() => [
        r.isShowing ? (d(), h("div", {
          key: 0,
          ref: "content",
          class: "slide-panel-content",
          onClick: t[1] || (t[1] = (...o) => i.onClick && i.onClick(...o))
        }, [
          p("div", U, [
            L(e.$slots, "default")
          ], 512),
          p("div", null, [
            p("a", {
              ref: "close",
              href: "#",
              class: "slide-panel-close",
              onClick: t[0] || (t[0] = w((...o) => i.close && i.close(...o), ["prevent"]))
            }, te, 512)
          ])
        ], 512)) : z("", !0)
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnterFrom", "onAfterEnter", "onBeforeLeave", "onLeaveFrom", "onAfterLeave"])
  ], 38);
}
const re = /* @__PURE__ */ T(Z, [["render", ne]]), se = {
  components: { SlideDeck: J, SlidePanel: re },
  props: {
    options: Object,
    panels: Array,
    removePanel: Function
  },
  methods: {
    getPanelChildren(e) {
      const t = this.$refs.panel[this.panels.indexOf(e)];
      return e.callback.apply(t, [t]);
    },
    onAfterLeave(e) {
      e.resolve(), this.removePanel(e);
    }
  }
};
function ie(e, t, n, s, r, i) {
  const o = I("slide-panel"), a = I("slide-deck");
  return d(), _(a, R(V(n.options)), {
    default: E(() => [
      (d(!0), h(X, null, K(n.panels, (c) => (d(), _(o, Y({
        key: c.id,
        ref_for: !0,
        ref: "panel",
        show: !0
      }, c.options, {
        onAfterLeave: () => i.onAfterLeave(c)
      }), {
        default: E(() => [
          (d(), _(q(i.getPanelChildren(c))))
        ]),
        _: 2
      }, 1040, ["onAfterLeave"]))), 128))
    ]),
    _: 1
  }, 16);
}
const oe = /* @__PURE__ */ T(se, [["render", ie]]);
class le {
  constructor(t) {
    this.app = t;
  }
  mount(t) {
    t.appContext = this.app._context;
    const n = document.createElement("div");
    G(C(t), n), document.body.append(n);
  }
  register(t, n = {}) {
    let s = -1;
    const r = $([]);
    function i(o) {
      r.splice(r.findIndex((a) => a.id === o.id), 1);
    }
    this[t] = (o, a = {}) => new Promise((c) => {
      r.push({ callback: o, options: a, resolve: c, id: ++s, showing: !0 });
    }).finally(() => {
    }), this.mount(C(oe, { options: n, panels: r, removePanel: i }));
  }
}
var ae = function(t) {
  return ce(t) && !de(t);
};
function ce(e) {
  return !!e && typeof e == "object";
}
function de(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || pe(e);
}
var fe = typeof Symbol == "function" && Symbol.for, ue = fe ? Symbol.for("react.element") : 60103;
function pe(e) {
  return e.$$typeof === ue;
}
function he(e) {
  return Array.isArray(e) ? [] : {};
}
function m(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? u(he(e), e, t) : e;
}
function me(e, t, n) {
  return e.concat(t).map(function(s) {
    return m(s, n);
  });
}
function ge(e, t) {
  if (!t.customMerge)
    return u;
  var n = t.customMerge(e);
  return typeof n == "function" ? n : u;
}
function ye(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return e.propertyIsEnumerable(t);
  }) : [];
}
function k(e) {
  return Object.keys(e).concat(ye(e));
}
function B(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function ve(e, t) {
  return B(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function be(e, t, n) {
  var s = {};
  return n.isMergeableObject(e) && k(e).forEach(function(r) {
    s[r] = m(e[r], n);
  }), k(t).forEach(function(r) {
    ve(e, r) || (B(e, r) && n.isMergeableObject(t[r]) ? s[r] = ge(r, n)(e[r], t[r], n) : s[r] = m(t[r], n));
  }), s;
}
function u(e, t, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || me, n.isMergeableObject = n.isMergeableObject || ae, n.cloneUnlessOtherwiseSpecified = m;
  var s = Array.isArray(t), r = Array.isArray(e), i = s === r;
  return i ? s ? n.arrayMerge(e, t, n) : be(e, t, n) : m(t, n);
}
u.all = function(t, n) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, r) {
    return u(s, r, n);
  }, {});
};
var xe = u, j = xe;
const _e = (e, t = {}) => {
  const n = new le(e);
  n.register("right", j({
    align: "right"
  }, {})), n.register("left", j({
    align: "left"
  }, {})), e.provide("slidePanel", n), e.config.globalProperties.$slidePanel = n;
};
export {
  J as SlideDeck,
  re as SlidePanel,
  _e as SlidePanelPlugin
};
