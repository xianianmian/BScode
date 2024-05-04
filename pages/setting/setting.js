

const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModle: false,
    userInfoShow:false,
    changeUserInfoShow:false,
    userInfo:{},
    avatarUrl: defaultAvatarUrl,
    nickName:'',
    passWord:'',
    userId:''
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
  getUserinfo(){
    console.log(app.globalData.userInfo);
    this.setData({
      userInfoShow: true
    })
  },
  changeUserinfo(){
    this.setData({ changeUserInfoShow: true})
  },
  confirmChangeUserInfo(){

  },
  useronClose() {
    this.setData({ userInfoShow: false });
  },
  changeUseronClose(){
    this.setData({ changeUserInfoShow: false})
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
      username:this.data.nickName === "" ||  this.data.userInfo.nickName,
      password:this.data.passWord === "" ||  this.data.userInfo.passWord,
      avatarurl:this.data.avatarUrl === "" ||  this.data.userInfo.avatarUrl,
      id: this.data.userInfo.userId
    }
    console.log(regeisterData);
    wx.request({
      url: 'http://127.0.0.1:8081/hx/bsuser/update',
      method: "PUT",
      data:regeisterData,
      success: res =>{
        // console.log('修改成功');
        wx.showToast({
          title: '修改成功',
        })
        wx.switchTab({
          url: '../denglu/denglu',
        })
      },
      fail: err  => {
        console.log(err);
      }
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userId:app.globalData.userInfo.userId
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