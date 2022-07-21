<template>
  <div>
    lets try This
    {{ Coins }}
    <NuxtLink 
      v-for="coin in Coins"
      :key="coin.abbrev"
      :to="`${$route.params.bot}/${coin.abbrev}`"
    >
      {{ coin.name }}
    </NuxtLink>
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