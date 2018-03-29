Component({
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties : {
    backgroundColor : {
      type : String,
      value : ''
    },
    title : {
      type : String,
      value : ''
    },
    btnTitle : {
      type : String,
      value : ''
    }
  },
  methods : {
    leftBtnDidTap : function(){
      var detail = {}
      var option = {}
      this.triggerEvent('leftBtnTap',detail,option)
    }
  }
})