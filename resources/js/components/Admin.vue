<template>
    <v-app id="admin">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" link :to="item.action">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link @click="logout">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
                <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
                <v-list>
                    <v-list-item v-for="item in items2" :key="item.text" link>
                        <v-list-item-avatar>
                            <img
                                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                                alt
                            />
                        </v-list-item-avatar>
                        <v-list-item-title v-text="item.text" />
                    </v-list-item>
                </v-list>
                <v-switch v-model="theme" class="ma-4" label="Switch Theme"></v-switch>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-icon class="mx-4">mdi-laravel</v-icon>
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">Admin Panel</span>
            </v-toolbar-title>
            <v-spacer />
            <v-row align="center" style="max-width: 650px">
                <v-text-field
                    :append-icon-cb="() => {}"
                    placeholder="Search..."
                    single-line
                    append-icon="mdi-glasses"
                    color="white"
                    hide-details
                />
            </v-row>
        </v-app-bar>

        <v-content>
            <v-container>
                <router-view></router-view>
                <v-snackbar v-model="snackbar">
                    Logged In Successfully
                    <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                </v-snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        snackbar: false,
        theme: false,
        items: [
            { icon: "mdi-account", text: "Users", action: "users" },
            { icon: "mdi-post-outline", text: "Posts", action: "posts" },
            { icon: "mdi-circle-edit-outline", text: "Pages", action: "pages" },
            {
                icon: "mdi-briefcase-edit-outline",
                text: "Categories",
                action: "categories"
            },
            {
                icon: "mdi-account-badge-outline",
                text: "Roles",
                action: "/admin/roles"
            }
        ],
        items2: [
            { picture: 28, text: "Joseph" },
            { picture: 38, text: "Apple" },
            { picture: 48, text: "Xbox Ahoy" },
            { picture: 58, text: "Nokia" },
            { picture: 78, text: "MKBHD" }
        ]
    }),
    created() {
        this.$vuetify.theme.dark = false;
        this.snackbar = true;
    },
    methods: {
        logout: function() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        }
    },
    watch: {
        theme: function(next, prev) {
            this.$vuetify.theme.dark = next;
        }
    }
};
</script>
