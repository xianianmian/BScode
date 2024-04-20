const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
 
 
Page({
/**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName:'',
    passWord:'',
    theme: wx.getSystemInfoSync().theme,
  },
 
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
   console.log(e.detail);
    this.setData({
      avatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    console.log(nickName);
    this.setData({
      nickName:nickName
    })
  },
  onInputChangePs(e) {
    const passWord = e.detail.value
    this.setData({
      passWord,
    })
  },
  formSubmit(e){
     wx.showToast({
       title: 'cg',
     })
     const regeisterData = {
       username:this.data.nickName,
       password:this.data.passWord,
       avatarurl:this.data.avatarUrl
     }
     //存储注册信息到数据看
     wx.request({
       url: 'http://127.0.0.1:8081/hx/bsuser/bsregister',
       method:'POST',
       data:regeisterData,
       success: res => {
        //  console.log('注册成功',res);
        wx.showToast({
          title: '注册成功',
        })
       },
       fail: err => {
         console.log(err);
       }
       
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