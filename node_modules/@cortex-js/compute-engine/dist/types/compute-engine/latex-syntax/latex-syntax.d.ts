/* 0.22.0 */import { ParseLatexOptions, SerializeLatexOptions, LatexDictionaryEntry, LatexString, NumberFormattingOptions, LibraryCategory } from './public';
import { Serializer } from './serializer';
import { Expression } from '../../math-json/math-json-format';
import { WarningSignalHandler } from '../../common/signals';
import { IComputeEngine } from '../public';
export declare const DEFAULT_SERIALIZE_LATEX_OPTIONS: Required<SerializeLatexOptions>;
export declare class LatexSyntax {
    onError: WarningSignalHandler;
    readonly options: NumberFormattingOptions & ParseLatexOptions & SerializeLatexOptions;
    readonly computeEngine: IComputeEngine;
    private _dictionary;
    private _dictionaryInput;
    private _serializer?;
    constructor(options: Partial<NumberFormattingOptions> & Partial<ParseLatexOptions> & Partial<SerializeLatexOptions> & {
        computeEngine: IComputeEngine;
        dictionary?: readonly LatexDictionaryEntry[];
        onError?: WarningSignalHandler;
    });
    get dictionary(): readonly LatexDictionaryEntry[];
    set dictionary(val: readonly LatexDictionaryEntry[]);
    updateOptions(opt: Partial<NumberFormattingOptions> & Partial<ParseLatexOptions> & Partial<SerializeLatexOptions>): void;
    static getDictionary(category?: LibraryCategory | 'all'): readonly Readonly<object>[];
    parse(latex: LatexString): Expression;
    serialize(expr: Expression, options?: {
        canonical?: boolean;
    }): LatexString;
    get serializer(): Serializer;
}
