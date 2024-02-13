/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { BoxedExpression, Hold, Rational } from '../public';
/**
 * Return a rational coef and constant such that `coef * mod + constant = expr`
 */
/**
 * Return a coef, term and constant such that:
 *
 * `coef * term + constant = expr`
 *
 * Return null if no `coef`/`constant` can be found.
 */
/**
 * Apply the operator `op` to the left-hand-side and right-hand-side
 * expression. Applies the associativity rule specified by the definition,
 * i.e. 'op(a, op(b, c))` -> `op(a, b, c)`, etc...
 *
 */
export declare function applyAssociativeOperator(op: string, lhs: BoxedExpression, rhs: BoxedExpression, associativity?: 'right' | 'left' | 'non' | 'both'): BoxedExpression;
export declare function makePositive(expr: BoxedExpression): [sign: number, expr: BoxedExpression];
export declare function apply(expr: BoxedExpression, fn: (x: number) => number | Complex, bigFn?: (x: Decimal) => Decimal | Complex | number, complexFn?: (x: Complex) => number | Complex): number | Decimal | Complex;
export declare function applyN(expr: BoxedExpression, fn: (x: number) => number | Complex, bigFn?: (x: Decimal) => Decimal | Complex | number, complexFn?: (x: Complex) => number | Complex): BoxedExpression | undefined;
export declare function apply2(expr1: BoxedExpression, expr2: BoxedExpression, fn: (x1: number, x2: number) => number | Complex | Rational, bigFn?: (x1: Decimal, x2: Decimal) => Decimal | Complex | Rational | number, complexFn?: (x1: Complex, x2: number | Complex) => Complex | number): number | Decimal | Complex | Rational;
export declare function apply2N(expr1: BoxedExpression, expr2: BoxedExpression, fn: (x1: number, x2: number) => number | Complex | Rational, bigFn?: (x1: Decimal, x2: Decimal) => Decimal | Complex | number | Rational, complexFn?: (x1: Complex, x2: number | Complex) => Complex | number): BoxedExpression | undefined;
export declare function shouldHold(skip: Hold, count: number, index: number): boolean;
export declare function canonical(xs: BoxedExpression[]): BoxedExpression[];
