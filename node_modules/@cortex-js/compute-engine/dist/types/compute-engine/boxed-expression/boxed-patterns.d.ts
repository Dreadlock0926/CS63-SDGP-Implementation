/* 0.22.0 */import { Expression } from '../../math-json/math-json-format';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedExpression, BoxedSubstitution, BoxedDomain, IComputeEngine, LatexString, Metadata, Pattern, PatternMatchOptions, SemiBoxedExpression, Substitution } from '../public';
export declare class BoxedPattern extends _BoxedExpression implements Pattern {
    _pattern: BoxedExpression;
    constructor(ce: IComputeEngine, pattern: LatexString | SemiBoxedExpression, metadata?: Metadata);
    get hash(): number;
    reset(): void;
    get json(): Expression;
    get head(): string | BoxedExpression;
    get domain(): BoxedDomain;
    get isCanonical(): boolean;
    set isCanonical(_val: boolean);
    isSame(rhs: BoxedExpression): boolean;
    isEqual(rhs: BoxedExpression): boolean;
    match(expr: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    test(expr: BoxedExpression, options?: PatternMatchOptions): boolean;
    count(exprs: Iterable<BoxedExpression>, options?: PatternMatchOptions): number;
    subs(sub: Substitution, options?: {
        canonical: boolean;
    }): BoxedExpression;
}
