var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui"), a = t.requirejs("jquery");


Page({
  data: {
    route: "list",
    icons: t.requirejs("icons"),
    merch_list: !1,
    list: !1,
    edit_list: [],
    modelShow: !1
  },
  onLoad: function (e) {
    console.log(e), t.url(e);
  },
  onShow: function () {
    this.get_cart();
    var t = this;
    console.log(12), wx.getSetting({
      success: function (e) {
        var i = e.authSetting["scope.userInfo"];
        t.setData({
          limits: i
        }), console.log(i), i || t.setData({
          modelShow: !0
        });
      }
    });
  },
  get_cart: function () {
    var t, i = this;
    e.get("live/list/get_list", {}, function (e) {
      console.log(e), t = {
        show: !0,
        ismerch: !1,
        ischeckall: e.ischeckall,
        total: e.total,
        cartcount: e.total,
        totalprice: e.totalprice,
        empty: e.empty || !1
      }, void 0 === e.merch_list ? (t.list = e.list || [], i.setData(t)) : (t.merch_list = e.merch_list || [],
        t.ismerch = !0, i.setData(t));
    });
  }

});