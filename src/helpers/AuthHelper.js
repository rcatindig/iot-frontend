import { tokenExpired, packageConsumed } from '../actions/authActions';

// ERROR HANDLER FOR EXPIRED TOKEN, CONSUMED PACKAGE DURATION
export const handleError = (dispatch, defaultFailureAction, error) => {
  if (error.response) {
    if (error.response.status === 400 &&
      error.response.data.error.indexOf("[PACKAGE_CONSUMED]") !== -1) {
      console.log("Package's duration has been consumed")
      dispatch(packageConsumed())
    } else if (error.response.status === 403) {
      console.log("Token has expired")
      dispatch(tokenExpired())
    } else {
      if (error.response === null || error.response === undefined) {
        dispatch(defaultFailureAction(error))
      } else {
        dispatch(defaultFailureAction(error.response.data.error))
      }
    }
  }
}

// LOGOUT HANDLER
export const logoutHandler = (logoutAction, callback) => {
  logoutAction()
    .then(() => {
      callback();
    })
    .catch(() => {
      console.log("Logout handler failed");
      callback("[ERR] Logout handler failed");
    });
}
