import React, { createContext, useContext, useState, useEffect } from "react";

const CustomKitsContext = createContext();

export const useCustomKits = () => {
  const context = useContext(CustomKitsContext);
  if (!context) {
    throw new Error("useCustomKits must be used within CustomKitsProvider");
  }
  return context;
};

export const CustomKitsProvider = ({ children }) => {
  const [customKits, setCustomKits] = useState([]);

  // Load kits from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("customKits");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomKits(parsed);
      } catch (e) {
        console.error("Failed to load custom kits from storage", e);
      }
    }
  }, []);

  // Save kits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("customKits", JSON.stringify(customKits));
  }, [customKits]);

  const saveKit = (kitData) => {
    const newKit = {
      id: Date.now().toString(),
      name: kitData.name,
      resources: kitData.resources || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCustomKits((prev) => {
      // Check if kit with same name exists
      const existingIndex = prev.findIndex(kit => kit.name === newKit.name);
      if (existingIndex >= 0) {
        // Update existing kit
        const updated = [...prev];
        updated[existingIndex] = { ...newKit, id: prev[existingIndex].id };
        return updated;
      }
      // Add new kit
      return [...prev, newKit];
    });

    return newKit;
  };

  const deleteKit = (kitId) => {
    setCustomKits((prev) => prev.filter(kit => kit.id !== kitId));
  };

  const updateKit = (kitId, updatedData) => {
    setCustomKits((prev) =>
      prev.map(kit =>
        kit.id === kitId
          ? { ...kit, ...updatedData, updatedAt: new Date().toISOString() }
          : kit
      )
    );
  };

  const getKit = (kitId) => {
    return customKits.find(kit => kit.id === kitId);
  };

  const getKitsByDate = () => {
    return [...customKits].sort((a, b) => 
      new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );
  };

  const value = {
    customKits,
    saveKit,
    deleteKit,
    updateKit,
    getKit,
    getKitsByDate,
  };

  return (
    <CustomKitsContext.Provider value={value}>
      {children}
    </CustomKitsContext.Provider>
  );
};
