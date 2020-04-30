<template>
  <div class="left-menu">
    <div class="main-menu">
      <router-link :to="{ name: 'musical-texts' }" class="source">
        Musical
        texts
      </router-link>
    </div>
    <router-view name="sub-menu" class="sub-menu" />
  </div>
</template>

<script>
export default {
  name: 'left-menu'
}
</script>

<style scoped>
.left-menu {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}

.main-menu,
.sub-menu {
  display: flex;
  padding: 10px;
  width: 100px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, .5);
}

.main-menu {
  position: absolute;
  left: 0;
  flex-direction: column;
}

.sub-menu {
  position: absolute;
  left: 100px;
}

.source {
  display: flex;
  padding: 10px;
  cursor: pointer;
}
</style>
