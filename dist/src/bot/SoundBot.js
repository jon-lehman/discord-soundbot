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
const discord_js_1 = require("discord.js");
const QueueItem_1 = __importDefault(require("../queue/QueueItem"));
const entrances = __importStar(require("../util/db/Entrances"));
const exits = __importStar(require("../util/db/Exits"));
const localize_1 = __importDefault(require("../util/i18n/localize"));
const SoundUtil_1 = require("../util/SoundUtil");
class SoundBot extends discord_js_1.Client {
    constructor(config, commands, messageHandler, queue) {
        super();
        this.config = config;
        this.commands = commands;
        this.messageHandler = messageHandler;
        this.queue = queue;
        this.addEventListeners();
    }
    start() {
        this.login(process.env.TOKEN);
    }
    registerAdditionalCommands(commands) {
        this.commands.registerCommands(commands);
    }
    addEventListeners() {
        this.on('ready', this.onReady);
        this.on('message', this.onMessage);
        this.on('voiceStateUpdate', this.onUserLeavesVoiceChannel);
        this.on('voiceStateUpdate', this.onUserJoinsVoiceChannel);
        this.on('guildCreate', this.onBotJoinsServer);
    }
    onReady() {
        if (!this.user)
            return;
        this.user.setActivity(this.config.game);
        this.commands.registerUserCommands(this.user);
    }
    onUserJoinsVoiceChannel(oldState, newState) {
        const { channel: previousVoiceChannel } = oldState;
        const { channel: currentVoiceChannel, member } = newState;
        if (!member)
            return;
        if (!currentVoiceChannel || previousVoiceChannel === currentVoiceChannel)
            return;
        if (!entrances.exists(member.id))
            return;
        const sound = entrances.get(member.id);
        if (!SoundUtil_1.getSounds().includes(sound))
            return;
        this.queue.add(new QueueItem_1.default(sound, currentVoiceChannel));
    }
    onUserLeavesVoiceChannel(oldState, newState) {
        const { channel: previousVoiceChannel } = oldState;
        const { channel: currentVoiceChannel, member } = newState;
        if (!member)
            return;
        if (!previousVoiceChannel || previousVoiceChannel === currentVoiceChannel)
            return;
        if (!exits.exists(member.id))
            return;
        const sound = exits.get(member.id);
        if (!SoundUtil_1.getSounds().includes(sound))
            return;
        this.queue.add(new QueueItem_1.default(sound, previousVoiceChannel));
    }
    onMessage(message) {
        this.messageHandler.handle(message);
    }
    onBotJoinsServer(guild) {
        if (!guild.available)
            return;
        const channel = this.findFirstWritableChannel(guild);
        if (!channel)
            return;
        channel.send(localize_1.default.t('welcome', { prefix: this.config.prefix }));
    }
    findFirstWritableChannel(guild) {
        if (!guild.me)
            return undefined;
        const channels = guild.channels.cache
            .filter(channel => channel.type === 'text')
            .filter(channel => {
            const permissions = channel.permissionsFor(guild.me);
            return Boolean(permissions && permissions.has('SEND_MESSAGES'));
        });
        if (!channels.size)
            return undefined;
        return channels.first();
    }
}
exports.default = SoundBot;
