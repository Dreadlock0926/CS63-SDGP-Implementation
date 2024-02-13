/* 0.22.0 */import { DomainLiteral, IdentifierDefinitions } from '../public';
export declare const DOMAIN_CONSTRUCTORS: string[];
export declare const DOMAIN_ALIAS: {
    Functions: (string | string[])[];
    NumericFunctions: (string | string[])[];
    RealFunctions: (string | string[])[];
    LogicOperators: (string | string[])[];
    Predicates: (string | string[])[];
    RelationalOperators: string[];
};
export declare function isDomainLiteral(s: string | null): s is DomainLiteral;
export declare function isSubdomainLiteral(lhs: string, rhs: string): boolean;
/** Return all the domain literals that are an ancestor of `dom`
 */
export declare function ancestors(dom: DomainLiteral): DomainLiteral[];
export declare function domainSetsLibrary(): IdentifierDefinitions;
