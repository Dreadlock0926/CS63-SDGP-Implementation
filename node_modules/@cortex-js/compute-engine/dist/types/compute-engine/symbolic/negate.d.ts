/* 0.22.0 */import { BoxedExpression, IComputeEngine, Metadata } from '../public';
/**
 * Distribute `Negate` (multiply by -1) if expr is a number literal, an
 * addition or multiplication or another `Negate`.
 *
 * It is important to do all these to handle cases like
 * `-3x` -> ["Negate, ["Multiply", 3, "x"]] -> ["Multiply, -3, x]
 */
export declare function canonicalNegate(expr: BoxedExpression, metadata?: Metadata): BoxedExpression;
export declare function processNegate(_ce: IComputeEngine, x: BoxedExpression, _mode?: 'simplify' | 'evaluate' | 'N'): BoxedExpression;
