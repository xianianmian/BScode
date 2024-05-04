const app = getApp()
const defoultavt = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    showModle: false,
    avatarUrl: defoultavt,
    nickName: '',
    passWord: '',
    showxingxi: false,
    refreshCount: 0,
    itemsCustom: [{
        title: '全部订单',
        icon: '../../db/tubiao/shezhil.png',
        tag: '1'
      },
      {
        title: '待付款',
        icon: '../../db/tubiao/daifukuan.png',
        tag: '2'
      },
      {
        title: '待评价',
        icon: '../../db/tubiao/daipingjia.png',
        tag: '3'
      },
    ],
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
  gotoqitadenglu(e) {
    wx.navigateTo({
      url: '../qitadenglu/qitadenglu',
      success: () =>{
        this.onClose()
      }
    })
  },
  gotozhuce(e) {
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
      success: () =>{
        this.onClose()
      }
    })
  },
  gotozhangdan(e) {
    const index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../zhangdanlist/zhangdanlist?activeIndex=${index}`,
    })
  },
  handleTapItem() {
    this.gotozhangdan()
  },
  logout() {
    this.setData({
      showxingxi: false,
      avatarUrl: defoultavt
    })
  },
  openSetting(){
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
  onLoad(options) {
    console.log(app.globalData);
    if (app.globalData.userInfo.avatarUrl !== "" && options.refresh === 'true') {
      this.setData({
        showxingxi: true,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        passWord: app.globalData.userInfo.passWord,
      })
    }
  },
  onShow: function () {
    this.setData({
      refreshCount: this.data.refreshCount + 1
    });
    if (this.data.refreshCount >= 2 && app.globalData.userInfo.avatarUrl !== "") {
      // 执行刷新逻辑
      this.setData({
        showxingxi: true,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        passWord: app.globalData.userInfo.passWord,
      })
    }
  }


})