<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- List -->
        <Table
          newItemLabel="باقة ترشيحات "
          :filter="filter"
          :title="title"
          :api="api"
          :create="create"
          :del="del"
          :edit="edit"
          :headers="headers"
          @openForm="setForm"
        ></Table>
        <!-- Form -->
        <v-dialog v-model="dialog_form" max-width="500px">
          <GeneralForm
            v-if="dialog_form"
            :fields="fields"
            newItemLabel="ترشيح"
            :isNew="isNew"
            :api="api"
            @dialogForm="dialog_form = false"
          ></GeneralForm>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GeneralForm from "../../components/Forms/GeneralForm";
export default {
  data() {
    return {
      isNew: true,
      dialog_form: false,
      api: {
        getAll: "candidates",
        create: "candidates",
        delete: "candidate?candidate_id",
      },
      create: true,
      del: true,
      edit: false,
      filter: "candidates",
      title: "الترشيحات",
      fields: [
        {
          name: "الحجم",
          key: "size",
        },
        {
          name: "السعر",
          key: "price",
        },
      ],
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "الحجم",
          value: "size",
        },
        {
          text: "السعر",
          value: "price",
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  components: { GeneralForm },
  methods: {
    setForm(val) {
      let form = {
        size: null,
        price: null,
      };
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
