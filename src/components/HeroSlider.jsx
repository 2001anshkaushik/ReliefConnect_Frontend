import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    title: "Get Help Now",
    headline: "Immediate Assistance is Available",
    subheadline:
      "Describe your needs and get connected to essential relief services",
    buttonText: "Request Help",
    buttonLink: "/recommend",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    textColor: "#ffffff",
  },
  {
    id: 2,
    title: "Latest Alert",
    headline: "LATEST ALERT: Boil Water Advisory",
    subheadline:
      "A boil water advisory is in effect for the downtown area until further notice",
    buttonText: "Learn More",
    buttonLink: "/information",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    textColor: "#ffffff",
  },
  {
    id: 3,
    title: "Get Help Now",
    headline: "Immediate Assistance is Available",
    subheadline:
      "Connect with essential relief services and support when you need it most",
    buttonText: "Get Help Now",
    buttonLink: "/recommend",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    textColor: "#ffffff",
  },
  {
    id: 4,
    title: "Offer Support",
    headline: "Your Community Needs You",
    subheadline:
      "Find out how you can volunteer your time or donate to official relief organizations",
    buttonText: "Learn How to Help",
    buttonLink: "/volunteer",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop&crop=center",
    bgColor: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    textColor: "#ffffff",
  },
];

export default function HeroSlider() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ 
      position: "relative", 
      mb: 4, 
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      marginRight: "calc(-50vw + 50%)"
    }}>
      <Swiper
        effect={"fade"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        fadeEffect={{
          crossFade: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `<span class="${className}" style="background-color: ${theme.palette.primary.main}; width: 12px; height: 12px; border-radius: 50%; opacity: 0.7;"></span>`;
          },
        }}
        navigation={true}
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        className="hero-swiper"
        style={{
          "--swiper-pagination-color": theme.palette.primary.main,
          "--swiper-navigation-color": "#ffffff",
          "--swiper-navigation-size": "32px",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                height: { xs: 500, md: 600 },
                width: "100%",
                overflow: "hidden",
                position: "relative",
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
                  backgroundImage: `url(${slide.image})`,
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
                    background: slide.bgColor,
                    opacity: 0.4,
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
                  p: { xs: 4, md: 8 },
                  zIndex: 1,
                  maxWidth: "1200px",
                  mx: "auto",
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
                      color: slide.textColor,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {slide.title}
                  </Typography>
                </Box>

                {/* Headline */}
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  sx={{
                    color: slide.textColor,
                    fontWeight: 700,
                    mb: 3,
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                    maxWidth: { xs: "100%", md: "90%" },
                    fontSize: { xs: "2rem", md: "3.5rem" },
                    lineHeight: { xs: 1.2, md: 1.1 },
                  }}
                >
                  {slide.headline}
                </Typography>

                {/* Subheadline */}
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{
                    color: slide.textColor,
                    mb: 5,
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    maxWidth: { xs: "100%", md: "70%" },
                    opacity: 0.95,
                    fontSize: { xs: "1.1rem", md: "1.5rem" },
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}
                >
                  {slide.subheadline}
                </Typography>

                {/* CTA Button */}
                <Button
                  component={RouterLink}
                  to={slide.buttonLink}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    color: "#1e293b",
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                    minWidth: { xs: "200px", md: "250px" },
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {slide.buttonText}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }

        .hero-swiper .swiper-slide {
          width: 100%;
          height: 100%;
        }

        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.3);
        }

        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 24px;
          font-weight: bold;
        }

        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background-color: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        .hero-swiper .swiper-button-disabled {
          opacity: 0.3;
        }
      `}</style>
    </Box>
  );
}
