/**
 * 网络请求方法
 * 功能与微信API方法一致
 * 唯一修改的地方是在方法内替换了url，使程序使用统一的服务器基地址，方便程序的整体迁移及部署
 */
function request(obj) {
  if(obj == null){
    return null
  }
  
  if(obj.url == null){
    return null
  }

  obj.url = 'http://192.168.1.155:8080/eartheye/m/api/' + obj.url

  return wx.request(obj)
}

module.exports = {
  request: request
}