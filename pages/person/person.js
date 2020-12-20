// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:['我的信息','我的预定','关于我们'],
    list2:['我的信息','签到','关于我们'],
    level:null,
    page:["/pages/personInfo/personInfo","/pages/qiandao/qiandao",""],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.getLevel()
  },
  goPage(e){
    const index=e.currentTarget.dataset.index+1;  //数组第一位为0
    const url="/pages/myPage"+index+"/myPage"+index;
    wx.navigateTo({
      url: url,
    })
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

  getLevel:function(){
    var that=this
    var page=that.data.page
    wx.cloud.init()
    wx.cloud.callFunction({
      name:'openId',
    })
    .then(res=>{
      that.setData({
        level:res.result.data[0].level
      })
      console.log(res)
      if(res.result.data[0].level==1){
        page[1]='/pages/myBooked/myBooked'
        that.setData({
          list:that.data.list1,
          page:page
        })
      }else{
        that.setData({
          list:that.data.list2
        })
      }
    })
  },

  pageTo:function(e){
    var that=this
    console.log(e)
    wx.navigateTo({
      url: that.data.page[e.currentTarget.dataset.index],
    })
  },
})