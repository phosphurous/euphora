import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Slider from "react-native-slider";

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
  }, []); // Empty dependency array to run effect only once when component mounts

  // Define custom track and thumb styles
  const customStyle = {
    track: {
      height: 4,
      borderRadius: 2,
    },
    thumb: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: 'white',
      borderColor: '#30a935',
      borderWidth: 2,
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Face</Text>
      <Text>Test</Text>
      <Slider
        value={sliderValue}
        minimumValue={0}
        maximumValue={100}
        trackStyle={customStyle.track} // Pass the custom track style
        thumbStyle={customStyle.thumb} // Pass the custom thumb style
        minimumTrackTintColor='#1fb28a'
        maximumTrackTintColor='#d3d3d3'
        thumbTintColor='#1a9274'
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
