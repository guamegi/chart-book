// const [ws, removeWebSocket] = useState([]);
import { comma, uncomma, getTime } from "common";
import { myLineChart, set_linechart } from "../chart/area";
import { myPieChart, set_piechart } from "../chart/pie";

let ws = [];
let interval = null;
// 업비트 웹소켓 통신 시작함
const initWebSocket = (code = "BTC", codes = "KRW-BTC") => {
  // request data
  const json = [{ ticket: "ticket" }, { type: "ticker", codes: [codes] }];

  // 웹소켓 생성
  const websocket = new WebSocket("wss://api.upbit.com/websocket/v1");
  websocket.binaryType = "blob";
  ws.push(websocket);
  //   removeWebSocket((socket) => [...socket, websocket]);

  if (interval) {
    clearInterval(interval);
  }
  // console.log("interval:", interval);
  // 로딩 후 처음 차트 생성
  setTimeout(function () {
    set_linechart();
    set_piechart();
  }, 1000);

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
      // console.log(result);

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
            allEvalNum += parseFloat(uncomma(e.innerText));
          });
          totalEval.textContent = comma(allEvalNum.toFixed(0));

          // total profit 계산
          const allProfitEl = document.querySelectorAll(".profit");
          let allProfitNum = 0;
          allProfitEl.forEach((e) => {
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
          // input 두개에 값 없으면 "0" 표시
          evalPrice.textContent = "0";
          profit.textContent = "0";
          profitRate.textContent = "0";
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

        // data 들어오고 한번만 실행
        if (!interval) {
          console.log("has not interval");
          interval = setInterval(function () {
            // myPieChart.options.animation.duration = 0;
            // set_linechart();
            // set_piechart();
            myLineChart.update();
            myPieChart.update();
          }, 3000);

          updateLineChart();
          updatePieChart();
        }
      }
    };
  };
  websocket.onerror = function (evt) {
    console.log("error");
  };
};

let lineInterval = null;
const updateLineChart = () => {
  if (lineInterval) return;
  let lineData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let xAxes = ["", "", "", "", "", "", "", "", "", "", "", ""];
  const totalEval = document.querySelector("#totalEval");

  lineInterval = setInterval(function () {
    lineData.shift();
    lineData.push(uncomma(totalEval.textContent));
    myLineChart.data.datasets[0].data = lineData;

    const time = getTime();
    xAxes.shift();
    xAxes.push(time);
    myLineChart.data.labels = xAxes;

    myLineChart.update();
  }, 5000);
};

let pieInterval = null;
const updatePieChart = () => {
  if (pieInterval) return;
  const totalEval = document.querySelector("#totalEval");
  const dataTable = document.querySelector("#dataTable");
  // console.log(dataTable.childNodes);

  // 추가된 종목들의 평가금액 가져와서 비율 계산한 다음 데이터 넣기
  pieInterval = setInterval(function () {
    let pieData = [];
    let pieCode = [];
    for (let i = 0; i < dataTable.childNodes.length; i++) {
      // console.log(dataTable.childNodes[i].id);
      const stockCode = dataTable.childNodes[i].id;
      const stockEl = document.querySelector(`#${stockCode}-eval`);
      if (!stockEl) return; // 다른 화면 전환시 에러. 예외처리
      const price =
        (uncomma(stockEl.textContent) / uncomma(totalEval.textContent)) * 100;
      pieData.push(price.toFixed(0));
      pieCode.push(stockCode);
    }
    // console.log(pieData);
    myPieChart.data.datasets[0].data = pieData;
    myPieChart.data.labels = pieCode;
    myPieChart.update();
  }, 5000);
};

// ws 제거용
const removeWebSocket = (index) => {
  ws.forEach((socket, idx) => {
    if (index === idx) {
      //   console.log(index, idx, ws, socket);
      socket.close();
    }
  });
  ws.splice(index, 1);
};

const removeAllWebSocket = () => {
  ws.forEach((socket) => {
    socket.close();
  });
  ws = [];
};

export { ws, removeWebSocket, removeAllWebSocket, initWebSocket };
