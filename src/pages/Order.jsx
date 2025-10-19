import React from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import OrderForm from "../components/OrderForm";

const steps = ["Review Recommendation", "Enter Details", "Confirm Order"];

export default function OrderPage() {
  return (
    <Container className="container" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order
      </Typography>
      <Stepper activeStep={1} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card>
        <CardContent>
          <OrderForm />
        </CardContent>
      </Card>
    </Container>
  );
}
