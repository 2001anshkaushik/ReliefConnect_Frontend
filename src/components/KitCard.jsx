import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import { useReliefPackage } from "../context/ReliefPackageContext";

export default function KitCard({ kit }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const {
    addResource,
    removeResource,
    updateQuantity,
    getResourceQuantity,
    isInPackage,
  } = useReliefPackage();

  const quantity = getResourceQuantity(kit.id);
  const inPackage = isInPackage(kit.id);

  const handleAddToPackage = () => {
    addResource(kit);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeResource(kit.id);
    } else {
      updateQuantity(kit.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    if (inPackage) {
      handleQuantityChange(quantity + 1);
    } else {
      handleAddToPackage();
    }
  };

  const handleDecrement = () => {
    handleQuantityChange(quantity - 1);
  };

  return (
    <>
      <Card
        sx={{
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          border: inPackage ? "2px solid #10b981" : "1px solid transparent",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            {/* Kit Icon */}
            <Box
              sx={{
                minWidth: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "grey.50",
                borderRadius: 1,
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: "2rem" }}>{kit.image}</Typography>
            </Box>

            {/* Kit Information */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              {/* Kit Name and Category */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.2,
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {kit.name}
                </Typography>
                <Chip
                  label={kit.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ flexShrink: 0, fontWeight: 500 }}
                />
              </Box>

              {/* Utility Information */}
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: "0.875rem",
                }}
              >
                {kit.utility}
              </Typography>

              {/* Price Display */}
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                ${kit.price}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mb: 2,
                }}
              >
                {kit.description}
              </Typography>

              {/* Stock Status and Quantity Selector */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  label={kit.inStock ? "Available" : "Out of Stock"}
                  color={kit.inStock ? "success" : "error"}
                  size="small"
                  variant="outlined"
                />

                {/* Quantity Selector */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {!inPackage ? (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CartIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToPackage();
                      }}
                      sx={{
                        backgroundColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                    >
                      Add
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        backgroundColor: "primary.light",
                        borderRadius: 1,
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement();
                        }}
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "grey.100",
                          },
                        }}
                      >
                        <RemoveIcon sx={{ fontSize: 16 }} />
                      </IconButton>

                      <Typography
                        variant="body2"
                        sx={{
                          minWidth: "1.5ch",
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        {quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIncrement();
                        }}
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "grey.100",
                          },
                        }}
                      >
                        <AddIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Detailed Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontSize: "2rem" }}>{kit.image}</Typography>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {kit.name}
              </Typography>
              <Chip
                label={kit.category}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
              {kit.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {kit.utility}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Quantity: {kit.quantity}
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>

          {!inPackage ? (
            <Button
              variant="contained"
              startIcon={<CartIcon />}
              onClick={handleAddToPackage}
              sx={{
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Add to Package
            </Button>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={handleDecrement}
                sx={{
                  backgroundColor: "grey.100",
                  "&:hover": {
                    backgroundColor: "grey.200",
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>

              <Typography
                variant="h6"
                sx={{
                  minWidth: "2ch",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {quantity}
              </Typography>

              <IconButton
                onClick={handleIncrement}
                sx={{
                  backgroundColor: "grey.100",
                  "&:hover": {
                    backgroundColor: "grey.200",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
