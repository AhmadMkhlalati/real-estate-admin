<template>
 <v-app id="swess-home" class="pa-6">
  <Header />
  <Sidebar />
  <v-main class="content">
   <v-slide-x-transition>
    <router-view />
   </v-slide-x-transition>
   <!-- <Footer /> -->
  </v-main>
 </v-app>
</template>

<script>
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
//import Footer from "@/components/Footer/Footer";

export default {
 name: 'Layout',
 components: { Header, Sidebar },
};
</script>

