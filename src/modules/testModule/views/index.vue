<template>
  <div class="fz14">
    <div>index</div>
    <img  v-lazy="$root.imageRoot+'common/logo.png'"  alt="">
    <div> 
      {{$t('text')}}
    </div>
    <div>{{str}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input_pick_data: ['name', 'mobile', 'email'],
      input_old_data: null,
      input_data: null,
      ignore_input_data: ['name'],
      goPath: null,
      showModal: false,
      str:""
    }
  },
  mounted() {
    let vm = this;
  },
  methods: {

  }
}
</script>