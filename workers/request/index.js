var utils = require("./utils.js")

//在worker线程执行上下文会全局暴露一个‘worker’对象，直接调用worker.onMessage/worker.postMessage即可
worker.onMessage(function(res){
  console.log(res)
})