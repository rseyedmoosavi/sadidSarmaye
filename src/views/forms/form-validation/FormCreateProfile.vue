<template>
  <b-card-code
      :title="title"
  >
    <b-card-text>
      <span>ایجاد کاربر جدید</span>
    </b-card-text>

    <!-- form -->
    <validation-observer ref="simpleRules">
      <b-form>
        <b-row>
          <b-col md="6">
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="userName"
                  rules="required"
              >
                <b-form-input
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                    placeholder="نام کاربر"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="password"
                  rules="required"
              >
                <b-form-input
                    v-model="password"
                    :state="errors.length > 0 ? false:null"
                    placeholder="کلمه عبور"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
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
                  name="Last Name"
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
                  name="codeMEli"
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
                  name="presenter"
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
                  name="adress"
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
                  name="shomareKart"
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
                  name="shomareHesab"
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

            <!-- ******************** -->
            <b-form-group>
              <validation-provider
                  #default="{ errors }"
                  name="tel"
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
                  name="mobile1"
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
import {CREATE_PROFILE} from '@/constants/graphql'


export default {
  props: [
    'title',
    'user'
  ],
  mounted() {

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
  },
  data() {
    return {
      username: '',
      password: '',
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
          this.$apollo.mutate({
            mutation: CREATE_PROFILE,
            variables: {
              input: {
                user:{
                  username:this.username,
                  password:this.password,
                  email:"test@gmail.com"
                },
                firstName:this.firstName,
                lastName:this.lastName,
                codeMeli:this.codeMeli,
                presenterId:Number(this.presenter),
                adress:this.adress,
                shomareKart:this.shomareKart,
                shomareHesab:this.shomareHesab,
                description:this.description,
                tel:this.tel,
                mobile1:this.mobile1
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
