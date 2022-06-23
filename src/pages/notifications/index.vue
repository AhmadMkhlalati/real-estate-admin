<template>
 <v-container
  fluid
  class="icons-page">
  <v-row
   no-gutters
   class="d-flex justify-space-between mt-2 mb-2">
   <v-col>
    <!-- List -->
    <NotificationsForm
     newItemLabel="الإشعارات"
     :isNew="isNew"
     :api="api"></NotificationsForm>
    <!-- Form -->
   </v-col>
  </v-row>
 </v-container>
</template>

<script>
import NotificationsForm from "../../components/Forms/NotificationsForm.vue"
export default {
 data() {
  return {
   isNew: true,
   dialog_form: false,
   api: {
    getAll: 'notification/getAll',
    create: "sendNotifications",
    delete: "user/delete?user_id"
   },
   //queryParam:"user_id",
   title: "الإشعارات",
  };
 },
 components: { NotificationsForm },
 methods: {
  setForm(val) {
   let form = {
   }
   this.$store.dispatch('initForm', form)
   if (val != null) {
    this.isNew = false
    this.$store.dispatch('setForm', val)
   } else {
    this.isNew = true
   }
   this.dialog_form = true
  }
 },
  mounted() {
   this.setForm(null)
  }
}
</script>
