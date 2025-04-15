import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoveClicker() {
  const [clicks, setClicks] = useState(0);
  const [message, setMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedClicks = localStorage.getItem("missedClicks");
    const storedMessage = localStorage.getItem("loveMessage");
    if (savedClicks) setClicks(parseInt(savedClicks, 10));
    if (storedMessage) setSavedMessage(storedMessage);
  }, []);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    localStorage.setItem("missedClicks", newClicks);
  };

  const handleSaveMessage = () => {
    setSavedMessage(message);
    localStorage.setItem("loveMessage", message);
    setMessage("");
  };

  const handleLogin = () => {
    const storedPassword = localStorage.getItem("loveAppPassword");
    if (password === storedPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password. Try again!");
    }
  };

  const handleSignup = () => {
    if (signupPassword.length >= 4) {
      localStorage.setItem("loveAppPassword", signupPassword);
      setIsSignupMode(false);
      setSignupPassword("");
      setError("");
    } else {
      setError("Password should be at least 4 characters long.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
        <Card className="bg-white shadow-lg p-6 rounded-2xl text-center w-full max-w-sm">
          <CardContent>
            <Lock className="mx-auto text-pink-500 w-10 h-10 mb-4" />
            {isSignupMode ? (
              <>
                <p className="text-pink-600 mb-2 font-semibold">Create a password to sign up</p>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-2 mb-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="New Password"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <Button
                  onClick={handleSignup}
                  className="bg-pink-500 hover:bg-pink-600 text-white w-full mb-2"
                >
                  Sign Up 💘
                </Button>
                <p className="text-sm text-pink-500">
                  Already have an account?{' '}
                  <button onClick={() => { setIsSignupMode(false); setError(""); }} className="underline">
                    Sign In
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className="text-pink-600 mb-2 font-semibold">Enter password to continue</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mb-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Password"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <Button
                  onClick={handleLogin}
                  className="bg-pink-500 hover:bg-pink-600 text-white w-full mb-2"
                >
                  Sign In 💘
                </Button>
                <p className="text-sm text-pink-500">
                  Don't have an account?{' '}
                  <button onClick={() => { setIsSignupMode(true); setError(""); }} className="underline">
                    Sign Up
                  </button>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-pink-700 mb-4 text-center"
      >
        💖 Thinking of You 💖
      </motion.h1>

      <Card className="bg-white shadow-lg p-4 sm:p-6 rounded-2xl text-center w-full max-w-md">
        <CardContent>
          <p className="text-base sm:text-lg mb-4 text-pink-600">
            Every time we miss each other, just click the heart 💗
          </p>

          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex justify-center mb-4"
          >
            <Button
              className="bg-pink-500 hover:bg-pink-600 text-white p-5 sm:p-6 rounded-full shadow-md"
              onClick={handleClick}
              aria-label="Click when you miss your partner"
            >
              <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>
          </motion.div>

          <p className="text-pink-700 font-semibold text-lg sm:text-xl mb-4">
            Missed Clicks: {clicks}
          </p>

          <div className="mb-4">
            <textarea
              className="w-full p-2 rounded-md border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Write a sweet message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleSaveMessage}
              className="mt-2 bg-pink-400 hover:bg-pink-500 text-white w-full"
            >
              <MessageCircle className="inline-block mr-2 w-4 h-4" /> Save Message
            </Button>
          </div>

          {savedMessage && (
            <div className="mt-4 p-3 bg-pink-50 rounded-xl border border-pink-200 text-pink-700">
              <p className="italic">💌 {savedMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
