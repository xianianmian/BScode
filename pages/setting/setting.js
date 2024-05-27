const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodssettingshow: false,
    goodsname: '',
    addressvalue: '',
    textvalue: '',
    radio: '1',
    fileList: [],
    goodsprice: '',
    typeitems: [{
        name: '熟食',
        value: 'cooked',
        checked: false
      },
      {
        name: '非熟食',
        value: 'uncooked',
        checked: false
      },
      {
        name: '其它',
        value: 'other',
        checked: false
      }
    ],
    showModle: false,
    userInfoShow: false,
    tuijianbtn: false,
    switchchecked: true,
    changeUserInfoShow: false,
    userInfo: {},
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    passWord: '',
    userId: '',
    authortype: 3
  },
  changeShowModle() {
    this.setData({
      showModle: true
    })
  },
  onClose() {
    this.setData({
      showModle: false
    })
  },
  getUserinfo() {
    console.log(app.globalData.userInfo);
    this.setData({
      userInfoShow: true
    })
  },
  changeUserinfo() {
    this.setData({
      changeUserInfoShow: true
    })
  },
  confirmChangeUserInfo() {

  },
  useronClose() {
    this.setData({
      userInfoShow: false
    });
  },
  changeUseronClose() {
    this.setData({
      changeUserInfoShow: false
    })
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    console.log(e.detail);
    this.setData({
      avatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    console.log(nickName);
    this.setData({
      nickName: nickName
    })
  },
  onInputChangePs(e) {
    const passWord = e.detail.value
    this.setData({
      passWord,
    })
  },
  formSubmit(e) {
    wx.showToast({
      title: 'cg',
    })
    const regeisterData = {
      username: this.data.nickName,
      password: this.data.passWord,
      avatarurl: this.data.avatarUrl,
      id: this.data.userInfo.userId
    }
    console.log(regeisterData);
    wx.request({
      url: 'http://127.0.0.1:8081/hx/bsuser/update',
      method: "PUT",
      data: regeisterData,
      success: res => {
        // console.log('修改成功');
        wx.showToast({
          title: '修改成功',
        })
        wx.switchTab({
          url: '../denglu/denglu',
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  changetuijianShowModle() {
    this.setData({
      tuijianbtn: true
    })
  },
  tuijianclose() {
    this.setData({
      tuijianbtn: false
    })
  },
  tuijianchange({
    detail
  }) {

    this.setData({
      switchchecked: detail
    })
    app.globalData.tuijianbtn = detail
  },
  goodssettingonClose() {
    this.setData({
      goodssettingshow: false
    });
  },
  opengoodssetting() {
    this.setData({
      goodssettingshow: true
    });
  },
  onChange0(event) {
    this.setData({
      goodsname: event.detail
    })
  },
  onChange1(event) {
    this.setData({
      addressvalue: event.detail
    })
  },
  onChange2(event) {
    this.setData({
      textvalue: event.detail
    })
  },
  onChange3(event) {
    this.setData({
      goodsprice: event.detail
    })
  },
  radioChange: function (e) {
    var items = this.data.typeitems;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value;
    }
    this.setData({
      typeitems: items
    });
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const {
      fileList = []
    } = this.data;
    fileList.push({
      ...file,
    });
    this.setData({
      fileList
    });
  },
  openshenhe(){
    wx.showToast({
      title: '暂无审核信息',
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userId: app.globalData.userInfo.userId,
      switchchecked: app.globalData.tuijianbtn
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})