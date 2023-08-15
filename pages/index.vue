<template>
  <div>
    <TitleAnimation class="w-full p-8"/>
    <div class="">
      <p class="p-4">
        This site tracked the cryptocurrency transactions of bots programmed by Dr. Wesley Kenderdine Jones from April to November in 2022. The bots paper traded for the duration of this time. Trading stopped when Heroku eliminated its free tier, as all bots were deployed there. In the event trading resumes, this page will be updated. Currently, Dr. Jones and Mr. Bowles are more focused on other projects.
        <br> 
        <br>
        Dr. Jones used the Python and the Open AI Gym environement to create autonomous bots to trade cryptocurrencies. The code for this is currently open source and can be found
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
        The bots ran hourly in individual apps on Heroku.
        The backend is currently hosted on Railway (migrated from Heroku) and the frontend is currently hosted on Netlify.
        <br>
        There are several things on the web development side that should be improved. Particularly loading states and over fetching data.
        These will hopefully be fixed in the future, but currently the focus is on other projects.
      </p>
  </div>
  </div>
</template>

