/**
 * Helper methods to retrieve all the routes to connect with the API.
 */

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
  }
  static veteranFriendRequestsPath(id) {
    return APIRoutes.create(`/veterans/${id}/requests`);
  }
  static veteranFriendshipsPath(veteran_id) {
    return APIRoutes.create(`/veterans/${veteran_id}/friendships`);
  }
  static veteranRejectFriendshipPath(id) {
    return APIRoutes.create(`/veterans/${id}/friendships/reject`);
  }
  static veteranSubscribePath(veteran_id) {
    return APIRoutes.create(`/veterans/${veteran_id}/subscriptions`);
  }
  static resourcePath(categories) {
    return APIRoutes.create(`/resources/filter_resources/${categories}`);
  static newUpvote() {
    return APIRoutes.create('/upvotes');
  }
  static deleteUpvote() {
    return APIRoutes.create('/upvotes/delete_upvote');
  }

  static resourceCategories() {
    return APIRoutes.create('/resources/get_resource_categories');
  }

  // Partnering Orgs
  static parterOrgsPath() {
    return APIRoutes.create('/partnering_organizations');
  }
}

export { APIRoutes };
