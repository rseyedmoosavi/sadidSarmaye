<template>
  <b-card
      class="card-browser-states"
  >
    <b-card-header>
      <b-card-title>سپرده ها</b-card-title>
      <b-card-title class="text-success">
        <small v-if="!loading" id="somOfDeposits" v-b-tooltip.hover.v-info :title=num2per(totalSum/10)>مجموع : {{convertToCurrency(totalSum)}} ریال</small>
      </b-card-title>
    </b-card-header>
    <b-card-body>
      <div v-if="loading" style="text-align: center" class="d-flex justify-content-center mb-1">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <b-table v-if="!loading"
               small
               hover
               responsive
               class="position-relative"
               :per-page="perPage"
               :current-page="currentPage"
               :items="items"
               :fields="fields"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :sort-direction="sortDirection"
               ref="table"
               head-variant="primary"
      >
        <template #cell(fullName)="data">
          <b-link class="icon-align-center" :href="`/forms/transaction/`+data.item.id">
            {{ data.value }}
          </b-link>
        </template>
        <template #cell(kindId)="data">
          <b-badge :variant="kindIdType[1][data.value]">
            {{ kindIdType[0][data.value] }}
          </b-badge>
        </template>
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(date)="data">
          {{ toShamsiDate(data.value) }}
        </template>
        <template #cell(amount)="data">
          {{ convertToCurrency(data.value) }}
        </template>
      </b-table>
      <router-link class="text-left" style="float: left" to="/transaction">مشاهده همه</router-link>
    </b-card-body>
  </b-card>
</template>

<script>
import moment from 'jalali-moment'
import Num2persian from 'num2persian';
import FormCreateTransaction from "@/views/forms/form-validation/FormCreateTransaction";
import {
  BTable,
  BCol,
  BRow,
  BCardText,
  BCard,
    BCardBody,
  BCardHeader,
  BCardTitle,
  BSpinner,
  BBadge,
  VBTooltip
} from 'bootstrap-vue'
import {DEPOSIT_FOR_HOME_PAGE} from '@/constants/graphql'
export default {
  components: {
    FormCreateTransaction,
    BTable,
    BCol,
    BRow,
    BCardText,
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BSpinner,
    BBadge,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: [
    'items',
    'title'
  ],
  data() {
    return {
      loading: 1,
      mutableItems: this.items,
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      totalSum:0,
      fields: [
        {key: 'id', label: '#', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
        {key: 'amount', label: 'مبلغ', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
        {key: 'date', label: 'تاریخ', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
      ],
      kindIdType: [{
        1: 'سپرده گزاری', 2: 'برداشت', 3: 'واریز سود', 4: 'برداشت سود', 5: 'واریز سود معرفی',
      },
        {
          1: 'light-primary', 2: 'light-danger', 3: 'light-info', 4: 'light-warning', 5: 'light-success',
        }],
    }
  },
  updated() {
    this.totalRows = this.items.length
  },
  mounted() {
    this.loading = 1;
    this.$apollo.mutate({
      mutation: DEPOSIT_FOR_HOME_PAGE,
      variables: {
        offset:0,
        first:10,
        kindId:1
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
      this.totalSum=result.data.transactions.totalSum
      this.items = transactions
      this.loading = 0
    }).catch((error) => {
      console.log(error)
    })
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    num2per(price) {
      return Num2persian(price) + " تومان"
    },
    toShamsiDate(date) {
      return moment(date, 'YYYY-M-D').locale('fa').format('YYYY/MM/DD')
    },
    toGregorianDate(date) {
      if (date) {
        return moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD')
      }
    },
    convertToCurrency(Number) {
      let x, y, z;
      Number += '';
      Number = Number.replace(',', '');
      x = Number.split('.');
      y = x[0];
      z = x.length > 1 ? '.' + x[1] : '';
      let rgx = /(\d+)(\d{3})/;
      while (rgx.test(y))
        y = y.replace(rgx, '$1' + ',' + '$2');
      return y + z;
    },
  },
}
</script>
