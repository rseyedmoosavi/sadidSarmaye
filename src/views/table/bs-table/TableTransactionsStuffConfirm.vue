<template>
  <b-row>
    <b-col cols="12">
      <table-user-transactions-stuff-confirm :items="userTransactions" title="لیست تراکنش های منتظر تایید"/>
    </b-col>
  </b-row>
</template>

<script>
import {BRow, BCol} from 'bootstrap-vue'
import TableKitchenSink from './TableKitchenSink.vue'
import { TRANSACTION_STUFF_CONFIRM } from '@/constants/graphql'
import TableUserTransactionsStuffConfirm from '@/views/table/bs-table/TableUserTransactionsStuffConfirm'

export default {
  data() {
    return {
      userTransactions: [
        {
          id: '',
          amount: '',
          date: ''
        }
      ]
    }
  },
  created() {
    this.$apollo.mutate({
      mutation: TRANSACTION_STUFF_CONFIRM,
      variables:{
      }
    }).then((result) => {
      let transactions = [];
      let items = result.data.transactions.edges
      for (const item of items) {
        transactions.push({
          "id": item.node.id,
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
    TableUserTransactionsStuffConfirm,
    BRow,
    BCol,
    TableKitchenSink,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
