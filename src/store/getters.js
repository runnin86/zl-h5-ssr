import md5 from 'md5'
// import util from './../utils'

export const baseParam = state => {
  let param = null
  let uid = 0
  // if (util.getStore('zlUser')) {
  //   uid = JSON.parse(util.getStore('zlUser')).user_id
  // }
  let timestamp = Date.parse(new Date()) / 1000
  let md5Str = md5(uid + '' + timestamp + 'NhH$ApI')
  param = {
    uid: uid,
    timestamp: timestamp,
    sign: md5Str
  }
  return param
}
