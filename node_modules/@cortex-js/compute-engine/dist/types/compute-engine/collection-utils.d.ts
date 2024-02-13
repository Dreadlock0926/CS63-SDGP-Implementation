/* 0.22.0 */import { BoxedExpression } from './public';
export declare function isCollection(col: BoxedExpression): boolean;
export declare function isFiniteCollection(col: BoxedExpression): boolean;
export declare function isIndexableCollection(col: BoxedExpression): boolean;
export declare function isFiniteIndexableCollection(col: BoxedExpression): boolean;
/**
 *
 * Iterate over all the elements of a collection. If not a collection,
 * return the expression.
 *
 * The `col` argument is either a collection literal, or a symbol
 * whose value is a collection literal.
 *
 * Even infinite collections are iterable. Use `isFiniteCollection()`
 * to check if the collection is finite.
 *
 * The collection can have one of the following forms:
 * - `["Range"]`, `["Interval"]`, `["Linspace"]` expressions
 * - `["List"]` and `["Set"]` expressions
 * - `["Tuple"]`, `["Pair"]`, `["Pair"]`, `["Triple"]` expressions
 * - `["Sequence"]` expressions
 * ... and more
 *
 * In general, `each` is easier to use than `iterator`, but they do the same
 * thing.
 *
 * @param col - A potential collection
 *
 * @returns
 */
export declare function each(col: BoxedExpression): Generator<BoxedExpression>;
/**
 *
 * The `col` argument is either a collection literal, or a symbol
 * whose value is a collection literal.
 *
 * @returns
 */
export declare function length(col: BoxedExpression): number | undefined;
/**
 *
 * @param expr
 * @param index 1-based index
 * @returns
 */
export declare function at(expr: BoxedExpression, index: number): BoxedExpression | undefined;
