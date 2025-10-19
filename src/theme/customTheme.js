import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: { main: "#007BFF" },
    secondary: { main: "#28A745" },
    error: { main: "#DC3545" },
    background: { default: "#F8F9FA", paper: "#FFFFFF" },
    info: { main: "#17a2b8" },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.2rem",
    },
    h2: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
        containedPrimary: {
          backgroundImage: "linear-gradient(90deg, #007BFF, #0056d6)",
        },
        containedSecondary: {
          backgroundImage: "linear-gradient(90deg, #28A745, #1e7e34)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,123,255,0.08)",
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#28A745",
          },
        },
      },
    },
  },
});

export default customTheme;
