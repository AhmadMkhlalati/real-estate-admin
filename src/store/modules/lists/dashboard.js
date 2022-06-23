import axios from "axios";
const state = () => ({
  DashboardData: [],
  DashboardOrder: [],
  DashboardRating: [],
});

const actions = {
  async fetchDashboard({ commit }, api_info) {
    await axios
      .get(`${api_info.one}`)
      .then((res) => {
        let resultData = res.data.data;
        commit("SET_DASHBOARD", resultData);
      })
      .catch((err) => {
        commit("SET_DASHBOARD", err);
      });

    await axios
      .get(`${api_info.three}`)
      .then((res) => {
        let resultOrder = res.data.data;
        commit("SET_ORDER", resultOrder);
      })
      .catch((err) => {
        commit("SET_DASHBOARD", err);
      });

    await axios
      .get(`${api_info.fourth}`)
      .then((res) => {
        let resultRating = res.data.data;
        commit("SET_RATING", resultRating);
      })
      .catch((err) => {
        commit("SET_DASHBOARD", err);
      });
  },
};

const getters = {
  getDashboardData: (state) => {
    return state.DashboardData;
  },
  getDashboardOrder: (state) => {
    return state.DashboardOrder;
  },
  getDashboardRating: (state) => {
    return state.DashboardRating;
  },
};

const mutations = {
  SET_DASHBOARD(state, payload) {
    state.DashboardData = payload;
  },
  SET_ORDER(state, payload) {
    state.DashboardOrder = payload;
  },
  SET_RATING(state, payload) {
    state.DashboardRating = payload;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
