/* 0.22.0 */import { _BoxedExpression } from './abstract-boxed-expression';
import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, BoxedFunctionDefinition, IComputeEngine, NOptions, BoxedRuleSet, SemiBoxedExpression, SimplifyOptions, Substitution, ReplaceOptions, Metadata, PatternMatchOptions, BoxedDomain, RuntimeScope, BoxedSubstitution, EvaluateOptions, BoxedBaseDefinition, Hold } from '../public';
/**
 * A boxed function represent an expression that can be
 * represented by a function call.
 *
 * It is composed of a head (the name of the function) and
 * a list of arguments.
 *
 * It has a definition associated with it, based
 * on the head. The definition contains the signature of the function,
 * and the implementation of the function.
 *
 */
export declare class BoxedFunction extends _BoxedExpression {
    private readonly _head;
    private readonly _ops;
    private _canonical;
    private _scope;
    private _def;
    private _isPure;
    private _result;
    private _hash;
    constructor(ce: IComputeEngine, head: string | BoxedExpression, ops: BoxedExpression[], options?: {
        metadata?: Metadata;
        canonical?: boolean;
    });
    get hash(): number;
    infer(domain: BoxedDomain): boolean;
    bind(): void;
    reset(): void;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get isPure(): boolean;
    get json(): Expression;
    get rawJson(): Expression;
    get scope(): RuntimeScope | null;
    get head(): string | BoxedExpression;
    get ops(): BoxedExpression[];
    get nops(): number;
    get op1(): BoxedExpression;
    get op2(): BoxedExpression;
    get op3(): BoxedExpression;
    get isValid(): boolean;
    get canonical(): BoxedExpression;
    map<T = BoxedExpression>(fn: (x: BoxedExpression) => T): IterableIterator<T>;
    subs(sub: Substitution, options?: {
        canonical?: boolean;
    }): BoxedExpression;
    replace(rules: BoxedRuleSet, options?: ReplaceOptions): BoxedExpression | null;
    has(x: string | string[]): boolean;
    /** `isSame` is structural/symbolic equality */
    isSame(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    get complexity(): number | undefined;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get functionDefinition(): BoxedFunctionDefinition | undefined;
    /** `isEqual` is mathematical equality */
    isEqual(rhs: BoxedExpression): boolean;
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isAlgebraic(): boolean | undefined;
    get isReal(): boolean | undefined;
    get isExtendedReal(): boolean | undefined;
    get isComplex(): boolean | undefined;
    get isImaginary(): boolean | undefined;
    get domain(): BoxedDomain | undefined;
    simplify(options?: SimplifyOptions): BoxedExpression;
    evaluate(options?: EvaluateOptions): BoxedExpression;
    N(options?: NOptions): BoxedExpression;
    solve(vars: string[]): null | BoxedExpression[];
}
export declare function makeCanonicalFunction(ce: IComputeEngine, head: string | BoxedExpression, ops: SemiBoxedExpression[], metadata?: Metadata): BoxedExpression;
/** Apply the function `f` to elements of `xs`, except to the elements
 * described by `skip`:
 * - `all`: don't apply f to any elements
 * - `none`: apply `f` to all elements
 * - `first`: apply `f` to all elements except the first
 * - `rest`: apply `f` to the first element, skip the  others
 * - 'last': apply `f` to all elements except the last
 * - 'most': apply `f` to the last elements, skip the others
 *
 * Account for `Hold`, `ReleaseHold`, `Sequence`, `Symbol` and `Nothing`.
 *
 * If `f` returns `null`, the element is not added to the result
 */
export declare function holdMap(xs: BoxedExpression[], skip: Hold, associativeHead: string, f: (x: BoxedExpression) => BoxedExpression | null): BoxedExpression[];
