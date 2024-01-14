"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateValue = void 0;
const constants_1 = require("./constants");
const isIntMatch = /^-?\d+$/;
const isFloatMatch = /^-?\d+\.\d+$/;
const isStringMatch = /^\".+\"$/;
const evaluateValue = (script) => {
    script = script.trim();
    if (script === constants_1.TRUE_EXPRESSION) {
        return {
            value: true,
            clType: constants_1.BOOLEAN_TYPE,
        };
    }
    else if (script === constants_1.FALSE_EXPRESSION) {
        return {
            value: false,
            clType: constants_1.BOOLEAN_TYPE,
        };
    }
    else if (script === constants_1.VOID_EXPRESSION) {
        return {
            value: undefined,
            clType: constants_1.VOID_TYPE,
        };
    }
    else if (isIntMatch.test(script)) {
        return {
            value: parseInt(script),
            clType: constants_1.INT_TYPE,
        };
    }
    else if (isFloatMatch.test(script)) {
        return {
            value: parseFloat(script),
            clType: constants_1.FLOAT_TYPE,
        };
    }
    else if (isStringMatch.test(script)) {
        return {
            value: script.substring(1, script.length - 1),
            clType: constants_1.STRING_TYPE,
        };
    }
    else {
        return {
            value: undefined,
            clType: constants_1.ERROR_TYPE,
        };
    }
};
exports.evaluateValue = evaluateValue;
