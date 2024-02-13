/* 0.22.0 */import { AssumeResult, BoxedExpression } from './public';
/**
 * Add an assumption, in the form of a predicate, for example:
 *
 * - `x = 5`
 * - `x ∈ ℕ`
 * - `x > 3`
 * - `x + y = 5`
 *
 * Some assumptions are handled separately, specifically, those that can
 * be represented as a symbol definition (equality to an expression,
 * membership to Integers, RealNumbers, etc..., >0, <=0, etc...). The result
 * of these are stored directly in the current scope's symbols dictionary
 * (and an entry for the symbol is created if necessary).
 *
 * New assumptions can 'refine' previous assumptions, that is they are valid
 * if they don't contradict previous assumptions. To set new assumptions
 * that contradict previous ones, you must first `forget` about any symbols
 * in the new assumption.
 *
 * Predicates that involve multiple symbols are simplified (for example
 * `x + y = 5` becomes `x + y - 5 = 0`, then stored in the `assumptions` of the
 * current context).
 *
 */
export declare function assume(proposition: BoxedExpression): AssumeResult;
