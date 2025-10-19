import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Alert,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function TrackOrder() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <LocalShippingIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          📦 Track Your Order
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
          Monitor the status of your relief supplies and get real-time updates on delivery
        </Typography>
      </Box>

      <Card className="card-elevated">
        <CardContent sx={{ p: 4 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🚧 Coming Soon
            </Typography>
            <Typography variant="body2">
              Order tracking functionality is currently under development. This feature will allow you to:
            </Typography>
            <Box component="ul" sx={{ mt: 1, pl: 2 }}>
              <li>Track your relief supply orders in real-time</li>
              <li>Receive delivery notifications and updates</li>
              <li>View delivery routes and estimated arrival times</li>
              <li>Contact delivery drivers directly if needed</li>
              <li>Provide feedback on your delivery experience</li>
            </Box>
          </Alert>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              What to Expect
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Order Processing</Typography>
                <Chip label="Active" color="success" size="small" />
              </Box>
              <LinearProgress variant="determinate" value={25} sx={{ mb: 2 }} />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Packing & Preparation</Typography>
                <Chip label="Pending" color="warning" size="small" />
              </Box>
              <LinearProgress variant="determinate" value={0} sx={{ mb: 2 }} />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">In Transit</Typography>
                <Chip label="Pending" color="default" size="small" />
              </Box>
              <LinearProgress variant="determinate" value={0} sx={{ mb: 2 }} />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Delivered</Typography>
                <Chip label="Pending" color="default" size="small" />
              </Box>
              <LinearProgress variant="determinate" value={0} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/dashboard")}
              sx={{ backgroundColor: "primary.main" }}
            >
              View Dashboard
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/recommend")}
              sx={{ borderColor: "primary.main", color: "primary.main" }}
            >
              Get Help
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
