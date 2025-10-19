import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function RecommendationCard({ recommendation, onProceed, onFeedback }) {
  // Simulate inventory status based on recommendation type
  const getInventoryStatus = (rec) => {
    if (typeof rec === "string") {
      const text = rec.toLowerCase();
      if (text.includes("shelter") || text.includes("housing")) {
        return { status: "medium", label: "Limited Supply" };
      } else if (text.includes("medical") || text.includes("hospital")) {
        return { status: "high", label: "High Availability" };
      } else if (text.includes("food") || text.includes("water")) {
        return { status: "high", label: "High Availability" };
      }
    }
    return { status: "medium", label: "Available" };
  };

  const getRecommendationIcon = (rec) => {
    if (typeof rec === "string") {
      const text = rec.toLowerCase();
      if (text.includes("shelter") || text.includes("housing")) return <HomeIcon />;
      if (text.includes("medical") || text.includes("hospital")) return <LocalHospitalIcon />;
      if (text.includes("food") || text.includes("water")) return <RestaurantIcon />;
      if (text.includes("power") || text.includes("charging")) return <BatteryChargingFullIcon />;
    }
    return <LocationOnIcon />;
  };

  const inventoryStatus = getInventoryStatus(recommendation);
  const recommendationIcon = getRecommendationIcon(recommendation);

  return (
    <Card sx={{ my: 2 }} className="card-elevated">
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {recommendationIcon}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recommended Resources
            </Typography>
          </Box>
          <Chip
            label={inventoryStatus.label}
            size="small"
            className={`status-${inventoryStatus.status}`}
            sx={{
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          />
        </Box>
        
        <Typography variant="body1" sx={{ 
          whiteSpace: "pre-wrap", 
          mb: 2,
          lineHeight: 1.6,
          color: "text.primary"
        }}>
          {typeof recommendation === "string"
            ? recommendation
            : JSON.stringify(recommendation, null, 2)}
        </Typography>

        {/* Additional Information */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Updated 2 minutes ago
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              Multiple locations available
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
      <CardActions sx={{ px: 2, pb: 2, gap: 1, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onProceed && onProceed(recommendation)}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Request This Aid
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DirectionsIcon />}
          sx={{
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              borderColor: "primary.dark",
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
          onClick={() => {
            // Show static map with pins
            const mapWindow = window.open('', '_blank', 'width=800,height=600');
            if (mapWindow) {
              mapWindow.document.write(`
                <html>
                  <head><title>Relief Centers Map</title></head>
                  <body style="margin:0; padding:20px; font-family: Arial, sans-serif;">
                    <h2>Emergency Relief Centers</h2>
                    <div style="width:100%; height:400px; background: #f0f0f0; border: 1px solid #ccc; display:flex; align-items:center; justify-content:center; margin:20px 0;">
                      <div style="text-align:center; color:#666;">
                        <div style="font-size:48px;">🗺️</div>
                        <div>Interactive map coming soon</div>
                        <div style="font-size:12px; margin-top:10px;">Multiple relief centers available in your area</div>
                      </div>
                    </div>
                    <p><strong>Nearest Relief Centers:</strong></p>
                    <ul>
                      <li>Central Emergency Shelter - 123 Main St</li>
                      <li>Community Food Bank - 456 Oak Ave</li>
                      <li>Medical Aid Station - 789 Pine St</li>
                    </ul>
                  </body>
                </html>
              `);
              mapWindow.document.close();
            }
          }}
        >
          View Map
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => onFeedback && onFeedback("not_helpful")}
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "grey.100",
              color: "text.primary",
            },
          }}
        >
          This isn't what I need
        </Button>
      </CardActions>
    </Card>
  );
}
