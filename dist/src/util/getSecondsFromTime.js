"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("./Errors");
/**
 * Parses a string of the form [[hh:]mm:]ss[.xxx]) and returns a number representing the seconds
 * from that time
 */
const getSecondsFromTime = (time) => {
    if (!time)
        return null;
    if (!time.match(/(\d{1,2}:)?(\d{1,2}:)?(\d{1,2})(\.\d{1,3})?/)) {
        throw new Errors_1.FormatError();
    }
    const [front, millis = '0'] = time.split('.');
    const [seconds, minutes = '0', hours = '0'] = front.split(':').reverse();
    return (parseInt(hours) * 60 * 60 +
        parseInt(minutes) * 60 +
        parseInt(seconds) +
        parseFloat(`0.${millis}`));
};
exports.default = getSecondsFromTime;
