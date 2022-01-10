<template>
  <b-card>
    <b-img class="p-1 m-1" thumbnail center :src="'https://sadidsarmaye.iran.liara.run/media/'+imageAddress" fluid alt="Fluid image"
           style="width: 400px"
    ></b-img>
    <b-row>
      <b-col cols="4">
        <b-input-group prepend="نام و نام خانوادگی" class="mb-2">
          <b-form-input :value="firstName + ' ' + lastName" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="4">
        <b-input-group prepend="نام پدر" class="mb-2">
          <b-form-input :value="fatherName" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="4">
        <b-input-group prepend="شماره شناسنامه" class="mb-2">
          <b-form-input :value="idNumber" readonly></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <b-input-group prepend="کدملی" class="mb-2">
          <b-form-input :value="nationalCode" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="تاریخ تولد" class="mb-2">
          <b-form-input :value="birthDate" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="شهر محل تولد" class="mb-2">
          <b-form-input :value="birthPlace" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="شهر محل زندگی" class="mb-2">
          <b-form-input :value="city" readonly></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <b-input-group prepend="کد پستی" class="mb-2">
          <b-form-input :value="postalCode" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="9">
        <b-input-group prepend="آدرس" class="mb-2">
          <b-form-input :value="address" readonly></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <b-input-group prepend="تلفن منزل" class="mb-2">
          <b-form-input :value="homePhone" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="تلفن محل کار" class="mb-2">
          <b-form-input :value="officePhone" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="موبایل 1" class="mb-2">
          <b-form-input :value="mobile1" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="3">
        <b-input-group prepend="موبایل 2" class="mb-2">
          <b-form-input :value="mobile2" readonly></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-input-group prepend="رایانامه" class="mb-2">
          <b-form-input :value="email" readonly></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="">
        <b-input-group prepend="نام بانک" class="mb-2">
          <b-form-input :value="bank" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="">
        <b-input-group prepend="شماره حساب" class="mb-2">
          <b-form-input :value="accountNumber" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="">
        <b-input-group prepend="شبا" class="mb-2">
          <b-form-input :value="sheba" readonly></b-form-input>
        </b-input-group>
      </b-col>
      <b-col cols="">
        <b-input-group prepend="شماره کارت" class="mb-2">
          <b-form-input :value="cardNumber" readonly></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>
          <b-input-group prepend="توضیحات" class="mb-2">
            <b-form-input v-model="description" ></b-form-input>
          </b-input-group>
          <b-button class="m-1" variant="success" @click="userResponse('to_stuff_confirm')">تایید</b-button>
          <b-button variant="danger" @click="userResponse('stuff_reject')">عدم تایید</b-button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { PROFILE_CONFIRM_WITH_USER, PROFILE_STUFF_CONFIRM } from '@/constants/graphql'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BCard,
  BInputGroup,
  BImg,
  BButton
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BCard,
    BInputGroup,
    BImg,
    BButton,
    ToastificationContent
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      fatherName: '',
      idNumber: '',
      nationalCode: '',
      birthDate: '',
      birthPlace: '',
      city: '',
      postalCode: '',
      address: '',
      homePhone: '',
      officePhone: '',
      mobile1: '',
      mobile2: null,
      email: '',
      bank: '',
      accountNumber: '',
      sheba: '',
      cardNumber: '',
      id: '',
      imageAddress: '',
      description:''
    }
  },
  methods: {
    userResponse(target){
      this.$apollo.mutate({
        mutation:PROFILE_CONFIRM_WITH_USER,
        variables:{
          id:this.id,
          transition:target,
          description:this.description
        }
      })
    }
  },
  mounted() {
    this.$apollo.mutate({
      mutation: PROFILE_STUFF_CONFIRM,
      variables:{
        id: this.$route.params.id
      }
    })
        .then((resutl) => {
          // console.clear()
          console.log(resutl.data.profiles.edges[0].node)
          resutl = resutl.data.profiles.edges[0].node
          this.firstName = resutl.firstName
          this.lastName = resutl.lastName
          this.fatherName = resutl.fatherName
          this.idNumber = resutl.idNumber
          this.nationalCode = resutl.nationalCode
          this.birthDate = resutl.birthDate
          this.birthPlace = resutl.birthPlace.name
          this.city = resutl.city.name
          this.postalCode = resutl.postalCode
          this.address = resutl.address
          this.homePhone = resutl.homePhone
          this.officePhone = resutl.officePhone
          this.mobile1 = resutl.mobile1
          this.mobile2 = resutl.mobile2
          this.email = resutl.email
          this.bank = resutl.bank.name
          this.accountNumber = resutl.accountNumber
          this.sheba = resutl.sheba
          this.cardNumber = resutl.cardNumber
          this.imageAddress = resutl.images[0].image
          this.id=resutl.id
        })
  }
}
</script>
