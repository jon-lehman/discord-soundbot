"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
class QueueCommand extends Command_1.default {
    constructor(queue) {
        super();
        this.queue = queue;
    }
}
exports.default = QueueCommand;
