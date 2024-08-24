import request from '@/utils/request'

//登录接口
export const userLoginService = ({ managerName, password }) => {
  return request.post('/login', {
    managerName,
    password
  })
}

// 注册接口
export const userRegisterService = ({ managerName, password, repassword }) => {
  return request.post('/reg', {
    managerName,
    password,
    repassword
  })
}

// 获取用户详情信息
export const getUserDetailInfoService = (managerName) => {
  return request.get('/man', {
    params: {
      managerName
    }
  })
}
