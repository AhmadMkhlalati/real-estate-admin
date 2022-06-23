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
              <FormSelect
                :items="contractTypes"
                attr="contractTypes"
                label="تفعيل العقد"
                @select="(val) =>{ form.contract_id = val.value}"
              >
              </FormSelect>
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
  isNew: Boolean,
   id: {
   default: null
  }, 
 },
 validations: {
  form: {
    contract_id:required
}
 },
 data() {
  return {
      required_error_msgs: {
    required: 'هذا الحقل مطلوب.'
   },
  }},
 computed: {
  ...mapGetters(["getForm","getContractTypes"]),
  form() {
   return this.getForm
  },
  formTitle() {
   return "تفعيل العقد";
  },
  contractTypes(){
return this.getContractTypes;
  }

 },
 watch: {
  model() {}
 },

 methods: {
   ...mapActions(["fetchContractTypes"]),
  save() {
   if (!this.$v.form.$invalid) {
    let formdata = new FormData();
    for (let f in this.form) {
     formdata.append(f, this.form[f])
    }
    this.$store.dispatch('sendForm', {
     api:{create: this.api,
          getAll:'admin/allOffices',},
     form: formdata,
     isNew: true
    })
    this.$emit('dialogForm', false)
   } else {
    this.$toast.error("أكمل الحقول المطلوبة");
   }
  },
 },
}
</script>
