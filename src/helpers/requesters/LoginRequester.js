/**
 * Requester for logging veterans in to the API. See BaseRequester
 * for more documentation.
 */
import BaseRequester from './BaseRequester';
import { APIRoutes } from '../routes/routes';

class LoginRequester {

  /**
   * Sends a POST request through BaseRequester that attempts
   * to log the user in.
   */
  static async login(email, password) {
    const params = {
      veteran: {
        email: email,
        password: password,
      },
    };
    const endpoint = APIRoutes.veteransSignInPath();

    try {
      let response_json = await BaseRequester.post(endpoint, params);
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Sends a POST request through BaseRequester that attempts
   * to sign up a user.
   * @param {object} fields: object that contains all sign up fields
   */
  static async signUp(fields) {
    let roles = {
      active_duty: fields.activeDuty,
      veteran: fields.veteran,
      post_911: fields.post_911,
      family_member: fields.familyMember,
      caregiver: fields.caregiver,
      other: fields.other,
    };
    roles = Object.keys(roles).filter((role) => {
      return roles[role];
    });
    const params = {
      veteran: {
        first_name: fields.firstName,
        last_name: fields.lastName,
        email: fields.email,
        password: fields.password,
        password_confirmation: fields.confirmPassword,
        roles: roles,
      },
    };
    const endpoint = APIRoutes.veteransSignUpPath();

    try {
      let response_json = await BaseRequester.post(endpoint, params);
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async logout() {
    const endpoint = APIRoutes.veteransSignOutPath();

    try {
      let response_json = await BaseRequester.destroy(endpoint);
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default LoginRequester;
