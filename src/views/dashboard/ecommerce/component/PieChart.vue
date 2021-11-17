<template>
  <b-card>
    <b-card-title className="mb-1">
      Expense Ratio
    </b-card-title>
    <b-card-sub-title className="mb-2">
      Spending on various categories
    </b-card-sub-title>

    <vue-apex-charts
        type="donut"
        height="350"
        :options="apexChatData.donutChart.chartOptions"
        :series="apexChatData.donutChart.series"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import apexChatData from '@/views/charts-and-maps/charts/apex-chart/apexChartData'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardTitle,
    BCardSubTitle,
  },
  data() {
    return {
      apexChatData,
    }
  },
}
</script>
