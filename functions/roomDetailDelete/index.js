// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 云函数入口函数
exports.main = async (event, context) => {
  const { ENV, OPENID, APPID } = cloud.getWXContext()
  const result=await cloud.database().collection('room_detail')
  .where({
    _id:event.room_detail_id
  })
  .remove()
  return {
    event,
    result,
    ENV,
    OPENID,
    APPID,
  }
}