import React from "react";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HomepageCarousel from "../components/HomepageCarousel";

export default function Home() {
  return (
    <Container className="container" sx={{ py: 4 }}>
      {/* Homepage Carousel */}
      <HomepageCarousel />

      {/* Hero Section */}
      <Box
        className="hero"
        sx={{
          textAlign: "center",
          mb: 4,
          background:
            "linear-gradient(180deg, rgba(37,99,235,0.05), rgba(5,150,105,0.03))",
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          border: "1px solid rgba(37, 99, 235, 0.1)",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ 
            color: "#1e293b",
            fontWeight: 700,
            mb: 2
          }}
        >
          ReliefConnect — Aid When You Need It Most
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ 
            maxWidth: 800, 
            margin: "0 auto",
            lineHeight: 1.6,
            mb: 3
          }}
        >
          AI-Powered Disaster Relief Assistance — Get personalized
          recommendations for food, shelter, medical aid and more. Fast
          matching, trusted partners, and transparent tracking.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/recommend"
            className="btn-cta"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            Get Help Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/information"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Emergency Info
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }} elevation={2}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <FoodBankIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Tailored Aid</Typography>
                <Typography variant="body2">
                  Personalized recommendations for food, water, shelter and
                  medical supplies.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }} elevation={2}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Trusted Delivery</Typography>
                <Typography variant="body2">
                  Partnered distribution networks to get aid where it’s needed
                  most.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }} elevation={2}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <SupportAgentIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Ongoing Support</Typography>
                <Typography variant="body2">
                  Track your order and receive follow-up support from local
                  teams.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
