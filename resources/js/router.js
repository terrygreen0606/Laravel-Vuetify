import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import Admin from "./components/Admin.vue";
import Roles from "./components/Roles.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login, name: "Login" },
    {
        path: "/admin",
        component: Admin,
        name: "Admin",
        children: [{ path: "roles", component: Roles, name: "Roles" }],
        beforeEnter: (to, from, next) => {
            axios
                .get("api/verify")
                .then(res => {
                    next();
                })
                .catch(() => next("/login"));
        }
    }
];

const router = new VueRouter({
    routes
});

// Global protected routes
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token") || null;
    // Promise of Authorization Bearer
    window.axios.defaults.headers["Authorization"] = "Bearer " + token;
    next();
});

export default router;
