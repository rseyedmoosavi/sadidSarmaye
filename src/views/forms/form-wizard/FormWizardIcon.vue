<template>
  <div>
    <form-wizard
        color="#7367F0"
        :title="null"
        :subtitle="null"
        finish-button-text="ذخیره"
        back-button-text="مرحله قبل"
        next-button-text="مرحله بعد"
        class="steps-transparent mb-3"
        @on-complete="formSubmitted"
    >
      <!-- account detail tab -->
      <tab-content
          title="حساب کاربری"
          icon="feather icon-file-text"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              اطلاعات حساب کاربری
            </h5>
            <small class="text-muted">اطلاعات را به طور دقیق وارد نمایید.</small>
          </b-col>
          <b-col md="6">
            <b-form-group
                label-for="i-user-name"
                label="نام کاربری"
            >
              <b-form-input
                  id="i-user-name"
                  placeholder="mohammad"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="تلفن همراه"
                label-for="i-mobile"
            >
              <b-form-input
                  id="i-mobile"
                  placeholder="09123456789"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
      <tab-content
          title="حساب کاربری"
          icon="feather icon-file-text"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              مشخصات فردی
            </h5>
            <small class="text-muted">Enter Your Personal Info.</small>
          </b-col>
          <b-col md="4">
            <b-form-group
                label-for="i-first-name"
                label="نام"
            >
              <b-form-input
                  id="i-first-name"
                  placeholder="سیدمحمد"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="نام خانوادگی"
                label-for="i-last-name"
            >
              <b-form-input
                  id="i-last-name"
                  placeholder="رضایی"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="نام پدر"
                label-for="i-father-name"
            >
              <b-form-input
                  id="i-father-name"
                  placeholder="محمدعلی"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="شماره شناسنامه"
                label-for="i-id-number"
            >
              <b-form-input
                  id="i-id-number"
                  placeholder="3466"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="کد ملی"
                label-for="i-international-code"
            >
              <b-form-input
                  id="i-international-code"
                  placeholder="0370270012"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="تاریخ تولد"
                label-for="i-birth-date"
            >
              <b-form-input
                  id="i-birth-date"
                  placeholder="Doe"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="استان محل تولد"
                label-for="i-birth-state-location"
            >
              <v-select
                  id="i-birth-state-location"
                  v-model="birthDateLocation"
                  dir='rtl'
                  :options="cities"
                  label="text"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
                label="شهر محل تولد"
                label-for="i-birth-city-location"
            >
              <v-select
                  id="i-birth-city-location"
                  v-model="birthDateLocation"
                  dir='rtl'
                  :options="cities"
                  label="text"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content
          title="Address"
          icon="feather icon-map-pin"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              Address
            </h5>
            <small class="text-muted">Enter Your Address.</small>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="Address"
                label-for="i-address"
            >
              <b-form-input
                  id="i-address"
                  placeholder="98 Borough bridge Road, Birmingham"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="Landmark"
                label-for="i-landmark"
            >
              <b-form-input
                  id="i-landmark"
                  placeholder="Borough bridge"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="Pincode"
                label-for="i-pincode"
            >
              <b-form-input
                  id="i-pincode"
                  placeholder="658921"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label-for="i-city"
                label="City"
            >
              <b-form-input
                  id="i-city"
                  placeholder="Birmingham"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- social link -->
      <tab-content
          title="Social Links"
          icon="feather icon-link"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              Social Links
            </h5>
            <small class="text-muted">Enter Your Social Links</small>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="Twitter"
                label-for="i-twitter"
            >
              <b-form-input
                  id="i-twitter"
                  placeholder="https://twitter.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="Facebook"
                label-for="i-facebook"
            >
              <b-form-input
                  id="i-facebook"
                  placeholder="https://facebook.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="Google+"
                label-for="i-google-plus"
            >
              <b-form-input
                  id="i-google-plus"
                  placeholder="https://plus.google.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="LinkedIn"
                label-for="i-linked-in"
            >
              <b-form-input
                  id="i-linked-in"
                  placeholder="https://linkedin.com/abc"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import {codeIconInfo} from './code'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      selectedCountry: 'select_value',
      birthDateLocation: 'تهران',
      province:[],
      cities:[],
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
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style scoped>
.vue-form-wizard .wizard-progress-bar {
  float: right;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-left {
  float: right;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right {
  float: left;
}
</style>
