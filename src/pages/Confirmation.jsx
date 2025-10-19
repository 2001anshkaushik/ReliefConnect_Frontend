import React, { useContext } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { AppContext } from "../context/AppContext";
import { Link as RouterLink } from "react-router-dom";

export default function Confirmation() {
  const { order } = useContext(AppContext);
  const id = order?.id || order?._id || order?.orderId;

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">Thank you</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your order has been placed.
          </Typography>
          {id ? (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Order ID: {id}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              If you do not see an Order ID, check your email or your dashboard.
            </Typography>
          )}
          <Button
            component={RouterLink}
            to={`/dashboard/${id}`}
            sx={{ mt: 2 }}
            variant="contained"
          >
            Track Order
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
