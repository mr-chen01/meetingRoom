// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = db.command
  return await db.collection('room_detail')
  .where({
    group:{
      stuffId:_.in([wxContext.OPENID])
    },
    signInCode:event.signInCode
  })
  .get({
    success:function(res){
      return res
    }
  })
}