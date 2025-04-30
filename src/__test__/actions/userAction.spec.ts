import { COMMON_ERROR } from "../../constants/error";
import {
  CLEAR_LOGIN_USER,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "../../constants/user";
import { IUser } from "../../interfaces/user";

import {
  clearLoginUser,
  loginFailed,
  loginSuccess,
  userLogin,
} from "../../redux/actions/userAction";

const loginDetails = {
  email: "bapu.pradhan@hcltech.com",
  password: "Bapu@123",
};

const user: IUser = {
  name: "Bapu Pradhan",
  email: "bapu.pradhan@hcltech.com",
  password: "Bapu@123",
  role: "employee",
  mobile: "",
};

const actions = {
  userLogin: {
    type: USER_LOGIN,
    payload: loginDetails,
  },
  loginSuccess: {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  },
  loginFailed: {
    type: USER_LOGIN_FAILED,
    payload: COMMON_ERROR,
  },
  clearLoginUser: {
    type: CLEAR_LOGIN_USER,
  },
};

describe("Given cart action creator userLogin", () => {
  describe("When calling userLogin action creator", () => {
    it("will return an action", () => {
      expect(userLogin(loginDetails)).toEqual(actions?.userLogin);
    });
  });
});

describe("Given cart action creator loginSuccess", () => {
  describe("When calling loginSuccess action creator", () => {
    it("will return an action", () => {
      expect(loginSuccess(user)).toEqual(actions?.loginSuccess);
    });
  });
});

describe("Given cart action creator petsFetchFailed", () => {
  describe("When calling petsFetchFailed action creator", () => {
    it("will return an obj", () => {
      expect(loginFailed(COMMON_ERROR)).toEqual(actions?.loginFailed);
    });
  });
});

describe("Given cart action creator clearLoginUser", () => {
  describe("When calling clearLoginUser action creator", () => {
    it("will return an obj", () => {
      expect(clearLoginUser()).toEqual(actions?.clearLoginUser);
    });
  });
});
