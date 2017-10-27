import BaseRequester from './BaseRequester';
import { APIRoutes } from '../routes/routes';

class LoginRequester {

  static login(email, password, onSuccess, onFailure) {
    const params = {
      veteran: {
        email: email,
        password: password,
      },
    };
    const endpoint = APIRoutes.veteransSignInPath();
    try {
      let response = await BaseRequester.post(endpoint, params, onSuccess, onFailure);
      onSuccess && onSuccess(response.veteran);
      return Promise.resolve(response.veteran);
    } catch (error) {
      onFailure && onFailure(error);
      return Promise.reject(error);
    }
  }
}

export default LoginRequester;
