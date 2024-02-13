/* 0.22.0 */import Decimal from 'decimal.js';
export declare function bigint(a: Decimal | number | bigint | string): bigint;
export declare function gcd(a: bigint, b: bigint): bigint;
export declare function lcm(a: bigint, b: bigint): bigint;
export declare function primeFactors(d: bigint): Map<bigint, number>;
/** Return `[factor, root]` such that
 * pow(n, 1/exponent) = factor * pow(root, 1/exponent)
 *
 * factorPower(75, 2) -> [5, 3] = 5^2 * 3
 *
 */
export declare function factorPower(n: bigint, exponent: number): [factor: bigint, root: bigint];
