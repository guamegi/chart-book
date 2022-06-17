import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
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
  };

  return (
    <div className="container">
      <div className="col">
        <h3 className="text-dark mb-4">KOSPI</h3>
        <div id="tvChart" ref={tvChartRef}></div>
      </div>
    </div>
  );
};

export default Home;
