import axios from "axios";

const state = () => ({
    areaUnits: [],
});

const actions = {
    async fetchAreaUnits({ commit }, api_info) {
        await axios
            .get(`${api_info}`)
            .then(res => {
                let resultData = res.data.data;
                let result = resultData.map(x => {
                    return {
                        text: x.name_ar,
                        value: x.id
                    }
                })
                commit('SET_AREA_UNITS', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getAreaUnits: state => {
        return state.areaUnits
    },
}

const mutations = {
    SET_AREA_UNITS(state, payload) {
        state.areaUnits = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}