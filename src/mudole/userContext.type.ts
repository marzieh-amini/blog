export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
}
export interface IUserContextType {
  user: IUser;
  isLoggedIn: boolean;
  updateUserInfo: () => void;
  handleLogout: () => void;
}

export interface IUserContextProps {
  children: React.ReactNode;
}

export interface IUserContextState {
  user: any;
  isLoggedIn: boolean;
}
