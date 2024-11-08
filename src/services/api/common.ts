import { loadLoginStatus } from "../../utils/loadersFunction";

// Generate config to use in api
export const generateConfig = async () => {
  const token = await loadLoginStatus().then((res) => {
    return res.token;
  });
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
