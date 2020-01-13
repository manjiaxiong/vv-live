var e = getApp(), t = e.requirejs("core"), a = e.requirejs("biz/diyform");

Page({
    data: {},
    onLoad: function(e) {},
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var e = this;
        t.get("commission/register", {}, function(t) {
            70003 != t.error ? (t.show = !0, wx.setNavigationBarTitle({
                title: "申请成为" + t.set.texts.agent || "申请"
            }), e.setData(t), e.setData({
                diyform: {
                    f_data: t.f_data,
                    fields: t.fields
                }
            })) : wx.redirectTo({
                url: "/pages/commission/index"
            });
        });
    },
    inputChange: function(e) {
        "realname" == e.target.id ? this.setData({
            "member.realname": e.detail.value
        }) : "mobile" == e.target.id ? this.setData({
            "member.mobile": e.detail.value
        }) : "weixin" == e.target.id ? this.setData({
            "member.weixin": e.detail.value
        }) : "icode" == e.target.id && this.setData({
            "member.icode": e.detail.value
        });
    },
    submit: function(e) {
        if (0 == this.data.template_flag) {
            if (!this.data.member.realname) return void t.alert("请填写,真实姓名!");
            if (!this.data.member.mobile) return void t.alert("请填写,手机号!");
            this.data.member.realname, this.data.member.mobile;
        } else {
            var i = this.data.diyform;
            a.verify(this, i) || t.alert("请检查必填项是否填写"), this.data.diyform.f_data, this.data.mid, 
            this.data.member.icode, this.data.member.weixin;
        }
        console.log(this.data);
    },
    DiyFormHandler: function(e) {
        return a.DiyFormHandler(this, e);
    }
});