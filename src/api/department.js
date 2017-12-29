import request from '../utils/request';

export function getDepartments() {
  return request({
    url: '/common/resources/departments',
    method: 'get',
  });
}

export function logout() {}
