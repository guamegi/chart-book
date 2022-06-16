import * as axios from "axios";
import { comma, uncomma } from "common";

// stock 크롤링
const getStockHtml = async (code) => {
  //   const stockUrl = `/domestic/stock/${code}/total`;
  const stockUrl = `/api/realtime/domestic/stock/${code}`;

  try {
    return await axios.get(stockUrl);
  } catch (error) {
    console.error(error);
  }
};

const addStockData = (code) => {
  getStockHtml(code).then((html) => {
    // console.log(html);
    const priceData = html.data.datas[0].closePrice;
    const changeRateData = html.data.datas[0].fluctuationsRatio;
    const changePriceData = html.data.datas[0].compareToPreviousClosePrice;
    const riseFallData = html.data.datas[0].compareToPreviousPrice.text;

    const totalAmt = document.querySelector("#totalAmt");
    const totalEval = document.querySelector("#totalEval");
    const totalProfit = document.querySelector("#totalProfit");
    const totalProfitRate = document.querySelector("#totalProfitRate");

    const price = document.querySelector(`#A${code}-price`);
    const changeRate = document.querySelector(`#A${code}-changeRate`);
    const changePrice = document.querySelector(`#A${code}-changePrice`);

    const avgPriceInput = document.querySelector(`#A${code}-avgPrice`);
    const amountInput = document.querySelector(`#A${code}-amount`);

    const evalPrice = document.querySelector(`#A${code}-eval`);
    const profit = document.querySelector(`#A${code}-profit`);
    const profitRate = document.querySelector(`#A${code}-yield`);

    if (price) {
      price.textContent = priceData;
      changeRate.textContent = changeRateData;
      changePrice.textContent = changePriceData;

      // input 두개에 값이 있으면, 평가금액/평가손익/수익률 갱신하기
      if (avgPriceInput.value && amountInput.value) {
        //   console.log(avgPriceInput.value, amountInput.value);
        evalPrice.textContent = comma(
          (uncomma(priceData) * uncomma(amountInput.value)).toFixed(0)
        );
        profit.textContent = comma(
          (
            uncomma(priceData) * uncomma(amountInput.value) -
            uncomma(avgPriceInput.value) * uncomma(amountInput.value)
          ).toFixed(0)
        );
        profitRate.textContent =
          (
            (uncomma(priceData) / uncomma(avgPriceInput.value)) * 100 -
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
            (uncomma(totalProfit.textContent) / uncomma(totalAmt.textContent)) *
            100
          ).toFixed(2) + "%";
      } else {
        // input 두개에 값 없으면 "0" 표시
        evalPrice.textContent = "0";
        profit.textContent = "0";
        profitRate.textContent = "0";
      }
      // style 변경
      if (riseFallData === "상승") {
        changeRate.textContent = `+${changeRateData}%`;
        changePrice.textContent = `+${changePriceData}`;
        price.style.color =
          changeRate.style.color =
          changePrice.style.color =
            "red";
      } else if (riseFallData === "하락") {
        changeRate.textContent = `${changeRateData}%`;
        changePrice.textContent = `${changePriceData}`;
        price.style.color =
          changeRate.style.color =
          changePrice.style.color =
            "blue";
      } else {
        changeRate.textContent = `${changeRateData}%`;
        changePrice.textContent = `${changePriceData}`;
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
  });
};

export { addStockData };
