<template>
  <b-row>
    <b-col md="12">
      <b-form-group
          label="مبلغ"
          label-for="amount"
      >
        <b-form-input
            v-model="amount"
            id="amount"
            placeholder="مبلغ"
            @input="updateDeposit"
        />
      </b-form-group>
    </b-col>
    <b-col md="12">
      <b-table v-if="amount!==0" striped hover :items="items" :fields="fields"></b-table>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BFormInput, BFormGroup, BTable } from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BTable
  },
  data() {
    return {
      amount: 0,
      fields: [
        {
          key: 'id',
          label: 'ردیف'
        },
        {
          key: 'percent',
          label: 'درصد سود'
        },
        {
          key: 'amount',
          label: 'مبلغ سود',
        },
        {
          key:'yourPercent',
          label: 'درصد سود شما'
        }
      ],
      items: [
        {
          id:1,
          percent:6,
          amount:(this.amount*0.06),
          _rowVariant: 'success'
        },
        {
          id:2,
          percent:6.5,
          amount:Math.round(this.amount*0.065)
        },
        {
          id:3,
          percent:7,
          amount:Math.round(this.amount*0.07)
        },
        {
          id:4,
          percent:7.5,
          amount:Math.round(this.amount*0.075)
        },
        {
          id:5,
          percent:8,
          amount:Math.round(this.amount*0.08)
        },
      ]
    }
  },
  methods: {
    updateDeposit(){
      this.items=[{
        id:1,
        percent:6,
        amount:Math.round(Math.round(this.amount*0.06)),
      },
        {
          id:2,
          percent:6.5,
          amount:Math.round(this.amount*0.065)
        },
        {
          id:3,
          percent:7,
          amount:Math.round(this.amount*0.07)
        },
        {
          id:4,
          percent:7.5,
          amount:Math.round(this.amount*0.075)
        },
        {
          id:5,
          percent:8,
          amount:Math.round(this.amount*0.08)
        },]
    }
  }
}
</script>
