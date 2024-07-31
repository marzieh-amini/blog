"use client";
import {
  IUser,
  IUserContextProps,
  IUserContextState,
  IUserContextType,
} from "@/mudole/userContext.type";
import { getUserInfo } from "@/services/user";
import { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function ProviderUserContext({ children }: IUserContextProps) {
  const router = useRouter();
  const [state, setState] = useState<IUserContextState>({
    user: {} as IUser,
    isLoggedIn: false,
  });
  useEffect(() => {
    updateUserInfo();
  }, []);
  const updateUserInfo = () => {
    getUserInfo()
      .then((res) => {
        const user = res.data.data;
        setState({ ...state, user: user, isLoggedIn: user ? true : false });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const handleLogout = () => {
    logout().then(() => {
      router.push("/");
      setState({ ...state, user: {} as IUser, isLoggedIn: false });
    });
  };
  const value = {
    ...state,
    updateUserInfo,
    handleLogout,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}
