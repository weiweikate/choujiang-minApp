let { Tool, RequestFactory } = global
Page({
  data: {
    url:'https://dnlcjxt.oss-cn-hangzhou.aliyuncs.com/xcx/',
    datas:[
      { icon: 'my-jiangping.png', title: '奖品领取', page:'/pages/my/award/award-goods/award-goods'},
      { icon: 'my-wuliu.png', title: '订单物流', page: '/pages/my/my-order/my-order'},
      { icon: 'my-fankui-1.png', title: '问题反馈', page: '/pages/my/feedback/new-feedback/new-feedback'},
      { icon: 'my-fankui.png', title: '反馈查询', page: '/pages/my/feedback/my-feedback/my-feedback' },
      { icon: 'address-icon.png', title: '收货地址', page: '/pages/address/edit-address/edit-address' }
    ]
  },
  onLoad: function (options) {

  },
  cellClicked(e){
    let page = e.currentTarget.dataset.page
    Tool.navigateTo(page)
  },
  logout(){
    let callBack = () => {
      // exitLogin
      let r = global.RequestFactory.exitLogin(params);
      r.finishBlock = (req) => {
        
      }
      Tool.showErrMsg(r)
      r.addToQueue();
    }
    Tool.showComfirm('确认退出登录吗', callBack)
  }
})