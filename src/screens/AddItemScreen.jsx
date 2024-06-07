// screens/AddItemScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/stateSlice/inventorySlice';
import { useNavigation } from '@react-navigation/native';

const AddItemScreen = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddItem = () => {
    if (name.trim() && quantity && date) {
      dispatch(addItem({ name, quantity, date }));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>添加物品</Text>
      <TextInput
        style={styles.input}
        placeholder="物品名称"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="数量"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="存入时间 (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="添加" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default AddItemScreen;
