/* 0.22.0 */import { BoxedExpression, BoxedDomain, IComputeEngine } from '../public';
/** The canonical form of `Add`:
 * - removes `0`
 * - capture complex numbers (a + ib or ai +b)
 * */
export declare function canonicalAdd(ce: IComputeEngine, ops: BoxedExpression[]): BoxedExpression;
export declare function domainAdd(_ce: IComputeEngine, args: (undefined | BoxedDomain)[]): BoxedDomain | null | undefined;
export declare function simplifyAdd(ce: IComputeEngine, args: BoxedExpression[]): BoxedExpression;
export declare function evalAdd(ce: IComputeEngine, ops: BoxedExpression[], mode?: 'N' | 'evaluate'): BoxedExpression;
export declare function canonicalSummation(ce: IComputeEngine, body: BoxedExpression, indexingSet: BoxedExpression | undefined): BoxedExpression;
export declare function evalSummation(ce: IComputeEngine, expr: BoxedExpression, indexingSet: BoxedExpression | undefined, mode: 'simplify' | 'N' | 'evaluate'): BoxedExpression | undefined;
