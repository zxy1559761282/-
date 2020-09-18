// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      displayQues:true,
      displayResult:false,
      testIndex:0,
      testContent:["钢管","游泳眼镜","八宝粥","卸甲水","气泡膜","星巴克塑料杯","尿布","废血压计","废油漆","葡萄酒"],
      testAnswer:["可回收物","其他垃圾","厨余垃圾","有害垃圾","其他垃圾","其他垃圾","其他垃圾","有害垃圾","有害垃圾","厨余垃圾"],
      userAnswer:[],
      isCorrect:[],
      score:0,
      show:true,
      answerKind:["recycle","other","kitchen","danger","other","other","other","danger","danger","kitchen"]
    },

    onChoose:function (e){

      this.data.show = !this.data.show;
      this.setData({
        show: this.data.show
      })
      let answer = e.target.dataset.text;
      this.data.userAnswer.push(answer);
      if (answer == this.data.testAnswer[this.data.testIndex]) {
        this.data.isCorrect.push("yes");
        this.data.score += 10;
      }
      else {
        this.data.isCorrect.push("no");
      }
      this.data.testIndex++;
      this.data.show = !this.data.show;
      this.setData({
        userAnswer: this.data.userAnswer,
        isCorrect: this.data.isCorrect,
        score: this.data.score,
      })
      
      if(this.data.testIndex!=10)
      {
        let page = this;
        setTimeout(function () {
          page.setData({
            testIndex: page.data.testIndex,
            show:page.data.show
          })
        }, 300)
        
      }
      else
      {
        this.setData({
          displayQues: false
        })

        let page = this;
        setTimeout(function () {
          page.setData({
            displayResult:true
          })
        }, 300)
      }
      console.log(this.data);
    },

    onReplay:function(e){
      this.setData({
        displayResult: false,
      })
      let page=this;

      wx.request({
        url: 'https://yingjiang.info/gettests',
        success: function (e) {
          page.setData({
            testContent: e.data.title,
            testAnswer: e.data.answer,
            answerKind: e.data.answeEng
          })
        },
        fail: function (e) {
          wx.showToast({
            title: '测试失败',
            icon: 'none'
          })
        }
      })

      setTimeout(function(){
        page.setData({
          testIndex: 0,
          userAnswer: [],
          isCorrect: [],
          score: 0,
          show: true,
        })
      },200)

      setTimeout(function(){
        page.setData({
          displayQues: true,
        })
      },200)
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
      let page=this;
        wx.request({
          url: 'https://yingjiang.info/gettests',
          success:function(e){
            page.setData({
              testContent:e.data.title,
              testAnswer: e.data.answer,
              answerKind: e.data.answeEng
            })
          },
          fail:function(e){
            wx.showToast({
              title: '测试失败',
              icon:'none'
            })
          }
        })
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