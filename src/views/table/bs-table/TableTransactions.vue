<template>
  <b-row>
    <b-col cols="12">
      <table-user-transactions :items="userTransactions" title="لیست تراکنش ها"/>
    </b-col>
  </b-row>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import TableKitchenSink from './TableKitchenSink.vue'
import TableUserTransactions from './TableUserTransactions.vue'
import {USER_TRANSACTIONS} from "@/constants/graphql";

export default {
  data() {
    return {
      userTransactions: [
        {
          fullName:'',
          id: '',
          kindId: '',
          amount: '',
          date: ''
        }
      ]
    }
  },
  created() {
    this.$apollo.mutate({
      mutation: USER_TRANSACTIONS,
      variables:{
      }
    }).then((result) => {
      let transactions = [];
      let items = result.data.transactions.edges
      for (const item of items) {
        transactions.push({
          "fullName":item.node.profile.firstName+' '+item.node.profile.lastName,
          "id": item.node.id,
          "kindId": item.node.kind.id,
          "amount": item.node.amount,
          "date": item.node.effectiveDate,
        })
      }
      this.userTransactions = transactions
    }).catch((error) => {
      console.log(error)
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
