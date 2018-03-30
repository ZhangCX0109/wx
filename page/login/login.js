// page/login/login.js
var app = getApp()

var requestUtils = require('../../utils/request-util.js')
var codes

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
    var _this = this
    wx.showLoading({
      title: '正在登陆',
    })
    //console.log(this.data.username + ':' + this.data.password)
    requestUtils.request({
      url: 'login',
      method: 'GET',
      data: {
        name: this.data.username,
        pass: this.data.password
      },
      success: function (res) {
        wx.hideLoading()
        if (app.globalData.resCodes[res.statusCode].ok){
          wx.switchTab({
            url: '../components/components',
          })
          wx.setStorage({
            key: 'username',
            data: _this.data.username,
          })  
          wx.setStorage({
            key: 'password',
            data: _this.data.password,
          })
        }else{
          console.log('错误')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取状态码
    requestUtils.request({
      url: 'responseCodes',
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 2000) {
          codes = res.data
          //data : Array<{
          //  code, 应答码
          //  desc  应答描述
          // }
          console.log(codes)
          for (var i = 0; i < res.data.length; i++) {
            app.globalData.resCodes[res.data[i].code] = {
              desc: res.data[i].desc,
              ok : res.data[i].ok
            }
          }
        } else {
          console.log('错误:' + res.statusCode)
        }
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