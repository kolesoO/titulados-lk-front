require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import UserState from "./states/UserState";
import Message from "./services/Message";
import DOMHelper from "./services/DOMHelper";
import Config from "./repositories/Config";
import MessageEntity from './entities/MessageEntity';
import { RouterComponents, routerData } from './routes';
import RootComponent from './components/root';

const router = new VueRouter({mode: 'history'});

let componentConfig,
    app;

//подключение компонентов
Object.keys(RouterComponents).forEach((componentName) => {
    componentConfig = RouterComponents[componentName];
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.component(RootComponent.name, RootComponent);
//end

//регистрация маршрутов
router.addRoutes(routerData);
// router.beforeEach((to, from, next) => {
//     if (to.path === '/') {
//         next('/index')
//
//         return;
//     }
//
//     if (to.matched.some(record => record.meta.requiresAuth) && !UserState.getters.isLoggedIn) {
//         location.href = Config.getPublicHost();
//
//         return;
//     }
//
//     next();
// });
//end

app = new Vue({
    router,
    data: {
        navigation: routerData
    },
    created: function () {
        Message.show(
            new MessageEntity('Try to authorize')
        );
        UserState.dispatch('me')
            .then(() => {
                Message.show(
                    new MessageEntity('Authorization completed successfully')
                );
                DOMHelper.lockRootNode(false);
                this.$router.push('/index');
            })
            .catch(err => {
                Message.show(err);
                // setTimeout(function () {
                //     location.href = Config.getPublicHost();
                // }, 3000);
            })
    }
}).$mount("#app");
