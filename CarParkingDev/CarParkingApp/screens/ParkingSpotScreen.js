import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ParkingSpotScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddSpot = async () => {
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'parking-spot.jpg',
      type: 'image/jpg',
    });
    formData.append('location', location);

    try {
      await axios.post('https://your-backend-url.com/api/parking-spots', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Add Parking Spot</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput placeholder="Location" onChangeText={setLocation} value={location} />
      <Button title="Add Spot" onPress={handleAddSpot} />
    </View>
  );
}

