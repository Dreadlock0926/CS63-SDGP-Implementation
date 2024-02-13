/* 0.22.0 */import { BoxedExpression, IComputeEngine, Metadata } from '../public';
/**
 *
 */
export declare function canonicalPower(ce: IComputeEngine, base: BoxedExpression, exponent: BoxedExpression, metadata?: Metadata): BoxedExpression;
export declare function square(ce: IComputeEngine, base: BoxedExpression): BoxedExpression;
export declare function processPower(ce: IComputeEngine, base: BoxedExpression, exponent: BoxedExpression, mode: 'simplify' | 'evaluate' | 'N'): BoxedExpression | undefined;
export declare function processSqrt(ce: IComputeEngine, base: BoxedExpression, mode: 'simplify' | 'evaluate' | 'N'): BoxedExpression | undefined;
