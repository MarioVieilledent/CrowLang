"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panic = void 0;
const panic = (errorMessage, lineNumber) => console.error(`Error at line ${lineNumber}: ${errorMessage}`);
exports.panic = panic;
