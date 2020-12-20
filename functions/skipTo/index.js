// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var para='roomDetailId='+event.room_detail_id+'&signInCode='+event.signInCode
  try {
    const result = await cloud.openapi.wxacode.get({
        path: 'pages/qiandao/qiandao?'+para,
        width: 430
      })
    return result
  } catch (err) {
    return err
  }
}