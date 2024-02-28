import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Slider from "@react-native-community/slider";

export default function ScanFaceScreen() {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the slider value by 1 until it reaches 100
      if (sliderValue < 100) {
        setSliderValue(prevValue => prevValue + 1);
      } else {
        // If slider value reaches 100, clear the interval
        clearInterval(interval);
      }
    }, 50); // Adjust the interval duration as needed
    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [sliderValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Face</Text>
      <Text>Test</Text>
      <Slider
        value={sliderValue}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor='#66ff66' // Light green color
      />
      <Text>Slider that automatically slides from 0 to 100</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
