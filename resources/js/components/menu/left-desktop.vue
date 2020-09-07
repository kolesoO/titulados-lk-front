<template>
    <ul class="nav-list p-0 d-none d-xl-block">
        <li>
            <router-link
                    :key="index.path"
                    :to="index.path"
            >{{ index.meta.title }}</router-link>
        </li>
        <li>
            <router-link
                    :key="active_orders.path"
                    :to="active_orders.path"
                    class="d-flex justify-content-between align-items-center"
            >
                <span>{{ active_orders.meta.title }}</span>
                <div class="col-xl-6 d-flex p-0 justify-content-between">
                    <i class="icon icon-counter-active">
                        <i class="fas fa-comment"></i>10
                    </i>
                    <i class="icon icon-counter">3</i>
                </div>
            </router-link>
        </li>
        <li>
            <router-link
                    :key="done_orders.path"
                    :to="done_orders.path"
            >{{ done_orders.meta.title }}</router-link>
        </li>
        <li v-if="isTeacher()">
            <router-link
                    :key="available_orders.path"
                    :to="available_orders.path"
            >{{ available_orders.meta.title }}</router-link>
        </li>
    </ul>
</template>

<script>
    import IndexRoute from '../routes/index';
    import ActiveOrdersRoute from '../routes/active-orders';
    import DoneOrdersRoute from '../routes/done-orders';
    import AvailableOrdersRoute from '../routes/available-orders';
    import UserState from "../../states/UserState";
    import UserType from "../../services/UserType";
    export default {
        name: "v-menu-left-desktop",
        computed: {
            user() {
                return UserState.getters.user;
            }
        },
        methods: {
            isStudent() {
                return UserType.isStudent(this.user.type);
            },
            isTeacher() {
                return UserType.isTeacher(this.user.type);
            }
        },
        data: function () {
            return {
                index: IndexRoute.routerData,
                active_orders: ActiveOrdersRoute.routerData,
                done_orders: DoneOrdersRoute.routerData,
                available_orders: AvailableOrdersRoute.routerData
            }
        }
    }
</script>
