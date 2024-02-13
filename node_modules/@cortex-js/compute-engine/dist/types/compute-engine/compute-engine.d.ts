/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { Expression, MathJsonNumber } from '../math-json/math-json-format';
import type { LibraryCategory, LatexDictionaryEntry, LatexString, NumberFormattingOptions, ParseLatexOptions, SerializeLatexOptions } from './latex-syntax/public';
import { AssumeResult, BoxedExpression, BoxedFunctionDefinition, BoxedSymbolDefinition, IComputeEngine, IdentifierDefinitions, ExpressionMapInterface, NumericMode, Pattern, RuntimeScope, Scope, SemiBoxedExpression, SymbolDefinition, BoxedRuleSet, Rule, JsonSerializationOptions, ComputeEngineStats, Metadata, BoxedDomain, DomainExpression, FunctionDefinition, Rational, BoxedSubstitution, AssignValue, DomainLiteral, ArrayValue, CanonicalForm } from './public';
/**
 *
 * To use the CortexJS Compute Engine, create a `ComputeEngine` instance, or if using a
 * mathfield, use the default Compute Engine instance from the `MathfieldElement` class: `ce = MathfieldElement.computeEngine`.
 *
 * Use the instance to create boxed expressions with `ce.parse()` and `ce.box()`.
 *
 *
 * ```ts
 * const ce = new ComputeEngine();
 * let expr = ce.parse("e^{i\\pi}");
 * console.log(expr.N().latex);
 * // ➔ "-1"
 *
 * expr = ce.box(["Expand", ["Power", ["Add", "a", "b"], 2]]);
 * console.log(expr.evaluate().latex);
 * // ➔ "a^2 +  2ab + b^2"
 * ```
 */
