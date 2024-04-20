// index.js
const timeUtil = require('../../utils/times.js');
// console.log(timeUtil.formatTime(),'lll')
Page({
  data: {
    currentIndex: 0, //选中的下标
    bannerArr: [{
        image: "../../db/商品图片/O1CN011EE8nW2fKRFhaQP_!!3454950319.jpg_Q75.jpg_.jpg",
        title: "sfsdfs",
        url: "https://www.baidu.com"
      },
      {
        image: "http://iwenwiki.com:3002/images/savefood2.jpg",
        title: "sfsdkkkkkkkkkfs",
        url: "https://www.baidu.com"
      },
      {
        image: "http://iwenwiki.com:3002/images/savefood3.jpg",
        title: "fffffffffffs",
        url: "https://www.baidu.com"
      },
    ], //轮播图数据
    number:0,
    selectAllStatus: false, //全选
    totalPrice: '0.00', //总价格
    num: 0, //选中的选择框
    list: [], //购物车数据
    shopList:[],
    showList:[],
    selectedName: '',
    popup1: false,
    popup2: false,
    addressList: ['衡阳','耒阳','南岳'],
    addressListIndex: 0,
    selectedcity: '衡阳',
    zhongleiList: ['熟食', '非熟食'],
    zhongleiListIndex: 0,
    selectedzhonglei: '熟食'
  },
  filterName(e){
    this.setData({
      selectedName: e.detail.value
    })
  },
  claerfilterName(){
    const filterInfo = this.data.selectedName;
    const arr = this.data.shopList.filter(x => x.tname.includes(filterInfo));
    this.setData({
      showList: arr,
    })
    console.log(filterInfo,'ss ', arr );
  },
  resetshop(){
    const arr = this.data.shopList;
    this.setData({showList: arr, selectedName: '',})
  },
  showPopup1() {
    this.setData({ popup1: true });
  },

  closePopup1() {
    const filterInfo = this.data.selectedcity
    const arr = this.data.shopList.filter( x => x.tcity == filterInfo)
    this.setData({
      showList: arr,
      popup1: false 
    });
  },
  showPopup2() {
    this.setData({ popup2: true });
  },

  closePopup2() {
    const filterInfo = this.data.selectedzhonglei
    const arr = this.data.shopList.filter( x => x.tzhonglei == filterInfo)
    this.setData({
      showList: arr,
      popup2: false 
    });
  },
  filterSelectAddress(e){
    const index = e.currentTarget.dataset.index;
    const selectedcity = this.data.addressList[index]
    this.setData({
      addressListIndex: index,
      selectedcity,
    })
  },
  filterSelectZhonglei(e){
    const index = e.currentTarget.dataset.index;
    const selectedzhonglei = this.data.zhongleiList[index]
    this.setData({
      zhongleiListIndex: index,
      selectedzhonglei,
    })
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    console.log(event.detail);
  },



  changetlove(e){
    let idx = e.currentTarget.dataset.index;
    const arr = this.data.shopList;
    arr.forEach(x => {
      if(x.id == idx){
        x.tlove = !x.tlove
      }
    })
    this.setData({
      showList: arr
    })
  },
  scoring(e) {
    let idx = e.target.dataset.index;
    const index = e.currentTarget.dataset.id;
    const arr = this.data.showList;
    arr.forEach((x) => {
      if (x.id == index) {
        x.txing = idx + 1;
        x.starlist = x.starlist.map((k, j) => {
          return j <= idx ? "../../db/tubiao/xingl.png" : "../../db/tubiao/xinga.png";
        });
      }
    });
    this.setData({
      showList: arr,
      number: idx + 1,
    })
  },
  //去详情页面
  gotoproductdetail(e){
    const id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `../productdetail/productdetail?id=${id}`,
    })
  },

  getShop() {
    wx.request({
      // url: 'http://localhost:3002/getshopdata/goods-list',
      url: 'http://127.0.0.1:8081/hx/bsproducts/bsget',
      success:res=>{
        const goodsdata = res.data.data;
        const updatedGoodsData = goodsdata.map(x => {
          return {
            ...x,
            tlove: x.tlove === 1 ? true : false,
            starlist: ["../../db/tubiao/xingl.png","../../db/tubiao/xinga.png","../../db/tubiao/xinga.png","../../db/tubiao/xinga.png","../../db/tubiao/xinga.png"]
          };
        });
        var num = 0;
        var selectAllStatus = this.data.selectAllStatus;
        if (selectAllStatus) {
          for (var i = 0; i < list.length; i++) {
            updatedGoodsData[i].selected = true
          }
          num = updatedGoodsData.length;
        }
        this.setData({
          shopList:updatedGoodsData,
          showList:updatedGoodsData,
          num: num
        })
      }
    })
    this.goTotalPrice();
  },
  //5.-总价格
  goTotalPrice() {
    const list = this.data.showList;
    const total = list.reduce((acc, cur) => {
      return cur.selected ? acc + cur.tprice * cur.num : acc;
    }, 0);
    this.setData({
      totalPrice: total.toFixed(2)
    });
  },
  selectedList (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.showList;
    var num = this.data.num; 
    var selected = list[index].selected;
    list[index].selected = !selected;
    if (list[index].selected) {
      num++;
    } else {
      num--;
    }
    this.setData({
      showList: list,
      num: num
    })

    if (num == list.length) { 
      this.setData({
        selectAllStatus: true
      })
    } else {
      this.setData({
        selectAllStatus: false
      })
    }
    this.goTotalPrice();
  },

  //7.全选------
  selectedAll () {
    var selectAllStatus = !this.data.selectAllStatus; 
    var list = this.data.showList;
    var num = this.data.num;
    for (var i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    if (selectAllStatus) {
      num = list.length;
    } else {
      num = 0;
    }
    this.setData({
      showList: list,
      selectAllStatus: selectAllStatus,
      num: num,
    })
    this.goTotalPrice();
  },
  //8.增加购物车数据----
  addShop (e) {
    var list = this.data.showList;
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.num;
    num++;
    list[index].num = num;
    this.setData({
      showList: list
    })
    this.goTotalPrice();

  },
  reduce (e) {
    var list = this.data.showList;
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.num;

    num--;
    if (num < 1) {
      wx.showToast({
        title: '数量最少为1',
        icon: 'none'
      })
      return;
    }
    list[index].num = num;
    this.setData({
      showList: list
    })
    this.goTotalPrice();
  },
  //10:支付
  jiesuan (e) {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000,
      success:res=>{
        //上传数据库
        let zhangdan = this.data.showList.filter(x => x.selected);
        let zhangdanList = zhangdan.map(item => ({
          ...item,
          ifpingjia: false,
          ifzhifu: true,
          buyTime: timeUtil.formatTime()
        }));
        // 将处理后的数据存储到本地缓存
        let AllZhangdanList = wx.getStorageSync('AllZhangdanList') || [];
        // 假设你要添加的新数据是一个对象
        let newData = {
          zhangdanItem: zhangdanList,
          jiluTime:timeUtil.formatTime(),
          ifpingjia: false,
          ifzhifu: true,
        };
        // 将新数据添加到数组中
        AllZhangdanList.push(newData);
        // 将更新后的数组存储到本地存储中
        wx.setStorageSync('AllZhangdanList', AllZhangdanList);
      }
    })
    const relaunch = setTimeout(() =>{
      wx.reLaunch({
        url: '/pages/shop/shop'
      });
    },1500)
  },
  onLoad() {
    this.getShop();
  },
  onShow () {
    this.getShop();
    //全选------
    this.setData({
      selectAllStatus: false, //全选
      totalPrice: '0.00', //总价格
      num: 0, //选中的选择框
    })
  },
})