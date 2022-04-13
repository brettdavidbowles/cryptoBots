<template>
  <div>
    <div
      v-if="botData.length && marketData.length"
      class="p-4"
    >
      <h2 class="text-2xl"> Bot: <span class="uppercase">{{ path}}</span></h2>
      <LineChart
        v-for="coin in coinsTraded"
        :key="coin"
        :chart-labels="mapDatesForXAxis(filterProfitsByCoin(coin, botData))"
        :chart-data="mapProfitsForYAxis(filterProfitsByCoin(coin, botData))"
        :label-one="coin"
        :chart-data-two="mapProfitsForYAxis(filterProfitsByCoin(coin, marketData))"
        label-two="Market Profit"
      />
    </div>
  </div>
</template>

<script>
import { profitsByUserAndBot } from '~/apollo/queries/fetchProfits'

export default {
  data() {
    return {
      botData: [],
      marketData: [],
      coinsTraded: ['Bitcoin', 'Ethereum', 'Litecoin']
    }
  },
  computed: {
    path() {
      return this.$route.path.split('/')[2]
    }
  },
  methods: {
    filterProfitsByCoin(coinName, data) {
      return data.filter(obj => obj.coin.name === coinName)
    },
    mapDatesForXAxis(profitsByCoinArray) {
      return profitsByCoinArray.map(x => x.date).sort()
    },
    mapProfitsForYAxis(profitsByCoinArray) {
      return profitsByCoinArray.map(x => x.profit)
    }

  },
  apollo: {
    botData: {
      query: profitsByUserAndBot,
      variables() {
        return {
          username: 'mockuser',
          botname: this.$route.path.split('/')[this.$route.path.split('/').length - 1]
        }
      }
    },
    marketData: {
      query: profitsByUserAndBot,
      variables() {
        return {
          username: 'mockuser',
          botname: 'mockmarketbot'
        }
      }
    }
  }
}
</script>