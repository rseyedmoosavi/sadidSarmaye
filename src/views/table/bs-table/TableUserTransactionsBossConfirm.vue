<template>
  <b-card
      no-body
      class="card-browser-states"
  >
    <b-card-header>
      <div>
        <b-card-title>
          {{ title }}
        </b-card-title>
      </div>
      <feather-icon
          icon="PlusIcon"
          size="18"
          class="cursor-pointer"
      />
    </b-card-header>
    <b-card-body>
      <b-table
          striped
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
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
          ref="table"
      >
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(userDate)="data">
          {{ toShamsiDate(data.value) }}
        </template>
        <template #cell(amount)="data">
          <b-link :href="`/transaction/boss-confirm/`+data.item.id">{{data.value}}</b-link>
        </template>
        <template #cell(stuffDate)="data">
          {{ toShamsiDate(data.value) }}
        </template>
      </b-table>

      <b-card-body v-if="!loading" class="d-flex justify-content-between flex-wrap pt-0">

        <!-- page length -->
        <b-form-group
            label="درصفحه"
            label-cols="3"
            label-align="right"
            label-size="sm"
            label-for="sortBySelect"
            class="text-nowrap mb-md-0 mr-1"
        >
          <b-form-select
              id="perPageSelect"
              v-model="perPage"
              size="sm"
              inline
              :options="pageOptions"
          />
        </b-form-group>

        <!-- pagination -->
        <div>
          <b-pagination
              align="left"
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
              class="mb-0"
          >
            <template #prev-text>
              <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
              />
            </template>
          </b-pagination>
        </div>
      </b-card-body>

      <template #code>
        {{ codeKitchenSink }}
      </template>
    </b-card-body>
  </b-card>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import moment from 'jalali-moment'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {TRANSACTION_SEARCH} from '@/constants/graphql'
import Ripple from 'vue-ripple-directive'
import FormCreateTransaction from "@/views/forms/form-validation/FormCreateTransaction";

import {
  BTable,
  BAvatar,
  BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BCardBody,
  BLink,
  BCol,
  BRow,
  BForm,
  BCardText,
  BSpinner,
  BCard,
  BCardHeader,
  BCardTitle,
  BModal,
  VBModal,
} from 'bootstrap-vue'
import {codeKitchenSink} from './code'
import vSelect from 'vue-select'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {GET_ALL_PRESENTER} from '@/constants/graphql'
import {required, email} from '@validations'

export default {
  components: {
    FormCreateTransaction,
    ValidationProvider,
    ValidationObserver,
    BCardCode,
    BTable,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCardBody,
    BLink,
    vSelect,
    BCol,
    BRow,
    BForm,
    BCardText,
    BSpinner,
    BCard,
    BCardHeader,
    BCardTitle,
    BModal,
    datePicker: VuePersianDatetimePicker
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: [
    'items',
    'title'
  ],
  data() {
    return {
      fullName:null,
      stuffFullName:null,
      stuffDate:null,
      loading: 1,
      mutableItems: this.items,
      perPage: 30,
      pageOptions: [30, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      presenter: Array(),
      // infoModal: {
      //   id: 'info-modal',
      //   title: 'sghl',
      //   content: '',
      // },
      fields: [
        {key: 'id', label: '#', sortable: true},
        {key: 'amount', label: 'مبلغ', sortable: true},
        {key: 'customer', label: 'مشتری', sortable: true},
        {key: 'userDate', label: 'تاریخ شروع قرارداد', sortable: true},
        {key: 'stuff', label: 'تایید کننده', sortable: true},
        {key: 'stuffDate', label: 'تاریخ تایید', sortable: true},
      ],
      // codeKitchenSink,
    }
  },
  updated() {
    this.totalRows = this.items.length
  },
  computed: {
    sortOptions() {
      this.totalRows = this.items.length
      // Create an options list from our fields
      return this.fields
          .filter(f => f.sortable)
          .map(f => ({text: f.label, value: f.key}))
    },
  },
  mounted() {
    this.loading = 1;
    this.totalRows = this.items.length
  },
  watch: {
    items(val, oldVal) {
      // console.log(val,oldVal)
    }
  },
  methods: {
    validationForm() {
      // this.$refs.simpleRules.validate().then(success => {
      //   if (success) {
      //     this.loading = 1;
      //     let input = {
      //       profile_Id: (this.selected ? this.selected.value : null),
      //       kind_Id: (this.kindSelected ? this.kindSelected.value : null),
      //       effectiveDate_Gte: this.fromDate,
      //       effectiveDate_Lte: this.toDate
      //     }
      //     if (this.fromDate === "") {
      //       delete input.effectiveDate_Gte
      //     }
      //     if (this.toDate === "") {
      //       delete input.effectiveDate_Lte
      //     }
      //
      //     this.$apollo.mutate({
      //       mutation: TRANSACTION_SEARCH,
      //       variables: {
      //         effectiveDate_Gte: this.toGregorianDate(input.effectiveDate_Gte),
      //         effectiveDate_Lte: this.toGregorianDate(input.effectiveDate_Lte)
      //       }
      //     }).then((result) => {
      //       let transactions = new Array()
      //       let items = result.data.transactions.edges
      //       for (const item of items) {
      //         transactions.push({
      //           "id": item.node.id,
      //           "amount": item.node.amount,
      //           "date": item.node.effectiveDate
      //         })
      //       }
      //       this.totalRows = this.items.length
      //       this.items = transactions;
      //       this.$refs.table.refresh();
      //       this.loading = 0
      //     }).catch((result) => {
      //       alert("catch")
      //       JSON.stringify(this.fromDate);
      //
      //     })
      //   }
      // })
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
      var x, y, z;
      Number += '';
      Number = Number.replace(',', '');
      Number = Number.replace(',', '');
      Number = Number.replace(',', '');
      Number = Number.replace(',', '');
      Number = Number.replace(',', '');
      Number = Number.replace(',', '');
      x = Number.split('.');
      y = x[0];
      z = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(y))
        y = y.replace(rgx, '$1' + ',' + '$2');
      return y + z;
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
