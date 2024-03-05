import React from 'react';
import { StyleSheet, Pressable, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Link href = "../specifyCondition" asChild>
            <TouchableHighlight>
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
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});
