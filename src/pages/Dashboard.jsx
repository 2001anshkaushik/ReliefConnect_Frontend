import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { getOrder } from "../services/api";

export default function Dashboard() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const res = await getOrder(orderId);
      setOrder(res);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Track Your Order</Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your Order ID to view status and details.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={fetchOrder}
          disabled={!orderId || loading}
        >
          {loading ? "Loading..." : "Lookup"}
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {order && (
        <Card>
          <CardContent>
            <Typography variant="h6">
              Order {order.id || order._id || order.orderId}
            </Typography>
            <Typography>Status: {order.status || "Pending"}</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
              {JSON.stringify(order, null, 2)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
