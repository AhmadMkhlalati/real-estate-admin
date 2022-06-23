import axios from "axios";
export default (to, from, next) => {
    if (axios.defaults.headers.common['Authorization'] == null) {
        axios.defaults.headers.common['Authorization'] = access_token
    }
    //    console.log(JSON.stringify(to))

    if (to.meta.loginRequired) {

        if (localStorage.getItem("accessToken") != "null" && localStorage.getItem("isAuthenticate") == "true") {
            //console.log('router ', to)
            //         // to('/user/login')
            //     next(to.path)
            // } else {
            next()
        } else {
            // const route = new router()
            //  console.log('router ', to.path)
            //  route.push()
            next({
                path: "/login"
            })
        }
    } else {
        next()
    }
}
export const access_token = localStorage.getItem("accessToken") != null ?
    localStorage.getItem("accessToken") : null