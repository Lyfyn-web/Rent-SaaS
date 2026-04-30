import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth as useClerkAuth } from "@clerk/clerk-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get Clerk user state and session
  const {
    isSignedIn: isClerkSignedIn,
    user: clerkUser,
    isLoaded: isClerkLoaded,
  } = useUser();
  const { getToken } = useClerkAuth();

  // Create an Axios instance
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // console.log("Base URL: ", import.meta.env.VITE_APP_BASE_URL);

  // Add a request interceptor to attach the access token to all requests
  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      // For Clerk users, the token will be added in the effect below
      return config;
    },
    (error) => Promise.reject(error),
  );

  const logout = () => {
    console.log("Logging out");
    setIsLoggedIn(false);
    setUser("");
    setAccessToken("");
    console.log("State cleared, redirecting to login...");

    // Note: Clerk logout needs to be handled separately via useClerk().signOut()
    // The Navbar component will handle Clerk signOut when needed

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Add an interceptor to handle the refresh token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error?.response?.status;

      // If access token is expired
      if (status === 403 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try refreshing the access token
          const { data } = await api.post("/api/refresh");
          const newAccessToken = data.accessToken;

          // Update the access token in your application context
          setAccessToken(newAccessToken);

          // Retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired or invalid:", refreshError);
          logout(); // Call the logout function from context
          return Promise.reject(refreshError);
        }
      }

      // If unauthorized, log out the user
      if (status === 401) {
        logout();
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    // Handle Clerk authentication
    if (isClerkLoaded) {
      if (isClerkSignedIn && clerkUser) {
        // User is signed in with Clerk - get their token and sync with our auth state
        const getClerkToken = async () => {
          try {
            const token = await getToken();
            if (token) {
              setAccessToken(token);

              // Sync Clerk user with backend and get the database userId
              let dbUserId = clerkUser.id; // Fallback to Clerk ID
              try {
                const clerkEmail =
                  clerkUser.primaryEmailAddress?.emailAddress || "";
                const clerkName =
                  clerkUser.fullName || clerkUser.firstName || "User";

                const syncResponse = await api.post(
                  "/api/clerk-user-sync",
                  {
                    clerkUserId: clerkUser.id,
                    email: clerkEmail,
                    name: clerkName,
                  },
                  { withCredentials: true },
                );

                console.log(
                  "Clerk user synced with backend:",
                  syncResponse.data,
                );

                // Use the database userId from the sync response
                if (syncResponse.data?.userId) {
                  dbUserId = syncResponse.data.userId;
                }
              } catch (syncError) {
                console.error(
                  "Error syncing Clerk user with backend:",
                  syncError,
                );
              }

              setUser({
                id: dbUserId, // Use database userId for API calls
                name: clerkUser.fullName || clerkUser.firstName || "User",
                email: clerkUser.primaryEmailAddress?.emailAddress || "",
                avatarUrl: clerkUser.imageUrl || "",
                role: "USER",
                authProvider: "clerk",
              });
              setIsLoggedIn(true);
            }
          } catch (error) {
            console.error("Error getting Clerk token:", error);
            setLoading(false);
          } finally {
            setLoading(false);
          }
        };
        getClerkToken();
      } else if (accessToken && !isClerkSignedIn) {
        // User is signed in with custom auth
        const getUserProfile = async () => {
          try {
            const response = await api.get("/api/users/profile", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser({ ...response.data, authProvider: "custom" });
            setIsLoggedIn(true);
          } catch (error) {
            console.error("Error fetching user profile:", error);
            logout();
          } finally {
            setLoading(false);
          }
        };
        getUserProfile();
      } else {
        // No authentication
        setUser("");
        setIsLoggedIn(false);
        setLoading(false);
      }
    }
  }, [isClerkLoaded, isClerkSignedIn, clerkUser, accessToken, getToken, api]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const login = async (accessToken) => {
    setAccessToken(accessToken);
    setIsLoggedIn(true);
    console.log("Token set on login:", accessToken);

    try {
      const response = await api.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser({ ...response.data, authProvider: "custom" });
      console.log("User set useEffect on login:", response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout(); // Logout if fetching user profile fails
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await api.post("/api/refresh");
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
        refreshAccessToken,
        accessToken,
        setAccessToken,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
