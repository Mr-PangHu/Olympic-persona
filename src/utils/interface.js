import MockRequest from './mockRequest'
import KnowRequest from './KnowRequest'
// 服务器数据
// http://172.20.137.141:8080/api/foods/firstclass
export const reqGetFirstClass = () => KnowRequest.get('/foods/firstclass')

// 获取第二大类的数据
export const reqGetSecondClass = firstclass => {
  return KnowRequest({
    url: `/foods/secondclass?firstclass=${firstclass}`,
    method: 'get'
  })
}

// 获取具体食物
export const reqGetFoodName = data => {
  return KnowRequest({
    url: '/foods/getbyclass',
    method: 'get',
    params: data
  })
}

// 根据食物id获取对应的详细信息
export const regGetFoodDetail = foodId => {
  return KnowRequest({
    url: `/foods/getbyid/${foodId}`,
    method: 'get'
  })
}

export const reqDishesName = () => {
  return MockRequest({
    url: '/dishes',
    method: 'get'
  })
}

// 点击“提交”接收餐次信息
export const reqDishes = intakeRecord => {
  return KnowRequest({
    url: '/meals/accept',
    method: 'post',
    data: intakeRecord
  })
}
// 根据名称关键词查询菜品信息——返回菜品所有信息，点击“食物名称”加载出所有成品菜
export const reqGetAllMeals = data => {
  return KnowRequest.get('/dishes/search', {
    params: {
      key: data
    }
  })
}
// 点击“提交”接收餐次信息
export const reqMain = userDate => {
  return KnowRequest({
    url: '/meals/ingredient',
    method: 'post',
    data: userDate
  })
}
