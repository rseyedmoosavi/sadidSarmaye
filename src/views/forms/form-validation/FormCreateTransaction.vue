<template>
  <b-card-code
      :title="title"
  >
    <!-- form -->
    <b-form>
      <b-row>
        <b-col md="12">
          <!-- ******************** -->
          <b-form-group>
            <v-select
                v-model="selected"
                :clearable=false
                label="title"
                :options="users"
            />
          </b-form-group>
          <!-- ********************* -->


          <!-- ********************* -->
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <v-select
                    class="style-chooser"
                    v-model="kindSelected"
                    label="title"
                    :options="kind"
                    :clearable=false
                />
              </b-input-group-prepend>
              <b-form-input
                  placeholder="مبلغ"
                  v-model="amount"
                  @input="num2per"
              />
              <b-input-group-append>
                <b-button variant="outline-primary">
                  {{ persianPrice }}
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <!-- ********************* -->

          <!-- ******************** -->
          <b-form-group>
            <date-picker label="تاریخ" v-model="effectiveDate" :auto-submit="true"/>
          </b-form-group>
          <!-- ********************* -->

          <!-- ******************** -->
          <b-form-group>
            <b-form-input
                v-model="description"
                placeholder="توضیحات"
            />
          </b-form-group>
          <!-- ********************* -->
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <v-select
                    class="style-chooser"
                    v-model="imageKindSelected"
                    label="title"
                    :options="imageKind"
                    :clearable=false
                />
              </b-input-group-prepend>
              <b-form-file
                  placeholder="تصویر سند را انتخاب کنید..."
                  drop-placeholder="اینجا رها کنید..."
                  v-model="image"
                  name="file"
              />
            </b-input-group>
          </b-form-group>
          <!-- ********************* -->
        </b-col>

        <b-col cols="12">
          <b-button
              variant="primary"
              type="submit"
              @click.prevent="validationForm"
          >
            ذخیره
          </b-button>
        </b-col>
      </b-row>
    </b-form>

  </b-card-code>
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
import BCardCode from '@core/components/b-card-code'
import Num2persian from 'num2persian';
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
// import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {
  BInputGroup, BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BCardText, BInputGroupPrepend, BInputGroupAppend,
  BDropdown, BDropdownItem, BDropdownDivider, BFormFile, VBPopover
} from 'bootstrap-vue'
// import {required, email} from '@validations'
import {CREATE_TRANSACTION, GET_ALL_PRESENTER} from '@/constants/graphql'
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import moment from 'jalali-moment'

export default {
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  props: [
    'title',
    'user'
  ],
  mounted() {
    this.$apollo.mutate({
      mutation: GET_ALL_PRESENTER
    }).then((presenter) => {
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
    BCardCode,
    // ValidationProvider,
    // ValidationObserver,
    BCardText,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    vSelect,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BFormFile,
    Num2persian,
    datePicker: VuePersianDatetimePicker
  },
  data() {
    return {
      persianPrice: 'صفر ریال',
      selected: {title: 'مرتضی مطهری',value:2},
      kindSelected: {title: "سپرده گزاری", value: "1"},
      kind: [
        {title: "سپرده گزاری", value: "1"},
        {title: "مرجوعی", value: "2"},
        {title: "واریز سود", value: "3"},
        {title: "برداشت سود", value: "4"}
      ],
      imageKindSelected: [
        {
          title: "کارت به کارت",
          value: 1
        }
      ],
      imageKind: [
        {
          title: "کارت به کارت",
          value: 1
        },
        {
          title: "پایا",
          value: 2
        },
        {
          title: "ساتنا",
          value: 3
        },
        {
          title: "درون بانکی",
          value: 4
        },
        {
          title: "از بانک",
          value: 6
        },
      ],
      image:null,
      profileId: [],
      users: [],
      amount: null,
      effectiveDate: null,
      kindId: [],
      description: '',
    }
  },
  methods: {
    num2per() {
      this.persianPrice = Num2persian(this.amount) + " ریال"
    },
    toShamsiDate(date) {
      return moment(date, 'YYYY-M-D').locale('fa').format('YYYY/MM/DD')
    },
    toGregorianDate(date) {
      if (date) {
        return moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD')
      }
    },
    validationForm() {
      if (!this.selected.value) {
        this.makeToast("لطفا مشتری را انتخاب کنید", "danger")
      } else if(this.amount===0 || this.amount===''){
        this.makeToast("لطفا مبلغ را وارد نمایید", "danger")
      }else if(!Number(this.amount)){
        this.makeToast("لطفا مبلغ را به طور صحیح وارد نمایید", "danger")
      }else if(this.amount<20000000){
        this.makeToast("حداقل مبلغ بیست میلیون ریال می باشد", "danger")
      }else if(this.effectiveDate===null){
        this.makeToast("لطفا تاریخ را وارد نمایید", "danger")
      }else if(this.image===null){
        this.makeToast("لطفا تصویر سند را وارد نمایید", "danger")
      }
      else
      {
        const { mimetype, stream } = this.image;
        console.clear()
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
              images:{
                image:document.getElementsByName('file').value,
              }
            }
          }
        }).then((result) => {
          // console.log(result.data.profiles.edges[0].node.firstName)
          console.log(result)
        }).catch((result) => {
          alert("catch")
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
