<template>
    <div class="order-list loading">
        <StudentOrder
                v-if="isStudent"
                v-for="order in list"
                :key="order.id"
                :info="order"
                :can_change=true
        ></StudentOrder>
        <TeacherOrder
                v-else
                v-for="order in list"
                :key="order.id"
                :info="order"
                :can_change=true
        ></TeacherOrder>
        <p v-if="is_empty">Order list is empty</p>
    </div>
</template>

<script>
    import StudentOrder from "../order/student/order";
    import TeacherOrder from "../order/teacher/order";
    import DOMHelper from "../../services/DOMHelper";
    import UserType from "../../services/UserType";
    import UserState from "../../states/UserState";
    import Endpoint from "../../services/Endpoint";
    import Message from "../../services/Message";
    import OrderEntity from "../../entities/OrderEntity";
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
                list: [],
                is_empty: false
            }
        },
        mounted() {
            let ctx = this;

            this.$http.get(
                Endpoint.getBySuffix('/my/orders?filter[status][]=' + OrderEntity.NEW_STATUS + '&filter[status][]=' + OrderEntity.IN_PROGRESS_STATUS)
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
    }
</script>
