import BaseRequester from './BaseRequester';
import { APIRoutes } from '../routes/routes';

class ProfileRequester {
  static async getCurrentUser(id) {
    try {
      let currentUser = {};
      currentUser = await BaseRequester.get(APIRoutes.getProfile(id));
      return Promise.resolve(currentUser);
    } catch(error) {
      return Promise.reject(currentUser);
    }
  }

    static async updateUser(params) {
      // let params = {
      //   veteran: {
      //     first_name: veteran.first_name,
      //     last_name: veteran.last_name,
      //     email: veteran.email,
      //     phone: veteran.phone,
      //   }
      // }
      const endpoint = APIRoutes.getProfile(params.veteran.id);
      try {
        let currentUser = {};
        currentUser = await BaseRequester.patch(endpoint, params);
        return Promise.resolve(currentUser);
      } catch(error) {
        return Promise.reject(currentUser);
      }

    return BaseRequester.patch(APIRoutes.getProfile(params.veteran.id), params);
    }
  }

export default ProfileRequester;
