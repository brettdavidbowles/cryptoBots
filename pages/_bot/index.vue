<template>
  <div class="bg-blue-100 w-full">
    <Header />
    <h1 class="w-full text-center text-2xl font-bold p-4">
      {{ $route.params.bot }}
    </h1>
    <div class="p-4 w-full">
      <select v-model="selectedCoin">
        <option disabled value="">Please select one</option>
        <option>BTCUSDT</option>
        <option>LTCUSDT</option>
        <option>ETHUSDT</option>
      </select>
      <div>
      <div class="h-screen overflow-auto bg-blue-100">
        <table id="chart" class="relative w-full" v-if="!loading && selectedCoin">
          <colgroup>
            <col>
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
            <col style="border:4px solid">
          </colgroup>
          <thead class="sticky top-0 z-10">
            <tr class="border-4 border-black">
              <!-- <th
              v-for="(heading, index) in columnHeadings"
              :key="index" 
              style="position:sticky; top:3.5rem; background-color:white"
              > -->
              <th
              v-for="(heading, index) in columnHeadings"
              :key="index" 
              class="bg-black text-white"
              :class="[ index === 0 ? 'sticky left-0' : '']"
              >
                {{heading}}
              </th>
            </tr>
          </thead>
          <tr
            v-for="(transaction, index) in coinTransactions"
            :key="transaction.id"
            style="border:4px solid"
            class=""
            >
                <td class="sticky left-0 bg-black text-white">{{ transaction.id }}</td>
                <td>{{ transaction.dateTime.slice(0, 19) }}</td>
                <td>{{ transaction.coin.abbrev }}</td>
                <td>{{ transaction.quantity }}</td>
                <td >{{ transaction.boughtPrice }}</td>
                <td >{{ transaction.sellPrice}}</td>
                <td>{{ transaction.currentPrice }}</td>
                <td>{{ transaction.transactionProfit }}</td>
                <td>{{ currentTransactionArray(coinTransactionProfits, index, transaction.sellPrice, transaction.transactionProfit) }}</td>
                <td>{{ transaction.marketCumulativeProfit }}</td>
                <td>{{ transaction.marketPercentProfit }}</td>
                <!-- <span>{{transaction}}</span> -->
                <!-- <span>{{ transaction.coin.abbrev }}</span> -->
            </tr>
        </table>
        <span v-else-if="loading && selectedCoin">
          It's loading... please relax... it's a free server... breathe in breathe out
        </span>
      </div>
      </div>
    </div>
    <!-- {{ TransactionsByBot }} -->
  </div>
</template>

<script>
import { transactionsByBot } from '~/apollo/queries/fetchTransaction.gql'
import { deleteTransaction } from '~/apollo/mutations/deleteTransaction.gql'

export default {
  data() {
    return {
      TransactionsByBot: [],
      columnHeadings: [ 'ID', 'Date/Time', 'Coin', 'Quantity', 'Bought Price', 'Sell Price', 'Current Price', 'Transaction Profit', 'Cumulative Profit', 'Market Cumulative Profit', 'Market Percent Profit'],
      selectedCoin: '',
      loading: 0
    }
  },
  computed: {
    // should be done on backend
    sortedTransactions() {
      return this.TransactionsByBot.sort(function(a, b){
        return a.id - b.id
      })
    },
    coinTransactions() {
      return this.filterTransactionsByCoin(this.sortedTransactions, this.selectedCoin)
    },
    coinTransactionProfits() {
      return this.mapProfits(this.coinTransactions)
    }
  },
  apollo: {
    $loadingKey: 'loading',
    TransactionsByBot: {
      query: transactionsByBot,
      variables() {
        return {
          botName: this.$route.params.bot
        }
      }
    }
  },
  methods: {
    DeleteTransaction(id) {
      this.$apollo.mutate({
        mutation: deleteTransaction,
        variables: {
          id
        }
      })
    },
    filterTransactionsByCoin(array, coin) {
      return array.filter(transaction => transaction.coin.abbrev === coin)
    },
    mapProfits(array) {
      return array.filter((transaction, index) => Number(transaction.sellPrice) || index === array.length-1).map(transaction => transaction.transactionProfit)
      // return array.filter((transaction, index) => Number(transaction.sellPrice) || index === array.length-1)
    },
    currentTransactionArray(array, transactionIndex, sellPrice, transactionProfit) {
      if (Number(sellPrice) || transactionIndex === array.length-1){
        const transactionArray = array.slice(0, array.indexOf(transactionProfit) + 1)
        const initialValue = 0;
        return transactionArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialValue
        );
      }
      return '-'
    }
  }
}
</script>