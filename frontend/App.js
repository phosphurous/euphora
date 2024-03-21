// App.tsx or index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation"; // Import the Navigation component
import { StyledProvider } from "@gluestack-ui/themed";

export default function App() {
  return (
    <StyledProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </StyledProvider>
  );
}

// run prettier:
// npx prettier . --write
