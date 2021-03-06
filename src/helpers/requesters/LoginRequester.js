/**
 * Requester for logging veterans in to the API. See BaseRequester
 * for more documentation.
 */
import { APIRoutes } from "../routes/routes";
import SessionManager from "../utils/session";

import BaseRequester from "./BaseRequester";

class LoginRequester {
  /**
   * Sends a POST request through BaseRequester that attempts
   * to log the user in.
   */
  static async login(email, password) {
    const params = { email: email, password: password };
    const endpoint = APIRoutes.veteransSignInPath();
    try {
      let { json, headers } = await BaseRequester.post(endpoint, params);
      await SessionManager.storeUserSession(json.data, headers);
      return json;
    } catch (error) {
      // Erase user session on login failure in case stale session is there
      await SessionManager.removeUserSession();
      console.error(error);
      throw error;
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
    roles = Object.keys(roles).filter(role => {
      return roles[role];
    });
    const params = {
      veteran: {
        first_name: fields.firstName,
        last_name: fields.lastName,
        email: fields.email,
        password: fields.password,
        password_confirmation: fields.confirmPassword,
        roles: roles ? roles : [],
        description: fields.description,
      },
    };
    const endpoint = APIRoutes.veteransSignUpPath();

    try {
      let { json, headers } = await BaseRequester.post(endpoint, params);
      return json;
    } catch (error) {
      return error;
    }
  }

  static async logout() {
    const endpoint = APIRoutes.veteransSignOutPath();

    try {
      let { json, headers } = await BaseRequester.destroy(endpoint);
      await SessionManager.removeUserSession();
      return json;
    } catch (error) {
      return error;
    }
  }
}

export default LoginRequester;
