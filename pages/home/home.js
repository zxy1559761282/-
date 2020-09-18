// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value:"",
        activeKey:0,
        recycle:["纸牌","胶片","包装纸盒","健身器材","床上用品","蓝牙耳机","有机玻璃","塑料罐头","真皮制品","螺丝刀"],
            
        danger:["充电电池","荧光灯管","过期药物","水银温度计","老鼠药","纽扣电池","染发剂","杀虫剂"],
          
        kitchen:["火锅底","鱼骨","茶叶渣","咖啡渣","瓜皮果核","酱料","糕饼","糖果","小龙虾"],
            
        other:["烟蒂","尿不湿","棉签","灰土","彩妆","餐巾纸","毛发","一次性餐具"]
           
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

    },

    onSearch:function(event){
        console.log(this.data.value);
    },

    onChange:function(event){
        this.setData({
            value:event.detail
        })
    },

    onActiveChange:function(e){
        this.setData({
            activeKey:e.detail
        })
    },

    onFocus:function(e){
        console.log('999')
        wx.navigateTo({
          url: '/pages/search/search',
          success:function(e){
              
          },
          fail:function(e){
              
          },
          complete:function(e){
              
          }
        })
    }
})