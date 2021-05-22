"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localize_1 = __importDefault(require("../../util/i18n/localize"));
const MAX_MESSAGE_LENGTH = 2000;
const NEWLINE_LENGTH = '\n'.length;
const CODE_MARKER_LENGTH = '```'.length * 2 + NEWLINE_LENGTH;
const isChunkSizeAcceptable = (currentChunkSize, newElement) => currentChunkSize + NEWLINE_LENGTH + newElement.length <= MAX_MESSAGE_LENGTH;
const chunkArray = (input) => {
    const result = [];
    let currentChunkSize = CODE_MARKER_LENGTH;
    let currentChunk = [];
    input.forEach(element => {
        if (isChunkSizeAcceptable(currentChunkSize, element)) {
            currentChunk.push(element);
            currentChunkSize += NEWLINE_LENGTH + element.length;
        }
        else {
            result.push(currentChunk);
            currentChunk = [element];
            currentChunkSize = CODE_MARKER_LENGTH + NEWLINE_LENGTH + element.length;
        }
    });
    result.push(currentChunk);
    return result;
};
const specificChunk = (chunk, page, total) => [
    localize_1.default.t('helpers.messageChunker.page', { current: page, total }),
    ['```', ...chunk, '```'].join('\n')
];
const chunkedMessages = (toChunk, page = 0) => {
    const chunks = chunkArray(toChunk);
    const index = page - 1;
    if (index >= 0 && index < chunks.length) {
        return specificChunk(chunks[index], page, chunks.length);
    }
    return chunks.map(chunk => ['```', ...chunk, '```'].join('\n'));
};
exports.default = chunkedMessages;
