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
<<<<<<< HEAD
  static resourcePath() {
    return APIRoutes.create('/resources');
  }
  static newUpvote() {
    return APIRoutes.create('/upvotes');
  }
  static deleteUpvote() {
    return APIRoutes.create('/upvotes/delete_upvote');
=======
  static veteransConnectSignUpPath(id) {
    return APIRoutes.create(`/veterans/${id}/connect_sign_up`);
  }
  static veteransConnectStatus(id) {
    return APIRoutes.create(`/veterans/${id}`);
  }
  static veteransMilitaryBranch() {
    return APIRoutes.create('/veterans/get_military_branch');
>>>>>>> origin/master
  }
}

export { APIRoutes };
