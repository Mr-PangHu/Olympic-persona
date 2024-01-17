import MockRequest from './mockRequest'
import KnowRequest from './KnowRequest'
// 服务器数据
// http://172.20.137.141:8080/api/foods/firstclass
export const reqGetFirstClass = () => KnowRequest.get('/foods/firstclass')

// 获取第二大类的数据
export const reqGetSecondClass = (firstclass) => {
  return KnowRequest({
    url: `/foods/secondclass?firstclass=${firstclass}`,
    method: 'get'
  })
}

// 获取具体食物
export const reqGetFoodName = (data) => {
  return KnowRequest({
    url: '/foods/getbyclass',
    method: 'get',
    params: data
  })
}

// 根据食物id获取对应的详细信息
export const regGetFoodDetail = (foodId) => {
  return KnowRequest({
    url: `/foods/getbyid/${foodId}`,
    method: 'get'
  })
}

// export const searchAPI = (query) => {
//   const CancelToken = axios.CancelToken
//   const source = CancelToken.source()
//   request.post('http://127.0.0.1/80/api/post',{
//       cancelToken: source.token,
//       data: {
//           name: 'zhangsan',
//           age: 18
//       }
//     }
//   ).then((res) => {
//     console.log('res',res);
//   })
//   source.cancel('取消请求')
// }
/**
 * 注册接口
 * @param {*} param0 { username: 用户名, password: 密码 }
 * @returns Promise对象
 */
// export const registerAPI = ({ username, password, repassword }) => {
//   return requests({
//     url: '/api/reg',
//     method: 'post',
//     data: {
//       username,
//       password,
//       repassword
//     }
//   })
// }

/**
 * 登录接口
 * @param {*} param0 { username: 用户名, password: 密码 }
 * @returns Promise对象
 */
// export const loginAPI = ({ username, password }) => {
//   return request({
//     url: '/api/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

/**
 * 请求食物名称接口
 */
// export const reqDishesName = () =>{
//   return requests({
//     url:'/dishes/key',
//     method:'get'
//   })
// }
export const reqDishesName = () => {
  return MockRequest({
    url: '/dishes',
    method: 'get'
  })
}
/**
 * 请求模糊查询后的食物名称接口
 */
// export const reqDishesVageName = (keyword) =>{
//   return requests({
//     url:'/dishes/key',
//     method:'get',
//     data: keyword
//   })
// }
// export const reqDishesVageName = (keyword) =>{
//   return MockRequest({
//     url:'/dishes/key',
//     method:'get',
//     data: keyword
//   })
// }
/**
 * 请求餐次记录接口 传的参数是intake_record对象
 */
// export const reqMeals = (intake_record) =>{
//   return requests({
//     url:'/meals/accept',
//     method:'post',
//     data: intake_record
//   })
// }
export const reqMeals = (intakeRecord) => {
  return MockRequest({
    url: '/meals',
    method: 'post',
    data: intakeRecord
  })
}
