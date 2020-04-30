<template>
  <div class="beta-banner" @mouseleave="hide" @mouseenter="show">
    <transition name="animate">
      <div v-if="isVisible" class="content">
        Project in development. Tell about
        <a href="https://github.com/AStaroverov/virtual-piano/issues/new" target="_blank">suggestions or bugs</a>.
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'beta-banner',
    data: () => ({
      isVisible: true
    }),
    created () {
      this.startTimer = setTimeout(() => {
        this.isVisible = false
      }, 5000)
    },
    methods: {
      show () {
        clearTimeout(this.startTimer)
        this.isVisible = true
      },
      hide () {
        this.isVisible = false
      }
    }
  }
</script>

<style scoped>
  .beta-banner {
    display: flex;
    justify-content: center;
    padding: 3px;
    min-height: calc(1em + 10px);
  }

  .content {
    padding: 5px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 0 3px rgba(0,0,0, .5);
  }

  .animate-enter-active, .animate-leave-active {
    transition: opacity .5s
  }

  .animate-enter, .animate-leave-to {
    opacity: 0
  }
</style>
