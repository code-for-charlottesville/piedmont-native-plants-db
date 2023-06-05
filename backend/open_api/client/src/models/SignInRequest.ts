/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SignInRequest
 */
export interface SignInRequest {
    /**
     * 
     * @type {string}
     * @memberof SignInRequest
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof SignInRequest
     */
    password: string;
}

/**
 * Check if a given object implements the SignInRequest interface.
 */
export function instanceOfSignInRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function SignInRequestFromJSON(json: any): SignInRequest {
    return SignInRequestFromJSONTyped(json, false);
}

export function SignInRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SignInRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
    };
}

export function SignInRequestToJSON(value?: SignInRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
    };
}
