<template>
  <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
  >
    <template #button-content>
      <b-avatar
          size="40"
          :src="userData.avatar"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
      >
        <feather-icon
            v-if="!userData.fullName"
            icon="UserIcon"
            size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
        v-b-modal.modal-primary
        link-class="d-flex align-items-center"
    >
      <feather-icon
          size="16"
          icon="LockIcon"
          class="mr-50"
      />
      <span>تغییر رمز</span>
    </b-dropdown-item>
    <!--    <b-dropdown-item-->
    <!--      :to="{ name: 'pages-profile'}"-->
    <!--      link-class="d-flex align-items-center"-->
    <!--    >-->
    <!--      <feather-icon-->
    <!--        size="16"-->
    <!--        icon="UserIcon"-->
    <!--        class="mr-50"-->
    <!--      />-->
    <!--      <span>اخرین ورود: یکشنبه 20 آذر 1400</span>-->
    <!--    </b-dropdown-item>-->
    <b-dropdown-item
        :to="{ name: this.profileAddress}"
        link-class="d-flex align-items-center"
    >
      <feather-icon
          size="16"
          icon="UserIcon"
          class="mr-50"
      />
      <span>پروفایل</span>
    </b-dropdown-item>
    <b-dropdown-divider/>
    <b-dropdown-item
        link-class="d-flex align-items-center"
        @click="logout"
    >
      <feather-icon
          size="16"
          icon="LogOutIcon"
          class="mr-50"
      />
      <span>خروج</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'
import { GET_PROFILE_ADDRESS } from '@/constants/graphql'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
      profileAddress:null,
      userName:null
    }
  },
  // apollo:{
  //   profileAddress:{
  //     query:GET_PROFILE
  //   }
  // },
  mounted() {
    this.$apollo.mutate({
      mutation:GET_PROFILE_ADDRESS
    }).then((result)=>{
      if(result.data.me.profile){
        this.profileAddress= "pages-profile"
      }else{
        this.profileAddress= "customer-edit-profile"
      }
    }).catch((result)=>{
      console.clear()
      console.log(result)
    })
  },
  methods: {
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('user-id')
      localStorage.removeItem('fullName')
      localStorage.removeItem('profile-id')
      localStorage.removeItem('loglevel:webpack-dev-server')
      localStorage.removeItem('auth-token')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>
