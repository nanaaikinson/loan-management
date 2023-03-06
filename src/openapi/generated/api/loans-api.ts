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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CreateLoan200Response } from '../models';
// @ts-ignore
import { GetLoans200Response } from '../models';
// @ts-ignore
import { LoanRequest } from '../models';
// @ts-ignore
import { UpdateLoan200Response } from '../models';
/**
 * LoansApi - axios parameter creator
 * @export
 */
export const LoansApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Loans: Create a new loan
         * @summary 
         * @param {LoanRequest} loanRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLoan: async (loanRequest: LoanRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loanRequest' is not null or undefined
            assertParamExists('createLoan', 'loanRequest', loanRequest)
            const localVarPath = `/loans`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Bearer", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loanRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Your GET endpoint
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLoan: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getLoan', 'id', id)
            const localVarPath = `/loans/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Bearer", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Your GET endpoint
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLoans: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/loans`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Bearer", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {LoanRequest} loanRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLoan: async (id: string, loanRequest: LoanRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateLoan', 'id', id)
            // verify required parameter 'loanRequest' is not null or undefined
            assertParamExists('updateLoan', 'loanRequest', loanRequest)
            const localVarPath = `/loans/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Authorization required
            await setApiKeyToObject(localVarHeaderParameter, "Bearer", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loanRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LoansApi - functional programming interface
 * @export
 */
export const LoansApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LoansApiAxiosParamCreator(configuration)
    return {
        /**
         * Loans: Create a new loan
         * @summary 
         * @param {LoanRequest} loanRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLoan(loanRequest: LoanRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateLoan200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createLoan(loanRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Your GET endpoint
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLoan(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateLoan200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLoan(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Your GET endpoint
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLoans(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetLoans200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLoans(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {LoanRequest} loanRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLoan(id: string, loanRequest: LoanRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateLoan200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateLoan(id, loanRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LoansApi - factory interface
 * @export
 */
export const LoansApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LoansApiFp(configuration)
    return {
        /**
         * Loans: Create a new loan
         * @summary 
         * @param {LoanRequest} loanRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLoan(loanRequest: LoanRequest, options?: any): AxiosPromise<CreateLoan200Response> {
            return localVarFp.createLoan(loanRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Your GET endpoint
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLoan(id: string, options?: any): AxiosPromise<CreateLoan200Response> {
            return localVarFp.getLoan(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Your GET endpoint
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLoans(options?: any): AxiosPromise<GetLoans200Response> {
            return localVarFp.getLoans(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {LoanRequest} loanRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLoan(id: string, loanRequest: LoanRequest, options?: any): AxiosPromise<UpdateLoan200Response> {
            return localVarFp.updateLoan(id, loanRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LoansApi - object-oriented interface
 * @export
 * @class LoansApi
 * @extends {BaseAPI}
 */
export class LoansApi extends BaseAPI {
    /**
     * Loans: Create a new loan
     * @summary 
     * @param {LoanRequest} loanRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoansApi
     */
    public createLoan(loanRequest: LoanRequest, options?: AxiosRequestConfig) {
        return LoansApiFp(this.configuration).createLoan(loanRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Your GET endpoint
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoansApi
     */
    public getLoan(id: string, options?: AxiosRequestConfig) {
        return LoansApiFp(this.configuration).getLoan(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Your GET endpoint
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoansApi
     */
    public getLoans(options?: AxiosRequestConfig) {
        return LoansApiFp(this.configuration).getLoans(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} id 
     * @param {LoanRequest} loanRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoansApi
     */
    public updateLoan(id: string, loanRequest: LoanRequest, options?: AxiosRequestConfig) {
        return LoansApiFp(this.configuration).updateLoan(id, loanRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
