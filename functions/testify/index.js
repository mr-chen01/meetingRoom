// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

    return await db.collection('room_detail').where({
          date:{
            year:event.date.year,
            month:event.date.month,
            date:event.date.date,
          },
          rId:event.rId
      }).update({
        data:{
          state:event.state
        },
        complete:res=>{
          
          return res
        }
      })

}