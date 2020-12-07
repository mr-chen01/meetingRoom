// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const $ = db.command.aggregate
  console.log('openid',wxContext.OPENID)
  return await db.collection('member_detail')
  .aggregate()
  .match({
    openid:wxContext.OPENID
  })
  .lookup({
    from:'room_detail',
    localField:'room_detail_id',
    foreignField:'_id',
    as:'member_room',
  })
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$member_room', 0]), '$$ROOT' ])
  })
  .project({
    member_room:0
  })
  .match({
    date:{
      date:event.date,
      month:event.month,
      year:event.year
    }
  })
  .end()
  .then({
    success: function (res) {
      return res
    }
  })
}