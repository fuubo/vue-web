import request from './request'

const getActivityInfo = async (id) => {
  let result = await request.post('/activity/info/'+id)
  if (result.code === 0) {
    return result.data
  } else {
    throw {
      code: 100,
      message: result.message
    }
  } 
}

const getActivityList = async () => {
  let result = await request.post('/activity/list')
  if (result.code === 0) {
    return result.data
  } else {
    throw {
      code: 100,
      message: result.message
    }
  } 
}

const getActivityCategoryMap = async (params) => {
    let result = await request.post('/activity/getActivityCategoryMap', params);
    if (result.code === 0) {
        return result.data;
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
