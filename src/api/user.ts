import { appAxios, masterAxios, ssoAxios } from "./config";
import { User } from "../types";
import { store } from "../store";
import { userActions } from "../store/user";
import base64 from 'base-64';
import DeviceInfo from "react-native-device-info";

export const getAppVersionNumber = DeviceInfo.getVersion();

type LoginParams = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  user: User;
};

type RegisterParams = {
  username: string;
  name: string;
  surname: string;
  email: string;
  birthDate?: string;
  sex?: string;
  password: string;
};
export type RegisterResponse = {
  user: User;
};

type SocialLoginProps = {
  token: string;
  provider: string;
};

export const loginUser = async ({ email, password }: LoginParams) => {
  try {
    const auth = base64.encode(`${email.toLowerCase()}:${password}`);
    const { data } = await ssoAxios.post<LoginResponse>("auth", undefined, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    console.log("loginRes", data);
    if (data.token && data.user) {
      store.dispatch(userActions.setUserDetail(data.user));
      store.dispatch(userActions.setUserToken(data.token));
    }
    return data;
  } catch (e) {
    console.log("loginRes", e);
    return Promise.reject(e);
  }
};

export const registerUser = async ({
  username,
  name,
  surname,
  email,
  birthDate,
  sex,
  password,
}: RegisterParams) => {
  const params = {
    username,
    name,
    surname,
    email,
    birthDate,
    sex,
    password,
  };
  try {
    const { data } = await masterAxios.post<RegisterResponse>(
      "auth/register",
      params
    );
    console.log("registerRes", data);
    const user = await loginUser({ email, password });
    console.log("registerUser", user);
    return user;
  } catch (e) {
    console.log("registerUser", e);
    return Promise.reject(e);
  }
};

export const getMe = async (): Promise<User | null> => {
  try {
    const { data: user } = await appAxios.get("users/me");
    store.dispatch(userActions.setUserDetail(user));
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const { data } = await masterAxios.post("password-resets", {
      email,
    });
    console.log("forgotPassword", data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const handleSocialLogin = async ({
  token,
  provider,
}: SocialLoginProps) => {
  console.log({ token, provider });
  return await masterAxios.post<LoginResponse>("auth/social-login", {
    token,
    provider,
  });
};

export const updateMe = async (user: Partial<User>) => {
  try {
    console.log({ userParams: user });
    const params = {
      ...user,
      appVersion: getAppVersionNumber,
    };
    const { data } = await appAxios.put<User>("users/me", params);
    console.log({ updateMeRes: data });
    store.dispatch(userActions.setUserDetail(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteMe = async () => {
  try {
    const { data } = await appAxios.delete("users/me");
    console.log({ deleteMeRes: data });
    store.dispatch(userActions.clearUserLoggedState());
  } catch (error) {
    console.error(error);
  }
};

export const forgetMe = async () => {
  try {
    const { data } = await appAxios.delete("users/forgetMe");
    console.log({ forgetMeRes: data });
    store.dispatch(userActions.clearUserLoggedState());
  } catch (error) {
    console.error({ forgetMeError: error });
    return Promise.reject(error);
  }
};

export const getAndroidWalletUrl = async () => {
  try {
    const { data } = await appAxios.get("users/me/addToGoogleWallet");
    console.log("getAndroidWalletUrl", data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFriendDetail = async (userId: string) => {
  try {
    const { data } = await appAxios.get<User>(`friends/profile/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const readAllNotification = async () => {
  try {
    await appAxios.put('notifications/read');
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export const getNotificationsCount = async () => {
  try {
    const { data } = await appAxios.get('notifications/count');
    store.dispatch(userActions.setBottomNotifications(data));
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkUsernameAvailability = async (username: string) => {
  const params = {
    username,
  }
  try {
    const { data } = await masterAxios.post(`users/username`,params);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
