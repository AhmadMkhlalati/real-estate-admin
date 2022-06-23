import axios from "axios";

const state = () => ({
  reportsEstate: [],
});

const actions = {
  async fetchReportsEstate({ commit }, api_info) {
    await axios
      .get(`${api_info}`)
      .then((res) => {
        let resultData = res.data.data;
        commit("SET_LOCATIONS", resultData);
      })
      .catch((err) => {});
  },
};

const getters = {
  getReportsEstate: (state) => {
    return state.reportsEstate;
  },
};

const mutations = {
  SET_LOCATIONS(state, payload) {
    state.reportsEstate = payload;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
