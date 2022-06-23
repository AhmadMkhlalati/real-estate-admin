import axios from "axios";

const state = () => ({
  tableData: [],
  loading: true,
  item: {},
});
const users = [
  {
    id: 1,
    first_name: "أيمن",
    last_name: "الدعبل",
    phone: 343243253,
    authentication: "taj@gmail.com",
    address: "Damascus, Baramika",
  },
  {
    id: 2,
    first_name: "أيمن",
    last_name: "الدعبل",
    phone: 343243253,
    authentication: "taj@gmail.com",
    address: "Damascus, Baramika",
  },
  {
    id: 3,
    first_name: "أيمن",
    last_name: "الدعبل",
    phone: 343243253,
    authentication: "taj@gmail.com",
    address: "Damascus, Baramika",
  },
];
const offices = [
  {
    name: "مكتب التاج العقاري",
    phone: "135435135",
    all_connections: 50,
    create_date: "1/3/2021",
    last_date: "1/3/2022",
    address: "damascus",
  },
  {
    name: "مكتب السلطان العقاري",
    phone: "135435135",
    all_connections: 50,
    create_date: "1/3/2021",
    last_date: "1/3/2022",
    address: "damascus",
  },
];
const estates = [
  {
    office_name: "مكتب التاج العقاري",
    estate_type: "بيت",
    views: 50,
    likes: 50,
    address: "damascus",
    price: 20000,
    state: "قيد الانتظار",
  },
  {
    office_name: "مكتب السلطان العقاري",
    estate_type: "فيلا",
    views: 50,
    likes: 50,
    address: "damascus",
    price: 20000,
    state: "مرفوض",
  },
];
const orders = [
  {
    order_name: "aaa",
    type: "aaa",
    phone: 54656450,
    details: "ssss gggg",
    location: "damascus",
    date: "1/1/2022",
  },
  {
    order_name: "aaa",
    type: "aaa",
    phone: 54656450,
    details: "ssss gggg",
    location: "damascus",
    date: "1/1/2022",
  },
  {
    order_name: "aaa",
    type: "aaa",
    phone: 54656450,
    details: "ssss gggg",
    location: "damascus",
    date: "1/1/2022",
  },
];

const actions = {
  async fetchTableData({ commit }, api_info) {
    commit("SET_LOADING", true);
    commit("SET_TABLE_DATA", []);
    var filter = this.state.filter.filter;
    // Object.keys(filter)
    //     .forEach(function eachKey(object_key) {
    //         if (filter[object_key] != null && filter[object_key].hasOwnProperty("key")) {
    //             if (filter[object_key].key == null) {
    //                 filter[object_key] = null
    //             }
    //         }
    //     });

    let params = {
      params: filter,
    };
    await axios
      .get(`${api_info.api.getAll}`, params)
      .then((res) => {
        let resultData = res.data.data;
        commit("SET_TABLE_DATA", resultData);
        commit("SET_LOADING", false);
      })
      .catch((err) => {
        commit("SET_TABLE_DATA", err);
        commit("SET_LOADING", false);
      });
  },

  async fetchTableDataFilter({ commit }, api_info) {
    commit("SET_LOADING", true);
    commit("SET_TABLE_DATA", []);
    var filter = this.state.filter.filter;
    // Object.keys(filter)
    //     .forEach(function eachKey(object_key) {
    //         if (filter[object_key] != null && filter[object_key].hasOwnProperty("key")) {
    //             if (filter[object_key].key == null) {
    //                 filter[object_key] = null
    //             }
    //         }
    //     });

    let params = {
      params: filter,
    };
    await axios
      .get(`${api_info.api.getAll}`, params)
      .then((res) => {
        let resultData = res.data.data;
        let result = {
          resultData: resultData,
          filter: api_info.filter,
        };
        commit("SET_TABLE_DATA_FILTER", result);
        commit("SET_LOADING", false);
      })
      .catch((err) => {
        switch (api_info.api.sgetAll) {
          case "users":
            commit("SET_TABLE_DATA", users);
            break;
          case "offices":
            commit("SET_TABLE_DATA", offices);
            break;
          case "estates":
            commit("SET_TABLE_DATA", estates);
            break;
          case "orders":
            commit("SET_TABLE_DATA", orders);
            break;
        }
        commit("SET_LOADING", false);
      });
  },

  async deleteItem({ dispatch, commit }, data) {
    commit("SET_LOADING", true);
    commit("SET_TABLE_DATA", []);
    await axios
      .delete( `${data.api.delete}=${data.id}`
      )
      .then(() => {
        this._vm.$toast.success("تمت عملية الحذف بنجاح");
      })
      .catch(() => {
        this._vm.$toast.error("فشلت عملية الحذف");
      })
      .finally(() => {
        dispatch("fetchTableData", data);
      });
  },
};

