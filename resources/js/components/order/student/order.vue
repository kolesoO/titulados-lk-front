<template>
    <div class="order-list-item col-12 p-0 js-toggle-wrapper">
        <hr class="bg-primary" :style="getReadyPercentString()">
        <div class="d-flex flex-wrap justify-content-between order-list-item_descr" >
            <a
                    href="javascript:void(0)"
                    class="title-2 col-11 p-0 js-toggle-down mb-2"
                    data-target=".js-details"
                    data-static="true"
            >{{ info.name }}</a>
            <p class="title-2 col-1 p-0 text-right">{{ getReadyPercent() }}</p>
            <p class="title-3 col-12 p-0">{{ info.type }}</p>
            <div class="order-list-item_txt text-grey">Deadline {{ info.deadline }}</div>
            <a
                    href="javascript:void(0)"
                    class="js-toggle-down d-flex flex-wrap justify-content-end align-items-center col-3 p-0"
                    data-target=".js-chat"
                    v-if="can_change"
            >
                <i class="fas fa-comment mr-2"></i>
                <span class="messages mr-3 col-5 p-0 d-none d-sm-inline">messages</span>
                <i class="counter col-1 p-0">3</i>
            </a>
            <div
                    class="js-content js-chat col-12 p-0" style="display: none;"
                    v-if="can_change"
            >
                <div class="chat-wrapper d-flex flex-wrap align-items-center  justify-content-end">
                    <a href="javascript:void(0)" class="js-toggle-up d-flex flex-wrap justify-content-center align-items-center col-5 p-0 text-center" data-target=".js-chat">
                        <span class="col-12 p-0">Свернуть чат</span>
                        <i class="fas fa-chevron-up"></i>
                    </a>
                    <input class="input-search form-control col-4" type="text" placeholder="Поиск по чату">
                    <i class="fas fa-search"></i>
                    <div class="chat-list col-12 p-0 d-flex flex-wrap justify-content-center align-items-end align-content-end">
                        <p class="chat-date col-2 text-center">1 июня</p>
                        <div class="performer-block d-flex flex-wrap col-12 align-items-end">
                            <div class="performer-avatar" style="background-image: url('img/hat.png')"></div>
                            <div class="ml-3">
                                <label class="ml-4">David 19:41</label>
                                <div class="performer-msg">Привет! Начал работу!</div>
                            </div>
                        </div>
                        <div class="self-block col-12 p-0 d-flex flex-wrap text-right justify-content-end">
                            <label class="mr-4 col-12 p-0">Никита 19:41</label>
                            <div class="self-msg">Привет! Хорошо! Какие темы еще можно затронуть на романтическом рандеву? </div>
                        </div>
                        <label class="col-12">David пишет...<i class="far fa-pen"></i></label>
                    </div>
                    <div class="d-flex flex-wrap col-12 p-0 align-items-center justify-content-between">
                        <input type="text" class="col-11 form-control">
                        <i class="far fa-smile"></i>
                        <i class="icon icon-send col-1 p-0"></i>
                    </div>
                </div>
            </div>
            <div class="js-content js-details col-12 p-0 mt-5 mt-sm-3" style="display: none;">
                <a
                        href="javascript:void(0)"
                        class="js-toggle-up justify-content-center col-5 p-0 text-center"
                        data-target=".js-details"
                >
                    <i class="fas fa-chevron-up"></i>
                </a>
                <div class="parts-block d-flex flex-nowrap col-12 p-0 align-items-baseline">
                    <div
                            v-for="partItem in info.parts"
                            :id="[getOrderPartIdPrefix(), partItem.id]"
                            :class="[
                                'part d-flex flex-wrap p-0',
                                info.parts.length > 2 ? 'col-6 col-xl-4' : (info.parts.length  === 2 ? 'col-6' : 'col-12')
                            ]"
                    >
                        <label class="col-12 p-0 text-center part-txt">{{ partItem.name }}</label>
                        <hr class="bg-warning col-12 p-0">
                        <p class="mb-3">{{ partItem.status_message }}</p>
                        <p
                                class="part-txt mb-1 col-12 p-0"
                                v-if="partItem.docs.length > 0"
                        >Received documents</p>
                        <div
                                class="d-flex pb-3 border-bottom col-12 p-0"
                                v-for="docItem in partItem.docs"
                        >
                            <i
                                    class="fas fa-file-alt text-primary"
                                    @click="showDoc(docItem.id)"
                            ></i>
                        </div>
                        <div
                                class="d-flex flex-wrap col-12 p-0 mt-3"
                                v-if="can_change && isInProgress(partItem.status)"
                        >
                            <i class="fas fa-paperclip mr-2"></i>
                            <p
                                    class="part-txt"
                                    @click="changeOrderPart(partItem.id)"
                            >Make changes</p>
                        </div>
                        <button
                                class="btn btn-warning button-round mb-3"
                                v-if="can_change && isInProgress(partItem.status)"
                                @click="acceptOrderPart(partItem.id, $event)"
                        >Accept</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderEntity from "../../../entities/OrderEntity";
    import Endpoint from "../../../services/Endpoint";
    import Message from "../../../services/Message";
    import MessageEntity from "../../../entities/MessageEntity";
    import DOMHelper from "../../../services/DOMHelper";
    export default {
        name: "v-order-student",
        props: ['info', 'can_change'],
        methods: {
            isInProgress(status) {
                return OrderEntity.IN_PROGRESS_STATUS === status;
            },
            getReadyPercent() {
                return this.info.readiness + '%';
            },
            getReadyPercentString() {
                return 'width: ' + this.getReadyPercent();
            },
            getOrderPartIdPrefix() {
                return 'order_part-';
            },
            showDoc(id) {
                alert('doc id - ' + id);
            },
            changeOrderPart(id) {
                alert('order part id - ' + id);
            },
            acceptOrderPart(id, event){
                let nodeId = this.getOrderPartIdPrefix() + id;

                DOMHelper.lockFormButton(event.target, true);
                DOMHelper.lockNode(
                    document.getElementById(nodeId),
                    true
                );
                this.$http.post(
                    Endpoint.getBySuffix('/my/orders/' + id + '/accept')
                )
                    .then(() => {
                        Message.show(
                            new MessageEntity('Order part successfully accepted')
                        );
                        DOMHelper.lockFormButton(event.target, false);
                        DOMHelper.lockNode(
                            document.getElementById(nodeId),
                            false
                        );
                    })
                    .catch(err => {
                        Message.show(err);
                    })
            }
        }
    }
</script>
