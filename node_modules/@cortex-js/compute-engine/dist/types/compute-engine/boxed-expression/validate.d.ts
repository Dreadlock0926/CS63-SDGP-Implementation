/* 0.22.0 */import { IComputeEngine, BoxedExpression, BoxedDomain, DomainLiteral, Hold } from '../public';
/**
 * Check that the number of arguments is as expected.
 *
 * Converts the arguments to canonical, and flattens the sequence.
 */
export declare function checkArity(ce: IComputeEngine, ops: BoxedExpression[], count: number): BoxedExpression[];
/**
 * Validation of arguments is normally done by checking the signature of the
 * function vs the arguments of the expression. However, we have a fastpath
 * for some common operations (add, multiply, power, neg, etc...) that bypasses
 * the regular checks. This is its replacements.
 *
 * Since all those fastpath functions are numeric (i.e. have numeric arguments
 * and a numeric result), we do a simple numeric check of all arguments, and
 * verify we have the number of expected arguments.
 *
 * We also assume that the function is threadable.
 *
 * Converts the arguments to canonical, and flattens the sequence.
 */
export declare function checkNumericArgs(ce: IComputeEngine, ops: BoxedExpression[], options?: number | {
    count?: number;
    flatten?: boolean | string;
}): BoxedExpression[];
/**
 * Check that an argument is of the expected domain.
 *
 * Converts the arguments to canonical
 */
export declare function checkDomain(ce: IComputeEngine, arg: BoxedExpression | undefined | null, dom: BoxedDomain | DomainLiteral | undefined): BoxedExpression;
/**
 * Check that the argument is pure.
 */
export declare function checkPure(ce: IComputeEngine, arg: BoxedExpression | BoxedExpression | undefined | null): BoxedExpression;
export declare function checkDomains(ce: IComputeEngine, args: BoxedExpression[], doms: (BoxedDomain | DomainLiteral)[]): BoxedExpression[];
/**
 *
 * If the arguments match the parameters, return null.
 *
 * Otherwise return a list of expressions indicating the mismatched
 * arguments.
 *
 */
export declare function adjustArguments(ce: IComputeEngine, ops: BoxedExpression[], hold: Hold, threadable: boolean, params: BoxedDomain[], optParams: BoxedDomain[], restParam: BoxedDomain | undefined): BoxedExpression[] | null;
