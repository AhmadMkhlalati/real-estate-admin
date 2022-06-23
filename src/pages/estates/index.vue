<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- Tabs -->
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab>{{ accepted_estates }} </v-tab>
          <v-tab>{{ rejected_estates }} </v-tab>
          <v-tab>{{ pending_offices_estates }} </v-tab>
          <v-tab>{{ pending_users_estates }} </v-tab>
          <v-tab>{{ deleted_estates }} </v-tab>
        </v-tabs>
        <v-tabs-items class="mt-5" v-model="tab">
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 0"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="accepted_estates"
              :api="accepted_api"
              :create="create"
              :edit="edit"
              :showOffice="showOffice"
              :del="del"
              :state="state"
              :show="show"
              :headers="headers"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 1"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="rejected_estates"
              :api="rejected_api"
              :create="create"
              :edit="edit"
              :showOffice="showOffice"
              :del="del"
              :state="state"
              :show="show"
              :headers="headers_reject"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 2"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="pending_offices_estates"
              :api="pending_offices_api"
              :create="create"
              :edit="edit"
              :showOffice="showOffice"
              :del="del"
              :show="show"
              :state="state"
              :headers="headers"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 3"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="pending_users_estates"
              :api="pending_users_api"
              :create="create"
              :edit="edit"
              :showOffice="showOffice"
              :del="del"
              :show="show"
              :state="state"
              :headers="headers_user"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 4"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="deleted_estates"
              :api="deleted_api"
              :create="create"
              :edit="edit"
              :showOffice="showOffice"
              :del="del"
              :show="show"
              :state="state"
              :headers="headers"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
        </v-tabs-items>
        <!-- Form -->
        <v-dialog v-model="dialog_state" max-width="500px">
          <StatusForm
            v-if="dialog_state"
            :newItemLabel="newItemLabel"
            :isNew="isNew"
            :items="items"
            attr="estate_status_id"
            :api="getApiForForm"
            :id="item_id"
            @dialogForm="dialog_state = false"
          ></StatusForm>
        </v-dialog>
        <v-dialog v-model="dialog_form" max-width="700px">
          <EstateForm
            v-if="dialog_form"
            newItemLabel="العقار"
            :isNew="isNew"
            :api="getApiForForm"
            :id="item_id"
            @dialogForm="dialog_form = false"
          ></EstateForm>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EstateForm from "@/components/Forms/EstateForm";
