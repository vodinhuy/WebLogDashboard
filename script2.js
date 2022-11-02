/*** @preserve Copyright 2012 Twitter, Inc.* @license http://www.apache.org/licenses/LICENSE-2.0.txt*/ var Hogan = {};
!(function (t) {
    function n(t, n, e) {
        var i;
        return n && "object" == typeof n && (void 0 !== n[t] ? (i = n[t]) : e && n.get && "function" == typeof n.get && (i = n.get(t))), i;
    }
    function e(t, n, e, i, r, s) {
        function a() {}
        function o() {}
        (a.prototype = t), (o.prototype = t.subs);
        var u,
            c = new a();
        (c.subs = new o()), (c.subsText = {}), (c.buf = ""), (i = i || {}), (c.stackSubs = i), (c.subsText = s);
        for (u in n) i[u] || (i[u] = n[u]);
        for (u in i) c.subs[u] = i[u];
        (r = r || {}), (c.stackPartials = r);
        for (u in e) r[u] || (r[u] = e[u]);
        for (u in r) c.partials[u] = r[u];
        return c;
    }
    function i(t) {
        return String(null === t || void 0 === t ? "" : t);
    }
    function r(t) {
        return (t = i(t)), l.test(t) ? t.replace(s, "&amp;").replace(a, "&lt;").replace(o, "&gt;").replace(u, "&#39;").replace(c, "&quot;") : t;
    }
    (t.Template = function (t, n, e, i) {
        (t = t || {}), (this.r = t.code || this.r), (this.c = e), (this.options = i || {}), (this.text = n || ""), (this.partials = t.partials || {}), (this.subs = t.subs || {}), (this.buf = "");
    }),
        (t.Template.prototype = {
            r: function () {
                return "";
            },
            v: r,
            t: i,
            render: function (t, n, e) {
                return this.ri([t], n || {}, e);
            },
            ri: function (t, n, e) {
                return this.r(t, n, e);
            },
            ep: function (t, n) {
                var i = this.partials[t],
                    r = n[i.name];
                if (i.instance && i.base == r) return i.instance;
                if ("string" == typeof r) {
                    if (!this.c) throw new Error("No compiler available.");
                    r = this.c.compile(r, this.options);
                }
                if (!r) return null;
                if (((this.partials[t].base = r), i.subs)) {
                    n.stackText || (n.stackText = {});
                    for (key in i.subs) n.stackText[key] || (n.stackText[key] = void 0 !== this.activeSub && n.stackText[this.activeSub] ? n.stackText[this.activeSub] : this.text);
                    r = e(r, i.subs, i.partials, this.stackSubs, this.stackPartials, n.stackText);
                }
                return (this.partials[t].instance = r), r;
            },
            rp: function (t, n, e, i) {
                var r = this.ep(t, e);
                return r ? r.ri(n, e, i) : "";
            },
            rs: function (t, n, e) {
                var i = t[t.length - 1];
                if (!f(i)) return void e(t, n, this);
                for (var r = 0; r < i.length; r++) t.push(i[r]), e(t, n, this), t.pop();
            },
            s: function (t, n, e, i, r, s, a) {
                var o;
                return f(t) && 0 === t.length ? !1 : ("function" == typeof t && (t = this.ms(t, n, e, i, r, s, a)), (o = !!t), !i && o && n && n.push("object" == typeof t ? t : n[n.length - 1]), o);
            },
            d: function (t, e, i, r) {
                var s,
                    a = t.split("."),
                    o = this.f(a[0], e, i, r),
                    u = this.options.modelGet,
                    c = null;
                if ("." === t && f(e[e.length - 2])) o = e[e.length - 1];
                else for (var l = 1; l < a.length; l++) (s = n(a[l], o, u)), void 0 !== s ? ((c = o), (o = s)) : (o = "");
                return r && !o ? !1 : (r || "function" != typeof o || (e.push(c), (o = this.mv(o, e, i)), e.pop()), o);
            },
            f: function (t, e, i, r) {
                for (var s = !1, a = null, o = !1, u = this.options.modelGet, c = e.length - 1; c >= 0; c--)
                    if (((a = e[c]), (s = n(t, a, u)), void 0 !== s)) {
                        o = !0;
                        break;
                    }
                return o ? (r || "function" != typeof s || (s = this.mv(s, e, i)), s) : r ? !1 : "";
            },
            ls: function (t, n, e, r, s) {
                var a = this.options.delimiters;
                return (this.options.delimiters = s), this.b(this.ct(i(t.call(n, r)), n, e)), (this.options.delimiters = a), !1;
            },
            ct: function (t, n, e) {
                if (this.options.disableLambda) throw new Error("Lambda features disabled.");
                return this.c.compile(t, this.options).render(n, e);
            },
            b: function (t) {
                this.buf += t;
            },
            fl: function () {
                var t = this.buf;
                return (this.buf = ""), t;
            },
            ms: function (t, n, e, i, r, s, a) {
                var o,
                    u = n[n.length - 1],
                    c = t.call(u);
                return "function" == typeof c ? (i ? !0 : ((o = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text), this.ls(c, u, e, o.substring(r, s), a))) : c;
            },
            mv: function (t, n, e) {
                var r = n[n.length - 1],
                    s = t.call(r);
                return "function" == typeof s ? this.ct(i(s.call(r)), r, e) : s;
            },
            sub: function (t, n, e, i) {
                var r = this.subs[t];
                r && ((this.activeSub = t), r(n, e, this, i), (this.activeSub = !1));
            },
        });
    var s = /&/g,
        a = /</g,
        o = />/g,
        u = /\'/g,
        c = /\"/g,
        l = /[&<>\"\']/,
        f =
            Array.isArray ||
            function (t) {
                return "[object Array]" === Object.prototype.toString.call(t);
            };
})("undefined" != typeof exports ? exports : Hogan),
    (function (t) {
        function n(t) {
            "}" === t.n.substr(t.n.length - 1) && (t.n = t.n.substring(0, t.n.length - 1));
        }
        function e(t) {
            return t.trim ? t.trim() : t.replace(/^\s*|\s*$/g, "");
        }
        function i(t, n, e) {
            if (n.charAt(e) != t.charAt(0)) return !1;
            for (var i = 1, r = t.length; r > i; i++) if (n.charAt(e + i) != t.charAt(i)) return !1;
            return !0;
        }
        function r(n, e, i, o) {
            var u = [],
                c = null,
                l = null,
                f = null;
            for (l = i[i.length - 1]; n.length > 0; ) {
                if (((f = n.shift()), l && "<" == l.tag && !(f.tag in k))) throw new Error("Illegal content in < super tag.");
                if (t.tags[f.tag] <= t.tags.$ || s(f, o)) i.push(f), (f.nodes = r(n, f.tag, i, o));
                else {
                    if ("/" == f.tag) {
                        if (0 === i.length) throw new Error("Closing tag without opener: /" + f.n);
                        if (((c = i.pop()), f.n != c.n && !a(f.n, c.n, o))) throw new Error("Nesting error: " + c.n + " vs. " + f.n);
                        return (c.end = f.i), u;
                    }
                    "\n" == f.tag && (f.last = 0 == n.length || "\n" == n[0].tag);
                }
                u.push(f);
            }
            if (i.length > 0) throw new Error("missing closing tag: " + i.pop().n);
            return u;
        }
        function s(t, n) {
            for (var e = 0, i = n.length; i > e; e++) if (n[e].o == t.n) return (t.tag = "#"), !0;
        }
        function a(t, n, e) {
            for (var i = 0, r = e.length; r > i; i++) if (e[i].c == t && e[i].o == n) return !0;
        }
        function o(t) {
            var n = [];
            for (var e in t) n.push('"' + c(e) + '": function(c,p,t,i) {' + t[e] + "}");
            return "{ " + n.join(",") + " }";
        }
        function u(t) {
            var n = [];
            for (var e in t.partials) n.push('"' + c(e) + '":{name:"' + c(t.partials[e].name) + '", ' + u(t.partials[e]) + "}");
            return "partials: {" + n.join(",") + "}, subs: " + o(t.subs);
        }
        function c(t) {
            return t.replace(m, "\\\\").replace(v, '\\"').replace(b, "\\n").replace(d, "\\r").replace(x, "\\u2028").replace(w, "\\u2029");
        }
        function l(t) {
            return ~t.indexOf(".") ? "d" : "f";
        }
        function f(t, n) {
            var e = "<" + (n.prefix || ""),
                i = e + t.n + y++;
            return (n.partials[i] = { name: t.n, partials: {} }), (n.code += 't.b(t.rp("' + c(i) + '",c,p,"' + (t.indent || "") + '"));'), i;
        }
        function h(t, n) {
            n.code += "t.b(t.t(t." + l(t.n) + '("' + c(t.n) + '",c,p,0)));';
        }
        function p(t) {
            return "t.b(" + t + ");";
        }
        var g = /\S/,
            v = /\"/g,
            b = /\n/g,
            d = /\r/g,
            m = /\\/g,
            x = /\u2028/,
            w = /\u2029/;
        (t.tags = { "#": 1, "^": 2, "<": 3, $: 4, "/": 5, "!": 6, ">": 7, "=": 8, _v: 9, "{": 10, "&": 11, _t: 12 }),
            (t.scan = function (r, s) {
                function a() {
                    m.length > 0 && (x.push({ tag: "_t", text: new String(m) }), (m = ""));
                }
                function o() {
                    for (var n = !0, e = y; e < x.length; e++) if (((n = t.tags[x[e].tag] < t.tags._v || ("_t" == x[e].tag && null === x[e].text.match(g))), !n)) return !1;
                    return n;
                }
                function u(t, n) {
                    if ((a(), t && o())) for (var e, i = y; i < x.length; i++) x[i].text && ((e = x[i + 1]) && ">" == e.tag && (e.indent = x[i].text.toString()), x.splice(i, 1));
                    else n || x.push({ tag: "\n" });
                    (w = !1), (y = x.length);
                }
                function c(t, n) {
                    var i = "=" + S,
                        r = t.indexOf(i, n),
                        s = e(t.substring(t.indexOf("=", n) + 1, r)).split(" ");
                    return (T = s[0]), (S = s[s.length - 1]), r + i.length - 1;
                }
                var l = r.length,
                    f = 0,
                    h = 1,
                    p = 2,
                    v = f,
                    b = null,
                    d = null,
                    m = "",
                    x = [],
                    w = !1,
                    k = 0,
                    y = 0,
                    T = "{{",
                    S = "}}";
                for (s && ((s = s.split(" ")), (T = s[0]), (S = s[1])), k = 0; l > k; k++)
                    v == f
                        ? i(T, r, k)
                            ? (--k, a(), (v = h))
                            : "\n" == r.charAt(k)
                            ? u(w)
                            : (m += r.charAt(k))
                        : v == h
                        ? ((k += T.length - 1), (d = t.tags[r.charAt(k + 1)]), (b = d ? r.charAt(k + 1) : "_v"), "=" == b ? ((k = c(r, k)), (v = f)) : (d && k++, (v = p)), (w = k))
                        : i(S, r, k)
                        ? (x.push({ tag: b, n: e(m), otag: T, ctag: S, i: "/" == b ? w - T.length : k + S.length }), (m = ""), (k += S.length - 1), (v = f), "{" == b && ("}}" == S ? k++ : n(x[x.length - 1])))
                        : (m += r.charAt(k));
                return u(w, !0), x;
            });
        var k = { _t: !0, "\n": !0, $: !0, "/": !0 };
        t.stringify = function (n) {
            return "{code: function (c,p,i) { " + t.wrapMain(n.code) + " }," + u(n) + "}";
        };
        var y = 0;
        (t.generate = function (n, e, i) {
            y = 0;
            var r = { code: "", subs: {}, partials: {} };
            return t.walk(n, r), i.asString ? this.stringify(r, e, i) : this.makeTemplate(r, e, i);
        }),
            (t.wrapMain = function (t) {
                return 'var t=this;t.b(i=i||"");' + t + "return t.fl();";
            }),
            (t.template = t.Template),
            (t.makeTemplate = function (t, n, e) {
                var i = this.makePartials(t);
                return (i.code = new Function("c", "p", "i", this.wrapMain(t.code))), new this.template(i, n, this, e);
            }),
            (t.makePartials = function (t) {
                var n,
                    e = { subs: {}, partials: t.partials, name: t.name };
                for (n in e.partials) e.partials[n] = this.makePartials(e.partials[n]);
                for (n in t.subs) e.subs[n] = new Function("c", "p", "t", "i", t.subs[n]);
                return e;
            }),
            (t.codegen = {
                "#": function (n, e) {
                    (e.code += "if(t.s(t." + l(n.n) + '("' + c(n.n) + '",c,p,1),c,p,0,' + n.i + "," + n.end + ',"' + n.otag + " " + n.ctag + '")){t.rs(c,p,function(c,p,t){'), t.walk(n.nodes, e), (e.code += "});c.pop();}");
                },
                "^": function (n, e) {
                    (e.code += "if(!t.s(t." + l(n.n) + '("' + c(n.n) + '",c,p,1),c,p,1,0,0,"")){'), t.walk(n.nodes, e), (e.code += "};");
                },
                ">": f,
                "<": function (n, e) {
                    var i = { partials: {}, code: "", subs: {}, inPartial: !0 };
                    t.walk(n.nodes, i);
                    var r = e.partials[f(n, e)];
                    (r.subs = i.subs), (r.partials = i.partials);
                },
                $: function (n, e) {
                    var i = { subs: {}, code: "", partials: e.partials, prefix: n.n };
                    t.walk(n.nodes, i), (e.subs[n.n] = i.code), e.inPartial || (e.code += 't.sub("' + c(n.n) + '",c,p,i);');
                },
                "\n": function (t, n) {
                    n.code += p('"\\n"' + (t.last ? "" : " + i"));
                },
                _v: function (t, n) {
                    n.code += "t.b(t.v(t." + l(t.n) + '("' + c(t.n) + '",c,p,0)));';
                },
                _t: function (t, n) {
                    n.code += p('"' + c(t.text) + '"');
                },
                "{": h,
                "&": h,
            }),
            (t.walk = function (n, e) {
                for (var i, r = 0, s = n.length; s > r; r++) (i = t.codegen[n[r].tag]), i && i(n[r], e);
                return e;
            }),
            (t.parse = function (t, n, e) {
                return (e = e || {}), r(t, "", [], e.sectionTags || []);
            }),
            (t.cache = {}),
            (t.cacheKey = function (t, n) {
                return [t, !!n.asString, !!n.disableLambda, n.delimiters, !!n.modelGet].join("||");
            }),
            (t.compile = function (n, e) {
                e = e || {};
                var i = t.cacheKey(n, e),
                    r = this.cache[i];
                if (r) {
                    var s = r.partials;
                    for (var a in s) delete s[a].instance;
                    return r;
                }
                return (r = this.generate(this.parse(this.scan(n, e.delimiters), n, e), n, e)), (this.cache[i] = r);
            });
    })("undefined" != typeof exports ? exports : Hogan);
