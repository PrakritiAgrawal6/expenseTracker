import { call, put, takeEvery } from "@redux-saga/core/effects";

import { USER_LOGIN } from "../../constants/user";
import { IUser, IUserLogin } from "../../interfaces/user";
import { loginFailed, loginSuccess } from "../actions/userAction";
import { IAction } from "../../interfaces/action";
import { ICustomFetchParams } from "../../interfaces/api";
import { customFetch } from "../../utils/api";
import { LOGIN, POST, USERS } from "../../constants/api";
import { NO_USER_FOUND } from "../../constants/error";

/**
 * Description for the below snippet
 *
 * @param {ICustomFetchParams<IUser | IUserLogin>} param0
 * @param {ICustomFetchParams<any>} param0.data
 * @param {ICustomFetchParams<any>} param0.method
 * @param {ICustomFetchParams<any>} param0.path
 */
async function fetchUser({
  data,
  method,
  path,
}: ICustomFetchParams<IUser | IUserLogin>) {
  try {
    const resp = await customFetch({
      path,
      method,
      data,
    });

    if (resp?.success) {
      const result = resp?.data;
      return result;
    }
    throw new Error(resp?.message);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    } else {
      throw new Error(error as string);
    }
  }
}

/**
 * Description for the below snippet
 *
 * @param {IAction<IUserLogin>} action
 */
function* userLogin(action: IAction<IUserLogin>) {
  const data = action.payload;

  try {
    const response: IUser = yield call(fetchUser, {
      data,
      method: POST,
      path: `${USERS}/${LOGIN}`,
    });
    if (response) yield put(loginSuccess(response));
    else {
      throw new Error(NO_USER_FOUND);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(loginFailed(error?.message as string));
    } else {
      yield put(loginFailed(error as string));
    }
  }
}

function* userSaga() {
  yield takeEvery(USER_LOGIN, userLogin);
}

export default userSaga;
