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
  },
  data () {
      return {
        options: {
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
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 5,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.chartData
          },
          {
            label: this.labelTwo,
            borderColor: '#FF0000',
            pointBackgroundColor: 'white',
            borderWidth: 5,
            pointBorderColor: '#FF0000',
            backgroundColor: 'transparent',
            data: this.chartDataTwo
          }
        ]
      }, this.options)
  },
};
</script>