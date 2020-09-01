require('jquery/jquery.min');
require('../markup/js/index');
require('bootstrap/dist/css/bootstrap.min.css');

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Headers from "./services/Headers";

window.Vue = require('vue');
window.Vue.use(VueResource);
window.Vue.use(VueRouter);

Headers.setAuthHeader();
