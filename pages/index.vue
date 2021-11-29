<template>
  <div class="flex flex-col">
    {{ 'brett fucking bowles' }}
    <!-- {{ time }} -->
    <!-- <div>
      {{ bitCoin }}
    </div> -->
    <div>
      {{ timestamp }}
      <!-- {{ bitCoinHistoricalTrades }} -->
    </div>
    <!-- <div>
      {{ encryptedkey }}
    </div> -->
    <div>
      {{ allBitCoinOrders }}
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      time: '',
      bitCoin: '',
      bitCoinHistoricalTrades: null,
      encryptedkey: '',
      allBitCoinOrders: null,
      timestamp: ''
    }
  },
  methods: {
    async fetchServerTime() {
      const hereWeGo = await this.$axios.$get('/time')
      this.time = hereWeGo.serverTime
    },
    async fetchBitCoinAveragePrice() {
      const averagePrice = await this.$axios.$get(`/avgPrice?symbol=BNBBTC`)
      this.bitCoin = averagePrice
    },
    async fetchBitCoinHistoricalTrades () {
      const historicalTrades = await this.$axios.$get('/historicalTrades?symbol=BNBBTC')
      this.bitCoinHistoricalTrades = historicalTrades
    },
    createHmac() {
      const id = CryptoJS.HmacSHA256(`symbol=LTCBTC&timestamp=${this.timestamp}&recvWindow=59000`, this.$config.secretKey)
      this.encryptedkey = id
    },
    async fetchAllBitCoinOrders() {
      this.createHmac()
      const allBitCoinOrders = await this.$axios.$get(`/openOrders?symbol=LTCBTC&timestamp=${this.timestamp}&recvWindow=59000&signature=${this.encryptedkey}`)
      this.allBitCoinOrders = allBitCoinOrders
    },
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
    this.getNow()
    this.fetchServerTime()
    this.fetchBitCoinAveragePrice()
    this.fetchBitCoinHistoricalTrades()
    // this.createHmac()
    this.fetchAllBitCoinOrders()
  }
}
</script>
