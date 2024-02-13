/* 0.22.0 */import { Decimal } from 'decimal.js';
import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, IComputeEngine } from '../public';
export declare function isLatexString(s: unknown): s is string;
export declare function latexString(s: unknown): string | null;
/**
 * Return a multiple of the imaginary unit, e.g.
 * - 'ImaginaryUnit'
 * - ['Negate', 'ImaginaryUnit']
 * - ['Negate', ['Multiply', 3, 'ImaginaryUnit']]
 * - ['Multiply', 5, 'ImaginaryUnit']
 * - ['Multiply', 'ImaginaryUnit', 5]
 */
export declare function getImaginaryCoef(expr: BoxedExpression): number | null;
export declare function getSymbols(expr: BoxedExpression, result: Set<string>): void;
/**
 * Return the unknowns in the expression, recursively.
 *
 * An unknown is an identifier (symbol or function) that is not bound
 * to a value.
 *
 */
export declare function getUnknowns(expr: BoxedExpression, result: Set<string>): void;
/**
 * Return the free variables (non local variable) in the expression,
 * recursively.
 *
 * A free variable is an identifier that is not an argument to a function,
 * or a local variable.
 *
 */
export declare function getFreeVariables(expr: BoxedExpression, result: Set<string>): void;
/** Return the local variables in the expression.
 *
 * A local variable is an identifier that is declared with a `Declare`
 * expression in a `Block` expression.
 *
 * Note that the canonical form of a `Block` expression will hoist all
 * `Declare` expressions to the top of the block. `Assign` expressions
 * of undeclared variables will also have a matching `Declare` expressions
 * hoisted.
 *
 */
export declare function getLocalVariables(expr: BoxedExpression, result: Set<string>): void;
export declare function getSubexpressions(expr: BoxedExpression, head: string): BoxedExpression[];
/**
 * For any numeric result, if `bignumPreferred()` is true, calculate using
 * bignums. If `bignumPreferred()` is false, calculate using machine numbers
 */
export declare function bignumPreferred(ce: IComputeEngine): boolean;
/** When result of a numeric evaluation is a complex number,
 * return `NaN` if not `complexallowed()`
 */
export declare function complexAllowed(ce: IComputeEngine): boolean;
/**
 * Assert that `expr` is  in fact canonical.
 *
 * Called for example from within a `canonical` handler.
 *
 * To make an expression whose canonical status is unknown, canonical, call
 * `expr.canonical`.
 */
export declare function asCanonical(expr: BoxedExpression): BoxedExpression;
export declare function hashCode(s: string): number;
export declare function isDictionaryLike(expr: BoxedExpression): boolean;
export declare function getDictionaryLike(expr: BoxedExpression): {
    [key: string]: BoxedExpression;
};
/**
 * If `expr` is a number, return it as a Decimal (it might be
 * in the machine value range or not). Use `isInMachineRange()` to check.
 *
 * Use this instead of `machineValue()` when possible, as `machineValue` will
 * truncate bignums to machine numbers
 */
export declare function bignumValue(ce: IComputeEngine, expr: Expression | null | undefined): Decimal | null;
export declare function bigintValue(ce: IComputeEngine, expr: Expression | null | undefined): bigint | null;
export declare function asBigint(expr: BoxedExpression): bigint | null;