import StatusForm from "@/components/Forms/StatusForm";
export default {
  data() {
    return {
      item_id: null,
      tab: 0,
      isNew: true,
      create: false,
      edit: true,
      del: true,
      show: true,
      state: true,
      showOffice:true,
      route_name: "estate",
      newItemLabel: "تغيير حالة العقار",
      filter: "estates",
      accepted_estates: "العقارات المقبولة",
      rejected_estates: "العقارات المرفوضة",
      pending_offices_estates: "عقارات المكاتب قيد الإنتظار",
      pending_users_estates: "عقارات المستخدمين قيد الإنتظار",
      deleted_estates: "العقارات المحذوفة",
      dialog_form: false,
      dialog_state: false,
              items: [
        { text: "صور غير واضحة", value: "صور غير واضحة" },
        { text: "السعر غير منطقي", value: "السعر غير منطقي" },
        { text: "لايوجد منطقة بهذا الاسم", value: "لايوجد منطقة بهذا الاسم" },
      ],
      accepted_api: {
        getAll: "admin/acceptedEstates",
        edit: "admin/editEstate",
        edit_state: "admin/changeEstateStatus",
        delete: "admin/deleteEstate?estate_id",
      },
      rejected_api: {
        getAll: "admin/rejectedEstates",
        edit: "admin/editEstate",
        edit_state: "admin/changeEstateStatus",
        delete: "admin/deleteEstate?estate_id",
      },
      pending_offices_api: {
        getAll: "admin/officesPendingEstates",
        edit: "admin/editEstate",
        edit_state: "admin/changeEstateStatus",
        delete: "admin/deleteEstate?estate_id",
      },
      pending_users_api: {
        getAll: "admin/usersPendingEstates",
        edit: "admin/editEstate",
        edit_state: "admin/changeEstateStatus",
        delete: "admin/deleteEstate?estate_id",
      },
      deleted_api: {
        getAll: "admin/deletedEstates",
        edit: "admin/editEstate",
        edit_state: "admin/changeEstateStatus",
        delete: "admin/deleteEstate?estate_id",
      },
      title: "العقارات",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "المكتب",
          align: "start",
          sortable: true,
          value: "office.name",
        },
        {
          text: "نوع العقار",
          value: "estate_type.name_ar",
        },
        {
          text: "نوع العرض",
          value: "estate_offer_type.name_ar",
        },
        {
          text: "السعر",
          value: "price",
        },
        {
          text: "مكان العقار",
          value: "location.locations[0].name",
        },
        {
          text: "تاريخ النشر",
          value: "created_at",
        },
        {
          text: "المساحة",
          value: "area",
        },
        {
          text: "عدد الغرف",
          value: "rooms_count",
        },
        {
          text: "المدة",
          value: "period_number",
        },
        // {
        //  text: "عدد الغرف",
        //  value: "rooms"
        // },
        {
          text: "العمليات",
          value: "actions",
          sortable: false,
        },
      ],
      headers_user: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "المستخدم",
          align: "start",
          sortable: true,
          value: "user.first_name",
        },
        {
          text: "رقم الهاتف",
          align: "start",
          sortable: true,
          value: "user.authentication",
        },
        {
          text: "نوع العقار",
          value: "estate_type.name_ar",
        },
        {
          text: "نوع العرض",
          value: "estate_offer_type.name_ar",
        },
        {
          text: "السعر",
          value: "price",
        },
        {
          text: "مكان العقار",
          value: "location.locations[0].name",
        },
        {
          text: "تاريخ النشر",
          value: "created_at",
        },
        {
          text: "المساحة",
          value: "area",
        },
        {
          text: "عدد الغرف",
          value: "rooms_count",
        },
        {
          text: "المدة",
          value: "period_number",
        },
        // {
        //  text: "عدد الغرف",
        //  value: "rooms"
        // },
        {
          text: "العمليات",
          value: "actions",
          sortable: false,
        },
      ],
      headers_reject: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "المكتب",
          align: "start",
          sortable: true,
          value: "office.name",
        },
        {
          text: "نوع العقار",
          value: "estate_type.name_ar",
        },
        {
          text: "نوع العرض",
          value: "estate_offer_type.name_ar",
        },
        {
          text: "السعر",
          value: "price",
        },
        {
          text: "مكان العقار",
          value: "location.locations[0].name",
        },
        {
          text: "تاريخ النشر",
          value: "created_at",
        },
        {
          text: "المساحة",
          value: "area",
        },
        {
          text: "سبب الرفض",
          value: "reject_reason",
        },
        // {
        //  text: "عدد الغرف",
        //  value: "rooms"
        // },
        {
          text: "العمليات",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  components: {
    StatusForm,
    EstateForm,
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getApiForForm() {
      switch (this.tab) {
        case 0:
          return this.accepted_api;
        case 1:
          return this.rejected_api;
        case 2:
          return this.pending_offices_api;
        case 3:
          return this.pending_users_api;
        case 4:
          return this.deleted_api;
        default:
          break;
      }
    },
  },
  methods: {
    setForm(val) {
      console.log(val);
      let form = {
        estate_status_id: "",
        estate_office_id: "", //
        price: "",
        floor: "",
        ownership_type_id: "", //
        estate_offer_type_id: "", //
        interior_status_id: "", //
        period_type_id: "", //
        location_id: "", //
        area_unit_id: "", //
        estate_type_id: "", //
        longitude: "",
        latitude: "",
        period_type_id: "",
        area: "", //
        nearby_places: "", //
        rooms_count: "",
        is_furnished: false,
        floor_plan: "",
        description: "",
        swimming_pool: 0,
        on_beach: "",
        period_number: "",
        images: [],
      };
      // initialize form
      this.$store.dispatch("initForm", form);

      // edit
      if (val != null) {
        this.isNew = false;
        // edit state
        if (val.hasOwnProperty("hasState")) {
          form = {
            estate_id: null,
            estate_status_id: null,
          };
          this.$store.dispatch("initForm", form);
          if (val.item.hasOwnProperty("id")) {
            this.item_id = val.item.id;
          }
          this.$store.dispatch("setForm", {
            estate_id: val.item.id,
          });
          this.dialog_state = true;
        } // edit estate
        else {
          Object.keys(form).map((x) => {
            if (x.includes("_id")) {
              if (val[x.replace("_id", "")]) {
                if (x != "location_id") {
                  form[x] = val[x.replace("_id", "")].id;
                } else {
                  form[x] = val[x.replace("_id", "")].locations[0].id;
                }
              } else {
                form["estate_office_id"] = val["office"].id;
              }
            } else {
              form[x] = val[x];
            }
            
          });
          if (val.hasOwnProperty("id")) {
            this.item_id = val.id;
          }
          this.$store.dispatch("setForm", form);
          this.dialog_form = true;
        }
        // create
      } else {
        this.isNew = true;
      }
    },
  },
  //  mounted() {
  //   this.$store.dispatch('initForm', this.form)
  //  }
};
</script>
<style>
.v-menu__content {
  box-shadow: 0 3px 11px 0, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a !important;
}
</style>
