// pages/qiandao/qiandao.js
const dayjs=require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:'',
    isScan:false,
    signInCode:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var day=dayjs()
    if(options.roomDetailId==undefined){//扫码还是手动输入
      that.setData({
        isScan:false
      })
    }else{
      that.setData({
        isScan:true,
        room_detail_id:options.roomDetailId,
        signInCode:options.signInCode
      })
      wx.cloud.init()
    var result=wx.cloud.callFunction({
      name:'getRoomDetailId',
      data:{
        signInCode:that.data.signInCode
      }
    })
    .then(res=>{
      if(res.result.data.length==0){//判断是否已经存在
        that.signIn()//不存在则添加
       }
      })
      wx.showToast({
        title: '您已签到',
      })
      setTimeout(()=>{
        wx.reLaunch({
        url: "/pages/calendar/calendar"
       })
     },2000)
    }
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

  getSignIned_qiandao:function(){
    var that=this
    wx.cloud.init()
    return wx.cloud.callFunction({
      name:'getSignIned_qiandao',
      data:{
        room_detail_id:that.data.room_detail_id
      }
    })
    .then(res=>{
      console.log('getSignIned_qiandao',res)
      return res.result.data
    })
  },

  getRoomDetailId:function(){
    var that=this
    wx.cloud.init()
    return wx.cloud.callFunction({
      name:'getRoomDetailId',
      data:{
        signInCode:that.data.signInCode
      }
    })
    .then(res=>{
      that.setData({
        room_detail_id:res.result.data[0]._id
      })
      console.log('getRoomDetailId',res)
    })
    .then(()=>{
      return new Promise(
        function(resolve,reject){
          return that.getSignIned_qiandao()
        }
      )
      
    })
  },

  getCode:function(e){
    this.setData({
      signInCode:e.detail.value
    })
    console.log('getCode',e)
  },

  signIn:function(){
    var that=this
    wx.cloud.init()
    wx.cloud.callFunction({
      name:'signIn',
      data:{
      room_detail_id:that.data.room_detail_id
      }
    })
    .then(res=>{
      console.log(res)
    })
  },

  submit:function(){
    var that=this
    wx.cloud.init()
    var result=wx.cloud.callFunction({
      name:'getRoomDetailId',
      data:{
        signInCode:that.data.signInCode
      }
    })
    .then(res=>{
      if(res.result.data.length!=0){
        that.setData({
          room_detail_id:res.result.data[0]._id
        })
      }
      else{
        wx.showToast({
          title: '该签到码无效',
          image:'../../image/warning.png'
        })
        setTimeout(()=>{
          wx.reLaunch({
          url: "/pages/calendar/calendar"
        })
      },2000)
      reject()
      }
      console.log('getRoomDetailId',res)
    })
    .then(()=>{
      console.log('room_detail_id',that.data.room_detail_id)
      return wx.cloud.callFunction({
        name:'getSignIn_qiandao',
        data:{
          room_detail_id:that.data.room_detail_id
        }
      })
    })
    .then(res=>{
      console.log('getSignIn_qiandao',res)
      if(res.result.result.data.length==0){
      that.signIn()
      }
      wx.showToast({
        title: '您已签到',
      })
      setTimeout(()=>{
        wx.reLaunch({
        url: "/pages/calendar/calendar"
      })
    },2000)
    })
    
  },
})