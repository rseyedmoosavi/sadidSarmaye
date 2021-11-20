<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col cols="6">1 of 3</b-col>
      <b-col>2 of 3</b-col>
      <b-col>3 of 3</b-col>
    </b-row>
  </b-container>
</template>

<script>
// import Bookmarks from './components/Bookmarks.vue'
// import CartDropdown from './components/CartDropdown.vue'
import {
  BLink, BNavbarNav, BImg, BCol, BRow, BContainer
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
    BContainer,
    BCol,
    BRow,
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
    fullName: null,
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {
      },
    },
  },
}
</script>
