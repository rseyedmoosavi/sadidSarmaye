<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <Deposits/>
      </b-col>
      <b-col cols="4">
        <PieChart/>
      </b-col>
      <b-col cols="4">
        <Profits/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PieChart from "./component/PieChart";
import Deposits from "@/views/dashboard/ecommerce/component/Deposits";
import Profits from "@/views/dashboard/ecommerce/component/Profits";
import {BRow, BCol} from 'bootstrap-vue'
import {PERSON_SEPORDE} from "@/constants/graphql";
import useJwt from "@/auth/jwt/useJwt";
import {initialAbility} from "@/libs/acl/config";

export default {
  components: {
    Profits,
    Deposits,
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
    if (!localStorage.getItem('userData')) {
      this.logout()
    }
  },
  methods: {
    logout() {
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
      localStorage.removeItem('userData')
      this.$ability.update(initialAbility)
      this.$router.push({name: 'auth-login'})
    }
  },
  created() {
    if (!localStorage.getItem('userData')) {
      this.logout()
    }
    this.$apollo.mutate({
      mutation: PERSON_SEPORDE,
    }).then((result) => {
      this.newData = result.data.me.profile;
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
