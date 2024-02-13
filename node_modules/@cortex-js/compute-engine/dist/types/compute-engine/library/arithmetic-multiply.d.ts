/* 0.22.0 */import { BoxedExpression, IComputeEngine } from '../public';
/** The canonical form of `Multiply`:
 * - remove `1`
 * - combine literal integers and rationals
 * - any arg is literal 0 -> return 0
 * - combine terms with same base
 *    `a a^3` -> `a^4`
 * - simplify the signs:
 *    - i.e. `-y \times -x` -> `x \times y`
 *    - `2 \times -x` -> `-2 \times x`
 *
 * The ops must be canonical, the result is canonical.
 */
export declare function canonicalMultiply(ce: IComputeEngine, ops: BoxedExpression[]): BoxedExpression;
export declare function simplifyMultiply(ce: IComputeEngine, ops: BoxedExpression[]): BoxedExpression;
export declare function evalMultiply(ce: IComputeEngine, ops: BoxedExpression[], mode?: 'N' | 'evaluate'): BoxedExpression | undefined;
export declare function canonicalProduct(ce: IComputeEngine, body: BoxedExpression | undefined, indexingSet: BoxedExpression | undefined): BoxedExpression;
export declare function evalMultiplication(ce: IComputeEngine, expr: BoxedExpression, indexingSet: BoxedExpression | undefined, mode: 'simplify' | 'evaluate' | 'N'): BoxedExpression | undefined;
