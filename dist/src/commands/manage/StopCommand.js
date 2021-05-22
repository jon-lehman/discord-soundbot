"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopCommand = void 0;
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class StopCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['leave', 'stop'];
    }
    run(message) {
        if (!message.guild)
            return;
        if (!message.guild.voice)
            return;
        this.queue.clear();
        const { connection: voiceConnection } = message.guild.voice;
        if (voiceConnection)
            voiceConnection.disconnect();
    }
}
exports.StopCommand = StopCommand;
