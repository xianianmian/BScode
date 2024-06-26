// components/tipx.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    touch: false,
    chaX: 0,
    chaY: 0,
    posX: 0, // 初始 X 坐标
    posY: 300, // 初始 Y 坐标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoTip: function(e){
      console.log('sss');
      wx.navigateTo({
        url: '../../pages/tips/tips',
      })
    },
    touchStart: function(e) {
      const tranY = e.touches[0].pageY - this.data.posY;
      const tranX = e.touches[0].pageX - this.data.posX;
      this.setData({
        touch: true,
        chaX: tranX,
        chaY: tranY
      });
    },
    touchMove: function(e) {
      if (!this.data.touch) return;
      const new_posY = e.touches[0].pageY - this.data.chaY;
      const new_posX = e.touches[0].pageX - this.data.chaX;

        this.setData({
          posY: new_posY,
          posX: new_posX
        });
      

    },
    touchEnd : function(e) {
      if (!this.data.touch) return;
      const new_posY = this.data.posY >= 400  ? 520 : 50;

      this.gotoTip()
      this.setData({
        touch: false,
        chaX: 0,
        chaY: 0,
        posX: 0,
        posY: new_posY
      });
    }
  }
})
