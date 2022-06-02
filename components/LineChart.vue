<script>
import { Line } from "vue-chartjs/legacy";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  extends: Line,
  props: {
    chartData: {
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
    chartDataTwo: {
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
  data () {
      return {
        options: {
          plugins: {
            title: {
              display: true,
              text: this.title,
              font: {
                size: 18
              }
            }
          },
          scales: {
            yAxes: {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            },
            xAxes: {
              gridLines: {
                display: false
              }
            }
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
  mounted() {
    this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: this.labelOne,
            borderColor: '#355E3B',
            pointBackgroundColor: '#355E3B',
            borderWidth: 2,
            pointBorderColor: 'transparent',
            backgroundColor: 'transparent',
            data: this.chartData
          },
          {
            label: this.labelTwo,
            borderColor: '#FF0000',
            pointBackgroundColor: '#FF0000',
            borderWidth: 2,
            pointBorderColor: 'transparent',
            backgroundColor: 'transparent',
            data: this.chartDataTwo
          }
        ]
      }, this.options)
  },
};
</script>