import React, { useContext } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import { AppContext } from "../context/AppContext";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const { order: contextOrder } = useContext(AppContext);
  // Prioritize location state, fallback to context
  const order = location.state?.order || contextOrder;
  const id = order?.id || order?._id || order?.orderId;

  // Calculate totals
  const items = order?.items || [];
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Success Message Card */}
      <Card
        sx={{ mb: 3, backgroundColor: "#f0fdf4", border: "2px solid #10b981" }}
      >
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <CheckCircleIcon
            sx={{ fontSize: 80, color: "success.main", mb: 2 }}
          />
          <Typography
            variant="h3"
            color="primary"
            gutterBottom
            fontWeight={700}
          >
            Help is on the way
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mt: 2, lineHeight: 1.6 }}
          >
            Your relief package is being prepared and will be delivered to you
            as soon as possible. You're not alone—we're here to help.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, fontStyle: "italic" }}
          >
            A confirmation receipt has been sent to your email address.
          </Typography>

          {/* Track Order Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to={`/dashboard/${id}`}
              sx={{ px: 4, py: 1.5 }}
            >
              Track Order
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Order Summary Card */}
      <Card
        sx={{ mb: 3, border: "2px solidrgb(101, 135, 206)", borderRadius: 2 }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Header Section */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg,rgb(66, 87, 248) 0%,rgb(112, 156, 252) 100%)",
              color: "white",
              p: 2.5,
              textAlign: "center",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Relief Package Summary
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Order ID: {id || "Processing..."}
            </Typography>
          </Box>

          {/* Customer Info Section */}
          <Box sx={{ p: 2.5, backgroundColor: "#eff6ff" }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1.5, color: "#1e40af", fontWeight: 600 }}
            >
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      backgroundColor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#1e40af" }}>
                      👤
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, lineHeight: 1.2 }}
                    >
                      {order?.name || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      backgroundColor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#1e40af" }}>
                      📞
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Phone
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, lineHeight: 1.2 }}
                    >
                      {order?.phone || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      backgroundColor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#1e40af" }}>
                      ✉️
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, lineHeight: 1.2 }}
                    >
                      {order?.email || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      backgroundColor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#1e40af" }}>
                      📍
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Delivery Address
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.3,
                      }}
                    >
                      {order?.address || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Items Section */}
          <Box sx={{ p: 2.5 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 1.5, color: "#1e40af", fontWeight: 600 }}
            >
              Relief Items
            </Typography>
            {items.length > 0 ? (
              <Grid container spacing={1.5}>
                {items.map((item, i) => (
                  <Grid item xs={12} sm={6} key={item.id || i}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        backgroundColor: "#eff6ff",
                        borderRadius: 1,
                        border: "1px solid #bfdbfe",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            backgroundColor: "#dbeafe",
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
                            variant="body2"
                            sx={{ fontWeight: 600, lineHeight: 1.2 }}
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
                          sx={{ color: "#1e40af", fontWeight: 600 }}
                        >
                          ${(item.price || 0) * (item.quantity || 1)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", py: 2 }}
              >
                No items specified
              </Typography>
            )}
          </Box>

          {/* Totals Section */}
          <Box
            sx={{
              p: 2.5,
              background:
                "linear-gradient(135deg,rgb(66, 87, 248) 0%,rgb(112, 156, 252) 100%)",
              color: "white",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, fontWeight: 600 }}
              >
                Total Items : {totalItems}
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Total Price : ${subtotal}
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, fontSize: "0.9rem", fontWeight: 500 }}
              >
                Relief Package Total - Emergency Aid
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
