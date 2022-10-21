import { ref as A, reactive as j, computed as g, watch as D, onMounted as F, provide as I, openBlock as d, createElementBlock as h, normalizeClass as M, unref as w, normalizeStyle as P, createCommentVNode as $, createElementVNode as p, renderSlot as z, withModifiers as x, createVNode as H, Transition as N, withCtx as E, resolveComponent as C, createBlock as S, normalizeProps as R, guardReactiveProps as V, Fragment as X, renderList as K, mergeProps as Y, resolveDynamicComponent as q, createApp as G } from "vue";
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
    function r(o, ...f) {
      return o.reduce((y, v) => y.then(() => v(...f)), Promise.resolve());
    }
    const s = A(!1);
    A(!1);
    const n = j({
      zIndex: 0,
      panels: [],
      get topSlide() {
        return this.panels.find((o) => o.isTopSlide);
      }
    }), i = g(() => ({
      [`slide-${t.align}`]: !0,
      "has-slide-top": n.panels.reduce((o, f) => o || f.isTopSlide, !1)
    })), l = g(() => ({
      left: t.align === "left",
      right: t.align === "right"
    }));
    g(() => n.panels[n.panels.length - 1]);
    const a = g(() => ({
      display: s ? void 0 : "none",
      zIndex: n.zIndex === 0 ? -1 : 1
    }));
    D(() => n.zIndex, (o) => {
      s.value = o > 0;
    }), F(() => {
      window.addEventListener("keyup", ({ code: o }) => {
        o === "Escape" && n.panels.length && n.panels[n.panels.length - 1].close();
      });
    });
    function c() {
      const o = [...n.panels].reverse().map((f, y) => () => new Promise((v) => {
        f.close((b) => (b !== !1 && setTimeout(() => {
          v(b);
        }, Math.max(100, f.duration / (n.panels.length - y))), b));
      }));
      r(o);
    }
    return I("align", t.align), I("registry", n), (o, f) => (d(), h("div", {
      class: M(["slide-deck-panel-wrapper", w(l)]),
      style: P({ display: s.value ? void 0 : "none" })
    }, [
      e.backdrop ? (d(), h("div", {
        key: 0,
        class: "slide-deck-panel-backdrop",
        onClick: c
      })) : $("", !0),
      p("div", {
        ref: "panel",
        class: M(["slide-deck-panel", w(i)]),
        style: P(w(a))
      }, [
        z(o.$slots, "default")
      ], 6)
    ], 6));
  }
};
var _ = {
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
}, Q = function(e, t, r, s) {
  if (!_.hasOwnProperty(r))
    throw new Error("Cannot convert to " + r);
  if (!_[r].hasOwnProperty(t))
    throw new Error("Cannot convert from " + t + " to " + r);
  var n = _[r][t] * e;
  return s !== !1 ? (s = Math.pow(10, parseInt(s) || 5), Math.round(n * s) / s) : n;
};
const L = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [s, n] of t)
    r[s] = n;
  return r;
};
function W(e, ...t) {
  return e.reduce((r, s) => r.then(() => s(...t)), Promise.resolve());
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
          r,
          s
        ] = e.trim().match(/^([\d.]+)(\w+)$/);
        return Q(parseFloat(r), s, "ms");
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
      return new Promise((r) => {
        setTimeout(() => {
          this.$emit("close", t, r), t.defaultPrevented || r(!0);
        });
      }).then((r) => (typeof e == "function" && (r = e(r)), this.isShowing = r === !1)), this;
    },
    divide(e, t) {
      const r = e.toString().match(/^(\d+)(.+)$/);
      return r[0] ? `${parseInt(r[1]) / t}${r[2]}` : e;
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
        const t = this.registry.panels.indexOf(this), r = this.registry.panels.slice(t + 1), s = r.reverse().map((n, i) => () => new Promise((l) => {
          n.close((a) => (a !== !1 && setTimeout(() => {
            l(a);
          }, Math.max(100, this.duration / (r.length - i))), a));
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
function re(e, t, r, s, n, i) {
  return d(), h("div", {
    class: M(["slide-panel", i.classes]),
    style: P(i.styles),
    onMouseenter: t[2] || (t[2] = x((...l) => i.onMouseenter && i.onMouseenter(...l), ["self"])),
    onMouseleave: t[3] || (t[3] = x((...l) => i.onMouseleave && i.onMouseleave(...l), ["self"]))
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
        n.isShowing ? (d(), h("div", {
          key: 0,
          ref: "content",
          class: "slide-panel-content",
          onClick: t[1] || (t[1] = (...l) => i.onClick && i.onClick(...l))
        }, [
          p("div", U, [
            z(e.$slots, "default")
          ], 512),
          p("div", null, [
            p("a", {
              ref: "close",
              href: "#",
              class: "slide-panel-close",
              onClick: t[0] || (t[0] = x((...l) => i.close && i.close(...l), ["prevent"]))
            }, te, 512)
          ])
        ], 512)) : $("", !0)
      ]),
      _: 3
    }, 8, ["onBeforeEnter", "onEnterFrom", "onAfterEnter", "onBeforeLeave", "onLeaveFrom", "onAfterLeave"])
  ], 38);
}
const ne = /* @__PURE__ */ L(Z, [["render", re]]), se = {
  components: { SlideDeck: J, SlidePanel: ne },
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
    onAfterLeaveSlide(e) {
      e.resolve(), this.removePanel(e);
    }
  }
};
function ie(e, t, r, s, n, i) {
  const l = C("slide-panel"), a = C("slide-deck");
  return d(), S(a, R(V(r.options)), {
    default: E(() => [
      (d(!0), h(X, null, K(r.panels, (c) => (d(), S(l, Y({
        key: c.id,
        ref_for: !0,
        ref: "panel",
        show: !0
      }, c.options, {
        onAfterLeave: () => i.onAfterLeaveSlide(c)
      }), {
        default: E(() => [
          (d(), S(q(i.getPanelChildren(c))))
        ]),
        _: 2
      }, 1040, ["onAfterLeave"]))), 128))
    ]),
    _: 1
  }, 16);
}
const le = /* @__PURE__ */ L(se, [["render", ie]]);
class oe {
  register(t, r = {}) {
    let s = -1;
    const n = j([]);
    function i(a) {
      n.splice(n.findIndex((c) => c.id === a.id), 1);
    }
    const l = document.body.appendChild(document.createElement("div"));
    G(le, {
      options: r,
      panels: n,
      removePanel: i
    }).mount(l), this[t] = (a, c = {}) => new Promise((o) => {
      n.push({
        callback: a,
        options: c,
        resolve: o,
        id: ++s,
        showing: !0
      });
    }).finally(() => {
    });
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
function me(e, t, r) {
  return e.concat(t).map(function(s) {
    return m(s, r);
  });
}
function ge(e, t) {
  if (!t.customMerge)
    return u;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : u;
}
function ye(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return e.propertyIsEnumerable(t);
  }) : [];
}
function k(e) {
  return Object.keys(e).concat(ye(e));
}
function T(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function ve(e, t) {
  return T(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function be(e, t, r) {
  var s = {};
  return r.isMergeableObject(e) && k(e).forEach(function(n) {
    s[n] = m(e[n], r);
  }), k(t).forEach(function(n) {
    ve(e, n) || (T(e, n) && r.isMergeableObject(t[n]) ? s[n] = ge(n, r)(e[n], t[n], r) : s[n] = m(t[n], r));
  }), s;
}
function u(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || me, r.isMergeableObject = r.isMergeableObject || ae, r.cloneUnlessOtherwiseSpecified = m;
  var s = Array.isArray(t), n = Array.isArray(e), i = s === n;
  return i ? s ? r.arrayMerge(e, t, r) : be(e, t, r) : m(t, r);
}
u.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, n) {
    return u(s, n, r);
  }, {});
};
var we = u, B = we;
const O = new oe();
O.register("right", B({
  align: "right"
}, {}));
O.register("left", B({
  align: "left"
}, {}));
const Se = (e, t = {}) => {
  e.config.globalProperties.$store = t.store, e.config.globalProperties.$slidePanel = O;
};
export {
  J as SlideDeck,
  ne as SlidePanel,
  Se as SlidePanelPlugin,
  O as factory
};
