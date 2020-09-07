<template>
    <div
            :id="id"
            class="order-list-item col-12 p-0 js-toggle-wrapper"
    >
        <div class="d-flex flex-wrap justify-content-between avaliable order-list-item_descr" >
            <p class="order-list-item_txt row align-items-center text-light bg-primary">
                <i class="fas fa-clock mr-2"></i>Deadline {{ info.deadline }}</p>
            <p class="title-2 col-12 p-0 mb-3 mb-xl-0">{{ info.name }}</p>
            <div class="budget col-12 p-0 pb-3 d-flex flex-wrap justify-content-between  align-items-center">
                <p class="title-3 m-0 col-5 p-0 mb-3 mb-xl-0">{{ info.subject.caption }}</p>
                <div class="col-6 p-0 d-none d-xl-flex flex-wrap justify-content-end align-items-center">
                    <p class="mr-4 mb-0">Budget:</p>
                    <div class="order-list-item_txt button-round mr-3">{{ info.price }}&#8364;</div>
                    <button
                            class="col-6 btn button-round button-grey js-toggle"
                            data-target=".js-details"
                    >
                        <span class="toggle-down"><i class="fas fa-chevron-down mr-2"></i>More details</span>
                        <span class="toggle-up"><i class="fas fa-chevron-up mr-2"></i>Collapse</span>
                    </button>
                </div>
                <div class="col-12 p-0 d-flex d-xl-none flex-wrap align-items-center">
                    <p class="mr-2 mb-0">Budget:</p>
                    <div class="order-list-item_txt button-round mr-2">{{ info.price }}&#8364;</div>
                    <button
                            class="col-6 col-md-4 btn button-round button-grey js-toggle"
                            data-target=".js-details"
                    >
                        <span class="toggle-down"><i class="fas fa-chevron-down mr-2"></i>More details</span>
                        <span class="toggle-up"><i class="fas fa-chevron-up mr-2"></i>Collapse</span>
                    </button>
                </div>
            </div>
            <div
                    class="js-content js-details col-12 pt-3 p-0 border-top row m-0 flex-wrap justify-content-between"
                    style="display: none;"
            >
                <div class="col-7 col-xl-8 p-0 mb-3">
                    <p class="title-3 col-12 p-0">Description</p>
                    <div class="col-12 p-0">{{ info.description }}</div>
                </div>
                <div class="col-5 col-md-4 col-lg-3 col-xl-3 p-0 mb-3 text-right">
                    <button
                            class="btn btn-primary button-round"
                            @click="acceptOrder(info.id, $event)"
                    >Accept</button>
                    <!--button class="btn button-grey button-round">Отклонить</button-->
                </div>
                <div
                        class="col-7 col-xl-6 row align-items-center"
                        v-if="info.files.length > 0"
                >
                    <i class="fas fa-paperclip mr-3 text-grey"></i>
                    <span class="part-txt mr-2">Files</span>
                    <i class="icon icon-counter p-0 mr-2">{{ info.files.length }}</i>
                    <a href="#">Show</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Endpoint from "../../../services/Endpoint";
    import Message from "../../../services/Message";
    import MessageEntity from '../../../entities/MessageEntity';
    import DOMHelper from "../../../services/DOMHelper";
    export default {
        name: "available-order",
        props: ['info'],
        methods: {
            acceptOrder(id, event) {
                let ctx = this;

                DOMHelper.lockFormButton(event.target, true);
                DOMHelper.lockNode(
                    document.getElementById(ctx.id),
                    true
                );
                this.$http.post(
                    Endpoint.getBySuffix('/my/orders/' + id + '/accept')
                )
                    .then(() => {
                        Message.show(
                            new MessageEntity('Order successfully accepted')
                        );
                        DOMHelper.lockFormButton(event.target, false);
                        DOMHelper.lockNode(
                            document.getElementById(ctx.id),
                            false
                        );
                        ctx.$parent.getOrderList();
                    })
                    .catch(err => {
                        Message.show(err);
                    })
            }
        },
        data() {
            return {
                id: null
            };
        },
        mounted() {
            this.id = this._uid;
        }
    }
</script>
