// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const $ = db.command.aggregate

  return await db.collection('signIned').
  aggregate()
  .match({
    room_detail_id:event.room_detail_id
  })
  .lookup({
    from:'member',
    localField:'stuffId',
    foreignField:'openid',
    as:'signInedList',
  })
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$signInedList', 0]), '$$ROOT' ])
  })
  .project({
    signInedList:0,
    openid:0
  })
  .end()
  .then({
    success: function (res) {
      return res
    }
  })
}