<template>
  <h1 @click="logout">
    logout
  </h1>
</template>

<script>
  import useJwt from "@/auth/jwt/useJwt";
  import {initialAbility} from "@/libs/acl/config";

  export default {
    mounted() {
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    }
  }
</script>
