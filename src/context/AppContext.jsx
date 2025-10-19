import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [recommendation, setRecommendation] = useState(null);
  const [order, setOrder] = useState(null);
  const [username, setUsername] = useState("");
  const [offlineMode, setOfflineMode] = useState(false);

  // persist simple username for personalization
  useEffect(() => {
    const stored = localStorage.getItem("rc_username");
    if (stored) setUsername(stored);
    const storedOffline = localStorage.getItem("rc_offline");
    if (storedOffline === "true") setOfflineMode(true);
  }, []);

  useEffect(() => {
    if (username) localStorage.setItem("rc_username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("rc_offline", offlineMode ? "true" : "false");
  }, [offlineMode]);

  return (
    <AppContext.Provider
      value={{
        recommendation,
        setRecommendation,
        order,
        setOrder,
        username,
        setUsername,
        offlineMode,
        setOfflineMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
