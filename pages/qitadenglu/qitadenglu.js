const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    passWord: '',
    theme: wx.getSystemInfoSync().theme,
  },

  onInputChange(e) {
    const nickName = e.detail.value
    this.setData({
      nickName: nickName
    })
    app.globalData.userInfo.nickName = nickName
  },
  onInputChangePs(e) {
    const passWord = e.detail.value
    this.setData({
      passWord,
    })
    app.globalData.passWord = passWord
  },
  formSubmit(e) {
    const loginData = {
      username: this.data.nickName,
      password: this.data.passWord
    }
    //登录
    wx.request({
      url: 'http://127.0.0.1:8081/hx/bsuser/bslogin',
      method: 'POST',
      data: loginData,
      success: res => {
        // console.log(res.data.data.userData.avatarurl);
        app.globalData.userInfo.avatarUrl = res.data.data.userData.avatarurl
        app.globalData.token = res.data.data.token
        app.globalData.userInfo.userId = res.data.data.userData.id
        wx.showToast({
          title: '登录成功',
        })
        wx.navigateBack({
          delta: 1,
          success: function () {
            wx.navigateTo({
              url: 'pages/denglu/denglu?refresh=true'
            });
          }
        });
      },
      fail: err => {
        console.log(err);
        wx.showToast({
          title: '用户名或者密码错误',
        })
      }

    })


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