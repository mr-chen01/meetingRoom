// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection('room_detail')
  .where({
    _id:event.room_detail_id
  })
  .get({
    success: function (res) {
      return res
    }
  })
}