import axios from 'axios';
import router from '../router';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// request.interceptors.request.use(
//   (config) => {
//     if (store.state.token) {
//       // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${store.state.token}`;
//     }
//     return config;
//   },
//   err => Promise.reject(err),
// );

request.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 202:
        return Promise.reject(new Error(response.data.message));
      default:
        break;
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  },
);

export default request;
