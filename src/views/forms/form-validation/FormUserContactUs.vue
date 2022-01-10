<template>
  <b-card
      :title="title"
  >
    <!-- form -->
    <b-form>
      <b-row>
        <b-col md="12">
          <!-- ********************* -->
          <b-form-group>
            <b-input-group>
              <b-form-input
                  placeholder="موضوع"
                  v-model="subject"
              />
            </b-input-group>
          </b-form-group>
          <!-- ********************* -->

          <!-- ******************** -->
          <b-form-group>
            <b-form-textarea rows="3" max-rows="6" v-model="text" placeholder="متن"></b-form-textarea>
          </b-form-group>
          <!-- ********************* -->
        </b-col>

        <b-col cols="12">
          <b-button
              variant="primary"
              @click="validationForm()"
              type="button">
            ارسال
          </b-button>
        </b-col>
      </b-row>
    </b-form>

  </b-card>
</template>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #dfe5fb;
  /*border: none;*/
  color: #394066;
  border-radius: 5px 0 0 5px;
}
</style>

<script>
import {
  BInputGroup, BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BCardText,BFormTextarea
} from 'bootstrap-vue'
import { CREATE_TRANSACTION, GET_ALL_PRESENTER } from '@/constants/graphql'

export default {

  props: [
    'title'
  ],
  mounted() {
    this.$apollo.mutate({
      mutation: GET_ALL_PRESENTER
    })
        .then((presenter) => {
          var users = new Array()
          var items = presenter.data.profiles.edges
          for (const item of items) {
            users.push({
              'title': item.node.firstName + ' ' + item.node.lastName,
              'value': item.node.id
            })
          }
          this.users = users
        })
  },
  components: {
    BCardText,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BInputGroup,
    BFormTextarea
  },
  data() {
    return {
      subject:null,
      text:null
    }
  },
  methods: {
    validationForm() {
      if (!this.subject) {
        this.makeToast('موضوع را وارد کنید', 'danger')
      } else if (!this.text) {
        this.makeToast('متن را وارد کنید', 'danger')
      } else {
        const {
          mimetype,
          stream
        } = this.image
        // console.clear()
        console.log(document.getElementsByName('file').value)
        // return 0
        this.$apollo.mutate({
          mutation: CREATE_TRANSACTION,
          variables: {
            input: {
              profileId: this.selected.value,
              amount: this.amount,
              effectiveDate: this.toGregorianDate(this.effectiveDate),
              kindId: this.kindSelected.value,
              description: this.description,
              images: {
                image: document.getElementsByName('file').value,
              }
            }
          }
        })
            .then((result) => {
              // console.log(result.data.profiles.edges[0].node.firstName)
              console.log(result)
            })
            .catch((result) => {
              alert('catch')
            })
      }
    },

    makeToast(msg = null, variant = null) {
      this.$bvToast.toast(msg, {
        title: `توجه!`,
        variant,
        solid: true,
      })
    },
  },
}
</script>
