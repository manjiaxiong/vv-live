function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), o = a.requirejs("core"), i = (a.requirejs("icons"), a.requirejs("foxui")), s = a.requirejs("biz/diypage"), n = a.requirejs("biz/diyform"), c = a.requirejs("biz/goodspicker"), r = a.requirejs("jquery"), d = a.requirejs("wxParse/wxParse"), u = 0, l = a.requirejs("biz/selectdate");

Page((e = {
    data: {
        diypages: {},
        usediypage: !1,
        specs: [],
        options: [],
        icons: a.requirejs("icons"),
        goods: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        active: "",
        slider: "",
        tempname: "",
        info: "active",
        preselltimeend: "",
        presellsendstatrttime: "",
        advWidth: 0,
        dispatchpriceObj: 0,
        now: parseInt(Date.now() / 1e3),
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timer: 0,
        discountTitle: "",
        istime: 1,
        istimeTitle: "",
        isSelected: !1,
        params: {},
        total: 1,
        optionid: 0,
        audios: {},
        audiosObj: {},
        defaults: {
            id: 0,
            merchid: 0
        },
        buyType: "",
        pickerOption: {},
        specsData: [],
        specsTitle: "",
        canBuy: "",
        diyform: {},
        showPicker: !1,
        showcoupon: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0,
        commentObj: {},
        commentObjTab: 1,
        loading: !1,
        commentEmpty: !1,
        commentPage: 1,
        commentLevel: "all",
        commentList: [],
        closeBtn: !1,
        soundpic: !0,
        animationData: {},
        uid: "",
        stararr: [ "all", "good", "normal", "bad", "pic" ],
        nav_mask: !1,
        nav_mask2: !1,
        nav: 0,
        giftid: "",
        limits: !0,
        modelShow: !1,
        showgoods: !0,
        currentDate: "",
        dayList: "",
        currentDayList: "",
        currentObj: "",
        currentDay: "",
        checkedDate: "",
        showDate: "",
        scope: ""
    },
    favorite: function(t) {
        var e = this;
        if (e.data.limits) {
            var a = t.currentTarget.dataset.isfavorite ? 0 : 1;
            o.get("member/favorite/toggle", {
                id: e.data.options.id,
                isfavorite: a
            }, function(t) {
                t.isfavorite ? e.setData({
                    "goods.isfavorite": 1
                }) : e.setData({
                    "goods.isfavorite": 0
                });
            });
        } else this.setData({
            modelShow: !0
        });
    },
    menucart: function() {
        this.data.limits ? wx.switchTab({
            url: "/pages/member/cart/index"
        }) : this.setData({
            modelShow: !0
        });
    },
    goodsTab: function(t) {
        var e = this, a = t.currentTarget.dataset.tap;
        if ("info" == a) this.setData({
            info: "active",
            para: "",
            comment: ""
        }); else if ("para" == a) this.setData({
            info: "",
            para: "active",
            comment: ""
        }); else if ("comment" == a) {
            if (e.setData({
                info: "",
                para: "",
                comment: "active"
            }), e.data.commentList.length > 0) return void e.setData({
                loading: !1
            });
            e.setData({
                loading: !0
            }), o.get("goods/get_comment_list", {
                id: e.data.options.id,
                level: e.data.commentLevel,
                page: e.data.commentPage
            }, function(t) {
                t.list.length > 0 ? e.setData({
                    loading: !1,
                    commentList: t.list,
                    commentPage: t.page
                }) : e.setData({
                    loading: !1,
                    commentEmpty: !0
                });
            });
        }
    },
    comentTap: function(t) {
        var e = this, a = t.currentTarget.dataset.type, i = "";
        1 == a ? i = "all" : 2 == a ? i = "good" : 3 == a ? i = "normal" : 4 == a ? i = "bad" : 5 == a && (i = "pic"), 
        a != e.data.commentObjTab && o.get("goods/get_comment_list", {
            id: e.data.options.id,
            level: i,
            page: e.data.commentPage
        }, function(t) {
            t.list.length > 0 ? e.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page,
                commentObjTab: a,
                commentEmpty: !1
            }) : e.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page,
                commentObjTab: a,
                commentEmpty: !0
            });
        });
    },
    getDetail: function(t) {
        var e = this, a = parseInt(Date.now() / 1e3);
        e.setData({
            loading: !0
        }), o.get("goods/get_detail", {
            id: t.id
        }, function(t) {
            console.log(t), t.error > 0 && (e.setData({
                show: !0,
                showgoods: !1
            }), i.toast(e, t.message), setTimeout(function() {
                wx.navigateBack();
            }, 800));
            var s = t.goods.coupons, n = t.goods.thumbMaxHeight, c = t.goods.thumbMaxWidth / n;
            if (wx.getSystemInfo({
                success: function(t) {
                    var a = t.windowWidth / c;
                    e.setData({
                        advWidth: t.windowWidth,
                        advHeight: a
                    });
                }
            }), e.setData({
                coupon: s,
                coupon_l: s.length,
                packagegoods: t.goods.packagegoods,
                packagegoodsid: t.goods.packagegoods.goodsid,
                credittext: t.goods.credittext,
                activity: t.goods.activity,
                phonenumber: t.goods.phonenumber,
                showDate: t.goods.showDate,
                scope: t.goods.scope
            }), t.goods.packagegoods && e.package(), d.wxParse("wxParseData", "html", t.goods.content, e, "0"), 
            d.wxParse("wxParseData_buycontent", "html", t.goods.buycontent, e, "0"), e.setData({
                show: !0,
                goods: t.goods,
                minprice: t.goods.minprice,
                maxprice: t.goods.maxprice,
                preselltimeend: t.goods.preselltimeend,
                style: t.goods.labelstyle.style,
                navbar: t.goods.navbar,
                labels: t.goods.labels
            }), console.log(t.goods), wx.setNavigationBarTitle({
                title: t.goods.title || "商品详情"
            }), u = t.goods.hasoption, r.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice ? e.setData({
                dispatchpriceObj: 0
            }) : e.setData({
                dispatchpriceObj: 1
            }), t.goods.isdiscount > 0 && t.goods.isdiscount_time >= a ? (clearInterval(e.data.timer), 
            l = setInterval(function() {
                e.countDown(0, t.goods.isdiscount_time);
            }, 1e3), e.setData({
                timer: l
            })) : e.setData({
                discountTitle: "活动已结束"
            }), t.goods.istime > 0) {
                clearInterval(e.data.timer);
                var l = setInterval(function() {
                    e.countDown(t.goods.timestart, t.goods.timeend, "istime");
                }, 1e3);
                e.setData({
                    timer: l
                });
            }
            t.goods.ispresell > 0 && e.setData({
                preselltimeend: t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
                presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
            }), t.goods.getComments > 0 && o.get("goods/get_comments", {
                id: e.data.options.id
            }, function(t) {
                e.setData({
                    commentObj: t
                });
            }), t.goods.fullbackgoods && e.setData({
                fullbackgoods: t.goods.fullbackgoods
            });
            var g = e.data.fullbackgoods;
            if (void 0 != g) {
                console.log(g);
                var h = g.maxfullbackratio, m = g.maxallfullbackallratio, h = Math.round(h), m = Math.round(m);
                e.setData({
                    maxfullbackratio: h,
                    maxallfullbackallratio: m
                });
            }
            9 == t.goods.type && (e.setData({
                checkedDate: t.goods.nowDate
            }), e.show_cycelbuydate());
        });
    },
    countDown: function(t, e, a) {
        var o = parseInt(Date.now() / 1e3), i = (t > o ? t : e) - o, s = parseInt(i), n = Math.floor(s / 86400), c = Math.floor((s - 24 * n * 60 * 60) / 3600), r = Math.floor((s - 24 * n * 60 * 60 - 3600 * c) / 60), d = [ n, c, r, Math.floor(s - 24 * n * 60 * 60 - 3600 * c - 60 * r) ];
        if (this.setData({
            time: d
        }), "istime") {
            var u = "";
            t > o ? u = "距离限时购开始" : t <= o && e > o ? u = "距离限时购结束" : (u = "活动已经结束，下次早点来~", 
            this.setData({
                istime: 0
            })), this.setData({
                istimeTitle: u
            });
        }
    },
    cityPicker: function(t) {
        var e = this;
        t.currentTarget.dataset.tap, wx.navigateTo({
            url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys.citys + "&onlysent=" + e.data.goods.citys.onlysent
        });
    },
    giftPicker: function() {
        this.setData({
            active: "active",
            gift: !0
        });
    },
    couponPicker: function() {
        this.setData({
            active: "active",
            showcoupon: !0
        });
    },
    couponrecived: function(t) {
        var e = t.currentTarget.dataset.id, a = this;
        o.post("goods.pay_coupon", {
            id: e
        }, function(t) {
            console.log(t), 0 == t.error ? (a.setData({
                showcoupon: !1,
                active: ""
            }), i.toast(a, "已领取")) : i.toast(a, t.message);
        });
    },
    selectPicker: function(t) {
        var e = this;
        e.data.limits ? (console.error(t), c.selectpicker(t, e, "goodsdetail")) : e.setData({
            modelShow: !0
        });
    },
    specsTap: function(t) {
        var e = this;
        c.specsTap(t, e);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            showcoupon: !1,
            gift: !1,
            cycledate: !1
        });
    },
    buyNow: function(t) {
        var e = this;
        c.buyNow(t, e, "goods_detail");
    },
    getCart: function(t) {
        var e = this;
        c.getCart(t, e);
    },
    select: function() {
        var t = this, e = t.data.optionid;
        t.data.diyform, u > 0 && 0 == e ? i.toast(t, "请选择规格") : this.setData({
            active: "",
            slider: "out",
            isSelected: !0,
            tempname: ""
        });
    },
    inputNumber: function(t) {
        var e = this;
        c.inputNumber(t, e);
    },
    number: function(t) {
        var e = this;
        c.number(t, e);
    },
    onLoad: function(t) {
        var e = this;
        s.get(this, "goodsdetail", function(t) {
            var a = t.diypage.items;
            for (var o in a) "copyright" == a[o].id && e.setData({
                copyright: a[o]
            });
            console.error(a);
        }), t = t || {};
        var i = decodeURIComponent(t.scene);
        if (!t.id && i) {
            var n = o.str2Obj(i);
            t.id = n.id, n.mid && (t.mid = n.mid);
        }
        this.setData({
            id: t.id
        }), a.url(t), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), e.setData({
            uid: t.id
        }), a.getUserInfo(function() {
            e.setData({
                options: t
            }), wx.getSystemInfo({
                success: function(t) {
                    e.setData({
                        advWidth: t.windowWidth
                    }), console.log(t.windowHeight);
                }
            }), e.setData({
                success: !0,
                cover: !0,
                showvideo: !0
            }), e.getDetail(t), setTimeout(function() {
                e.setData({
                    areas: a.getCache("cacheset").areas
                });
            }, 3e3);
        }, function() {
            wx.redirectTo({
                url: "/pages/message/auth/index"
            });
        });
    },
    show_cycelbuydate: function() {
        var t = this, e = l.getCurrentDayString(this, t.data.showDate), a = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
        t.setData({
            currentObj: e,
            currentDate: e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日 " + a[e.getDay()],
            currentYear: e.getFullYear(),
            currentMonth: e.getMonth() + 1,
            currentDay: e.getDate(),
            initDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            checkedDate: Date.parse(e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()),
            maxday: t.data.scope
        });
    },
    package: function() {
        var t = this;
        o.get("package.get_list", {
            goodsid: this.data.packagegoodsid
        }, function(e) {
            console.log(e.list[0]), t.setData({
                packageList: e.list[0]
            });
        });
    },
    onShow: function() {
        var t = this;
        a.getCache("isIpx") ? t.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : t.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), wx.getStorage({
            key: "mydata",
            success: function(e) {
                wx.removeStorage({
                    key: "mydata",
                    success: function(t) {}
                }), t.getDetail(e.data), wx.pageScrollTo({
                    scrollTop: 0
                });
            }
        }), wx.getSetting({
            success: function(e) {
                var a = e.authSetting["scope.userInfo"];
                t.setData({
                    limits: a
                });
            }
        });
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
    getIndex: function(t, e) {
        return n.getIndex(t, e);
    },
    onShareAppMessage: function() {
        return this.setData({
            closeBtn: !1
        }), o.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.options.id, this.data.goods.title);
    },
    showpic: function() {
        this.setData({
            showpic: !0,
            cover: !1,
            showvideo: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.pause();
    },
    showvideo: function() {
        this.setData({
            showpic: !1,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    startplay: function() {
        this.setData({
            cover: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    bindfullscreenchange: function(t) {
        1 == t.detail.fullScreen ? this.setData({
            success: !1
        }) : this.setData({
            success: !0
        });
    },
    phone: function() {
        var t = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sharePoster: function() {
        wx.navigateTo({
            url: "/pages/goods/poster/poster?id=" + this.data.uid
        });
    },
    closeBtn: function() {
        this.setData({
            closeBtn: !1
        });
    },
    onHide: function() {
        this.setData({
            closeBtn: !1
        });
    },
    showshade: function() {
        this.setData({
            closeBtn: !0
        });
    },
    nav: function() {
        this.setData({
            nav_mask: !this.data.nav_mask
        });
    },
    nav2: function() {
        this.setData({
            nav_mask2: !this.data.nav_mask2
        });
    },
    changevoice: function() {
        this.data.sound ? this.setData({
            sound: !1,
            soundpic: !0
        }) : this.setData({
            sound: !0,
            soundpic: !1
        });
    },
    radioChange: function(t) {
        this.setData({
            giftid: t.currentTarget.dataset.giftgoodsid,
            gift_title: t.currentTarget.dataset.title
        });
    },
    activityPicker: function() {
        this.setData({
            fadein: "in"
        });
    },
    actOutPicker: function() {
        this.setData({
            fadein: ""
        });
    },
    hintclick: function() {
        wx.openSetting({
            success: function(t) {}
        });
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    },
    sendclick: function() {
        wx.navigateTo({
            url: "/pages/map/index"
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
        l.setSchedule(this), this.setData({
            cycledate: !0
        });
    },
    doDay: function(t) {
        l.doDay(t, this);
    },
    selectDay: function(t) {
        l.selectDay(t, this), l.setSchedule(this);
    },
    play: function(t) {
        var e = t.target.dataset.id, a = this.data.audiosObj[e] || !1;
        if (!a) {
            a = wx.createInnerAudioContext("audio_" + e);
            var o = this.data.audiosObj;
            o[e] = a, this.setData({
                audiosObj: o
            });
        }
        var i = this;
        a.onPlay(function() {
            var t = setInterval(function() {
                var o = a.currentTime / a.duration * 100 + "%", s = Math.floor(Math.ceil(a.currentTime) / 60), n = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), c = Math.ceil(a.currentTime);
                s < 10 && (s = "0" + s);
                var r = s + ":" + n, d = i.data.audios;
                d[e].audiowidth = o, d[e].Time = t, d[e].audiotime = r, d[e].seconds = c, i.setData({
                    audios: d
                });
            }, 1e3);
        });
        var s = t.currentTarget.dataset.audio, n = t.currentTarget.dataset.time, c = t.currentTarget.dataset.pausestop, r = t.currentTarget.dataset.loopplay;
        0 == r && a.onEnded(function(t) {
            d[e].status = !1, i.setData({
                audios: d
            });
        });
        var d = i.data.audios;
        d[e] || (d[e] = {}), a.paused && 0 == n ? (a.src = s, a.play(), 1 == r && (a.loop = !0), 
        d[e].status = !0, i.pauseOther(e)) : a.paused && n > 0 ? (a.play(), 0 == c ? a.seek(n) : a.seek(0), 
        d[e].status = !0, i.pauseOther(e)) : (a.pause(), d[e].status = !1), i.setData({
            audios: d
        });
    },
    pauseOther: function(t) {
        var e = this;
        r.each(this.data.audiosObj, function(a, o) {
            if (a != t) {
                o.pause();
                var i = e.data.audios;
                i[a] && (i[a].status = !1, e.setData({
                    audios: i
                }));
            }
        });
    }
}, t(e, "onHide", function() {
    this.pauseOther();
}), t(e, "onUnload", function() {
    this.pauseOther();
}), t(e, "navigate", function(t) {
    var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, o = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
        url: e
    }), a && wx.makePhoneCall({
        phoneNumber: a
    }), o && wx.navigateToMiniProgram({
        appId: o,
        path: i
    });
}), e));