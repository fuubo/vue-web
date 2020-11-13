import request from './request'

const getActivityInfo = async (id) => {
  let result = await request.post('/activity/info/' + id)
  if (result.code === 200) {
    return result.data
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

const getActivityList = async (param) => {
  let result = await request.post('/activity/list', param)
  if (result.code === 200) {
    return result.data
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

const getActivityCategoryMap = async (params) => {
  let result = await request.post('/activity/getActivityCategoryMap', params)
  if (result.code === 200) {
    return result.data
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

export {
  getActivityInfo,
  getActivityCategoryMap,
  getActivityList,
}
