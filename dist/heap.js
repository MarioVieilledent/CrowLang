"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Heap {
    constructor() {
        this.memory = {};
    }
    allocate(e) {
        this.memory[e.key] = e;
    }
    get(key) {
        var _a;
        return (_a = this.memory[key]) !== null && _a !== void 0 ? _a : constants_1.VOID_TYPE;
    }
}
exports.default = Heap;
