// page/login/login.js
var app = getApp()

var requestUtils = require('../../utils/request-util.js')
var codes

var t1_1 = {
  name: '1-1',
  parent: null,
  childs:null
}

var t2_1 = {
  name: '2-1',
  parent: null,
  childs: null
}

var t2_2 = {
  name: '2-2',
  parent: null,
  childs: null
}

var t3_1={
   name : '3-1',
   parent: null,
   childs: null
}

var t3_2 = {
  name: '3-2',
  parent: null,
  childs: null
}
var t3_3 = {
  name: '3-3',
  parent: null,
  childs: null
}

function d(){
  t1_1.childs = [t2_1, t2_2]
  t2_1.parent = t1_1
  t2_2.parent = t1_1

  t2_1.childs = [t3_1, t3_2]
  t3_1.parent = t2_1
  t3_2.parent = t2_1

  t2_2.childs = [t3_3]
  t3_3.parent = t2_2

  var node = d2(t1_1, '3-3')
  console.log(node.name)
}

function d1(node){
  if(node.parent != null){
    return d1(node.parent)
  }else{
    return node
  }
}

function d2(node, id){
  if(node.childs!=null){
    for(var i = 0; i < node.childs.length; i++){
        if(node.childs[i].name == id){
          return node
        }else{
          var n = d2(node.childs[i], id)
          if(n != null)
          return n
        }
    }
  }
    return null
}

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
      mask : true
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
        console.log(app.globalData.resCodes[res.statusCode])
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
          wx.showToast({
            title: app.globalData.resCodes[res.statusCode].desc,
            icon : 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
    d()
    console.log('onloaded')
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