<template>
  <b-navbar-nav class="nav">
    <b-nav-item class="pr-2">
      <HomeIcon/>
    </b-nav-item>
    <b-nav-item class="pr-2">
      <FullName/>
    </b-nav-item>
    <b-nav-item class="pr-2">
      <Today/>
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
import {
  BNavbarNav, BNavItem, BRow, BCol
} from 'bootstrap-vue'
import FullName from './FullName'
import Today from './Today'
import HomeIcon from './HomeIcon'

export default {
  components: {
    BNavbarNav,
    BNavItem,
    FullName,
    Today,
    HomeIcon,
    BRow,
    BCol
  },
}
</script>
