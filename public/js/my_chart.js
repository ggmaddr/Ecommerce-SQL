
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
      label: 'Sales of Month',
      data: monthlySales,
      borderWidth: 1,
      backgroundColor:[
        'rgba(255, 99, 132, 0.5)',
      'rgba(255, 159, 64, 0.5)',
      'rgba(255, 205, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(201, 203, 207, 0.5)'
      ]
    }]
  },
  options: {
      responsive: true,
    }
});
// Big category sales chart
let catSales;
await fetch("http://localhost:3000/data/salesByCats")
  .then(response => response.json())
  .then(data => {
    catSales = data
  });
  




const data = {
  labels: ['Jan','Feb','Mar','Apr', 'May','Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Bread',
    data: catSales.bread,
    fill: false,
    
    borderColor: 'rgb(245, 40, 145)',
    
  },
  {
    label: 'Pudding',
    data: catSales.pudding,
    fill: false,
    borderColor: 'rgba(64, 10, 255, 1)',
  },
  {
    label: 'Crepes',
    data: catSales.crepes,
    fill: false,
    borderColor: 'rgba(255, 232, 10, 0.8)',
  },
  {
    label: 'Box set',
    data: catSales.boxset,
    fill: false,
    borderColor: '#00ab3f',
  },
]
};
const delayBetweenPoints = 300;

new Chart(progress, {
  type: 'line',
  data: data,
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.3,
        to: 0,
        loop: true
      },
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
          return ctx.index * delayBetweenPoints;
        }
      },
    },
    hoverRadius: 12,
    interaction: {
      mode: 'nearest',
      axis: 'x'
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 10000
      }
    }
  }
});


  
