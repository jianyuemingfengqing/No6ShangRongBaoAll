import { Message } from 'element-ui'
import cookie from 'js-cookie'

export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // let userInfo = cookie.get('userInfo')
    // if (userInfo) {
    //   // debugger
    //   userInfo = JSON.parse(userInfo)
      // config.headers['token'] = userInfo.token
    // }
    let token = localStorage.getItem('SRB-TOKEN')
    if(token){
      config.headers['token'] = token
    }
    console.log('Making request to ' + config.url)
  })

  $axios.onRequestError((error) => {
    console.log('onRequestError', error) // for debug
  })

  $axios.onResponse((response) => {
    console.log('Reciving resposne', response)
    if (response.data.code === 0) {//后端响应成功
      return response //放行
    } else if (response.data.code === -211) {//后端解析jwt token失败
      console.log('用户校验失败')
      // debugger
      // cookie.set('userInfo', '')
      // 前端访问一个需要登录才可以访问的接口时  token失效或者被篡改 才会返回-211
      //删除前端缓存的token 和用户信息
      localStorage.removeItem('userInfo')
      localStorage.removeItem('SRB-TOKEN')
      window.location.href = '/login?errorCode=211'
      //不放行响应结果
      return Promise.reject(response)
    } else {
      Message({
        message: response.data.message,
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(response)
    }
  })

  //通信失败
  $axios.onResponseError((error) => {
    console.log('onResponseError', error) // for debug
  })
}
