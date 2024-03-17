const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
 
 
Page({
/**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName:'',
    theme: wx.getSystemInfoSync().theme,
  },
 
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
   console.log(e.detail);
    this.setData({
      avatarUrl,
    })
    app.globalData.userInfo.avatarUrl = avatarUrl
   
  },
  onInputChange(e) {
    const nickName = e.detail.value
    console.log(nickName);
    this.setData({
      nickName:nickName
    })
    app.globalData.userInfo.nickName = nickName
  },
  formSubmit(e){
     wx.showToast({
       title: 'cg',
     })
    //  wx.switchTab({
    //    url: '../denglu/denglu',
    //  }),
     wx.navigateBack({
      delta: 1,
      success: function () {
        wx.navigateTo({
          url: 'pages/denglu/denglu?refresh=true'
        });
      }
    });
  },
 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  }
})