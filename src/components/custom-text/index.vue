<template>
  <div class="box">
    <form v-if="!textCreated" class="form" @submit="onSubmit">
      <div class="row">
        <button class="btn save" type="submit" name="submit">Save</button>
      </div>
      <div class="row">
        <textarea
          class="textarea"
          name="name"
          rows="8"
          cols="80"
          v-model="text"
          title="some title"
        />
      </div>
    </form>
    <div v-else class="text-created">
      <div class="row">
        <button class="edit-button" @click="goToEdit">exit text</button>
      </div>
      <div class="row">
        <pre class="text" v-text="text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-text',
  data: () => ({
    text: '',
    textCreated: false
  }),
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.textCreated = true
    },
    goToEdit () {
      this.textCreated = false
    }
  }
}
</script>

<style scoped>
  .box {
    padding: 10px;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .btn {
    width: 100px;
  }

  .row {
    display: flex;
    justify-content: center;
  }

  .row + .row {
    margin-top: 10px;
  }

  .textarea {
    width: 300px;
  }

  .text-created {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
  }

  .edit-button {
    display: inline-block;
  }

  .text {
    display: inline-block;
    margin: 0;
  }
</style>
