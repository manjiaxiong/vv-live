function t(t, a, s) {
    return a in t ? Object.defineProperty(t, a, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = s, t;
}

var a, s = getApp();

Page({
    data: (a = {
        arrLabel: [ "热卖商品", "电脑办公", "数码影音", "美食佳饮", "电脑办公", "数码影音", "美食佳饮", "电脑办公", "数码影音", "美食佳饮" ],
        hotGoods: [ {
            name: "热卖商品1",
            id: 0
        }, {
            name: "热卖商品2",
            id: 1
        }, {
            name: "热卖商品3",
            id: 2
        }, {
            name: "热卖商品4",
            id: 3
        }, {
            name: "热卖商品5",
            id: 4
        } ],
        carList: [ "购物车1", "购物车2", "购物车3", "购物车4" ],
        num: [],
        clickCar: !1
    }, t(a, "num", [ 0, 0, 0, 0, 0, 0, 0, 0 ]), t(a, "change", !1), t(a, "div", !1), 
    a),
    onLoad: function(t) {
        var a = this, i = wx.getStorageSync("systemInfo");
        this.busPos = {}, this.busPos.x = 45, this.busPos.y = s.globalData.hh - 80, this.setData({
            goodsH: i.windowHeight - 245 - 48
        });
        for (var o = [ 1 ], n = 1; n < a.data.arrLabel.length; n++) o.push(0);
        a.setData({
            arrLab: o
        });
    },
    clickLab: function(t) {
        for (var a = t.currentTarget.dataset.id, s = this.data.arrLab, i = 0; i < s.length; i++) s[i] = 0;
        s[a] = 1, this.setData({
            arrLab: s,
            id: t.currentTarget.dataset.id
        });
    },
    shopCarList: function() {
        this.setData({
            clickCar: !0
        });
    },
    shopCarHid: function() {
        this.setData({
            clickCar: !1
        });
    },
    onPageScroll: function(t) {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function(t) {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    sub: function(t) {
        var a = t.currentTarget.dataset.id, s = this.data.num;
        s[a] = --this.data.num[a], this.setData({
            num: s
        });
    },
    addGoodToCartFn: function(t) {
        var a = t.currentTarget.dataset.id, s = this.data.num;
        s[a] = ++this.data.num[a], this.setData({
            num: s,
            change: !0
        });
    },
    touchOnGoods: function(t) {
        this.finger = {};
        var a = {};
        this.finger.x = t.touches[0].clientX, this.finger.y = t.touches[0].clientY, this.finger.y < this.busPos.y ? a.y = this.finger.y - 150 : a.y = this.busPos.y - 150, 
        a.x = Math.abs(this.finger.x - this.busPos.x) / 2, this.finger.x > this.busPos.x ? a.x = (this.finger.x - this.busPos.x) / 2 + this.busPos.x : a.x = (this.busPos.x - this.finger.x) / 2 + this.finger.x, 
        this.linePos = s.bezier([ this.busPos, a, this.finger ], 30), this.startAnimation(t);
    },
    startAnimation: function(t) {
        var a = 0, s = this, i = s.linePos.bezier_points;
        this.setData({
            hide_good_box: !1,
            bus_x: s.finger.x,
            bus_y: s.finger.y
        });
        var o = i.length;
        a = o, this.timer = setInterval(function() {
            a--, s.setData({
                bus_x: i[a].x,
                bus_y: i[a].y
            }), a < 1 && (clearInterval(s.timer), s.addGoodToCartFn(t), s.setData({
                hide_good_box: !0
            }));
        }, 22);
    },
    decreaseGoodToCartFn: function(t) {
        console.log(t);
        var a = JSON.parse(JSON.stringify(this.data.shoppingCart)), s = [], i = t.target.id.split("_")[1], o = -1;
        if (this.data.shoppingCartGoodsId.length > 0) for (var n = 0; n < this.data.shoppingCartGoodsId.length; n++) s.push(this.data.shoppingCartGoodsId[n]), 
        i == this.data.shoppingCartGoodsId[n] && (o = n);
        o > -1 && (a[i] = Number(a[i]) - 1, a[i] <= 0 && s.splice(o, 1)), this.setData({
            shoppingCart: a,
            shoppingCartGoodsId: s
        }), this._resetTotalNum();
    },
    _resetTotalNum: function() {
        var t = this.data.shoppingCartGoodsId, a = 0, s = 0, i = [];
        if (t) for (var o = 0; o < t.length; o++) {
            var n = Number(this.data.shoppingCart[t[o]]);
            a += Number(n), s += Number(this.data.goodMap[t[o]].price) * n, i.push(this.data.goodMap[t[o]]);
        }
        this.setData({
            totalNum: a,
            totalPay: s.toFixed(2),
            chooseGoodArr: i
        });
    },
    clearShopCartFn: function(t) {
        this.setData({
            clickCar: !1,
            totalNum: 0,
            totalPay: 0,
            carList: [],
            shoppingCart: {}
        });
    }
});