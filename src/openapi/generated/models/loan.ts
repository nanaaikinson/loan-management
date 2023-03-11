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
 * Loan model
 * @export
 * @interface Loan
 */
export interface Loan {
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'number': string;
    /**
     * 
     * @type {number}
     * @memberof Loan
     */
    'amount': number;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'type': LoanTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'status': LoanStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'repaymentFrequency': LoanRepaymentFrequencyEnum;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'startDate': string;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'endDate': string;
    /**
     * 
     * @type {number}
     * @memberof Loan
     */
    'interestRate': number;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'interestRateType': LoanInterestRateTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof Loan
     */
    'duration': number;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'currency': string;
    /**
     * 
     * @type {number}
     * @memberof Loan
     */
    'repaymentAmount': number;
    /**
     * 
     * @type {Customer}
     * @memberof Loan
     */
    'customer'?: Customer;
    /**
     * 
     * @type {string}
     * @memberof Loan
     */
    'createdAt': string;
}

export const LoanTypeEnum = {
    Personal: 'personal',
    Business: 'business'
} as const;

export type LoanTypeEnum = typeof LoanTypeEnum[keyof typeof LoanTypeEnum];
export const LoanStatusEnum = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected',
    Closed: 'closed',
    WrittenOff: 'written off'
} as const;

export type LoanStatusEnum = typeof LoanStatusEnum[keyof typeof LoanStatusEnum];
export const LoanRepaymentFrequencyEnum = {
    Daily: 'daily',
    Weekly: 'weekly',
    BiWeekly: 'bi-weekly',
    Monthly: 'monthly',
    Quarterly: 'quarterly',
    Annually: 'annually'
} as const;

export type LoanRepaymentFrequencyEnum = typeof LoanRepaymentFrequencyEnum[keyof typeof LoanRepaymentFrequencyEnum];
export const LoanInterestRateTypeEnum = {
    Amount: 'amount',
    Percentage: 'percentage'
} as const;

export type LoanInterestRateTypeEnum = typeof LoanInterestRateTypeEnum[keyof typeof LoanInterestRateTypeEnum];


