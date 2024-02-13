/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { Expression } from '../../math-json/math-json-format';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedExpression, BoxedRuleSet, BoxedSymbolDefinition, IComputeEngine, EvaluateOptions, NOptions, ReplaceOptions, SimplifyOptions, Substitution, Metadata, PatternMatchOptions, BoxedDomain, RuntimeScope, BoxedFunctionDefinition, BoxedBaseDefinition, DomainExpression, BoxedSubstitution } from '../public';
/**
 * BoxedSymbol
 *
 * A boxed symbol is a reference to a `BoxedSymbolDefinition` or a
 * `BoxedFunctionDefinition`.
 *
 * If a `BoxedSymbolDefinition`, it "owns" all the information
 * about the symbol, its value, domain and various attributes.
 *
 * If a `BoxedFunctionDefinition`, it it a reference to a function name,
 * not a function expression, i.e. `Sin`, not `["Sin", "Pi"]`. This is used
 * for example in `["InverseFunction", "Sin"]`
 */
export declare class BoxedSymbol extends _BoxedExpression {
    private _scope;
    protected _id: string;
    private _hash;
    private _def;
    constructor(ce: IComputeEngine, name: string, options?: {
        metadata?: Metadata;
        canonical?: boolean;
        def?: BoxedSymbolDefinition | BoxedFunctionDefinition;
    });
    get hash(): number;
    get isPure(): boolean;
    get json(): Expression;
    get scope(): RuntimeScope | null;
    get isConstant(): boolean;
    /**
     * Associate a definition with this symbol
     */
    bind(): void;
    reset(): void;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get canonical(): BoxedExpression;
    solve(vars: string[]): null | BoxedExpression[];
    get complexity(): number;
    get head(): string;
    get symbol(): string;
    get isNothing(): boolean;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get symbolDefinition(): BoxedSymbolDefinition | undefined;
    get functionDefinition(): BoxedFunctionDefinition | undefined;
    /**
     * Subsequence inferences will narrow the domain of the symbol.
     * f(:integer), g(:real)
     * g(x) => x:real
     * f(x) => x:integer narrowed from integer to real
     */
    infer(domain: BoxedDomain): boolean;
    get value(): number | boolean | string | number[] | undefined;
    set value(value: boolean | string | Decimal | Complex | {
        re: number;
        im: number;
    } | {
        num: number;
        denom: number;
    } | number[] | BoxedExpression | number | undefined);
    get domain(): BoxedDomain | undefined;
    set domain(inDomain: DomainExpression | BoxedDomain);
    get sgn(): -1 | 0 | 1 | undefined | null;
    has(x: string | string[]): boolean;
    isSame(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, _options?: PatternMatchOptions): BoxedSubstitution | null;
    isEqual(rhs: BoxedExpression): boolean;
    isLess(rhs: BoxedExpression): boolean | undefined;
    isLessEqual(rhs: BoxedExpression): boolean | undefined;
    isGreater(rhs: BoxedExpression): boolean | undefined;
    isGreaterEqual(rhs: BoxedExpression): boolean | undefined;
    get isFunction(): boolean | undefined;
    get isZero(): boolean | undefined;
    get isNotZero(): boolean | undefined;
    get isOne(): boolean | undefined;
    get isNegativeOne(): boolean | undefined;
    get isOdd(): boolean | undefined;
    get isEven(): boolean | undefined;
    get isPrime(): boolean | undefined;
    get isComposite(): boolean | undefined;
    get isInfinity(): boolean | undefined;
    get isNaN(): boolean | undefined;
    get isPositive(): boolean | undefined;
    get isNonPositive(): boolean | undefined;
    get isNegative(): boolean | undefined;
    get isNonNegative(): boolean | undefined;
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isAlgebraic(): boolean | undefined;
    get isReal(): boolean | undefined;
    get isExtendedReal(): boolean | undefined;
    get isComplex(): boolean | undefined;
    get isImaginary(): boolean | undefined;
    simplify(options?: SimplifyOptions): BoxedExpression;
    evaluate(options?: EvaluateOptions): BoxedExpression;
    N(options?: NOptions): BoxedExpression;
    replace(rules: BoxedRuleSet, options?: ReplaceOptions): BoxedExpression | null;
    subs(sub: Substitution, options?: {
        canonical: boolean;
    }): BoxedExpression;
}
export declare function makeCanonicalSymbol(ce: IComputeEngine, name: string): BoxedExpression;
