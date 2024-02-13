/* 0.22.0 */import { BoxedExpression, IComputeEngine } from '../public';
/**
 * Flatten the arguments.
 */
export declare function flattenOps(ops: BoxedExpression[], head: string): BoxedExpression[];
export declare function flattenSequence(xs: BoxedExpression[]): BoxedExpression[];
export declare function flattenDelimiter(ce: IComputeEngine, body: undefined | BoxedExpression): BoxedExpression;
