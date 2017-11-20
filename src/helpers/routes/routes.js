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

  // Veterans
  static veteransPath() {
    return APIRoutes.create('/veterans');
  }
  static veteransConnectSignUpPath(id) {
    return APIRoutes.create(`/veterans/${id}/connect_sign_up`);
  }
  static veteransConnectStatus(id) {
    return APIRoutes.create(`/veterans/${id}`);
  }
  static veteransMilitaryBranch() {
    return APIRoutes.create('/veterans/get_military_branch');

  // Partnering Orgs
  static parterOrgsPath() {
    return APIRoutes.create('/partnering_organizations');
  }
}

export { APIRoutes };
