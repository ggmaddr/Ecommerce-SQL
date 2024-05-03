
const ctx = document.getElementById('myChart');
const earning = document.getElementById('earning');


let totalByCat;
let cats = []
let dataCat = []
await fetch("http://localhost:3000/data/totalByCategory")
  .then(response => response.json())
  .then(data => {
    // totalByCat = JSON.stringify(data);
    cats = data.map(item => item.category_name)
    dataCat = data.map(item => item.total_amount)
  });

let monthlySales;
await fetch("http://localhost:3000/data/salesByMonths")
  .then(response => response.json())
  .then(data => {
    monthlySales = data.map(item => item.total_sales)
  });
  
console.log(cats)

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: cats,
    datasets: [{
      label: 'Total Sales',
      data: dataCat,
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
      data: monthlySales,
      borderWidth: 1
    }]
  },
  options: {
      responsive: true,
    }
});
new Chart(progress, {
  type: 'bar',
  data: {
    labels: ['January','February','March','April', 'May','June', 'July', 'August', 'September','October', 'November', 'December'],
    datasets: [{
      label: 'earning',
      data: monthlySales,
      borderWidth: 1
    }]
  },
  options: {
      responsive: true,
    }
});

