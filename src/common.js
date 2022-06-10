// 숫자 세자리마다 콤마 표시
const comma = (str) => {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
};

const uncomma = (str) => {
  return str.replaceAll(",", "");
};

export { comma, uncomma };
