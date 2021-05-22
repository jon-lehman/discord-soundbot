"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
discord_js_1.Message.prototype.hasPrefix = function hasPrefix(prefix) {
    return this.content.startsWith(prefix);
};
discord_js_1.Message.prototype.isDirectMessage = function isDirectMessage() {
    return this.channel.type === 'dm';
};
