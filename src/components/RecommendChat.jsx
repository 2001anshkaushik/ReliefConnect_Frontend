import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
  Stack,
  Avatar,
  Grid,
  Alert,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { recommend as recommendAPI } from "../services/api";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import { useReliefPackage } from "../context/ReliefPackageContext";
import { NotificationContext } from "./Notifications";

export default function RecommendChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const { setRecommendation, username, recommendation } =
    useContext(AppContext);
  const { addResource, getTotalItems, setDrawerOpen } = useReliefPackage();
  const { show } = useContext(NotificationContext);
  const liveRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [quickRepliesVisible, setQuickRepliesVisible] = useState(true);

  // Offline resource data for when API is unavailable
  const offlineResources = [
    {
      id: "emergency-food-kit",
      name: "Emergency Food Kit",
      qty: "3-day supply",
      price: 30,
      details:
        "Non-perishable food items including canned goods, energy bars, and water bottles. Suitable for families of 2-4 people.",
      status: "available",
      location: "Local Distribution Centers",
      contact: "Call 211 for nearest location",
    },
    {
      id: "basic-medical-supplies",
      name: "Basic Medical Supplies",
      qty: "First Aid Kit",
      price: 20,
      details:
        "Essential first aid supplies including bandages, antiseptic, pain relievers, and basic medical equipment.",
      status: "available",
      location: "Emergency Shelters & Medical Stations",
      contact: "Available at all designated shelters",
    },
    {
      id: "emergency-shelter",
      name: "Emergency Shelter",
      qty: "Temporary housing",
      price: 50,
      details:
        "Safe, temporary accommodation for displaced families. Includes basic amenities and security.",
      status: "limited",
      location: "Central High School, Community Center",
      contact: "Call 911 for immediate assistance",
    },
    {
      id: "water-supplies",
      name: "Clean Water Supplies",
      qty: "Multiple locations",
      price: 15,
      details:
        "Access to clean drinking water and water purification supplies. Boil water advisory in effect for some areas.",
      status: "available",
      location: "Water distribution points throughout city",
      contact: "Check local emergency broadcasts",
    },
  ];

  // Quick needs selection options
  const quickNeeds = [
    {
      id: "food-water",
      label: "Food & Water",
      icon: "🍞",
      prompt: "I need food and water for my family",
    },
    {
      id: "shelter",
      label: "Shelter",
      icon: "🏠",
      prompt: "I need temporary shelter or housing",
    },
    {
      id: "first-aid",
      label: "First Aid",
      icon: "🏥",
      prompt: "I need medical assistance or first aid supplies",
    },
    {
      id: "power",
      label: "Power/Charging",
      icon: "🔌",
      prompt: "I need power or charging for my devices",
    },
    {
      id: "transportation",
      label: "Transportation",
      icon: "🚗",
      prompt: "I need transportation or evacuation assistance",
    },
    {
      id: "communication",
      label: "Communication",
      icon: "📞",
      prompt: "I need to communicate with family or emergency services",
    },
  ];

  const pushMessage = (role, text) => {
    setMessages((m) => [...m, { role, text }]);
  };

  const handleQuickNeed = (need) => {
    setInput(need.prompt);
    setQuickRepliesVisible(false);
    // Auto-focus the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleRecommendationFeedback = (feedbackType) => {
    if (feedbackType === "not_helpful") {
      // Clear the current recommendation
      setRecommendation(null);
      // Add a helpful message to guide the user
      pushMessage(
        "agent",
        "I understand that recommendation wasn't quite right for your situation. Please tell me more about your specific needs so I can provide better assistance."
      );
      // Focus on the input field for the user to provide more details
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      if (liveRef.current) {
        liveRef.current.textContent =
          "Recommendation cleared, please provide more details";
      }
    }
  };

  const handleRequestAid = (item) => {
    // Navigate to order form with the selected item
    navigate("/order", { state: { recommendation: item } });
  };

  const handleViewMap = (item) => {
    // Open static map in new window
    const mapWindow = window.open("", "_blank");
    mapWindow.document.write(`
      <html>
        <head><title>Map - ${item.name}</title></head>
        <body style="margin:0; padding:20px; font-family: Arial, sans-serif;">
          <h2>📍 ${item.name}</h2>
          <p><strong>Location:</strong> ${
            item.location || "Check local emergency services"
          }</p>
          <p><strong>Contact:</strong> ${
            item.contact || "Call 911 for immediate assistance"
          }</p>
          <div style="width:100%; height:400px; background:#f0f0f0; border:1px solid #ccc; display:flex; align-items:center; justify-content:center; margin:20px 0;">
            <p style="color:#666;">Interactive map coming soon</p>
          </div>
          <p><em>This is a placeholder map. In a real implementation, this would show an interactive map with the exact location.</em></p>
        </body>
      </html>
    `);
  };

  useEffect(() => {
    // focus the input on mount for keyboard users
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input?.trim()) return;
    const userText = input.trim();
    setInput("");
    pushMessage("user", userText);
    setLoading(true);
    setIsOffline(false);

    try {
      const res = await recommendAPI(userText);
      // Process the API response and set structured recommendation
      const structuredRecommendation = {
        items: res.items || res.recommendations || [],
        message: res.message || "Here are some resources that might help you:",
        timestamp: new Date().toISOString(),
      };

      pushMessage("agent", structuredRecommendation.message);
      setRecommendation(structuredRecommendation);

      if (liveRef.current)
        liveRef.current.textContent = "Recommendation received";
    } catch (err) {
      // Graceful offline fallback
      setIsOffline(true);
      pushMessage(
        "agent",
        "The AI Agent is currently unavailable. Here are some general recommendations for your area."
      );

      const offlineRecommendation = {
        items: offlineResources,
        message:
          "The AI Agent is currently unavailable. Here are some general recommendations for your area.",
        timestamp: new Date().toISOString(),
        offline: true,
      };

      setRecommendation(offlineRecommendation);

      if (liveRef.current)
        liveRef.current.textContent = "Showing offline recommendations";
    } finally {
      setLoading(false);
      setQuickRepliesVisible(true);
    }
  };

  const handleRetry = async () => {
    // re-run the last user message if available, with retry/backoff handled by api
    const last = messages
      .slice()
      .reverse()
      .find((m) => m.role === "user");
    if (!last) return;
    if (liveRef.current)
      liveRef.current.textContent = "Retrying to fetch recommendation";

    setLoading(true);
    try {
      const res = await recommendAPI(last.text);
      const structuredRecommendation = {
        items: res.items || res.recommendations || [],
        message: res.message || "Here are some resources that might help you:",
        timestamp: new Date().toISOString(),
      };

      pushMessage("agent", structuredRecommendation.message);
      setRecommendation(structuredRecommendation);

      if (liveRef.current)
        liveRef.current.textContent =
          "Connection restored—updated recommendation ready.";
    } catch (err) {
      // Fallback to offline recommendations
      setIsOffline(true);
      pushMessage(
        "agent",
        "The AI Agent is currently unavailable. Here are some general recommendations for your area."
      );

      const offlineRecommendation = {
        items: offlineResources,
        message:
          "The AI Agent is currently unavailable. Here are some general recommendations for your area.",
        timestamp: new Date().toISOString(),
        offline: true,
      };

      setRecommendation(offlineRecommendation);

      if (liveRef.current)
        liveRef.current.textContent =
          "Still offline — showing offline options.";
    } finally {
      setLoading(false);
    }
  };

  const handleQuick = async (type) => {
    // Manage quick replies; ensure focus and keyboard-friendly behavior
    setQuickRepliesVisible(false);
    if (type === "order") {
      const totalItems = getTotalItems();
      if (totalItems > 0) {
        // Open the cart sidebar instead of navigating
        setDrawerOpen(true);
        if (liveRef.current)
          liveRef.current.textContent = "Opening relief package";
      } else {
        show("Your package is empty. Add items to proceed.", "warning");
        if (liveRef.current) liveRef.current.textContent = "Package is empty";
      }
    } else if (type === "refine") {
      // focus input and prefill a short prompt to help the user
      setInput((prev) => (prev ? prev : "Please refine: "));
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
    } else if (type === "hotline") {
      const hotlineText =
        "Call local emergency hotline at +1-555-555-5555 or your country's emergency number. If immediate danger, please call emergency services.";
      pushMessage("agent", hotlineText);
      if (liveRef.current) liveRef.current.textContent = "Hotline provided";
      // keep focus on input for next action
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }} className="card-elevated">
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          {username ? `Welcome back, ${username}` : "AI Relief Agent"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Describe your needs (include family size, location) and I'll suggest
          resources. You can also use the quick options below to get started
          faster.
        </Typography>

        {/* Quick Needs Selection */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}
          >
            Quick Needs Selection:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {quickNeeds.map((need) => (
              <Button
                key={need.id}
                variant="outlined"
                size="small"
                startIcon={
                  <span style={{ fontSize: "1rem" }}>{need.icon}</span>
                }
                onClick={() => handleQuickNeed(need)}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                  },
                }}
              >
                {need.label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: 8, marginTop: 16 }}
          aria-label="Needs submission form"
        >
          <TextField
            inputRef={inputRef}
            aria-label="Describe your needs"
            placeholder="E.g. Flooded home, need shelter and food for family of 4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            onKeyDown={(e) => {
              // Enter submits, Shift+Enter allows newline
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            aria-label="Get help now"
          >
            {loading ? <CircularProgress size={18} /> : "Get Help"}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ p: 2, minHeight: 200 }} aria-live="polite">
        <List>
          {messages.length === 0 && (
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Avatar sx={{ bgcolor: "#2563eb" }}>
                  <SmartToyIcon />
                </Avatar>
                <ListItemText primary="Welcome to ReliefConnect! Please describe your needs or use a quick selection above to get started." />
              </Box>
            </ListItem>
          )}
          {messages.map((m, i) => (
            <ListItem
              key={i}
              sx={{
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  maxWidth: "85%",
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: m.role === "user" ? "#059669" : "#2563eb",
                    width: 32,
                    height: 32,
                    fontSize: "0.875rem",
                  }}
                >
                  {m.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
                <Paper
                  sx={{
                    p: 1.5,
                    backgroundColor: m.role === "user" ? "#e7f3ff" : "#f1f8f4",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      mb: 0.5,
                      color: "#475569",
                    }}
                  >
                    {m.role === "user" ? username || "You" : "AI Agent"}
                  </Typography>
                  <Typography variant="body1">{m.text}</Typography>
                </Paper>
              </Box>
            </ListItem>
          ))}
          {loading && (
            <ListItem>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "#2563eb" }}>
                  <SmartToyIcon />
                </Avatar>
                <Paper
                  sx={{ p: 1.5, backgroundColor: "#f1f8f4", borderRadius: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      AI Agent is thinking...
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Display Resource Cards if available */}
      {recommendation && recommendation.items && (
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
              Recommended Resources
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                recommendation.items.forEach((item) => addResource(item));
                show(
                  `Added ${recommendation.items.length} items to relief package`,
                  "success"
                );
              }}
              sx={{
                borderColor: "#059669",
                color: "#059669",
                "&:hover": {
                  backgroundColor: "#059669",
                  color: "white",
                },
              }}
            >
              Add All to Package
            </Button>
          </Box>
          {isOffline && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Showing offline recommendations. AI Agent is currently
              unavailable.
            </Alert>
          )}
          <Grid container spacing={2}>
            {recommendation.items.map((item, index) => (
              <Grid item xs={12} md={6} key={item.id || index}>
                <ResourceCard
                  item={item}
                  onRequest={handleRequestAid}
                  onViewMap={handleViewMap}
                  onFeedback={handleRecommendationFeedback}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button onClick={handleRetry} variant="outlined" sx={{ mb: 1 }}>
          Retry recommendation
        </Button>
        {quickRepliesVisible && (
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Chip
              label="Proceed to Order for Urgent Aid"
              onClick={() => handleQuick("order")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleQuick("order");
              }}
              role="button"
              tabIndex={0}
              aria-label="Order recommended relief items"
              color="primary"
              clickable
            />
            <Chip
              label="Need to refine"
              onClick={() => handleQuick("refine")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleQuick("refine");
              }}
              role="button"
              tabIndex={0}
              aria-label="Refine recommendation"
              variant="outlined"
              clickable
            />
            <Chip
              label="Call hotline"
              onClick={() => handleQuick("hotline")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleQuick("hotline");
              }}
              role="button"
              tabIndex={0}
              aria-label="Call local emergency hotline"
              color="warning"
              clickable
            />
          </Stack>
        )}
      </Box>

      <div
        ref={liveRef}
        style={{
          position: "absolute",
          left: -9999,
          height: 1,
          width: 1,
          overflow: "hidden",
        }}
        aria-live="polite"
      ></div>
    </Box>
  );
}
