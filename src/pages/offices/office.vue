<template>
  <v-container v-if="!isLoad" fluid class="icons-page">
    <v-card class="mx-1">
      <v-card-text class="font-weight-bold d-flex">
        <v-chip small label>
          تاريخ الإنشاء:
          {{ formatDate(item.office.created_at) }}
        </v-chip>
        <v-chip small class="mx-2" color="primary" label>
          تاريخ التعديل:
          {{ formatDate(item.office.updated_at) }}
        </v-chip>
        <v-chip small color="blue lighten-2" class="white--text" label>
          أخر ظهور:
          {{ formatDate(item.office.last_seen) }}
        </v-chip>
      </v-card-text>
    </v-card>
    <v-row class="my-5">
      <v-col sm="12" md="8">
        <v-card min-height="250px" class="mx-1">
          <v-card-text class="font-weight-bold">
            <div class="d-flex justify-space-between" v-if="item.office">
              <v-list-item-avatar tile size="80" color="grey" style="    border-radius: 50% !important;"
                ><img :src="`${img_baseUrl}` + item.office.logo" 
              /></v-list-item-avatar>
              <span>
                <v-avatar class="blue lighten-2" size="30">
                  <span class="white--text">{{
                    parseFloat(Number(item.office.rating).toFixed(1))
                  }}</span>
                </v-avatar>
              </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.office">
              <span> المكتب العقاري: </span>
              <span> {{ item.office.name }} </span>
            </div>
            <div class="d-flex justify-space-between" v-if="item.office.mobile">
              <span> رقم صاحب المكتب: </span>
              <span dir="ltr"> {{ item.office.mobile }} </span>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="item.office.location.name"
            >
              <span> مكان المكتب: </span>
              <span> {{ item.office.location.name }} </span>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="item.office.location.locations[0].name"
            >
              <span> منطفة المكتب: </span>

              <span> {{ item.office.location.locations[0].name }} </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" min-height="250px" md="4">
        <v-card outlined>
          <v-list-item three-line>
            <v-list-item-content class="d-flex">
              <div class="d-flex justify-space-between">
                <div>عدد العروض العقارية:</div>

                <div
                  class="mx-5 px-3 py-2"
                  style="border: 3px solid #ddd; border-radius: 25px"
                >
                  {{ item.office.available_offers_count }}
                </div>

                <v-btn fab small dark color="indigo" @click="setForm(false)">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card class="mt-5" outlined>
          <v-list-item three-line>
            <v-list-item-content class="d-flex">
              <div class="d-flex justify-space-between">
                <div>عدد الترشيحات العقارية:</div>

                <div
                  class="mx-5 px-3 py-2"
                  style="border: 3px solid #ddd; border-radius: 25px"
                >
                  {{ item.office.available_candidates_count }}
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-if="item.office.location">
        <v-card>
          <v-card-subtitle> موقع العقار </v-card-subtitle>
          <v-card-text>
            <Button
              classes="mx-1"
              :label="item.office.location.name"
              target="_blank"
              :href="`https://www.google.com/maps/place/${item.office.latitude},${item.office.longitude}/${item.office.latitude}@,${item.office.longitude},17z`"
            ></Button>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-subtitle> تعديل المكتب </v-card-subtitle>
          <v-card-text>
            <v-btn classes="mx-1" depressed color="primary" @click="setForm(true)">
              تعديل المكتب
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-5">
      <v-card-subtitle> عقارات المكتب </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="4"
            v-for="(estate, i) in item.estates.data"
            :key="i"
          >
            <v-card :loading="false" class="mx-auto my-12">
              <template slot="progress">
                <v-progress-linear
                  color="primary"
                  height="6"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-system-bar lights-out></v-system-bar>
              <v-carousel
                :continuous="false"
                :show-arrows="false"
                hide-delimiter-background
                height="250"
                delimiter-icon="mdi-minus"
              >
                <v-carousel-item
                  v-for="(image, i) in estate.images.data"
                  :key="i"
                >
                  <v-sheet height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                      <v-img
                        aspect-ratio="1:1"
                        lazy-src="../../assets/logo.jpeg"
                        contain
                        :src="`${img_baseUrl}${image.url}`"
                      ></v-img>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>

              <v-card-text>
                <div class="d-flex justify-space-between" v-if="estate.price">
                  <span> السعر: </span>
                  <span> {{ estate.price }} ل.س</span>
                </div>
                <div
                  class="d-flex justify-space-between"
                  v-if="estate.location"
                >
                  <span> المحافظة : </span>
                  <span> {{ estate.location.name }}</span>
                </div>
                <div
                  class="d-flex justify-space-between"
                  v-if="estate.location.locations"
                >
                  <span> العنوان : </span>
                  <span> {{ estate.location.locations[0].name }}</span>
                </div>
                <div
                  class="d-flex justify-space-between"
                  v-if="estate.estate_offer_type"
                >
                  <span> نوع العرض : </span>
                  <span> {{ estate.estate_offer_type.name_ar }}</span>
                </div>
                <div
                  class="d-flex justify-space-between"
                  v-if="estate.estate_type"
                >
                  <span> نوع العقار : </span>
                  <span> {{ estate.estate_type.name_ar.split("|")[1] }}</span>
                </div>
                <v-divider class="justify-space-between mt-5"></v-divider>

                <div v-if="estate.description" class="mt-2">
                  <span> {{ estate.description }}</span>
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between">
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  :href="'/estates/' + estate.id"
                  target="_blank"
                >
                  مشاهدة العقار
                </v-btn>

                <v-chip
                  v-if="estate.system_estate_status.id == 1"
                  class="ma-2 float-left white--text"
                  color="green"
                  outlined
                  label
                >
                  <v-icon dark left> mdi-checkbox-marked-circle </v-icon>
                  {{ estate.system_estate_status.name }}
                </v-chip>
                <v-chip
                  v-else-if="estate.system_estate_status.id == 2"
                  class="ma-2 float-left white--text"
                  color="red"
                  outlined
                  label
                >
                  <v-icon dark left> mdi-cancel </v-icon>
                  {{ estate.system_estate_status.name }}
                </v-chip>
                <v-chip v-else class="ma-2 float-left" outlined label>
                  <v-icon dark left> mdi-minus-circle </v-icon>
                  {{ estate.system_estate_status.name }}
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text></v-card
    >
    <v-dialog v-model="dialog_form_offer" max-width="500px">
      <GeneralForm
        v-if="dialog_form_offer"
        :fields="fields"
        newItemLabel="أضافة عروض بعدد"
        :isNew="isNew"
        :api="api"
        @dialogForm="dialog_form_offer = false"
      ></GeneralForm>
    </v-dialog>
    <v-dialog v-model="dialog_edit" max-width="500px">
      <OfficeForm
        v-if="dialog_edit"
        newItemLabel="المكتب"
        :isNew="isNew"
        :api="apiOffice"
        @dialogForm="dialog_edit = false"
      ></OfficeForm>
    </v-dialog>
  </v-container>

  <Loading v-else></Loading>
