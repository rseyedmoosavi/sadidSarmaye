<template>
  <b-row>
    <b-col cols="12">
      <table-user-transactions-boss-confirm :items="userTransactions" title="لیست تراکنش های منتظر تایید رییس"/>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import TableKitchenSink from './TableKitchenSink.vue'
import { TRANSACTION_BOSS_CONFIRM } from '@/constants/graphql'
import TableUserTransactionsBossConfirm from '@/views/table/bs-table/TableUserTransactionsBossConfirm'

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
      mutation: TRANSACTION_BOSS_CONFIRM,
      variables: {
        state: 'STUFF_CONFIRMED'
      }
    })
        .then((result) => {
          console.clear()
          let transactions = []
          let items = result.data.transactions.edges
          for (const item of items) {
            let stuff = item.node.stateHistory
            let stuffProfile = stuff.find(function (post) {
              if (post.transition === 'to_stuff_confirm') {
                return true
              }
            })
            if (!stuffProfile.by.profile) {
              stuffProfile.by.profile = {
                firstName: 'نامعلوم',
                lastName: ''
              }
            }
            console.log(stuffProfile.by.profile)
            transactions.push({
              'id': item.node.id,
              'amount': item.node.amount,
              'userDate': item.node.effectiveDate,
              'customer': item.node.profile.firstName + ' ' + item.node.profile.lastName,
              'stuff': stuffProfile.by.profile.firstName + ' ' + stuffProfile.by.profile.lastName,
              'stuffDate':stuffProfile.timestamp
            })
          }
          this.userTransactions = transactions
        })
        .catch((error) => {
          console.log(error)
        })

  },
  methods: {
    filterIt(arr, searchKey) {
      return arr.filter(function (obj) {
        return Object.keys(obj)
            .some(function (key) {
              return obj[key].includes(searchKey)
            })
      })
    }
  },
  components: {
    TableUserTransactionsBossConfirm,
    BRow,
    BCol,
    TableKitchenSink,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
