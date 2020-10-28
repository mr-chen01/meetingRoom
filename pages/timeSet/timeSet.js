// pages/timeSet/timeSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rMax:['请选择人数','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
    numIndex:0,
    sIndex:[0,0],
    sRange:[['8','9','10','11','12','13','14','15','16','17','18','19','20'],['00','10','20','30','40','50','60']],
    eIndex:['0','0'],
    eRange:[['8','9','10','11','12','13','14','15','16','17','18','19','20'],['00','10','20','30','40','50','60']]
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

  pickerNumberChange:function(e){
    this.setData({
      numIndex: e.detail.value
    })
  },

  pickerStartChange:function(e){
    this.setData({
      sIndex: e.detail.value
    })
  },

  pickerEndChange:function(e){
    this.setData({
      eIndex: e.detail.value
    })
  }

})

 