import { setLoading, setToken } from "../../redux/slice/AuthSlice";
import { setUser } from "../../redux/slice/UserSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";

const { SIGNUP_API, LOGIN_API, SENDOTP_API } = endpoints;

export function signup(name, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SIGNUP_API, {
        name,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function login(formData, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("Post", LOGIN_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SENDOTP_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("logged out successfully");
    navigate("/");
  };
}
