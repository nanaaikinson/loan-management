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
import { Loan } from './loan';

/**
 * 
 * @export
 * @interface CustomerLoans200Response
 */
export interface CustomerLoans200Response {
    /**
     * 
     * @type {string}
     * @memberof CustomerLoans200Response
     */
    'message': string;
    /**
     * 
     * @type {number}
     * @memberof CustomerLoans200Response
     */
    'status': number;
    /**
     * 
     * @type {Array<Loan>}
     * @memberof CustomerLoans200Response
     */
    'data': Array<Loan>;
}

