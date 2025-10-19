import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function OrderSummary({ name, address, items = [], orderId }) {
  const parsedItems = Array.isArray(items) ? items : [items];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Order Summary</Typography>
      {orderId && (
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Order ID: {orderId}
        </Typography>
      )}
      <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1">Address:</Typography>
      <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mb: 2 }}>
        {address}
      </Typography>

      <Typography variant="subtitle1">Items</Typography>
      <List>
        {parsedItems.map((it, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText
              primary={typeof it === "string" ? it : JSON.stringify(it)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export function renderOrderHtml({ name, address, items = [], orderId }) {
  const itemsHtml = (Array.isArray(items) ? items : [items])
    .map(
      (it) =>
        `<li>${
          typeof it === "string"
            ? escapeHtml(it)
            : escapeHtml(JSON.stringify(it))
        }</li>`
    )
    .join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Order Summary</title>
      <style>
        body{font-family: Arial, Helvetica, sans-serif; padding:20px}
        h1{font-size:18px}
        ul{list-style:disc; padding-left:20px}
      </style>
    </head>
    <body>
      <h1>Order Summary ${orderId ? `— ${orderId}` : ""}</h1>
      <p><strong>Name:</strong> ${escapeHtml(name || "")}</p>
      <p><strong>Address:</strong><br/>${escapeHtml(
        (address || "").replace(/\n/g, "<br/>")
      )}</p>
      <h2>Items</h2>
      <ul>${itemsHtml}</ul>
    </body>
  </html>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
