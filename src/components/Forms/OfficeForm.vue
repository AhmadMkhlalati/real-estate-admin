<template>
  <v-form @submit.prevent="save">
    <v-card>
      <v-card-title>
        <span>{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-col cols="6">
              <div color="grey">
                <img width="150" :src="form.newLogo ? form.newLogo : `${img_baseUrl}` + form.logo" style="height: 80px; min-width: 80px; width: 80px; border-radius:50%" />
              </div>
            </v-col>
            <v-col cols="6">
              <v-file-input
                dense
                accept="images/*"
                prepend-icon="mdi-camera"
                label="شعار العقار"
                @change="selectImage"
              >
              </v-file-input>
            </v-col>
            <v-col cols="12">
              <Input
                label="الاسم"
                type="text"
                :model="form.name"
                :errorMessages="nameErrors"
                @changeValue="
                  (val) => {
                    form.name = val;
                    $v.form.name.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12">
              <Input
                label="الهاتف"
                type="text"
                :model="form.telephone"
                @changeValue="
                  (val) => {
                    form.telephone = val;
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12">
              <Input
                label="longitude"
                type="number"
                :model="form.longitude"
                :errorMessages="longitudeErrors"
                @changeValue="
                  (val) => {
                    form.longitude = val;
                    $v.form.longitude.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12">
              <Input
                label="latitude"
                type="text"
                :model="form.latitude"
                :errorMessages="latitudeErrors"
                @changeValue="
                  (val) => {
                    form.latitude = val;
                    $v.form.latitude.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12">
              <FormSelect
                :items="Locations"
                :model="form.location_id"
                attr="location_id"
                :errorMessages="location_idErrors"
                label="ضمن المنطقة"
                @select="
                  (val) => {
                    form.location_id = val.value;
                    $v.form.location_id.$touch();
                  }
                "
              >
              </FormSelect>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer> 
        <!-- <v-btn
    color="blue darken-1"
    text>
    Cancel
   </v-btn> -->
        <div>
          <Button color="blue darken-1" type="submit" label="حفظ"> </Button>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { img_baseUrl } from "@/plugins/axios";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  props: {
    api: Object,
    isNew: Boolean,
  },
  validations: {
    form: {
      name: {
        required      },
      longitude: {
        required,
      },
      latitude: {
        required,
      },
      location_id: {
        required,
      },
    },
  },
  data() {
    return {
      img_baseUrl,
      name_error_msgs: {
        maxlength: "يجب أن يتألف الأسم من 20 أحرف كحد أقصى.",
        required: "هذا الحقل مطلوب.",
      },
      required_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm", "getLocations"]),
    getUrl(file) {
      console.log(file);
      return URL.createObjectURL(file);
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required && errors.push(this.name_error_msgs.required);
      return errors;
    },
    longitudeErrors() {
      const errors = [];
      if (!this.$v.form.longitude.$dirty) return errors;
      !this.$v.form.longitude.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },

    latitudeErrors() {
      const errors = [];
      if (!this.$v.form.latitude.$dirty) return errors;
      !this.$v.form.latitude.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    location_idErrors() {
      const errors = [];
      if (!this.$v.form.location_id.$dirty) return errors;
      !this.$v.form.location_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },

    form() {
      return this.getForm;
    },
    formTitle() {
      return this.isNew ? "مكتب جديد" : "تعديل المكتب";
    },
    Locations() {
      return this.getLocations;
    },
  },
  watch: {
    model() {},
  },
  methods: {
    ...mapActions(["fetchLocations"]),
    selectImage(val) {
      console.log(val)
      this.form.logo = val;
      this.form.newLogo = URL.createObjectURL(val);
    },
    save() {
      console.log(this.form.newlogo);
      if (!this.$v.form.$invalid) {
        let formdata = new FormData();
        for (let f in this.form) {
          formdata.append(f, this.form[f]);
        }
        console.log(this.form.hasOwnProperty('newLogo'));
        this.form.hasOwnProperty('newLogo') ? formdata.append("logo_changed", 1) :formdata.append("logo_changed", 0)  ;
        
        if (!this.isNew) {
          formdata.append("_method", "PUT");
        }
        this.$store.dispatch("sendForm", {
          api: this.api,
          form: formdata,
          isNew: this.isNew,
        });
        this.$emit("dialogForm", false);
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
  },
  mounted() {
    this.fetchLocations("locations");
  },
};
</script>
