// pages/calendar/calendar.js
const dayjs=require('dayjs');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    left:[],
    right:[],
    day:null,
    year:1,
    month:1,
    weeks:['日', '一','二' ,'三','四' , '五', '六'],
    allday:[],
    touchS : [0,0],
    touchE : [0,0],
    meetingRoom:[{name:'会议室1',state:1,id:'1',pId:'1'},{name:'会议室2',state:1,id:'2',pId:'1'},{name:'会议室3',state:1,id:'3',pId:'1'},{name:'会议室4',state:1,id:'4',pId:'2'}],
    picked:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var day=dayjs().clone();//获取时间
    this.setData({
      picked:day.date()
    })
    this.showdate(day);
    this.getDetail()
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

  showdate:function(day){
    this.data.left.splice(0,this.data.left.length);
    this.data.allday.splice(0,this.data.allday.length);
    this.data.right.splice(0,this.data.right.length);//删除上个月的元素

    var temp=Object.assign(this.data.allday);//设立临时时间点
    var last=dayjs().set('month',day.month()-1).endOf('month').date();
    var templ=Object.assign(this.data.left);
    for(var i=day.startOf('month').day()-1;i>=0;i--)  
      templ.push(" ");//上月尾日

    for(var i=1;i<=day.endOf('month').date();i++)
    {
      if((i<day.date()&&dayjs().month()==day.month())||(day.month()<dayjs().month()&&dayjs().year()==day.year()))
      temp.push({day:i,id:-1});
      else if(i==day.date()&&dayjs().month()==day.month())
      temp.push({day:i,id:0});
      else temp.push({day:i,id:1});
    }
    
    var tempr=Object.assign(this.data.right);
    for(var i=1;i<=6-day.endOf('month').day();i++)
    tempr.push({day:i,id:2});//下月
    temp[day.date()-1].checked=true;

    this.setData({
      left:templ,
      year:day.year(),
      day:day,
      right:tempr,
      month:day.month(),
      allday:temp,
    })

  },


  alldayTap:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that=this
    var this_checked = e.currentTarget.dataset.id;
    var alldayList = this.data.allday//获取Json数组
    for (var i = 0; i < alldayList.length;i++){
      if (alldayList[i].day == this_checked){
        alldayList[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        alldayList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      allday: alldayList,
      picked:this_checked
    })
  },

  lastmonth:function(){
    var that=this
    let day=that.data.day
    var nextMonth=day.month()-1;
    that.showdate(day.set('month',nextMonth));
  },

  nextmonth:function(){
    var that=this
    let day=that.data.day
    var nextMonth=day.month()+1;
    that.showdate(day.set('month',nextMonth));
  },
  touchStart: function(e){
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx,sy]
    this.data.touchE = [sx, sy]
  },
  touchMove: function(e){
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  touchEnd: function(e){
    let start = this.data.touchS
    let end = this.data.touchE
    if(start[0] < end[0] - 50){
      this.lastmonth()
    }else if(start[0] > end[0] + 50){
      this.nextmonth()
    }

  },

  getDetail:function(){
    var that=this,
    meetingRoom=this.data.meetingRoom,
    state=[]
    for(let x=0;x<meetingRoom.length;x++){
      wx.cloud.init()
      wx.cloud.callFunction({
      name:'roomDetail',
      data:{
      year:that.data.year.toString(),
      month:(that.data.month+1).toString(),
      date:that.data.picked.toString(),
      rId:(x+1).toString()
      }
    })
    .then(res=>{
      if(res.result.data.length!=0)
      {  console.log(x,res.result.data)
        meetingRoom[x].state=res.result.data[0].state
        that.setData({
          meetingRoom:meetingRoom
        })}
    })
   }
  },

  pageTo:function(e){
    var year=this.data.year,
    month=this.data.month+1,
    date=this.data.picked,
    rId=e.currentTarget.dataset.data.id,
    pId=e.currentTarget.dataset.data.pId,
    para='year='+year.toString()+'&month='+month.toString()+'&date='+date.toString()+'&rId='+rId+'&pId='+pId
    wx.navigateTo({
      url: "/pages/booked/booked?"+para
    })
  }

})

