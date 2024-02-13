/* 0.22.0 */import { BoxedExpression, SemiBoxedExpression } from '../public';
/**
 * Coefficient of a univariate (single variable) polynomial.
 *
 * The first element is a constant.
 * The second element is the coefficient of the variable.
 * The third element is the coefficient of the variable squared.
 * ...etc
 *
 * `3x^3 + 5x + √5 + 2` -> ['√5 + 2', 5, null, 3]
 *
 * If a coefficient does not apply (there are no corresponding term), it is `null`.
 *
 */
export type UnivariateCoefficients = (null | BoxedExpression)[];
export type MultivariateCoefficients = (null | (null | BoxedExpression)[])[];
/**
 * Return a list of coefficient of powers of `vars` in `poly`,
 * starting with power 0.
 *
 * If `poly`  is not a polynomial, return `null`.
 */
export declare function coefficients(poly: BoxedExpression, vars: string): UnivariateCoefficients | null;
export declare function coefficients(poly: BoxedExpression, vars: string[]): MultivariateCoefficients | null;
/**
 * Return a polynomial expression of `vars` with coefficient
 * of powers `coefs`.
 *
 * `poly === polynomial(coefficients(poly), getVars(poly))`
 *
 */
export declare function polynomial(coefs: UnivariateCoefficients, vars: string): SemiBoxedExpression;
export declare function polynomial(coefs: MultivariateCoefficients, vars: string[]): SemiBoxedExpression;
/**
 * The total degree of an expression is the sum of the
 * of the positive integer degrees of the factors in the expression:
 *
 * `3√2x^5y^3` -> 8 (5 + 3)
 */
export declare function totalDegree(expr: BoxedExpression): number;
/**
 * The max degree of an expression is the largest positive integer degree
 * in the factors of the expression
 *
 * `3√2x^5y^3` -> 5
 *
 */
export declare function maxDegree(expr: BoxedExpression): number;
/**
 * Return a lexicographic key of the expression
 */
export declare function lex(expr: BoxedExpression): string;
