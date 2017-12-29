import request from '../utils/request';

export function getAppointments({
  current,
  rowCount,
  sort,
  searchPhrase,
  offset,
  limit,
  state,
  departmentId,
  startDate,
  endDate,
  type,
}) {
  return request({
    url: '/manager/resources/appointments',
    method: 'get',
    params: {
      current,
      rowCount,
      sort,
      searchPhrase,
      offset,
      limit,
      state,
      departmentId,
      startDate,
      endDate,
      type,
    },
  });
}

export function logout() {}
