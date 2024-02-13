/* 0.22.0 */import { MathJsonIdentifier } from '../math-json/math-json-format';
import { BoxedExpression } from './public';
export type CompiledType = boolean | number | string | object;
type JSSource = string;
export type CompiledOperators = Record<MathJsonIdentifier, [
    op: string,
    prec: number
]>;
export type CompiledFunctions = {
    [id: MathJsonIdentifier]: string | ((args: BoxedExpression[], compile: (expr: BoxedExpression) => JSSource) => JSSource);
};
export type CompileTarget = {
    operators?: (op: MathJsonIdentifier) => [op: string, prec: number];
    functions?: (id: MathJsonIdentifier) => string | ((...args: CompiledType[]) => string);
    var: (id: MathJsonIdentifier) => string | undefined;
    string: (str: string) => string;
    number: (n: number) => string;
    ws: (s?: string) => string;
    indent: number;
};
/** This is an extension of the Function class that allows us to pass
 * a custom scope for "global" functions. */
export declare class ComputeEngineFunction extends Function {
    private sys;
    constructor(body: any);
}
export declare function compileToTarget(expr: BoxedExpression, target: CompileTarget): ((_: Record<string, CompiledType>) => CompiledType) | undefined;
export declare function compileToJavascript(expr: BoxedExpression): ((_: Record<string, CompiledType>) => CompiledType) | undefined;
export declare function compile(expr: BoxedExpression | undefined, target: CompileTarget, prec?: number): JSSource;
export {};
