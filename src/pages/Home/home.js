import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Home = () => {
  const tvChartRef = useRef();
  useEffect(() => {
    makeChart();
    // console.log(tvChartRef);
  });

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

    // sample data
    const data = [
      {
        time: "2020-05-09",
        open: 180.34,
        high: 180.99,
        low: 178.57,
        close: 179.85,
      },
      {
        time: "2020-05-10",
        open: 180.34,
        high: 190.99,
        low: 179.57,
        close: 185.31,
      },
      {
        time: "2020-05-11",
        open: 200.34,
        high: 190.99,
        low: 179.57,
        close: 185.31,
      },
      {
        time: "2020-05-12",
        open: 183.34,
        high: 190.99,
        low: 179.57,
        close: 185.31,
      },
      {
        time: "2020-05-13",
        open: 180.34,
        high: 190.99,
        low: 179.57,
        close: 185.31,
      },
    ];

    // line exemple
    // const lineSeries = chart.addLineSeries();
    // lineSeries.setData([
    //   { time: "2019-04-11", value: 80.01 },
    //   { time: "2019-04-12", value: 96.63 },
    //   { time: "2019-04-13", value: 76.64 },
    //   { time: "2019-04-14", value: 81.89 },
    //   { time: "2019-04-15", value: 74.43 },
    //   { time: "2019-04-16", value: 80.01 },
    //   { time: "2019-04-17", value: 96.63 },
    //   { time: "2019-04-18", value: 76.64 },
    //   { time: "2019-04-19", value: 81.89 },
    //   { time: "2019-04-20", value: 74.43 },
    // ]);

    // candle exemple
    let candleSeries = chart.addCandlestickSeries();
    candleSeries.setData(data);
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
