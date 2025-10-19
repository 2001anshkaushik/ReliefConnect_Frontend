import React, { useState, useContext } from "react";
import { recommend } from "../services/api";
import {
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { NotificationContext } from "./Notifications";

export default function RecommendationForm() {
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendationLocal] = useState(null);
  const navigate = useNavigate();
  const { setRecommendation } = useContext(AppContext);
  const { show } = useContext(NotificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRecommendationLocal(null);
    setLoading(true);
    try {
      const data = await recommend(needs);
      setRecommendationLocal(data);
      setRecommendation(data);
      show("Recommendations received", "success");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Request failed";
      setError(msg);
      show(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} aria-label="recommendation-form">
        <TextField
          label="Describe your needs"
          placeholder="e.g. I need food and water after a flood"
          fullWidth
          multiline
          minRows={3}
          value={needs}
          required
          onChange={(e) => setNeeds(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          Get Recommendations
        </Button>
      </form>

      {error && (
        <Typography color="error" sx={{ mt: 2 }} role="alert">
          {error}
        </Typography>
      )}

      {loading && (
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" height={118} />
        </Box>
      )}

      {recommendation && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Recommended Resources</Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
              {typeof recommendation === "string"
                ? recommendation
                : JSON.stringify(recommendation, null, 2)}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate("/order", { state: { recommendation } })
                }
              >
                Proceed to Order
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setRecommendationLocal(null);
                  setNeeds("");
                }}
              >
                Decline
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
