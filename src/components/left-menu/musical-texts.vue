<template>
  <div class="box">
    <router-link
      class="link"
      :to="{ name: 'custom-text' }"
      v-text=""
    >
      Custome text
    </router-link>
    <router-link
      class="link"
      v-for="text in musicalTexts"
      :key="text"
      :to="{ name: 'musical-text', params: { name: text } }"
      v-text="text"
    />
  </div>
</template>

<script>
import musicalTexts from 'src/constants/musical-texts'

export default {
  name: 'musical-texts',
  data: () => ({ musicalTexts })
}
</script>

<style mosules>
  .box {
    display: flex;
    flex-direction: column;
  }
</style>
