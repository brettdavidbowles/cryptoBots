<template>
  <div>
    <TitleAnimation class="w-full p-8"/>
    <div class="">
      <p class="p-4">
        This site tracks the crypto-currency transaction of bots programmed by Dr. Wesley Kenderdine Jones. The bots are currently paper trading. It will be noted when they begin trading live.
        <br> 
        <br>
        Dr. Jones uses the Python and the Open AI Gym environement to create autonomous bots to trade cryptocurrencies. The code for this is currently open source and can be found
        <a 
          class="text-white hover:text-blue-500"
          href="https://github.com/Kenny1941/Crypto_Bot"
          target="_blank">
          in this Github repository
        </a>
        .
        <br>
        <br>
        All web development for this project was done by Brett Bowles.
        The backend was developed using Python/Django, Postgresql, and a GraphQL API using Graphene.
        The frontend was developed using Vue/Nuxt with Apollo as the GraphQL client.
        The bots run hourly in individual apps on Heroku.
        The backend is currently hosted on Heroku and the frontend is currently hosted on Netlify.
      </p>
  </div>
  </div>
</template>

<script>
import { botsByUser } from '~/apollo/queries/fetchBots'

export default {
  apollo: {
    botsByUser: {
      query: botsByUser,
      variables() {
        return {
          username: 'mockuser'
        }
      }
    }
  }
}
</script>
