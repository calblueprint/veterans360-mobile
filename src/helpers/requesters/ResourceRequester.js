import BaseRequester from './BaseRequester';
import { APIRoutes } from '../routes/routes';

class ResourceRequester {
	static async resources() {
    const endpoint = APIRoutes.resourcePath();
    try {
      let response_json = await BaseRequester.get(endpoint);
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ResourceRequester;
