<template>
  <div>
  <p>hello</p>
  {{ path }}
  {{ profitsByUserAndBot}}
  <LineChart
    :chart-labels="chartLabels"
    :chart-data="chartData"
  />
  </div>
</template>

<script>
import { profitsByUserAndBot } from '~/apollo/queries/fetchProfits'

export default {
  data() {
    return {
      profitsByUserAndBot: [],
      chartData: {
          datasets: [{
            label: 'Title',
            data: [45, 55, 48, 35, 12]
          }]
        },
      chartLabels: [2, 3]
    }
  },
  computed: {
    path() {
      return this.$route.path.split('/')[2]
    }
  },
  apollo: {
    profitsByUserAndBot: {
      query: profitsByUserAndBot,
      variables() {
        return {
          username: 'mockuser',
          botname: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
        }
      }
    }
  }
}
</script>