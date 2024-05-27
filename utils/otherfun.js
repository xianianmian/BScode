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

function customSort(arr, order) {
  let newArr = [];
  // console.log(arr,'arr')
  // console.log(order,'order')
  order.forEach(id => {
    let item = arr.find(obj => obj.id == id);
    if (item) newArr.push(item);
  });

  arr.forEach(item => {
    if (!newArr.includes(item)) newArr.push(item);
  });
  // console.log(newArr,'ss');
  return newArr;
}
module.exports = {
  getSqlOneData:getSqlOneData,
  customSort:customSort
}