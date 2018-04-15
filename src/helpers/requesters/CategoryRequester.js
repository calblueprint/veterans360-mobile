import BaseRequester from './BaseRequester';
import { APIRoutes } from '../routes/routes';

class CategoryRequester {
  static async retrieveCategories() {
    try {
      const endpoint = APIRoutes.allCategories();
      let response_json = await BaseRequester.get(endpoint);
      return response_json;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
  /**
   * TODO: serialize categories on backend in resource model
   * @param {string} str
   */
  static formatDict(str) {
    newStr = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '_') {
        newStr += " ";
      } else {
        newStr += str[i];
      }
    }
    return newStr.toUpperCase();
  }
}
export default CategoryRequester;
