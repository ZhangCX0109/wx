var app = getApp();
var top, bottom, left, right, chartWidth, chartHeight, radius
var options = {
  grid: {

  },
  series: {
    data: {
      value: 20,
      name: '数值'
    }
  },
  scaleParams: {
    count: 100,
    scales: 10,//刻度数的个数 
    base: 10,//刻度之间的差值
    color: ["#00CED1", "#4169E1", "#B22222"]
  }
}
// page/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    width: app.globalData.screenWidth,
    height: app.globalData.screenHeight
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
    optionHandle()
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
})
/**
 * 初始值计算
 */
function optionHandle() {
  //y轴刻度
  if (options.series.scale == undefined) {
    options.series.scale = calculScale(options.scaleParams.count, options.scaleParams.scales, options.scaleParams.base);
  }
  //默认配置属性
  var grid = {
    left: 20,
    right: 20,
    top: 40,
    bottom: 40,
    colWidth: 50,
    spacing: 20,
    pointerWidth: 20
  }
  if (options.grid == undefined) {
    options.grid = grid
  } else {
    for (var opt in grid) {
      if (options.grid[opt] == undefined) {
        options.grid[opt] = grid[opt];
      }
    }
  }
  getDomSize('#gauge-canvas', function (domSize) {
    top = options.grid.top
    bottom = options.grid.bottom
    left = options.grid.left
    right = options.grid.right
    chartWidth = domSize.width - left - right
    chartHeight = domSize.height - top - bottom
    drawGuageChart(domSize)
  })
}
/**
 * 开始画guage图表
 */
function drawGuageChart(domSize) {
  var context = wx.createCanvasContext('gauge-canvas');
  //背景
  context.setFillStyle('#dddddd')
  context.fillRect(0, 0, domSize.width, domSize.height);
  var guageRadian = Math.PI * 3 / 2;
  var guageFirLong = guageRadian * 2 / options.scaleParams.scales
  radius = (domSize.width - left - right) / 2
  //画外表盘
  for (var i = 0; i < options.scaleParams.color.length; i++) {
    context.beginPath()
    context.setStrokeStyle(options.scaleParams.color[i])
    context.setLineWidth(options.grid.pointerWidth)
    if (i == 0) {
      context.arc(domSize.width / 2, domSize.height / 2, (domSize.width - left - right) / 2, Math.PI * 3 / 4, Math.PI * 3 / 4 + guageFirLong, false)
    } else if (i == 1) {
      context.arc(domSize.width / 2, domSize.height / 2, (domSize.width - left - right) / 2, Math.PI * 3 / 4 + guageFirLong, Math.PI / 4 - guageFirLong, false)
    } else {
      context.arc(domSize.width / 2, domSize.height / 2, (domSize.width - left - right) / 2, Math.PI / 4 - guageFirLong, Math.PI / 4, false)
    }
    context.stroke()
  }
  //画刻度
  var beginAngle = 135;
  var endAngle = 45;
  var sumAngle = 270;
  var count = 50;
  for (var i = 0; i < count + 1; i++) {
    var _angle = (beginAngle + (sumAngle / count) * i) % 360
   
    var scaleLength = i % 5 == 0 ? radius - options.grid.pointerWidth / 2 : radius - options.grid.pointerWidth / 6
   
    var point1 = calScalePoi(domSize.width / 2, domSize.height / 2, _angle, radius + options.grid.pointerWidth / 2);
    var point2 = calScalePoi(domSize.width / 2, domSize.height / 2, _angle, scaleLength);
    context.beginPath()
    context.setLineWidth(i % 5 == 0 ? 2 : 0.5)
    context.moveTo(point1.x, point1.y)
    context.lineTo(point2.x, point2.y)
    
    context.setStrokeStyle('#ffffff')
    context.stroke()
    if(i % 5 ==0){
      var textPoint = calScalePoi(domSize.width / 2, domSize.height / 2, _angle, radius - options.grid.pointerWidth);
      context.setFillStyle('#000000')
      context.setFontSize(10)
      context.setTextAlign('center')
      context.setTextBaseline('middle')
      context.fillText(i / 5 * 10, textPoint.x, textPoint.y)
    }
  }
  drawGuageScale(context, domSize)
}
/**
 * 画刻度
 */
function drawGuageScale(context, domSize) {
  context.draw();
}
/**
 * 根据角度计算刻度线位置
 */
function calScalePoi(x, y, angle, radius) {
  return {
    x: x + Math.cos(angle / 180 * Math.PI) * radius,
    y: y + Math.sin(angle / 180 * Math.PI) * radius
  }
}
/**
 * 根据角度计算指针位置
 */

/**
 * 获取元素宽高
 */
function getDomSize(id, callBack) {
  var size = {};
  var query = wx.createSelectorQuery();
  query.select(id).boundingClientRect();
  query.exec(function (res) {
    var domInfo = res[0];
    size.width = options.verticalScreen ? domInfo.width : domInfo.height;
    size.height = options.verticalScreen ? domInfo.height : domInfo.width;
    callBack(size)
  })
}

/**
 * 计算刻度
 * total为数据中的最大值
 * x为总刻度数
 * y为以y的倍数进行刻度的划分
 * 
 */
function calculScale(total, x, y) {
  var temp = total;
  var count = 1;
  
  while ((temp / x) > x) {
    temp = temp / x;
    count *= 10
  }

  count /= 100;//用来计算刻度差的精度
  total /= x;//大致得出每个刻度的差
  total = Math.ceil(total);//刻度的差向上取整
  total /= y;//大致得出刻度的差是y的多少倍
  total = Math.ceil(total);//倍数向上取整
  total *= y;//得到较规整的刻度差
  total = Math.ceil(total / count) * count;//得到最终的刻度差
  var scaleArr = [];
  for (var i = x; i >= 1; i--) {
    scaleArr.push(total * i)
  }
  scaleArr.push(0)
  return scaleArr;
}