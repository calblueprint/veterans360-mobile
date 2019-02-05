import BaseRequester from "./BaseRequester";
import { APIRoutes } from "../routes/routes";

class CategoryRequester {
  static async retrieveCategories(section) {
    try {
      let endpoint = APIRoutes.allCategories();
      if (section == "Vault") {
        endpoint = APIRoutes.vaultCategories();
      } else if (section == "Response") {
        endpoint = APIRoutes.responseCategories();
      }
      let { json, headers } = await BaseRequester.get(endpoint);
      return json;
    } catch (error) {
      throw error;
    }
  }

  /**
   * TODO: serialize categories on backend in resource model
   * @param {string} str
   */
  static formatDict(str) {
    newStr = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i] == "_") {
        newStr += " ";
      } else {
        newStr += str[i];
      }
    }
    return newStr.toUpperCase();
  }
}
export default CategoryRequester;
