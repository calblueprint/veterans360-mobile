/**
 * Interface to AsyncStorage for managing user sessions.
 */

import { AsyncStorage } from "react-native";

class SessionManager {
  static async storeUserSession(user, headers, errorHandler) {
    let pairs = [["user", JSON.stringify(user)]];
    let headerPairs = ["client", "uid", "access-token", "expiry"].map(
      headerKey => {
        return [headerKey, headers.get(headerKey)];
      }
    );
    try {
      await AsyncStorage.multiSet([...pairs, ...headerPairs]);
      console.log("Stored user session!");
    } catch (error) {
      // TODO: Better error logging
      throw error;
    }
  }

  static async removeUserSession(errorHandler) {
    let keys = ["user", "client", "uid", "access-token", "expiry"];
    try {
      await AsyncStorage.multiRemove(keys, errorHandler);
    } catch (error) {
      // TODO: Better error logging
      throw error;
    }
  }

  static async getAuthRequestHeaders() {
    try {
      await AsyncStorage.getItem("user");
    } catch (error) {
      return {};
    }
    let headerKeys = ["client", "uid", "access-token", "expiry"];
    try {
      let pairs = await AsyncStorage.multiGet(headerKeys);
      return Object.assign(...pairs.map(pair => ({ [pair[0]]: pair[1] })));
    } catch (error) {
      // TODO: Better error logging
      console.warn("No auth headers were able to be retrieved.");
      return {};
    }
  }
  //   function getAuthRequestHeaders() {
  //     if (!localStorage.hasOwnProperty("user")) {
  //       return {};
  //     }
  //     return {
  //       client: localStorage.getItem("client"),
  //       uid: localStorage.getItem("uid"),
  //       "access-token": localStorage.getItem("access-token"),
  //       expiry: localStorage.getItem("expiry"),
  //     };
  //   }

  // function cacheUserSession(user, headers) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("client", headers.get("client"));
  //     localStorage.setItem("uid", headers.get("uid"));
  //     localStorage.setItem("access-token", headers.get("access-token"));
  //     localStorage.setItem("expiry", headers.get("expiry"));
  //   }
}

export default SessionManager;
