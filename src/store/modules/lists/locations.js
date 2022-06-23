import axios from "axios";

const state = () => ({
    locations: [],
});

const actions = {
    async fetchLocations({ commit }, api_info) {
        await axios
            .get(`${api_info}`)
            .then(res => {
                let resultData = res.data.data;
                let result = resultData[0].locations.map(x => {
                    return {
                        text: x.name,
                        value: x.id
                    }
                })
                commit('SET_LOCATIONS', result)
            })
            .catch(err => {})
    },

    async fetchGovernorate({ commit }, api_info) {
        await axios
            .get(`${api_info}`)
            .then(res => {
                let resultData = res.data.data;
                let result = resultData.map(x => {
                    return {
                        text: x.name,
                        value: x.id
                    }
                })
                commit('SET_LOCATIONS', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getLocations: state => {
        return state.locations
    },
}

const mutations = {
    SET_LOCATIONS(state, payload) {
        state.locations = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}