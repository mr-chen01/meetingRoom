// pages/booked/booked.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:2020,
    month:9,
    date:29,
    roomDetail:[],
    roomSchedule:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var x=this.roomDetail()
    x.then(()=>{
      that.roomSchedule()
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

  roomDetail:function(){//从数据库中获取roomDeatil
    var that=this
    var x
    wx.cloud.init()
    x=wx.cloud.callFunction({
      name: 'roomDetail',
      data:{
        year:that.data.year,
        month: that.data.month,
        date:that.data.date
      },
    })
    .then(res=>{
      console.log(res.result.data)
      that.setData({
        roomDetail:res.result.data
      })
   })
    
      return x
  },

  roomSchedule:function(){
    var that=this
    var detail=that.data.roomDetail,schedule=[]
    for(let x=0;x<detail.length;x++){
      schedule.push(detail[x].schedule)
    }
    that.setData({
      roomSchedule:schedule
    })  
    console.log(that.data.roomSchedule)
  },

})