<template>
  <b-row>
    <b-col>

    </b-col>
  </b-row>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ToastificationContent,
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>
<style lang="scss">


.vue-form-wizard .wizard-progress-bar {
  float: right !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-left {
  float: right !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right {
  float: left !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-left .wizard-btn::before {
  content: "" !important;
}

.vue-form-wizard .wizard-card-footer .wizard-footer-right .wizard-btn::after {
  content: "" !important;
}
</style>
