// pages/productdetail/productdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData:{},
    xingList: [],
  },


  scoring(length) {
    const arr = ["../../db/qita/an.jpg","../../db/qita/an.jpg","../../db/qita/an.jpg","../../db/qita/an.jpg","../../db/qita/an.jpg",] ;
    console.log(this.data.goodsData.txing,'lllllll');
    for(let i = 0 ; i<5 ; i++){
      if(i < length){
        arr[i] = "../../db/qita/liang.jpg"
      }
    }
    this.setData({
      xingList:arr
    });
  },
  onLoad(query) {
    const { id = '1' } = query;
    wx.request({
      url: `http://localhost:3002/api3/goods-list/${id}`,
      success: res => {
        const goodsData = res.data;
        this.scoring(res.data.txing);
        this.setData({
          goodsData,
        })
      }
    })
  },
  onShow(){
    this.scoring();
  },
  /**
   * 生命周期函数--监听页面加载
   */

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