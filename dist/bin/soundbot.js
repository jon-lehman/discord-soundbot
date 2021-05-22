#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("../src/util/Container"));
const localize_1 = __importDefault(require("../src/util/i18n/localize"));
const { config, soundBot: bot } = Container_1.default;
localize_1.default.setLocale(config.language);
bot.start();
console.info(localize_1.default.t('url', { clientId: config.clientId }));
