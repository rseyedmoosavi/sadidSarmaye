<template>
  <b-card
      v-if="data"
      no-body
      class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Statistics</b-card-title>
      <b-card-text class="font-small-2 mr-25 mb-0">
        Updated 1 month ago
      </b-card-text>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
            xl="3"
            sm="6"
        >
          <b-media no-body>
            <b-media-aside
                class="mr-2"
            >
              <b-avatar
                  size="48"
                  :variant="'light-primary'"
              >
                <feather-icon
                    size="24"
                    :icon="'TrendingUpIcon'"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{data.bSood.totalCount}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                برداشت سود
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>

        <b-col
            xl="3"
            sm="6"
        >
          <b-media no-body>
            <b-media-aside
                class="mr-2"
            >
              <b-avatar
                  size="48"
                  :variant="'light-info'"
              >
                <feather-icon
                    size="24"
                    :icon="'UserIcon'"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{data.vSood.totalCount}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                واریز سود
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>

        <b-col
            xl="3"
            sm="6"
        >
          <b-media no-body>
            <b-media-aside
                class="mr-2"
            >
              <b-avatar
                  size="48"
                  :variant="'light-danger'"
              >
                <feather-icon
                    size="24"
                    :icon="'BoxIcon'"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{data.bSoodm.totalCount}}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                برداشت سود معرف
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>

        <b-col
            xl="3"
            sm="6"
        >
          <b-media no-body>
            <b-media-aside
                class="mr-2"
            >
              <b-avatar
                  size="48"
                  :variant="'light-success'"
              >
                <feather-icon
                    size="24"
                    :icon="'DollarSignIcon'"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                $9745
              </h4>
              <b-card-text class="font-small-3 mb-0">
                Revenue
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

export default {
  created() {
    console.log(this.props.data)
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
