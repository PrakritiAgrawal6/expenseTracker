export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  mobile: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export const defaultUser: IUser = {
  name: "",
  email: "",
  password: "",
  role: "user",
  mobile: "",
};

export interface ISlotObject {
  tower: number;
  slotId: number;
  date: string;
  userId?: string;
}
