//app.js
var QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://yingjiang.info/wxlogin?code='+res.code,
            data: {
            },
            success:function(res){
              console.log(res.data)
              try{
              wx.setStorageSync("userid", res.data)
              }catch(e)
              {
                console.log(e)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },

      fail:function(e){
        console.log(e)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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

    let app=this;
    wx.getLocation({
      success: function (res) {
        var {
          latitude,
          longitude
        } = res; //经纬度
        //根据经纬度获取附近的详情地址
        var qqmapsdk = new QQMapWX({
          key: 'XHOBZ-FIJC4-JUEU5-DP4VH-PR4DE-YJFDX'
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            //获取附近地址
            let {
              province,
              city,
              district
            } = res.result.address_component;
            //详细地址

            app.globalData.region=[province,city,district]
            console.log(app.globalData.region)
          },
          fail: function (error) {
            console.error(error);
            wx.showToast({
              title: 'fail',
            })
          },
        })
      },
    })
  },

  globalData: {
    userInfo: null,
    region:[]
  }
})