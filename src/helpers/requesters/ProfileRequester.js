import BaseRequester from "./BaseRequester";
import { APIRoutes } from "../routes/routes";

class ProfileRequester {
  static async getCurrentUser(id) {
    try {
      let { json, headers } = await BaseRequester.get(APIRoutes.getProfile(id));
      return json;
    } catch (error) {
      return error;
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
      let { json, headers } = await BaseRequester.patch(endpoint, params);
      return json;
    } catch (error) {
      return error;
    }
  }
}

export default ProfileRequester;
