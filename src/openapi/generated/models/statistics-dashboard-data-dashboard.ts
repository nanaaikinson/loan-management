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
import { StatisticsDashboardDataDashboardLoanStatusesCountInner } from './statistics-dashboard-data-dashboard-loan-statuses-count-inner';

/**
 * 
 * @export
 * @interface StatisticsDashboardDataDashboard
 */
export interface StatisticsDashboardDataDashboard {
    /**
     * 
     * @type {number}
     * @memberof StatisticsDashboardDataDashboard
     */
    'totalNumberOfLoans': number;
    /**
     * 
     * @type {number}
     * @memberof StatisticsDashboardDataDashboard
     */
    'totalLoanAmount': number;
    /**
     * 
     * @type {string}
     * @memberof StatisticsDashboardDataDashboard
     */
    'totalAmountPaid': string;
    /**
     * 
     * @type {Array<StatisticsDashboardDataDashboardLoanStatusesCountInner>}
     * @memberof StatisticsDashboardDataDashboard
     */
    'loanStatusesCount': Array<StatisticsDashboardDataDashboardLoanStatusesCountInner>;
}
