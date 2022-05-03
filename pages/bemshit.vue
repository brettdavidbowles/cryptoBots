<template>
  <div>
    <h1>transaction array</h1>
    {{ transactionArray }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactionArray: []
    }
  },
  methods: {
    async fetchOrders() {
      const orders = await this.$axios.$get('/v2/getOrders?signalProvider=WesleyTest&signalProviderKey=EG11RPO67ALCSMXK')
      this.transactionArray = orders
    }
  },
  mounted() {
    this.fetchOrders()
  }
}
</script>