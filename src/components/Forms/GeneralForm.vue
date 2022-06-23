<template>
  <v-form @submit.prevent="save">
    <v-card>
      <v-card-title>
        <span>{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(field, i) in fields"
              :key="i"
              cols="12"
              sm="6"
              md="4"
            >
              <Input
                :label="field.name"
                type="text"
                required
                :model="form[`${field.key}`]"
                @changeValue="
                  (val) => {
                    form[`${field.key}`] = val;
                    $v.form[`${field.key}`].$touch();
                  }
                "
              ></Input>
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
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  props: {
    api: Object,
    isNew: Boolean,
    fields: Array,
    newItemLabel: String,
  },
  data() {
    return {
      required_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),

    form() {
      return this.getForm;
    },
    formTitle() {
      return this.newItemLabel;
    },
  },
  watch: {
    model() {},
  },
  methods: {
    save() {
      let formdata = new FormData();
      for (let f in this.form) {
        formdata.append(f, this.form[f]);
      }
      if (!this.isNew) {
        formdata.append("_method", "PUT");
      }

      this.$store.dispatch("sendForm", {
        api: this.api,
        form: formdata,
        isNew: this.isNew,
      });
      this.$emit("dialogForm", false);
    },
  },
};
</script>
