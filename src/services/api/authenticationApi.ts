import axios from "axios";
import { URL_API_LOGIN } from "../../utils/constants";
import { ApiLoginResponse } from "../../utils/type";
import { generateConfig } from "./common";

export const signInApi = async (email: string, password: string): Promise<ApiLoginResponse> => {
  try {
    const res = await fetch(`${URL_API_LOGIN}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      return {
        status: 200,
        data: {
          name: data.name,
          token: data.access_token,
          token_type: data.token_type,
          success: true,
          message: "Login successfully",
        },
      };
    } else {
      return {
        status: data.status_code,
        data: {},
        errors: data.error,
      };
    }
  } catch (err) {
    console.error("Login error:", err);
    return {
      status: 401,
      data: { success: false, message: "Invalid email or password" },
    };
  }
};

export const signUpApi = async (
  email: string,
  password: string,
  name: string
): Promise<ApiLoginResponse> => {
  try {
    const res = await fetch(`${URL_API_LOGIN}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (res.ok) {
      return {
        status: data.status_code,
        data: {
          message: data.message, // Message indicating successful registration
        },
      };
    } else {
      return {
        status: data.status_code,
        // Handle the error responses from backend
        errors: data.error,
        data: {},
      };
    }
  } catch (err) {
    console.error("Registration error:", err);
    return {
      status: 500,
      data: { success: false, message: "An error occurred during registration" },
    };
  }
};

export const signOutApi = async () => {
  const config = await generateConfig(); // Assuming you have a function to generate the configuration
  try {
    const response = await axios.delete(`${URL_API_LOGIN}/logout`, config);
    return {
      success: true,
      message: "Logout successful",
      data: response.data,
    };
  } catch (error) {
    console.error("Error logging out:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error logging out",
      data: null,
    };
  }
};
