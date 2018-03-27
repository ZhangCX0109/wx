// page/mine/mine.js
var app = new getApp();
/**
 * top:图表上边距
 * bottom : 图表下边距
 * left:图表左边距
 * right : 图表右边距
 * chartWidth : 图表宽度
 * chartHeight : 图表高度
 * columnPoisArr : 每根柱子的坐标范围
 * columnHeightArr : 每根柱子的高度，用于动态生成图片
 */
var top,bottom,left,right,chartWidth,chartHeight,screenWidth,screenHeight,columnCanvasSize;
var columnPoisArr = []
var columnHeightArr = []
var fps = 5;
var time = 200;
/**
 * 默认属性
 */
var options = {
  grid: {
    left: 40,
    right: 10,
    // top : 40,
    // bottom : 40,
    // colWidth: 25,
    //spacing : 20
  },
  xAxis: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周'],//横轴分类
  legend: ['正常','电流异常','开关异常','控制异常','就是异常'],
  series: {
    color: ['#FFB6C1', '#8B008B', '#4B0082', '#0000FF','#778899'],
    data: [{
        name: '正常',
        value: [320, 302, 301, 334, 390, 330, 380]
      }, {
        name: '电流异常',
        value: [120, 132, 101, 134, 90, 230, 210]
      }, {
        name: '开关异常',
        value: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: '控制异常',
        value: [150, 212, 201, 154, 190, 330, 410]
      }, {
        name: '就是异常',
        value: [820, 832, 901, 934, 1290, 1330, 1320]
      }],
    count: 3000,
  },
  verticalScreen : false
}
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
    screenWidth = this.data.width
    screenHeight = this.data.height
  },
  onShow : function(){

    optionsHandle();
  },
  onHide:function(){
    
  },
  columnChartDidTap :function(e){
    showCurrentColumnInfo(e)
  }
})
/**
 * 处理数据并配置
 */
