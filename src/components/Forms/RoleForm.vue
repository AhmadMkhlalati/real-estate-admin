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
       <Switcher
        label="الأحصائيات"
        attr="statistical"
        :model="form.statistical"
        @switcher="(val) =>{form.statistical = val.value; $v.form.statistical.$touch()}"></Switcher>
      </v-col>
                  
                  <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="المكاتب"
        attr="estate_offices"
        :model="form.estate_offices"
        @switcher="(val) =>{form.estate_offices = val.value; $v.form.estate_offices.$touch()}"></Switcher>
      </v-col>
                  <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label=" العقارات"
        attr="estates"
        :model="form.estates"
        @switcher="(val) =>{form.estates = val.value; $v.form.estates.$touch()}"></Switcher>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="الطلبات العقارية"
        attr="estate_orders"
        :model="form.estate_orders"
        @switcher="(val) =>{form.estate_orders = val.value; $v.form.estate_orders.$touch()}"></Switcher>
      </v-col>



      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="التفيمات"
        attr="ratings"
        :model="form.ratings"
        @switcher="(val) =>{form.ratings = val.value; $v.form.ratings.$touch()}"></Switcher>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="أشعارات المكتب"
        attr="office_notifications"
        :model="form.office_notifications"
        @switcher="(val) =>{form.office_notifications = val.value; $v.form.office_notifications.$touch()}"></Switcher>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="أشعارات المستخدم"
        attr="costumers_notifications"
        :model="form.costumers_notifications"
        @switcher="(val) =>{form.costumers_notifications = val.value; $v.form.costumers_notifications.$touch()}"></Switcher>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="ثوابت النظام"
        attr="system_variables"
        :model="form.system_variables"
        @switcher="(val) =>{form.system_variables = val.value; $v.form.system_variables.$touch()}"></Switcher>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="العمليات"
        attr="operations"
        :model="form.operations"
        @switcher="(val) =>{form.operations = val.value; $v.form.operations.$touch()}"></Switcher>
      </v-col>
            <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="المستخدمين"
        attr="users"
        :model="form.users"
        @switcher="(val) =>{form.users = val.value; $v.form.users.$touch()}"></Switcher>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="6">
       <Switcher
        label="الموظفين"
        attr="employees"
        :model="form.employees"
        @switcher="(val) =>{form.employees = val.value; $v.form.employees.$touch()}"></Switcher>
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
import Switcher from '../Form Components/Switcher'
import { validationMixin } from 'vuelidate'
import { required, maxLength, estate_ordersLength, email, sameAs } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from "vuex";
export default {
 components: { Switcher },
 mixins: [validationMixin],
 props: {
  api: Object,
  isNew: Boolean,
  id: {
   default: null
  },
  newItemLabel: {
   default: "عنصر"
  }
 },
 data() {
  return {}
 },
 computed: {
  ...mapGetters(["getForm"]),
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
   //  this.$v.form.$touch()
   //  if (!this.$v.form.$invalid) {
   let formdata = new FormData();
   for (let f in this.form) {
    formdata.append(f, this.form[f])
   }
   if (!this.isNew) {
    formdata.append('_method', 'PUT')
    formdata.append('role_id', this.id)
   }
   this.$store.dispatch('sendForm', {
    api: this.api,
    form: formdata,
    isNew: this.isNew
   })
   this.$emit('dialogForm', false)
   //  } else {
   //   this.$toast.error("أكمل الحقول المطلوبة");
   //  }
  },
 },
}
</script>
