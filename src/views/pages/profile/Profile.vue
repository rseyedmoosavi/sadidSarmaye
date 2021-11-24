<template>
  <div>
    <form-wizard
        color="#7367F0"
        :title="null"
        :subtitle="null"
        finish-button-text="ذخیره"
        back-button-text="مرحله قبل"
        next-button-text="مرحله بعد"
        class="steps-transparent mb-3"
        @on-complete="formSubmitted"
    >
      <!-- account detail tab -->
      <tab-content
          title="حساب کاربری"
          icon="feather icon-file-text"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              اطلاعات حساب کاربری
            </h5>
            <small class="text-muted">اطلاعات را به طور دقیق وارد نمایید.</small>
          </b-col>
          <b-col md="6">
            <b-form-group
                label-for="i-user-name"
                label="نام کاربری"
            >
              <b-form-input
                  id="i-user-name"
                  placeholder="mohammad"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="تلفن همراه"
                label-for="i-mobile"
            >
              <b-form-input
                  id="i-mobile"
                  placeholder="09123456789"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
      <tab-content
          title="حساب کاربری"
          icon="feather icon-file-text"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              مشخصات فردی
            </h5>
            <small class="text-muted">اطلاعات فردی را دقیقا عین شناسنامه تکمیل کنید.</small>
          </b-col>
          <b-col md="4">
            <b-form-group
                label-for="i-first-name"
                label="نام"
            >
              <b-form-input
                  id="i-first-name"
                  placeholder="سیدمحمد"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="نام خانوادگی"
                label-for="i-last-name"
            >
              <b-form-input
                  id="i-last-name"
                  placeholder="رضایی"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="نام پدر"
                label-for="i-father-name"
            >
              <b-form-input
                  id="i-father-name"
                  placeholder="محمدعلی"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="شماره شناسنامه"
                label-for="i-id-number"
            >
              <b-form-input
                  id="i-id-number"
                  placeholder="3466"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="کد ملی"
                label-for="i-international-code"
            >
              <b-form-input
                  id="i-international-code"
                  placeholder="0370270012"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="تاریخ تولد"
                label-for="i-birth-date"
            >
              <b-form-input
                  id="i-birth-date"
                  placeholder="Doe"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="محل تولد"
                label-for="i-birth-location"
            >
              <v-select
                  id="i-birth-location"
                  v-model="birthDateLocation"
                  dir="rtl"
                  :options="cities"
                  label="text"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content
          title="آدرس"
          icon="feather icon-map-pin"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              آدرس
            </h5>
            <small class="text-muted">آدرس محل زندگی خود را وارد نمایید.</small>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="استان"
                label-for="i-state"
            >
              <v-select
                  id="i-state"
                  v-model="birthDateLocation"
                  dir="rtl"
                  :options="cities"
                  label="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="شهر"
                label-for="i-city"
            >
              <v-select
                  id="i-city"
                  v-model="birthDateLocation"
                  dir="rtl"
                  :options="cities"
                  label="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                label="بخش"
                label-for="i-section"
            >
              <v-select
                  id="i-section"
                  v-model="birthDateLocation"
                  dir="rtl"
                  :options="cities"
                  label="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="10">
            <b-form-group
                label="آدرس"
                label-for="i-address"
            >
              <b-form-input
                  id="i-address"
                  placeholder="قم، خیابان صفاییه، کوچه بیگدلی، فرعی 124، پلاک 1453"
              />
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group
                label="کد پستی"
                label-for="i-postal-code"
            >
              <b-form-input
                  id="i-postal-code"
                  placeholder="3714555555"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              اطلاعات تماس
            </h5>
            <small class="text-muted">اطلاعات را به طور دقیق وارد نمایید</small>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="تلفن منزل"
                label-for="i-home-phone"
            >
              <b-form-input
                  id="i-home-phone"
                  placeholder="217787477"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="تلفن محل کار"
                label-for="i-work-phone"
            >
              <b-form-input
                  id="i-work-phone"
                  placeholder="214578588"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="تلفن همراه 1"
                label-for="i-mobile-1"
            >
              <b-form-input
                  id="i-mobile-1"
                  placeholder="09123456789"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="تلفن همراه 2"
                label-for="i-mobile-2"
            >
              <b-form-input
                  id="i-mobile-2"
                  placeholder="09357894321"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
                label="رایانامه"
                label-for="i-email"
            >
              <b-form-input
                  id="i-email"
                  placeholder="email@gmail.com"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- social link -->
      <tab-content
          title="اطلاعات بانکی"
          icon="feather icon-link"
      >
        <b-row>
          <b-col
              cols="12"
              class="mb-2"
          >
            <h5 class="mb-0">
              اطلاعات بانکی
            </h5>
            <small class="text-muted">فقط حساب(هایی)که به نام خودتان هستند را وارد کنید</small>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="نام بانک"
                label-for="i-bank"
            >
              <v-select
                  id="i-bank"
                  v-model="bankName"
                  dir="rtl"
                  :options="banks"
                  label="text"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="شماره حساب"
                label-for="i-hesab"
            >
              <b-form-input
                  id="i-hesab"
                  placeholder="5741900000"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
                label="شناسه شبا"
                label-for="i-sheba"
            >
              <b-form-input
                  id="i-sheba"
                  placeholder="IR240120000000000000000000"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import { codeIconInfo } from './code'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      bankName: 'ملت',
      banks: [
        {
          value: 1,
          text: 'ملت'
        },
        {
          value: 2,
          text: 'ملی'
        },
        {
          value: 3,
          text: 'رسالت'
        },
        {
          value: 4,
          text: 'مهر ایران'
        },
        {
          value: 5,
          text: 'سپه'
        },
        {
          value: 6,
          text: 'صادرات'
        },
        {
          value: 7,
          text: 'تجارت'
        },
      ],
      birthDateLocation: 'تهران',
      cities: [
        {
          value: 1,
          text: 'ابرکوه'
        },
        {
          value: 2,
          text: 'ابریشم'
        },
        {
          value: 3,
          text: 'ابوزیدآباد'
        },
        {
          value: 4,
          text: 'ابوحمیظه'
        },
        {
          value: 5,
          text: 'ابهر'
        },
        {
          value: 6,
          text: 'احمدآباد صولت'
        },
        {
          value: 7,
          text: 'احمدآباد'
        },
        {
          value: 8,
          text: 'احمدسرگوراب'
        },
        {
          value: 9,
          text: 'اختیارآباد'
        },
        {
          value: 10,
          text: 'ادیمی'
        },
        {
          value: 11,
          text: 'اراک'
        },
        {
          value: 12,
          text: 'ارجمند'
        },
        {
          value: 13,
          text: 'ارداق'
        },
        {
          value: 14,
          text: 'اردبیل'
        },
        {
          value: 15,
          text: 'اردستان'
        },
        {
          value: 16,
          text: 'اردکان'
        },
        {
          value: 17,
          text: 'اردکان'
        },
        {
          value: 18,
          text: 'اردل'
        },
        {
          value: 19,
          text: 'ارزوئیه'
        },
        {
          value: 20,
          text: 'ارسک'
        },
        {
          value: 21,
          text: 'ارسنجان'
        },
        {
          value: 22,
          text: 'ارکواز'
        },
        {
          value: 23,
          text: 'ارمغان‌خانه'
        },
        {
          value: 24,
          text: 'ارومیه'
        },
        {
          value: 25,
          text: 'اروندکنار'
        },
        {
          value: 26,
          text: 'ازگله'
        },
        {
          value: 27,
          text: 'ازنا'
        },
        {
          value: 28,
          text: 'ازندریان'
        },
        {
          value: 29,
          text: 'اژیه'
        },
        {
          value: 30,
          text: 'اسارا'
        },
        {
          value: 31,
          text: 'اسالم'
        },
        {
          value: 32,
          text: 'اسپکه'
        },
        {
          value: 33,
          text: 'استهبان'
        },
        {
          value: 34,
          text: 'اسدآباد'
        },
        {
          value: 35,
          text: 'اسدیه'
        },
        {
          value: 36,
          text: 'اسفدن'
        },
        {
          value: 37,
          text: 'اسفراین'
        },
        {
          value: 38,
          text: 'اسفرورین'
        },
        {
          value: 39,
          text: 'اسکو'
        },
        {
          value: 40,
          text: 'اسلام‌آباد غرب'
        },
        {
          value: 41,
          text: 'اسلام‌شهر'
        },
        {
          value: 42,
          text: 'اسلامیه'
        },
        {
          value: 43,
          text: 'اسلام‌شهر آق‌گل'
        },
        {
          value: 44,
          text: 'اسیر'
        },
        {
          value: 45,
          text: 'اشترینان'
        },
        {
          value: 46,
          text: 'اشتهارد'
        },
        {
          value: 47,
          text: 'اشکذر'
        },
        {
          value: 48,
          text: 'اشکنان'
        },
        {
          value: 49,
          text: 'اشنویه'
        },
        {
          value: 50,
          text: 'اصفهان'
        },
        {
          value: 51,
          text: 'اصلاندوز'
        },
        {
          value: 52,
          text: 'اتاقور'
        },
        {
          value: 53,
          text: 'افزر'
        },
        {
          value: 54,
          text: 'افوس'
        },
        {
          value: 55,
          text: 'اقبالیه'
        },
        {
          value: 56,
          text: 'اقلید'
        },
        {
          value: 57,
          text: 'الشتر'
        },
        {
          value: 58,
          text: 'الوان'
        },
        {
          value: 59,
          text: 'الوند'
        },
        {
          value: 60,
          text: 'الیگودرز'
        },
        {
          value: 61,
          text: 'امام حسن'
        },
        {
          value: 62,
          text: 'امام‌شهر'
        },
        {
          value: 63,
          text: 'املش'
        },
        {
          value: 64,
          text: 'امیدیه'
        },
        {
          value: 65,
          text: 'امیرکلا'
        },
        {
          value: 66,
          text: 'امیریه'
        },
        {
          value: 67,
          text: 'امین‌شهر'
        },
        {
          value: 68,
          text: 'انابد'
        },
        {
          value: 69,
          text: 'انار'
        },
        {
          value: 70,
          text: 'انارستان'
        },
        {
          value: 71,
          text: 'انارک'
        },
        {
          value: 72,
          text: 'انبارآلوم'
        },
        {
          value: 73,
          text: 'اندوهجرد'
        },
        {
          value: 74,
          text: 'اندیشه'
        },
        {
          value: 75,
          text: 'اندیمشک'
        },
        {
          value: 76,
          text: 'اوز'
        },
        {
          value: 77,
          text: 'اهر'
        },
        {
          value: 78,
          text: 'اهرم'
        },
        {
          value: 79,
          text: 'اهل'
        },
        {
          value: 80,
          text: 'اهواز'
        },
        {
          value: 81,
          text: 'ایج'
        },
        {
          value: 82,
          text: 'ایذه'
        },
        {
          value: 83,
          text: 'ایرانشهر'
        },
        {
          value: 84,
          text: 'ایزدخواست'
        },
        {
          value: 85,
          text: 'ایزدشهر'
        },
        {
          value: 86,
          text: 'ایلام'
        },
        {
          value: 87,
          text: 'ایلخچی'
        },
        {
          value: 88,
          text: 'ایمان‌شهر'
        },
        {
          value: 89,
          text: 'اینچه‌برون'
        },
        {
          value: 90,
          text: 'ایوان'
        },
        {
          value: 91,
          text: 'ایوانکی'
        },
        {
          value: 92,
          text: 'ایواوغلی'
        },
        {
          value: 93,
          text: 'ایور'
        },
        {
          value: 94,
          text: 'باب انار'
        },
        {
          value: 95,
          text: 'باباحیدر'
        },
        {
          value: 96,
          text: 'بابارشانی'
        },
        {
          value: 97,
          text: 'بابل'
        },
        {
          value: 98,
          text: 'بابلسر'
        },
        {
          value: 99,
          text: 'باجگیران'
        },
        {
          value: 100,
          text: 'باخرز'
        },
        {
          value: 101,
          text: 'بادرود'
        },
        {
          value: 102,
          text: 'بار'
        },
        {
          value: 103,
          text: 'باروق'
        },
        {
          value: 104,
          text: 'بازار جمعه'
        },
        {
          value: 105,
          text: 'بازرگان'
        },
        {
          value: 106,
          text: 'باسمنج'
        },
        {
          value: 107,
          text: 'باشت'
        },
        {
          value: 108,
          text: 'باغ بهادران'
        },
        {
          value: 109,
          text: 'باغ‌ملک'
        },
        {
          value: 110,
          text: 'باغستان'
        },
        {
          value: 111,
          text: 'باغین'
        },
        {
          value: 112,
          text: 'بافت'
        },
        {
          value: 113,
          text: 'بافران'
        },
        {
          value: 114,
          text: 'بافق'
        },
        {
          value: 115,
          text: 'باقرشهر'
        },
        {
          value: 116,
          text: 'بالاده'
        },
        {
          value: 117,
          text: 'بانه'
        },
        {
          value: 118,
          text: 'بانه‌وره'
        },
        {
          value: 119,
          text: 'بایگ'
        },
        {
          value: 120,
          text: 'باینگان'
        },
        {
          value: 121,
          text: 'بجستان'
        },
        {
          value: 122,
          text: 'بجنورد'
        },
        {
          value: 123,
          text: 'بخشایش'
        },
        {
          value: 124,
          text: 'بدره'
        },
        {
          value: 125,
          text: 'برازجان'
        },
        {
          value: 126,
          text: 'بردخون'
        },
        {
          value: 127,
          text: 'بردستان'
        },
        {
          value: 128,
          text: 'بردسکن'
        },
        {
          value: 129,
          text: 'بردسیر'
        },
        {
          value: 130,
          text: 'برزک'
        },
        {
          value: 131,
          text: 'برزول'
        },
        {
          value: 132,
          text: 'برف‌انبار'
        },
        {
          value: 133,
          text: 'بروات'
        },
        {
          value: 134,
          text: 'بروجرد'
        },
        {
          value: 135,
          text: 'بروجن'
        },
        {
          value: 136,
          text: 'بره‌سر'
        },
        {
          value: 137,
          text: 'بزمان'
        },
        {
          value: 138,
          text: 'بزنجان'
        },
        {
          value: 139,
          text: 'بستان'
        },
        {
          value: 140,
          text: 'بستان‌آباد'
        },
        {
          value: 141,
          text: 'بستک'
        },
        {
          value: 142,
          text: 'بسطام'
        },
        {
          value: 143,
          text: 'بشرویه'
        },
        {
          value: 144,
          text: 'بفروئیه'
        },
        {
          value: 145,
          text: 'بلبان‌آباد'
        },
        {
          value: 146,
          text: 'بلداجی'
        },
        {
          value: 147,
          text: 'بلده'
        },
        {
          value: 148,
          text: 'بم'
        },
        {
          value: 149,
          text: 'بمپور'
        },
        {
          value: 150,
          text: 'بن'
        },
        {
          value: 151,
          text: 'بناب'
        },
        {
          value: 152,
          text: 'بناب جدید'
        },
        {
          value: 153,
          text: 'بنارویه'
        },
        {
          value: 154,
          text: 'بنت'
        },
        {
          value: 155,
          text: 'بنجار'
        },
        {
          value: 156,
          text: 'بندر امام خمینی'
        },
        {
          value: 157,
          text: 'بندر انزلی'
        },
        {
          value: 158,
          text: 'بندر ترکمن'
        },
        {
          value: 159,
          text: 'بندر جاسک'
        },
        {
          value: 160,
          text: 'بندر دیر'
        },
        {
          value: 161,
          text: 'بندر دیلم'
        },
        {
          value: 162,
          text: 'بندر ریگ'
        },
        {
          value: 163,
          text: 'بندرعباس'
        },
        {
          value: 164,
          text: 'بندر کنگان'
        },
        {
          value: 165,
          text: 'بندر گز'
        },
        {
          value: 166,
          text: 'بندر گناوه'
        },
        {
          value: 167,
          text: 'بندر لنگه'
        },
        {
          value: 168,
          text: 'بندر ماهشهر'
        },
        {
          value: 169,
          text: 'بنک'
        },
        {
          value: 170,
          text: 'بوانات'
        },
        {
          value: 171,
          text: 'بوشهر'
        },
        {
          value: 172,
          text: 'بوکان'
        },
        {
          value: 173,
          text: 'بومهن'
        },
        {
          value: 174,
          text: 'بوموسی'
        },
        {
          value: 175,
          text: 'بوئین‌زهرا'
        },
        {
          value: 176,
          text: 'بویین سفلی'
        },
        {
          value: 177,
          text: 'بوئین و میاندشت'
        },
        {
          value: 178,
          text: 'بهاباد'
        },
        {
          value: 179,
          text: 'بهار'
        },
        {
          value: 180,
          text: 'بهاران‌شهر'
        },
        {
          value: 181,
          text: 'بهارستان'
        },
        {
          value: 182,
          text: 'بهبهان'
        },
        {
          value: 183,
          text: 'بهرمان'
        },
        {
          value: 184,
          text: 'بهشهر'
        },
        {
          value: 185,
          text: 'بهمن'
        },
        {
          value: 186,
          text: 'بهنمیر'
        },
        {
          value: 187,
          text: 'بیارجمند'
        },
        {
          value: 188,
          text: 'بیجار'
        },
        {
          value: 189,
          text: 'بیدخت'
        },
        {
          value: 190,
          text: 'بیدستان'
        },
        {
          value: 191,
          text: 'بیرجند'
        },
        {
          value: 192,
          text: 'بیرم'
        },
        {
          value: 193,
          text: 'بیستون'
        },
        {
          value: 194,
          text: 'بیضا'
        },
        {
          value: 195,
          text: 'بیکا'
        },
        {
          value: 196,
          text: 'بیله‌سوار'
        },
        {
          value: 197,
          text: 'پاتاوه'
        },
        {
          value: 198,
          text: 'پارس‌آباد'
        },
        {
          value: 199,
          text: 'پارسیان'
        },
        {
          value: 200,
          text: 'پاریز'
        },
        {
          value: 201,
          text: 'پاکدشت'
        },
        {
          value: 202,
          text: 'پاوه'
        },
        {
          value: 203,
          text: 'پردنجان'
        },
        {
          value: 204,
          text: 'پردیس'
        },
        {
          value: 205,
          text: 'پرندک (زرندیه)'
        },
        {
          value: 206,
          text: 'پره‌سر'
        },
        {
          value: 207,
          text: 'پل‌دختر'
        },
        {
          value: 208,
          text: 'پل سفید'
        },
        {
          value: 209,
          text: 'پلدشت'
        },
        {
          value: 210,
          text: 'پول'
        },
        {
          value: 211,
          text: 'پهله'
        },
        {
          value: 212,
          text: 'پیرانشهر'
        },
        {
          value: 213,
          text: 'پیربکران'
        },
        {
          value: 214,
          text: 'پیش‌قلعه'
        },
        {
          value: 215,
          text: 'پیشوا'
        },
        {
          value: 216,
          text: 'پیشین'
        },

      ],
      selectedLanguage: 'nothing_selected',
      codeIconInfo,
      countryName: [
        {
          value: 'select_value',
          text: 'Select Value'
        },
        {
          value: 'Russia',
          text: 'Russia'
        },
        {
          value: 'Canada',
          text: 'Canada'
        },
        {
          value: 'China',
          text: 'China'
        },
        {
          value: 'United States',
          text: 'United States'
        },
        {
          value: 'Brazil',
          text: 'Brazil'
        },
        {
          value: 'Australia',
          text: 'Australia'
        },
        {
          value: 'India',
          text: 'India'
        },
      ],
      languageName: [
        {
          value: 'nothing_selected',
          text: 'Nothing Selected'
        },
        {
          value: 'English',
          text: 'English'
        },
        {
          value: 'Chinese',
          text: 'Mandarin Chinese'
        },
        {
          value: 'Hindi',
          text: 'Hindi'
        },
        {
          value: 'Spanish',
          text: 'Spanish'
        },
        {
          value: 'Arabic',
          text: 'Arabic'
        },
        {
          value: 'Malay',
          text: 'Malay'
        },
        {
          value: 'Russian',
          text: 'Russian'
        },
      ],
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>
<style lang="scss">

@import '@core/scss/vue/libs/vue-wizard.scss';
@import '@core/scss/vue/libs/vue-select.scss';

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
