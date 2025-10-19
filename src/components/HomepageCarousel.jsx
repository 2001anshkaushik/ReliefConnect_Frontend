import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const slides = [
  {
    id: 1,
    title: "Get Help Now",
    headline: "Immediate Assistance is Available",
    subheadline: "Describe your needs and get connected to essential relief services",
    buttonText: "Request Help",
    buttonLink: "/recommend",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    textColor: "#ffffff"
  },
  {
    id: 2,
    title: "Latest Alert",
    headline: "LATEST ALERT: Boil Water Advisory",
    subheadline: "A boil water advisory is in effect for the downtown area until further notice",
    buttonText: "Learn More",
    buttonLink: "/information",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    textColor: "#ffffff"
  },
  {
    id: 3,
    title: "Be Prepared",
    headline: "Are You Ready for Anything?",
    subheadline: "Use our interactive checklists to prepare your family and home for any emergency",
    buttonText: "View Checklists",
    buttonLink: "/preparedness",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    textColor: "#ffffff"
  },
  {
    id: 4,
    title: "Offer Support",
    headline: "Your Community Needs You",
    subheadline: "Find out how you can volunteer your time or donate to official relief organizations",
    buttonText: "Learn How to Help",
    buttonLink: "/volunteer",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    textColor: "#ffffff"
  }
];

export default function HomepageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      {/* Main Carousel */}
      <Paper
        sx={{
          position: "relative",
          height: { xs: 400, md: 500 },
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${currentSlideData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: currentSlideData.bgColor,
              opacity: 0.8,
            },
          }}
        />

        {/* Content Overlay */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: { xs: 3, md: 6 },
            zIndex: 1,
          }}
        >
          {/* Title Badge */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              px: 2,
              py: 1,
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: currentSlideData.textColor,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {currentSlideData.title}
            </Typography>
          </Box>

          {/* Headline */}
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              color: currentSlideData.textColor,
              fontWeight: 700,
              mb: 2,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              maxWidth: { xs: "100%", md: "80%" },
            }}
          >
            {currentSlideData.headline}
          </Typography>

          {/* Subheadline */}
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              color: currentSlideData.textColor,
              mb: 4,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              maxWidth: { xs: "100%", md: "70%" },
              opacity: 0.95,
            }}
          >
            {currentSlideData.subheadline}
          </Typography>

          {/* CTA Button */}
          <Button
            component={RouterLink}
            to={currentSlideData.buttonLink}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#1e293b",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1.1rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            {currentSlideData.buttonText}
          </Button>
        </Box>

        {/* Navigation Arrows */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            color: "white",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            color: "white",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Paper>

      {/* Slide Indicators */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 2,
        }}
      >
        {slides.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              p: 0.5,
              color: index === currentSlide ? "primary.main" : "grey.400",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {index === currentSlide ? (
              <CircleIcon sx={{ fontSize: 12 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 12 }} />
            )}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
