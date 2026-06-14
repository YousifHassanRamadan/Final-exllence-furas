import { LOCAL_STORAGE_KEYS } from "../common/constants";

export class LocalStorageUtils {
  static getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  static setAccessToken(token) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
  }
  static removeAccessToken() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  static getRefreshToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  }

  static setRefreshToken(refreshToken) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
  static removeRefreshToken() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  }
}
