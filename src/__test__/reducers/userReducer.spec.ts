import { COMMON_ERROR } from "../../constants/error";
import { defaultUser, IUser } from "../../interfaces/user";
import {
  clearLoginUser,
  loginFailed,
  loginSuccess,
  userLogin,
} from "../../redux/actions/userAction";
import loginUserReducer from "../../redux/reducers/userReducer";

const initialState = {
  data: defaultUser,
  error: "",
  isLoading: false,
};

const state = initialState;

const userDetails: IUser = {
  name: "Bapu Pradhan",
  email: "bapu.pradhan@hcltech.com",
  password: "Bapu@123",
  mobile: "",
  role: "admin"
};

const user = {
  email: "bapu.pradhan@hcltech.com",
  password: "Bapu@123",
};

describe("Given loginUserReducer", () => {
  describe("When calling loginUserReducer with USER_LOGIN action", () => {
    it("will return state with loading true", () => {
      expect(loginUserReducer(state, userLogin(user))).toEqual({
        ...state,
        isLoading: true,
      });
    });
  });

  describe("When calling loginUserReducer with USER_LOGIN_SUCCESS action", () => {
    it("will return state with cart data", () => {
      expect(loginUserReducer(state, loginSuccess(userDetails))).toEqual({
        ...state,
        isLoading: false,
        data: userDetails,
        error: "",
      });
    });
  });

  describe("When calling loginUserReducer with USER_LOGIN_FAILED action", () => {
    it("will return state with error", () => {
      expect(loginUserReducer(state, loginFailed(COMMON_ERROR))).toEqual({
        ...state,
        isLoading: false,
        error: COMMON_ERROR,
      });
    });
  });

  describe("When calling loginUserReducer with CLEAR_LOGIN_USER action", () => {
    it("will return state with error", () => {
      expect(loginUserReducer(state, clearLoginUser())).toEqual(initialState);
    });
  });

  describe("When calling loginUserReducer with any other action", () => {
    it("will return state without updating the state", () => {
      expect(loginUserReducer(state, { type: "default" })).toEqual(state);
    });
  });
});
