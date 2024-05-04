// pages/productdetail/productdetail.js
const timeUtil = require('../../utils/times.js');
const otherfun = require('../../utils/otherfun.js')
const app = getApp()
Page({
  data: {
    goodsData: {},
    txingNum: 1,
    xingList: ["../../db/tubiao/xingl.png", "../../db/tubiao/xinga.png", "../../db/tubiao/xinga.png", "../../db/tubiao/xinga.png", "../../db/tubiao/xinga.png"],
    show: false,
    ifpingjia: false,
    ifzhifu: false,
    buyTime: '',
    idx: ''
  },
  opendialog() {
    this.setData({
      show: true,
    })
  },
  getUserInfo(event) {
    wx.showToast({
      title: '评价完成',
      icon: 'success',
      duration: 1000,
      success: res => {
        this.setData({
          ifpingjia: true
        })
      }
    })

  },

  onClose() {
    this.setData({
      show: false
    });
  },
  changetlove(e) {
    this.setData({
      'goodsData.tlove': !this.data.goodsData.tlove
    })
  },
  scoring(e) {
    let idx = e.currentTarget.dataset.index;
    const newarr = this.data.xingList.map((item, index) => {
      return index < idx + 1 ? "../../db/tubiao/xingl.png" : "../../db/tubiao/xinga.png";
    });
    this.setData({
      xingList: newarr,
      'goodsData.txing': idx + 1
    });

  },

  initXingList(length) {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      if (i < length) {
        arr[i] = "../../db/tubiao/xingl.png"
      } else {
        arr[i] = "../../db/tubiao/xinga.png"
      }
    }
    this.setData({
      xingList: arr
    });
  },
  fukuan() {
    wx.showToast({
      title: '付款成功',
      icon: 'success',
      duration: 2000,
      success: res => {
        this.setData({
          ifzhifu: true
        })
      }
    })

  },
  fanhui() {
    if (app.globalData.token != "") {
    let storagedataList = wx.getStorageSync('AllZhangdanList') || [];
    storagedataList.forEach((item, index) => {
      if (item.jiluTime == this.data.buyTime) {
        item.zhangdanItem.forEach((item1, index1) => {
          if (item1.id == this.data.idx) {
            item1.tlove = this.data.goodsData.tlove;
            item1.txing = this.data.goodsData.txing;
            item1.ifpingjia = this.data.ifpingjia;
            item1.ifzhifu = this.data.ifzhifu;
          }
        });
      }
    });
    //存到本地
    wx.setStorageSync('AllZhangdanList', storagedataList);
    //存到数据库
    const userid = app.globalData.userInfo.userId
    const sqldata = {
      goodsid:this.data.idx,
      isfavorite:this.data.goodsData.tlove,
      goodsrate:this.data.goodsData.txing,
      ztime:this.data.buyTime,
      userid:userid
    }
    wx.request({
      url: 'http://127.0.0.1:8081/hx/bszhangdan/update',
      method: 'PUT',
      data:sqldata,
      success: res => {
        console.log(res,'成功');
      }
    })
    wx.navigateBack({
      delta: 1,
    })
  }else {
    wx.showToast({
      title: '未登录',
      success: res => {
        const denglu = setTimeout(() => {
          wx.switchTab({
            url: '../denglu/denglu',
          })
        }, 1500)
      }
    })
  }
  },
  onLoad(options) {
    let idx = options.id;
    let buyTime = options.buyTime;
    let ifpingjia = options.ifpingjia;
    let ifzhifu = options.ifzhifu;

    wx.request({
      url: `http://127.0.0.1:8081/hx/bsproducts/bsgetone?id=${idx}`,
      success: res => {
        const goodsData = res.data[0];
        const txingNum = res.data[0].txing;
        this.initXingList(txingNum);
        this.setData({
          goodsData,
          txingNum,
          ifpingjia,
          ifzhifu,
          buyTime,
          idx,
        })
      }
    })
  },
  onShow() {
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