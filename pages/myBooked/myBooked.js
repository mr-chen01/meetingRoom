// pages/myBooked/myBooked.js
const dayjs=require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_detail_id:null,
    room_detail:[],
    isDelete:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.getRoomDetail()
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

  getRoomDetail:function(){
    var that=this
    var room_detail,room_detail_selected
    wx.cloud.init()
    wx.cloud.callFunction({
      name:'roomDetail'
    })
    .then(res=>{
      console.log(res)
      room_detail=res.result.data
      room_detail_selected=room_detail.filter(that.select)
      console.log('room_detail_selected',room_detail_selected)
      that.setData({
        room_detail:room_detail_selected
      })
    })

  },

  select:function(value,index,array){
    let result=
    (Number(value.date.year)>Number(dayjs().year()))||
    (Number(value.date.year)==Number(dayjs().year())&&Number(value.date.month)>(Number(dayjs().month()+1)))||(Number(value.date.year)==Number(dayjs().year())&&Number(value.date.month)==(Number(dayjs().month()+1))&&Number(value.date.date)>Number(dayjs().date()))||
    (Number(value.date.year)==Number(dayjs().year())&&Number(value.date.month)==(Number(dayjs().month()+1))&&Number(value.date.date)==Number(dayjs().date()))&&value.schedule.s.h>Number(dayjs().hour())||
    (Number(value.date.year)==Number(dayjs().year())&&Number(value.date.month)==(Number(dayjs().month()+1))&&Number(value.date.date)==Number(dayjs().date()))&&value.schedule.s.h==Number(dayjs().hour()&&value.schedule.s.m>Number(dayjs().minute()))

    return(result)
  },

  showDelete:function(e){
    this.setData({
      isDelete:true,
      room_detail_id:e.currentTarget.dataset.roomdetailid
    })
  },

  delete:function(e){
    var that=this
    console.log(e)
    wx.cloud.init()
    wx.cloud.callFunction({
      name:'roomDetailDelete',
      data:{
        room_detail_id:that.data.room_detail_id
      }
    })
    that.setData({
      isDelete:false
    })
  },

  NO:function(){
    this.setData({
      isDelete:false
    })
  },
})