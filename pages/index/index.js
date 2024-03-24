// index.js
const timeUtil = require('../../utils/times');

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
    startX: 0,
    startY: 0, //开始的坐标
    selectAllStatus: false, //全选
    selectButton: false, //结算
    totalPrice: '0.00', //总价格
    num: 0, //选中的选择框
    list: [], //购物车数据
    shopList:[],
    showList:[]
  },


  onLoad() {

  },
  scoring(e) {
    let idx = e.target.dataset.index;
    const index = e.currentTarget.dataset.id;
    const arr = this.data.showList;
    arr.forEach((x) => {
      if (x.id == index) {
        x.txing = idx + 1;
        x.starlist = x.starlist.map((k, j) => {
          return j <= idx ? "../../db/qita/liang.jpg" : "../../db/qita/an.jpg";
        });
      }
    });
    this.setData({
      showList: arr,
      number: idx + 1,
    })
  },
  changetype(e){
    // 改item.love ,通过id
    const list = this.data.showList;
    const index = e.currentTarget.dataset.index;
    list.map(x => {
      if(x.id == index){
        x.tlove = !x.tlove
      }
    })
    this.setData({
      showList:list
    })
  },

  swiperChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  gotoproductdetail(){
    wx.navigateTo({
      url: '../productdetail/productdetail',
    })
  },
  handleTapItem(item) {
    const showsList = this.data.shopsList;
    this.setData({
      showList: showsList,
    });
    const address = item.title;
    if (address != '全部') {
      const arr = this.data.showList.filter((x) => x.taddress == address);
      console.log(arr);
      this.setData({
        showList: arr,
      });
    }
  },
  //3.获取购物车数据---------------
  getShop: function () {
    wx.request({
      url: 'http://localhost:3002/api3/goods-list',
      success:res=>{
        const goodsdata = res.data;
        const updatedGoodsData = goodsdata.map(x => {
          return {
            ...x,
            starlist: ["../../db/qita/an.jpg","../../db/qita/an.jpg","../../db/qita/an.jpg","../../db/qita/an.jpg","../../db/qita/an.jpg",]
          };
        });
        var num = 0;
        var selectAllStatus = this.data.selectAllStatus;
        if (selectAllStatus) {
          for (var i = 0; i < list.length; i++) {
            updatedGoodsData[i].selected = true
          }
          //选中num 
          num = updatedGoodsData.length;
        }
        //渲染
        this.setData({
          shopList:updatedGoodsData,
          showList:updatedGoodsData,
          num: num
        })
      }
    })
    //渲染
    // this.setData({
    //   list: list,
    //   num: num
    // })
    //价格
    this.goTotalPrice();
  },
  //4.删除购物车--------------------
  remove: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/delete',
      data: {
        id: id
      },
      success: res => {
        console.log(res.data);
        if (res.data.status == 200) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
          //删除后--购物车数据刷新 
          this.getShop(); //网络请求---异步---重新购物车数据，渲染list那么list里面选中属性selected不存在
          //删除里面 全选的时候做删除？---1.删除后 全部都不选中   2.删除后 全部都选中 
          //全选的时候？删除元素--- 所有的元素继续是全选状态

        }
      }
    })
  },
  //5.-总价格----每一个选中后计算 总价格=当前的list.price*list.num--------
  goTotalPrice: function () {
    //1.获取所有的元素list  2.查看遍历所有的数据 选中的元素  3.计算 
    var list = this.data.showList;
    // console.log(this.data.list);
    var total = 0; //总价格
    for (var i = 0; i < list.length; i++) {
      if (list[i].selected) {
        total += list[i].tprice * list[i].num
      }
    }
    //更改价格
    this.setData({
      totalPrice: total.toFixed(2)
    })

  },
  //6.点击选择元素-------
  //1.点击选中 再点击取消  就是修改当前的元素的selected状态 2.当前的当前的元素下标 
  selectedList: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.showList;
    var num = this.data.num; //选中的数量
    //获取原来的selected状态 
    var selected = list[index].selected;
    //获取后 取反 取反后赋值给当前的元素
    list[index].selected = !selected;

    //3.选中框 点击选中 num++   
    if (list[index].selected) {
      num++;
    } else {
      num--;
    }
    //4.更新list数据---选中状态和选中的个数--
    this.setData({
      showList: list,
      num: num
    })
    console.log('选中的个数', num);
    //5.结算变高亮---至少有一个选中
    if (num > 0) {
      this.setData({
        selectButton: true
      })
    } else {
      this.setData({
        selectButton: false
      })
    }
    //6.全选-------
    if (num == list.length) { //selectAllStatus
      this.setData({
        selectAllStatus: true
      })
    } else {
      this.setData({
        selectAllStatus: false
      })
    }
    //7.计算价格
    this.goTotalPrice();
  },

  //7.全选------
  //selectAllStatus 点击全选按钮时候---控制selectAllStatus变量状态 所有的数据list一样的状态
  selectedAll: function () {
    //1.获取之前的全选的状态
    var selectAllStatus = !this.data.selectAllStatus; //点击对之前的全选取反
    var list = this.data.showList;
    var num = this.data.num;
    var selectButton = this.data.selectButton;

    //2.控制所有的list选中框
    for (var i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    //3.如果选中--处理num 结算高亮
    if (selectAllStatus) {
      num = list.length;
      selectButton = true
    } else {
      num = 0;
      selectButton = false
    }
    //4.更新数据
    this.setData({
      showList: list,
      selectAllStatus: selectAllStatus,
      num: num,
      selectButton: selectButton
    })

    //价格
    this.goTotalPrice();
  },
  //8.增加购物车数据----
  addShop: function (e) {
    //1.点击按钮 增加数据  获取当前的元素index  获取当前num++
    var list = this.data.showList;
    var index = e.currentTarget.dataset.index;
    var num = e.currentTarget.dataset.num;

    num++;
    //增加后--页面数据更改--添加当前的元素  
    list[index].num = num;

    //数据更新
    this.setData({
      showList: list
    })
    // 此处应该修改数据库
    //更改价格
    this.goTotalPrice();

  },

  //9.减功能---
  reduce: function (e) {
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
    //增加后--页面数据更改--添加当前的元素  
    list[index].num = num;
    //数据更新
    this.setData({
      showList: list
    })
    //更改价格
    this.goTotalPrice();
  },
  //10:支付
  balance: function (e) {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000,
      success:res=>{
        //上传数据库

      }

    })
    wx.redirectTo({
      url: '/pages/index/index'
    });
  },

  onShow: function () {
    this.getShop();
    //全选------
    this.setData({
      selectAllStatus: false, //全选
      selectButton: false, //结算
      totalPrice: '0.00', //总价格
      num: 0, //选中的选择框
    })
  },
})