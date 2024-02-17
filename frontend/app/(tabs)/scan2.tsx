import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';


export default function ScanScreen2() {
    const [image, setImage] = useState(null);
    
    const pickImage = async () => {
        const res2 = await fetch('http://192.168.56.1:3000/ocr/get-text')
        const {data} = await res2.json();
        console.log(data)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // const resultFromUri = await MlkitOcr.detectFromUri(result.assets[0].uri);
        }
    };

//   useEffect(() => {
//     const HARDCODED_URI = "https://miro.medium.com/v2/resize:fit:654/1*smMQq7p_o8pPZoJTCaGMwQ.png" 
//     // const result = await TextRecognition.recognize(image.asset[0].uri);
//     const get_result = async() => {
//         const result = await TextRecognition.recognize(HARDCODED_URI);
//         console.log(result);
//     }
//         // console.log(image);
//     get_result()
//   },[])
//   useEffect
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan2</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Text style={styles.title}>Scan2</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/scan2.tsx" />
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
