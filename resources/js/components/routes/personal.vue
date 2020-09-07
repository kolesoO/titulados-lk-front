<template>
    <div class="tabs js-tabs">
        <a href="#" class="tab title-3" data-tab_target="#data">
            <span>Personal info</span>
        </a>
        <a href="#" class="tab title-3" data-tab_target="#password">
            <span>Password</span>
        </a>
        <div class="tab-data title-3 col-12 p-0" data-tab_content>
            <div id="data" data-tab_item>
                <form @submit.prevent="save">
                    <div class="form-item row">
                        <div class="form-group col-12 col-md-6 col-xl-6">
                            <label class="form-label" for="surname">Surname</label>
                            <input
                                    id="surname"
                                    class="form-input col-12"
                                    type="text"
                                    name="surname"
                                    :disabled="!canChangeData"
                                    :value="user.surname"
                            >
                        </div>
                    </div>
                    <div class="form-item row">
                        <div class="form-group col-12 col-md-6 col-xl-6">
                            <label class="form-label" for="name">Name</label>
                            <input
                                    id="name"
                                    class="form-input col-12"
                                    type="text"
                                    name="name"
                                    :disabled="!canChangeData"
                                    :value="user.name"
                            >
                        </div>
                    </div>
                    <div class="form-item row">
                        <div class="form-group col-12 col-md-6 col-xl-6">
                            <label class="form-label" for="lastname">Last name</label>
                            <input
                                    id="lastname"
                                    class="form-input col-12"
                                    type="text"
                                    name="last_name"
                                    :disabled="!canChangeData"
                                    :value="user.last_name"
                            >
                        </div>
                    </div>
                    <div class="form-item row">
                        <div class="form-group align-self-center col-8 col-md-4 col-xl-4 mr-3">
                            <label class="form-label" for="phone">Phone</label>
                            <input
                                    id="phone"
                                    class="form-input col-12"
                                    type="tel"
                                    name="phone"
                                    :disabled="!canChangeData"
                                    :value="user.phone"
                            >
                        </div>
                        <i
                                :class="['fal mr-2', !dontCall ? 'fa-toggle-off' : 'fa-toggle-on']"
                                @click="dontCallToggle"
                        ></i>
                        <span class="align-self-center">Don't call</span>
                        <input
                                id="dont_call"
                                type="hidden"
                                name="settings[dont_call]"
                                :value="[dontCall * 1]"
                        >
                    </div>
                    <div class="form-item row">
                        <div class="form-group col-12 col-md-4 col-xl-4">
                            <label class="form-label" for="city">City</label>
                            <input
                                    id="city"
                                    class="form-input col-12"
                                    type="text"
                                    name="city"
                                    :disabled="!canChangeData"
                                    :value="user.city"
                            >
                        </div>
                    </div>
                    <v-personal-student v-if="isStudent"></v-personal-student>
                    <v-personal-teacher v-else></v-personal-teacher>
                    <button
                            v-if="!canChangeData"
                            class="btn btn-primary button-round col-12 col-md-3 col-xl-2"
                            @click.prevent="changeData"
                    >Change</button>
                    <button
                            v-else
                            class="btn btn-primary button-round col-12 col-md-3 col-xl-2"
                            type="submit"
                    >Save</button>
                </form>
            </div>
            <div id="password" data-tab_item>
                <div v-show="!canChangePassword">
                    <p v-if="user.password_update">Last update - {{ user.password_update.created_at }}</p>
                    <button
                            class="btn btn-primary button-round col-12 col-md-3 col-xl-2"
                            @click.prevent="changePassword"
                    >Change</button>
                </div>
                <div v-show="canChangePassword">
                    <form @submit.prevent="doChangePassword">
                        <div class="d-block d-sm-flex row">
                            <div class="form-item row col-4">
                                <div class="form-group col-12">
                                    <label class="form-label" for="new_password">New password</label>
                                    <input
                                            id="new_password"
                                            class="form-input col-12"
                                            type="password"
                                            name="password"
                                            required
                                            :disabled="!canChangePassword"
                                            v-model="password"
                                    >
                                </div>
                            </div>
                            <div class="form-item row col-4">
                                <div class="form-group col-12">
                                    <label class="form-label" for="confirm_password">Confirm password</label>
                                    <input
                                            id="confirm_password"
                                            class="form-input col-12"
                                            type="password"
                                            required
                                            :disabled="!canChangePassword"
                                            v-model="confirmPassword"
                                            @keyup="checkPwdValidity"
                                    >
                                </div>
                            </div>
                        </div>
                        <button
                                class="btn btn-primary button-round col-12 col-md-3 col-xl-2"
                                type="submit"
                        >Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserState from "../../states/UserState";
    import UserType from "../../services/UserType";
    import VPersonalStudent from "../personal/student";
    import VPersonalTeacher from "../personal/teacher";
    import Endpoint from "../../services/Endpoint";
    import Message from "../../services/Message";
    import DOMHelper from "../../services/DOMHelper";
    import MessageEntity from '../../entities/MessageEntity';
    export default {
        name: 'v-personal',
        components: {VPersonalTeacher, VPersonalStudent},
        routerData: {
            path: '/personal',
            meta: {
                title: 'Personal info',
                requiresAuth: true
            }
        },
        computed: {
            user() {
                return UserState.getters.user;
            }
        },
        data: function() {
            return {
                canChangeData: false,
                canChangePassword: false,
                dontCall: false,
                password: '',
                confirmPassword: ''
            };
        },
        mounted() {
            window.inputAnimate('#data');
            window.obTabs.init();

            this.dontCall = this.user.settings.dont_call.value;
        },
        methods: {
            isStudent() {
                return UserType.isStudent(this.user.type);
            },
            checkPwdValidity(event) {
                if (this.password !== this.confirmPassword) {
                    event.target.setCustomValidity('Passwords should be the same');

                    return false;
                } else {
                    event.target.setCustomValidity('');
                }

                return true;
            },
            dontCallToggle() {
                if (!this.canChangeData) {
                    return;
                }

                this.dontCall = !this.dontCall;
            },
            changeData() {
                this.canChangeData = true;

                return false;
            },
            changePassword() {
                this.canChangePassword = true;
                window.inputAnimate('#password');

                return false;
            },
            doChangePassword(event) {
                DOMHelper.lockFormButton(event.target, true)
                this.$http.post(
                    Endpoint.getBySuffix('/change-password'),
                    new FormData(event.target)
                )
                    .then(() => {
                        Message.show(
                            new MessageEntity('Password successfully updated')
                        );
                        DOMHelper.lockFormButton(event.target, false);
                    })
                    .catch(err => {
                        Message.show(err);
                        DOMHelper.lockFormButton(event.target, false);
                    })
            },
            save(event) {
                DOMHelper.lockFormButton(event.target, true);
                UserState.dispatch('updateMe', new FormData(event.target))
                    .then(() => {
                        Message.show(
                            new MessageEntity('Data successfully updated')
                        );
                        DOMHelper.lockFormButton(event.target, false);
                    })
                    .catch(err => {
                        Message.show(err);
                        DOMHelper.lockFormButton(event.target, false);
                    })
            }
        }
    }
</script>
