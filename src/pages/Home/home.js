import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { addIndexData } from "config/crawler";
import styles from "./home.module.css";

const Home = () => {
  const tvChartRef = useRef();
  // const [kospiData, setKospiData] = useState([]);
  let kospiData = [];

  useEffect(() => {
    const data = addIndexData();
    kospiData.push(data);

    makeChart();
  }, []);

  let chart = null;
  const makeChart = () => {
    // console.log("chart:", chart);
    if (chart) {
      chart.remove();
      chart = null;
    }
    // trading view 차트 생성
    chart = createChart(tvChartRef.current, {
      width: tvChartRef.current.offsetWidth,
      height: 500,
      layout: {
        // background: "#ffffff",
      },
      options: {
        responsive: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      // priceScale: {
      //   position: "right",
      // },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: true,
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
    // [['날짜', '시가', '고가', '저가', '종가', '거래량', '외국인소진율'],
    // ["20200811", 2396.11, 2429.36, 2396.11, 2418.67, 843437, 0.0],...]
    kospiData[0].then((datas) => {
      // 캔들 데이터 저장
      let candleArr = datas.map((data) => {
        // console.log(data);
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

        tempData.time = `${year}-${month}-${day}`;
        tempData.open = data[1];
        tempData.high = data[2];
        tempData.low = data[3];
        tempData.close = data[4];

        return tempData;
      });

      // 거래량 데이터 저장
      let histArr = datas.map((data) => {
        let tempData = {
          time: "",
          value: "",
        };
        // 날짜 string 변환
        const date = data[0];
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(date.length - 2, date.length);

        tempData.time = `${year}-${month}-${day}`;
        tempData.value = data[5];

        return tempData;
      });

      // 캔들 데이터 차트 셋팅
      candleArr.shift();
      let candleSeries = chart.addCandlestickSeries({
        upColor: "red",
        downColor: "blue",
        borderVisible: false,
        wickUpColor: "red",
        wickDownColor: "blue",
      });
      candleSeries.setData(candleArr);

      // 거래량 데이터 차트 셋팅
      histArr.shift();
      let histSeries = chart.addHistogramSeries({
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      histSeries.setData(histArr);
    });
  };

  // symbol (코스피, 코스닥, 선물) 클릭
  const onClickList = (symbol) => {
    // console.log(symbol);
    const data = addIndexData(symbol, "day");
    kospiData = [];
    kospiData.push(data);

    makeChart();
  };

  return (
    <div className="container">
      <div className="col">
        <nav className={"navbar navbar-expand"}>
          <div className="container d-flex flex-row">
            <ul className="nav navbar-nav text-dark">
              <li
                className={`${styles.navItem} mr-2`}
                role="presentation"
                onClick={() => {
                  onClickList("KOSPI");
                }}
              >
                <span className="text-muted">코스피</span>
              </li>
              <span className="text-muted">|</span>
              <li
                className={`${styles.navItem} ml-2 mr-2`}
                role="presentation"
                onClick={() => {
                  onClickList("KOSDAQ");
                }}
              >
                <span className="text-muted">코스닥</span>
              </li>
              <span className="text-muted">|</span>
              <li
                className={`${styles.navItem} ml-2`}
                role="presentation"
                onClick={() => {
                  onClickList("FUT");
                }}
              >
                <span className="text-muted">선물</span>
              </li>
            </ul>
          </div>
        </nav>
        <div className="card shadow py-2">
          <div className="card-body">
            <div id="tvChart" ref={tvChartRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