const getters = {
  getTableData: (state) => {
    return state.tableData;
  },
  getLoading: (state) => {
    return state.loading;
  },
};

const mutations = {
  SET_TABLE_DATA(state, payload) {
    state.tableData = payload;
  },
  SET_TABLE_DATA_FILTER(state, payload) {
    let filterKeyArray = Object.keys(payload.filter);
    let ArrayResult = payload.resultData;

    filterKeyArray = filterKeyArray.filter(function (item) {
      if (item === "count" && payload.filter.count.key === null) {
        return false;
      }
      if (item === "date" && payload.filter.date.key === null) {
        return false;
      } else if (item === "per_page") {
        return false;
      } else if (payload.filter[`${item}`] === 0 && `${item}` == "sale") {
        return false;
      } else if (payload.filter[`${item}`] === 0 && `${item}` == "rent") {
        return false;
      } else if (
        payload.filter[`${item}`] === 0 &&
        `${item}` == "is_activated"
      ) {
        return false;
      } else if (payload.filter[`${item}`] === null) {
        return false;
      } else {
        return true;
      }
    });

    for (var i = 0; i < filterKeyArray.length; i++) {
      ArrayResult = ArrayResult.filter(function (item) {
        if (`${filterKeyArray[i]}` == "interior_status") {
          return (
            item[`${filterKeyArray[i]}`].id ===
            payload.filter[`${filterKeyArray[i]}`]
          );
        } else if (`${filterKeyArray[i]}` == "sale") {
          return item["estate_offer_type"].id === 1;
        } else if (`${filterKeyArray[i]}` == "rent") {
          return item["estate_offer_type"].id === 2;
        } else if (`${filterKeyArray[i]}` == "estate_type") {
          return (
            item[`${filterKeyArray[i]}`].id ===
            payload.filter[`${filterKeyArray[i]}`]
          );
        } else if (
          `${filterKeyArray[i]}` == "calls" ||
          `${filterKeyArray[i]}` == "price"
        ) {
          let itemValue = +item[`${filterKeyArray[i]}`];
          let filterValue = +payload.filter[`${filterKeyArray[i]}`].value

          switch (payload.filter[`${filterKeyArray[i]}`].key) {
            case "bigger":
              return (
                itemValue >
                filterValue
              );

            case "smaller":

              return (
                itemValue <
                filterValue
              );

            default:
              return (
                itemValue ==
                filterValue
              );
          }
        } else if (`${filterKeyArray[i]}` == "date") {
          const diffTime = Math.abs(new Date() - new Date(item.created_at));
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          switch (payload.filter.date.attr) {
            case "day":
              return payload.filter.date.key == "bigger"
                ? diffDays > payload.filter[`${filterKeyArray[i]}`].value
                : diffDays < payload.filter[`${filterKeyArray[i]}`].value;

            case "month":
              return payload.filter.date.key == "bigger"
                ? diffDays / 12 > payload.filter[`${filterKeyArray[i]}`].value
                : diffDays / 12 < payload.filter[`${filterKeyArray[i]}`].value;
            default:
              return payload.filter.date.key == "bigger"
                ? diffDays / 12 / 30 >
                    payload.filter[`${filterKeyArray[i]}`].value
                : diffDays / 12 / 30 <
                    payload.filter[`${filterKeyArray[i]}`].value;
          }
        } else if (`${filterKeyArray[i]}` == "contract") {
          return (
            item[`${filterKeyArray[i]}`].id ===
            payload.filter[`${filterKeyArray[i]}`]
          );
        } else if (`${filterKeyArray[i]}` == "Location") {
          return item.location.locations[0].id === payload.filter.Location;
        } else {
          return (
            item[`${filterKeyArray[i]}`] ===
            payload.filter[`${filterKeyArray[i]}`]
          );
        }
      });
    }
    state.tableData = ArrayResult;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
