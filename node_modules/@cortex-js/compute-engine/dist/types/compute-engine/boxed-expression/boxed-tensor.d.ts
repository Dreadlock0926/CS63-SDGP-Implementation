/* 0.22.0 */import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, IComputeEngine, EvaluateOptions, NOptions, SimplifyOptions, Metadata, BoxedDomain, BoxedSubstitution, PatternMatchOptions, BoxedBaseDefinition, BoxedFunctionDefinition } from '../public';
import { DataTypeMap, TensorDataType } from '../symbolic/tensor-fields';
import { AbstractTensor, TensorData } from '../symbolic/tensors';
import { _BoxedExpression } from './abstract-boxed-expression';
/**
 * A boxed tensor represents an expression that can be
 * represented by a tensor. This could be a vector, matrix
 * or multi-dimensional array.
 *
 * The object can be created either from a tensor or from
 * an expression that can be represented as a tensor.
 *
 * The counterpart (expression if input is tensor, or tensor
 * if input is expression) is created lazily.
 *
 */
export declare class BoxedTensor extends _BoxedExpression {
    private readonly _head?;
    private readonly _ops?;
    private _tensor;
    private _expression;
    constructor(ce: IComputeEngine, input: {
        head?: string;
        ops: BoxedExpression[];
    } | AbstractTensor<'expression'>, options?: {
        canonical?: boolean;
        metadata?: Metadata;
    });
    get expression(): BoxedExpression;
    /** Create the tensor on demand */
    get tensor(): AbstractTensor<'expression'>;
    get baseDefinition(): BoxedBaseDefinition | undefined;
    get functionDefinition(): BoxedFunctionDefinition | undefined;
    bind(): void;
    reset(): void;
    get hash(): number;
    get canonical(): BoxedExpression;
    get isCanonical(): boolean;
    set isCanonical(val: boolean);
    get isPure(): boolean;
    get isValid(): boolean;
    get complexity(): number;
    get head(): string;
    get nops(): number;
    get ops(): BoxedExpression[];
    get op1(): BoxedExpression;
    get op2(): BoxedExpression;
    get op3(): BoxedExpression;
    get shape(): number[];
    get rank(): number;
    get domain(): BoxedDomain | undefined;
    get json(): Expression;
    get rawJson(): Expression;
    /** Structural equality */
    isSame(rhs: BoxedExpression): boolean;
    /** Mathematical equality */
    isEqual(rhs: BoxedExpression): boolean;
    match(rhs: BoxedExpression, options?: PatternMatchOptions): BoxedSubstitution | null;
    evaluate(options?: EvaluateOptions): BoxedExpression;
    simplify(options?: SimplifyOptions): BoxedExpression;
    N(options?: NOptions): BoxedExpression;
}
export declare function isBoxedTensor(val: unknown): val is BoxedTensor;
export declare function expressionTensorInfo(head: string, rows: BoxedExpression[]): {
    shape: number[];
    dtype: keyof DataTypeMap;
};
export declare function expressionAsTensor<T extends TensorDataType>(head: string, rows: BoxedExpression[]): TensorData<T> | undefined;
