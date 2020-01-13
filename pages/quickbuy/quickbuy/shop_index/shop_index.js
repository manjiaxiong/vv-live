function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), r = e.requirejs("core"), i = e.requirejs("biz/goodspicker"), o = e.requirejs("foxui"), n = e.requirejs("biz/diyform");

Page({
    data: (a = {
        arrLabel: [],
        num: [],
        clickCar: !1
    }, t(a, "num", 0), t(a, "change", !1), t(a, "div", !1), t(a, "numtotal", []), t(a, "clearcart", !0), 
    t(a, "canBuy", ""), t(a, "specs", []), t(a, "options", []), t(a, "diyform", {}), 
    t(a, "specsTitle", ""), t(a, "total", 1), t(a, "active", ""), t(a, "slider", ""), 
    t(a, "tempname", ""), t(a, "buyType", ""), t(a, "areas", []), t(a, "closeBtn", !1), 
    t(a, "soundpic", !0), t(a, "closespecs", !1), t(a, "buyType", "cart"), t(a, "quickbuy", !0), 
    t(a, "formdataval", {}), t(a, "showPicker", !1), a),
    onLoad: function(t) {
        var a = t.id, i = this, o = wx.getStorageSync("systemInfo");
        this.busPos = {}, this.busPos.x = 45, this.busPos.y = e.globalData.hh - 80, this.setData({
            goodsH: o.windowHeight - 245 - 48,
            pageid: a
        });
        for (var n = [ 1 ], s = 1; s < i.data.arrLabel.length; s++) n.push(0);
        i.setData({
            arrLab: n
        }), r.get("quick/index/main", {
            id: this.data.pageid
        }, function(t) {
            console.log(t);
            var a = [], e = "";
            e = 1 == t.style.shopstyle ? "changeCss2" : 2 == t.style.shopstyle ? "changeCss3" : "", 
            e += " " + t.style.logostyle, i.setData({
                main: t,
                group: t.group,
                goodsArr: t.goodsArr,
                arrCart: a,
                style: e
            }), 1 == i.data.main.cartdata && i.data.pageid;
            for (var r = [], o = 0; o < i.data.main.group.length; o++) if (i.data.main.goodsArr[i.data.main.group[o].type]) for (var n = i.data.main.goodsArr[i.data.main.group[o].type], s = 0; s < n.length; s++) r[n[s].id] = n[s].cartTotal, 
            i.setData({
                numtotal: r
            });
        });
    },
    menunavigage: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    gobigimg: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.link
        });
    },
    clickLab: function(t) {
        for (var a = t.currentTarget.dataset.id, e = this.data.arrLab, r = 0; r < e.length; r++) e[r] = 0;
        e[a] = 1, this.setData({
            arrLab: e,
            id: t.currentTarget.dataset.id
        });
    },
    shopCarList: function() {
        var t = this;
        this.setData({
            clickCar: !0,
            cartcartArr: [],
            showPicker: !0
        });
        var a = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/getCart", {
            quickid: a
        }, function(a) {
            console.log(a);
            var e = t.data.main;
            e.cartList = a, t.setData({
                main: e
            });
            for (var r = [], i = 0; i < a.list.length; i++) r[i] = a.list[i].goodsid;
            t.setData({
                tempcartid: r
            }), console.log(t.data.tempcartid);
        });
    },
    shopCarHid: function() {
        this.setData({
            clickCar: !1,
            showPicker: !1
        });
    },
    selectPicker: function(t) {
        var a = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? (i.selectpicker(t, a, "goodslist"), a.setData({
                    cover: "",
                    showvideo: !1
                })) : a.setData({
                    modelShow: !0
                });
            }
        });
    },
    specsTap: function(t) {
        var a = this;
        i.specsTap(t, a);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            specsTitle: "",
            showPicker: !1
        });
    },
    buyNow: function(t) {
        var a = this;
        i.buyNow(t, a);
    },
    getCart: function(t) {
        var a = this;
        i.getCart(t, a);
    },
    select: function() {
        var t = this;
        i.select(t);
    },
    inputNumber: function(t) {
        var a = this;
        i.inputNumber(t, a);
    },
    number: function(t) {
        var a = this;
        i.number(t, a);
    },
    onChange: function(t) {
        return n.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return n.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return n.selectArea(this, t);
    },
    bindChange: function(t) {
        return n.bindChange(this, t);
    },
    onCancel: function(t) {
        return n.onCancel(this, t);
    },
    onConfirm: function(t) {
        return n.onConfirm(this, t);
    },
    getIndex: function(t, a) {
        return n.getIndex(t, a);
    },
    closespecs: function() {
        this.setData({
            closespecs: !1
        });
    },
    onPageScroll: function(t) {},
    onShow: function() {},
    onReachBottom: function() {},
    addCartquick: function(t, a) {
        console.log(t + ";" + a);
        var e = this, i = e.data.numtotal, n = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/update", {
            quickid: n,
            goodsid: e.data.goodsid,
            optionid: t || "",
            update: "",
            total: "",
            type: e.data.addtype,
            typevalue: a || "",
            diyformdata: e.data.formdataval ? e.data.formdataval : ""
        }, function(t) {
            if (console.log(t), 0 != t.error) e.setData({
                cantclick: !0
            }), o.toast(e, t.message), e.setData({
                active: "",
                slider: "out",
                isSelected: !0,
                tempname: "",
                showPicker: !1
            }); else {
                var a = e.data.main;
                a.cartList.total = t.total, a.cartList.totalprice = t.totalprice, a.cartList.list = [ 1 ], 
                i[e.data.goodsid] = t.goodstotal, e.setData({
                    numtotal: i,
                    main: a,
                    clearcart: !0,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    showPicker: !1,
                    formdataval: {}
                }), "value" == e.data.addtype && e.animate(e.data.mouse);
            }
        });
    },
    addGoodToCartFn: function(t) {
        var a = this, e = 1 == this.data.main.cartdata ? "takeoutmodel" : "shopmodel";
        t.currentTarget.dataset.canadd || (e = "cantaddcart"), console.log(a.data.formdataval), 
        a.setData({
            morechose: t.currentTarget.dataset.more
        }), a.setData({
            addtype: t.currentTarget.dataset.add,
            goodsid: t.currentTarget.dataset.id,
            mouse: t
        }), "1" == t.currentTarget.dataset.more && "reduce" == a.data.addtype ? o.toast(a, "请在购物车中修改多规格商品") : "reduce" == a.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num ? o.toast(a, "不能少于" + t.currentTarget.dataset.min + "件商品") : "1" != t.currentTarget.dataset.more && "0" == t.currentTarget.dataset.diyformtype && t.currentTarget.dataset.canadd || ("reduce" != a.data.addtype ? (a.setData({
            showPicker: !0,
            cycledate: !1
        }), i.selectpicker(t, a, "quickbuy", e), console.log(123), console.log(123)) : (a.setData({
            storenum: t.currentTarget.dataset.store,
            maxnum: t.currentTarget.dataset.maxnum
        }), a.addCartquick("", 1))), "1" != t.currentTarget.dataset.more && "0" == t.currentTarget.dataset.diyformtype && t.currentTarget.dataset.canadd && (a.setData({
            storenum: t.currentTarget.dataset.store,
            maxnum: t.currentTarget.dataset.maxnum
        }), "reduce" == a.data.addtype && t.currentTarget.dataset.min == t.currentTarget.dataset.num ? o.toast(a, "不能少于" + t.currentTarget.dataset.min + "件商品") : a.addCartquick("", 1));
    },
    animate: function(t) {
        var a = this;
        a.finger = {};
        var e = {};
        a.finger.x = t.touches[0].clientX, a.finger.y = t.touches[0].clientY, a.finger.y < a.busPos.y ? e.y = a.finger.y - 150 : e.y = a.busPos.y - 150, 
        e.x = Math.abs(a.finger.x - a.busPos.x) / 2, a.finger.x > a.busPos.x ? e.x = (a.finger.x - a.busPos.x) / 2 + a.busPos.x : e.x = (a.busPos.x - a.finger.x) / 2 + a.finger.x, 
        a.linePos = a.bezier([ a.busPos, e, a.finger ], 30), a.startAnimation(t);
    },
    startAnimation: function(t) {
        var a = 0, e = this, r = e.linePos.bezier_points;
        this.setData({
            hide_good_box: !1,
            bus_x: e.finger.x,
            bus_y: e.finger.y
        });
        var i = r.length;
        a = i, this.timer = setInterval(function() {
            a--, e.setData({
                bus_x: r[a].x,
                bus_y: r[a].y
            }), a < 1 && (clearInterval(e.timer), e.setData({
                hide_good_box: !0
            }));
        }, 22);
    },
    clearShopCartFn: function(t) {
        var a = this, e = 1 == this.data.main.cartdata ? this.data.pageid : "";
        r.get("quick/index/clearCart", {
            quickid: e
        }, function(t) {
            console.log(t);
            var e = a.data.main;
            e.cartList = {
                list: [],
                total: 0,
                totalprice: 0
            };
            for (var r = a.data.tempcartid, i = [], o = 0; o < r.length; o++) console.log(r[o]), 
            i[Number(r[o])] = -1, console.log(i);
            a.setData({
                main: e,
                clickCar: !1,
                numtotal: i,
                clearcart: !1,
                showPicker: !1
            }), console.log(a.data.numtotal);
        });
    },
    closemulti: function() {
        this.setData({
            showPicker: !1,
            clickCar: !1,
            cycledate: !0
        });
    },
    gopay: function() {
        console.log(this.data.main.cartList);
        var t = 1 == this.data.main.cartdata ? this.data.pageid : "";
        this.data.main.cartList.list.length ? wx.navigateTo({
            url: "/pages/order/create/index?fromquick=" + t
        }) : o.toast(this, "请先添加商品到购物车");
    },
    gotocart: function() {
        console.log(11), wx.switchTab({
            url: "/pages/member/cart/index"
        });
    },
    cartaddcart: function(t) {
        var a = this, e = 1 == this.data.main.cartdata ? this.data.pageid : "", i = "0" == t.currentTarget.dataset.id ? t.currentTarget.dataset.goodsid : t.currentTarget.dataset.id;
        r.get("quick/index/update", {
            quickid: e,
            goodsid: t.currentTarget.dataset.goodsid,
            optionid: "0" == t.currentTarget.dataset.id ? "" : t.currentTarget.dataset.id,
            update: "",
            total: "",
            type: t.currentTarget.dataset.add,
            typevalue: "",
            diyformdata: ""
        }, function(e) {
            if (console.log(e), 0 == e.error) {
                var r = a.data.cartcartArr;
                r[i] = e.goodsOptionTotal ? e.goodsOptionTotal : e.goodstotal;
                var n = a.data.main;
                n.cartList.total = e.total, n.cartList.totalprice = e.totalprice;
                var s = a.data.numtotal;
                s[t.currentTarget.dataset.goodsid] = e.goodstotal, a.setData({
                    cartcartArr: r,
                    main: n,
                    numtotal: s
                });
            } else o.toast(a, e.message);
        });
    },
    bezier: function(t, a) {
        for (var e, r, i, o = [], n = 0; n <= a; n++) {
            for (i = t.slice(0), r = []; e = i.shift(); ) if (i.length) r.push(function(t, a) {
                var e, r, i, o, n, s, c, d;
                return e = t[0], r = t[1], o = r.x - e.x, n = r.y - e.y, i = Math.pow(Math.pow(o, 2) + Math.pow(n, 2), .5), 
                s = n / o, c = Math.atan(s), d = i * a, {
                    x: e.x + d * Math.cos(c),
                    y: e.y + d * Math.sin(c)
                };
            }([ e, i[0] ], n / a)); else {
                if (!(r.length > 1)) break;
                i = r, r = [];
            }
            o.push(r[0]);
        }
        return {
            bezier_points: o
        };
    },
    scrollfn: function(t) {
        var a = this;
        if (a.data.main.advs) {
            if (a.data.main.advs.length > 0) var e = [ 180 ], r = 180;
        } else var e = [ 0 ], r = 0;
        for (var i = 0; i < a.data.main.group.length; i++) if (a.data.main.goodsArr[a.data.main.group[i].type] && (r = r + 98 * a.data.main.goodsArr[a.data.main.group[i].type].length + 66, 
        e.push(r), a.setData({
            arrscroll: e
        }), Math.abs(t.detail.scrollTop - e[i]) < 26)) {
            for (var o = this.data.arrLab, n = 0; n < o.length; n++) o[n] = 0;
            o[i] = 1, this.setData({
                arrLab: o
            });
        }
    }
});