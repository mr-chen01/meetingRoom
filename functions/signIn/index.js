// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event.room_detail_id,wxContext.OPENID)
  return await db.collection('signIned')
  .add({
    data:{
      room_detail_id:event.room_detail_id,
      stuffId:wxContext.OPENID
    }
  }
  )
  .then(res=>{
    return res
  })
}