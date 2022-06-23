<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- List -->
        <Table
          newItemLabel="حساب"
          :filter="filter"
          :title="title"
          :api="api"
          :edit="edit"
          :headers="headers"
          @openForm="setForm"
        ></Table>
        <!-- Form -->
        <v-dialog class="form" v-model="dialog_form" max-width="500px">
          <AccountForm
            newItemLabel="حساب"
            :isNew="isNew"
            :api="api"
            @dialogForm="dialog_form = false"
          ></AccountForm>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountForm from "../../components/Forms/AccountForm.vue";
export default {
  data() {
    return {
      isNew: true,
      edit: false,
      dialog_form: false,
      api: {
        getAll: "users",
        create: "admin/createAdminAccount",
        delete: "user/delete?user_id",
      },
      //queryParam:"user_id",
      filter: "accounts",
      title: "الحسابات",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "الاسم الأول",
          align: "start",
          sortable: false,
          value: "first_name",
        },
        {
          text: "الاسم الأخير",
          align: "start",
          sortable: false,
          value: "last_name",
        },
        {
          text: "الايميل أو الهاتف",
          value: "authentication",
        },
        {
          text: "صلاحية المستخدم",
          value: "role",
        },
        {
          text: "العمليات",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  components: { AccountForm },
  methods: {
    setForm(val) {
      let form = {
        first_name: "",
        last_name: "",
        authentication: "",
        password: "",
        repeatPassword: "",
        role_id: null,
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
