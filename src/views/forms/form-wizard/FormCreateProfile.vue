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

      <!-- accoint details tab -->
      <tab-content
          title="اطلاعات ورود به سیستم"
          :before-change="validationForm"
      >
        <validation-observer
            ref="accountRules"
            tag="form"
        >
          <b-row>
            <b-col
                cols="12"
                class="mb-2"
            >
              <h5 class="mb-0">
                گزینه های اصلی ثبت نام
              </h5>
              <small class="text-muted">
                لطفا نام کاربری و شماره همراه مورد استفاده خود را وارد نمایید.
              </small>
            </b-col>
            <b-col md="6">
              <b-form-group
                  label="نام کاربری"
                  label-for="username"
              >
                <validation-provider
                    #default="{ errors }"
                    name="username"
                    rules="required"
                >
                  <b-form-input
                      id="username"
                      v-model="username"
                      :state="errors.length > 0 ? false:null"
                      placeholder="m.hoseini"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                  label="تلفن همراه"
                  label-for="tel"
              >
                <validation-provider
                    #default="{ errors }"
                    name="tel"
                    rules="required|regex:09\d{9}$"
                >
                  <b-form-input
                      id="tel"
                      v-model="tel"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="09123456789"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <tab-content
          title="کلمه عبور"
          :before-change="validationFormPassword"
      >
        <validation-observer
            ref="passwordRule"
            tag="form"
        >
          <b-row>
            <b-col
                cols="12"
                class="mb-2"
            >
              <h5 class="mb-0">
                انتخاب کلمه عبور
              </h5>
              <small class="text-muted">
                لطفا کلمه عبور خود را در اختیار دیگران قرار ندهید
              </small>
            </b-col>
            <b-col md="2">
              <b-form-group
                  label="پیامک تایید"
                  label-for="sms"
              >
                <validation-provider
                    #default="{ errors }"
                    name="sms"
                    rules="required|digits:4"
                >
                  <b-form-input
                      id="sms"
                      v-model="sms"
                      :state="errors.length > 0 ? false:null"
                      placeholder="1234"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="5">
              <b-form-group
                  label="کلمه عبور"
                  label-for="password"
              >
                <validation-provider
                    #default="{ errors }"
                    name="password"
                    rules="required"
                >
                  <b-form-input
                      id="password"
                      v-model="password"
                      type="password"
                      :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="5">
              <b-form-group
                  label="تایید کلمه عبور"
                  label-for="confirm-password"
              >
                <validation-provider
                    #default="{ errors }"
                    name="confirm-password"
                    rules="required|confirmed:password"
                >
                  <b-form-input
                      id="confirm-password"
                      v-model="confirmPassword"
                      type="password"
                      :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

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
              <validation-provider
                  #default="{ errors }"
                  name="idNumber"
                  rules="required|numeric"
              >
                <b-form-group
                    label="شماره شناسنامه"
                    label-for="idNumber"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="idNumber"
                      v-model="idNumber"
                      :state="errors.length > 0 ? false:null"
                      placeholder="157"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
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
              <b-form-group
                  label="استان محل تولد"
                  label-for="birthProvince"
              >
                <v-select
                    id="birthProvince"
                    v-model="birthProvince"
                    dir="rtl"
                    :options="provinces"
                    label="استان"
                />
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                  label="شهر محل تولد"
                  label-for="birthCity"
              >
                <v-select
                    id="birthCity"
                    v-model="birthCity"
                    dir="rtl"
                    :options="cities"
                    label="شهر"
                />
              </b-form-group>
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
                <v-select
                    id="locationProvince"
                    v-model="locationProvince"
                    dir="rtl"
                    :options="provinces"
                    label="استان"
                />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="شهر محل تولد"
                  label-for="birthProvince"
              >
                <v-select
                    id="locationCity"
                    v-model="locationCity"
                    dir="rtl"
                    :options="cities"
                    label="شهر"
                />
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
                    rules="required"
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
              <validation-provider
                  #default="{ errors }"
                  name="workPhone"
                  rules="required"
              >
                <b-form-group
                    label="تلفن محل کار"
                    label-for="workPhone"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="workPhone"
                      v-model="workPhone"
                      :state="errors.length > 0 ? false:null"
                      placeholder="02166225544"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <validation-provider
                  #default="{ errors }"
                  name="mobile1"
                  rules="required"
              >
                <b-form-group
                    label="تلفن همراه 1"
                    label-for="mobile1"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="mobile1"
                      v-model="mobile1"
                      :state="errors.length > 0 ? false:null"
                      placeholder="0923456789"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="3">
              <validation-provider
                  #default="{ errors }"
                  name="mobile2"
                  rules="required"
              >
                <b-form-group
                    label="تلفن همراه 2"
                    label-for="mobile2"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="mobile2"
                      v-model="mobile2"
                      :state="errors.length > 0 ? false:null"
                      placeholder="09351246789"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12">
              <validation-provider
                  #default="{ errors }"
                  name="email"
                  rules="required"
              >
                <b-form-group
                    label="رایانامه"
                    label-for="email"
                    :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                      id="email"
                      style="font-family: auto,cursive"
                      v-model="email"
                      :state="errors.length > 0 ? false:null"
                      placeholder="seyedAliAlavi@iran.ir"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
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
            <b-col md="4">
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
                      label="بانک"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="4">
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
                    rules="required"
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
                تصویر شناسنامه و کارت ملی خورد را آپلود نمایید
              </small>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="صفحه اول شناسنامه"
                  label-for="shenasnameP1"
              >
                <validation-provider
                    #default="{ errors }"
                    name="shenasnameP1"
                    rules="required"
                >
                  <b-form-file
                      id="shenasnameP1"
                      placeholder="تصویر سند را انتخاب کنید..."
                      drop-placeholder="اینجا رها کنید..."
                      v-model="shenasnameP1"
                      name="shenasnameP1"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="صفحه توضیحات شناسنامه"
                  label-for="shenasnameP2"
              >
                <validation-provider
                    #default="{ errors }"
                    name="shenasnameP2"
                    rules="required"
                >
                  <b-form-file
                      id="shenasnameP2"
                      placeholder="تصویر سند را انتخاب کنید..."
                      drop-placeholder="اینجا رها کنید..."
                      v-model="shenasnameP2"
                      name="shenasnameP2"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="3">
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
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="تصویر پشت کارت ملی"
                  label-for="carteMeliPosht"
              >
                <validation-provider
                    #default="{ errors }"
                    name="carteMeliPosht"
                    rules="required"
                >
                  <b-form-file
                      id="carteMeliPosht"
                      placeholder="تصویر سند را انتخاب کنید..."
                      drop-placeholder="اینجا رها کنید..."
                      v-model="carteMeliPosht"
                      name="carteMeliPosht"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormFile
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { codeIcon } from './code'
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormInvalidFeedback,
    BFormFile,
    ToastificationContent,
    datePicker: VuePersianDatetimePicker
  },
  data() {
    return {

    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
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
    validationFormPassword() {
      return new Promise((resolve, reject) => {
        this.$refs.passwordRule.validate()
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
</style>
