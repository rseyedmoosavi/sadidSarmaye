<template>
  <div variant="success">
    <feather-icon
        icon="UserIcon"
        size="21"
    />
    {{ getFullName() }}
  </div>
</template>

<script>
export default {
  name: 'FullName',
  components: {},
  methods: {
    getFullName() {
      return localStorage.getItem('fullName')
    }
  }
}
</script>
