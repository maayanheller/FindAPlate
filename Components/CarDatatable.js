import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import {
  DataTable,
  ActivityIndicator,
  MD2Colors,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { DATAFIELDS } from "../assets/Constants";

export default function CarDatatable({ plateNumber, typeAgain }) {
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=" + 
          plateNumber
      );
      setCarData(response.data.result.records[0]);
    };
    dataFetch();
  }, []);

  useEffect(() => {
    if (carData && carData._id !== undefined) {
      setLoading(false);
    }
  }, [carData]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color={MD2Colors.blue800}
      />
    );
  }

  return (
    <View>
      <ScrollView>
        <IconButton
          icon="arrow-left-bold-outline"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => typeAgain()}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Field</DataTable.Title>
            <DataTable.Title>Value</DataTable.Title>
          </DataTable.Header>

          {Object.entries(carData).slice(1, -1).map((item, i) => {
              return (
                <DataTable.Row key={i}>
                  <DataTable.Cell>
                    {item[1] == null || item[1] == "" ? "-" : item[1]}
                  </DataTable.Cell>
                  <DataTable.Cell style={StyleSheet.cell}>
                  {DATAFIELDS[item[0]]}
                  </DataTable.Cell>
                </DataTable.Row>
              );
          })}

          <DataTable.Pagination
            style={{
              width: "100%",
              backgroundColor: 'red'
            }}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
}