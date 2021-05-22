"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueueItem {
    constructor(name, channel, message, count = 1) {
        this.name = name;
        this.channel = channel;
        this.message = message;
        this.count = count;
    }
}
exports.default = QueueItem;
