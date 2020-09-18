//index.js
//获取应用实例
const app = getApp()

Page({
    goHomeTap:function(event){
      wx.switchTab({
        url: '../home/home'
      })
    }
})
