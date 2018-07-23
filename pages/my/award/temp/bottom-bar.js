let { Tool } = global;

Component({
  properties: {
    index:Number
  },
  data: {
    page:[
      "pages/my/award/award-goods/award-goods",
      "pages/my/award/card/card",
      "pages/my/award/red-envelopes/red-envelopes"
    ]
  },
  methods: {
    goPage(e){
      let index = e.currentTarget.dataset.index
      let {page} = this.data

      if (Tool.getCurrentPageUrl() == page[index] ) return

      Tool.redirectTo("/"+page[index])   
    }
  },
  ready: function () {
    Tool.isIPhoneX(this)
  }
})
