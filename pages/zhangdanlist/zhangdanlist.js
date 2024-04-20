

// pages/zhangdanlist/zhangdanlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AllZhangdanList: [],
    AllZhangdanList2:[],
    activeIndex: 0,
    menuList: ['全部', '待付款', '未付款']
  },
  itemTap(e) {
    const index = e.currentTarget.dataset.index;
    
    if(index == 0){
      this.setData({
        AllZhangdanList:this.data.AllZhangdanList2
      })
    }
    if(index == 1){
      const arrdata = this.data.AllZhangdanList2.filter(x => !x.ifzhifu);
      this.setData({
        AllZhangdanList: arrdata
      })
    }
    if(index == 2){
      const arrdata = this.data.AllZhangdanList2.filter(x => !x.ifpingjia);
      this.setData({
        AllZhangdanList: arrdata
      })
    }

    this.setData({
      activeIndex: index
    })
  },
  getTotalPrice(arr) {
    return arr.reduce((a, b) => a + (b.tprice * b.num), 0)
  },
  gotozhiping(e) {
    let info = e.currentTarget.dataset.info;
    let {
      id,
      buyTime,
      ifpingjia,
      ifzhifu
    } = info;
    wx.navigateTo({
      url: `../zhiping/zhiping?id=${id}&buyTime=${buyTime}&ifpingjia=${ifpingjia}&ifzhifu=${ifzhifu}`,
    });
  },
  onLoad(options) {
    const activeIndex = options.activeIndex
    let storagedataList = wx.getStorageSync('AllZhangdanList') || [];
    let AllZhangdanList = []
    storagedataList.forEach((item, index) => {
      if (item.zhangdanItem.every(x => x.ifpingjia)) {
        item.ifpingjia = true
      }
      if (item.zhangdanItem.every(x => x.ifzhifu)) {
        item.ifzhifu = true
      }
      AllZhangdanList.push(Object.assign(item, {
        totalPrice: this.getTotalPrice(item.zhangdanItem)
      }))
    })
    wx.setStorageSync('AllZhangdanList', storagedataList)
    this.setData({
      AllZhangdanList,
      AllZhangdanList2: AllZhangdanList,
      activeIndex,
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
    // let storagedataList = wx.getStorageSync('AllZhangdanList') || [];
    // let AllZhangdanList = []
    // storagedataList.forEach((item,index) =>{
    //   if(item.zhangdanItem.every(x => x.ifpingjia)){
    //     item.ifpingjia = true
    //   }
    //   if(item.zhangdanItem.every(x => x.ifzhifu)){
    //     item.ifzhifu = true
    //   }


    //   AllZhangdanList.push(Object.assign(item ,{ totalPrice : this.getTotalPrice(item.zhangdanItem)}))
    // })
    // this.setData({
    //   AllZhangdanList,
    // })
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