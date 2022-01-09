<template>
  <b-card
      class="card-browser-states"
  >
    <b-card-header>
      <b-card-title>سپرده های منقضی شده</b-card-title>
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

        <template #cell(id)="data">
          {{ data.value}}
        </template>
        <template #cell(date)="data">
          {{ toShamsiDate(data.value) }}
        </template>
        <template #cell(expireDate)="data">
          {{ toShamsiDate(data.value) }}
        </template>
        <template #cell(amount)="data">
          <span v-b-modal.renew @click="setAmount(data.value,data.item.id,data.item.date)">{{ convertToCurrency(data.value) }}</span>
        </template>
      </b-table>
<!--      <router-link class="text-left" style="float: left" to="/transaction">مشاهده همه</router-link>-->
    </b-card-body>

    <b-modal
        id="renew"
        title="ثبت تراکنش جدید"
        hide-footer
    >
      <FormRenewTransaction :amount="amount" :receiptNumber="receiptNumber" :effective-date="date" :time="new Date().toLocaleTimeString()"/>
    </b-modal>
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
  VBTooltip,
  VBModal
} from 'bootstrap-vue'
import { DEPOSIT_FOR_HOME_PAGE, DEPOSIT_FOR_RENEW } from '@/constants/graphql'
import FormRenewTransaction from '@/views/forms/form-validation/FormRenewTransaction'
export default {
  components: {
    FormRenewTransaction,
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
    BBadge,VBModal,
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
      amount:null,
      receiptNumber:null,
      date:null,
      mutableItems: this.items,
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      totalSum:0,
      fields: [
        {key: 'id', label: '#', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
        {key: 'amount', label: 'مبلغ', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
        {key: 'date', label: 'تاریخ', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
        {key: 'expireDate', label: 'تاریخ انقضا', sortable: true, tdClass: 'text-center text-info', thClass: 'text-center text-primary'},
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
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth().toString()
    if(month.length===1){
      month=`${month+1}`
    }
    let day=date.getDate().toString()
    if(day.length===1){
      day=`0${day}`
    }
    date=`${year}-${month}-${day}`
    this.loading = 1;
    this.$apollo.mutate({
      mutation: DEPOSIT_FOR_RENEW,
      variables: {
        expireDate:date
      }
    }).then((result) => {
      let transactions = [];
      let items = result.data.transactions.edges
      for (const item of items) {
        transactions.push({
          "id": item.node.id,
          "amount": item.node.amount,
          "date": item.node.effectiveDate,
          "expireDate":item.node.expireDate
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
    setAmount(amount,id,date){
      this.amount=amount
      this.receiptNumber=id
      this.date=this.toShamsiDate(date)
    },
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
