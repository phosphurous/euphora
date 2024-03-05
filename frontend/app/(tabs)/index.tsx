import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Link } from 'expo-router';
import { Logo } from '@/assets/images/logo.png';
import { Image } from 'expo-image';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Euphora</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Rediscover Your Skincare Products</Text>
        <Link href = "../specifyCondition" asChild>
            <TouchableHighlight style={styles.button} underlayColor="#edf5b4">
                <Text style={styles.buttonText}>Specify Condition</Text>
            </TouchableHighlight>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D332A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#D1E543',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
//   image: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     zIndex: 100,
//   },
});
