import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import Admin from "./components/Admin.vue";
import Playlist from "./components/Playlist.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login, name: "Login" },
    { path: "/admin", component: Admin, name: "Admin" },
    {
        path: "/playlist",
        component: Playlist,
        name: "Playlist",
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                next();
            } else {
                next("/login");
            }
        }
    }
];

export default new VueRouter({ routes });
