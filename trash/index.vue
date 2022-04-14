<template>
  <div class="flex flex-col">
    <nuxt-link class="bg-red-500" to="home">this page is bullshit, click here for actual devving</nuxt-link>
    {{ 'brett fucking bowles' }}
    {{ transactions }}
    <!-- {{ time }} -->
    <div>
      <!-- {{ bitCoin }} -->
    </div>
    <div>
      {{ timestamp }}
      <!-- {{ bitCoinHistoricalTrades }} -->
    </div>
    <!-- <div>
      {{ encryptedkey }}
    </div> -->
    <!-- <div>
      <h1>All BitCoin Orders</h1>
      {{ allBitCoinOrders }}

      <h1>Current Open Orders</h1>
      {{ currentOpenOrders}}
      <h1>My BNB Trades</h1>
      {{ myBnbTrades }}
      <h1>My BUSD Trades</h1>
        {{ myBusdTrades }}
      <h1>My ETH Trades</h1>
        {{ myEthTrades }}
      <h1>My LTC Trades</h1>
        {{ myLtcTrades }}
      <h1>My XRP Trades</h1>
        {{ myXrpTrades }}
      <h1>My BTC Trades</h1>
      {{ numberOfTrades }}
      {{ myBtcTrades }}
      
    </div> -->
    <div>
      <!-- {{ allCoins }}
      {{ currentOrderCount }}
      {{ currentOpenOrders + 'wtf' }} -->
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { transactions } from '~/apollo/queries/fetchTransaction'

export default {
  data() {
    return {
      time: '',
      bitCoin: '',
      bitCoinHistoricalTrades: null,
      encryptedkey: '',
      allBitCoinOrders: null,
      timestamp: '',
      allCoins: null,
      currentOrderCount: null,
      currentOpenOrders: null,
      myBtcTrades: null,
      myBnbTrades: null,
      myEthTrades: null,
      myLtcTrades: null,
      myXrpTrades: null,
      myBusdTrades: null,
      transactions: []
    }
  },
  apollo: {
    transactions: {
      prefetch: false,
      query: transactions
    }
    // transactions: {
    //   prefetch: true,
    //   query: transactions
    // }
  },
  computed: {
    numberOfTrades(){
      return this.myBtcTrades?.length
    }
  },
  methods: {
    async fetchServerTime() {
      const hereWeGo = await this.$axios.$get('/api/v3/time')
      this.time = hereWeGo.serverTime
    },
    async fetchBitCoinAveragePrice() {
      const averagePrice = await this.$axios.$get(`/api/v3/avgPrice?symbol=BNBBTC`)
      this.bitCoin = averagePrice
    },
    async fetchBitCoinHistoricalTrades () {
      const historicalTrades = await this.$axios.$get('/api/v3/historicalTrades?symbol=BNBBTC')
      this.bitCoinHistoricalTrades = historicalTrades
    },
    createHmac(coin) {
      const id = CryptoJS.HmacSHA256(`symbol=${coin}&timestamp=${this.timestamp}&recvWindow=5000`, this.$config.secretKey)
      this.encryptedkey = id
    },
    async fetchAllBitCoinOrders() {
      this.createHmac('BTCUSDT')
      const allBitCoinOrders = await this.$axios.$get(`/api/v3/openOrders?symbol=BTCUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.allBitCoinOrders = allBitCoinOrders
    },
    // async fetchAllBnbOrders() {
    //   this.createHmac('BNBUSDT')
    //   const allBnbOrders = await this.$axios.$get(`/api/v3/openOrders?symbol=BNBUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
    //   this.allBnbOrders = allBnbOrders
    // },
    // async fetchAllBnbOrders() {
    //   this.createHmac('BNBUSDT')
    //   const allBnbOrders = await this.$axios.$get(`/api/v3/openOrders?symbol=BNBUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
    //   this.allBnbOrders = allBnbOrders
    // },
    // allBnbOrders: null,
    //   allEthOrders: null,
    //   allLtcOrders: null,
    //   allTrxOrders: null
    createCurrentOrderCountHmac() {
      const id = CryptoJS.HmacSHA256(`timestamp=${this.timestamp}&recvWindow=5000`, this.$config.secretKey)
      this.encryptedkey = id
    },
    async fetchCurrentOrderCount() {
      this.createCurrentOrderCountHmac()
      const currentOrderCount = await this.$axios.$get(`/api/v3/rateLimit/order?timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.currentOrderCount = currentOrderCount
    },
    async fetchCurrentOpenOrders() {
      this.createCurrentOrderCountHmac()
      const currentOpenOrders = await this.$axios.$get(`/api/v3/rateLimit/order?timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.currentOpenOrders = currentOpenOrders
    },
    async fetchMyBtcTrades() {
      this.createHmac('BTCUSDT')
      const myTrades = await this.$axios.$get(`/api/v3/myTrades?symbol=BTCUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.myBtcTrades = myTrades
    },
    async fetchMyBnbTrades() {
      this.createHmac('BNBUSDT')
      const myTrades = await this.$axios.$get(`/api/v3/myTrades?symbol=BNBUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.myBnbTrades = myTrades
    },
    async fetchMyEthTrades() {
      this.createHmac('ETHUSDT')
      const myTrades = await this.$axios.$get(`/api/v3/myTrades?symbol=ETHUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.myEthTrades = myTrades
    },
    async fetchMyLtcTrades() {
      this.createHmac('LTCUSDT')
      const myTrades = await this.$axios.$get(`/api/v3/myTrades?symbol=LTCUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.myLtcTrades = myTrades
    },
    async fetchMyXrpTrades() {
      this.createHmac('XRPUSDT')
      const myTrades = await this.$axios.$get(`/api/v3/myTrades?symbol=XRPUSDT&timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
      this.myXrpTrades = myTrades
    },
    // async fetchAllCoins() {
    //   this.createCurrentOrderCountHmac()
    //   const allCoins = await this.$axios.$get(`/sapi/v1/capital/config/getall?timestamp=${this.timestamp}&recvWindow=5000&signature=${this.encryptedkey}`)
    //   this.allCoins = allCoins
    // },
    getNow() {
        // const today = new Date();
        // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // const dateTime = date +' '+ time;
        this.timestamp = Math.floor(new Date().getTime())
    }
    
  },
  // computed: {
  //   currentTime() {
  //     return time()
  //   }
  // },
  mounted(){
    // this.getNow()
    // this.fetchServerTime()
    // this.fetchBitCoinAveragePrice()
    // this.fetchBitCoinHistoricalTrades()
    // this.createHmac()
    // this.fetchAllBitCoinOrders()
    // this.fetchAllCoins()
    // this.fetchCurrentOrderCount()
    // this.fetchCurrentOpenOrders()
    // this.fetchMyBtcTrades()
    // this.fetchMyBnbTrades()
    // this.fetchMyEthTrades()
    // this.fetchMyLtcTrades()
    // this.fetchMyXrpTrades()
    console.log(transactions)
  }
}
</script>
