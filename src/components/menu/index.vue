<template>
  <div class="menu" :class="stateClass">
    <div class="tab" @click="toggle">Open menu</div>
    <i class="mdi close" @click="toggle">close</i>
    <nav class="nav">
      <div v-if="!isAuth">
        <router-link class="item" :to="{ name: 'signin' }" @click.native="sigin">Sign in</router-link>
        or
        <router-link class="item" :to="{ name: 'signup' }" @click.native="sigin">Sign up</router-link>
      </div>
      <router-link v-else class="item" to="/" @click.native="mSignout">Logout</router-link>
    </nav>
  </div>
</template>

<script>
  import auth from 'src/modules/auth'

  export default {
    name: 'menu',
    props: {
      isAuth: {
        required: true,
        type: Boolean
      },
      signout: {
        required: true,
        type: Function
      }
    },
    data: () => ({
      isVisible: false
    }),
    computed: {
      stateClass () {
        return this.isVisible ? 'show' : ''
      }
    },
    methods: {
      toggle () {
        this.isVisible = !this.isVisible
      },
      sigin () {
        this.isVisible = false
      },
      mSignout () {
        this.isVisible = false
        this.signout()
      }
    }
  }
</script>

<style scoped>
  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    transform: translateY(100%);
    width: 100vw;
    height: 100vh;
    background-color: white;
    transition: transform .3s ease-in-out;
  }

  .show {
    transform: translateY(0);
  }

  .tab {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    transform: translateY(-100%);
    border-radius: 70% 70% 0 0;
    border: 1px solid rgba(0, 0, 0, .2);
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    color: black;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .nav .item {
    cursor: pointer;
    text-decoration: none;
    font-size: 24px;
    color: black;
  }
</style>
