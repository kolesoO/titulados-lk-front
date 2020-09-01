require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import UserState from "./states/UserState";
import Message from "./services/Message";
import DOMHelper from "./services/DOMHelper";
import Config from "./repositories/Config";
import { RouterComponents, routerData } from './routes';

import TopMenuComponent from './components/menu/top';
import LeftDesktopMenuComponent from './components/menu/left-desktop';
import LeftMenu from './components/menu/left';
import FooterMobileMeny from './components/menu/footer-mobile';
import ShortInfoHeader from './components/header/short-info';

const router = new VueRouter({mode: 'history'});

let componentConfig,
    app;

//подключение компонентов
Object.keys(RouterComponents).forEach((componentName) => {
    componentConfig = RouterComponents[componentName];
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.component(TopMenuComponent.name, TopMenuComponent);
Vue.component(LeftDesktopMenuComponent.name, LeftDesktopMenuComponent);
Vue.component(ShortInfoHeader.name, ShortInfoHeader);
Vue.component(LeftMenu.name, LeftMenu);
Vue.component(FooterMobileMeny.name, FooterMobileMeny);
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
        Message.show('Try to authorize');
        UserState.dispatch('me')
            .then(() => {
                Message.show('Authorization completed successfully');
                DOMHelper.lockRootNode(false);
                this.$router.push('/index');
            })
            .catch(err => {
                Message.show(err.body);
                // setTimeout(function () {
                //     location.href = Config.getPublicHost();
                // }, 3000);
            })
    }
}).$mount("#app");
