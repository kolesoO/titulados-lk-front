<template>
    <div class="position-relative">
        <header class="header">
            <div class="container">
                <div class="d-flex flex-wrap justify-content-between">
                    <div class="logo col-xl-3 p-0 ">
                        <img class="d-none d-sm-block" src="/img/logo.png">
                        <img src="/img/logo-mobile.png" class="d-block d-sm-none">
                    </div>
                    <div
                            class="header-menu_btn js-toggle_class align-self-center d-block d-sm-none"
                            data-class="active"
                            data-target=".menu-wrapper"
                    >
                        <i class="icon icon-burger">
                            <hr class="bg-primary">
                            <hr class="bg-primary">
                            <hr class="bg-primary">
                        </i>
                    </div>
                    <div class="d-none d-md-flex align-items-end col-sm-8 col-xl-9 p-0 justify-content-end">
                        <VMenuTop v-if="isLoggedIn"></VMenuTop>
                        <VHeaderShortInfo v-if="isLoggedIn"></VHeaderShortInfo>
                        <div
                                class="header-menu_btn js-toggle_class align-self-end d-block d-xl-none ml-4"
                                data-class="active"
                                data-target=".main-menu-wrapper"
                        >
                            <i class="icon icon-burger">
                                <hr class="bg-primary">
                                <hr class="bg-primary">
                                <hr class="bg-primary">
                            </i>
                        </div>
                    </div>
                </div>
                <div class="menu-wrapper d-sm-none">
                    <div class="container">
                        <div class="col-12 p-0 d-flex flex-wrap justify-content-between align-items-center mt-5">
                            <div class="col-11 p-0 d-flex flex-wrap align-items-center">
                                <div class="header-login col-5 mr-3 text-center">
                                    <span class="mr-2">Nikita</span>
                                    <i class="far fa-user"></i>
                                </div>
                                <div>Выйти</div>
                            </div>
                            <i
                                    class="fas fa-times text-primary col-1 p-0 text-right js-toggle_class"
                                    data-class="active"
                                    data-target=".menu-wrapper"
                            ></i>
                        </div>
                        <ul class="menu-wrapper-nav text-primary p-0 pl-4">
                            <li>Оплата</li>
                            <li>Выполненные</li>
                            <li>Мои данные</li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="container d-flex flex-wrap justify-content-between">
                <VMenuLeftDesktop v-if="isLoggedIn"></VMenuLeftDesktop>
                <div class="content col-12 col-xl-9 p-0">
                    <router-view></router-view>
                </div>
                <div
                        class="help-block bg-warning text-center js-toggle_class"
                        data-class="active"
                        data-target=".help-wrapper"
                >
                    <i class="icon icon-headset"></i>
                    <i class="fas fa-times"></i>
                </div>
                <div class="help-wrapper">
                    <button class="btn btn-warning button-round col-12 mb-2">Позвонить<i class="fas fa-phone ml-2"></i></button>
                    <button class="btn btn-warning button-round col-12">WhatsApp<i class="fab fa-whatsapp ml-2"></i></button>
                </div>
                <div class="main-menu-wrapper d-xl-none">
                    <VMenuLeft></VMenuLeft>
                </div>
            </div>
        </main>
        <footer class="footer d-block d-sm-none col-12 px-0">
            <div class="container">
                <VMenuFooterMobile></VMenuFooterMobile>
            </div>
        </footer>
        <footer class="footer d-none d-sm-block">
            <div class="container">
                <div class="col-md-12 col-xl-9 p-0">
                    <form action="" class="d-flex flex-wrap col-md-12 col-xl-12 p-0">
                        <div class="label-suscribe col-xl-12 mb-2 p-0">Suscríbete a promociones y bonos</div>
                        <div class="form-group col-8 p-0 mr-2 mr-md-3">
                            <label class="form-label" for="email">Email</label>
                            <input id="email" class="form-input col-12" type="text" />
                        </div>
                        <button class="btn btn-warning button-round" type="button" name="button">Подписаться</button>
                    </form>
                    <div class="col-xl-12 col-md-12 p-0 d-flex flex-wrap justify-content-between">
                        <ul class="col-xl-3 col-md-3 p-0">
                            <li><a href="#">Modo de remuneración</a></li>
                            <li><a href="#">Nuestras garantías</a></li>
                            <li><a href="#">Agencias</a></li>
                            <li><a href="#">Descuentos</a></li>
                            <li><a href="#">Comentarios</a></li>
                            <li><a href="#">Preguntas y respuestas</a></li>
                            <li><a href="#">Nuestras garantías</a></li>
                        </ul>
                        <ul class="col-xl-3 col-md-3 p-0">
                            <li><a href="#">Cómo funciona</a></li>
                            <li><a href="#">Contactos</a></li>
                            <li><a href="#">Artículos</a></li>
                            <li><a href="#">Objetos</a></li>
                            <li><a href="#">Trabajos terminados</a></li>
                            <li><a href="#">Entrada para autores</a></li>
                        </ul>
                        <div class="col-xl-3 col-md-3 p-0">
                            <ul class="col-xl-12 p-0">
                                <li><a href="#">Condiciones de trabajo</a></li>
                                <li><a href="#">Registro de autores</a></li>
                            </ul>
                            <div class="socials col-xl-11 p-0 d-flex flex-wrap justify-content-between align-items-center">
                                <i class="icon icon-fb"></i>
                                <i class="icon icon-vk"></i>
                                <i class="icon icon-inst"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import VMenuTop from "./menu/top";
    import VHeaderShortInfo from "./header/short-info";
    import VMenuLeftDesktop from "./menu/left-desktop";
    import VMenuLeft from "./menu/left";
    import VMenuFooterMobile from "./menu/footer-mobile";
    import UserState from "../states/UserState";
    export default {
        name: "v-root",
        components: {VMenuFooterMobile, VMenuLeft, VMenuLeftDesktop, VHeaderShortInfo, VMenuTop},
        computed: {
            isLoggedIn() {
                return UserState.getters.isLoggedIn;
            }
        }
    }
</script>
