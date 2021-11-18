<template>
  <b-nav-item>
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
