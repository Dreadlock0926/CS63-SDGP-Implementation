/* 0.22.0 */import { ParseLatexOptions, LatexToken, NumberFormattingOptions, Terminator, Parser } from './public';
import { IndexedLatexDictionary, IndexedLatexDictionaryEntry, IndexedInfixEntry, IndexedPostfixEntry, IndexedPrefixEntry, IndexedSymbolEntry, IndexedExpressionEntry, IndexedFunctionEntry } from './dictionary/definitions';
import { IComputeEngine } from '../public';
import { Expression } from '../../math-json/math-json-format';
export declare const DEFAULT_LATEX_NUMBER_OPTIONS: NumberFormattingOptions;
export declare const DEFAULT_PARSE_LATEX_OPTIONS: ParseLatexOptions;
export declare class _Parser implements Parser {
    readonly computeEngine: IComputeEngine;
    readonly options: NumberFormattingOptions & ParseLatexOptions;
    index: number;
    private _tokens;
    private _positiveInfinityTokens;
    private _negativeInfinityTokens;
    private _notANumberTokens;
    private _decimalMarkerTokens;
    private _groupSeparatorTokens;
    private _exponentProductTokens;
    private _beginExponentMarkerTokens;
    private _endExponentMarkerTokens;
    private _truncationMarkerTokens;
    private _beginRepeatingDigitsTokens;
    private _endRepeatingDigitsTokens;
    private _imaginaryNumberTokens;
    private readonly _dictionary;
    private _boundaries;
    private _lastPeek;
    private _peekCounter;
    constructor(tokens: LatexToken[], options: NumberFormattingOptions & ParseLatexOptions, dictionary: IndexedLatexDictionary, computeEngine: IComputeEngine);
    updateOptions(opt: Partial<NumberFormattingOptions> & Partial<ParseLatexOptions>): void;
    get atEnd(): boolean;
    get peek(): LatexToken;
    nextToken(): LatexToken;
    /**
     * Return true if
     * - at end of the token stream
     * - the `t.condition` function returns true
     * Note: the `minPrec` condition is not checked. It should be checked separately.
     */
    atTerminator(t?: Readonly<Terminator>): boolean;
    /**
     * True if the current token matches any of the boundaries we are
     * waiting for.
     */
    get atBoundary(): boolean;
    addBoundary(boundary: LatexToken[]): void;
    removeBoundary(): void;
    matchBoundary(): boolean;
    boundaryError(msg: string | [string, ...Expression[]]): Expression;
    latex(start: number, end?: number): string;
    private latexAhead;
    /**
     * Return at most `this._dictionary.lookahead` LaTeX tokens.
     *
     * The index in the returned array correspond to the number of tokens.
     * Note that since a token can be longer than one char ('\\pi', but also
     * some astral plane unicode characters), the length of the string
     * does not match that index. However, knowing the index is important
     * to know by how many tokens to advance.
     *
     * For example:
     *
     * `[empty, '\\sqrt', '\\sqrt{', '\\sqrt{2', '\\sqrt{2}']`
     *
     */
    lookAhead(): [count: number, tokens: string][];
    /** Return all the definitions that match the tokens ahead
     *
     * The return value is an array of pairs `[def, n]` where `def` is the
     * definition that matches the tokens ahead, and `n` is the number of tokens
     * that matched.
     *
     * Note the 'operator' kind matches both infix, prefix and postfix operators.
     *
     */
    peekDefinitions(kind: 'expression'): [IndexedExpressionEntry, number][];
    peekDefinitions(kind: 'function'): [IndexedFunctionEntry, number][];
    peekDefinitions(kind: 'symbol'): [IndexedSymbolEntry, number][];
    peekDefinitions(kind: 'postfix'): [IndexedPostfixEntry, number][];
    peekDefinitions(kind: 'infix'): [IndexedInfixEntry, number][];
    peekDefinitions(kind: 'prefix'): [IndexedPrefixEntry, number][];
    peekDefinitions(kind: 'operator'): [IndexedInfixEntry | IndexedPrefixEntry | IndexedPostfixEntry, number][];
    /** Skip strictly `<space>` tokens.
     * To also skip `{}` see `skipSpace()`.
     * To skip visual space (e.g. `\,`) see `skipVisualSpace()`.
     */
    skipSpaceTokens(): void;
    /** While parsing in math mode, skip applicable spaces, which includes `{}`.
     * Do not use to skip spaces while parsing a string. See  `skipSpaceTokens()`
     * instead.
     */
    skipSpace(): boolean;
    skipVisualSpace(): void;
    match(token: LatexToken): boolean;
    matchAll(tokens: LatexToken[]): boolean;
    matchAny(tokens: LatexToken[]): LatexToken;
    matchChar(): string | null;
    /**
     *
     * If the next token matches the open delimiter, set a boundary with
     * the close token and return true.
     *
     * Note this method handles "shorthand" delimiters, i.e. '(' will match both
     * `(` and `\lparen`. If a shorthand is used for the open delimiter, the
     * corresponding shorthand will be used for the close delimiter.
     * See DELIMITER_SHORTHAND.
     *
     * It also handles prefixes like `\left` and `\bigl`.
     *
     */
    private matchDelimiter;
    parseGroup(): Expression | null;
    parseToken(): Expression | null;
    parseOptionalGroup(): Expression | null;
    /**
     * Parse an expression in a tabular format, where rows are separated by `\\`
     * and columns by `&`.
     *
     * Return rows of sparse columns: empty rows are indicated with `Nothing`,
     * and empty cells are also indicated with `Nothing`.
     */
    parseTabular(): null | Expression[][];
    /** Parse a group as a a string, for example for `\operatorname` or `\begin` */
    parseStringGroup(optional?: boolean): string | null;
    /** Parse an environment: `\begin{env}...\end{end}`
     */
    private parseEnvironment;
    /** If the next token matches a `+` or `-` sign, return it and advance the index.
     * Otherwise return `''` and do not advance */
    private parseOptionalSign;
    private parseDecimalDigits;
    private parseSignedInteger;
    private parseExponent;
    parseRepeatingDecimal(): string;
    /**
     * Parse a number, with an optional sign, exponent, decimal marker,
     * repeating decimals, etc...
     */
    private parseNumber;
    /**
     * A Latex number can be a decimal, hex or octal number.
     * It is used in some Latex commands, such as `\char`
     *
     * From TeX:8695 (scan_int):
     * > An integer number can be preceded by any number of spaces and `+' or
     * > `-' signs. Then comes either a decimal constant (i.e., radix 10), an
     * > octal constant (i.e., radix 8, preceded by '), a hexadecimal constant
     * > (radix 16, preceded by "), an alphabetic constant (preceded by `), or
     * > an internal variable.
     */
    matchLatexNumber(isInteger?: boolean): null | number;
    private parsePrefixOperator;
    private parseInfixOperator;
    /**
     * This returns an array of arguments (as in a function application),
     * or null if there is no match.
     *
     * - 'enclosure' : will look for an argument inside an enclosure
     *   (open/close fence)
     * - 'implicit': either an expression inside a pair of `()`, or just a product
     *  (i.e. we interpret `\cos 2x + 1` as `\cos(2x) + 1`)
     *
     */
    parseArguments(kind?: 'enclosure' | 'implicit', until?: Readonly<Terminator>): Expression[] | null;
    /** If matches the normalized open delimiter, return the
     * expected closing delimiter.
     *
     * For example, if `delimiter` is `(`, it would match `\left\lparen` and
     * return `['\right', '\rparen']`, which can be matched with `matchAll()`
     *
     * If you need to match several tokens, use `matchAll()`
     *
     * @internal
     */
    private matchOpenDelimiter;
    /**
     * An enclosure is an opening matchfix operator, an optional expression,
     * optionally followed multiple times by a separator and another expression,
     * and finally a closing matching operator.
     */
    private parseEnclosure;
    /**
     * A generic expression is used for dictionary entries that take do
     * some complex (non-standard) parsing. This includes trig functions (to
     * parse implicit arguments), and integrals (to parse the integrand and
     * limits and the "dx" terminator).
     */
    private parseGenericExpression;
    /**
     * A function is an identifier followed by postfix operators
     * (`\prime`...) and some arguments.
     */
    private parseFunction;
    parseSymbol(until?: Readonly<Terminator>): Expression | null;
    /**
     * Parse a sequence superfix/subfix operator, e.g. `^{*}`
     *
     * Superfix and subfix need special handling:
     *
     * - they act mostly like an infix operator, but they are commutative, i.e.
     * `x_a^b` should be parsed identically to `x^b_a`.
     *
     * - furthermore, in LaTeX `x^a^b` parses the same as `x^a{}^b`.
     *
     */
    private parseSupsub;
    parsePostfixOperator(lhs: Expression | null, until?: Readonly<Terminator>): Expression | null;
    /** Match a string used as a LaTeX identifier, for example an environment
     * name.
     * Not suitable for general purpose text, e.g. argument of a `\text{}
     * command. See `matchChar()` instead.
     */
    private parseStringGroupContent;
    /**
     * This method can be invoked when we know we're in an error situation.
     *
     * In general, if a context does not apply, we return `null` to give
     * the chance to some other option to be considered. However, in some cases
     * we know we've exhausted all posibilities, and in this case this method
     * will return an error expression as informative as possible.
     *
     * We've encountered a LaTeX command or symbol but were not able to match it
     * to any entry in the LaTeX dictionary, or ran into it in an unexpected
     * context (postfix operator lacking an argument, for example)
     */
    parseSyntaxError(): Expression;
    /**
     * <primary> :=
     *  (<number> | <symbol> | <environment> | <matchfix-expr>)
     *    <subsup>* <postfix-operator>*
     *
     * <symbol> ::=
     *  (<symbol-id> | (<latex-command><latex-arguments>)) <arguments>
     *
     * <matchfix-expr> :=
     *  <matchfix-op-open>
     *  <expression>
     *  (<matchfix-op-separator> <expression>)*
     *  <matchfix-op-close>
     *
     */
    private parsePrimary;
    /**
     *  Parse an expression:
     *
     * <expression> ::=
     *  | <primary>
     *  | <prefix-op> <primary>
     *  | <primary> <infix-op> <expression>
     *
     * Stop when an operator of precedence less than `until.minPrec`
     * is encountered
     */
    parseExpression(until?: Readonly<Terminator>): Expression | null;
    /**
     * Add LaTeX or other requested metadata to the expression
     */
    decorate(expr: Expression | null, start: number): Expression | null;
    error(code: string | [string, ...Expression[]], fromToken: number): Expression;
    private isFunctionHead;
    /** Return all defs of the specified kind */
    getDefs(kind: string): Iterable<IndexedLatexDictionaryEntry>;
}
