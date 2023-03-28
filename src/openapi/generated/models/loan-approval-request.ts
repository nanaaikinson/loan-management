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



/**
 * 
 * @export
 * @interface LoanApprovalRequest
 */
export interface LoanApprovalRequest {
    /**
     * 
     * @type {string}
     * @memberof LoanApprovalRequest
     */
    'status': LoanApprovalRequestStatusEnum;
}

export const LoanApprovalRequestStatusEnum = {
    Approved: 'approved',
    Rejected: 'rejected',
    Closed: 'closed',
    WrittenOff: 'written off',
    WaivedOff: 'waived off',
    Disbursed: 'disbursed',
    Settled: 'settled',
    Paid: 'paid'
} as const;

export type LoanApprovalRequestStatusEnum = typeof LoanApprovalRequestStatusEnum[keyof typeof LoanApprovalRequestStatusEnum];


