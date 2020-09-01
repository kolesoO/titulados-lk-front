<template>
    <nav class="header-menu d-flex justify-content-between col-sm-6 col-xl-5 p-0">
        <router-link
                v-for="route in items"
                :key="route.path"
                :to="route.path"
                class="header-menu-item"
        >{{ route.meta.title }}</router-link>
    </nav>
</template>

<script>
    import Notifications from "../routes/notifications";
    import Personal from "../routes/personal";
    export default {
        name: "v-menu-top",
        data: function() {
            return {
                items: []
            };
        },
        mounted() {
            this.items = [
                Notifications.routerData,
                Personal.routerData
            ];
        }
    }
</script>
