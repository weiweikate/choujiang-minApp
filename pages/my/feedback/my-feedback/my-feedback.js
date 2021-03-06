let { Tool, RequestFactory, Event, Storage } = global
Page({
  data: {
    currentTab:0,
    totalPage: '', // 页面总页数
    currentPage: 1, // 当前的页数
    pageSize: 10, // 每次加载请求的条数 默认10 
    params: {},
    lists: []
  },
  onLoad: function () {
    let params = {
      pageSize: this.data.pageSize,
      page: this.data.currentPage,
      status:'',
      activityId: Storage.getActivityId() || '',
    }
    this.setData({
      params: params,
      activityId: Storage.getActivityId() || '',
    })
    this.queryByCreateUserList()
    Event.on('updateFeedback', this.queryByCreateUserList,this)
  },
  swichNav: function (e) {
    let cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      cur = cur ==0? '':cur
      let params = {
        pageSize: this.data.pageSize,
        page: 1,
        status: cur,
        activityId: this.data.activityId
      }
      this.setData({
        currentTab: cur,
        currentPage: 1,
        params: params,
        lists: []
      })
      this.queryByCreateUserList(params)
    }
  },
  queryByCreateUserList() {
    let r = RequestFactory.queryByCreateUserList(this.data.params);
    let { lists } = this.data
    r.finishBlock = (req) => {
      let datas = req.responseObject.data
      if (datas.resultCount > 0) {
        datas.data.forEach((item) => {
          item.className =item.f_status == 1 ? "type2" : "type1"
          item.typeName = item.f_status == 1 ? "处理中" : "已解决"
          item.show = item.f_status == 1 ? false:true
        })
        this.setData({
          lists: lists.concat(datas.data),
          totalPage: datas.total
        })
      }
    };
    Tool.showErrMsg(r)
    r.addToQueue();
  },
  onScroll() {
    // 向下滑动的时候请求数据
    if (this.data.currentPage >= this.data.totalPage) return
    let page = this.data.currentPage
    page += 1
    let { params } = this.data
    params.page = page
    this.setData({
      currentPage: page,
      params: params
    })
    this.queryByCreateUserList(this.data.params)
  },
  btnClicked(e){
    let id = e.currentTarget.dataset.id
    Tool.navigateTo('/pages/my/feedback/feedback-detail/feedback-detail?id='+id)
  }
})