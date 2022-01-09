<template>
  <b-card
      :title="title"
  >
    <!-- form -->
    <b-form>
      <b-row>
        <b-col>
          <b-row>
            <b-col cols="8">
              <b-row>
                <b-col cols="3" class="text-center">طرح</b-col>
                <b-col cols="9">
                  <b-form-group>
                    <b-form-select v-model="planName" :options="planNameOptions"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="4">
              <b-form-group>
                <b-input-group>
                  <b-form-input
                      placeholder="نام مستعار"
                      v-model="alias"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="12">
          <b-form-group>
            <b-input-group>
              <b-form-input
                  readonly
                  placeholder="مبلغ"
                  v-model="amount"
                  @input="num2per"
              />
              <b-input-group-append>
                <b-button small variant="outline-primary">
                  {{ persianPrice }}
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!-- ********************* -->

        <!-- ******************** -->
        <b-col md="12">
          <b-row>
            <b-col md="6">
              <b-form-group>
                <date-picker readonly label="تاریخ" @input="multipleDate" v-model="effectiveDate" :auto-submit="true"/>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <b-form-input
                    v-model="time"
                    readonly
                    placeholder="ساعت"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <!-- ********************* -->
        <!-- ******************** -->
        <b-col md="12">
          <b-row>
            <b-col md="6">
              <b-form-group>
                <b-form-input
                    readonly
                    v-model="receiptNumber"
                    placeholder="شماره پیگیری"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <b-form-input
                    readonly
                    v-model="description"
                    placeholder="توضیحات"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <!-- ********************* -->
        <!-- ********************* -->
        <b-col md="12">
          <b-row>
<!--            <b-col md="4">-->
<!--              <b-form-group>-->
<!--                <b-form-select v-model="contractTerm" @input="multipleDate" :options="contractTermOptions"-->
<!--                ></b-form-select>-->
<!--              </b-form-group>-->
<!--            </b-col>-->
            <b-col md="12">
              <b-form-group>
                <b-form-input
                    v-model="startDate"
                    placeholder="تاریخ شروع"
                    title="تاریخ شروع"
                    v-b-tooltip.hover.v-info
                    disabled="disabled"
                />
              </b-form-group>
            </b-col>
<!--            <b-col md="6">-->
<!--              <b-form-group>-->
<!--                <b-form-input-->
<!--                    v-model="endDate"-->
<!--                    placeholder="تاریخ پایان"-->
<!--                    title="تاریخ پایان"-->
<!--                    v-b-tooltip.hover.v-info-->
<!--                    disabled="disabled"-->
<!--                />-->
<!--              </b-form-group>-->
<!--            </b-col>-->
          </b-row>
        </b-col>
        <!-- ********************* -->
        <b-col md="12">
          <b-form-group label="نوع واریز">
            <b-form-radio-group
                v-model="imageKindSelected"
                :options="imageKind"
                name="radio-options"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
        <!-- ********************* -->

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

  </b-card>
</template>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  /*border: none;*/
  color: #394066;
  border-radius: 5px 0 0 5px;
}
</style>

