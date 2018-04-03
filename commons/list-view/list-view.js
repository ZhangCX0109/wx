Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    listArr: {
      type: Array,
      value: []
    }
  },
  methods: {
    kindToggle: function (e) {
      console.log(e)
      var id = e.currentTarget.id
      var list = this.properties.listArr
      var detail = e.currentTarget
      detail.list = changeStatus(detail.dataset.item.path, list)
      var option = {}
      this.triggerEvent('itemTap', detail, option)
    }
  },
  attached: function () {
    this.setData({
      listArr : dataHandle(this.properties.listArr)
    })
  }
})
function changeStatus(path,list){
  console.log(path)
  console.log(list)

  return list;
}
// function changeStatus(id, list, parentList, parentIdx) {
//   var idx;
//   for (var i = 0, len = list.length; i < len; ++i) {
//     if (list[i].id == id) {
//       if (parentIdx != undefined) {
//         parentList[parentIdx].open = !parentList[parentIdx].open
//       }
//       list[i].open = !list[i].open
//     } else {
//       list[i].open = false
//     }
//     if (list[i].node.length > 0) {
//       changeStatus(id, list[i].node, list, i)
//     }
//   }
//   if (parentIdx == undefined) {
//     return list;
//   }
// }
//处理数据添加路径
var pathArr = [];
function dataHandle(listArr) {
  for (var i = 0; i < listArr.length; i++) {
    pathArr = []
    pathArr.push(i)
    listArr[i].path = []
    listArr[i].path = deepCopy(listArr[i].path, pathArr)

    if (listArr[i].node.length > 0) {
      subDataHandle(listArr[i].node,pathArr)
    }
  }
  return listArr;
}
function subDataHandle(subArr,pathArr){
  for (var i = 0; i < subArr.length; i++) {
    pathArr.push(i)
    subArr[i].path = []
    subArr[i].path = deepCopy(subArr[i].path,pathArr)
    if (subArr[i].node.length > 0) {
      subDataHandle(subArr[i].node,pathArr)
    } else {
      pathArr.splice(pathArr.length - 1, 1);
    }
  }
}
function deepCopy(arr1,arr2){
  for(var i = 0; i < arr2.length; i++){
    arr1[i] = arr2[i]
  }
  return arr1;
}

