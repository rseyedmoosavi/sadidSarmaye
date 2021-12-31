<template>
      <b-card>
        <b-row>
          <b-col>
          <FormCreateProfile/>
          </b-col>
        </b-row>
        <span>قبلا عضو شده اید؟<b-link href="login">وارد شوید</b-link></span>
      </b-card>
</template>

<script>
import {
  BRow, BCol, BLink, BButton, BImg, BCard
} from 'bootstrap-vue'
import FormCreateProfile from '@/views/forms/form-wizard/FormCreateProfile'

export default {
  components: {
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    FormCreateProfile,
    BCard
  },
  created() {
  },
  data() {
    return {}
  },
}
</script>
