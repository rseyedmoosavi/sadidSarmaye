<template>
  <b-nav-item style="color: #4573ff">
    {{getFullName()}}
  </b-nav-item>
</template>

<script>
export default {
  name: 'FuuName',
  components: {
  },
  methods:{
    getFullName(){
      return localStorage.getItem("fullName")
    }
  }
}
</script>
