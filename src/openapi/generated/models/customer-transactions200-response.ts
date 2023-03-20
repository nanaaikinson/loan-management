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
import { Transaction } from './transaction';

/**
 * 
 * @export
 * @interface CustomerTransactions200Response
 */
export interface CustomerTransactions200Response {
    /**
     * 
     * @type {string}
     * @memberof CustomerTransactions200Response
     */
    'message': string;
    /**
     * 
     * @type {number}
     * @memberof CustomerTransactions200Response
     */
    'status': number;
    /**
     * 
     * @type {Array<Transaction>}
     * @memberof CustomerTransactions200Response
     */
    'data': Array<Transaction>;
}
