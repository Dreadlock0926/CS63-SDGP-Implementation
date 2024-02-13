/* 0.22.0 */import { Expression } from '../../math-json/math-json-format';
import { _BoxedExpression } from './abstract-boxed-expression';
import { BoxedExpression, BoxedDomain, IComputeEngine, Metadata, PatternMatchOptions, BoxedSubstitution } from '../public';
/**
 * BoxedString
 */
export declare class BoxedString extends _BoxedExpression {
    private readonly _string;
    constructor(ce: IComputeEngine, expr: string, metadata?: Metadata);
    get hash(): number;
    get json(): Expression;
    get head(): string;
    get isPure(): boolean;
    get isCanonical(): boolean;
    set isCanonical(_va: boolean);
    get domain(): BoxedDomain;
    get complexity(): number;
    get string(): string;
    isEqual(rhs: BoxedExpression): boolean;
    isSame(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, _options?: PatternMatchOptions): BoxedSubstitution | null;
}
