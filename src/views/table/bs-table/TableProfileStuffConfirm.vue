<template>
  <b-row>
    <b-col cols="12">
      <table-user-profile-stuff-confirm :items="profile" title="لیست ثبت نام های منتظر تایید"/>
    </b-col>
  </b-row>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import TableKitchenSink from './TableKitchenSink.vue'
import { PROFILE_STUFF_CONFIRM } from '@/constants/graphql'
import TableUserProfileStuffConfirm from '@/views/table/bs-table/TableUserProfileStuffConfirm'
export default {
  data() {
    return {
      profile: [
        {
          id: '',
          firstName: '',
          lastName: '',
          nationalCode:null,
          birthDate:null,
        }
      ]
    }
  },
  created() {
    this.$apollo.mutate({
      mutation: PROFILE_STUFF_CONFIRM,
    }).then((result) => {
      let profile = [];
      let items = result.data.profiles.edges
      for (const item of items) {
        profile.push({
          "id": item.node.id,
          "firstName": item.node.firstName,
          "lastName": item.node.lastName,
          "nationalCode":item.node.nationalCode,
          "birthDate":item.node.birthDate,
        })
      }
      this.profile = profile
    }).catch((error) => {
      console.log(error)
    })

  },
  components: {
    TableUserProfileStuffConfirm,
    BRow,
    BCol,
    TableKitchenSink,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
