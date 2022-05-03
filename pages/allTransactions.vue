<template>
  <div class="bg-blue-100">
    <Header />
    <div class="p-4 w-full">
      <!-- <div class="grid grid-cols-10 justify-items-start">
        <div
          v-for="(heading, index) in columnHeadings"
          :key="index"
        >
            <span>{{ heading }}</span>
        </div>
      </div> -->
      <select v-model="selectedCoin">
        <option disabled value="">Please select one</option>
        <option>BTCUSDT</option>
        <option>LTCUSDT</option>
        <option>ETHUSDT</option>
      </select>
      <table class="mt-8">
        <colgroup>
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
        <thead>
          <tr>
            <th
            v-for="(heading, index) in columnHeadings"
            :key="index" 
            style="position:sticky; top:5rem; background-color:white"
            >
              {{heading}}
            </th>
          </tr>
        </thead>
        <tr
          v-for="(transaction, index) in bitcoinTransactions"
          :key="transaction.id"
          style="border:4px solid"
          >
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.dateTime.slice(0, 19) }}</td>
              <td>{{ transaction.coin.abbrev }}</td>
              <td>{{ transaction.quantity }}</td>
              <td >{{ transaction.boughtPrice }}</td>
              <td >{{ transaction.sellPrice}}</td>
              <td>{{ transaction.currentPrice }}</td>
              <td>{{ transaction.transactionProfit }}</td>
              <td>{{ currentTransactionArray(bitcoinTransactionProfits, index, transaction.sellPrice, transaction.transactionProfit) }}</td>
              <!-- <span>{{transaction}}</span> -->
              <!-- <span>{{ transaction.coin.abbrev }}</span> -->
          </tr>
      </table>
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
      columnHeadings: [ 'ID', 'Date/Time', 'Coin', 'Quantity', 'Bought Price', 'Sell Price', 'Current Price', 'Transaction Profit', 'Cumulative Profit'],
      selectedCoin: ''
    }
  },
  computed: {
    // should be done on backend
    sortedTransactions() {
      return this.TransactionsByBot.sort(function(a, b){
        return a.id - b.id
      })
    },
    bitcoinTransactions() {
      return this.filterTransactionsByCoin(this.sortedTransactions, this.selectedCoin)
    },
    bitcoinTransactionProfits() {
      return this.mapProfits(this.bitcoinTransactions)
    }
  },
  apollo: {
    TransactionsByBot: {
      query: transactionsByBot,
      variables() {
        return {
          botName: "CrossNN"
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