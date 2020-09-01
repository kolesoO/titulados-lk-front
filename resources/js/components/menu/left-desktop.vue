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
        <!--li>Сделать заказ</li>
        <li class="d-flex justify-content-between align-items-center">
            <span>В обработке</span>
            <i class="icon icon-counter">3</i>
        </li>
        <li class="d-flex justify-content-between align-items-center">
            <span>Активные</span>
            <div class="col-xl-6 d-flex p-0 justify-content-between">
                <i class="icon icon-counter-active">
                    <i class="fas fa-comment"></i>10
                </i>
                <i class="icon icon-counter">3</i>
            </div>
        </li>
        <li>Уточнения</li>
        <li>Оплата</li>
        <li>Выполненные работы</li>
        <li>Мои данные</li-->
    </ul>
</template>

<script>
    import IndexRoute from '../routes/index';
    import ActiveOrdersRoute from '../routes/active-orders';
    export default {
        name: "v-menu-left-desktop",
        data: function () {
            return {
                index: IndexRoute.routerData,
                active_orders: ActiveOrdersRoute.routerData,
            }
        }
    }
</script>
