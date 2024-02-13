/* 0.22.0 */import { Complex } from 'complex.js';
import { Decimal } from 'decimal.js';
import { Expression } from '../../math-json/math-json-format';
import { BoxedExpression, IComputeEngine, Metadata, Rational } from '../public';
/**
 * The canonical version of `serializeJsonFunction()` applies
 * additional transformations to "reverse" some of the effects
 * of canonicalization (or boxing), for example it uses `Divide`
 * instead of `Multiply`/`Power` when applicable.
 */
export declare function serializeJsonCanonicalFunction(ce: IComputeEngine, head: string | BoxedExpression, args: BoxedExpression[], metadata?: Metadata): Expression;
export declare function serializeJsonFunction(ce: IComputeEngine, head: string | BoxedExpression, args: (undefined | BoxedExpression)[], metadata?: Metadata): Expression;
export declare function serializeJsonString(ce: IComputeEngine, s: string): Expression;
export declare function serializeJsonSymbol(ce: IComputeEngine, sym: string, metadata?: Metadata): Expression;
export declare function serializeJsonNumber(ce: IComputeEngine, value: number | Decimal | Complex | Rational, metadata?: Metadata): Expression;
