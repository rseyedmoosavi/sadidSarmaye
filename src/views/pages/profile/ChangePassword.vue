<template>
  <b-container>
        <b-row class="match-height">
          <b-col cols="6">
            <b-row>
              <b-col cols="12">
                <b-form-group
                    label="کلمه عبور فعلی"
                    label-for="old-password"
                >
                  <b-form-input
                      id="old-password"
                      v-model="oldPassword"
                      placeholder="کلمه عبور فعلی"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                    label="کلمه عبور جدید"
                    label-for="password"
                >
                  <b-form-input
                      id="password"
                      @input="checkPassword"
                      v-model="password"
                      placeholder="کلمه عبور جدید"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                    label="تکرار کلمه عبور جدید"
                    label-for="confirm-password"
                >
                  <b-form-input
                      id="confirm-password"
                      @input="checkConfirmPassword"
                      v-model="checkPassword"
                      placeholder="تکرار کلمه عبور جدید"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="6">
            <ul>
              <li v-bind:class="{ is_valid: contains_eight_characters }" class="passText">حد اقل 8 کاراکتر</li>
              <li v-bind:class="{ is_valid: contains_number }" class="passText">دارا بودن عدد</li>
              <li v-bind:class="{ is_valid: contains_uppercase }" class="passText">داشتن حرف بزرگ انگلیسی</li>
              <li v-bind:class="{ is_valid: contains_special_character }" class="passText">داشتن کاراکتر خاص مثل "@,#,$
                و..."
              </li>
              <li v-bind:class="{ is_valid: equal_pass_and_confirm }" class="passText">یکسان بودن کلمه عبور جدید و تکرار آن</li>
            </ul>

            <div class="checkmark_container" v-bind:class="{ show_checkmark: valid_password }">
              <svg width="50%" height="50%" viewBox="0 0 140 100">
                <path class="checkmark" v-bind:class="{ checked: valid_password }" d="M10,50 l25,40 l95,-70"/>
              </svg>
            </div>
          </b-col>
          <b-col>
            <b-button variant="primary" :disabled="!valid_password">
              ذخیره
            </b-button>
          </b-col>
        </b-row>

  </b-container>
</template>

<script>
import {
  BFormInput, BFormGroup, BRow, BCol, BContainer, BButton
} from 'bootstrap-vue'

export default {
  data() {
    return {
      password: null,
      oldPassword: null,
      confirmPassword: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      equal_pass_and_confirm: false,
      valid_password: false,
    }
  },
  components: {
    BFormInput,
    BFormGroup,
    BRow,
    BCol,
    BContainer,
    BButton,
  },
  methods: {
    checkPassword() {
      this.password_length = this.password.length
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

      if (this.password_length >= 8) {
        this.contains_eight_characters = true
      } else {
        this.contains_eight_characters = false
      }
      if (this.confirmPassword === this.password) {
        this.equal_pass_and_confirm = true
      } else {
        this.equal_pass_and_confirm = false
      }
      this.contains_number = /\d/.test(this.password)
      this.contains_uppercase = /[A-Z]/.test(this.password)
      this.contains_special_character = format.test(this.password)

      if (this.contains_eight_characters === true &&
          this.contains_special_character === true &&
          this.contains_uppercase === true &&
          this.contains_number === true &&
          this.password === this.confirmPassword) {
        this.valid_password = true
      } else {
        this.valid_password = false
      }
    },
  }
}
</script>
<style>
.passText {
  color: red;
}

.is_valid {
  color: rgba(121, 201, 65, 1);
}

.is_valid:before {
  width: 100%;
}

.checkmark_container {
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  background: #2ecc71;
  width: 50px;
  height: 50px;
  visibility: hidden;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .4s ease;
}

.show_checkmark {
  visibility: visible;
  opacity: 1;
}

.checkmark {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 15;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

</style>
