/* 0.22.0 */export type { Attributes, Expression, MathJsonNumber, MathJsonSymbol, MathJsonString, MathJsonFunction, MathJsonDictionary, } from './math-json/math-json-format';
export { isSymbolObject, isStringObject, isFunctionObject, isDictionaryObject, stringValue as getStringValue, head, headName, symbol, applyRecursively, mapArgs, op, nops, dictionary as getDictionary, } from './math-json/utils';
export declare const version = "0.22.0";
