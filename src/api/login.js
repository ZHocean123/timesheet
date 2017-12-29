import request from '../utils/request';

export function login({ username, password }) {
  return request({
    url: '/manager/api/login',
    method: 'post',
    data: JSON.stringify({ username, password }),
  });
}

export function logout() {}
