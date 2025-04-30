import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  CLEAR_LOGIN_USER,
} from "../../constants/user";
import { IUser, IUserLogin } from "../../interfaces/user";

export /**
 * Description for the below snippet
 *
 * @param {IUserLogin} payload
 * @returns {{ type: any; payload: IUserLogin; }}
 */
const userLogin = (payload: IUserLogin) => ({
  type: USER_LOGIN,
  payload,
});

export /**
 * Description for the below snippet
 *
 * @param {IUser} payload
 * @returns {{ type: any; payload: IUser; }}
 */
const loginSuccess = (payload: IUser) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

export /**
 * Description for the below snippet
 *
 * @param {string} payload
 * @returns {{ type: any; payload: string; }}
 */
const loginFailed = (payload: string) => ({
  type: USER_LOGIN_FAILED,
  payload,
});

export /**
 * Description for the below snippet
 *
 * @returns {{ type: any; }}
 */
const clearLoginUser = () => ({
  type: CLEAR_LOGIN_USER,
});
