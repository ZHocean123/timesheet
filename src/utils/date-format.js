export function format(date, str) {
  let formatStr = str || 'yyyy-MM-dd';
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(formatStr)) {
    formatStr = formatStr.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(formatStr)) {
      formatStr = formatStr.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  });
  return formatStr;
}

export function lastMonthDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (month === 0) {
    return new Date(year - 1, 11, 1);
  }

  return new Date(year, month - 1, 1);
}

export function nextMonthDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (month === 11) {
    return new Date(year + 1, 0, 1);
  }

  return new Date(year, month + 1, 1);
}
