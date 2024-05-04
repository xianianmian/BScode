// pages/tips/tips.js
import {formatTime} from '../../utils/times'

function znformatTime(timeStr) {
  try {
      // 解析时间字符串
      let timeFormat = new Date(timeStr.replace(/-/g, '/')); // 用'/'替换'-'以兼容不同浏览器
      // 获取年、月、日、小时和分钟
      let year = timeFormat.getFullYear();
      let month = ('0' + (timeFormat.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1，并保证两位数输出
      let day = ('0' + timeFormat.getDate()).slice(-2); // 保证两位数输出
      let hour = ('0' + timeFormat.getHours()).slice(-2); // 保证两位数输出
      let minute = ('0' + timeFormat.getMinutes()).slice(-2); // 保证两位数输出
      // 格式化输出
      let formattedTime = year + '年' + month + '月' + day + '日' + hour + '点' + minute + '分';
      return formattedTime;
  } catch (error) {
      return "时间格式不正确，请输入类似'2024-05-03 22:07'的格式";
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      todayTime: znformatTime(formatTime()) 
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