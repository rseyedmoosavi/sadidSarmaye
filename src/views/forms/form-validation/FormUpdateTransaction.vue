<template>
  <b-card-code
      :title="title"
  >
    <b-card-text>
      <span>ویرایش تراکنش </span>
    </b-card-text>

    <!-- form -->
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col md="6">
            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="profileID"
                  rules="required"
              >
                <v-select
                    v-model="selected"
                    label="title"
                    :options="users"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="amount"
                  rules="required"
              >
                <b-form-input
                    v-model="amount"
                    :state="errors.length > 0 ? false:null"
                    placeholder="مبلغ"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="effectiveDate"
                  rules=""
              >
                <date-picker label="تاریخ" v-model="effectiveDate" :auto-submit="true"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="kindId"
                  rules="required"
              >
                <v-select
                    v-model="kindSelected"
                    label="title"
                    :options="kind"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="description"
                  rules="required"
              >
                <b-form-input
                    v-model="description"
                    :state="errors.length > 0 ? false:null"
                    placeholder="توضیحات"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->
          </b-col>
          <b-col cols="12">
            <b-button
                variant="primary"
                type="submit"
                @click.prevent="validationForm"
            >
              ذخیره
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <template #code>
      {{ codeSimple }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import vSelect from 'vue-select'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BCardText,
} from 'bootstrap-vue'
import {required, email} from '@validations'
import {GET_TRANSACTION,GET_ALL_PRESENTER,UPDATE_TRANSACTION} from '@/constants/graphql'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'jalali-moment'


export default {
  props: [
    'title',
    'user'
  ],
  mounted() {
    this.$apollo.mutate({
      mutation: GET_TRANSACTION,
      variables: {
        id: this.$route.params.id
      }
    }).then((result) => {
      this.$apollo.mutate({
        mutation: GET_ALL_PRESENTER,
      }).then((result) => {
        var users = new Array()
        var items = result.data.profiles.edges
        for (const item of items) {
          users.push({
            'title': item.node.firstName + ' ' + item.node.lastName,
            'value': item.node.id
          })
        }
        this.users = users
      })
      let item = result.data.transactions.edges[0].node
      this.amount = item.amount
      this.profileId = item.profile.id
      this.kindSelected.value = item.kind.id
      this.kindSelected.title = item.kind.title
      this.selected.title=item.profile.firstName+' '+item.profile.lastName
      this.selected.value=item.profile.id
      this.description = item.description
      this.effectiveDate = this.toShamsiDate(item.effectiveDate)
    })
  },
  components: {
    BCardCode,
    ValidationProvider,
    ValidationObserver,
    BCardText,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    vSelect,
    datePicker: VuePersianDatetimePicker
  },
  data() {
    return {
      selected: {title: '',value: null},
      kindSelected: {title: '', value: null},
      kind: [
        {title: "سپرده گزاری", value: 1},
        {title: "مرجوعی", value: 2},
        {title: "واریز سود", value: 3},
        {title: "برداشت سود", value: 4}
      ],
      profileId: 0,
      users: '',
      amount: null,
      effectiveDate: null,
      kindId: null,
      description: '',
      required,
      email,
    }
  },
  methods: {
    toShamsiDate(date) {
      return moment(date, 'YYYY-M-D').locale('fa').format('YYYY/MM/DD')
    },
    toGregorianDate(date) {
      if (date) {
        return moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD')
      }
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          this.$apollo.mutate({
            mutation: UPDATE_TRANSACTION,
            variables: {
              input: {
                id:this.$route.params.id,
                profileId: Number(this.selected.value),
                // amount: this.amount,
                effectiveDate: this.toGregorianDate(this.effectiveDate),
                kindId: Number(this.kindSelected.value),
                description: this.description
              }
            }
          }).then((result) => {
            // console.log(result.data.profiles.edges[0].node.firstName)
            console.log(result)
          }).catch((result) => {
            alert("catch")
          })
        }
      })
    },
  },
}
</script>
