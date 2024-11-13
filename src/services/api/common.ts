import { loadEmployerLoginStatus, loadLoginStatus } from "../../utils/loadersFunction";

// Generate config to use in api
export const generateConfig = async () => {
  const token = await loadLoginStatus().then((res) => {
    return res.token;
  });
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const generateEmployerConfig = async () => {
  const token = await loadEmployerLoginStatus().then((res) => {
    return res.token;
  });
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
