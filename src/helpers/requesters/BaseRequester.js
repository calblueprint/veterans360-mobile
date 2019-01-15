/**
 * Base class for sending requests to different API's
 * using JS fetch. All requests have an endpoint and
 * may accept params, described below:
 *
 * @param {string} endpoint: endpoint route
 * @param {object} params: object containing payload body
 */

// import { getAuthRequestHeaders, refreshAccessToken } from "../utils/session";

class BaseRequester {
  /**
   * GET request on endpoint.
   */
  static async get(endpoint, urlParams) {
    return this._request("GET", endpoint, {}, urlParams);
  }

  /**
   * POST request on endpoint.
   */
  static async post(endpoint, params, urlParams) {
    return this._request("POST", endpoint, params, urlParams);
  }

  /**
   * PATCH request on endpoint.
   */
  static async patch(endpoint, params, urlParams) {
    return this._request("PATCH", endpoint, params, urlParams);
  }

  /**
   * DELETE request on endpoint.
   */
  static async destroy(endpoint, urlParams) {
    return this._request("DELETE", endpoint, {}, urlParams);
  }

  /**
   * Internal method to process all requests, wraps
   * fetch.
   */
  static async _request(method, endpoint, params, urlParams) {
    const requestHeaders = this._getHeaders();

    let payload = {
      method: method,
      headers: requestHeaders
    };

    if (method != "GET") {
      payload.body = JSON.stringify(params);
    }

    let json, headers;
    endpoint = this._encodeUrlParams(endpoint, urlParams);
    try {
      let response = await fetch(endpoint, payload);
      if (!response.ok) {
        throw response;
      }
      headers = response.headers;
      // refreshAccessToken(headers);
      json = response.status === 204 ? {} : await response.json();
    } catch (error) {
      if (!error.json) {
        throw error;
      }
      throw await error.json();
    }

    return { json, headers };
  }

  /**
   * Returns headers to be passed in request.
   */
  static _getHeaders() {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "token-type": "Bearer"
      // ...getAuthRequestHeaders()
    };

    const csrfHeader = document.querySelector('meta[name="csrf-token"]');
    if (csrfHeader) {
      headers["X-CSRF-Token"] = csrfHeader.content;
    }

    return headers;
  }

  /**
   * Encode any URL params for request and return the new
   * query URL.
   */
  static _encodeUrlParams(endpoint, urlParams) {
    if (!urlParams) return endpoint;
    let esc = encodeURIComponent;
    let query = Object.keys(urlParams)
      .map(k => esc(k) + "=" + esc(urlParams[k]))
      .join("&");
    return endpoint + "?" + query;
  }
}

export default BaseRequester;
