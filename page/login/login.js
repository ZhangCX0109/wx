// page/login/login.js
var app = getApp()

var requestUtils = require('../../utils/request-util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    username: '',
    password: ''
  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function () {
    //console.log(this.data.username + ':' + this.data.password)

    requestUtils.request({
      url: 'responseCodes',
      method: 'GET',
      data: {
        name: 'admin',
        pass: 'admin'
      },
      success: function (data, statusCode, header) {
        if (statusCode == 200) {
          //data : Array<{
          //  code, 应答码
          //  desc  应答描述
          // }
        } else {
          console.log('错误')
        }
      }
    })

    requestUtils.request({
      url: 'login',
      method: 'GET',
      data: {
        name: 'admin',
        pass: 'admin'
      },
      success: function (data, statusCode, header) {
        if (statusCode == 200) {
          wx.switchTab({
            url: '../components/components',
          })
        } else {
          console.log('错误')
        }
      }
    })

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