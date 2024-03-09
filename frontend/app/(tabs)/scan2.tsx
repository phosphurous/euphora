import { StyleSheet, Button, Image, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { FileSystemUploadType, uploadAsync } from "expo-file-system";
import { Camera, CameraType } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

export default function ScanScreen2() {
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    // const res2 = await fetch('http://192.168.56.1:3000/ocr/img-to-text')
    // const {data} = await res2.json();
    // console.log(data)
    // from gallery
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     // aspect: [4, 3],
    //     quality: 1,
    // });
    // console.log(result);
    // send image
    // if (!result.canceled) {
    //     setImage(result.assets[0].uri);
    //     const uploadResult = await uploadAsync('http://192.168.56.1:3000/ocr/img-to-text', result.assets[0].uri, {
    //         httpMethod: 'POST',
    //         uploadType: FileSystemUploadType.MULTIPART,
    //         fieldName: 'demo_image'
    //     });
    //     console.log(uploadResult)
    // }
  };

  useEffect(() => {
    const sendImage = async () => {
      if (image) {
        // const uploadResult = await uploadAsync('http://192.168.56.1:3000/ocr/img-to-text', image, {
        //     httpMethod: 'POST',
        //     uploadType: FileSystemUploadType.MULTIPART,
        //     fieldName: 'demo_image'
        // });

        // this is to compress the image because of file limit
        const manipResult = await manipulateAsync(image, [], {
          compress: 0.2,
          format: SaveFormat.JPEG,
        });

        // here is to upload to backend
        const uploadResult = await uploadAsync(
          "https://cdwp7vpn-3000.asse.devtunnels.ms/ocr/img-to-text",
          manipResult.uri,
          {
            httpMethod: "POST",
            uploadType: FileSystemUploadType.MULTIPART,
            fieldName: "demo_image",
          },
        );
        console.log(uploadResult);
      }
    };
    sendImage();
  }, [image]);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ base64: true });
      setImage(data.uri);
      // console.log(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan2</Text>
      {/* <View style={{ flex: 1}}> */}
      <View style={cameraStyles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={cameraStyles.fixedRatio}
          type={CameraType.back}
          ratio={"16:9"}
        />
      </View>

      <Button title="Take Picture" onPress={() => takePicture()} />
      {/* {image && <Image source={{uri: image}} style={{flex:1}}/>} */}
      {/* </View> */}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/scan2.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
