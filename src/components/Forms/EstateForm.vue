<template>
  <v-card>
    <v-card-title>
      <span>{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="e1 > n"
                :step="n"
                editable
                edit-icon="mdi-check"
              >
                الخطوة
              </v-stepper-step>
              <v-divider v-if="n !== steps" :key="n"></v-divider>
            </template>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <FormSelect
                      :items="offices"
                      :model="form.estate_office_id"
                      :errorMessages="officesErrors"
                      attr="estate_office_id"
                      label="المكتب العقاري"
                      :disabled="true"
                      @select="
                        (val) => {
                          form.estate_office_id = val.value;
                          $v.form.estate_office_id.$touch();
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <Input
                      label="السعر"
                      type="number"
                      :model="form.price"
                      :errorMessages="priceErrors"
                      @changeValue="
                        (val) => {
                          form.price = val;
                          $v.form.price.$touch();
                        }
                      "
                    ></Input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <Input
                      label="المساحة"
                      type="number"
                      :model="form.area"
                      :errorMessages="areaErrors"
                      @changeValue="
                        (val) => {
                          form.area = val;
                          $v.form.area.$touch();
                        }
                      "
                    ></Input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <FormSelect
                      :items="area_units"
                      :model="form.area_unit_id"
                      :errorMessages="area_unitsErrors"
                      attr="area_unit_id"
                      label="وحدة المساحة"
                      @select="
                        (val) => {
                          form.area_unit_id = val.value;
                          $v.form.area_unit_id.$touch();
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <Input
                      label="أماكن قريبة"
                      type="text"
                      attr="nearby_places"
                      :model="form.nearby_places"
                      @changeValue="
                        (val) => {
                          form.nearby_places = val;
                          $v.form.nearby_places.$touch();
                        }
                      "
                    ></Input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <FormSelect
                      :items="estate_types"
                      :model="form.estate_type_id"
                      :errorMessages="estateTypesErrors"
                      attr="estate_type_id"
                      label="نوع العقار"
                      @select="
                        (val) => {
                          form.estate_type_id = val.value;
                          $v.form.estate_type_id.$touch();
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <FormSelect
                      :items="offerTypes"
                      :model="form.estate_offer_type_id"
                      :errorMessages="offerTypesErrors"
                      attr="estate_offer_type_id"
                      label="نوع العرض"
                      @select="
                        (val) => {
                          form.estate_offer_type_id = val.value;
                          $v.form.estate_offer_type_id.$touch();
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <FormSelect
                      :items="interiorStatuses"
                      :model="form.interior_status_id"
                      :errorMessages="interiorStatusesErrors"
                      attr="interior_status_id"
                      label="الحالة الداخلية"
                      @select="
                        (val) => {
                          form.interior_status_id = val.value;
                          $v.form.interior_status_id.$touch();
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <FormSelectTyping
                      :items="locations"
                      :model="form.location_id"
                      :errorMessages="locationsErrors"
                      attr="location_id"
                      label="المكان"
                      @select="
                        (val) => {
                          form.location_id = val.value;
                          $v.form.location_id.$touch();
                        }
                      "
                    >
                    </FormSelectTyping>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-if="form.estate_offer_type_id != 1"
                  >
                    <FormSelect
                      :items="periodTypes"
                      :model="form.period_type_id"
                      attr="period_type_id"
                      label="الفترة"
                      @select="
                        (val) => {
                          form.period_type_id = val.value;
                          $v.form.period_type_id.$touch();
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-if="form.estate_offer_type_id != 1"
                  >
                    <Input
                      label="مدة الايجار"
                      type="number"
                      attr="period_number"
                      :model="form.period_number"
                      @changeValue="
                        (val) => {
                          form.period_number = val;
                          $v.form.period_number.$touch();
                        }
                      "
                    ></Input>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <FormSelect
                      v-if="form.estate_offer_type_id != 2"
                      :items="ownership_types"
                      :model="form.ownership_type_id"
                      attr="ownership_type_id"
                      label="نوع الملكية"
                      @select="
                        (val) => {
                          form.ownership_type_id = val.value;
                        }
                      "
                    >
                    </FormSelect>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <TextArea
                      label="الوصف"
                      type="text"
                      rows="3"
                      :model="form.description"
                      @changeValue="
                        (val) => {
                          form.description = val;
                        }
                      "
                    ></TextArea>
                  </v-col>
                </v-row>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn color="primary" @click="nextStep(1)"> التالي </v-btn>
                  </div>
                </v-card-actions>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <Switcher
                      label="هل العقار مفروش؟"
                      attr="is_furnished"
                      :model="form.is_furnished"
                      @switcher="
                        (val) => {
                          form.is_furnished = val.value;
                        }
                      "
                    >
                    </Switcher>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <Switcher
                      label="هل يوجد مسبح"
                      attr="swimming_pool"
                      :model="form.swimming_pool"
                      @switcher="
                        (val) => {
                          form.swimming_pool = val.value;
                        }
                      "
                    >
                    </Switcher>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <Switcher
                      label="مطلة على الشاطئ"
                      attr="on_beach"
                      :model="form.on_beach"
                      @switcher="
                        (val) => {
                          form.on_beach = val.value;
                        }
                      "
                    >
                    </Switcher>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <Input
                      label=" الطابق"
                      type="text"
                      :model="form.floor"
                      :errorMessages="priceErrors"
                      @changeValue="
                        (val) => {
                          form.floor = val;
                          $v.form.floor.$touch();
                        }
                      "
                    ></Input>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <FormSlider
                      label="عدد الغرف"
                      :model="form.rooms_count"
                      @changeValue="
                        (val) => {
                          form.rooms_count = val;
                          $v.form.rooms_count.$touch();
                        }
                      "
                      min="0"
                      max="25"
                    ></FormSlider>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn color="primary" @click="nextStep(2)"> التالي </v-btn>
                  </div>
                </v-card-actions>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-form>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-card-title>صور طابق العقار:</v-card-title>

                    <ImagesUploader
                      :images="floorImages"
                      label="تحميل صور طابق العقار"
                      @updateImages="updateFloorImages"
                    ></ImagesUploader>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div>
                        <v-btn color="primary" @click="nextStep(3)">
                          التالي
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-form>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-card-title>صور العقار:</v-card-title>

                    <ImagesUploader
                      :images="estateImages"
                      label="تحميل صور العقار"
                      @updateImages="updateEstateImages"
                    ></ImagesUploader>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div>
                        <v-btn color="primary" @click="nextStep(4)">
                          التالي
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="5">
              <v-form>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-card-title>صور شارع العقار:</v-card-title>

                    <ImagesUploader
                      :images="streetImages"
                      label="تحميل صور شارع العقار"
                      @updateImages="updateStreetImages"
                    ></ImagesUploader>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div @click="save()">
                        <Button label="حفظ"> </Button>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import ImagesUploader from "../Form Components/ImageUploader.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  props: {
    api: Object,
    isNew: Boolean,
    id: {
      default: null,
    },
    newItemLabel: {
      default: "عنصر",
    },
  },
  components: {
    ImagesUploader,
  },
  validations: {
    form: {
      estate_office_id: {
        required,
      },
      price: {
        required,
      },
      estate_type_id: {
        required,
      },
      estate_offer_type_id: {
        required,
      },
      interior_status_id: {
        required,
      },
      location_id: {
        required,
      },
      area_unit_id: {
        required,
      },
      estate_office_id: {
        required,
      },
      area: {
        required,
      },
    },
  },
  data() {
    return {
      estate_edited_images_ids: [],
      street_edited_images_ids: [],
      floor_edited_images_ids: [],
      floor_images_files: [],
      estate_images_files: [],
      street_images_files: [],
      all_images_files: [],
      // for stepper
      e1: 1,
      steps: 5,

      office_name_error_msgs: {
        maxlength: "يجب أن يتألف الأسم من 20 حرف كحد أقصى.",
        required: "هذا الحقل مطلوب.",
      },
      required_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),
    ownership_types() {
      return this.$store.getters.getOwnershipTypes;
    },
    estate_types() {
      return this.$store.getters.getEstateTypes;
    },
    offerTypes() {
      return this.$store.getters.getEstateOfferTypes;
    },
    offices() {
      return this.$store.getters.getOffices;
    },
    area_units() {
      return this.$store.getters.getAreaUnits;
    },
    interiorStatuses() {
      return this.$store.getters.getInteriorStatuses;
    },
    periodTypes() {
      return this.$store.getters.getPeriodTypes;
    },
    locations() {
      return this.$store.getters.getLocations;
    },
    estateImages() {
      let images = [];
      if (this.form.images.data.length > 0) {
        images = this.form.images.data.filter((x) => x.type == "estate_image");
      }
      return images;
    },
    floorImages() {
      let images = [];

      if (this.form.images.data.length > 0) {
        images = this.form.images.data.filter((x) => x.type == "floor_plan");
      }
      return images;
    },
    streetImages() {
      let images = [];

      if (this.form.images.data.length > 0) {
        images = this.form.images.data.filter((x) => x.type == "street_image");
      }
      return images;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.form.price.$dirty) return errors;
      !this.$v.form.price.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    officesErrors() {
      const errors = [];
      if (!this.$v.form.estate_office_id.$dirty) return errors;
      !this.$v.form.estate_office_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    estateTypesErrors() {
      const errors = [];
      if (!this.$v.form.estate_type_id.$dirty) return errors;
      !this.$v.form.estate_type_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    locationsErrors() {
      const errors = [];
      if (!this.$v.form.location_id.$dirty) return errors;
      !this.$v.form.location_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },

    area_unitsErrors() {
      const errors = [];
      if (!this.$v.form.area_unit_id.$dirty) return errors;
      !this.$v.form.area_unit_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    offerTypesErrors() {
      const errors = [];
      if (!this.$v.form.estate_offer_type_id.$dirty) return errors;
      !this.$v.form.estate_offer_type_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    interiorStatusesErrors() {
      const errors = [];
      if (!this.$v.form.interior_status_id.$dirty) return errors;
      !this.$v.form.interior_status_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    areaErrors() {
      const errors = [];
      if (!this.$v.form.area.$dirty) return errors;
      !this.$v.form.area.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    form() {
      return this.getForm;
    },
    formTitle() {
      return (this.isNew ? " إنشاء " : " تعديل ") + this.newItemLabel;
    },
  },
  watch: {
    model() {},
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    updateEstateImages(val) {
      this.estate_edited_images_ids = val.ids.reverse();
      this.estate_images_files = val.files;
    },
    updateStreetImages(val) {
      this.street_edited_images_ids = val.ids.reverse();
      this.street_images_files = val.files;
    },
    updateFloorImages(val) {
      this.floor_edited_images_ids = val.ids.reverse();
      this.floor_images_files = val.files;
    },
    save() {
      this.$v.form.$touch();
      if (this.form.hasOwnProperty("images")) {
        delete this.form["images"];
      }
      if (!this.$v.form.$invalid) {
        let formdata = new FormData();
        for (let f in this.form) {
         this.form[f] == null ? '': formdata.append(f, this.form[f]);
        }
        if (!this.isNew) {
          formdata.append("_method", "POST");
          formdata.append("id", this.id);
        }
        this.estate_edited_images_ids.length == 0
          ? formdata.append("estate_edited_images_ids[]", -1)
          : this.estate_edited_images_ids.reverse().forEach(function (value) {
              formdata.append("estate_edited_images_ids[]", value);
            });

        this.street_edited_images_ids.length == 0
          ? formdata.append("street_edited_images_ids[]", -1)
          : this.street_edited_images_ids.reverse().forEach(function (value) {
              formdata.append("street_edited_images_ids[]", value);
            });

        this.floor_edited_images_ids.length == 0
          ? formdata.append("floor_plan_edited_images_ids[]", -1)
          : this.floor_edited_images_ids.reverse().forEach(function (value) {
              formdata.append("floor_plan_edited_images_ids[]", value);
            });
        this.all_images_files = this.estate_images_files
          .concat(this.street_images_files)
          .concat(this.floor_images_files);

        this.all_images_files.length == 0
          ? formdata.append("images[]", -1)
          : this.all_images_files.forEach(function (value) {
              formdata.append("images[]", value);
            });
        //formdata.append("images", this.all_images_files);
        this.$store.dispatch("sendForm", {
          api: this.api,
          form: formdata,
          isNew: this.isNew, // if create
          edit: "edit", // edit type : normal edit or state edit
        });
        this.$emit("dialogForm", false);
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchOwnershipTypes", "ownershipTypes");
    this.$store.dispatch("fetchEstateTypes", "estateTypes");
    this.$store.dispatch("fetchEstateOfferTypes", "estateOfferTypes");
    this.$store.dispatch("fetchOffices", "admin/allOffices");
    this.$store.dispatch("fetchInteriorStatuses", "interiorStatuses");
    this.$store.dispatch("fetchPeriodTypes", "periodTypes");
    this.$store.dispatch("fetchLocations", "locations");
    this.$store.dispatch("fetchAreaUnits", "areaUnits");
    this.estate_edited_images_ids = this.estateImages
      .map((x) => {
        return x.id;
      })
      .reverse();
    this.street_edited_images_ids = this.streetImages
      .map((x) => {
        return x.id;
      })
      .reverse();
    this.floor_edited_images_ids = this.floorImages
      .map((x) => {
        return x.id;
      })
      .reverse();
  },
};
</script>
