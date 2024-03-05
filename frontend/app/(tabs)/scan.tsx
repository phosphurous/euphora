import { StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { FileSystemUploadType, uploadAsync } from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


export default function ScanScreen() {
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
            if(image){
                // const uploadResult = await uploadAsync('http://192.168.56.1:3000/ocr/img-to-text', image, {
                //     httpMethod: 'POST',
                //     uploadType: FileSystemUploadType.MULTIPART,
                //     fieldName: 'demo_image'
                // });

                // this is to compress the image because of file limit
                const manipResult = await manipulateAsync(
                    image, [],
                    { compress: 0.2, format: SaveFormat.JPEG }
                );


                // here is to upload to backend
                const uploadResult = await uploadAsync('https://cdwp7vpn-3000.asse.devtunnels.ms/ocr/img-to-text', manipResult.uri, {
                    httpMethod: 'POST',
                    uploadType: FileSystemUploadType.MULTIPART,
                    fieldName: 'demo_image'
                });
                console.log(uploadResult)
            }
        } 
        sendImage()
    },[image])

    const takePicture = async() => {
        if(camera){
            const data = await camera.takePictureAsync({base64 : true})
            setImage(data.uri);
            // console.log(data.uri);
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
                ratio={'16:9'} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.circularButton} onPress={()=>takePicture()}>
                <Text style={styles.buttonText}></Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton} onPress={()=>pickImage()}>
                <Text style={styles.buttonText}></Text>
              </TouchableOpacity>
            </View>

            {/* {image && <Image source={{uri: image}} style={{flex:1}}/>} */}
        {/* </View> */}
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
    marginHorizontal: 30, // Add space between the grey and blue button
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    // Remove marginLeft if it's no longer necessary
  },
  buttonText: {
      color: 'white', // Button text color
      fontSize: 16, // Adjust your size
      fontWeight: 'bold',
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


const cameraStyles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      alignItems:"center"
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 0.8
  }
})

//import { StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
// import { useEffect, useState } from 'react';

// import * as ImagePicker from 'expo-image-picker';
// import { FileSystemUploadType, uploadAsync } from 'expo-file-system';
// import { Camera, CameraType } from 'expo-camera';
// import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


// export default function ScanScreen() {
//     const [camera, setCamera] = useState<Camera | null>(null);
//     const [image, setImage] = useState<string | null>(null);
//     const pickImage = async () => {

//         // const res2 = await fetch('http://192.168.56.1:3000/ocr/img-to-text')
//         // const {data} = await res2.json();
//         // console.log(data)


//         // from gallery
//         // No permissions request is necessary for launching the image library
//         // let result = await ImagePicker.launchImageLibraryAsync({
//         //     mediaTypes: ImagePicker.MediaTypeOptions.All,
//         //     allowsEditing: true,
//         //     // aspect: [4, 3],
//         //     quality: 1,
//         // });

//         // console.log(result);

//         // send image
//         // if (!result.canceled) {
//         //     setImage(result.assets[0].uri);
//         //     const uploadResult = await uploadAsync('http://192.168.56.1:3000/ocr/img-to-text', result.assets[0].uri, {
//         //         httpMethod: 'POST',
//         //         uploadType: FileSystemUploadType.MULTIPART,
//         //         fieldName: 'demo_image'
//         //     });
//         //     console.log(uploadResult)
//         // }
//     };

//     useEffect(() => {
//         const sendImage = async () => {
//             if(image){
//                 // const uploadResult = await uploadAsync('http://192.168.56.1:3000/ocr/img-to-text', image, {
//                 //     httpMethod: 'POST',
//                 //     uploadType: FileSystemUploadType.MULTIPART,
//                 //     fieldName: 'demo_image'
//                 // });

//                 // this is to compress the image because of file limit
//                 const manipResult = await manipulateAsync(
//                     image, [],
//                     { compress: 0.2, format: SaveFormat.JPEG }
//                 );


//                 // here is to upload to backend
//                 const uploadResult = await uploadAsync('https://cdwp7vpn-3000.asse.devtunnels.ms/ocr/img-to-text', manipResult.uri, {
//                     httpMethod: 'POST',
//                     uploadType: FileSystemUploadType.MULTIPART,
//                     fieldName: 'demo_image'
//                 });
//                 console.log(uploadResult)
//             }
//         } 
//         sendImage()
//     },[image])

//     const takePicture = async() => {
//         if(camera){
//             const data = await camera.takePictureAsync({base64 : true})
//             setImage(data.uri);
//             // console.log(data.uri);
//         } 
//     }



//   return (
//     <View style={styles.container}>
//         {/* <View style={{ flex: 1}}> */}
//             <View style={cameraStyles.cameraContainer}>
//                 <Camera 
//                 ref={ref => setCamera(ref)}
//                 style={cameraStyles.fixedRatio} 
//                 type={CameraType.back}
//                 ratio={'16:9'} />
//             </View>
//             <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.circularButton} onPress={()=>takePicture()}>
//                         <Text style={styles.buttonText}></Text>
//                     </TouchableOpacity>
//                 </View>
//             {/* {image && <Image source={{uri: image}} style={{flex:1}}/>} */}
//         {/* </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Fill the entire screen
//     justifyContent: 'flex-end', // Align children to the bottom
//     alignItems: 'center', // Center children horizontally
//   },
//   buttonContainer: {
//     marginTop:20,
//     marginBottom: 50, // Push the button up a little from the bottom edge
//     width: '100%', // Ensure the button container fills the width
//     alignItems: 'center',
//   },
//   circularButton: {
//       width: 70, // Diameter of the circular button
//       height: 70, // Diameter of the circular button
//       borderRadius: 35, // Half the width/height to make it perfectly round
//       backgroundColor: 'grey', // Choose your color
//       justifyContent: 'center', // Center the content vertically
//       alignItems: 'center', // Center the content horizontally
//       elevation: 3, // This adds a drop shadow on Android
//       shadowOffset: { width: 1, height: 1 }, // These four shadow properties add a shadow on iOS
//       shadowColor: 'black',
//       shadowOpacity: 0.3,
//       shadowRadius: 3,
//     },
//     buttonText: {
//       color: 'white', // Button text color
//       fontSize: 16, // Adjust your size
//       fontWeight: 'bold',
//     },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });


// const cameraStyles = StyleSheet.create({
//   cameraContainer: {
//       flex: 1,
//       alignItems:"center"
//   },
//   fixedRatio:{
//       flex: 1,
//       aspectRatio: 0.8
//   }
// })