<script>
import BCardCode from '@core/components/b-card-code'
import Num2persian from 'num2persian'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import {
  BInputGroup, BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BCardText, BInputGroupPrepend, BInputGroupAppend,
  BDropdown, BDropdownItem, BDropdownDivider, BFormFile, VBPopover, BFormRadioGroup, BFormSelect, VBTooltip, BCard
} from 'bootstrap-vue'
import { CREATE_TRANSACTION, GET_ALL_PRESENTER, GET_PLAN } from '@/constants/graphql'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import moment from 'jalali-moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  directives: {
    'b-popover': VBPopover,
    'b-tooltip': VBTooltip,
    Ripple,
  },
  props: [
    'title',
    'user',
    'amount',
    'receiptNumber',
    'time',
    'effectiveDate',
  ],
  mounted() {
    this.$apollo.mutate({
      mutation: GET_PLAN
    })
        .then((result) => {
          this.planNameOptions = result.data.plan
        })
    this.num2per()
        .then((presenter) => {
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
    BCard,
    BCardText,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormSelect,
    vSelect,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BFormFile,
    Num2persian,
    datePicker: VuePersianDatetimePicker,
    BFormRadioGroup
  },
  data() {
    return {
      planName: null,
      planNameOptions: null,
      alias: null,
      persianPrice: 'صفر ریال',
      time: null,
      imageKindSelected: [
        {
          text: 'از قرارداد قبل',
          value: 5
        }
      ],
      imageKind: [
        {
          text: 'از قرارداد قبل',
          value: 5
        },
      ],
      profileId: [],
      users: [],
      effectiveDate: null,
      kindId: [],
      description: 'واریز از قرارداد قبل',
      receiptNumber: null,
      contractTerm: 6,
      contractTermOptions: [
        {
          value: 6,
          text: '6 ماهه'
        },
        {
          value: 12,
          text: '12 ماهه'
        }
      ],
      startDate: null,
      endDate: null
    }
  },
  methods: {
    num2per() {
      this.persianPrice = Num2persian(this.amount) + ' ریال'
    },
    toShamsiDate(date) {
      return moment(date, 'YYYY-M-D')
          .locale('fa')
          .format('YYYY/MM/DD')
    },
    toGregorianDate(date) {
      if (date) {
        return moment.from(date, 'fa', 'YYYY/MM/DD')
            .locale('en')
            .format('YYYY-MM-DD')
      }
    },
    multipleDate() {
      let m = moment(this.effectiveDate, 'jYYYY/jM/jD')
      m.locale('fa')
      let addDay = (m.format('dd') === 'پ' ? 2 : 1)
      let startDate = m.add(addDay, 'day')
          .locale('fa')
          .format('yyyy-M-D')
      let endDate = m.add(this.contractTerm, 'month')
          .locale('fa')
          .format('yyyy-M-D')
      this.startDate = startDate
      this.endDate = endDate
    },
    validationForm() {
      if (!this.selected.value) {
        this.makeToast('لطفا مشتری را انتخاب کنید', 'danger')
      } else if (this.amount === 0 || this.amount === '') {
        this.makeToast('لطفا مبلغ را وارد نمایید', 'danger')
      } else if (!Number(this.amount)) {
        this.makeToast('لطفا مبلغ را به طور صحیح وارد نمایید', 'danger')
      } else if (this.amount < 20000000) {
        this.makeToast('حداقل مبلغ بیست میلیون ریال می باشد', 'danger')
      } else if (this.effectiveDate === null) {
        this.makeToast('لطفا تاریخ را وارد نمایید', 'danger')
      } else if (this.image === null) {
        this.makeToast('لطفا تصویر سند را وارد نمایید', 'danger')
      } else {
        // return 0
        this.$apollo.mutate({
          mutation: CREATE_TRANSACTION,
          variables: {
            profileId: localStorage.getItem('profile-id'),
            alias: this.alias,
            plan: this.planName,
            effectiveDate: this.toGregorianDate(this.startDate),
            contractTerm: this.contractTerm,
            amount: this.amount,
            receiptNumber: this.receiptNumber,
            kindId: this.kindSelected.value,
            file: document.getElementById('file1').files[0],
          }
        })
            .then((result) => {
              // console.log(result.data.profiles.edges[0].node.firstName)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'تراکنش با موفقیت ثبت شد',
                  text: 'پس از تایید توسط شرکت در حساب شما لحاظ خواهد شد',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
              this.$bvModal.hide('createTransaction')
            })
            .catch((result) => {
              alert('catch')
              console.log(result)
            })
      }
    },

    makeToast(msg = null, variant = null) {
      this.$bvToast.toast(msg, {
        title: `توجه!`,
        variant,
        solid: true,
      })
    },
  },
}
</script>
