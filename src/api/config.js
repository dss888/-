// axios的基础配置
import axios from 'axios'

// 1. 配置基础的请求路径【后端解决的跨域】
axios.defaults.baseURL = 'http://127.0.0.1:5000';

// 2. 模拟token
// localStorage.setItem('token','agsudiqye98qwhdawhdiashdioahiophdias');

// 3. axios 请求拦截器【token】
axios.interceptors.request.use(function (config) {
  // 放入token信息
  let token = localStorage.getItem('token'); // jwt-密钥，加密的内容-id-过期时间
  if(token){
    config.headers.Authorization = "Bearer "+token;
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 4. axios请求拦截器【拦截错误信息】
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.state == 401){
      localStorage.clear();
      	window.location.reload();
    }
  	return response
  }, function (error) {
    console.log('error',error.status)
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 5.导出的接口
export default axios;