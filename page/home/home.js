var app = getApp();
var utils = require('../../utils/utils.js')
var top, bottom, left, right, chartWidth, chartHeight, radius
var options = {
  grid: {

  },
  series: {
    data: {
      value: 54,
      name: '数值'
    }
  },
  scaleParams: {
    maxValue: 60,
    minValue: 0,
    count: 10,
    sub: 3,
  },
  dashboard: {
    beginAngle: 135,
    endAngle: 45,
    stages: [{
      color: "#00CED1",
      stage: 0.1
    },
    {
      color: '#4169E1',
      stage: 0.3
    },
    {
      color: '#B22222',
      stage: 0.7
    }
      ,
    {
      color: '#B2FF22',
      stage: 0.75
    },
    {
      color: '#B2FFFF',
      stage: 0.85
    },
    {
      color: '#B2F000',
      stage: 1
    }]
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

  //画布
  var ctx = wx.createCanvasContext('gauge-canvas')

  //中心点坐标
  var centerX = domSize.width / 2
  var centerY = domSize.height / 2

  //角度总数
  var angleSum = options.dashboard.endAngle - options.dashboard.beginAngle
  angleSum = angleSum < 0 ? 360 + angleSum : angleSum

  //刻度总数
  var degreeCount = options.scaleParams.count * options.scaleParams.sub;

  //外表盘半径
  var dashboardRadius = (domSize.width - left - right) / 2

  //指示器指针默认颜色
  var pointColor = '#ffaaaa'
  if (options.dashboard.stages.length > 0) {
    pointColor = options.dashboard.stages[0].color
  }

  //表示值总和
  var sumValue = options.scaleParams.maxValue - options.scaleParams.minValue

  var fps = 50

  var time = 3000

  var frameCount = time / 1000 * fps

  //帧索引
  var frameIndex = 0


  var timer = setInterval(function () {

    frameIndex++;

    var percent = utils.linearPercentage(frameIndex, frameCount, 4)

    if (frameIndex > frameCount) {
      clearInterval(timer)
    }

    //前一个角度
    var prevAngle = options.dashboard.beginAngle;

    //上一个阶段值
    var prevValue = options.scaleParams.minValue

    //仪表板宽度
    ctx.setLineWidth(options.grid.pointerWidth)

    //填充背景
    ctx.setFillStyle('#eeeeee')
    ctx.fillRect(0, 0, domSize.width, domSize.height)

    //画外表盘
    for (var i = 0; i < options.dashboard.stages.length; i++) {
      ctx.beginPath()
      //设置仪表盘颜色
      ctx.setStrokeStyle(options.dashboard.stages[i].color)

      var currValue = sumValue * options.dashboard.stages[i].stage + options.scaleParams.minValue
      if (options.series.data.value  > prevValue && options.series.data.value <= currValue) {
        pointColor = options.dashboard.stages[i].color
      }
      prevValue = currValue

      //此阶段的角度
      var stageEndAngle = (options.dashboard.beginAngle + angleSum * options.dashboard.stages[i].stage) % 360

      ctx.arc(centerX, centerY, dashboardRadius, prevAngle / 180 * Math.PI, stageEndAngle / 180 * Math.PI, false)
      ctx.stroke()
      prevAngle = stageEndAngle
    }

    //仪表盘刻度值的样式
    ctx.setFillStyle('#000000')
    ctx.setFontSize(16)
    ctx.setTextAlign('center')
    ctx.setTextBaseline('middle')

    //画刻度
    for (var i = 0; i < degreeCount + 1; i++) {

      //当前刻度的角度
      var _angle = (options.dashboard.beginAngle + (angleSum / degreeCount) * i) % 360

      var isMain = i % options.scaleParams.sub == 0

      //当前刻度的长度
      var scaleLength = isMain ? dashboardRadius - options.grid.pointerWidth / 2 : dashboardRadius - options.grid.pointerWidth / 6

      //当前刻度线的坐标点
      var point1 = calScalePoi(centerX, centerY, _angle, dashboardRadius + options.grid.pointerWidth / 2);
      var point2 = calScalePoi(centerX, centerY, _angle, scaleLength);

      ctx.beginPath()
      ctx.setStrokeStyle('#ffffff')
      ctx.setLineWidth(isMain ? 2 : 0.5)
      ctx.moveTo(point1.x, point1.y)
      ctx.lineTo(point2.x, point2.y)
      ctx.stroke()

      if (isMain) {
        var textPoint = calScalePoi(centerX, centerY, _angle, dashboardRadius - options.grid.pointerWidth);
        var scaleText = Math.floor(options.scaleParams.minValue + (i / degreeCount * sumValue))
        ctx.fillText(scaleText, textPoint.x, textPoint.y)
      }
    }

    //指示器指针的角度
    
    var pointAngle = ((options.series.data.value - options.scaleParams.minValue) * percent / sumValue * angleSum + options.dashboard.beginAngle) % 360

    //指针的路径坐标点
    var point1 = calScalePoi(centerX, centerY, pointAngle, 100);
    var point2 = calScalePoi(centerX, centerY, pointAngle - 180, 30);
    var point3 = calScalePoi(centerX, centerY, pointAngle - 90, 10);
    var point4 = calScalePoi(centerX, centerY, pointAngle + 90, 10);

    //绘制指针
    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point3.x, point3.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.lineTo(point4.x, point4.y)
    ctx.closePath()
    ctx.stroke()
    ctx.setFillStyle(pointColor)
    ctx.fill()

    ctx.draw();

  }, 1000 / fps)

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