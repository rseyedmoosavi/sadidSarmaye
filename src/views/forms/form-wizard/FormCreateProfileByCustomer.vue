<template>
  <div>
    <form-wizard
        color="#7367F0"
        :title="null"
        :subtitle="null"
        shape="square"
        finish-button-text="ثبت نام"
        back-button-text="بازگشت"
        next-button-text="ادامه"
        class="mb-3"
        @on-complete="formSubmitted"
    >
      <!-- personal details tab -->
      <tab-content
          title="اطلاعات شخصی"
          :before-change="validationFormInfo"
      >
        <validation-observer
            ref="infoRules"
            tag="form"
        >
          <b-row>
            <b-col
                cols="12"
                class="mb-2"
            >
              <h5 class="mb-0">
                اطلاعات شخصی
              </h5>
              <small class="text-muted">اطلاعات را دقیقا همانند شناسنامه خود تکمیل نمایید</small>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="نام"
                  label-for="firstName"
              >
                <validation-provider
                    #default="{ errors }"
                    name="firstName"
                    rules="required"
                >
                  <b-form-input
                      id="firstName"
                      v-model="firstName"
                      placeholder="سیدعلی"
                      :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="نام خانوادگی"
                  label-for="lastName"
              >
                <validation-provider
                    #default="{ errors }"
                    name="lastName"
                    rules="required"
                >
                  <b-form-input
                      id="lastName"
                      v-model="lastName"
                      :state="errors.length > 0 ? false:null"
                      placeholder="علوی"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <validation-provider
                  #default="{ errors }"
                  name="fatherName"
                  rules="required"
              >
                <b-form-group
                    label="نام پدر"
                    label-for="fatherName"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="fatherName"
                      v-model="fatherName"
                      :state="errors.length > 0 ? false:null"
                      placeholder="سیدمحمد"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4">
              <b-form-group
                  label="شماره شناسنامه"
                  label-for="idNumber"
              >
                <b-form-input
                    id="idNumber"
                    v-model="idNumber"
                    placeholder="157"
                />
              </b-form-group>
            </b-col>

            <b-col md="4">
              <validation-provider
                  #default="{ errors }"
                  name="nationalCode"
                  rules="required|digits:10"
              >
                <b-form-group
                    label="کد ملی"
                    label-for="nationalCode"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="nationalCode"
                      v-model="nationalCode"
                      :state="errors.length > 0 ? false:null"
                      placeholder="1476541259"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4">
              <validation-provider
                  #default="{ errors }"
                  name="birthDate"
                  rules="required"
              >
                <b-form-group
                    label="تاریخ تولد"
                    label-for="birthDate"
                    :state="errors.length > 0 ? false:null"
                >
                  <date-picker v-model="birthDate" :auto-submit="true"/>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider
                  #default="{ errors }"
                  name="birthProvince"
                  rules="required"
              >
                <b-form-group
                    label="استان محل تولد"
                    label-for="birthProvince"
                >
                  <v-select
                      id="birthProvince"
                      v-model="birthProvince"
                      dir="rtl"
                      :options="provinces"
                      label="text"
                      @input="selectCity"

                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider
                  #default="{ errors }"
                  name="birthPlace"
                  rules="required"
              >
                <b-form-group
                    label="شهر محل تولد"
                    label-for="birthPlace"
                >
                  <v-select
                      id="birthPlace"
                      v-model="birthPlace"
                      dir="rtl"
                      :options="cities"
                      label="text"

                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

          </b-row>
        </validation-observer>
      </tab-content>

      <!-- address  -->
      <tab-content
          title="اطلاعات تماس"
          :before-change="validationFormAddress"
      >
        <validation-observer
            ref="addressRules"
            tag="form"
        >
          <b-row>
            <b-col
                cols="12"
                class="mb-2"
            >
              <h5 class="mb-0">
                آدرس
              </h5>
              <small class="text-muted">آدرس دقیق محل سکونت/کار خود را وارد نمایید</small>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="استان"
                  label-for="birthProvince"
              >
                <validation-provider
                    #default="{ errors }"
                    name="locationProvince"
                    rules="required"
                >
                  <v-select
                      id="locationProvince"
                      v-model="locationProvince"
                      dir="rtl"
                      :options="provinces"
                      label="text"
                      @input="selectLocationCity"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="شهر"
                  label-for="birthProvince"
              >
                <validation-provider
                    #default="{ errors }"
                    name="city"
                    rules="required"
                >
                  <v-select
                      id="city"
                      v-model="city"
                      dir="rtl"
                      :options="cities"
                      label="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="کدپستی"
                  label-for="postalCode"
              >
                <validation-provider
                    #default="{ errors }"
                    name="postalCode"
                    rules="required|digits:10"
                >
                  <b-form-input
                      id="postalCode"
                      v-model="postalCode"
                      :state="errors.length > 0 ? false:null"
                      type="number"
                      placeholder="3714559147"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <validation-provider
                  #default="{ errors }"
                  name="address"
                  rules="required"
              >
                <b-form-group
                    label="آدرس"
                    label-for="address"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="address"
                      v-model="address"
                      :state="errors.length > 0 ? false:null"
                      placeholder="قم، خیابان شهدا، کوچه 28، فرعی 102، پلاک 1425، طبقه 12، واحد 36"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <h5 class="mb-0">
                اطلاعات تماس
              </h5>
              <small class="text-muted">اطلاعات دقیق تماس خود را وارد نماید</small>
            </b-col>
            <b-col md="3">
              <validation-provider
                  #default="{ errors }"
                  name="homePhone"
                  rules="required"
              >
                <b-form-group
                    label="تلفن منزل"
                    label-for="homePhone"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="homePhone"
                      v-model="homePhone"
                      :state="errors.length > 0 ? false:null"
                      placeholder="02166225544"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="تلفن محل کار"
                  label-for="officePhone"
              >
                <b-form-input
                    id="officePhone"
                    v-model="officePhone"
                    placeholder="02166225544"
                />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <validation-provider
                  #default="{ errors }"
                  name="mobile1"
                  rules="required|regex:09\d{9}$"
              >
                <b-form-group
                    label="تلفن همراه 1"
                    label-for="mobile1"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="mobile1"
                      v-model="tel"
                      :state="errors.length > 0 ? false:null"
                      placeholder="0923456789"
                      readonly="true"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="تلفن همراه 2"
                  label-for="mobile2"
              >
                <b-form-input
                    id="mobile2"
                    v-model="mobile2"
                    placeholder="09351246789"
                />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group
                  label="رایانامه"
                  label-for="email"
              >
                <b-form-input
                    id="email"
                    style="font-family: auto,cursive"
                    v-model="email"
                    placeholder="seyedAliAlavi@iran.ir"
                />
              </b-form-group>
            </b-col>

          </b-row>
        </validation-observer>
      </tab-content>

      <tab-content
          title="اطلاعات بانکی"
          :before-change="validationFormBank"
      >
        <validation-observer
            ref="bankRules"
            tag="form"
        >
          <b-row>
            <b-col
                cols="12"
                class="mb-2"
            >
              <h5 class="mb-0">
                اطلاعات حاسب بانکی
              </h5>
              <small class="text-muted">
                لطفا حساب بانکی را وارد نمایید که از آن استفاده می کنید
              </small>
            </b-col>
            <b-col md="2">
              <b-form-group
                  label="نام بانک"
                  label-for="bankName"
              >
                <validation-provider
                    #default="{ errors }"
                    name="bankName"
                    rules="required"
                >
                  <v-select
                      id="bankName"
                      v-model="bankName"
                      dir="rtl"
                      :options="bankNames"
                      label="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="شماره حساب"
                  label-for="accountNumber"
              >
                <validation-provider
                    #default="{ errors }"
                    name="accountNumber"
                    rules="required"
                >
                  <b-form-input
                      id="accountNumber"
                      v-model="accountNumber"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="5741900000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="شناسه شبا"
                  label-for="sheba"
              >
                <validation-provider
                    #default="{ errors }"
                    name="sheba"
                    rules="required|regex:ir[\d]{24}$"
                >
                  <b-form-input
                      id="sheba"
                      v-model="sheba"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="ir240000000000000000000000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="شماره کارت"
                  label-for="shomare-cart"
              >
                <validation-provider
                    #default="{ errors }"
                    name="cardNumber"
                    rules="required|regex:[\d]{16}$"
                >
                  <b-form-input
                      id="shomare-cart"
                      v-model="cardNumber"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="6104337854552222"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>
      <tab-content
          title="آپلود مدارک"
          :before-change="validationFormUpload"
      >
        <validation-observer
            ref="uploadRules"
            tag="form"
        >
          <b-row>
            <b-col
                cols="12"
                class="mb-2"
            >
              <h5 class="mb-0">
                آپلود مدارک
              </h5>
              <small class="text-muted">
                تصویر کارت ملی خورد را آپلود نمایید
              </small>
            </b-col>
            <b-col md="6">
              <b-form-group
                  label="تصویر کارت ملی"
                  label-for="carteMeli"
              >
                <validation-provider
                    #default="{ errors }"
                    name="carteMeli"
                    rules="required"
                >
                  <b-form-file
                      id="carteMeli"
                      placeholder="تصویر سند را انتخاب کنید..."
                      drop-placeholder="اینجا رها کنید..."
                      v-model="carteMeli"
                      name="carteMeli"
                      @change="onFileChange"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-img v-if="carteMeli" :src="imgCarteMEliURL" fluid alt="Responsive image"></b-img>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import Password from 'vue-password-strength-meter'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormFile,
  BImg
} from 'bootstrap-vue'
import { required, email } from '@validations'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {
  CREATE_PROFILE,
  CREATE_USER,
  GET_CITIES,
  GET_PROVINCE,
  LOGIN,
  PROFILE_CONFIRM_WITH_USER
} from '@/constants/graphql'
import { GC_AUTH_TOKEN, GC_USER_DATA, GC_USER_ID } from '@/constants/settings'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BImg,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormInvalidFeedback,
    BFormFile,
    ToastificationContent,
    datePicker: VuePersianDatetimePicker,
    required,
    email,
    Password
  },
  data() {
    return {
      userID:null,
      tel: '09127514245',//null
      sms: '1010',//null
      firstName: 'asd',// null,
      lastName: '456',//null,
      fatherName: '456',//null,
      idNumber: '456',//null,
      nationalCode: '4564564564',//null,
      birthDate: '1369-03-13',// null,
      birthProvince: 1,// null,
      provinces: [],
      birthPlace: null,
      cities: [],
      locationProvince: null,
      city: null,
      postalCode: null,
      address: null,
      homePhone: null,
      officePhone: null,
      mobile1: null,
      mobile2: null,
      email: null,
      bankName: null,
      bankNames: [
        {
          text: 'اقتصاد نوین',
          value: 1
        },
        {
          text: 'انصار',
          value: 2
        },
        {
          text: 'ایران زمین',
          value: 3
        },
        {
          text: 'پارسیان',
          value: 4
        },
        {
          text: 'پاسارگاد',
          value: 5
        },
        {
          text: 'پست ایران',
          value: 6
        },
        {
          text: 'تجارت',
          value: 7
        },
        {
          text: 'توسعه تعاون',
          value: 8
        },
        {
          text: 'توسعه صادرات ایران',
          value: 9
        },
        {
          text: 'حکمت ایرانیان',
          value: 10
        },
        {
          text: 'خاور میانه',
          value: 11
        },
        {
          text: 'دی',
          value: 12
        },
        {
          text: 'رفاه',
          value: 13
        },
        {
          text: 'سامان',
          value: 14
        },
        {
          text: 'سپه',
          value: 15
        },
        {
          text: 'سرمایه',
          value: 16
        },
        {
          text: 'سینا',
          value: 17
        },
        {
          text: 'شهر',
          value: 18
        },
        {
          text: 'صادرات',
          value: 19
        },
        {
          text: 'صنعت و معدن',
          value: 20
        },
        {
          text: 'قرض‌الحسنه رسالت',
          value: 21
        },
        {
          text: 'قرض‌الحسنه مهر ایران',
          value: 22
        },
        {
          text: 'قوامین',
          value: 23
        },
        {
          text: 'کارآفرین',
          value: 24
        },
        {
          text: 'کشاورزی',
          value: 25
        },
        {
          text: 'گردشگری',
          value: 26
        },
        {
          text: 'مسکن',
          value: 27
        },
        {
          text: 'مشترک ایران-ونزوئلا',
          value: 28
        },
        {
          text: 'ملّی ایران',
          value: 29
        },
        {
          text: 'ملت',
          value: 30
        }],
      accountNumber: null,
      sheba: null,
      cardNumber: null,
      shenasnameP1: null,
      shenasnameP2: null,
      carteMeli: null,
      imgCarteMEliURL: null,
      carteMeliPosht: null,
      file: null
    }
  },
  mounted() {
    this.$apollo.mutate({
      mutation: GET_PROVINCE
    })
        .then((result) => {
          this.provinces = result.data.provinces
        })
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0]
      this.imgCarteMEliURL = URL.createObjectURL(this.file)
    },
    selectCity(provinceID) {
      this.$apollo.mutate({
        mutation: GET_CITIES,
        variables: {
          provinceID: this.birthProvince.value
        }
      })
          .then((result) => {

            let cities = result.data.cities.edges
            let tempCities = []
            for (let city in cities) {
              tempCities.push({
                text: cities[city].node.text,
                value: cities[city].node.value
              })
            }
            this.cities = tempCities
            this.birthPlace.text = tempCities[0].text
          })
    },

    selectLocationCity(provinceID) {
      this.$apollo.mutate({
        mutation: GET_CITIES,
        variables: {
          provinceID: this.locationProvince.value
        }
      })
          .then((result) => {
            let cities = result.data.cities.edges
            let tempCities = []
            for (let city in cities) {
              tempCities.push({
                text: cities[city].node.text,
                value: cities[city].node.value
              })
            }
            this.cities = tempCities
            this.city.text = tempCities[0].text
          })
    },

    formSubmitted() {
      console.clear()
      console.log(parseInt(localStorage.getItem('user-id')))
      this.$apollo.mutate({
        mutation: CREATE_PROFILE,
        variables: {
          userID: parseInt(localStorage.getItem('user-id')),
          firstName: this.firstName,
          lastName: this.lastName,
          fatherName: this.fatherName,
          idNumber: this.idNumber,
          nationalCode: this.nationalCode,
          birthDate: this.birthDate,
          birthPlaceId: parseInt(this.birthPlace.value),
          cityId: parseInt(this.city.value),
          postalCode: this.postalCode,
          address: this.address,
          homePhone: this.homePhone,
          officePhone: this.officePhone,
          mobile1: this.tel,
          mobile2: this.mobile2,
          bankId: this.bankName.value,
          accountNumber: this.accountNumber,
          sheba: this.sheba,
          cardNumber: this.cardNumber,
          tel: this.tel,
          file: document.getElementById('carteMeli').files[0]
        }
      })
          .then((result) => {
            // this.$apollo.mutate({
            //   mutation:PROFILE_CONFIRM_WITH_USER,
            //   variables:{
            //     id:result.data.createProfile.profile.id,
            //     transition:"to_stuff_confirm"
            //   }
            // })
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Form Submitted',
                icon: 'EditIcon',
                variant: 'success',
              },
            })
          })
          .catch((result) => {
            alert('catch')
            console.log(result)
          })
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate()
            .then(success => {
              if (success) {
                resolve(true)
              } else {
                reject()
              }
            })
      })
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate()
            .then(success => {
              if (success) {
                resolve(true)
              } else {
                reject()
              }
            })
      })
    },
    validationFormAddress() {
      return new Promise((resolve, reject) => {
        this.$refs.addressRules.validate()
            .then(success => {
              if (success) {
                resolve(true)
              } else {
                reject()
              }
            })
      })
    },
    validationFormBank() {
      return new Promise((resolve, reject) => {
        this.$refs.bankRules.validate()
            .then(success => {
              if (success) {
                resolve(true)
              } else {
                reject()
              }
            })
      })
    },
    validationFormUpload() {
      return new Promise((resolve, reject) => {
        this.$refs.uploadRules.validate()
            .then(success => {
              if (success) {
                resolve(true)
              } else {
                reject()
              }
            })
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';

.vue-form-wizard .wizard-progress-bar {
  float: right !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-left {
  float: right !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right {
  float: left !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-left .wizard-btn::before {
  content: "" !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right .wizard-btn::after {
  content: "" !important;
}

</style>
