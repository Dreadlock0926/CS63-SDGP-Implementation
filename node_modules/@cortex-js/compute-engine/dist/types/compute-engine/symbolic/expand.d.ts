/* 0.22.0 */import { BoxedExpression } from '../public';
export declare function distribute(expr: BoxedExpression[]): BoxedExpression;
/** Use the multinomial theorem (https://en.wikipedia.org/wiki/Multinomial_theorem) to expand the expression.
 * The expression must be a power of a sum of terms.
 * The power must be a positive integer.
 * - expr = '(a + b)^2'
 *     ->  'a^2 + 2ab + b^2'
 * - expr = '(a + b)^3'
 *    -> 'a^3 + 3a^2b + 3ab^2 + b^3'
 */
export declare function expandMultinomial(expr: BoxedExpression): BoxedExpression | null;
/** Apply the distributive law if the expression is a product of sums.
 * For example, a(b + c) = ab + ac
 * Expand the expression if it is a power of a sum.
 * Expand the terms of the expression if it is a sum or negate.
 * If the expression is a fraction, expand the numerator.
 * Return null if the expression cannot be expanded.
 */
export declare function expand(expr: BoxedExpression | undefined): BoxedExpression | null;
