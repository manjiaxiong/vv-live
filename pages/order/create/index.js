var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, a = getApp(), i = a.requirejs("core"), s = a.requirejs("foxui"), r = a.requirejs("biz/diyform"), o = a.requirejs("jquery"), d = a.requirejs("biz/selectdate");

Page({
    data: {
        icons: a.requirejs("icons"),
        list: {},
        goodslist: {},
        data: {
            dispatchtype: 0,
            remark: ""
        },
        areaDetail: {
            detail: {
                realname: "",
                mobile: "",
                areas: "",
                street: "",
                address: ""
            }
        },
        merchid: 0,
        showPicker: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        street: [],
        streetIndex: 0,
        noArea: !1,
        showaddressview: !1,
        city_express_state: !1,
        currentDate: "",
        dayList: "",
        currentDayList: "",
        currentObj: "",
        currentDay: "",
        cycelbuy_showdate: "",
        receipttime: "",
        scope: "",
        bargainid: ""
    },
    onLoad: function(t) {
        var e = this, s = [];
        if (t.goods) {
            var r = JSON.parse(t.goods);
            t.goods = r, this.setData({
                ispackage: !0
            });
        }
        e.setData({
            options: t
        }), e.setData({
            bargainid: t.bargainid
        }), a.url(t), console.log(e.data.options), i.get("order/create", e.data.options, function(t) {
            if (console.log(t), 0 == t.error) {
                console.log(t), s = e.getGoodsList(t.goods);
                var r = (e.data.originalprice - t.goodsprice).toFixed(2);
                e.setData({
                    list: t,
                    goods: t,
                    show: !0,
                    address: !0,
                    goodslist: s,
                    merchid: t.merchid,
                    comboprice: r,
                    diyform: {
                        f_data: t.f_data,
                        fields: t.fields
                    },
                    city_express_state: t.city_express_state,
                    cycelbuy_showdate: t.selectDate,
                    receipttime: t.receipttime,
                    iscycel: t.iscycel,
                    scope: t.scope,
                    fromquick: t.fromquick
                }), a.setCache("goodsInfo", {
                    goodslist: s,
                    merchs: t.merchs
                }, 1800);
            } else i.toast(t.message, "loading"), setTimeout(function() {
                wx.navigateBack();
            }, 1e3);
            if ("" != t.fullbackgoods) {
                if (void 0 == t.fullbackgoods) return;
                var o = t.fullbackgoods.fullbackratio, d = t.fullbackgoods.maxallfullbackallratio, o = Math.round(o), d = Math.round(d);
                e.setData({
                    fullbackratio: o,
                    maxallfullbackallratio: d
                });
            }
            1 == t.iscycel && e.show_cycelbuydate();
        }), this.getQuickAddressDetail(), a.setCache("coupon", ""), setTimeout(function() {
            e.setData({
                areas: a.getCache("cacheset").areas
            });
        }, 3e3);
    },
    show_cycelbuydate: function() {
        var t = this, e = d.getCurrentDayString(this, t.data.cycelbuy_showdate), a = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
        t.setData({
            currentObj: e,
            currentDate: e.getFullYear() + "." + (e.getMonth() + 1) + "." + e.getDate() + " " + a[e.getDay()],
            currentYear: e.getFullYear(),
            currentMonth: e.getMonth() + 1,
            currentDay: e.getDate(),
            initDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            checkedDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            maxday: t.data.scope
        });
    },
    onShow: function() {
        var t = this, s = a.getCache("orderAddress"), r = a.getCache("orderShop");
        a.getCache("isIpx") ? t.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : t.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        }), s && (this.setData({
            "list.address": s
        }), t.caculate(t.data.list)), r && this.setData({
            "list.carrierInfo": r,
            "list.storeInfo": r
        });
        var d = a.getCache("coupon");
        "object" == (void 0 === d ? "undefined" : e(d)) && 0 != d.id ? (this.setData({
            "data.couponid": d.id,
            "data.couponname": d.name
        }), i.post("order/create/getcouponprice", {
            couponid: d.id,
            goods: this.data.goodslist,
            goodsprice: this.data.list.goodsprice,
            discountprice: this.data.list.discountprice,
            isdiscountprice: this.data.list.isdiscountprice
        }, function(e) {
            0 == e.error ? (delete e.$goodsarr, t.setData({
                coupon: e
            }), t.caculate(t.data.list)) : i.alert(e.message);
        }, !0)) : (this.setData({
            "data.couponid": 0,
            "data.couponname": null,
            coupon: null
        }), o.isEmptyObject(t.data.list) || t.caculate(t.data.list));
    },
    getGoodsList: function(t) {
        var e = [];
        o.each(t, function(t, a) {
            o.each(a.goods, function(t, a) {
                e.push(a);
            });
        });
        for (var a = 0, i = 0; i < e.length; i++) a += e[i].price;
        return console.log(a), this.setData({
            originalprice: a
        }), e;
    },
    toggle: function(t) {
        var e = i.pdata(t), a = e.id, s = {};
        s[e.type] = 0 == a || void 0 === a ? 1 : 0, this.setData(s);
    },
    phone: function(t) {
        i.phone(t);
    },
    dispatchtype: function(t) {
        var e = i.data(t).type;
        this.setData({
            "data.dispatchtype": e
        }), this.caculate(this.data.list);
    },
    number: function(t) {
        var e = this, a = i.pdata(t), r = s.number(this, t), d = a.id, c = e.data.list, n = 0, l = 0;
        o.each(c.goods, function(t, e) {
            o.each(e.goods, function(e, a) {
                a.id == d && (c.goods[t].goods[e].total = r), n += parseInt(c.goods[t].goods[e].total), 
                l += parseFloat(n * c.goods[t].goods[e].price);
            });
        }), c.total = n, c.goodsprice = o.toFixed(l, 2), e.setData({
            list: c,
            goodslist: e.getGoodsList(c.goods)
        }), this.caculate(c);
    },
    caculate: function(t) {
        var e = this;
        console.log(e.data), i.post("order/create/caculate", {
            goods: this.data.goodslist,
            dflag: this.data.data.dispatchtype,
            addressid: this.data.list.address ? this.data.list.address.id : 0,
            packageid: this.data.list.packageid,
            bargain_id: this.data.bargainid
        }, function(a) {
            t.dispatch_price = a.price, t.enoughdeduct = a.deductenough_money, t.enoughmoney = a.deductenough_enough, 
            t.taskdiscountprice = a.taskdiscountprice, t.discountprice = a.discountprice, t.isdiscountprice = a.isdiscountprice, 
            e.data.data.deduct && (a.realprice -= a.deductcredit), e.data.data.deduct2 && (a.realprice -= a.deductcredit2), 
            e.data.coupon && void 0 !== e.data.coupon.deductprice && (a.realprice -= e.data.coupon.deductprice), 
            t.realprice = o.toFixed(a.realprice, 2), e.setData({
                list: t,
                city_express_state: a.city_express_state
            });
        }, !0);
    },
    submit: function() {
        var t = this.data, e = this, a = this.data.diyform, s = t.giftid;
        if (0 == this.data.goods.giftid && 1 == this.data.goods.gifts.length && (s = this.data.goods.gifts[0].id), 
        console.log(t.fromquick), !t.submit && r.verify(this, a)) {
            t.list.carrierInfo = t.list.carrierInfo || {};
            var d = {
                id: t.options.id ? t.options.id : 0,
                goods: t.goodslist,
                gdid: t.options.gdid,
                dispatchtype: t.data.dispatchtype,
                fromcart: t.list.fromcart,
                carrierid: 1 == t.data.dispatchtype && t.list.carrierInfo ? t.list.carrierInfo.id : 0,
                addressid: t.list.address ? t.list.address.id : 0,
                carriers: 1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify ? {
                    carrier_realname: t.list.member.realname,
                    carrier_mobile: t.list.member.mobile,
                    realname: t.list.carrierInfo.realname,
                    mobile: t.list.carrierInfo.mobile,
                    storename: t.list.carrierInfo.storename,
                    address: t.list.carrierInfo.address
                } : "",
                remark: t.data.remark,
                deduct: t.data.deduct,
                deduct2: t.data.deduct2,
                couponid: t.data.couponid,
                invoicename: t.list.invoicename,
                submit: !0,
                packageid: t.list.packageid,
                giftid: s,
                diydata: t.diyform.f_data,
                receipttime: t.receipttime,
                bargain_id: e.data.options.bargainid,
                fromquick: t.fromquick
            };
            if (t.list.storeInfo && (d.carrierid = t.list.storeInfo.id), 1 == t.data.dispatchtype || t.list.isvirtual || t.list.isverify) {
                if ("" == o.trim(t.list.member.realname)) return void i.alert("请填写联系人!");
                if ("" == o.trim(t.list.member.mobile)) return void i.alert("请填写联系方式!");
                if (t.list.isforceverifystore && !t.list.storeInfo) return void i.alert("请选择门店!");
                d.addressid = 0;
            } else if (!d.addressid && !t.list.isonlyverifygoods) return void i.alert("地址没有选择!");
            e.setData({
                submit: !0
            }), i.post("order/create/submit", d, function(t) {
                e.setData({
                    submit: !1
                }), 0 == t.error ? wx.navigateTo({
                    url: "/pages/order/pay/index?id=" + t.orderid
                }) : i.alert(t.message);
            }, !0);
        }
    },
    dataChange: function(t) {
        var e = this.data.data, a = this.data.list;
        switch (t.target.id) {
          case "remark":
            e.remark = t.detail.value;
            break;

          case "deduct":
            e.deduct = t.detail.value, i = parseFloat(a.realprice), i += e.deduct ? -parseFloat(a.deductmoney) : parseFloat(a.deductmoney), 
            a.realprice = i;
            break;

          case "deduct2":
            e.deduct2 = t.detail.value;
            var i = parseFloat(a.realprice);
            i += e.deduct2 ? -parseFloat(a.deductcredit2) : parseFloat(a.deductcredit2), a.realprice = i;
        }
        a.realprice = o.toFixed(a.realprice, 2), this.setData({
            data: e,
            list: a
        });
    },
    listChange: function(t) {
        var e = this.data.list;
        switch (t.target.id) {
          case "invoicename":
            e.invoicename = t.detail.value;
            break;

          case "realname":
            e.member.realname = t.detail.value;
            break;

          case "mobile":
            e.member.mobile = t.detail.value;
        }
        this.setData({
            list: e
        });
    },
    url: function(t) {
        var e = i.pdata(t).url;
        wx.redirectTo({
            url: e
        });
    },
    onChange: function(t) {
        return r.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return r.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return r.selectArea(this, t);
    },
    bindChange: function(t) {
        return r.bindChange(this, t);
    },
    onCancel: function(t) {
        return r.onCancel(this, t);
    },
    onConfirm: function(t) {
        r.onConfirm(this, t);
        var e = this.data.pval, a = this.data.areas, i = this.data.areaDetail.detail;
        i.province = a[e[0]].name, i.city = a[e[0]].city[e[1]].name, i.datavalue = a[e[0]].code + " " + a[e[0]].city[e[1]].code, 
        a[e[0]].city[e[1]].area && a[e[0]].city[e[1]].area.length > 0 ? (i.area = a[e[0]].city[e[1]].area[e[2]].name, 
        i.datavalue += " " + a[e[0]].city[e[1]].area[e[2]].code, this.getStreet(a, e)) : i.area = "", 
        i.street = "", this.setData({
            "areaDetail.detail": i,
            streetIndex: 0,
            showPicker: !1
        });
    },
    getIndex: function(t, e) {
        return r.getIndex(t, e);
    },
    showaddressview: function(t) {
        var e = "";
        e = "open" == t.target.dataset.type, this.setData({
            showaddressview: e
        });
    },
    onChange2: function(t) {
        var e = this, a = e.data.areaDetail.detail, i = t.currentTarget.dataset.type, s = o.trim(t.detail.value);
        "street" == i && (a.streetdatavalue = e.data.street[s].code, s = e.data.street[s].name), 
        a[i] = s, e.setData({
            "areaDetail.detail": a
        });
    },
    getStreet: function(t, e) {
        if (t && e) {
            var a = this;
            if (a.data.areaDetail.detail.province && a.data.areaDetail.detail.city && this.data.openstreet) {
                var s = t[e[0]].city[e[1]].code, r = t[e[0]].city[e[1]].area[e[2]].code;
                i.get("getstreet", {
                    city: s,
                    area: r
                }, function(t) {
                    var e = t.street, i = {
                        street: e
                    };
                    if (e && a.data.areaDetail.detail.streetdatavalue) for (var s in e) if (e[s].code == a.data.areaDetail.detail.streetdatavalue) {
                        i.streetIndex = s, a.setData({
                            "areaDetail.detail.street": e[s].name
                        });
                        break;
                    }
                    a.setData(i);
                });
            }
        }
    },
    getQuickAddressDetail: function() {
        var t = this, e = t.data.id;
        i.get("member/address/get_detail", {
            id: e
        }, function(e) {
            var a = {
                openstreet: e.openstreet,
                show: !0
            };
            if (!o.isEmptyObject(e.detail)) {
                var i = e.detail.province + " " + e.detail.city + " " + e.detail.area, s = t.getIndex(i, t.data.areas);
                a.pval = s, a.pvalOld = s, a.areaDetail.detail = e.detail;
            }
            t.setData(a), e.openstreet && s && t.getStreet(t.data.areas, s);
        });
    },
    submitaddress: function() {
        var t = this, e = t.data.areaDetail.detail;
        t.data.posting || ("" != e.realname && e.realname ? "" != e.mobile && e.mobile ? "" != e.city && e.city ? !(t.data.street.length > 0) || "" != e.street && e.street ? "" != e.address && e.address ? e.datavalue ? (e.id = 0, 
        t.setData({
            posting: !0
        }), i.post("member/address/submit", e, function(a) {
            if (0 != a.error) return t.setData({
                posting: !1
            }), void s.toast(t, a.message);
            e.id = a.addressid, t.setData({
                showaddressview: !1,
                "list.address": e
            }), i.toast("保存成功");
        })) : s.toast(t, "地址数据出错，请重新选择") : s.toast(t, "请填写详细地址") : s.toast(t, "请选择所在街道") : s.toast(t, "请选择所在地区") : s.toast(t, "请填写联系电话") : s.toast(t, "请填写收件人"));
    },
    giftPicker: function() {
        this.setData({
            active: "active",
            gift: !0
        });
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            showcoupon: !1,
            gift: !1
        });
    },
    radioChange: function(t) {
        this.setData({
            giftid: t.currentTarget.dataset.giftgoodsid,
            gift_title: t.currentTarget.dataset.title
        });
    },
    sendclick: function() {
        wx.navigateTo({
            url: "/pages/map/index"
        });
    },
    clearform: function() {
        var t = this.data.diyform;
        t.f_data = "", this.setData({
            diyform: t
        });
    },
    syclecancle: function() {
        this.setData({
            cycledate: !1
        });
    },
    sycleconfirm: function() {
        this.setData({
            cycledate: !1
        });
    },
    editdate: function(t) {
        d.setSchedule(this), this.setData({
            cycledate: !0,
            create: !0
        });
    },
    doDay: function(t) {
        d.doDay(t, this);
    },
    selectDay: function(t) {
        d.selectDay(t, this), d.setSchedule(this);
    }
});