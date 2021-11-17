<template>
  <b-nav-item>
    <b-img :src="require('@/assets/images/banner/banner-8.jpg')" :height="40" :width="830" />
  </b-nav-item>
</template>

<script>
import {BImg} from "bootstrap-vue";
export default {
  name: 'Today',
  components: {
    BImg
  },
}
</script>
