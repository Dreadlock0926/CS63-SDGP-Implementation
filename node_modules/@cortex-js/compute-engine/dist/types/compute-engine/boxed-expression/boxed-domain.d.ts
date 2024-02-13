/* 0.22.0 */import { Expression } from '../../math-json/math-json-format';
import { BoxedDomain, BoxedExpression, BoxedSubstitution, DomainCompatibility, DomainConstructor, DomainExpression, DomainLiteral, IComputeEngine, Metadata, PatternMatchOptions } from '../public';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * A `_BoxedDomain` is a wrapper around a boxed, canonical, domain
 * expression.
 *
 * It could be an invalid domain, in which case `isValid` is `false`.
 *
 */
export declare class _BoxedDomain extends _BoxedExpression implements BoxedDomain {
    private _hash;
    readonly base: DomainLiteral;
    readonly ctor: DomainConstructor | null;
    readonly params: DomainExpression<Expression>[];
    constructor(ce: IComputeEngine, dom: DomainExpression, metadata?: Metadata);
    /** Boxed domains are always canonical. */
    get isCanonical(): boolean;
    get canonical(): _BoxedDomain;
    get isValid(): boolean;
    get json(): Expression;
    get hash(): number;
    isCompatible(dom: BoxedDomain | DomainLiteral, compatibility?: DomainCompatibility): boolean;
    isEqual(rhs: BoxedExpression): boolean;
    isSame(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, _options?: PatternMatchOptions): BoxedSubstitution | null;
    get head(): string;
    get domain(): BoxedDomain;
    get isFunction(): boolean;
    get isNumeric(): boolean;
}
/** Validate that `expr` is a Domain */
export declare function isDomain(expr: Expression | BoxedExpression | BoxedDomain | DomainExpression): expr is BoxedDomain | DomainExpression;
/** Return the ancestor domain (Least Upper Bound) that is shared by both `a` and `b` */
export declare function widen(a: BoxedDomain | undefined | null, b: BoxedDomain | undefined | null): BoxedDomain | undefined;
export declare function narrow(a: BoxedDomain | undefined, b: BoxedDomain | undefined): BoxedDomain;
