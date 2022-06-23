<template>
 <v-form @submit.prevent="save">
  <v-card>
   <v-card-title>
    <span>{{ formTitle }}</span>
   </v-card-title>
   <v-card-text>
    <v-container>
     <v-row>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Input
        label=" اسم العقد بالعربي"
        type="text"
        :model="form.name_ar"
        :errorMessages="name_ar_Errors"
        @changeValue="(val) =>{form.name_ar = val
        $v.form.name_ar.$touch()}"></Input>
      </v-col>
            <v-col
       cols="12"
       sm="6"
       md="6">
       <Input
        label=" اسم العقد بالاجنبي"
        type="text"
        :model="form.name_en"
        :errorMessages="name_en_Errors"
        @changeValue="(val) =>{form.name_en = val
        $v.form.name_en.$touch()}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Input
        label="عدد الترشيحات"
        type="number"
        :model="form.candidates_count"
        :errorMessages="candidates_countErrors"
        @changeValue="(val) =>{form.candidates_count = val
        $v.form.candidates_count.$touch()}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Input
        label="عدد العروض"
        type="number"
        :model="form.offers_count"
        :errorMessages="offers_countErrors"
        @changeValue="(val) =>{form.offers_count = val
        $v.form.offers_count.$touch()}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Input
        label=" عدد ايام تميز العقار"
        type="special_offers_days_count"
        :model="form.special_offers_days_count"
        :errorMessages="special_offers_days_countErrors"
        @changeValue="(val) =>{form.special_offers_days_count = val
        $v.form.special_offers_days_count.$touch()}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Input
        label="السعر"
        type="number"
        :model="form.price"
        :errorMessages="priceErrors"
        @changeValue="(val) =>{form.price = val
        $v.form.price.$touch()}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="12"
       md="12">
       <Input
        label="مدة العقد بالأيام"
        type="number"
        :model="form.expire_period"
        :errorMessages="expire_periodErrors"
        @changeValue="(val) =>{form.expire_period = val
        $v.form.expire_period.$touch()}"></Input>
      </v-col>
     </v-row>
    </v-container>
   </v-card-text>
   <v-card-actions>
    <v-spacer></v-spacer>
    <!-- <v-btn
    color="blue darken-1"
    text>
    Cancel
   </v-btn> -->
    <div>
     <Button
      color="blue darken-1"
      type="submit"
      label="حفظ">
     </Button>
    </div>
   </v-card-actions>
  </v-card>

 </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from "vuex";
export default {
 mixins: [validationMixin],
 props: {
  api: Object,
  isNew: Boolean,
  newItemLabel: {
   default: "عنصر"
  }
 },
 validations: {
  form: {
   name_ar: {
    required,
        maxLength: maxLength(20)

   },
      name_en: {
    required,
        maxLength: maxLength(20)

   },
   expire_period:{
     required,
   },
   special_offers_days_count:{
    required,
   },
   candidates_count: {
    required,
   },
   offers_count: {
    required,
   },
   price: {
    required,
   },
  },
 },
 data() {
  return {
   name_error_msgs: {
    maxlength: 'يجب أن يتألف الأسم من 20 حرف كحد أقصى.',
    required: 'هذا الحقل مطلوب.'
   },
   candidates_count_error_msgs: {
    maxlength: 'يجب أن يتألف الأسم من 20 حرف كحد أقصى.',
    required: 'هذا الحقل مطلوب.'
   },
   offers_count_error_msgs: {
    required: 'هذا الحقل مطلوب.'
   },
   price_error_msgs: {
    minLength: 'يجب أن تتألف كلمة المرور من 8 محارف على الأقل.',
    required: 'هذا الحقل مطلوب.'
   },
  }
 },
 computed: {
  ...mapGetters(["getForm"]),
  name_ar_Errors() {
   const errors = []
   if (!this.$v.form.name_ar.$dirty) return errors;
      !this.$v.form.name_ar.maxLength && errors.push(this.name_error_msgs.maxlength);

   !this.$v.form.name_ar.required && errors.push(this.name_error_msgs.required);
   return errors
  },
    name_en_Errors() {
   const errors = []
   if (!this.$v.form.name_en.$dirty) return errors;
      !this.$v.form.name_en.maxLength && errors.push(this.name_error_msgs.maxlength);

   !this.$v.form.name_en.required && errors.push(this.name_error_msgs.required);
   return errors
  },
  candidates_countErrors() {
   const errors = []
   if (!this.$v.form.candidates_count.$dirty) return errors;
   !this.$v.form.candidates_count.required && errors.push(this.candidates_count_error_msgs.required);
   return errors
  },
  expire_periodErrors(){
const errors = []
   if (!this.$v.form.expire_period.$dirty) return errors;
   !this.$v.form.expire_period.required && errors.push(this.offers_count_error_msgs.required);
   return errors
  },
  special_offers_days_countErrors(){
const errors = []
   if (!this.$v.form.special_offers_days_count.$dirty) return errors;
   !this.$v.form.special_offers_days_count.required && errors.push(this.offers_count_error_msgs.required);
   return errors
  },
  offers_countErrors() {
   const errors = []
   if (!this.$v.form.offers_count.$dirty) return errors;
   !this.$v.form.offers_count.required && errors.push(this.offers_count_error_msgs.required);
   return errors
  },
  priceErrors() {
   const errors = []
   if (!this.$v.form.price.$dirty) return errors;
   !this.$v.form.price.required && errors.push(this.price_error_msgs.required);
   return errors
  },
  form() {
   return this.getForm
  },
  formTitle() {
   return (this.isNew ? " إنشاء " : " تعديل ") + this.newItemLabel;
  },

 },
 watch: {
  model() {}
 },
 methods: {
  save() {
   delete this.form.repeatPrice
   this.$v.form.$touch()
   if (!this.$v.form.$invalid) {
    let formdata = new FormData();
    for (let f in this.form) {
     formdata.append(f, this.form[f])
    }
    if (!this.isNew) {
     formdata.append('_method', 'PUT')
     formdata.append("contract_id", this.form.id)
    }
    this.$store.dispatch('sendForm', {
     api: this.api,
     form: formdata,
     isNew: this.isNew
    })
    this.$emit('dialogForm', false)
   } else {
    this.$toast.error("أكمل الحقول المطلوبة");
   }
  },
 },
}
</script>
