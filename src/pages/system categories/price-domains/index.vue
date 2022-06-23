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
     newItemLabel="مجال سعر"
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
     <PriceDomainForm
      newItemLabel="مجال السعر"
      :isNew="isNew"
      :api="api"
      @dialogForm="dialog_form = false"></PriceDomainForm>
    </v-dialog>
   </v-col>
  </v-row>
 </v-container>
</template>

<script>
import PriceDomainForm from "@/components/Forms/System Categories/PriceDomainForm.vue"
export default {
 components: { PriceDomainForm },
 data() {
  return {
   isNew: true,
   dialog_form: false,
   edit: false,
   del:false,
   api: {
    getAll: 'priceDomains',
    create: "newPriceDomain",
    delete: "deletePriceDomain?price_domain_id"
   },
   //queryParam:"user_id",
   filter: "price-domains",
   title: "مجالات الأسعار",
   headers: [{
     text: "#",
     align: "start",
     sortable: false,
     value: "id",
    },
    {
     text: "الحد الأدنى",
     align: "start",
     sortable: false,
     value: "min",
    },
    {
     text: "الحد الأعلى",
     align: "start",
     sortable: false,
     value: "max",
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
    min: null,
    max: null
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
