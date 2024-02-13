/* 0.22.0 */import { Decimal } from 'decimal.js';
import { IComputeEngine } from '../public';
export declare function gcd(a: Decimal, b: Decimal): Decimal;
export declare function lcm(a: Decimal, b: Decimal): Decimal;
export declare function factorial(ce: IComputeEngine, n: Decimal): Decimal;
export declare function factorial2(ce: IComputeEngine, n: Decimal): Decimal;
export declare function gammaln(ce: IComputeEngine, z: Decimal): Decimal;
export declare function gamma(ce: IComputeEngine, z: Decimal): Decimal;
/**
 * If the exponent of the bignum is in the range of the exponents
 * for machine numbers,return true.
 */
export declare function isInMachineRange(d: Decimal): boolean;
