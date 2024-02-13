/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { IComputeEngine, SemiBoxedExpression, BoxedExpression, Metadata, Rational, CanonicalForm } from '../public';
import { MathJsonNumber } from '../../math-json/math-json-format';
/**
 * ## THEORY OF OPERATIONS
 *
 * 1/ Boxing does not depend on the numeric mode. The numeric mode could be
 * changed later, but the previously boxed numbers could not be retroactively
 * upgraded.
 *
 * The `numericMode` is taken into account only during evaluation.
 *
 * Therefore, a boxed expression may contain a mix of number representations.
 *
 * 2/ The result of boxing is canonical by default.
 *
 * This is the most common need (i.e. as soon as you want to evaluate an
 * expression you need a canonical expression). Creating a boxed expression
 * which is canonical from the start avoid going through an intermediary step
 * with a non-canonical expression.
 *
 * 3/ When boxing (and canonicalizing), if the function is "scoped", a new
 *    scope is created before the canonicalization, so that any declaration
 *    are done within that scope. Example of scoped functions include `Block`
 *    and `Sum`.
 *
 * 4/ When implementing an `evaluate()`:
 * - if `bignumPreferred()` all operations should be done in bignum and complex,
 *    otherwise, they should all be done in machine numbers and complex.
 * - if not `complexAllowed()`, return `NaN` if a complex value is encountered
 * - if a `Sqrt` (of a rational) is encountered, preserve it
 * - if a `hold` constant is encountered, preserve it
 * - if a rational is encountered, preserve it
 * - if one of the arguments is not exact, return an approximation
 *
 * EXACT
 * - 2 + 5 -> 7
 * - 2 + 5/7 -> 19/7
 * - 2 + √2 -> 2 + √2
 * - 2 + √(5/7) -> 2 + √(5/7)
 * - 5/7 + 9/11 -> 118/77
 * - 5/7 + √2 -> 5/7 + √2
 * - 10/14 + √(18/9) -> 5/7 + √2
 * - √2 + √5 -> √2 + √5
 * - √2 + √2 -> 2√2
 * - sin(2) -> sin(2)
 * - sin(pi/3) -> √3/2
 *
 * APPROXIMATE
 * - 2 + 2.1 -> 4.1
 * - 2 + √2.1 -> 3.44914
 * - 5/7 + √2.1 -> 2.16342
 * - sin(2) + √2.1 -> 2.35844
 */
/**
 * Return a boxed number representing `num`.
 *
 * Note: `boxNumber()` should only be called from `ce.number()` in order to
 * benefit from number expression caching.
 */
export declare function boxNumber(ce: IComputeEngine, num: MathJsonNumber | number | string | Complex | Decimal | Rational | [Decimal, Decimal], options?: {
    metadata?: Metadata;
    canonical?: boolean;
}): BoxedExpression | null;
/**
 * Given a head and a set of arguments, return a boxed function expression.
 *
 * If available, preserve LaTeX and wikidata metadata in the boxed expression.
 *
 * Note that `boxFunction()` should only be called from `ce.fn()` or `box()`
 */
export declare function boxFunction(ce: IComputeEngine, head: string, ops: SemiBoxedExpression[], options: {
    metadata?: Metadata;
    canonical?: boolean;
}): BoxedExpression;
/**
 * Notes about the boxed form:
 *
 * [1] Expression with a head of `Number`, `String`, `Symbol` and `Dictionary`
 *      are converted to the corresponding atomic expression.
 *
 * [2] Expressions with a head of `Complex` are converted to a (complex) number
 *     or a `Add`/`Multiply` expression.
 *
 *     The precedence of `Complex` (for serialization) is sometimes the
 *     precedence of `Add` (when re and im != 0), sometimes the precedence of
 *    `Multiply` (when im or re === 0). Using a number or an explicit
 *    `Add`/`Multiply` expression avoids this ambiguity.
 *
 * [3] An expression with a `Rational` head is converted to a rational number.
 *    if possible, to a `Divide` otherwise.
 *
 * [4] A `Negate` function applied to a number literal is converted to a number.
 *
 *
 * Note that `Negate` is only distributed over addition. In practice, having
 * `Negate` factored on multiply/divide is more useful to detect patterns.
 *
 * Note that the `box()` function should only be called from `ce.box()`
 *
 */
export declare function box(ce: IComputeEngine, expr: null | undefined | Decimal | Complex | Rational | SemiBoxedExpression, options?: {
    canonical?: boolean | CanonicalForm | CanonicalForm[];
}): BoxedExpression;
