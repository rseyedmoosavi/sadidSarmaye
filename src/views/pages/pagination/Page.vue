<template>
  <b-card
      no-body
      class="card-browser-states"
  >
    <b-row>
      <b-col cols="12">
        <b-table striped hover responsive class="position-relative" show-empty :items="items" :fields="fields"
                 :current-page="currentPage" :per-page="0"></b-table>
        <b-pagination align="fill" size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {USER_TRANSACTIONS} from '@/constants/graphql'
import {
  BTable,
  BPagination,
  BCard,
  BRow,
  BCol
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BPagination,
    BCard,
    BRow,
    BCol
  },
  data() {
    return {
      items: [],
      fields: [
        {key: 'id', label: '#', sortable: true},
        {key: 'fullName', label: 'نام', sortable: true},
        {key: 'kindId', label: 'نوع', sortable: true},
        {key: 'amount', label: 'مبلغ', sortable: true},
        {key: 'date', label: 'تاریخ', sortable: true},
      ],
      currentPage: 0,
      perPage: 10,
      pageOptions: [30, 50, 100],
      totalItems: 0
    }
  },
  mounted() {
    this.fetchData().catch(error => {
      console.error(error)
    })
  },

  methods: {
    async fetchData() {
      this.$apollo.mutate({
        mutation: USER_TRANSACTIONS,
        variables: {
          first: this.perPage,
          offset: this.currentPage * 10
        }
      }).then((result) => {
        let transactions = new Array()
        let items = result.data.transactions.edges
        for (const item of items) {
          transactions.push({
            "fullName": item.node.profile.firstName + ' ' + item.node.profile.lastName,
            "id": item.node.id,
            "kindId": item.node.kind.id,
            "amount": item.node.amount,
            "date": item.node.effectiveDate,
          })
        }
        this.totalItems = parseInt(result.data.transactions.totalCount, 10)
        this.items = transactions
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    currentPage: {
      handler: function (value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      }
    }
  }
}
</script>
