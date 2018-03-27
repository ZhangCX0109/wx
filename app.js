
App({
  onlaunch:function(options){
    console.log('1');
  },
  globalData : {
    screenWidth: wx.getSystemInfoSync().screenWidth,
    screenHeight: wx.getSystemInfoSync().screenHeight
  }
})