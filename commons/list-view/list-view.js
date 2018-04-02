Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties : {
    listArr : {
      type : Array,
      value : []
    }
  },
  methods : {
    kindToggle : function(e){
      var id = e.currentTarget.id
      var list = this.properties.listArr
      var detail = e.currentTarget
      detail.list = changeStatus(id,list)
      var option = {}
      this.triggerEvent('itemTap', detail, option)
    }
  }
})



function changeStatus(id,list,parentList,parentIdx){
  var idx;

  for (var i = 0, len = list.length; i < len; ++i) {
    if (list[i].id == id) {
      if(parentIdx != undefined){
        parentList[parentIdx].open = !parentList[parentIdx].open
      }
      list[i].open = !list[i].open
    } else {
      list[i].open = false
    }
    if(list[i].node.length > 0){
      changeStatus(id,list[i].node,list,i)
    }
  }
  if(parentIdx == undefined){
    return list;
  }
}