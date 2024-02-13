/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, BoxedDomain, IComputeEngine, Metadata, NOptions, PatternMatchOptions, Rational, SimplifyOptions, BoxedSubstitution, EvaluateOptions } from '../public';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * BoxedNumber
 */
export declare class BoxedNumber extends _BoxedExpression {
    protected readonly _value: number | Decimal | Complex | Rational;
    private _domain;
    private _hash;
    protected _isCanonical: boolean;
    /**
     * By the time the constructor is called, the `value` should have been
     * screened for cases where it's a well-known value (0, NaN, +Infinity,
     * etc...) or non-normal (complex number with im = 0, rational with
     * denom = 1, etc...).
     *
     * This is done in `ce.number()`. In general, use `ce.number()` rather
     * than calling this constructor directly.
     *
     * We may store as a machine number if a Decimal is passed that is in machine
     * range
     */
    constructor(ce: IComputeEngine, value: number | Decimal | Complex | Rational, options?: {
        metadata?: Metadata;
        canonical?: boolean;
    });
    get hash(): number;
    get head(): string;
    get isPure(): boolean;
    get isExact(): boolean;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get complexity(): number;
    get numericValue(): number | Decimal | Complex | Rational;
    get domain(): BoxedDomain;
    get json(): Expression;
    get sgn(): -1 | 0 | 1 | undefined | null;
    isSame(rhs: BoxedExpression): boolean;
    isEqual(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    /** Compare this with another BoxedNumber.
     * `rhs` must be a BoxedNumber. Use `isEqualWithTolerance(rhs.N())`
     * if necessary.
     */
    isEqualWithTolerance(rhs: BoxedExpression, tolerance: number): boolean;
    isLess(rhs: BoxedExpression): boolean | undefined;
    isLessEqual(rhs: BoxedExpression): boolean | undefined;
    isGreater(rhs: BoxedExpression): boolean | undefined;
    isGreaterEqual(rhs: BoxedExpression): boolean | undefined;
    /** x > 0, same as `isGreater(0)` */
    get isPositive(): boolean | undefined;
    /** x >= 0, same as `isGreaterEqual(0)` */
    get isNonNegative(): boolean | undefined;
    /** x < 0, same as `isLess(0)` */
    get isNegative(): boolean | undefined;
    /** x <= 0, same as `isLessEqual(0)` */
    get isNonPositive(): boolean | undefined;
    get isZero(): boolean;
    get isNotZero(): boolean;
    get isOne(): boolean;
    get isNegativeOne(): boolean;
    get isOdd(): boolean | undefined;
    get isEven(): boolean | undefined;
    get isPrime(): boolean | undefined;
    get isComposite(): boolean | undefined;
    get isInfinity(): boolean;
    get isNaN(): boolean;
    get isFinite(): boolean;
    get isNumber(): true;
    get isInteger(): boolean;
    get isRational(): boolean;
    get isAlgebraic(): boolean | undefined;
    get isReal(): boolean;
    get isExtendedReal(): boolean;
    get isComplex(): boolean | undefined;
    get isImaginary(): boolean | undefined;
    get isExtendedComplex(): boolean | undefined;
    get canonical(): BoxedExpression;
    simplify(_options?: SimplifyOptions): BoxedExpression;
    evaluate(options?: EvaluateOptions): BoxedExpression;
    N(_options?: NOptions): BoxedExpression;
}
