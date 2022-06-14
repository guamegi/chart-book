import { Chart } from "chart.js";
// Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';

export var myDoughnutChart = null;
export function setDoughnutChart() {
  // Pie Chart
  var ctx = document.getElementById("myDoughnutChart");
  myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#4e73df",
            "#1cc88a",
            "#36b9cc",
            "#f57c10",
            "#ffff33",
            "#fc4514",
            "#f518f9",
            "#8a8a8a",
          ],
          hoverBackgroundColor: [
            "#2e59d9",
            "#17a673",
            "#2c9faf",
            "#c86710",
            "#cdcd25",
            "#c33813",
            "#ca14cd",
            "#6e6d6d",
          ],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: true,
        caretPadding: 10,
      },
      legend: {
        display: true,
        position: "right",
        align: "end",
      },
      cutoutPercentage: 70,
    },
  });
}
