<template>
    <div>
        <div class="title-2 col-12 p-0 d-none d-sm-block">Настройки уведомлений по группам предметов</div>
        <div class="push form-group col-12 p-0">
            <label class="form-label" for="course">Добавить факультет</label>
            <input id="course" class="form-input col-12 input-push border-bottom col-12 col-md-7 col-xl-6 px-0" type="text">
        </div>
        <div class="button-block col-12 p-0 mt-3">
            <span class="btn btn-primary button-round align-middle">Иностранные языки <i class="fas fa-times ml-1 ml-sm-2"></i></span>
            <span class="btn btn-primary button-round align-middle">Биология <i class="fas fa-times ml-1 ml-sm-2"></i></span>
        </div>
        <div class="check-list">
            <div class="col-12 p-0 mb-3">
                <div class="check row align-items-center col-12">
                    <input type="checkbox" id="all_in_one">
                    <div class="col-10 col-xl-11">
                        <label class="form-check-label" for="all_in_one">Получать рассылки одним письмом все заказы (дайджест)</label>
                    </div>
                </div>
            </div>
            <div class="col-12 p-0 d-flex align-items-center mb-3">
                <div class="check row align-items-center col-12">
                    <input type="checkbox" id="unsuscribe">
                    <div class="col-10 col-xl-11">
                        <label class="form-check-label" for="unsuscribe">Отписаться от всех рассылок по предложениям заказов</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-notifications',
        routerData: {
            path: '/notifications',
            meta: {
                title: 'Notifications',
                requiresAuth: true
            }
        }
    }
</script>
