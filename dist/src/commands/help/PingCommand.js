"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const Command_1 = __importDefault(require("../base/Command"));
class PingCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['ping'];
    }
    run(message) {
        message.channel.send('Pong!');
    }
}
exports.PingCommand = PingCommand;
