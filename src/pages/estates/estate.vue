<template>
  <v-container v-if="!isLoad" fluid class="icons-page">
    <v-card class="mx-1">
      <v-card-text class="font-weight-bold d-flex flex-column">
        <v-chip small label>
          تاريخ الإنشاء:
          {{ formatDate(item.created_at) }}
        </v-chip>
        <v-chip small class="mt-2" color="primary" label>
          تاريخ النشر:
          {{ formatDate(item.published_at) }}
        </v-chip>
      </v-card-text>
    </v-card>
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col sm="12" md="4">
        <v-card min-height="250px" class="mx-1">
          <v-card-text class="font-weight-bold">
            <div class="d-flex justify-space-between" v-if="item.office">
              <span> المكتب العقاري: </span>
              <a :href="'/estate-offices/' + item.office.id" target="_blank">
                {{ item.office.name }}
              </a>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="item.system_estate_status"
            >
              <span> حالة العقار التابعة للشركة: </span>
              <v-chip
                v-if="item.system_estate_status.id == 1"
                class="ma-2 float-left white--text"
                color="green"
                small
                outlined
                label
              >
                <v-icon small dark left> mdi-checkbox-marked-circle </v-icon>
                {{ item.system_estate_status.name }}
              </v-chip>
              <v-chip
                v-else-if="item.system_estate_status.id == 2"
                class="ma-2 float-left white--text"
                color="red"
                outlined
                small
                label
              >
                <v-icon small dark left> mdi-cancel </v-icon>
                {{ item.system_estate_status.name }}
              </v-chip>
              <v-chip small v-else class="ma-2 float-left" outlined label>
                <v-icon small dark left> mdi-minus-circle </v-icon>
                {{ item.system_estate_status.name }}
              </v-chip>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="item.office_estate_status"
            >
              <span> حالة العقار التابعة للمكتب: </span>
              <v-chip
                small
                v-if="item.office_estate_status.id == 1"
                class="ma-2 float-left white--text"
                color="green"
                outlined
                label
              >
                <v-icon small dark left> mdi-checkbox-marked-circle </v-icon>
                {{ item.office_estate_status.name }}
              </v-chip>
              <v-chip
                small
                v-else-if="item.office_estate_status.id == 2"
                class="ma-2 float-left white--text"
                color="red"
                outlined
                label
              >
                <v-icon small dark left> mdi-cancel </v-icon>
                {{ item.office_estate_status.name }}
              </v-chip>
              <v-chip small v-else class="ma-2 float-left" outlined label>
                <v-icon small dark left> mdi-minus-circle </v-icon>
                {{ item.office_estate_status.name }}
              </v-chip>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="item.ownership_type"
            >
              <span> نوع الملكية: </span>

              <span> {{ item.ownership_type.name_ar }} </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.estate_type">
              <span> نوع العقار: </span>

              <span> {{ item.estate_type.name_ar.split("|")[1] }} </span>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="item.interior_status"
            >
              <span> الحالة الداخلية: </span>
              <span> {{ item.interior_status.name_ar }} </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card min-height="250px" class="mx-1">
          <v-card-text class="font-weight-bold">
            <div
              class="d-flex justify-space-between"
              v-if="item.estate_offer_type"
            >
              <span> نوع العرض العقاري: </span>
              <span> {{ item.estate_offer_type.name_ar }} </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.period_type">
              <span> الفترة: </span>
              <span> {{ item.period_type.name_ar.split("|")[0] }} </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.area">
              <span> المساحة: </span>
              <span> {{ item.area }} {{ item.area_unit.name }} </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.rooms_count">
              <span> عدد الغرف: </span>
              <span> {{ item.rooms_count }} </span>
            </div>

            <div class="d-flex justify-space-between" v-if="item.price">
              <span> السعر: </span>
              <span> {{ item.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }} </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.floor">
              <span> رقم الطابق: </span>
              <span> {{ item.floor }} </span>
            </div>
            <div class="justify-space-between" v-if="item.description">
              <span> الوصف: </span>
              <span> {{ item.description }} </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="12" md="4">
        <v-card min-height="250px" class="mx-1">
          <v-card-text class="font-weight-bold">
            <div class="d-flex justify-space-between">
              <span>
                {{ item.swimming_pool == true ? "" : "لا" }} يوجد مسبح
              </span>
            </div>
            <div class="d-flex justify-space-between">
              <span> {{ item.is_furnished == true ? "" : "غير" }} مفروشة</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>
                {{ item.on_beach == true ? "" : "غير" }} مطلة عالشاطئ</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Estate Locations -->
    <v-row>
      <v-col md="3" v-if="item.location">
        <v-card>
          <v-card-subtitle> موقع العقار </v-card-subtitle>
          <v-card-text>
            <Button
              v-for="l in item.location.locations"
              :key="l.id"
              classes="mx-1"
              :label="l.name"
              target="_blank"
              :href="`https://www.google.com/maps/place/${l.latitude},${l.longitude}/${l.latitude}@,${l.longitude},17z`"
            ></Button>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card>
          <v-card-subtitle> تعديل العقار </v-card-subtitle>
          <v-card-text>
            <v-btn fab dark small color="cyan" @click="setForm(item)">
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="6" v-if="item.nearby_places">
        <v-card>
          <v-card-subtitle> أماكن قريبة </v-card-subtitle>
          <v-card-text>
            <div class="d-flex justify-space-between" v-if="item.nearby_places">
              <div class="text-center">
                <v-chip
                  small
                  v-for="(place, i) in item.nearby_places.split('|')"
                  :key="i"
                  class="ma-2"
                  color="green"
                  text-color="white"
                >
                  {{ place }}
                </v-chip>
              </div>
            </div>
          </v-card-text></v-card
        ></v-col
      >
    </v-row>
    <!-- Estate Images -->
    <v-row>
      <v-col md="12">
        <v-card>
          <v-card-subtitle> صور العقار </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col
                sm="6"
                md="4"
                lg="3"
                v-for="(image, index) in item.images.data"
                :key="index"
                :class="{ 'd-none': image.type != 'estate_image' }"
              >
                <v-card
                  @click="open_img(index, 'estate_image')"
                  class="mx-auto elevation-7 d-flex justify-center"
                  color="grey lighten-4"
                  :key="image.id"
                >
                  <v-img
                    aspect-ratio="1:1"
                    lazy-src="../../assets/logo.jpeg"
                    contain
                    :src="`${img_baseUrl}${image.url}`"
                  >
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Street Images -->
    <v-row>
      <v-col md="12">
        <v-card>
          <v-card-subtitle> صور شارع العقار </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col
                sm="6"
                md="4"
                lg="3"
                v-for="(image, index) in item.images.data"
                :key="index"
                :class="{ 'd-none': image.type != 'street_image' }"
              >
                <v-card
                  @click="open_img(index, 'street_image')"
                  class="mx-auto elevation-7 d-flex justify-center"
                  color="grey lighten-4"
                  :key="image.id"
                >
                  <v-img
                    aspect-ratio="5:5"
                    lazy-src="../../assets/logo.jpeg"
                    contain
                    :src="`${img_baseUrl}${image.url}`"
                  >
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-card>
          <v-card-subtitle> صور طابق العقار </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col
                sm="6"
                md="4"
                lg="3"
                v-for="(image, index) in item.images.data"
                :key="index"
                :class="{ 'd-none': image.type != 'floor_plan' }"
              >
                <v-card
                  @click="open_img(index, 'floor_plan')"
                  class="mx-auto elevation-7 d-flex justify-center"
                  color="grey lighten-4"
                  :key="image.id"
                >
                  <v-img
                    aspect-ratio="5:5"
                    lazy-src="../../assets/logo.jpeg"
                    contain
                    :src="`${img_baseUrl}${image.url}`"
                  >
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-card>
          <v-card-subtitle>
            المشاكل و الاقتراحات المقدمة من المستخدمين
          </v-card-subtitle>
          <div v-for="(item, i) in report" :key="i" class="pa-5">
            <v-icon xlarge>mdi-account-circle</v-icon>
            <p class="d-inline body-2 font-weight-bold">
              {{ item.user == null ? "مجهول" : item.user.first_name }} :
            </p>
            <p class="d-inline body-2">
              {{ item.report_type.name_ar }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <div v-if="item.floor_plan" class="d-flex flex-column mt-2">
              <span>تحميل مخطط العقار</span>
              <img
                width="100px"
                class="mt-5"
                max-width="100%"
                :src="img_baseUrl + item.floor_plan"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-dialog v-model="dialog_form" max-width="700px">
        <EstateForm
          v-if="dialog_form"
          newItemLabel="العقار"
          :isNew="false"
          :api="api"
          :id="item.id"
          @dialogForm="dialog_form = false"
        ></EstateForm>
      </v-dialog>
      <v-dialog v-model="dialog_img" max-width="500px">
        <Carousal
          :images="img_selected"
          :model="model"
          @closeDialog="dialog_img = false"
        ></Carousal>
      </v-dialog>
    </v-row>
  </v-container>

  <Loading v-else></Loading>
</template>
<script>
import EstateForm from "@/components/Forms/EstateForm";
import { img_baseUrl } from "@/plugins/axios";
export default {
  data() {
    return {
      img_baseUrl,
      dialog_form: false,
      dialog_img: false,
      model: 0,
      img_selected: [],
      api: {
        getAll: "admin/acceptedEstates",
        edit: "admin/editEstate",
        edit_state: "admin/changeEstateStatus",
        delete: "admin/deleteEstate?estate_id",
      },
    };
  },
  components: { EstateForm },
  methods: {
    open_img(val, type) {
      this.model = val;
      this.img_selected = this.item.images.data.filter(function (item) {
        return item.type == type;
      });
      this.dialog_img = true;
    },
    formatDate(val) {
      var data = new Date(val);
      return (
        data.getUTCFullYear() +
        "/" +
        (data.getUTCMonth() + 1) +
        "/" +
        data.getDate() +
        "  " +
        data.getHours() +
        ":" +
        data.getMinutes()
      );
    },
    setForm(val) {
      let form = {
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

      this.isNew = false;
      // edit estate
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
      // create
    },
    //  mounted() {
    //   this.$store.dispatch('initForm', this.form)
    //  }
  },
  computed: {
    item() {
      return this.$store.getters.getItem;
    },
    report() {
      return this.$store.getters.getReportsEstate;
    },
    isLoad() {
      return this.$store.getters.getLoadingItem;
    },
  },
  mounted() {
    this.$store.dispatch(
      "fetchItem",
      "estate?estate_id=" + this.$route.params.id
    );
    this.$store.dispatch(
      "fetchReportsEstate",
      "estate/reports?estate_id=" + this.$route.params.id
    );
  },
};
</script>
