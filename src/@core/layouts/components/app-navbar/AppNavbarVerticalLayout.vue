<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!--      <locale />-->

    <!--      <search-bar />-->
    <!--      <cart-dropdown />-->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <full-name/>
      <today class="d-none d-lg-block" />
      <ads class="d-none d-lg-block" />
      <notification-dropdown />
      <dark-Toggler class="d-none d-lg-block" />
      <tour class="d-none d-lg-block" />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
// import Bookmarks from './components/Bookmarks.vue'
// import CartDropdown from './components/CartDropdown.vue'
import {
  BLink, BNavbarNav,BImg
} from 'bootstrap-vue'
import Locale from './components/Locale.vue'
import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
import Today from "./components/Today.vue";
import Ads from "./components/Ads.vue";
import FullName from "./components/FullName.vue"
import Tour from "./components/Tour.vue";
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,
    Tour,
    BImg,
    Ads,
    FullName,
    Today,
    // Navbar Components
    BNavbarNav,
    // Bookmarks,
    Locale,
    SearchBar,
    DarkToggler,
    // CartDropdown,
    NotificationDropdown,
    UserDropdown,
  },
  props: {
    fullName:null,
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
