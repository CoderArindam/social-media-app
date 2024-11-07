import Cookies from "js-cookie";

export const setCookie = (name, value) =>
  Cookies.set(name, value, { expires: 1 }); // Cookie expires in 1 day

export const getCookie = (name) => Cookies.get(name); // Get cookie value by name

export const removeCookie = (name) => Cookies.remove(name); // Remove cookie by name
