const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { ENV, OPENID, APPID } = cloud.getWXContext()
  const result= await cloud.database().collection('signIned')
  .where({
    room_detail_id:event.room_detail_id,
    stuffId:OPENID
  })
  .get()
  
  return {
    result,
    event,
    ENV,
    OPENID,
    APPID,
  }
}