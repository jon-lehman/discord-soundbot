"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../discord/Message");
const userHasElevatedRole_1 = __importDefault(require("../commands/util/userHasElevatedRole"));
const Container_1 = require("../util/Container");
const ignoreList = __importStar(require("../util/db/IgnoreList"));
const localize_1 = __importDefault(require("../util/i18n/localize"));
class MessageHandler {
    constructor(commands) {
        this.commands = commands;
    }
    handle(message) {
        if (!this.isValidMessage(message))
            return;
        const messageToHandle = message;
        messageToHandle.content = message.content.substring(Container_1.config.prefix.length);
        this.execute(messageToHandle);
    }
    isValidMessage(message) {
        return (!message.author.bot &&
            !message.isDirectMessage() &&
            message.hasPrefix(Container_1.config.prefix) &&
            !ignoreList.exists(message.author.id));
    }
    execute(message) {
        const [command, ...params] = message.content.split(' ');
        const commandToRun = this.commands.get(command);
        if (commandToRun.elevated && !userHasElevatedRole_1.default(message.member)) {
            message.channel.send(localize_1.default.t('errors.unauthorized'));
            return;
        }
        commandToRun.run(message, params);
    }
}
exports.default = MessageHandler;
