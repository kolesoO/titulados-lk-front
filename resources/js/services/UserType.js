export default {
    STUDENT_TYPE: 0,
    TEACHER_TYPE: 1,

    isStudent(type) {
        return type === this.STUDENT_TYPE;
    },

    isTeacher(type) {
        return type === this.TEACHER_TYPE;
    }
}
