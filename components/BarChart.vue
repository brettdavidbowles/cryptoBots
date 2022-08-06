<template>
  <Bar 
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

export default {
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  }
}
</script>