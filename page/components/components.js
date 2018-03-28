// page/components/components.js
var app = getApp()
var eLog = 2.7183
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    menuWidth: app.globalData.screenWidth * 2 / 3,
    menuLeft: -app.globalData.screenWidth * 2 / 3
  },
  clickMe : function(e){
    var _this = this
    var flag = this.data.menuLeft >= -10 ? -1 : 1;
    var fps = 20;
    var time = 600;
    var logDvalue = (eLog - 1) / fps
    var count = 0;
    var menuLeft = this.data.menuLeft
   // console.log(flag)
    console.log('')

    var timer = setInterval(function (){
      ++count;
      if(count == fps){
        clearInterval(timer)
      }
      var l = Math.log((eLog - 1) * (count / fps) + 1) 
      l = menuLeft + _this.data.menuWidth * l * flag
    

      l = Math.pow( (Math.sin((count / fps ) * 0.5 * Math.PI) ),5) 
      console.log(l)
      l = l * _this.data.menuWidth * flag + menuLeft
    //  console.log(l)
      var newMenuLeft = menuLeft +  _this.data.menuWidth * Math.log(1 + logDvalue * count) * flag;
      //console.log(newMenuLeft)
      _this.setData({
        menuLeft: l
      })
    },time / fps)
  },
  clickMe1 : function (e) {
    var _this = this
    var flag = this.data.menuLeft >= -10 ? -1 : 1;
    var fps = 20;
    var time = 200;
    var logDvalue = (eLog - 1) / fps
    var count = 0;
    var menuLeft = this.data.menuLeft
    // console.log(flag)
    console.log('')
    var timer = setInterval(function () {
      ++count;
      if (count == fps) {
        clearInterval(timer)
      }
      var l = (count / fps) * _this.data.menuWidth * flag + menuLeft
      //  console.log(l)
      var newMenuLeft = menuLeft + _this.data.menuWidth * Math.log(1 + logDvalue * count) * flag;
      //console.log(newMenuLeft)
      _this.setData({
        menuLeft: l
      })
    }, time / fps)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})