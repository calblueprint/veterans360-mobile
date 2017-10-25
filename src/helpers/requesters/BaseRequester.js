/**
 * Base class for sending requests to different API's
 * using JS fetch. All requests have an endpoint and
 * may accept params, described below:
 *
 * @param {string} endpoint: endpoint route
 * @param {object} params: object containing payload body
 * @param {function} onSuccess: callback executed after
 *          a successful request
 * @param {function} onFailure: callback executed after
 *          a failed request
 */

class BaseRequester {

  /**
   * GET request on endpoint.
   */
  static get(endpoint, onSuccess, onFailure) {
    return this._request(
      'GET', endpoint, {}, onSuccess, onFailure
    );
  }

  /**
   * POST request on endpoint.
   */
  static post(endpoint, params, onSuccess, onFailure) {
    return this._request(
      'POST', endpoint, params, onSuccess, onFailure
    );
  }

  /**
   * PATCH request on endpoint.
   */
  static patch(endpoint, params, onSuccess, onFailure) {
    return this._request(
      'PATCH', endpoint, params, onSuccess, onFailure
    );
  }

  /**
   * DESTROY request on endpoint.
   */
  static destroy(endpoint, onSuccess, onFailure) {
    return this._request(
      'DESTROY', endpoint, {}, onSuccess, onFailure
    );
  }

  /**
   * Internal method to process all requests, wraps
   * fetch.
   */
  static async _request(method, endpoint, params, onSuccess, onFailure) {
    const headers = this._getHeaders();
    return fetch(endpoint, {
      method: method,
      headers: headers,
      body: JSON.stringify(params),
    }).then((response) => {
      return response.json();
    }).then((json) => {
      onSuccess && onSuccess(json);
      return json;
    }).catch((error) => {
      console.error(error);
      onFailure && onFailure(error);
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

}

export default BaseRequester;
