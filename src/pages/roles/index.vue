<template>
 <v-container
  fluid
  class="icons-page">
  <v-row
   no-gutters
   class="d-flex justify-space-between mt-2 mb-2">
   <v-col>
    <!-- List -->
    <Table
     newItemLabel="صلاحية"
     :filter="filter"
     :title="title"
     :api="api"
     :create="create"
     :del="del"
     :edit="edit"
     :headers="headers"
     :isSlots="isSlots"
     @openForm="setForm"></Table>
    <!-- Form -->
    <v-dialog
     class="form"
     v-model="dialog_form"
     max-width="500px">
     <RoleForm
      v-if="dialog_form"
      newItemLabel="صلاحية"
      :isNew="isNew"
      :api="api"
      :id="item_id"
      @dialogForm="dialog_form = false"></RoleForm>
    </v-dialog>
   </v-col>
  </v-row>
 </v-container>
</template>

<script>
import RoleForm from "../../components/Forms/RoleForm.vue"
export default {
 data() {
  return {
   item_id: null,
   isNew: true,
   dialog_form: false,
   create: false,
   edit: true,
   del: false,
   show: false,
   isSlots: true,
   api: {
    getAll: 'role/showAllRoles',
    // create:"admin/createAdminAccount",
    edit: "role/editRole",
    //  delete:"user/delete?user_id"
   },
   //queryParam:"user_id",
   filter: "roles",
   title: "الصلاحيات",
   headers: [{
     text: "الصلاحية",
     align: "start",
     sortable: false,
     value: "name",
    },
    {
     text: "الإحصائيات",
     align: "start",
     sortable: false,
     value: "statistical",
    },
    {
     text: "المكاتب",
     value: "estate_offices"
    },
    {
     text: "العقارات",
     value: "estates"
    },
    {
     text: "الطلبات",
     value: "estate_orders"
    },
    {
     text: "التقييمات",
     value: "ratings"
    },
    {
     text: "إشعارات المكتب",
     value: "office_notifications"
    },
    {
     text: "إشعارات الزبائن",
     value: "costumers_notifications"
    },
    {
     text: "ثوابت النظام",
     value: "system_variables"
    },
    {
     text: "العمليات",
     value: "operations"
    },
    {
     text: "المستخدمين",
     value: "users"
    },
    {
     text: "الموظفين",
     value: "employees"
    },
    {
     text: "العمليات",
     value: "actions",
     sortable: false
    },
   ],
  };
 },
 components: { RoleForm },
 methods: {
  setForm(val) {
   if (val.hasOwnProperty("id")) {
    this.item_id = val.id
   }
   let form = {
    estate_orders: '',
    statistical:'',
    estate_offices:'',
    estates:'',
    ratings:'',
    office_notifications:'',
    costumers_notifications:'',
    system_variables:'',
    operations:'',
    users:'',
    employees:''

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
 }
 //  mounted() {
 //   this.$store.dispatch('initForm', this.form)
 //  }
}
</script>
