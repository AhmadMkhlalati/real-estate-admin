const state = () => ({
  filter: {},
});

const actions = {
  createFilter({ commit }, value) {
    commit("SET_FILTER", value);
  },
  initFilter({ commit }, value) {
    commit("SET_INIT_FILTER", value);
  },
  deleteFilter({ commit }) {
    commit("DELETE_FILTER");
  },
};

const getters = {
  getFilter: (state) => {
    return state.filter;
  },
};

const mutations = {
  SET_FILTER(state, payload) {
    if (payload.hasOwnProperty("date")) {
      state.filter["date"] = payload.date;
    }
    else if (payload.hasOwnProperty("count")) {
      state.filter["count"] = payload.count;
    }
    else if (payload.hasOwnProperty("calls")) {
      state.filter["calls"] = payload.calls;
    }
    else if (payload.hasOwnProperty("price")) {
      state.filter["price"] = payload.price;
    }
    else if (!payload.hasOwnProperty("key")) {
      Object.keys(payload).forEach(function eachKey(object_key) {
        state.filter[object_key].key = payload[object_key].key;
        state.filter[object_key].value = payload[object_key].value;
      });
    } else {
      state.filter[payload.key] = payload.value;
    }
  },
  SET_INIT_FILTER(state, payload) {
    state.filter = payload;
  },
  DELETE_FILTER(state) {
    state.filter = {};
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
