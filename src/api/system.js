import request from './request'
const getSystemDistrictList = async (param) => {
  let result = await request.post('/system/getSystemDistrictList', param)
  if (result.code === 0) {
    return result.data
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

export {
  getSystemDistrictList,
}
