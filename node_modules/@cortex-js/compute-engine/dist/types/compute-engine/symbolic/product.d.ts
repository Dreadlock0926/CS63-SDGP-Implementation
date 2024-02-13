/* 0.22.0 */import { BoxedExpression, IComputeEngine, Rational } from '../public';
/**
 * Group terms in a product by common term.
 *
 * All the terms should be canonical.
 * - the arguments should have been flattened for `Multiply`
 *
 * - any argument of power been factored out, i.e.
 *      (ab)^2 ->  a^2 b^2
 * *
 * 3 + √5 + √(x+1) + x^2 + (a+b)^2 + d
 *  -> [ [[3, "d"], [1, 1]],
 *       [[5, "x+1"], [1, 2]],
 *       [[x, "a+b"], [2, 1]]
 *      ]
 *
 */
export declare class Product {
    readonly options?: {
        canonical?: boolean;
    };
    engine: IComputeEngine;
    private _sign;
    private _rational;
    private _complex;
    private _bignum;
    private _number;
    private _terms;
    private _hasInfinity;
    private _hasZero;
    private _isCanonical;
    constructor(ce: IComputeEngine, xs?: BoxedExpression[], options?: {
        canonical?: boolean;
    });
    get isEmpty(): boolean;
    /**
     * Add a term to the product.
     *
     * If `this._isCanonical` a running product of exact terms is kept.
     * Otherwise, terms and their exponent are tallied.
     */
    addTerm(term: BoxedExpression): void;
    unitTerms(mode: 'rational' | 'expression' | 'numeric'): {
        exponent: Rational;
        terms: BoxedExpression[];
    }[] | null;
    /** The terms of the product, grouped by degrees.
     *
     * If `mode` is `rational`, rationals are split into separate numerator and
     * denominator, so that a rational expression can be created later
     * If `mode` is `expression`, a regular expression is returned, without
     * splitting rationals
     * If `mode` is `numeric`, the literals are combined into one expression
     *
     */
    groupedByDegrees(options?: {
        mode?: 'rational' | 'expression' | 'numeric';
    }): {
        exponent: Rational;
        terms: BoxedExpression[];
    }[] | null;
    asExpression(mode?: 'N' | 'evaluate'): BoxedExpression;
    /** The product, expressed as a numerator and denominator */
    asNumeratorDenominator(): [BoxedExpression, BoxedExpression];
    asRationalExpression(): BoxedExpression;
}
