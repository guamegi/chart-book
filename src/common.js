// 숫자 세자리마다 콤마 표시
const comma = (str) => {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
};

const uncomma = (str) => {
  return str.replaceAll(",", "");
};

const getTime = () => {
  const today = new Date();
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const seconds = ("0" + today.getSeconds()).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
};

export { comma, uncomma, getTime };
