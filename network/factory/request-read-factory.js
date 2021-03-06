/**
 * Created by coin on 1/13/17.
 */

import Request from '../base-requests/request'
import Operation from '../operation'

//读取请求具体封装
export default class RequestFactory {
  // 统一的请求 
  static request(url, params = {},name,hasCookie){

    // 是否需要携带cookie
    
    if (hasCookie) params.hasCookie = hasCookie

    //请求的接口

    params.url = url

    let sysInfo = global.Storage.sysInfo() || ''

    if (sysInfo){

      // 手机型号
      params.mobile = sysInfo.model

      // 手机系统类型
      params.systemType = 3

      // 微信版本
      params.wxVersion = sysInfo.version

      // 系统版本
      params.systemVersion	 = sysInfo.system
    }
 

    let req = new Request(params);

    req.name = name;//用于日志输出

    return req;
  }
  
  /********************登陆*************************/

  // 获取openid verifyWechat

  static getWeChatOpenId(params) {
    let url = Operation.sharedInstance().getWeChatOpenId;
    return this.request(url, params, '获取openid和是否注册');
  }

  static appWechatLogin(params) {
    let url = Operation.sharedInstance().appWechatLogin;
    return this.request(url, params, '微信登陆');
  }
  
  static exitLogin(params) {
    let url = Operation.sharedInstance().exitLogin;
    return this.request(url, params, '退出登录', true);
  }
  
  static getActivityId(params) {
    let url = Operation.sharedInstance().getActivityId;
    return this.request(url, params, '获取活动编码', true);
  }

  // 上传图片的地址 
  static aliyunOSSUploadImage() {
    let params = {
      port: 8000
    }
    let baseUrl = new Request(params).getBaseUrl(params)
    let url = Operation.sharedInstance().aliyunOSSUploadImage;
    return baseUrl + url
  }

  /********************首页摇一摇签到*************************/

  // 天天签到  签到
  static signRequest(params) {
    let url = Operation.sharedInstance().signUrl;
    return this.request(url, params, '签到' , true)
  }

  // 天天签到 签到列表
  static signListRequest(params) {
    let url = Operation.sharedInstance().signListUrl;
    return this.request(url, params, '签到列表', true)
  }

  // 防伪码
  static SecurityCodeRequest(params) {
    let url = Operation.sharedInstance().homeSecurityCodeUrl;
    return this.request(url, params, '防伪码', true)
  }
  // 公告
  static noticeRequest(params) {
    let url = Operation.sharedInstance().noticeListUrl;
    return this.request(url, params, '公告', true)
  }
  // 查询摇奖次数
  static shakeNumberRequest(params) {
    let url = Operation.sharedInstance().shakeNumberUrl;
    return this.request(url, params, '摇奖次数查询', true)
  }
  //摇一摇
  static shakeStartRequest(params) {
    let url = Operation.sharedInstance().shakeStartUrl;
    return this.request(url, params, '摇一摇', true)
  }
  //中奖公告
  static winnerRequest(params) {
    let url = Operation.sharedInstance().homeWinnersUrl;
    return this.request(url, params, '获奖名单', true)
  }
  // 判断用户是否签到
  static signIsTrueRequest (params) {
    let url = Operation.sharedInstance().signIsTrueUrl;
    return this.request(url, params, '用户是否签到', true)
  }
  /********************我的奖品*************************/

  static queryActivityWordCard(params) {
    let url = Operation.sharedInstance().queryActivityWordCard;
    return this.request(url, params, '字卡数量获取', true)
  }

  static configListCard(params) {
    let url = Operation.sharedInstance().configListCard;
    return this.request(url, params, '合成金朵', true)
  }

  static updateUserCheckedAddress(params) {
    let url = Operation.sharedInstance().updateUserCheckedAddress;
    return this.request(url, params, '合成字卡活动地址选择', true)
  }
  
