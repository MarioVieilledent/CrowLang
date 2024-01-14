import { INT_TYPE } from "./constants";
import Heap from "./heap";

type BinaryOperator = "+" | "-" | "*" | "/";

type CalcExpression =
  | string
  | { op: BinaryOperator; left: CalcExpression; right: CalcExpression };

type Token = { type: "number" | "operator" | "variable"; value: string };

const heap = new Heap();

function interpretExpression(expr: CalcExpression): number {
  if (typeof expr === "string") {
    const val = heap.get(expr);
    if (val.clType === INT_TYPE) {
      return val.value;
    } else {
      return 0;
    }
  } else {
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

function tokenizeExpression(expression: string): Token[] {
  const tokens: Token[] = [];
  let currentToken = "";

  for (const char of expression) {
    if (/[0-9.]/.test(char)) {
      currentToken += char;
    } else if (/[+\-*/()]/.test(char)) {
      if (currentToken !== "") {
        tokens.push({ type: "number", value: currentToken });
        currentToken = "";
      }
      tokens.push({ type: "operator", value: char });
    } else if (/[a-zA-Z]/.test(char)) {
      currentToken += char;
    }
  }

  if (currentToken !== "") {
    tokens.push({ type: "number", value: currentToken });
  }

  return tokens;
}

function parseExpression(tokens: Token[]): CalcExpression {
  const precedence: { [key: string]: number } = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  function isOperator(token: Token): token is Token {
    return token.type === "operator";
  }

  function shuntingYard(tokens: Token[]): CalcExpression {
    const outputQueue: Token[] = [];
    const operatorStack: Token[] = [];

    for (const token of tokens) {
      if (token.type === "number" || token.type === "variable") {
        outputQueue.push(token);
      } else if (isOperator(token)) {
        while (
          operatorStack.length > 0 &&
          isOperator(operatorStack[operatorStack.length - 1]) &&
          precedence[token.value] <=
            precedence[operatorStack[operatorStack.length - 1].value]
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      }
    }

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop()!);
    }

    const resultStack: CalcExpression[] = [];

    for (const token of outputQueue) {
      if (token.type === "number" || token.type === "variable") {
        resultStack.push(token.value);
      } else if (isOperator(token)) {
        const right = resultStack.pop() as CalcExpression;
        const left = resultStack.pop() as CalcExpression;
        resultStack.push({ op: token.value as BinaryOperator, left, right });
      }
    }

    return resultStack[0];
  }

  const tokensReversed = [...tokens].reverse();
  const output = shuntingYard(tokensReversed);

  return output;
}

function stringToCalcExpression(expressionString: string): CalcExpression {
  const tokens = tokenizeExpression(expressionString);
  const parsedExpression = parseExpression(tokens);
  return parsedExpression;
}

export const calc = (script: string): number =>
  interpretExpression(stringToCalcExpression(script));
