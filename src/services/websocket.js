let ws = [];
// const [ws, rmWs] = useState([]);

const rmWs = () => {
  ws = [];
};

// 업비트 웹소켓 통신 시작함
const initWebSocket = (code, codes = "KRW-BTC") => {
  // request data
  const json = [{ ticket: "ticket" }, { type: "ticker", codes: [codes] }];

  // 웹소켓 생성
  const websocket = new WebSocket("wss://api.upbit.com/websocket/v1");
  websocket.binaryType = "blob";
  ws.push(websocket);
  //   rmWs((socket) => [...socket, websocket]);

  // 콜백 이벤트 설정
  websocket.onopen = function (evt) {
    if (websocket.readyState === 1) {
      websocket.send(JSON.stringify(json));
    }
  };
  websocket.onclose = function (evt) {
    console.log("socket close");
    rmWs();
  };
  websocket.onmessage = function (evt) {
    const reader = new FileReader();
    reader.readAsText(evt.data);
    reader.onload = function () {
      const result = JSON.parse(reader.result);
      console.log(result);

      // 특정 id에 실시간 데이터 표시
      const price = document.querySelector(`#${code}-price`);
      const changeRate = document.querySelector(`#${code}-changeRate`);
      const changePrice = document.querySelector(`#${code}-changePrice`);

      if (price) {
        price.textContent = comma(result.trade_price);
        const cr_txt = result.change_rate.toFixed(2);
        const cp_txt = comma(result.change_price);

        // style 변경
        if (result.change === "RISE") {
          changeRate.textContent = `+${cr_txt}%`;
          changePrice.textContent = `+${cp_txt}`;
          price.style.color =
            changeRate.style.color =
            changePrice.style.color =
              "red";
        } else if (result.change === "FALL") {
          changeRate.textContent = `-${cr_txt}%`;
          changePrice.textContent = `-${cp_txt}`;
          price.style.color =
            changeRate.style.color =
            changePrice.style.color =
              "blue";
        } else {
          changeRate.textContent = `${cr_txt}%`;
          changePrice.textContent = `${cp_txt}`;
          price.style.color =
            changeRate.style.color =
            changePrice.style.color =
              "black";
        }
        // price에 background 깜빡임 효과 주기
        price.style.background = "linen";
        // 0.1s 후에 background 원래대로
        setTimeout(function () {
          price.style.background = "white";
        }, 100);
      }
    };
  };
  websocket.onerror = function (evt) {
    console.log("error");
  };
};

// 숫자 세자리마다 콤마 표시
const comma = (str) => {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
};

export { ws, rmWs, initWebSocket };
