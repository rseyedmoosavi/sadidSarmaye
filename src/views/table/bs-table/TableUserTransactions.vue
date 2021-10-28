<template>
  <b-card-code
      :title="title"
  >
    <b-card-text>
      <span>جستوجو</span>
    </b-card-text>

    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col md="3">
            <b-form-group>
              کاربر
              <validation-provider
                  #default="{ errors }"
                  name="userId"
                  rules="required"
              >
                <v-select
                    v-model="selected"
                    dir="rtl"
                    label="title"
                    :options="presenter"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              نوع
              <validation-provider
                  #default="{ errors }"
                  name="kindId"
                  rules="required"
              >
                <v-select
                    v-model="kindSelected"
                    dir="rtl"
                    label="title"
                    :options="kind"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              از تاریخ
              <validation-provider
                  #default="{ errors }"
                  name="fromDate"
                  rules="required"
              >
                <date-picker v-model="fromDate" :auto-submit="true" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="2">
          <b-form-group>
            تا تاریخ
            <validation-provider
                #default="{ errors }"
                name="toDate"
                rules="required"
            >
              <date-picker v-model="toDate" :auto-submit="true" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          </b-col>
          <b-col cols="2">
            <b-button
                variant="primary"
                type="submit"
                @click.prevent="validationForm"
            >
              جستوجو
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
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
    >
      <template #cell(kindId)="data">
        <b-badge :variant="kindIdType[1][data.value]">
          {{ kindIdType[0][data.value] }}
        </b-badge>
      </template>
      <template #cell(id)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(date)="data">
        {{ getDate(data.value) }}
      </template>
      <template #cell(amount)="data">
        {{ convertToCurrency(data.value) }}
      </template>
    </b-table>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

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
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import moment from 'jalali-moment'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {TRANSACTION_SEARCH} from  '@/constants/graphql'

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
  BCardText
} from 'bootstrap-vue'
import {codeKitchenSink} from './code'
import vSelect from 'vue-select'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {GET_ALL_PRESENTER} from '@/constants/graphql'
import {required, email} from '@validations'

export default {
  components: {
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
    datePicker: VuePersianDatetimePicker
  },
  props: [
    'items',
    'title'
  ],
  data() {
    return {
      fromDate:'',
      toDate:'',
      selected: {title: ''},
      kindSelected: {title: ''},
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
      required,
      email,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      kind: [
        {title: "سپرده گزاری", value: "1"},
        {title: "برداشت", value: "2"},
        {title: "واریز سود", value: "3"},
        {title: "برداشت سود", value: "4"},
        {title: "واریز سود معرف", value: "5"}
      ],
      fields: [
        {key: 'id', label: '#', sortable: true},
        {key: 'fullName', label: 'نام', sortable: true},
        {key: 'kindId', label: 'نوع', sortable: true},
        {key: 'amount', label: 'مبلغ', sortable: true},
        {key: 'date', label: 'تاریخ', sortable: true},
      ],
      kindIdType: [{
        1: 'سپرده گزاری', 2: 'برداشت', 3: 'واریز سود', 4: 'برداشت سود', 5: 'واریز سود معرفی',
      },
        {
          1: 'light-primary', 2: 'light-danger', 3: 'light-info', 4: 'light-warning', 5: 'light-success',
        }],
      codeKitchenSink,
    }
  },
  updated() {
    this.totalRows = 100
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
    this.$apollo.mutate({
      mutation: GET_ALL_PRESENTER
    }).then((presenter) => {
      var presenters = new Array()
      var items = presenter.data.profiles.edges
      for (const item of items) {
        presenters.push({
          'title': item.node.firstName + ' ' + item.node.lastName,
          'value': item.node.id
        })
      }
      this.presenter = presenters
    })
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {

    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          var input = {
            profile_Id:this.selected,
            kind_Id:this.kindSelected,
            effectiveDate_Lte:this.fromDate,
            effectiveDate_Gte:this.toDate
          }
          if (!this.selected.value) {
            delete input.profile_Id
          }
          if (!this.kindSelected.value) {
            delete input.kind_Id
          }
          if (this.fromDate="") {
            delete input.effectiveDate_Lte
          }
          if (this.toDate="") {
            delete input.effectiveDate_Gte
          }

          this.$apollo.mutate({
            mutation: TRANSACTION_SEARCH,
            variables: {
              input: input
            }
          }).then((result) => {
            alert("ok")
            console.log(result)
          }).catch((result) => {
            alert("catch")
          })
        }
      })
    },

    getDate(date) {
      var m = moment(date, 'YYYY-M-D')
      m.locale('fa');
      return m.format('YYYY/MM/DD');
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
