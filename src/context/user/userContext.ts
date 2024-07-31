"use client"
import { IUser, IUserContextType } from "@/mudole/userContext.type";
import { createContext, useContext } from "react";

const userContextDefaultValue: IUserContextType = {
  user: {} as IUser,
  isLoggedIn: false,
  updateUserInfo: () => {},
  handleLogout: () => {}
};

export const UserContext = createContext<IUserContextType>(userContextDefaultValue);

 export const useUserContext = ()=> useContext(UserContext)
