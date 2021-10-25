<template>
  <b-card-code
      :title="title"
  >
    <b-card-text>
      <span>ویرایش مشخصات کاربر</span>
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
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="firstName"
                    :state="errors.length > 0 ? false:null"
                    placeholder="نام"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="lastName"
                    :state="errors.length > 0 ? false:null"
                    placeholder="نام خانوادگی"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="codeMeli"
                    :state="errors.length > 0 ? false:null"
                    placeholder="کدملی"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="presenter"
                    :state="errors.length > 0 ? false:null"
                    placeholder="معرف"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="adress"
                    :state="errors.length > 0 ? false:null"
                    placeholder="آدرس"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="shomareKart"
                    :state="errors.length > 0 ? false:null"
                    placeholder="شماره کارت"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="shomareHesab"
                    :state="errors.length > 0 ? false:null"
                    placeholder="شماره حساب"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
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

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="tel"
                    :state="errors.length > 0 ? false:null"
                    placeholder="تلفن"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="First Name"
                  rules="required"
              >
                <b-form-input
                    v-model="mobile1"
                    :state="errors.length > 0 ? false:null"
                    placeholder="موبایل"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- ********************* -->
          </b-col>
          <b-col md="6">
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
              >
                <b-form-input
                    v-model="emailValue"
                    :state="errors.length > 0 ? false:null"
                    type="email"
                    placeholder="Email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
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
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BCardText,
} from 'bootstrap-vue'
import {required, email} from '@validations'
import {codeSimple} from './code'


export default {
  props: [
    'title',
    'user'
  ],
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
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      codeMeli: '',
      presenter: '',
      adress: '',
      shomareKart: '',
      shomareHesab: '',
      description: '',
      tel: '',
      mobile: '',
      required,
      email,
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          alert('form submitted!')
        }
      })
    },
  },
}
</script>
