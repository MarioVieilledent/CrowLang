"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calc = void 0;
const constants_1 = require("./constants");
const heap_1 = __importDefault(require("./heap"));
const heap = new heap_1.default();
function interpretExpression(expr) {
    if (typeof expr === "string") {
        const val = heap.get(expr);
        if (val.clType === constants_1.INT_TYPE) {
            return val.value;
        }
        else {
            return 0;
        }
    }
    else {
        const { op, left, right } = expr;
        switch (op) {
            case "+":
                return interpretExpression(left) + interpretExpression(right);
            case "-":
                return interpretExpression(left) - interpretExpression(right);
            case "*":
                return interpretExpression(left) * interpretExpression(right);
            case "/":
                return interpretExpression(left) / interpretExpression(right);
            default:
                throw new Error(`Invalid operator: ${op}`);
        }
    }
}
function tokenizeExpression(expression) {
    const tokens = [];
    let currentToken = "";
    for (const char of expression) {
        if (/[0-9.]/.test(char)) {
            currentToken += char;
        }
        else if (/[+\-*/()]/.test(char)) {
            if (currentToken !== "") {
                tokens.push({ type: "number", value: currentToken });
                currentToken = "";
            }
            tokens.push({ type: "operator", value: char });
        }
        else if (/[a-zA-Z]/.test(char)) {
            currentToken += char;
        }
    }
    if (currentToken !== "") {
        tokens.push({ type: "number", value: currentToken });
    }
    return tokens;
}
function parseExpression(tokens) {
    const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    };
    function isOperator(token) {
        return token.type === "operator";
    }
    function shuntingYard(tokens) {
        const outputQueue = [];
        const operatorStack = [];
        for (const token of tokens) {
            if (token.type === "number" || token.type === "variable") {
                outputQueue.push(token);
            }
            else if (isOperator(token)) {
                while (operatorStack.length > 0 &&
                    isOperator(operatorStack[operatorStack.length - 1]) &&
                    precedence[token.value] <=
                        precedence[operatorStack[operatorStack.length - 1].value]) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        }
        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }
        const resultStack = [];
        for (const token of outputQueue) {
            if (token.type === "number" || token.type === "variable") {
                resultStack.push(token.value);
            }
            else if (isOperator(token)) {
                const right = resultStack.pop();
                const left = resultStack.pop();
                resultStack.push({ op: token.value, left, right });
            }
        }
        return resultStack[0];
    }
    const tokensReversed = [...tokens].reverse();
    const output = shuntingYard(tokensReversed);
    return output;
}
function stringToCalcExpression(expressionString) {
    const tokens = tokenizeExpression(expressionString);
    const parsedExpression = parseExpression(tokens);
    return parsedExpression;
}
const calc = (script) => interpretExpression(stringToCalcExpression(script));
exports.calc = calc;
