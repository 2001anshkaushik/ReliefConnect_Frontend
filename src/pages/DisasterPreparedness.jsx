import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Link as RouterLink } from "react-router-dom";

export default function DisasterPreparedness() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          🛡️ Disaster Preparedness
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Interactive checklists to prepare your family and pets for emergencies
        </Typography>
      </Box>

      <Card className="card-elevated">
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Box sx={{ mb: 3 }}>
            <ConstructionIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            Coming Soon
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
            We're building interactive emergency preparedness checklists for home kits, 
            car kits, pet supplies, and family communication plans with progress tracking.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/information"
              size="large"
              sx={{
                backgroundColor: "primary.main",
                px: 4,
                py: 1.5,
              }}
            >
              Emergency Info
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/recommend"
              size="large"
              sx={{
                borderColor: "primary.main",
                color: "primary.main",
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              Get Help Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
