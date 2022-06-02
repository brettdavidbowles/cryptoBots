<template>
  <div class="bg-blue-100 h-screen w-full">
    <Header />
    <h1 class="w-full text-center text-2xl font-bold p-4">
      {{ $route.params.bot }}
    </h1>
    <span>please check my math... profit margins seem wrong but it's late here and will have to wait</span>
    <div class="p-4 w-full">
      <select v-model="selectedCoin">
        <option disabled value="">Please select one</option>
        <option>BTCUSDT</option>
        <option>LTCUSDT</option>
        <option>ETHUSDT</option>
      </select>
      <div 
        class="h-96 overflow-y-auto mx-6 bg-blue-100 hide-scrollbar"
        v-if="showTable"
      >
        <table id="chart" class="relative w-full" v-if="!loading && selectedCoin">
          <colgroup>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
          </colgroup>
          <thead class="sticky top-0 z-10">
            <tr class="">
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
            v-for="(transaction, index) in sells"
            :key="transaction.id"
            :class="[index % 2 === 0 ? 'bg-blue-400' : 'bg-blue-200']"
            >
                <td class="sticky left-0 text-center px-4 bg-black text-white">{{ index + 1 }}</td>
                <td class="px-4">{{ buys[index].dateTime.slice(0, 19) }}</td>
                <td class="px-4">{{ transaction.dateTime.slice(0, 19) }}</td>
                <td class="px-4">{{ buys[index].quantity }}</td>
                <td class="px-4">{{ buys[index].boughtPrice }}</td>
                <td class="px-4">{{ transaction.sellPrice}}</td>
                <td class="px-4">{{ transaction.currentPrice }}</td>
                <td class="px-4">{{ transaction.transactioncalculations.transactionProfitMargin }}</td>
                <td class="px-4">{{ transaction.transactioncalculations.cumulativeProfitMargin }}</td>
                <td class="px-4">{{ transaction.transactioncalculations.marketProfitMargin }}</td>
            </tr>
        </table>
        <span v-else-if="loading && selectedCoin">
          "I feel the need... the need for speed" - Top Gun
        </span>
      </div>
    </div>
    <div
        v-if="showLineChart"
        class="bg-blue-100 w-full px-6"
      >
        <LineChart
          :key="selectedCoin"
          :chart-labels="sellDates"
          :chart-data="transactionProfitMargins"
          label-one="Bot Cumulative Profit Margin"
          :chart-data-two="marketProfitMargins"
          label-two="Market Profit Margin"
          :title="selectedCoin"
        />
      </div>
  </div>
</template>

<script>
import { tableData } from '~/apollo/queries/fetchTableData.gql'
import { deleteTransaction } from '~/apollo/mutations/deleteTransaction.gql'

export default {
  data() {
    return {
      TableData: [],
      columnHeadings: [ 'ID', 'Bought Date/Time', 'Sold Date/Time', 'Quantity', 'Bought Price', 'Sell Price', 'Current Price', 'Transaction Profit Margin', 'Cumulative Profit Margin', 'Market Profit Margin' ],
      selectedCoin: '',
      loading: 0
    }
  },
  computed: {
    sortedTransactions() {
      return this.TableData.sort(function(a, b){
        return a.id - b.id
      })
    },
    sells() {
      return this.TableData?.filter((transaction, index) => {
        return index % 2 === 1
      })
    },
    buys() {
      return this.TableData?.filter((transaction, index) => {
        return index % 2 === 0
      })
    },
    showTable() {
      return this.TableData?.length
    },
    ids() {
      const arr = []
      this.sells?.forEach(transaction => arr.push(transaction.id))
      return arr
    },
    sellDates() {
      const dateArr = []
      this.sells?.forEach(transaction => dateArr.push(transaction.dateTime.slice(0, 16)))
      return dateArr
    },
    transactionProfitMargins() {
      const arr = []
      this.sells?.forEach(transaction => arr.push(transaction.transactioncalculations.cumulativeProfitMargin))
      return arr
    },
    marketProfitMargins() {
      const arr = []
      this.sells?.forEach(transaction => arr.push(transaction.transactioncalculations.marketProfitMargin ))
      return arr
    },
    showLineChart() {
      return !this.loading && this.TableData
    }
  },
  apollo: {
    $loadingKey: 'loading',
    TableData: {
      query: tableData,
      variables() {
        return {
          botName: this.$route.params.bot,
          coinAbbrev: this.selectedCoin,
          username: "kenny"
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
    // mapProfits(array) {
    //   return array.filter((transaction, index) => Number(transaction.sellPrice) || index === array.length-1).map(transaction => transaction.transactionProfit)
      // return array.filter((transaction, index) => Number(transaction.sellPrice) || index === array.length-1)
    // },
    // currentTransactionArray(array, transactionIndex, sellPrice, transactionProfit) {
    //   if (Number(sellPrice) || transactionIndex === array.length-1){
    //     const transactionArray = array.slice(0, array.indexOf(transactionProfit) + 1)
    //     const initialValue = 0;
    //     return transactionArray.reduce(
    //       (previousValue, currentValue) => previousValue + currentValue,
    //       initialValue
    //     );
    //   }
    //   return '-'
    // }
  }
}
</script>