"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("../util/Container");
class ChannelTimeout {
    static start(connection) {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(() => connection.disconnect(), Container_1.config.timeout /* m */ * 60 /* s */ * 1000 // ms
        );
    }
}
exports.default = ChannelTimeout;
