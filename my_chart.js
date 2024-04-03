const ctx = document.getElementById('myChart');
const earning = document.getElementById('earning');
new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
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