<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

     <!-- Register-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title class="mb-1">
            ثبت نام برای اقتصادی بهتر
          </b-card-title>
          <b-card-text class="mb-2">
            بسیار ساده است، ثبت نام کنید.
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="register"
            >
              <!-- username -->
              <b-form-group
                label="نام کاربری"
                label-for="register-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="register-username"
                    v-model="username"
                    name="register-username"
                    :state="errors.length > 0 ? false:null"
                    placeholder="mohammad"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group
                label="شماره همراه"
                label-for="register-mobile"
              >
                <validation-provider
                  #default="{ errors }"
                  name="mobile"
                  vid="mobile"
                  rules="required|number"
                >
                  <b-form-input
                    id="register-mobile"
                    v-model="mobile"
                    name="mobile"
                    :state="errors.length > 0 ? false:null"
                    placeholder="09123456789"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                label="کلمه عبور"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  ثبت نام به منزله تایید
                  <b-link>مفاد قرارداد</b-link>
                  می باشد
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                ثبت نام
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>قبلا عضو شده اید؟</span>
            <b-link :to="{name:'auth-login'}">
              <span> وارد شوید</span>
            </b-link>
          </p>

        </b-col>
      </b-col>
    <!-- /Register-->

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <b-img
            fluid
            :src="logo"
            alt="ثبت نام"
        />
        <h2 class="brand-text text-primary ml-1">
          سدید سرمایه
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
          lg="8"
          class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
              fluid
              :src="imgUrl"
              alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      username: '',
      userEmail: '',
      password: '',
      sideImg: require('@/assets/images/pages/register.png'),
      logo: require('@/assets/images/logo/logo.png'),
      // validation
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/register.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    register() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          useJwt.register({
            username: this.username,
            email: this.userEmail,
            password: this.password,
          })
            .then(response => {
              useJwt.setToken(response.data.accessToken)
              useJwt.setRefreshToken(response.data.refreshToken)
              localStorage.setItem('userData', JSON.stringify(response.data.userData))
              this.$ability.update(response.data.userData.ability)
              this.$router.push('/')
            })
            .catch(error => {
              this.$refs.registerForm.setErrors(error.response.data.error)
            })
        }
      })
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
