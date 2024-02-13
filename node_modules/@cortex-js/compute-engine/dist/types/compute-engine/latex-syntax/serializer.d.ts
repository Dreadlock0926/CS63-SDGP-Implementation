/* 0.22.0 */import type { Expression } from '../../math-json/math-json-format';
import { WarningSignalHandler } from '../../common/signals';
import { NumberFormattingOptions, LatexString, SerializeLatexOptions } from './public';
import { IndexedLatexDictionary, IndexedLatexDictionaryEntry } from './dictionary/definitions';
export declare class Serializer {
    readonly onError: WarningSignalHandler;
    options: NumberFormattingOptions & SerializeLatexOptions;
    readonly dictionary: IndexedLatexDictionary;
    level: number;
    canonical: undefined | boolean;
    constructor(options: NumberFormattingOptions & SerializeLatexOptions, dictionary: IndexedLatexDictionary, onError: WarningSignalHandler);
    updateOptions(opt: Partial<NumberFormattingOptions> & Partial<SerializeLatexOptions>): void;
    /**
     * Serialize the expression, and if the expression is an operator
     * of precedence less than or equal to prec, wrap it in some paren.
     * @todo: don't wrap Abs, Floor, Ceil, Delimiter
     */
    wrap(expr: Expression | null, prec?: number): string;
    /**
     * If this is a "short" expression, wrap it.
     * Do not wrap identifiers, positive numbers or functions.
     *
     * This is called by the serializer for power and division (i.e. "(a+1)/b")
     *
     */
    wrapShort(expr: Expression | null): string;
    wrapString(s: string, style: 'paren' | 'leftright' | 'big' | 'none', fence?: string): string;
    wrapArguments(expr: Expression): string;
    serializeSymbol(expr: Expression, def?: IndexedLatexDictionaryEntry): LatexString;
    serializeFunction(expr: Expression, def?: IndexedLatexDictionaryEntry): LatexString;
    serializeDictionary(dict: {
        [key: string]: Expression;
    }): string;
    serialize(expr: Expression | null, options?: {
        canonical?: boolean;
    }): LatexString;
    applyFunctionStyle(expr: Expression, level: number): 'paren' | 'leftright' | 'big' | 'none';
    groupStyle(expr: Expression, level: number): 'paren' | 'leftright' | 'big' | 'none';
    rootStyle(expr: Expression, level: number): 'radical' | 'quotient' | 'solidus';
    fractionStyle(expr: Expression, level: number): 'quotient' | 'block-quotient' | 'inline-quotient' | 'inline-solidus' | 'nice-solidus' | 'reciprocal' | 'factor';
    logicStyle(expr: Expression, level: number): 'word' | 'boolean' | 'uppercase-word' | 'punctuation';
    powerStyle(expr: Expression, level: number): 'root' | 'solidus' | 'quotient';
    numericSetStyle(expr: Expression, level: number): 'compact' | 'regular' | 'interval' | 'set-builder';
}
export declare function appendLatex(src: string, s: string): string;
