class ProfileRequester {
  static async getCurrentUser(id) {
    try {
      currentUser = await BaseRequester.get(APIRoutes.getProfile(id))
      return Promise.resolve(currentUser)
    } catch(error) {
      return Promise.reject(currentUser)
    }
  }



    static async updateUser(veteran) {
      let params = {
        veteran: {
          first_name: veteran.first_name,
          last_name: veteran.last_name,
          email: veteran.email,
          phone: veteran.phone
        }
      }
      try {
        currentUser = await BaseRequester.patch(APIRoutes.getProfile(id), params);
        return Promise.resolve(currentUser);
      } catch(error) {
        return Promise.reject(currentUser);
      }

    return BaseRequester.patch(APIRoutes.getProfile(id), params);
    }
  }

export default ProfileRequester;
