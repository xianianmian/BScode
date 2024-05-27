// pages/tourism/tourism.js
const app = getApp()


const tourismlist = [{
  id: 1,
  name: "南岳衡山",
  address: "南岳",
  info:[ "衡山是中国著名的道教、佛教圣地，环山有寺、庙、庵、观200多处。衡山是上古时期君王唐尧、虞舜巡疆狩猎祭祀社稷，夏禹杀马祭天地求治洪方法之地。衡山山神是民间崇拜的火神祝融，他被黄帝委任镇守衡山，教民用火，化育万物，死后葬于衡山赤帝峰，被当地尊称南岳圣帝。道教“三十六洞天，七十二福地”，有四处位于衡山之中，佛祖释迦牟尼两颗真身舍利子藏于衡山南台寺金刚舍利塔中。"],
  imgArr: ["https://picx.zhimg.com/80/v2-ca8107c06cf04a5cd5295bb18d138d63_1440w.webp?source=1def8aca"]
}, {
  id: 2,
  name: "石鼓书院",
  address: "衡阳",
  info: ["石鼓书院位于衡阳市石鼓区石鼓山，湘江、蒸水、耒水三江环绕，书院内亭台楼榭，绿荫重重，自古有“石鼓江山锦绣华”的美誉。石鼓书院是有确切史志记载的中国创建最早的书院，承载着厚重的历史文化底蕴，是湖湘文化发源地和湖南第一胜地。自古以来众多文人骚客慕名前来，在此留下诗句。"],
  imgArr: ['https://picx.zhimg.com/80/v2-7bb11ada329cc356ebd46e2e42a5d85c_1440w.webp?source=1def8aca']
},
{
  id: 3,
  name: "罗荣桓故居",
  address: "衡阳",
  info: ["罗荣桓故居位于中南重镇、历史文化名城——湖南省衡阳市衡东县荣桓镇南湾村，为国家4A级旅游景区、全国重点文物保护单位、全国100个红色旅游经典景区、全国爱国主义教育示范基地、国家国防教育示范基地、第四届中国红色旅游市场游客满意十佳景区。"],
  imgArr: ['https://picx.zhimg.com/80/v2-e791349d1c36394a2ac026ae564b6672_1440w.webp?source=1def8aca']
},
{
  id: 4,
  name: "蔡伦竹海",
  address: "耒阳",
  info: ["蔡伦竹海位于中南重镇、历史文化名城——耒阳市黄市镇和大义乡境内，面积100平方公里，中心景区达66平方公里，集观光、休闲、探险、寻宝于一体的复合型旅游风景区，现为国家AAAA级旅游景区、中国最具魅力生态旅游景点景区、国家级水利风景区、省级风景名胜区、省级森林公园和省级山地车训练基地。"],
  imgArr: ['https://pic1.zhimg.com/80/v2-b7fc31f83976dd60c426e95d0eb8b77a_1440w.webp?source=1def8aca']
},
{
  id: 5,
  name: "衡阳花果山",
  address: "衡阳",
  info: ["全方位展现了西游文化的精髓与奇趣，也被称为“南岳衡山的后花园。这里林业资源极为丰富，有着四洞通天的奇特丹霞地貌。还会看到按西游记一比一复制的金箍棒，西游经典场景的复刻在这里都可以见到。"],
  imgArr: ['https://youimg1.c-ctrip.com/target/100g0w000000kpnhhB6D9.jpg']
},
]
const bannerArr = [{
    image: "https://picx.zhimg.com/80/v2-e7e58905b765ab36f9961d225d97b6bb_1440w.webp?source=1def8aca",
    title: "衡山",
    url: "https://www.baidu.com"
  },
  {
    image: "https://pic1.zhimg.com/80/v2-35805cea49e642abc076ee9b7d141711_1440w.webp?source=1def8aca",
    title: "衡阳花果山",
    url: "https://www.baidu.com"
  },
  {
    image: "https://pic1.zhimg.com/80/v2-b7fc31f83976dd60c426e95d0eb8b77a_1440w.webp?source=1def8aca",
    title: "蔡伦竹海",
    url: "https://www.baidu.com"
  },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0, //选中的下标
    bannerArr: [], //轮播图数据
    tourismList: [],
    goodsdata: [],
    addshow:false,
    addressvalue:'',
    tname:'',
    textvalue:'',
    fileList: [],
  },
  gototourismdetail(){
    wx.navigateTo({
      url: '../tourism/tourism',
    })
  },
  gototdetail(e) {
    const id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `../tourismdetail/tourismdetail?id=${id}`,
    })
  },
  swiperChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  gotoShop(){
    wx.switchTab({
      url: '../shop/shop',
    })
  },
  openaddpopup(){
    // if(app.globalData.token != ""){
    //   this.setData({
    //     addshow:true
    //   })
    // }else{
    //   wx.showToast({
    //     title: '未登录',
    //     icon:'error',
    //     success: res =>{
    //       setTimeout(()=>{
    //         wx.switchTab({
    //           url: '../denglu/denglu',
    //         })
    //       },2000)
    //     }
    //   })
    // }
    this.setData({
      addshow:true
    })
  },
  onClose() {
    this.setData({ addshow: false });
  },
  onChange0(event){
    this.setData({
      tname:event.detail
    })
  },
  onChange1(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      addressvalue:event.detail
    })
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      textvalue:event.detail
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const { fileList = [] } = this.data;
        fileList.push({ ...file, });
        this.setData({ fileList });
  },
  closeadd(){
    const obj = {
      id: this.data.tourismList.length+1,
      name:this.data.tname,
      address:this.data.addressvalue,
      info: this.data.textvalue,
      imgArr:this.data.fileList
    }
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })

    this.setData({
      tourismList:this.data.tourismList.push(obj)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://127.0.0.1:8081/hx/bsproducts/bsget',
      success: res => {
        let goodsdata = res.data.data;
        let a = Math.floor(Math.random() * 6);
        let b = Math.floor(Math.random() * 5) + 6;
        const Arr = [goodsdata[a],goodsdata[b]]
        this.setData({
          goodsdata:Arr
        })
      }
    })
    this.setData({
      tourismList: tourismlist.slice(0, 3),
      bannerArr: bannerArr
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