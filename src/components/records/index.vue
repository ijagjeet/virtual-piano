<template>
  <div class="records">
    <div class="item" v-for="record in records">
      <div>
        <Item
          :key="record.uid"
          :record="record"
          :getSharedLink="getSharedLink"
          :shareRecord="shareRecord"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Item from './item.vue'

  export default {
    name: 'records',
    props: {
      records: {
        required: true,
        type: Array
      },
      getSharedLink: {
        required: true,
        type: Function
      },
      shareRecord: {
        required: true,
        type: Function
      }
    },
    components: { Item }
  }
</script>

<style scoped>
  .records {
    display: flex;
    padding: 5px;
    margin-top: 20px;
    overflow: auto;
  }

  .item {
    padding: 5px;
  }

  .item + .item {
    margin-left: 5px;
  }
</style>
