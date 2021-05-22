"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const Config_1 = __importDefault(require("../config/Config"));
const SoundQueue_1 = __importDefault(require("../queue/SoundQueue"));
const CommandCollection_1 = __importDefault(require("../bot/CommandCollection"));
const MessageHandler_1 = __importDefault(require("../bot/MessageHandler"));
const SoundBot_1 = __importDefault(require("../bot/SoundBot"));
const config_1 = require("../commands/config");
const help_1 = require("../commands/help");
const manage_1 = require("../commands/manage");
const AttachmentDownloader_1 = __importDefault(require("../commands/manage/add/downloader/AttachmentDownloader"));
const YoutubeDownloader_1 = __importDefault(require("../commands/manage/add/downloader/YoutubeDownloader"));
const AttachmentValidator_1 = __importDefault(require("../commands/manage/add/validator/AttachmentValidator"));
const YoutubeValidator_1 = __importDefault(require("../commands/manage/add/validator/YoutubeValidator"));
const sound_1 = require("../commands/sound");
exports.config = new Config_1.default();
const queue = new SoundQueue_1.default(exports.config);
const attachmentValidator = new AttachmentValidator_1.default(exports.config);
const attachmentDownloader = new AttachmentDownloader_1.default(attachmentValidator);
const youtubeValidator = new YoutubeValidator_1.default();
const youtubeDownloader = new YoutubeDownloader_1.default(youtubeValidator);
const commands = [
    new help_1.PingCommand(),
    // SOUND PLAYING RELATED COMMANDS
    new sound_1.SoundCommand(queue),
    new sound_1.ComboCommand(queue),
    new sound_1.RandomCommand(queue),
    new sound_1.LoopCommand(queue),
    new sound_1.NextCommand(queue),
    new sound_1.SkipCommand(queue),
    new manage_1.StopCommand(queue),
    // ENTRANCE / EXIT SOUNDS
    new manage_1.EntranceCommand(),
    new manage_1.ExitCommand(),
    // SOUND ADMINISTRATION COMMANDS
    new manage_1.AddCommand(attachmentDownloader, youtubeDownloader),
    new manage_1.SoundsCommand(exports.config),
    new manage_1.SearchCommand(),
    new manage_1.ModifyCommand(),
    new manage_1.RenameCommand(),
    new manage_1.RemoveCommand(),
    new manage_1.TagCommand(),
    new manage_1.TagsCommand(),
    new manage_1.DownloadCommand(),
    // HELP / INFO COMMANDS
    new help_1.WelcomeCommand(exports.config),
    new help_1.HelpCommand(exports.config),
    new help_1.LastAddedCommand(),
    new help_1.MostPlayedCommand(),
    // CONFIGURATION RELATED COMMANDS
    new config_1.AvatarCommand(exports.config),
    new config_1.ConfigCommand(exports.config),
    new config_1.LanguageCommand(exports.config),
    new config_1.IgnoreCommand(),
    new config_1.UnignoreCommand()
];
const commandCollection = new CommandCollection_1.default(commands);
const messageHandler = new MessageHandler_1.default(commandCollection);
const soundBot = new SoundBot_1.default(exports.config, commandCollection, messageHandler, queue);
exports.default = {
    config: exports.config,
    soundBot
};
