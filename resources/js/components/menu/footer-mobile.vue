<template>
    <div class="footer-nav d-flex flex-wrap justify-content-between">
        <div class="nav-item text-center col-2 p-0 js-toggle_class" id="footer_menu-button" data-class="active" data-target=".main-menu-wrapper">
            <i class="fas fa-bars">
                <span class="counter-red">2</span>
            </i>
            <div class="nav-item-descr">Меню</div>
        </div>
        <div class="nav-item text-center col-2 p-0">
            <i class="fas fa-envelope">
                <span class="counter-red">2</span>
            </i>
            <div class="nav-item-descr">Активные</div>
        </div>
        <div class="nav-item text-center col-2 p-0">
            <i class="fas fa-eye"></i>
            <div class="nav-item-descr">Уточнения</div>
        </div>
        <div class="nav-item text-center col-2 p-0">
            <i class="fas fa-book"></i>
            <div class="nav-item-descr">Новый заказ</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-menu-footer-mobile"
    }
</script>
