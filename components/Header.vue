<template>
  <div class="z-50 sticky top-0 w-full flex justify-around py-4 px-8"
  >
    <nuxt-link
      to="/"
      class="hover:text-neon-green"
    >
     Home
    </nuxt-link>
    <Dropdown
      :links="botsByUser"
      title="Bots"
      :loading="loading"
    />
    <div 
      v-for="link in links"
      :key="link.title"
    >
      <nuxt-link
        v-if="typeof link.url === 'string'"
        :to="link.url"
        class="hover:text-neon-green"
      >
        {{ link.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue"
import { botsByUser } from '~/apollo/queries/fetchBots'

export default {
  components: { Dropdown },
  
  data() {
      return {
          links: [
              // { title: "All Transactions", url: "/allTransactions" },
              { title: "About", url: "/about" },
              { title: "Bio", url: "/bio" }
          ],
          botsByUser: [],
          loading: 0
      }
  },
  apollo: {
    $loadingKey: 'loading',
    botsByUser: {
      query: botsByUser,
      variables() {
        return {
          username: 'kenny'
        }
      }
    }
  }
}
</script>