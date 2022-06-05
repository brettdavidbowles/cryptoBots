<template>
  <div>
    <h1>brett's shit</h1>
    <!-- <div v-for="calcRow in calculationsArray" :key="`calc ${calcRow.id}`">
      {{ calcRow }}
    </div> -->
    <div v-for="(str, index) in finishedArray" :key="index">
      {{ str }}
    </div>
    <label for="bots">Select Bot</label>
    <select 
      id="bots"
      v-model="botName"
      class="border rounded"  
    >
      <option 
        v-for="bot in bots"
        :key="bot.value"
        :value="bot.value" 
        >
        {{ bot.name }}
      </option>
    </select>
    <label for="coins">Select Coin</label>
    <select 
      id="coins"
      v-model="coinAbbrev"
      class="border rounded"  
    >
      <option 
        v-for="coin in coins"
        :key="coin.value"
        :value="coin.value" 
        >
        {{ coin.name }}
      </option>
    </select>
    <!-- <button
      @click="fetchData"
      class="border rounded bg-green-500 p-2 text-white"
    >
      Fetch Data
    </button> -->
    {{ tableDataLength }}
    <!-- {{ TableData }} -->
    <!-- <button
      @click="sendTransactionCalculations"
      class="border block rounded bg-green-500 p-2 text-white"
    >
      Calculate profits for {{ coinAbbrev }} with {{ botName }}
    </button> -->
    <div v-for="row in TableData" :key="row.id">
      {{ row }}
    </div>

  </div>
</template>

<script>
import { tableData } from '~/apollo/queries/fetchTableData.gql'
import { createTransactionCalculations } from '~/apollo/mutations/createTransactionProfits.gql'
export default {
  data() {
    return {
      TableData: [],
      finishedArray: [],
      botName: '',
      coinAbbrev: '',
      username: 'kenny',
      bots: [
        {
          name: 'Forest',
          value: 'Forest'
        },
        {
          name: 'Big NN',
          value: 'Big_NN',
        },
        {
          name: 'Forest Linear',
          value: 'Forest_Linear'
        },
        {
          name: 'Cross NN',
          value: 'CrossNN'
        }
      ],
      coins:[
        {
          name: 'Bitcoin',
          value: 'BTCUSDT'
        },
        {
          name: 'Litecoin',
          value: 'LTCUSDT'
        },
        {
          name: 'Ethereum',
          value: 'ETHUSDT'
        }
      ]

    }
  },
  computed: {
    tableDataLength() {
      return this.TableData?.length
    },
    calculationsArray() {
        let array = this.TableData

        array?.forEach((transaction, index) => {
          if(Number(transaction.sellPrice)){
            transaction.transactionRevenue = transaction.sellPrice * array[ index - 1 ].quantity
          }
          else transaction.transactionRevenue = 0
        })

        array?.forEach((transaction, index) => {
          const initialValue = 0
          const currentArray = array.slice(0, index + 1)
          const sumWithInitial = currentArray.reduce(
            (previousValue, currentValue) => previousValue + currentValue.transactionRevenue,
            initialValue
          )
          transaction.cumulativeRevenue = sumWithInitial
        })

        array?.forEach((transaction, index) => {
          if (Number(transaction.sellPrice)){
            transaction.transactionProfit = (transaction.sellPrice - array[ index - 1 ].boughtPrice) * array[ index - 1 ].quantity
          }
          else transaction.transactionProfit = 0
        })
        
        array?.forEach((transaction, index) => {
          const initialValue = 0
          const currentArray = array.slice(0, index + 1)
          const sumWithInitial = currentArray.reduce(
            (previousValue, currentValue) => previousValue + currentValue.transactionProfit,
            initialValue
          )
          transaction.cumulativeProfit = sumWithInitial
        })

        array?.forEach((transaction, index) => {
          if (Number(transaction.sellPrice)){
            transaction.transactionExpense = array[ index - 1 ].boughtPrice * array[ index - 1 ].quantity
          }
          else transaction.transactionExpense = 0
        })

        array?.forEach((transaction, index) => {
          const initialValue = 0
          const currentArray = array.slice(0, index + 1)
          const sumWithInitial = currentArray.reduce(
            (previousValue, currentValue) => previousValue + currentValue.transactionExpense,
            initialValue
          )
          transaction.cumulativeExpense = sumWithInitial
        })

        array?.forEach((transaction, index) => {
          if(Number(transaction.sellPrice)){
            transaction.transactionProfitMargin = (transaction.sellPrice - array[ index - 1 ].boughtPrice) / transaction.sellPrice
          }
          else transaction.transactionProfitMargin = 0
        })

        let highestValueSpent = 0
        for (let i=0; i<array.length; i++){
          if(array[i].quantity * array[i].boughtPrice > highestValueSpent) {
            highestValueSpent = array[i].quantity * array[i].boughtPrice
          }
        }
        console.log(highestValueSpent)

        array?.forEach((transaction, index) => {
          if(Number(transaction.sellPrice)){
            transaction.cumulativeProfitMargin = transaction.cumulativeProfit / (highestValueSpent + transaction.cumulativeProfit)
          }
        })
        
        array?.forEach(transaction => {
          transaction.marketProfitMargin = (transaction.currentPrice - array[0].currentPrice) / transaction.currentPrice
        })
            
        return array
      // }
    }
  },
  apollo: {
    TableData: {
      query: tableData,
      variables() {
        return {
          botName: this.botName,
          coinAbbrev: this.coinAbbrev,
          username: "kenny"
        }
      }
    }
  },
  methods: {
    CreateTransactionCalculations(id, transactionRevenue, cumulativeRevenue, transactionProfit, cumulativeProfit, transactionExpense, cumulativeExpense, transactionProfitMargin, cumulativeProfitMargin, marketProfitMargin) {
      this.$apollo.mutate({
        mutation: createTransactionCalculations,
        variables: {
          id,
          transactionRevenue,
          cumulativeRevenue,
          transactionProfit,
          cumulativeProfit,
          transactionExpense,
          cumulativeExpense,
          transactionProfitMargin,
          cumulativeProfitMargin,
          marketProfitMargin
        }
      })
    },
    sendTransactionCalculations() {
      this.calculationsArray.forEach(transaction => {
        if(Number(transaction.sellPrice)) {
          this.CreateTransactionCalculations(transaction.id,
                                    transaction.transactionRevenue,
                                    transaction.cumulativeRevenue,
                                    transaction.transactionProfit,
                                    transaction.cumulativeProfit,
                                    transaction.transactionExpense,
                                    transaction.cumulativeExpense,
                                    transaction.transactionProfitMargin,
                                    transaction.cumulativeProfitMargin,
                                    transaction.marketProfitMargin
          )
        }
      })
      this.finishedArray.push(`${this.coinAbbrev} with ${this.botName} finished`)
    }
      
  }
}
</script>