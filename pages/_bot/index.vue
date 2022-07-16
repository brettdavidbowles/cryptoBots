<template>
  <div>
    <h1 class="w-full text-center text-2xl font-bold p-4">
      {{ $route.params.bot }}
    </h1>
    <div>please check my math... profit margins seem wrong but it's late here and will have to wait</div>
    <div>6/3 i think i fixed them but still hit me up to confirm my methodology</div>
    <div>6/4 I reversed the table so the newest transactions are first</div>
    
    <div class="p-4 w-full">
      <select
        v-model="selectedCoin"
        class="bg-black"
        style="background-color: black;"
      >
        <option disabled value="">Please select one</option>
        <option 
          v-for="coin in Coins"
          :key="coin.abbrev"
          :value="coin.abbrev"
        >
          {{ coin.name }}
        </option>
      </select>
      <div class="h-96 overflow-y-auto mx-6 hide-scrollbar">
        <table id="chart" class="relative w-full" v-if="showTable">
          <colgroup>
            <col>
            <col>
            <!-- <col> -->
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
            <tr>
              <th
              v-for="(heading, index) in columnHeadings"
              :key="index" 
              class="bg-black text-white px-4"
              :class="[ index === 0 ? 'sticky left-0' : '']"
              >
                {{heading}}
              </th>
            </tr>
          </thead>
          <tr
            v-for="(transaction, index) in sellsReversed"
            :key="transaction.id"
            :class="[index % 2 === 0 ? 'bg-gray-500' : 'bg-black']"
            >
                <td class="sticky left-0 py-2 text-center bg-black text-white">{{ reverseIndex(index) }}</td>
                <td class="py-2 text-center">{{ buysReversed[reversedBuyIndex(index)].dateTime.slice(5, 16).replace('T', ' ') }}</td>
                <td class="py-2 text-center">{{ transaction.dateTime.slice(5, 16).replace('T', ' ') }}</td>
                <!-- <td class="py-2 text-center">{{ buysReversed[reversedBuyIndex(index)].quantity }}</td> -->
                <td class="py-2 text-center">{{ buysReversed[reversedBuyIndex(index)].boughtPrice }}</td>
                <td class="py-2 text-center">{{ transaction.sellPrice}}</td>
                <td class="py-2 text-center">{{ transaction.currentPrice }}</td>
                <td class="py-2 text-center">{{ roundedPercentage(transaction.transactioncalculations.transactionProfitMargin) }}</td>
                <td class="py-2 text-center">{{ roundedPercentage(transaction.transactioncalculations.cumulativeProfitMargin) }}</td>
                <td class="py-2 text-center">{{ roundedPercentage(transaction.transactioncalculations.marketProfitMargin) }}</td>
            </tr>
        </table>
        <span v-else-if="loading && selectedCoin">
          "I feel the need... the need for speed" - Top Gun
        </span>
      </div>
    </div>
    <div
        v-if="showLineChart"
        class="w-full px-6"
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
import { coinsByBot } from '~/apollo/queries/fetchCoins.gql'
import { deleteTransaction } from '~/apollo/mutations/deleteTransaction.gql'

export default {
  data() {
    return {
      TableData: [],
      Coins: [],
      columnHeadings: [ 'ID', 'Buy Date/Time', 'Sold Date/Time', 'Buy Price', 'Sell Price', 'Current Price', 'Transaction Profit', 'Cumulative Profit', 'Market Profit' ],
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
    sellsReversed() {
      if(this.sells) {
        let arr = [...this.sells]
        return arr.reverse()
      }
    },
    buys() {
      return this.TableData?.filter((transaction, index) => {
        return index % 2 === 0
      })
    },
    buysReversed() {
      if (this.buys) {
        let arr = [...this.buys]
        return arr.reverse()
      }
    },
    showTable() {
      return !this.loading && !!this.selectedCoin
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
      return !this.loading && this.TableData?.length
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
      },
      skip() {
        return !this.selectedCoin
      },
      error(errors) {
        console.log(errors)
      }
    },
    Coins: {
      query: coinsByBot,
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
    reverseIndex(index){
      return this.sells.length - index
    },
    roundedPercentage(decimal) {
      const percentage = decimal * 100
      const roundedPercentage = Math.round(percentage * 10000)/10000
      return roundedPercentage + '%'
    },
    reversedBuyIndex(index) {
      return this.buys > this.sells ? index + 1 : index
    }
  }
}
</script>