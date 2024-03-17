// pages/tourism/tourism.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tourismlist:[{
      id:12,
      name:"蔡伦竹海",
      address:"耒阳",
      info:"ababababababab",
      avurl:"../../db/旅游图片/R-C.jfif"
    },{
      id:13,
      name:"南岳衡山",
      address:"南岳",
      info:"ababababababab",
      avurl:"../../db/旅游图片/W020160901535841626246.jpg"
    }]
  },

  gototdetail(){
    wx.navigateTo({
      url: '../tourismdetail/tourismdetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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