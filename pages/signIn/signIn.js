const dayjs=require('dayjs');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'../../image/search.png',
    schedule:{},
    buttonList:[{name:'已签到',id:0,checked:true},{name:'待签到',id:1}],
    signInedLists:[],
    unsignInLists:[],
    groupList:[],
    stuffId:[],
    Height:null,
    Width:null,
    picked:0,
    room_detail_id:null,
    searchName:'',
    listState:1,
    searchList:[],
    year:null,
    month:null,
    date:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var day=dayjs()
    that.setData({
      year:day.year(),
      month:Number(day.month())+1,
      date:day.date()
    })
    wx.getSystemInfo({
      success:function(res){
        that.setData({
          Height:res.windowHeight,
          Width:res.windowWidth
        })
      }
    })
    that.setData({
      schedule:JSON.parse(options.schedule),
      room_detail_id:options.room_detail_id,
      stuffId:JSON.parse(options.stuffId)
    })
    that.getSignIned();
    
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

  imageActive:function(){//点击搜索按钮
    this.setData({
      src:'../../image/searchselected.png'
    })
  },

  imageLoose:function(){//松开搜索按钮
    this.setData({
      src:'../../image/search.png'
    })
  },

  buttonSelceted:function(e){
    var that=this
    var this_checked = e.currentTarget.dataset.id;
    var buttonList=that.data.buttonList
    for (var i = 0; i < buttonList.length;i++){
      if (buttonList[i].id == this_checked){
        buttonList[i].checked = true;
      }
      else{
        buttonList[i].checked = false;
      }
    }
    that.setData({
      buttonList:  buttonList,
      picked:this_checked
    })
  },

  getSignIned:function(){
    var that=this,
    room_detail_id=this.data.room_detail_id,
    signInedLists=this.data.signInedLists
    console.log(room_detail_id)
    wx.cloud.init()
    wx.cloud.callFunction({
      name:'getSignIned',
      data:{
        room_detail_id:room_detail_id
      }
    })
    .then(res=>{
      console.log('signIn',res)
      let temp
      for(let i=0;i<res.result.list.length;i++){
        temp=JSON.parse(JSON.stringify(res.result.list[i].name))
        signInedLists.push(temp)
      }
      that.setData({
        signInedLists:signInedLists
      })
    })
    .then(()=>{
      that.getStuff()
    })
  },

  getStuff:function(){
    var that=this
    wx.cloud.init()
    wx.cloud.callFunction({
      name:'getStuff',
      data:{
        stuffId:that.data.stuffId
      }
    })
    .then(res=>{
      let groupList=[]
      for(let i=0;i<res.result.data.length;i++){
        let temp=res.result.data[i].name
        groupList.push(JSON.parse(JSON.stringify(temp)))
      }
      that.setData({
        groupList:groupList
      })
    })
    .then(()=>{
      that.getUnsignIn()
    })
  },

  getUnsignIn:function(){
    var arr1 = this.data.groupList  
    var arr2 = this.data.signInedLists 
    var temp = []
    var temparray = [] 
    for (var i = 0; i < arr2.length; i++) { 
    temp[arr2[i]] = true
    }; 
    for (var i = 0; i < arr1.length; i++) { 
    if (!temp[arr1[i]]) { 
    temparray.push(arr1[i])
    }
    }
    this.setData({
      unsignInLists:temparray
    })
},
    
  searchName:function(e){
    var value=e.detail.value
    this.setData({
      searchName:value
    })
    if(value==''){
      this.setData({
        listState:1
      })
    }else{
      this.setData({
        listState:0
      })
    }
  },

  searchStuff:function(){
    var searchName=this.data.searchName
    var buttonList=this.data.buttonList,result
    var signInedLists=this.data.signInedLists
    var unsignInLists=this.data. unsignInLists
    function resultList(value,index,array){
      let i=value.search(searchName)
      if(i>=0)return true
      else return false
    }
    for(let i=0;i<buttonList.length;i++){
      if(buttonList[i].checked&&buttonList[i].id==0){
        result=signInedLists.filter(resultList)
        break
      }else if(buttonList[i].checked&&buttonList[i].id==1){
        result=unsignInLists.filter(resultList)
        console.log(result)
        break
      }
    }
    this.setData({
      searchList:result
    })
  },


})