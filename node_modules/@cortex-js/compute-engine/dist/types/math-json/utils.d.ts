/* 0.22.0 */import { Expression, MathJsonFunction, MathJsonNumber, MathJsonString, MathJsonSymbol } from './math-json-format';
export declare const MISSING: Expression;
export declare function isNumberExpression(expr: Expression | null): expr is number | string | MathJsonNumber;
export declare function isNumberObject(expr: Expression | null): expr is MathJsonNumber;
export declare function isSymbolObject(expr: Expression | null): expr is MathJsonSymbol;
export declare function isStringObject(expr: Expression | null): expr is MathJsonString;
export declare function isFunctionObject(expr: Expression | null): expr is MathJsonFunction;
export declare function isDictionaryObject(expr: Expression): expr is MathJsonNumber;
export declare function isValidIdentifier(s: string): boolean;
export declare const ONLY_EMOJIS: RegExp;
export declare function validateIdentifier(s: unknown): 'valid' | 'not-a-string' | 'empty-string' | 'expected-nfc' | 'unexpected-mixed-emoji' | 'unexpected-bidi-marker' | 'unexpected-script' | 'invalid-first-char' | 'invalid-char';
/**  If expr is a string literal, return it.
 *
 * A string literal is a JSON string that begins and ends with
 * **U+0027 APOSTROPHE** : **`'`** or an object literal with a `str` key.
 */
export declare function stringValue(expr: Expression | null | undefined): string | null;
export declare function stripText(expr: Expression | null | undefined): Expression | null;
/**
 * The head of a function can be an identifier or an expression.
 *
 * Return `null` if the expression is not a function.
 *
 * Examples:
 * * `["Negate", 5]`  -> `"Negate"`
 * * `[["Prime", "f"], "x"]` -> `["Prime", "f"]`
 */
export declare function head(expr: Expression | null | undefined): Expression | null;
/** Return the head of an expression, only if it's a string */
export declare function headName(expr: Expression | null): string;
/**
 * Return all the elements but the first one, i.e. the arguments of a
 * function.
 */
export declare function ops(expr: Expression | null | undefined): Expression[] | null;
/** Return the nth argument of a function expression */
export declare function op(expr: Expression | null | undefined, n: number): Expression | null;
export declare function op1(expr: Expression | null | undefined): Expression | null;
export declare function op2(expr: Expression | null | undefined): Expression | null;
export declare function nops(expr: Expression | null | undefined): number;
export declare function unhold(expr: Expression | null | undefined): Expression | null;
export declare function symbol(expr: Expression | null | undefined): string | null;
export declare function dictionary(expr: Expression | null): null | Record<string, Expression>;
/**
 *  CAUTION: `machineValue()` will return a truncated value if the number
 *  has a precision outside of the machine range.
 */
export declare function machineValue(expr: Expression | null | undefined): number | null;
/**
 * Return a rational (numer over denom) representation of the expression,
 * if possible, `null` otherwise.
 *
 * The expression can be:
 * - Some symbols: "Infinity", "Half"...
 * - ["Power", d, -1]
 * - ["Power", n, 1]
 * - ["Divide", n, d]
 *
 * The denominator is always > 0.
 */
export declare function rationalValue(expr: Expression | undefined | null): [number, number] | null;
export declare function applyRecursively<T extends Expression = Expression>(expr: T, fn: (x: T) => T): Expression;
export declare function subs(expr: Expression, s: {
    [symbol: string]: Expression;
}): Expression;
/**
 * Apply a function to the arguments of a function and return an array of T
 */
export declare function mapArgs<T>(expr: Expression, fn: (x: Expression) => T): T[];
/**
 * Apply the operator `op` to the left-hand-side and right-hand-side
 * expression. Applies the associativity rule specified by the definition,
 * i.e. 'op(a, op(b, c))` -> `op(a, b, c)`, etc...
 *
 */
export declare function applyAssociativeOperator(op: string, lhs: Expression, rhs: Expression, associativity?: 'right' | 'left' | 'non' | 'both'): Expression;
/** Return the elements of a sequence, or null if the expression is not a sequence. The sequence can be optionally enclosed by a`["Delimiter"]` expression  */
export declare function getSequence(expr: Expression | null): Expression[] | null;
export declare function isEmptySequence(expr: Expression | null): boolean;
export declare function missingIfEmpty(expr: Expression | null): Expression;
/** The number of leaves (atomic expressions) in the expression */
export declare function countLeaves(expr: Expression | null): number;
