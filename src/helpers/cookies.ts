import * as nextCookie from "cookies-next";
import type { OptionsType } from "cookies-next/src/types";

/**
 * Next Cookie
 * documentation: https://github.com/andreizanik/cookies-next
 */
const cookie = {
  set: (key: string, value: any, options?: OptionsType) =>
    nextCookie.setCookie(key, value, {
      ...options,
      maxAge: options?.maxAge || 2147483647 // default: 2147483647 = 2^31 = ~year 2038, source: https://stackoverflow.com/a/11685301
    }),

  getOne: (key: string, options?: OptionsType) =>
    nextCookie.getCookie(key, options),

  deleteOne: (key: string, options?: OptionsType) =>
    nextCookie.deleteCookie(key, options),

  has: (
    key: string,
    options?: OptionsType
  ): nextCookie.CookieValueTypes | undefined => {
    const isAvailable = nextCookie.getCookie(key, options);

    if (isAvailable) {
      return isAvailable;
    }

    return undefined;
  }
};

export default cookie;
