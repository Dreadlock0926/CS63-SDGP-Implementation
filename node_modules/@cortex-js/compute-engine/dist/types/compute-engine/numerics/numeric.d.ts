/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { BoxedExpression } from '../public';
export declare const MACHINE_PRECISION_BITS = 53;
export declare const MACHINE_PRECISION: number;
export declare const MACHINE_TOLERANCE_BITS = 7;
export declare const MACHINE_TOLERANCE: number;
export declare const NUMERIC_TOLERANCE: number;
export declare const SMALL_INTEGER = 1000000;
export declare const MAX_ITERATION = 1000000;
export declare const MAX_SYMBOLIC_TERMS = 200;
/**
 * Returns the smallest floating-point number greater than x.
 * Denormalized values may not be supported.
 */
export declare function nextUp(x: number): number;
export declare function nextDown(x: number): number;
export declare const SMALL_PRIMES: Set<number>;
export declare const LARGEST_SMALL_PRIME = 7919;
export declare function primeFactors(n: number): {
    [factor: number]: number;
};
/** Return `[factor, root]` such that
 * pow(n, 1/exponent) = factor * pow(root, 1/exponent)
 *
 * factorPower(75, 2) -> [5, 3] = 5^2 * 3
 *
 */
export declare function factorPower(n: number, exponent: number): [factor: number, root: number];
export declare function gcd(a: number, b: number): number;
export declare function lcm(a: number, b: number): number;
export declare function factorial(n: number): number;
export declare function factorial2(n: number): number;
export declare function gammaln(z: number): number;
export declare function gamma(z: number): number;
export declare function asFloat(expr: BoxedExpression | undefined): number | null;
export declare function asBignum(expr: BoxedExpression | undefined): Decimal | null;
export declare function asSmallInteger(expr: BoxedExpression | undefined): number | null;
export declare function chop(n: number, tolerance: number): number;
export declare function chop(n: Decimal, tolerance: number): 0 | Decimal;
export declare function chop(n: Complex, tolerance: number): 0 | Complex;
/**
 * An approximation of the gaussian error function, Erf(), using
 * Abramowitz and Stegun approximation.
 *
 * Thoughts for future improvements:
 * - https://math.stackexchange.com/questions/321569/approximating-the-error-function-erf-by-analytical-functions
 * - https://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions

 *
 * References:
 * - NIST: https://dlmf.nist.gov/7.24#i
 */
export declare function erf(x: number): number;
/**
 * Trivial function, used when compiling.
 */
export declare function erfc(x: number): number;
/**
 * Inverse Error Function.
 *
 */
export declare function erfInv(x: number): number;
/**
 * An 8th-order centered difference approximation can be used to get a highly
 * accurate approximation of the first derivative of a function.
 * The formula for the 8th-order centered difference approximation for the
 * first derivative is given by:
 *
 * \[
 * f'(x) \approx \frac{1}{280h} \left[ -f(x-4h) + \frac{4}{3}f(x-3h) - \frac{1}{5}f(x-2h) + \frac{8}{5}f(x-h) - \frac{8}{5}f(x+h) + \frac{1}{5}f(x+2h) - \frac{4}{3}f(x+3h) + f(x+4h) \right]
 * \]
 *
 * Note: Mathematica uses an 8th order approximation for the first derivative
 *
 * f: the function
 * x: the point at which to approximate the derivative
 * h: the step size
 *
 * See https://en.wikipedia.org/wiki/Finite_difference_coefficient
 */
export declare function centeredDiff8thOrder(f: (number: any) => number, x: number, h?: number): number;
/**
 * Return a numerical approximation of the integral
 * of the function `f` from `a` to `b` using Monte Carlo integration.
 *
 * Thoughts for future improvements:
 * - use a MISER algorithm to improve the accuracy
 * - use a stratified sampling to improve the accuracy
 * - use a quasi-Monte Carlo method to improve the accuracy
 * - use a Markov Chain Monte Carlo method to improve the accuracy
 * - use a Metropolis-Hastings algorithm to improve the accuracy
 * - use a Hamiltonian Monte Carlo algorithm to improve the accuracy
 * - use a Gibbs sampling algorithm to improve the accuracy
 *
 *
 * See:
 * - https://64.github.io/monte-carlo/
 *
 */
export declare function monteCarloEstimate(f: (x: number) => number, a: number, b: number, n?: number): number;
/**
 *
 * @param f
 * @param x
 * @param dir Direction of approach: > 0 for right, < 0 for left, 0 for both
 * @returns
 */
export declare function limit(f: (x: number) => number, x: number, dir?: number): number;
export declare function fromRoman(roman: string): [result: number, rest: string];
export declare function fromDigits(s: string, baseInput?: string | number): [result: number, rest: string];
