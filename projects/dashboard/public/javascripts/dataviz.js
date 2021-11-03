const usersPerGenderChart = document.getElementById("usersPerGenderChart");
const messagesStatusChart = document.getElementById("messagesStatusChart");
const shippingStatusChart = document.getElementById("shippingStatusChart");
const revenuesChart = document.getElementById("revenuesChart");

// Gender chart
const labelsGenders = ["Homme", "Femme"];
const dataGenders = {
  labels: labelsGenders,
  datasets: [
    {
      label: "Répartition par genre",
      data: [
        usersPerGenderChart.dataset.male,
        usersPerGenderChart.dataset.female,
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

const configGenders = {
  type: "bar",
  data: dataGenders,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

new Chart(usersPerGenderChart, configGenders);

// Messages chart
const dataMessagesStatus = {
  labels: ["Lu", "Non lu"],
  datasets: [
    {
      label: "Nombre de messages lus et non lus",
      data: [
        messagesStatusChart.dataset.read,
        messagesStatusChart.dataset.unread,
      ],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
      hoverOffset: 4,
    },
  ],
};

const configMessagesStatus = {
  type: "doughnut",
  data: dataMessagesStatus,
};

new Chart(messagesStatusChart, configMessagesStatus);

// Orders shipping chart
const dataShippingStatus = {
  labels: ["Envoyé", "Non envoyé"],
  datasets: [
    {
      label: "Statut d'expédition des commandes payées",
      data: [
        shippingStatusChart.dataset.shipped,
        shippingStatusChart.dataset.notshipped,
      ],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const configShippingStatus = {
  type: "pie",
  data: dataShippingStatus,
};

new Chart(shippingStatusChart, configShippingStatus);

// Revenues chart
const revenues = JSON.parse(revenuesChart.dataset.revenues);
const revenuesArray = [];

for (let i = 0; i < 12; i++) {
  let total = 0;
  for (let j = 0; j < revenues.length; j++) {
    if (revenues[j]._id.month === i) total = revenues[j].total;
  }
  revenuesArray.push(total);
}

const labelsRevenues = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const dataRevenues = {
  labels: labelsRevenues,
  datasets: [
    {
      label: "CA mensuel",
      data: revenuesArray,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const configRevenues = {
  type: "line",
  data: dataRevenues,
};

new Chart(revenuesChart, configRevenues);
