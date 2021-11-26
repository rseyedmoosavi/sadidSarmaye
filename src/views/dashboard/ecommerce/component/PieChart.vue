<template>
  <b-card>
    <b-card-header>
      <b-card-title>
        نمودار مالی
      </b-card-title>
    </b-card-header>
    <vue-apex-charts
        type="pie"
        height="350"
        :options="donutChart.chartOptions"
        :series="donutChart.series"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardHeader
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import gql from 'graphql-tag'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardTitle,
    BCardHeader
  },
  apollo: {
    allDataSeries: {
      query : gql`
        {
          profiles(id: 2) {
            edges {
              node {
                deposit:transactions(kind_Id: 1) {
                  totalSum
                }
                profit:transactions(kind_Id: 3) {
                  totalSum
                }
                withdrawal:transactions(kind_Id: 2) {
                  totalSum
                }
              }
            }
          }
        }`
    }
  },
  data() {
    let deposit = 1,
        profit = 2,
        withdrawal = 3,
        allDataSeries=[]
    return {

      donutChart: {
        series: [deposit, profit, withdrawal],
        chartOptions: {
          legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'yekan',
          },
          colors: [
            '#00fcfc',
            '#ffeaa9',
            '#f4aa2b',
          ],
          dataLabels: {
            enabled: true,
            formatter(val) {
              return `${parseInt(val)}%`
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  name: {
                    fontSize: '2rem',
                    fontFamily: 'yekan',
                  },
                  value: {
                    fontSize: '1rem',
                    fontFamily: 'yekan',
                    formatter(val) {
                      return `${parseInt(val)} میلیون`
                    },
                  },
                },
              },
            },
          },
          labels: ['سپرده گذاری', 'پرداخت سود', 'برداشت'],
          responsive: [
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 380,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
            {
              breakpoint: 576,
              options: {
                chart: {
                  height: 320,
                },
                plotOptions: {
                  pie: {
                    pie: {
                      labels: {
                        show: true,
                        name: {
                          fontSize: '1.5rem',
                        },
                        value: {
                          fontSize: '1rem',
                        },
                        total: {
                          fontSize: '1.5rem',
                        },
                      },
                    },
                  },
                },
                legend: {
                  show: true,
                },
              },
            },
          ],
        },
      },
    }
  },
}
</script>
