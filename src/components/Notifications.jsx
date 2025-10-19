import React, { createContext, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notif, setNotif] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const show = useCallback((message, severity = "info") => {
    setNotif({ open: true, message, severity });
  }, []);

  const handleClose = () => setNotif((s) => ({ ...s, open: false }));

  return (
    <NotificationContext.Provider value={{ show }}>
      {children}
      <Snackbar
        open={notif.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={notif.severity}
          sx={{ width: "100%" }}
        >
          {notif.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}
