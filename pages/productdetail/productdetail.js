// pages/productdetail/productdetail.js
const timeUtil = require('../../utils/times.js');
const otherfun = require('../../utils/otherfun.js')
const app = getApp()
Page({
  data: {
    goodsData: {},
    txingNum: 1,
    xingList: ["../../db/tubiao/xingl.png", "../../db/tubiao/xinga.png", "../../db/tubiao/xinga.png", "../../db/tubiao/xinga.png", "../../db/tubiao/xinga.png"],
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
  //添加到购物车
  addShopCar() {
    // 获取当前商品数据
    let goodsData = this.data.goodsData;
    // 获取页面中的条件值
    const txing = this.data.txingNum;
    let tempdata = Object.assign(
      goodsData, {
        ifpingjia: (goodsData.txing === txing) ? false : true,
        ifzhifu: false,
        buyTime: timeUtil.formatTime()
      }
    )

    let tempzhangdanItem = []
    tempzhangdanItem.push(tempdata)
    // 创建新的数据对象
    const userid = app.globalData.userInfo.userId
    const newData = {
      zhangdanItem: tempzhangdanItem,
      jiluTime: timeUtil.formatTime(),
      ifpingjia: (goodsData.txing === txing) ? false : true,
      ifzhifu: false,
      userid:userid,
    };

    // 从本地存储中获取名为 'AllZhangdanList' 的数组，如果不存在则默认为空数组
    let AllZhangdanList = wx.getStorageSync('AllZhangdanList') || [];

    // 将新数据添加到数组中
    AllZhangdanList.push(newData);

    // 将更新后的数组存储到本地存储中
    wx.setStorageSync('AllZhangdanList', AllZhangdanList);
    const relaunch = setTimeout(() => {
      wx.reLaunch({
        url: '/pages/shop/shop'
      });
    }, 1500)
  },
  //10:支付
  jiesuan(e) {
    if (app.globalData.token != "") {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        success: res => {
          // 获取当前商品数据
          let goodsData = this.data.goodsData;
          // 获取页面中的条件值
          const txing = this.data.txingNum;
          const userid = app.globalData.userInfo.userId
          let tempdata = Object.assign(
            goodsData, {
              ifpingjia: (goodsData.txing === txing) ? false : true,
              ifzhifu: true,
              buyTime: timeUtil.formatTime(),
              userid:userid
            }
          )

          let tempzhangdanItem = []
          tempzhangdanItem.push(tempdata)
          // 创建新的数据对象
          const newData = {
            zhangdanItem: tempzhangdanItem,
            jiluTime: timeUtil.formatTime(),
            ifpingjia: (goodsData.txing === txing) ? false : true,
            ifzhifu: true,
            userid:userid
          };
          //存到数据库
          const sqlData = otherfun.getSqlOneData(newData.zhangdanItem)
          sqlData.forEach((x, i) => {
            wx.request({
              url: ' http://127.0.0.1:8081/hx/bszhangdan/post',
              method: 'POST',
              data: x,
              success: res => {
                console.log(res, '成功');
              }
            })
          })

          let AllZhangdanList = wx.getStorageSync('AllZhangdanList') || [];

          // 将新数据添加到数组中
          AllZhangdanList.push(newData);

          // 将更新后的数组存储到本地存储中
          wx.setStorageSync('AllZhangdanList', AllZhangdanList);
          const relaunch = setTimeout(() => {
            wx.reLaunch({
              url: '/pages/shop/shop'
            });
          }, 1500)
        }
      })
      const relaunch = setTimeout(() => {
        wx.reLaunch({
          url: '/pages/shop/shop'
        });
      }, 1500)
    } else {
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
  onLoad(query) {
    const {
      id = '1'
    } = query;
    wx.request({
      // url: `http://localhost:3002/getshopdata/goods-list/${id}`,
      url: `http://127.0.0.1:8081/hx/bsproducts/bsgetone?id=${id}`,
      success: res => {
        let goodsData = res.data[0];
        goodsData.tlove = goodsData.tlove == 1 ? true : false
        const txingNum = res.data[0].txing;
        this.initXingList(txingNum);
        this.setData({
          goodsData,
          txingNum,
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