// App.tsx or index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation'; // Import the Navigation component
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({ 'PlayfairDisplay-SemiBold': require('./assets/fonts/PlayfairDisplay-SemiBold.ttf')})

  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
      return null;
    }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
