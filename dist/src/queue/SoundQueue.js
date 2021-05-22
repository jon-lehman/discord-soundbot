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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sounds = __importStar(require("../util/db/Sounds"));
const localize_1 = __importDefault(require("../util/i18n/localize"));
const SoundUtil_1 = require("../util/SoundUtil");
const ChannelTimeout_1 = __importDefault(require("./ChannelTimeout"));
const QueueItem_1 = __importDefault(require("./QueueItem"));
class SoundQueue {
    constructor(config) {
        this.queue = [];
        this.config = config;
    }
    add(item) {
        this.queue.push(item);
        if (this.isStartable())
            this.playNext();
    }
    addBefore(item) {
        this.queue.unshift(item);
        if (this.isStartable())
            this.playNext();
    }
    next() {
        if (!this.dispatcher)
            return;
        this.dispatcher.emit('finish');
    }
    clear() {
        if (!this.currentSound)
            return;
        if (this.config.deleteMessages)
            this.deleteMessages();
        // Prevent further looping
        this.currentSound.count = 0;
        this.queue = [];
    }
    isStartable() {
        return !this.currentSound;
    }
    deleteMessages() {
        if (!this.currentSound)
            return;
        if (this.isEmpty())
            return;
        let deleteableMessages = this.queue
            .map(item => item.message)
            .filter((message) => !!message);
        const { message: currentMessage } = this.currentSound;
        if (currentMessage) {
            deleteableMessages = deleteableMessages.filter(msg => msg.id !== currentMessage.id);
        }
        // Do not try to delete the same sound multiple times (!combo)
        Array.from(new Set(deleteableMessages)).forEach(message => message.delete());
    }
    playNext() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentSound = this.queue.shift();
            const sound = SoundUtil_1.getPathForSound(this.currentSound.name);
            try {
                const connection = yield this.currentSound.channel.join();
                this.deafen(connection);
                yield this.playSound(connection, sound);
                this.handleFinishedPlayingSound(connection);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    // NOTE: Can only deafen when in a channel, therefore need connection
    deafen(connection) {
        if (!connection.voice)
            return;
        if (connection.voice.selfDeaf === this.config.deafen)
            return;
        connection.voice.setDeaf(this.config.deafen);
    }
    playSound(connection, name) {
        return new Promise(resolve => {
            this.dispatcher = connection
                .play(name, { volume: this.config.volume })
                .on('finish', resolve)
                .on('close', resolve);
        });
    }
    handleFinishedPlayingSound(connection) {
        const { name, channel, message, count } = this.currentSound;
        sounds.incrementCount(name);
        if (count > 1) {
            this.add(new QueueItem_1.default(name, channel, message, count - 1));
        }
        else {
            this.deleteCurrentMessage();
        }
        this.currentSound = null;
        this.dispatcher = null;
        if (!this.isEmpty()) {
            this.playNext();
            return;
        }
        if (!this.config.stayInChannel) {
            connection.disconnect();
            return;
        }
        if (this.config.timeout > 0)
            ChannelTimeout_1.default.start(connection);
    }
    handleError(error) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (error.code === 'VOICE_JOIN_CHANNEL' && ((_a = this.currentSound) === null || _a === void 0 ? void 0 : _a.message)) {
                yield this.currentSound.message.channel.send(localize_1.default.t('errors.permissions'));
                process.exit();
            }
            console.error('Error occured!', '\n', error);
            this.currentSound = null;
            this.dispatcher = null;
        });
    }
    deleteCurrentMessage() {
        if (!this.config.deleteMessages)
            return;
        if (!this.currentSound || !this.currentSound.message)
            return;
        if (!this.isLastSoundFromCurrentMessage(this.currentSound.message))
            return;
        if (this.wasMessageAlreadyDeleted(this.currentSound.message))
            return;
        this.currentSound.message.delete();
    }
    isEmpty() {
        return this.queue.length === 0;
    }
    wasMessageAlreadyDeleted(message) {
        if (!message)
            return false;
        return message.channel.messages.cache.find(msg => msg.id === message.id) === null;
    }
    isLastSoundFromCurrentMessage(message) {
        return !this.queue.some(item => !!item.message && item.message.id === message.id);
    }
}
exports.default = SoundQueue;
