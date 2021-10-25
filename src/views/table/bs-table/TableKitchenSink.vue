<template>
  <b-card-code
      :title="title"
      no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">

        <!-- sorting  -->
        <!--        <b-form-group-->
        <!--          label="Sort"-->
        <!--          label-size="sm"-->
        <!--          label-align-sm="left"-->
        <!--          label-cols-sm="2"-->
        <!--          label-for="sortBySelect"-->
        <!--          class="mr-1 mb-md-0"-->
        <!--        >-->
        <!--          <b-input-group-->
        <!--            size="sm"-->
        <!--          >-->
        <!--            <b-form-select-->
        <!--              id="sortBySelect"-->
        <!--              v-model="sortBy"-->
        <!--              :options="sortOptions"-->
        <!--            >-->
        <!--              <template #first>-->
        <!--                <option value="">-->
        <!--                  none-->
        <!--                </option>-->
        <!--              </template>-->
        <!--            </b-form-select>-->
        <!--            <b-form-select-->
        <!--              v-model="sortDesc"-->
        <!--              size="sm"-->
        <!--              :disabled="!sortBy"-->
        <!--            >-->
        <!--              <option :value="false">-->
        <!--                Asc-->
        <!--              </option>-->
        <!--              <option :value="true">-->
        <!--                Desc-->
        <!--              </option>-->
        <!--            </b-form-select>-->
        <!--          </b-input-group>-->
        <!--        </b-form-group>-->

        <!-- filter -->
        <b-form-group
            label="جستوجو"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="جستوجو..."
            />
            <b-input-group-append>
              <b-button
                  :disabled="!filter"
                  @click="filter = ''"
              >
                لغو
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </b-card-body>

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
      <template #cell(firstName)="data">
        <b-link :href="`#`">
          {{ data.value }}
        </b-link>
      </template>
      <template #cell(lastName)="data">
        <b-link :href="`#`">
          {{ data.value }}
        </b-link>
      </template>
      <template #cell(status)="data">
        <b-badge :variant="status[1][data.value]">
          {{ status[0][data.value] }}
        </b-badge>
      </template>
    </b-table>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
          label="درصفحه"
          label-cols="6"
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
  BLink
} from 'bootstrap-vue'
import {codeKitchenSink} from './code'

export default {
  components: {
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
    BLink
  },
  props: [
    'items',
    'title'
  ],
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {key: 'firstName', label: 'نام', sortable: true},
        {key: 'lastName', label: 'نام خانوادگی', sortable: true},
        {key: 'codeMeli', label: 'کدملی', sortable: true},
        {key: 'mobile', label: 'موبایل', sortable: true},
        {key: 'presenter', label: 'معرف', sortable: true},
        {key: 'totalSum', label: 'جمع سپرده گزاری', sortable: true},
        {key: 'status', label: 'وضعیت', sortable: true},
      ],
      status: [{
        1: 'کاربر جاری', 2: 'در انتظار تایید', 3: 'لغو شده', 4: 'رد صلاحیت', 5: 'تایید شده',
      },
        {
          1: 'light-primary', 2: 'light-info', 3: 'light-warning', 4: 'light-danger', 5: 'light-success',
        }],
      codeKitchenSink,
    }
  },
  updated() {
    this.totalRows = this.items.length
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
          .filter(f => f.sortable)
          .map(f => ({text: f.label, value: f.key}))
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
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
