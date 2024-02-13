/* 0.22.0 */import { BoxedExpression, IComputeEngine, Rule, BoxedRuleSet, ReplaceOptions, BoxedSubstitution } from './public';
/**
 * For each rules in the rule set that match, return the `replace` of the rule
 *
 * @param rules
 */
export declare function matchRules(expr: BoxedExpression, rules: BoxedRuleSet, sub: BoxedSubstitution): BoxedExpression[];
/**
 * Create a boxed rule set from a non-boxed rule set
 * @param ce
 * @param rs
 * @returns
 */
export declare function boxRules(ce: IComputeEngine, rs: Iterable<Rule>): BoxedRuleSet;
/**
 * Apply the rules in the ruleset and return a modified expression.
 *
 * If no rule applied, return `null`.
 */
export declare function replace(expr: BoxedExpression, ruleSet: BoxedRuleSet, options?: ReplaceOptions): BoxedExpression | null;
