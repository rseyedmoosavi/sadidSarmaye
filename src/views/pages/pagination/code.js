export const codeKitchenSink = `
<template>
  <b-row>
    <b-col
      md="2"
      sm="4"
      class="my-1"
    >
      <b-form-group
        class="mb-0"
      >
        <label class="d-inline-block text-sm-left mr-50">Per page</label>
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          :options="pageOptions"
          class="w-50"
        />
      </b-form-group>
    </b-col>
    <b-col
      md="4"
      sm="8"
      class="my-1"
    >
      <b-form-group
        label="Sort"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="sortBySelect"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-select
            id="sortBySelect"
            v-model="sortBy"
            :options="sortOptions"
            class="w-75"
          >
            <template v-slot:first>
              <option value="">
                -- none --
              </option>
            </template>
          </b-form-select>
          <b-form-select
            v-model="sortDesc"
            size="sm"
            :disabled="!sortBy"
            class="w-25"
          >
            <option :value="false">
              Asc
            </option>
            <option :value="true">
              Desc
            </option>
          </b-form-select>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col
      md="6"
      class="my-1"
    >
      <b-form-group
        label="Filter"
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
            placeholder="Type to Search"
          />
          <b-input-group-append>
            <b-button
              :disabled="!filter"
              @click="filter = ''"
            >
              Clear
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>

    <b-col cols="12">
      <b-table
        striped
        hover
        responsive
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
        <template #cell(avatar)="data">
          <b-avatar :src="data.value" />
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
      </b-table>
    </b-col>

    <b-col
      cols="12"
    >
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        size="sm"
        class="my-0"
      />
    </b-col>
  </b-row>
</template>

<script>
import {
  BTable, BAvatar, BBadge, BRow, BCol, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BAvatar,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
  },
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
        {
          key: 'id', label: 'Id',
        },
        {
          key: 'avatar', label: 'Avatar',
        },
        { key: 'full_name', label: 'Full Name', sortable: true },
        { key: 'post', label: 'Post', sortable: true },
        'email',
        'city',
        'start_date',
        'salary',
        'age',
        'experience',
        { key: 'status', label: 'Status', sortable: true },
      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/10-small.png'),
          full_name: "Korrie O'Crevy",
          post: 'Nuclear Power Engineer',
          email: 'kocrevy0@thetimes.co.uk',
          city: 'Krasnosilka',
          start_date: '09/23/2016',
          salary: '$23896.35',
          age: '61',
          experience: '1 Year',
          status: 2,
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/1-small.png'),
          full_name: 'Bailie Coulman',
          post: 'VP Quality Control',
          email: 'bcoulman1@yolasite.com',
          city: 'Hinigaran',
          start_date: '05/20/2018',
          salary: '$13633.69',
          age: '63',
          experience: '3 Years',
          status: 2,
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/9-small.png'),
          full_name: 'Stella Ganderton',
          post: 'Operator',
          email: 'sganderton2@tuttocitta.it',
          city: 'Golcowa',
          start_date: '03/24/2018',
          salary: '$13076.28',
          age: '66',
          experience: '6 Years',
          status: 5,
        },
        {
          id: 4,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/3-small.png'),
          full_name: 'Dorolice Crossman',
          post: 'Cost Accountant',
          email: 'dcrossman3@google.co.jp',
          city: 'Paquera',
          start_date: '12/03/2017',
          salary: '$12336.17',
          age: '22',
          experience: '2 Years',
          status: 2,
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/4-small.png'),
          full_name: 'Harmonia Nisius',
          post: 'Senior Cost Accountant',
          email: 'hnisius4@gnu.org',
          city: 'Lucan',
          start_date: '08/25/2017',
          salary: '$10909.52',
          age: '33',
          experience: '3 Years',
          status: 2,
        },
        {
          id: 6,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/5-small.png'),
          full_name: 'Genevra Honeywood',
          post: 'Geologist',
          email: 'ghoneywood5@narod.ru',
          city: 'Maofan',
          start_date: '06/01/2017',
          salary: '$17803.80',
          age: '61',
          experience: '1 Year',
          status: 1,
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/7-small.png'),
          full_name: 'Eileen Diehn',
          post: 'Environmental Specialist',
          email: 'ediehn6@163.com',
          city: 'Lampuyang',
          start_date: '10/15/2017',
          salary: '$18991.67',
          age: '59',
          experience: '9 Years',
          status: 3,
        },
        {
          id: 8,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/9-small.png'),
          full_name: 'Richardo Aldren',
          post: 'Senior Sales Associate',
          email: 'raldren7@mtv.com',
          city: 'Skoghall',
          start_date: '11/05/2016',
          salary: '$19230.13',
          age: '55',
          experience: '5 Years',
          status: 3,
        },
        {
          id: 9,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/2-small.png'),
          full_name: 'Allyson Moakler',
          post: 'Safety Technician',
          email: 'amoakler8@shareasale.com',
          city: 'Mogilany',
          start_date: '12/29/2018',
          salary: '$11677.32',
          age: '39',
          experience: '9 Years',
          status: 5,
        },
        {
          id: 10,
          // eslint-disable-next-line global-require
          avatar: require('@/assets/images/avatars/6-small.png'),
          full_name: 'Merline Penhalewick',
          post: 'Junior Executive',
          email: 'mpenhalewick9@php.net',
          city: 'Kanuma',
          start_date: '04/19/2019',
          salary: '$15939.52',
          age: '23',
          experience: '3 Years',
          status: 2,
        },
      ],
      status: [{
        1: 'Current', 2: 'Professional', 3: 'Rejected', 4: 'Resigned', 5: 'Applied',
      },
      {
        1: 'light-primary', 2: 'light-success', 3: 'light-danger', 4: 'light-warning', 5: 'light-info',
      }],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = \`Row index: \${index}\`
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
    `