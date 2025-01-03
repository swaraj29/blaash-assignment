import React, { useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "../firebase";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    try {
      console.log("Attempting Google login...");
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log("User logged in:", result.user);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setError("Failed to login with Google. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      console.log("Attempting logout...");
      await signOut(auth);
      setUser(null);
      setShowDropdown(false);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Failed to logout. Please try again.");
    }
  };

  // Handle OTP-based email login
  const handleEmailLogin = async () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting email login...");
      const actionCodeSettings = {
        url: window.location.origin,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      setIsEmailSent(true);
      console.log("Email sent to:", email);

      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.error("Error sending email:", error);
      setError("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Check if the user is returning from the email link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      console.log("Detected email sign-in link...");
      const email = window.localStorage.getItem("emailForSignIn");
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            setUser(result.user);
            console.log("User logged in with email link:", result.user);
            window.localStorage.removeItem("emailForSignIn");
          })
          .catch((error) => {
            console.error("Error signing in with email link:", error);
            setError("Failed to login with email link. Please try again.");
          });
      }
    }
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User state changed: logged in", user);
        setUser(user);
      } else {
        console.log("User state changed: logged out");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center bg-[#1E1E1E] p-4 gap-12">
      <div className="text-white text-lg mr-auto">Design Studio</div>

      {/* Support Request Button */}
      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        Support Request
      </button>

      {/* Product Tour Button */}
      <button className="flex items-center gap-2 bg-[#2D2D30] text-[#858585] px-3 py-1.5 rounded">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
        </svg>
        Product Tour
      </button>

      {/* Search Bar */}
      <div className="flex-1 relative max-w-[200px]">
        <input
          type="text"
          placeholder="Search Project..."
          className="w-full bg-[#3C3C3C] text-[#858585] px-3 py-1.5 rounded placeholder-[#858585]"
        />
        <svg
          className="absolute right-3 top-1.5 w-5 h-5 text-[#858585]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* Notification Button */}
      <button className="text-[#858585]">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>

      {/* User Profile Section */}
      {user ? (
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
              {user.displayName?.charAt(0)}
            </div>
            <span className="text-white">{user.displayName}</span>
            <svg
              className="w-4 h-4 text-[#858585]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2D2D30] rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-white hover:bg-[#3C3C3C] rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // Login with Email or Google
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded transition-all duration-300"
          >
            Login with Email
          </button>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded transition-all duration-300"
          >
            Login with Google
          </button>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#2D2D30] p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-white text-lg mb-4">Enter your email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#3C3C3C] text-white px-3 py-2 rounded placeholder-[#858585] mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="bg-[#3C3C3C] text-[#858585] px-3 py-2 rounded hover:bg-[#4C4C4C] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailLogin}
                disabled={isLoading || isEmailSent}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? "Sending..." : isEmailSent ? "Email Sent" : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !showEmailModal && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Header;