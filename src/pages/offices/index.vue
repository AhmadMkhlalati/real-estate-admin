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
     newItemLabel="مكتب"
     :filter="filter"
     :title="title"
     :contract_del="contract_del"
     :api="api"
      :create="create"
      :showOffice="showOffice"
       :edit="edit"
       :subscribe="subscribe"
       :del="del"
     :headers="headers"
     @openForm="setForm"></Table>
    <!-- Form -->
    <v-dialog
     v-model="dialog_form"
     max-width="500px">
     <OfficeForm
      v-if="dialog_form"
      newItemLabel="المكتب"
      :isNew="isNew"
      :api="api.create"
      :id="item_id"
      @dialogForm="dialog_form = false"
     ></OfficeForm></v-dialog>
         <v-dialog
     v-model="dialog_agreement"
     max-width="500px">
      <OfficeAgreementForm
      v-if="dialog_agreement"
      newItemLabel="المكتب"
      :isNew="isNew"
      :api="api.contract"
      :id="item_id"
      @dialogForm="dialog_agreement = false"
     ></OfficeAgreementForm>
    </v-dialog>
   </v-col>
  </v-row>
 </v-container>
</template>

<script>
import OfficeForm from "../../components/Forms/OfficeForm.vue"
import OfficeAgreementForm from "../../components/Forms/OfficeAgreementForm.vue"
import { mapGetters, mapActions } from "vuex";

export default {
 data() {
  return {
   isNew: true,
   dialog_form: false,
   dialog_agreement : false,
   contract_del: true,
  create: false,
   edit: false,
   del: false,
   showOffice:true,
   subscribe:true,
   api:{
     getAll:'admin/allOffices',
     create:"admin/createOffice",
     delete:"office/delete?office_id",
     edit: "admin/editEstate",
     contract : "office/newContract",
   },
   filter: "alloffices",
   title: "المكاتب العقارية",
   headers: [{
     text: "#",
     align: "start",
     sortable: false,
     value: "id",
    },{
     text: "الاسم",
     align: "start",
     sortable: false,
     value: "name",
    },
    {
     text: "الهاتف",
     value: "mobile"
    },
    {
     text: "المحافظة",
     value:
       'location.name',
    },
     {
       text: "المنطقة",
       value:
           'location.locations[0].name',
     },
     {
       text: "التقيم",
       value:
           'rating',
     },
     {
       text: "نوع العقد",
       value:
           'contract.name_ar',
     },
     {
       text: "تاريخ العقد",
       value:
           'contract_created_at',
     },
    {
     text: "عدد الاتصالات الكلية",
     value: "calls"
    },
    {
     text: "تاريخ الاشتراك",
     value: "created_at"
    },
    {
     text: "آخر ظهور",
     value: "last_seen"
    },
    {
     text: "حالة العقد ",
     value: "is_activated"
    },
    {
     text: "العمليات",
     value: "actions",
     sortable: false
    },
   ],
  };
 },
 components: { OfficeForm ,OfficeAgreementForm},
 methods: {
   ...mapActions(["fetchContractTypes"]),
  setForm(val) {
   let form = {
    name: '',
    mobile: '',
    rating: '',
    location:[],
    last_seen:''
   }
  this.$store.dispatch('initForm', form)
  if (val.hasOwnProperty('agreement')) {
     form = {
      estate_office_id: null
     }
    this.$store.dispatch('initForm', form)
   if (val.item.hasOwnProperty("id")) {
      this.item_id = val.item.id
     }

     this.$store.dispatch('setForm', {
      estate_office_id: val.item.id
     })
     this.dialog_agreement= true;
     }else{
   if (val != null) {
    this.isNew = false
    this.$store.dispatch('setForm', val)
    
   } else {
    this.isNew = true
   }
   this.dialog_form = true
  }}
 },
  mounted() {
     this.fetchContractTypes("contract/all");
 //   this.$store.dispatch('initForm', this.form)
  }
}
</script>
