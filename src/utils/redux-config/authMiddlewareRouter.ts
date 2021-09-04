import redirectTo from "../redirectTo";
import { role } from "../middlewareRole";

// TODO: here put all routes available to anyone.
export const availableToAll = ['/', '/ingreso', "/registro"];

// TODO: here put routes the node require request to Backend 
export const noRequireRequest = ["/registro", "/ingreso"];

const AuthMiddlewareRouter = (ctx) => {
  const { pathname, reduxStore: store } = ctx;
  const { tokenUser, dataUser: { type } } = store.getState().auth;
  // let urlByRole = role.getUrl(type);

  console.log(pathname, type, tokenUser)

  // const auth = () => {
  //   if (!tokenUser) {
  //     redirectTo("/ingreso", { res: ctx.res, status: 301 });
  //   }
  // };

  // const authNoNeedLogin = () => {
  //   if (tokenUser) redirectTo(urlByRole, { res: ctx.res, status: 301 });
  // };

  // switch (pathname) {
  //   case "/registro":
  //     authNoNeedLogin();
  //     break;
  //   case "/ingreso":
  //     authNoNeedLogin();
  //     break;
  // }

  // if (availableToAll.includes(pathname)) return;
  // if (pathname.indexOf(urlByRole) !== -1) {
  //   auth();
  // } else {
  //   redirectTo(urlByRole, { res: ctx.res, status: 301 });
  // }
};

export default AuthMiddlewareRouter;
