import {
  BOOLEAN_TYPE,
  ERROR_TYPE,
  FALSE_EXPRESSION,
  FLOAT_TYPE,
  INT_TYPE,
  STRING_TYPE,
  TRUE_EXPRESSION,
  VOID_EXPRESSION,
  VOID_TYPE,
} from "./constants";
import { Expression } from "./types";

const isIntMatch = /^-?\d+$/;
const isFloatMatch = /^-?\d+\.\d+$/;
const isStringMatch = /^\".+\"$/;

export const evaluateValue = (script: string): Expression => {
  script = script.trim();
  if (script === TRUE_EXPRESSION) {
    return {
      value: true,
      clType: BOOLEAN_TYPE,
    };
  } else if (script === FALSE_EXPRESSION) {
    return {
      value: false,
      clType: BOOLEAN_TYPE,
    };
  } else if (script === VOID_EXPRESSION) {
    return {
      value: undefined,
      clType: VOID_TYPE,
    };
  } else if (isIntMatch.test(script)) {
    return {
      value: parseInt(script),
      clType: INT_TYPE,
    };
  } else if (isFloatMatch.test(script)) {
    return {
      value: parseFloat(script),
      clType: FLOAT_TYPE,
    };
  } else if (isStringMatch.test(script)) {
    return {
      value: script.substring(1, script.length - 1),
      clType: STRING_TYPE,
    };
  } else {
    return {
      value: undefined,
      clType: ERROR_TYPE,
    };
  }
};
