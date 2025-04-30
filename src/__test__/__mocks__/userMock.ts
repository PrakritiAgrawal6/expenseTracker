import { ISlotObject } from "../../interfaces/user";

export const mockUser = {
  name: "",
  email: "example@gmail.com",
  password: "",
  id: 1,
  isProfileCompleted: true,
  currentStep: 0,
};

export const mockSlotBooking: ISlotObject = {
  tower: 11,
  slotId: 109,
  date: "2025-03-28",
};
export const mockSlotRelease: ISlotObject = {
  tower: 11,
  slotId: 109,
  date: "2025-03-28",
  userId: "67e3a71ec7f14545b3b2af44",
};