  static queryActivityRedPackageList(params) {
    let url = Operation.sharedInstance().queryActivityRedPackageList;
    return this.request(url, params, '我的红包列表', true)
  }

  static getRedPackageNum(params) {
    let url = Operation.sharedInstance().getRedPackageNum;
    return this.request(url, params, '红包数量', true)
  }
  
  static querySecuritycodeUsedList(params) {
    let url = Operation.sharedInstance().querySecuritycodeUsedList;
    return this.request(url, params, '我的实物列表', true)
  }

  static getCardNumber(params) {
    let url = Operation.sharedInstance().getCardNumber;
    return this.request(url, params, '查询集齐金朵字人数', true)
  }

  /******************** 地址 *************************/

  static addUserAddress(params) {
    let url = Operation.sharedInstance().addUserAddress;
    return this.request(url, params, '新增地址', true)
  }

  static deleteUserAddress(params) {
    let url = Operation.sharedInstance().deleteUserAddress;
    return this.request(url, params, '删除地址', true)
  }

  static updateUserAddress(params) {
    let url = Operation.sharedInstance().updateUserAddress;
    return this.request(url, params, '修改地址', true)
  }

  static queryUserAddressList(params,types) {
    let url = ''
    url = types == 1 ? Operation.sharedInstance().queryUserAddressList : Operation.sharedInstance().queryUserAddressListByDuoIs
    //let url = Operation.sharedInstance().queryUserAddressList;
    let req = this.request(url, params, '获取地址列表', true);
    req.preprocessCallback = (req, firstData) => {
      let data = req.responseObject.data
      data.forEach((item) => {
        item.addressInfo = item.province_code + item.city_code + item.area_code + item.address
        item.hasData = true
      })
    }
    return req 
  }
  
  /********************提交订单********************/

  static makeOrder(params) {
    let url = Operation.sharedInstance().makeOrder;
    return this.request(url, params, '提交订单', true)
  }

  static canMakeSureOrder(params) {
    let url = Operation.sharedInstance().canMakeSureOrder;
    return this.request(url, params, '提交订单', true)
  }

  static canMakeSureOrder(params) {
    let url = Operation.sharedInstance().canMakeSureOrder;
    return this.request(url, params, '获取奖项是否可以申领', true)
  }

  /********************获取省市区********************/

  // 获取省
  static getProvinceList() {
    let url = Operation.sharedInstance().getProvinceList;
    return this.request(url, { port: '8101' }, '获取省份');
  }

  // 获取市
  static getCityList(params) {
    params.port = '8101'
    let url = Operation.sharedInstance().getCityList;
    return this.request(url, params, '获取市');
  }

  // 获取区
  static getAreaList(params) {
    params.port = '8101'
    let url = Operation.sharedInstance().getAreaList;
    return this.request(url, params, '获取区');
  }
  
  /****************** 我的反馈 *******************************/ 

  static queryDictionaryDetailsType(params) {
    params.port = '8001';
    let url = Operation.sharedInstance().queryDictionaryDetailsType;
    return this.request(url, params, '获取反馈问题列表', true);
  }

  static queryByCreateUserList(params) {
    let url = Operation.sharedInstance().queryByCreateUserList;
    return this.request(url, params, '反馈列表', true);
  }

  static findFeedbackById(params) {
    let url = Operation.sharedInstance().findFeedbackById;
    return this.request(url, params, '查询反馈详情', true);
  }

  static addFeedback(params) {
    let url = Operation.sharedInstance().addFeedback;
    return this.request(url, params, '添加反馈', true);
  }

    /****************** 订单物流列表 *******************************/

    static querySecuritycodeUsedListByHadReceive(params) {
        let url = Operation.sharedInstance().querySecuritycodeUsedListByHadReceive;
        return this.request(url, params, '订单物流列表', true);
    }
    static getDelivery(params) {
        let url = Operation.sharedInstance().getDelivery;
        return this.request(url, params, '物流信息', true);
    }
}

