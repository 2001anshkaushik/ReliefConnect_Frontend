import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import InformationHub from "./pages/InformationHub";
import VolunteerPortal from "./pages/VolunteerPortal";
import CommunityBoard from "./pages/CommunityBoard";
import DisasterPreparedness from "./pages/DisasterPreparedness";
import OrderPage from "./pages/Order";
import TrackOrder from "./pages/TrackOrder";
import ReportFraud from "./pages/ReportFraud";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
import { AppProvider } from "./context/AppContext";
import { ReliefPackageProvider } from "./context/ReliefPackageContext";
import { CustomKitsProvider } from "./context/CustomKitsContext";
import { NotificationProvider } from "./components/Notifications";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <ReliefPackageProvider>
          <CustomKitsProvider>
            <NotificationProvider>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recommend" element={<Recommend />} />
                  <Route path="/order" element={<OrderPage />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/information" element={<InformationHub />} />
                  <Route path="/volunteer" element={<VolunteerPortal />} />
                  <Route path="/community" element={<CommunityBoard />} />
                  <Route
                    path="/preparedness"
                    element={<DisasterPreparedness />}
                  />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/report-fraud" element={<ReportFraud />} />
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense
                        fallback={<div style={{ padding: 24 }}>Loading...</div>}
                      >
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/dashboard/:orderId"
                    element={
                      <Suspense
                        fallback={<div style={{ padding: 24 }}>Loading...</div>}
                      >
                        <Dashboard />
                      </Suspense>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </CustomKitsProvider>
        </ReliefPackageProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
