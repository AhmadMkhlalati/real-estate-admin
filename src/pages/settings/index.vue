<template>
 <v-container
  fluid
  class="icons-page">
  <v-row
   no-gutters
   class="d-flex justify-space-between mt-2 mb-2">
   <v-col>
    <!-- List -->
    <SettingsForm
     newItemLabel="الإعدادات"
     :isNew="isNew"
     :api="api"></SettingsForm>
    <!-- Form -->
   </v-col>
  </v-row>
 </v-container>
</template>

<script>
import SettingsForm from "../../components/Forms/SettingsForm.vue"
export default {
 data() {
  return {
   isNew: false,
   dialog_form: false,
   api: {
    getAll: 'systemVariables',
  //  create: "admin/createAdminAccount",
    edit: 'updateSystemVariable',
 //   delete: "user/delete?user_id"
   },
   //queryParam:"user_id",
   title: "الإعدادات",
  };
 },
 components: { SettingsForm },
 methods: {
  setForm() {
   let form = {
    system_password: 0,
    days_of_contract_expiration_to_notify: 0,
    days_of_estate_order_to_delete: 0,
    maximum_count_of_estate_images: 0,
    maximum_count_of_floor_plan_images: 0,
    maximum_count_of_nearby_places: 0,
    maximum_count_of_street_images: 0,
    minimum_count_of_estate_images_to_publish: 0,
    minimum_count_of_street_images_to_publish: 0,
    maximum_count_of_street_images:0,
    normal_company_phone_number: 0,
    permanent_company_phone_number: 0,
    search_radius: 0,
    summer_estates_status: 0
   }
   this.$store.dispatch('initForm', form)
   this.dialog_form = true
  }
 },
 mounted() {
  this.setForm()
 }
}
</script>
