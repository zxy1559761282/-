// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden:true,
        keyWord:"",
        resArray:[],
        wastesKind:["可回收物","有害垃圾","厨余垃圾","其他垃圾"],
        wasteDecorations:["recycle","danger","kitchen","other"]
    },

    onSearch:function(e)
    {
        this.searchWaste(this.data.keyWord);
    },
    onChange:function(e)
    {
        this.setData({
            keyWord:e.detail,
            hidden:true
        })
    },

    onChoose:function(e){
      console.log(e)
      this.setData({
        keyWord: e.target.dataset.text
      }) 
      this.searchWaste(e.target.dataset.text);
      
    },

  searchWaste: function (e) {

    let url_str = "https://yingjiang.info/searchjd/" + e;
    let thisPage = this;
    wx.request({
      url: url_str,
      success: function (res) {
        let arr = res.data.result.garbage_info;
        let dataarr = []
        for (let i = 0; i < arr.length; i++) {
          let name = arr[i].garbage_name;
          let code = 0;
          if (arr[i].cate_name == "可回收物") code = 0;
          else if (arr[i].cate_name == "有害垃圾") code = 1;
          else if (arr[i].cate_name == "厨余垃圾") code = 2;
          else if (arr[i].cate_name == "其他垃圾") code = 3;
          dataarr.push({ name: name, type: code, ps: arr[i].ps });
        };
        thisPage.setData({
          resArray: dataarr,
          hidden: false
        });
        thisPage.updateSearchData();
      },
      fail: function (e) {
        wx.showToast({
          title: 'fail',
          icon: 'none'
        })
      }
    })
  },

   updateSearchData:function()
   {
     let that=this;
     console.log('ent')
     wx.request({
       url: 'https://yingjiang.info/collect',
       data:{
         userid:wx.getStorageSync('userid'),
         type:that.data.resArray[0].type
       },
       success:function(e)
       {
        console.log(e)
       }
     })
   },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})