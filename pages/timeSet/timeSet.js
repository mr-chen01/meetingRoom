// pages/timeSet/timeSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    sIndex:[0,0],
    sRange:[[8,9,10,11,12,13,14,15,16,17,18,19,20],[0,10,20,30,40,50,60]],
    sRangeM:[],
    eIndex:['0','0'],
    eRange:[[8,9,10,11,12,13,14,15,16,17,18,19,20],[0,10,20,30,40,50,60]],
    roomSchedule:[{s:{h:8,m:0},e:{h:8,m:0}}],
    spareTime:[],
    startTime:{},
    roomDetail:[],
    group:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      roomSchedule:JSON.parse(options.schedule).length!=0?JSON.parse(options.schedule):[{s:{h:8,m:0},e:{h:8,m:0}}],
      date:JSON.parse(options.date),
      pId:options.pId,
      rId:options.rId,
      priority:options.priority,
      group:options.group
    })
    console.log('group',this.data.group)
    that.spareTime()
    that.startTime()
    that.endTime()
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

  pickerStartChange:function(e){
    this.setData({
      sIndex: e.detail.value
    })
  },

  pickerEndChange:function(e){
    this.setData({
      eIndex: e.detail.value
    })
  },

  spareTime:function(){ //计算当日会议室空闲时间
    var that=this
    var schedule=this.data.roomSchedule
    var spare=[]
    let temp={}
    let sRange=[]
    temp=JSON.parse(JSON.stringify(schedule[0]))
    console.log('temp',schedule)
    if(schedule[0].s.h!=8||schedule[0].s.m!=0){//若开始时未空闲
      temp.e.h=temp.s.h
      temp.e.m=temp.s.m
      temp.s.h=8
      temp.s.m=0
      spare.push(Object.assign({},temp))
      console.log('1',spare)
      console.log(schedule[0])
    }
      for(let j=0;j<schedule.length;j++)
      {  
          temp.s=JSON.parse(JSON.stringify(schedule[j].e))
        console.log('schedule',schedule)
          if(schedule[j+1]!=null && schedule[j].e.h==schedule[j+1].s.h&&schedule[j].e.m==schedule[j+1].s.m){
              temp.s=JSON.parse(JSON.stringify(schedule[j+1].e))
              console.log('temp.s',temp.s)
            }
            else if(schedule[j+1]==null){
              temp.s=JSON.parse(JSON.stringify(schedule[j].e))
              temp.e={h:20,m:0}
              spare.push(Object.assign({},temp))
              console.log('2',spare)
            }
            else{
              temp.e=JSON.parse(JSON.stringify(schedule[j+1].s))
              spare.push(Object.assign({},temp))
              temp=JSON.parse(JSON.stringify(schedule[j+1]))
            }
      }
          this.setData(
            {
              spareTime:spare
            }
          )
          console.log('spare',that.data.spareTime)
   },

   startTime:function(){
      var that=this
      var spare=this.data.spareTime
      var sh=[],eh=[]
      var sRangeH=[],sRange=this.data.sRange,sRangeM=[]
      for(let i=0;i<spare.length;i++)
        {
          sh.push(spare[i].s.h)
          eh.push(spare[i].e.h)
        }
      for(let i=0;i<sh.length;i++){//小时
        let temp=sh[i]
        if(i!=0&&sh[i]==eh[i-1])
          temp++
        while(Number(temp)<=Number(eh[i])){
          sRangeH.push(temp)
          temp++
        }
      } 
      sRange[0]=sRangeH
      for(let i=0;i<sRangeH.length;i++){//分钟
        let temp=[]
        for(let j=0;j<spare.length;j++){
          if(sRangeH[i]==spare[j].s.h){//头
            if(sRangeH[i]!=spare[j].e.h)
              {
                for(let m=Number(spare[j].s.m);m<60;m+=10){
                  if(m==0)
                    temp.push('00')
                  else
                    temp.push(m)
                }
              break
            }else
              {
                for(let m=Number(spare[j].s.m);m<=spare[j].e.m;m+=10)
              {
                if(m==0)
                    temp.push(0)
                  else
                    temp.push(m)
              }
              break
            }
          } else if(Number(sRangeH[i])>Number(spare[j].s.h)&&Number(sRangeH[i])<Number(spare[j].e.h)){//中间
            for(let m=0;m<60;m+=10)
            {
              if(m==0)
                    temp.push(0)
                  else
                    temp.push(m)
            }
            break
          }
          else if(sRangeH[i]==spare[j].e.h){//尾
            {
              for(let m=0;m<=spare[j].e.m;m+=10){
                if(m==0)
                temp.push(0)
              else
                temp.push(m)
            }
          } 
              }
          else continue
            }
            sRangeM.push(temp)
        }
        sRange[1]=sRangeM[0]
      this.setData(
        {
          sRange:sRange,
          sRangeM:sRangeM
        }
      )
      console.log('sRange',that.data.sRange)
   },

   startTimeHourChange:function(e){
    var data = {
      sRange: this.data.sRange,
      sRangeM:this.data.sRangeM,
      sIndex: this.data.sIndex,
    };
    data.sIndex[e.detail.column] = e.detail.value;
    if(e.detail.column==0){
      data.sRange[1]=data.sRangeM[e.detail.value]
    }
    this.setData(data);
    this.endTime()
  },

  endTime:function(){
    var sRange=this.data.sRange,
    sIndex=this.data.sIndex,
    spare=this.data.spareTime,
    eRange=[[],[]],
    eRangeM=[],sRangeM=this.data.sRangeM.concat(), eIndex=this.data.eIndex
    var startH=sRange[0][sIndex[0]],
    startM=Number(sRange[1][sIndex[1]])
    var i=0,id=sIndex[0]
    console.log('startM',startM)
    while(i<spare.length){//抽出空闲时间段开始时间以及以后的时间段
      if(Number(spare[i].s.h)<=Number(startH)&&Number(spare[i].e.h)>=Number(startH)){
        console.log(spare[i])
        if((Number(spare[i].e.h)==Number(startH)&&Number(spare[i].e.m)<=Number(startM))){
          i++
          continue
        }
        for(let j=startH;Number(j)<=Number(spare[i].e.h);j++){
          eRange[0].push(j)
          eRangeM.push(sRangeM[id].concat())
          id++
        }
        break
      }
      i++
    }
    for(let temp=Number(eRangeM[0][0]);temp<=startM;temp=eRangeM[0][0]){//头
      eRangeM[0].splice(0,1)
    }
    var l1=eRangeM.length-1,l2=eRangeM[l1].length-1
    if(spare[i+1]!=null&&Number(spare[i].e.h)==Number(spare[i+1].s.h)){
      console.log('spare[i].e.h',Number(spare[i].e.h))
      for(let temp2=Number(eRangeM[l1][l2]); temp2>Number(spare[i].e.m);temp2=eRangeM[l1][l2]){//尾
        eRangeM[l1].splice(l2,1)
        l2=eRangeM[l1].length-1
        console.log(eRangeM[l1])
      }
    }
    eIndex=[0,0]
    eRange[1]=eRangeM[0]
    this.setData(
      {
        eRange:eRange,
        eRangeM:eRangeM,
        eIndex:eIndex
      }
      )
      console.log('eRangeM',this.data.eRangeM,'sRangeM',this.data.sRangeM)
    },

    endTimeHourChange:function(e){
      var data = {
        eRange: this.data.eRange,
        eRangeM:this.data.eRangeM,
        eIndex: this.data.eIndex,
      };
      data.eIndex[e.detail.column] = e.detail.value;
      if(e.detail.column==0){
        data.eRange[1]=data.eRangeM[e.detail.value]
      }
      this.setData(data);
    },
    
    formSubmit: function (e) {
      var that=this
      var end=e.detail.value.endtime,
      start=e.detail.value.starttime,
      eRange=this.data.eRange,
      sRange=this.data.sRange,
      title=e.detail.value.title,
      organiser=e.detail.value.organiser,
      date=this.data.date,
      pId=this.data.pId,
      rId=this.data.rId,
      priority=this.data.priority,schedule,
      group=JSON.parse(this.data.group),
      s={h:sRange[0][start[0]],m:sRange[1][start[1]]},e={h:eRange[0][end[0]],m:eRange[1][end[1]]}

      console.log('group',group)
      if(title==""||organiser==""){
        wx.showToast({
          title: '输入框为空',
          image: '/image/warning.png',
          fail:res=>{
            console.log("输入框判断失败")
          }
        })
      }else if(e.h==s.h&&e.m-s.m<30){
        wx.showToast({
          title: '小于30分钟',
          image: '/image/warning.png',
          fail:res=>{
            console.log("时间段判断失败")
          }
        })
      }else{
        schedule={s,e}
        wx.cloud.init()
        wx.cloud.callFunction({
          name:'book',
          data:{
            date:date,
            organiser:organiser,
            pId:pId,
            priority:priority,
            rId:rId,
            schedule:schedule,
            title:title,
            group:group
          }
        })
        .then(()=>{
          that.test()
        })
        .then(()=>{
          wx.showToast({
            title: '预定会议室成功',
            image: '/image/success.png',
          })
          setTimeout(()=>{
            wx.reLaunch({
            url: "/pages/calendar/calendar"
          })
        },2000)
      })
    }
    },

    test:function(){  //判断该会议室是否空闲 为否更新roomDetail的state
      var that=this,detail,schedule=[]
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'roomDetail',
        data:{
          year:that.data.date.year,
          month: that.data.date.month,
          date:that.data.date.date,
          rId:that.data.rId
        },
      })
      .then(res=>{
        detail=res.result.data
        for(let x=0;x<detail.length;x++){
          schedule.push(detail[x].schedule)
        }
        that.setData({
          roomSchedule:schedule
        })  
        console.log('roomDetail',that.data.roomDetail)
     })
      .then(()=>{
        that.spareTime()
      })
      .then(()=>{
        var spare=that.data.spareTime,state=1,
        date=this.data.date,rId=this.data.rId
        console.log('spareTime',that.data.spareTime)
        for(let x=0;x<spare.length;x++){
          console.log((spare[x].s.h==spare[x].e.h&&spare[x].e.m-spare[x].s.m<30)||(spare[x].s.h+1==spare[x].e.h&&spare[x].s.m-spare[x].e.m<30))
          if((spare[x].s.h==spare[x].e.h&&spare[x].e.m-spare[x].s.m<30)||(spare[x].s.h+1==spare[x].e.h&&spare[x].s.m-spare[x].e.m<30)){
            state=0
            wx.cloud.init()
            wx.cloud.callFunction({
              name:'testify',
              data:{
                date:date,
                rId:rId,
                state:state
          }
            }).then(res=>{
              console.log(res)
            })
            break
          }
        }
      })
    },
})

