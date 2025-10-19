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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useForm } from "react-hook-form";

export default function ReportFraud() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const fraudTypes = [
    "Fake Relief Organizations",
    "Scam Phone Calls",
    "Fraudulent Websites",
    "Identity Theft",
    "Fake Donation Requests",
    "Price Gouging",
    "Other"
  ];

  const onSubmitReport = async (data) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setReportSubmitted(true);
    setDialogOpen(false);
    reset();
  };

  const safetyTips = [
    {
      title: "Verify Organizations",
      description: "Only donate to verified, legitimate relief organizations. Check their credentials and website authenticity."
    },
    {
      title: "Be Wary of Urgent Requests",
      description: "Scammers often create urgency. Take time to verify before donating money or sharing personal information."
    },
    {
      title: "Protect Personal Information",
      description: "Never share Social Security numbers, bank account details, or passwords with unsolicited callers."
    },
    {
      title: "Check URLs Carefully",
      description: "Look for secure websites (https://) and verify the organization's official domain name."
    },
    {
      title: "Report Suspicious Activity",
      description: "If you encounter fraud, report it immediately to local authorities and the Federal Trade Commission."
    },
    {
      title: "Trust Your Instincts",
      description: "If something feels wrong or too good to be true, it probably is. Don't be pressured into quick decisions."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <SecurityIcon sx={{ fontSize: 64, color: "warning.main", mb: 2 }} />
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          🛡️ Report Fraud
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Help protect your community by reporting fraudulent activities and scams targeting disaster relief efforts
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Report Fraud Section */}
        <Grid item xs={12} md={6}>
          <Card className="card-elevated">
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <ReportIcon sx={{ color: "error.main" }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Report Fraudulent Activity
                </Typography>
              </Box>
              
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  If you've encountered fraud, scams, or suspicious activity related to disaster relief, 
                  please report it immediately. Your report helps protect others in the community.
                </Typography>
              </Alert>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setDialogOpen(true)}
                sx={{
                  backgroundColor: "error.main",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
              >
                Report Fraud Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Safety Tips */}
        <Grid item xs={12} md={6}>
          <Card className="card-elevated">
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                🛡️ Fraud Prevention Tips
              </Typography>
              <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                {safetyTips.map((tip, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tip.description}
                    </Typography>
                    {index < safetyTips.length - 1 && <Box sx={{ borderBottom: "1px solid #e0e0e0", mt: 1 }} />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Warning Signs */}
        <Grid item xs={12}>
          <Card className="card-elevated">
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                🚨 Warning Signs of Fraud
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ color: "error.main", mb: 1 }}>💸</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Pressure for Immediate Payment
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Legitimate organizations don't pressure you for immediate donations
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ color: "error.main", mb: 1 }}>🔒</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Requests for Personal Information
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Never share SSN, bank details, or passwords over the phone
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ color: "error.main", mb: 1 }}>🌐</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Suspicious Websites
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Look for secure URLs (https://) and verify organization names
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h6" sx={{ color: "error.main", mb: 1 }}>📞</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Unsolicited Calls
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Be cautious of unexpected calls asking for donations or information
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Report Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ReportIcon sx={{ color: "error.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Report Fraudulent Activity
            </Typography>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmitReport)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Your Name (Optional)"
                  fullWidth
                  {...register("name")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email (Optional)"
                  type="email"
                  fullWidth
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type of Fraud</InputLabel>
                  <Select
                    {...register("fraudType", { required: "Please select a fraud type" })}
                    error={!!errors.fraudType}
                  >
                    {fraudTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description of the Incident"
                  multiline
                  rows={4}
                  fullWidth
                  {...register("description", { required: "Please provide a description" })}
                  error={!!errors.description}
                  helperText={errors.description?.message || "Please provide as much detail as possible"}
                  placeholder="Describe what happened, when, where, and any other relevant details..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contact Information of the Fraudster (if available)"
                  fullWidth
                  {...register("fraudsterInfo")}
                  placeholder="Phone number, email, website URL, organization name, etc."
                />
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography variant="body2">
                    Your report will be forwarded to the appropriate authorities including the Federal Trade Commission 
                    and local law enforcement. All information is kept confidential.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ backgroundColor: "error.main" }}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Success Alert */}
      {reportSubmitted && (
        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Thank you for your report!
          </Typography>
          <Typography variant="body2">
            Your fraud report has been submitted and will be investigated by the appropriate authorities. 
            You may be contacted for additional information if needed.
          </Typography>
        </Alert>
      )}
    </Container>
  );
}
