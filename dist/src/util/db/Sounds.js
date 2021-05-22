"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostPlayed = exports.clearTags = exports.listTags = exports.addTags = exports.withTag = exports.incrementCount = exports.remove = exports.rename = exports.add = exports.exists = exports.findByName = void 0;
const connection_1 = __importDefault(require("./connection"));
const Sound_1 = __importDefault(require("./models/Sound"));
const all = () => connection_1.default.get('sounds');
const findByName = (name) => all().find({ name });
exports.findByName = findByName;
const addSingleTag = (sound, tag) => {
    const { tags } = exports.findByName(sound).value();
    if (tags.includes(tag))
        return;
    tags.push(tag);
    exports.findByName(sound).assign({ tags }).write();
};
const exists = (name) => !!exports.findByName(name).value();
exports.exists = exists;
const add = (sound) => {
    all().push(new Sound_1.default(sound)).write();
};
exports.add = add;
const rename = (oldName, newName) => {
    exports.findByName(oldName).assign({ name: newName }).write();
};
exports.rename = rename;
const remove = (name) => {
    all().remove({ name }).write();
};
exports.remove = remove;
const incrementCount = (sound) => {
    if (!exports.exists(sound))
        exports.add(sound);
    const newValue = exports.findByName(sound).value().count + 1;
    exports.findByName(sound).set('count', newValue).write();
};
exports.incrementCount = incrementCount;
const withTag = (tag) => all()
    .filter((sound) => sound.tags.includes(tag))
    .map((sound) => sound.name)
    .value();
exports.withTag = withTag;
const addTags = (sound, tags) => {
    if (!exports.exists(sound))
        exports.add(sound);
    tags.forEach(tag => addSingleTag(sound, tag));
};
exports.addTags = addTags;
const listTags = (sound) => {
    if (!exports.exists(sound))
        return [];
    return exports.findByName(sound).value().tags.sort();
};
exports.listTags = listTags;
const clearTags = (sound) => {
    if (!exports.exists(sound))
        return;
    exports.findByName(sound).assign({ tags: [] }).write();
};
exports.clearTags = clearTags;
const mostPlayed = (limit = 15) => all().sortBy('count').reverse().take(limit).value();
exports.mostPlayed = mostPlayed;
