import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('https://your-backend-url.com/api/register', {
        phoneNumber,
        name,
        password,
      });
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} />
      <TextInput placeholder="Name" onChangeText={setName} value={name} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

