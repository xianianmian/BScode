const app = getApp()

function getSqlOneData(Arr){
  const userid = app.globalData.userInfo.userId
  return Arr.map(x => {
    const { buyTime, num, id, tlove, txing } = x
    return {
      userid: userid,
      goodsid: id,
      zamount: num,
      ztime: buyTime,
      isfavorite: tlove,
      goodsrate: txing
    }
  })
}
module.exports = {
	getSqlOneData:getSqlOneData
}