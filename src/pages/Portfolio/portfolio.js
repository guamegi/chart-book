import React from "react";

const Portfolio = (props) => {
  return (
    <div className="container">
      <div className="row">
        {/* 총 매수 */}
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-primary py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-primary font-weight-bold mb-1">
                    <span>총 매수</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                    <span>0</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-wallet fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 총 평가 */}
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-success py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-success font-weight-bold mb-1">
                    <span>총 평가</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                    <span>0</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 평가 손익 */}
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-info py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-info font-weight-bold mb-1">
                    <span>평가손익</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                    <span>0</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 수익률 */}
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-left-warning py-2">
            <div className="card-body">
              <div className="row align-items-center no-gutters">
                <div className="col mr-2">
                  <div className="text-uppercase text-warning font-weight-bold mb-1">
                    <span>수익률</span>
                  </div>
                  <div className="text-dark font-weight-bold h5 mb-0">
                    <span>0</span>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-percentage fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        {/* <div className="col-xl-8 col-lg-7"> */}
        <div className="col-xl-7 col-md-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">자산 흐름</h6>
            </div>
            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <canvas id="myAreaChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Pie Chart --> */}
        <div className="col-xl-5 col-md-5">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">보유 비중</h6>
            </div>
            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2">
                <canvas id="myPieChart"></canvas>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary" id="legend1"></i>
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success" id="legend2"></i>
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-info" id="legend3"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* <!-- table --> */}
      {/* <!-- Page Heading --> */}
      <div className="row justify-content-between">
        <div>
          <button id="add_stock" className="btn btn-light ml-2">
            <i className="fas fa-plus mr-2"></i>
            Add new
          </button>
          <button id="remove_stock" className="btn btn-light text-danger ml-2">
            <i className="fas fa-trash mr-2"></i>
            Remove
          </button>
        </div>
        <div>
          <button id="get_data" className="btn btn-info ml-2">
            get data
          </button>
          <button id="stop_data" className="btn btn-danger ml-2">
            stop data
          </button>
        </div>
      </div>
      <hr />

      {/* <!-- DataTales Example --> */}
      <div className="row">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%">
            <thead className="thead-light">
              <tr>
                <th>종목</th>
                <th>현재가</th>
                <th>전일대비</th>
                <th>평균단가</th>
                <th>수량</th>
                <th>평가금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="name1">BTC</td>
                <td id="price"></td>
                <td>
                  <span id="rate"></span> <span id="change_price"></span>
                </td>
                <td id="btc_avgPrice"></td>
                <td id="btc_amount"></td>
                <td id="btc_eval"></td>
              </tr>
              <tr>
                <td id="name2">XVG</td>
                <td id="xvg_price"></td>
                <td id="xvg_rate"></td>
                <td id="xvg_avgPrice"></td>
                <td id="xvg_amount"></td>
                <td id="xvg_eval"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
