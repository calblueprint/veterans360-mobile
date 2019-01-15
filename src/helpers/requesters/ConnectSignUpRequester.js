import BaseRequester from "./BaseRequester";
import { APIRoutes } from "../routes/routes";

class ConnectSignUpRequester {
  /**
   * Sends a PATCH request through BASEREQUESTER to update a user
   * @param {object} fields: veteran object that has all updated fields
   */
  static async signUp(id, values) {
    const params = {
      veteran: {
        military_branch: values.militaryBranch,
        unit: values.unit,
        notes: values.notes,
        phone_number: values.phoneNumber,
        address: values.address,
        accept_messages: values.acceptMessages,
        share_profile: values.shareProfile,
        accept_notices: values.acceptNotices,
        on_connect: true
      }
    };
    const endpoint = APIRoutes.veteransConnectSignUpPath(id);

    try {
      let { json, headers } = await BaseRequester.patch(endpoint, params);
      return json;
    } catch (error) {
      return error;
    }
  }

  static async connectStatus(id) {
    const endpoint = APIRoutes.veteransConnectStatus(id);
    try {
      let { json, headers } = await BaseRequester.get(endpoint);
      return json;
    } catch (error) {
      return error;
    }
  }
}

export default ConnectSignUpRequester;
