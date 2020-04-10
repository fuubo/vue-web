import request from './request'
let OSS = require('ali-oss');

const login = async (loginData) => {
  let result = await request.post('/login/login', loginData)
  if (result.code === 0) {
    return result
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

const logout = async () => {
  let result = await request.post('/logout')
  return result
}

const getUser = async () => {
  let result = await request.post('/login/currentUser')
  if (result.code === 0) {
    return result
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

const getValidateCode = async (param) => {
  let result = await request.post('/login/getValidateCode', param)
  if (result.code === 0) {
    return result
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

const checkCaptcha = async (param) => {
  let result = await request.post('/login/checkCaptcha', param)
  if (result.code === 0) {
    return result
  } else {
    throw {
      code: 100,
      message: result.message
    }
  }
}

const getAliOssToken = async () => {
  let token = window.localStorage.getItem('ossToken')
  if (token) {
    token = JSON.parse(token)
    let expire = new Date(token.expiration)
    let now = new Date()
    if (expire > now) {
      return token
    } else {
      token = null
    }
  }

  if (!token) {
    let result = await request.post('/aliOss/getToken')
    if (result.code === 0) {
      window.localStorage.setItem('ossToken', JSON.stringify(result.data))
      return result.data
    } else {
      throw {
        code: 100,
        message: result.message
      }
    }
  }
}


const uploadOSS = async (url, file, bucket) => {
  let data = await getAliOssToken()
  bucket = bucket || 'b-picture'
  let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
    bucket: bucket,
    secure: true
  });
  let type = file.name.split(".").pop();
  let result = await client.put(url + "." + type, file);
  return result.url;
}


const getOSSfile = async (url) => {
  let data = await getAliOssToken()
  let client = new OSS({
    region: 'oss-cn-zhangjiakou',
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
    bucket: 'retry-image',
    secure: true
  });
  let result = await client.signatureUrl(url);
  return result
}

export {
  login,
  logout,
  getUser,
  getValidateCode,
  checkCaptcha,
  getAliOssToken,
  uploadOSS,
  getOSSfile,
}
