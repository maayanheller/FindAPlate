import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { IconButton, MD2Colors } from "react-native-paper";

import PhotoPreview from "./PhotoPreview";

export default function CameraPage({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  let camera = Camera;
  const [permission, requestPermission] = camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState({});
  

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    setCapturedImage(result.assets[0]);
    setPreviewVisible(true);
  };

  const retake = () => {
    setPreviewVisible(false);
    setCapturedImage({});
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <PhotoPreview retake={retake} photo={capturedImage} navigation={navigation} />
      ) : (
        <Camera ref={(r) => (camera = r)} style={styles.camera} type={type}>
          <View style={styles.shootButtonContainer}>
            <TouchableOpacity
              style={styles.shootButton}
              onPress={takePicture}
            />

            <IconButton
              icon="square-edit-outline"
              style={styles.editButton}
              iconColor={MD2Colors.purple800}
              size={50}
              onPress={() => navigation.navigate("Type Plate", {
                plate: ""
              })}
            />
            <IconButton
              icon="view-gallery"
              style={styles.galleryButton}
              iconColor={MD2Colors.purple800}
              size={50}
              onPress={() => pickImage()}
            />
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  shootButtonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 64,
  },
  shootButton: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    height: 75,
    width: 75,
    backgroundColor: "#ffffff",
    borderRadius: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  galleryButton: {
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
  editButton: {
    flex: 1,
    position: "absolute",
    bottom:0,
    right: 0,
  }
});
