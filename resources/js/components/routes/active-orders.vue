<template>
    <div class="order-list loading">
        <StudentOrder
                v-if="isStudent"
                v-for="order in list"
                :key="order.id"
                :info="order"
        ></StudentOrder>
        <TeacherOrder
                v-else
                v-for="order in list"
                :key="order.id"
                :info="order"
        ></TeacherOrder>
        <p v-if="list.length === 0">Заказы не найдены</p>
    </div>
</template>

<script>
    import StudentOrder from "../order/student";
    import TeacherOrder from "../order/teacher";
    import DOMHelper from "../../services/DOMHelper";
    import UserType from "../../services/UserType";
    import UserState from "../../states/UserState";
    import Endpoint from "../../services/Endpoint";
    import Message from "../../services/Message";
    export default {
        name: "active-orders",
        routerData: {
            path: '/active-orders',
            meta: {
                title: 'Active orders',
                requiresAuth: true
            }
        },
        components: {StudentOrder, TeacherOrder},
        computed: {
            user() {
                return UserState.getters.user;
            }
        },
        methods: {
            isStudent() {
                return UserType.isStudent(this.user.type);
            },
        },
        data: function () {
            return {
                list: []
            }
        },
        mounted() {
            let ctx = this;

            DOMHelper.lockNode(
                document.querySelector('.order-list'),
                false
            );
            this.$http.get(
                Endpoint.getBySuffix('/my/orders')
            )
                .then(response => {
                    ctx.list = response.data.data;
                })
                .catch(err => {
                    Message.show(err);
                })
        }
    }
</script>
