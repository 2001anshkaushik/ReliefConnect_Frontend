import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  mockKits,
  mainCategories,
  urgentSubCategories,
  preparednessSubCategories,
} from "../data/mockKits";
import KitCard from "../components/KitCard";

export default function AidKits() {
  const [mainCategory, setMainCategory] = useState("urgent");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Get current sub-categories based on main category
  const currentSubCategories =
    mainCategory === "urgent" ? urgentSubCategories : preparednessSubCategories;

  // Filter kits based on both main category and sub-category
  const filteredKits = mockKits.filter((kit) => {
    const matchesMainCategory = kit.priority === mainCategory;
    const matchesSubCategory =
      selectedSubCategory === "All" || kit.category === selectedSubCategory;
    return matchesMainCategory && matchesSubCategory;
  });

  const handleMainCategoryChange = (event, newValue) => {
    setMainCategory(newValue);
    setSelectedSubCategory("All"); // Reset sub-category when main category changes
  };

  const handleSubCategoryChange = (category) => {
    setSelectedSubCategory(category);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: 700,
            background: "linear-gradient(45deg, #1976d2, #42a5f5)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🛡️ Relief Kits Catalog
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Find the right supplies for your situation.
          <br />
          <br />
          Browse our comprehensive catalog of pre-made relief aid kits. Each kit
          is carefully curated for specific situations and includes everything
          you need to stay prepared and safe.
        </Typography>
      </Box>

      {/* Main Category Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={mainCategory}
          onChange={handleMainCategoryChange}
          centered
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              minHeight: 48,
            },
          }}
        >
          <Tab
            label={mainCategories.urgent}
            value="urgent"
            sx={{
              color:
                mainCategory === "urgent" ? "error.main" : "text.secondary",
              "&.Mui-selected": {
                color: "error.main",
              },
            }}
          />
          <Tab
            label={mainCategories.preparedness}
            value="preparedness"
            sx={{
              color:
                mainCategory === "preparedness"
                  ? "primary.main"
                  : "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
              },
            }}
          />
        </Tabs>

        {/* Sub-Category Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
            mb: 2,
          }}
        >
          {currentSubCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleSubCategoryChange(category)}
              variant={selectedSubCategory === category ? "filled" : "outlined"}
              color={selectedSubCategory === category ? "primary" : "default"}
              sx={{
                fontWeight: selectedSubCategory === category ? 600 : 400,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor:
                    selectedSubCategory === category
                      ? "primary.dark"
                      : "primary.light",
                  color: "white",
                },
              }}
            />
          ))}
        </Box>

        {/* Results Count */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Showing {filteredKits.length} kit
          {filteredKits.length !== 1 ? "s" : ""}
          {selectedSubCategory !== "All" && ` in ${selectedSubCategory}`}
        </Typography>
      </Box>

      {/* Kits Grid */}
      <Grid container spacing={3}>
        {filteredKits.map((kit) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={kit.id}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <KitCard kit={kit} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredKits.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "grey.50",
            borderRadius: 2,
            border: "2px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No kits found in this category
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try selecting a different category to browse our available kits.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSelectedSubCategory("All")}
            sx={{ px: 4 }}
          >
            View All Kits
          </Button>
        </Box>
      )}
    </Container>
  );
}
