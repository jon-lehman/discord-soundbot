"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const adapter = new FileSync_1.default('db.json');
const connection = lowdb_1.default(adapter);
connection
    .defaults({
    entrances: {},
    exits: {},
    ignoreList: [],
    sounds: []
})
    .write();
exports.default = connection;
