<template>
    <div class="order-list loading">
        <TeacherOrder
                v-for="order in list"
                :key="order.id"
                :info="order"
        ></TeacherOrder>
        <p v-if="is_empty">Order list is empty</p>
    </div>
</template>

<script>
    import TeacherOrder from "../order/teacher/available-order";
    import DOMHelper from "../../services/DOMHelper";
    import UserState from "../../states/UserState";
    import Endpoint from "../../services/Endpoint";
    import Message from "../../services/Message";
    export default {
        name: "available-orders",
        routerData: {
            path: '/available-orders',
            meta: {
                title: 'Available orders',
                requiresAuth: true
            }
        },
        components: {TeacherOrder},
        computed: {
            user() {
                return UserState.getters.user;
            }
        },
        methods: {
            getOrderList() {
                let ctx = this;

                this.$http.get(
                    Endpoint.getBySuffix('/my/orders/available')
                )
                    .then(response => {
                        ctx.list = response.data.data;
                        ctx.is_empty = ctx.list.length === 0;
                        DOMHelper.lockNode(
                            document.querySelector('.order-list'),
                            false
                        );
                    })
                    .catch(err => {
                        Message.show(err);
                    })
            }
        },
        data: function () {
            return {
                list: [],
                is_empty: false
            }
        },
        mounted() {
            this.getOrderList();
        }
    }
</script>
