<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- List -->
        <Table
          newItemLabel="عقد"
          :filter="filter"
          :title="title"
          :api="api"
          :del="del"
          :headers="headers"
          @openForm="setForm"
        ></Table>
        <!-- Form -->
        <v-dialog v-model="dialog_form" max-width="500px">
          <ContractForm
            newItemLabel="عقد"
            :isNew="isNew"
            :api="api"
            @dialogForm="dialog_form = false"
          ></ContractForm>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ContractForm from "../../components/Forms/ContractForm";
export default {
  data() {
    return {
      isNew: true,
      del: false,
      dialog_form: false,
      api: {
        getAll: "contract/all",
        create: "newContract",
        edit: "contract/edit",
      },
      filter: "contracts",
      title: "العقود",
      headers: [
        {
          text: "الأسم بالعربي",
          align: "start",
          sortable: false,
          value: "name_ar",
        },
        {
          text: "الأسم بالاجنبي",
          align: "start",
          sortable: false,
          value: "name_en",
        },
        {
          text: "عدد الترشيحات",
          align: "start",
          sortable: true,
          value: "candidates_count",
        },
        {
          text: "عددأيام  تمييز العقار",
          value: "special_offers_days_count",
        },
        {
          text: "عدد العروض",
          value: "offers_count",
        },
        {
          text: "السعر ل.س",
          value: "price",
        },
        {
          text: "مدة الصلاحية",
          value: "expire_period",
        },
        {
          text: "العمليات",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  components: { ContractForm },
  methods: {
    setForm(val) {
      let form = {
        id: "",
        name_ar: "",
        name_en: "",
        candidates_count: "",
        special_offers_days_count: "",
        price: "",
        spaces_count: "",
        offers_count: "",
        expire_period: "",
      };
      console.log(val);
      this.$store.dispatch("initForm", form);
      if (val != null) {
        this.isNew = false;
        this.$store.dispatch("setForm", val);
      } else {
        this.isNew = true;
      }
      this.dialog_form = true;
    },
  },
  //  mounted() {
  //   this.$store.dispatch('initForm', this.form)
  //  }
};
</script>
