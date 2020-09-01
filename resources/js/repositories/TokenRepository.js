export default {
    key: 'api_token',

    getToken: function () {
        return localStorage.getItem(this.key);
    },

    setToken: function (value) {
        localStorage.setItem(this.key, value);
    },

    delete: function () {
        localStorage.removeItem(this.key);
    }
}
