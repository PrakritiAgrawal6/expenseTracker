export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export const defaultUser: IUser = {
  name: "",
  email: "",
  password: "",
};

export interface ISlotObject {
  tower: number;
  slotId: number;
  date: string;
  userId?: string;
}
