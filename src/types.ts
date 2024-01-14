import {
  BOOLEAN_TYPE,
  CHAR_TYPE,
  ERROR_TYPE,
  FLOAT_TYPE,
  INT_TYPE,
  STRING_TYPE,
  UINT_TYPE,
  VOID_TYPE,
} from "./constants";

export type ScriptFunc = (script: string) => string;

export interface FunctionDescription {
  script: string;
  name: string;
  parameters?: string;
  returnType?: string;
  bodyScript: string;
}

export type FunctionSet = { [key: string]: FunctionDescription };

export interface Expression {
  value: any;
  clType: CLType;
}

export interface Variable {
  key: string;
  value: any;
  clType: CLType;
}

export type CLType =
  | typeof BOOLEAN_TYPE
  | typeof CHAR_TYPE
  | typeof ERROR_TYPE
  | typeof FLOAT_TYPE
  | typeof INT_TYPE
  | typeof STRING_TYPE
  | typeof UINT_TYPE
  | typeof VOID_TYPE;
