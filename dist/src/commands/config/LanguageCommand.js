"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCommand = void 0;
const discord_js_1 = require("discord.js");
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const ConfigCommand_1 = __importDefault(require("../base/ConfigCommand"));
const FLAGS = {
    de: ':flag_de:',
    en: ':flag_gb:',
    es: ':flag_es:',
    fr: ':flag_fr:',
    hu: ':flag_hu:',
    it: ':flag_it:',
    ja: ':flag_jp:',
    nl: ':flag_nl:'
};
class LanguageCommand extends ConfigCommand_1.default {
    constructor() {
        super(...arguments);
        this.triggers = ['lang'];
    }
    run(message, params) {
        const [chosenLanguage] = params;
        const language = chosenLanguage &&
            this.getLanguageMap().findKey((value, key) => [key, value].includes(chosenLanguage));
        if (!language) {
            message.channel.send(this.help());
            return;
        }
        this.config.set('language', [language]);
        localize_1.default.setLocale(language);
        message.channel.send(localize_1.default.t('commands.lang.success', { flag: FLAGS[language], language: chosenLanguage }));
    }
    help() {
        return new discord_js_1.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(localize_1.default.t('commands.lang.title'))
            .setDescription([
            `:flag_de: \`de\` ${localize_1.default.t('language.de')} - Deutsch`,
            `:flag_gb: \`en\` ${localize_1.default.t('language.en')} - English`,
            `:flag_es: \`es\` ${localize_1.default.t('language.es')} - Español`,
            `:flag_fr: \`fr\` ${localize_1.default.t('language.fr')} - Français`,
            `:flag_hu: \`hu\` ${localize_1.default.t('language.hu')} - Magyar`,
            `:flag_it: \`it\` ${localize_1.default.t('language.it')} - Italiano`,
            `:flag_jp: \`ja\` ${localize_1.default.t('language.ja')} - 日本人`,
            `:flag_nl: \`nl\` ${localize_1.default.t('language.nl')} - Nederlands`,
            '',
            localize_1.default.t('commands.lang.usage', { command: `${this.config.prefix}lang` })
        ].join('\n'));
    }
    getLanguageMap() {
        return new discord_js_1.Collection([
            ['de', localize_1.default.t('language.de')],
            ['en', localize_1.default.t('language.en')],
            ['es', localize_1.default.t('language.es')],
            ['fr', localize_1.default.t('language.fr')],
            ['hu', localize_1.default.t('language.hu')],
            ['it', localize_1.default.t('language.it')],
            ['ja', localize_1.default.t('language.ja')],
            ['nl', localize_1.default.t('language.nl')]
        ]);
    }
}
exports.LanguageCommand = LanguageCommand;
