<template>
  <b-container fluid>
    <b-row>
      <b-col sm="6" md="3" lg="2" xl="2">
        <b-img v-b-modal.createTransaction src="@/assets/images/icons/dashboard/deposit.png"></b-img>
      </b-col>
      <b-col sm="6" md="3" lg="2" xl="2">
        <b-img fluid src="@/assets/images/icons/dashboard/bardasht.png"></b-img>
      </b-col>
      <b-col sm="6" md="3" lg="2" xl="2">
        <b-img v-b-modal.renewTransaction src="@/assets/images/icons/dashboard/renew.png"></b-img>
      </b-col>
      <b-col sm="6" md="3" lg="2" xl="2">
        <b-img v-b-modal.deposit-calc src="@/assets/images/icons/dashboard/calc.png"></b-img>
      </b-col>
      <b-col sm="6" md="3" lg="2" xl="2">
        <b-img v-b-modal.contactUs src="@/assets/images/icons/dashboard/message.png"></b-img>
      </b-col>
    </b-row>
    <!-- modal -->
    <b-modal
        id="createTransaction"
        title="ثبت تراکنش جدید"
        hide-footer
    >
      <FormUserCreateTransaction/>
    </b-modal>
    <!-- modal -->
    <b-modal
        id="renewTransaction"
        title="تجدید قرارداد با قوانین به روز شرکت"
        hide-footer
    >
      <DepositsForRenew/>
    </b-modal>


    <b-modal
        id="deposit-calc"
        title="محاسبه سود"
        hide-footer
    >
      <DepositCalc/>
    </b-modal>

    <b-modal
        id="contactUs"
        title="ارسال پیام"
        hide-footer
    >
      <FormUserContactUs/>
    </b-modal>
    <!-- modal -->
  </b-container>

</template>

<script>
import { BRow, BCol, BImg,BContainer,BModal,VBModal } from 'bootstrap-vue'
import FormUserCreateTransaction from '@/views/forms/form-validation/FormUserCreateTransaction'
import FormUserContactUs from '@/views/forms/form-validation/FormUserContactUs'
import DepositCalc from '@/views/dashboard/ecommerce/component/DepositCalc'
import DepositsForRenew from '@/views/table/bs-table/DepositsForRenew'

export default {
  components: {
    DepositsForRenew,
    DepositCalc,
    FormUserContactUs,
    BRow,
    BCol,
    BImg,
    BContainer,
    BModal,
    VBModal,
    FormUserCreateTransaction,
  },
  data() {
    return {}
  },

}
</script>
