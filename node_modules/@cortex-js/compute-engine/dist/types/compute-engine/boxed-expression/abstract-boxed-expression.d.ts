/* 0.22.0 */import { Complex } from 'complex.js';
import type { Decimal } from 'decimal.js';
import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, BoxedFunctionDefinition, BoxedRuleSet, BoxedSymbolDefinition, BoxedDomain, EvaluateOptions, IComputeEngine, LatexString, Metadata, NOptions, PatternMatchOptions, SimplifyOptions, Substitution, RuntimeScope, DomainCompatibility, DomainLiteral, BoxedBaseDefinition, Rational, BoxedSubstitution } from '../public';
/**
 * _BoxedExpression
 */
export declare abstract class _BoxedExpression implements BoxedExpression {
    abstract readonly hash: number;
    abstract readonly json: Expression;
    abstract readonly head: BoxedExpression | string;
    abstract get isCanonical(): boolean;
    abstract set isCanonical(_val: boolean);
    abstract isSame(rhs: BoxedExpression): boolean;
    abstract isEqual(rhs: BoxedExpression): boolean;
    abstract match(rhs: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    readonly engine: IComputeEngine;
    /** Verbatim LaTeX, obtained from a source, i.e. from parsing,
     *  not generated synthetically
     */
    protected _latex?: string;
    constructor(ce: IComputeEngine, metadata?: Metadata);
    /**
     *
     * `Object.valueOf()`: return a JavaScript primitive value for the expression
     *
     */
    valueOf(): number | any[] | string | boolean;
    /** Object.toString() */
    toString(): string;
    print(): void;
    [Symbol.toPrimitive](hint: 'number' | 'string' | 'default'): number | string | null;
    /** Called by `JSON.stringify()` when serializing to json */
    toJSON(): Expression;
    /** @internal */
    get rawJson(): Expression;
    get scope(): RuntimeScope | null;
    /** Object.is() */
    is(rhs: any): boolean;
    get latex(): LatexString;
    set latex(val: LatexString);
    get symbol(): string | null;
    get isNothing(): boolean;
    get string(): string | null;
    getSubexpressions(head: string): BoxedExpression[];
    get subexpressions(): BoxedExpression[];
    get symbols(): string[];
    get unknowns(): string[];
    get freeVariables(): string[];
    get errors(): BoxedExpression[];
    get ops(): null | BoxedExpression[];
    get nops(): number;
    get op1(): BoxedExpression;
    get op2(): BoxedExpression;
    get op3(): BoxedExpression;
    get isValid(): boolean;
    get isPure(): boolean;
    get isExact(): boolean;
    /** For a symbol, true if the symbol is a constant (unchangeable value) */
    get isConstant(): boolean;
    get canonical(): BoxedExpression;
    subs(_sub: Substitution, options?: {
        canonical: boolean;
    }): BoxedExpression;
    solve(_vars: Iterable<string>): null | BoxedExpression[];
    replace(_rules: BoxedRuleSet): null | BoxedExpression;
    has(_v: string | string[]): boolean;
    get isNaN(): boolean | undefined;
    get isZero(): boolean | undefined;
    get isNotZero(): boolean | undefined;
    get isOne(): boolean | undefined;
    get isNegativeOne(): boolean | undefined;
    get isInfinity(): boolean | undefined;
    get isFinite(): boolean | undefined;
    get isEven(): boolean | undefined;
    get isOdd(): boolean | undefined;
    get isPrime(): boolean | undefined;
    get isComposite(): boolean | undefined;
    get numericValue(): number | Decimal | Complex | Rational | null;
    get shape(): number[];
    get rank(): number;
    get sgn(): -1 | 0 | 1 | undefined | null;
    isLess(_rhs: BoxedExpression): boolean | undefined;
    isLessEqual(_rhs: BoxedExpression): boolean | undefined;
    isGreater(_rhs: BoxedExpression): boolean | undefined;
    isGreaterEqual(_rhs: BoxedExpression): boolean | undefined;
    get isPositive(): boolean | undefined;
    get isNonNegative(): boolean | undefined;
    get isNegative(): boolean | undefined;
    get isNonPositive(): boolean | undefined;
    isCompatible(_dom: BoxedDomain | DomainLiteral, _kind?: DomainCompatibility): boolean;
    get description(): string[] | undefined;
    get url(): string | undefined;
    get wikidata(): string | undefined;
    get complexity(): number | undefined;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get symbolDefinition(): BoxedSymbolDefinition | undefined;
    get functionDefinition(): BoxedFunctionDefinition | undefined;
    infer(_domain: BoxedDomain): boolean;
    bind(): void;
    reset(): void;
    get keys(): IterableIterator<string> | null;
    get keysCount(): number;
    getKey(_key: string): BoxedExpression | undefined;
    hasKey(_key: string): boolean;
    get value(): number | boolean | string | number[] | undefined;
    set value(_value: BoxedExpression | number | boolean | string | number[] | undefined);
    get domain(): BoxedDomain | undefined;
    set domain(_domain: BoxedDomain);
    get isNumber(): boolean | undefined;
    get isInteger(): boolean | undefined;
    get isRational(): boolean | undefined;
    get isAlgebraic(): boolean | undefined;
    get isReal(): boolean | undefined;
    get isExtendedReal(): boolean | undefined;
    get isComplex(): boolean | undefined;
    get isImaginary(): boolean | undefined;
    get isExtendedComplex(): boolean | undefined;
    simplify(_options?: SimplifyOptions): BoxedExpression;
    evaluate(_options?: EvaluateOptions): BoxedExpression;
    N(_options?: NOptions): BoxedExpression;
    compile(to?: string, options?: {
        optimize: ('simplify' | 'evaluate')[];
    }): ((args: Record<string, any>) => any | undefined) | undefined;
}
