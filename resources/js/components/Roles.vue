<template>
    <div id="roles">
        <v-data-table
            item-key="id"
            class="elevation-1"
            :headers="headers"
            :items="roles"
            sort-by="id"
            :loading="loading"
            loading-text="Loading... Please wait"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Roles Management Tab</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on"
                                >New Role</v-btn
                            >
                        </template>
                        <v-card>
                            <v-progress-linear
                                :active="dialog_loading"
                                :indeterminate="dialog_loading"
                                absolute
                                color="deep-purple accent-4"
                            ></v-progress-linear>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                v-model="editedItem.name"
                                                label="Role"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close"
                                    >Cancel</v-btn
                                >
                                <v-btn color="blue darken-1" text @click="save"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"
                    >mdi-pencil-outline</v-icon
                >
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
        <v-snackbar v-model="snackbar">
            {{ msg }}
            <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        loading: false,
        dialog_loading: false,
        snackbar: false,
        msg: "",
        headers: [
            {
                text: "#",
                align: "left",
                sortable: false,
                value: "id"
            },
            { text: "Name", value: "name" },
            { text: "Created At", value: "created_at" },
            { text: "Updated At", value: "updated_at" },
            { text: "Actions", value: "action", sortable: false }
        ],
        roles: [],
        editedIndex: -1,
        editedItem: {
            id: "",
            name: "",
            created_at: "",
            updated_at: ""
        },
        defaultItem: {
            id: "",
            name: "",
            created_at: "",
            updated_at: ""
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        async initialize() {
            this.loading = true;
            try {
                const res = await axios.get("/api/roles");
                this.roles = res.data.roles;
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem("token");
                    this.$router.push("/login");
                }
            }
            this.loading = false;
        },

        editItem(item) {
            this.editedIndex = this.roles.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.loading = true;
            const index = this.roles.indexOf(item);
            if (confirm("Are you sure you want to delete this item?")) {
                axios
                    .delete("/api/roles/" + item.id)
                    .then(() => {
                        this.roles.splice(index, 1);
                        this.msg = "Role Deleted Successfully.";
                        this.snackbar = true;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.msg = "Error Occurred deleting the role.";
                        this.snackbar = true;
                        this.loading = false;
                        console.log(err);
                    });
            }
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                // Save in edit dialog
                this.dialog_loading = true;
                axios
                    .put("api/roles/" + this.editedItem.id, {
                        name: this.editedItem.name
                    })
                    .then(res => {
                        Object.assign(
                            this.roles[this.editedIndex],
                            res.data.role
                        );
                        this.msg = "The role is successfully updated";
                        this.snackbar = true;
                        this.dialog_loading = false;
                        this.close();
                    })
                    .catch(err => {
                        this.msg = "Error occurred updating role";
                        this.snackbar = true;
                        this.dialog_loading = false;
                        console.log(err);
                    });
            } else {
                this.dialog_loading = true;
                axios
                    .post("/api/roles", { name: this.editedItem.name })
                    .then(res => {
                        this.roles.push(res.data.role);
                        this.msg = "The role is successfully added";
                        this.snackbar = true;
                        this.dialog_loading = false;
                        this.close();
                    })
                    .catch(err => {
                        this.msg = "Error occurred adding role";
                        this.snackbar = true;
                        this.dialog_loading = false;
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style></style>
