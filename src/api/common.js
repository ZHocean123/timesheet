import request from '../utils/request';

export function getHolidays(month) {
  return request({
    url: '/common/resources/dates',
    method: 'get',
    params: {
      month,
    },
  });
}

export function logout() {}
