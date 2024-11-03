import { LoaderLoginResponse } from "./type";

export async function loadLoginStatus(): Promise<LoaderLoginResponse> {
  function parseCookieString(cookieString: string): {
    [key: string]: string;
  } {
    const cookies: { [key: string]: string } = {};
    cookieString.split(";").forEach(function (cookie) {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    return cookies;
  }

  const cookieString = document.cookie;
  const cookies = parseCookieString(cookieString);
  if (cookies["token"] !== undefined) {
    return Promise.resolve({
      isLogin: true,
      token: cookies.token,
      token_type: cookies.token_type,
      name: cookies.name,
    });
  } else {
    return Promise.resolve({ isLogin: false });
  }
}
