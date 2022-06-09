<template>
  <div>
    <TitleAnimation class="w-full p-8"/>
    <div class="">
      <p class="p-4">
        look at that ballin mother fucking animation, good god i'm such a badass
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
