import { HOST_ADDR } from '../secrets';

class APIRoutes {

  static create(route) {
    return HOST_ADDR + route;
  }

  // Authentication
  static veteransSignInPath() {
    return APIRoutes.create('/veterans/sign_in');
  }
  static veteransSignUpPath() {
    return APIRoutes.create('/veterans');
  }
  static resourcePath() {
    return APIRoutes.create('/resources');
  }
  static newUpvote() {
    return APIRoutes.create('/upvotes');
  }
  static deleteUpvote(resourceId, veteranId) {
    return APIRoutes.create(`/upvotes/delete_upvote/${resourceId}/${veteranId}`);
  }
}

export { APIRoutes };
