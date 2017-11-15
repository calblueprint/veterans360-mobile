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
  static get(endpoint) {
    return this._request(
      'GET', endpoint, {}
    );
  }

  /**
   * POST request on endpoint.
   */
  static async post(endpoint, params) {
    return this._request(
      'POST', endpoint, params
    );
  }

  /**
   * PATCH request on endpoint.
   */
  static patch(endpoint, params) {
    return this._request(
      'PATCH', endpoint, params
    );
  }

  /**
   * DESTROY request on endpoint.
   */
  static destroy(endpoint) {
    return this._request(
      'DESTROY', endpoint, {}
    );
  }

  /**
   * Internal method to process all requests, wraps
   * fetch.
   */
  static async _request(method, endpoint, params) {
    const headers = this._getHeaders();
    console.log(endpoint);
    let payload = {
      method: method,
      headers: headers,
    };

    if (method != 'GET') {
      payload.body = JSON.stringify(params);
    }

    return fetch(endpoint, payload).then((response) => {
      if (!response.ok) { throw response; }
      return response.json();
    }).then((json) => {
      return json;
    }).catch((error) => {
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

}

export default BaseRequester;
