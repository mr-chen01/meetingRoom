// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('room_detail').add({
    data:{
      date:event.date,
      organiser:event.organiser,
      pId:event.pId,
      priority:event.priority,
      rId:event.rId,
      title:event.title,
      schedule:event.schedule
    },
    fail:res=>{
      console.log(res)
    }
  })

}