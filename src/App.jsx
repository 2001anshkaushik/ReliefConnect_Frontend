import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import InformationHub from "./pages/InformationHub";
import VolunteerPortal from "./pages/VolunteerPortal";
import CommunityBoard from "./pages/CommunityBoard";
import AidKits from "./pages/AidKits";
import OrderPage from "./pages/Order";
import TrackOrder from "./pages/TrackOrder";
import ReportFraud from "./pages/ReportFraud";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
import { AppProvider } from "./context/AppContext";
import { ReliefPackageProvider } from "./context/ReliefPackageContext";
import { CustomKitsProvider } from "./context/CustomKitsContext";
import { NotificationProvider } from "./components/Notifications";
import ReliefPackageBuilder from "./components/ReliefPackageBuilder";
import Confirmation from "./pages/Confirmation";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <ReliefPackageProvider>
          <CustomKitsProvider>
            <NotificationProvider>
              <BrowserRouter>
                <Box
                  sx={{
                    minHeight: "100vh",
                    backgroundColor: "#f8fafc",
                    background:
                      "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
                  }}
                >
                  <Navbar />
                  <Box sx={{ pt: 8 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/recommend" element={<Recommend />} />
                      <Route path="/order" element={<OrderPage />} />
                      <Route path="/confirmation" element={<Confirmation />} />
                      <Route path="/information" element={<InformationHub />} />
                      <Route path="/volunteer" element={<VolunteerPortal />} />
                      <Route path="/community" element={<CommunityBoard />} />
                      <Route path="/aid-kits" element={<AidKits />} />
                      <Route path="/track-order" element={<TrackOrder />} />
                      <Route path="/report-fraud" element={<ReportFraud />} />
                      <Route path="/signup" element={<SignUpPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                        path="/dashboard"
                        element={
                          <Suspense
                            fallback={
                              <div style={{ padding: 24 }}>Loading...</div>
                            }
                          >
                            <Dashboard />
                          </Suspense>
                        }
                      />
                      <Route
                        path="/dashboard/:orderId"
                        element={
                          <Suspense
                            fallback={
                              <div style={{ padding: 24 }}>Loading...</div>
                            }
                          >
                            <Dashboard />
                          </Suspense>
                        }
                      />
                    </Routes>
                  </Box>
                  {/* Global Floating Cart */}
                  <ReliefPackageBuilder />
                </Box>
              </BrowserRouter>
            </NotificationProvider>
          </CustomKitsProvider>
        </ReliefPackageProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
