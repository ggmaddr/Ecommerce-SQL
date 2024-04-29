const ctx = document.getElementById('myChart');
const earning = document.getElementById('earning');
// const {totalByCategoryQ} = require("../../app")

import("../../app.js").then(({ totalByCategoryQ}) => {
  console.log(totalByCategoryQ);
});
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      'Bread',
      'Crepes',
      'Budding',
      'Box set'
    ],
    datasets: [{
      label: 'Total Sales',
      data: [10663.50, 2604.00, 9390.00, 12679.00],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(31, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
});

new Chart(earning, {
    type: 'bar',
    data: {
      labels: ['January','February','March','April', 'May','June', 'July', 'August', 'September','October', 'November', 'December'],
      datasets: [{
        label: 'earning',
        data: [1200,1090,3000,5400,1220,3600,4800,4578,2556,8545,4587,9000],
        borderWidth: 1
      }]
    },
    options: {
        responsive: true,
      }
  });