<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Login-->
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
          <b-card-title
              class="mb-1 font-weight-bold"
              title-tag="h2"
          >
            به سدید سرمایه خوش آمدید
          </b-card-title>
          <b-card-text class="mb-2">
            برای ورود به صفحه شخصی، از نام کاربری و کلمه عبور خود استفاده نمایید.
          </b-card-text>

          <!-- form -->
          <validation-observer
              ref="loginForm"
              #default="{invalid}"
          >
            <b-form v-if="!showSms"
                    class="auth-login-form mt-2"
                    @submit.prevent="login"
            >
              <!-- email -->
              <b-form-group
                  label="نام کاربری/شماره همراه"
                  label-for="login-email"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Email"
                    vid="email"
                    rules="required"
                >
                  <b-form-input
                      id="login-email"
                      v-model="username"
                      :state="errors.length > 0 ? false:null"
                      name="login-email"
                      placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">کلمه عبور</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>کلمه عبور خودتان را فراموش کرده اید؟</small>
                  </b-link>
                </div>
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
                        id="login-password"
                        v-model="password"
                        :state="errors.length > 0 ? false:null"
                        class="form-control-merge"
                        :type="passwordFieldType"
                        name="login-password"
                        placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                >
                  در سیستم بمانم
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                  type="submit"
                  variant="primary"
                  block
                  :disabled="invalid"
              >
                ورود!
              </b-button>
            </b-form>
            <b-form v-if="showSms" @submit.prevent="login2Site">
              <b-form-group
                  label="پیامک دریافتی"
                  label-for="smsNo"
              >
                <validation-provider
                    #default="{ errors }"
                    name="smsNo"
                    vid="smsNo"
                    rules="required"
                >
                  <b-form-input
                      id="smsNo"
                      v-model="smsNo"
                      :state="errors.length > 0 ? false:null"
                      name="smsNo"
                      placeholder="12345"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-button
                  type="submit"
                  variant="primary"
                  block
                  :disabled="invalid"
              >
                ورود!
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>عضو نیستید؟</span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;هم اکنون ثبت نام کنید</span>
            </b-link>
          </b-card-text>

        </b-col>
      </b-col>
      <!-- /Login-->

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!--        <vuexy-logo/>-->
        <b-img
            fluid
            :src="Logo"
            alt="سدید سرمایه"
        />
        <h2 class="brand-text text-primary ml-1">
          سرمایه
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
              alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {GC_USER_ID, GC_AUTH_TOKEN, GC_USER_DATA} from '@/constants/settings'
import {LOGIN} from "@/constants/graphql";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from 'bootstrap-vue'
import {required, email} from '@validations'
import {togglePasswordVisibility} from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      showSms: false,
      result: null,
      smsNo: null,
      password: 'M@123456',
      username: 'morteza',
      sideImg: require('@/assets/images/pages/login.png'),
      Logo: require('@/assets/images/logo/logo.png'),
      // validation rules
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
        this.sideImg = require('@/assets/images/pages/login.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const {username, password} = this.$data
          if (this.login) {
            this.$apollo.mutate({
              mutation: LOGIN,
              variables: {
                username,
                password
              }
            }).then((result) => {
              this.result=result
              this.showSms = true
            }).catch((error) => {
              localStorage.removeItem(GC_USER_ID)
              localStorage.removeItem(GC_AUTH_TOKEN)
              localStorage.removeItem(GC_USER_DATA)
              localStorage.removeItem("fullName")
              alert(error);
            })
          }
        }
      })
    },
    login2Site() {
      if (this.smsNo == 10) {
        const id = this.result.data.login.user.id
        const token = this.result.data.login.token
        const fullName = this.result.data.login.user.profile.firstName + ' ' + this.result.data.login.user.profile.lastName
        try {
          this.saveUserData(id, token,fullName)
        }catch (e) {
          console.log(e)
        }
        this.$router.push({path: '/'}).then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-left',
            props: {
              title: `جناب آقای ${fullName}  خوش آمدید`,
              icon: 'CoffeeIcon',
              variant: 'success',
              text: `شما با موفقیت به سیستم وارد شدید`,
            },
          })
        })
      }
    },
    saveUserData(id, token, fullName) {
      let userData = {
        id: 1,
        fullName: fullName,
        username: this.$data.username,
        avatar: "/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png",
        email: "admin@demo.com",
        role: "admin",
        ability: [{"action": "manage", "subject": "all"}],
        extras: {"eCommerceCartItemsCount": 5}
      }
      localStorage.setItem(GC_USER_ID, id)
      localStorage.setItem(GC_AUTH_TOKEN, token)
      localStorage.setItem(GC_USER_DATA, JSON.stringify(userData))
      localStorage.setItem("fullName", fullName)
      this.$root.$data.userId = localStorage.getItem(GC_USER_ID)
      this.$ability.update(userData.ability)
      // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
