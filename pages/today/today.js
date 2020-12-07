// pages/today/today.js
const dayjs=require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     year:null,
     month:null,
     date:null,
     lists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //仿照util.js文件写日期函数
    var day=dayjs().clone();//获取时间
    var year=day.year(),
    month=day.month(),
    date=day.date()
    that.setData({
     year:year,
     month:month+1,
     date:date
    });
    that.memberRoom()
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

  memberRoom:function(){
    var that=this
    var lists=that.data.lists,
    year=that.data.year,
    month=that.data.month,
    date=that.data.date
    wx.cloud.init()
      wx.cloud.callFunction({
      name:'roomDetail',
      data:{
      year:year.toString(),
      month:month.toString(),
      date:date.toString(),
      }
    })
    .then((res)=>{
      for(let i=0;i<res.result.data.length;i++)
          {
            let temp={
              organiser:res.result.data[i].organiser,
              schedule:res.result.data[i].schedule,
              title:res.result.data[i].title,
              rId:res.result.data[i].rId
            }
            lists.push(temp)
          }
          that.setData({
            lists:lists
          })
          console.log(that.data.lists)
    })
        
  }
})

// {title:'网抑云对人的影响',organiser:'guang',rId:'1'},{title:"肥广为什么还没有脱单",organiser:"lin",rId:'2'},{title:"铭涛为什么这么有钱",organiser:"yan",rId:'1'}