<template>
 <v-form @submit.prevent="save">
  <v-card>
   <v-card-title>
    <span>{{ formTitle }}</span>
   </v-card-title>
   <v-card-text>
    <v-container>
     <v-row>
      <!-- <v-col
       cols="12"
       sm="6"
       md="4">
       <Input
        label="Name"
        type="text"
        :model="form.name"
        :errorMessages="name_error_msgs"
        :validations_prop="validations_prop.name"
        @changeValue="(val) =>{
          form.name = val.value

        }"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="4">
       <Input
        label="Calories"
        type="text"
        :model="form.calories"
        :errorMessages="name_error_msgs"
        :validations_prop="validations_prop.name"
        @changeValue="(val) =>{form.calories = val}"></Input>
      </v-col>
      <v-col
       cols="12"
       sm="6"
       md="4">
       <Input
        label="Fat"
        type="text"
        :model="form.fat"
        :errorMessages="name_error_msgs"
        :validations_prop="validations_prop.name"
        @changeValue="(val) =>{form.fat = val}"></Input>
      </v-col> -->
      <v-col
       cols="12"
       sm="6"
       md="4">
       <Input
        label="Fat"
        type="text"
        :model="form.fat"
        :errorMessages="valueErrors"
        :validations_prop="validations_prop.name"
        @changeValue="(val) =>{form.fat = val
        $v.form.name.$touch()}"></Input>
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
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from "vuex";
export default {
 mixins: [validationMixin],
 props: {
  api: String,
  isNew: Boolean
 },
 data() {
  return {
   name_error_msgs: {
    maxlength: 'Name must be at most 10 characters long',
    required: 'Name is required.'
   },
   validations_prop: {
    name: {
     value: {
      required,
      maxLength: maxLength(10)
     },
    }
   },
   // form: this.getForm
  }
 },
 computed: {
  ...mapGetters(["getForm"]),
  valueErrors() {
   const errors = []
   if (!this.$v.form.name.$dirty) return errors;
   !this.$v.form.name.maxLength && errors.push(this.name_error_msgs.maxlength);
   !this.$v.form.name.required && errors.push(this.name_error_msgs.required);
   return errors
  },

  form() {
   return this.getForm
  },
  formTitle() {
   return this.isNew ? "عنصر جديد" : "تعديل العنصر";
  },

 },
 watch: {
  model() {}
 },
 methods: {
  save() {
   let formdata = new FormData();
   for (let f in this.form) {
    formdata.append(f, this.form[f])
   }
   if (!this.isNew) {
    formdata.append('_method', 'PUT')
   }
   this.$store.dispatch('sendForm', {
    api: this.api,
    form: formdata,
   })
   this.$emit('dialogForm', false)

  },
 },
}
</script>
