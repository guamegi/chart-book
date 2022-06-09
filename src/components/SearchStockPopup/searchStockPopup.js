import React, { forwardRef } from "react";
import stockList from "services/stockList";
import styles from "./searchStockPopup.module.css";
import { initWebSocket } from "services/websocket";

const searchStockPopup = forwardRef((props, ref) => {
  // console.log(stockList);
  const { setModalOn, modalOn, stockData, setStockData } = props;

  // list 클릭
  async function onClickList(code) {
    // popup 닫기
    setModalOn(!modalOn);

    // 해당 코드의 실시간 시세 호출, table 추가
    // stockList 에 해당 code와 같은 오브젝트 추가하기
    let stock = stockList.find((list) => list.code === code);

    // 중복 코드는 생성 안함
    if (stockData.filter((e) => e.code === code).length > 0) {
      alert("동일한 종목이 존재합니다. 다시 선택해주세요!");
      return;
    }
    setStockData((list) => [...list, stock]);

    if (stock.category === "coin") {
      // coin 시세 호출
      await initWebSocket(stock.code, stock.codes);
    } else {
      // stock 호출
    }

    // add 하면 input 에 포커스
    const avgPriceInput = document.querySelector(`#${code}-avgPrice`);
    avgPriceInput.focus();
  }

  return (
    <div className={styles.container}>
      <div className="input-group">
        <input
          className="bg-light form-control small"
          type="text"
          placeholder="종목명 입력"
          ref={ref}
        />
        <div className="input-group-append">
          <button className="btn btn-primary py-0" type="button">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
      <div className={styles.stockList}>
        <ul>
          {stockList.map((stock) => (
            <li key={stock.code} onClick={() => onClickList(stock.code)}>
              <div className="row">
                <span className="col mr-2">{stock.name}</span>
                <span className="col-auto">
                  <small className="font-weight-light">{stock.code}</small>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default searchStockPopup;
