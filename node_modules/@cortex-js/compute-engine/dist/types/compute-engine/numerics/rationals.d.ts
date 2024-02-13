/* 0.22.0 */import { BoxedExpression, Rational } from '../public';
export declare function isRational(x: any | null): x is Rational;
export declare function isMachineRational(x: any | null): x is [number, number];
export declare function isBigRational(x: any | null): x is [bigint, bigint];
export declare function isRationalZero(x: Rational): boolean;
export declare function isRationalOne(x: Rational): boolean;
export declare function isRationalNegativeOne(x: Rational): boolean;
export declare function machineNumerator(x: Rational): number;
export declare function machineDenominator(x: Rational): number;
export declare function isNeg(x: Rational): boolean;
export declare function neg(x: [number, number]): [number, number];
export declare function neg(x: [bigint, bigint]): [bigint, bigint];
export declare function neg(x: Rational): Rational;
export declare function inverse(x: [number, number]): [number, number];
export declare function inverse(x: [bigint, bigint]): [bigint, bigint];
export declare function inverse(x: Rational): Rational;
export declare function asRational(expr: BoxedExpression): Rational | undefined;
/**
 * Add a literal numeric value to a rational.
 * If the rational is a bignum, this is a hint to do the calculation in bignum
 * (no need to check `bignumPreferred()`).
 * @param lhs
 * @param rhs
 * @returns
 */
export declare function add(lhs: Rational, rhs: BoxedExpression | Rational): Rational;
export declare function mul(lhs: Rational, rhs: BoxedExpression | Rational): Rational;
export declare function pow(r: Rational, exp: number): Rational;
export declare function reducedRational(r: [number, number]): [number, number];
export declare function reducedRational(r: [bigint, bigint]): [bigint, bigint];
export declare function reducedRational(r: Rational): Rational;
/** Return a rational approximation of x */
export declare function rationalize(x: number): [n: number, d: number] | number;
/**
 * Attempt to factor a rational coefficient `c` and a `rest` out of a
 * canonical expression `expr` such that `ce.mul(c, rest)` is equal to `expr`.
 *
 * Attempts to make `rest` a positive value (i.e. pulls out negative sign).
 *
 *
 * ['Multiply', 2, 'x', 3, 'a', ['Sqrt', 5]]
 *    -> [[6, 1], ['Multiply', 'x', 'a', ['Sqrt', 5]]]
 *
 * ['Divide', ['Multiply', 2, 'x'], ['Multiply', 3, 'y', 'a']]
 *    -> [[2, 3], ['Divide', 'x', ['Multiply, 'y', 'a']]]
 */
export declare function asCoefficient(expr: BoxedExpression): [coef: Rational, rest: BoxedExpression];
/**
 *
 * @param lhs
 * @param rhs
 * @returns the sign (-1, 0, 1) of the difference between `lhs` and `rhs`
 */
export declare function signDiff(lhs: BoxedExpression, rhs: BoxedExpression, tolerance?: number): -1 | 0 | 1 | undefined;
