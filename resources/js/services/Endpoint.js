import Config from "../repositories/Config";

export default {
    getBySuffix: function (suffix) {
        return Config.getApiHost() + '/api/v' + Config.getApiVersion() + suffix;
    }
}
