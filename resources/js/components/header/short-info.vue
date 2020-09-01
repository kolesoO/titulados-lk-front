<template>
    <div class="col-sm-4 col-xl-2 text-center ml-4 p-0">
        <div
                class="header-login js-toggle_class"
                data-class="active"
                data-target=".dropdown_menu"
                v-if="isLoggedIn"
        >
            <span class="mr-2">{{ getShortName() }}</span>
            <i class="far fa-user"></i>
        </div>
        <div class="dropdown_menu text-right" v-if="isLoggedIn">
            <div class="dropdown_menu-item font-weight-bold">{{ getFullName() }}</div>
            <div class="dropdown_menu-item">{{ user.phone }}</div>
            <div class="dropdown_menu-item">{{ user.email }}</div>
            <Logout></Logout>
        </div>
    </div>
</template>

<script>
    import UserState from "../../states/UserState";
    import Logout from "../auth/logout";
    export default {
        name: "v-header-short-info",
        components: {
            Logout
        },
        computed: {
            isLoggedIn () {
                return UserState.getters.isLoggedIn;
            },
            user () {
                return UserState.getters.user;
            }
        },
        methods: {
            getShortName () {
                return this.user.name.substring(0, 6) + '...';
            },
            getFullName () {
                let result = [this.user.name];

                if (this.user.surname.length > 0) {
                    result.unshift(this.user.surname);
                }

                if (this.user.last_name.length > 0) {
                    result.push(this.user.last_name);
                }

                return result.join(' ');
            }
        }
    }
</script>
