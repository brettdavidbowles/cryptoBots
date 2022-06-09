<template>
  <transition class="w-full" name='subtitle'>
    <span v-if="showSubtitle">
      {{ text }}
    </span>
  </transition>
</template>

<script>
export default {
  props: {
    showSubtitle: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.subtitle-enter-from{
  opacity: 0;
  transform: translateY(15px);
}

.subtitle-enter-active,
.subtitle-leave-active {
  transition: all 1s;
}

.subtitle-enter,
.subtitle-leave-to {
  opacity: 0;
}
</style>
