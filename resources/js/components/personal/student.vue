<template>
    <div>
        <div class="form-item row">
            <div class="form-group col-12 col-md-6 col-xl-6">
                <label class="form-label" for="university">University</label>
                <input
                        id="university"
                        class="form-input col-12"
                        type="text"
                        name="university"
                        :disabled="!$parent.canChangeData"
                        :value="user.student_info.university"
                >
            </div>
        </div>
        <div class="form-item row">
            <div class="form-group col-12 col-md-4 col-xl-4">
                <label class="form-label" for="course">Cource</label>
                <input
                        id="course"
                        class="form-input col-12"
                        type="text"
                        name="course"
                        :disabled="!$parent.canChangeData"
                        :value="user.student_info.course"
                >
            </div>
        </div>
    </div>
</template>

<script>
    import UserState from "../../states/UserState";
    export default {
        name: "v-personal-student",
        computed: {
            user() {
                return UserState.getters.user;
            }
        }
    }
</script>
