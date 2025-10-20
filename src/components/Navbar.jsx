import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Alert, Snackbar } from "@mui/material";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [markSafeOpen, setMarkSafeOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder auth state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { label: "Get Help", to: "/recommend", icon: "🆘" },
    { label: "Information Hub", to: "/information", icon: "📚" },
    { label: "Community Board", to: "/community", icon: "👥" },
    { label: "I Want to Help", to: "/volunteer", icon: "🤝" },
    { label: "Aid Kits", to: "/aid-kits", icon: "🛡️" },
  ];

  const handleMarkSafe = () => {
    // Simulate marking safe - in a real app this would send to backend
    setSnackbarMessage(
      "Your safety status has been updated. Thank you for letting us know you're safe!"
    );
    setSnackbarOpen(true);
    setMarkSafeOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        elevation={2}
        sx={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderRadius: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}
          >
            <FavoriteIcon sx={{ color: "#fff" }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              ReliefConnect
            </Typography>
          </Box>

          {/* Authentication Button */}
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "rgba(255, 255, 255, 0.5)",
              mr: 2,
              "&:hover": {
                borderColor: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Sign In / Sign Up
          </Button>

          {/* Mark Safe Button - Only visible when logged in */}
          {isLoggedIn && (
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={() => setMarkSafeOpen(true)}
              sx={{
                backgroundColor: "#f59e0b",
                color: "#fff",
                mr: 2,
                "&:hover": {
                  backgroundColor: "#d97706",
                },
              }}
            >
              I Am Safe
            </Button>
          )}

          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              {menuItems.map((m) => (
                <Button
                  key={m.to}
                  color="inherit"
                  component={RouterLink}
                  to={m.to}
                  sx={{
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {m.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }} role="presentation">
          <Typography variant="h6" sx={{ px: 2, pb: 2, fontWeight: 600 }}>
            Navigation
          </Typography>
          <List>
            {menuItems.map((m) => (
              <ListItem key={m.to} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={m.to}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <span style={{ fontSize: "1.2rem" }}>{m.icon}</span>
                  </ListItemIcon>
                  <ListItemText primary={m.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* Authentication Link for Mobile */}
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/login"
                onClick={() => setOpen(false)}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <span style={{ fontSize: "1.2rem" }}>🔐</span>
                </ListItemIcon>
                <ListItemText primary="Sign In / Sign Up" />
              </ListItemButton>
            </ListItem>

            {/* Mark Safe Link for Mobile - Only visible when logged in */}
            {isLoggedIn && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setMarkSafeOpen(true);
                    setOpen(false);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleIcon sx={{ color: "#f59e0b" }} />
                  </ListItemIcon>
                  <ListItemText primary="I Am Safe" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Mark Safe Dialog */}
      <Dialog open={markSafeOpen} onClose={() => setMarkSafeOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleIcon sx={{ color: "#10b981" }} />
            Mark Yourself Safe
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you safe and out of immediate danger? This will update your
            safety status and let your contacts know you're okay.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMarkSafeOpen(false)}>Cancel</Button>
          <Button
            onClick={handleMarkSafe}
            variant="contained"
            sx={{ backgroundColor: "#10b981" }}
          >
            Yes, I Am Safe
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
