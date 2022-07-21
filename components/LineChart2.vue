<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart2',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    dataSetOne: {
      type: Array,
      required: true
    },
    labelOne: {
      type: String,
      required: true
    },
    chartLabels: {
      type: Array,
      required: true
    },
    dataSetTwo: {
      type: Array,
      required: false
    },
    labelTwo: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      chartData: {
        labels: this.chartLabels,
        datasets: [
          {
            label: this.labelOne,
            borderColor: '#49fb35',
            pointBackgroundColor: '#49fb35',
            borderWidth: 2,
            pointBorderColor: 'transparent',
            backgroundColor: 'transparent',
            data: this.dataSetOne
          },
          {
            label: this.labelTwo,
            borderColor: '#1F51FF',
            pointBackgroundColor: '#1F51FF',
            borderWidth: 2,
            pointBorderColor: 'transparent',
            backgroundColor: 'transparent',
            data: this.dataSetTwo
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>