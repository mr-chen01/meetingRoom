// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //order
      return await db.collection('room_detail').where({
        date:{
          year:event.year,
          month:event.month,
          date:event.date,
        },
        rId:event.rId
    })
    .orderBy('schedule.s.h','asc')
    .orderBy('schedule.s.m','asc')
    .get({
      success: function (res) {
        return res
      }
    });
  } catch (e) {
    console.error(e);
  }

}