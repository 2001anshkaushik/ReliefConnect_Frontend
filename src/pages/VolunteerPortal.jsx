import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Avatar,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useForm } from "react-hook-form";

export default function VolunteerPortal() {
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const volunteerOpportunities = [
    {
      title: "Emergency Shelter Volunteer",
      organization: "Red Cross",
      location: "Central High School",
      timeCommitment: "4-8 hours",
      skills: ["First Aid", "Communication", "Compassion"],
      description:
        "Help manage emergency shelter operations, assist with check-ins, and provide support to displaced families.",
      icon: <HomeIcon />,
      color: "#2563eb",
    },
    {
      title: "Food Distribution Assistant",
      organization: "Local Food Bank",
      location: "Community Center",
      timeCommitment: "3-6 hours",
      skills: ["Organization", "Physical Work", "Teamwork"],
      description:
        "Assist with sorting and distributing emergency food supplies to affected families.",
      icon: <RestaurantIcon />,
      color: "#059669",
    },
    {
      title: "Medical Support Volunteer",
      organization: "Health Department",
      location: "Mobile Medical Unit",
      timeCommitment: "6-12 hours",
      skills: ["Medical Training", "Compassion", "Emergency Response"],
      description:
        "Provide medical support and first aid assistance at mobile medical stations.",
      icon: <LocalHospitalIcon />,
      color: "#dc2626",
    },
    {
      title: "Communication Coordinator",
      organization: "Emergency Management",
      location: "Command Center",
      timeCommitment: "8-12 hours",
      skills: ["Communication", "Technology", "Organization"],
      description:
        "Help coordinate communications between relief agencies and affected communities.",
      icon: <SchoolIcon />,
      color: "#7c3aed",
    },
  ];

  const donationOrganizations = [
    {
      name: "American Red Cross",
      description: "Emergency relief and disaster response",
      website: "https://redcross.org",
      logo: "🩸",
      category: "Emergency Relief",
    },
    {
      name: "Salvation Army",
      description: "Emergency services and disaster relief",
      website: "https://salvationarmyusa.org",
      logo: "🎺",
      category: "Emergency Relief",
    },
    {
      name: "Feeding America",
      description: "Food assistance and hunger relief",
      website: "https://feedingamerica.org",
      logo: "🍽️",
      category: "Food Assistance",
    },
    {
      name: "Direct Relief",
      description: "Medical aid and healthcare support",
      website: "https://directrelief.org",
      logo: "🏥",
      category: "Medical Aid",
    },
    {
      name: "World Central Kitchen",
      description: "Emergency food response",
      website: "https://wck.org",
      logo: "👨‍🍳",
      category: "Food Assistance",
    },
    {
      name: "Habitat for Humanity",
      description: "Disaster recovery and housing",
      website: "https://habitat.org",
      logo: "🏠",
      category: "Housing",
    },
  ];

  const onSubmitVolunteer = async (data) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setVolunteerSubmitted(true);
    setVolunteerDialogOpen(false);
    reset();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          🤝 I Want to Help
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Join the relief effort by volunteering your time or making a donation
          to support disaster recovery
        </Typography>
      </Box>

      {/* Volunteer Opportunities */}
      <Box
        sx={{
          mb: 6,
          backgroundColor: "#f8fafc",
          py: 6,
          borderRadius: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VolunteerActivismIcon
                sx={{ color: "primary.main", fontSize: 32 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Volunteer Opportunities
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => setVolunteerDialogOpen(true)}
              sx={{
                backgroundColor: "primary.main",
                px: 3,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Sign Up to Volunteer
            </Button>
          </Box>

          <Grid container spacing={3}>
            {volunteerOpportunities.map((opportunity, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <Card
                  className="card-elevated"
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: opportunity.color,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {opportunity.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {opportunity.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.organization}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {opportunity.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {opportunity.location}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Time commitment: {opportunity.timeCommitment}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1, display: "block" }}
                      >
                        Required Skills:
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {opportunity.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
                            label={skill}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Donation Organizations */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          py: 8,
          mt: 4,
          borderRadius: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <AttachMoneyIcon sx={{ color: "secondary.main", fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Make a Donation
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600 }}
          >
            Support relief efforts by donating to trusted organizations working
            on the ground to help affected communities.
          </Typography>

          <Grid container spacing={3}>
            {donationOrganizations.map((org, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className="card-elevated"
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h2" sx={{ mb: 1 }}>
                      {org.logo}
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {org.name}
                    </Typography>
                    <Chip
                      label={org.category}
                      size="small"
                      color="secondary"
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {org.description}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": {
                          backgroundColor: "secondary.dark",
                        },
                      }}
                      onClick={() => window.open(org.website, "_blank")}
                    >
                      Donate Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Volunteer Sign-up Dialog */}
      <Dialog
        open={volunteerDialogOpen}
        onClose={() => setVolunteerDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VolunteerActivismIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Volunteer Sign-up
            </Typography>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmitVolunteer)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Skills & Experience"
                  multiline
                  rows={3}
                  fullWidth
                  {...register("skills")}
                  placeholder="Tell us about your relevant skills, experience, and availability..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Preferred Volunteer Role"
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  {...register("preferredRole")}
                >
                  <option value="">Select a role</option>
                  <option value="shelter">Emergency Shelter Volunteer</option>
                  <option value="food">Food Distribution Assistant</option>
                  <option value="medical">Medical Support Volunteer</option>
                  <option value="communication">
                    Communication Coordinator
                  </option>
                  <option value="other">Other</option>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setVolunteerDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ backgroundColor: "primary.main" }}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Success Alert */}
      {volunteerSubmitted && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ mt: 2 }}
          onClose={() => setVolunteerSubmitted(false)}
        >
          Thank you for your interest in volunteering! We'll contact you within
          24 hours with next steps.
        </Alert>
      )}
    </Container>
  );
}
