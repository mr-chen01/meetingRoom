// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('member')
  .where({
    openid:wxContext.OPENID
  })
  .get({
    success: function (res) {
      return res
    }
  })
}