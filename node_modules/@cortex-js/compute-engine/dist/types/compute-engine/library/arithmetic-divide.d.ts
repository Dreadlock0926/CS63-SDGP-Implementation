/* 0.22.0 */import { BoxedExpression, IComputeEngine } from '../public';
/**
 * Canonical form of 'Divide' (and 'Rational')
 * - remove denominator of 1
 * - simplify the signs
 * - factor out negate (make the numerator and denominator positive)
 * - if numerator and denominator are integer literals, return a rational number
 *   or Rational experssion
 * - if Divide, transform into Multiply/Power
 */
export declare function canonicalDivide(ce: IComputeEngine, op1: BoxedExpression, op2: BoxedExpression): BoxedExpression;
/**
 * Simplify form of 'Divide' (and 'Rational')
 */
export declare function simplifyDivide(ce: IComputeEngine, op1: BoxedExpression, op2: BoxedExpression): BoxedExpression | undefined;
