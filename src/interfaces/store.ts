import { IUser } from "./user";

export interface IStore {
  user: IReducer<IUser>;
}

export interface IReducer<T> {
  data: T;
  isLoading: boolean;
  error: string;
}

export const defaultReduxState = <T>(defaultData: T) => ({
  data: defaultData,
  isLoading: false,
  error: "",
});
