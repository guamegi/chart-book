import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { addIndexData } from "config/crawler";

const Home = () => {
  const tvChartRef = useRef();
  // const [kospiData, setKospiData] = useState([]);
  let kospiData = [];

  useEffect(() => {
    const data = addIndexData();
    kospiData.push(data);

    makeChart();
  }, []);

  // trading view 차트 생성
  const makeChart = () => {
    const chart = createChart(tvChartRef.current, {
      width: tvChartRef.current.offsetWidth,
      height: 400,
      layout: {
        // background: "#ffffff",
      },
      options: {
        responsive: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    // Make Chart Responsive with screen resize
    new ResizeObserver((entries) => {
      if (entries.length === 0 || entries[0].target !== tvChartRef.current) {
        return;
      }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ height: newRect.height, width: newRect.width });
    }).observe(tvChartRef.current);

    // kospi data Promise 분해, chart 데이터 세팅
    /*
    kospiData[0].then((datas) => {
      // console.log(datas);
      let newArr = datas.map((data) => {
        let tempData = {};
        // 날짜 string 변환
        const date = data.localDate;
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(date.length - 2, date.length);

        tempData.time = `${year}-${month}-${day}`;
        tempData.open = data.openPrice;
        tempData.high = data.highPrice;
        tempData.low = data.lowPrice;
        tempData.close = data.closePrice;

        return tempData;
      });
      // console.log("newArr:", newArr);
      let candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(newArr);
    });
    */

    // [['날짜', '시가', '고가', '저가', '종가', '거래량', '외국인소진율'],
    // ["20200811", 2396.11, 2429.36, 2396.11, 2418.67, 843437, 0.0],...]

    kospiData[0].then((datas) => {
      // console.log(datas, typeof datas);
      let newArr = datas.map((data, idx) => {
        // console.log(data, idx);
        // if (idx === 0) {
        //   return false;
        // }
        let tempData = {
          time: "",
          open: "",
          high: "",
          low: "",
          close: "",
        };
        // 날짜 string 변환
        const date = data[0];
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(date.length - 2, date.length);
        // console.log(date, year, month, day);
        tempData.time = `${year}-${month}-${day}`;
        tempData.open = data[1];
        tempData.high = data[2];
        tempData.low = data[3];
        tempData.close = data[4];
        // console.log(data);
        return tempData;
      });
      // console.log("newArr:", newArr);
      newArr.shift();
      let candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(newArr);
    });
  };

  return (
    <div className="container">
      <div className="col">
        {/* <h3 className="text-dark mb-4">KOSPI</h3> */}
        <div id="tvChart" ref={tvChartRef}></div>
      </div>
    </div>
  );
};

export default Home;
