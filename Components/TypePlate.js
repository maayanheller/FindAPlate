import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { View, Text } from "react-native";
import CarDatatable from "./CarDatatable";

export default function TypePlate({ navigation }) {
  const [input, setInput] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  const search = () => {
    if (input.length >= 5 && input.length <= 8) {
      setShouldSearch(true);
    }
  };

  return (
    <View>
      {shouldSearch ? (
        <CarDatatable
          typeAgain={() => {
            setShouldSearch(false);
            setInput("");
          }}
          plateNumber={input}
        />
      ) : (
        <Searchbar
          placeholder="Plate Number"
          value={input}
          onChangeText={(input) => setInput(input.replace(/[^0-9]/g, ""))}
          onIconPress={search}
          onSubmitEditing={search}
        />
      )}
    </View>
  );
}
