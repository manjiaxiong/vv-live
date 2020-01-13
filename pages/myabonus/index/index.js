var e = getApp(),
	a = e.requirejs("core"),
	t = e.requirejs("biz/diyform");

Page({
			data: {
				bankIndex: 0,
				tempFilePaths: "",
				images: [],
				imgs: [],
				islook: '', //是否勾选
				array: ['美国', '中国', '巴西', '日本'],
				aagentlevel: [{
						id: 0,
						name: '梨',
						price: 13.6

					},
					{
						id: 1,
						name: '苹果',
						price: 18.6
					},
					{
						id: 2,
						name: '火龙果',
						price: 33.6
					},
					{
						id: 3,
						name: '苹果',
						price: 6.6
					}]
				},
				onLoad: function(e) {},
				onShow: function() {
					this.getData();
				},
				getData: function() {
					// var t = e.getCache("orderAddress"), i = this;
					// a.get("myabonus/register", {}, function(e) {
					//     console.log(e), 70013 != e.error ? (e.show = !0, wx.setNavigationBarTitle({
					//         title: "申请成为" + e.set.texts.myaagent || "申请"
					//     }), i.setData(e), t && i.setData({
					//         address: t,
					//         bankIndex: 0
					//     }), i.setData({
					//         diyform: {
					//             f_data: e.f_data,
					//             fields: e.fields
					//         }
					//     })) : wx.redirectTo({
					//         url: "/pages/myabonus/index"
					//     });
					// });
				},
				
				  bindPickerChange: function(e) {
				    console.log('picker发送选择改变，携带值为', e.detail.value)
				    this.setData({
				      index: e.detail.value
				    })
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
				bankChange: function(e) {
					console.log(1)
					var a = e.detail.value;
					this.setData({
						bankIndex: a
					});
				},
				upload: function(e) {
					var t = this,
						i = a.data(e),
						r = i.type,
						s = t.data.images,
						n = t.data.imgs,
						m = i.index;
					"image" == r ? a.upload(function(e) {
						s.push(e.filename), n.push(e.url), t.setData({
							images: s,
							imgs: n
						});
					}) : "image-remove" == r ? (s.splice(m, 1), n.splice(m, 1), t.setData({
						images: s,
						imgs: n
					})) : "image-preview" == r && wx.previewImage({
						current: n[m],
						urls: n
					});
				},
				submit: function(e) {
					var i = this.data;
					if (0 == this.data.template_flag) {
						if (!this.data.member.realname) return void a.alert("请填写,真实姓名!");
						if (!this.data.member.mobile) return void a.alert("请填写,手机号!");
						if (!i.aagentlevel[i.bankIndex].levelname) return void a.alert("请选择代理等级");
						s = {
							realname: this.data.member.realname,
							mobile: this.data.member.mobile,
							weixin: this.data.member.weixin,
							aagentlevel: i.aagentlevel[i.bankIndex].id,
							images: this.data.imgs
						};
					} else {
						var r = this.data.diyform;
						t.verify(this, r) || a.alert("请检查必填项是否填写");
						var s = {
							memberdata: this.data.diyform.f_data,
							agentid: this.data.mid,
							icode: this.data.member.icode,
							weixin: this.data.member.weixin,
							images: this.data.imgs
						};
					}
					a.post("myabonus/register", s, function(e) {
						0 != e.error ? a.alert(e.message) : wx.redirectTo({
							url: 1 == e.check ? "/pages/myabonus/index" : "/pages/myabonus/register/index"
						});
					});
				},
				DiyFormHandler: function(e) {
					return t.DiyFormHandler(this, e);
				},
				checkboxChange: function(e) {
					console.log('checkbox发生change事件，携带value值为：', e.detail.value)
				}
			});
