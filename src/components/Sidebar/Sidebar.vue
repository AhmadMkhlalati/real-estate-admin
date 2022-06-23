<template>
 <v-navigation-drawer
  right
  app
  clipped
  v-model="DRAWER_STATE"
  :mini-variant="!DRAWER_STATE"
  :width="sidebarWidth"
  :permanent="$vuetify.breakpoint.mdAndUp"
  :temporary="$vuetify.breakpoint.smAndDown"
  :mini-variant-width="sidebarMinWidth"
  :class="{'drawer-mini': !DRAWER_STATE}">
  <v-list>
   <template v-for="(item, i) in items">
    <v-row
     v-if="item.heading"
     :key="item.heading"
     align="center">
     <v-col
      cols="6"
      class="py-5">
      <span style="padding-left: 32px" class="text-body-1 subheader" :class="(item.heading && DRAWER_STATE) ? 'show ' : 'hide'">
       {{ item.heading }}
      </span>
     </v-col>
     <v-col
      cols="6"
      class="text-center">
     </v-col>
    </v-row>
    <v-divider
     v-else-if="item.divider"
     :key="i"
     dark
     class="my-4"></v-divider>
    <v-list-group
     class="haveChild"
     color="primary"
     v-else-if="item.children && DRAWER_STATE"
     :key="item.title"
     v-model="item.model">
     <template v-slot:prependIcon>
      <v-icon small>{{item.icon}}</v-icon>
     </template>
     <template v-slot:activator>
      <v-list-item-content>
       <v-list-item-title class="grey--text">
        {{ item.title }}
       </v-list-item-title>
      </v-list-item-content>
     </template>
     <v-list-item
      v-for="(child, i) in item.children"
      :key="i"
      :to="child.link"
      link>
      <v-list-item-action v-if="child.icon">
       <v-icon small>{{ child.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
       <v-list-item-title class="grey--text">
        {{ child.title }}
       </v-list-item-title>
      </v-list-item-content>
     </v-list-item>
    </v-list-group>
    <v-list-item
     color="primary"
     v-else
     :key="item.text"
     :href="item.href ? item.href : null"
     :to="item.link === '#' ? null : item.link"
     link>
     <v-list-item-action class="me-1">
      <v-icon
       small
       :color="item.color ? item.color : ''">{{ item.icon }}</v-icon>
     </v-list-item-action>
     <v-list-item-content>
      <v-list-item-title
       class="grey--text body-2 font-weight-bold"
       link>
       {{ item.title }}
      </v-list-item-title>
     </v-list-item-content>
    </v-list-item>
   </template>
  </v-list>
 </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
 props: {
  source: String,
 },
 data() {
  return {
   items: [
    { title: 'الصفحة الرئيسية', icon: 'mdi-home', link: '/dashboard' },
    { title: 'المكاتب العقارية', icon: 'mdi-bank', link: '/estate-offices' },
    { title: 'العقارات', icon: 'fa-building', link: '/estates' },
    { title: 'عمليات الشراء', icon: 'fa-shopping-bag',
    
    children: [
    { title: ' العروض', icon: 'fa-puzzle-piece', link: '/transactions-offers' },
    { title: 'الترشيحات', icon: 'fa-star-half', link: '/transactions-candidate' },
     ], },
    // { title: 'عقارات الأجار', icon: 'fa-building', link: 'rent-estates' },
    { title: 'طلبات العقارات', icon: 'mdi-reorder-horizontal', link: '/orders' },
    {
     title: 'الباقات',
     icon: 'mdi-comment-check',
     link: '#',
     model: false,
     children: [
    { title: 'العروض العقارية', icon: 'mdi-lamp', link: '/estate-offers' },
    { title: 'الترشيحات', icon: 'mdi-comment-check', link: '/candidates' },
     ],
    },
        { title: 'تقييمات المستخدمين', icon: 'mdi-star-shooting', link: '/rates' },

    {
     title: 'تقارير المستخدمين',
     icon: 'mdi-chart-box',
     link: '/reports'
    },
        {
     title: 'تواصل معنا',
     icon: 'mdi-contacts',
     link: '/Messages'
    },
    { title:'المقالات', icon: 'mdi-post', link: '/artical' },
    {
     title: 'معلومات النظام',
     icon: 'mdi-image-filter-none',
     link: '#',
     model: false,
     children: [
      { title: 'أنواع العقارات', icon: 'mdi-apps', link: '/estate-types' },
      { title: 'أنواع الملكية', icon: 'mdi-apps', link: '/ownership-types' },
      { title: 'الحالات الداخلية', icon: 'mdi-apps', link: '/interior-statuses' },
      { title: 'مجالات الأسعار', icon: 'mdi-diamond', link: '/price-domains' },
      { title: 'العقود', icon: 'mdi-check-all', link: '/contracts' },
      { title: 'الاماكن', icon: 'mdi-map-marker', link: '/location' },

     ],
    },
        { title: 'الإشعارات', icon: 'mdi-bell-outline', link: '/notifications' },

    { title: 'الحسابات', icon: 'mdi-account', link: '/accounts' },
    { title: 'الصلاحيات', icon: 'mdi-account-check', link: '/roles' },

    { title: 'الإعدادات', icon: 'mdi-cog-outline', link: '/settings' },
    // {
    //  title: 'UI Elements',
    //  icon: 'mdi-image-filter-none',
    //  link: '/icons',
    //  model: false,
    //  children: [
    //   { title: 'Icons', icon: 'mdi-circle-small', link: '/icons' },
    //   { title: 'Charts', icon: 'mdi-circle-small', link: '/charts' },
    //   { title: 'Maps', icon: 'mdi-circle-small', link: '/maps' },
    //  ],
    // },
    // { divider: true },
    // { heading: 'HELP' },
    // { title: 'التقييمات', icon: 'mdi-star', href: 'rattings' },
    // { title: 'الإعدادات', icon: 'mdi-wrench', href: 'settings' },
    // { title: 'FAQ', icon: 'mdi-help-circle-outline', href:'https://flatlogic.com/templates/vue-material-template'},
    // { divider: true },
    // { heading: 'PROJECTS' },
    // { title: 'My recent', icon: 'mdi-circle-medium', color: 'warning'},
    // { title: 'Starred', icon: 'mdi-circle-medium', color: 'primary'},
    // { title: 'Background', icon: 'mdi-circle-medium', color: 'error'}

   ],
   sidebarWidth: 275,
   sidebarMinWidth: 50
  }
 },
 computed: {
  ...mapState(['drawer']),
  DRAWER_STATE: {
   get() {
    return this.drawer
   },
   set(newValue) {
    if (newValue === this.drawer) return;
    this.TOGGLE_DRAWER();
   }
  }
 },
 methods: {
  ...mapActions(['TOGGLE_DRAWER']),
 }
}
</script>
