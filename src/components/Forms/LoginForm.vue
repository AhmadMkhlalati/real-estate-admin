<template>
 <v-form @submit.prevent="login">
  <v-card color="transparent">
   <v-card-text>
    <v-container>
     <v-row>
      <v-col
       cols="12"
       sm="6"
       md="12">
       <Input
        label="الإيميل أو الهاتف"
        type="text"
        :model="form.authentication"
        :errorMessages="authenticationErrors"
        @changeValue="(val) =>{form.authentication = val
        $v.form.authentication.$touch()}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="12">
       <Input
        label="كلمة المرور"
        type="password"
        :model="form.password"
        :errorMessages="passwordErrors"
        @changeValue="(val) =>{form.password = val
        $v.form.password.$touch()}"></Input>
      </v-col>
     </v-row>
    </v-container>
   </v-card-text>
   <v-card-actions>
    <v-spacer></v-spacer>
    <div>
     <Button
      color="blue darken-1"
      type="submit"
      label="تسجيل الدخول"
      :isLoad="isLoad">
     </Button>
    </div>
   </v-card-actions>
  </v-card>
  <!-- <v-progress-circular
   v-else
   :size="50"
   color="primary"
   indeterminate></v-progress-circular> -->
 </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from "vuex";
export default {
 mixins: [validationMixin],
 props: {
  api: String,
  isNew: Boolean,
  newItemLabel: {
   default: "عنصر"
  }
 },
 validations: {
  form: {
   authentication: {
    required,
   },
   password: {
    required,
    minLength: minLength(1)
   },
  },
 },
 data() {
  return {
  // isLoad: false,
   authentication_error_msgs: {
    required: 'هذا الحقل مطلوب.'
   },
   password_error_msgs: {
    minLength: 'يجب أن تتألف كلمة المرور من 8 محارف على الأقل.',
    required: 'هذا الحقل مطلوب.'
   },
  }
 },
 computed: {
  authenticationErrors() {
   const errors = []
   if (!this.$v.form.authentication.$dirty) return errors;
   !this.$v.form.authentication.required && errors.push(this.authentication_error_msgs.required);
   return errors
  },
  passwordErrors() {
   const errors = []
   if (!this.$v.form.password.$dirty) return errors;
   !this.$v.form.password.minLength && errors.push(this.password_error_msgs.minLength);
   !this.$v.form.password.required && errors.push(this.password_error_msgs.required);
   return errors
  },
  form() {
   return this.$store.getters.getUser
  },
  isLoad(){
    return this.$store.getters.getIsLoad
  }
 },
 methods: {
  login() {
   this.$v.form.$touch()
   if (!this.$v.form.$invalid) {
    let formdata = new FormData();
    for (let f in this.form) {
     formdata.append(f, this.form[f])
    }
    this.$store.dispatch('login', {
     api: this.api,
     form: formdata,
    })
   } else {
    this.$toast.error("أكمل الحقول المطلوبة");
   }
  },
 },
}
</script>
