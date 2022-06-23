import axios from "axios";

const state = () => ({
  offices: [],
});

const actions = {
  async fetchOffices({ commit }, api_info) {
    await axios
      .get(`${api_info}`)
      .then((res) => {
        let resultData = res.data.data;
        let result = resultData.map((x) => {
          return {
            text: x.name,
            value: x.id,
          };
        });
        commit("SET_OFFICES", result);
      })
      .catch((err) => {});
  },
};

const getters = {
  getOffices: (state) => {
    return state.offices;
  },
};

const mutations = {
  SET_OFFICES(state, payload) {
    state.offices = payload;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
