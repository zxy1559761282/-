// pages/person/person.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      gender:['男','女'],
      genderIndex:0,
      year:"2020",
      region:['北京市','北京市','朝阳区'],
      hiddenChat:true,
      message:""
    },

    selectGender:function(e)
    {
      this.setData({
        genderIndex:e.detail.value
      })
    },

    selectYear:function(e){
      this.setData({
        year:e.detail.value
      })
    },

    selectRegion:function(e){
      this.setData({
        region:e.detail.value
      })
    },

    saveUserDetail:function(e){
      wx.request({
        url: 'https://yingjiang.info/userdetail',
        data:{
          'year':this.data.year,
          'gender':this.data.gender[this.data.genderIndex],
          'zone':this.data.region[2],
          'province':this.data.region[0],
          'city':this.data.region[1]
        },
        header:{
          userid:wx.getStorageSync("userid")
        },
        method:'POST',
        success:function(e){
          if(e.data=="success")
            wx.showToast({
              title: '保存成功'
            })
          else
            wx.showToast({
              title: '保存失败',
              icon:'none'
            })
        },
        fail:function(e){
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      })
    },

    showDialog:function(e){
      this.setData({
        hiddenChat:false
      })
    },

    onClose:function(e){
      this.setData({
        hiddenChat:true
      })
    },

    edit:function(e){
      this.setData({
        message:e.detail.value
    })
    },

    sendmes:function(e){
      this.setData({
        hiddenChat:true
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
      console.log(getApp().globalData.region)
      this.setData({
        region: getApp().globalData.region
      })
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