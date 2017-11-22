import BaseRequester from './BaseRequester';
import { APIRoutes } from '../routes/routes';

class UpvoteRequester {
	static async createUpvote(resourceId, veteranId) {
    const endpoint = APIRoutes.newUpvote();
    const params = {
      upvote: {
        veteran_id: veteranId,
        resource_id: resourceId
      }
    };
    try {
      let response_json = await BaseRequester.post(endpoint, params);
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async deleteUpvote(resourceId, veteranId) {
    const endpoint = APIRoutes.deleteUpvote(resourceId, veteranId);
    try {
      let response_json = await BaseRequester.destroy(endpoint);
      return Promise.resolve(response_json);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default UpvoteRequester;
