/**
 * Created by coin on 1/13/17.
 */

let __instance = (function () {
    let instance;
    return (newInstance) => {
        if (newInstance) instance = newInstance;
        return instance;
    }
}());

//操作常量定义
export default class Operation {

    constructor() {
        if (__instance()) return __instance();


    /*************  注册登录相关接口 *********************/
       
        // 验证openid是否注册

        this.getWeChatOpenId = '/user/userLogin/getWeChatOpenId'

        // 微信登陆

        this.appWechatLogin ='/user/userLogin/decryptPhone'

        // 退出登录

        this.exitLogin  ='/user/userLogin/exitLogin'

        // 获取活动id 

        this.getActivityId ='/user/activity/get'

        // 上传图片的地址

        this.aliyunOSSUploadImage ='/commonAPI/ossClient/aliyunOSSUpload'

      /************* 我的反馈 *********************/

        // 获取反馈问题的列表
      
        this.queryDictionaryDetailsType = '/admin/dictionary/queryDictionaryDetailsType'

        // 反馈列表

        this.queryByCreateUserList ='/user/feedback/queryByCreateUserList'

        // 查询反馈详情

        this.findFeedbackById = '/user/feedback/findFeedbackById'

        // 添加反馈

        this.addFeedback = '/user/feedback/addFeedback'

      /*************  首页接口 *********************/

        //天天签到 签到

        this.signUrl = '/user/activitySign/addActivitySign'

        // 天天签到 签到列表

        this.signListUrl = '/user/activitySign/queryActivitySignData'

        // 防伪码接口
        this.homeSecurityCodeUrl = '/user/securityCode/use'

        // 公告
        this.noticeListUrl = '/user/notice/queryActivityNoticePageList'

        //获取摇奖次数
        this.shakeNumberUrl = '/user/activityCount/query'
        
        // 摇一摇开启
        this.shakeStartUrl = '/user/securityCode/lottery'

        // 获奖名单
        this.homeWinnersUrl = '/user/securitycodeUsed/queryWinList'

        // 判断用户是否签到
        this.signIsTrueUrl = '/user/activitySign/findDayActivitySignData'
      
      /*************  我的奖品 *********************/

        // 字卡数量获取

        this.queryActivityWordCard ='/user/activityWordCard/queryActivityWordCard'
        
        // 合成字卡 

        this.configListCard='/user/activityWordCardConfig/queryActivityWordCardConfigListByActivityId'

        // 合成字卡活动地址选择

        this.updateUserCheckedAddress = '/user/userAddress/updateUserCheckedAddress'

        // 我的红包列表

        this.queryActivityRedPackageList ='/user/activityRedPackage/queryActivityRedPackageList'

        // 红包数量

        this.getRedPackageNum = '/user/activityRedPackage/query'

        // 我的实物列表

        this.querySecuritycodeUsedList = '/user/securitycodeUsed/querySecuritycodeUsedList'

        // 提交实物订单

        this.makeOrder ='/user/securityCode/save'

        // 获取奖项是否可以申领

        this.canMakeSureOrder = '/user/securityCode/open'
      
      /*************  地址 *********************/

        // 新增地址

        this.addUserAddress ='/user/userAddress/addUserAddress'

        // 删除地址

        this.deleteUserAddress = '/user/userAddress/deleteUserAddress'

        // 修改地址

        this.updateUserAddress = '/user/userAddress/updateUserAddress'

        // 查询列表

        this.queryUserAddressList ='/user/userAddress/queryUserAddressList'

        // 查询朵地址

        this.queryUserAddressListByDuoIs = '/user/userAddress/queryUserAddressListByDuoIs'

        // 查询集齐金朵字人数

        this.getCardNumber = '/user/activityMergeWordCard/findActivityMergeWordCardByActivityId'


      /**********  获取省市区 *******************/

        // 获取省
        this.getProvinceList = '/admin/areaApi/getProvinceList'

        // 获取市
        this.getCityList = '/admin/areaApi/getCityList'

        // 获取区
        this.getAreaList = '/admin/areaApi/getAreaList';

        /**********  订单物流列表 *******************/
        this.querySecuritycodeUsedListByHadReceive = '/user/securitycodeUsed/querySecuritycodeUsedListByHadReceive';
        this.getDelivery = '/user/delivery/bird';

    }

    static sharedInstance() {
        return new Operation();
    }
}