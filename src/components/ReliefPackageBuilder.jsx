import React, { useState } from "react";
import {
  Box,
  Fab,
  Badge,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WaterIcon from "@mui/icons-material/Water";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate, useLocation } from "react-router-dom";
import { useReliefPackage } from "../context/ReliefPackageContext";

export default function ReliefPackageBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedResources,
    updateQuantity,
    removeResource,
    clearPackage,
    getTotalItems,
    getSubtotal,
    drawerOpen,
    setDrawerOpen,
  } = useReliefPackage();

  // Map category to appropriate icon
  const getCategoryIcon = (category) => {
    const categoryLower = category?.toLowerCase() || "";

    if (categoryLower.includes("food") || categoryLower.includes("nutrition")) {
      return <RestaurantIcon sx={{ color: "#059669" }} />;
    }
    if (
      categoryLower.includes("water") ||
      categoryLower.includes("beverage") ||
      categoryLower.includes("drink")
    ) {
      return <WaterIcon sx={{ color: "#2563eb" }} />;
    }
    if (
      categoryLower.includes("medical") ||
      categoryLower.includes("health") ||
      categoryLower.includes("medicine")
    ) {
      return <LocalHospitalIcon sx={{ color: "#dc2626" }} />;
    }
    if (
      categoryLower.includes("shelter") ||
      categoryLower.includes("housing") ||
      categoryLower.includes("home") ||
      categoryLower.includes("accommodation")
    ) {
      return <HomeIcon sx={{ color: "#7c3aed" }} />;
    }
    if (
      categoryLower.includes("power") ||
      categoryLower.includes("battery") ||
      categoryLower.includes("charging") ||
      categoryLower.includes("electric")
    ) {
      return <BatteryChargingFullIcon sx={{ color: "#f59e0b" }} />;
    }
    if (
      categoryLower.includes("transport") ||
      categoryLower.includes("vehicle") ||
      categoryLower.includes("ride") ||
      categoryLower.includes("evacuation")
    ) {
      return <DirectionsCarIcon sx={{ color: "#059669" }} />;
    }
    // Default icon for general items
    return <InventoryIcon sx={{ color: "#6b7280" }} />;
  };

  const handleQuantityChange = (resourceId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(resourceId, newQuantity);
    }
  };

  const handleReviewPackage = () => {
    navigate("/order", {
      state: {
        selectedResources,
        isPackage: true,
      },
    });
    setDrawerOpen(false);
  };

  const handleClearPackage = () => {
    clearPackage();
    setDrawerOpen(false);
  };

  const getTotalItemsCount = () => {
    return selectedResources.reduce(
      (sum, resource) => sum + (resource.quantity || 1),
      0
    );
  };

  // Don't show floating cart on Order page or Confirmation page
  if (location.pathname === "/order" || location.pathname === "/confirmation") {
    return null;
  }

  if (selectedResources.length === 0) {
    return null; // Don't show FAB if no items
  }

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="relief package"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          backgroundColor: "#059669",
          "&:hover": {
            backgroundColor: "#047857",
          },
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <Badge badgeContent={getTotalItems()} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      {/* Package Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 400, maxWidth: "90vw" },
        }}
      >
        <Box
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Your Relief Package ({getTotalItemsCount()} items)
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Resources List */}
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            {selectedResources.length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", mt: 4 }}
              >
                No items in package yet
              </Typography>
            ) : (
              <List>
                {selectedResources.map((resource) => (
                  <ListItem key={resource.id} sx={{ px: 0, mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                      }}
                    >
                      {getCategoryIcon(resource.category)}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {resource.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {resource.quantity || 1} × ${resource.price || 0}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        ${(resource.price || 0) * (resource.quantity || 1)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              resource.id,
                              (resource.quantity || 1) - 1
                            )
                          }
                          disabled={resource.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{ minWidth: 20, textAlign: "center" }}
                        >
                          {resource.quantity || 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              resource.id,
                              (resource.quantity || 1) + 1
                            )
                          }
                          disabled={resource.quantity >= 10}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeResource(resource.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Summary Section */}
          <Box
            sx={{
              backgroundColor: "#f8fafc",
              p: 2,
              borderRadius: 1,
              mb: 2,
              border: "1px solid #e2e8f0",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2">Total Items:</Typography>
              <Typography variant="body2" fontWeight={600}>
                {getTotalItemsCount()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Subtotal:</Typography>
              <Typography variant="h6" color="primary" fontWeight={700}>
                ${getSubtotal()}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleReviewPackage}
              disabled={selectedResources.length === 0}
              sx={{
                backgroundColor: "#2563eb",
                "&:hover": { backgroundColor: "#1d4ed8" },
              }}
            >
              Review Package & Order
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClearPackage}
              disabled={selectedResources.length === 0}
              fullWidth
            >
              Clear Package
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
