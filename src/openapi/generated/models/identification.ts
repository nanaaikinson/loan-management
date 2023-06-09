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
import { IdentificationFront } from './identification-front';

/**
 * 
 * @export
 * @interface Identification
 */
export interface Identification {
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'number': string;
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'type': string;
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'issueDate': string;
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'expiryDate': string;
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'issuingAuthority': string;
    /**
     * 
     * @type {string}
     * @memberof Identification
     */
    'issuingCountry': string;
    /**
     * 
     * @type {IdentificationFront}
     * @memberof Identification
     */
    'front': IdentificationFront;
    /**
     * 
     * @type {IdentificationFront}
     * @memberof Identification
     */
    'back': IdentificationFront;
}

