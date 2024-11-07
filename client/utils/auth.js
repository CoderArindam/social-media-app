import Cookies from "js-cookie";

export const setCookie = (name, value) =>
  Cookies.set(name, value, { expires: 1 });
export const getCookie = (name) => Cookies.get(name);
export const removeCookie = (name) => Cookies.remove(name);
