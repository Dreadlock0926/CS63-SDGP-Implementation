/* 0.22.0 */import { BoxedExpression } from '../public';
/**
 * Assume the caller has setup a scope. The index
 * variable will be declared in that scope.
 *
 * @param indexingSet
 *
 */
export declare function canonicalIndexingSet(indexingSet: BoxedExpression | undefined): BoxedExpression | undefined;
/**
 * IndexingSet is an expression describing an index variable
 * and a range of values for that variable.
 *
 * This can take several valid forms:
 * - a symbol, e.g. `n`, the upper and lower bounds are assumed ot be infinity
 * - a tuple, e.g. `["Pair", "n", 1]` or `["Tuple", "n", 1, 10]` with one or two bounds
 *
 * The result is a normalized version that includes the
 * index, the lower and upper bounds of the range, and
 * a flag indicating whether the range is finite.
 * @param limits
 * @returns
 */
export declare function normalizeIndexingSet(limits: BoxedExpression | undefined): [
    index: string | undefined,
    lower: number,
    upper: number,
    isFinite: boolean
];
