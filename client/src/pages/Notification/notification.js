import React, { useState } from "react";
import NumberFormat from "react-number-format";
import styles from "./notification.module.css";

const Notifications = () => {
  const [notiName, setNotiName] = useState("총 평가");
  const [notiPrice, setNotiPrice] = useState("0");

  // TODO: 알림 도달시 공지
  const notify = () => {
    Notification.requestPermission().then(function (result) {
      const title = "지정가 도달";
      const options = {
        body: `${notiName} ${notiPrice} 도달`,
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIxtxsTyFb7mB1pH-KQ9OQZZ7DsxlQ50qXg&usqp=CAU",
      };

      if (result === "granted") {
        return new Notification(title, options);
      } else {
        alert("알림 권한을 허용해주세요.");
      }
    });
  };

  // 알림 등록
  const setNotification = () => {
    if (!("Notification" in window)) {
      alert("이 브라우저는 알림 기능을 지원하지 않습니다.");
      return;
    }

    Notification.requestPermission().then(function (result) {
      console.log("Notification 상태", result);
      const title = "지정가 등록";
      const options = {
        body: `${notiName} ${notiPrice} 등록 완료`,
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIxtxsTyFb7mB1pH-KQ9OQZZ7DsxlQ50qXg&usqp=CAU",
        // icon: `${process.env.PUBLIC_URL}/logo192.png`,
      };

      if (result === "granted") {
        return new Notification(title, options);
      } else {
        alert(
          "도메인 좌측 자물쇠 아이콘을 클릭하여\n알림 권한을 허용해주세요."
        );
      }
    });
  };

  const onChangePrice = (e) => {
    // console.log(e.target.value);
    setNotiPrice(e.target.value);
  };

  const onClickList = (name) => {
    // console.log(name);
    setNotiName(name);
  };

  return (
    <div className="container mb-5">
      <h4 className="text-dark">지정가 알림 설정</h4>
      <div className="card shadow border-left-secondary m-5">
        <div className="card-body">
          <div className="m-5 mb-5">
            <div className="d-flex justify-content-start">
              <span className={`${styles.devider} text-muted`}>
                알림 내용 :
              </span>
              <span className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle text-dark"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {notiName}
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      onClickList("총 평가");
                    }}
                  >
                    총 평가
                  </div>
                  <div
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      onClickList("평가손익");
                    }}
                  >
                    평가손익
                  </div>
                  <div
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      onClickList("수익률");
                    }}
                  >
                    수익률
                  </div>
                </div>
              </span>
            </div>

            <div className={`${styles.groupLine} input-group input-group-sm`}>
              <NumberFormat
                className={`${styles.priceInput} avgPrice bg-light form-control`}
                placeholder="지정가 입력"
                name="avgPrice"
                type="tel"
                thousandSeparator={true}
                onChange={onChangePrice}
                // value={stock.avgPrice ? stock.avgPrice : null}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={setNotification}>
                  알림 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
