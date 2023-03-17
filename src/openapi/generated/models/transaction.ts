/* tslint:disable */
/* eslint-disable */
/**
 * API-v1
 * Microlend API version one
 *
 * The version of the OpenAPI document: 1.0
 * Contact: nanaaikinson24@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { Customer } from './customer';

/**
 * 
 * @export
 * @interface Transaction
 */
export interface Transaction {
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'id': string;
    /**
     * 
     * @type {Customer}
     * @memberof Transaction
     */
    'customer': Customer;
    /**
     * 
     * @type {Customer}
     * @memberof Transaction
     */
    'loan'?: Customer;
    /**
     * 
     * @type {number}
     * @memberof Transaction
     */
    'amount': number;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'currency': string;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'type': string;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'description': string | null;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'reference': string | null;
    /**
     * 
     * @type {boolean}
     * @memberof Transaction
     */
    'loanRepayment': boolean;
    /**
     * 
     * @type {string}
     * @memberof Transaction
     */
    'createdAt': string;
}
