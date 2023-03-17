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
import { AttachLoan200Response } from '../models';
// @ts-ignore
import { AttachLoanRequest } from '../models';
// @ts-ignore
import { CreateCustomer200Response } from '../models';
// @ts-ignore
import { CustomerLoans200Response } from '../models';
// @ts-ignore
import { CustomerTransactions200Response } from '../models';
// @ts-ignore
import { CustomersSearch200Response } from '../models';
// @ts-ignore
import { GetCustomer200Response } from '../models';
// @ts-ignore
import { GetCustomers200Response } from '../models';
// @ts-ignore
import { StoreCustomerRequest } from '../models';
// @ts-ignore
import { UpdateCustomer200Response } from '../models';
/**
 * CustomersApi - axios parameter creator
 * @export
 */
export const CustomersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {AttachLoanRequest} [attachLoanRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachLoan: async (id: string, attachLoanRequest?: AttachLoanRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('attachLoan', 'id', id)
            const localVarPath = `/customers/{id}/attach-loan`
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
            localVarRequestOptions.data = serializeDataIfNeeded(attachLoanRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Customers: create customer
         * @summary 
         * @param {StoreCustomerRequest} storeCustomerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCustomer: async (storeCustomerRequest: StoreCustomerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeCustomerRequest' is not null or undefined
            assertParamExists('createCustomer', 'storeCustomerRequest', storeCustomerRequest)
            const localVarPath = `/customers`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(storeCustomerRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerLoans: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('customerLoans', 'id', id)
            const localVarPath = `/customers/{id}/loans`
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
         * @summary 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerTransactions: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('customerTransactions', 'id', id)
            const localVarPath = `/customers/{id}/transactions`
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
         * @summary 
         * @param {string} q 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customersSearch: async (q: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'q' is not null or undefined
            assertParamExists('customersSearch', 'q', q)
            const localVarPath = `/customers/search`;
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

            if (q !== undefined) {
                localVarQueryParameter['q'] = q;
            }


    
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
         * @param {string} id Customer Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCustomer: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getCustomer', 'id', id)
            const localVarPath = `/customers/{id}`
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
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCustomers: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/customers`;
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
         * @param {string} id Customer Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCustomer: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateCustomer', 'id', id)
            const localVarPath = `/customers/{id}`
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


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CustomersApi - functional programming interface
 * @export
 */
export const CustomersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CustomersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {AttachLoanRequest} [attachLoanRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async attachLoan(id: string, attachLoanRequest?: AttachLoanRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AttachLoan200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.attachLoan(id, attachLoanRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Customers: create customer
         * @summary 
         * @param {StoreCustomerRequest} storeCustomerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createCustomer(storeCustomerRequest: StoreCustomerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateCustomer200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createCustomer(storeCustomerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerLoans(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CustomerLoans200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerLoans(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerTransactions(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CustomerTransactions200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerTransactions(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} q 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customersSearch(q: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CustomersSearch200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customersSearch(q, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCustomer(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetCustomer200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCustomer(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCustomers(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetCustomers200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCustomers(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCustomer(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateCustomer200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateCustomer(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CustomersApi - factory interface
 * @export
 */
export const CustomersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CustomersApiFp(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {AttachLoanRequest} [attachLoanRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachLoan(id: string, attachLoanRequest?: AttachLoanRequest, options?: any): AxiosPromise<AttachLoan200Response> {
            return localVarFp.attachLoan(id, attachLoanRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * Customers: create customer
         * @summary 
         * @param {StoreCustomerRequest} storeCustomerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCustomer(storeCustomerRequest: StoreCustomerRequest, options?: any): AxiosPromise<CreateCustomer200Response> {
            return localVarFp.createCustomer(storeCustomerRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerLoans(id: string, options?: any): AxiosPromise<CustomerLoans200Response> {
            return localVarFp.customerLoans(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerTransactions(id: string, options?: any): AxiosPromise<CustomerTransactions200Response> {
            return localVarFp.customerTransactions(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} q 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customersSearch(q: string, options?: any): AxiosPromise<CustomersSearch200Response> {
            return localVarFp.customersSearch(q, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCustomer(id: string, options?: any): AxiosPromise<GetCustomer200Response> {
            return localVarFp.getCustomer(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCustomers(options?: any): AxiosPromise<GetCustomers200Response> {
            return localVarFp.getCustomers(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} id Customer Id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCustomer(id: string, options?: any): AxiosPromise<UpdateCustomer200Response> {
            return localVarFp.updateCustomer(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CustomersApi - object-oriented interface
 * @export
 * @class CustomersApi
 * @extends {BaseAPI}
 */
export class CustomersApi extends BaseAPI {
    /**
     * 
     * @summary 
     * @param {string} id Customer Id
     * @param {AttachLoanRequest} [attachLoanRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public attachLoan(id: string, attachLoanRequest?: AttachLoanRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).attachLoan(id, attachLoanRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Customers: create customer
     * @summary 
     * @param {StoreCustomerRequest} storeCustomerRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public createCustomer(storeCustomerRequest: StoreCustomerRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).createCustomer(storeCustomerRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public customerLoans(id: string, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).customerLoans(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public customerTransactions(id: string, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).customerTransactions(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} q 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public customersSearch(q: string, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).customersSearch(q, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} id Customer Id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public getCustomer(id: string, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).getCustomer(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public getCustomers(options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).getCustomers(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} id Customer Id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public updateCustomer(id: string, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).updateCustomer(id, options).then((request) => request(this.axios, this.basePath));
    }
}
