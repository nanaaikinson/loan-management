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
import { StatisticsDashboardDataDashboard } from './statistics-dashboard-data-dashboard';
// May contain unused imports in some cases
// @ts-ignore
import { Transaction } from './transaction';

/**
 * 
 * @export
 * @interface StatisticsDashboardData
 */
export interface StatisticsDashboardData {
    /**
     * 
     * @type {StatisticsDashboardDataDashboard}
     * @memberof StatisticsDashboardData
     */
    'dashboard': StatisticsDashboardDataDashboard;
    /**
     * 
     * @type {Array<Transaction>}
     * @memberof StatisticsDashboardData
     */
    'recentTransactions': Array<Transaction>;
}
