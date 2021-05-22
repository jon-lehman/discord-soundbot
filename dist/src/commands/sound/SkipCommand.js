"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipCommand = void 0;
const QueueCommand_1 = __importDefault(require("../base/QueueCommand"));
class SkipCommand extends QueueCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['skip'];
    }
    run() {
        this.queue.next();
    }
}
exports.SkipCommand = SkipCommand;
