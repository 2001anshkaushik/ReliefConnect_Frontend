import React from "react";
import { Container } from "@mui/material";
import RecommendChat from "../components/RecommendChat";

export default function Recommend() {
  return (
    <Container className="container" sx={{ py: 4 }}>
      <RecommendChat />
    </Container>
  );
}
