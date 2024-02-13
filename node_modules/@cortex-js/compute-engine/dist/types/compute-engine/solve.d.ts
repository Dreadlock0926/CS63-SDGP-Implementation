/* 0.22.0 */import { BoxedExpression, Rule, SemiBoxedExpression } from './public';
export declare const UNIVARIATE_ROOTS: Rule[];
/**
 * Expression is a function of a single variable (`x`) or an Equality
 *
 * Return the roots of that variable
 *
 */
export declare function findUnivariateRoots(expr: BoxedExpression, x: string): BoxedExpression[];
/** Expr is an equation with a head of
 * - `Equal`, `Less`, `Greater`, `LessEqual`, `GreaterEqual`
 *
 * Return an expression with the same head, but with the first argument
 * a variable, if possible:
 * `2x < 4` => `x < 2`
 */
export declare function univariateSolve(expr: BoxedExpression, x: string): SemiBoxedExpression[] | null;
export declare const HARMONIZATION_RULES: Rule[];
