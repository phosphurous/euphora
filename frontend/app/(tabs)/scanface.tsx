import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';

export default function ScanFaceScreen() {
  const [progress, setProgress] = useState(0); // Initial progress

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Face</Text>
      <View style={styles.backgroundView}>
        <View style={[styles.progressView, { width: `${progress}%` }]} />
      </View>
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
  backgroundView: {
    height: 20, // Height of the container view
    width: '75%', // Full width
    backgroundColor: '#0D332A', // Initial gray color
    borderRadius: 10, // Border radius to make it rounded
    overflow: 'hidden', // Clip child view
    margin: 20,
  },
  progressView: {
    height: '100%', // Full height of the container view
    backgroundColor: '#D1E543', // Green color
  },
});
