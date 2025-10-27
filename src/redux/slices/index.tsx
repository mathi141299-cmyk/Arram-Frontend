import authReducer from "./auth";
import layoutReducer from "./layout";
import paginationReducer from "./pagination";
import snackBar from "./snackbar";
import loader from "./loader";
import view from "./view";

export const reducer = {
  layout: layoutReducer,
  auth: authReducer,
  pagination: paginationReducer,
  snackBar: snackBar,
  loader: loader,
  view: view,
};
