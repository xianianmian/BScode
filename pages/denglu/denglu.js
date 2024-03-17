const app = getApp()
const defoultavt = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl:defoultavt,
    nickName:"",
    showxingxi:false,
    refreshCount: 0
  },
  gotoqitadenglu(e){
    wx.navigateTo({
      url: '../qitadenglu/qitadenglu',
    })
  },
  gotozhangdan(){
    wx.navigateTo({
      url: '../zhangdanlist/zhangdanlist',
    })
  },
  logout(){
    this.setData({
      showxingxi:false,
      avatarUrl:defoultavt
    })
  },
  onLoad(options){
    console.log(app.globalData);
    if(app.globalData.userInfo.avatarUrl!=="" && options.refresh === 'true'){
      this.setData({
        showxingxi:true,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        nickName:app.globalData.userInfo.nickName
      })
    }
  },
  onShow: function () {
    this.setData({
      refreshCount: this.data.refreshCount + 1
    });
    
    if (this.data.refreshCount >= 2 && app.globalData.userInfo.avatarUrl!=="") {
      // 执行刷新逻辑
      console.log('页面A执行刷新两次');
      console.log(app.globalData);
      this.setData({
        showxingxi:true,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        nickName:app.globalData.userInfo.nickName
      })
      // // 刷新完成后重置计数器
      // this.setData({
      //   refreshCount: 0
      // });
    }
  }
  

})