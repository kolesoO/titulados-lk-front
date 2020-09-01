<template>
    <div>
        <a href="#" class="dropdown_menu-item" @click="logout">Выйти</a>
    </div>
</template>

<script>
    import Message from "../../services/Message";
    import UserState from "../../states/UserState";

    export default {
        name: "v-auth-logout",
        methods: {
            logout: function () {
                UserState
                    .dispatch('logout')
                    .then(() => this.$router.push('/guest'))
                    .catch(err => Message.show(err, false, 3000))
            }
        }
    }
</script>
