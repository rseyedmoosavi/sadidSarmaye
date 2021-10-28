<template>
  <b-card-code
      :title="title"
  >
    <b-card-text>
      <span>ایجاد تراکنش جدید</span>
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
                    :dir="rtl"
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
                  rules="required"
              >
                <b-form-input
                    v-model="effectiveDate"
                    :state="errors.length > 0 ? false:null"
                    placeholder="تارخ واریز"
                />
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
                    :dir="rtl"
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
import {CREATE_TRANSACTION,GET_ALL_PRESENTER,USER_TRANSACTIONS} from '@/constants/graphql'


export default {
  props: [
    'title',
    'user'
  ],
  mounted() {
      this.$apollo.mutate({
        mutation: USER_TRANSACTIONS,
        variables:{
          profileId: 2
        }
      }).then((presenter) => {
        var users = new Array()
        var items = presenter.data.profiles.edges
        for (const item of items) {
          users.push({
            'title': item.node.firstName + ' ' + item.node.lastName,
            'value': item.node.id
          })
        }
        this.users = users
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
    vSelect
  },
  data() {
    return {
      selected: {title: ''},
      kindSelected: {title: ''},
      kind:[
        {title: "سپرده گزاری",value:"1"},
        {title: "مرجوعی",value:"2"},
        {title: "واریز سود",value:"3"},
        {title: "برداشت سود",value:"4"}
      ],
      profileId: '',
      users:'',
      amount: '36000000',
      effectiveDate:'2021-12-01',
      kindId: '',
      description: 'تست سیدموسوی',
      required,
      email,
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          this.$apollo.mutate({
            mutation: CREATE_TRANSACTION,
            variables: {
              input: {
                profileId: this.selected.value,
                amount: this.amount,
                effectiveDate: this.effectiveDate,
                kindId: this.kindSelected.value,
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
