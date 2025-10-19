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

export default function InformationHub() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          📚 Information Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Essential emergency information and preparedness resources
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
            We're building a comprehensive information hub with emergency contacts, 
            first aid guides, live disaster updates, and preparedness checklists.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/recommend"
              size="large"
              sx={{
                backgroundColor: "primary.main",
                px: 4,
                py: 1.5,
              }}
            >
              Get Help Now
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/preparedness"
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
              View Checklists
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
