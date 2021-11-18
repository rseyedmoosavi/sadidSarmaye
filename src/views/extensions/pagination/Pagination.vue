<template>
  <b-container>
    <b-row>
      <b-col cols="12" sm="4" class="my-1" :key="index" v-for="(item, index) in paginatedItems">
        <b-card
            :bg-variant="item.variant"
            text-variant="white"
            :header="item.title"
            class="text-center"
        >
          <p class="card-text">{{item.body}}</p>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
            @change="onPageChanged"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {BContainer,BRow,BCol,BCard,BPagination} from 'bootstrap-vue'
import {USER_TRANSACTIONS} from "@/constants/graphql";
const items = [
  {
    title: "Primary",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "primary"
  },
  {
    title: "Secondary",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "secondary"
  },
  {
    title: "Success",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "success"
  },
  {
    title: "Info",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "info"
  },
  {
    title: "Warning",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "warning"
  },
  {
    title: "Danger",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    variant: "danger"
  }
];

export default {
  components:{
    BContainer,BRow,BCol,BCard,BPagination
  },
  name: "Pagination",
  data() {
    return {
      items: items,
      paginatedItems: items,
      currentPage: 1,
      perPage: 100,
      totalRows: items.length
    };
  },
  created() {
    this.$apollo.mutate({
      mutation: USER_TRANSACTIONS,
      variables:{
      }
    }).then((result) => {
      var transactions=new Array()
      let items = result.data.transactions.edges
      for (const item of items) {
        transactions.push({
          "title":item.node.profile.firstName+' '+item.node.profile.lastName,
          "body": item.node.amount,
          "variant": 'danger'
        })
      }
      this.userTransactions = transactions
      this.totalRows=result.data.transactions.totalCount
      this.items=transactions
    }).catch((error) => {
      console.log(error)
    })
  },
  computed: {},
  methods: {
    getDate(pageSize,pageNumber){
      let transactions=[]
      this.$apollo.mutate({
        mutation: USER_TRANSACTIONS,
        variables:{
          offset:pageNumber*pageSize
        }
      }).then((result) => {
        let items = result.data.transactions.edges
        for (const item of items) {
          transactions.push({
            "title":item.node.profile.firstName+' '+item.node.profile.lastName,
            "body": item.node.amount,
            "variant": 'danger'
          })
        }
        this.totalRows=result.data.transactions.totalCount
      }).catch((error) => {
        console.log(error)
      })
      return transactions
    },
    paginate(page_size, page_number) {
      let itemsToParse = this.getDate(100,page_number);
      this.paginatedItems = itemsToParse.slice(
          page_number * page_size,
          (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    }
  },
  mounted() {
    this.paginate(this.perPage, 0);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
