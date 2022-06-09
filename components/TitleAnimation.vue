<template>
  <div class="w-full flex flex-col items-center">
    <div class="h-6">
      <subtitle
        text="The"
        :show-subtitle="showSubtitle"
      />
    </div>
    <h1 class="text-3xl text-right block">
      {{ builtTitle }}
    </h1>
    <div class="h-6">
      <subtitle
        text="of Dr. Jones"
        :show-subtitle="showSubtitle"
      />
    </div>
  </div>
</template>

<script>
import subtitle from './subtitle.vue'
export default {
  components: { subtitle },
  data() {
    return {
      title: '',
      numberCounter: 0,
      finalTitle: 'crypto bots',
      characterCounter: 0
    }
  },
  computed: {
    builtTitle() {
      return this.numberCounter === '' ? this.title : this.title + this.numberCounter
    },
    showSubtitle() {
      return this.title === this.finalTitle
    }
  },
  mounted() {
    this.buildTitle()
  },
  methods: {
    buildTitle() {
      const loop = setInterval(() => {
        this.numberCounter += 1
        if(this.numberCounter === 10) {
          this.numberCounter = 0
          this.characterCounter += 1
          this.title = this.finalTitle.slice(0, this.characterCounter)
        }
        if(this.title === this.finalTitle) {
          this.numberCounter = ''
          clearInterval(loop)
        }
      }, 20);
    }
  }
}
</script>

