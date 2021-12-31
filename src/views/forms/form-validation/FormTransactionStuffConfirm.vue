<template>
  <b-card
      :title="title"
  >
    <b-card-text>
      <span>تایید اولیه تراکنش</span>
    </b-card-text>

    <!-- form -->
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col cols="7">
            <b-row class="m-1">
              <b-col cols="5">
                <span class="p-1">
              مبلغ: <b-badge variant="success">{{ convertToCurrency(amount) }}ریال <b-badge variant="primary"
                >({{ num2per(amount) }})</b-badge></b-badge>
                </span>
              </b-col>
              <b-col cols="4">
                <span>
              رسید پرداخت: <b-badge variant="success">{{ receiptNumber }}</b-badge>
            </span>
              </b-col>
              <b-col cols="3">
                <span>
              <span>ثبت :</span> <b-badge variant="success"
                >{{ toShamsiDate(dateTime) }} - {{ getDate(this.dateTime) }}</b-badge>
            </span>
              </b-col>
            </b-row>
            <b-row class="m-1">
              <b-col cols="5">
                <span>
              شروع قرارداد: <b-badge variant="success"
                >{{ effectiveDate }} - {{ getDate(this.effectiveDate) }}</b-badge>
            </span>
              </b-col>
              <b-col cols="2">
                <span>
              مدت: <b-badge variant="success">{{ contractTerm }} ماه</b-badge>
            </span>
              </b-col>
              <b-col cols="5">
                <span>
              پایان قرارداد: <b-badge variant="success">{{ multipleDate() }}</b-badge>
            </span>
              </b-col>
            </b-row>
            <b-row>
            </b-row>
          </b-col>
          <b-col cols="5">
            <b-img :src="'https://sadidsarmaye.iran.liara.run/media/'+imageAddress"/>
          </b-col>
          <b-col cols="12">
            <b-button
                variant="success"
                type="submit"
                @click.prevent="stuffResponse('to_stuff_confirm')"
                class="m-1"
            >
              تایید
            </b-button>
            <b-button
                variant="danger"
                type="submit"
                @click.prevent="stuffResponse('stuff_reject')"
                class="m-1"
            >
              عدم تایید
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

    <template #code>
      {{ codeSimple }}
    </template>
  </b-card>
</template>

<script>
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BCardText, BBadge, BCard, BImg
} from 'bootstrap-vue'
import { TRANSACTION_CONFIRM_WITH_STUFF, TRANSACTION_STUFF_CONFIRM } from '@/constants/graphql'
import moment from 'jalali-moment'
import Num2persian from 'num2persian'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
export default {
  props: [
    'title',
    'user'
  ],
  mounted() {
    this.$apollo.mutate({
      mutation: TRANSACTION_STUFF_CONFIRM,
      variables: {
        id: this.$route.params.id
      }
    })
        .then((result) => {
          let item = result.data.transactions.edges[0].node
          this.amount = item.amount
          this.dateTime = item.dateTime
          this.description = item.description
          this.effectiveDate = this.toShamsiDate(item.effectiveDate)
          this.startDate = item.startDate
          this.expireDate = item.expireDate
          this.contractTerm = item.contractTerm
          this.receiptNumber = item.receiptNumber
          this.imageAddress = item.images[0].image
          this.id=this.$route.params.id
        })
  },
  components: {
    BCard,
    BCardText,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BBadge,
    BImg,
  },
  data() {
    return {
      id:null,
      amount: null,
      effectiveDate: null,
      description: '',
      dateTime: null,
      startDate: null,
      expireDate: null,
      contractTerm: null,
      receiptNumber: null,
      imageAddress: null
    }
  },
  methods: {
    stuffResponse(response){
      this.$apollo.mutate({
        mutation:TRANSACTION_CONFIRM_WITH_STUFF,
        variables:{
          id:this.id,
          transition:response,
          description:"SRSM"
        }
      }).then((result)=>{
        let response=result.data.transactionWorkflowTransition
        if(response.ok===true) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'تراکنش با موفقیت به تایید شما رسید',
              text: 'پس از تایید توسط رییس در حساب کاربر لحاظ خواهد شد',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
          this.$router.push({ name: 'transactions-stuff-confirm' })
        }else{
          alert(response.errors[0].message)
        }
      })
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
      return m.add(this.contractTerm, 'month')
          .locale('fa')
          .format('yyyy-M-D')
    },
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              // eslint-disable-next-line
            }
          })
    },
    num2per(price) {
      return Num2persian(price / 10) + ' تومان'
    },
    getDate(inputDate) {
      let date = new Date(inputDate)
      return moment(date, 'YYYY-M-D')
          .locale('fa')
          .format('dddd')
    },
    convertToCurrency(Number) {
      let x,
          y,
          z
      Number += ''
      Number = Number.replace(',', '')
      x = Number.split('.')
      y = x[0]
      z = x.length > 1 ? '.' + x[1] : ''
      let rgx = /(\d+)(\d{3})/
      while (rgx.test(y)) {
        y = y.replace(rgx, '$1' + ',' + '$2')
      }
      return y + z
    },
  },
}
</script>
