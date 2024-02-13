/* 0.22.0 */import { IComputeEngine, FunctionDefinition, BoxedFunctionDefinition, RuntimeScope, BoxedFunctionSignature, BoxedExpression, Hold } from '../public';
export declare class _BoxedFunctionDefinition implements BoxedFunctionDefinition {
    engine: IComputeEngine;
    scope: RuntimeScope;
    name: string;
    description?: string | string[];
    wikidata?: string;
    threadable: boolean;
    associative: boolean;
    commutative: boolean;
    idempotent: boolean;
    involution: boolean;
    pure: boolean;
    inert: boolean;
    numeric: boolean;
    complexity: number;
    hold: Hold;
    dynamic: boolean;
    signature: BoxedFunctionSignature;
    iterator?: (expr: BoxedExpression, start?: number, count?: number) => Iterator<BoxedExpression>;
    at?: (expr: BoxedExpression, index: number | string) => undefined | BoxedExpression;
    size?: (expr: BoxedExpression) => number;
    keys?: (expr: BoxedExpression) => undefined | Iterator<string>;
    indexOf?: (expr: BoxedExpression, target: BoxedExpression, from?: number) => number | string | undefined;
    constructor(ce: IComputeEngine, name: string, def: FunctionDefinition);
    reset(): void;
}
export declare function makeFunctionDefinition(engine: IComputeEngine, name: string, def: FunctionDefinition | BoxedFunctionDefinition): BoxedFunctionDefinition;
