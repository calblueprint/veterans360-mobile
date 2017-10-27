import { HOST_ADDR } from '../secrets';

class APIRoutes {

  static create(route) {
    return HOST_ADDR + route;
  }

  // Authentication
  static veteransSignInPath() {
    return APIRoutes.create('/veterans/sign_in')
  }
}

export { APIRoutes };
