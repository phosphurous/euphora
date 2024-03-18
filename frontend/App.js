// App.tsx or index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation"; // Import the Navigation component

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

// run prettier:
// npx prettier . --write
