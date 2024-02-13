/* 0.22.0 */import { BoxedExpression, BoxedFunctionDefinition, BoxedSymbolDefinition, BoxedDomain, DomainExpression, IComputeEngine, RuntimeScope, SemiBoxedExpression, SymbolDefinition, NumericFlags } from '../public';
/**
 * ## THEORY OF OPERATIONS
 *
 * - The value or domain of a constant cannot be changed.
 * - If set explicitly, the value is the source of truth: it overrides any
 *  flags.
 * - Once the domain has been set, it can only be changed from a numeric domain
 * to another numeric domain (some expressions may have been validated with
 * assumptions that the domain was numeric).
 * - When the domain is changed, the value is preserved if it is compatible
 *  with the new domain, otherwise it is reset to no value. Flags are adjusted
 * to match the domain (discarded if not a numeric domain).
 * - When the value is changed, the domain is unaffected. If the value is not
 *  compatible with the domain (setting a def with a numeric domain to a value
 *  of `True` for example), the value is discarded.
 * - When getting a flag, if a value is available, it is the source of truth.
 * Otherwise, the stored flags are (the stored flags are also set when the domain is changed)
 *
 */
export declare class _BoxedSymbolDefinition implements BoxedSymbolDefinition {
    readonly name: string;
    wikidata?: string;
    description?: string | string[];
    url?: string;
    private _engine;
    readonly scope: RuntimeScope | undefined;
    private _defValue?;
    private _value;
    private _domain;
    inferredDomain: boolean;
    private _flags;
    constant: boolean;
    holdUntil: 'never' | 'simplify' | 'evaluate' | 'N';
    prototype?: BoxedFunctionDefinition;
    self?: unknown;
    constructor(ce: IComputeEngine, name: string, def: SymbolDefinition);
    /** The symbol was previously inferred, but now it has a declaration. Update the def accordingly (we can't replace defs, as other expressions may be referencing them) */
    update(def: SymbolDefinition): void;
    reset(): void;
    get value(): BoxedExpression | undefined;
    set value(val: SemiBoxedExpression | number | undefined);
    get domain(): BoxedDomain | undefined;
    set domain(domain: BoxedDomain | DomainExpression | undefined);
    get number(): boolean | undefined;
    set number(val: boolean | undefined);
    get integer(): boolean | undefined;
    set integer(val: boolean | undefined);
    get rational(): boolean | undefined;
    set rational(val: boolean | undefined);
    get algebraic(): boolean | undefined;
    set algebraic(val: boolean | undefined);
    get real(): boolean | undefined;
    set real(val: boolean | undefined);
    get extendedReal(): boolean | undefined;
    set extendedReal(val: boolean | undefined);
    get complex(): boolean | undefined;
    set complex(val: boolean | undefined);
    get extendedComplex(): boolean | undefined;
    set extendedComplex(val: boolean | undefined);
    get imaginary(): boolean | undefined;
    set imaginary(val: boolean | undefined);
    get positive(): boolean | undefined;
    set positive(val: boolean | undefined);
    get nonPositive(): boolean | undefined;
    set nonPositive(val: boolean | undefined);
    get negative(): boolean | undefined;
    set negative(val: boolean | undefined);
    get nonNegative(): boolean | undefined;
    set nonNegative(val: boolean | undefined);
    get zero(): boolean | undefined;
    set zero(val: boolean | undefined);
    get notZero(): boolean | undefined;
    set notZero(val: boolean | undefined);
    get one(): boolean | undefined;
    set one(val: boolean | undefined);
    get negativeOne(): boolean | undefined;
    set negativeOne(val: boolean | undefined);
    get infinity(): boolean | undefined;
    set infinity(val: boolean | undefined);
    get finite(): boolean | undefined;
    set finite(val: boolean | undefined);
    get NaN(): boolean | undefined;
    set NaN(val: boolean | undefined);
    get even(): boolean | undefined;
    set even(val: boolean | undefined);
    get odd(): boolean | undefined;
    set odd(val: boolean | undefined);
    get prime(): boolean | undefined;
    set prime(val: boolean | undefined);
    get composite(): boolean | undefined;
    set composite(val: boolean | undefined);
    updateFlags(flags: Partial<NumericFlags>): void;
}
export declare function domainToFlags(dom: BoxedDomain | undefined | null): Partial<NumericFlags>;
