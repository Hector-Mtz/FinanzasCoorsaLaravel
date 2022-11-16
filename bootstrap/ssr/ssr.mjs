import { createSSRApp, h as h$1, useSSRContext, mergeProps, withCtx, renderSlot, watch, onMounted, onUnmounted, computed, unref, createVNode, openBlock, createBlock, useSlots, ref, createTextVNode, Fragment, renderList, toDisplayString, createCommentVNode, defineComponent, withModifiers, nextTick, reactive, watchEffect, onBeforeMount, isRef, resolveComponent, withKeys, withDirectives, vShow } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp, useForm, usePage, Link, Head } from "@inertiajs/inertia-vue3";
import require$$0 from "process";
import require$$1 from "http";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers.js";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot, ssrRenderComponent, ssrRenderTeleport, ssrRenderClass, ssrLooseContain, ssrGetDynamicModelProps, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import axios$1 from "axios";
import { Inertia as Inertia$1 } from "@inertiajs/inertia";
import { pickBy } from "lodash";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy.js";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated.js";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy.js";
import moment from "moment";
import { computed as computed$1 } from "@vue/runtime-core";
import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4charts from "@amcharts/amcharts4/charts.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated.js";
var lib = {};
Object.defineProperty(lib, "__esModule", {
  value: true
});
var default_1 = lib.default = void 0;
var process = _interopRequireWildcard(require$$0);
var _http = require$$1;
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function")
    return null;
  var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
  var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function(nodeInterop2) {
    return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
const readableToString = (readable) => new Promise((resolve, reject) => {
  let data2 = "";
  readable.on("data", (chunk) => data2 += chunk);
  readable.on("end", () => resolve(data2));
  readable.on("error", (err) => reject(err));
});
var _default = (render, port) => {
  const _port = port || 13714;
  const routes = {
    "/health": async () => ({
      status: "OK",
      timestamp: Date.now()
    }),
    "/shutdown": () => process.exit(),
    "/render": async (request) => render(JSON.parse(await readableToString(request))),
    "/404": async () => ({
      status: "NOT_FOUND",
      timestamp: Date.now()
    })
  };
  (0, _http.createServer)(async (request, response) => {
    const dispatchRoute = routes[request.url] || routes["/404"];
    try {
      response.writeHead(200, {
        "Content-Type": "application/json",
        "Server": "Inertia.js SSR"
      });
      response.write(JSON.stringify(await dispatchRoute(request)));
    } catch (e2) {
      console.error(e2);
    }
    response.end();
  }).listen(_port, () => console.log("Inertia SSR server started."));
  console.log(`Starting SSR server on port ${_port}...`);
};
default_1 = lib.default = _default;
function t(t4, r2) {
  for (var n2 = 0; n2 < r2.length; n2++) {
    var e2 = r2[n2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(t4, e2.key, e2);
  }
}
function r(r2, n2, e2) {
  return n2 && t(r2.prototype, n2), e2 && t(r2, e2), Object.defineProperty(r2, "prototype", { writable: false }), r2;
}
function n() {
  return n = Object.assign || function(t4) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var n2 = arguments[r2];
      for (var e2 in n2)
        Object.prototype.hasOwnProperty.call(n2, e2) && (t4[e2] = n2[e2]);
    }
    return t4;
  }, n.apply(this, arguments);
}
function e(t4) {
  return e = Object.setPrototypeOf ? Object.getPrototypeOf : function(t5) {
    return t5.__proto__ || Object.getPrototypeOf(t5);
  }, e(t4);
}
function o(t4, r2) {
  return o = Object.setPrototypeOf || function(t5, r3) {
    return t5.__proto__ = r3, t5;
  }, o(t4, r2);
}
function i() {
  if ("undefined" == typeof Reflect || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if ("function" == typeof Proxy)
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (t4) {
    return false;
  }
}
function u(t4, r2, n2) {
  return u = i() ? Reflect.construct : function(t5, r3, n3) {
    var e2 = [null];
    e2.push.apply(e2, r3);
    var i2 = new (Function.bind.apply(t5, e2))();
    return n3 && o(i2, n3.prototype), i2;
  }, u.apply(null, arguments);
}
function f(t4) {
  var r2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
  return f = function(t5) {
    if (null === t5 || -1 === Function.toString.call(t5).indexOf("[native code]"))
      return t5;
    if ("function" != typeof t5)
      throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r2) {
      if (r2.has(t5))
        return r2.get(t5);
      r2.set(t5, n2);
    }
    function n2() {
      return u(t5, arguments, e(this).constructor);
    }
    return n2.prototype = Object.create(t5.prototype, { constructor: { value: n2, enumerable: false, writable: true, configurable: true } }), o(n2, t5);
  }, f(t4);
}
var a = String.prototype.replace, c = /%20/g, l = { default: "RFC3986", formatters: { RFC1738: function(t4) {
  return a.call(t4, c, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: "RFC3986" }, s = Object.prototype.hasOwnProperty, v = Array.isArray, p = function() {
  for (var t4 = [], r2 = 0; r2 < 256; ++r2)
    t4.push("%" + ((r2 < 16 ? "0" : "") + r2.toString(16)).toUpperCase());
  return t4;
}(), y = function(t4, r2) {
  for (var n2 = r2 && r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, e2 = 0; e2 < t4.length; ++e2)
    void 0 !== t4[e2] && (n2[e2] = t4[e2]);
  return n2;
}, d = { arrayToObject: y, assign: function(t4, r2) {
  return Object.keys(r2).reduce(function(t5, n2) {
    return t5[n2] = r2[n2], t5;
  }, t4);
}, combine: function(t4, r2) {
  return [].concat(t4, r2);
}, compact: function(t4) {
  for (var r2 = [{ obj: { o: t4 }, prop: "o" }], n2 = [], e2 = 0; e2 < r2.length; ++e2)
    for (var o2 = r2[e2], i2 = o2.obj[o2.prop], u2 = Object.keys(i2), f2 = 0; f2 < u2.length; ++f2) {
      var a2 = u2[f2], c2 = i2[a2];
      "object" == typeof c2 && null !== c2 && -1 === n2.indexOf(c2) && (r2.push({ obj: i2, prop: a2 }), n2.push(c2));
    }
  return function(t5) {
    for (; t5.length > 1; ) {
      var r3 = t5.pop(), n3 = r3.obj[r3.prop];
      if (v(n3)) {
        for (var e3 = [], o3 = 0; o3 < n3.length; ++o3)
          void 0 !== n3[o3] && e3.push(n3[o3]);
        r3.obj[r3.prop] = e3;
      }
    }
  }(r2), t4;
}, decode: function(t4, r2, n2) {
  var e2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === n2)
    return e2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e2);
  } catch (t5) {
    return e2;
  }
}, encode: function(t4, r2, n2, e2, o2) {
  if (0 === t4.length)
    return t4;
  var i2 = t4;
  if ("symbol" == typeof t4 ? i2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (i2 = String(t4)), "iso-8859-1" === n2)
    return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
  for (var u2 = "", f2 = 0; f2 < i2.length; ++f2) {
    var a2 = i2.charCodeAt(f2);
    45 === a2 || 46 === a2 || 95 === a2 || 126 === a2 || a2 >= 48 && a2 <= 57 || a2 >= 65 && a2 <= 90 || a2 >= 97 && a2 <= 122 || o2 === l.RFC1738 && (40 === a2 || 41 === a2) ? u2 += i2.charAt(f2) : a2 < 128 ? u2 += p[a2] : a2 < 2048 ? u2 += p[192 | a2 >> 6] + p[128 | 63 & a2] : a2 < 55296 || a2 >= 57344 ? u2 += p[224 | a2 >> 12] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2] : (a2 = 65536 + ((1023 & a2) << 10 | 1023 & i2.charCodeAt(f2 += 1)), u2 += p[240 | a2 >> 18] + p[128 | a2 >> 12 & 63] + p[128 | a2 >> 6 & 63] + p[128 | 63 & a2]);
  }
  return u2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, r2) {
  if (v(t4)) {
    for (var n2 = [], e2 = 0; e2 < t4.length; e2 += 1)
      n2.push(r2(t4[e2]));
    return n2;
  }
  return r2(t4);
}, merge: function t2(r2, n2, e2) {
  if (!n2)
    return r2;
  if ("object" != typeof n2) {
    if (v(r2))
      r2.push(n2);
    else {
      if (!r2 || "object" != typeof r2)
        return [r2, n2];
      (e2 && (e2.plainObjects || e2.allowPrototypes) || !s.call(Object.prototype, n2)) && (r2[n2] = true);
    }
    return r2;
  }
  if (!r2 || "object" != typeof r2)
    return [r2].concat(n2);
  var o2 = r2;
  return v(r2) && !v(n2) && (o2 = y(r2, e2)), v(r2) && v(n2) ? (n2.forEach(function(n3, o3) {
    if (s.call(r2, o3)) {
      var i2 = r2[o3];
      i2 && "object" == typeof i2 && n3 && "object" == typeof n3 ? r2[o3] = t2(i2, n3, e2) : r2.push(n3);
    } else
      r2[o3] = n3;
  }), r2) : Object.keys(n2).reduce(function(r3, o3) {
    var i2 = n2[o3];
    return r3[o3] = s.call(r3, o3) ? t2(r3[o3], i2, e2) : i2, r3;
  }, o2);
} }, b = Object.prototype.hasOwnProperty, h = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, r2) {
  return t4 + "[" + r2 + "]";
}, repeat: function(t4) {
  return t4;
} }, m = Array.isArray, g = String.prototype.split, j = Array.prototype.push, w = function(t4, r2) {
  j.apply(t4, m(r2) ? r2 : [r2]);
}, O = Date.prototype.toISOString, E = l.default, R = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: d.encode, encodeValuesOnly: false, format: E, formatter: l.formatters[E], indices: false, serializeDate: function(t4) {
  return O.call(t4);
}, skipNulls: false, strictNullHandling: false }, S = function t3(r2, n2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2) {
  var b2, h2 = r2;
  if ("function" == typeof f2 ? h2 = f2(n2, h2) : h2 instanceof Date ? h2 = l2(h2) : "comma" === e2 && m(h2) && (h2 = d.maybeMap(h2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === h2) {
    if (o2)
      return u2 && !p2 ? u2(n2, R.encoder, y2, "key", s2) : n2;
    h2 = "";
  }
  if ("string" == typeof (b2 = h2) || "number" == typeof b2 || "boolean" == typeof b2 || "symbol" == typeof b2 || "bigint" == typeof b2 || d.isBuffer(h2)) {
    if (u2) {
      var j2 = p2 ? n2 : u2(n2, R.encoder, y2, "key", s2);
      if ("comma" === e2 && p2) {
        for (var O2 = g.call(String(h2), ","), E2 = "", S2 = 0; S2 < O2.length; ++S2)
          E2 += (0 === S2 ? "" : ",") + v2(u2(O2[S2], R.encoder, y2, "value", s2));
        return [v2(j2) + "=" + E2];
      }
      return [v2(j2) + "=" + v2(u2(h2, R.encoder, y2, "value", s2))];
    }
    return [v2(n2) + "=" + v2(String(h2))];
  }
  var k2, x2 = [];
  if (void 0 === h2)
    return x2;
  if ("comma" === e2 && m(h2))
    k2 = [{ value: h2.length > 0 ? h2.join(",") || null : void 0 }];
  else if (m(f2))
    k2 = f2;
  else {
    var C2 = Object.keys(h2);
    k2 = a2 ? C2.sort(a2) : C2;
  }
  for (var N2 = 0; N2 < k2.length; ++N2) {
    var T2 = k2[N2], F2 = "object" == typeof T2 && void 0 !== T2.value ? T2.value : h2[T2];
    if (!i2 || null !== F2) {
      var D2 = m(h2) ? "function" == typeof e2 ? e2(n2, T2) : n2 : n2 + (c2 ? "." + T2 : "[" + T2 + "]");
      w(x2, t3(F2, D2, e2, o2, i2, u2, f2, a2, c2, l2, s2, v2, p2, y2));
    }
  }
  return x2;
}, k = Object.prototype.hasOwnProperty, x = Array.isArray, C = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, N = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, r2) {
    return String.fromCharCode(parseInt(r2, 10));
  });
}, T = function(t4, r2) {
  return t4 && "string" == typeof t4 && r2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, F = function(t4, r2, n2, e2) {
  if (t4) {
    var o2 = n2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = n2.depth > 0 && /(\[[^[\]]*])/.exec(o2), f2 = u2 ? o2.slice(0, u2.index) : o2, a2 = [];
    if (f2) {
      if (!n2.plainObjects && k.call(Object.prototype, f2) && !n2.allowPrototypes)
        return;
      a2.push(f2);
    }
    for (var c2 = 0; n2.depth > 0 && null !== (u2 = i2.exec(o2)) && c2 < n2.depth; ) {
      if (c2 += 1, !n2.plainObjects && k.call(Object.prototype, u2[1].slice(1, -1)) && !n2.allowPrototypes)
        return;
      a2.push(u2[1]);
    }
    return u2 && a2.push("[" + o2.slice(u2.index) + "]"), function(t5, r3, n3, e3) {
      for (var o3 = e3 ? r3 : T(r3, n3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, f3 = t5[i3];
        if ("[]" === f3 && n3.parseArrays)
          u3 = [].concat(o3);
        else {
          u3 = n3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var a3 = "[" === f3.charAt(0) && "]" === f3.charAt(f3.length - 1) ? f3.slice(1, -1) : f3, c3 = parseInt(a3, 10);
          n3.parseArrays || "" !== a3 ? !isNaN(c3) && f3 !== a3 && String(c3) === a3 && c3 >= 0 && n3.parseArrays && c3 <= n3.arrayLimit ? (u3 = [])[c3] = o3 : "__proto__" !== a3 && (u3[a3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(a2, r2, n2, e2);
  }
}, D = function(t4, r2) {
  var n2 = function(t5) {
    if (!t5)
      return C;
    if (null != t5.decoder && "function" != typeof t5.decoder)
      throw new TypeError("Decoder has to be a function.");
    if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset)
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    return { allowDots: void 0 === t5.allowDots ? C.allowDots : !!t5.allowDots, allowPrototypes: "boolean" == typeof t5.allowPrototypes ? t5.allowPrototypes : C.allowPrototypes, arrayLimit: "number" == typeof t5.arrayLimit ? t5.arrayLimit : C.arrayLimit, charset: void 0 === t5.charset ? C.charset : t5.charset, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : C.charsetSentinel, comma: "boolean" == typeof t5.comma ? t5.comma : C.comma, decoder: "function" == typeof t5.decoder ? t5.decoder : C.decoder, delimiter: "string" == typeof t5.delimiter || d.isRegExp(t5.delimiter) ? t5.delimiter : C.delimiter, depth: "number" == typeof t5.depth || false === t5.depth ? +t5.depth : C.depth, ignoreQueryPrefix: true === t5.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t5.interpretNumericEntities ? t5.interpretNumericEntities : C.interpretNumericEntities, parameterLimit: "number" == typeof t5.parameterLimit ? t5.parameterLimit : C.parameterLimit, parseArrays: false !== t5.parseArrays, plainObjects: "boolean" == typeof t5.plainObjects ? t5.plainObjects : C.plainObjects, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : C.strictNullHandling };
  }(r2);
  if ("" === t4 || null == t4)
    return n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var e2 = "string" == typeof t4 ? function(t5, r3) {
    var n3, e3 = {}, o3 = (r3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(r3.delimiter, Infinity === r3.parameterLimit ? void 0 : r3.parameterLimit), i3 = -1, u3 = r3.charset;
    if (r3.charsetSentinel)
      for (n3 = 0; n3 < o3.length; ++n3)
        0 === o3[n3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[n3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[n3] && (u3 = "iso-8859-1"), i3 = n3, n3 = o3.length);
    for (n3 = 0; n3 < o3.length; ++n3)
      if (n3 !== i3) {
        var f3, a3, c2 = o3[n3], l2 = c2.indexOf("]="), s2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
        -1 === s2 ? (f3 = r3.decoder(c2, C.decoder, u3, "key"), a3 = r3.strictNullHandling ? null : "") : (f3 = r3.decoder(c2.slice(0, s2), C.decoder, u3, "key"), a3 = d.maybeMap(T(c2.slice(s2 + 1), r3), function(t6) {
          return r3.decoder(t6, C.decoder, u3, "value");
        })), a3 && r3.interpretNumericEntities && "iso-8859-1" === u3 && (a3 = N(a3)), c2.indexOf("[]=") > -1 && (a3 = x(a3) ? [a3] : a3), e3[f3] = k.call(e3, f3) ? d.combine(e3[f3], a3) : a3;
      }
    return e3;
  }(t4, n2) : t4, o2 = n2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(e2), u2 = 0; u2 < i2.length; ++u2) {
    var f2 = i2[u2], a2 = F(f2, e2[f2], n2, "string" == typeof t4);
    o2 = d.merge(o2, a2, n2);
  }
  return d.compact(o2);
}, $ = /* @__PURE__ */ function() {
  function t4(t5, r2, n3) {
    var e2, o2;
    this.name = t5, this.definition = r2, this.bindings = null != (e2 = r2.bindings) ? e2 : {}, this.wheres = null != (o2 = r2.wheres) ? o2 : {}, this.config = n3;
  }
  var n2 = t4.prototype;
  return n2.matchesUrl = function(t5) {
    var r2 = this;
    if (!this.definition.methods.includes("GET"))
      return false;
    var n3 = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(t6, n4, e3, o3) {
      var i3, u3 = "(?<" + e3 + ">" + ((null == (i3 = r2.wheres[e3]) ? void 0 : i3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return o3 ? "(" + n4 + u3 + ")?" : "" + n4 + u3;
    }).replace(/^\w+:\/\//, ""), e2 = t5.replace(/^\w+:\/\//, "").split("?"), o2 = e2[0], i2 = e2[1], u2 = new RegExp("^" + n3 + "/?$").exec(o2);
    return !!u2 && { params: u2.groups, query: D(i2) };
  }, n2.compile = function(t5) {
    var r2 = this, n3 = this.parameterSegments;
    return n3.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(e2, o2, i2) {
      var u2, f2, a2;
      if (!i2 && [null, void 0].includes(t5[o2]))
        throw new Error("Ziggy error: '" + o2 + "' parameter is required for route '" + r2.name + "'.");
      if (n3[n3.length - 1].name === o2 && ".*" === r2.wheres[o2])
        return encodeURIComponent(null != (a2 = t5[o2]) ? a2 : "").replace(/%2F/g, "/");
      if (r2.wheres[o2] && !new RegExp("^" + (i2 ? "(" + r2.wheres[o2] + ")?" : r2.wheres[o2]) + "$").test(null != (u2 = t5[o2]) ? u2 : ""))
        throw new Error("Ziggy error: '" + o2 + "' parameter does not match required format '" + r2.wheres[o2] + "' for route '" + r2.name + "'.");
      return encodeURIComponent(null != (f2 = t5[o2]) ? f2 : "");
    }).replace(/\/+$/, "") : this.template;
  }, r(t4, [{ key: "template", get: function() {
    return ((this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "") + "/" + this.definition.uri).replace(/\/+$/, "");
  } }, { key: "parameterSegments", get: function() {
    var t5, r2;
    return null != (t5 = null == (r2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r2.map(function(t6) {
      return { name: t6.replace(/{|\??}/g, ""), required: !/\?}$/.test(t6) };
    })) ? t5 : [];
  } }]), t4;
}(), A = /* @__PURE__ */ function(t4) {
  var e2, i2;
  function u2(r2, e3, o2, i3) {
    var u3;
    if (void 0 === o2 && (o2 = true), (u3 = t4.call(this) || this).t = null != i3 ? i3 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u3.t = n({}, u3.t, { absolute: o2 }), r2) {
      if (!u3.t.routes[r2])
        throw new Error("Ziggy error: route '" + r2 + "' is not in the route list.");
      u3.i = new $(r2, u3.t.routes[r2], u3.t), u3.u = u3.l(e3);
    }
    return u3;
  }
  i2 = t4, (e2 = u2).prototype = Object.create(i2.prototype), e2.prototype.constructor = e2, o(e2, i2);
  var f2 = u2.prototype;
  return f2.toString = function() {
    var t5 = this, r2 = Object.keys(this.u).filter(function(r3) {
      return !t5.i.parameterSegments.some(function(t6) {
        return t6.name === r3;
      });
    }).filter(function(t6) {
      return "_query" !== t6;
    }).reduce(function(r3, e3) {
      var o2;
      return n({}, r3, ((o2 = {})[e3] = t5.u[e3], o2));
    }, {});
    return this.i.compile(this.u) + function(t6, r3) {
      var n2, e3 = t6, o2 = function(t7) {
        if (!t7)
          return R;
        if (null != t7.encoder && "function" != typeof t7.encoder)
          throw new TypeError("Encoder has to be a function.");
        var r4 = t7.charset || R.charset;
        if (void 0 !== t7.charset && "utf-8" !== t7.charset && "iso-8859-1" !== t7.charset)
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var n3 = l.default;
        if (void 0 !== t7.format) {
          if (!b.call(l.formatters, t7.format))
            throw new TypeError("Unknown format option provided.");
          n3 = t7.format;
        }
        var e4 = l.formatters[n3], o3 = R.filter;
        return ("function" == typeof t7.filter || m(t7.filter)) && (o3 = t7.filter), { addQueryPrefix: "boolean" == typeof t7.addQueryPrefix ? t7.addQueryPrefix : R.addQueryPrefix, allowDots: void 0 === t7.allowDots ? R.allowDots : !!t7.allowDots, charset: r4, charsetSentinel: "boolean" == typeof t7.charsetSentinel ? t7.charsetSentinel : R.charsetSentinel, delimiter: void 0 === t7.delimiter ? R.delimiter : t7.delimiter, encode: "boolean" == typeof t7.encode ? t7.encode : R.encode, encoder: "function" == typeof t7.encoder ? t7.encoder : R.encoder, encodeValuesOnly: "boolean" == typeof t7.encodeValuesOnly ? t7.encodeValuesOnly : R.encodeValuesOnly, filter: o3, format: n3, formatter: e4, serializeDate: "function" == typeof t7.serializeDate ? t7.serializeDate : R.serializeDate, skipNulls: "boolean" == typeof t7.skipNulls ? t7.skipNulls : R.skipNulls, sort: "function" == typeof t7.sort ? t7.sort : null, strictNullHandling: "boolean" == typeof t7.strictNullHandling ? t7.strictNullHandling : R.strictNullHandling };
      }(r3);
      "function" == typeof o2.filter ? e3 = (0, o2.filter)("", e3) : m(o2.filter) && (n2 = o2.filter);
      var i3 = [];
      if ("object" != typeof e3 || null === e3)
        return "";
      var u3 = h[r3 && r3.arrayFormat in h ? r3.arrayFormat : r3 && "indices" in r3 ? r3.indices ? "indices" : "repeat" : "indices"];
      n2 || (n2 = Object.keys(e3)), o2.sort && n2.sort(o2.sort);
      for (var f3 = 0; f3 < n2.length; ++f3) {
        var a2 = n2[f3];
        o2.skipNulls && null === e3[a2] || w(i3, S(e3[a2], a2, u3, o2.strictNullHandling, o2.skipNulls, o2.encode ? o2.encoder : null, o2.filter, o2.sort, o2.allowDots, o2.serializeDate, o2.format, o2.formatter, o2.encodeValuesOnly, o2.charset));
      }
      var c2 = i3.join(o2.delimiter), s2 = true === o2.addQueryPrefix ? "?" : "";
      return o2.charsetSentinel && (s2 += "iso-8859-1" === o2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c2.length > 0 ? s2 + c2 : "";
    }(n({}, r2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: function(t6, r3) {
      return "boolean" == typeof t6 ? Number(t6) : r3(t6);
    } });
  }, f2.v = function(t5) {
    var r2 = this;
    t5 ? this.t.absolute && t5.startsWith("/") && (t5 = this.p().host + t5) : t5 = this.h();
    var e3 = {}, o2 = Object.entries(this.t.routes).find(function(n2) {
      return e3 = new $(n2[0], n2[1], r2.t).matchesUrl(t5);
    }) || [void 0, void 0];
    return n({ name: o2[0] }, e3, { route: o2[1] });
  }, f2.h = function() {
    var t5 = this.p(), r2 = t5.pathname, n2 = t5.search;
    return (this.t.absolute ? t5.host + r2 : r2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n2;
  }, f2.current = function(t5, r2) {
    var e3 = this.v(), o2 = e3.name, i3 = e3.params, u3 = e3.query, f3 = e3.route;
    if (!t5)
      return o2;
    var a2 = new RegExp("^" + t5.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o2);
    if ([null, void 0].includes(r2) || !a2)
      return a2;
    var c2 = new $(o2, f3, this.t);
    r2 = this.l(r2, c2);
    var l2 = n({}, i3, u3);
    return !(!Object.values(r2).every(function(t6) {
      return !t6;
    }) || Object.values(l2).some(function(t6) {
      return void 0 !== t6;
    })) || Object.entries(r2).every(function(t6) {
      return l2[t6[0]] == t6[1];
    });
  }, f2.p = function() {
    var t5, r2, n2, e3, o2, i3, u3 = "undefined" != typeof window ? window.location : {}, f3 = u3.host, a2 = u3.pathname, c2 = u3.search;
    return { host: null != (t5 = null == (r2 = this.t.location) ? void 0 : r2.host) ? t5 : void 0 === f3 ? "" : f3, pathname: null != (n2 = null == (e3 = this.t.location) ? void 0 : e3.pathname) ? n2 : void 0 === a2 ? "" : a2, search: null != (o2 = null == (i3 = this.t.location) ? void 0 : i3.search) ? o2 : void 0 === c2 ? "" : c2 };
  }, f2.has = function(t5) {
    return Object.keys(this.t.routes).includes(t5);
  }, f2.l = function(t5, r2) {
    var e3 = this;
    void 0 === t5 && (t5 = {}), void 0 === r2 && (r2 = this.i), t5 = ["string", "number"].includes(typeof t5) ? [t5] : t5;
    var o2 = r2.parameterSegments.filter(function(t6) {
      return !e3.t.defaults[t6.name];
    });
    if (Array.isArray(t5))
      t5 = t5.reduce(function(t6, r3, e4) {
        var i4, u3;
        return n({}, t6, o2[e4] ? ((i4 = {})[o2[e4].name] = r3, i4) : "object" == typeof r3 ? r3 : ((u3 = {})[r3] = "", u3));
      }, {});
    else if (1 === o2.length && !t5[o2[0].name] && (t5.hasOwnProperty(Object.values(r2.bindings)[0]) || t5.hasOwnProperty("id"))) {
      var i3;
      (i3 = {})[o2[0].name] = t5, t5 = i3;
    }
    return n({}, this.m(r2), this.g(t5, r2));
  }, f2.m = function(t5) {
    var r2 = this;
    return t5.parameterSegments.filter(function(t6) {
      return r2.t.defaults[t6.name];
    }).reduce(function(t6, e3, o2) {
      var i3, u3 = e3.name;
      return n({}, t6, ((i3 = {})[u3] = r2.t.defaults[u3], i3));
    }, {});
  }, f2.g = function(t5, r2) {
    var e3 = r2.bindings, o2 = r2.parameterSegments;
    return Object.entries(t5).reduce(function(t6, r3) {
      var i3, u3, f3 = r3[0], a2 = r3[1];
      if (!a2 || "object" != typeof a2 || Array.isArray(a2) || !o2.some(function(t7) {
        return t7.name === f3;
      }))
        return n({}, t6, ((u3 = {})[f3] = a2, u3));
      if (!a2.hasOwnProperty(e3[f3])) {
        if (!a2.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + f3 + "' parameter is missing route model binding key '" + e3[f3] + "'.");
        e3[f3] = "id";
      }
      return n({}, t6, ((i3 = {})[f3] = a2[e3[f3]], i3));
    }, {});
  }, f2.valueOf = function() {
    return this.toString();
  }, f2.check = function(t5) {
    return this.has(t5);
  }, r(u2, [{ key: "params", get: function() {
    var t5 = this.v();
    return n({}, t5.params, t5.query);
  } }]), u2;
}(/* @__PURE__ */ f(String)), I = { install: function(t4, r2) {
  var n2 = function(t5, n3, e2, o2) {
    return void 0 === o2 && (o2 = r2), function(t6, r3, n4, e3) {
      var o3 = new A(t6, r3, n4, e3);
      return t6 ? o3.toString() : o3;
    }(t5, n3, e2, o2);
  };
  t4.mixin({ methods: { route: n2 } }), parseInt(t4.version) > 2 && t4.provide("route", n2);
} };
const appName = "Laravel";
default_1(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, Object.assign({ "./Pages/API/Index.vue": () => Promise.resolve().then(() => Index), "./Pages/API/Partials/ApiTokenManager.vue": () => Promise.resolve().then(() => ApiTokenManager), "./Pages/Auth/ConfirmPassword.vue": () => Promise.resolve().then(() => ConfirmPassword), "./Pages/Auth/ForgotPassword.vue": () => Promise.resolve().then(() => ForgotPassword), "./Pages/Auth/Login.vue": () => Promise.resolve().then(() => Login), "./Pages/Auth/Register.vue": () => Promise.resolve().then(() => Register), "./Pages/Auth/ResetPassword.vue": () => Promise.resolve().then(() => ResetPassword), "./Pages/Auth/TwoFactorChallenge.vue": () => Promise.resolve().then(() => TwoFactorChallenge), "./Pages/Auth/VerifyEmail.vue": () => Promise.resolve().then(() => VerifyEmail), "./Pages/Catalogos/CatalogosIndex.vue": () => Promise.resolve().then(() => CatalogosIndex), "./Pages/Catalogos/Partials/CardGenerica.vue": () => Promise.resolve().then(() => CardGenerica), "./Pages/Catalogos/Partials/FormModal.vue": () => Promise.resolve().then(() => FormModal), "./Pages/Catalogos/Partials/FormSubCatalogoModal.vue": () => Promise.resolve().then(() => FormSubCatalogoModal), "./Pages/Catalogos/Partials/ListObjModal.vue": () => Promise.resolve().then(() => ListObjModal), "./Pages/Catalogos/Partials/SubcatalogoModal.vue": () => Promise.resolve().then(() => SubcatalogoModal), "./Pages/Dashboard.vue": () => Promise.resolve().then(() => Dashboard), "./Pages/Finanzas/Partials/CardCalendar/CalendarModal.vue": () => Promise.resolve().then(() => CalendarModal), "./Pages/Finanzas/Partials/CardCalendar/VentasCalendar.vue": () => Promise.resolve().then(() => VentasCalendar$1), "./Pages/Finanzas/Partials/CardDepositos/Depositos.vue": () => Promise.resolve().then(() => Depositos), "./Pages/Finanzas/Partials/CardDepositos/DepositosModal.vue": () => Promise.resolve().then(() => DepositosModal), "./Pages/Finanzas/Partials/CardDepositos/FacturasDepositoModal.vue": () => Promise.resolve().then(() => FacturasDepositoModal), "./Pages/Finanzas/Partials/CardDepositos/FormDepositoModal.vue": () => Promise.resolve().then(() => FormDepositoModal), "./Pages/Finanzas/Partials/CardDepositos/ItemDepositoDetails.vue": () => Promise.resolve().then(() => ItemDepositoDetails), "./Pages/Finanzas/Partials/CardDepositos/ItemFacturaDeposito.vue": () => Promise.resolve().then(() => ItemFacturaDeposito), "./Pages/Finanzas/Partials/CardDepositos/ItemIngresoC.vue": () => Promise.resolve().then(() => ItemIngresoC), "./Pages/Finanzas/Partials/CardFacturas/Facturas.vue": () => Promise.resolve().then(() => Facturas), "./Pages/Finanzas/Partials/CardFacturas/FacturasModal.vue": () => Promise.resolve().then(() => FacturasModal), "./Pages/Finanzas/Partials/CardFacturas/FormFacturaModal.vue": () => Promise.resolve().then(() => FormFacturaModal), "./Pages/Finanzas/Partials/CardFacturas/ItemFacturaDetails.vue": () => Promise.resolve().then(() => ItemFacturaDetails), "./Pages/Finanzas/Partials/CardFacturas/ItemOcFactura.vue": () => Promise.resolve().then(() => ItemOcFactura), "./Pages/Finanzas/Partials/CardFacturas/OcsFacturaModal.vue": () => Promise.resolve().then(() => OcsFacturaModal), "./Pages/Finanzas/Partials/CardVenta/FormOcModal.vue": () => Promise.resolve().then(() => FormOcModal), "./Pages/Finanzas/Partials/CardVenta/FormVentaModal.vue": () => Promise.resolve().then(() => FormVentaModal), "./Pages/Finanzas/Partials/CardVenta/ItemOc.vue": () => Promise.resolve().then(() => ItemOc), "./Pages/Finanzas/Partials/CardVenta/ItemVentaDatials.vue": () => Promise.resolve().then(() => ItemVentaDatials), "./Pages/Finanzas/Partials/CardVenta/OcsModal.vue": () => Promise.resolve().then(() => OcsModal), "./Pages/Finanzas/Partials/CardVenta/Ventas.vue": () => Promise.resolve().then(() => Ventas), "./Pages/Finanzas/Partials/CardVenta/VentasModal.vue": () => Promise.resolve().then(() => VentasModal), "./Pages/Finanzas/Partials/ItemCliente.vue": () => Promise.resolve().then(() => ItemCliente), "./Pages/Finanzas/VentasIndex.vue": () => Promise.resolve().then(() => VentasIndex$1), "./Pages/Presupuestos/Components/GraficoMovimientos.vue": () => Promise.resolve().then(() => GraficoMovimientos$1), "./Pages/Presupuestos/Components/ModalNewCecoConcepto.vue": () => Promise.resolve().then(() => ModalNewCecoConcepto), "./Pages/Presupuestos/Components/ModalNewProducto.vue": () => Promise.resolve().then(() => ModalNewProducto), "./Pages/Presupuestos/Components/ModalSalidaMovimiento.vue": () => Promise.resolve().then(() => ModalSalidaMovimiento), "./Pages/Presupuestos/Components/ModalWatchProducts.vue": () => Promise.resolve().then(() => ModalWatchProducts), "./Pages/Presupuestos/Components/SelectCECOConcepto.vue": () => Promise.resolve().then(() => SelectCECOConcepto), "./Pages/Presupuestos/Components/TablaCecoConcepto.vue": () => Promise.resolve().then(() => TablaCecoConcepto$1), "./Pages/Presupuestos/Graph.vue": () => Promise.resolve().then(() => Graph$1), "./Pages/Presupuestos/GraphPrueba.vue": () => Promise.resolve().then(() => GraphPrueba$1), "./Pages/Presupuestos/PresupuestosIndex.vue": () => Promise.resolve().then(() => PresupuestosIndex), "./Pages/Presupuestos/TablaPresupuestosIndex.vue": () => Promise.resolve().then(() => TablaPresupuestosIndex), "./Pages/PrivacyPolicy.vue": () => Promise.resolve().then(() => PrivacyPolicy), "./Pages/Profile/Partials/DeleteUserForm.vue": () => Promise.resolve().then(() => DeleteUserForm), "./Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue": () => Promise.resolve().then(() => LogoutOtherBrowserSessionsForm), "./Pages/Profile/Partials/TwoFactorAuthenticationForm.vue": () => Promise.resolve().then(() => TwoFactorAuthenticationForm), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => Promise.resolve().then(() => UpdatePasswordForm), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => Promise.resolve().then(() => UpdateProfileInformationForm), "./Pages/Profile/Show.vue": () => Promise.resolve().then(() => Show), "./Pages/TermsOfService.vue": () => Promise.resolve().then(() => TermsOfService), "./Pages/Welcome.vue": () => Promise.resolve().then(() => Welcome$1) })),
    setup({ app, props, plugin }) {
      return createSSRApp({ render: () => h$1(app, props) }).use(plugin).use(I, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      });
    }
  })
);
const _sfc_main$1M = {
  __name: "ActionMessage",
  __ssrInlineRender: true,
  props: {
    on: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div style="${ssrRenderStyle(__props.on ? null : { display: "none" })}" class="text-sm text-gray-600">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1M = _sfc_main$1M.setup;
_sfc_main$1M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ActionMessage.vue");
  return _sfc_setup$1M ? _sfc_setup$1M(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1L = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:col-span-1 flex justify-between" }, _attrs))}><div class="px-4 sm:px-0"><h3 class="text-lg font-medium text-gray-900">`);
  ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
  _push(`</h3><p class="mt-1 text-sm text-gray-600">`);
  ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
  _push(`</p></div><div class="px-4 sm:px-0">`);
  ssrRenderSlot(_ctx.$slots, "aside", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$1L = _sfc_main$1L.setup;
_sfc_main$1L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/SectionTitle.vue");
  return _sfc_setup$1L ? _sfc_setup$1L(props, ctx) : void 0;
};
const JetSectionTitle = /* @__PURE__ */ _export_sfc(_sfc_main$1L, [["ssrRender", _sfc_ssrRender$9]]);
const _sfc_main$1K = {
  __name: "ActionSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:grid md:grid-cols-3 md:gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(JetSectionTitle, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "title")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "description", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "description")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="mt-5 md:mt-0 md:col-span-2"><div class="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1K = _sfc_main$1K.setup;
_sfc_main$1K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ActionSection.vue");
  return _sfc_setup$1K ? _sfc_setup$1K(props, ctx) : void 0;
};
const _sfc_main$1J = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1J = _sfc_main$1J.setup;
_sfc_main$1J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Button.vue");
  return _sfc_setup$1J ? _sfc_setup$1J(props, ctx) : void 0;
};
const _sfc_main$1I = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    watch(() => props.show, () => {
      if (props.show) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = null;
      }
    });
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e2) => {
      if (e2.key === "Escape" && props.show) {
        close();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = null;
    });
    const maxWidthClass = computed(() => {
      return {
        "sm": "sm:max-w-sm",
        "md": "sm:max-w-md",
        "lg": "sm:max-w-lg",
        "xl": "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "6xl": "sm:max-w-6xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 z-50 px-4 py-6 overflow-y-auto sm:px-0" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transition-all transform"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([unref(maxWidthClass), "mb-6 overflow-hidden transition-all transform bg-gray-700 rounded-lg shadow-xl sm:w-full sm:mx-auto"])}">`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1I = _sfc_main$1I.setup;
_sfc_main$1I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Modal.vue");
  return _sfc_setup$1I ? _sfc_setup$1I(props, ctx) : void 0;
};
const _sfc_main$1H = {
  __name: "ConfirmationModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1I, mergeProps({
        show: __props.show,
        "max-width": __props.maxWidth,
        closeable: __props.closeable,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"${_scopeId}><div class="sm:flex sm:items-start"${_scopeId}><div class="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"${_scopeId}><svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg></div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"${_scopeId}><h3 class="text-lg"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            _push2(`</h3><div class="mt-2"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div></div></div><div class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-right"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, [
                createVNode("div", { class: "sm:flex sm:items-start" }, [
                  createVNode("div", { class: "mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" }, [
                    (openBlock(), createBlock("svg", {
                      class: "h-6 w-6 text-red-600",
                      stroke: "currentColor",
                      fill: "none",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, [
                    createVNode("h3", { class: "text-lg" }, [
                      renderSlot(_ctx.$slots, "title")
                    ]),
                    createVNode("div", { class: "mt-2" }, [
                      renderSlot(_ctx.$slots, "content")
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "flex flex-row justify-end px-6 py-4 bg-gray-100 text-right" }, [
                renderSlot(_ctx.$slots, "footer")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1H = _sfc_main$1H.setup;
_sfc_main$1H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ConfirmationModal.vue");
  return _sfc_setup$1H ? _sfc_setup$1H(props, ctx) : void 0;
};
const _sfc_main$1G = {
  __name: "DangerButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1G = _sfc_main$1G.setup;
_sfc_main$1G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/DangerButton.vue");
  return _sfc_setup$1G ? _sfc_setup$1G(props, ctx) : void 0;
};
const _sfc_main$1F = {
  __name: "DialogModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1I, mergeProps({
        show: __props.show,
        "max-width": __props.maxWidth,
        closeable: __props.closeable,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-6 py-4"${_scopeId}><div class="text-lg"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div><div class="flex flex-row justify-end px-6 py-4 text-right bg-gray-100"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-6 py-4" }, [
                createVNode("div", { class: "text-lg" }, [
                  renderSlot(_ctx.$slots, "title")
                ]),
                createVNode("div", { class: "mt-4" }, [
                  renderSlot(_ctx.$slots, "content")
                ])
              ]),
              createVNode("div", { class: "flex flex-row justify-end px-6 py-4 text-right bg-gray-100" }, [
                renderSlot(_ctx.$slots, "footer")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1F = _sfc_main$1F.setup;
_sfc_main$1F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/DialogModal.vue");
  return _sfc_setup$1F ? _sfc_setup$1F(props, ctx) : void 0;
};
const _sfc_main$1E = {
  __name: "FormSection",
  __ssrInlineRender: true,
  emits: ["submitted"],
  setup(__props) {
    const hasActions = computed(() => !!useSlots().actions);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "md:grid md:grid-cols-3 md:gap-6" }, _attrs))}>`);
      _push(ssrRenderComponent(JetSectionTitle, null, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "title")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "description", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "description")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<div class="mt-5 md:mt-0 md:col-span-2"><form><div class="${ssrRenderClass([unref(hasActions) ? "sm:rounded-tl-md sm:rounded-tr-md" : "sm:rounded-md", "px-4 py-5 bg-white sm:p-6 shadow"])}"><div class="grid grid-cols-6 gap-6">`);
      ssrRenderSlot(_ctx.$slots, "form", {}, null, _push, _parent);
      _push(`</div></div>`);
      if (unref(hasActions)) {
        _push(`<div class="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">`);
        ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div>`);
    };
  }
};
const _sfc_setup$1E = _sfc_main$1E.setup;
_sfc_main$1E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/FormSection.vue");
  return _sfc_setup$1E ? _sfc_setup$1E(props, ctx) : void 0;
};
const _sfc_main$1D = {
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const input2 = ref(null);
    onMounted(() => {
      if (input2.value.hasAttribute("autofocus")) {
        input2.value.focus();
      }
    });
    expose({ focus: () => input2.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        ref_key: "input",
        ref: input2,
        class: "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
        value: __props.modelValue
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$1D = _sfc_main$1D.setup;
_sfc_main$1D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Input.vue");
  return _sfc_setup$1D ? _sfc_setup$1D(props, ctx) : void 0;
};
const _sfc_main$1C = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        checked: Array.isArray(unref(proxyChecked)) ? ssrLooseContain(unref(proxyChecked), __props.value) : unref(proxyChecked),
        type: "checkbox",
        value: __props.value,
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(proxyChecked)))))}>`);
    };
  }
};
const _sfc_setup$1C = _sfc_main$1C.setup;
_sfc_main$1C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Checkbox.vue");
  return _sfc_setup$1C ? _sfc_setup$1C(props, ctx) : void 0;
};
const _sfc_main$1B = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: __props.message ? null : { display: "none" }
      }, _attrs))}><p class="text-sm text-red-600">${ssrInterpolate(__props.message)}</p></div>`);
    };
  }
};
const _sfc_setup$1B = _sfc_main$1B.setup;
_sfc_main$1B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/InputError.vue");
  return _sfc_setup$1B ? _sfc_setup$1B(props, ctx) : void 0;
};
const _sfc_main$1A = {
  __name: "Label",
  __ssrInlineRender: true,
  props: {
    value: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block text-sm font-medium text-gray-400" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$1A = _sfc_main$1A.setup;
_sfc_main$1A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Label.vue");
  return _sfc_setup$1A ? _sfc_setup$1A(props, ctx) : void 0;
};
const _sfc_main$1z = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1z = _sfc_main$1z.setup;
_sfc_main$1z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/SecondaryButton.vue");
  return _sfc_setup$1z ? _sfc_setup$1z(props, ctx) : void 0;
};
const _sfc_main$1y = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "hidden sm:block" }, _attrs))}><div class="py-8"><div class="border-t border-gray-200"></div></div></div>`);
}
const _sfc_setup$1y = _sfc_main$1y.setup;
_sfc_main$1y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/SectionBorder.vue");
  return _sfc_setup$1y ? _sfc_setup$1y(props, ctx) : void 0;
};
const JetSectionBorder = /* @__PURE__ */ _export_sfc(_sfc_main$1y, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$1x = {
  __name: "ApiTokenManager",
  __ssrInlineRender: true,
  props: {
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
  },
  setup(__props) {
    const props = __props;
    const createApiTokenForm = useForm({
      name: "",
      permissions: props.defaultPermissions
    });
    const updateApiTokenForm = useForm({
      permissions: []
    });
    const deleteApiTokenForm = useForm();
    const displayingToken = ref(false);
    const managingPermissionsFor = ref(null);
    const apiTokenBeingDeleted = ref(null);
    const createApiToken = () => {
      createApiTokenForm.post(route("api-tokens.store"), {
        preserveScroll: true,
        onSuccess: () => {
          displayingToken.value = true;
          createApiTokenForm.reset();
        }
      });
    };
    const manageApiTokenPermissions = (token) => {
      updateApiTokenForm.permissions = token.abilities;
      managingPermissionsFor.value = token;
    };
    const updateApiToken = () => {
      updateApiTokenForm.put(route("api-tokens.update", managingPermissionsFor.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => managingPermissionsFor.value = null
      });
    };
    const confirmApiTokenDeletion = (token) => {
      apiTokenBeingDeleted.value = token;
    };
    const deleteApiToken = () => {
      deleteApiTokenForm.delete(route("api-tokens.destroy", apiTokenBeingDeleted.value), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => apiTokenBeingDeleted.value = null
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_sfc_main$1E, { onSubmitted: createApiToken }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create API Token `);
          } else {
            return [
              createTextVNode(" Create API Token ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` API tokens allow third-party services to authenticate with our application on your behalf. `);
          } else {
            return [
              createTextVNode(" API tokens allow third-party services to authenticate with our application on your behalf. ")
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "name",
              modelValue: unref(createApiTokenForm).name,
              "onUpdate:modelValue": ($event) => unref(createApiTokenForm).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(createApiTokenForm).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.availablePermissions.length > 0) {
              _push2(`<div class="col-span-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, {
                for: "permissions",
                value: "Permissions"
              }, null, _parent2, _scopeId));
              _push2(`<div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.availablePermissions, (permission) => {
                _push2(`<div${_scopeId}><label class="flex items-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1C, {
                  checked: unref(createApiTokenForm).permissions,
                  "onUpdate:checked": ($event) => unref(createApiTokenForm).permissions = $event,
                  value: permission
                }, null, _parent2, _scopeId));
                _push2(`<span class="ml-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(permission)}</span></label></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$1A, {
                  for: "name",
                  value: "Name"
                }),
                createVNode(_sfc_main$1D, {
                  id: "name",
                  modelValue: unref(createApiTokenForm).name,
                  "onUpdate:modelValue": ($event) => unref(createApiTokenForm).name = $event,
                  type: "text",
                  class: "mt-1 block w-full",
                  autofocus: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1B, {
                  message: unref(createApiTokenForm).errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              __props.availablePermissions.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "col-span-6"
              }, [
                createVNode(_sfc_main$1A, {
                  for: "permissions",
                  value: "Permissions"
                }),
                createVNode("div", { class: "mt-2 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.availablePermissions, (permission) => {
                    return openBlock(), createBlock("div", { key: permission }, [
                      createVNode("label", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1C, {
                          checked: unref(createApiTokenForm).permissions,
                          "onUpdate:checked": ($event) => unref(createApiTokenForm).permissions = $event,
                          value: permission
                        }, null, 8, ["checked", "onUpdate:checked", "value"]),
                        createVNode("span", { class: "ml-2 text-sm text-gray-600" }, toDisplayString(permission), 1)
                      ])
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1M, {
              on: unref(createApiTokenForm).recentlySuccessful,
              class: "mr-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Created. `);
                } else {
                  return [
                    createTextVNode(" Created. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: { "opacity-25": unref(createApiTokenForm).processing },
              disabled: unref(createApiTokenForm).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Create `);
                } else {
                  return [
                    createTextVNode(" Create ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1M, {
                on: unref(createApiTokenForm).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Created. ")
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode(_sfc_main$1J, {
                class: { "opacity-25": unref(createApiTokenForm).processing },
                disabled: unref(createApiTokenForm).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Create ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.tokens.length > 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(JetSectionBorder, null, null, _parent));
        _push(`<div class="mt-10 sm:mt-0">`);
        _push(ssrRenderComponent(_sfc_main$1K, null, {
          title: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Manage API Tokens `);
            } else {
              return [
                createTextVNode(" Manage API Tokens ")
              ];
            }
          }),
          description: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` You may delete any of your existing tokens if they are no longer needed. `);
            } else {
              return [
                createTextVNode(" You may delete any of your existing tokens if they are no longer needed. ")
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tokens, (token) => {
                _push2(`<div class="flex items-center justify-between"${_scopeId}><div${_scopeId}>${ssrInterpolate(token.name)}</div><div class="flex items-center"${_scopeId}>`);
                if (token.last_used_ago) {
                  _push2(`<div class="text-sm text-gray-400"${_scopeId}> Last used ${ssrInterpolate(token.last_used_ago)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.availablePermissions.length > 0) {
                  _push2(`<button class="cursor-pointer ml-6 text-sm text-gray-400 underline"${_scopeId}> Permissions </button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button class="cursor-pointer ml-6 text-sm text-red-500"${_scopeId}> Delete </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.tokens, (token) => {
                    return openBlock(), createBlock("div", {
                      key: token.id,
                      class: "flex items-center justify-between"
                    }, [
                      createVNode("div", null, toDisplayString(token.name), 1),
                      createVNode("div", { class: "flex items-center" }, [
                        token.last_used_ago ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-gray-400"
                        }, " Last used " + toDisplayString(token.last_used_ago), 1)) : createCommentVNode("", true),
                        __props.availablePermissions.length > 0 ? (openBlock(), createBlock("button", {
                          key: 1,
                          class: "cursor-pointer ml-6 text-sm text-gray-400 underline",
                          onClick: ($event) => manageApiTokenPermissions(token)
                        }, " Permissions ", 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode("button", {
                          class: "cursor-pointer ml-6 text-sm text-red-500",
                          onClick: ($event) => confirmApiTokenDeletion(token)
                        }, " Delete ", 8, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1F, {
        show: displayingToken.value,
        onClose: ($event) => displayingToken.value = false
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` API Token `);
          } else {
            return [
              createTextVNode(" API Token ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}> Please copy your new API token. For your security, it won&#39;t be shown again. </div>`);
            if (_ctx.$page.props.jetstream.flash.token) {
              _push2(`<div class="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.$page.props.jetstream.flash.token)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", null, " Please copy your new API token. For your security, it won't be shown again. "),
              _ctx.$page.props.jetstream.flash.token ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500"
              }, toDisplayString(_ctx.$page.props.jetstream.flash.token), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => displayingToken.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Close `);
                } else {
                  return [
                    createTextVNode(" Close ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1z, {
                onClick: ($event) => displayingToken.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Close ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1F, {
        show: managingPermissionsFor.value != null,
        onClose: ($event) => managingPermissionsFor.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` API Token Permissions `);
          } else {
            return [
              createTextVNode(" API Token Permissions ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.availablePermissions, (permission) => {
              _push2(`<div${_scopeId}><label class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1C, {
                checked: unref(updateApiTokenForm).permissions,
                "onUpdate:checked": ($event) => unref(updateApiTokenForm).permissions = $event,
                value: permission
              }, null, _parent2, _scopeId));
              _push2(`<span class="ml-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(permission)}</span></label></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.availablePermissions, (permission) => {
                  return openBlock(), createBlock("div", { key: permission }, [
                    createVNode("label", { class: "flex items-center" }, [
                      createVNode(_sfc_main$1C, {
                        checked: unref(updateApiTokenForm).permissions,
                        "onUpdate:checked": ($event) => unref(updateApiTokenForm).permissions = $event,
                        value: permission
                      }, null, 8, ["checked", "onUpdate:checked", "value"]),
                      createVNode("span", { class: "ml-2 text-sm text-gray-600" }, toDisplayString(permission), 1)
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => managingPermissionsFor.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: ["ml-3", { "opacity-25": unref(updateApiTokenForm).processing }],
              disabled: unref(updateApiTokenForm).processing,
              onClick: updateApiToken
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save `);
                } else {
                  return [
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1z, {
                onClick: ($event) => managingPermissionsFor.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$1J, {
                class: ["ml-3", { "opacity-25": unref(updateApiTokenForm).processing }],
                disabled: unref(updateApiTokenForm).processing,
                onClick: updateApiToken
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1H, {
        show: apiTokenBeingDeleted.value != null,
        onClose: ($event) => apiTokenBeingDeleted.value = null
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Delete API Token `);
          } else {
            return [
              createTextVNode(" Delete API Token ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Are you sure you would like to delete this API token? `);
          } else {
            return [
              createTextVNode(" Are you sure you would like to delete this API token? ")
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => apiTokenBeingDeleted.value = null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1G, {
              class: ["ml-3", { "opacity-25": unref(deleteApiTokenForm).processing }],
              disabled: unref(deleteApiTokenForm).processing,
              onClick: deleteApiToken
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete `);
                } else {
                  return [
                    createTextVNode(" Delete ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1z, {
                onClick: ($event) => apiTokenBeingDeleted.value = null
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_sfc_main$1G, {
                class: ["ml-3", { "opacity-25": unref(deleteApiTokenForm).processing }],
                disabled: unref(deleteApiTokenForm).processing,
                onClick: deleteApiToken
              }, {
                default: withCtx(() => [
                  createTextVNode(" Delete ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1x = _sfc_main$1x.setup;
_sfc_main$1x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Partials/ApiTokenManager.vue");
  return _sfc_setup$1x ? _sfc_setup$1x(props, ctx) : void 0;
};
const ApiTokenManager = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1x
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/build/assets/logo.2251d474.png";
const _sfc_main$1w = defineComponent({
  data() {
    return {
      logo
    };
  }
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<img${ssrRenderAttrs(mergeProps({
    class: "h-10",
    src: _ctx.logo,
    alt: "logo"
  }, _attrs))}>`);
}
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ApplicationMark.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const JetApplicationMark = /* @__PURE__ */ _export_sfc(_sfc_main$1w, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$1v = {
  __name: "Banner",
  __ssrInlineRender: true,
  setup(__props) {
    const show = ref(true);
    const style = computed(() => {
      var _a;
      return ((_a = usePage().props.value.jetstream.flash) == null ? void 0 : _a.bannerStyle) || "success";
    });
    const message = computed(() => {
      var _a;
      return ((_a = usePage().props.value.jetstream.flash) == null ? void 0 : _a.banner) || "";
    });
    watch(message, async () => {
      show.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (show.value && unref(message)) {
        _push(`<div class="${ssrRenderClass({ "bg-indigo-500": unref(style) == "success", "bg-red-700": unref(style) == "danger" })}"><div class="max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8"><div class="flex items-center justify-between flex-wrap"><div class="w-0 flex-1 flex items-center min-w-0"><span class="${ssrRenderClass([{ "bg-indigo-600": unref(style) == "success", "bg-red-600": unref(style) == "danger" }, "flex p-2 rounded-lg"])}">`);
        if (unref(style) == "success") {
          _push(`<svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(style) == "danger") {
          _push(`<svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><p class="ml-3 font-medium text-sm text-white truncate">${ssrInterpolate(unref(message))}</p></div><div class="shrink-0 sm:ml-3"><button type="button" class="${ssrRenderClass([{ "hover:bg-indigo-600 focus:bg-indigo-600": unref(style) == "success", "hover:bg-red-600 focus:bg-red-600": unref(style) == "danger" }, "-mr-1 flex p-2 rounded-md focus:outline-none sm:-mr-2 transition"])}" aria-label="Dismiss"><svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Banner.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const _sfc_main$1u = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: Array,
      default: () => ["py-1", "bg-white"]
    }
  },
  setup(__props) {
    const props = __props;
    let open = ref(false);
    const closeOnEscape = (e2) => {
      if (open.value && e2.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        "48": "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "origin-top-left left-0";
      }
      if (props.align === "right") {
        return "origin-top-right right-0";
      }
      return "origin-top";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        unref(open) ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[unref(widthClass), unref(alignmentClasses)], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/Dropdown.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const _sfc_main$1t = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: String,
    as: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.as == "button") {
        _push(`<button type="submit" class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</button>`);
      } else if (__props.as == "a") {
        _push(`<a${ssrRenderAttr("href", __props.href)} class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</a>`);
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: "block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/DropdownLink.vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const _sfc_main$1s = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    href: String,
    active: Boolean
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      return props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-300 focus:outline-none focus:border-indigo-700 transition" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: unref(classes)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/NavLink.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const _sfc_main$1r = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    active: Boolean,
    href: String,
    as: String
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => {
      return props.active ? "block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition" : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.as == "button") {
        _push(`<button class="${ssrRenderClass([unref(classes), "w-full text-left"])}">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</button>`);
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: __props.href,
          class: unref(classes)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ResponsiveNavLink.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const _sfc_main$1q = {
  __name: "AppLayout",
  __ssrInlineRender: true,
  props: {
    title: String
  },
  setup(__props) {
    const showingNavigationDropdown = ref(false);
    const switchToTeam = (team) => {
      Inertia$1.put(route("current-team.update"), {
        team_id: team.id
      }, {
        preserveState: false
      });
    };
    const logout = () => {
      Inertia$1.post(route("logout"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Head), { title: __props.title }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1v, null, null, _parent));
      _push(`<div class="min-h-screen"><nav class="bg-gray-900 border-b border-gray-100"><div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="flex items-center shrink-0">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(JetApplicationMark, { class: "block w-auto h-9" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(JetApplicationMark, { class: "block w-auto h-9" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$1s, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Inicio `);
          } else {
            return [
              createTextVNode(" Inicio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$1s, {
        href: _ctx.route("clientes.index"),
        active: _ctx.route().current("clientes.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Presupuestos `);
          } else {
            return [
              createTextVNode(" Presupuestos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$1s, {
        href: _ctx.route("ventas.index"),
        active: _ctx.route().current("ventas.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Finanzas `);
          } else {
            return [
              createTextVNode(" Finanzas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$1s, {
        href: _ctx.route("catalogos.index"),
        active: _ctx.route().current("catalogos.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Catalogos `);
          } else {
            return [
              createTextVNode(" Catalogos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:flex sm:items-center sm:ml-6"><div class="relative ml-3">`);
      if (_ctx.$page.props.jetstream.hasTeamFeatures) {
        _push(ssrRenderComponent(_sfc_main$1u, {
          align: "right",
          width: "60"
        }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50"${_scopeId}>${ssrInterpolate(_ctx.$page.props.user.current_team.name)} <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
            } else {
              return [
                createVNode("span", { class: "inline-flex rounded-md" }, [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
                  }, [
                    createTextVNode(toDisplayString(_ctx.$page.props.user.current_team.name) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 -mr-0.5 h-4 w-4",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ])
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-60"${_scopeId}>`);
              if (_ctx.$page.props.jetstream.hasTeamFeatures) {
                _push2(`<!--[--><div class="block px-4 py-2 text-xs text-gray-400"${_scopeId}> Manage Team </div>`);
                _push2(ssrRenderComponent(_sfc_main$1t, {
                  href: _ctx.route("teams.show", _ctx.$page.props.user.current_team)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Team Settings `);
                    } else {
                      return [
                        createTextVNode(" Team Settings ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                if (_ctx.$page.props.jetstream.canCreateTeams) {
                  _push2(ssrRenderComponent(_sfc_main$1t, {
                    href: _ctx.route("teams.create")
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Create New Team `);
                      } else {
                        return [
                          createTextVNode(" Create New Team ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="border-t border-gray-100"${_scopeId}></div><div class="block px-4 py-2 text-xs text-gray-400"${_scopeId}> Switch Teams </div><!--[-->`);
                ssrRenderList(_ctx.$page.props.user.all_teams, (team) => {
                  _push2(`<form${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$1t, { as: "button" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center"${_scopeId2}>`);
                        if (team.id == _ctx.$page.props.user.current_team_id) {
                          _push3(`<svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId2}></path></svg>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div${_scopeId2}>${ssrInterpolate(team.name)}</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center" }, [
                            team.id == _ctx.$page.props.user.current_team_id ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "w-5 h-5 mr-2 text-green-400",
                              fill: "none",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, toDisplayString(team.name), 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</form>`);
                });
                _push2(`<!--]--><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "w-60" }, [
                  _ctx.$page.props.jetstream.hasTeamFeatures ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", { class: "block px-4 py-2 text-xs text-gray-400" }, " Manage Team "),
                    createVNode(_sfc_main$1t, {
                      href: _ctx.route("teams.show", _ctx.$page.props.user.current_team)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Team Settings ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    _ctx.$page.props.jetstream.canCreateTeams ? (openBlock(), createBlock(_sfc_main$1t, {
                      key: 0,
                      href: _ctx.route("teams.create")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Create New Team ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true),
                    createVNode("div", { class: "border-t border-gray-100" }),
                    createVNode("div", { class: "block px-4 py-2 text-xs text-gray-400" }, " Switch Teams "),
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.user.all_teams, (team) => {
                      return openBlock(), createBlock("form", {
                        key: team.id,
                        onSubmit: withModifiers(($event) => switchToTeam(team), ["prevent"])
                      }, [
                        createVNode(_sfc_main$1t, { as: "button" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              team.id == _ctx.$page.props.user.current_team_id ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "w-5 h-5 mr-2 text-green-400",
                                fill: "none",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                              ])) : createCommentVNode("", true),
                              createVNode("div", null, toDisplayString(team.name), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ], 40, ["onSubmit"]);
                    }), 128))
                  ], 64)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative ml-3">`);
      _push(ssrRenderComponent(_sfc_main$1u, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$page.props.jetstream.managesProfilePhotos) {
              _push2(`<button class="flex text-sm transition border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300"${_scopeId}><img class="object-cover w-8 h-8 rounded-full"${ssrRenderAttr("src", _ctx.$page.props.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.user.name)}${_scopeId}></button>`);
            } else {
              _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"${_scopeId}>${ssrInterpolate(_ctx.$page.props.user.name)} <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
            }
          } else {
            return [
              _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock("button", {
                key: 0,
                class: "flex text-sm transition border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300"
              }, [
                createVNode("img", {
                  class: "object-cover w-8 h-8 rounded-full",
                  src: _ctx.$page.props.user.profile_photo_url,
                  alt: _ctx.$page.props.user.name
                }, null, 8, ["src", "alt"])
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "inline-flex rounded-md"
              }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.user.name) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    class: "ml-2 -mr-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ]))
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="block px-4 py-2 text-xs text-gray-400"${_scopeId}> Manage Account </div>`);
            _push2(ssrRenderComponent(_sfc_main$1t, {
              href: _ctx.route("profile.show")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Profile `);
                } else {
                  return [
                    createTextVNode(" Profile ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (_ctx.$page.props.jetstream.hasApiFeatures) {
              _push2(ssrRenderComponent(_sfc_main$1t, {
                href: _ctx.route("api-tokens.index")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` API Tokens `);
                  } else {
                    return [
                      createTextVNode(" API Tokens ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="border-t border-gray-100"${_scopeId}></div><form${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1t, { as: "button" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Salir `);
                } else {
                  return [
                    createTextVNode(" Salir ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("div", { class: "block px-4 py-2 text-xs text-gray-400" }, " Manage Account "),
              createVNode(_sfc_main$1t, {
                href: _ctx.route("profile.show")
              }, {
                default: withCtx(() => [
                  createTextVNode(" Profile ")
                ]),
                _: 1
              }, 8, ["href"]),
              _ctx.$page.props.jetstream.hasApiFeatures ? (openBlock(), createBlock(_sfc_main$1t, {
                key: 0,
                href: _ctx.route("api-tokens.index")
              }, {
                default: withCtx(() => [
                  createTextVNode(" API Tokens ")
                ]),
                _: 1
              }, 8, ["href"])) : createCommentVNode("", true),
              createVNode("div", { class: "border-t border-gray-100" }),
              createVNode("form", {
                onSubmit: withModifiers(logout, ["prevent"])
              }, [
                createVNode(_sfc_main$1t, { as: "button" }, {
                  default: withCtx(() => [
                    createTextVNode(" Salir ")
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center -mr-2 sm:hidden"><button class="inline-flex items-center justify-center p-2 text-gray-400 transition rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"><svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({ "hidden": showingNavigationDropdown.value, "inline-flex": !showingNavigationDropdown.value })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({ "hidden": !showingNavigationDropdown.value, "inline-flex": showingNavigationDropdown.value })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{ "block": showingNavigationDropdown.value, "hidden": !showingNavigationDropdown.value }, "sm:hidden"])}"><div class="pt-2 pb-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1r, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Inicio `);
          } else {
            return [
              createTextVNode(" Inicio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1r, {
        href: _ctx.route("clientes.index"),
        active: _ctx.route().current("clientes.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Presupuestos `);
          } else {
            return [
              createTextVNode(" Presupuestos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1r, {
        href: _ctx.route("ventas.index"),
        active: _ctx.route().current("ventas.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Finanzas `);
          } else {
            return [
              createTextVNode(" Finanzas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1r, {
        href: _ctx.route("catalogos.index"),
        active: _ctx.route().current("catalogos.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Usuarios `);
          } else {
            return [
              createTextVNode(" Usuarios ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1r, {
        href: _ctx.route("catalogos.index"),
        active: _ctx.route().current("catalogos.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Catalogos `);
          } else {
            return [
              createTextVNode(" Catalogos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pt-4 pb-1 border-t border-gray-200"><div class="flex items-center px-4">`);
      if (_ctx.$page.props.jetstream.managesProfilePhotos) {
        _push(`<div class="mr-3 shrink-0"><img class="object-cover w-10 h-10 rounded-full"${ssrRenderAttr("src", _ctx.$page.props.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.user.name)}></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><div class="text-base font-medium text-gray-800">${ssrInterpolate(_ctx.$page.props.user.name)}</div><div class="text-sm font-medium text-gray-500">${ssrInterpolate(_ctx.$page.props.user.email)}</div></div></div><div class="mt-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1r, {
        href: _ctx.route("profile.show"),
        active: _ctx.route().current("profile.show")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Profile `);
          } else {
            return [
              createTextVNode(" Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$page.props.jetstream.hasApiFeatures) {
        _push(ssrRenderComponent(_sfc_main$1r, {
          href: _ctx.route("api-tokens.index"),
          active: _ctx.route().current("api-tokens.index")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` API Tokens `);
            } else {
              return [
                createTextVNode(" API Tokens ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<form method="POST">`);
      _push(ssrRenderComponent(_sfc_main$1r, { as: "button" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log Out `);
          } else {
            return [
              createTextVNode(" Log Out ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form>`);
      if (_ctx.$page.props.jetstream.hasTeamFeatures) {
        _push(`<!--[--><div class="border-t border-gray-200"></div><div class="block px-4 py-2 text-xs text-gray-400"> Manage Team </div>`);
        _push(ssrRenderComponent(_sfc_main$1r, {
          href: _ctx.route("teams.show", _ctx.$page.props.user.current_team),
          active: _ctx.route().current("teams.show")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Team Settings `);
            } else {
              return [
                createTextVNode(" Team Settings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (_ctx.$page.props.jetstream.canCreateTeams) {
          _push(ssrRenderComponent(_sfc_main$1r, {
            href: _ctx.route("teams.create"),
            active: _ctx.route().current("teams.create")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Create New Team `);
              } else {
                return [
                  createTextVNode(" Create New Team ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="border-t border-gray-200"></div><div class="block px-4 py-2 text-xs text-gray-400"> Switch Teams </div><!--[-->`);
        ssrRenderList(_ctx.$page.props.user.all_teams, (team) => {
          _push(`<form>`);
          _push(ssrRenderComponent(_sfc_main$1r, { as: "button" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center"${_scopeId}>`);
                if (team.id == _ctx.$page.props.user.current_team_id) {
                  _push2(`<svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div${_scopeId}>${ssrInterpolate(team.name)}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center" }, [
                    team.id == _ctx.$page.props.user.current_team_id ? (openBlock(), createBlock("svg", {
                      key: 0,
                      class: "w-5 h-5 mr-2 text-green-400",
                      fill: "none",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                    ])) : createCommentVNode("", true),
                    createVNode("div", null, toDisplayString(team.name), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</form>`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="shadow fondo_general"><div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const _sfc_main$1p = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "API Tokens" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> API Tokens </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " API Tokens ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1x, {
              tokens: __props.tokens,
              "available-permissions": __props.availablePermissions,
              "default-permissions": __props.defaultPermissions
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  createVNode(_sfc_main$1x, {
                    tokens: __props.tokens,
                    "available-permissions": __props.availablePermissions,
                    "default-permissions": __props.defaultPermissions
                  }, null, 8, ["tokens", "available-permissions", "default-permissions"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/API/Index.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1p
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1o = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 fondo_menu" }, _attrs))}><div>`);
  ssrRenderSlot(_ctx.$slots, "logo", {}, null, _push, _parent);
  _push(`</div><div class="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden card sm:rounded-lg">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/AuthenticationCard.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const JetAuthenticationCard = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$1n = {
  __name: "AuthenticationCardLogo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({ href: "/" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-16 h-16 logoinicio" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z" fill="#6875F5"${_scopeId}></path><path d="M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z" fill="#6875F5"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-16 h-16 logoinicio",
                viewBox: "0 0 48 48",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", {
                  d: "M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z",
                  fill: "#6875F5"
                }),
                createVNode("path", {
                  d: "M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z",
                  fill: "#6875F5"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/AuthenticationCardLogo.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const _sfc_main$1m = {
  __name: "ValidationErrors",
  __ssrInlineRender: true,
  setup(__props) {
    const errors = computed(() => usePage().props.value.errors);
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasErrors)) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="font-medium text-red-600"> Whoops! Something went wrong. </div><ul class="mt-3 list-disc list-inside text-sm text-red-600"><!--[-->`);
        ssrRenderList(unref(errors), (error, key) => {
          _push(`<li>${ssrInterpolate(error)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ValidationErrors.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const _sfc_main$1l = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      password: ""
    });
    const passwordInput = ref(null);
    const submit = () => {
      form.post(route("password.confirm"), {
        onFinish: () => {
          form.reset();
          passwordInput.value.focus();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Secure Area" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1n, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1n)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div>`);
            _push2(ssrRenderComponent(_sfc_main$1m, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "current-password",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirm `);
                } else {
                  return [
                    createTextVNode(" Confirm ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              createVNode(_sfc_main$1m, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1A, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex justify-end mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const ConfirmPassword = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1k = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1n, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1n)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1m, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Email Password Reset Link `);
                } else {
                  return [
                    createTextVNode(" Email Password Reset Link ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode(_sfc_main$1m, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1A, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Email Password Reset Link ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const ForgotPassword = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1j = {
  __name: "buttonLogin",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 ingresarLogin rounded-md font-semibold text-xs text-white uppercase mt-1 block w-full tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/buttonLogin.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const _sfc_main$1i = {
  __name: "inputLogin",
  __ssrInlineRender: true,
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const input2 = ref(null);
    onMounted(() => {
      if (input2.value.hasAttribute("autofocus")) {
        input2.value.focus();
      }
    });
    expose({ focus: () => input2.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        style: { "background": "transparent" },
        ref_key: "input",
        ref: input2,
        class: "block w-full mt-1 inputLogin",
        value: __props.modelValue
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/inputLogin.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const _sfc_main$1h = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.transform((data2) => ({
        ...data2,
        remember: form.remember ? "on" : ""
      })).post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, { class: "mb-4" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div${_scopeId}><h1 class="text-input"${_scopeId}>Ingresar</h1>`);
            _push2(ssrRenderComponent(_sfc_main$1i, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autofocus: "",
              placeholder: "Email"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1i, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "",
              required: "",
              autocomplete: "current-password",
              placeholder: "Contrase\xF1a"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1C, {
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event,
              name: "remember"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm labelLogin"${_scopeId}>Recordar</span></label></div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "underline text-sm text-gray-600 hover:text-gray-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1j, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ingresar `);
                } else {
                  return [
                    createTextVNode(" Ingresar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(_sfc_main$1m, { class: "mb-4" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode("h1", { class: "text-input" }, "Ingresar"),
                  createVNode(_sfc_main$1i, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: "",
                    placeholder: "Email"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1i, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "",
                    required: "",
                    autocomplete: "current-password",
                    placeholder: "Contrase\xF1a"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "block mt-4" }, [
                  createVNode("label", { class: "flex items-center" }, [
                    createVNode(_sfc_main$1C, {
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event,
                      name: "remember"
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ml-2 text-sm labelLogin" }, "Recordar")
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                  __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "underline text-sm text-gray-600 hover:text-gray-900"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot your password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(_sfc_main$1j, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Ingresar ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1g = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1n, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1n)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              required: "",
              autofocus: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password_confirmation",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (_ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature) {
              _push2(`<div class="mt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, { for: "terms" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$1C, {
                      id: "terms",
                      checked: unref(form).terms,
                      "onUpdate:checked": ($event) => unref(form).terms = $event,
                      name: "terms"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="ml-2"${_scopeId2}> I agree to the <a target="_blank"${ssrRenderAttr("href", _ctx.route("terms.show"))} class="underline text-sm text-gray-600 hover:text-gray-900"${_scopeId2}>Terms of Service</a> and <a target="_blank"${ssrRenderAttr("href", _ctx.route("policy.show"))} class="underline text-sm text-gray-600 hover:text-gray-900"${_scopeId2}>Privacy Policy</a></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1C, {
                          id: "terms",
                          checked: unref(form).terms,
                          "onUpdate:checked": ($event) => unref(form).terms = $event,
                          name: "terms"
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("div", { class: "ml-2" }, [
                          createTextVNode(" I agree to the "),
                          createVNode("a", {
                            target: "_blank",
                            href: _ctx.route("terms.show"),
                            class: "underline text-sm text-gray-600 hover:text-gray-900"
                          }, "Terms of Service", 8, ["href"]),
                          createTextVNode(" and "),
                          createVNode("a", {
                            target: "_blank",
                            href: _ctx.route("policy.show"),
                            class: "underline text-sm text-gray-600 hover:text-gray-900"
                          }, "Privacy Policy", 8, ["href"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "underline text-sm text-gray-600 hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already registered? `);
                } else {
                  return [
                    createTextVNode(" Already registered? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Register `);
                } else {
                  return [
                    createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(_sfc_main$1m, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1A, {
                    for: "name",
                    value: "Name"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1A, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1A, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1A, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _ctx.$page.props.jetstream.hasTermsAndPrivacyPolicyFeature ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-4"
                }, [
                  createVNode(_sfc_main$1A, { for: "terms" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_sfc_main$1C, {
                          id: "terms",
                          checked: unref(form).terms,
                          "onUpdate:checked": ($event) => unref(form).terms = $event,
                          name: "terms"
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode("div", { class: "ml-2" }, [
                          createTextVNode(" I agree to the "),
                          createVNode("a", {
                            target: "_blank",
                            href: _ctx.route("terms.show"),
                            class: "underline text-sm text-gray-600 hover:text-gray-900"
                          }, "Terms of Service", 8, ["href"]),
                          createTextVNode(" and "),
                          createVNode("a", {
                            target: "_blank",
                            href: _ctx.route("policy.show"),
                            class: "underline text-sm text-gray-600 hover:text-gray-900"
                          }, "Privacy Policy", 8, ["href"])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("login"),
                    class: "underline text-sm text-gray-600 hover:text-gray-900"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Already registered? ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_sfc_main$1J, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Register ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1f = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: String,
    token: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.update"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1n, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1n)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1m, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full",
              required: "",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password_confirmation",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              type: "password",
              class: "mt-1 block w-full",
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset Password `);
                } else {
                  return [
                    createTextVNode(" Reset Password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(_sfc_main$1m, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$1A, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    class: "mt-1 block w-full",
                    required: "",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1A, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$1A, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    class: "mt-1 block w-full",
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode(_sfc_main$1J, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Reset Password ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const ResetPassword = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1e = {
  __name: "TwoFactorChallenge",
  __ssrInlineRender: true,
  setup(__props) {
    const recovery = ref(false);
    const form = useForm({
      code: "",
      recovery_code: ""
    });
    const recoveryCodeInput = ref(null);
    const codeInput = ref(null);
    const toggleRecovery = async () => {
      recovery.value ^= true;
      await nextTick();
      if (recovery.value) {
        recoveryCodeInput.value.focus();
        form.code = "";
      } else {
        codeInput.value.focus();
        form.recovery_code = "";
      }
    };
    const submit = () => {
      form.post(route("two-factor.login"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Two-factor Confirmation" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1n, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1n)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<!--[--> Please confirm access to your account by entering the authentication code provided by your authenticator application. <!--]-->`);
            } else {
              _push2(`<!--[--> Please confirm access to your account by entering one of your emergency recovery codes. <!--]-->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1m, { class: "mb-4" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, {
                for: "code",
                value: "Code"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1D, {
                id: "code",
                ref_key: "codeInput",
                ref: codeInput,
                modelValue: unref(form).code,
                "onUpdate:modelValue": ($event) => unref(form).code = $event,
                type: "text",
                inputmode: "numeric",
                class: "mt-1 block w-full",
                autofocus: "",
                autocomplete: "one-time-code"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, {
                for: "recovery_code",
                value: "Recovery Code"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1D, {
                id: "recovery_code",
                ref_key: "recoveryCodeInput",
                ref: recoveryCodeInput,
                modelValue: unref(form).recovery_code,
                "onUpdate:modelValue": ($event) => unref(form).recovery_code = $event,
                type: "text",
                class: "mt-1 block w-full",
                autocomplete: "one-time-code"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`<div class="flex items-center justify-end mt-4"${_scopeId}><button type="button" class="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"${_scopeId}>`);
            if (!recovery.value) {
              _push2(`<!--[--> Use a recovery code <!--]-->`);
            } else {
              _push2(`<!--[--> Use an authentication code <!--]-->`);
            }
            _push2(`</button>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: ["ml-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log in `);
                } else {
                  return [
                    createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, [
                !recovery.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createTextVNode(" Please confirm access to your account by entering the authentication code provided by your authenticator application. ")
                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createTextVNode(" Please confirm access to your account by entering one of your emergency recovery codes. ")
                ], 64))
              ]),
              createVNode(_sfc_main$1m, { class: "mb-4" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                !recovery.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_sfc_main$1A, {
                    for: "code",
                    value: "Code"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "code",
                    ref_key: "codeInput",
                    ref: codeInput,
                    modelValue: unref(form).code,
                    "onUpdate:modelValue": ($event) => unref(form).code = $event,
                    type: "text",
                    inputmode: "numeric",
                    class: "mt-1 block w-full",
                    autofocus: "",
                    autocomplete: "one-time-code"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_sfc_main$1A, {
                    for: "recovery_code",
                    value: "Recovery Code"
                  }),
                  createVNode(_sfc_main$1D, {
                    id: "recovery_code",
                    ref_key: "recoveryCodeInput",
                    ref: recoveryCodeInput,
                    modelValue: unref(form).recovery_code,
                    "onUpdate:modelValue": ($event) => unref(form).recovery_code = $event,
                    type: "text",
                    class: "mt-1 block w-full",
                    autocomplete: "one-time-code"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode("button", {
                    type: "button",
                    class: "text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer",
                    onClick: withModifiers(toggleRecovery, ["prevent"])
                  }, [
                    !recovery.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(" Use a recovery code ")
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createTextVNode(" Use an authentication code ")
                    ], 64))
                  ], 8, ["onClick"]),
                  createVNode(_sfc_main$1J, {
                    class: ["ml-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Log in ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactorChallenge.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const TwoFactorChallenge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1d = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm();
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(() => props.status === "verification-link-sent");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent));
      _push(ssrRenderComponent(JetAuthenticationCard, null, {
        logo: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1n, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1n)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
            if (unref(verificationLinkSent)) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided in your profile settings. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Resend Verification Email `);
                } else {
                  return [
                    createTextVNode(" Resend Verification Email ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("profile.show"),
              class: "underline text-sm text-gray-600 hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Profile`);
                } else {
                  return [
                    createTextVNode(" Edit Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "underline text-sm text-gray-600 hover:text-gray-900 ml-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out `);
                } else {
                  return [
                    createTextVNode(" Log Out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></form>`);
          } else {
            return [
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
              unref(verificationLinkSent) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, " A new verification link has been sent to the email address you provided in your profile settings. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode(_sfc_main$1J, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Resend Verification Email ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"]),
                  createVNode("div", null, [
                    createVNode(unref(Link), {
                      href: _ctx.route("profile.show"),
                      class: "underline text-sm text-gray-600 hover:text-gray-900"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Profile")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("logout"),
                      method: "post",
                      as: "button",
                      class: "underline text-sm text-gray-600 hover:text-gray-900 ml-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Log Out ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const VerifyEmail = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1d
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1c = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full px-2 pt-6 mx-auto overflow-hidden bg-gray-700 shadow-xl sm:rounded-2xl" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Card.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$1b = {
  __name: "InputSearch",
  __ssrInlineRender: true,
  props: {
    modelValue: String
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const input2 = ref(null);
    onMounted(() => {
      if (input2.value.hasAttribute("autofocus")) {
        input2.value.focus();
      }
    });
    expose({ focus: () => input2.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative text-white border-2 border-gray-800 max-h-7 rounded-3xl" }, _attrs))}><input type="search" aria-label="Search" placeholder="Buscar..." class="w-full h-5 pr-1 text-sm bg-transparent border-0 pl-9 focus:ring-0 focus:ring-opacity-50"${ssrRenderAttr("value", __props.modelValue)}><button type="submit" class="absolute top-0 left-1"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline h-4 mr-1" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg> | </button></div>`);
    };
  }
};
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputSearch.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const _sfc_main$1a = {
  __name: "DangerButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-red-500 border border-transparent rounded-3xl hover:bg-red-800 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 disabled:opacity-25"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const _sfc_main$19 = {
  __name: "ItemObjectShow",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ["onShow"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between p-2 m-1 mx-auto overflow-hidden bg-gray-900 shadow-xl sm:rounded-lg" }, _attrs))}><span class="text-sm">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
      _push(ssrRenderComponent(_sfc_main$1a, {
        class: "h-5",
        onClick: ($event) => emit("onShow", props.data)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4" viewBox="0 0 16 16"${_scopeId}><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"${_scopeId}></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentColor",
                class: "h-4",
                viewBox: "0 0 16 16"
              }, [
                createVNode("path", { d: "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" }),
                createVNode("path", { d: "M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ItemObjectShow.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const _sfc_main$18 = {
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    modelValue: String | Number
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const input2 = ref(null);
    onMounted(() => {
      if (input2.value.hasAttribute("autofocus")) {
        input2.value.focus();
      }
    });
    expose({ focus: () => input2.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        ref_key: "input",
        ref: input2,
        class: "w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300",
        value: __props.modelValue
      }, _attrs))}>`);
    };
  }
};
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Input.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const _sfc_main$17 = {
  __name: "ButtonAdd",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "submit"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-2 py-2 text-xs font-semibold tracking-widest uppercase transition border border-green-600 rounded-3xl hover:bg-green-500 active:bg-green-600 focus:outline-none focus:border-green-600 focus:ring focus:ring-green-300 disabled:opacity-25"
      }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ButtonAdd.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const _sfc_main$16 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full max-w-sm p-2 mx-auto" }, _attrs))}><div class="space-y-2 animate-pulse"><div class="flex-1 py-1 space-y-3"><div class="h-6 rounded bg-slate-500"></div><div class="space-y-2"><div class="grid grid-cols-3 gap-4"><div class="h-3 col-span-2 rounded bg-slate-500"></div><div class="h-3 col-span-1 rounded bg-slate-500"></div></div><div class="h-3 rounded bg-slate-500"></div></div></div><div class="flex-1 py-1 space-y-3"><div class="h-6 rounded bg-slate-500"></div><div class="space-y-2"><div class="grid grid-cols-3 gap-4"><div class="h-3 col-span-2 rounded bg-slate-500"></div><div class="h-3 col-span-1 rounded bg-slate-500"></div></div><div class="h-3 rounded bg-slate-500"></div></div></div><div class="flex-1 py-1 space-y-3"><div class="h-6 rounded bg-slate-500"></div><div class="space-y-2"><div class="grid grid-cols-3 gap-4"><div class="h-3 col-span-2 rounded bg-slate-500"></div><div class="h-3 col-span-1 rounded bg-slate-500"></div></div><div class="h-3 rounded bg-slate-500"></div></div></div></div></div>`);
}
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SkeletonLoader.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const SkeletonLoader = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$15 = {
  __name: "DialogModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1I, mergeProps({
        show: __props.show,
        "max-width": __props.maxWidth,
        closeable: __props.closeable,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="text-lg"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "text-lg" }, [
                  renderSlot(_ctx.$slots, "title")
                ]),
                createVNode("div", null, [
                  renderSlot(_ctx.$slots, "content")
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DialogModal.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const Table_vue_vue_type_style_index_0_lang = "";
const _sfc_main$14 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-7xl" }, _attrs))}><div class="inline-block min-w-full align-middle bg-gray-700 border-r-4 border-gray-600"><div class="overflow-hidden overflow-x-auto overflow-y-auto text-white"><table class="min-w-full custome-table"><thead class="text-sm">`);
  ssrRenderSlot(_ctx.$slots, "thead", {}, null, _push, _parent);
  _push(`</thead><tbody class="text-sm text-center">`);
  ssrRenderSlot(_ctx.$slots, "tbody", {}, null, _push, _parent);
  _push(`</tbody></table></div></div></div>`);
}
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Table.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const TableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["ssrRender", _sfc_ssrRender$3]]);
const formatoMoney = (number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = "$1,";
  return number.toString().replace(exp, rep);
};
const IVA = 0.16;
const _sfc_main$13 = {
  __name: "ListDataInput",
  __ssrInlineRender: true,
  props: {
    "modelValue": {
      require: true
    },
    "list": {
      require: true
    },
    "disabled": {
      default: false
    },
    "options": {
      default: []
    },
    "keyOption": {
      type: String,
      default: "id"
    },
    "nameOption": {
      type: String,
      default: "nombre"
    },
    "value": {
      default: ""
    }
  },
  emits: ["update:modelValue", "value"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const valueText = ref("");
    const error = computed(() => {
      if (valueText.value !== "" || props.modelValue != "") {
        if (valueText.value !== "") {
          const selectOpcion = props.options.find((opcion) => {
            return opcion[props.nameOption] == valueText.value;
          });
          if (selectOpcion !== void 0) {
            emit("update:modelValue", selectOpcion[props.keyOption]);
          } else {
            emit("update:modelValue", "");
            return true;
          }
        } else {
          const selectOpcion = props.options.find((opcion) => {
            return opcion[props.keyOption] == props.modelValue;
          });
          if (selectOpcion !== void 0) {
            valueText.value = selectOpcion[props.nameOption];
          }
        }
      } else {
        emit("update:modelValue", "");
      }
      return false;
    });
    const inputlist = ref(null);
    watch(props, () => {
      valueText.value = props.value;
    });
    onMounted(() => {
      if (inputlist.value.hasAttribute("autofocus")) {
        inputlist.value.focus();
      }
    });
    expose({ focus: () => inputlist.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-gray-600" }, _attrs))}><input type="text"${ssrRenderAttr("list", __props.list)} class="${ssrRenderClass([{ "border-red-400": unref(error), "text-red-400": unref(error) }, "w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300"])}"${ssrRenderAttr("value", valueText.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}><datalist${ssrRenderAttr("id", __props.list)}><!--[-->`);
      ssrRenderList(props.options, (opcion) => {
        _push(`<option${ssrRenderAttr("value", opcion[props.nameOption])}>${ssrInterpolate(opcion[props.nameOption])}</option>`);
      });
      _push(`<!--]--></datalist></div>`);
    };
  }
};
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ListDataInput.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const _sfc_main$12 = {
  __name: "SpinProgress",
  __ssrInlineRender: true,
  props: {
    inprogress: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: ["w-4 h-4 anime", { "animate-spin": __props.inprogress, "hidden": !__props.inprogress }],
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 4335 4335"
      }, _attrs))}><path fill="#008DD2" d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"></path></svg>`);
    };
  }
};
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SpinProgress.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const _sfc_main$11 = {
  __name: "SelectComponent",
  __ssrInlineRender: true,
  props: {
    modelValue: String | Number
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const select = ref(null);
    onMounted(() => {
      if (select.value.hasAttribute("autofocus")) {
        select.value.focus();
      }
    });
    expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(mergeProps({
        ref_key: "select",
        ref: select,
        value: __props.modelValue,
        class: "w-full px-2 py-1 text-sm text-white bg-gray-800 border-2 border-gray-700 rounded-md focus:ring-gray-400 active:ring-gray-400 focus:ring-0 focus:ring-opacity-50"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</select>`);
    };
  }
};
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SelectComponent.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _sfc_main$10 = {
  __name: "FormModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: "create"
    },
    object: {
      type: Object,
      required: false
    },
    routeName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ["close", "add", "edit"],
  setup(__props, { emit }) {
    const props = __props;
    const form = reactive({
      "nombre": "",
      "hasErrors": false,
      "errors": [],
      "error": "",
      "recentlySuccessful": false,
      "processing": false
    });
    const titleModal = computed(() => {
      if (props.typeForm === "create") {
        restForm();
        return "Nuevo " + props.title.slice(0, -1);
      } else {
        form.nombre = props.object.nombre;
        return "Actualizar " + props.title.slice(0, -1);
      }
    });
    function restForm() {
      form.nombre = "";
      form.hasErrors = false;
      form.errors = [];
      form.error = "";
    }
    const close = () => {
      emit("close");
    };
    const createOrUpdate = () => {
      if (props.typeForm === "create") {
        create();
      } else {
        update();
      }
    };
    const create = () => {
      axios$1.post(
        route(`${props.routeName}.store`),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then(() => {
        emit("add");
        form.recentlySuccessful = true;
        restForm();
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          form.error = "Error CREATE " + props.routeName;
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    const update = () => {
      axios$1.put(
        route(`${props.routeName}.update`, props.object.id),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("edit", resp.data);
        form.recentlySuccessful = true;
        setTimeout(() => {
          restForm();
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        console.log(error);
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          form.error = "Error UPDATE " + props.routeName;
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-b-4 border-gray-600"${_scopeId}><div class="px-4 py-1 text-center"${_scopeId}><span class="font-bold text-white"${_scopeId}>${ssrInterpolate(unref(titleModal))}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b-4 border-gray-600" }, [
                createVNode("div", { class: "px-4 py-1 text-center" }, [
                  createVNode("span", { class: "font-bold text-white" }, toDisplayString(unref(titleModal)), 1),
                  createVNode(_sfc_main$1B, {
                    message: form.error,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "nombre",
              value: "Nombre:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "nombre",
              name: "referencia",
              type: "text",
              modelValue: form.nombre,
              "onUpdate:modelValue": ($event) => form.nombre = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.nombre,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end px-10 py-2 border-gray-600 border-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              type: "submit",
              disabled: form.processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$12, {
                    inprogress: form.processing
                  }, null, _parent3, _scopeId2));
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"${_scopeId2}><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"${_scopeId2}></path></svg>Guardar `);
                } else {
                  return [
                    createVNode(_sfc_main$12, {
                      inprogress: form.processing
                    }, null, 8, ["inprogress"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      class: "w-6 h-5",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                    ])),
                    createTextVNode("Guardar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(($event) => createOrUpdate(), ["prevent"])
              }, [
                createVNode("div", { class: "grid grid-cols-2 gap-2 px-4 py-2 text-sm" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "nombre",
                      value: "Nombre:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "nombre",
                      name: "referencia",
                      type: "text",
                      modelValue: form.nombre,
                      "onUpdate:modelValue": ($event) => form.nombre = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.nombre,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end px-10 py-2 border-gray-600 border-y-4" }, [
                  createVNode(_sfc_main$1J, {
                    type: "submit",
                    disabled: form.processing
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$12, {
                        inprogress: form.processing
                      }, null, 8, ["inprogress"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        class: "w-6 h-5",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                      ])),
                      createTextVNode("Guardar ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Catalogos/Partials/FormModal.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const FormModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$10
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$$ = {
  __name: "SuccessButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase transition bg-green-700 border border-transparent rounded-3xl hover:bg-green-800 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-600 disabled:opacity-25"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SuccessButton.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = {
  __name: "ListObjModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    listObj: {
      type: Object,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ["close", "add"],
  setup(__props, { emit }) {
    const props = __props;
    const showingForm = ref(false);
    const object = ref({});
    const typeForm = ref("create");
    const showForm = (objectSelect) => {
      if (objectSelect === void 0) {
        typeForm.value = "create";
      } else {
        typeForm.value = "update";
        object.value = objectSelect;
      }
      showingForm.value = true;
    };
    const updateObj = (newObj) => {
      const objIndex = props.listObj.findIndex((ob) => ob.id === newObj.id);
      props.listObj[objIndex] = newObj;
    };
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}>${ssrInterpolate(props.title)}</span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex items-center justify-center gap-1 text-white"${_scopeId}><span class="block font-bold text-center text-gray-300"${_scopeId}> Agregar </span>`);
            _push2(ssrRenderComponent(_sfc_main$17, {
              class: "h-5",
              onClick: ($event) => showForm()
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, toDisplayString(props.title), 1)
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex items-center justify-center gap-1 text-white" }, [
                    createVNode("span", { class: "block font-bold text-center text-gray-300" }, " Agregar "),
                    createVNode(_sfc_main$17, {
                      class: "h-5",
                      onClick: ($event) => showForm()
                    }, null, 8, ["onClick"])
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.listObj, (obj) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(obj.nombre)}</td><td${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$$, {
                      onClick: ($event) => showForm(obj)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId3}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId3}></path></svg>`);
                        } else {
                          return [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "w-4 h-4",
                              viewBox: "0 0 20 20",
                              fill: "currentColor"
                            }, [
                              createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                            ]))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></td></tr>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.listObj, (obj) => {
                      return openBlock(), createBlock("tr", {
                        key: obj.id
                      }, [
                        createVNode("td", null, toDisplayString(obj.nombre), 1),
                        createVNode("td", null, [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_sfc_main$$, {
                              onClick: ($event) => showForm(obj)
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "w-4 h-4",
                                  viewBox: "0 0 20 20",
                                  fill: "currentColor"
                                }, [
                                  createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                                ]))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$10, {
              "route-name": props.routeName,
              title: props.title,
              show: showingForm.value,
              "type-form": typeForm.value,
              object: object.value,
              onAdd: ($event) => emit("add"),
              onEdit: ($event) => updateObj($event),
              onClose: ($event) => showingForm.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.listObj, (obj) => {
                    return openBlock(), createBlock("tr", {
                      key: obj.id
                    }, [
                      createVNode("td", null, toDisplayString(obj.nombre), 1),
                      createVNode("td", null, [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode(_sfc_main$$, {
                            onClick: ($event) => showForm(obj)
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-4 h-4",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                              ]))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$10, {
                "route-name": props.routeName,
                title: props.title,
                show: showingForm.value,
                "type-form": typeForm.value,
                object: object.value,
                onAdd: ($event) => emit("add"),
                onEdit: ($event) => updateObj($event),
                onClose: ($event) => showingForm.value = false
              }, null, 8, ["route-name", "title", "show", "type-form", "object", "onAdd", "onEdit", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Catalogos/Partials/ListObjModal.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const ListObjModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$_
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Z = {
  __name: "PaginationAxios",
  __ssrInlineRender: true,
  props: {
    pagination: Object
  },
  emits: ["loadPage"],
  setup(__props, { emit }) {
    const props = __props;
    const page = ref(props.pagination.current_page);
    const current_page = computed(() => {
      return props.pagination.current_page;
    });
    watch(
      current_page,
      (newPage) => {
        page.value = newPage;
      }
    );
    const noPreviousPage = computed(
      () => props.pagination.current_page - 1 <= 0
    );
    const noNextPage = computed(
      () => props.pagination.current_page + 1 > props.pagination.last_page
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center justify-center px-1" }, _attrs))}><div class="hidden mr-2 text-xs text-gray-500 lg:block">${ssrInterpolate(__props.pagination.total)} elementos</div>`);
      if (__props.pagination.last_page > 1) {
        _push(`<div class="flex space-x-1 items-top"><button${ssrIncludeBooleanAttr(unref(noPreviousPage)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-10": unref(noPreviousPage) }, "inline-flex items-center justify-center text-xs text-gray-500 bg-gray-900 border border-gray-200 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"])}"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg></button><button${ssrIncludeBooleanAttr(unref(noPreviousPage)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-10": unref(noPreviousPage) }, "inline-flex items-center justify-center text-gray-500 bg-gray-900 border border-gray-200 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"])}"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-1"><input type="number"${ssrRenderAttr("value", page.value)} class="w-5 h-6 px-2 text-xs text-center bg-transparent border border-gray-900 rounded sm:h-6 sm:w-10 focus:ring-blue-500 focus:border-blue-500"><div class="px-2 text-xs text-gray-600">de ${ssrInterpolate(__props.pagination.last_page)}</div></div><button${ssrIncludeBooleanAttr(unref(noNextPage)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-10": unref(noNextPage) }, "inline-flex items-center justify-center text-gray-500 bg-gray-900 border border-gray-300 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"])}"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button><button${ssrIncludeBooleanAttr(unref(noNextPage)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-10": unref(noNextPage) }, "inline-flex items-center justify-center text-gray-500 bg-gray-900 border border-gray-300 rounded shadow-sm outline-none w-11 h-11 hover:bg-gray-50 lg:h-6 lg:w-6 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"])}"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:h-3 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PaginationAxios.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const _sfc_main$Y = {
  __name: "FormSubCatalogoModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: "create"
    },
    padreId: {
      type: Number,
      required: true
    },
    object: {
      type: Object,
      required: false
    },
    routeName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ["close", "add", "edit"],
  setup(__props, { emit }) {
    const props = __props;
    const form = reactive({
      "nombre": "",
      "cantidad": "",
      "hasErrors": false,
      "errors": [],
      "error": "",
      "recentlySuccessful": false,
      "processing": false
    });
    const titleModal = computed(() => {
      if (props.typeForm === "create") {
        restForm();
        return "Nuevo " + props.title.slice(0, -1);
      } else {
        if (props.routeName === "montos") {
          form.cantidad = props.object.cantidad;
        } else {
          form.nombre = props.object.nombre;
        }
        return "Actualizar " + props.title.slice(0, -1);
      }
    });
    function restForm() {
      form.nombre = "";
      form.cantidad = "";
      form.hasErrors = false;
      form.errors = [];
      form.error = "";
    }
    const close = () => {
      emit("close");
    };
    const createOrUpdate = () => {
      if (props.typeForm === "create") {
        create();
      } else {
        update();
      }
    };
    const create = () => {
      axios$1.post(
        route(`${props.routeName}.store`, props.padreId),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then(() => {
        emit("add");
        form.recentlySuccessful = true;
        restForm();
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          form.error = "Error CREATE " + props.routeName;
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    const update = () => {
      axios$1.put(
        route(`${props.routeName}.update`, [props.padreId, props.object.id]),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("edit", resp.data);
        form.recentlySuccessful = true;
        setTimeout(() => {
          restForm();
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        console.log(error);
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          form.error = "Error UPDATE " + props.routeName;
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-b-4 border-gray-600"${_scopeId}><div class="px-4 py-1 text-center"${_scopeId}><span class="font-bold text-white"${_scopeId}>${ssrInterpolate(unref(titleModal))}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b-4 border-gray-600" }, [
                createVNode("div", { class: "px-4 py-1 text-center" }, [
                  createVNode("span", { class: "font-bold text-white" }, toDisplayString(unref(titleModal)), 1),
                  createVNode(_sfc_main$1B, {
                    message: form.error,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm"${_scopeId}>`);
            if (props.routeName === "montos") {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, {
                for: "cantidad",
                value: "Cantidad:"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$18, {
                id: "cantidad",
                name: "cantidad",
                type: "text",
                pattern: "^\\d*(\\.\\d{0,2})?$",
                modelValue: form.cantidad,
                "onUpdate:modelValue": ($event) => form.cantidad = $event,
                required: "",
                maxlength: "30"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1B, {
                message: form.errors.nombre,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, {
                for: "nombre",
                value: "Nombre:"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$18, {
                id: "nombre",
                name: "nombre",
                type: "text",
                modelValue: form.nombre,
                "onUpdate:modelValue": ($event) => form.nombre = $event,
                required: "",
                maxlength: "60"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1B, {
                message: form.errors.nombre,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div><div class="flex justify-end px-10 py-2 border-gray-600 border-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              type: "submit",
              disabled: form.processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$12, {
                    inprogress: form.processing
                  }, null, _parent3, _scopeId2));
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"${_scopeId2}><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"${_scopeId2}></path></svg>Guardar `);
                } else {
                  return [
                    createVNode(_sfc_main$12, {
                      inprogress: form.processing
                    }, null, 8, ["inprogress"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      class: "w-6 h-5",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                    ])),
                    createTextVNode("Guardar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(($event) => createOrUpdate(), ["prevent"])
              }, [
                createVNode("div", { class: "grid grid-cols-2 gap-2 px-4 py-2 text-sm" }, [
                  props.routeName === "montos" ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_sfc_main$1A, {
                      for: "cantidad",
                      value: "Cantidad:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "cantidad",
                      name: "cantidad",
                      type: "text",
                      pattern: "^\\d*(\\.\\d{0,2})?$",
                      modelValue: form.cantidad,
                      "onUpdate:modelValue": ($event) => form.cantidad = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.nombre,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(_sfc_main$1A, {
                      for: "nombre",
                      value: "Nombre:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "nombre",
                      name: "nombre",
                      type: "text",
                      modelValue: form.nombre,
                      "onUpdate:modelValue": ($event) => form.nombre = $event,
                      required: "",
                      maxlength: "60"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.nombre,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]))
                ]),
                createVNode("div", { class: "flex justify-end px-10 py-2 border-gray-600 border-y-4" }, [
                  createVNode(_sfc_main$1J, {
                    type: "submit",
                    disabled: form.processing
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$12, {
                        inprogress: form.processing
                      }, null, 8, ["inprogress"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        class: "w-6 h-5",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                      ])),
                      createTextVNode("Guardar ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Catalogos/Partials/FormSubCatalogoModal.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const FormSubCatalogoModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$X = {
  __name: "SubcatalogoModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    routeName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    object: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const showingForm = ref(false);
    const typeForm = ref("create");
    const searchText = ref("");
    const subCatalogo = ref({});
    const listSubCatalogo = ref({ data: [] });
    const showForm = (objectSelect) => {
      if (objectSelect === void 0) {
        typeForm.value = "create";
      } else {
        typeForm.value = "update";
        subCatalogo.value = objectSelect;
      }
      showingForm.value = true;
    };
    const search = async (newSearch, page) => {
      const params = pickBy({ search: newSearch, page });
      const resp = await axios.get(route(`${props.routeName}.index`, props.object.id), { params });
      listSubCatalogo.value = resp.data;
    };
    let timeout;
    watch(searchText, (newSearch) => {
      if (timeout !== void 0) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        search(newSearch);
      }, 300);
    });
    const updateObj = (newObj) => {
      let objIndex = listSubCatalogo.value.data.findIndex((ob) => ob.id === newObj.id);
      listSubCatalogo.value.data[objIndex] = newObj;
    };
    const close = () => {
      listSubCatalogo.value = { data: [] };
      emit("close");
    };
    watchEffect(() => {
      if (props.show) {
        search();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}>${ssrInterpolate(props.object.nombre)}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1b, {
              modelValue: searchText.value,
              "onUpdate:modelValue": ($event) => searchText.value = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex flex-col items-center justify-center gap-1 text-white"${_scopeId}><span class="block font-bold text-center text-gray-300"${_scopeId}>${ssrInterpolate(props.title)}</span>`);
            _push2(ssrRenderComponent(_sfc_main$17, {
              class: "h-5",
              onClick: ($event) => showForm()
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, toDisplayString(props.object.nombre), 1),
                  createVNode(_sfc_main$1b, {
                    modelValue: searchText.value,
                    "onUpdate:modelValue": ($event) => searchText.value = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex flex-col items-center justify-center gap-1 text-white" }, [
                    createVNode("span", { class: "block font-bold text-center text-gray-300" }, toDisplayString(props.title), 1),
                    createVNode(_sfc_main$17, {
                      class: "h-5",
                      onClick: ($event) => showForm()
                    }, null, 8, ["onClick"])
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (props.routeName === "montos") {
                    _push3(`<!--[-->`);
                    ssrRenderList(listSubCatalogo.value.data, (subcatalogo) => {
                      _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(subcatalogo.cantidad)}</td><td${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$$, {
                        onClick: ($event) => showForm(subcatalogo)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId3}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-4 h-4",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(listSubCatalogo.value.data, (subcatalogo) => {
                      _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(subcatalogo.nombre)}</td><td${_scopeId2}><div class="flex justify-center"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$$, {
                        onClick: ($event) => showForm(subcatalogo)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId3}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-4 h-4",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    props.routeName === "montos" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(listSubCatalogo.value.data, (subcatalogo) => {
                      return openBlock(), createBlock("tr", {
                        key: subcatalogo.id
                      }, [
                        createVNode("td", null, toDisplayString(subcatalogo.cantidad), 1),
                        createVNode("td", null, [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_sfc_main$$, {
                              onClick: ($event) => showForm(subcatalogo)
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "w-4 h-4",
                                  viewBox: "0 0 20 20",
                                  fill: "currentColor"
                                }, [
                                  createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                                ]))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ])
                      ]);
                    }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(listSubCatalogo.value.data, (subcatalogo) => {
                      return openBlock(), createBlock("tr", {
                        key: subcatalogo.id
                      }, [
                        createVNode("td", null, toDisplayString(subcatalogo.nombre), 1),
                        createVNode("td", null, [
                          createVNode("div", { class: "flex justify-center" }, [
                            createVNode(_sfc_main$$, {
                              onClick: ($event) => showForm(subcatalogo)
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  class: "w-4 h-4",
                                  viewBox: "0 0 20 20",
                                  fill: "currentColor"
                                }, [
                                  createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                                ]))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$Z, { pagination: listSubCatalogo.value }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$Y, {
              "padre-id": props.object.id,
              "route-name": props.routeName,
              title: props.title,
              show: showingForm.value,
              "type-form": typeForm.value,
              object: subCatalogo.value,
              onAdd: ($event) => search(searchText.value, listSubCatalogo.value.current_page),
              onEdit: ($event) => updateObj($event),
              onClose: ($event) => showingForm.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                tbody: withCtx(() => [
                  props.routeName === "montos" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(listSubCatalogo.value.data, (subcatalogo) => {
                    return openBlock(), createBlock("tr", {
                      key: subcatalogo.id
                    }, [
                      createVNode("td", null, toDisplayString(subcatalogo.cantidad), 1),
                      createVNode("td", null, [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode(_sfc_main$$, {
                            onClick: ($event) => showForm(subcatalogo)
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-4 h-4",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                              ]))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ])
                    ]);
                  }), 128)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(listSubCatalogo.value.data, (subcatalogo) => {
                    return openBlock(), createBlock("tr", {
                      key: subcatalogo.id
                    }, [
                      createVNode("td", null, toDisplayString(subcatalogo.nombre), 1),
                      createVNode("td", null, [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode(_sfc_main$$, {
                            onClick: ($event) => showForm(subcatalogo)
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                class: "w-4 h-4",
                                viewBox: "0 0 20 20",
                                fill: "currentColor"
                              }, [
                                createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                              ]))
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$Z, { pagination: listSubCatalogo.value }, null, 8, ["pagination"]),
              createVNode(_sfc_main$Y, {
                "padre-id": props.object.id,
                "route-name": props.routeName,
                title: props.title,
                show: showingForm.value,
                "type-form": typeForm.value,
                object: subCatalogo.value,
                onAdd: ($event) => search(searchText.value, listSubCatalogo.value.current_page),
                onEdit: ($event) => updateObj($event),
                onClose: ($event) => showingForm.value = false
              }, null, 8, ["padre-id", "route-name", "title", "show", "type-form", "object", "onAdd", "onEdit", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Catalogos/Partials/SubcatalogoModal.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const SubcatalogoModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$X
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$W = {
  __name: "CardGenerica",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
    subRoute: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ["reload"],
  setup(__props) {
    const props = __props;
    const showingList = ref(false);
    const showingSubCatalogo = ref(false);
    const object = ref({});
    const showSubCatalogo = (obj) => {
      object.value = obj;
      showingSubCatalogo.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(Card, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 text-white"${_scopeId}><div class="flex justify-around gap-1"${_scopeId}><h2 class="text-xl font-bold leading-tight text-white"${_scopeId}>${ssrInterpolate(__props.title)}</h2>`);
            _push2(ssrRenderComponent(_sfc_main$17, {
              class: "h-7",
              onClick: ($event) => showingList.value = true
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-around my-2"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "search", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="w-full"${_scopeId}><div class="-mx-2 overflow-hidden overflow-y-auto" style="${ssrRenderStyle({ "max-height": "85vh" })}"${_scopeId}>`);
            if (__props.data.current_page === void 0) {
              _push2(ssrRenderComponent(SkeletonLoader, { style: { "height": "85vh" } }, null, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}><!--[-->`);
              ssrRenderList(__props.data.data, (obj) => {
                _push2(ssrRenderComponent(_sfc_main$19, {
                  key: obj.id,
                  data: obj,
                  onOnShow: ($event) => showSubCatalogo($event)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` #${ssrInterpolate(obj.nombre)}`);
                    } else {
                      return [
                        createTextVNode(" #" + toDisplayString(obj.nombre), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div><div${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "pagination", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$_, {
              title: props.title,
              routeName: props.routeName,
              show: showingList.value,
              listObj: __props.data.data,
              onAdd: ($event) => _ctx.$emit("reload"),
              onClose: ($event) => showingList.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              title: __props.subRoute === "montos" ? "Precios" : __props.subRoute,
              routeName: __props.subRoute,
              object: object.value,
              show: showingSubCatalogo.value,
              onClose: ($event) => showingSubCatalogo.value = false
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 text-white" }, [
                createVNode("div", { class: "flex justify-around gap-1" }, [
                  createVNode("h2", { class: "text-xl font-bold leading-tight text-white" }, toDisplayString(__props.title), 1),
                  createVNode(_sfc_main$17, {
                    class: "h-7",
                    onClick: ($event) => showingList.value = true
                  }, null, 8, ["onClick"])
                ]),
                createVNode("div", { class: "flex justify-around my-2" }, [
                  renderSlot(_ctx.$slots, "search")
                ]),
                createVNode("div", { class: "w-full" }, [
                  createVNode("div", {
                    class: "-mx-2 overflow-hidden overflow-y-auto",
                    style: { "max-height": "85vh" }
                  }, [
                    __props.data.current_page === void 0 ? (openBlock(), createBlock(SkeletonLoader, {
                      key: 0,
                      style: { "height": "85vh" }
                    })) : (openBlock(), createBlock("div", { key: 1 }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.data.data, (obj) => {
                        return openBlock(), createBlock(_sfc_main$19, {
                          key: obj.id,
                          data: obj,
                          onOnShow: ($event) => showSubCatalogo($event)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" #" + toDisplayString(obj.nombre), 1)
                          ]),
                          _: 2
                        }, 1032, ["data", "onOnShow"]);
                      }), 128))
                    ]))
                  ])
                ]),
                createVNode("div", null, [
                  renderSlot(_ctx.$slots, "pagination")
                ]),
                createVNode(_sfc_main$_, {
                  title: props.title,
                  routeName: props.routeName,
                  show: showingList.value,
                  listObj: __props.data.data,
                  onAdd: ($event) => _ctx.$emit("reload"),
                  onClose: ($event) => showingList.value = false
                }, null, 8, ["title", "routeName", "show", "listObj", "onAdd", "onClose"]),
                createVNode(_sfc_main$X, {
                  title: __props.subRoute === "montos" ? "Precios" : __props.subRoute,
                  routeName: __props.subRoute,
                  object: object.value,
                  show: showingSubCatalogo.value,
                  onClose: ($event) => showingSubCatalogo.value = false
                }, null, 8, ["title", "routeName", "object", "show", "onClose"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Catalogos/Partials/CardGenerica.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const CardGenerica = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$W
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$V = {
  __name: "CatalogosIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const clientes = ref({ data: [] });
    const servicios = ref({ data: [] });
    const grupoConceptos = ref({ data: [] });
    const searchTextCliente = ref("");
    const searchTextServ = ref("");
    const searchTextGroup = ref("");
    onBeforeMount(async () => {
      const requestCliente = axios.get(route("clientes.listado"));
      const requestServ = axios.get(route("servicios.index"));
      const requestGrupo = axios.get(route("grupo-conceptos.index"));
      const response = await Promise.all([requestCliente, requestServ, requestGrupo]);
      clientes.value = response[0].data;
      servicios.value = response[1].data;
      grupoConceptos.value = response[2].data;
    });
    const searchClientes = async (newSearch, page) => {
      const params = pickBy({ search: newSearch, page });
      const resp = await axios.get(route("clientes.listado"), { params });
      clientes.value = resp.data;
    };
    const searchServicios = async (newSearch, page) => {
      const params = pickBy({ search: newSearch, page });
      const resp = await axios.get(route("servicios.index"), { params });
      servicios.value = resp.data;
    };
    const searchGrupos = async (newSearch, page) => {
      const params = pickBy({ search: newSearch, page });
      const resp = await axios.get(route("grupo-conceptos.index"), { params });
      grupoConceptos.value = resp.data;
    };
    let timeoutCliente;
    watch(searchTextCliente, (newSearch) => {
      if (timeoutCliente !== void 0) {
        clearTimeout(timeoutCliente);
      }
      timeoutCliente = setTimeout(() => {
        searchClientes(newSearch);
      }, 300);
    });
    let timeoutSer;
    watch(searchTextServ, (newSearch) => {
      if (timeoutSer !== void 0) {
        clearTimeout(timeoutSer);
      }
      timeoutSer = setTimeout(() => {
        searchServicios(newSearch);
      }, 300);
    });
    let timeoutGrupo;
    watch(searchTextGroup, (newSearch) => {
      if (timeoutGrupo !== void 0) {
        clearTimeout(timeoutGrupo);
      }
      timeoutGrupo = setTimeout(() => {
        searchGrupos(newSearch);
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "Finanzas" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-around"${_scopeId}><h2 class="text-xl font-bold leading-tight text-white"${_scopeId}> Catalogos </h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-around" }, [
                createVNode("h2", { class: "text-xl font-bold leading-tight text-white" }, " Catalogos ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-3 py-3 fondo_general"${_scopeId}><div class="grid grid-cols-1 gap-2 md:grid-cols-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              data: clientes.value,
              "route-name": "clientes",
              "sub-route": "cecos",
              title: "Clientes",
              onReload: ($event) => searchClientes(searchTextCliente.value, clientes.value.current_page)
            }, {
              search: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1b, {
                    modelValue: searchTextCliente.value,
                    "onUpdate:modelValue": ($event) => searchTextCliente.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1b, {
                      modelValue: searchTextCliente.value,
                      "onUpdate:modelValue": ($event) => searchTextCliente.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              pagination: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$Z, {
                    pagination: clientes.value,
                    onLoadPage: ($event) => searchClientes(searchTextCliente.value, $event)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$Z, {
                      pagination: clientes.value,
                      onLoadPage: ($event) => searchClientes(searchTextCliente.value, $event)
                    }, null, 8, ["pagination", "onLoadPage"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$W, {
              data: servicios.value,
              "route-name": "servicios",
              "sub-route": "montos",
              title: "Servicios",
              onReload: ($event) => searchServicios(searchTextServ.value, servicios.value.current_page)
            }, {
              search: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1b, {
                    modelValue: searchTextServ.value,
                    "onUpdate:modelValue": ($event) => searchTextServ.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1b, {
                      modelValue: searchTextServ.value,
                      "onUpdate:modelValue": ($event) => searchTextServ.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              pagination: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$Z, {
                    pagination: servicios.value,
                    onLoadPage: ($event) => searchServicios(searchTextServ.value, $event)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$Z, {
                      pagination: servicios.value,
                      onLoadPage: ($event) => searchServicios(searchTextServ.value, $event)
                    }, null, 8, ["pagination", "onLoadPage"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$W, {
              data: grupoConceptos.value,
              "route-name": "grupo-conceptos",
              "sub-route": "conceptos",
              title: "Grupos",
              onReload: ($event) => searchGrupos(searchTextGroup.value, grupoConceptos.value.current_page)
            }, {
              search: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1b, {
                    modelValue: searchTextGroup.value,
                    "onUpdate:modelValue": ($event) => searchTextGroup.value = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1b, {
                      modelValue: searchTextGroup.value,
                      "onUpdate:modelValue": ($event) => searchTextGroup.value = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              pagination: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$Z, {
                    pagination: grupoConceptos.value,
                    onLoadPage: ($event) => searchGrupos(searchTextGroup.value, $event)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$Z, {
                      pagination: grupoConceptos.value,
                      onLoadPage: ($event) => searchGrupos(searchTextGroup.value, $event)
                    }, null, 8, ["pagination", "onLoadPage"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-3 py-3 fondo_general" }, [
                createVNode("div", { class: "grid grid-cols-1 gap-2 md:grid-cols-3" }, [
                  createVNode(_sfc_main$W, {
                    data: clientes.value,
                    "route-name": "clientes",
                    "sub-route": "cecos",
                    title: "Clientes",
                    onReload: ($event) => searchClientes(searchTextCliente.value, clientes.value.current_page)
                  }, {
                    search: withCtx(() => [
                      createVNode(_sfc_main$1b, {
                        modelValue: searchTextCliente.value,
                        "onUpdate:modelValue": ($event) => searchTextCliente.value = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    pagination: withCtx(() => [
                      createVNode(_sfc_main$Z, {
                        pagination: clientes.value,
                        onLoadPage: ($event) => searchClientes(searchTextCliente.value, $event)
                      }, null, 8, ["pagination", "onLoadPage"])
                    ]),
                    _: 1
                  }, 8, ["data", "onReload"]),
                  createVNode(_sfc_main$W, {
                    data: servicios.value,
                    "route-name": "servicios",
                    "sub-route": "montos",
                    title: "Servicios",
                    onReload: ($event) => searchServicios(searchTextServ.value, servicios.value.current_page)
                  }, {
                    search: withCtx(() => [
                      createVNode(_sfc_main$1b, {
                        modelValue: searchTextServ.value,
                        "onUpdate:modelValue": ($event) => searchTextServ.value = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    pagination: withCtx(() => [
                      createVNode(_sfc_main$Z, {
                        pagination: servicios.value,
                        onLoadPage: ($event) => searchServicios(searchTextServ.value, $event)
                      }, null, 8, ["pagination", "onLoadPage"])
                    ]),
                    _: 1
                  }, 8, ["data", "onReload"]),
                  createVNode(_sfc_main$W, {
                    data: grupoConceptos.value,
                    "route-name": "grupo-conceptos",
                    "sub-route": "conceptos",
                    title: "Grupos",
                    onReload: ($event) => searchGrupos(searchTextGroup.value, grupoConceptos.value.current_page)
                  }, {
                    search: withCtx(() => [
                      createVNode(_sfc_main$1b, {
                        modelValue: searchTextGroup.value,
                        "onUpdate:modelValue": ($event) => searchTextGroup.value = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    pagination: withCtx(() => [
                      createVNode(_sfc_main$Z, {
                        pagination: grupoConceptos.value,
                        onLoadPage: ($event) => searchGrupos(searchTextGroup.value, $event)
                      }, null, 8, ["pagination", "onLoadPage"])
                    ]),
                    _: 1
                  }, 8, ["data", "onReload"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Catalogos/CatalogosIndex.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const CatalogosIndex = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$V
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$U = {
  data() {
    return {
      menu: [
        {
          header: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Dashboard"
        },
        {
          href: "/clientes.index",
          title: "Charts",
          child: [
            {
              href: "/charts/sublink",
              title: "Sub Link"
            }
          ]
        }
      ]
    };
  }
};
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SideBar.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const _sfc_main$T = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    clientes: Object,
    cecos: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "Inicio" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-white"${_scopeId}> Inicio </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-white" }, " Inicio ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-xl sm:rounded-lg"${_scopeId}></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-xl sm:rounded-lg" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$T
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$S = {
  __name: "CalendarModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    dataCalendar: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "addOc"],
  setup(__props, { emit }) {
    const props = __props;
    const headerTable = computed(() => {
      if (props.dataCalendar.data.lenght == 0) {
        return ["", "Cantidad"];
      }
      let keyData;
      const auxHeader = [];
      for (keyData in props.dataCalendar.data[0]) {
        switch (keyData) {
          case "id":
          case "day":
            break;
          default:
            auxHeader.push(keyData);
            break;
        }
      }
      return auxHeader;
    });
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white uppercase"${_scopeId}>${ssrInterpolate(__props.dataCalendar.serie)}</span></div><div class="px-4 py-1 border-gray-600"${_scopeId}><span class="block font-bold text-center text-white uppercase"${_scopeId}>${ssrInterpolate(__props.dataCalendar.date)}</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white uppercase" }, toDisplayString(__props.dataCalendar.serie), 1)
                ]),
                createVNode("div", { class: "px-4 py-1 border-gray-600" }, [
                  createVNode("span", { class: "block font-bold text-center text-white uppercase" }, toDisplayString(__props.dataCalendar.date), 1)
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr class="uppercase"${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(headerTable), (header) => {
                    _push3(`<th${_scopeId2}>${ssrInterpolate(header)}</th>`);
                  });
                  _push3(`<!--]--></tr>`);
                } else {
                  return [
                    createVNode("tr", { class: "uppercase" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(headerTable), (header) => {
                        return openBlock(), createBlock("th", { key: header }, toDisplayString(header), 1);
                      }), 128))
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.dataCalendar.data, (obj, index) => {
                    _push3(`<tr${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(headerTable), (header) => {
                      _push3(`<td${_scopeId2}>${ssrInterpolate(obj[header])}</td>`);
                    });
                    _push3(`<!--]--></tr>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.dataCalendar.data, (obj, index) => {
                      return openBlock(), createBlock("tr", { key: index }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(headerTable), (header) => {
                          return openBlock(), createBlock("td", {
                            key: header + index
                          }, toDisplayString(obj[header]), 1);
                        }), 128))
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", { class: "uppercase" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(headerTable), (header) => {
                      return openBlock(), createBlock("th", { key: header }, toDisplayString(header), 1);
                    }), 128))
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.dataCalendar.data, (obj, index) => {
                    return openBlock(), createBlock("tr", { key: index }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(headerTable), (header) => {
                        return openBlock(), createBlock("td", {
                          key: header + index
                        }, toDisplayString(obj[header]), 1);
                      }), 128))
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardCalendar/CalendarModal.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const CalendarModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$S
}, Symbol.toStringTag, { value: "Module" }));
const listMonths = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
const listDaysSem = [
  "D",
  "L",
  "M",
  "M",
  "J",
  "V",
  "S"
];
const _sfc_main$R = {
  __name: "CalendarHeader",
  __ssrInlineRender: true,
  props: {
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      default: 2022
    }
  },
  emits: ["changeDate"],
  setup(__props, { emit }) {
    const mesTest = ref(listMonths);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-around px-4 py-1" }, _attrs))}><h1 class="text-xl tracking-widest">Calendario</h1><div class="flex gap-2 items-center"><button class="hover:opacity-40"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button><h2 class="text-xl">${ssrInterpolate(mesTest.value[__props.month])}</h2><button class="hover:opacity-40"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></button></div></div>`);
    };
  }
};
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CalendarHeader.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const Calendar_vue_vue_type_style_index_0_scoped_53565599_lang = "";
const _sfc_main$Q = {
  __name: "Calendar",
  __ssrInlineRender: true,
  props: {
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      default: 2022
    },
    specialDays: {
      type: Object,
      default: []
    }
  },
  emits: ["onSpecialDays"],
  setup(__props) {
    const props = __props;
    const diasText = ref(listDaysSem);
    const weeks = computed(() => {
      const fechaInicial = new Date(props.year, props.month);
      let days = [];
      let semanaDay = 0;
      let start = 0;
      const auxWeek = [];
      const lastDay = new Date(props.year, props.month + 1, 0).getDate();
      for (let day = 1; day <= lastDay; day++) {
        fechaInicial.setDate(day);
        semanaDay = fechaInicial.getDay();
        if (start === 0) {
          start = semanaDay + 1;
        }
        let plusData = [];
        props.specialDays.forEach((specialDay) => {
          if (specialDay.data[day] !== void 0) {
            plusData.push({
              ...specialDay,
              date: day + "/" + (props.month + 1) + "/" + props.year,
              data: specialDay.data[day],
              title: specialDay.data[day].title
            });
          }
        });
        days.push({ dayText: day, plusData });
        if (semanaDay == 6) {
          auxWeek.push({
            days: [...days],
            start
          });
          start = 1;
          days = [];
        }
      }
      if (days.length > 0) {
        auxWeek.push({
          days: [...days]
        });
      }
      return auxWeek;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full calendar" }, _attrs))} data-v-53565599><div class="grid-calendar" data-v-53565599><!--[-->`);
      ssrRenderList(diasText.value, (diaText) => {
        _push(`<div data-v-53565599>${ssrInterpolate(diaText)}</div>`);
      });
      _push(`<!--]--></div><div class="grid-calendar-week" data-v-53565599><!--[-->`);
      ssrRenderList(unref(weeks), (week, indexWeek) => {
        _push(`<div class="grid-calendar" data-v-53565599><!--[-->`);
        ssrRenderList(week.days, (day, dayIndex) => {
          _push(`<div class="${ssrRenderClass({ ["col-start-" + week.start]: dayIndex == 0 })}" data-v-53565599>${ssrInterpolate(day.dayText)} <!--[-->`);
          ssrRenderList(day.plusData, (data2, indexData) => {
            _push(`<div data-v-53565599><div class="w-full my-1 rounded-lg" style="${ssrRenderStyle({ "background-color": data2.color })}" data-v-53565599><span class="py-1 text-white cursor-pointer" data-v-53565599>${ssrInterpolate(data2.title)}</span></div></div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Calendar.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-53565599"]]);
const VentasCalendar_vue_vue_type_style_index_0_scoped_632b377b_lang = "";
const _sfc_main$P = {
  __name: "VentasCalendar",
  __ssrInlineRender: true,
  props: {
    date: { month: Number, year: Number },
    totalVentas: {
      type: Object,
      required: true
    },
    totalOcs: {
      type: Object,
      required: true
    }
  },
  emits: ["changeDate"],
  setup(__props, { emit }) {
    const props = __props;
    const totalsVentas = ref({
      ventas: 0,
      pc: 0,
      pp: 0,
      c: 0
    });
    const showsStatus = reactive(["ventas"]);
    const specialDays = ref([]);
    const showingModal = ref(false);
    const dataCalendar = ref([]);
    const colorsStatus = ["#A16207", "#CA8A04", "#E4B308", "#FDE047"];
    const isActive = (status) => {
      return showsStatus.includes(status);
    };
    async function getDaysStatus() {
      const date = {
        month: props.date.month + 1,
        year: props.date.year
      };
      const axiosDaysStatus = [];
      let series2 = [];
      let colors = [];
      showsStatus.forEach((st) => {
        series2.push(st);
        if (st === "ventas") {
          const respVentas = axios.get(route("ventas.month"), {
            params: date
          });
          axiosDaysStatus.push(respVentas);
          colors.push(colorsStatus[0]);
        } else {
          const respVentas = axios.get(route("ocs.month"), {
            params: { ...date, status: st }
          });
          axiosDaysStatus.push(respVentas);
          switch (st) {
            case "pc":
              colors.push(colorsStatus[1]);
              break;
            case "pp":
              colors.push(colorsStatus[2]);
              break;
            case "c":
              colors.push(colorsStatus[3]);
              break;
          }
        }
      });
      const responses = await Promise.all(axiosDaysStatus);
      var total = 0;
      const daysStatus = responses.map((resp, index) => {
        for (let d2 in resp.data) {
          total = 0;
          resp.data[d2].forEach((obj) => {
            total += obj.total;
            obj.total = formatoMoney(obj.total);
          });
          resp.data[d2].data = resp.data[d2];
          resp.data[d2].title = formatoMoney(total.toFixed(2));
        }
        total = formatoMoney(total);
        return { data: resp.data, color: colors[index], serie: series2[index] };
      });
      specialDays.value = daysStatus;
    }
    async function getTotalsMonth() {
      const date = {
        month: props.date.month + 1,
        year: props.date.year
      };
      const respOcs = axios.get(route("ocs.totals-status"), {
        params: date
      });
      const respVentas = axios.get(route("ventas.totals"), {
        params: date
      });
      const resp = await Promise.all([respOcs, respVentas]);
      const auxResponse = {
        "ventas": formatoMoney(resp[1].data.total.toFixed(2)),
        "c": formatoMoney(resp[0].data.c.toFixed(2)),
        "pc": formatoMoney(resp[0].data.pc.toFixed(2)),
        "pp": formatoMoney(resp[0].data.pp.toFixed(2))
      };
      totalsVentas.value = auxResponse;
      await getDaysStatus();
    }
    const showCalendarModal = (data2) => {
      dataCalendar.value = data2;
      showingModal.value = true;
    };
    watch(showsStatus, async () => {
      await getDaysStatus();
    });
    onBeforeMount(() => {
      getTotalsMonth();
    });
    watch(props, () => {
      getTotalsMonth();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-h-screen mx-8 overflow-x-auto" }, _attrs))} data-v-632b377b>`);
      _push(ssrRenderComponent(_sfc_main$R, {
        class: "text-white",
        month: props.date.month,
        year: props.date.year,
        onChangeDate: ($event) => emit("changeDate", $event)
      }, null, _parent));
      _push(`<div class="py-2 text-white border-b-2 border-gray-900" data-v-632b377b><table class="w-full" data-v-632b377b><thead data-v-632b377b><tr class="text-center" data-v-632b377b><td class="w-3/12" data-v-632b377b><span class="${ssrRenderClass([{ "bg-yellow-700": isActive("ventas") }, "action-ventas"])}" data-v-632b377b> VENTAS </span></td><td class="w-3/12" data-v-632b377b><span class="${ssrRenderClass([{ "bg-yellow-600": isActive("pc") }, "action-ventas"])}" data-v-632b377b> PC </span></td><td class="w-3/12" data-v-632b377b><span class="${ssrRenderClass([{ "bg-yellow-500": isActive("pp") }, "action-ventas"])}" data-v-632b377b> PP </span></td><td class="w-3/12" data-v-632b377b><span class="${ssrRenderClass([{ "bg-yellow-300": isActive("c") }, "action-ventas"])}" data-v-632b377b> C </span></td></tr></thead><tbody data-v-632b377b><tr class="text-center" data-v-632b377b><td class="p-2" data-v-632b377b> $${ssrInterpolate(totalsVentas.value.ventas)}</td><td class="p-2" data-v-632b377b> $${ssrInterpolate(totalsVentas.value.pc)}</td><td class="p-2" data-v-632b377b> $${ssrInterpolate(totalsVentas.value.pp)}</td><td class="p-2" data-v-632b377b> $${ssrInterpolate(totalsVentas.value.c)}</td></tr></tbody></table></div><div class="px-4 py-2" data-v-632b377b>`);
      _push(ssrRenderComponent(Calendar, {
        month: props.date.month,
        "special-days": specialDays.value,
        year: props.date.year,
        onOnSpecialDays: ($event) => showCalendarModal($event),
        class: "text-white"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$S, {
        "data-calendar": dataCalendar.value,
        show: showingModal.value,
        onClose: ($event) => showingModal.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardCalendar/VentasCalendar.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const VentasCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-632b377b"]]);
const VentasCalendar$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VentasCalendar
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$O = {
  __name: "FormDepositoModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: "create"
    },
    deposito: {
      type: Object,
      required: false
    }
  },
  emits: ["close", "addDeposito", "editDeposito"],
  setup(__props, { emit }) {
    const props = __props;
    const listBancos = ref([]);
    const form = reactive({
      "nombre": "",
      "cantidad": "",
      "banco_id": "",
      "hasErrors": false,
      "errors": [],
      "error": "",
      "recentlySuccessful": false,
      "processing": false
    });
    const titleModal = computed(() => {
      if (props.typeForm === "create") {
        restForm();
        return "Nuevo Deposito";
      } else {
        form.nombre = props.deposito.nombre;
        form.cantidad = props.deposito.cantidad;
        form.banco_id = props.deposito.banco_id;
        return "Actualizar Deposito";
      }
    });
    function restForm() {
      form.cantidad = "";
      form.nombre = "";
      form.banco_id = "";
      form.hasErrors = false;
      form.errors = [];
      form.error = "";
    }
    const close = () => {
      emit("close");
    };
    const createOrUpdate = () => {
      if (props.typeForm === "create") {
        create();
      } else {
        update();
      }
    };
    const create = () => {
      axios$1.post(
        route("ingresos.store"),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("addDeposito", resp.data);
        form.recentlySuccessful = true;
        restForm();
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.hasOwnProperty("response")) {
          if (error.response.data.hasOwnProperty("errors")) {
            const errors = error.response.data.errors;
            for (let error2 in errors) {
              form.errors[error2] = errors[error2][0];
            }
            form.error = error.response.data.message;
          } else {
            if (error.response.data.hasOwnProperty("message")) {
              form.error = error.response.data.message;
            } else {
              form.error = "Error CREATE DEPOSITO";
            }
          }
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    const update = () => {
      axios$1.put(
        route("ingresos.update", props.deposito.id),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("addDeposito", resp.data);
        form.recentlySuccessful = true;
        restForm();
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.hasOwnProperty("response")) {
          if (error.response.data.hasOwnProperty("errors")) {
            const errors = error.response.data.errors;
            for (let error2 in errors) {
              form.errors[error2] = errors[error2][0];
            }
            form.error = error.response.data.message;
          } else {
            if (error.response.data.hasOwnProperty("message")) {
              form.error = error.response.data.message;
            } else {
              form.error = "ERROR UPDATE DEPOSITO";
            }
          }
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    const getBancos = async () => {
      const resp = await axios$1.get(route("bancos.index"));
      listBancos.value = resp.data;
    };
    onBeforeMount(() => {
      getBancos();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-b-4 border-gray-600"${_scopeId}><div class="px-4 py-1 text-center"${_scopeId}><span class="font-bold text-white"${_scopeId}>${ssrInterpolate(unref(titleModal))}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b-4 border-gray-600" }, [
                createVNode("div", { class: "px-4 py-1 text-center" }, [
                  createVNode("span", { class: "font-bold text-white" }, toDisplayString(unref(titleModal)), 1),
                  createVNode(_sfc_main$1B, {
                    message: form.error,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "nombre",
              value: "N\xFAm Deposito:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "nombre",
              name: "nombre",
              type: "text",
              modelValue: form.nombre,
              "onUpdate:modelValue": ($event) => form.nombre = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.nombre,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "cantidad",
              value: "Cantidad:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "cantidad",
              name: "cantidad",
              type: "text",
              pattern: "^\\d*(\\.\\d{0,2})?$",
              modelValue: form.cantidad,
              "onUpdate:modelValue": ($event) => form.cantidad = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.cantidad,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "banco_id",
              value: "Banco:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$11, {
              modelValue: form.banco_id,
              "onUpdate:modelValue": ($event) => form.banco_id = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(listBancos.value, (banco) => {
                    _push3(`<option${ssrRenderAttr("value", banco.id)}${_scopeId2}>${ssrInterpolate(banco.nombre)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(listBancos.value, (banco) => {
                      return openBlock(), createBlock("option", {
                        key: banco.id,
                        value: banco.id
                      }, toDisplayString(banco.nombre), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.fechaDePago,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end px-10 py-2 border-gray-600 border-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              type: "submit",
              disabled: form.processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$12, {
                    inprogress: form.processing
                  }, null, _parent3, _scopeId2));
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"${_scopeId2}><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"${_scopeId2}></path></svg>Guardar `);
                } else {
                  return [
                    createVNode(_sfc_main$12, {
                      inprogress: form.processing
                    }, null, 8, ["inprogress"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      class: "w-6 h-5",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                    ])),
                    createTextVNode("Guardar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(($event) => createOrUpdate(), ["prevent"])
              }, [
                createVNode("div", { class: "grid grid-cols-2 gap-2 px-4 py-2 text-sm" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "nombre",
                      value: "N\xFAm Deposito:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "nombre",
                      name: "nombre",
                      type: "text",
                      modelValue: form.nombre,
                      "onUpdate:modelValue": ($event) => form.nombre = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.nombre,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "cantidad",
                      value: "Cantidad:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "cantidad",
                      name: "cantidad",
                      type: "text",
                      pattern: "^\\d*(\\.\\d{0,2})?$",
                      modelValue: form.cantidad,
                      "onUpdate:modelValue": ($event) => form.cantidad = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.cantidad,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "banco_id",
                      value: "Banco:"
                    }),
                    createVNode(_sfc_main$11, {
                      modelValue: form.banco_id,
                      "onUpdate:modelValue": ($event) => form.banco_id = $event
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(listBancos.value, (banco) => {
                          return openBlock(), createBlock("option", {
                            key: banco.id,
                            value: banco.id
                          }, toDisplayString(banco.nombre), 9, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.fechaDePago,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end px-10 py-2 border-gray-600 border-y-4" }, [
                  createVNode(_sfc_main$1J, {
                    type: "submit",
                    disabled: form.processing
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$12, {
                        inprogress: form.processing
                      }, null, 8, ["inprogress"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        class: "w-6 h-5",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                      ])),
                      createTextVNode("Guardar ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/FormDepositoModal.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const FormDepositoModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$O
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$N = {
  __name: "ButtonPres",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ButtonPres.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const _sfc_main$M = {
  __name: "ItemDepositoDetails",
  __ssrInlineRender: true,
  props: {
    deposito: {
      type: Object,
      required: true
    },
    facturas: {
      type: Object,
      required: true
    }
  },
  emits: ["addFactura", "edit", "delete", "changeStatus"],
  setup(__props, { emit }) {
    const props = __props;
    const facturaIdAdd = ref("");
    const addFactura = () => {
      if (facturaIdAdd.value !== "") {
        props.deposito.error = "";
        const form = {
          factura_id: facturaIdAdd.value,
          deposito_id: props.deposito.id
        };
        emit("addFactura", form);
      } else {
        props.deposito.error = "FACTURA INVALIDA";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td>#${ssrInterpolate(props.deposito.nombre)}</td><td>$${ssrInterpolate(unref(formatoMoney)(props.deposito.cantidad))}</td><td><!--[-->`);
      ssrRenderList(props.deposito.facturas, (factura) => {
        _push(`<span> #${ssrInterpolate(factura.referencia)}</span>`);
      });
      _push(`<!--]-->`);
      if (_ctx.$page.props.can["deposito.factura.create"]) {
        _push(`<div class="flex flex-row justify-center">`);
        _push(ssrRenderComponent(_sfc_main$13, {
          class: "w-50",
          modelValue: facturaIdAdd.value,
          "onUpdate:modelValue": ($event) => facturaIdAdd.value = $event,
          list: "facturas-catalogo",
          "name-option": "referencia",
          options: props.facturas
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$17, {
          class: "ml-1 h-7",
          onClick: ($event) => addFactura()
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1B, {
        message: props.deposito.error,
        class: "mt-2"
      }, null, _parent));
      _push(`</td><td>${ssrInterpolate(props.deposito.banco)}</td>`);
      if (_ctx.$page.props.can["deposito.edit"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$$, {
          onClick: ($event) => emit("edit", props.deposito)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.can["deposito.cerrar"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$N, {
          onClick: ($event) => emit("changeStatus", props.deposito),
          class: "py-1 rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (props.deposito.status_id === 1) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"${_scopeId}></path></svg>`);
              }
            } else {
              return [
                props.deposito.status_id === 1 ? (openBlock(), createBlock("svg", {
                  key: 0,
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  })
                ])) : (openBlock(), createBlock("svg", {
                  key: 1,
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.can["deposito.delete"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$1a, {
          onClick: ($event) => emit("delete", props.deposito)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" style="${ssrRenderStyle({ "fill": "white" })}" viewBox="0 0 96 96" xmlns:xlink="http://www.w3.org/1999/xlink"${_scopeId}><path d="m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  xmlns: "http://www.w3.org/2000/svg",
                  style: { "fill": "white" },
                  viewBox: "0 0 96 96",
                  "xmlns:xlink": "http://www.w3.org/1999/xlink"
                }, [
                  createVNode("path", { d: "m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr>`);
    };
  }
};
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/ItemDepositoDetails.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const ItemDepositoDetails = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$M
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$L = {
  __name: "DepositosModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    depositos: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "updateDepositos", "deleteDeposito", "addFactura"],
  setup(__props, { emit }) {
    const props = __props;
    const showingFormDeposito = ref(false);
    const deposito = ref({});
    const typeForm = ref("create");
    const listFacturas = ref([]);
    const showFormDeposito = (depositoSelect) => {
      if (depositoSelect === void 0) {
        typeForm.value = "create";
      } else {
        typeForm.value = "update";
        deposito.value = depositoSelect;
      }
      showingFormDeposito.value = true;
    };
    const changeStatus = (depositoChange) => {
      axios.put(route("ingresos.status", depositoChange.id)).then((resp) => {
        emit("updateDepositos");
      }).catch((error) => {
        let message;
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          message = error.response.data.message;
        } else {
          message = "Error DELETE OC";
        }
        alert(message);
      });
    };
    const deleteDeposito = (deposito2) => {
      axios.delete(route("ingresos.destroy", deposito2.id)).then(() => {
        emit("deleteDeposito");
      }).catch((error) => {
        let message;
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          message = error.response.data.message;
        } else {
          message = "Error DELETE OC";
        }
        alert(message);
      });
    };
    const getFacturas = async () => {
      const resp = await axios.get(route("facturas.catalogos"));
      listFacturas.value = resp.data;
    };
    const close = () => {
      emit("close");
    };
    watch(props, () => {
      if (props.show) {
        getFacturas();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> Depositos </span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}><span class="block font-bold text-center text-gray-300"${_scopeId}> Agregar </span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " Depositos ")
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("span", { class: "block font-bold text-center text-gray-300" }, " Agregar ")
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr${_scopeId2}><th${_scopeId2}><h3 class="mb-1"${_scopeId2}>Deposito</h3>`);
                  if (_ctx.$page.props.can["deposito.create"]) {
                    _push3(ssrRenderComponent(_sfc_main$17, {
                      class: "h-5",
                      onClick: ($event) => showFormDeposito()
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</th><th${_scopeId2}>CANTIDAD</th><th${_scopeId2}>FACTURA</th><th${_scopeId2}>BANCO</th>`);
                  if (_ctx.$page.props.can["deposito.edit"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.can["deposito.cerrar"]) {
                    _push3(`<th${_scopeId2}>CERRAR</th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.can["deposito.delete"]) {
                    _push3(`<th${_scopeId2}>ELIMINAR</th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</tr>`);
                } else {
                  return [
                    createVNode("tr", null, [
                      createVNode("th", null, [
                        createVNode("h3", { class: "mb-1" }, "Deposito"),
                        _ctx.$page.props.can["deposito.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                          key: 0,
                          class: "h-5",
                          onClick: ($event) => showFormDeposito()
                        }, null, 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("th", null, "CANTIDAD"),
                      createVNode("th", null, "FACTURA"),
                      createVNode("th", null, "BANCO"),
                      _ctx.$page.props.can["deposito.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                      _ctx.$page.props.can["deposito.cerrar"] ? (openBlock(), createBlock("th", { key: 1 }, "CERRAR")) : createCommentVNode("", true),
                      _ctx.$page.props.can["deposito.delete"] ? (openBlock(), createBlock("th", { key: 2 }, "ELIMINAR")) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.depositos, (deposito2) => {
                    _push3(ssrRenderComponent(_sfc_main$M, {
                      key: deposito2.nombre,
                      deposito: deposito2,
                      facturas: listFacturas.value,
                      onEdit: ($event) => showFormDeposito($event),
                      onDelete: ($event) => deleteDeposito($event),
                      onAddFactura: ($event) => emit("addFactura", $event),
                      onChangeStatus: ($event) => changeStatus($event)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.depositos, (deposito2) => {
                      return openBlock(), createBlock(_sfc_main$M, {
                        key: deposito2.nombre,
                        deposito: deposito2,
                        facturas: listFacturas.value,
                        onEdit: ($event) => showFormDeposito($event),
                        onDelete: ($event) => deleteDeposito($event),
                        onAddFactura: ($event) => emit("addFactura", $event),
                        onChangeStatus: ($event) => changeStatus($event)
                      }, null, 8, ["deposito", "facturas", "onEdit", "onDelete", "onAddFactura", "onChangeStatus"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$O, {
              show: showingFormDeposito.value,
              "type-form": typeForm.value,
              deposito: deposito.value,
              onAddDeposito: ($event) => emit("updateDepositos", $event),
              onClose: ($event) => showingFormDeposito.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("h3", { class: "mb-1" }, "Deposito"),
                      _ctx.$page.props.can["deposito.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                        key: 0,
                        class: "h-5",
                        onClick: ($event) => showFormDeposito()
                      }, null, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    createVNode("th", null, "CANTIDAD"),
                    createVNode("th", null, "FACTURA"),
                    createVNode("th", null, "BANCO"),
                    _ctx.$page.props.can["deposito.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                    _ctx.$page.props.can["deposito.cerrar"] ? (openBlock(), createBlock("th", { key: 1 }, "CERRAR")) : createCommentVNode("", true),
                    _ctx.$page.props.can["deposito.delete"] ? (openBlock(), createBlock("th", { key: 2 }, "ELIMINAR")) : createCommentVNode("", true)
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.depositos, (deposito2) => {
                    return openBlock(), createBlock(_sfc_main$M, {
                      key: deposito2.nombre,
                      deposito: deposito2,
                      facturas: listFacturas.value,
                      onEdit: ($event) => showFormDeposito($event),
                      onDelete: ($event) => deleteDeposito($event),
                      onAddFactura: ($event) => emit("addFactura", $event),
                      onChangeStatus: ($event) => changeStatus($event)
                    }, null, 8, ["deposito", "facturas", "onEdit", "onDelete", "onAddFactura", "onChangeStatus"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$O, {
                show: showingFormDeposito.value,
                "type-form": typeForm.value,
                deposito: deposito.value,
                onAddDeposito: ($event) => emit("updateDepositos", $event),
                onClose: ($event) => showingFormDeposito.value = false
              }, null, 8, ["show", "type-form", "deposito", "onAddDeposito", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/DepositosModal.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const DepositosModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$L
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$K = {
  __name: "ItemCliente",
  __ssrInlineRender: true,
  props: {
    cliente: {
      type: Object,
      required: true
    },
    checked: {
      type: [Array, Boolean],
      default: false
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-white border-b border-white" }, _attrs))}><div class="relative border-l-2 border-transparent"><input class="absolute z-10 w-full h-8 opacity-0 cursor-pointer top-1" type="checkbox"${ssrRenderAttr("id", "check-" + __props.cliente.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(proxyChecked)) ? ssrLooseContain(unref(proxyChecked), null) : unref(proxyChecked)) ? " checked" : ""}><header class="flex items-center justify-between cursor-pointer select-none tab-label"${ssrRenderAttr("for", "check-" + __props.cliente.id)}><span class="font-bold uppercase text-md">${ssrInterpolate(props.cliente.nombre)}</span><div class="flex items-center"><div class="px-1 text-sm bg-blue-300 rounded-full">${ssrInterpolate(__props.total)}</div><div class="flex items-center justify-center w-7 h-7"><svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></header><div class="overflow-y-auto tab-content"><div class="px-1 pb-5">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/ItemCliente.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const ItemCliente = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$K
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = {
  __name: "ItemIngresoC",
  __ssrInlineRender: true,
  props: {
    ingreso: {
      type: Object,
      required: true
    }
  },
  emits: ["onShow"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td> #${ssrInterpolate(__props.ingreso.nombre)}</td><td> $${ssrInterpolate(unref(formatoMoney)(__props.ingreso.cantidad))}</td><td>`);
      _push(ssrRenderComponent(_sfc_main$1a, {
        class: "h-5",
        onClick: ($event) => emit("onShow", props.ingreso)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4" viewBox="0 0 16 16"${_scopeId}><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"${_scopeId}></path><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentColor",
                class: "h-4",
                viewBox: "0 0 16 16"
              }, [
                createVNode("path", { d: "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" }),
                createVNode("path", { d: "M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</td></tr>`);
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/ItemIngresoC.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const ItemIngresoC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$I = {
  __name: "ItemFacturaDeposito",
  __ssrInlineRender: true,
  props: {
    factura: {
      type: Object,
      required: true
    }
  },
  emits: ["remove"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td>`);
      if (_ctx.$page.props.can["deposito.factura.delete"]) {
        _push(ssrRenderComponent(_sfc_main$1a, {
          onClick: ($event) => emit("remove"),
          class: "px-1 py-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3" viewBox="0 0 16 16"${_scopeId}><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "currentColor",
                  class: "w-3 h-3",
                  viewBox: "0 0 16 16"
                }, [
                  createVNode("path", { d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` #${ssrInterpolate(props.factura.referencia)}</td><td>$${ssrInterpolate(unref(formatoMoney)(props.factura.cantidad))}</td><td>${ssrInterpolate(props.factura.fechaDePago)}</td></tr>`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/ItemFacturaDeposito.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const ItemFacturaDeposito = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$I
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$H = {
  __name: "FacturasDepositoModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    deposito: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "addFactura", "updateDepositos"],
  setup(__props, { emit }) {
    const props = __props;
    const listFacturas = ref([]);
    const textFactura = ref("");
    const facturaIdAdd = ref("");
    const getFacturas = async () => {
      const resp = await axios.get(route("facturas.catalogos"));
      listFacturas.value = resp.data;
    };
    const deleteFactura = (indexFactura) => {
      axios.delete(route("ingresos.facturas.destroy", props.deposito.id), {
        params: {
          factura_id: props.deposito.facturas[indexFactura].id
        }
      }).then(() => {
        props.deposito.error = "";
        props.deposito.facturas.splice(indexFactura, 1);
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        emit("updateDepositos");
      }).catch((error) => {
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          props.deposito.error = error.response.data.message;
        } else {
          props.deposito.error = "Error DELETE OC";
        }
      });
    };
    const addFactura = () => {
      if (facturaIdAdd.value !== "") {
        props.deposito.error = "";
        const form = {
          factura_id: facturaIdAdd.value,
          deposito_id: props.deposito.id
        };
        textFactura.value = "";
        emit("addFactura", form);
      } else {
        props.deposito.error = "FACTURA INVALIDA";
      }
    };
    const totalFacturas = computed(() => {
      let total = 0;
      props.deposito.facturas.forEach((fact) => {
        total += fact.cantidad;
      });
      return total;
    });
    const close = () => {
      listFacturas.value = [];
      props.deposito.error = "";
      facturaIdAdd.value = "";
      emit("close");
    };
    watch(props, () => {
      if (props.show == true) {
        getFacturas();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> #${ssrInterpolate(props.deposito.nombre)}</span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}></div><div class="flex justify-between"${_scopeId}><span class="font-bold text-center text-gray-300"${_scopeId}> Cantidad: ${ssrInterpolate(unref(formatoMoney)(props.deposito.cantidad))}</span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " #" + toDisplayString(props.deposito.nombre), 1)
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", { class: "font-bold text-center text-gray-300" }, " Cantidad: " + toDisplayString(unref(formatoMoney)(props.deposito.cantidad)), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr${_scopeId2}><th${_scopeId2}><h3 class="mb-1"${_scopeId2}>FACTURAS</h3>`);
                  if (_ctx.$page.props.can["deposito.factura.create"]) {
                    _push3(`<div class="flex flex-row justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$13, {
                      class: "w-50",
                      modelValue: facturaIdAdd.value,
                      "onUpdate:modelValue": ($event) => facturaIdAdd.value = $event,
                      value: textFactura.value,
                      list: "facturas-catalogo",
                      "name-option": "referencia",
                      options: listFacturas.value
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$17, {
                      class: "ml-1 h-7",
                      onClick: ($event) => addFactura()
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$1B, {
                    message: props.deposito.error,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</th><th${_scopeId2}>CANTIDAD <br${_scopeId2}>$${ssrInterpolate(unref(totalFacturas))}</th><th${_scopeId2}>FECHA</th></tr>`);
                } else {
                  return [
                    createVNode("tr", null, [
                      createVNode("th", null, [
                        createVNode("h3", { class: "mb-1" }, "FACTURAS"),
                        _ctx.$page.props.can["deposito.factura.create"] ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-row justify-center"
                        }, [
                          createVNode(_sfc_main$13, {
                            class: "w-50",
                            modelValue: facturaIdAdd.value,
                            "onUpdate:modelValue": ($event) => facturaIdAdd.value = $event,
                            value: textFactura.value,
                            list: "facturas-catalogo",
                            "name-option": "referencia",
                            options: listFacturas.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "options"]),
                          createVNode(_sfc_main$17, {
                            class: "ml-1 h-7",
                            onClick: ($event) => addFactura()
                          }, null, 8, ["onClick"])
                        ])) : createCommentVNode("", true),
                        createVNode(_sfc_main$1B, {
                          message: props.deposito.error,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("th", null, [
                        createTextVNode("CANTIDAD "),
                        createVNode("br"),
                        createTextVNode("$" + toDisplayString(unref(totalFacturas)), 1)
                      ]),
                      createVNode("th", null, "FECHA")
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.deposito.facturas, (factura, index) => {
                    _push3(ssrRenderComponent(_sfc_main$I, {
                      key: factura.referencia,
                      factura,
                      onRemove: ($event) => deleteFactura(index)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.deposito.facturas, (factura, index) => {
                      return openBlock(), createBlock(_sfc_main$I, {
                        key: factura.referencia,
                        factura,
                        onRemove: ($event) => deleteFactura(index)
                      }, null, 8, ["factura", "onRemove"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("h3", { class: "mb-1" }, "FACTURAS"),
                      _ctx.$page.props.can["deposito.factura.create"] ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-row justify-center"
                      }, [
                        createVNode(_sfc_main$13, {
                          class: "w-50",
                          modelValue: facturaIdAdd.value,
                          "onUpdate:modelValue": ($event) => facturaIdAdd.value = $event,
                          value: textFactura.value,
                          list: "facturas-catalogo",
                          "name-option": "referencia",
                          options: listFacturas.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "options"]),
                        createVNode(_sfc_main$17, {
                          class: "ml-1 h-7",
                          onClick: ($event) => addFactura()
                        }, null, 8, ["onClick"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$1B, {
                        message: props.deposito.error,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("th", null, [
                      createTextVNode("CANTIDAD "),
                      createVNode("br"),
                      createTextVNode("$" + toDisplayString(unref(totalFacturas)), 1)
                    ]),
                    createVNode("th", null, "FECHA")
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.deposito.facturas, (factura, index) => {
                    return openBlock(), createBlock(_sfc_main$I, {
                      key: factura.referencia,
                      factura,
                      onRemove: ($event) => deleteFactura(index)
                    }, null, 8, ["factura", "onRemove"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/FacturasDepositoModal.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const FacturasDepositoModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$H
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$G = {
  __name: "Depositos",
  __ssrInlineRender: true,
  emits: [""],
  setup(__props, { emit }) {
    const clientes = ref([]);
    const totalIngresos = ref({ total: 0 });
    const tab = ref("1");
    const searchText = ref("");
    const showingDepositos = ref(false);
    const showingFacturas = ref(false);
    const deposito = ref({});
    const updateDepositos = () => {
      search(searchText.value);
    };
    const addFacturaToDeposito = (form) => {
      const findedIndex = depositos.value.findIndex((dep) => {
        return dep.id == form.deposito_id;
      });
      axios.post(route("ingresos.facturas.store", form.deposito_id), form).then(() => {
        search(searchText.value);
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
      }).catch((error) => {
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          depositos.value[findedIndex].error = error.response.data.message;
        } else {
          depositos.value[findedIndex].error = "Error SET FACTURA";
        }
      });
    };
    const showFacturas = (newDeposito) => {
      deposito.value = newDeposito;
      showingFacturas.value = true;
    };
    const closeFacturasDeposito = () => {
      deposito.value = {};
      showingFacturas.value = false;
    };
    const search = async (newSearch) => {
      const params = pickBy({ status_id: tab.value, search: newSearch });
      const resp = await axios.get(route("ingresos.index"), { params });
      clientes.value = resp.data.clientesIngresos;
      totalIngresos.value = resp.data.totalIngresos;
    };
    onBeforeMount(() => {
      search();
    });
    const depositos = computed(() => {
      let auxDepositos = [];
      clientes.value.forEach((cliente) => {
        auxDepositos = auxDepositos.concat(cliente.ingresos);
      });
      if (showingFacturas.value) {
        const findedIndex = auxDepositos.findIndex((dep) => {
          return dep.id == deposito.value.id;
        });
        deposito.value = auxDepositos[findedIndex];
      }
      return auxDepositos;
    });
    let timeout;
    watch(searchText, (newSearch) => {
      if (timeout !== void 0) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        search(newSearch);
      }, 500);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-white" }, _attrs))}><div class="flex justify-around">`);
      _push(ssrRenderComponent(_sfc_main$1b, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$17, {
        class: "h-7",
        onClick: ($event) => showingDepositos.value = true
      }, null, _parent));
      _push(`</div><div class="w-full"><div class="mx-5 tabs-header"><span class="${ssrRenderClass([{ "active": tab.value === "1" }, "tab"])}"> ABIERTAS </span><span class="${ssrRenderClass([{ "active": tab.value === "2" }, "tab"])}"> CERRADAS </span></div><div class="-mx-2 overflow-hidden overflow-y-auto" style="${ssrRenderStyle({ "max-height": "65vh" })}"><!--[-->`);
      ssrRenderList(clientes.value, (cliente) => {
        _push(ssrRenderComponent(_sfc_main$K, {
          key: cliente.id,
          cliente,
          total: cliente.ingresos.length
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between p-2 m-1 mx-auto overflow-hidden bg-gray-900 shadow-xl sm:rounded-lg"${_scopeId}><table class="table-ingresos"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}> N\xFAm. Deposito </th><th${_scopeId}> Cantidad </th><th${_scopeId}> Factura </th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(cliente.ingresos, (ingreso, index) => {
                _push2(ssrRenderComponent(_sfc_main$J, {
                  key: ingreso.id + "-" + index,
                  ingreso,
                  onOnShow: ($event) => showFacturas($event)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between p-2 m-1 mx-auto overflow-hidden bg-gray-900 shadow-xl sm:rounded-lg" }, [
                  createVNode("table", { class: "table-ingresos" }, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, " N\xFAm. Deposito "),
                        createVNode("th", null, " Cantidad "),
                        createVNode("th", null, " Factura ")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(cliente.ingresos, (ingreso, index) => {
                        return openBlock(), createBlock(_sfc_main$J, {
                          key: ingreso.id + "-" + index,
                          ingreso,
                          onOnShow: ($event) => showFacturas($event)
                        }, null, 8, ["ingreso", "onOnShow"]);
                      }), 128))
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="px-4 py-1 border-t-4 border-gray-600 basis-1/3"><span class="text-lg font-bold text-white"> Total: ${ssrInterpolate(unref(formatoMoney)(totalIngresos.value.total))}</span></div></div>`);
      _push(ssrRenderComponent(_sfc_main$L, {
        show: showingDepositos.value,
        depositos: unref(depositos),
        onUpdateDepositos: ($event) => updateDepositos(),
        onDeleteDeposito: ($event) => updateDepositos(),
        onAddFactura: ($event) => addFacturaToDeposito($event),
        onClose: ($event) => showingDepositos.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$H, {
        show: showingFacturas.value,
        deposito: deposito.value,
        onAddFactura: ($event) => addFacturaToDeposito($event),
        onUpdateDepositos: ($event) => updateDepositos(),
        onClose: closeFacturasDeposito
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardDepositos/Depositos.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const Depositos = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$F = {
  __name: "ListDataInputOCS",
  __ssrInlineRender: true,
  props: {
    "modelValue": {
      require: true
    },
    "list": {
      require: true
    },
    "disabled": {
      default: false
    },
    "options": {
      default: []
    },
    "keyOption": {
      type: String,
      default: "id"
    },
    "nameOption": {
      type: String,
      default: "nombre"
    },
    "value": {
      default: ""
    },
    "cantidad": {
      default: "nombre",
      type: String
    }
  },
  emits: ["update:modelValue", "value"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const valueText = ref("");
    const error = computed(() => {
      if (valueText.value !== "" || props.modelValue != "") {
        if (valueText.value !== "") {
          const selectOpcion = props.options.find((opcion) => {
            return opcion[props.nameOption] == valueText.value;
          });
          if (selectOpcion !== void 0) {
            emit("update:modelValue", selectOpcion[props.keyOption]);
          } else {
            emit("update:modelValue", "");
            return true;
          }
        } else {
          const selectOpcion = props.options.find((opcion) => {
            return opcion[props.keyOption] == props.modelValue;
          });
          if (selectOpcion !== void 0) {
            valueText.value = selectOpcion[props.nameOption];
          }
        }
      } else {
        emit("update:modelValue", "");
      }
      return false;
    });
    const inputlist = ref(null);
    watch(props, () => {
      valueText.value = props.value;
    });
    onMounted(() => {
      if (inputlist.value.hasAttribute("autofocus")) {
        inputlist.value.focus();
      }
    });
    expose({ focus: () => inputlist.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-gray-600" }, _attrs))}><input type="text"${ssrRenderAttr("list", __props.list)} class="${ssrRenderClass([{ "border-red-400": unref(error), "text-red-400": unref(error) }, "w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300"])}"${ssrRenderAttr("value", valueText.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}><datalist${ssrRenderAttr("id", __props.list)}><!--[-->`);
      ssrRenderList(props.options, (opcion) => {
        _push(`<option${ssrRenderAttr("value", opcion[props.nameOption])}>${ssrInterpolate(opcion[props.nameOption] + "-" + opcion.cantidad)}</option>`);
      });
      _push(`<!--]--></datalist></div>`);
    };
  }
};
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ListDataInputOCS.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = {
  __name: "ItemFacturaDetails",
  __ssrInlineRender: true,
  props: {
    factura: {
      type: Object,
      required: true
    },
    ocs: {
      type: Object,
      required: true
    }
  },
  emits: ["addOc", "edit", "delete"],
  setup(__props, { emit }) {
    const props = __props;
    const ocIdAdd = ref("");
    const addOc = () => {
      if (ocIdAdd.value !== "") {
        props.factura.error = "";
        const form = {
          oc_id: ocIdAdd.value,
          factura_id: props.factura.id
        };
        emit("addOc", form);
      } else {
        props.factura.error = "OC INVALIDO";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td>#${ssrInterpolate(props.factura.referencia)}</td><td>$${ssrInterpolate(unref(formatoMoney)(props.factura.cantidad))}</td><td>$${ssrInterpolate(unref(formatoMoney)(props.factura.total_ocs))}</td><td><!--[-->`);
      ssrRenderList(props.factura.ocs, (oc) => {
        _push(`<span> #${ssrInterpolate(oc.nombre)}</span>`);
      });
      _push(`<!--]-->`);
      if (_ctx.$page.props.can["facturas.oc.store"]) {
        _push(`<div class="flex flex-row justify-center">`);
        _push(ssrRenderComponent(_sfc_main$F, {
          class: "w-50",
          modelValue: ocIdAdd.value,
          "onUpdate:modelValue": ($event) => ocIdAdd.value = $event,
          list: "ocs-catalogo",
          options: props.ocs
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$17, {
          class: "ml-1 h-7",
          onClick: ($event) => addOc()
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1B, {
        message: props.factura.error,
        class: "mt-2"
      }, null, _parent));
      _push(`</td><td>${ssrInterpolate(props.factura.fechaDePago)}</td>`);
      if (_ctx.$page.props.can["facturas.edit"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$$, {
          onClick: ($event) => emit("edit", props.factura)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.can["facturas.delete"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$1a, {
          onClick: ($event) => emit("delete", props.factura)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3" viewBox="0 0 16 16"${_scopeId}><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "currentColor",
                  class: "w-3 h-3",
                  viewBox: "0 0 16 16"
                }, [
                  createVNode("path", { d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr>`);
    };
  }
};
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardFacturas/ItemFacturaDetails.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const ItemFacturaDetails = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$E
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$D = {
  __name: "FormFacturaModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: "create"
    },
    factura: {
      type: Object,
      required: false
    }
  },
  emits: ["close", "addFactura", "editFactura"],
  setup(__props, { emit }) {
    const props = __props;
    const form = reactive({
      "cantidad": "",
      "referencia": "",
      "fechaDePago": "",
      "hasErrors": false,
      "errors": [],
      "error": "",
      "recentlySuccessful": false,
      "processing": false
    });
    const titleModal = computed(() => {
      if (props.typeForm === "create") {
        restForm();
        return "Nueva Factura";
      } else {
        form.cantidad = props.factura.cantidad;
        form.referencia = props.factura.referencia;
        form.fechaDePago = props.factura.fechaDePago;
        return "Actualizar Factura";
      }
    });
    function restForm() {
      form.cantidad = "";
      form.referencia = "";
      form.fechaDePago = "";
    }
    const close = () => {
      emit("close");
    };
    const createOrUpdate = () => {
      if (props.typeForm === "create") {
        create();
      } else {
        update();
      }
    };
    const create = () => {
      axios$1.post(
        route("facturas.store"),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then(() => {
        emit("addFactura");
        form.recentlySuccessful = true;
        restForm();
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          if (error.response.data.hasOwnProperty("message")) {
            form.error = error.response.data.message;
          } else {
            form.error = "Error CREATE FACTURA";
          }
        }
      }).then(() => {
        form.processing = false;
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    const update = () => {
      axios$1.put(
        route("facturas.update", props.factura.id),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("editFactura", resp.data);
        form.recentlySuccessful = true;
        restForm();
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        console.log(error);
        if (error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          if (error.response.data.hasOwnProperty("message")) {
            form.error = error.response.data.message;
          } else {
            form.error = "ERROR UPDATE FACTURA";
          }
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-b-4 border-gray-600"${_scopeId}><div class="px-4 py-1 text-center"${_scopeId}><span class="font-bold text-white"${_scopeId}>${ssrInterpolate(unref(titleModal))}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b-4 border-gray-600" }, [
                createVNode("div", { class: "px-4 py-1 text-center" }, [
                  createVNode("span", { class: "font-bold text-white" }, toDisplayString(unref(titleModal)), 1),
                  createVNode(_sfc_main$1B, {
                    message: form.error,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "referencia",
              value: "Referencia:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "referencia",
              name: "referencia",
              type: "text",
              modelValue: form.referencia,
              "onUpdate:modelValue": ($event) => form.referencia = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.referencia,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "cantidad",
              value: "Cantidad:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "cantidad",
              name: "cantidad",
              type: "text",
              pattern: "^\\d*(\\.\\d{0,2})?$",
              modelValue: form.cantidad,
              "onUpdate:modelValue": ($event) => form.cantidad = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.cantidad,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "fechaDePago",
              value: "Fecha De Pago:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "fechaDePago",
              name: "fecha_final",
              type: "date",
              modelValue: form.fechaDePago,
              "onUpdate:modelValue": ($event) => form.fechaDePago = $event,
              required: "",
              min: form.fechaInicial
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.fechaDePago,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end px-10 py-2 border-gray-600 border-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              type: "submit",
              disabled: form.processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$12, {
                    inprogress: form.processing
                  }, null, _parent3, _scopeId2));
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"${_scopeId2}><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"${_scopeId2}></path></svg>Guardar `);
                } else {
                  return [
                    createVNode(_sfc_main$12, {
                      inprogress: form.processing
                    }, null, 8, ["inprogress"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      class: "w-6 h-5",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                    ])),
                    createTextVNode("Guardar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(($event) => createOrUpdate(), ["prevent"])
              }, [
                createVNode("div", { class: "grid grid-cols-2 gap-2 px-4 py-2 text-sm" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "referencia",
                      value: "Referencia:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "referencia",
                      name: "referencia",
                      type: "text",
                      modelValue: form.referencia,
                      "onUpdate:modelValue": ($event) => form.referencia = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.referencia,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "cantidad",
                      value: "Cantidad:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "cantidad",
                      name: "cantidad",
                      type: "text",
                      pattern: "^\\d*(\\.\\d{0,2})?$",
                      modelValue: form.cantidad,
                      "onUpdate:modelValue": ($event) => form.cantidad = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.cantidad,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "fechaDePago",
                      value: "Fecha De Pago:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "fechaDePago",
                      name: "fecha_final",
                      type: "date",
                      modelValue: form.fechaDePago,
                      "onUpdate:modelValue": ($event) => form.fechaDePago = $event,
                      required: "",
                      min: form.fechaInicial
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.fechaDePago,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end px-10 py-2 border-gray-600 border-y-4" }, [
                  createVNode(_sfc_main$1J, {
                    type: "submit",
                    disabled: form.processing
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$12, {
                        inprogress: form.processing
                      }, null, 8, ["inprogress"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        class: "w-6 h-5",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                      ])),
                      createTextVNode("Guardar ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardFacturas/FormFacturaModal.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const FormFacturaModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$D
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$C = {
  __name: "FacturasModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    facturas: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "addFactura", "addOc"],
  setup(__props, { emit }) {
    const props = __props;
    const showingFormFactura = ref(false);
    const factura = ref({});
    const typeForm = ref("create");
    const listOcs = ref([]);
    const showFormFactura = (facturaSelect) => {
      if (facturaSelect === void 0) {
        typeForm.value = "create";
      } else {
        typeForm.value = "update";
        factura.value = facturaSelect;
      }
      showingFormFactura.value = true;
    };
    const getOcs = async () => {
      const resp = await axios.get(route("ocs.catalogos"));
      listOcs.value = resp.data;
    };
    const deleteFactura = (facturaSelected) => {
      props.facturas.findIndex((facturaFind) => {
        return facturaFind.id === facturaSelected.id;
      });
      axios.delete(route("facturas.destroy", facturaSelected.id)).then(() => {
        emit("addFactura");
        Inertia.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
      }).catch((error) => {
        console.log(error);
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          alert(error.response.data.message);
        } else {
          alert("ERROR DELETE FACTURA");
        }
      });
    };
    const close = () => {
      emit("close");
    };
    watch(props, () => {
      if (props.show) {
        getOcs();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> Facturas </span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}><span class="block font-bold text-center text-gray-300"${_scopeId}> Agregar </span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " Facturas ")
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("span", { class: "block font-bold text-center text-gray-300" }, " Agregar ")
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr${_scopeId2}><th${_scopeId2}><h3 class="mb-1"${_scopeId2}>FACTURA</h3>`);
                  if (_ctx.$page.props.can["facturas.create"]) {
                    _push3(ssrRenderComponent(_sfc_main$17, {
                      class: "h-5",
                      onClick: ($event) => showFormFactura()
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</th><th${_scopeId2}>CANTIDAD</th><th${_scopeId2}>TOTAL OCS</th><th${_scopeId2}>OCS</th><th${_scopeId2}>FECHA</th>`);
                  if (_ctx.$page.props.can["facturas.edit"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.can["facturas.delete"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</tr>`);
                } else {
                  return [
                    createVNode("tr", null, [
                      createVNode("th", null, [
                        createVNode("h3", { class: "mb-1" }, "FACTURA"),
                        _ctx.$page.props.can["facturas.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                          key: 0,
                          class: "h-5",
                          onClick: ($event) => showFormFactura()
                        }, null, 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("th", null, "CANTIDAD"),
                      createVNode("th", null, "TOTAL OCS"),
                      createVNode("th", null, "OCS"),
                      createVNode("th", null, "FECHA"),
                      _ctx.$page.props.can["facturas.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                      _ctx.$page.props.can["facturas.delete"] ? (openBlock(), createBlock("th", { key: 1 })) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.facturas, (factura2, index) => {
                    _push3(ssrRenderComponent(_sfc_main$E, {
                      key: factura2.id + "" + index,
                      factura: factura2,
                      ocs: listOcs.value,
                      onEdit: ($event) => showFormFactura($event),
                      onDelete: ($event) => deleteFactura($event),
                      onAddOc: ($event) => emit("addOc", $event)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.facturas, (factura2, index) => {
                      return openBlock(), createBlock(_sfc_main$E, {
                        key: factura2.id + "" + index,
                        factura: factura2,
                        ocs: listOcs.value,
                        onEdit: ($event) => showFormFactura($event),
                        onDelete: ($event) => deleteFactura($event),
                        onAddOc: ($event) => emit("addOc", $event)
                      }, null, 8, ["factura", "ocs", "onEdit", "onDelete", "onAddOc"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$D, {
              show: showingFormFactura.value,
              "type-form": typeForm.value,
              factura: factura.value,
              onAddFactura: ($event) => emit("addFactura"),
              onEditFactura: ($event) => emit("addFactura"),
              onClose: ($event) => showingFormFactura.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("h3", { class: "mb-1" }, "FACTURA"),
                      _ctx.$page.props.can["facturas.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                        key: 0,
                        class: "h-5",
                        onClick: ($event) => showFormFactura()
                      }, null, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    createVNode("th", null, "CANTIDAD"),
                    createVNode("th", null, "TOTAL OCS"),
                    createVNode("th", null, "OCS"),
                    createVNode("th", null, "FECHA"),
                    _ctx.$page.props.can["facturas.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                    _ctx.$page.props.can["facturas.delete"] ? (openBlock(), createBlock("th", { key: 1 })) : createCommentVNode("", true)
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.facturas, (factura2, index) => {
                    return openBlock(), createBlock(_sfc_main$E, {
                      key: factura2.id + "" + index,
                      factura: factura2,
                      ocs: listOcs.value,
                      onEdit: ($event) => showFormFactura($event),
                      onDelete: ($event) => deleteFactura($event),
                      onAddOc: ($event) => emit("addOc", $event)
                    }, null, 8, ["factura", "ocs", "onEdit", "onDelete", "onAddOc"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$D, {
                show: showingFormFactura.value,
                "type-form": typeForm.value,
                factura: factura.value,
                onAddFactura: ($event) => emit("addFactura"),
                onEditFactura: ($event) => emit("addFactura"),
                onClose: ($event) => showingFormFactura.value = false
              }, null, 8, ["show", "type-form", "factura", "onAddFactura", "onEditFactura", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardFacturas/FacturasModal.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const FacturasModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = {
  __name: "ItemOcFactura",
  __ssrInlineRender: true,
  props: {
    oc: {
      type: Object,
      required: true
    }
  },
  emits: ["remove"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td>`);
      if (_ctx.$page.props.can["facturas.oc.delete"]) {
        _push(ssrRenderComponent(_sfc_main$1a, {
          onClick: ($event) => emit("remove"),
          class: "px-1 py-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3" viewBox="0 0 16 16"${_scopeId}><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "currentColor",
                  class: "w-3 h-3",
                  viewBox: "0 0 16 16"
                }, [
                  createVNode("path", { d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` #${ssrInterpolate(props.oc.nombre)}</td><td>$${ssrInterpolate(unref(formatoMoney)(props.oc.cantidad))}</td><td>${ssrInterpolate(props.oc.created_at)}</td></tr>`);
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardFacturas/ItemOcFactura.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const ItemOcFactura = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "OcsFacturaModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    factura: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "addOc"],
  setup(__props, { emit }) {
    const props = __props;
    const listOcs = ref([]);
    const textOcs = ref("");
    const ocIdAdd = ref("");
    const getOcs = async () => {
      const resp = await axios.get(route("ocs.catalogos"));
      listOcs.value = resp.data;
    };
    const deleteOc = (indexOc) => {
      axios.delete(route("facturas.ocs.destroy", props.factura.id), {
        params: {
          oc_id: props.factura.ocs[indexOc].id
        }
      }).then(() => {
        const cantidadRest = props.factura.ocs[indexOc].cantidad;
        props.factura.total_ocs = (props.factura.total_ocs - cantidadRest).toFixed(2);
        props.factura.ocs.splice(indexOc, 1);
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
      }).catch((error) => {
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          props.factura.error = error.response.data.message;
        } else {
          props.factura.error = "Error DELETE OC";
        }
      });
    };
    const addOc = () => {
      if (ocIdAdd.value !== "") {
        props.factura.error = "";
        const form = {
          oc_id: ocIdAdd.value,
          factura_id: props.factura.id
        };
        textOcs.value = "";
        emit("addOc", form);
      } else {
        props.factura.error = "OC INVALIDO";
      }
    };
    const close = () => {
      listOcs.value = [];
      props.factura.error = "";
      ocIdAdd.value = "";
      emit("close");
    };
    watch(props, () => {
      if (props.show == true) {
        getOcs();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> #${ssrInterpolate(props.factura.referencia)}</span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}></div><div class="flex justify-between"${_scopeId}><span class="font-bold text-center text-gray-300"${_scopeId}> Total: ${ssrInterpolate(props.factura.cantidad)}</span><span class="font-bold text-center text-gray-300"${_scopeId}> Fecha Pago: ${ssrInterpolate(props.factura.fechaDePago)}</span></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " #" + toDisplayString(props.factura.referencia), 1)
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }),
                  createVNode("div", { class: "flex justify-between" }, [
                    createVNode("span", { class: "font-bold text-center text-gray-300" }, " Total: " + toDisplayString(props.factura.cantidad), 1),
                    createVNode("span", { class: "font-bold text-center text-gray-300" }, " Fecha Pago: " + toDisplayString(props.factura.fechaDePago), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr${_scopeId2}><th${_scopeId2}><h3 class="mb-1"${_scopeId2}>OCS</h3>`);
                  if (_ctx.$page.props.can["facturas.oc.create"]) {
                    _push3(`<div class="flex flex-row justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$F, {
                      class: "w-50",
                      modelValue: ocIdAdd.value,
                      "onUpdate:modelValue": ($event) => ocIdAdd.value = $event,
                      value: textOcs.value,
                      list: "ocs-catalogo",
                      options: listOcs.value
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$17, {
                      class: "ml-1 h-7",
                      onClick: ($event) => addOc()
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_sfc_main$1B, {
                    message: props.factura.error,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</th><th${_scopeId2}>CANTIDAD <br${_scopeId2}> $${ssrInterpolate(props.factura.total_ocs)}</th><th${_scopeId2}>FECHA</th></tr>`);
                } else {
                  return [
                    createVNode("tr", null, [
                      createVNode("th", null, [
                        createVNode("h3", { class: "mb-1" }, "OCS"),
                        _ctx.$page.props.can["facturas.oc.create"] ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-row justify-center"
                        }, [
                          createVNode(_sfc_main$F, {
                            class: "w-50",
                            modelValue: ocIdAdd.value,
                            "onUpdate:modelValue": ($event) => ocIdAdd.value = $event,
                            value: textOcs.value,
                            list: "ocs-catalogo",
                            options: listOcs.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "options"]),
                          createVNode(_sfc_main$17, {
                            class: "ml-1 h-7",
                            onClick: ($event) => addOc()
                          }, null, 8, ["onClick"])
                        ])) : createCommentVNode("", true),
                        createVNode(_sfc_main$1B, {
                          message: props.factura.error,
                          class: "mt-2"
                        }, null, 8, ["message"])
                      ]),
                      createVNode("th", null, [
                        createTextVNode("CANTIDAD "),
                        createVNode("br"),
                        createTextVNode(" $" + toDisplayString(props.factura.total_ocs), 1)
                      ]),
                      createVNode("th", null, "FECHA")
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.factura.ocs, (oc, index) => {
                    _push3(ssrRenderComponent(_sfc_main$B, {
                      key: oc.id,
                      oc,
                      onRemove: ($event) => deleteOc(index)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.factura.ocs, (oc, index) => {
                      return openBlock(), createBlock(_sfc_main$B, {
                        key: oc.id,
                        oc,
                        onRemove: ($event) => deleteOc(index)
                      }, null, 8, ["oc", "onRemove"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("h3", { class: "mb-1" }, "OCS"),
                      _ctx.$page.props.can["facturas.oc.create"] ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-row justify-center"
                      }, [
                        createVNode(_sfc_main$F, {
                          class: "w-50",
                          modelValue: ocIdAdd.value,
                          "onUpdate:modelValue": ($event) => ocIdAdd.value = $event,
                          value: textOcs.value,
                          list: "ocs-catalogo",
                          options: listOcs.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "options"]),
                        createVNode(_sfc_main$17, {
                          class: "ml-1 h-7",
                          onClick: ($event) => addOc()
                        }, null, 8, ["onClick"])
                      ])) : createCommentVNode("", true),
                      createVNode(_sfc_main$1B, {
                        message: props.factura.error,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("th", null, [
                      createTextVNode("CANTIDAD "),
                      createVNode("br"),
                      createTextVNode(" $" + toDisplayString(props.factura.total_ocs), 1)
                    ]),
                    createVNode("th", null, "FECHA")
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.factura.ocs, (oc, index) => {
                    return openBlock(), createBlock(_sfc_main$B, {
                      key: oc.id,
                      oc,
                      onRemove: ($event) => deleteOc(index)
                    }, null, 8, ["oc", "onRemove"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardFacturas/OcsFacturaModal.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const OcsFacturaModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$z = {
  __name: "Facturas",
  __ssrInlineRender: true,
  emits: [""],
  setup(__props, { emit }) {
    const clientes = ref([]);
    const totalFacturas = ref({ total: 0 });
    const tab = ref("");
    const searchText = ref("");
    const showingFacturas = ref(false);
    const showingOcs = ref(false);
    const facturaSelect = ref({ id: -1 });
    const showOcsFactura = (factura) => {
      facturaSelect.value = factura;
      showingOcs.value = true;
    };
    const closeOcsFactura = () => {
      showingOcs.value = false;
      facturaSelect.value = { id: -1 };
    };
    const addFactura = () => {
      search(searchText.value);
    };
    const addOc = (form) => {
      const finIndexFactura = facturas.value.findIndex((fact) => {
        return fact.id == form.factura_id;
      });
      axios.post(route("facturas.ocs.store", form.factura_id), form).then(() => {
        search(searchText.value);
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
      }).catch((error) => {
        if (error.hasOwnProperty("response") && error.response.data.hasOwnProperty("message")) {
          facturas.value[finIndexFactura].error = error.response.data.message;
        } else {
          facturas.value[finIndexFactura].error = "Error add OC";
        }
      });
    };
    const search = async (newSearch) => {
      const params = pickBy({ status_id: tab.value, search: newSearch });
      const resp = await axios.get(route("facturas.index"), { params });
      clientes.value = resp.data.clientesFacturas;
      totalFacturas.value = resp.data.totalFacturas;
    };
    const facturas = computed(() => {
      let auxFacturas = [];
      clientes.value.forEach((cliente) => {
        auxFacturas = auxFacturas.concat(cliente.facturas);
      });
      if (showingOcs.value) {
        const findedIndex = auxFacturas.findIndex((fact) => {
          return fact.id == facturaSelect.value.id;
        });
        facturaSelect.value = auxFacturas[findedIndex];
      }
      return auxFacturas;
    });
    onBeforeMount(() => {
      search();
    });
    let timeout;
    watch(searchText, (newSearch) => {
      if (timeout !== void 0) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        search(newSearch);
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-white" }, _attrs))}><div class="flex justify-around">`);
      _push(ssrRenderComponent(_sfc_main$1b, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$17, {
        class: "h-7",
        onClick: ($event) => showingFacturas.value = true
      }, null, _parent));
      _push(`</div><div class="w-full"><div class="tabs-header"><span class="${ssrRenderClass([{ "active": tab.value === "" }, "tab"])}"> TODAS </span><span class="${ssrRenderClass([{ "active": tab.value === "1" }, "tab"])}"> ABIERTAS </span><span class="${ssrRenderClass([{ "active": tab.value === "2" }, "tab"])}"> CERRADAS </span></div><div class="-mx-2 overflow-hidden overflow-y-auto" style="${ssrRenderStyle({ "max-height": "65vh" })}">`);
      if (clientes.value.length === 0) {
        _push(ssrRenderComponent(SkeletonLoader, { style: { "height": "65vh" } }, null, _parent));
      } else {
        _push(`<div><!--[-->`);
        ssrRenderList(clientes.value, (cliente) => {
          _push(ssrRenderComponent(_sfc_main$K, {
            key: cliente.id,
            cliente,
            total: cliente.facturas.length
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(cliente.facturas, (factura) => {
                  _push2(ssrRenderComponent(_sfc_main$19, {
                    key: factura.id,
                    data: factura,
                    onOnShow: ($event) => showOcsFactura($event)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` #${ssrInterpolate(factura.referencia)}`);
                      } else {
                        return [
                          createTextVNode(" #" + toDisplayString(factura.referencia), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(cliente.facturas, (factura) => {
                    return openBlock(), createBlock(_sfc_main$19, {
                      key: factura.id,
                      data: factura,
                      onOnShow: ($event) => showOcsFactura($event)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" #" + toDisplayString(factura.referencia), 1)
                      ]),
                      _: 2
                    }, 1032, ["data", "onOnShow"]);
                  }), 128))
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="px-4 py-1 border-t-4 border-gray-600 basis-1/3"><span class="text-lg font-bold text-white"> Total: ${ssrInterpolate(unref(formatoMoney)(totalFacturas.value.total))}</span></div></div>`);
      _push(ssrRenderComponent(_sfc_main$C, {
        show: showingFacturas.value,
        facturas: unref(facturas),
        onAddFactura: ($event) => addFactura(),
        onAddOc: ($event) => addOc($event),
        onClose: ($event) => showingFacturas.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$A, {
        show: showingOcs.value,
        factura: facturaSelect.value,
        onAddOc: ($event) => addOc($event),
        onClose: closeOcsFactura
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardFacturas/Facturas.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const Facturas = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "FormOcModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: "create"
    },
    oc: {
      type: Object,
      required: false
    },
    venta: {
      type: Object,
      required: false
    }
  },
  emits: ["close", "addOc", "editOc"],
  setup(__props, { emit }) {
    const props = __props;
    let nowDate = new Date();
    const month = nowDate.getMonth() + 1;
    nowDate = nowDate.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate());
    const form = reactive({
      "nombre": "",
      "cantidad": "",
      "fecha_alta": nowDate,
      "status_id": "",
      "venta_id": "",
      "hasErrors": false,
      "errors": [],
      "error": "",
      "recentlySuccessful": false,
      "processing": false
    });
    const titleModal = computed(() => {
      if (props.typeForm === "create") {
        restForm();
        form.fecha_alta = nowDate;
        return "Nueva Oc";
      } else {
        form.nombre = props.oc.nombre;
        form.cantidad = props.oc.cantidad;
        form.fecha_alta = props.oc.fecha_alta.split("/").reverse().join("-");
        form.status_id = props.oc.status_id;
        form.venta_id = props.oc.venta_id;
        return "Actualizar Oc";
      }
    });
    function restForm() {
      form.nombre = "";
      form.cantidad = "";
      form.fecha_alta = "";
      form.status_id = "";
      form.venta_id = "";
      form.venta_id = props.venta.id;
      form.hasErrors = false;
      form.errors = {};
      form.error = "";
    }
    const close = () => {
      form.hasErrors = false;
      form.errors = {};
      form.error = "";
      emit("close");
    };
    const createOrUpdate = () => {
      if (props.typeForm === "create") {
        create();
      } else {
        update();
      }
    };
    const create = () => {
      axios$1.post(
        route("ocs.store"),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("addOc", resp.data);
        form.recentlySuccessful = true;
        restForm();
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          if (error.response.data.hasOwnProperty("message")) {
            form.error = error.response.data.message;
          } else {
            form.error = "Error CREATE OC";
          }
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    const update = () => {
      axios$1.put(
        route("ocs.update", props.oc.id),
        form,
        {
          onUploadProgress: () => {
            form.processing = true;
          }
        }
      ).then((resp) => {
        emit("editOc", resp.data);
        form.recentlySuccessful = true;
        restForm();
        Inertia$1.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
        setTimeout(() => {
          close();
        }, 500);
      }).catch((error) => {
        form.hasErrors = true;
        if (error.response.data.hasOwnProperty("errors")) {
          const errors = error.response.data.errors;
          for (let error2 in errors) {
            form.errors[error2] = errors[error2][0];
          }
          form.error = error.response.data.message;
        } else {
          if (error.response.data.hasOwnProperty("message")) {
            form.error = error.response.data.message;
          } else {
            form.error = "ERROR UPDATE OC";
          }
        }
      }).then(() => {
        form.processing = false;
        setTimeout(() => {
          form.recentlySuccessful = false;
        }, 500);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-b-4 border-gray-600"${_scopeId}><div class="px-4 py-1 text-center"${_scopeId}><span class="font-bold text-white"${_scopeId}>${ssrInterpolate(unref(titleModal))}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b-4 border-gray-600" }, [
                createVNode("div", { class: "px-4 py-1 text-center" }, [
                  createVNode("span", { class: "font-bold text-white" }, toDisplayString(unref(titleModal)), 1),
                  createVNode(_sfc_main$1B, {
                    message: form.error,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "nombre",
              value: "Nombre:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "nombre",
              name: "nombre",
              type: "text",
              modelValue: form.nombre,
              "onUpdate:modelValue": ($event) => form.nombre = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.nombre,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "cantidad",
              value: "Cantidad:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "cantidad",
              name: "cantidad",
              type: "text",
              pattern: "^\\d*(\\.\\d{0,2})?$",
              modelValue: form.cantidad,
              "onUpdate:modelValue": ($event) => form.cantidad = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.cantidad,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "fecha_alta",
              value: "Fecha Alta:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "fecha_alta",
              name: "fecha_alta",
              type: "date",
              min: "2000-01-02",
              modelValue: form.fecha_alta,
              "onUpdate:modelValue": ($event) => form.fecha_alta = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.errors.fecha_alta,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end px-10 py-2 border-gray-600 border-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              type: "submit",
              disabled: form.processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$12, {
                    inprogress: form.processing
                  }, null, _parent3, _scopeId2));
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"${_scopeId2}><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"${_scopeId2}></path></svg>Guardar `);
                } else {
                  return [
                    createVNode(_sfc_main$12, {
                      inprogress: form.processing
                    }, null, 8, ["inprogress"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      class: "w-6 h-5",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                    ])),
                    createTextVNode("Guardar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(($event) => createOrUpdate(), ["prevent"])
              }, [
                createVNode("div", { class: "grid grid-cols-2 gap-2 px-4 py-2 text-sm" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "nombre",
                      value: "Nombre:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "nombre",
                      name: "nombre",
                      type: "text",
                      modelValue: form.nombre,
                      "onUpdate:modelValue": ($event) => form.nombre = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.nombre,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "cantidad",
                      value: "Cantidad:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "cantidad",
                      name: "cantidad",
                      type: "text",
                      pattern: "^\\d*(\\.\\d{0,2})?$",
                      modelValue: form.cantidad,
                      "onUpdate:modelValue": ($event) => form.cantidad = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.cantidad,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "fecha_alta",
                      value: "Fecha Alta:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "fecha_alta",
                      name: "fecha_alta",
                      type: "date",
                      min: "2000-01-02",
                      modelValue: form.fecha_alta,
                      "onUpdate:modelValue": ($event) => form.fecha_alta = $event,
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: form.errors.fecha_alta,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end px-10 py-2 border-gray-600 border-y-4" }, [
                  createVNode(_sfc_main$1J, {
                    type: "submit",
                    disabled: form.processing
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$12, {
                        inprogress: form.processing
                      }, null, 8, ["inprogress"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        class: "w-6 h-5",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                      ])),
                      createTextVNode("Guardar ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/FormOcModal.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const FormOcModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = {
  __name: "TextArea",
  __ssrInlineRender: true,
  props: {
    modelValue: String | Number
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const textarea = ref(null);
    onMounted(() => {
      if (textarea.value.hasAttribute("autofocus")) {
        textarea.value.focus();
      }
    });
    expose({ focus: () => textarea.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
        ref_key: "textarea",
        ref: textarea,
        class: "w-full py-1 text-sm text-white bg-gray-800 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 disabled:bg-gray-300",
        value: __props.modelValue
      }, _attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextArea.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = {
  __name: "FormVentaModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    typeForm: {
      type: String,
      default: "create"
    },
    venta: {
      type: Object,
      required: false
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const form = useForm({
      "monto_id": "",
      "nombre": "",
      "comentario": "",
      "fechaInicial": "",
      "fechaFinal": "",
      "periodos": "",
      "tipo_id": "",
      "cantidad": "",
      "ceco_id": "",
      "servicio_id": ""
    });
    const listServicios = ref([]);
    const listCecos = ref([]);
    const listTipos = ref([]);
    const titleModal = computed(() => {
      if (props.typeForm === "create") {
        form.monto_id = "";
        form.nombre = "";
        form.comentario = "";
        form.fechaInicial = "";
        form.fechaFinal = "";
        form.periodos = "";
        form.tipo_id = "";
        form.cantidad = "";
        form.ceco_id = "";
        form.servicio_id = "";
        return "Nueva Venta";
      } else {
        form.monto_id = props.venta.monto_id;
        form.nombre = props.venta.nombre;
        form.comentario = props.venta.comentario;
        form.fechaInicial = props.venta.fechaInicial;
        form.fechaFinal = props.venta.fechaFinal;
        form.periodos = props.venta.periodos;
        form.tipo_id = props.venta.tipo_id;
        form.cantidad = props.venta.cantidad;
        form.ceco_id = props.venta.ceco_id;
        form.servicio_id = props.venta.servicio_id;
        return "Actualizar Venta";
      }
    });
    const close = () => {
      emit("close");
    };
    const getCatalogos = async () => {
      const respCecos = axios$1.get(route("cecos.catalogo"));
      const respServicios = axios$1.get(route("servicios.catalogo"));
      const respTipos = axios$1.get(route("tipos.catalogo"));
      const resps = await Promise.all([
        respCecos,
        respServicios,
        respTipos
      ]);
      listCecos.value = resps[0].data;
      listServicios.value = resps[1].data;
      listTipos.value = resps[2].data;
    };
    const listMontos = computed(() => {
      const servicio = listServicios.value.find((serv) => {
        return serv.id === form.servicio_id;
      });
      if (servicio !== void 0)
        return servicio.montos;
      return [];
    });
    const createOrUpdate = () => {
      if (props.typeForm === "create") {
        create();
      } else {
        update();
      }
    };
    const create = () => {
      form.post(route("ventas.store"), {
        preserveScroll: true,
        preserveState: true,
        only: ["clientes", "totalVentas", "errors"],
        onSuccess: () => {
          form.reset();
          close();
        }
      });
    };
    const update = () => {
      form.put(route("ventas.update", props.venta.id), {
        preserveScroll: true,
        preserveState: true,
        only: ["clientes", "totalVentas", "errors"],
        onSuccess: () => {
          form.reset();
          close();
        }
      });
    };
    watch(props, () => {
      if (props.show == true) {
        getCatalogos();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="border-b-4 border-gray-600"${_scopeId}><div class="px-4 py-1 text-center"${_scopeId}><span class="font-bold text-white"${_scopeId}>${ssrInterpolate(unref(titleModal))}</span>`);
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b-4 border-gray-600" }, [
                createVNode("div", { class: "px-4 py-1 text-center" }, [
                  createVNode("span", { class: "font-bold text-white" }, toDisplayString(unref(titleModal)), 1),
                  createVNode(_sfc_main$1B, {
                    message: unref(form).error,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}><div class="grid grid-cols-2 gap-2 px-4 py-2 text-sm"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "nombre",
              value: "Nombre:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "nombre",
              name: "nombre",
              type: "text",
              modelValue: unref(form).nombre,
              "onUpdate:modelValue": ($event) => unref(form).nombre = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.nombre,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, { value: "Ceco:" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$13, {
              modelValue: unref(form).ceco_id,
              "onUpdate:modelValue": ($event) => unref(form).ceco_id = $event,
              list: "cecos",
              options: listCecos.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.ceco_id,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, { value: "Servicio:" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$13, {
              modelValue: unref(form).servicio_id,
              "onUpdate:modelValue": ($event) => unref(form).servicio_id = $event,
              list: "servicios",
              options: listServicios.value
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, { value: "Monto:" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$13, {
              modelValue: unref(form).monto_id,
              "onUpdate:modelValue": ($event) => unref(form).monto_id = $event,
              list: "montos",
              "name-option": "cantidad",
              options: unref(listMontos),
              disabled: unref(form).servicio_id == ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.monto_id,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "cantidad",
              value: "Cantidad:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "cantidad-1",
              name: "cantidad-1",
              type: "number",
              modelValue: unref(form).cantidad,
              "onUpdate:modelValue": ($event) => unref(form).cantidad = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.cantidad,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "fechaInicio",
              value: "Fecha Inicial:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "fechaInicio",
              name: "fecha_inicio",
              type: "date",
              modelValue: unref(form).fechaInicial,
              "onUpdate:modelValue": ($event) => unref(form).fechaInicial = $event,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.fechaInicial,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "fechaFinal",
              value: "Fecha Final:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "fechaFinal",
              name: "fecha_final",
              type: "date",
              modelValue: unref(form).fechaFinal,
              "onUpdate:modelValue": ($event) => unref(form).fechaFinal = $event,
              required: "",
              min: unref(form).fechaInicial
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.fechaFinal,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "tipo",
              value: "Tipo:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$11, {
              id: "tipo",
              name: "tipo",
              modelValue: unref(form).tipo_id,
              "onUpdate:modelValue": ($event) => unref(form).tipo_id = $event,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" disabled${_scopeId2}> Seleciona un Tipo</option><!--[-->`);
                  ssrRenderList(listTipos.value, (tipo) => {
                    _push3(`<option${ssrRenderAttr("value", tipo.id)}${_scopeId2}>${ssrInterpolate(tipo.nombre)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", {
                      value: "",
                      disabled: ""
                    }, " Seleciona un Tipo"),
                    (openBlock(true), createBlock(Fragment, null, renderList(listTipos.value, (tipo) => {
                      return openBlock(), createBlock("option", {
                        key: tipo.nombre,
                        value: tipo.id
                      }, toDisplayString(tipo.nombre), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.tipo_id,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "periodos",
              value: "Periodos:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$18, {
              id: "periodos",
              name: "periodos",
              type: "number",
              modelValue: unref(form).periodos,
              "onUpdate:modelValue": ($event) => unref(form).periodos = $event,
              required: "",
              maxlength: "30"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.periodos,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "comentario",
              value: "Comentarios:"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$x, {
              id: "comentario",
              name: "comentario",
              modelValue: unref(form).comentario,
              "onUpdate:modelValue": ($event) => unref(form).comentario = $event,
              maxlength: "255"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.periodos,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex justify-end px-10 py-2 border-gray-600 border-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, {
              type: "submit",
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$12, {
                    inprogress: unref(form).processing
                  }, null, _parent3, _scopeId2));
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-5" viewBox="0 0 16 16"${_scopeId2}><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"${_scopeId2}></path></svg>Guardar `);
                } else {
                  return [
                    createVNode(_sfc_main$12, {
                      inprogress: unref(form).processing
                    }, null, 8, ["inprogress"]),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "currentColor",
                      class: "w-6 h-5",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                    ])),
                    createTextVNode("Guardar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(($event) => createOrUpdate(), ["prevent"])
              }, [
                createVNode("div", { class: "grid grid-cols-2 gap-2 px-4 py-2 text-sm" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "nombre",
                      value: "Nombre:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "nombre",
                      name: "nombre",
                      type: "text",
                      modelValue: unref(form).nombre,
                      "onUpdate:modelValue": ($event) => unref(form).nombre = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.nombre,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, { value: "Ceco:" }),
                    createVNode(_sfc_main$13, {
                      modelValue: unref(form).ceco_id,
                      "onUpdate:modelValue": ($event) => unref(form).ceco_id = $event,
                      list: "cecos",
                      options: listCecos.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.ceco_id,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, { value: "Servicio:" }),
                    createVNode(_sfc_main$13, {
                      modelValue: unref(form).servicio_id,
                      "onUpdate:modelValue": ($event) => unref(form).servicio_id = $event,
                      list: "servicios",
                      options: listServicios.value
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, { value: "Monto:" }),
                    createVNode(_sfc_main$13, {
                      modelValue: unref(form).monto_id,
                      "onUpdate:modelValue": ($event) => unref(form).monto_id = $event,
                      list: "montos",
                      "name-option": "cantidad",
                      options: unref(listMontos),
                      disabled: unref(form).servicio_id == ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.monto_id,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "cantidad",
                      value: "Cantidad:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "cantidad-1",
                      name: "cantidad-1",
                      type: "number",
                      modelValue: unref(form).cantidad,
                      "onUpdate:modelValue": ($event) => unref(form).cantidad = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.cantidad,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "fechaInicio",
                      value: "Fecha Inicial:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "fechaInicio",
                      name: "fecha_inicio",
                      type: "date",
                      modelValue: unref(form).fechaInicial,
                      "onUpdate:modelValue": ($event) => unref(form).fechaInicial = $event,
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.fechaInicial,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "fechaFinal",
                      value: "Fecha Final:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "fechaFinal",
                      name: "fecha_final",
                      type: "date",
                      modelValue: unref(form).fechaFinal,
                      "onUpdate:modelValue": ($event) => unref(form).fechaFinal = $event,
                      required: "",
                      min: unref(form).fechaInicial
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.fechaFinal,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "tipo",
                      value: "Tipo:"
                    }),
                    createVNode(_sfc_main$11, {
                      id: "tipo",
                      name: "tipo",
                      modelValue: unref(form).tipo_id,
                      "onUpdate:modelValue": ($event) => unref(form).tipo_id = $event,
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode("option", {
                          value: "",
                          disabled: ""
                        }, " Seleciona un Tipo"),
                        (openBlock(true), createBlock(Fragment, null, renderList(listTipos.value, (tipo) => {
                          return openBlock(), createBlock("option", {
                            key: tipo.nombre,
                            value: tipo.id
                          }, toDisplayString(tipo.nombre), 9, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.tipo_id,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "periodos",
                      value: "Periodos:"
                    }),
                    createVNode(_sfc_main$18, {
                      id: "periodos",
                      name: "periodos",
                      type: "number",
                      modelValue: unref(form).periodos,
                      "onUpdate:modelValue": ($event) => unref(form).periodos = $event,
                      required: "",
                      maxlength: "30"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.periodos,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_sfc_main$1A, {
                      for: "comentario",
                      value: "Comentarios:"
                    }),
                    createVNode(_sfc_main$x, {
                      id: "comentario",
                      name: "comentario",
                      modelValue: unref(form).comentario,
                      "onUpdate:modelValue": ($event) => unref(form).comentario = $event,
                      maxlength: "255"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.periodos,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end px-10 py-2 border-gray-600 border-y-4" }, [
                  createVNode(_sfc_main$1J, {
                    type: "submit",
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$12, {
                        inprogress: unref(form).processing
                      }, null, 8, ["inprogress"]),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "currentColor",
                        class: "w-6 h-5",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
                      ])),
                      createTextVNode("Guardar ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/FormVentaModal.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const FormVentaModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = {
  __name: "ItemOc",
  __ssrInlineRender: true,
  props: {
    oc: {
      type: Object,
      required: true
    }
  },
  emits: ["edit", "delete"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td>#${ssrInterpolate(props.oc.nombre)}</td><td>$${ssrInterpolate(unref(formatoMoney)(props.oc.cantidad))}</td><td>${ssrInterpolate(props.oc.fecha_alta)}</td>`);
      if (_ctx.$page.props.can["ocs.edit"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$$, {
          onClick: ($event) => emit("edit", props.oc)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "w-4 h-4",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.can["ocs.delete"]) {
        _push(`<td>`);
        _push(ssrRenderComponent(_sfc_main$1a, {
          onClick: ($event) => emit("delete", props.oc)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3" viewBox="0 0 16 16"${_scopeId}><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "currentColor",
                  class: "w-3 h-3",
                  viewBox: "0 0 16 16"
                }, [
                  createVNode("path", { d: "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/ItemOc.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const ItemOc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {
  __name: "ItemVentaDatials",
  __ssrInlineRender: true,
  props: {
    venta: {
      type: Object,
      required: true
    }
  },
  emits: ["edit", "activeIva"],
  setup(__props, { emit }) {
    const props = __props;
    const ivaChecked = ref(props.venta.iva);
    const ventaShow = computed(() => {
      const auxVenta = { ...props.venta };
      if (ivaChecked.value) {
        const totalIva = auxVenta.sub_total * IVA;
        auxVenta.iva = formatoMoney(totalIva.toFixed(2));
        auxVenta.total = formatoMoney((auxVenta.sub_total + totalIva).toFixed(2));
      } else {
        auxVenta.iva = "";
        auxVenta.total = formatoMoney(auxVenta.sub_total.toFixed(2));
      }
      auxVenta.sub_total = formatoMoney(auxVenta.sub_total.toFixed(2));
      return auxVenta;
    });
    const isEditable = computed(() => {
      return props.venta.status_id == 1;
    });
    const eliminarVenta = (id) => {
      Inertia$1.delete(route("ventas.destroy", id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<tr${ssrRenderAttrs(_attrs)}><td>${ssrInterpolate(unref(ventaShow).ceco + "-" + unref(ventaShow).servicio)}</td><td>${ssrInterpolate(unref(ventaShow).comentario)}</td><td><div class="w-10 h-5 px-2 mx-2 bg-yellow-600 hover:bg-yellow-500 rounded-xl">`);
      if (ivaChecked.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></td><td>$${ssrInterpolate(unref(ventaShow).sub_total)}</td><td>$${ssrInterpolate(unref(ventaShow).iva)}</td><td>$${ssrInterpolate(unref(ventaShow).total)}</td><td>${ssrInterpolate(unref(ventaShow).fechaInicial)}</td>`);
      if (_ctx.$page.props.can["ventas.edit"]) {
        _push(`<td>`);
        if (unref(isEditable)) {
          _push(ssrRenderComponent(_sfc_main$$, {
            onClick: ($event) => emit("edit", props.venta)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "w-4 h-4",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.can["ventas.delete"]) {
        _push(`<td>`);
        if (unref(isEditable)) {
          _push(ssrRenderComponent(_sfc_main$1a, {
            onClick: ($event) => eliminarVenta(unref(ventaShow).id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg width="20" xmlns="http://www.w3.org/2000/svg" height="20" style="${ssrRenderStyle({ "fill": "white" })}" viewBox="0 0 96 96" xmlns:xlink="http://www.w3.org/1999/xlink"${_scopeId}><path d="m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z"${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    width: "20",
                    xmlns: "http://www.w3.org/2000/svg",
                    height: "20",
                    style: { "fill": "white" },
                    viewBox: "0 0 96 96",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                  }, [
                    createVNode("path", { d: "m24,78c0,4.968 4.029,9 9,9h30c4.968,0 9-4.032 9-9l6-48h-60l6,48zm33-39h6v39h-6v-39zm-12,0h6v39h-6v-39zm-12,0h6v39h-6v-39zm43.5-21h-19.5c0,0-1.344-6-3-6h-12c-1.659,0-3,6-3,6h-19.5c-2.487,0-4.5,2.013-4.5,4.5s0,4.5 0,4.5h66c0,0 0-2.013 0-4.5s-2.016-4.5-4.5-4.5z" })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</td>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/ItemVentaDatials.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const ItemVentaDatials = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "OcsModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    venta: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "showAddVenta"],
  setup(__props, { emit }) {
    const props = __props;
    const ocs = ref([]);
    const showingFormOc = ref(false);
    const oc = ref({ id: -1 });
    const typeForm = ref("create");
    const title = computed(() => {
      switch (props.venta) {
        case "1":
          return "Por Pagar";
        case "2":
          return "Cerrado";
        default:
          return "Por Pagar";
      }
    });
    const getOcs = async () => {
      const resp = await axios.get(route("ocs.index") + `?venta_id=${props.venta.id}`);
      ocs.value = resp.data;
    };
    const showFormOc = (ocSelected) => {
      if (ocSelected != void 0) {
        oc.value = ocSelected;
        typeForm.value = "update";
      } else {
        oc.value = { id: -1 };
        typeForm.value = "create";
      }
      showingFormOc.value = true;
    };
    const addOc = (newOc) => {
      ocs.value.unshift(newOc);
    };
    const editOc = (newOc) => {
      const findIndex = ocs.value.findIndex((ocFind) => {
        return newOc.id == ocFind.id;
      });
      if (findIndex !== -1) {
        ocs.value[findIndex] = newOc;
      }
    };
    const deleteOc = (ocSelected) => {
      const ocIndex = ocs.value.findIndex((ocFind) => {
        return ocFind.id === ocSelected.id;
      });
      axios.delete(route("ocs.destroy", ocSelected.id)).then(() => {
        ocs.value.splice(ocIndex, 1);
        Inertia.visit(route("ventas.index"), {
          preserveState: true,
          preserveScroll: true,
          only: ["totalOcs"]
        });
      }).catch((error) => {
        if (error.response.data.hasOwnProperty("message")) {
          alert(error.response.data.message);
        } else {
          alert("ERROR DELETE OC");
        }
      });
    };
    const close = () => {
      ocs.value = [];
      emit("close");
    };
    watch(props, () => {
      if (props.show == true) {
        getOcs();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}>${ssrInterpolate(unref(title))}</span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}><span class="block font-bold text-center text-gray-300"${_scopeId}> Fecha Incial ${ssrInterpolate(__props.venta.fechaInicial)}</span></div></div></div><div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-gray-300"${_scopeId}> Subtotal: $${ssrInterpolate(unref(formatoMoney)(__props.venta.monto))}</span></div><div class="px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span lass="block font-bold text-center text-gray-300"${_scopeId}>`);
            if (__props.venta.iva == true) {
              _push2(`<p class="text-gray-300"${_scopeId}> IVA: $${ssrInterpolate(unref(formatoMoney)(Math.round(__props.venta.monto * 0.16)))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.venta.iva == false) {
              _push2(`<p class="text-gray-300"${_scopeId}> IVA: $${ssrInterpolate(0)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span></div><div class="px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-gray-300"${_scopeId}> Total: $${ssrInterpolate(unref(formatoMoney)(__props.venta.monto + __props.venta.monto * 0.16))}</span></div></div><div class="px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-gray-300"${_scopeId}> COMENTARIO: ${ssrInterpolate(__props.venta.comentario)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, toDisplayString(unref(title)), 1)
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("span", { class: "block font-bold text-center text-gray-300" }, " Fecha Incial " + toDisplayString(__props.venta.fechaInicial), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-gray-300" }, " Subtotal: $" + toDisplayString(unref(formatoMoney)(__props.venta.monto)), 1)
                ]),
                createVNode("div", { class: "px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { lass: "block font-bold text-center text-gray-300" }, [
                    __props.venta.iva == true ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-gray-300"
                    }, " IVA: $" + toDisplayString(unref(formatoMoney)(Math.round(__props.venta.monto * 0.16))), 1)) : createCommentVNode("", true),
                    __props.venta.iva == false ? (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-gray-300"
                    }, " IVA: $" + toDisplayString(0))) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-gray-300" }, " Total: $" + toDisplayString(unref(formatoMoney)(__props.venta.monto + __props.venta.monto * 0.16)), 1)
                ])
              ]),
              createVNode("div", { class: "px-4 py-1 border-t-4 border-r-4 border-gray-600 basis-1/3" }, [
                createVNode("span", { class: "block font-bold text-gray-300" }, " COMENTARIO: " + toDisplayString(__props.venta.comentario), 1)
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr${_scopeId2}><th${_scopeId2}><h3 class="mb-1"${_scopeId2}>OC</h3>`);
                  if (_ctx.$page.props.can["ocs.create"]) {
                    _push3(ssrRenderComponent(_sfc_main$17, {
                      class: "h-5",
                      onClick: ($event) => showFormOc()
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</th><th${_scopeId2}>CANTIDAD</th><th${_scopeId2}>FECHA</th>`);
                  if (_ctx.$page.props.can["ocs.edit"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.can["ocs.delete"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</tr>`);
                } else {
                  return [
                    createVNode("tr", null, [
                      createVNode("th", null, [
                        createVNode("h3", { class: "mb-1" }, "OC"),
                        _ctx.$page.props.can["ocs.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                          key: 0,
                          class: "h-5",
                          onClick: ($event) => showFormOc()
                        }, null, 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("th", null, "CANTIDAD"),
                      createVNode("th", null, "FECHA"),
                      _ctx.$page.props.can["ocs.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                      _ctx.$page.props.can["ocs.delete"] ? (openBlock(), createBlock("th", { key: 1 })) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(ocs.value, (oc2) => {
                    _push3(ssrRenderComponent(_sfc_main$v, {
                      key: oc2.id,
                      oc: oc2,
                      onEdit: ($event) => showFormOc($event),
                      onDelete: ($event) => deleteOc($event)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(ocs.value, (oc2) => {
                      return openBlock(), createBlock(_sfc_main$v, {
                        key: oc2.id,
                        oc: oc2,
                        onEdit: ($event) => showFormOc($event),
                        onDelete: ($event) => deleteOc($event)
                      }, null, 8, ["oc", "onEdit", "onDelete"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$y, {
              show: showingFormOc.value,
              "type-form": typeForm.value,
              venta: props.venta,
              oc: oc.value,
              onAddOc: ($event) => addOc($event),
              onEditOc: ($event) => editOc($event),
              onClose: ($event) => showingFormOc.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("th", null, [
                      createVNode("h3", { class: "mb-1" }, "OC"),
                      _ctx.$page.props.can["ocs.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                        key: 0,
                        class: "h-5",
                        onClick: ($event) => showFormOc()
                      }, null, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    createVNode("th", null, "CANTIDAD"),
                    createVNode("th", null, "FECHA"),
                    _ctx.$page.props.can["ocs.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                    _ctx.$page.props.can["ocs.delete"] ? (openBlock(), createBlock("th", { key: 1 })) : createCommentVNode("", true)
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(ocs.value, (oc2) => {
                    return openBlock(), createBlock(_sfc_main$v, {
                      key: oc2.id,
                      oc: oc2,
                      onEdit: ($event) => showFormOc($event),
                      onDelete: ($event) => deleteOc($event)
                    }, null, 8, ["oc", "onEdit", "onDelete"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$y, {
                show: showingFormOc.value,
                "type-form": typeForm.value,
                venta: props.venta,
                oc: oc.value,
                onAddOc: ($event) => addOc($event),
                onEditOc: ($event) => editOc($event),
                onClose: ($event) => showingFormOc.value = false
              }, null, 8, ["show", "type-form", "venta", "oc", "onAddOc", "onEditOc", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/OcsModal.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const OcsModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = {
  __name: "Ventas",
  __ssrInlineRender: true,
  props: {
    "clientes": {
      type: Object
    }
  },
  emits: ["showVentas"],
  setup(__props, { emit }) {
    const props = __props;
    const tab = ref("");
    const searchText = ref("");
    const showingOcs = ref(false);
    const ventaSelect = ref({ id: -1 });
    const showOcs = (venta) => {
      ventaSelect.value = venta;
      showingOcs.value = true;
    };
    const closeOcs = () => {
      ventaSelect.value = { id: -1 };
      showingOcs.value = false;
    };
    const search = (newSearch) => {
      const params = pickBy({ status_id: tab.value, search: newSearch });
      Inertia$1.visit(route("ventas.index"), {
        data: params,
        preserveState: true,
        preserveScroll: true,
        only: [
          "clientes",
          "totalVentasStatus"
        ]
      });
    };
    let timeout;
    watch(searchText, (newSearch) => {
      if (timeout !== void 0) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        search(newSearch);
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-white" }, _attrs))}><h1>Ventas</h1><div class="flex justify-around">`);
      _push(ssrRenderComponent(_sfc_main$1b, {
        modelValue: searchText.value,
        "onUpdate:modelValue": ($event) => searchText.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$17, {
        class: "h-7",
        onClick: ($event) => emit("showVentas")
      }, null, _parent));
      _push(`</div><div class="w-full"><div class="tabs-header"><span class="${ssrRenderClass([{ "active": tab.value === "" }, "tab"])}"> TODAS </span><span class="${ssrRenderClass([{ "active": tab.value === "1" }, "tab"])}"> ABIERTAS </span><span class="${ssrRenderClass([{ "active": tab.value === "2" }, "tab"])}"> CERRADAS </span></div><div class="overflow-y-auto" style="${ssrRenderStyle({ "max-height": "65vh" })}"><!--[-->`);
      ssrRenderList(props.clientes, (cliente) => {
        _push(ssrRenderComponent(_sfc_main$K, {
          key: cliente.id,
          cliente,
          total: cliente.ventas.length
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(cliente.ventas, (venta) => {
                _push2(ssrRenderComponent(_sfc_main$19, {
                  key: venta.id,
                  data: venta,
                  onOnShow: ($event) => showOcs($event)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(venta.ceco + "-" + venta.servicio)} <br${_scopeId2}> ${ssrInterpolate(venta.fechaInicial)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(venta.ceco + "-" + venta.servicio) + " ", 1),
                        createVNode("br"),
                        createTextVNode(" " + toDisplayString(venta.fechaInicial), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(cliente.ventas, (venta) => {
                  return openBlock(), createBlock(_sfc_main$19, {
                    key: venta.id,
                    data: venta,
                    onOnShow: ($event) => showOcs($event)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(venta.ceco + "-" + venta.servicio) + " ", 1),
                      createVNode("br"),
                      createTextVNode(" " + toDisplayString(venta.fechaInicial), 1)
                    ]),
                    _: 2
                  }, 1032, ["data", "onOnShow"]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_sfc_main$t, {
        show: showingOcs.value,
        venta: ventaSelect.value,
        onClose: closeOcs
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/Ventas.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const Ventas = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = {
  __name: "VentasModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    ventas: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const searchText = ref("");
    const showingFormVenta = ref(false);
    const venta = ref({});
    const typeForm = ref("create");
    const showFormVentas = (ventaSelect) => {
      if (ventaSelect === void 0) {
        typeForm.value = "create";
      } else {
        typeForm.value = "update";
        venta.value = ventaSelect;
      }
      showingFormVenta.value = true;
    };
    const activeIva = (ventaId) => {
      axios.put(route("ventas.iva", ventaId)).then(() => {
        Inertia$1.visit(route("ventas.index"), {
          preserveScroll: true,
          preserveState: true,
          only: ["clientes", "totalVentas", "errors"]
        });
      }).catch((err) => {
        if (err.hasOwnProperty("errors") && err.response.data.hasOwnProperty("errors")) {
          alert(err.response.data.message);
        } else {
          alert("ERROR ACTIVE IVA");
        }
      });
    };
    const search = (newSearch) => {
      const params = pickBy({ search: newSearch });
      Inertia$1.visit(route("ventas.index"), {
        data: params,
        preserveState: true,
        preserveScroll: true,
        only: [
          "clientes",
          "totalVentasStatus"
        ]
      });
    };
    let timeout;
    watch(searchText, (newSearch) => {
      if (timeout !== void 0) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        search(newSearch);
      }, 300);
    });
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close(),
        maxWidth: "6xl"
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> Ventas </span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}>`);
            if (_ctx.$page.props.can["ventas.create"]) {
              _push2(ssrRenderComponent(_sfc_main$17, {
                onClick: ($event) => showFormVentas(),
                class: "text-sm text-white h-7"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Agregar `);
                  } else {
                    return [
                      createTextVNode(" Agregar ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-row" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " Ventas ")
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }, [
                    _ctx.$page.props.can["ventas.create"] ? (openBlock(), createBlock(_sfc_main$17, {
                      key: 0,
                      onClick: ($event) => showFormVentas(),
                      class: "text-sm text-white h-7"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Agregar ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TableComponent, null, {
              thead: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<tr${_scopeId2}><th${_scopeId2}>CLIENTE</th><th${_scopeId2}>COMENTARIO</th><th${_scopeId2}>IVA</th><th${_scopeId2}>SUBTOTAL</th><th${_scopeId2}>TOTAL IVA</th><th${_scopeId2}>TOTAL</th><th${_scopeId2}>FECHA INICIAL</th>`);
                  if (_ctx.$page.props.can["ventas.edit"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.$page.props.can["ventas.delete"]) {
                    _push3(`<th${_scopeId2}></th>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</tr><tr${_scopeId2}><td colspan="5"${_scopeId2}></td><td colspan="2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1b, {
                    modelValue: searchText.value,
                    "onUpdate:modelValue": ($event) => searchText.value = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</td></tr>`);
                } else {
                  return [
                    createVNode("tr", null, [
                      createVNode("th", null, "CLIENTE"),
                      createVNode("th", null, "COMENTARIO"),
                      createVNode("th", null, "IVA"),
                      createVNode("th", null, "SUBTOTAL"),
                      createVNode("th", null, "TOTAL IVA"),
                      createVNode("th", null, "TOTAL"),
                      createVNode("th", null, "FECHA INICIAL"),
                      _ctx.$page.props.can["ventas.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                      _ctx.$page.props.can["ventas.delete"] ? (openBlock(), createBlock("th", { key: 1 })) : createCommentVNode("", true)
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", { colspan: "5" }),
                      createVNode("td", { colspan: "2" }, [
                        createVNode(_sfc_main$1b, {
                          modelValue: searchText.value,
                          "onUpdate:modelValue": ($event) => searchText.value = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ];
                }
              }),
              tbody: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.ventas, (venta2, index) => {
                    _push3(ssrRenderComponent(_sfc_main$u, {
                      key: venta2.id + "" + index,
                      venta: venta2,
                      onEdit: ($event) => showFormVentas($event),
                      onActiveIva: ($event) => activeIva($event)
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.ventas, (venta2, index) => {
                      return openBlock(), createBlock(_sfc_main$u, {
                        key: venta2.id + "" + index,
                        venta: venta2,
                        onEdit: ($event) => showFormVentas($event),
                        onActiveIva: ($event) => activeIva($event)
                      }, null, 8, ["venta", "onEdit", "onActiveIva"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$w, {
              show: showingFormVenta.value,
              "type-form": typeForm.value,
              venta: venta.value,
              onClose: ($event) => showingFormVenta.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(TableComponent, null, {
                thead: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("th", null, "CLIENTE"),
                    createVNode("th", null, "COMENTARIO"),
                    createVNode("th", null, "IVA"),
                    createVNode("th", null, "SUBTOTAL"),
                    createVNode("th", null, "TOTAL IVA"),
                    createVNode("th", null, "TOTAL"),
                    createVNode("th", null, "FECHA INICIAL"),
                    _ctx.$page.props.can["ventas.edit"] ? (openBlock(), createBlock("th", { key: 0 })) : createCommentVNode("", true),
                    _ctx.$page.props.can["ventas.delete"] ? (openBlock(), createBlock("th", { key: 1 })) : createCommentVNode("", true)
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", { colspan: "5" }),
                    createVNode("td", { colspan: "2" }, [
                      createVNode(_sfc_main$1b, {
                        modelValue: searchText.value,
                        "onUpdate:modelValue": ($event) => searchText.value = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                tbody: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.ventas, (venta2, index) => {
                    return openBlock(), createBlock(_sfc_main$u, {
                      key: venta2.id + "" + index,
                      venta: venta2,
                      onEdit: ($event) => showFormVentas($event),
                      onActiveIva: ($event) => activeIva($event)
                    }, null, 8, ["venta", "onEdit", "onActiveIva"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_sfc_main$w, {
                show: showingFormVenta.value,
                "type-form": typeForm.value,
                venta: venta.value,
                onClose: ($event) => showingFormVenta.value = false
              }, null, 8, ["show", "type-form", "venta", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/Partials/CardVenta/VentasModal.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const VentasModal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
  __name: "ItemMonth",
  __ssrInlineRender: true,
  props: {
    month: {
      type: Number
    },
    currentMonth: {
      type: Number
    }
  },
  setup(__props) {
    const props = __props;
    const active = computed$1(() => {
      return props.month === props.currentMonth;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["text-xs item-picker", { "active-picker": unref(active) }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ItemMonth.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const PickerCalendar_vue_vue_type_style_index_0_scoped_5c03fd33_lang = "";
const _sfc_main$p = {
  __name: "PickerCalendar",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    },
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    refComponent: {
      type: null,
      required: true
    }
  },
  emits: ["changeDate"],
  setup(__props, { emit }) {
    const props = __props;
    const monthText = ref(listMonths);
    const pickerCalendar = ref(null);
    const divSlot = ref(null);
    let open = ref(false);
    const closeOnEscape = (e2) => {
      if (open.value && e2.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    onMounted(() => {
      const x2 = divSlot.value.offsetLeft - pickerCalendar.value.clientWidth / 2 + divSlot.value.clientWidth / 2;
      const y2 = divSlot.value.offsetTop + 45;
      pickerCalendar.value.style.top = `${y2}px`;
      pickerCalendar.value.style.left = `${x2}px`;
    });
    const changeIndexMes = (newMonth) => {
      let newDate = { month: 0, year: props.year };
      switch (newMonth) {
        case 12:
          newDate.month = 0;
          newDate.year = props.year + 1;
          break;
        case -1:
          newDate.month = 11;
          newDate.year = props.year - 1;
          break;
        default:
          newDate.month = newMonth;
      }
      emit("changeDate", newDate);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-5c03fd33><div data-v-5c03fd33>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" class="fixed inset-0 z-40" data-v-5c03fd33></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div id="pickerCalendar" data-v-5c03fd33><div style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" data-v-5c03fd33><div class="picker-year" data-v-5c03fd33><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-4 hover:opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5c03fd33><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" data-v-5c03fd33></path></svg><span class="text-sm item-picker active-picker" data-v-5c03fd33>${ssrInterpolate(props.year)}</span><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-4 hover:opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-5c03fd33><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" data-v-5c03fd33></path></svg></div><div class="picker-month" data-v-5c03fd33><div class="grid-months" data-v-5c03fd33><!--[-->`);
        ssrRenderList(monthText.value, (mText, index) => {
          _push2(ssrRenderComponent(_sfc_main$q, {
            key: mText,
            onClick: ($event) => changeIndexMes(index),
            "current-month": props.month,
            month: index
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`${ssrInterpolate(mText)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(mText), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push2(`<!--]--></div></div></div></div>`);
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PickerCalendar.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const PickerCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-5c03fd33"]]);
const _sfc_main$o = {
  __name: "ButtonCalendar",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    },
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  emits: ["changeDate"],
  setup(__props, { emit }) {
    const props = __props;
    const monthText = ref(listMonths);
    const buttonCalendar = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(PickerCalendar, mergeProps({
        onChangeDate: ($event) => emit("changeDate", $event),
        refComponent: buttonCalendar.value,
        month: props.month,
        year: props.year
      }, _attrs), {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-36"${_scopeId}><button${ssrRenderAttr("type", __props.type)} class="items-center inline-block w-full px-4 py-2 text-xs font-semibold text-white uppercase transition border border-blue-800 rounded-2xl hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 ring-button disabled:opacity-25"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(` ${ssrInterpolate(monthText.value[__props.month])} ${ssrInterpolate(__props.year)}</button></div>`);
          } else {
            return [
              createVNode("div", { class: "w-36" }, [
                createVNode("button", {
                  ref_key: "buttonCalendar",
                  ref: buttonCalendar,
                  type: __props.type,
                  class: "items-center inline-block w-full px-4 py-2 text-xs font-semibold text-white uppercase transition border border-blue-800 rounded-2xl hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 ring-button disabled:opacity-25"
                }, [
                  renderSlot(_ctx.$slots, "default"),
                  createTextVNode(" " + toDisplayString(monthText.value[__props.month]) + " " + toDisplayString(__props.year), 1)
                ], 8, ["type"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ButtonCalendar.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const VentasIndex_vue_vue_type_style_index_0_scoped_b3d42493_lang = "";
const _sfc_main$n = {
  __name: "VentasIndex",
  __ssrInlineRender: true,
  props: {
    clientes: {
      type: Object,
      required: true
    },
    totalVentas: {
      type: Object,
      required: true
    },
    totalVentasStatus: {
      type: Object,
      required: true
    },
    totalOcs: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const dateNow = new Date();
    const showingVentas = ref(false);
    const date = ref({
      month: dateNow.getMonth(),
      year: dateNow.getFullYear()
    });
    const componentFactDep = reactive({
      component: "Facturas",
      title: "Por Pagar"
    });
    const ventas = computed(() => {
      let auxVentas = [];
      props.clientes.forEach((cliente) => {
        let ventas2 = cliente.ventas;
        ventas2 = ventas2.map((venta) => {
          venta.sub_total = venta.monto * venta.periodos * venta.cantidad;
          return venta;
        });
        auxVentas = auxVentas.concat(ventas2);
      });
      return auxVentas;
    });
    const changeDate = (newDate) => {
      date.value = newDate;
    };
    const closeModalVentas = () => {
      showingVentas.value = false;
    };
    const chageComponent = () => {
      if (componentFactDep.title === "Por Pagar") {
        componentFactDep.component = "Depositos";
        componentFactDep.title = "Depositos";
      } else {
        componentFactDep.component = "Facturas";
        componentFactDep.title = "Por Pagar";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "Finanzas" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-around" data-v-b3d42493${_scopeId}><h2 class="text-xl font-bold leading-tight text-white" data-v-b3d42493${_scopeId}> Finanzas </h2>`);
            _push2(ssrRenderComponent(_sfc_main$o, {
              month: date.value.month,
              year: date.value.year,
              onChangeDate: ($event) => changeDate($event)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-around" }, [
                createVNode("h2", { class: "text-xl font-bold leading-tight text-white" }, " Finanzas "),
                createVNode(_sfc_main$o, {
                  month: date.value.month,
                  year: date.value.year,
                  onChangeDate: ($event) => changeDate($event)
                }, null, 8, ["month", "year", "onChangeDate"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-3 py-3 fondo_general" data-v-b3d42493${_scopeId}><div class="grid grid-cols-1 gap-4 md:grid-cols-4" data-v-b3d42493${_scopeId}>`);
            _push2(ssrRenderComponent(Card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$s, {
                    clientes: props.clientes,
                    onShowVentas: ($event) => showingVentas.value = true
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="px-4 py-1 border-t-4 border-gray-600 basis-1/3" data-v-b3d42493${_scopeId2}><span class="text-lg font-bold text-white" data-v-b3d42493${_scopeId2}> Total: ${ssrInterpolate(unref(formatoMoney)(__props.totalVentasStatus.total.toFixed(2)))}</span></div>`);
                } else {
                  return [
                    createVNode(_sfc_main$s, {
                      clientes: props.clientes,
                      onShowVentas: ($event) => showingVentas.value = true
                    }, null, 8, ["clientes", "onShowVentas"]),
                    createVNode("div", { class: "px-4 py-1 border-t-4 border-gray-600 basis-1/3" }, [
                      createVNode("span", { class: "text-lg font-bold text-white" }, " Total: " + toDisplayString(unref(formatoMoney)(__props.totalVentasStatus.total.toFixed(2))), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid col-span-2 text-white" data-v-b3d42493${_scopeId}><table class="mb-4 md:mx-auto" data-v-b3d42493${_scopeId}><thead data-v-b3d42493${_scopeId}><tr class="text-center" data-v-b3d42493${_scopeId}><td class="w-3/12" data-v-b3d42493${_scopeId}><span data-v-b3d42493${_scopeId}> VENTAS </span></td><td class="w-3/12" data-v-b3d42493${_scopeId}><span data-v-b3d42493${_scopeId}> PC </span></td><td class="w-3/12" data-v-b3d42493${_scopeId}><span data-v-b3d42493${_scopeId}> PP </span></td><td class="w-3/12" data-v-b3d42493${_scopeId}><span data-v-b3d42493${_scopeId}> C </span></td></tr></thead><tbody data-v-b3d42493${_scopeId}><tr class="text-center" data-v-b3d42493${_scopeId}><td class="p-2" data-v-b3d42493${_scopeId}> $${ssrInterpolate(unref(formatoMoney)(props.totalVentas.total.toFixed(2)))}</td><td class="p-2" data-v-b3d42493${_scopeId}> $${ssrInterpolate(unref(formatoMoney)(props.totalOcs.pc.toFixed(2)))}</td><td class="p-2" data-v-b3d42493${_scopeId}> $${ssrInterpolate(unref(formatoMoney)(props.totalOcs.pp.toFixed(2)))}</td><td class="p-2" data-v-b3d42493${_scopeId}> $${ssrInterpolate(unref(formatoMoney)(props.totalOcs.c.toFixed(2)))}</td></tr></tbody><tfoot data-v-b3d42493${_scopeId}><tr data-v-b3d42493${_scopeId}><td colspan="4" data-v-b3d42493${_scopeId}><svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="66.22" height="23.82" viewBox="0 0 66.22 23.82" data-v-b3d42493${_scopeId}><g data-name="Grupo 89" transform="translate(-2229.56 -1215.34)" data-v-b3d42493${_scopeId}><path id="Trazado_155" data-name="Trazado 155" d="M0,0H66.22" transform="translate(2229.56 1216.84)" fill="none" stroke="#40bb6e" stroke-width="3" data-v-b3d42493${_scopeId}></path><path id="Trazado_154" data-name="Trazado 154" d="M2241.166,1216.973l22.187,22.187,22.168-22.168" fill="#40bb6e" data-v-b3d42493${_scopeId}></path></g></svg></td></tr></tfoot></table>`);
            _push2(ssrRenderComponent(Card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VentasCalendar, {
                    date: date.value,
                    onChangeDate: ($event) => changeDate($event),
                    totalVentas: props.totalVentas,
                    totalOcs: props.totalOcs
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VentasCalendar, {
                      date: date.value,
                      onChangeDate: ($event) => changeDate($event),
                      totalVentas: props.totalVentas,
                      totalOcs: props.totalOcs
                    }, null, 8, ["date", "onChangeDate", "totalVentas", "totalOcs"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(Card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-row items-center my-1 text-white" data-v-b3d42493${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-b3d42493${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" data-v-b3d42493${_scopeId2}></path></svg><h1 class="ml-2 text-lg" data-v-b3d42493${_scopeId2}>${ssrInterpolate(componentFactDep.title)}</h1></div>`);
                  if (componentFactDep.component === "Facturas") {
                    _push3(ssrRenderComponent(_sfc_main$z, null, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(_sfc_main$G, null, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    createVNode("div", { class: "flex flex-row items-center my-1 text-white" }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        onClick: ($event) => chageComponent(),
                        class: "w-8 h-8 text-green-600 hover:text-green-800",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "stroke-width": "2"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M7 16l-4-4m0 0l4-4m-4 4h18"
                        })
                      ], 8, ["onClick"])),
                      createVNode("h1", { class: "ml-2 text-lg" }, toDisplayString(componentFactDep.title), 1)
                    ]),
                    componentFactDep.component === "Facturas" ? (openBlock(), createBlock(_sfc_main$z, { key: 0 })) : (openBlock(), createBlock(_sfc_main$G, { key: 1 }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$r, {
              show: showingVentas.value,
              ventas: unref(ventas),
              onClose: closeModalVentas
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-3 py-3 fondo_general" }, [
                createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-4" }, [
                  createVNode(Card, null, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$s, {
                        clientes: props.clientes,
                        onShowVentas: ($event) => showingVentas.value = true
                      }, null, 8, ["clientes", "onShowVentas"]),
                      createVNode("div", { class: "px-4 py-1 border-t-4 border-gray-600 basis-1/3" }, [
                        createVNode("span", { class: "text-lg font-bold text-white" }, " Total: " + toDisplayString(unref(formatoMoney)(__props.totalVentasStatus.total.toFixed(2))), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "grid col-span-2 text-white" }, [
                    createVNode("table", { class: "mb-4 md:mx-auto" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "text-center" }, [
                          createVNode("td", { class: "w-3/12" }, [
                            createVNode("span", null, " VENTAS ")
                          ]),
                          createVNode("td", { class: "w-3/12" }, [
                            createVNode("span", null, " PC ")
                          ]),
                          createVNode("td", { class: "w-3/12" }, [
                            createVNode("span", null, " PP ")
                          ]),
                          createVNode("td", { class: "w-3/12" }, [
                            createVNode("span", null, " C ")
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", { class: "text-center" }, [
                          createVNode("td", { class: "p-2" }, " $" + toDisplayString(unref(formatoMoney)(props.totalVentas.total.toFixed(2))), 1),
                          createVNode("td", { class: "p-2" }, " $" + toDisplayString(unref(formatoMoney)(props.totalOcs.pc.toFixed(2))), 1),
                          createVNode("td", { class: "p-2" }, " $" + toDisplayString(unref(formatoMoney)(props.totalOcs.pp.toFixed(2))), 1),
                          createVNode("td", { class: "p-2" }, " $" + toDisplayString(unref(formatoMoney)(props.totalOcs.c.toFixed(2))), 1)
                        ])
                      ]),
                      createVNode("tfoot", null, [
                        createVNode("tr", null, [
                          createVNode("td", { colspan: "4" }, [
                            (openBlock(), createBlock("svg", {
                              class: "mx-auto",
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "66.22",
                              height: "23.82",
                              viewBox: "0 0 66.22 23.82"
                            }, [
                              createVNode("g", {
                                "data-name": "Grupo 89",
                                transform: "translate(-2229.56 -1215.34)"
                              }, [
                                createVNode("path", {
                                  id: "Trazado_155",
                                  "data-name": "Trazado 155",
                                  d: "M0,0H66.22",
                                  transform: "translate(2229.56 1216.84)",
                                  fill: "none",
                                  stroke: "#40bb6e",
                                  "stroke-width": "3"
                                }),
                                createVNode("path", {
                                  id: "Trazado_154",
                                  "data-name": "Trazado 154",
                                  d: "M2241.166,1216.973l22.187,22.187,22.168-22.168",
                                  fill: "#40bb6e"
                                })
                              ])
                            ]))
                          ])
                        ])
                      ])
                    ]),
                    createVNode(Card, null, {
                      default: withCtx(() => [
                        createVNode(VentasCalendar, {
                          date: date.value,
                          onChangeDate: ($event) => changeDate($event),
                          totalVentas: props.totalVentas,
                          totalOcs: props.totalOcs
                        }, null, 8, ["date", "onChangeDate", "totalVentas", "totalOcs"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(Card, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-row items-center my-1 text-white" }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          onClick: ($event) => chageComponent(),
                          class: "w-8 h-8 text-green-600 hover:text-green-800",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M7 16l-4-4m0 0l4-4m-4 4h18"
                          })
                        ], 8, ["onClick"])),
                        createVNode("h1", { class: "ml-2 text-lg" }, toDisplayString(componentFactDep.title), 1)
                      ]),
                      componentFactDep.component === "Facturas" ? (openBlock(), createBlock(_sfc_main$z, { key: 0 })) : (openBlock(), createBlock(_sfc_main$G, { key: 1 }))
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode(_sfc_main$r, {
                show: showingVentas.value,
                ventas: unref(ventas),
                onClose: closeModalVentas
              }, null, 8, ["show", "ventas"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Finanzas/VentasIndex.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const VentasIndex = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-b3d42493"]]);
const VentasIndex$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VentasIndex
}, Symbol.toStringTag, { value: "Module" }));
const GraficoMovimientos_vue_vue_type_style_index_0_scoped_7e911bdb_lang = "";
const _sfc_main$m = {
  __name: "GraficoMovimientos",
  __ssrInlineRender: true,
  props: {
    datos: Object
  },
  setup(__props) {
    am4core.useTheme(am4themes_animated);
    onMounted(() => {
      var container = am4core.create("container", am4core.Container);
      container.width = am4core.percent(100);
      container.height = am4core.percent(100);
      container.layout = "horizontal";
      var buttonContainer = container.createChild(am4core.Container);
      buttonContainer.layout = "vertical";
      var chartContainer = container.createChild(am4core.Container);
      chartContainer.layout = "vertical";
      chartContainer.width = am4core.percent(20);
      chartContainer.height = am4core.percent(100);
      function addButton(text) {
        var button = buttonContainer.createChild(am4core.Button);
        button.label.text = text;
        button.align = "center";
        button.marginTop = 15;
      }
      function addChart(data2) {
        var chart2 = chartContainer.createChild(am4charts.XYChart);
        chart2.data = data2;
        var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        chart2.yAxes.push(new am4charts.ValueAxis());
        var series2 = chart2.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = "value";
        series2.dataFields.categoryX = "category";
      }
      addButton("Button #1");
      addButton("Button #2");
      addButton("Button #3");
      addChart([{
        "category": "Research",
        "value": 450
      }, {
        "category": "Marketing",
        "value": 1200
      }, {
        "category": "Distribution",
        "value": 1850
      }]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "container" }, _attrs))} data-v-7e911bdb></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/GraficoMovimientos.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const GraficoMovimientos = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-7e911bdb"]]);
const GraficoMovimientos$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GraficoMovimientos
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      type: String,
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        checked: Array.isArray(unref(proxyChecked)) ? ssrLooseContain(unref(proxyChecked), __props.value) : unref(proxyChecked),
        type: "checkbox",
        value: __props.value,
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(proxyChecked)))))}>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = {
  __name: "SelectCECOConcepto",
  __ssrInlineRender: true,
  props: {
    modelValue: String | Number
  },
  emits: ["update:modelValue"],
  setup(__props, { expose }) {
    const select = ref(null);
    onMounted(() => {
      if (select.value.hasAttribute("autofocus")) {
        select.value.focus();
      }
    });
    expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<select${ssrRenderAttrs(mergeProps({
        ref_key: "select",
        ref: select,
        value: __props.modelValue,
        class: "w-full px-2 py-1 text-sm text-black border-2 border-gray-700 rounded-md bg-white-800 focus:ring-gray-400 active:ring-gray-400 focus:ring-0 focus:ring-opacity-50"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</select>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/SelectCECOConcepto.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const SelectCECOConcepto = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
  __name: "ModalNewCecoConcepto",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cecos: Object,
    conceptos: Object,
    movimiento: String,
    idmovimiento: Number
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const formSolicitud = useForm({
      nombre: "",
      tipo_movimiento_id: -1,
      ceco_concepto_id: -1,
      productos: [],
      autorizacion_id: 1,
      created_at: "",
      updated_at: ""
    });
    const filas = ref([]);
    let ceco = ref(-1);
    let concepto = ref(-1);
    const addRow = function() {
      if (filas.value) {
        filas.value.push({
          id: 0,
          nombreProducto: "",
          cantidad: 0,
          costo: 0,
          iva: "",
          total: 0
        });
      }
      for (let index = 0; index < filas.value.length; index++) {
        filas.value[index].id = index;
      }
    };
    const removeRow = function(id) {
      filas.value.splice(id, 1);
    };
    const enviarFormSolicitud = async function() {
      formSolicitud.tipo_movimiento_id = props.idmovimiento;
      formSolicitud.productos = filas.value;
      var now = moment().format("YYYY-MM-DD HH:mm:ss");
      formSolicitud.created_at = now;
      formSolicitud.updated_at = now;
      await axios.get("api/consulta_ceco_concepto/" + ceco.value + "/" + concepto.value, { ob: ceco.value }, { ob1: concepto.value }).then((resp) => {
        console.log(resp.data);
        formSolicitud.ceco_concepto_id = resp.data[0].id;
        console.log(formSolicitud);
        formSolicitud.post("/soliMovimientos");
        close();
        formSolicitud.reset();
      }).catch(function(error) {
        console.log(error);
      });
      console.log(formSolicitud);
    };
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="block font-bold text-center text-white"${_scopeId}> Nueva solicitud </span>`);
          } else {
            return [
              createVNode("span", { class: "block font-bold text-center text-white" }, " Nueva solicitud ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="formNewGastos"${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "3rem" })}"${_scopeId}><label class="labelForm"${_scopeId}>Nombre de solicitud: </label>`);
            _push2(ssrRenderComponent(_sfc_main$1D, {
              modelValue: unref(formSolicitud).nombre,
              "onUpdate:modelValue": ($event) => unref(formSolicitud).nombre = $event,
              type: "text",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="labelForm"${_scopeId}>TIPO DE MOVIMIENTO:</label>`);
            _push2(ssrRenderComponent(_sfc_main$1D, {
              type: "text",
              disabled: "",
              value: __props.movimiento,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="labelForm"${_scopeId}>CECO:</label>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              required: "",
              modelValue: unref(ceco),
              "onUpdate:modelValue": ($event) => isRef(ceco) ? ceco.value = $event : ceco = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" disabled selected${_scopeId2}> Seleciona un CECO</option><!--[-->`);
                  ssrRenderList(__props.cecos, (ceco2) => {
                    _push3(`<option${ssrRenderAttr("value", ceco2.id)}${_scopeId2}>${ssrInterpolate(ceco2.nombre)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", {
                      value: "",
                      disabled: "",
                      selected: ""
                    }, " Seleciona un CECO"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.cecos, (ceco2) => {
                      return openBlock(), createBlock("option", {
                        key: ceco2.id,
                        value: ceco2.id
                      }, toDisplayString(ceco2.nombre), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="labelForm"${_scopeId}>Concepto:</label>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              required: "",
              modelValue: unref(concepto),
              "onUpdate:modelValue": ($event) => isRef(concepto) ? concepto.value = $event : concepto = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" disabled selected${_scopeId2}> Seleciona un Concepto</option><!--[-->`);
                  ssrRenderList(__props.conceptos, (concepto2) => {
                    _push3(`<option${ssrRenderAttr("value", concepto2.id)}${_scopeId2}>${ssrInterpolate(concepto2.nombre)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", {
                      value: "",
                      disabled: "",
                      selected: ""
                    }, " Seleciona un Concepto"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.conceptos, (concepto2) => {
                      return openBlock(), createBlock("option", {
                        value: concepto2.id,
                        key: concepto2.id
                      }, toDisplayString(concepto2.nombre), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><table id="tabla" style="${ssrRenderStyle({ "margin-top": "5px", "grid-column": "1/3" })}"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>#</th><th${_scopeId}>Nombre de producto</th><th${_scopeId}>Cantidad</th><th${_scopeId}>$</th><th${_scopeId}>IVA</th><th${_scopeId}>Total</th><th${_scopeId}>Eliminar</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filas.value, (item) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.id)}</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                name: "nombreProducto",
                type: "text",
                modelValue: item.nombreProducto,
                "onUpdate:modelValue": ($event) => item.nombreProducto = $event,
                style: { "color": "black" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                type: "number",
                min: "1",
                pattern: "^[0-9]+",
                modelValue: item.cantidad,
                "onUpdate:modelValue": ($event) => item.cantidad = $event,
                style: { "width": "70px", "color": "black" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                type: "number",
                min: "1",
                pattern: "^[0-9]+",
                modelValue: item.costo,
                "onUpdate:modelValue": ($event) => item.costo = $event,
                style: { "width": "70px", "color": "black" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$l, {
                modelValue: item.iva,
                "onUpdate:modelValue": ($event) => item.iva = $event
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              if (item.iva == false) {
                _push2(`<p style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}>${ssrInterpolate(item.total = item.cantidad * item.costo)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.iva == true) {
                _push2(`<p style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}>${ssrInterpolate(item.total = item.cantidad * item.costo * 1.16)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$1D, {
                type: "number",
                min: "1",
                pattern: "^[0-9]+",
                modelValue: item.total,
                "onUpdate:modelValue": ($event) => item.total = $event,
                disabled: "",
                style: { "width": "100px", "color": "black" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1z, {
                class: "buttonRemove",
                onClick: ($event) => removeRow(item.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`-`);
                  } else {
                    return [
                      createTextVNode("-")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table><br${_scopeId}><div class="buttonModalAdd1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1z, {
              class: "buttonAdd",
              onClick: ($event) => addRow()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`+`);
                } else {
                  return [
                    createTextVNode("+")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1z, {
              class: "mb-3 btn btn-primary sentButtonModal1",
              type: "submit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Enviar`);
                } else {
                  return [
                    createTextVNode("Enviar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<br${_scopeId}></form>`);
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => close(),
              class: "closeModal1",
              style: { "float": "right", "margin": "1rem" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cerrar `);
                } else {
                  return [
                    createTextVNode(" Cerrar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("form", {
                class: "formNewGastos",
                onSubmit: withModifiers(($event) => enviarFormSolicitud(), ["prevent"])
              }, [
                createVNode("div", { style: { "margin-left": "3rem" } }, [
                  createVNode("label", { class: "labelForm" }, "Nombre de solicitud: "),
                  createVNode(_sfc_main$1D, {
                    modelValue: unref(formSolicitud).nombre,
                    "onUpdate:modelValue": ($event) => unref(formSolicitud).nombre = $event,
                    type: "text",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "labelForm" }, "TIPO DE MOVIMIENTO:"),
                  createVNode(_sfc_main$1D, {
                    type: "text",
                    disabled: "",
                    value: __props.movimiento,
                    required: ""
                  }, null, 8, ["value"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "labelForm" }, "CECO:"),
                  createVNode(_sfc_main$k, {
                    required: "",
                    modelValue: unref(ceco),
                    "onUpdate:modelValue": ($event) => isRef(ceco) ? ceco.value = $event : ceco = $event
                  }, {
                    default: withCtx(() => [
                      createVNode("option", {
                        value: "",
                        disabled: "",
                        selected: ""
                      }, " Seleciona un CECO"),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.cecos, (ceco2) => {
                        return openBlock(), createBlock("option", {
                          key: ceco2.id,
                          value: ceco2.id
                        }, toDisplayString(ceco2.nombre), 9, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "labelForm" }, "Concepto:"),
                  createVNode(_sfc_main$k, {
                    required: "",
                    modelValue: unref(concepto),
                    "onUpdate:modelValue": ($event) => isRef(concepto) ? concepto.value = $event : concepto = $event
                  }, {
                    default: withCtx(() => [
                      createVNode("option", {
                        value: "",
                        disabled: "",
                        selected: ""
                      }, " Seleciona un Concepto"),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.conceptos, (concepto2) => {
                        return openBlock(), createBlock("option", {
                          value: concepto2.id,
                          key: concepto2.id
                        }, toDisplayString(concepto2.nombre), 9, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("table", {
                  id: "tabla",
                  style: { "margin-top": "5px", "grid-column": "1/3" }
                }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "#"),
                      createVNode("th", null, "Nombre de producto"),
                      createVNode("th", null, "Cantidad"),
                      createVNode("th", null, "$"),
                      createVNode("th", null, "IVA"),
                      createVNode("th", null, "Total"),
                      createVNode("th", null, "Eliminar")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filas.value, (item) => {
                      return openBlock(), createBlock("tr", {
                        key: item.id
                      }, [
                        createVNode("td", null, toDisplayString(item.id), 1),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1D, {
                            name: "nombreProducto",
                            type: "text",
                            modelValue: item.nombreProducto,
                            "onUpdate:modelValue": ($event) => item.nombreProducto = $event,
                            style: { "color": "black" },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1D, {
                            type: "number",
                            min: "1",
                            pattern: "^[0-9]+",
                            modelValue: item.cantidad,
                            "onUpdate:modelValue": ($event) => item.cantidad = $event,
                            style: { "width": "70px", "color": "black" },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1D, {
                            type: "number",
                            min: "1",
                            pattern: "^[0-9]+",
                            modelValue: item.costo,
                            "onUpdate:modelValue": ($event) => item.costo = $event,
                            style: { "width": "70px", "color": "black" },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$l, {
                            modelValue: item.iva,
                            "onUpdate:modelValue": ($event) => item.iva = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          item.iva == false ? (openBlock(), createBlock("p", {
                            key: 0,
                            style: { "display": "none" }
                          }, toDisplayString(item.total = item.cantidad * item.costo), 1)) : createCommentVNode("", true),
                          item.iva == true ? (openBlock(), createBlock("p", {
                            key: 1,
                            style: { "display": "none" }
                          }, toDisplayString(item.total = item.cantidad * item.costo * 1.16), 1)) : createCommentVNode("", true),
                          createVNode(_sfc_main$1D, {
                            type: "number",
                            min: "1",
                            pattern: "^[0-9]+",
                            modelValue: item.total,
                            "onUpdate:modelValue": ($event) => item.total = $event,
                            disabled: "",
                            style: { "width": "100px", "color": "black" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1z, {
                            class: "buttonRemove",
                            onClick: ($event) => removeRow(item.id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("-")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("br"),
                createVNode("div", { class: "buttonModalAdd1" }, [
                  createVNode(_sfc_main$1z, {
                    class: "buttonAdd",
                    onClick: ($event) => addRow()
                  }, {
                    default: withCtx(() => [
                      createTextVNode("+")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode(_sfc_main$1z, {
                  class: "mb-3 btn btn-primary sentButtonModal1",
                  type: "submit"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Enviar")
                  ]),
                  _: 1
                }),
                createVNode("br")
              ], 40, ["onSubmit"]),
              createVNode(_sfc_main$1z, {
                onClick: ($event) => close(),
                class: "closeModal1",
                style: { "float": "right", "margin": "1rem" }
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cerrar ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/ModalNewCecoConcepto.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const ModalNewCecoConcepto = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  __name: "ModalNewProducto",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    concepto: {
      type: Object,
      required: true
    },
    ceco: {
      type: Object,
      required: true
    },
    idMovimientoForm: Number,
    nombreMovimiento: String
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const formSolicitud = useForm({
      nombre: "",
      tipo_movimiento_id: 0,
      ceco_concepto_id: 0,
      productos: [],
      autorizacion_id: 1,
      created_at: "",
      updated_at: ""
    });
    const filas = ref([]);
    const addRow = function() {
      if (filas.value) {
        filas.value.push({
          id: 0,
          nombreProducto: "",
          cantidad: 0,
          costo: 0,
          iva: "",
          total: 0
        });
      }
      for (let index = 0; index < filas.value.length; index++) {
        filas.value[index];
        filas.value[index].id = index;
      }
      console.log(filas.value);
    };
    const removeRow = function(id) {
      console.log(id);
      filas.value.splice(id, 1);
    };
    const enviarFormSolicitud = async function() {
      formSolicitud.tipo_movimiento_id = props.idMovimientoForm;
      formSolicitud.productos = filas;
      var now = moment().format("YYYY-MM-DD HH:mm:ss");
      formSolicitud.created_at = now;
      formSolicitud.updated_at = now;
      await axios.get("api/consulta_ceco_concepto/" + props.ceco + "/" + props.concepto, { ob: props.ceco }, { ob1: props.concepto }).then((resp) => {
        console.log(resp.data[0].id);
        formSolicitud.ceco_concepto_id = resp.data[0].id;
        console.log(formSolicitud);
        formSolicitud.post("/soliMovimientos");
        close();
        formSolicitud.reset();
      }).catch(function(error) {
        console.log(error);
      });
    };
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="block font-bold text-center text-white"${_scopeId}> Nuevo Producto </span>`);
          } else {
            return [
              createVNode("span", { class: "block font-bold text-center text-white" }, " Nuevo Producto ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="formNewGastos"${_scopeId}><div style="${ssrRenderStyle({ "margin-left": "3rem" })}"${_scopeId}><label class="labelForm"${_scopeId}>Nombre de solicitud: </label>`);
            _push2(ssrRenderComponent(_sfc_main$1D, {
              modelValue: unref(formSolicitud).nombre,
              "onUpdate:modelValue": ($event) => unref(formSolicitud).nombre = $event,
              type: "text",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="labelForm"${_scopeId}>TIPO DE MOVIMIENTO:</label><p style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}>${ssrInterpolate(unref(formSolicitud).tipo_movimiento_id = __props.idMovimientoForm)}</p>`);
            _push2(ssrRenderComponent(_sfc_main$1D, {
              type: "text",
              disabled: "",
              modelValue: unref(formSolicitud).tipo_movimiento_id,
              "onUpdate:modelValue": ($event) => unref(formSolicitud).tipo_movimiento_id = $event,
              value: __props.nombreMovimiento,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="buttonModalAdd1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1z, {
              class: "buttonAdd",
              onClick: ($event) => addRow()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`+`);
                } else {
                  return [
                    createTextVNode("+")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><br${_scopeId}><table id="tabla" style="${ssrRenderStyle({ "margin-top": "5px", "grid-column": "1/3" })}"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Nombre de producto</th><th${_scopeId}>Cantidad</th><th${_scopeId}>$</th><th${_scopeId}>IVA</th><th${_scopeId}>Total</th><th${_scopeId}>Eliminar</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filas.value, (item) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                name: "nombreProducto",
                type: "text",
                modelValue: item.nombreProducto,
                "onUpdate:modelValue": ($event) => item.nombreProducto = $event,
                style: { "color": "black" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                type: "number",
                min: "1",
                pattern: "^[0-9]+",
                modelValue: item.cantidad,
                "onUpdate:modelValue": ($event) => item.cantidad = $event,
                style: { "width": "70px", "color": "black" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1D, {
                type: "number",
                min: "1",
                pattern: "^[0-9]+",
                modelValue: item.costo,
                "onUpdate:modelValue": ($event) => item.costo = $event,
                style: { "width": "70px", "color": "black" },
                required: ""
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$l, {
                modelValue: item.iva,
                "onUpdate:modelValue": ($event) => item.iva = $event
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              if (item.iva == false) {
                _push2(`<p style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}>${ssrInterpolate(item.total = item.cantidad * item.costo)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.iva == true) {
                _push2(`<p style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}>${ssrInterpolate(item.total = item.cantidad * item.costo * 1.16)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$1D, {
                type: "number",
                min: "1",
                pattern: "^[0-9]+",
                modelValue: item.total,
                "onUpdate:modelValue": ($event) => item.total = $event,
                disabled: "",
                style: { "width": "100px", "color": "black" }
              }, null, _parent2, _scopeId));
              _push2(`</td><td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1z, {
                class: "buttonRemove",
                onClick: ($event) => removeRow(item.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`-`);
                  } else {
                    return [
                      createTextVNode("-")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table><br${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1z, {
              class: "mb-3 btn btn-primary sentButtonModal1",
              type: "submit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Enviar`);
                } else {
                  return [
                    createTextVNode("Enviar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => close(),
              class: "closeModal1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cerrar `);
                } else {
                  return [
                    createTextVNode(" Cerrar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                class: "formNewGastos",
                onSubmit: withModifiers(($event) => enviarFormSolicitud(), ["prevent"])
              }, [
                createVNode("div", { style: { "margin-left": "3rem" } }, [
                  createVNode("label", { class: "labelForm" }, "Nombre de solicitud: "),
                  createVNode(_sfc_main$1D, {
                    modelValue: unref(formSolicitud).nombre,
                    "onUpdate:modelValue": ($event) => unref(formSolicitud).nombre = $event,
                    type: "text",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "labelForm" }, "TIPO DE MOVIMIENTO:"),
                  createVNode("p", { style: { "display": "none" } }, toDisplayString(unref(formSolicitud).tipo_movimiento_id = __props.idMovimientoForm), 1),
                  createVNode(_sfc_main$1D, {
                    type: "text",
                    disabled: "",
                    modelValue: unref(formSolicitud).tipo_movimiento_id,
                    "onUpdate:modelValue": ($event) => unref(formSolicitud).tipo_movimiento_id = $event,
                    value: __props.nombreMovimiento,
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "value"])
                ]),
                createVNode("div", { class: "buttonModalAdd1" }, [
                  createVNode(_sfc_main$1z, {
                    class: "buttonAdd",
                    onClick: ($event) => addRow()
                  }, {
                    default: withCtx(() => [
                      createTextVNode("+")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode("br"),
                createVNode("table", {
                  id: "tabla",
                  style: { "margin-top": "5px", "grid-column": "1/3" }
                }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Nombre de producto"),
                      createVNode("th", null, "Cantidad"),
                      createVNode("th", null, "$"),
                      createVNode("th", null, "IVA"),
                      createVNode("th", null, "Total"),
                      createVNode("th", null, "Eliminar")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filas.value, (item) => {
                      return openBlock(), createBlock("tr", {
                        key: item.id
                      }, [
                        createVNode("td", null, [
                          createVNode(_sfc_main$1D, {
                            name: "nombreProducto",
                            type: "text",
                            modelValue: item.nombreProducto,
                            "onUpdate:modelValue": ($event) => item.nombreProducto = $event,
                            style: { "color": "black" },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1D, {
                            type: "number",
                            min: "1",
                            pattern: "^[0-9]+",
                            modelValue: item.cantidad,
                            "onUpdate:modelValue": ($event) => item.cantidad = $event,
                            style: { "width": "70px", "color": "black" },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1D, {
                            type: "number",
                            min: "1",
                            pattern: "^[0-9]+",
                            modelValue: item.costo,
                            "onUpdate:modelValue": ($event) => item.costo = $event,
                            style: { "width": "70px", "color": "black" },
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$l, {
                            modelValue: item.iva,
                            "onUpdate:modelValue": ($event) => item.iva = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          item.iva == false ? (openBlock(), createBlock("p", {
                            key: 0,
                            style: { "display": "none" }
                          }, toDisplayString(item.total = item.cantidad * item.costo), 1)) : createCommentVNode("", true),
                          item.iva == true ? (openBlock(), createBlock("p", {
                            key: 1,
                            style: { "display": "none" }
                          }, toDisplayString(item.total = item.cantidad * item.costo * 1.16), 1)) : createCommentVNode("", true),
                          createVNode(_sfc_main$1D, {
                            type: "number",
                            min: "1",
                            pattern: "^[0-9]+",
                            modelValue: item.total,
                            "onUpdate:modelValue": ($event) => item.total = $event,
                            disabled: "",
                            style: { "width": "100px", "color": "black" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(_sfc_main$1z, {
                            class: "buttonRemove",
                            onClick: ($event) => removeRow(item.id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("-")
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("br"),
                createVNode(_sfc_main$1z, {
                  class: "mb-3 btn btn-primary sentButtonModal1",
                  type: "submit"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Enviar")
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$1z, {
                  onClick: ($event) => close(),
                  class: "closeModal1"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Cerrar ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/ModalNewProducto.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const ModalNewProducto = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  __name: "ModalWatchProducts",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    idSolicitudGasto: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const productos = ref([]);
    const verProductos = async function() {
      productos.value = [];
      await axios.get("api/productos/" + props.idSolicitudGasto, { ob: props.idSolicitudGasto }).then((resp) => {
        productos.value = resp.data;
      }).catch(function(error) {
        console.log(error);
      });
    };
    const close = () => {
      emit("close");
    };
    watch(props, () => {
      if (props.show) {
        verProductos();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modalPart1"${_scopeId}><div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> Productos de solicitud: </span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "modalPart1" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " Productos de solicitud: ")
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table id="tabla2"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Nombre</th><th${_scopeId}>Cantidad</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(productos.value, (producto) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(producto.nombre)}</td><td${_scopeId}>${ssrInterpolate(producto.cantidad)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => close(),
              style: { "margin": "1rem" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cerrar `);
                } else {
                  return [
                    createTextVNode(" Cerrar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("table", { id: "tabla2" }, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Nombre"),
                    createVNode("th", null, "Cantidad")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(productos.value, (producto) => {
                    return openBlock(), createBlock("tr", {
                      key: producto.id
                    }, [
                      createVNode("td", null, toDisplayString(producto.nombre), 1),
                      createVNode("td", null, toDisplayString(producto.cantidad), 1)
                    ]);
                  }), 128))
                ])
              ]),
              createVNode(_sfc_main$1z, {
                onClick: ($event) => close(),
                style: { "margin": "1rem" }
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cerrar ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/ModalWatchProducts.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const ModalWatchProducts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "ModalSalidaMovimiento",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    ceco: {
      type: Object,
      required: true
    },
    concepto: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "addFactura", "addOc"],
  setup(__props, { emit }) {
    const props = __props;
    const NewProducto = ref(false);
    const WatchProductos = ref(false);
    const idSolicitudGasto = ref(-1);
    const idMovimientoForm = ref(0);
    const nombreMovimiento = ref("");
    const movimientos = ref({});
    const salidas = ref([]);
    const totales = ref({
      totalGasto: 0,
      totalSuplemento: 0,
      totalPresupuesto: 0
    });
    const newSalidas = async function(idMovimiento) {
      axios.get("/api/consultaMovimiento/" + idMovimiento, { ob: idMovimiento }).then((resp) => {
        NewProducto.value = true;
        idMovimientoForm.value = idMovimiento;
        nombreMovimiento.value = resp.data[0].nombre;
      }).catch(function(error) {
        console.log(error);
      });
    };
    const getSalidas = async function(ev) {
      totales.value.totalGasto = 0;
      totales.value.totalSuplemento = 0;
      totales.value.totalPresupuesto = 0;
      console.log(props);
      axios.get("api/cliente_concepto/" + props.concepto + "/" + props.ceco, { ob: props.concepto }, { ob1: props.ceco }).then((resp) => {
        let button;
        salidas.value = resp.data.salidas;
        let newData = salidas.value;
        movimientos.value = resp.data.tiposMovimiento;
        let tipoMovimientos = movimientos.value;
        let nuevoArregloMovimientos = [];
        for (let index = 0; index < tipoMovimientos.length; index++) {
          let element = tipoMovimientos[index];
          if (element == tipoMovimientos[0]) {
            nuevoArregloMovimientos.push(
              {
                movimiento: element.nombre
              }
            );
          } else {
            let nombreTipo = element.nombre;
            let nuevoObj;
            for (let i2 = 0; i2 < nuevoArregloMovimientos.length; i2++) {
              let element2 = nuevoArregloMovimientos[i2];
              if (element2 !== nombreTipo) {
                nuevoObj = {
                  movimiento: nombreTipo
                };
              }
            }
            nuevoArregloMovimientos.push(nuevoObj);
          }
        }
        let elementoPrincipal;
        for (let index = 0; index < newData.length; index++) {
          elementoPrincipal = newData[index];
          let elementoMovimiento = newData[index].movimiento;
          for (let i2 = 0; i2 < nuevoArregloMovimientos.length; i2++) {
            let eleMovimiento = nuevoArregloMovimientos[i2].movimiento;
            if (elementoMovimiento == eleMovimiento) {
              elementoPrincipal.indice = i2;
            }
          }
        }
        for (let x2 = 0; x2 < newData.length; x2++) {
          let insertRow = function(table, tr2) {
            var table = document.getElementById("tabla");
            var row = table.insertRow(1);
            row.innerHTML = tr2;
          };
          let tds = [];
          let indice = newData[x2].indice;
          switch (indice) {
            case 0:
              totales.value.totalGasto += newData[x2].cantidad;
              break;
            case 1:
              totales.value.totalSuplemento += newData[x2].cantidad;
              break;
            case 2:
              totales.value.totalPresupuesto += newData[x2].cantidad;
              break;
          }
          for (let k2 = 0; k2 < nuevoArregloMovimientos.length; k2++) {
            let indiceMovimiento = k2;
            if (indiceMovimiento === indice) {
              let td = "<td>" + newData[x2].cantidad + "</td>";
              tds.push(td);
            } else {
              let td = `<td></td>`;
              tds.push(td);
            }
          }
          let stringTds = tds.toString();
          let stringTdsSinComas = stringTds.replace(",", " ");
          let stringTdsSinComas2 = stringTdsSinComas.replace(",", " ");
          stringTdsSinComas2 += `<td>
                        </td>
                                           <td>${newData[x2].fecha}</td>`;
          stringTdsSinComas2 += `
                    <td>
                      <Button id="watch${newData[x2].id}" class="watch">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 eye" viewBox="0 0 16 16" >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                        </svg>
                      </Button>
                    </td>`;
          let tr = `<tr>
                                <td>
                                  <a>${newData[x2].nombre}</a>
                                </td>
                                ${stringTdsSinComas2}
                              </tr>`;
          let tabla = document.getElementById("tabla");
          insertRow(tabla, tr);
          button = document.getElementById(`watch${newData[x2].id}`);
          let idvar = newData[x2].id;
          button.addEventListener("click", (e2) => {
            console.log(e2);
            idSolicitudGasto.value = idvar;
            WatchProductos.value = true;
          });
        }
      }).catch(function(error) {
        console.log(error);
      });
    };
    const close = () => {
      emit("close");
    };
    const closeModalNewProducto = function() {
      NewProducto.value = false;
      getSalidas();
    };
    const closeModalWatchProductos = function() {
      WatchProductos.value = false;
    };
    watch(props, () => {
      if (props.show) {
        getSalidas();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$15, mergeProps({
        show: __props.show,
        onClose: ($event) => close()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 py-1 border-r-4 border-gray-600 basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}>${ssrInterpolate(salidas.value.concepto)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 py-1 border-r-4 border-gray-600 basis-1/3" }, [
                createVNode("span", { class: "block font-bold text-center text-white" }, toDisplayString(salidas.value.concepto), 1)
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-row modalPart1"${_scopeId}><div class="px-4 py-1 border-r-4 borderModal basis-1/3"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> Concepto: ${ssrInterpolate(__props.concepto)}</span></div><div class="flex-1 px-2 py-1"${_scopeId}><div class="flex justify-center"${_scopeId}><span class="block font-bold text-center text-white"${_scopeId}> CECO: ${ssrInterpolate(__props.ceco)}</span></div></div></div><table id="tabla" style="${ssrRenderStyle({ "margin-top": "1rem" })}"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Nombre</th><!--[-->`);
            ssrRenderList(movimientos.value, (item) => {
              _push2(`<th${_scopeId}>${ssrInterpolate(item.nombre)} </th>`);
            });
            _push2(`<!--]--><th${_scopeId}>Evidencia</th><th${_scopeId}>Fecha de creaci\xF3n</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><tr${_scopeId}></tr><tr${_scopeId}><td${_scopeId}></td><!--[-->`);
            ssrRenderList(movimientos.value, (item) => {
              _push2(`<td${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$17, {
                class: "h-5",
                onClick: ($event) => newSalidas(item.id)
              }, null, _parent2, _scopeId));
              _push2(`</td>`);
            });
            _push2(`<!--]--><td colspan="3"${_scopeId}></td></tr><tr${_scopeId}><td${_scopeId}>TOTALES:</td><td${_scopeId}>${ssrInterpolate(totales.value.totalGasto)}</td><td${_scopeId}>${ssrInterpolate(totales.value.totalSuplemento)}</td><td${_scopeId}>${ssrInterpolate(totales.value.totalPresupuesto)}</td><td colspan="3"${_scopeId}></td></tr><tr${_scopeId}></tr></tbody></table>`);
            _push2(ssrRenderComponent(_sfc_main$i, {
              show: NewProducto.value,
              idMovimientoForm: idMovimientoForm.value,
              nombreMovimiento: nombreMovimiento.value,
              concepto: __props.concepto,
              ceco: __props.ceco,
              onClose: closeModalNewProducto
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$h, {
              show: WatchProductos.value,
              idSolicitudGasto: idSolicitudGasto.value,
              onClose: closeModalWatchProductos
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1z, {
              onClick: ($event) => close(),
              class: "closeModal1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cerrar `);
                } else {
                  return [
                    createTextVNode(" Cerrar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex flex-row modalPart1" }, [
                createVNode("div", { class: "px-4 py-1 border-r-4 borderModal basis-1/3" }, [
                  createVNode("span", { class: "block font-bold text-center text-white" }, " Concepto: " + toDisplayString(__props.concepto), 1)
                ]),
                createVNode("div", { class: "flex-1 px-2 py-1" }, [
                  createVNode("div", { class: "flex justify-center" }, [
                    createVNode("span", { class: "block font-bold text-center text-white" }, " CECO: " + toDisplayString(__props.ceco), 1)
                  ])
                ])
              ]),
              createVNode("table", {
                id: "tabla",
                style: { "margin-top": "1rem" }
              }, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Nombre"),
                    (openBlock(true), createBlock(Fragment, null, renderList(movimientos.value, (item) => {
                      return openBlock(), createBlock("th", {
                        key: item.id
                      }, toDisplayString(item.nombre) + " ", 1);
                    }), 128)),
                    createVNode("th", null, "Evidencia"),
                    createVNode("th", null, "Fecha de creaci\xF3n"),
                    createVNode("th")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr"),
                  createVNode("tr", null, [
                    createVNode("td"),
                    (openBlock(true), createBlock(Fragment, null, renderList(movimientos.value, (item) => {
                      return openBlock(), createBlock("td", {
                        key: item.id
                      }, [
                        createVNode(_sfc_main$17, {
                          class: "h-5",
                          onClick: ($event) => newSalidas(item.id)
                        }, null, 8, ["onClick"])
                      ]);
                    }), 128)),
                    createVNode("td", { colspan: "3" })
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, "TOTALES:"),
                    createVNode("td", null, toDisplayString(totales.value.totalGasto), 1),
                    createVNode("td", null, toDisplayString(totales.value.totalSuplemento), 1),
                    createVNode("td", null, toDisplayString(totales.value.totalPresupuesto), 1),
                    createVNode("td", { colspan: "3" })
                  ]),
                  createVNode("tr")
                ])
              ]),
              createVNode(_sfc_main$i, {
                show: NewProducto.value,
                idMovimientoForm: idMovimientoForm.value,
                nombreMovimiento: nombreMovimiento.value,
                concepto: __props.concepto,
                ceco: __props.ceco,
                onClose: closeModalNewProducto
              }, null, 8, ["show", "idMovimientoForm", "nombreMovimiento", "concepto", "ceco"]),
              createVNode(_sfc_main$h, {
                show: WatchProductos.value,
                idSolicitudGasto: idSolicitudGasto.value,
                onClose: closeModalWatchProductos
              }, null, 8, ["show", "idSolicitudGasto"]),
              createVNode(_sfc_main$1z, {
                onClick: ($event) => close(),
                class: "closeModal1"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Cerrar ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/ModalSalidaMovimiento.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const ModalSalidaMovimiento = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const TablaCecoConcepto_vue_vue_type_style_index_0_lang = "";
const _sfc_main$f = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-7xl" }, _attrs))}><div class="inline-block min-w-full align-middle bg-gray-700 border-r-4 border-gray-600"><div class="overflow-hidden overflow-x-auto overflow-y-auto text-white"><table class="min-w-full custome-table"><thead class="text-sm">`);
  ssrRenderSlot(_ctx.$slots, "thead", {}, null, _push, _parent);
  _push(`</thead><tbody class="text-sm text-center">`);
  ssrRenderSlot(_ctx.$slots, "tbody", {}, null, _push, _parent);
  _push(`</tbody></table></div></div></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Components/TablaCecoConcepto.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const TablaCecoConcepto = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$2]]);
const TablaCecoConcepto$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TablaCecoConcepto
}, Symbol.toStringTag, { value: "Module" }));
const Graph_vue_vue_type_style_index_0_scoped_70526f9b_lang = "";
let data$1 = [];
let nuevoArreglo = [];
let series$1 = [];
let nuevosValores;
let ejey$1 = [];
let ejex$1 = [];
let yAxis$1;
let xAxis$1;
let root$1;
let yRenderer$1;
let xRenderer$1;
let chart$1;
let modalDatos$1 = [{ grupoconcepto: "" }];
const _sfc_main$e = {
  props: {
    clientes: Object,
    grupo_conceptos: Object,
    cantidades: Object,
    movimientos: Object,
    solicitudes: Object
  },
  components: {
    ButtonPres: _sfc_main$N
  },
  data() {
    return {
      movimiento: { state: "PRESUPUESTO" },
      SalidaMovimiento: false,
      data: [],
      modalData: modalDatos$1,
      agrupacionModal: [],
      productos: [],
      idMovimientoForm: 0,
      nombreMovimiento: "",
      cliente: "",
      grupo_concepto: "",
      zoom: false
    };
  },
  mounted() {
    let clients = this.clientes;
    let grupo_conceptos = this.grupo_conceptos;
    let datos = this.cantidades;
    root$1 = am5.Root.new(this.$refs.chartdiv);
    root$1.setThemes([am5themes_Animated.new(root$1)]);
    chart$1 = root$1.container.children.push(am5xy.XYChart.new(root$1, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root$1.verticalLayout
    }));
    yRenderer$1 = am5xy.AxisRendererY.new(root$1, {
      visible: false,
      minGridDistance: 20,
      inversed: true
    });
    yRenderer$1.grid.template.set("visible", false);
    yAxis$1 = chart$1.yAxes.push(am5xy.CategoryAxis.new(root$1, {
      renderer: yRenderer$1,
      categoryField: "category"
    }));
    xRenderer$1 = am5xy.AxisRendererX.new(root$1, {
      visible: false,
      minGridDistance: 30,
      inversed: false,
      opposite: true
    });
    xRenderer$1.grid.template.set("visible", false);
    xAxis$1 = chart$1.xAxes.push(am5xy.CategoryAxis.new(root$1, {
      renderer: xRenderer$1,
      categoryField: "category"
    }));
    series$1 = chart$1.series.push(am5xy.ColumnSeries.new(root$1, {
      calculateAggregates: true,
      stroke: am5.color(16777215),
      clustered: false,
      xAxis: xAxis$1,
      yAxis: yAxis$1,
      categoryXField: "x",
      categoryYField: "y",
      valueField: "value"
    }));
    series$1.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings"
    });
    var circleTemplate = am5.Template.new({});
    series$1.set("heatRules", [{
      target: circleTemplate,
      dataField: "value",
      key: "radius"
    }]);
    series$1.bullets.push(function() {
      return am5.Bullet.new(root$1, {
        sprite: am5.Label.new(root$1, {
          fill: am5.color(16777215),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 15,
          text: "{value}"
        })
      });
    });
    ({
      critical: am5.color(13238529),
      bad: am5.color(14776877),
      medium: am5.color(14801197),
      good: am5.color(6143524),
      verygood: am5.color(752899)
    });
    data$1 = [];
    let a2 = {};
    nuevoArreglo = [];
    for (let c2 = 0; c2 < datos.length; c2++) {
      var ele = datos[c2];
      let i3 = 0;
      let r2 = 0;
      if (ele === datos[0]) {
        a2 = {
          x: ele.Cliente,
          y: ele.GrupoConcepto,
          movimientos: [{
            tipo: ele.Movimiento,
            cantidad: parseInt(ele.Cantidad)
          }]
        };
        nuevoArreglo.push(a2);
      } else {
        let xy = ele.Cliente + ele.GrupoConcepto;
        while (i3 < nuevoArreglo.length) {
          var x2 = nuevoArreglo[i3];
          let y2 = x2.x + x2.y;
          if (xy === y2) {
            let e3 = 0;
            let k2 = 0;
            while (e3 < x2.movimientos.length) {
              let z = x2.movimientos[e3];
              let j2 = z.tipo;
              let h2 = ele.Movimiento;
              if (j2 === h2) {
                z.cantidad = parseInt(z.cantidad) + parseInt(ele.Cantidad);
                k2 = 1;
                break;
              }
              e3++;
            }
            if (k2 === 0) {
              let a3 = {
                tipo: ele.Movimiento,
                cantidad: parseInt(ele.Cantidad)
              };
              x2.movimientos.push(a3);
            }
            r2 = 1;
            break;
          }
          i3++;
        }
        if (r2 === 0) {
          a2 = {
            x: ele.Cliente,
            y: ele.GrupoConcepto,
            movimientos: [{
              tipo: ele.Movimiento,
              cantidad: parseInt(ele.Cantidad)
            }]
          };
          nuevoArreglo.push(a2);
        }
      }
    }
    let i2 = 0;
    let total = 0;
    let disponible = 0;
    let porcentaje = 0;
    while (i2 < nuevoArreglo.length) {
      let h2 = nuevoArreglo[i2];
      let a3 = {
        "tipo": "TOTAL",
        "cantidad": total
      };
      let b2 = {
        "tipo": "PORCENTAJE",
        "cantidad": porcentaje
      };
      let c2 = {
        "tipo": "DISPONIBLE",
        "cantidad": disponible
      };
      h2.movimientos.push(a3, b2, c2);
      let j2 = 0;
      while (j2 < h2.movimientos.length) {
        let k2 = h2.movimientos[j2];
        if (k2.tipo === "PRESUPUESTO") {
          let l2 = 0;
          while (l2 < h2.movimientos.length) {
            let g2 = h2.movimientos[l2];
            if (g2.tipo === "TOTAL") {
              g2.cantidad = g2.cantidad + k2.cantidad;
            }
            l2++;
          }
        } else if (k2.tipo === "SUPLEMENTO") {
          let l2 = 0;
          while (l2 < h2.movimientos.length) {
            let g2 = h2.movimientos[l2];
            if (g2.tipo === "TOTAL") {
              g2.cantidad = g2.cantidad + k2.cantidad;
            }
            l2++;
          }
        } else if (k2.tipo === "GASTO") {
          let l2 = 0;
          while (l2 < h2.movimientos.length) {
            let g2 = h2.movimientos[l2];
            if (g2.tipo === "PORCENTAJE") {
              g2.cantidad = g2.cantidad + k2.cantidad;
            } else if (g2.tipo === "DISPONIBLE") {
              g2.cantidad = g2.cantidad + -1 * k2.cantidad;
            }
            l2++;
          }
        } else if (k2.tipo === "TOTAL") {
          let l2 = 0;
          while (l2 < h2.movimientos.length) {
            let g2 = h2.movimientos[l2];
            if (g2.tipo === "PORCENTAJE") {
              g2.cantidad = Math.round(100 * (g2.cantidad / k2.cantidad));
            } else if (g2.tipo === "DISPONIBLE") {
              g2.cantidad = g2.cantidad + k2.cantidad;
            }
            l2++;
          }
        }
        j2++;
      }
      i2++;
    }
    let e2 = "GASTO";
    i2 = 0;
    let v2 = 0;
    while (i2 < nuevoArreglo.length) {
      let j2 = nuevoArreglo[i2];
      let a3 = 0;
      while (a3 < j2.movimientos.length) {
        let k2 = j2.movimientos[a3];
        if (e2 === k2.tipo) {
          v2 = k2.cantidad;
        }
        a3++;
      }
      x2 = {
        "x": j2.x,
        "y": j2.y,
        "value": v2
      };
      data$1.push(x2);
      i2++;
    }
    function TipoMov(movimiento) {
      let e3 = movimiento;
      i2 = 0;
      let v3 = 0;
      while (i2 < nuevoArreglo.length) {
        let j2 = nuevoArreglo[i2];
        let a3 = 0;
        while (a3 < j2.movimientos.length) {
          let k2 = j2.movimientos[a3];
          if (e3 === k2.tipo) {
            v3 = k2.cantidad;
          }
          a3++;
        }
        x2 = {
          "y": j2.x,
          "x": j2.y,
          "value": v3
        };
        data$1.push(x2);
        i2++;
      }
    }
    TipoMov(this.movimiento.state);
    series$1.data.setAll(data$1);
    for (let index = 0; index < clients.length; index++) {
      const element = clients[index];
      ejey$1.push({ category: element.nombre });
    }
    yAxis$1.data.setAll(ejey$1);
    for (let i3 = 0; i3 < grupo_conceptos.length; i3++) {
      const e3 = grupo_conceptos[i3];
      ejex$1.push({ category: e3.nombre });
    }
    xAxis$1.data.setAll(ejex$1);
    series$1.columns.template.events.once("click", (ev) => {
      if (!this.zoom) {
        this.click(ev);
      }
    });
    root$1.container.children.moveValue(
      am5hierarchy.BreadcrumbBar.new(root$1, {
        series: series$1
      }),
      0
    );
    var legend = chart$1.children.push(am5.Legend.new(root$1, {
      centerX: am5.p50,
      x: am5.p50
    }));
    legend.data.setAll(chart$1.series.values);
    chart$1.appear(1e3, 100);
  },
  methods: {
    click: function(ev) {
      this.zoom = true;
      nuevosValores = ev.target._dataItem.dataContext;
      let x2 = nuevosValores.x;
      let y2 = nuevosValores.y;
      axios$1.get("api/ceco_concepto/" + x2 + "/" + y2, { ob: x2 }, { ob1: y2 }).then((resp) => {
        let datos = resp.data[0];
        data$1 = [];
        let a2 = {};
        nuevoArreglo = [];
        for (let index = 0; index < datos.length; index++) {
          const element = datos[index];
          let i3 = 0;
          let r2 = 0;
          if (element === datos[0]) {
            a2 = {
              x: element.CECO,
              y: element.Concepto,
              movimientos: [{
                tipo: element.Movimiento,
                cantidad: parseInt(element.Cantidad)
              }]
            };
            nuevoArreglo.push(a2);
            console.log(nuevoArreglo);
          } else {
            let xy = element.CECO + element.Concepto;
            while (i3 < nuevoArreglo.length) {
              var elemento0 = nuevoArreglo[i3];
              let newxy = elemento0.x + elemento0.y;
              if (xy === newxy) {
                let e2 = 0;
                let k2 = 0;
                while (e2 < elemento0.movimientos.length) {
                  let z = elemento0.movimientos[e2];
                  let j2 = z.tipo;
                  let h2 = element.Movimiento;
                  if (j2 === h2) {
                    z.cantidad = parseInt(z.cantidad) + parseInt(element.Cantidad);
                    k2 = 1;
                    break;
                  }
                  e2++;
                }
                if (k2 === 0) {
                  a2 = {
                    tipo: element.Movimiento,
                    cantidad: parseInt(element.Cantidad)
                  };
                  elemento0.movimientos.push(a2);
                }
                r2 = 1;
                break;
              }
              i3++;
            }
            if (r2 === 0) {
              a2 = {
                x: element.CECO,
                y: element.Concepto,
                movimientos: [{
                  tipo: element.Movimiento,
                  cantidad: parseInt(element.Cantidad)
                }]
              };
              nuevoArreglo.push(a2);
            }
          }
        }
        let i2 = 0;
        let total = 0;
        let disponible = 0;
        let porcentaje = 0;
        while (i2 < nuevoArreglo.length) {
          let ele = nuevoArreglo[i2];
          let a3 = {
            "tipo": "TOTAL",
            "cantidad": total
          };
          let b2 = {
            "tipo": "PORCENTAJE",
            "cantidad": porcentaje
          };
          let c2 = {
            "tipo": "DISPONIBLE",
            "cantidad": disponible
          };
          ele.movimientos.push(a3, b2, c2);
          let j2 = 0;
          while (j2 < ele.movimientos.length) {
            let k2 = ele.movimientos[j2];
            if (k2.tipo === "PRESUPUESTO") {
              let l2 = 0;
              while (l2 < ele.movimientos.length) {
                let g2 = ele.movimientos[l2];
                if (g2.tipo === "TOTAL") {
                  g2.cantidad = g2.cantidad + k2.cantidad;
                }
                l2++;
              }
            } else if (k2.tipo === "SUPLEMENTO") {
              let l2 = 0;
              while (l2 < ele.movimientos.length) {
                let g2 = ele.movimientos[l2];
                if (g2.tipo === "TOTAL") {
                  g2.cantidad = g2.cantidad + k2.cantidad;
                }
                l2++;
              }
            } else if (k2.tipo === "GASTO") {
              let l2 = 0;
              while (l2 < ele.movimientos.length) {
                let g2 = ele.movimientos[l2];
                if (g2.tipo === "PORCENTAJE") {
                  g2.cantidad = g2.cantidad + k2.cantidad;
                } else if (g2.tipo === "DISPONIBLE") {
                  g2.cantidad = g2.cantidad + -1 * k2.cantidad;
                }
                l2++;
              }
            } else if (k2.tipo === "TOTAL") {
              let l2 = 0;
              while (l2 < ele.movimientos.length) {
                let g2 = ele.movimientos[l2];
                if (g2.tipo === "PORCENTAJE") {
                  g2.cantidad = Math.round(100 * (g2.cantidad / k2.cantidad));
                } else if (g2.tipo === "DISPONIBLE") {
                  g2.cantidad = g2.cantidad + k2.cantidad;
                }
                l2++;
              }
            }
            j2++;
          }
          i2++;
        }
        function TipoMov(movimiento) {
          let e2 = movimiento;
          i2 = 0;
          let v2 = 0;
          while (i2 < nuevoArreglo.length) {
            let j2 = nuevoArreglo[i2];
            let a3 = 0;
            while (a3 < j2.movimientos.length) {
              let k2 = j2.movimientos[a3];
              if (e2 === k2.tipo) {
                v2 = k2.cantidad;
              }
              a3++;
            }
            x2 = {
              "y": j2.x,
              "x": j2.y,
              "value": v2
            };
            data$1.push(x2);
            i2++;
          }
        }
        TipoMov(this.movimiento.state);
        series$1.columns.template.events.on("click", (ev2) => {
          if (this.zoom) {
            let nuevosValores2 = ev2.target._dataItem.dataContext;
            console.log(nuevosValores2);
            this.cliente = nuevosValores2.y;
            this.grupo_concepto = nuevosValores2.x;
            this.SalidaMovimiento = true;
          }
        });
        ejex$1 = [];
        let cecos = resp.data[1];
        for (let index = 0; index < cecos.length; index++) {
          let nombreCeco = cecos[index].nombre;
          ejex$1.push({ category: nombreCeco });
        }
        ejey$1 = [];
        let conceptos = resp.data[2];
        for (let f2 = 0; f2 < conceptos.length; f2++) {
          let nombreConcepto = conceptos[f2].nombre;
          ejey$1.push({ category: nombreConcepto });
        }
        yAxis$1.data.setAll(ejex$1);
        xAxis$1.data.setAll(ejey$1);
        series$1.data.setAll(data$1);
      }).catch(function(error) {
        console.log(error);
      });
    },
    cambiar: function(movimiento) {
      this.movimiento.state = movimiento;
      let actualMov = movimiento;
      let i2 = 0;
      let newValue;
      data$1 = [];
      console.log(nuevoArreglo);
      while (i2 < nuevoArreglo.length) {
        let element = nuevoArreglo[i2];
        console.log(element);
        let a2 = 0;
        while (a2 < element.movimientos.length) {
          let movActual = element.movimientos[a2];
          if (actualMov === movActual.tipo) {
            newValue = movActual.cantidad;
          }
          a2++;
        }
        let x2 = {
          "y": element.x,
          "x": element.y,
          "value": newValue
        };
        data$1.push(x2);
        i2++;
      }
      series$1.data.setAll(data$1);
      console.log(data$1);
    },
    closeModalSalida: function() {
      this.SalidaMovimiento = false;
    }
  },
  components: { ModalSalidaMovimiento: _sfc_main$g, ButtonPres: _sfc_main$N, Link }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ButtonPres = resolveComponent("ButtonPres");
  const _component_ModalSalidaMovimiento = resolveComponent("ModalSalidaMovimiento");
  _push(`<!--[--><div class="group" data-v-70526f9b>`);
  _push(ssrRenderComponent(_component_ButtonPres, {
    class: "buttonCECO",
    onClick: _ctx.filtroCECOS,
    style: { "background-color": "#111F2E" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`CECO`);
      } else {
        return [
          createTextVNode("CECO")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_ButtonPres, {
    class: "buttonCON",
    style: { "background-color": "#111F2E" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`CON.`);
      } else {
        return [
          createTextVNode("CON.")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="dropdown" data-v-70526f9b><button onclick="myFunction()" class="dropbtn" data-v-70526f9b>$</button><div id="myDropdown" class="dropdown-content" data-v-70526f9b><button id="PRESUPUESTO" data-v-70526f9b>Presupuesto</button><button id="SUPLEMENTO" data-v-70526f9b>Suplemento</button><button id="TOTAL" data-v-70526f9b>Total</button><button id="GASTO" data-v-70526f9b>Gasto</button><button id="DISPONIBLE" data-v-70526f9b>Disponible</button></div></div></div>`);
  _push(ssrRenderComponent(_component_ModalSalidaMovimiento, {
    show: $data.SalidaMovimiento,
    ceco: $data.cliente,
    concepto: $data.grupo_concepto,
    onClose: $options.closeModalSalida
  }, null, _parent));
  if ($data.zoom) {
    _push(`<a${ssrRenderAttr("href", _ctx.route("clientes.index"))} style="${ssrRenderStyle({ "color": "red" })}" data-v-70526f9b> Regresarss </a>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="graph" data-v-70526f9b></div><!--]-->`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/Graph.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const Graph = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-70526f9b"]]);
const Graph$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Graph
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "ButtonReturn",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ButtonReturn.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const GraphPrueba_vue_vue_type_style_index_0_scoped_d023b93c_lang = "";
let data = [];
let series = [];
let ejey = [];
let ejex = [];
let yAxis;
let xAxis;
let root;
let yRenderer;
let xRenderer;
let chart;
let modalDatos = [{ grupoconcepto: "" }];
const _sfc_main$c = {
  props: {
    clientes: Object,
    grupo_conceptos: Object,
    cantidades: Object,
    movimientos: Object,
    solicitudes: Object,
    filtros: Object,
    date: Object
  },
  components: {
    ButtonPres: _sfc_main$N
  },
  data() {
    return {
      movimiento: { state: "PRESUPUESTO" },
      SalidaMovimiento: false,
      data: [],
      modalData: modalDatos,
      agrupacionModal: [],
      productos: [],
      idMovimientoForm: 0,
      nombreMovimiento: "",
      cliente: "",
      grupo_concepto: "",
      zoom: false,
      datosGrafica: []
    };
  },
  mounted() {
    let clients = this.clientes;
    let grupo_conceptos = this.grupo_conceptos;
    this.cantidades;
    root = am5.Root.new(this.$refs.chartdiv);
    root.setThemes([am5themes_Animated.new(root)]);
    chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.verticalLayout
    }));
    yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true
    });
    yRenderer.grid.template.set("visible", false);
    if (this.filtros.grupoType) {
      yRenderer.labels.template.setAll({ text: "{ceco}" });
    }
    yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      renderer: yRenderer,
      categoryField: "category"
    }));
    xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      inversed: false,
      opposite: true
    });
    xRenderer.grid.template.set("visible", false);
    if (this.filtros.grupoType2) {
      xRenderer.labels.template.setAll({ text: "{concepto}" });
    }
    xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      renderer: xRenderer,
      categoryField: "category"
    }));
    series = chart.series.push(am5xy.ColumnSeries.new(root, {
      calculateAggregates: true,
      stroke: am5.color(16777215),
      clustered: false,
      xAxis,
      yAxis,
      categoryXField: "GrupoConcepto",
      categoryYField: "Cliente",
      valueField: "Cantidad"
    }));
    series.columns.template.setAll({
      tooltipText: "{Cantidad}",
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings"
    });
    var circleTemplate = am5.Template.new({});
    series.set("heatRules", [{
      target: circleTemplate,
      dataField: "Cantidad",
      key: "radius"
    }]);
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fill: am5.color(16777215),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 15,
          text: "{Cantidad}"
        })
      });
    });
    ({
      critical: am5.color(13238529),
      bad: am5.color(14776877),
      medium: am5.color(14801197),
      good: am5.color(6143524),
      verygood: am5.color(752899)
    });
    this.datosGrafica = this.cantidades;
    data = this.datosGrafica;
    data = data.filter((cantidad) => cantidad.Movimiento === this.movimiento.state);
    series.data.setAll(data);
    ejey = [];
    ejex = [];
    yAxis.data.setAll({});
    xAxis.data.setAll({});
    let auxiliarGrupo = { nombre: null };
    for (let index = 0; index < clients.length; index++) {
      const element = clients[index];
      ejey.push({ category: element.nombre, ceco: element.ceco });
      if (this.filtros.grupoType) {
        if (auxiliarGrupo.nombre == null) {
          auxiliarGrupo = element;
        } else {
          if (auxiliarGrupo.grupoCliente != element.grupoCliente) {
            var range = yAxis.makeDataItem({
              "category": auxiliarGrupo.nombre,
              "endCategory": auxiliarGrupo.nombre
            });
            yAxis.createAxisRange(range);
            var label = range.get("label");
            label.setAll({
              text: auxiliarGrupo.grupoCliente,
              dx: -100,
              dy: -50,
              fontWeight: "bold",
              tooltipText: auxiliarGrupo.grupoCliente,
              rotation: 270
            });
            var tick = range.get("tick");
            tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });
            var grid = range.get("grid");
            grid.setAll({ strokeOpacity: 1 });
          }
        }
      }
    }
    yAxis.data.setAll(ejey);
    let auxiliarGrupo2 = {};
    for (let i2 = 0; i2 < grupo_conceptos.length; i2++) {
      const elemento = grupo_conceptos[i2];
      ejex.push({ category: elemento.nombre, concepto: elemento.concepto });
      if (this.filtros.grupoType2) {
        if (auxiliarGrupo2.nombre == null) {
          auxiliarGrupo2 = elemento;
        } else {
          if (auxiliarGrupo2.grupoConcepto != elemento.grupoConcepto) {
            var range = xAxis.makeDataItem({
              "category": auxiliarGrupo2.nombre,
              "endCategory": auxiliarGrupo2.nombre
            });
            xAxis.createAxisRange(range);
            var label = range.get("label");
            label.setAll({
              text: auxiliarGrupo2.grupoConcepto,
              dx: -100,
              dy: -20,
              fontWeight: "bold",
              tooltipText: auxiliarGrupo2.grupoConcepto,
              rotation: 0
            });
            var tick = range.get("tick");
            tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });
            var grid = range.get("grid");
            grid.setAll({ strokeOpacity: 1 });
          }
        }
      }
    }
    xAxis.data.setAll(ejex);
    series.columns.template.events.once("click", (ev) => {
      if (!this.zoom) {
        this.click(ev);
      }
    });
    root.container.children.moveValue(
      am5hierarchy.BreadcrumbBar.new(root, {
        series
      }),
      0
    );
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));
    legend.data.setAll(chart.series.values);
    chart.appear(1e3, 100);
  },
  methods: {
    click: function(ev) {
      this.zoom = true;
      let nuevosValores2 = null;
      if (this.filtros.grupoType || this.filtros.grupoType2) {
        if (this.filtros.grupoType) {
          console.log("agrupamiento por clientes");
          nuevosValores2 = ev.target._dataItem.dataContext;
          let grupoConcepto_send = nuevosValores2.grupoConcepto_id;
          let ceco_id_send = nuevosValores2.ceco_id;
          axios$1.get("api/ceco_grupo_concepto/" + ceco_id_send + "/" + grupoConcepto_send, { ob: ceco_id_send }, { ob1: grupoConcepto_send }).then((resp) => {
            let datos = resp.data[0];
            let cecos = resp.data[1];
            let conceptos = resp.data[2];
            let ejey2 = [];
            let ejex2 = [];
            for (let index = 0; index < cecos.length; index++) {
              let ceco = cecos[index];
              ejey2.push({ category: ceco.nombre });
              yRenderer.labels.template.setAll({ text: ceco.nombre });
            }
            for (let i2 = 0; i2 < conceptos.length; i2++) {
              const concepto = conceptos[i2];
              ejex2.push({ category: concepto.nombre });
            }
            this.datosGrafica = datos;
            yAxis.data.setAll(ejey2);
            xAxis.data.setAll(ejex2);
            this.cambiar(this.movimiento.state);
            series.columns.template.events.on("click", (ev2) => {
              if (this.zoom) {
                let nuevosValores3 = ev2.target._dataItem.dataContext;
                this.cliente = nuevosValores3.Cliente;
                this.grupo_concepto = nuevosValores3.GrupoConcepto;
                this.SalidaMovimiento = true;
              }
            });
          }).catch(function(error) {
            console.log(error);
          });
        } else {
          nuevosValores2 = ev.target._dataItem.dataContext;
          console.log(nuevosValores2);
          let clientes_id = nuevosValores2.clientes_id;
          let concepto_id = nuevosValores2.concepto_id;
          axios$1.get("api/concepto_clientes/" + concepto_id + "/" + clientes_id, { ob: concepto_id }, { ob1: clientes_id }).then((resp) => {
            console.log(resp.data);
            let uniqueConcepto = resp.data[2];
            let cecos = resp.data[1];
            let datos = resp.data[0];
            let ejey2 = [];
            let ejex2 = [];
            for (let i2 = 0; i2 < uniqueConcepto.length; i2++) {
              const concepto = uniqueConcepto[i2];
              ejex2.push({ category: concepto.nombre });
              xRenderer.labels.template.setAll({ text: concepto.nombre });
            }
            for (let index = 0; index < cecos.length; index++) {
              const ceco = cecos[index];
              ejey2.push({ category: ceco.nombre });
            }
            this.datosGrafica = datos;
            yAxis.data.setAll(ejey2);
            xAxis.data.setAll(ejex2);
            this.cambiar(this.movimiento.state);
            series.columns.template.events.on("click", (ev2) => {
              if (this.zoom) {
                let nuevosValores3 = ev2.target._dataItem.dataContext;
                this.cliente = nuevosValores3.Cliente;
                this.grupo_concepto = nuevosValores3.GrupoConcepto;
                this.SalidaMovimiento = true;
              }
            });
          }).catch(function(error) {
            console.log(error);
          });
        }
      } else {
        nuevosValores2 = ev.target._dataItem.dataContext;
        console.log(nuevosValores2);
        let GrupoConcepto_id = nuevosValores2.grupoConcepto_id;
        let Cliente_id = nuevosValores2.clientes_id;
        axios$1.get("api/ceco_concepto/" + GrupoConcepto_id + "/" + Cliente_id, { ob: GrupoConcepto_id }, { ob1: Cliente_id }).then((resp) => {
          let datos = resp.data[0];
          console.log(datos);
          data = [];
          ejex = [];
          let cecos = resp.data[1];
          for (let index = 0; index < cecos.length; index++) {
            let nombreCeco = cecos[index].nombre;
            ejex.push({ category: nombreCeco });
          }
          ejey = [];
          let conceptos = resp.data[2];
          for (let f2 = 0; f2 < conceptos.length; f2++) {
            let nombreConcepto = conceptos[f2].nombre;
            ejey.push({ category: nombreConcepto });
          }
          series.columns.template.events.on("click", (ev2) => {
            if (this.zoom) {
              let nuevosValores3 = ev2.target._dataItem.dataContext;
              console.log(nuevosValores3);
              this.cliente = nuevosValores3.Cliente;
              this.grupo_concepto = nuevosValores3.GrupoConcepto;
              this.SalidaMovimiento = true;
            }
          });
          yAxis.data.setAll(ejex);
          xAxis.data.setAll(ejey);
          this.datosGrafica = datos;
          this.cambiar(this.movimiento.state);
        }).catch(function(error) {
          console.log(error);
        });
      }
    },
    cambiar: function(movimiento) {
      this.movimiento.state = movimiento;
      let data2 = this.datosGrafica;
      console.log(data2);
      let auxData = { ...data2[0] };
      auxData.movimientos = {
        "PRESUPUESTO": 0,
        "SUPLEMENTO": 0,
        "GASTO": 0
      };
      let arrayElementos = [];
      switch (movimiento) {
        case "DISPONIBLE":
        case "TOTAL":
          data2.forEach((salida) => {
            if (auxData.Cliente === salida.Cliente && auxData.GrupoConcepto === salida.GrupoConcepto) {
              auxData.movimientos[salida.Movimiento] = salida.Cantidad;
            } else {
              auxData.Cantidad = auxData.movimientos["PRESUPUESTO"] + auxData.movimientos["SUPLEMENTO"];
              if (movimiento === "DISPONIBLE") {
                auxData.Cantidad = auxData.Cantidad - auxData.movimientos["GASTO"];
              }
              arrayElementos.push(auxData);
              auxData = salida;
              auxData.movimientos = {
                "PRESUPUESTO": 0,
                "SUPLEMENTO": 0,
                "GASTO": 0
              };
              auxData.movimientos[salida.Movimiento] = salida.Cantidad;
            }
          });
          auxData.Cantidad = auxData.movimientos["PRESUPUESTO"] + auxData.movimientos["SUPLEMENTO"];
          if (movimiento === "DISPONIBLE") {
            auxData.Cantidad = auxData.Cantidad - auxData.movimientos["GASTO"];
          }
          arrayElementos.push(auxData);
          console.log(arrayElementos);
          data2 = arrayElementos;
          break;
        default:
          data2 = data2.filter((cantidad) => cantidad.Movimiento === this.movimiento.state);
          break;
      }
      series.data.setAll(data2);
    },
    closeModalSalida: function() {
      this.SalidaMovimiento = false;
    }
  },
  components: { ModalSalidaMovimiento: _sfc_main$g, ButtonPres: _sfc_main$N, Link, ButtonReturn: _sfc_main$d }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  const _component_ButtonPres = resolveComponent("ButtonPres");
  const _component_ModalSalidaMovimiento = resolveComponent("ModalSalidaMovimiento");
  const _component_ButtonReturn = resolveComponent("ButtonReturn");
  _push(`<!--[--><div class="group" data-v-d023b93c>`);
  _push(ssrRenderComponent(_component_Link, {
    href: _ctx.route("clientes.index"),
    only: ["cantidades", "clientes", "filtros"],
    preserveScroll: "",
    data: { grupoType: "clientes" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ButtonPres, {
          class: "buttonCECO",
          style: { "background-color": "#111F2E" }
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CECO `);
            } else {
              return [
                createTextVNode(" CECO ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ButtonPres, {
            class: "buttonCECO",
            style: { "background-color": "#111F2E" }
          }, {
            default: withCtx(() => [
              createTextVNode(" CECO ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_Link, {
    href: _ctx.route("clientes.index"),
    only: ["cantidades", "grupo_conceptos", "filtros"],
    preserveScroll: "",
    data: { grupoType2: "grupo_conceptos" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ButtonPres, {
          class: "buttonCON",
          style: { "background-color": "#111F2E" }
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` CON. `);
            } else {
              return [
                createTextVNode(" CON. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_ButtonPres, {
            class: "buttonCON",
            style: { "background-color": "#111F2E" }
          }, {
            default: withCtx(() => [
              createTextVNode(" CON. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="dropdown" data-v-d023b93c><button onclick="myFunction()" class="dropbtn" data-v-d023b93c><p data-v-d023b93c>$</p></button><div id="myDropdown" class="dropdown-content" data-v-d023b93c><button id="PRESUPUESTO" data-v-d023b93c>Presupuesto</button><button id="SUPLEMENTO" data-v-d023b93c>Suplemento</button><button id="TOTAL" data-v-d023b93c>Total</button><button id="GASTO" data-v-d023b93c>Gasto</button><button id="DISPONIBLE" data-v-d023b93c>Disponible</button></div></div></div>`);
  _push(ssrRenderComponent(_component_ModalSalidaMovimiento, {
    show: $data.SalidaMovimiento,
    ceco: $data.cliente,
    concepto: $data.grupo_concepto,
    onClose: $options.closeModalSalida
  }, null, _parent));
  if ($data.zoom) {
    _push(ssrRenderComponent(_component_ButtonReturn, { class: "buttonReturn" }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<a${ssrRenderAttr("href", _ctx.route("clientes.index"))} data-v-d023b93c${_scopeId}> Regresar </a>`);
        } else {
          return [
            createVNode("a", {
              href: _ctx.route("clientes.index")
            }, " Regresar ", 8, ["href"])
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="graph" data-v-d023b93c></div><!--]-->`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/GraphPrueba.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const GraphPrueba = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d023b93c"]]);
const GraphPrueba$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GraphPrueba
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "PresupuestosIndex",
  __ssrInlineRender: true,
  props: {
    clientes: Object,
    grupo_conceptos: Object,
    cantidades: Object,
    movimientos: Object,
    solicitudes: Object,
    filtros: Object
  },
  setup(__props) {
    const props = __props;
    let clientes = props.clientes;
    let grupo_conceptos = props.grupo_conceptos;
    props.cantidades;
    let date = ref({ month: new Date().getMonth(), year: new Date().getFullYear() });
    const changeDate = (newDate) => {
      date.value = newDate;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "Presupuestos" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-around"${_scopeId}><h2 class="text-xl font-semibold leading-tight text-white"${_scopeId}> Presupuestos </h2>`);
            _push2(ssrRenderComponent(_sfc_main$o, {
              month: unref(date).month,
              year: unref(date).year,
              onChangeDate: ($event) => changeDate($event)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="button_submenu"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, { style: { "float": "left" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("tabla.presupuestos"),
                    "preserve-state": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`TABLA DE DATOS`);
                      } else {
                        return [
                          createTextVNode("TABLA DE DATOS")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: _ctx.route("tabla.presupuestos"),
                      "preserve-state": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("TABLA DE DATOS")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-around" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-white" }, " Presupuestos "),
                createVNode(_sfc_main$o, {
                  month: unref(date).month,
                  year: unref(date).year,
                  onChangeDate: ($event) => changeDate($event)
                }, null, 8, ["month", "year", "onChangeDate"])
              ]),
              createVNode("div", { class: "button_submenu" }, [
                createVNode(_sfc_main$1J, { style: { "float": "left" } }, {
                  default: withCtx(() => [
                    createVNode(unref(Link), {
                      href: _ctx.route("tabla.presupuestos"),
                      "preserve-state": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("TABLA DE DATOS")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12 fondo_general"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-xl sm:rounded-lg"${_scopeId}><div class="datetexts"${_scopeId}><div class="dashboard_texts"${_scopeId}><div class="texts_dash"${_scopeId}><h1 class="dashboard_text"${_scopeId}>Dashboard</h1></div><div class="texts_dash"${_scopeId}><h2 class="dashboard_text2"${_scopeId}>TABLA DE DATOS</h2></div></div></div>`);
            _push2(ssrRenderComponent(GraphPrueba, {
              date: unref(date),
              filtros: __props.filtros,
              movimientos: __props.movimientos,
              clientes: unref(clientes),
              grupo_conceptos: unref(grupo_conceptos),
              cantidades: __props.cantidades,
              solicitudes: __props.solicitudes
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12 fondo_general" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-xl sm:rounded-lg" }, [
                    createVNode("div", { class: "datetexts" }, [
                      createVNode("div", { class: "dashboard_texts" }, [
                        createVNode("div", { class: "texts_dash" }, [
                          createVNode("h1", { class: "dashboard_text" }, "Dashboard")
                        ]),
                        createVNode("div", { class: "texts_dash" }, [
                          createVNode("h2", { class: "dashboard_text2" }, "TABLA DE DATOS")
                        ])
                      ])
                    ]),
                    createVNode(GraphPrueba, {
                      date: unref(date),
                      filtros: __props.filtros,
                      movimientos: __props.movimientos,
                      clientes: unref(clientes),
                      grupo_conceptos: unref(grupo_conceptos),
                      cantidades: __props.cantidades,
                      solicitudes: __props.solicitudes
                    }, null, 8, ["date", "filtros", "movimientos", "clientes", "grupo_conceptos", "cantidades", "solicitudes"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/PresupuestosIndex.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const PresupuestosIndex = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "TablaPresupuestosIndex",
  __ssrInlineRender: true,
  props: {
    ceco_concepto: Object,
    cecos: Object,
    conceptos: Object
  },
  setup(__props) {
    const props = __props;
    let movimiento = ref({ state: "PRESUPUESTO" });
    let idMov = ref(3);
    let tableCecoConceptos = ref([]);
    tableCecoConceptos.value = [];
    tableCecoConceptos.value = props.ceco_concepto.filter((ceco_concepto) => ceco_concepto.Movimiento === movimiento.value.state);
    let date = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    });
    const changeDate = (newDate) => {
      tableCecoConceptos.value = [];
      date.value = newDate;
      let formatDatePHP = null;
      if (date.value.month != 10 && date.value.month != 11) {
        formatDatePHP = date.value.year + "-0" + date.value.month;
      } else {
        formatDatePHP = date.value.year + "-" + date.value.month;
      }
      Inertia$1.visit(route("tabla.presupuestos"), {
        data: {
          fecha: formatDatePHP
        },
        preserveState: true,
        preserveScroll: true,
        only: ["ceco_concepto"]
      });
      tableCecoConceptos.value = props.ceco_concepto.filter((ceco_concepto) => ceco_concepto.Movimiento === movimiento.value.state);
    };
    const cambiar = (movimientoActual) => {
      tableCecoConceptos.value = [];
      movimiento.value.state = movimientoActual;
      let result = props.ceco_concepto.filter((ceco_concepto) => ceco_concepto.Movimiento === movimientoActual);
      tableCecoConceptos.value = result;
      switch (movimientoActual) {
        case "GASTO":
          idMov.value = 1;
          break;
        case "SUPLEMENTO":
          idMov.value = 2;
          break;
        case "PRESUPUESTO":
          idMov.value = 3;
          break;
      }
    };
    let newCecoConcepto = ref(false);
    const openCecoConcepto = () => {
      newCecoConcepto.value = true;
    };
    const closeModalCecoConcepto = () => {
      newCecoConcepto.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "Presupuestos" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-around"${_scopeId}><h2 class="text-xl font-semibold leading-tight text-white"${_scopeId}> Presupuestos </h2>`);
            _push2(ssrRenderComponent(_sfc_main$o, {
              month: unref(date).month,
              year: unref(date).year,
              onChangeDate: ($event) => changeDate($event)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="button_submenu"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, { style: { "float": "left" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/clientes",
                    "preserve-state": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`GR\xC1FICA Y TABLA`);
                      } else {
                        return [
                          createTextVNode("GR\xC1FICA Y TABLA")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: "/clientes",
                      "preserve-state": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("GR\xC1FICA Y TABLA")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-around" }, [
                createVNode("h2", { class: "text-xl font-semibold leading-tight text-white" }, " Presupuestos "),
                createVNode(_sfc_main$o, {
                  month: unref(date).month,
                  year: unref(date).year,
                  onChangeDate: ($event) => changeDate($event)
                }, null, 8, ["month", "year", "onChangeDate"])
              ]),
              createVNode("div", { class: "button_submenu" }, [
                createVNode(_sfc_main$1J, { style: { "float": "left" } }, {
                  default: withCtx(() => [
                    createVNode(unref(Link), {
                      href: "/clientes",
                      "preserve-state": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("GR\xC1FICA Y TABLA")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12 fondo_general" style="${ssrRenderStyle({ "margin-top": "-7rem" })}"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden shadow-xl sm:rounded-lg"${_scopeId}><div class="datetexts"${_scopeId}><div class="dashboard_texts"${_scopeId}><div class="texts_dash"${_scopeId}><h1 class="dashboard_text" style="${ssrRenderStyle({ "color": "white" })}"${_scopeId}>Dashboard</h1></div><div class="texts_dash"${_scopeId}><h2 class="dashboard_text2"${_scopeId}>TABLA DE DATOS</h2></div></div></div><div style="${ssrRenderStyle({ "float": "left", "margin": "2rem", "margin-right": "0rem" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(Card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="dropdown"${_scopeId2}><button onclick="myFunction()" class="dropbtn" style="${ssrRenderStyle({ "margin-left": "1rem", "margin-top": "0rem", "margin-bottom": "1rem", "padding": "0.5rem", "float": "left" })}"${_scopeId2}><p${_scopeId2}>$</p></button><div id="myDropdown" class="dropdown-content"${_scopeId2}><button id="PRESUPUESTO"${_scopeId2}>Presupuesto</button><button id="SUPLEMENTO"${_scopeId2}>Suplemento</button><button id="GASTO"${_scopeId2}>Gasto</button></div><div style="${ssrRenderStyle({ "float": "right", "margin-left": "5rem" })}"${_scopeId2}><p style="${ssrRenderStyle({ "color": "white" })}"${_scopeId2}>${ssrInterpolate(unref(movimiento).state)}</p></div></div>`);
                  _push3(ssrRenderComponent(TablaCecoConcepto, { "per-page": 10 }, {
                    thead: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<tr${_scopeId3}><th${_scopeId3}> CECO<br${_scopeId3}>`);
                        _push4(ssrRenderComponent(_sfc_main$17, {
                          style: { "padding": "0rem", "padding-inline": "0.5rem" },
                          onClick: openCecoConcepto
                        }, null, _parent4, _scopeId3));
                        _push4(`</th><th${_scopeId3}>CONCEPTO</th><th${_scopeId3}>$</th></tr>`);
                      } else {
                        return [
                          createVNode("tr", null, [
                            createVNode("th", null, [
                              createTextVNode(" CECO"),
                              createVNode("br"),
                              createVNode(_sfc_main$17, {
                                style: { "padding": "0rem", "padding-inline": "0.5rem" },
                                onClick: openCecoConcepto
                              })
                            ]),
                            createVNode("th", null, "CONCEPTO"),
                            createVNode("th", null, "$")
                          ])
                        ];
                      }
                    }),
                    tbody: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(tableCecoConceptos), (datos) => {
                          _push4(`<tr${_scopeId3}><td${_scopeId3}>${ssrInterpolate(datos.CECO)}</td><td${_scopeId3}>${ssrInterpolate(datos.Concepto)}</td><td${_scopeId3}>${ssrInterpolate(datos.Cantidad)}</td></tr>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(tableCecoConceptos), (datos) => {
                            return openBlock(), createBlock("tr", {
                              key: datos.id
                            }, [
                              createVNode("td", null, toDisplayString(datos.CECO), 1),
                              createVNode("td", null, toDisplayString(datos.Concepto), 1),
                              createVNode("td", null, toDisplayString(datos.Cantidad), 1)
                            ]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$j, {
                    show: unref(newCecoConcepto),
                    cecos: __props.cecos,
                    movimiento: unref(movimiento).state,
                    idmovimiento: unref(idMov),
                    conceptos: __props.conceptos,
                    onClose: closeModalCecoConcepto
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "dropdown" }, [
                      createVNode("button", {
                        onclick: "myFunction()",
                        class: "dropbtn",
                        style: { "margin-left": "1rem", "margin-top": "0rem", "margin-bottom": "1rem", "padding": "0.5rem", "float": "left" }
                      }, [
                        createVNode("p", null, "$")
                      ]),
                      createVNode("div", {
                        id: "myDropdown",
                        class: "dropdown-content"
                      }, [
                        createVNode("button", {
                          id: "PRESUPUESTO",
                          onClick: ($event) => cambiar("PRESUPUESTO")
                        }, "Presupuesto", 8, ["onClick"]),
                        createVNode("button", {
                          id: "SUPLEMENTO",
                          onClick: ($event) => cambiar("SUPLEMENTO")
                        }, "Suplemento", 8, ["onClick"]),
                        createVNode("button", {
                          id: "GASTO",
                          onClick: ($event) => cambiar("GASTO")
                        }, "Gasto", 8, ["onClick"])
                      ]),
                      createVNode("div", { style: { "float": "right", "margin-left": "5rem" } }, [
                        createVNode("p", { style: { "color": "white" } }, toDisplayString(unref(movimiento).state), 1)
                      ])
                    ]),
                    createVNode(TablaCecoConcepto, { "per-page": 10 }, {
                      thead: withCtx(() => [
                        createVNode("tr", null, [
                          createVNode("th", null, [
                            createTextVNode(" CECO"),
                            createVNode("br"),
                            createVNode(_sfc_main$17, {
                              style: { "padding": "0rem", "padding-inline": "0.5rem" },
                              onClick: openCecoConcepto
                            })
                          ]),
                          createVNode("th", null, "CONCEPTO"),
                          createVNode("th", null, "$")
                        ])
                      ]),
                      tbody: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(tableCecoConceptos), (datos) => {
                          return openBlock(), createBlock("tr", {
                            key: datos.id
                          }, [
                            createVNode("td", null, toDisplayString(datos.CECO), 1),
                            createVNode("td", null, toDisplayString(datos.Concepto), 1),
                            createVNode("td", null, toDisplayString(datos.Cantidad), 1)
                          ]);
                        }), 128))
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$j, {
                      show: unref(newCecoConcepto),
                      cecos: __props.cecos,
                      movimiento: unref(movimiento).state,
                      idmovimiento: unref(idMov),
                      conceptos: __props.conceptos,
                      onClose: closeModalCecoConcepto
                    }, null, 8, ["show", "cecos", "movimiento", "idmovimiento", "conceptos"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle({ "float": "right", "margin": "2rem", "margin-left": "0rem" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(Card, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(GraficoMovimientos, { datos: __props.ceco_concepto }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(GraficoMovimientos, { datos: __props.ceco_concepto }, null, 8, ["datos"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "py-12 fondo_general",
                style: { "margin-top": "-7rem" }
              }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden shadow-xl sm:rounded-lg" }, [
                    createVNode("div", { class: "datetexts" }, [
                      createVNode("div", { class: "dashboard_texts" }, [
                        createVNode("div", { class: "texts_dash" }, [
                          createVNode("h1", {
                            class: "dashboard_text",
                            style: { "color": "white" }
                          }, "Dashboard")
                        ]),
                        createVNode("div", { class: "texts_dash" }, [
                          createVNode("h2", { class: "dashboard_text2" }, "TABLA DE DATOS")
                        ])
                      ])
                    ]),
                    createVNode("div", { style: { "float": "left", "margin": "2rem", "margin-right": "0rem" } }, [
                      createVNode(Card, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "dropdown" }, [
                            createVNode("button", {
                              onclick: "myFunction()",
                              class: "dropbtn",
                              style: { "margin-left": "1rem", "margin-top": "0rem", "margin-bottom": "1rem", "padding": "0.5rem", "float": "left" }
                            }, [
                              createVNode("p", null, "$")
                            ]),
                            createVNode("div", {
                              id: "myDropdown",
                              class: "dropdown-content"
                            }, [
                              createVNode("button", {
                                id: "PRESUPUESTO",
                                onClick: ($event) => cambiar("PRESUPUESTO")
                              }, "Presupuesto", 8, ["onClick"]),
                              createVNode("button", {
                                id: "SUPLEMENTO",
                                onClick: ($event) => cambiar("SUPLEMENTO")
                              }, "Suplemento", 8, ["onClick"]),
                              createVNode("button", {
                                id: "GASTO",
                                onClick: ($event) => cambiar("GASTO")
                              }, "Gasto", 8, ["onClick"])
                            ]),
                            createVNode("div", { style: { "float": "right", "margin-left": "5rem" } }, [
                              createVNode("p", { style: { "color": "white" } }, toDisplayString(unref(movimiento).state), 1)
                            ])
                          ]),
                          createVNode(TablaCecoConcepto, { "per-page": 10 }, {
                            thead: withCtx(() => [
                              createVNode("tr", null, [
                                createVNode("th", null, [
                                  createTextVNode(" CECO"),
                                  createVNode("br"),
                                  createVNode(_sfc_main$17, {
                                    style: { "padding": "0rem", "padding-inline": "0.5rem" },
                                    onClick: openCecoConcepto
                                  })
                                ]),
                                createVNode("th", null, "CONCEPTO"),
                                createVNode("th", null, "$")
                              ])
                            ]),
                            tbody: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(tableCecoConceptos), (datos) => {
                                return openBlock(), createBlock("tr", {
                                  key: datos.id
                                }, [
                                  createVNode("td", null, toDisplayString(datos.CECO), 1),
                                  createVNode("td", null, toDisplayString(datos.Concepto), 1),
                                  createVNode("td", null, toDisplayString(datos.Cantidad), 1)
                                ]);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$j, {
                            show: unref(newCecoConcepto),
                            cecos: __props.cecos,
                            movimiento: unref(movimiento).state,
                            idmovimiento: unref(idMov),
                            conceptos: __props.conceptos,
                            onClose: closeModalCecoConcepto
                          }, null, 8, ["show", "cecos", "movimiento", "idmovimiento", "conceptos"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { style: { "float": "right", "margin": "2rem", "margin-left": "0rem" } }, [
                      createVNode(Card, null, {
                        default: withCtx(() => [
                          createVNode(GraficoMovimientos, { datos: __props.ceco_concepto }, null, 8, ["datos"])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Presupuestos/TablaPresupuestosIndex.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const TablaPresupuestosIndex = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "PrivacyPolicy",
  __ssrInlineRender: true,
  props: {
    policy: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Privacy Policy" }, null, _parent));
      _push(`<div class="font-sans text-gray-900 antialiased"><div class="pt-4 bg-gray-100"><div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0"><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, null, null, _parent));
      _push(`</div><div class="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">${__props.policy}</div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/PrivacyPolicy.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const PrivacyPolicy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;
      setTimeout(() => passwordInput.value.focus(), 250);
    };
    const deleteUser = () => {
      form.delete(route("current-user.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1K, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Delete Account `);
          } else {
            return [
              createTextVNode(" Delete Account ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Permanently delete your account. `);
          } else {
            return [
              createTextVNode(" Permanently delete your account. ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-xl text-sm text-gray-600"${_scopeId}> Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. </div><div class="mt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1G, { onClick: confirmUserDeletion }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete Account `);
                } else {
                  return [
                    createTextVNode(" Delete Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1F, {
              show: confirmingUserDeletion.value,
              onClose: closeModal
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete Account `);
                } else {
                  return [
                    createTextVNode(" Delete Account ")
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. <div class="mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1D, {
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: "Password",
                    onKeyup: deleteUser
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1B, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createTextVNode(" Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. "),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$1D, {
                        ref_key: "passwordInput",
                        ref: passwordInput,
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        type: "password",
                        class: "mt-1 block w-3/4",
                        placeholder: "Password",
                        onKeyup: withKeys(deleteUser, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                      createVNode(_sfc_main$1B, {
                        message: unref(form).errors.password,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1z, { onClick: closeModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1G, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Delete Account `);
                      } else {
                        return [
                          createTextVNode(" Delete Account ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1z, { onClick: closeModal }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$1G, {
                      class: ["ml-3", { "opacity-25": unref(form).processing }],
                      disabled: unref(form).processing,
                      onClick: deleteUser
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Delete Account ")
                      ]),
                      _: 1
                    }, 8, ["class", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "max-w-xl text-sm text-gray-600" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. "),
              createVNode("div", { class: "mt-5" }, [
                createVNode(_sfc_main$1G, { onClick: confirmUserDeletion }, {
                  default: withCtx(() => [
                    createTextVNode(" Delete Account ")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_sfc_main$1F, {
                show: confirmingUserDeletion.value,
                onClose: closeModal
              }, {
                title: withCtx(() => [
                  createTextVNode(" Delete Account ")
                ]),
                content: withCtx(() => [
                  createTextVNode(" Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. "),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode(_sfc_main$1D, {
                      ref_key: "passwordInput",
                      ref: passwordInput,
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: "password",
                      class: "mt-1 block w-3/4",
                      placeholder: "Password",
                      onKeyup: withKeys(deleteUser, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.password,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$1z, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1G, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Delete Account ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["show"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const DeleteUserForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "LogoutOtherBrowserSessionsForm",
  __ssrInlineRender: true,
  props: {
    sessions: Array
  },
  setup(__props) {
    const confirmingLogout = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmLogout = () => {
      confirmingLogout.value = true;
      setTimeout(() => passwordInput.value.focus(), 250);
    };
    const logoutOtherBrowserSessions = () => {
      form.delete(route("other-browser-sessions.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingLogout.value = false;
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1K, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Browser Sessions `);
          } else {
            return [
              createTextVNode(" Browser Sessions ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Manage and log out your active sessions on other browsers and devices. `);
          } else {
            return [
              createTextVNode(" Manage and log out your active sessions on other browsers and devices. ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-xl text-sm text-gray-600"${_scopeId}> If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password. </div>`);
            if (__props.sessions.length > 0) {
              _push2(`<div class="mt-5 space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.sessions, (session, i2) => {
                _push2(`<div class="flex items-center"${_scopeId}><div${_scopeId}>`);
                if (session.agent.is_desktop) {
                  _push2(`<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8 text-gray-500"${_scopeId}><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-gray-500"${_scopeId}><path d="M0 0h24v24H0z" stroke="none"${_scopeId}></path><rect x="7" y="4" width="10" height="16" rx="1"${_scopeId}></rect><path d="M11 5h2M12 17v.01"${_scopeId}></path></svg>`);
                }
                _push2(`</div><div class="ml-3"${_scopeId}><div class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(session.agent.platform ? session.agent.platform : "Unknown")} - ${ssrInterpolate(session.agent.browser ? session.agent.browser : "Unknown")}</div><div${_scopeId}><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(session.ip_address)}, `);
                if (session.is_current_device) {
                  _push2(`<span class="text-green-500 font-semibold"${_scopeId}>This device</span>`);
                } else {
                  _push2(`<span${_scopeId}>Last active ${ssrInterpolate(session.last_active)}</span>`);
                }
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center mt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1J, { onClick: confirmLogout }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out Other Browser Sessions `);
                } else {
                  return [
                    createTextVNode(" Log Out Other Browser Sessions ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1M, {
              on: unref(form).recentlySuccessful,
              class: "ml-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Done. `);
                } else {
                  return [
                    createTextVNode(" Done. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1F, {
              show: confirmingLogout.value,
              onClose: closeModal
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out Other Browser Sessions `);
                } else {
                  return [
                    createTextVNode(" Log Out Other Browser Sessions ")
                  ];
                }
              }),
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. <div class="mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$1D, {
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: "Password",
                    onKeyup: logoutOtherBrowserSessions
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1B, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createTextVNode(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. "),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$1D, {
                        ref_key: "passwordInput",
                        ref: passwordInput,
                        modelValue: unref(form).password,
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        type: "password",
                        class: "mt-1 block w-3/4",
                        placeholder: "Password",
                        onKeyup: withKeys(logoutOtherBrowserSessions, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                      createVNode(_sfc_main$1B, {
                        message: unref(form).errors.password,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1z, { onClick: closeModal }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancel `);
                      } else {
                        return [
                          createTextVNode(" Cancel ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1J, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: logoutOtherBrowserSessions
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Log Out Other Browser Sessions `);
                      } else {
                        return [
                          createTextVNode(" Log Out Other Browser Sessions ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1z, { onClick: closeModal }, {
                      default: withCtx(() => [
                        createTextVNode(" Cancel ")
                      ]),
                      _: 1
                    }),
                    createVNode(_sfc_main$1J, {
                      class: ["ml-3", { "opacity-25": unref(form).processing }],
                      disabled: unref(form).processing,
                      onClick: logoutOtherBrowserSessions
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Log Out Other Browser Sessions ")
                      ]),
                      _: 1
                    }, 8, ["class", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "max-w-xl text-sm text-gray-600" }, " If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password. "),
              __props.sessions.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-5 space-y-6"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.sessions, (session, i2) => {
                  return openBlock(), createBlock("div", {
                    key: i2,
                    class: "flex items-center"
                  }, [
                    createVNode("div", null, [
                      session.agent.is_desktop ? (openBlock(), createBlock("svg", {
                        key: 0,
                        fill: "none",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        class: "w-8 h-8 text-gray-500"
                      }, [
                        createVNode("path", { d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })
                      ])) : (openBlock(), createBlock("svg", {
                        key: 1,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        fill: "none",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        class: "w-8 h-8 text-gray-500"
                      }, [
                        createVNode("path", {
                          d: "M0 0h24v24H0z",
                          stroke: "none"
                        }),
                        createVNode("rect", {
                          x: "7",
                          y: "4",
                          width: "10",
                          height: "16",
                          rx: "1"
                        }),
                        createVNode("path", { d: "M11 5h2M12 17v.01" })
                      ]))
                    ]),
                    createVNode("div", { class: "ml-3" }, [
                      createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(session.agent.platform ? session.agent.platform : "Unknown") + " - " + toDisplayString(session.agent.browser ? session.agent.browser : "Unknown"), 1),
                      createVNode("div", null, [
                        createVNode("div", { class: "text-xs text-gray-500" }, [
                          createTextVNode(toDisplayString(session.ip_address) + ", ", 1),
                          session.is_current_device ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-green-500 font-semibold"
                          }, "This device")) : (openBlock(), createBlock("span", { key: 1 }, "Last active " + toDisplayString(session.last_active), 1))
                        ])
                      ])
                    ])
                  ]);
                }), 128))
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "flex items-center mt-5" }, [
                createVNode(_sfc_main$1J, { onClick: confirmLogout }, {
                  default: withCtx(() => [
                    createTextVNode(" Log Out Other Browser Sessions ")
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$1M, {
                  on: unref(form).recentlySuccessful,
                  class: "ml-3"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Done. ")
                  ]),
                  _: 1
                }, 8, ["on"])
              ]),
              createVNode(_sfc_main$1F, {
                show: confirmingLogout.value,
                onClose: closeModal
              }, {
                title: withCtx(() => [
                  createTextVNode(" Log Out Other Browser Sessions ")
                ]),
                content: withCtx(() => [
                  createTextVNode(" Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices. "),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode(_sfc_main$1D, {
                      ref_key: "passwordInput",
                      ref: passwordInput,
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: "password",
                      class: "mt-1 block w-3/4",
                      placeholder: "Password",
                      onKeyup: withKeys(logoutOtherBrowserSessions, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(form).errors.password,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode(_sfc_main$1z, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$1J, {
                    class: ["ml-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: logoutOtherBrowserSessions
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Log Out Other Browser Sessions ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["show"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const LogoutOtherBrowserSessionsForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "ConfirmsPassword",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Confirm Password"
    },
    content: {
      type: String,
      default: "For your security, please confirm your password to continue."
    },
    button: {
      type: String,
      default: "Confirm"
    }
  },
  emits: ["confirmed"],
  setup(__props, { emit }) {
    const confirmingPassword = ref(false);
    const form = reactive({
      password: "",
      error: "",
      processing: false
    });
    const passwordInput = ref(null);
    const confirmPassword = () => {
      form.processing = true;
      axios.post(route("password.confirm"), {
        password: form.password
      }).then(() => {
        form.processing = false;
        closeModal();
        nextTick().then(() => emit("confirmed"));
      }).catch((error) => {
        form.processing = false;
        form.error = error.response.data.errors.password[0];
        passwordInput.value.focus();
      });
    };
    const closeModal = () => {
      confirmingPassword.value = false;
      form.password = "";
      form.error = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(_attrs)}><span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
      _push(ssrRenderComponent(_sfc_main$1F, {
        show: confirmingPassword.value,
        onClose: closeModal
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.title), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.content)} <div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1D, {
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: form.password,
              "onUpdate:modelValue": ($event) => form.password = $event,
              type: "password",
              class: "mt-1 block w-3/4",
              placeholder: "Password",
              onKeyup: confirmPassword
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: form.error,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.content) + " ", 1),
              createVNode("div", { class: "mt-4" }, [
                createVNode(_sfc_main$1D, {
                  ref_key: "passwordInput",
                  ref: passwordInput,
                  modelValue: form.password,
                  "onUpdate:modelValue": ($event) => form.password = $event,
                  type: "password",
                  class: "mt-1 block w-3/4",
                  placeholder: "Password",
                  onKeyup: withKeys(confirmPassword, ["enter"])
                }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                createVNode(_sfc_main$1B, {
                  message: form.error,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1z, { onClick: closeModal }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: ["ml-3", { "opacity-25": form.processing }],
              disabled: form.processing,
              onClick: confirmPassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.button)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.button), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1z, { onClick: closeModal }, {
                default: withCtx(() => [
                  createTextVNode(" Cancel ")
                ]),
                _: 1
              }),
              createVNode(_sfc_main$1J, {
                class: ["ml-3", { "opacity-25": form.processing }],
                disabled: form.processing,
                onClick: confirmPassword
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.button), 1)
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Jetstream/ConfirmsPassword.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "TwoFactorAuthenticationForm",
  __ssrInlineRender: true,
  props: {
    requiresConfirmation: Boolean
  },
  setup(__props) {
    const props = __props;
    const enabling = ref(false);
    const confirming = ref(false);
    const disabling = ref(false);
    const qrCode = ref(null);
    const setupKey = ref(null);
    const recoveryCodes = ref([]);
    const confirmationForm = useForm({
      code: ""
    });
    const twoFactorEnabled = computed(
      () => {
        var _a;
        return !enabling.value && ((_a = usePage().props.value.user) == null ? void 0 : _a.two_factor_enabled);
      }
    );
    watch(twoFactorEnabled, () => {
      if (!twoFactorEnabled.value) {
        confirmationForm.reset();
        confirmationForm.clearErrors();
      }
    });
    const enableTwoFactorAuthentication = () => {
      enabling.value = true;
      Inertia$1.post("/user/two-factor-authentication", {}, {
        preserveScroll: true,
        onSuccess: () => Promise.all([
          showQrCode(),
          showSetupKey(),
          showRecoveryCodes()
        ]),
        onFinish: () => {
          enabling.value = false;
          confirming.value = props.requiresConfirmation;
        }
      });
    };
    const showQrCode = () => {
      return axios.get("/user/two-factor-qr-code").then((response) => {
        qrCode.value = response.data.svg;
      });
    };
    const showSetupKey = () => {
      return axios.get("/user/two-factor-secret-key").then((response) => {
        setupKey.value = response.data.secretKey;
      });
    };
    const showRecoveryCodes = () => {
      return axios.get("/user/two-factor-recovery-codes").then((response) => {
        recoveryCodes.value = response.data;
      });
    };
    const confirmTwoFactorAuthentication = () => {
      confirmationForm.post("/user/confirmed-two-factor-authentication", {
        errorBag: "confirmTwoFactorAuthentication",
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          confirming.value = false;
          qrCode.value = null;
          setupKey.value = null;
        }
      });
    };
    const regenerateRecoveryCodes = () => {
      axios.post("/user/two-factor-recovery-codes").then(() => showRecoveryCodes());
    };
    const disableTwoFactorAuthentication = () => {
      disabling.value = true;
      Inertia$1.delete("/user/two-factor-authentication", {
        preserveScroll: true,
        onSuccess: () => {
          disabling.value = false;
          confirming.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1K, _attrs, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Two Factor Authentication `);
          } else {
            return [
              createTextVNode(" Two Factor Authentication ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Add additional security to your account using two factor authentication. `);
          } else {
            return [
              createTextVNode(" Add additional security to your account using two factor authentication. ")
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(twoFactorEnabled) && !confirming.value) {
              _push2(`<h3 class="text-lg font-medium text-gray-900"${_scopeId}> You have enabled two factor authentication. </h3>`);
            } else if (unref(twoFactorEnabled) && confirming.value) {
              _push2(`<h3 class="text-lg font-medium text-gray-900"${_scopeId}> Finish enabling two factor authentication. </h3>`);
            } else {
              _push2(`<h3 class="text-lg font-medium text-gray-900"${_scopeId}> You have not enabled two factor authentication. </h3>`);
            }
            _push2(`<div class="mt-3 max-w-xl text-sm text-gray-600"${_scopeId}><p${_scopeId}> When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone&#39;s Google Authenticator application. </p></div>`);
            if (unref(twoFactorEnabled)) {
              _push2(`<div${_scopeId}>`);
              if (qrCode.value) {
                _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-sm text-gray-600"${_scopeId}>`);
                if (confirming.value) {
                  _push2(`<p class="font-semibold"${_scopeId}> To finish enabling two factor authentication, scan the following QR code using your phone&#39;s authenticator application or enter the setup key and provide the generated OTP code. </p>`);
                } else {
                  _push2(`<p${_scopeId}> Two factor authentication is now enabled. Scan the following QR code using your phone&#39;s authenticator application or enter the setup key. </p>`);
                }
                _push2(`</div><div class="mt-4"${_scopeId}>${qrCode.value}</div>`);
                if (setupKey.value) {
                  _push2(`<div class="mt-4 max-w-xl text-sm text-gray-600"${_scopeId}><p class="font-semibold"${_scopeId}> Setup Key: <span${_scopeId}>${setupKey.value}</span></p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (confirming.value) {
                  _push2(`<div class="mt-4"${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$1A, {
                    for: "code",
                    value: "Code"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_sfc_main$1D, {
                    id: "code",
                    modelValue: unref(confirmationForm).code,
                    "onUpdate:modelValue": ($event) => unref(confirmationForm).code = $event,
                    type: "text",
                    name: "code",
                    class: "block mt-1 w-1/2",
                    inputmode: "numeric",
                    autofocus: "",
                    autocomplete: "one-time-code",
                    onKeyup: confirmTwoFactorAuthentication
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_sfc_main$1B, {
                    message: unref(confirmationForm).errors.code,
                    class: "mt-2"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (recoveryCodes.value.length > 0 && !confirming.value) {
                _push2(`<div${_scopeId}><div class="mt-4 max-w-xl text-sm text-gray-600"${_scopeId}><p class="font-semibold"${_scopeId}> Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. </p></div><div class="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg"${_scopeId}><!--[-->`);
                ssrRenderList(recoveryCodes.value, (code) => {
                  _push2(`<div${_scopeId}>${ssrInterpolate(code)}</div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-5"${_scopeId}>`);
            if (!unref(twoFactorEnabled)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, { onConfirmed: enableTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$1J, {
                      type: "button",
                      class: { "opacity-25": enabling.value },
                      disabled: enabling.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Enable `);
                        } else {
                          return [
                            createTextVNode(" Enable ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$1J, {
                        type: "button",
                        class: { "opacity-25": enabling.value },
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Enable ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, { onConfirmed: confirmTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$1J, {
                        type: "button",
                        class: ["mr-3", { "opacity-25": enabling.value }],
                        disabled: enabling.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Confirm `);
                          } else {
                            return [
                              createTextVNode(" Confirm ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$1J, {
                        key: 0,
                        type: "button",
                        class: ["mr-3", { "opacity-25": enabling.value }],
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Confirm ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, { onConfirmed: regenerateRecoveryCodes }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (recoveryCodes.value.length > 0 && !confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$1z, { class: "mr-3" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Regenerate Recovery Codes `);
                          } else {
                            return [
                              createTextVNode(" Regenerate Recovery Codes ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      recoveryCodes.value.length > 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$1z, {
                        key: 0,
                        class: "mr-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Regenerate Recovery Codes ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, { onConfirmed: showRecoveryCodes }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (recoveryCodes.value.length === 0 && !confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$1z, { class: "mr-3" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Show Recovery Codes `);
                          } else {
                            return [
                              createTextVNode(" Show Recovery Codes ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      recoveryCodes.value.length === 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$1z, {
                        key: 0,
                        class: "mr-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Show Recovery Codes ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, { onConfirmed: disableTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$1z, {
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Cancel `);
                          } else {
                            return [
                              createTextVNode(" Cancel ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$1z, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$6, { onConfirmed: disableTwoFactorAuthentication }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!confirming.value) {
                      _push3(ssrRenderComponent(_sfc_main$1G, {
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Disable `);
                          } else {
                            return [
                              createTextVNode(" Disable ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      !confirming.value ? (openBlock(), createBlock(_sfc_main$1G, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Disable ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              unref(twoFactorEnabled) && !confirming.value ? (openBlock(), createBlock("h3", {
                key: 0,
                class: "text-lg font-medium text-gray-900"
              }, " You have enabled two factor authentication. ")) : unref(twoFactorEnabled) && confirming.value ? (openBlock(), createBlock("h3", {
                key: 1,
                class: "text-lg font-medium text-gray-900"
              }, " Finish enabling two factor authentication. ")) : (openBlock(), createBlock("h3", {
                key: 2,
                class: "text-lg font-medium text-gray-900"
              }, " You have not enabled two factor authentication. ")),
              createVNode("div", { class: "mt-3 max-w-xl text-sm text-gray-600" }, [
                createVNode("p", null, " When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application. ")
              ]),
              unref(twoFactorEnabled) ? (openBlock(), createBlock("div", { key: 3 }, [
                qrCode.value ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "mt-4 max-w-xl text-sm text-gray-600" }, [
                    confirming.value ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "font-semibold"
                    }, " To finish enabling two factor authentication, scan the following QR code using your phone's authenticator application or enter the setup key and provide the generated OTP code. ")) : (openBlock(), createBlock("p", { key: 1 }, " Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application or enter the setup key. "))
                  ]),
                  createVNode("div", {
                    class: "mt-4",
                    innerHTML: qrCode.value
                  }, null, 8, ["innerHTML"]),
                  setupKey.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 max-w-xl text-sm text-gray-600"
                  }, [
                    createVNode("p", { class: "font-semibold" }, [
                      createTextVNode(" Setup Key: "),
                      createVNode("span", { innerHTML: setupKey.value }, null, 8, ["innerHTML"])
                    ])
                  ])) : createCommentVNode("", true),
                  confirming.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-4"
                  }, [
                    createVNode(_sfc_main$1A, {
                      for: "code",
                      value: "Code"
                    }),
                    createVNode(_sfc_main$1D, {
                      id: "code",
                      modelValue: unref(confirmationForm).code,
                      "onUpdate:modelValue": ($event) => unref(confirmationForm).code = $event,
                      type: "text",
                      name: "code",
                      class: "block mt-1 w-1/2",
                      inputmode: "numeric",
                      autofocus: "",
                      autocomplete: "one-time-code",
                      onKeyup: withKeys(confirmTwoFactorAuthentication, ["enter"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                    createVNode(_sfc_main$1B, {
                      message: unref(confirmationForm).errors.code,
                      class: "mt-2"
                    }, null, 8, ["message"])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                recoveryCodes.value.length > 0 && !confirming.value ? (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("div", { class: "mt-4 max-w-xl text-sm text-gray-600" }, [
                    createVNode("p", { class: "font-semibold" }, " Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost. ")
                  ]),
                  createVNode("div", { class: "grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(recoveryCodes.value, (code) => {
                      return openBlock(), createBlock("div", { key: code }, toDisplayString(code), 1);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "mt-5" }, [
                !unref(twoFactorEnabled) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_sfc_main$6, { onConfirmed: enableTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1J, {
                        type: "button",
                        class: { "opacity-25": enabling.value },
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Enable ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ]),
                    _: 1
                  })
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_sfc_main$6, { onConfirmed: confirmTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$1J, {
                        key: 0,
                        type: "button",
                        class: ["mr-3", { "opacity-25": enabling.value }],
                        disabled: enabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Confirm ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$6, { onConfirmed: regenerateRecoveryCodes }, {
                    default: withCtx(() => [
                      recoveryCodes.value.length > 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$1z, {
                        key: 0,
                        class: "mr-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Regenerate Recovery Codes ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$6, { onConfirmed: showRecoveryCodes }, {
                    default: withCtx(() => [
                      recoveryCodes.value.length === 0 && !confirming.value ? (openBlock(), createBlock(_sfc_main$1z, {
                        key: 0,
                        class: "mr-3"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Show Recovery Codes ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$6, { onConfirmed: disableTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      confirming.value ? (openBlock(), createBlock(_sfc_main$1z, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_sfc_main$6, { onConfirmed: disableTwoFactorAuthentication }, {
                    default: withCtx(() => [
                      !confirming.value ? (openBlock(), createBlock(_sfc_main$1G, {
                        key: 0,
                        class: { "opacity-25": disabling.value },
                        disabled: disabling.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Disable ")
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const TwoFactorAuthenticationForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const updatePassword = () => {
      form.put(route("user-password.update"), {
        errorBag: "updatePassword",
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
          if (form.errors.password) {
            form.reset("password", "password_confirmation");
            passwordInput.value.focus();
          }
          if (form.errors.current_password) {
            form.reset("current_password");
            currentPasswordInput.value.focus();
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1E, mergeProps({ onSubmitted: updatePassword }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Update Password `);
          } else {
            return [
              createTextVNode(" Update Password ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ensure your account is using a long, random password to stay secure. `);
          } else {
            return [
              createTextVNode(" Ensure your account is using a long, random password to stay secure. ")
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "current_password",
              value: "Current Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "current_password",
              ref_key: "currentPasswordInput",
              ref: currentPasswordInput,
              modelValue: unref(form).current_password,
              "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
              type: "password",
              class: "mt-1 block w-full",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.current_password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password",
              value: "New Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-full",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "password_confirmation",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              type: "password",
              class: "mt-1 block w-full",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.password_confirmation,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$1A, {
                  for: "current_password",
                  value: "Current Password"
                }),
                createVNode(_sfc_main$1D, {
                  id: "current_password",
                  ref_key: "currentPasswordInput",
                  ref: currentPasswordInput,
                  modelValue: unref(form).current_password,
                  "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
                  type: "password",
                  class: "mt-1 block w-full",
                  autocomplete: "current-password"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1B, {
                  message: unref(form).errors.current_password,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$1A, {
                  for: "password",
                  value: "New Password"
                }),
                createVNode(_sfc_main$1D, {
                  id: "password",
                  ref_key: "passwordInput",
                  ref: passwordInput,
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                  type: "password",
                  class: "mt-1 block w-full",
                  autocomplete: "new-password"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1B, {
                  message: unref(form).errors.password,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$1A, {
                  for: "password_confirmation",
                  value: "Confirm Password"
                }),
                createVNode(_sfc_main$1D, {
                  id: "password_confirmation",
                  modelValue: unref(form).password_confirmation,
                  "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                  type: "password",
                  class: "mt-1 block w-full",
                  autocomplete: "new-password"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1B, {
                  message: unref(form).errors.password_confirmation,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1M, {
              on: unref(form).recentlySuccessful,
              class: "mr-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Saved. `);
                } else {
                  return [
                    createTextVNode(" Saved. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save `);
                } else {
                  return [
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1M, {
                on: unref(form).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Saved. ")
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode(_sfc_main$1J, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const UpdatePasswordForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    user: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      _method: "PUT",
      name: props.user.name,
      email: props.user.email,
      photo: null
    });
    const verificationLinkSent = ref(null);
    const photoPreview = ref(null);
    const photoInput = ref(null);
    const updateProfileInformation = () => {
      if (photoInput.value) {
        form.photo = photoInput.value.files[0];
      }
      form.post(route("user-profile-information.update"), {
        errorBag: "updateProfileInformation",
        preserveScroll: true,
        onSuccess: () => clearPhotoFileInput()
      });
    };
    const sendEmailVerification = () => {
      verificationLinkSent.value = true;
    };
    const selectNewPhoto = () => {
      photoInput.value.click();
    };
    const updatePhotoPreview = () => {
      const photo = photoInput.value.files[0];
      if (!photo)
        return;
      const reader = new FileReader();
      reader.onload = (e2) => {
        photoPreview.value = e2.target.result;
      };
      reader.readAsDataURL(photo);
    };
    const deletePhoto = () => {
      Inertia$1.delete(route("current-user-photo.destroy"), {
        preserveScroll: true,
        onSuccess: () => {
          photoPreview.value = null;
          clearPhotoFileInput();
        }
      });
    };
    const clearPhotoFileInput = () => {
      var _a;
      if ((_a = photoInput.value) == null ? void 0 : _a.value) {
        photoInput.value.value = null;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1E, mergeProps({ onSubmitted: updateProfileInformation }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Profile Information `);
          } else {
            return [
              createTextVNode(" Profile Information ")
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Update your account&#39;s profile information and email address. `);
          } else {
            return [
              createTextVNode(" Update your account's profile information and email address. ")
            ];
          }
        }),
        form: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$page.props.jetstream.managesProfilePhotos) {
              _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}><input type="file" class="hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1A, {
                for: "photo",
                value: "Photo"
              }, null, _parent2, _scopeId));
              _push2(`<div style="${ssrRenderStyle(!photoPreview.value ? null : { display: "none" })}" class="mt-2"${_scopeId}><img${ssrRenderAttr("src", __props.user.profile_photo_url)}${ssrRenderAttr("alt", __props.user.name)} class="rounded-full h-20 w-20 object-cover"${_scopeId}></div><div style="${ssrRenderStyle(photoPreview.value ? null : { display: "none" })}" class="mt-2"${_scopeId}><span class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center" style="${ssrRenderStyle("background-image: url('" + photoPreview.value + "');")}"${_scopeId}></span></div>`);
              _push2(ssrRenderComponent(_sfc_main$1z, {
                class: "mt-2 mr-2",
                type: "button",
                onClick: selectNewPhoto
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Select A New Photo `);
                  } else {
                    return [
                      createTextVNode(" Select A New Photo ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (__props.user.profile_photo_path) {
                _push2(ssrRenderComponent(_sfc_main$1z, {
                  type: "button",
                  class: "mt-2",
                  onClick: deletePhoto
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Remove Photo `);
                    } else {
                      return [
                        createTextVNode(" Remove Photo ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$1B, {
                message: unref(form).errors.photo,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "name",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              type: "text",
              class: "mt-1 block w-full",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.name,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-6 sm:col-span-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1A, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1D, {
              id: "email",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              type: "email",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1B, {
              message: unref(form).errors.email,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            if (_ctx.$page.props.jetstream.hasEmailVerification && __props.user.email_verified_at === null) {
              _push2(`<div${_scopeId}><p class="text-sm mt-2"${_scopeId}> Your email address is unverified. `);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("verification.send"),
                method: "post",
                as: "button",
                class: "underline text-gray-600 hover:text-gray-900",
                onClick: sendEmailVerification
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Click here to re-send the verification email. `);
                  } else {
                    return [
                      createTextVNode(" Click here to re-send the verification email. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p><div style="${ssrRenderStyle(verificationLinkSent.value ? null : { display: "none" })}" class="mt-2 font-medium text-sm text-green-600"${_scopeId}> A new verification link has been sent to your email address. </div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              _ctx.$page.props.jetstream.managesProfilePhotos ? (openBlock(), createBlock("div", {
                key: 0,
                class: "col-span-6 sm:col-span-4"
              }, [
                createVNode("input", {
                  ref_key: "photoInput",
                  ref: photoInput,
                  type: "file",
                  class: "hidden",
                  onChange: updatePhotoPreview
                }, null, 544),
                createVNode(_sfc_main$1A, {
                  for: "photo",
                  value: "Photo"
                }),
                withDirectives(createVNode("div", { class: "mt-2" }, [
                  createVNode("img", {
                    src: __props.user.profile_photo_url,
                    alt: __props.user.name,
                    class: "rounded-full h-20 w-20 object-cover"
                  }, null, 8, ["src", "alt"])
                ], 512), [
                  [vShow, !photoPreview.value]
                ]),
                withDirectives(createVNode("div", { class: "mt-2" }, [
                  createVNode("span", {
                    class: "block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center",
                    style: "background-image: url('" + photoPreview.value + "');"
                  }, null, 4)
                ], 512), [
                  [vShow, photoPreview.value]
                ]),
                createVNode(_sfc_main$1z, {
                  class: "mt-2 mr-2",
                  type: "button",
                  onClick: withModifiers(selectNewPhoto, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Select A New Photo ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                __props.user.profile_photo_path ? (openBlock(), createBlock(_sfc_main$1z, {
                  key: 0,
                  type: "button",
                  class: "mt-2",
                  onClick: withModifiers(deletePhoto, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Remove Photo ")
                  ]),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true),
                createVNode(_sfc_main$1B, {
                  message: unref(form).errors.photo,
                  class: "mt-2"
                }, null, 8, ["message"])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$1A, {
                  for: "name",
                  value: "Name"
                }),
                createVNode(_sfc_main$1D, {
                  id: "name",
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                  type: "text",
                  class: "mt-1 block w-full",
                  autocomplete: "name"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1B, {
                  message: unref(form).errors.name,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              createVNode("div", { class: "col-span-6 sm:col-span-4" }, [
                createVNode(_sfc_main$1A, {
                  for: "email",
                  value: "Email"
                }),
                createVNode(_sfc_main$1D, {
                  id: "email",
                  modelValue: unref(form).email,
                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                  type: "email",
                  class: "mt-1 block w-full"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_sfc_main$1B, {
                  message: unref(form).errors.email,
                  class: "mt-2"
                }, null, 8, ["message"]),
                _ctx.$page.props.jetstream.hasEmailVerification && __props.user.email_verified_at === null ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "text-sm mt-2" }, [
                    createTextVNode(" Your email address is unverified. "),
                    createVNode(unref(Link), {
                      href: _ctx.route("verification.send"),
                      method: "post",
                      as: "button",
                      class: "underline text-gray-600 hover:text-gray-900",
                      onClick: withModifiers(sendEmailVerification, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Click here to re-send the verification email. ")
                      ]),
                      _: 1
                    }, 8, ["href", "onClick"])
                  ]),
                  withDirectives(createVNode("div", { class: "mt-2 font-medium text-sm text-green-600" }, " A new verification link has been sent to your email address. ", 512), [
                    [vShow, verificationLinkSent.value]
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1M, {
              on: unref(form).recentlySuccessful,
              class: "mr-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Saved. `);
                } else {
                  return [
                    createTextVNode(" Saved. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1J, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Save `);
                } else {
                  return [
                    createTextVNode(" Save ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1M, {
                on: unref(form).recentlySuccessful,
                class: "mr-3"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Saved. ")
                ]),
                _: 1
              }, 8, ["on"]),
              createVNode(_sfc_main$1J, {
                class: { "opacity-25": unref(form).processing },
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  createTextVNode(" Save ")
                ]),
                _: 1
              }, 8, ["class", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const UpdateProfileInformationForm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1q, mergeProps({ title: "Profile" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Profile </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Profile ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"${_scopeId}>`);
            if (_ctx.$page.props.jetstream.canUpdateProfileInformation) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                user: _ctx.$page.props.user
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(JetSectionBorder, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.jetstream.canUpdatePassword) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, { class: "mt-10 sm:mt-0" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(JetSectionBorder, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.jetstream.canManageTwoFactorAuthentication) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$5, {
                "requires-confirmation": __props.confirmsTwoFactorAuthentication,
                class: "mt-10 sm:mt-0"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(JetSectionBorder, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$7, {
              sessions: __props.sessions,
              class: "mt-10 sm:mt-0"
            }, null, _parent2, _scopeId));
            if (_ctx.$page.props.jetstream.hasAccountDeletionFeatures) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(JetSectionBorder, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$8, { class: "mt-10 sm:mt-0" }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8" }, [
                  _ctx.$page.props.jetstream.canUpdateProfileInformation ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_sfc_main$3, {
                      user: _ctx.$page.props.user
                    }, null, 8, ["user"]),
                    createVNode(JetSectionBorder)
                  ])) : createCommentVNode("", true),
                  _ctx.$page.props.jetstream.canUpdatePassword ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(_sfc_main$4, { class: "mt-10 sm:mt-0" }),
                    createVNode(JetSectionBorder)
                  ])) : createCommentVNode("", true),
                  _ctx.$page.props.jetstream.canManageTwoFactorAuthentication ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode(_sfc_main$5, {
                      "requires-confirmation": __props.confirmsTwoFactorAuthentication,
                      class: "mt-10 sm:mt-0"
                    }, null, 8, ["requires-confirmation"]),
                    createVNode(JetSectionBorder)
                  ])) : createCommentVNode("", true),
                  createVNode(_sfc_main$7, {
                    sessions: __props.sessions,
                    class: "mt-10 sm:mt-0"
                  }, null, 8, ["sessions"]),
                  _ctx.$page.props.jetstream.hasAccountDeletionFeatures ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                    createVNode(JetSectionBorder),
                    createVNode(_sfc_main$8, { class: "mt-10 sm:mt-0" })
                  ], 64)) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Show.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "TermsOfService",
  __ssrInlineRender: true,
  props: {
    terms: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Terms of Service" }, null, _parent));
      _push(`<div class="font-sans text-gray-900 antialiased"><div class="pt-4 bg-gray-100"><div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0"><div>`);
      _push(ssrRenderComponent(_sfc_main$1n, null, null, _parent));
      _push(`</div><div class="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">${__props.terms}</div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TermsOfService.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TermsOfService = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const Welcome_vue_vue_type_style_index_0_scoped_724a858c_lang = "";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome" }, null, _parent));
      _push(`<div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0" data-v-724a858c>`);
      if (__props.canLogin) {
        _push(`<div class="hidden fixed top-0 right-0 px-6 py-4 sm:block" data-v-724a858c>`);
        if (_ctx.$page.props.user) {
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("dashboard"),
            class: "text-sm text-gray-700 underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Dashboard `);
              } else {
                return [
                  createTextVNode(" Dashboard ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("login"),
            class: "text-sm text-gray-700 underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Log in `);
              } else {
                return [
                  createTextVNode(" Log in ")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (__props.canRegister) {
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "ml-4 text-sm text-gray-700 underline"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Register `);
                } else {
                  return [
                    createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-6xl mx-auto sm:px-6 lg:px-8" data-v-724a858c><div class="flex justify-center pt-8 sm:justify-start sm:pt-0" data-v-724a858c><svg viewBox="0 0 651 192" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-16 w-auto text-gray-700 sm:h-20" data-v-724a858c><g clip-path="url(#clip0)" fill="#EF3B2D" data-v-724a858c><path d="M248.032 44.676h-16.466v100.23h47.394v-14.748h-30.928V44.676zM337.091 87.202c-2.101-3.341-5.083-5.965-8.949-7.875-3.865-1.909-7.756-2.864-11.669-2.864-5.062 0-9.69.931-13.89 2.792-4.201 1.861-7.804 4.417-10.811 7.661-3.007 3.246-5.347 6.993-7.016 11.239-1.672 4.249-2.506 8.713-2.506 13.389 0 4.774.834 9.26 2.506 13.459 1.669 4.202 4.009 7.925 7.016 11.169 3.007 3.246 6.609 5.799 10.811 7.66 4.199 1.861 8.828 2.792 13.89 2.792 3.913 0 7.804-.955 11.669-2.863 3.866-1.908 6.849-4.533 8.949-7.875v9.021h15.607V78.182h-15.607v9.02zm-1.431 32.503c-.955 2.578-2.291 4.821-4.009 6.73-1.719 1.91-3.795 3.437-6.229 4.582-2.435 1.146-5.133 1.718-8.091 1.718-2.96 0-5.633-.572-8.019-1.718-2.387-1.146-4.438-2.672-6.156-4.582-1.719-1.909-3.032-4.152-3.938-6.73-.909-2.577-1.36-5.298-1.36-8.161 0-2.864.451-5.585 1.36-8.162.905-2.577 2.219-4.819 3.938-6.729 1.718-1.908 3.77-3.437 6.156-4.582 2.386-1.146 5.059-1.718 8.019-1.718 2.958 0 5.656.572 8.091 1.718 2.434 1.146 4.51 2.674 6.229 4.582 1.718 1.91 3.054 4.152 4.009 6.729.953 2.577 1.432 5.298 1.432 8.162-.001 2.863-.479 5.584-1.432 8.161zM463.954 87.202c-2.101-3.341-5.083-5.965-8.949-7.875-3.865-1.909-7.756-2.864-11.669-2.864-5.062 0-9.69.931-13.89 2.792-4.201 1.861-7.804 4.417-10.811 7.661-3.007 3.246-5.347 6.993-7.016 11.239-1.672 4.249-2.506 8.713-2.506 13.389 0 4.774.834 9.26 2.506 13.459 1.669 4.202 4.009 7.925 7.016 11.169 3.007 3.246 6.609 5.799 10.811 7.66 4.199 1.861 8.828 2.792 13.89 2.792 3.913 0 7.804-.955 11.669-2.863 3.866-1.908 6.849-4.533 8.949-7.875v9.021h15.607V78.182h-15.607v9.02zm-1.432 32.503c-.955 2.578-2.291 4.821-4.009 6.73-1.719 1.91-3.795 3.437-6.229 4.582-2.435 1.146-5.133 1.718-8.091 1.718-2.96 0-5.633-.572-8.019-1.718-2.387-1.146-4.438-2.672-6.156-4.582-1.719-1.909-3.032-4.152-3.938-6.73-.909-2.577-1.36-5.298-1.36-8.161 0-2.864.451-5.585 1.36-8.162.905-2.577 2.219-4.819 3.938-6.729 1.718-1.908 3.77-3.437 6.156-4.582 2.386-1.146 5.059-1.718 8.019-1.718 2.958 0 5.656.572 8.091 1.718 2.434 1.146 4.51 2.674 6.229 4.582 1.718 1.91 3.054 4.152 4.009 6.729.953 2.577 1.432 5.298 1.432 8.162 0 2.863-.479 5.584-1.432 8.161zM650.772 44.676h-15.606v100.23h15.606V44.676zM365.013 144.906h15.607V93.538h26.776V78.182h-42.383v66.724zM542.133 78.182l-19.616 51.096-19.616-51.096h-15.808l25.617 66.724h19.614l25.617-66.724h-15.808zM591.98 76.466c-19.112 0-34.239 15.706-34.239 35.079 0 21.416 14.641 35.079 36.239 35.079 12.088 0 19.806-4.622 29.234-14.688l-10.544-8.158c-.006.008-7.958 10.449-19.832 10.449-13.802 0-19.612-11.127-19.612-16.884h51.777c2.72-22.043-11.772-40.877-33.023-40.877zm-18.713 29.28c.12-1.284 1.917-16.884 18.589-16.884 16.671 0 18.697 15.598 18.813 16.884h-37.402zM184.068 43.892c-.024-.088-.073-.165-.104-.25-.058-.157-.108-.316-.191-.46-.056-.097-.137-.176-.203-.265-.087-.117-.161-.242-.265-.345-.085-.086-.194-.148-.29-.223-.109-.085-.206-.182-.327-.252l-.002-.001-.002-.002-35.648-20.524a2.971 2.971 0 00-2.964 0l-35.647 20.522-.002.002-.002.001c-.121.07-.219.167-.327.252-.096.075-.205.138-.29.223-.103.103-.178.228-.265.345-.066.089-.147.169-.203.265-.083.144-.133.304-.191.46-.031.085-.08.162-.104.25-.067.249-.103.51-.103.776v38.979l-29.706 17.103V24.493a3 3 0 00-.103-.776c-.024-.088-.073-.165-.104-.25-.058-.157-.108-.316-.191-.46-.056-.097-.137-.176-.203-.265-.087-.117-.161-.242-.265-.345-.085-.086-.194-.148-.29-.223-.109-.085-.206-.182-.327-.252l-.002-.001-.002-.002L40.098 1.396a2.971 2.971 0 00-2.964 0L1.487 21.919l-.002.002-.002.001c-.121.07-.219.167-.327.252-.096.075-.205.138-.29.223-.103.103-.178.228-.265.345-.066.089-.147.169-.203.265-.083.144-.133.304-.191.46-.031.085-.08.162-.104.25-.067.249-.103.51-.103.776v122.09c0 1.063.568 2.044 1.489 2.575l71.293 41.045c.156.089.324.143.49.202.078.028.15.074.23.095a2.98 2.98 0 001.524 0c.069-.018.132-.059.2-.083.176-.061.354-.119.519-.214l71.293-41.045a2.971 2.971 0 001.489-2.575v-38.979l34.158-19.666a2.971 2.971 0 001.489-2.575V44.666a3.075 3.075 0 00-.106-.774zM74.255 143.167l-29.648-16.779 31.136-17.926.001-.001 34.164-19.669 29.674 17.084-21.772 12.428-43.555 24.863zm68.329-76.259v33.841l-12.475-7.182-17.231-9.92V49.806l12.475 7.182 17.231 9.92zm2.97-39.335l29.693 17.095-29.693 17.095-29.693-17.095 29.693-17.095zM54.06 114.089l-12.475 7.182V46.733l17.231-9.92 12.475-7.182v74.537l-17.231 9.921zM38.614 7.398l29.693 17.095-29.693 17.095L8.921 24.493 38.614 7.398zM5.938 29.632l12.475 7.182 17.231 9.92v79.676l.001.005-.001.006c0 .114.032.221.045.333.017.146.021.294.059.434l.002.007c.032.117.094.222.14.334.051.124.088.255.156.371a.036.036 0 00.004.009c.061.105.149.191.222.288.081.105.149.22.244.314l.008.01c.084.083.19.142.284.215.106.083.202.178.32.247l.013.005.011.008 34.139 19.321v34.175L5.939 144.867V29.632h-.001zm136.646 115.235l-65.352 37.625V148.31l48.399-27.628 16.953-9.677v33.862zm35.646-61.22l-29.706 17.102V66.908l17.231-9.92 12.475-7.182v33.841z" data-v-724a858c></path></g></svg></div><div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg" data-v-724a858c><div class="grid grid-cols-1 md:grid-cols-2" data-v-724a858c><div class="p-6" data-v-724a858c><div class="flex items-center" data-v-724a858c><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500" data-v-724a858c><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-724a858c></path></svg><div class="ml-4 text-lg leading-7 font-semibold" data-v-724a858c><a href="https://laravel.com/docs" class="underline text-gray-900 dark:text-white" data-v-724a858c>Documentation</a></div></div><div class="ml-12" data-v-724a858c><div class="mt-2 text-gray-600 dark:text-gray-400 text-sm" data-v-724a858c> Laravel has wonderful, thorough documentation covering every aspect of the framework. Whether you are new to the framework or have previous experience with Laravel, we recommend reading all of the documentation from beginning to end. </div></div></div><div class="p-6 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l" data-v-724a858c><div class="flex items-center" data-v-724a858c><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500" data-v-724a858c><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" data-v-724a858c></path><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" data-v-724a858c></path></svg><div class="ml-4 text-lg leading-7 font-semibold" data-v-724a858c><a href="https://laracasts.com" class="underline text-gray-900 dark:text-white" data-v-724a858c>Laracasts</a></div></div><div class="ml-12" data-v-724a858c><div class="mt-2 text-gray-600 dark:text-gray-400 text-sm" data-v-724a858c> Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process. </div></div></div><div class="p-6 border-t border-gray-200 dark:border-gray-700" data-v-724a858c><div class="flex items-center" data-v-724a858c><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500" data-v-724a858c><path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" data-v-724a858c></path></svg><div class="ml-4 text-lg leading-7 font-semibold" data-v-724a858c><a href="https://laravel-news.com/" class="underline text-gray-900 dark:text-white" data-v-724a858c>Laravel News</a></div></div><div class="ml-12" data-v-724a858c><div class="mt-2 text-gray-600 dark:text-gray-400 text-sm" data-v-724a858c> Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials. </div></div></div><div class="p-6 border-t border-gray-200 dark:border-gray-700 md:border-l" data-v-724a858c><div class="flex items-center" data-v-724a858c><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-8 h-8 text-gray-500" data-v-724a858c><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-724a858c></path></svg><div class="ml-4 text-lg leading-7 font-semibold text-gray-900 dark:text-white" data-v-724a858c> Vibrant Ecosystem </div></div><div class="ml-12" data-v-724a858c><div class="mt-2 text-gray-600 dark:text-gray-400 text-sm" data-v-724a858c> Laravel&#39;s robust library of first-party tools and libraries, such as <a href="https://forge.laravel.com" class="underline" data-v-724a858c>Forge</a>, <a href="https://vapor.laravel.com" class="underline" data-v-724a858c>Vapor</a>, <a href="https://nova.laravel.com" class="underline" data-v-724a858c>Nova</a>, and <a href="https://envoyer.io" class="underline" data-v-724a858c>Envoyer</a> help you take your projects to the next level. Pair them with powerful open source libraries like <a href="https://laravel.com/docs/billing" class="underline" data-v-724a858c>Cashier</a>, <a href="https://laravel.com/docs/dusk" class="underline" data-v-724a858c>Dusk</a>, <a href="https://laravel.com/docs/broadcasting" class="underline" data-v-724a858c>Echo</a>, <a href="https://laravel.com/docs/horizon" class="underline" data-v-724a858c>Horizon</a>, <a href="https://laravel.com/docs/sanctum" class="underline" data-v-724a858c>Sanctum</a>, <a href="https://laravel.com/docs/telescope" class="underline" data-v-724a858c>Telescope</a>, and more. </div></div></div></div></div><div class="flex justify-center mt-4 sm:items-center sm:justify-between" data-v-724a858c><div class="text-center text-sm text-gray-500 sm:text-left" data-v-724a858c><div class="flex items-center" data-v-724a858c><svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="-mt-px w-5 h-5 text-gray-400" data-v-724a858c><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" data-v-724a858c></path></svg><a href="https://laravel.bigcartel.com" class="ml-1 underline" data-v-724a858c> Shop </a><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="ml-4 -mt-px w-5 h-5 text-gray-400" data-v-724a858c><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-724a858c></path></svg><a href="https://github.com/sponsors/taylorotwell" class="ml-1 underline" data-v-724a858c> Sponsor </a></div></div><div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0" data-v-724a858c> Laravel v${ssrInterpolate(__props.laravelVersion)} (PHP v${ssrInterpolate(__props.phpVersion)}) </div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Welcome = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-724a858c"]]);
const Welcome$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
