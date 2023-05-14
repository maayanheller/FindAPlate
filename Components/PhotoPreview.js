import { useState } from "react";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import { LOCALIP } from "../assets/Constants";

export default function PhotoPreview({ photo, retake }) {
  const [ocr, setOcr] = useState("");

  const scanPlate = async() => {
    const smallerImage = await ImageManipulator.manipulateAsync(photo.uri, [
      {
        resize: {width: 512, height: 512}
      }
    ],
    {compress: 1, base64: true, format: ImageManipulator.SaveFormat.JPEG});
    let formData = new FormData();

    formData.append("name", new Date() + "plate")
    formData.append("type", 'image/jpg')
    formData.append('photo', smallerImage.base64);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
  };

    fetch(`http://${LOCALIP}:3000/ocr/`, options).catch((error) => console.log(error));
  }
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                retake();
              }}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={scanPlate}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Scan Plate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
