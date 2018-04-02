// page/components/components.js
var utils = require('../../utils/utils.js')

var app = getApp()
var eLog = 2.7183
var listData = [
  {
    id: 'view',
    name: '视图容器',
    open: false,
    pages: ['view', 'scroll-view', 'swiper'],
    node:[]
  }, {
    id: 'content',
    name: '基础内容',
    open: false,
    pages: ['text', 'icon', 'progress'],
    node: []
  }, {
    id: 'form',
    name: '表单组件',
    open: false,
    pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea'],
    node: []
  }, {
    id: 'nav',
    name: '导航',
    open: false,
    pages: ['navigator'],
    node: [{
      id: 'view1',
      name: '视图容器',
      open: false,
      pages: ['view', 'scroll-view', 'swiper'],
      node: []
    }, {
      id: 'content1',
      name: '基础内容',
      open: false,
      pages: ['text', 'icon', 'progress'],
      node: []
    }, {
      id: 'form1',
      name: '表单组件',
      open: false,
      pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea'],
      node: []
    }]
  }, {
    id: 'media',
    name: '媒体组件',
    open: false,
    pages: ['image', 'audio', 'video'],
    node: []
  }, {
    id: 'map',
    name: '地图',
    pages: ['map'],
    node: []
  }, {
    id: 'canvas',
    name: '画布',
    pages: ['canvas'],
    node: []
  }
]
// var prevClickNodeIndex = [2]

// var o = listDAta
// for (var i = 0; i < prevClickNodeIndex.length;i++){
//   o = o[prevClickNodeIndex[i]]
// }
Page({
  itemDidTap : function(e){
    console.log(e)
    // console.log(e.target.dataset.ss[0].open = !e.target.dataset.ss[0].open)
    // console.log(e.target.dataset.ss[0].open)
    // console.log(this.data.listData[0].open)
    // console.log('')
    this.setData({
      listData : e.detail.list
    })
  },

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
    moving: false,
    listData : listData
  },
  clickMe: function (e) {
    var _this = this

    if (_this.data.moving) {
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
    this.nav = this.selectComponent('#nav');
    this.listview = this.selectComponent('#list-view')
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