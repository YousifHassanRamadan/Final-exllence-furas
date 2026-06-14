import axios from "axios";
import {
  API_ENDPOINTS,
  BASE_URLS,
  LOCAL_STORAGE_KEYS,
} from "../common/constants";
import JwtUtils from "../utils/jwtUtils";

// ─── Raw localStorage helpers ─────────────────────────────────────────────────
const getAccessToken = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
const getRefreshToken = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
const setAccessToken = (t) =>
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, t);
const setRefreshToken = (t) =>
  localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, t);
const clearTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

// ─── Axios instance ───────────────────────────────────────────────────────────
const axiosClient = axios.create({
  baseURL: BASE_URLS.PROD,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Refresh-lock state ───────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  console.log(
    `🔄 [processQueue] Processing ${failedQueue.length} queued requests —`,
    error ? `with ERROR: ${error.message}` : `with new token ✅`,
  );
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

// ─── Attach Bearer token ──────────────────────────────────────────────────────
const attachToken = (config, token) => {
  config.headers = config.headers ?? {};
  config.headers["Authorization"] = `Bearer ${token}`;
  console.log("🛡️  [attachToken] Authorization header set on:", config.url);
  return config;
};

// ─── Logout — only redirects if user was actually logged in ──────────────────
const handleLogout = (wasLoggedIn = false) => {
  console.warn(
    "🚪 [handleLogout] Clearing tokens. Was logged in:",
    wasLoggedIn,
  );
  clearTokens();
  // Only redirect if the user had a session — prevents infinite redirect loops
  // on public pages that fire unauthenticated requests
  if (wasLoggedIn) {
    console.warn("🚪 [handleLogout] Redirecting to /register");
    window.location.href = "/register";
  } else {
    console.warn("🚪 [handleLogout] No active session — NOT redirecting");
  }
};

// ─── Refresh endpoint call ────────────────────────────────────────────────────
const callRefreshEndpoint = async () => {
  const refreshToken = getRefreshToken();
  console.log(
    "🔑 [callRefreshEndpoint] Refresh token from storage:",
    refreshToken ? `${refreshToken.slice(0, 20)}...` : "NULL ❌",
  );

  if (!refreshToken) throw new Error("No refresh token in storage");

  const url = `${BASE_URLS.PROD}${API_ENDPOINTS.CUSTOMER_ENDPOINTS.REFRESH_TOKEN}`;
  console.log("📡 [callRefreshEndpoint] Calling refresh URL:", url);

  try {
    const { data } = await axios.post(
      url,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    console.log("✅ [callRefreshEndpoint] Refresh response data:", data);
    console.log(
      "🆕 [callRefreshEndpoint] New accessToken:",
      data.accessToken ? `${data.accessToken.slice(0, 20)}...` : "MISSING ❌",
    );
    console.log(
      "🆕 [callRefreshEndpoint] New refreshToken:",
      data.refreshToken
        ? `${data.refreshToken.slice(0, 20)}...`
        : "not returned",
    );

    if (!data.accessToken)
      throw new Error("Refresh response missing accessToken");

    setAccessToken(data.accessToken);
    if (data.refreshToken) setRefreshToken(data.refreshToken);
    console.log("💾 [callRefreshEndpoint] Tokens saved to localStorage");

    return data.accessToken;
  } catch (err) {
    console.error("❌ [callRefreshEndpoint] Refresh request FAILED");
    console.error("   Status :", err.response?.status);
    console.error("   Message:", err.message);
    console.error("   Body   :", err.response?.data);
    throw err;
  }
};

// ─── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
axiosClient.interceptors.request.use(
  async (config) => {
    console.group(
      `📤 [Request Interceptor] → ${config.method?.toUpperCase()} ${config.url}`,
    );

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    console.log(
      "🔐 Access token :",
      accessToken ? `${accessToken.slice(0, 20)}...` : "NULL — no session",
    );
    console.log(
      "🔐 Refresh token:",
      refreshToken ? `${refreshToken.slice(0, 20)}...` : "NULL — no session",
    );

    // ✅ NO tokens → public request, skip auth entirely, NO redirect
    if (!accessToken && !refreshToken) {
      console.log("ℹ️  No tokens — public request, skipping auth");
      console.groupEnd();
      return config;
    }

    // ⚠️ Only one token present — corrupted state, clear and move on
    if (!accessToken || !refreshToken) {
      console.warn("⚠️  Only one token found — corrupted state, clearing both");
      clearTokens();
      console.groupEnd();
      return config;
    }

    const expired = JwtUtils.isTokenExpired(accessToken);
    console.log(
      "⏰ Access token expired?",
      expired ? "YES — will refresh" : "NO — token is valid",
    );

    // Token valid → attach and go
    if (!expired) {
      attachToken(config, accessToken);
      console.groupEnd();
      return config;
    }

    // Token expired → refresh
    if (isRefreshing) {
      console.log(
        "⏳ [Request Interceptor] Refresh already in progress — queuing this request",
      );
      console.groupEnd();
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => resolve(attachToken(config, token)),
          reject,
        });
      });
    }

    console.log("🔁 [Request Interceptor] Starting token refresh...");
    isRefreshing = true;

    try {
      const newToken = await callRefreshEndpoint();
      processQueue(null, newToken);
      attachToken(config, newToken);
      console.log(
        "✅ [Request Interceptor] Token refreshed — request will proceed",
      );
      console.groupEnd();
      return config;
    } catch (err) {
      console.error(
        "❌ [Request Interceptor] Token refresh failed — logging out",
      );
      processQueue(err, null);
      console.groupEnd();
      handleLogout(true); // had tokens → was logged in → redirect
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
  (error) => {
    console.error("❌ [Request Interceptor] Request setup error:", error);
    return Promise.reject(error);
  },
);

// ─── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
axiosClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [Response Interceptor] ← ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
    );
    return response;
  },
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    console.group(
      `❌ [Response Interceptor] ← ${status ?? "NO_RESPONSE"} ${original?.method?.toUpperCase()} ${original?.url}`,
    );
    console.error("   Error message:", error.message);
    console.error("   Response body:", error.response?.data);

    const isRefreshUrl = original?.url?.includes(
      API_ENDPOINTS.CUSTOMER_ENDPOINTS.REFRESH_TOKEN,
    );

    if (status !== 401) {
      console.warn(`   Not a 401 (got ${status}) — not retrying`);
      console.groupEnd();
      return Promise.reject(error);
    }
    if (original._retry) {
      console.warn("   Already retried this request once — not retrying again");
      console.groupEnd();
      return Promise.reject(error);
    }
    if (isRefreshUrl) {
      console.warn(
        "   This IS the refresh endpoint — not retrying (would loop)",
      );
      console.groupEnd();
      handleLogout(true);
      return Promise.reject(error);
    }

    // 401 on a request that had no tokens = server just doesn't allow guests
    // Don't refresh, don't redirect — just reject quietly
    const hadTokens = !!getAccessToken() || !!getRefreshToken();
    if (!hadTokens) {
      console.warn(
        "   Got 401 but no tokens in storage — protected endpoint, not redirecting",
      );
      console.groupEnd();
      return Promise.reject(error);
    }

    console.log(
      "🔁 [Response Interceptor] Got 401 — attempting token refresh and retry",
    );
    original._retry = true;

    if (isRefreshing) {
      console.log(
        "⏳ [Response Interceptor] Refresh in progress — queuing retry",
      );
      console.groupEnd();
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            attachToken(original, token);
            resolve(axiosClient(original));
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      const newToken = await callRefreshEndpoint();
      processQueue(null, newToken);
      attachToken(original, newToken);
      console.log(
        "✅ [Response Interceptor] Token refreshed — retrying original request",
      );
      console.groupEnd();
      return axiosClient(original);
    } catch (err) {
      console.error(
        "❌ [Response Interceptor] Refresh failed during retry — logging out",
      );
      processQueue(err, null);
      console.groupEnd();
      handleLogout(true);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosClient;
