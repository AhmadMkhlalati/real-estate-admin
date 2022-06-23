<template>
 <v-app>
  <v-container fluid>
   <v-row no-gutters>
    <v-col
     cols="12"
     lg="5"
     class="login-part d-flex align-center justify-center">
     <v-row
      no-gutters
      class="align-start">
      <v-col
       cols="12"
       class="login-part d-flex align-center justify-center flex-column">
       <div class="login-wrapper pt-md-4 pt-0">
        <v-tabs grow>
         <v-tabs-slider></v-tabs-slider>
         <v-tab :href="`#tab-login`">
          تسجيل الدخول
         </v-tab>
         <!-- <v-tab :href="`#tab-newUser`">
                    New User
                  </v-tab>-->
         <v-tab-item :value="'tab-login'">
          <LoginForm :api="api"></LoginForm>
         </v-tab-item>

        </v-tabs>
       </div>
      </v-col>
      <v-col
       cols="12"
       class="d-flex justify-center">
       <v-footer>
        <div class="primary--text">جميع الحقوق محفوظة ©2021 <a href="https://swesshome.com/" class="text-decoration-none">Swess Home</a></div>
       </v-footer>
      </v-col>
     </v-row>
    </v-col>
        <v-col
     cols="7"
     class="main-part d-none d-md-none d-lg-flex">
     <div class="d-flex">
      <v-img
       src="@/assets/logo-new.png" width="500px"
       contain></v-img>

     </div>
    </v-col>
   </v-row>
  </v-container>
 </v-app>
</template>

<script>
import LoginForm from "../../components/Forms/LoginForm"
export default {
 name: "Login",
 data() {
  return {
   api: "login",
   form: {
    authentication: '',
    password: ''
   }

  };
 },
 methods: {},
 components: { LoginForm },
 //  created() {
 //   this.$store.dispatch("initUser", this.form)
 //    .then(() => {
 //     this.isInit = true
 //    });
 //  }
}
</script>
