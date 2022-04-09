<template>
  <div 
    @click="toggleDropdown"
    v-click-outside="closeDropdown"
    class="cursor-pointer"
  >
    {{ title }}
    <div 
      v-if="isExpanded"
      class="absolute bg-black p-2"
    >
      <div 
        v-for="link in links"
        :key="link.url"
      >
        <nuxt-link
          v-if="link.url"
          :to="link.url"
        >
          {{ link.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isExpanded = !this.isExpanded
    },
    closeDropdown() {
      this.isExpanded = false
    }
  }
}
</script>