import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import supabase from "../lib/supabaseClient";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Function to clean user data
  const cleanUserData = (user) => {
    if (!user) return null;
    return {
      id: user.id,
      name: user.user_metadata?.name || "",
      email: user.email,
    };
  };

  // Restore user session when the component mounts
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setError(error.message);
        setUser(null);
      } else if (data?.session?.user) {
        setUser(cleanUserData(data.session.user));
        setError(null);
      } else {
        setUser(null);
        setError(null);
      }

      setLoading(false);
    };

    getSession();

    // Listen for authentication changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(cleanUserData(session?.user || null));
        setLoading(false);
      }
    );

    // Unsubscribe from listener on unmount
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Clear any existing error when navigating to a new route
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  // Register a new user
  const register = async ({ name, email, password }) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) throw error;

      const user = data.user;

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ id: user.id, name });

      if (profileError) throw profileError;

      setUser(cleanUserData(user));
      setLoading(false);
      return user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // Log in with email and password
  const login = async ({ email, password }) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const authenticatedUser = data.user;

      const { data: userRecord, error: fetchError } = await supabase
        .from("profiles")
        .select("id, active, name")
        .eq("id", authenticatedUser.id)
        .single();

      if (fetchError) throw fetchError;

      if (!userRecord.active) {
        await supabase.auth.signOut();
        throw new Error(
          "Your account has been deactivated. Please contact support or create a new account."
        );
      }

      setUser(cleanUserData(data.user));
      setLoading(false);
      return data?.user;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // Log out the current user
  const logout = async () => {
    setError(null);
    setLoading(true);

    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const forgotPassword = async (email) => {
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      return {
        success: true,
        message:
          "If the email address is correct, you'll receive a link to reset your password.",
      };
    } catch (err) {
      console.error(err.message);
      setError("An error occurred while trying to reset your password.");
      return {
        success: false,
        message: "An error occurred while trying to reset your password.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Reset user password
  const resetPassword = async (newPassword) => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Deactivate user account and delete related data
  const deactivateAccount = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!user) throw new Error("User not found.");

      const { error } = await supabase
        .from("profiles")
        .update({ active: false })
        .eq("id", user.id);

      await supabase.from("tasks").delete().eq("user_id", user.id);

      if (error) throw error;

      setUser(null);

      return { success: true, message: "Account successfully deactivated." };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        message: "Error while deactivating the account.",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        deactivateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
