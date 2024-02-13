/* 0.22.0 */import { BoxedExpression, SemiBoxedExpression } from '../public';
export type Order = 'lex' | 'dexlex' | 'grevlex' | 'elim';
export declare const DEFAULT_COMPLEXITY = 100000;
/**
 * Sort by higher total degree (sum of degree), if tied, sort by max degree,
 * if tied,
 */
export declare function sortAdd(ops: BoxedExpression[]): BoxedExpression[];
/**
 * Given two expressions `a` and `b`, return:
 * - `-1` if `a` should be ordered before `b`
 * - `+1` if `b` should be ordered before `a`
 * - `0` if they have the same order (they are structurally equal)
 *
 * The default order is as follow:
 *
 * 1/ Literal numeric values (rational,  machine numbers and Decimal numbers),
 *  ordered by they numeric value (smaller numbers before larger numbers)
 *
 * 2/ Literal complex numbers, ordered by their real parts. In case of a tie,
 * ordered by the absolute value of their imaginary parts. In case of a tie,
 * ordered by the value of their imaginary parts.
 *
 * 3/ Symbols, ordered by their name as strings
 *
 * 4/ Addition, ordered as a polynom, with higher degree terms first
 *
 * 5/ Other functions, ordered by their `complexity` property. In case
 * of a tie, ordered by the head of the expression as a string. In case of a
 * tie, by the leaf count of each expression. In case of a tie, by the order
 * of each argument, left to right.
 *
 * 6/ Strings, ordered by comparing their Unicode code point values. While this
 * sort order is quick to calculate, it can produce unexpected results, for
 * example "E" < "e" < "È" and "11" < "2". This ordering is not suitable to
 * collate natural language strings.
 *
 * 7/ Dictionaries, ordered by the number of keys. If there is a tie, by the
 * sum of the complexities of the values of the dictionary
 *
 *
 */
export declare function order(a: BoxedExpression, b: BoxedExpression): number;
/** Return a version of the expression with its arguments sorted in
 * canonical order
 */
export declare function canonicalOrder(expr: BoxedExpression, { recursive }: {
    recursive?: boolean;
}): BoxedExpression;
/**
 * Sort the terms of a polynomial expression (`Add` expression) according
 * to the deglex polynomial ordering
 *
 */
export declare function polynomialOrder(expr: BoxedExpression): SemiBoxedExpression;
export declare function lexicographicOrder(expr: BoxedExpression, vars?: string[]): SemiBoxedExpression;
export declare function degreeLexicographicOrder(expr: BoxedExpression, vars?: string[]): SemiBoxedExpression;
export declare function degreeReverseLexicographicOrder(expr: BoxedExpression, vars?: string[]): SemiBoxedExpression;
export declare function eliminationOrder(expr: BoxedExpression, vars?: string[]): SemiBoxedExpression;
