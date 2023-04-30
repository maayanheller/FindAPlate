import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import { DataTable, ActivityIndicator, MD2Colors } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];


export default function CarDatatable({ navigation }) {
  const [loading, setLoading ] = useState(true);
  const [carData, setCarData] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=3481674');
      setCarData(response.data.result.records[0]);
    };
    dataFetch();
  }, []);

  useEffect(() => {
    if (carData && carData._id !== undefined) {
      setLoading(false)
    }    
  }, [carData]);
  
  if(loading) {
   return <ActivityIndicator size='large' animating={true} color={MD2Colors.blue800} />
  }

  return (
    <View>
      <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Field</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>

        {Object.entries(carData).map((item, i) => {
          if(item[0] != "_id") {
            return(
            <DataTable.Row key={i}>
              <DataTable.Cell>{item[0]}</DataTable.Cell>
              <DataTable.Cell>{item[1] == null || item[1] == "" ? "-" : item[1]}</DataTable.Cell>
            </DataTable.Row>
            )
          }
        })}

        <DataTable.Pagination
          style={{
            width: "100%"
          }}
        />
    </DataTable>
    </ScrollView>
  </View>
  );
}
