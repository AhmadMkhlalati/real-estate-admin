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
     newItemLabel="تصنيف داخلي"
     :filter="filter"
     :title="title"
     :api="api"
     :edit="edit"
     :del="del"
     :headers="headers"
     @openForm="setForm"></Table>
    <!-- Form -->
    <v-dialog
     class="form"
     v-model="dialog_form"
     max-width="500px">
     <EstateTypeFormSingle
      newItemLabel="تصنيف داخلي"
      :isNew="isNew"
      :api="api"
      @dialogForm="dialog_form = false"></EstateTypeFormSingle>
    </v-dialog>
   </v-col>
  </v-row>
 </v-container>
</template>

<script>
import EstateTypeFormSingle from "@/components/Forms/System Categories/EstateTypeFormSingle.vue"
export default {
 components: { EstateTypeFormSingle },
 data() {
  return {
   isNew: true,
   dialog_form: false,
   edit: false,
   del: false,
   api: {
    getAll: 'interiorStatuses',
    create: "newInteriorStatus",
    //delete: "deletePriceDomain?price_domain_id"
   },
   //queryParam:"user_id",
   filter: "interior statuses",
   title: "الحالات الداخلية",
   headers: [{
     text: "#",
     align: "start",
     sortable: false,
     value: "id",
    },
     {
     text: "الأسم بالعربي",
     align: "start",
     sortable: false,
     value: "name_ar",
    },
        {
     text: "الأسم بالاجنبي",
     sortable: false,
     value: "name_en",
    },
    {
     text: "العمليات",
     value: "actions",
     sortable: false
    },

   ],
  };
 },
 methods: {
  setForm(val) {
   let form = {
    name: '',
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
