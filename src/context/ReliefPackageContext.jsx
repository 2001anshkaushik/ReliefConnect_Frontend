import React, { createContext, useContext, useState, useEffect } from "react";

const ReliefPackageContext = createContext();

export const useReliefPackage = () => {
  const context = useContext(ReliefPackageContext);
  if (!context) {
    throw new Error("useReliefPackage must be used within ReliefPackageProvider");
  }
  return context;
};

export const ReliefPackageProvider = ({ children }) => {
  const [selectedResources, setSelectedResources] = useState([]);

  // Load package from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("reliefPackage");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedResources(parsed);
      } catch (e) {
        console.error("Failed to load relief package from storage", e);
      }
    }
  }, []);

  // Save package to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("reliefPackage", JSON.stringify(selectedResources));
  }, [selectedResources]);

  const addResource = (resource) => {
    setSelectedResources((prev) => {
      // Check if resource already exists
      const exists = prev.find((r) => r.id === resource.id);
      if (exists) {
        // Update quantity if already in package
        return prev.map((r) =>
          r.id === resource.id
            ? { ...r, quantity: (r.quantity || 1) + 1 }
            : r
        );
      }
      // Add new resource with quantity 1
      return [...prev, { ...resource, quantity: 1 }];
    });
  };

  const removeResource = (resourceId) => {
    setSelectedResources((prev) =>
      prev.filter((r) => r.id !== resourceId)
    );
  };

  const updateQuantity = (resourceId, quantity) => {
    if (quantity < 1) {
      removeResource(resourceId);
      return;
    }
    setSelectedResources((prev) =>
      prev.map((r) =>
        r.id === resourceId ? { ...r, quantity } : r
      )
    );
  };

  const clearPackage = () => {
    setSelectedResources([]);
    sessionStorage.removeItem("reliefPackage");
  };

  const isInPackage = (resourceId) => {
    return selectedResources.some((r) => r.id === resourceId);
  };

  const getResourceQuantity = (resourceId) => {
    const resource = selectedResources.find((r) => r.id === resourceId);
    return resource?.quantity || 0;
  };

  const getTotalItems = () => {
    return selectedResources.reduce((sum, r) => sum + (r.quantity || 1), 0);
  };

  const loadKit = (kit) => {
    // kit should have structure: { resources: [...] }
    if (kit && kit.resources) {
      setSelectedResources(kit.resources);
    }
  };

  const value = {
    selectedResources,
    addResource,
    removeResource,
    updateQuantity,
    clearPackage,
    isInPackage,
    getResourceQuantity,
    getTotalItems,
    loadKit,
  };

  return (
    <ReliefPackageContext.Provider value={value}>
      {children}
    </ReliefPackageContext.Provider>
  );
};