function optionsHandle(){
  //y轴刻度
  if (options.series.scale == undefined){
    options.series.scale = calculScale(options.series.count,10,5);
  }
  //默认配置属性
  var grid = {
    left: 80,
    right: 10,
    top: 40,
    bottom: 40,
    colWidth: 50,
    spacing: 20
  }
  if (options.grid == undefined){
    options.grid = grid
  }else{
    for(var opt in grid){
      if (options.grid[opt] == undefined){
        options.grid[opt] = grid[opt];
      }
    }
  }
  getDomSize('#canvas_learn_first', function (domSize) {
    top = options.grid.top
    bottom = options.grid.bottom
    left = options.grid.left
    right = options.grid.right
    chartWidth = domSize.width - left - right
    chartHeight = domSize.height - top - bottom
    for (var i = 0; i < options.xAxis.length; i++) {
      var colHeight = 0;
      for (var j = 0; j < options.series.data.length; j++) {
        colHeight += options.series.data[j].value[i]
      }
      colHeight = colHeight / options.series.count * chartHeight
      columnHeightArr.push(colHeight)
    }
    var renderTimes = 0;
    var timer = setInterval(function () {
      renderTimes++
      if (renderTimes > fps) {
        clearInterval(timer)
        return
      }
      drawCoordinate(domSize,renderTimes)
    }, time / fps)
    columnCanvasSize = domSize
  });//canvas标签尺寸
}
/**
* 画坐标系
*/
function drawCoordinate(domSize,range) {
  var context = wx.createCanvasContext('canvas_learn_first');
  if(!options.verticalScreen){
    context.translate(screenWidth, 0)
    context.rotate(Math.PI / 2)
  }
  //背景
  context.setFillStyle('#FFFFFF')
  context.fillRect(0, 0, domSize.width, domSize.height);
  
  //坐标轴
  context.moveTo(left - 1, top)
  context.setStrokeStyle('#000000')
  context.lineTo(left,domSize.height - bottom)
  context.lineTo(domSize.width - right, domSize.height - bottom)
  context.stroke()

  //画y轴刻度
  var scaleArr = options.series.scale
  var scaleDvalue = chartHeight / (scaleArr.length - 1)
  var yTextSize = chartWidth / 30;
  if (yTextSize > 12) {
    yTextSize = 12;
  }
  for (var i = 0; i < scaleArr.length; i++){
    var yScalePoi = top + (i * scaleDvalue);
    //刻度突起
    context.beginPath();
    context.setStrokeStyle('#000000')
    context.moveTo(left,yScalePoi);
    context.setLineWidth(1)
    context.lineTo(left - 5,yScalePoi)
    context.stroke()

    //刻度横线标识
    if(i < scaleArr.length - 1){
      context.beginPath()
      context.moveTo(left, yScalePoi);
      context.setStrokeStyle('#A9A9A9')
      context.setLineWidth(0.5)
      context.lineTo(domSize.width - right, yScalePoi)
      context.stroke()
      if(i % 2 == 0){
        context.moveTo(left, yScalePoi);
        context.setFillStyle('#F5F5F5')
        context.fillRect(left+1, yScalePoi, domSize.width - right - left, scaleDvalue)
        context.fill()
      }
    }
    //刻度文字
    context.setFontSize(yTextSize)
    context.setFillStyle('#000000')
    context.setTextBaseline('middle')
    context.setTextAlign('right')
    context.fillText(scaleArr[i],left - 7,yScalePoi)
  }
  //画x轴刻度
  var ctgArr = options.xAxis
  var ctgDvalue = chartWidth / ctgArr.length //x轴差值
  var xTextSize = chartWidth / 30;
  if (xTextSize > 12) {
    xTextSize = 12;
  }
  for (var i = 1; i <= ctgArr.length; i++){
    //x轴凸起
    context.beginPath();
    context.setLineWidth(1)
    context.setStrokeStyle('#000000')
    context.moveTo(ctgDvalue * i + left - ctgDvalue / 2,top+chartHeight)
    context.lineTo(ctgDvalue * i + left - ctgDvalue / 2,top+chartHeight + 5)
    context.stroke();
    //x轴竖线
    context.beginPath();
    context.setStrokeStyle('#A9A9A9')
    context.setLineWidth(0.5)
    context.moveTo(ctgDvalue * i + left - ctgDvalue / 2, top + chartHeight)
    context.lineTo(ctgDvalue * i + left - ctgDvalue / 2, top)
    context.stroke();
    //x轴文字
    context.setFontSize(xTextSize)
    context.setFillStyle('#000000')
    context.setTextAlign('center')
    context.fillText(ctgArr[i - 1],ctgDvalue*i+left- ctgDvalue / 2,top+chartHeight+bottom / 3,ctgDvalue)
  }
  //绘制点击效果
  if (range != undefined && (typeof range) == 'object') {
    context.beginPath()
    context.setFillStyle('rgba(111,111,111,0.2)')
    var colEffectXAxis = options.verticalScreen ? range.start.x :range.start.y;
    var colEffectYAxis = options.verticalScreen ? range.start.y : range.start.x;
    var colEffectEndX = options.verticalScreen ? range.end.x - range.start.x : range.end.y - range.start.y;
    var colEffectEndY = options.verticalScreen ? range.end.y - range.start.y: range.end.x - range.start.x;
    context.fillRect(colEffectXAxis - 4, colEffectYAxis, colEffectEndX + 8, colEffectEndY);
  }
  drawLegend(context)
  drawChartContent(context,ctgDvalue,range) 
}
/**
 * 画图表内容
 */
