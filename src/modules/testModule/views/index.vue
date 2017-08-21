<template>
  <div class="fz14">
    <div>index</div>
  </div>
</template>
<style>
.btnceshi {
  color: #fff;
  background-color: #00bff6;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      input_pick_data: ['name', 'mobile', 'email'],
      input_old_data: null,
      input_data: null,
      ignore_input_data: ['name'],
      goPath: null,
      showModal: false
    }
  },
  mounted() {
    let vm = this;

  },
  methods: {

  }
}
</script>