<template>
    <v-app id="login">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="info" dark flat>
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-progress-linear
                                    :active="loading"
                                    :indeterminate="loading"
                                    absolute
                                    top
                                    color="deep-purple accent-4"
                                ></v-progress-linear>
                                <v-form ref="form" v-model="valid">
                                    <v-text-field
                                        label="Email"
                                        name="email"
                                        prepend-icon="mdi-account"
                                        type="email"
                                        v-model="email"
                                        required
                                        :rules="emailRules"
                                    />

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        v-model="password"
                                        required
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="info" @click="login" :disabled="!valid" block>Login</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-snackbar v-model="snackbar">
                            {{ text }}
                            <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                        </v-snackbar>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            loading: false,
            snackbar: false,
            text: "",
            valid: true,
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            passwordRules: [v => !!v || "E-mail is required"]
        };
    },
    methods: {
        login: async function() {
            this.loading = true;
            try {
                const res = await axios.post("/api/login", {
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem("token", res.data.token);
                this.$router.push("/admin");
            } catch (err) {
                this.loading = false;
                this.text = err.response.data.status;
                this.snackbar = true;
            }
        }
    }
};
</script>
