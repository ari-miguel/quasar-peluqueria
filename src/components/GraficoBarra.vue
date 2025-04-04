<template>
  <div>

    <Bar :data="data" :options="options" />

  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: [40, 20, 12, 29, 90, 87, 45, 23, 45, 90, 12, 34],
    backgroundColor: "#f28689",
  }]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Ventas/Mes',
      color: '#0e2447',
      font: {
        size: 8
      },
      padding: {
        top: 2,
        bottom: 2
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#0e2447',
        font: {
          size: 6
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#0e2447',
        font: {
          size: 6
        }
      },
      grid: {
        color: '#5ea0fe'
      }
    }
  },
  layout: {
    padding: {
      top: 2,
      bottom: 2,
      left: 2,
      right: 2
    }
  }
}

</script>