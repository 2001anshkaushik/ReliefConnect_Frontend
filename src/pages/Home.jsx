import React from "react";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
  return (
    <Container className="container" sx={{ py: 6 }}>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Hero Section */}
      <Box
        className="hero"
        sx={{
          textAlign: "center",
          mb: 8,
          background:
            "linear-gradient(180deg, rgba(37,99,235,0.05), rgba(5,150,105,0.03))",
          p: { xs: 4, md: 8 },
          borderRadius: 3,
          border: "1px solid rgba(37, 99, 235, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: "#1e293b",
            fontWeight: 700,
            mb: 2,
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
            mb: 3,
          }}
        >
          AI-Powered Disaster Relief Assistance — Get personalized
          recommendations for food, shelter, medical aid and more. Fast
          matching, trusted partners, and transparent tracking.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
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

      {/* Feature Cards Section */}
      <Box 
        sx={{ 
          mt: 8, 
          mb: 8,
          py: 6,
          backgroundColor: "#f8fafc",
          borderRadius: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 4, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              }
            }} 
            elevation={2}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}>
              <FoodBankIcon color="primary" sx={{ fontSize: 40, flexShrink: 0 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  The Right Support, For You
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  Tell us your needs, and our AI instantly connects you with the
                  specific food, shelter, or medical supplies your family
                  requires.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 4, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              }
            }} 
            elevation={2}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}>
              <LocalShippingIcon color="primary" sx={{ fontSize: 40, flexShrink: 0 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Reliable Aid, Delivered Fast
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  Partnered distribution networks to get aid where it's needed
                  most.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 4, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              }
            }} 
            elevation={2}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}>
              <SupportAgentIcon color="primary" sx={{ fontSize: 40, flexShrink: 0 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  With You, Every Step
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  Track your order and receive follow-up support from local
                  teams.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
