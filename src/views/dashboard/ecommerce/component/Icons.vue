<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-img src="@/assets/images/icons/dashboard/deposit.png"></b-img>
      </b-col>
      <b-col>
        <b-img fluid src="@/assets/images/icons/dashboard/bardasht.png"></b-img>
      </b-col>
      <b-col>
        <b-img src="@/assets/images/icons/dashboard/renew.png"></b-img>
      </b-col>
      <b-col>
        <b-img src="@/assets/images/icons/dashboard/calc.png"></b-img>
      </b-col>
      <b-col>
        <b-img src="@/assets/images/icons/dashboard/message.png"></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BRow, BCol, BImg,BContainer } from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BContainer
  },
  data() {
    return {}
  },

}
</script>
