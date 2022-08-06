<template>
  <div>
    <h1 class="text-2xl text-center">{{ $route.params.bot }}</h1>
    <div class="text-center m-8">
      <h2>Coins Traded:</h2>
      <div class="flex flex-col">
        <NuxtLink 
          v-for="coin in Coins"
          :key="coin.abbrev"
          :to="`${$route.params.bot}/${coin.abbrev}`"
          class="hover:text-blue-500"
        >
          {{ coin.name }} >
        </NuxtLink>
      </div>
      <div class="my-8">
        <h2>Cumulative Profit Percentages</h2>
        <BarChart
          v-if="showChart"
          class="capitalize"
          :chart-data="chartData"
          :chart-options="chartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { botHomePage } from '~/apollo/queries/fetchBarChartData.gql'

export default {
  data() {
    return {
      columnHeadings: [ 'ID', 'Buy Date/Time', 'Sold Date/Time', 'Buy Price', 'Sell Price', 'Current Price', 'Transaction Profit', 'Cumulative Profit', 'Market Profit' ],
      selectedCoin: '',
      loading: 0,
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawTicks: true,
              color: 'gray'
            }
          }
        },
        maintainAspectRatio: false,
        barValueSpacing: 5
      },
      botData: [],
      marketData: [],
      coinNames: []
    }
  },
  computed: {
    showChart() {
      return !!this.botData?.length
        && !!this.marketData?.length
        && !! this.coinNames?.length
    },
    chartData() { 
      return {
        labels: this.coinNames,
        datasets: [{
          label: 'Bot',
          data: this.botData,
          backgroundColor: [
            '#49fb35'
          ],
          categoryPercentage: 0.3
        },
        {
          label: 'Market',
          data: this.marketData,
          backgroundColor: [
            '#1F51FF'
          ],
          categoryPercentage: 0.3
        }]
      }
    }
  },
  apollo: {
    $loadingKey: 'loading',
    BarChartData: {
      query: botHomePage,
      variables() {
        return {
          botName: this.$route.params.bot
        }
      }
    },
    Coins: {
      query: botHomePage,
      variables() {
        return {
          botName: this.$route.params.bot
        }
      }
    }
  },
  watch: {
    BarChartData() {
      if (this.BarChartData[0]?.transactioncalculations?.cumulativeProfitMargin) {
        this.botData = this.BarChartData.map(({transactioncalculations: {cumulativeProfitMargin}}) => cumulativeProfitMargin * 100)
      }
      if (this.BarChartData[0]?.transactioncalculations?.marketProfitMargin) {
        this.marketData = this.BarChartData.map(({transactioncalculations: {marketProfitMargin}}) => marketProfitMargin * 100)
      }
    },
    Coins() {
      if (this.Coins?.length) {
        this.coinNames = this.Coins.map(({name}) => name)
      }
    }
  }
}
</script>