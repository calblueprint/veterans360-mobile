/**
 * Base class for sending requests to different API's
 * using JS fetch. All requests have an endpoint and
 * may accept params, described below:
 *
 * @param {string} endpoint: endpoint route
 * @param {object} params: object containing payload body
 */

class BaseRequester {

  /**
   * GET request on endpoint.
   */
  static get(endpoint, urlParams) {
    return this._request(
      'GET', endpoint, {}, urlParams
    );
  }

  /**
   * POST request on endpoint.
   */
  static async post(endpoint, params, urlParams) {
    return this._request(
      'POST', endpoint, params, urlParams
    );
  }

  /**
   * PATCH request on endpoint.
   */
  static patch(endpoint, params, urlParams) {
    return this._request(
      'PATCH', endpoint, params, urlParams
    );
  }

  /**
   * DELETE request on endpoint.
   */
  static destroy(endpoint, urlParams) {
    return this._request(
      'DELETE', endpoint, {}, urlParams
    );
  }

  /**
   * Internal method to process all requests, wraps
   * fetch.
   */
  static async _request(method, endpoint, params, urlParams) {
    const headers = this._getHeaders();

    let payload = {
      method: method,
      headers: headers,
    }

    if (method != 'GET') {
      payload.body = JSON.stringify(params);
    }

    endpoint = _encodeUrlParams(endpoint, urlParams);

    return fetch(endpoint, payload).then((response) => {
      if (!response.ok) { throw response; }
      if (response.status === 204) { return {}; }
      return response.json();
    }).then((json) => {
      return json;
    }).catch((error) => {
      if (!error.json) {
        throw error;
      }
      return error.json().then((json) => {
        throw json;
      });
    });
  }

  /**
   * Returns headers to be passed in request.
   */
  static _getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  /**
   * Encode any URL params for request and return the new
   * query URL.
   */
  static _encodeUrlParams(endpoint, urlParams) {
    if (!urlParams) return endpoint;
    let esc = encodeURIComponent;
    let query = Object.keys(urlParams)
      .map(k => esc(k) + '=' + esc(urlParams[k]))
      .join('&');
    return endpoint + '?' + query;
  }

}

export default BaseRequester;
