/* 0.22.0 */import { BoxedExpression, IComputeEngine, Rational } from '../public';
export declare class Sum {
    private engine;
    private _isCanonical;
    private _rational;
    private _imaginary;
    private _number;
    private _bignum;
    private _posInfinityCount;
    private _negInfinityCount;
    private _naNCount;
    private _terms;
    constructor(ce: IComputeEngine, xs?: BoxedExpression[], options?: {
        canonical?: boolean;
    });
    get isEmpty(): boolean;
    /**
     * Add a term to the sum.
     *
     * A term is a rational coefficient and an expression.
     * Optionally, the term is multiplied by the constant `c` before being added.
     *
     * If the sum already has this term, the coefficient is added
     * to the previous one. Otherwise, a new entry is added.
     *
     * E.g. "2x + x + 1/5 y"
     *  -> [['x', [3, 1]], ['y', [1, 5]]]
     */
    addTerm(term: BoxedExpression, c?: Rational): void;
    toString(): string;
    terms(mode: 'expression' | 'numeric'): BoxedExpression[];
    asExpression(mode: 'expression' | 'numeric'): BoxedExpression;
}
