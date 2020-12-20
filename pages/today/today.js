// pages/today/today.js
const dayjs=require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     year:'',
     month:'',
     date:'',
     lists:[],
     level:2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //仿照util.js文件写日期函数
    var day=dayjs().clone()
    that.setData({
     year:day.year().toString(),
     month:(day.month()+1)+'',
     date:day.date().toString()
    });
    that.getLevel()
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
    var that=this,
    lists=that.data.lists
    wx.cloud.init()
        wx.cloud.callFunction({
        name:'roomDetail',
        data:{
        year:that.data.year,
        month:that.data.month,
        date:that.data.date,
        }
      })
      .then(res=>{
        for(let i=0;i<res.result.data.length;i++)
          {
            let temp={
              organiser:res.result.data[i].organiser,
              rId:res.result.data[i].rId,
              schedule:res.result.data[i].schedule,
              title:res.result.data[i].title,
              stuffId:res.result.data[i].group.stuffId,
              room_detail_id:res.result.data[i]._id
            }
            lists.push(temp)
          }
          that.setData({
            lists:lists
          })
        })
    },

    getLevel:function(){
      var that=this
      wx.cloud.init()
      wx.cloud.callFunction({
        name:'openId',
      })
      .then(res=>{
        that.setData({
          level:res.result.data[0].level
        })
      })
    },

    pageTo:function(e){
      var schedule=e.currentTarget.dataset.schedule,
      room_detail_id=e.currentTarget.dataset.roomdetailid,
      stuffId=e.currentTarget.dataset.stuffid,
      para='schedule='+JSON.stringify(schedule)+'&room_detail_id='+room_detail_id+'&stuffId='+JSON.stringify(stuffId)
      if((dayjs().hour()==schedule.s.h&&dayjs().minute()>=schedule.s.m)||(dayjs().hour()>schedule.s.h)&&(dayjs().hour()==schedule.e.h&&dayjs().minute()<=schedule.e.m)||dayjs().hour()<schedule.e.h){
        wx.navigateTo({
          url: "/pages/signIn/signIn?"+para
        })
      }
    }
})