export declare class ComputeEngine implements IComputeEngine {
    readonly Anything: BoxedDomain;
    readonly Void: BoxedDomain;
    readonly Strings: BoxedDomain;
    readonly Booleans: BoxedDomain;
    readonly Numbers: BoxedDomain;
    readonly True: BoxedExpression;
    readonly False: BoxedExpression;
    readonly Pi: BoxedExpression;
    readonly E: BoxedExpression;
    readonly Nothing: BoxedExpression;
    readonly Zero: BoxedExpression;
    readonly One: BoxedExpression;
    readonly Half: BoxedExpression;
    readonly NegativeOne: BoxedExpression;
    readonly I: BoxedExpression;
    readonly NaN: BoxedExpression;
    readonly PositiveInfinity: BoxedExpression;
    readonly NegativeInfinity: BoxedExpression;
    readonly ComplexInfinity: BoxedExpression;
    /** @internal */
    _BIGNUM_NAN: Decimal;
    /** @internal */
    _BIGNUM_ZERO: Decimal;
    /** @internal */
    _BIGNUM_ONE: Decimal;
    /** @internal */
    _BIGNUM_TWO: Decimal;
    /** @internal */
    _BIGNUM_HALF: Decimal;
    /** @internal */
    _BIGNUM_PI: Decimal;
    /** @internal */
    _BIGNUM_NEGATIVE_ONE: Decimal;
    /** @internal */
    private _precision;
    /** @internal */
    private _numericMode;
    /** @internal */
    private _latexSyntax?;
    /** @internal */
    private _tolerance;
    /** @internal */
    private _bignumTolerance;
    /** @internal */
    private _cache;
    /** @internal */
    private _stats;
    /** @internal */
    private _cost?;
    /** @internal */
    private _jsonSerializationOptions;
    /**
     * During certain operations  (serializing to LaTeX, constructing error
     * messages) we need to use a "raw" JSON serialization without any customization. Setting the `_useRawJsonSerializationOptions` will bypass
     * the `_jsonSerializationOptions` and use `_rawJsonSerializationOptions`
     * instead
     * @internal */
    private _useRawJsonSerializationOptions;
    private _rawJsonSerializationOptions;
    /** @internal */
    private _commonSymbols;
    /** @internal */
    private _commonNumbers;
    /** @internal */
    private _commonDomains;
    /**
     * The current scope.
     *
     * A **scope** stores the definition of symbols and assumptions.
     *
     * Scopes form a stack, and definitions in more recent
     * scopes can obscure definitions from older scopes.
     *
     * The `ce.context` property represents the current scope.
     *
     */
    context: RuntimeScope | null;
    /** In strict mode (the default) the Compute Engine performs
     * validation of domains and signature and may report errors.
     *
     * When strict mode is off, results may be incorrect or generate JavaScript
     * errors if the input is not valid.
     *
     */
    strict: boolean;
    /** Absolute time beyond which evaluation should not proceed.
     * @internal
     */
    deadline?: number;
    /**
     * Return identifier tables suitable for the specified categories, or `"all"`
     * for all categories (`"arithmetic"`, `"algebra"`, etc...).
     *
     * An identifier table defines how the symbols and function names in a
     * MathJSON expression should be interpreted, i.e. how to evaluate and
     * manipulate them.
     *
     */
    static getStandardLibrary(categories?: LibraryCategory[] | LibraryCategory | 'all'): readonly IdentifierDefinitions[];
    /**
     * Construct a new `ComputeEngine` instance.
     *
     * Identifier tables define functions and symbols (in `options.ids`).
     * If no table is provided the MathJSON Standard Library is used (`ComputeEngine.getStandardLibrary()`)
     *
     * The LaTeX syntax dictionary is defined in `options.latexDictionary`.
     *
     * The order of the dictionaries matter: the definitions from the later ones
     * override the definitions from earlier ones. The first dictionary should
     * be the `'core'` dictionary which include some basic definitions such
     * as domains (`Booleans`, `Numbers`, etc...) that are used by later
     * dictionaries.
     *
     * @param options.numericMode The default mode is `"auto"`. Use `"machine"`
     * to perform numeric calculations using 64-bit floats. Use `"bignum"` to
     * perform calculations using arbitrary precision floating point numbers.
     * Use `"auto"` or `"complex"` to allow calculations on complex numbers.
     *
     * @param options.numericPrecision Specific how many digits of precision
     * for the numeric calculations. Default is 100.
     *
     * @param options.tolerance If the absolute value of the difference of two
     * numbers is less than `tolerance`, they are considered equal. Used by
     * `chop()` as well.
     */
    constructor(options?: {
        numericMode?: NumericMode;
        numericPrecision?: number;
        ids?: readonly IdentifierDefinitions[];
        tolerance?: number;
    });
    get latexDictionary(): readonly LatexDictionaryEntry[];
    set latexDictionary(dic: readonly LatexDictionaryEntry[]);
    /** After the configuration of the engine has changed, clear the caches
     * so that new values can be recalculated.
     *
     * This needs to happen for example when the numeric precision changes.
     *
     * @internal
     */
    reset(): void;
    /** @internal */
    _register(_expr: BoxedExpression): void;
    /** @internal */
    _unregister(_expr: BoxedExpression): void;
    get stats(): ComputeEngineStats;
    /** @internal */
    _bignum: Decimal.Constructor;
    /** The precision, or number of significant digits, of numeric
     * calculations when the numeric mode is `"auto"` or `"bignum"`.
     *
     * To make calculations using more digits, at the cost of expanded memory
     * usage and slower computations, set the `precision` higher.
     *
     * If the numeric mode is not `"auto"` or `"bignum"`, it is set to `"auto"`.
     *
     * Trigonometric operations are accurate for precision up to 1,000.
     *
     */
    get precision(): number;
    set precision(p: number | 'machine');
    get numericMode(): NumericMode;
    set numericMode(f: NumericMode);
    /** @experimental */
    get timeLimit(): number;
    /** @experimental */
    get iterationLimit(): number;
    /** @experimental */
    get recursionLimit(): number;
    /**
     * Values smaller than the tolerance are considered to be zero for the
     * purpose of comparison, i.e. if `|b - a| <= tolerance`, `b` is considered
     * equal to `a`.
     */
    get tolerance(): number;
    set tolerance(val: number);
    /** Replace a number that is close to 0 with the exact integer 0.
     *
     * How close to 0 the number has to be to be considered 0 is determined by {@link tolerance}.
     */
    chop(n: number): number;
    chop(n: Decimal): Decimal | 0;
    chop(n: Complex): Complex | 0;
    /** Create an arbitrary precision number.
     *
     * The return value is an object with methods to perform arithmetic
     * operations:
     * - `toNumber()`: convert to a JavaScript `number` with potential loss of precision
     * - `add()`
     * - `sub()`
     * - `neg()` (unary minus)
     * - `mul()`
     * - `div()`
     * - `pow()`
     * - `sqrt()` (square root)
     * - `cbrt()` (cube root)
     * - `exp()`  (e^x)
     * - `log()`
     * - `ln()` (natural logarithm)
     * - `mod()`
  
     * - `abs()`
     * - `ceil()`
     * - `floor()`
     * - `round()`
  
     * - `equals()`
     * - `gt()`
     * - `gte()`
     * - `lt()`
     * - `lte()`
     *
     * - `cos()`
     * - `sin()`
     * - `tanh()`
     * - `acos()`
     * - `asin()`
     * - `atan()`
     * - `cosh()`
     * - `sinh()`
     * - `acosh()`
     * - `asinh()`
     * - `atanh()`
     *
     * - `isFinite()`
     * - `isInteger()`
     * - `isNaN()`
     * - `isNegative()`
     * - `isPositive()`
     * - `isZero()`
     * - `sign()` (1, 0 or -1)
     *
     */
    bignum(a: Decimal.Value | bigint): Decimal;
    /** Create a complex number.
     * The return value is an object with methods to perform arithmetic
     * operations:
     * - `re` (real part, as a JavaScript `number`)
     * - `im` (imaginary part, as a JavaScript `number`)
     * - `add()`
     * - `sub()`
     * - `neg()` (unary minus)
     * - `mul()`
     * - `div()`
     * - `pow()`
     * - `sqrt()` (square root)
     * - `exp()`  (e^x)
     * - `log()`
     * - `ln()` (natural logarithm)
     * - `mod()`
  
     * - `abs()`
     * - `ceil()`
     * - `floor()`
     * - `round()`
  
     * - `arg()` the angle of the complex number
     * - `inverse()` the inverse of the complex number 1/z
     * - `conjugate()` the conjugate of the complex number
  
     * - `equals()`
     *
     * - `cos()`
     * - `sin()`
     * - `tanh()`
     * - `acos()`
     * - `asin()`
     * - `atan()`
     * - `cosh()`
     * - `sinh()`
     * - `acosh()`
     * - `asinh()`
     * - `atanh()`
     *
     * - `isFinite()`
     * - `isNaN()`
     * - `isZero()`
     * - `sign()` (1, 0 or -1)
     */
    complex(a: number | Decimal | Complex, b?: number | Decimal): Complex;
    isBignum(a: unknown): a is Decimal;
    isComplex(a: unknown): a is Complex;
    private get latexSyntax();
    static getLatexDictionary(domain?: LibraryCategory | 'all'): readonly Readonly<object>[];
    set costFunction(fn: ((expr: BoxedExpression) => number) | undefined);
    get costFunction(): (expr: BoxedExpression) => number;
    /**
     * Return a matching symbol definition, starting with the current
     * scope and going up the scope chain. Prioritize finding a match by
     * wikidata, if provided.
     */
    lookupSymbol(symbol: string, wikidata?: string, scope?: RuntimeScope): undefined | BoxedSymbolDefinition;
    /**
     * Return the definition for a function matching this head.
     *
     * Start looking in the current context, than up the scope chain.
     *
     * This is a very rough lookup, since it doesn't account for the domain
     * of the argument or the codomain. However, it is useful during parsing
     * to differentiate between symbols that might represent a function application, e.g. `f` vs `x`.
     */
    lookupFunction(head: string | BoxedExpression, scope?: RuntimeScope | null): undefined | BoxedFunctionDefinition;
    /**
     * Associate a new definition to a symbol in the current context.
     *
     * If a definition existed previously, it is replaced.
     *
     *
     * For internal use. Use `ce.declare()` instead.
     *
     * @internal
     */
    defineSymbol(name: string, def: SymbolDefinition): BoxedSymbolDefinition;
    _defineSymbol(name: string, def: SymbolDefinition): BoxedSymbolDefinition;
    /**
     * Associate a new delookupSymbolfinition to a function in the current context.
     *
     * If a definition existed previously, it is replaced.
     *
     * For internal use. Use `ce.declare()` instead.
     *
     * @internal
     */
    defineFunction(name: string, def: FunctionDefinition): BoxedFunctionDefinition;
    _defineFunction(name: string, def: FunctionDefinition): BoxedFunctionDefinition;
    /**
     *
     * Create a new scope and add it to the top of the scope stack
     *
     * The `scope` argument can be used to specify custom precision,
     * etc... for this scope
     *
     *
     */
    pushScope(scope?: Partial<Scope>): ComputeEngine;
    /** Remove the most recent scope from the scope stack, and set its
     *  parent scope as current. */
    popScope(): ComputeEngine;
    /** Set the current scope, return the previous scope. */
    swapScope(scope: RuntimeScope | null): RuntimeScope | null;
    /**
     * Reset the value of any identifiers that have been assigned a value
     * in the current scope.
     * @internal */
    resetContext(): void;
    /** @internal */
    _printScope(options?: {
        details?: boolean;
        maxDepth?: number;
    }, scope?: RuntimeScope | null, depth?: number): RuntimeScope | null;
    /**
     * Declare an identifier: specify their domain, and other attributes,
     * including optionally a value.
     *
     * Once the domain of an identifier has been declared, it cannot be changed.
     * The domain information is used to calculate the canonical form of
     * expressions and ensure they are valid. If the domain could be changed
     * after the fact, previously valid expressions could become invalid.
     *
     * Use the `Anyting` domain for a very generic domain.
     *
     */
    declare(id: string, def: BoxedDomain | DomainExpression | SymbolDefinition | FunctionDefinition): ComputeEngine;
    declare(identifiers: {
        [id: string]: BoxedDomain | DomainExpression | SymbolDefinition | FunctionDefinition;
    }): ComputeEngine;
    /** Assign a value to an identifier in the current scope.
     * Use `undefined` to reset the identifier to no value.
     *
     * The identifier should be a valid MathJSON identifier
     * not a LaTeX string.
     *
     * The identifier can take the form "f(x, y") to create a function
     * with two parameters, "x" and "y".
     *
     * If the id was not previously declared, an automatic declaration
     * is done. The domain of the identifier is inferred from the value.
     * To more precisely define the domain of the identifier, use `ce.declare()`
     * instead, which allows you to specify the domain, value and other
     * attributes of the identifier.
     */
    assign(id: string, value: AssignValue): ComputeEngine;
    assign(ids: {
        [id: string]: AssignValue;
    }): ComputeEngine;
    /**
     * Same as assign(), but for internal use:
     * - skips validity checks
     * - does not auto-declare
     * - if assigning to a function, must pass a JS function
     *
     * @internal
     */
    _assign(id: string, value: AssignValue): ComputeEngine;
    get assumptions(): ExpressionMapInterface<boolean>;
    /**
     * Return false if the execution should stop.
     *
     * This can occur if:
     * - an error has been signaled
     * - the time limit or memory limit has been exceeded
     *
     * @internal
     */
    shouldContinueExecution(): boolean;
    /** @internal */
    checkContinueExecution(): void;
    /** @internal */
    cache<T>(cacheName: string, build: () => T, purge: (T: any) => T | undefined): T;
    /**
     * Return a boxed expression from the input.
     */
    box(expr: Decimal | Complex | [num: number, denom: number] | SemiBoxedExpression, options?: {
        canonical?: boolean | CanonicalForm | CanonicalForm[];
    }): BoxedExpression;
    canonical(xs: SemiBoxedExpression[]): BoxedExpression[];
    /**
     * Return a function expression.
     *
     * Note that the result may not be a function, or may have a different
     * `head` than the one specified.
     *
     * For example:
     * `ce.fn("Rational", [ce.number(1),  ce.number(2)]))` \( \to \) `ce.number([1,2])`
     *
     */
    fn(head: string, ops: BoxedExpression[], options?: {
        canonical: boolean;
    }): BoxedExpression;
    /** @internal */
    _fn(head: string | BoxedExpression, ops: BoxedExpression[], metadata?: Metadata): BoxedExpression;
    /**
     *
     * Shortcut for `this.fn("Error"...)`.
     *
     * The result is canonical.
     */
    error(message: string | [string, ...SemiBoxedExpression[]], where?: SemiBoxedExpression): BoxedExpression;
    domainError(expectedDomain: BoxedDomain | DomainLiteral, actualDomain: undefined | BoxedDomain, where?: SemiBoxedExpression): BoxedExpression;
    /**
     * Add a`["Hold"]` wrapper to `expr.
     */
    hold(expr: SemiBoxedExpression): BoxedExpression;
    /** Shortcut for `this.fn("Add"...)`.
     *
     * The result is canonical.
     */
    add(ops: BoxedExpression[], metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Negate", [expr])`
     *
     * The result is canonical.
     */
    neg(expr: BoxedExpression, metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Multiply"...)`
     *
     * The result is canonical.
     */
    mul(ops: BoxedExpression[], metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Divide", [num, denom])`
     *
     * The result is canonical.
     */
    div(num: BoxedExpression, denom: BoxedExpression, metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Sqrt"...)`
     *
     * The result is canonical.
     */
    sqrt(base: BoxedExpression, metadata?: Metadata): any;
    /** Shortcut for `this.fn("Power"...)`
     *
     * The result is canonical.
     */
    pow(base: BoxedExpression, exponent: number | Rational | BoxedExpression, metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Divide", [1, expr])`
     *
     * The result is canonical.
     */
    inv(expr: BoxedExpression, metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Pair"...)`
     *
     * The result is canonical.
     */
    pair(first: BoxedExpression, second: BoxedExpression, metadata?: Metadata): BoxedExpression;
    /** Shortcut for `this.fn("Tuple"...)`
     *
     * The result is canonical.
     */
    tuple(elements: number[], metadata?: Metadata): BoxedExpression;
    tuple(elements: BoxedExpression[], metadata?: Metadata): BoxedExpression;
    array(elements: ArrayValue[] | ArrayValue[][], metadata?: Metadata): BoxedExpression;
    string(s: string, metadata?: Metadata): BoxedExpression;
    /** Return a boxed symbol */
    symbol(name: string, options?: {
        metadata?: Metadata;
        canonical?: boolean;
    }): BoxedExpression;
    /** Return a canonical boxed domain.
     *
     * If the domain is invalid, may return an `["Error"]` expression
     *
     */
    domain(domain: BoxedDomain | DomainExpression, metadata?: Metadata): BoxedDomain;
    /**
     * This function tries to avoid creating a boxed number if `num` corresponds
     * to a common value for which we have a shared instance (-1, 0, NaN, etc...)
     */
    number(value: number | bigint | string | MathJsonNumber | Decimal | Complex | Rational, options?: {
        canonical?: boolean;
        metadata?: Metadata;
    }): BoxedExpression;
    rules(rules: Rule[]): BoxedRuleSet;
    pattern(expr: LatexString | SemiBoxedExpression): Pattern;
    /**
     * Parse a string of LaTeX and return a corresponding `BoxedExpression`.
     *
     * The result may not be canonical.
     *
     */
    parse(latex: LatexString | string, options?: {
        canonical?: boolean | CanonicalForm | CanonicalForm[];
    }): BoxedExpression;
    parse(s: null, options?: {
        canonical?: boolean | CanonicalForm | CanonicalForm[];
    }): null;
    parse(latex: LatexString | string | null, options?: {
        canonical?: boolean | CanonicalForm | CanonicalForm[];
    }): null | BoxedExpression;
    /** Serialize a `BoxedExpression` or a `MathJSON` expression to
     * a LaTeX string
     */
    serialize(x: Expression | BoxedExpression, options?: {
        canonical?: boolean;
    }): string;
    /**
     * Options to control the serialization of MathJSON expression to LaTeX
     * when using `this.latex` or `this.engine.serialize()`.
     *
     *
     * {@inheritDoc  NumberFormattingOptions}
     * {@inheritDoc  ParseLatexOptions}
     * {@inheritDoc  SerializeLatexOptions}
     *
     */
    get latexOptions(): NumberFormattingOptions & ParseLatexOptions & SerializeLatexOptions;
    set latexOptions(opts: Partial<NumberFormattingOptions> & Partial<ParseLatexOptions> & Partial<SerializeLatexOptions>);
    /** {@inheritDoc  JsonSerializationOptions} */
    get jsonSerializationOptions(): Readonly<JsonSerializationOptions>;
    set jsonSerializationOptions(val: Partial<JsonSerializationOptions>);
    rawJson(expr: BoxedExpression): Expression;
    /**
     * Return a list of all the assumptions that match a pattern.
     *
     * ```js
     *  ce.assume(['Element', 'x', 'PositiveIntegers');
     *  ce.ask(['Greater', 'x', '_val'])
     *  //  -> [{'val': 0}]
     * ```
     */
    ask(pattern: SemiBoxedExpression): BoxedSubstitution[];
    /**
     * Answer a query based on the current assumptions.
     *
     */
    verify(_query: SemiBoxedExpression): boolean;
    /**
     * Add an assumption.
     *
     * Note that the assumption is put into canonical form before being added.
     *
     * @param symbol - The symbol to make an assumption about
     *
     * Returns:
     * - `contradiction` if the new assumption is incompatible with previous
     * ones.
     * - `tautology` if the new assumption is redundant with previous ones.
     * - `ok` if the assumption was successfully added to the assumption set.
     *
     *
     */
    assume(predicate: SemiBoxedExpression): AssumeResult;
    /** Remove all assumptions about one or more symbols */
    forget(symbol: undefined | string | string[]): void;
}
