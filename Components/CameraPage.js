import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PhotoPreview from './PhotoPreview';


export default function CameraPage({ navigation }) {
  
  const [type, setType] = useState(CameraType.back);
  let camera = Camera;
  const [permission, requestPermission] = camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState({})


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
   }

  const retake = () => {
    setPreviewVisible(false);
    setCapturedImage({});
  }



  return (
    <View style={styles.container}>
      {
        previewVisible && capturedImage ? (
          <PhotoPreview retake={retake} photo={capturedImage} />
        ):
        (
          <Camera ref={r => camera = r} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.circleButton}
                onPress={takePicture}
              />
            </View>
          </Camera>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 64,
  },
  circleButton: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,    
    height: 75,
    width: 75,
    backgroundColor: '#ffffff',
    borderRadius: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});