<template>
  <b-row>
    <b-col cols="12">
<!--      <table-basic />-->
<!--      <table-style-options />-->
<!--      <table-row-col-style />-->
<!--      <table-responsive />-->
<!--      <table-formatter-callback />-->
<!--      <table-custom-render />-->
<!--      <table-sticky-columns-headers />-->
<!--      <table-rowdetails-support />-->
<!--      <table-row-select-support />-->
      <table-kitchen-sink :items="items" title="لیست کاربران"/>
<!--      <table-light-weight />-->
<!--      <table-simple />-->
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import TableBasic from './TableBasic.vue'
import TableStyleOptions from './TableStyleOptions.vue'
import TableRowColStyle from './TableRowColStyle.vue'
import TableResponsive from './TableResponsive.vue'
import TableFormatterCallback from './TableFormatterCallback.vue'
import TableCustomRender from './TableCustomRender.vue'
import TableStickyColumnsHeaders from './TableStickyColumnsHeaders.vue'
import TableRowdetailsSupport from './TableRowdetailsSupport.vue'
import TableRowSelectSupport from './TableRowSelectSupport.vue'
import TableLightWeight from './TableLightWeight.vue'
import TableSimple from './TableSimple.vue'
import TableKitchenSink from './TableKitchenSink.vue'
import {PROFILE_FOR_DROPDOWN} from "@/constants/graphql";

export default {
  data(){
    return{
      items:[
        {
          firstName:'سیدروح الله',
          lastName:'سیدموسوی',
          codeMeli:'037027',
          mobile:'09127510',
          moaref:'سیدروح الله علم الهدی',
          totalSum:'153458000',
          status:Math.floor(Math.random() * 4)+1
        }
      ]
    }
  },
  created(){
    var profiles=new Array(),items
    this.$apollo.mutate({
      mutation: PROFILE_FOR_DROPDOWN,
    }).then((result) => {
      items=result.data.profiles.edges
      for(const item of items){
        profiles.push({
          "firstName": item.node.firstName,
          "lastName": item.node.lastName,
          "codeMeli": item.node.codeMeli,
          "mobile": item.node.mobile,
          "presenter": item.node.presenter,
          "totalSum": 0,
          "status": Math.floor(Math.random() * 4)+1
        })
      }
      console.log(profiles)
      this.items=profiles
      // this.items=result.data.profiles;
    }).catch((error) => {
      this.logout();
    })
  },
  components: {
    BRow,
    BCol,

    TableBasic,
    TableStyleOptions,
    TableRowColStyle,
    TableResponsive,
    TableFormatterCallback,
    TableCustomRender,
    TableStickyColumnsHeaders,
    TableRowdetailsSupport,
    TableRowSelectSupport,
    TableLightWeight,
    TableSimple,
    TableKitchenSink,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
