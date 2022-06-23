import Vue from "vue";
import Router from "vue-router";
import auth from "@/auth-route";
import Layout from "@/components/Layout/Layout";

// Pages
import Dashboard from "@/pages/Dashboard/Dashboard";
import Offices from "@/pages/offices/index";
import Messages from "@/pages/Messages/index";
import Office from "@/pages/offices/office";
import Estates from "@/pages/estates/index";
import Estate from "@/pages/estates/estate";
import TransactionsOffers from "@/pages/packets/Offers/index";
import TransactionsCandidate from "@/pages/packets/candidate/index";
import Reports from "@/pages/reports/index";
import Rates from "@/pages/rate/index";

import Accounts from "@/pages/accounts/index";
import Roles from "@/pages/roles/index";
import Orders from "@/pages/orders/index";
import Order from "@/pages/orders/order";
import Offers from "@/pages/offers/index";
import Artical from "@/pages/artical/index";
import Candidates from "@/pages/candidates/index";
import Contracts from "@/pages/contracts/index";
import Settings from "@/pages/settings/index";
// System Categories
import PriceDomains from "@/pages/system categories/price-domains/index";
import EstateTypes from "@/pages/system categories/estate-types/index";
import InteriorStatus from "@/pages/system categories/interior-statuses/index";
import location from "@/pages/system categories/locations/index";
import OwnershipTypes from "@/pages/system categories/ownership-types/index";

import Typography from "@/pages/Typography/Typography";
import Tables from "@/pages/Tables/Basic";
import Notifications from "@/pages/notifications/index";
import Icons from "@/pages/Icons/Icons";
import Charts from "@/pages/Charts/Charts";
import Maps from "@/pages/Maps/Google";
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import test from "@/pages/test/index";

Vue.use(Router);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "login",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { loginRequired: true },
      },
      {
        path: "estate-offices/:id",
        name: "office",
        component: Office,
        meta: { loginRequired: true },
      },
      {
        path: "estate-offices",
        name: "Offices",
        component: Offices,
        meta: { loginRequired: true },
      },
      {
        path: "estates",
        name: "Estates",
        component: Estates,
        meta: { loginRequired: true },
      },
      {
        path: "estates/:id",
        name: "estate",
        component: Estate,
        meta: { loginRequired: true },
      },
      {
        path: "transactions-offers",
        name: "transactions-offers",
        component: TransactionsOffers,
        meta: { loginRequired: true },
      },
      {
        path: "transactions-candidate",
        name: "transactions-candidate",
        component: TransactionsCandidate,
        meta: { loginRequired: true },
      },
      {
        path: "reports",
        name: "reports",
        component: Reports,
        meta: { loginRequired: true },
      },

      {
        path: "accounts",
        name: "Accounts",
        component: Accounts,
        meta: { loginRequired: true },
      },
      {
        path: "roles",
        name: "Roles",
        component: Roles,
        meta: { loginRequired: true },
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: { loginRequired: true },
      },
      {
        path: "estate-order/:id",
        name: "order",
        component: Order,
        meta: { loginRequired: true },
      },
      {
        path: "estate-offers",
        name: "Offers",
        component: Offers,
        meta: { loginRequired: true },
      },
      {
        path: "candidates",
        name: "Candidates",
        component: Candidates,
        meta: { loginRequired: true },
      },
      {
        path: "contracts",
        name: "Contracts",
        component: Contracts,
        meta: { loginRequired: true },
      },

      {
        path: "rates",
        name: "Rates",
        component: Rates,
        meta: { loginRequired: true },
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
        meta: { loginRequired: true },
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: { loginRequired: true },
      },
      {
        path: "price-domains",
        name: "PriceDomains",
        component: PriceDomains,
        meta: { loginRequired: true },
      },
      {
        path: "estate-types",
        name: "EstateTypes",
        component: EstateTypes,
        meta: { loginRequired: true },
      },
      {
        path: "interior-statuses",
        name: "InteriorStatus",
        component: InteriorStatus,
        meta: { loginRequired: true },
      },
      {
        path: "ownership-types",
        name: "OwnershipTypes",
        component: OwnershipTypes,
        meta: { loginRequired: true },
      },
      {
        path: "location",
        name: "location",
        component: location,
        meta: { loginRequired: true },
      },
      {
        path: "test",
        name: "test",
        component: test,
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "tables",
        name: "Tables",
        component: Tables,
      },

      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "charts",
        name: "Charts",
        component: Charts,
      },
      {
        path: "artical",
        name: "artical",
        component: Artical,
      },
      {
        path: "maps",
        name: "Maps",
        component: Maps,
      },
      {
        path: "Messages",
        name: "Messages",
        component: Messages,
      },
    ],
  },
  {
    path: "*",
    name: "Error",
    component: Error,
  },
];
const router = new Router({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(auth);
export default router;
