<template>
  <b-row>
    <b-col cols="12">
      <table-kitchen-sink :items="items" title="لیست کاربران"/>
    </b-col>
  </b-row>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import TableKitchenSink from './TableKitchenSink.vue'
import TableUserTransactions from './TableUserTransactions.vue'
import {PROFILE_FOR_DROPDOWN,USER_TRANSACTIONS} from "@/constants/graphql";

export default {
  data() {
    return {
      items: [
        {
          firstName: '',
          lastName: '',
          codeMeli: '',
          mobile: '',
          moaref: '',
          totalSum: '',
          status: 0
        }
      ],
    }
  },
  created() {
    var profiles = new Array(), items
    this.$apollo.mutate({
      mutation: PROFILE_FOR_DROPDOWN,
    }).then((result) => {
      items = result.data.profiles.edges
      for (const item of items) {
        profiles.push({
          "id": item.node.id,
          "firstName": item.node.firstName,
          "lastName": item.node.lastName,
          "codeMeli": item.node.codeMeli,
          "mobile": item.node.mobile,
          "presenter": item.node.presenter,
          "status": Math.floor(Math.random() * 4) + 1
        })
      }
      this.items = profiles
    }).catch((error) => {
      this.logout();
    })

  },
  components: {
    BRow,
    BCol,
    TableKitchenSink,
    TableUserTransactions
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
