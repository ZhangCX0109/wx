// page/components/components.js
var utils = require('../../utils/utils.js')

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
    menuLeft: -app.globalData.screenWidth * 2 / 3,
    shadowLeft: -app.globalData.screenWidth,
    opacity: 0.0,
    moving: false
  },
  clickMe: function (e) {
    var _this = this

    if (_this.data.moving) {
      console.log('return')
      return;
    }

    this.setData({ moving: true })

    var flag = this.data.menuLeft >= -this.data.menuWidth / 2 ? -1 : 1;
    var fps = 30;
    var time = 500;
    var count = 0;
    var menuLeft = this.data.menuLeft
    var shadowLeft = this.data.shadowLeft
    var frameCount = time / 1000 * fps

    if (flag > 0) {
      _this.setData({
        shadowLeft: 0
      })
    }
    console.log(this.data.menuWidth)
    var menuPercent
    var timer = setInterval(function () {
      ++count;
      if (count > frameCount) {
        clearInterval(timer)
        _this.setData({ moving: false })
        if (flag < 0) {
          _this.setData({
            shadowLeft: -_this.data.screenWidth
          })
        }
      }

      menuPercent = utils.linearPercentage(count, fps, 4)

      var menuPoi = menuPercent * _this.data.menuWidth * flag + menuLeft
      console.log(flag + ':' + menuPoi)
      _this.setData({
        menuLeft: menuPoi,
        opacity: flag>0?(count / frameCount * 0.7):((1 - count / frameCount) * 0.7)
      })

    }, 1000 / fps)


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
    //获得自定义组件
    this.nav = this.selectComponent('#nav')
  },
  leftBtnTap(){
    console.log('left')
    this.clickMe();
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