// const [ws, removeWs] = useState([]);

let ws = [];
// ws 제거용
const removeWs = (index) => {
  ws.forEach((socket, idx) => {
    if (index === idx) {
      //   console.log(index, idx, ws, socket);
      socket.close();
    }
  });
  ws.splice(index, 1);
};

const removeAllWs = () => {
  ws.forEach((socket) => {
    socket.close();
  });
  ws = [];
};

// 업비트 웹소켓 통신 시작함
const initWebSocket = (code = "BTC", codes = "KRW-BTC") => {
  // request data
  const json = [{ ticket: "ticket" }, { type: "ticker", codes: [codes] }];

  // 웹소켓 생성
  const websocket = new WebSocket("wss://api.upbit.com/websocket/v1");
  websocket.binaryType = "blob";
  ws.push(websocket);
  //   removeWs((socket) => [...socket, websocket]);

  // 콜백 이벤트 설정
  websocket.onopen = function (evt) {
    if (websocket.readyState === 1) {
      console.log("socket open");
      websocket.send(JSON.stringify(json));
    }
  };
  websocket.onclose = function (evt) {
    console.log("socket close");
  };
  websocket.onmessage = function (evt) {
    const reader = new FileReader();
    reader.readAsText(evt.data);
    reader.onload = function () {
      const result = JSON.parse(reader.result);
      console.log(result);

      // 특정 id에 실시간 데이터 표시
      const totalAmt = document.querySelector("#totalAmt");
      const totalEval = document.querySelector("#totalEval");
      const totalProfit = document.querySelector("#totalProfit");
      const totalProfitRate = document.querySelector("#totalProfitRate");

      const price = document.querySelector(`#${code}-price`);
      const changeRate = document.querySelector(`#${code}-changeRate`);
      const changePrice = document.querySelector(`#${code}-changePrice`);

      const avgPriceInput = document.querySelector(`#${code}-avgPrice`);
      const amountInput = document.querySelector(`#${code}-amount`);

      const evalPrice = document.querySelector(`#${code}-eval`);
      const profit = document.querySelector(`#${code}-profit`);
      const profitRate = document.querySelector(`#${code}-yield`);

      if (price) {
        price.textContent = comma(result.trade_price);
        // const cr_txt = result.change_rate.toFixed(2);
        const cr_txt = (result.change_rate * 100).toFixed(2);
        const cp_txt = comma(result.change_price);

        // input 두개에 값이 있으면, 평가금액/평가손익/수익률 갱신하기
        if (avgPriceInput.value && amountInput.value) {
          //   console.log(avgPriceInput.value, amountInput.value);
          evalPrice.textContent = comma(
            (uncomma(price.textContent) * uncomma(amountInput.value)).toFixed(0)
          );
          profit.textContent = comma(
            (
              uncomma(price.textContent) * uncomma(amountInput.value) -
              uncomma(avgPriceInput.value) * uncomma(amountInput.value)
            ).toFixed(0)
          );
          profitRate.textContent =
            (
              (uncomma(price.textContent) / uncomma(avgPriceInput.value)) *
                100 -
              100
            ).toFixed(2) + "%";

          // total amt 계산
          const allAvgPriceEl = document.querySelectorAll(".avgPrice");
          const allAmountEl = document.querySelectorAll(".amount");
          let avgPriceNum = [];
          let amountNum = [];
          let amtNum = 0;
          allAvgPriceEl.forEach((e) => {
            avgPriceNum.push(uncomma(e.value));
          });
          allAmountEl.forEach((e) => {
            amountNum.push(uncomma(e.value));
          });
          for (let i = 0; i < avgPriceNum.length; i++) {
            amtNum += avgPriceNum[i] * amountNum[i];
          }
          totalAmt.textContent = comma(amtNum.toFixed(0));

          // total eval 계산
          const allEvalEl = document.querySelectorAll(".eval");
          let allEvalNum = 0;
          allEvalEl.forEach(function (e) {
            // console.log(e);
            allEvalNum += parseFloat(uncomma(e.innerText));
          });
          totalEval.textContent = comma(allEvalNum.toFixed(0));

          // total profit 계산
          const allProfitEl = document.querySelectorAll(".profit");
          let allProfitNum = 0;
          allProfitEl.forEach((e) => {
            // console.log(allProfitEl, e.innerText, uncomma(e.innerText));
            allProfitNum += parseFloat(uncomma(e.innerText));
          });
          totalProfit.textContent = comma(allProfitNum.toFixed(0));

          // total 수익률 계산
          totalProfitRate.textContent =
            (
              (uncomma(totalProfit.textContent) /
                uncomma(totalAmt.textContent)) *
              100
            ).toFixed(2) + "%";
        } else {
          evalPrice.textContent = "-";
          profit.textContent = "-";
          profitRate.textContent = "-";
        }
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

const uncomma = (str) => {
  return str.replaceAll(",", "");
};

export { ws, removeWs, removeAllWs, initWebSocket, comma };
