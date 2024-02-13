/* 0.22.0 */import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, IComputeEngine, EvaluateOptions, NOptions, BoxedRuleSet, SemiBoxedExpression, SimplifyOptions, ReplaceOptions, Substitution, Metadata, PatternMatchOptions, BoxedDomain, BoxedSubstitution } from '../public';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * BoxedDictionary
 */
export declare class BoxedDictionary extends _BoxedExpression {
    private _value;
    private _isCanonical;
    constructor(ce: IComputeEngine, dict: {
        [key: string]: SemiBoxedExpression;
    } | Map<string, BoxedExpression>, options?: {
        canonical?: boolean;
        metadata?: Metadata;
    });
    bind(): void;
    reset(): undefined;
    get hash(): number;
    get complexity(): number;
    get head(): 'Dictionary';
    get isPure(): boolean;
    getKey(key: string): BoxedExpression | undefined;
    hasKey(key: string): boolean;
    get keys(): IterableIterator<string>;
    get keysCount(): number;
    has(x: string | string[]): boolean;
    get domain(): BoxedDomain;
    get json(): Expression;
    /** Structural equality */
    isSame(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, _options?: PatternMatchOptions): BoxedSubstitution | null;
    /** Mathematical equality */
    isEqual(rhs: BoxedExpression): boolean;
    evaluate(_options?: EvaluateOptions): BoxedExpression;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get canonical(): BoxedExpression;
    simplify(_options?: SimplifyOptions): BoxedExpression;
    N(_options?: NOptions): BoxedExpression;
    replace(rules: BoxedRuleSet, options?: ReplaceOptions): null | BoxedExpression;
    subs(sub: Substitution, options?: {
        canonical: boolean;
    }): BoxedExpression;
}
