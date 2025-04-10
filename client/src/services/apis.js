const baseUrl = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: baseUrl + "/auth/signup",
  LOGIN_API: baseUrl + "/auth/login",
  SENDOTP_API: baseUrl + "/auth/send-otp",
};
