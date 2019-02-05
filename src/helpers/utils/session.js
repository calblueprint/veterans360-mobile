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

  static async getUserSession() {
    try {
      const user = await AsyncStorage.getItem("user");
      return JSON.parse(user);
    } catch (error) {
      // TODO: Better error logging
      throw error;
    }
  }

  static async getAuthRequestHeaders() {
    try {
      let user = await AsyncStorage.getItem("user");
      if (!user) throw Error("No user logged in.");
    } catch (error) {
      return {};
    }
    let headerKeys = ["client", "uid", "access-token", "expiry"];
    try {
      let pairs = await AsyncStorage.multiGet(headerKeys);
      pairs.push(["token-type", "Bearer"]);
      return Object.assign(...pairs.map(pair => ({ [pair[0]]: pair[1] })));
    } catch (error) {
      // TODO: Better error logging
      console.warn("No auth headers were able to be retrieved.");
      return {};
    }
  }
}

export default SessionManager;
