<template>
  <div>
    <Title :title="title"></Title>

    <v-alert
      dir="rtl"
      v-if="`Error: Request failed with status code 403` == tableData"
      border="right"
      colored-border
      type="error"
      elevation="2"
    >
      عذرا ليس لديك صلاحيات لمشاهدة البيانات او التعديل عليها
    </v-alert>
    <v-data-table
      v-if="`Error: Request failed with status code 403` != tableData"
      :headers="headers"
      :items="tableData"
      :loading="loading"
      :items-per-page="per_page"
      :search="search"
      sort-by="calories"
      class="elevation-1"
      @pagination="changePagination"
      no-data-text="لا يوجد بيانات"
      loading-text="جلب البيانات"
      :footer-props="{
        'items-per-page-text': 'عدد العناصر بالصفحة',
      }"
    >
      <template v-slot:[`item.is_activated`]="{ item }">
        <v-chip :color="item.is_activated == 1 ? '#66BB6A' : '#C62828'" dark>
          {{ item.is_activated == 1 ? "مفعل" : "غير مفعل" }}
        </v-chip>
      </template>
      <template v-slot:[`item.estate_type.name_ar`]="{ item }">
        {{ item.estate_type.name_ar.split("|")[1] }}
      </template>
      <template v-slot:[`item.name_ar`]="{ item }">
        {{ item.name_ar.split("|")[0] }}
      </template>
      <template v-slot:[`item.estate_type.name_en`]="{ item }">
        {{ item.estate_type.name_en.split("|")[0] }}
      </template>
      <template v-slot:[`item.name_en`]="{ item }">
        {{
          item.name_en.includes("|") ? item.name_en.split("|")[0] : item.name_en
        }}
      </template>
      <template v-slot:[`item.notes`]="{ item }">
        {{
          item.notes == null
            ? ""
            : item.notes.substring(0, 50) +
              (item.notes.length > 50 ? " ...." : "")
        }}
      </template>
      <template v-slot:[`item.min`]="{ item }">
        {{ item.min == 0 ? "غير محدد" : item.min }}
      </template>
      <template v-slot:[`item.max`]="{ item }">
        {{ item.max == 999999999999999999 ? "غير محدد" : item.max }}
      </template>
      <template v-slot:[`item.price_domain.max`]="{ item }">
        {{
          item.price_domain == null
            ? "غير محدد"
            : item.price_domain.max == 999999999999999999
            ? "غير محدد"
            : item.price_domain.max.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }}
      </template>
      <template v-slot:[`item.price_domain.min`]="{ item }">
        {{
          item.price_domain == null
            ? "غير محدد"
            : item.price_domain.min == 0
            ? "غير محدد"
            : item.price_domain.min.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }}
      </template>

      <template v-slot:[`item.rating`]="{ item }">
        {{
          rating
            ? item.rating == 1
              ? "سيئ"
              : item.rating == 2
              ? "متوسط"
              : "جيد"
            : parseFloat(Number(item.rating).toFixed(1))
        }}
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        <p dir="ltr" class="float-right mt-3">
          {{ item.mobile == null ? "" : item.mobile }}
        </p>
      </template>
      <template v-slot:[`item.office.mobile`]="{ item }">
        <p dir="ltr" class="float-right mt-3">
          {{ item.office.mobile == null ? "" : item.office.mobile }}
        </p>
      </template>
      <template v-slot:[`item.user.authentication`]="{ item }">
        <p dir="ltr">{{ item.user == null ? "" : item.user.authentication }}</p>
      </template>
           
      <template v-slot:[`item.created_at`]="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:[`item.contract_created_at`]="{ item }">
        {{ formatDate(item.contract_created_at) }}
      </template>
      <template v-slot:[`item.area`]="{ item }"
        >{{ item.area }} {{ item.area_unit.name_ar }}</template
      >
      <template v-slot:[`item.user.first_name`]="{ item }">{{
        item.user ? item.user.first_name + " " + item.user.last_name : "لايوجد"
      }}</template>
      <template v-slot:[`item.period_number`]="{ item }">{{
        item.period_number
          ? item.period_number + " " + item.period_type.name_ar.split("|")[1]
          : "لايوجد"
      }}</template>
      <template v-slot:[`item.price`]="{ item }">
        <v-chip 
      class="ma-2"
      color="green"
      outlined 
      v-if="item.is_price_changed">
          {{ item.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
        </v-chip>
        <p v-else>
          {{ item.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
        </p>
      </template>
            <template v-slot:[`item.packet.price`]="{ item }">{{
        item.packet.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }}</template>

      <template v-slot:top>
        <div>
          <v-toolbar elevation="3">
            <!-- <v-toolbar-title>{{title}}</v-toolbar-title> -->
            <!--<Search
              class="mx-4"
              @search="
                (val) => {
                  search = val;
                }
              "
            ></Search>-->

            <v-text-field
              v-model="search"
              class="mx-4"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-chip
              class="pa-2 ma-2 float-left"
              color="green"
              text-color="white"
            >
              عدد النتائج
              <div
                left
                class="ma-2 pa-1 green darken-4"
                style="width: 100%; border-radius: 20px"
                text-color="white"
              >
                {{ tableData.length }}
              </div>
            </v-chip>

            <div v-if="create" @click="openForm()">
              <Button
                v-if="newItemLabel != 'مكتب'"
                :label="`${newItemLabel} جديد`"
                color="primary"
              >
              </Button>
            </div>
          </v-toolbar>

          <Filters
            :search="search"
            :api="api"
            :per_page="per_page"
            :items="tableData"
            :filter="filter"
          ></Filters>
        </div>
      </template>
      <template v-slot:[`item.is_furnished`]="{ item }">
        <v-chip>
          {{ item.is_furnished == 1 ? "مفروش" : "غير مفروش" }}
        </v-chip>
      </template>
      <template
        v-for="(slot, i) in slots"
        v-slot:[`item.${slot.value}`]="{ item }"
      >
        <div v-if="isSlots" :key="i">
          <div v-if="i == 0">{{ item[slot.value] }}</div>
          <div v-else>
            <v-icon v-if="item[slot.value] == 1" color="primary" small>
              mdi-key-plus
            </v-icon>
            <v-icon v-else color="error" small> mdi-key-remove </v-icon>
          </div>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="text-center">
          <v-menu offset-y>
            <template
              v-slot:activator="{ on }"
              v-if="state || edit || del || show || subscribe || order ||showOffice"
            >
              <v-btn small dark color="grey darken-1" v-on="on">
                العمليات
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-if="state" @click="editState(item)">
                <v-list-item-title small> قبول أو رفض</v-list-item-title>
                <v-list-item-icon
                  ><v-icon small> mdi-check </v-icon></v-list-item-icon
                ></v-list-item
              ><v-list-item v-if="edit" @click="openForm(item)">
                <v-list-item-title> التعديل </v-list-item-title
                ><v-list-item-icon>
                  <v-icon small> mdi-pencil </v-icon></v-list-item-icon
                ></v-list-item
              >
              <v-list-item v-if="del" @click="openDeleteDialog(item)"
                ><v-list-item-title>الحذف</v-list-item-title
                ><v-list-item-icon>
                  <v-icon small> mdi-delete </v-icon></v-list-item-icon
                ></v-list-item
              >
              <v-list-item v-if="contract_del" @click="openDeleteDialog(item)"
                ><v-list-item-title>ألغاء تفعيل العقد</v-list-item-title
                ><v-list-item-icon>
                  <v-icon small> mdi-file-cancel </v-icon></v-list-item-icon
                ></v-list-item
              >
              <v-list-item v-if="show" @click="showItem(item)"
                ><v-list-item-title>المشاهدة</v-list-item-title
                ><v-list-item-icon>
                  <v-icon small> mdi-eye </v-icon>
                </v-list-item-icon></v-list-item
              >
              <v-list-item v-if="showOffice" @click="showOfficePage(item)"
                ><v-list-item-title>صفحة المكتب</v-list-item-title
                ><v-list-item-icon>
                  <v-icon small> mdi-chair-rolling </v-icon>
                </v-list-item-icon></v-list-item
              >
              <v-list-item v-if="subscribe" @click="subscribeItem(item)"
                ><v-list-item-title>تفعيل العقد</v-list-item-title
                ><v-list-item-icon>
                  <v-icon small> mdi-file </v-icon></v-list-item-icon
                ></v-list-item
              >
              <v-list-item v-if="order" @click="showOrder(item)">
                <v-list-item-title small>تفاصيل الطلب</v-list-item-title>
                <v-list-item-icon
                  ><v-icon small> mdi-semantic-web </v-icon></v-list-item-icon
                ></v-list-item
              >
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
    <DialogAlert
      :title="
        contract_del
          ? 'أنت متأكد من  ألغاء عقد هذا المكتب'
          : 'أنت متأكد من  حذف هذا العنصر'
      "
      :isPopup="dialogDelete"
      @confirmDialog="deleteItemConfirm"
    ></DialogAlert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    headers: Array,
    title: String,
    api: Object,
    queryParam: {
      default: "",
    },
    filter: {
      type: String,
      default: "",
    },
    newItemLabel: {
      default: "عنصر",
    },
    route_name: {
      default: "",
    },
    create: {
      default: true,
    },
    edit: {
      default: true,
    },
    contract_del: {
      default: false,
    },
    rating: {
      default: false,
    },
    order: {
      default: false,
    },
    del: {
      default: true,
    },
    show: {
      default: false,
    },
    showOffice: {
      default: false,
    },
    isSlots: {
      default: false,
    },
    state: {
      default: false,
    },
    subscribe: {
      default: false,
    },
  },
  data: () => ({
    model: {},
    slots: [],
    search: null,
    dialog: false,
    dialogDelete: false,
    tempData: [],
    per_page: 10,
  }),
  computed: {
    ...mapGetters(["getTableData"]),
    ...mapGetters(["getLoading"]),
    loading() {
      return this.getLoading;
    },
    tableData() {
      return this.getTableData;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    per_page() {
      this.getData();
    },
    search(val) {
      if (val == null) {
       this.getData
      }
    },
  },
  methods: {
    ...mapActions(["fetchTableData", "deleteItem", "setForm"]),
    getData() {
      this.tempData = this.tableData;
      this.fetchTableData({
        api: this.api,
        per_page: this.per_page,
      });
    },
    formatDate(val) {
      var data = new Date(val);
      return (
        data.getUTCFullYear() +
        "/" +
        (data.getUTCMonth() + 1) +
        "/" +
        data.getDate()
      );
    },
    changePagination(val) {
      this.per_page = val.itemsPerPage;
      // this.getData()
    },
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
    openForm(item = null) {
      this.$emit("openForm", item);
    },
    editState(item = null) {
      this.$emit("openForm", {
        item: item,
        hasState: true,
      });
    },
    openDeleteDialog(item) {
      this.model = item;
      this.dialogDelete = !this.dialogDelete;
    },
    deleteItemConfirm() {
      this.deleteItem({
        api: this.api,
        id: this.model.id, // item id
        // queryParam:this.queryParam
      });
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      //  this.$nextTick(() => {
      //   this.model = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      //  });
    },
    subscribeItem(item) {
      this.$emit("openForm", {
        item: item,
        agreement: true,
      });
    },
    showOrder(item) {
      this.$emit("openForm", {
        order: item,
      });
    },
    showItem(item) {
      let params = {
        id: item.id,
      };
      if (this.route_name == "transactions-candidate") {
        this.route_name = "estate";
        params.id = item.estate.id;
      }

      let routeData = this.$router.resolve({ name: this.route_name, params });
      window.open(routeData.href, "_blank");
    },
    showOfficePage(item) {
      let params = {
        id: item.id,
      };
      if (
        this.route_name == "estate" ||
        this.route_name == "transactions-offers"
      ) {
        params.id = item.office.id;
      } else if (this.route_name == "transactions-candidate") {
        params.id = item.estate.office.id;
      }

      let routeData = this.$router.resolve({ name: "office", params });
      window.open(routeData.href, "_blank");
    },
  },
  async mounted() {
    await this.getData();
    if (this.isSlots) {
      this.slots = this.headers;
    }
  },
};
</script>