</template>

<script>
import { img_baseUrl } from "@/plugins/axios";
import GeneralForm from "../../components/Forms/GeneralForm";

export default {
  data() {
    return {
      img_baseUrl,
      open_img: false,
      dialog_form_offer: false,
      dialog_edit: false,
      isNew: false,
      api: {
        edit: "addOffersToOffice",
        create: "addOffersToOffice",
        equel: false,
      },
      apiOffice: {
        create: "office/update",
        edit: "office/update",
      },
      fields: [
        {
          name: "العدد",
          key: "offers",
        },
      ],
    };
  },
  components: { GeneralForm },
  methods: {
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
    setForm(isOffice) {
      let form = {};
      if (isOffice) {
        form = {
          office_id: null,
          name: null,
          logo: null,
          longitude: null,
          latitude: null,
          telephone: null,
          location_id: null,
        };
      } else {
        form = {
          office_id: null,
        };
      }
      // initialize form
      this.$store.dispatch("initForm", form);
      this.isNew = true;
      if (isOffice ) {
        console.log(this.item.office);
        this.$store.dispatch("setForm", {
          office_id: this.item.office.id,
          logo_changed: this.item.office.logo_changed,
          name: this.item.office.name,
          logo: this.item.office.logo,
          longitude: this.item.office.longitude,
          latitude: this.item.office.latitude,
          telephone: this.item.office.telephone,
          location_id: this.item.office.location.locations[0].id,
        })
       
        this.dialog_edit = true;
      } else {
        console.log(this.item.office.id);
        this.$store.dispatch("setForm", {
          office_id: this.item.office.id,
        });
        this.dialog_form_offer = true;
      }
    },
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
      "admin/officeEstates?office_id=" + this.$route.params.id
    );
  },
};
</script>
