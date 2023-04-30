import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const retake = () => {
    setPreviewVisible(false);
    setCapturedImage({});
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <PhotoPreview retake={retake} photo={capturedImage} />
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
              onPress={() => navigation.navigate("Type Plate")}
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
  editButton: {
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
});
