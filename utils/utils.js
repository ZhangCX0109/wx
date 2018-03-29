/**
 * 先慢再快后慢的曲线运动的百分比
 * current 当前值
 * max 最大值
 */
function linearPercentage(current,max,num){
  var percent = 1 - Math.pow((Math.cos((current / max) * Math.PI) + 1) / 2, num)
  return percent
}
module.exports = {
  linearPercentage: linearPercentage
}