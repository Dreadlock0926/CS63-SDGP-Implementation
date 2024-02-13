/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { BoxedDomain, BoxedFunctionSignature, DomainLiteral, FunctionSignature, IComputeEngine, Rational } from './public';
/**
 * Determine the numeric domain of a number.
 */
export declare function inferNumericDomain(value: number | Decimal | Complex | Rational): DomainLiteral;
/**
 * Extract the parts of a function domain.
 */
export declare function functionDomain(dom: BoxedDomain): [
    params: BoxedDomain[],
    optParams: BoxedDomain[],
    restParam: BoxedDomain | undefined,
    result: BoxedDomain
];
export declare function domainToSignature(dom: BoxedDomain): Partial<FunctionSignature>;
export declare function signatureToDomain(ce: IComputeEngine, sig: BoxedFunctionSignature): BoxedDomain;
