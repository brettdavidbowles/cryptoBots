<template>
  <div 
    @click="toggleDropdown"
    v-click-outside="closeDropdown"
    class="cursor-pointer z-50"
  >
    <span 
      class="hover:text-neon-green"
      :class="[isExpanded ? 'text-neon-green' : 'text-white']"  
    >
    {{ title }}
    </span>
    <div 
      v-if="isExpanded"
      class="absolute p-2 -mx-4"
      style="background-color: black;"
    >
      <div 
        v-for="link in links"
        :key="link.url"
        class="p-2 hover:text-neon-green"
      >
        <nuxt-link
          v-if="link.name"
          :to="link.name"
          class="inline-block w-full"
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