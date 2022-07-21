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
          {{ coin.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { coinsByBot } from '~/apollo/queries/fetchCoins.gql'

export default {
  data() {
    return {
      // TableData: [],
      Coins: [],
      columnHeadings: [ 'ID', 'Buy Date/Time', 'Sold Date/Time', 'Buy Price', 'Sell Price', 'Current Price', 'Transaction Profit', 'Cumulative Profit', 'Market Profit' ],
      selectedCoin: '',
      loading: 0
    }
  },
  apollo: {
    $loadingKey: 'loading',
    // TableData: {
    //   query: tableData,
    //   variables() {
    //     return {
    //       botName: this.$route.params.bot,
    //       coinAbbrev: this.selectedCoin,
    //       username: "kenny"
    //     }
    //   },
    //   skip() {
    //     return !this.selectedCoin
    //   },
    //   error(errors) {
    //     console.log(errors)
    //   }
    // },
    Coins: {
      query: coinsByBot,
      variables() {
        return {
          botName: this.$route.params.bot
        }
      }
    }
  },
}
</script>