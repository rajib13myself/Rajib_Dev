import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await axios.get('https://your-backend-url.com/api/parking-spots');
        setParkingSpots(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParkingSpots();
  }, []);

  return (
    <View>
      <Text>Parking Spots</Text>
      <FlatList
        data={parkingSpots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.location}</Text>
            <Text>{item.status}</Text>
          </View>
        )}
      />
      <Button title="Add Parking Spot" onPress={() => navigation.navigate('ParkingSpot')} />
    </View>
  );
}

