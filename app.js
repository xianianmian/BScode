// app.js
App({
  onLaunch() {
    // 展示本地存储能

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    tuijianbtn: true,
    userInfo: {
      avatarUrl:'',
      nickName:'',
      passWord:'',
      userId:'',
      authortype:3
    },
    token:''
  }
})
