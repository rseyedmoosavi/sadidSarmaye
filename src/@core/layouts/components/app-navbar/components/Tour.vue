<template>
  <div>
    <b-nav-item @click="tourStart">
      <feather-icon
          icon="HelpCircleIcon"
          size="21"
      />
    </b-nav-item>
    <app-tour :steps="steps"/>
  </div>
</template>

<script>
import AppTour from '@core/components/app-tour/AppTour.vue'

export default {
  name: 'Tour',
  components: {
    AppTour,
  },
  data() {
    return {
      steps: [
        {
          target: '#persent',
          header: {
            title: 'Card',
          },
          content: 'This card contains demo for the tour.',
        },
        {
          target: '#tour-card .icon-code',
          header: {
            title: 'View demo Source',
          },
          content: 'If you ever find your self confused, you can click on this code icon to check the source of current demo.',
        },
        {
          target: '#tour-card .btn',
          header: {
            title: 'Trigger Tour',
          },
          content: 'You can click on this button to trigger the tour.',
        },
      ],
    }
  },
  methods: {

    // tour steps
    tourStart() {
      this.$tours.vuexyTour.start()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/tour.scss';
</style>
