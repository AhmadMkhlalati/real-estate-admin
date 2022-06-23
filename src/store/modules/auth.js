import router from '@/Routes'
const state = () => ({
    user: {
        authentication: '',
        password: '',
        first_name:'',
        last_name : '',
        role : '',
    },
    isAthenticate: false,
    accessToken: '',
    isLoad: true
});

const actions = {
    async login({ dispatch, commit }, info) {
        commit("SET_ISLOAD", false)
        await axios
            .post(`${info.api}`, info.form)
            .then(res => {
                let resultData = res.data.data;
                if (resultData.role_id != 6) {
                    localStorage.setItem("accessToken", 'Bearer ' + resultData.token)
                    localStorage.setItem("isAuthenticate", true)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + resultData.token
                    commit('SET_USER', resultData)
                    router.push('dashboard')
                    this._vm.$toast.success("تمت عملية تسجيل الدخول بنجاح");
                    commit("SET_ISLOAD", true)
                } else {
                    this._vm.$toast.error("غير مصرح لهذا المستخدم بالدخول للوحة التحكم");
                    commit("SET_ISLOAD", true)
                        //  window.location.href = "login"
                }
            })
            .catch(err => {
                this._vm.$toast.error("الايميل أو الهاتف أو كلمة المرور غير صحيحة");
                commit("SET_ISLOAD", true)
            })

    },
    async userData({ dispatch, commit }, info) {
        await axios
            .get(`${info.api}`, info)
            .then(res => {
                let resultData = res.data.data;
                    commit('SET_USER', resultData)
            })
            .catch(err => {
                commit("SET_ISLOAD", true)
            })

    },
    async logout({ dispatch, commit }, api) {
        await axios
            .delete(`${api}`)
            .then(res => {
                localStorage.setItem("accessToken", '')
                localStorage.setItem("isAuthenticate", false)
                commit('SET_USER', {})
                router.push('login')
                this._vm.$toast.success("تمت عملية تسجيل الخروج بنجاح");
            })
            .catch(err => {
                //this._vm.$toast.error(" فشلت عملية تسجيل الخروج");
                localStorage.setItem("accessToken", '')
                localStorage.setItem("isAuthenticate", false)
                commit('SET_USER', {})
                router.push('login')

            })

    },


    initUser({ commit }, value) {
        commit('SET_INIT_USER', value)
    },
}

const getters = {
    getUser: state => {
        return state.user
    },
    getIsLoad: state => {
        return state.isLoad
    },
}

const mutations = {
    SET_INIT_USER(state, payload) {
        state.user = payload
    },
    SET_USER(state, payload) {
        state.user = payload
    },
    SET_ISLOAD(state, payload) {
        state.isLoad = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}