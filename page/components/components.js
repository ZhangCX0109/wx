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
    menuWidth: app.globalData.screenWidth * 5 / 6,
    menuLeft: -app.globalData.screenWidth * 5 / 6
  },
  clickMe: function (e) {
    var _this = this
    var flag = this.data.menuLeft >= -0 ? -1 : 1;
    var fps = 36;
    var time = 1000;
    var count = 0;
    var menuLeft = this.data.menuLeft

    var l
    var timer = setInterval(function () {
      ++count;
      if (count == fps) {
        clearInterval(timer)
      }

      l = Math.pow((Math.cos((count / fps) * Math.PI) + 1) / 2, 3)
      l = 1 - l
      var l1 = l * _this.data.menuWidth * flag + menuLeft


      console.log(l)
      _this.setData({
        menuLeft: l1
      })
    }, time / fps)
  },
  clickMe1: function (e) {
    var _this = this
    var flag = this.data.menuLeft >= -10 ? -1 : 1;
    var fps = 20;
    var time = 200;
    var logDvalue = (eLog - 1) / fps
    var count = 0;
    var menuLeft = this.data.menuLeft
    console.log('')
    var timer = setInterval(function () {
      ++count;
      if (count == fps) {
        clearInterval(timer)
      }
      var l = (count / fps) * _this.data.menuWidth * flag + menuLeft
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