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
  Save as SaveIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useReliefPackage } from "../context/ReliefPackageContext";
import { useCustomKits } from "../context/CustomKitsContext";
import CustomKitDialog from "./CustomKitDialog";

export default function ReliefPackageBuilder() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [kitName, setKitName] = useState("");

  const navigate = useNavigate();
  const {
    selectedResources,
    updateQuantity,
    removeResource,
    clearPackage,
    getTotalItems,
  } = useReliefPackage();
  const { saveKit } = useCustomKits();

  const handleQuantityChange = (resourceId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(resourceId, newQuantity);
    }
  };

  const handleSaveKit = () => {
    if (kitName.trim() && selectedResources.length > 0) {
      saveKit({
        name: kitName.trim(),
        resources: selectedResources,
      });
      setShowSaveDialog(false);
      setKitName("");
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
              Relief Package ({getTotalItemsCount()} items)
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
                  <ListItem key={resource.id} sx={{ px: 0 }}>
                    <Card sx={{ width: "100%", mb: 1 }}>
                      <CardContent sx={{ py: 1, "&:last-child": { pb: 1 } }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, flexGrow: 1 }}
                          >
                            {resource.name}
                          </Typography>
                          <Chip
                            label={
                              resource.status === "available"
                                ? "Available"
                                : resource.status === "limited"
                                ? "Limited"
                                : "Low Stock"
                            }
                            size="small"
                            color={
                              resource.status === "available"
                                ? "success"
                                : resource.status === "limited"
                                ? "warning"
                                : "error"
                            }
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
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
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

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

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={() => setShowSaveDialog(true)}
                disabled={selectedResources.length === 0}
                sx={{ flex: 1 }}
              >
                Save Kit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClearPackage}
                disabled={selectedResources.length === 0}
                sx={{ flex: 1 }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Save Kit Dialog */}
      {showSaveDialog && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowSaveDialog(false)}
        >
          <Card
            sx={{ width: 400, maxWidth: "90vw", p: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Save Custom Kit
            </Typography>
            <TextField
              fullWidth
              label="Kit Name"
              value={kitName}
              onChange={(e) => setKitName(e.target.value)}
              placeholder="e.g., Family Emergency Kit"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSaveKit}
                disabled={!kitName.trim()}
                sx={{ backgroundColor: "#059669" }}
              >
                Save Kit
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}
