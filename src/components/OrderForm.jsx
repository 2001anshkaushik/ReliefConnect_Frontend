import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../services/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OrderSummary, { renderOrderHtml } from "./OrderSummary";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useReliefPackage } from "../context/ReliefPackageContext";
import { NotificationContext } from "./Notifications";

export default function OrderForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      urgency: "medium", // Set default urgency to prevent undefined value
    },
  });

  const { setOrder } = useContext(AppContext);
  const { show } = useContext(NotificationContext);
  const { username, setUsername } = useContext(AppContext);
  const { recommendation: ctxRecommendation } = useContext(AppContext);
  const { clearPackage } = useReliefPackage();
  const liveRef = React.useRef(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Watch form fields for order summary
  const addressValue = watch("address");
  const nameValue = watch("name");
  const phoneValue = watch("phone");
  const emailValue = watch("email");
  const urgencyValue = watch("urgency");
  const itemsValue = watch("items");

  // Determine if this is a package order or single item
  const selectedResources = state?.selectedResources || [];
  const isPackage = state?.isPackage || false;
  const singleItem = state?.selectedItem;

  // Get items to display
  const itemsToDisplay = isPackage
    ? selectedResources
    : singleItem
    ? [singleItem]
    : [];

  // Geolocation functionality
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Use a geocoding service to get address from coordinates
          // For demo purposes, we'll simulate an address
          const simulatedAddress = `Current Location: ${latitude.toFixed(
            4
          )}, ${longitude.toFixed(
            4
          )}\n\nEmergency Relief Center\n123 Main Street\nYour City, State 12345\n\nCoordinates: ${latitude}, ${longitude}`;

          setValue("address", simulatedAddress);
          setCurrentAddress(simulatedAddress);
          setLocationLoading(false);

          if (liveRef.current) {
            liveRef.current.textContent =
              "Current location detected and address filled";
          }
          show("Location detected and address filled automatically", "success");
        } catch (error) {
          setLocationError("Failed to get address from location.");
          setLocationLoading(false);
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  useEffect(() => {
    const rec = state?.recommendation ?? ctxRecommendation;
    if (rec) {
      const itemsValue =
        typeof rec === "string" ? rec : JSON.stringify(rec.items ?? rec);
      setValue("items", itemsValue);
      // announce for screen readers that items were auto-filled
      if (liveRef.current)
        liveRef.current.textContent =
          "Order items auto-filled from recommendation";
    }
    // prefill name from context if available
    if (username) {
      setValue("name", username);
    }
  }, [state, setValue, username]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email || "",
        urgency: data.urgency || "medium",
        payment: {
          cardLast4: data.cardNumber ? data.cardNumber.slice(-4) : "1234",
          type: "demo-card",
        },
        items: itemsToDisplay,
        isPackage: isPackage,
        timestamp: new Date().toISOString(),
      };

      // Try online first, fallback to offline mode if API is unavailable
      let res;
      try {
        res = await createOrder(payload);
      } catch (apiError) {
        console.log("API unavailable, using offline mode");
        res = await createOrder(payload, { offline: true });
      }

      const completeOrderData = {
        ...res, // API response (contains id, timestamp, etc.)
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email || "",
        urgency: data.urgency || "medium",
        items: itemsToDisplay, // Complete items with prices and quantities
        isPackage: isPackage,
      };

      setOrder(completeOrderData); // Keep for context compatibility

      // Clear package if this was a package order
      if (isPackage) {
        clearPackage();
      }

      // persist username for future visits
      if (!username && data.name) setUsername(data.name);
      show("Order placed successfully", "success");
      // navigate to confirmation page with complete order data
      navigate("/confirmation", { state: { order: completeOrderData } });
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Order failed";
      show(msg, "error");
    }
  };

  const handleOrderRetry = async () => {
    // Re-attempt placing the order using the last filled form values
    const items = (document.querySelector('textarea[name="items"]') || {})
      .value;
    const name = (document.querySelector('input[name="name"]') || {}).value;
    const address = (document.querySelector('textarea[name="address"]') || {})
      .value;
    const payload = { name, address, payment: "demo-card", items };
    if (liveRef.current)
      liveRef.current.textContent = "Retrying order submission";
    try {
      const res = await createOrder(payload, { offline: offlineMode });

      const completeOrderData = {
        ...res,
        name,
        address,
        items: itemsToDisplay,
        isPackage: isPackage,
      };

      setOrder(completeOrderData);
      if (!username && name) setUsername(name);
      show("Order placed successfully", "success");
      navigate("/confirmation", { state: { order: completeOrderData } });
    } catch (err) {
      if (liveRef.current)
        liveRef.current.textContent = "Still offline — order not sent";
      const msg = err?.response?.data?.message || err.message || "Order failed";
      show(msg, "error");
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto" }}>
      <div
        ref={liveRef}
        style={{
          position: "absolute",
          left: -9999,
          height: 1,
          width: 1,
          overflow: "hidden",
        }}
        aria-live="polite"
      />

      <Grid container spacing={4} sx={{ minHeight: "100vh" }}>
        {/* Left Column - Main Form */}
        <Grid item xs={12} lg={8}>
          <Card className="card-elevated" sx={{ height: "fit-content" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Confirm Your Order
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "grid", gap: 3, mt: 2 }}
              >
                <TextField
                  label="Full Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                {/* Enhanced Address Field with Location Button */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      Delivery Address
                    </Typography>
                    <Tooltip title="Use your current location to auto-fill address">
                      <IconButton
                        size="small"
                        onClick={getCurrentLocation}
                        disabled={locationLoading}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                          "&:disabled": {
                            backgroundColor: "grey.300",
                          },
                        }}
                      >
                        <MyLocationIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {currentAddress && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 16, color: "success.main" }}
                        />
                        <Typography variant="caption" color="success.main">
                          Location detected
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <TextField
                    label="Enter your full address"
                    multiline
                    minRows={3}
                    {...register("address", {
                      required: "Address is required",
                    })}
                    error={!!errors.address}
                    helperText={
                      errors.address?.message ||
                      "Include street address, city, state, and ZIP code"
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  {locationError && (
                    <Alert severity="warning" sx={{ mt: 1 }}>
                      {locationError}
                    </Alert>
                  )}
                </Box>

                {/* Contact Information */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Phone Number *"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={
                      errors.phone?.message ||
                      "Include country code if outside US"
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                  <TextField
                    label="Email Address (optional)"
                    type="email"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={
                      errors.email?.message || "For order updates and tracking"
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>

                {/* Urgency Level */}
                <FormControl fullWidth>
                  <InputLabel>Urgency Level *</InputLabel>
                  <Select
                    {...register("urgency", {
                      required: "Please select urgency level",
                    })}
                    error={!!errors.urgency}
                    label="Urgency Level *"
                    defaultValue="medium"
                  >
                    <MenuItem value="low">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip label="Low" color="success" size="small" />
                        <span>Can wait 24-48 hours</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="medium">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip label="Medium" color="warning" size="small" />
                        <span>Needed within 12-24 hours</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="high">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip label="High" color="error" size="small" />
                        <span>Needed within 6-12 hours</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="critical">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip
                          label="Critical"
                          color="error"
                          size="small"
                          sx={{ backgroundColor: "#dc2626", color: "white" }}
                        />
                        <span>Emergency - needed immediately</span>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* Payment Information */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Payment Information
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Card Number *"
                      placeholder="1234 5678 9012 3456"
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^[\d\s]{13,19}$/,
                          message: "Please enter a valid card number",
                        },
                      })}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <TextField
                      label="Expiry (MM/YY) *"
                      placeholder="12/25"
                      {...register("expiry", {
                        required: "Expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Format: MM/YY",
                        },
                      })}
                      error={!!errors.expiry}
                      helperText={errors.expiry?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <TextField
                      label="CVV *"
                      placeholder="123"
                      type="password"
                      {...register("cvv", {
                        required: "CVV is required",
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "3-4 digits",
                        },
                      })}
                      error={!!errors.cvv}
                      helperText={errors.cvv?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    💳 This is a demo payment form. No real payments will be
                    processed.
                  </Typography>
                </Box>

                {/* Form Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    size="large"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    size="large"
                  >
                    Back
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} lg={4}>
          <Box>
            <Card className="card-elevated">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {isPackage ? "Relief Package Items" : "Selected Item"}
                </Typography>
                <Box
                  sx={{
                    border: "2px solid #e2e8f0",
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                    width: "100%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Cart Header */}
                  <Box
                    sx={{
                      backgroundColor: "#f8fafc",
                      p: 1.5,
                      borderBottom: "1px solid #e2e8f0",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InventoryIcon color="primary" sx={{ fontSize: 20 }} />
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="primary"
                      >
                        Your Relief Cart
                      </Typography>
                    </Box>
                  </Box>

                  {/* Cart Items */}
                  <Box sx={{ p: 1.5 }}>
                    {itemsToDisplay.length === 0 ? (
                      <Box sx={{ textAlign: "center", py: 3 }}>
                        <InventoryIcon
                          sx={{ fontSize: 48, color: "#cbd5e1", mb: 1 }}
                        />
                        <Typography color="text.secondary" variant="body2">
                          No items in cart
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {itemsToDisplay.map((item, i) => (
                          <Box
                            key={item.id || i}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              p: 1.5,
                              backgroundColor: "#f8fafc",
                              borderRadius: 2,
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  backgroundColor: "#dbeafe",
                                  borderRadius: 1,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <InventoryIcon
                                  sx={{ fontSize: 20, color: "#2563eb" }}
                                />
                              </Box>
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={600}
                                  sx={{ lineHeight: 1.2 }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ lineHeight: 1.2 }}
                                >
                                  ${item.price || 0} each
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                              {item.quantity > 1 && (
                                <Chip
                                  label={`Qty: ${item.quantity}`}
                                  size="small"
                                  sx={{
                                    mb: 0.5,
                                    fontSize: "0.7rem",
                                    backgroundColor: "#dbeafe",
                                    color: "#1e40af",
                                    border: "1px solid #93c5fd",
                                  }}
                                />
                              )}
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                fontWeight={600}
                              >
                                ${(item.price || 0) * (item.quantity || 1)}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}
                    {itemsToDisplay.length > 0 && (
                      <>
                        <Divider sx={{ my: 0 }} />
                        {/* Cart Footer */}
                        <Box
                          sx={{
                            backgroundColor: "#f8fafc",
                            p: 1.5,
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: "0.9rem" }}
                            >
                              Items (
                              {itemsToDisplay.reduce(
                                (sum, item) => sum + (item.quantity || 1),
                                0
                              )}
                              )
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              sx={{ fontSize: "0.9rem" }}
                            >
                              $
                              {itemsToDisplay.reduce(
                                (sum, item) =>
                                  sum +
                                  (item.price || 0) * (item.quantity || 1),
                                0
                              )}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pt: 1,
                              borderTop: "1px solid #e2e8f0",
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="primary"
                            >
                              Total
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              fontWeight={700}
                            >
                              $
                              {itemsToDisplay.reduce(
                                (sum, item) =>
                                  sum +
                                  (item.price || 0) * (item.quantity || 1),
                                0
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
