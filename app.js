//app.js 
import TCGlobal, {
  Storage,
  Tool,
  Event,
  RequestFactory
} from './tools/tcglobal';

App({
  onLaunch: function () {
    //设置全局变量
    global.TCGlobal = TCGlobal;
    global.Storage = Storage;
    global.Tool = Tool;
    global.Event = Event;
    global.RequestFactory = RequestFactory;
    this.wxLogin()
  },
  globalData: {
    userInfo: null,
    openid: null,
    code: null,
    flag: false//退出登录使用参数
  },
  wxLogin() {
    // 小程序登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code
        if (code) {
          this.globalData.code = code;
          // 启动页结束以后 调用接口
          let that = this
          setTimeout(function(){
            that.getSystemInfo();
          }, 3500)
        }
      }
    })
  },
  getUserInfos(code) {
    let self = this
    self.toLogin(code)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              global.Storage.setWxUserInfo(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  toLogin(code) {
    if (!code) return
    let params = {
      code: code,
      loginAddress:''
    }
    let sysInfo = global.Storage.sysInfo()
    // 手机型号
    params.mobile = sysInfo.model

    // 手机系统类型
    params.systemType = 3

    // 微信版本
    params.wxVersion = sysInfo.version

    // 系统版本
    params.systemVersion = sysInfo.system
    let r = global.RequestFactory.getWeChatOpenId(params);
    r.finishBlock = (req) => {
      Tool.loginOpt(req)
    }
    Tool.showErrMsg(r)
    r.addToQueue();
  },
  /**
   * 调用微信接口，获取设备信息接口
   */
  getSystemInfo: function (cb) {
    let that = this
    try {
      //调用微信接口，获取设备信息接口
      let res = wx.getSystemInfoSync()
      res.screenHeight = res.screenHeight * res.pixelRatio;
      res.screenWidth = res.screenWidth * res.pixelRatio;
      res.windowHeight = res.windowHeight * res.pixelRatio;
      res.windowWidth = res.windowWidth * res.pixelRatio;
      let rate = 750.0 / res.screenWidth;
      res.rate = rate;
      res.screenHeight = res.screenHeight * res.rate;
      res.screenWidth = res.screenWidth * res.rate;
      res.windowHeight = res.windowHeight * res.rate;
      res.windowWidth = res.windowWidth * res.rate;
      Storage.setSysInfo(res);
      that.getUserInfos(that.globalData.code)
      that.globalData.systemInfo = res
      typeof cb == "function" && cb(that.globalData.systemInfo)
    }
    catch (e) {

    }
  }
})