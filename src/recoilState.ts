import { atom } from "recoil";

export const isDarkState = atom<boolean>({
  key: "isDark",
  default: false,
});
