import request from '@/utils/request'
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/login',
    method: 'get',
    data: {
      username,
      password
    }
  })
}
