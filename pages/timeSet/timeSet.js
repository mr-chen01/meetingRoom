// pages/timeSet/timeSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    sIndex:[0,0],
    sRange:[[8,9,10,11,12,13,14,15,16,17,18,19,20],['00','10','20','30','40','50','60']],
    sRangeM:[],
    eIndex:['0','0'],
    eRange:[['8','9','10','11','12','13','14','15','16','17','18','19','20'],['00','10','20','30','40','50','60']],
    roomSchedule:[{s:{h:'8',m:'00'},e:{h:'8',m:'00'}}],
    spareTime:[],
    startTime:{},
    roomDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    that.setData({
      roomSchedule:JSON.parse(options.schedule).length!=0?JSON.parse(options.schedule):that.data.roomSchedule,
      date:JSON.parse(options.date),
      pId:options.pId,
      rId:options.rId,
      priority:options.priority,
    })
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
    var schedule=this.data.roomSchedule
    var spare=[]
    let temp
    let sRange=[]
    temp=schedule[0]
      for(let j=0;j<schedule.length;j++)
      {  
          if(schedule[j+1]!=null && schedule[j].e.h==schedule[j+1].s.h&&schedule[j].e.m==schedule[j+1].s.m){
              temp.s=schedule[j+1].e
            }
            else if(schedule[j+1]==null&&temp.e.h!='20'){
              temp.e={h:20,m:'00'}
              spare.push(temp)
              temp=schedule[j+1]
            }
            else{
              temp.e=schedule[j+1].s
              spare.push(temp)
              temp=schedule[j+1]
            }
      }
          this.setData(
            {
              spareTime:spare
            }
          )

   },

   startTime:function(){
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
        while(temp<=eh[i]){
          sRangeH.push(temp)
          temp++
        }
      } 
      sRange[0]=sRangeH
      for(let i=0;i<sRangeH.length;i++){//分钟
        let temp=[]
        for(let j=0;j<spare.length;j++){
          if(sRangeH[i]==spare[j].s.h){//头
            if(sRange[i]!=spare[j].e.h)
              {
                for(let m=Number(spare[j].s.m);m<60;m+=10){
                  if(m==0)
                    temp.push('00')
                  else
                    temp.push(m)
                }
              sRangeM.push(temp)
              break
            }else
              {
                for(Number(spare[j].s.m);temp<=spare[j].e.h;m+=10)
              {
                if(m==0)
                    temp.push('00')
                  else
                    temp.push(m)
              }
              sRangeM.push(temp)
              break
            }
          } else if(sRangeH[i]>spare[j].s.h&&sRangeH[i]<spare[j].e.h){//中间
            for(let m=0;m<60;m+=10)
            {
              if(m==0)
                    temp.push('00')
                  else
                    temp.push(m)
            }
            sRangeM.push(temp)
            break
          }
          else if(sRangeH[i]==spare[j].e.h){//尾
            {
              for(let m=0;m<=spare[j].e.m;m+=10){
                if(m==0)
                temp.push('00')
              else
                temp.push(m)
            }
            sRangeM.push(temp)
            break
          }
            
              }
          else continue
            }
        }
        sRange[1]=sRangeM[0]
      this.setData(
        {
          sRange:sRange,
          sRangeM:sRangeM
        }
      )
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
    var sRange=this.data.sRange,sIndex=this.data.sIndex,spare=this.data.spareTime,eRange=[[],[]],eRangeM=[],sRangeM=this.data.sRangeM.concat(), eIndex=this.data.eIndex
    var startH=sRange[0][sIndex[0]],startM=sRange[1][sIndex[1]]
    var i=0,id=sIndex[0]
    while(i<spare.length){//抽出空闲时间段开始时间以及以后的时间段
      if(spare[i].s.h<=startH&&spare[i].e.h>=startH){
        for(let j=startH;j<=spare[i].e.h;j++){
          eRange[0].push(j)
          eRangeM.push(sRangeM[id].concat())
          id++
        }
        break
      }
      i++
    }
    for(let temp=eRangeM[0][0];temp<=startM;temp+=10){
      eRangeM[0].splice(0,1)
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
      s={h:sRange[0][start[0]].toString(),m:sRange[1][start[1]].toString()},e={h:eRange[0][end[0]].toString(),m:eRange[1][end[1]].toString()}


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
            title:title
          }
        })
        .then(res=>{
          console.log('success')
          })
      }
      
    },
    
})

