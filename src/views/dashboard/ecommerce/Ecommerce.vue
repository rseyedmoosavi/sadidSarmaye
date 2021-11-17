<template>
<PieChart/>
</template>

<script>
import PieChart from "./component/PieChart";
import {BRow, BCol} from 'bootstrap-vue'
import {PERSON_SEPORDE} from "@/constants/graphql";
import useJwt from "@/auth/jwt/useJwt";
import {initialAbility} from "@/libs/acl/config";
export default {
  components: {
    BRow,
    BCol,
    PieChart
  },
  data() {
    return {
      data: {},
      newData: {},
    }
  },
  mounted() {
    if (!localStorage.getItem('userData')){
      this.logout()
    }
  },
  methods:{
    logout() {
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
      localStorage.removeItem('userData')
      this.$ability.update(initialAbility)
      this.$router.push({ name: 'auth-login' })
    }
  },
  created() {
    if (!localStorage.getItem('userData')){
      this.logout()
    }
    this.$apollo.mutate({
      mutation: PERSON_SEPORDE,
    }).then((result) => {
      this.newData=result.data.me.profile;
    }).catch((error) => {
      this.logout();
    })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
