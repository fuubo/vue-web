export const LOGINAUTHTOKEN = 'AUTH_TOKEN' // token
export const USER = 'USER'

const ruleMessage = {
  phone: {
    required: '请输入手机号',
    length: '请输入至少8位密码'
  },
  checkpassword: {
    required: '请重新输入密码',
    notSame: '两次输入密码不一致'
  },
  email: {
    required: '请输入邮箱',
    right: '请输入正确的邮箱地址'
  }
}

export {ruleMessage}
