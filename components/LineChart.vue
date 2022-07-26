<script>
import { Line } from "vue-chartjs/legacy";
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

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
              // text: this.title,
              font: {
                size: 18
              }
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'x',
                pan: {
                  enabled: true
                },
                drag: {
                  enabled: true
                }
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
          borderColor: '#49fb35',
          pointBackgroundColor: '#49fb35',
          borderWidth: 2,
          pointBorderColor: 'transparent',
          backgroundColor: 'transparent',
          data: this.chartData
        },
        {
          label: this.labelTwo,
          borderColor: '#1F51FF',
          pointBackgroundColor: '#1F51FF',
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