export default {
    config: require('../../../config'),

    getApiHost () {
        return this.config.api_host;
    },

    getApiVersion () {
        return this.config.api_version;
    },

    getPublicHost () {
        return this.config.public_host;
    }
}