function drawChartContent(context,ctgDvalue,range){
  var chartData = options.series.data;
  var colorArr = options.series.color;
  var colsHeightArr = [];
  //遍历数据的分类
  ctg:
  for(var i = 0; i < chartData.length; i++){
    var ctgObj = chartData[i];
    var colHeightArr = [];
    //遍历每个分类的数据
    data:
    for(var j = 0; j < ctgObj.value.length; j++){
      var itemHeight = Math.ceil(ctgObj.value[j] / options.series.count * chartHeight)
      var yAxisPoi = chartHeight + top - itemHeight - 0.5;
      if(i > 0){
        for(var k = 0; k < colsHeightArr.length; k++){
          for(var h = 0; h < colsHeightArr[k].length; h++){
            if(j == h){
              yAxisPoi -= colsHeightArr[k][h]
            }
          }
        }
      }
      var xAxisPos = left + (ctgDvalue * (j + 1) - options.grid.colWidth / 2 - ctgDvalue / 2)
      //获取每根竹子的范围
      if(range == fps){
        var columnPoi = {}
        columnPoi.start = {
          x: options.verticalScreen ? xAxisPos : top,
          y: options.verticalScreen ? top : xAxisPos
        }
        columnPoi.end = {
          x: options.verticalScreen ? xAxisPos + options.grid.colWidth : top + chartHeight,
          y: options.verticalScreen ? top + chartHeight : xAxisPos + options.grid.colWidth
        }
        if (columnPoisArr.length < options.xAxis.length) {
          columnPoisArr.push(columnPoi)
        }
      }
      /**chartHeight + top - yAxisPoi */
      //画每个图表
      if(typeof range == 'number'){
        if(range / fps < (chartHeight + top - yAxisPoi) / columnHeightArr[j]){
          var newYAxisPoi = (fps * chartHeight + fps * top - range * columnHeightArr[j] ) / fps
          context.beginPath();
          context.setFillStyle(options.series.color[i])
          context.fillRect(xAxisPos, newYAxisPoi, options.grid.colWidth, itemHeight + yAxisPoi -  newYAxisPoi)
          colHeightArr.push(itemHeight + yAxisPoi - newYAxisPoi);

          //break ctg; 
        }else{
          context.beginPath();
          context.setFillStyle(options.series.color[i])
          context.fillRect(xAxisPos, yAxisPoi, options.grid.colWidth, itemHeight)
          colHeightArr.push(itemHeight);
        }
        
      }else{
        context.beginPath();
        context.setFillStyle(options.series.color[i])
        context.fillRect(xAxisPos, yAxisPoi, options.grid.colWidth, itemHeight)
        colHeightArr.push(itemHeight);
      }
    }
    colsHeightArr.push(colHeightArr)
  }
  context.draw()
}
/**
 * 画图例
 */
function drawLegend(context){
  //var context = wx.createCanvasContext('canvas_learn_first');

  var size = {
    height : 15,
    width : 15
  }
  var legendWidthArr = []
  for(var i = 0; i < options.legend.length; i++){
    var textWidth = 0
    var legendWidth = 0
    var xAxisPoi = left / 2;
    var yAxisPoi = top / 4
    var legendContainerWidth = context.measureText(options.legend[i]).width + size.width;
    if(i > 0){
      textWidth = context.measureText(options.legend[i - 1]).width
      legendWidth = size.width + textWidth + 5
      legendWidthArr.push(Math.ceil(legendWidth))
      for(var j = 0; j < legendWidthArr.length; j++){
        xAxisPoi += legendWidthArr[j]
      }
    }
    //图例容器（用于点击事件）
    context.beginPath();
    context.setFillStyle('#ffffff')
    context.fillRect(xAxisPoi, yAxisPoi, legendContainerWidth, size.height)
    context.fill()
    //图例颜色块
    context.beginPath()
    context.setFillStyle(options.series.color[i])
    context.fillRect(xAxisPoi,yAxisPoi,size.width,size.height)
    context.fill()
    //图例文字
    context.setFontSize(10);
    context.setFillStyle('#000000')
    context.setTextBaseline('middle')
    context.setTextAlign('left')
    context.fillText(options.legend[i],xAxisPoi + size.width + 1,yAxisPoi + size.height / 2)
    
  }
}
/**
 * 事件处理
 */
function showCurrentColumnInfo(e){
  var touchPoi = e.touches[0]
  for(var i = 0; i < columnPoisArr.length; i++){
    var start = columnPoisArr[i].start
    var end = columnPoisArr[i].end
    if(touchPoi.x >= start.x && touchPoi.x <= end.x && touchPoi.y >= start.y && touchPoi.y <= end.y){
      console.log(i)
      drawCoordinate(columnCanvasSize, columnPoisArr[i])
    }
  }
}
/**
 * 获取元素宽高
 */
function getDomSize(id,callBack) {
  var size = {};
  var query = wx.createSelectorQuery();
  query.select(id).boundingClientRect();
  query.exec(function (res) {
    var domInfo = res[0];
    size.width = options.verticalScreen ? domInfo.width : domInfo.height;
    size.height = options.verticalScreen ?  domInfo.height : domInfo.width;
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
function calculScale(total,x,y){
  var temp = total;
  var count = 1;
  while ((temp / x) > x){
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
  for(var i = x; i >= 1; i--){
    scaleArr.push(total*i)
  }
  scaleArr.push(0)
  return scaleArr;
}