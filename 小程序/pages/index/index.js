//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dev:0,
    hidden:true,
    scrollHeight:0,
    scrollTop:0,
    imgarr:[
      "/img/shows/good_01.jpg",
      "/img/shows/good_02.jpg",
      "/img/shows/good_03.jpg",
      "/img/shows/good_04.jpg",
      "/img/shows/good_04.jpg",
      "/img/shows/good_03.jpg",
      "/img/shows/good_02.jpg",
      "/img/shows/good_01.jpg",
      "/img/shows/good_09.jpg",
    ],
    tabs:[
      {
        url:"/img/tabs/tab_01.png",
        text:"限时秒杀"
      },
      {
        url: "/img/tabs/tab_02.png",
        text: "品牌清仓"
      },
      {
        url: "/img/tabs/tab_03.png",
        text: "食品超市"
      },
      {
        url: "/img/tabs/tab_04.png",
        text: "品质水果"
      },
      {
        url: "/img/tabs/tab_05.png",
        text: "爱逛街"
      },
      {
        url: "/img/tabs/tab_06.png",
        text: "九块九特卖"
      },
      {
        url: "/img/tabs/tab_07.png",
        text: "名品折扣"
      },
      {
        url: "/img/tabs/tab_08.png",
        text: "一份抽奖"
      },
      {
        url: "/img/tabs/tab_09.png",
        text: "手机充值"
      },
      {
        url: "/img/tabs/tab_10.png",
        text: "分一亿红包"
      }
    ],
    goods:[
      {
        url: "http://127.0.0.1:8083/goods/goods_01.png",
        text:"11"
      },
      {
        url: "http://127.0.0.1:8083/goods/goods_02.png",
        text: "22"
      },
      {
        url: "http://127.0.0.1:8083/goods/goods_03.png",
        text: "33"
      },
      {
        url: "http://127.0.0.1:8083/goods/goods_04.png",
        text: "44"
      },
      {
        url: "http://127.0.0.1:8083/goods/goods_04.png",
        text: "55"
      },
      {
        url:"http://127.0.0.1:8083/goods/goods_03.png",
        text: "66"
      }
    ]
  },
  get:function(e){
    this.setData({
      hidden:false
    });
    var that=this;
    wx.request({
      url: "http://127.0.0.1:8083/goods",
      data: {
        num: 5,
        page:1
      },
      header:{
        "Catch-Control":"no-catch"
      },
      method:"post",
      success:function(res){
        console.log(res);
        var arr=res.data;
        var goods=that.data.goods;
        var arr2=goods.concat(arr)
        that.setData({
          goods: arr2,
          hidden: true
        })
      }
    })
  },
  change:function(e){
    this.setData({
      dev:e.currentTarget.dataset.id
    })
  },
  scroll:function(e){
    this.setData({
      scrollHeight:e.detail.scrollTop
    })
  },
  top:function(e){
    this.setData({
      goods:[],
      scrollTop:0
    });
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8083/goods",
      data: {
        num: 5,
        page: 1
      },
      header: {
        "Catch-Control": "no-catch"
      },
      method: "post",
      success: function (res) {
        console.log(res);
        var arr = res.data;
        var goods = that.data.goods;
        var arr2 = goods.concat(arr)
          that.setData({
            goods: arr2,
            hidden: true
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      },
    });
    this.setData({
      hidden: false
    });
    wx.request({
      url: "http://127.0.0.1:8083/goods",
      data: {
        num: 5,
        page:1
      },
      header: {
        "Catch-Control": "no-catch"
      },
      method: "post",
      success: function (res) {
        var arr = res.data;
        var goods = that.data.goods;
        var arr2 = goods.concat(arr)
        that.setData({
          goods: arr2,
          hidden: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log('刷新');
  },

  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log('circle 下一页');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
