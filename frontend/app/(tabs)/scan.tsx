import { StyleSheet, Button, Image, TouchableOpacity, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { FileSystemUploadType, uploadAsync } from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '@env';
import { Link } from 'expo-router';

export default function ScanScreen() {
  const navigation = useNavigation();

  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [allergentLst, setAllergentLst] = useState<string[]>([]);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const pickImage = async () => {
    // Check for library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      quality: 1,
    });

    console.log(result);
    console.log(result.assets[0].uri);

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri); // Set the selected image

      // Optionally, compress the image before uploading

      try {
        const manipResult = await manipulateAsync(
          result.assets[0].uri,
          [], // No operations to perform
          { compress: 0.8, format: SaveFormat.JPEG }
        );

        // Upload the image
        const uploadResult = await uploadAsync(`${BACKEND_URL}/ocr/img-to-text`, manipResult.uri, {
          httpMethod: 'POST',
          uploadType: FileSystemUploadType.MULTIPART,
          fieldName: 'demo_image'
        });
        console.log("uploadresult: ", uploadResult);

      } catch (error) {
        console.log("An error occurred during the image manipulation or upload process: ", error);
      }
    }
  };

  useEffect(() => {
    const sendImage = async () => {
      if (image) {

        // this is to compress the image because of file limit
        const manipResult = await manipulateAsync(
          image, [],
          { compress: 0.2, format: SaveFormat.JPEG }
        );

        const apiURL = `${BACKEND_URL}/api/v1/ingredients/1/allergy-confidence`

        // here is to upload to backend
        const uploadResult = await uploadAsync(apiURL, manipResult.uri, {
          httpMethod: 'POST',
          uploadType: FileSystemUploadType.MULTIPART,
          fieldName: 'ingredient_image'
        });

        if (uploadResult.status === 200) {
          const jsonResponse = JSON.parse(uploadResult.body);
          // console.log("confidence: " , jsonResponse);
          setAllergentLst(jsonResponse);
          console.log("allergent list: " , allergentLst.length);
          if(allergentLst.length > 0){
            navigation.navigate("ingredientsAnalysisScan", { scanIngredients: allergentLst });
          }
          // setAllergentLst([]);
          // Handle the JSON response here, such as updating state or UI
        } else {
          console.error('Failed to upload image to API');
        }
      }
    }
    sendImage()
  }, [image])

  const takePicture = async () => {
    if (camera && isCameraReady) {
      try {
        const data = await camera.takePictureAsync({ base64: true });
        setImage(data.uri);
      } catch (error) {
        console.error("Error taking picture: ", error);
      }
    } else {
      console.log('Camera is not ready yet.');
      // Optionally, inform the user or disable the take picture button until the camera is ready.
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={{ flex: 1}}> */}
      <View style={cameraStyles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={cameraStyles.fixedRatio}
          type={CameraType.back}
          ratio={'16:9'}
          onCameraReady={() => setIsCameraReady(true)} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.circularButton} onPress={() => takePicture()}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage()}>
          <Image
            source={require("@/assets/images/image.png")} // Adjust the path to your image accordingly
            style={styles.uploadButtonImage}
          />
        </TouchableOpacity>
      </View>



      {/* {image && <Image source={{uri: image}} style={{flex:1}}/>} */}
      {/* </View> */}
      <Text style={styles.title}>Scan</Text>

      <TouchableOpacity style={{
        backgroundColor: "#D1E543",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 20
      }}
      onPress={() => navigation.navigate("findProduct")}
      >
          <Text>Search for product instead</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    justifyContent: 'flex-end', // Align children to the bottom
    alignItems: 'center', // Center children horizontally
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 40,
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    width: '100%', // Take the full width
  },
  circularButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 50, // Add space between the grey and blue button
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "black",
    borderWidth: 1,
    // Remove marginLeft if it's no longer necessary
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 16, // Adjust your size
    fontWeight: 'bold',
  },
  uploadButtonImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});


const cameraStyles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    alignItems: "center"
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 0.8
  }
})