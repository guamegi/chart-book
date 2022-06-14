import { Chart } from "chart.js";
// Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

export var myPieChart = null;
var eval_data = [100];
export function set_piechart() {
  // 평가금액 가져오기
  // const totalEval = document.querySelector("#totalEval");

  // TODO: test code
  //   var total_eval = parseInt(totalEval.textContent.replaceAll(",", ""));
  //   var asset1 = parseInt(
  //     document.querySelector(`#BTC-eval`).textContent.replaceAll(",", "")
  //   );
  //   var asset2 = parseInt(
  //     document.querySelector(`#DOGE-eval`).textContent.replaceAll(",", "")
  //   );
  //   var asset3 = parseInt(
  //     document.querySelector(`#RFR-eval`).textContent.replaceAll(",", "")
  //   );

  //   // 종목 비율 계산
  //   var asset1_rate = ((asset1 / total_eval) * 100).toFixed(0);
  //   var asset2_rate = ((asset2 / total_eval) * 100).toFixed(0);
  //   var asset3_rate = ((asset3 / total_eval) * 100).toFixed(0);

  // Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  myPieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: eval_data,
          backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
          hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        },
      ],
    },
    options: {
      //   animation: {
      //     duration: 0,
      //   },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false,
      },
      cutoutPercentage: 80,
    },
  });
}
