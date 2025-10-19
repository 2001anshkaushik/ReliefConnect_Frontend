import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useCustomKits } from "../context/CustomKitsContext";
import { useReliefPackage } from "../context/ReliefPackageContext";
import { NotificationContext } from "./Notifications";

export default function CustomKitDialog({ open, onClose, onSave, kitName, setKitName }) {
  const { customKits, deleteKit, updateKit } = useCustomKits();
  const { setSelectedResources, selectedResources, clearPackage } = useReliefPackage();
  const { show } = React.useContext(NotificationContext);

  const [editingKitId, setEditingKitId] = useState(null);
  const [editingKitName, setEditingKitName] = useState("");

  useEffect(() => {
    if (!open) {
      setEditingKitId(null);
      setEditingKitName("");
    }
  }, [open]);

  const handleLoadKit = (kit) => {
    clearPackage(); // Clear current package before loading
    kit.resources.forEach(resource => {
      // Add resources one by one to ensure quantities are handled by addResource logic
      // Or directly set if addResource doesn't handle quantity updates on initial add
      setSelectedResources(prev => {
        const existingIndex = prev.findIndex(r => r.id === resource.id);
        if (existingIndex > -1) {
          return prev.map((r, idx) => idx === existingIndex ? { ...r, quantity: resource.quantity } : r);
        }
        return [...prev, resource];
      });
    });
    show(`Loaded kit "${kit.name}" into your package.`, "info");
    onClose();
  };

  const handleEditKitName = (kitId, currentName) => {
    setEditingKitId(kitId);
    setEditingKitName(currentName);
  };

  const handleSaveEditedKitName = (kitId) => {
    if (!editingKitName.trim()) {
      show("Kit name cannot be empty", "error");
      return;
    }
    const kitToUpdate = customKits.find(k => k.id === kitId);
    if (kitToUpdate) {
      updateKit(kitId, editingKitName, kitToUpdate.resources);
      show(`Kit "${editingKitName}" updated.`, "success");
      setEditingKitId(null);
      setEditingKitName("");
    }
  };

  const handleDeleteKit = (kitId) => {
    deleteKit(kitId);
    show("Custom kit deleted.", "info");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Save/Manage Relief Kits
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
            Save Current Package as New Kit
          </Typography>
          <TextField
            label="Kit Name"
            fullWidth
            value={kitName}
            onChange={(e) => setKitName(e.target.value)}
            margin="normal"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSave}
                  disabled={!kitName.trim() || selectedResources.length === 0}
                  startIcon={<SaveIcon />}
                  sx={{ ml: 1 }}
                >
                  Save
                </Button>
              ),
            }}
          />
          {selectedResources.length === 0 && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
              Add items to your package before saving as a kit.
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
          Your Saved Kits ({customKits.length})
        </Typography>
        {customKits.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
            No custom kits saved yet.
          </Typography>
        ) : (
          <List dense>
            {customKits.map((kit) => (
              <ListItem
                key={kit.id}
                secondaryAction={
                  <Box>
                    {editingKitId === kit.id ? (
                      <IconButton edge="end" aria-label="save" onClick={() => handleSaveEditedKitName(kit.id)}>
                        <CheckIcon color="success" />
                      </IconButton>
                    ) : (
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditKitName(kit.id, kit.name)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteKit(kit.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                }
              >
                {editingKitId === kit.id ? (
                  <TextField
                    value={editingKitName}
                    onChange={(e) => setEditingKitName(e.target.value)}
                    variant="standard"
                    fullWidth
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEditedKitName(kit.id);
                      if (e.key === 'Escape') {
                        setEditingKitId(null);
                        setEditingKitName("");
                      }
                    }}
                  />
                ) : (
                  <ListItemText
                    primary={kit.name}
                    secondary={`${kit.resources.length} items | Saved: ${new Date(kit.createdAt).toLocaleDateString()}`}
                  />
                )}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleLoadKit(kit)}
                  sx={{ ml: 2 }}
                >
                  Load
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
