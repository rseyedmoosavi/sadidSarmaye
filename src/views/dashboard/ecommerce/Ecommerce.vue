<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <b-card>
          <Icons/>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col sm="12" md="12" lg="4" xl="4">
        <Deposits/>
      </b-col>
      <b-col  sm="12" md="12" lg="4" xl="4">
        <PieChart/>
      </b-col>
      <b-col sm="12" md="12" lg="4" xl="4">
        <Profits/>
      </b-col>
    </b-row>

    <b-modal
        id="modal-primary"
        modal-class="modal-primary"
        hide-footer="true"
        centered
        title="تغییر کلمه عبور"
    >
      <ChangePassword/>
    </b-modal>


  </b-container>
</template>

<script>
import PieChart from './component/PieChart'
import ChangePassword from '@/views/pages/profile/ChangePassword'
import Deposits from '@/views/dashboard/ecommerce/component/Deposits'
import Profits from '@/views/dashboard/ecommerce/component/Profits'
import { BRow, BCol, BImg, BCard, BCardBody, BModal, VBModal } from 'bootstrap-vue'
import { PERSON_SEPORDE } from '@/constants/graphql'
import useJwt from '@/auth/jwt/useJwt'
import { initialAbility } from '@/libs/acl/config'
import Ripple from 'vue-ripple-directive'
import Icons from '@/views/dashboard/ecommerce/component/Icons'

export default {
  components: {
    Icons,
    Profits,
    Deposits,
    BRow,
    BCol,
    BImg,
    BCard,
    BCardBody,
    PieChart,
    BModal,
    ChangePassword,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
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
      this.$router.push({ name: 'auth-login' })
    }
  },
  created() {
    if (!localStorage.getItem('userData')) {
      this.logout()
    }
    this.$apollo.mutate({
      mutation: PERSON_SEPORDE,
    })
        .then((result) => {
          this.newData = result.data.me.profile
        })
        .catch((error) => {
          this.logout()
        })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
