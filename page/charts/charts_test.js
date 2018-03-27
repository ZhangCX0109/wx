//nothing
var wxCharts = require('../../src/js/wxcharts-min.js')
var pieChart = null;
var app = getApp();
var pieData = [{
  name: '成交量1打发打发',
  data: 15,
  color: '#7cb5ec'
}, {
  name: '成交量2阿斯顿噶发噶算法的说法',
  data: 35,
  color: '#DC143C'
}, {
  name: '成交量3啊手动阀手动阀',
  data: 78,
  color: '#FF00FF'
}, {
  name: '成交量4阿斯顿发啥水果',
  data: 63,
  color: '#4B0082'
}, {
  name: '成交量2啊手动阀个',
  data: 35,
  color: '#483D8B'
}, {
  name: '成交量3阿斯顿噶似的发射点发',
  data: 78,
  color: '#E6E6FA'
}, {
  name: '成交量4啊手动阀打发',
  data: 63,
  color: '#6495ED'
}, {
  name: '成交量2啊手动阀手动阀',
  data: 35,
  color: '#708090'
}, {
  name: '成交量3啊手动阀啊手动阀啊',
  data: 78,
  color: '#00FA9A'
}, {
  name: '成交量3发货大概何时发噶发给',
  data: 78,
  color: '#006400'
}];
// page/charts/charts_test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight,
    pieChartData: [],
    checkboxDisabled : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pieChartData : pieData,
      newPieData : pieData
    })
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pie_charts',
      type: 'pie',
      legend : false,
      series: this.data.pieChartData,
      width: this.data.screenWidth,
      height: (this.data.screenHeight - 108) / 2,
      dataLabel: true,
    })
  },
  /**
   * pieChart图表点击时间
   */
  pieChartDidTap : function (e){
    var idx = pieChart.getCurrentDataIndex(e);
    if(idx != -1){
      var item = this.data.newPieData[idx];
      wx.showToast({
        title: item.name + "\n数据:" + item.data,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 复选框选择事件
   */
  checkboxChange : function(e){
    var _this = this;
    var newData = [];
    this.data.pieChartData.forEach(function(value){
      e.detail.value.forEach(function(val){
        if(val == value.name){
          newData.push(value)
        }else if(value.disabled){
          value.disabled = false;
          _this.setData({
            pieChartData: _this.data.pieChartData
          })
        }
      })
    })
    this.setData({
      newPieData : newData
    })
    if(newData.length == 1){
      _this.data.pieChartData.forEach(function (value) {
        e.detail.value.forEach(function (val) {
          if (val == value.name) {
            value.disabled = true;
            _this.setData({
              pieChartData : _this.data.pieChartData
            })
          }
        })
      })
    }
    pieChart.stopAnimation();
    pieChart.updateData({
      series : newData
    });
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