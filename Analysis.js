
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",    // one week  data
  "Sunday",
];
const timeSpent = [2, 3.5, 4, 1.5, 2.5, 0, 3]; 


const totalTime = timeSpent.reduce((total, hours) => total + hours, 0);
const averageTime = (totalTime / timeSpent.length).toFixed(2);
const maxTime = Math.max(...timeSpent);

// Update the summary text
document.getElementById(
  "totalTime"
).textContent = `Total Time Spent: ${totalTime} hours`;
document.getElementById(
  "averageTime"
).textContent = `Average Time Per Day: ${averageTime} hours`;
document.getElementById(
  "maxTime"
).textContent = `Max Time in a Day: ${maxTime} hours`;

// Bar chart data
const barChartData = {
  labels: daysOfWeek,
  datasets: [
    {
      label: "Time Spent (hours)",
      data: timeSpent,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(199, 199, 199, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(199, 199, 199, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Create the bar chart
var ctx = document.getElementById("weeklyBarChart").getContext("2d");
var weeklyBarChart = new Chart(ctx, {
  type: "bar",
  data: barChartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hours",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  },
});
