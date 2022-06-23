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
                  <v-col cols="12" sm="12" md="12">
                    <Input
                      label="عنوان المقال"
                      :model="form.title"
                      :errorMessages="titleErrors"
                      @changeValue="
                        (val) => {
                          form.title = val;
                          $v.form.title.$touch();
                        }
                      "
                    ></Input>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <Switcher
                      label="هل المقال مميز"
                      attr="featured"
                      :model="form.featured"
                      @switcher="
                        (val) => {
                          form.featured = val.value;
                        }
                      "
                    >
                    </Switcher>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <TextArea
                      label="محتوى المقال"
                      type="number"
                      :model="form.body"
                      :errorMessages="bodyErrors"
                      @changeValue="
                        (val) => {
                          form.body = val;
                          $v.form.body.$touch();
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
                    <v-card-title>صور المقال:</v-card-title>

                    <ImagesUploader
                      :images="Images"
                      label="تحميل صور المقال"
                      @updateImages="updateImages"
                    ></ImagesUploader>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <div>
                        <div @click="save()">
                          <Button label="حفظ"> </Button>
                        </div>
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
import { required } from "vuelidate/lib/validators";
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
      title: {
        required,
      },
      body: {
        required,
      },
    },
  },
  data() {
    return {
      images_ids: [],
      images_files: [],

      all_images_files: [],
      // for stepper
      e1: 1,
      steps: 2,
      required_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),

    Images() {
      return this.form.images.data;
    },

    titleErrors() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.form.body.$dirty) return errors;
      !this.$v.form.body.required &&
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

    updateImages(val) {
      this.images_ids = val.ids.reverse();
      this.images_files = val.files;
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
          formdata.append("article_id", this.id);
        }

        this.images_ids.length == 0
          ? formdata.append("images_ids[]", -1)
          : this.images_ids.reverse().forEach(function (value) {
              formdata.append("images_ids[]", value);
            });
           
console.log(this.images_ids);

                    this.$emit("dialogForm", false);
        this.all_images_files = this.images_files
         
        
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
    this.images_ids = this.Images.map((x) => {
      return x.id;
    }).reverse();
  },
};
</script>
