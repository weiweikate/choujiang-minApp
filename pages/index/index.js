//index.js
//获取应用实例
const app = getApp()
let { Tool, RequestFactory, Storage } = global
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isNumber: 0,
        last_update: 0,
        isTrue: false,
        last_x: 0,
        last_y: 0,
        last_z: 0,
        isShakeBox:false,
        isNotice:false,
        code: '',
        userId:'',
        visiable:false,
    },
    onLoad: function() {
      this.setData({
        userId: Storage.memberId() || '',
      })
    },
    onReady: function() {

    },
    bindinputCode(e){
      this.setData({
        code: e.detail.value
      })
    },
    SecurityCodeRequestHttp () {
      let data = {
        activityId:17,
        code: this.data.code
      };
      let r = RequestFactory.SecurityCodeRequest(data);
      r.finishBlock = (req) => {
        console.log(req.responseObject)
        wx.showModal({
          title: '兑换成功',
          content: '',
        })
      };
      Tool.showErrMsg(r);
      r.addToQueue();
    },
    isShowSake: false,
    onShow: function () {
      this.isShowSake = true
      var that = this;
      var x = 0,
        y = 0,
        z = 0,
        lastX = 0,
        lastY = 0,
        lastZ = 0;
      var shakeSpeend = 110; // 设置阀值 控制速度
      var lastTime = 0;
      function shake(res) {
        var newTime = new Date().getTime();
        if (newTime - lastTime > 100) {
          var diffTime = newTime - lastTime;
          lastTime = newTime;
          x = res.x;
          y = res.y;
          z = res.z;
          var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000; // 记录速度
          if (speed > shakeSpeend) {
            // 开始请求接口来获取中奖信息
            wx.stopAccelerometer()
            console.log('m')
            wx.playBackgroundAudio({ // 音乐
              dataUrl: '',
              title: '',
              coverImgUrl: ''
            })
            wx.showLoading({
              title: '摇奖中...'
            })
            wx.request({
              // 要请求的地址
              url: '',
              success(e) {
                setTimeout(function () {
                  //console.log(e.data)
                  wx.playBackgroundAudio({ // 音乐
                    dataUrl: '',
                    title: '',
                    coverImgUrl: ''
                  })
                  this.setData({
                    isShakeBox: true
                  })
                  // that.uid = e.data
                  wx.hideLoading()
                }, 2000)
              }
            })
          }
          lastX = x; //赋值，为下一次计算做准备 
          lastY = y;
          lastZ = z;
        }
      }
      if(this.data.isNumber === 0){
        return
      } else {
        wx.onAccelerometerChange(shake)
      }
    },
    onHide: function () {
      this.isShowSake = false
    },
    closeBindshakeBox:function () { // 摇一摇弹框
      this.setData({
        isShakeBox: false
      })
    },
    closeView(e) { // 显示天天签到
      this.setData({
        isTrue: !this.data.isTrue
      })
    },
    showNotice: function (e) { // 显示公告
      this.setData({
        isNotice: !this.data.isNotice
      })
    },
    goPage(){
      Tool.navigateTo('/pages/activity-detail/activity-detail')
    },
    awardClicked(){
      Tool.navigateTo('/pages/my/my')
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
        console.log('用户拒绝了你的请求')
      } else {
        this.setData({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          visiable: !this.data.visiable,
        })
      }
    },
    agreeGetUser(e) {
      if (!this.data.canIUse) {
        this.getUserInfo()
      }
      this.setData({
        visiable: !this.data.visiable
      })
      if (e.detail.userInfo !== undefined) {
        this.getLogin(e.detail.userInfo)
      }
    },
    requetLogin() {
      let params = {
        encryptedData: this.data.encryptedData,
        iv: this.data.iv,
        openId: Storage.getWxOpenid() || '',
        name: this.data.userInfo.nickName,
        headImgUrl: this.data.userInfo.avatarUrl
      }
      let r = global.RequestFactory.appWechatLogin(params);
      r.finishBlock = (req) => {
        Tool.loginOpt(req)
        console.log(req)
      }
      Tool.showErrMsg(r)
      r.addToQueue();
    },
    getUserInfo() {
      wx.getUserInfo({
        success: res => {
          this.getLogin(res.userInfo)
        },
        fail: function () {
          
        }
      })
    },
    getLogin(userInfo) {
      this.setData({
        userInfo: userInfo
      })
      Storage.setWxUserInfo(userInfo)
      this.requetLogin()
    }
})