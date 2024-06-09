// ItemDetailScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItemSuccess } from '../store/stateSlice/manuallySlice'; // 假设你有一个更新的action

const ItemDetailScreen = ({ route, navigation }) => {
  const { item, editable } = route.params;
  const dispatch = useDispatch();

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate || '');
  const [image, setImage] = useState(item.image);

  const handleUpdate = () => {
    dispatch(updateItemSuccess({
      ...item,
      name,
      quantity,
      expiryDate,
      image
    }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label}>物品名称</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.value}>{name}</Text>
      )}

      <Text style={styles.label}>数量</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.value}>{quantity}</Text>
      )}

      <Text style={styles.label}>保质期</Text>
      {editable ? (
        <TextInput
          style={styles.input}
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
      ) : (
        <Text style={styles.value}>{expiryDate}</Text>
      )}

      {editable && (
        <Button title="更新" onPress={handleUpdate} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  }
});

export default ItemDetailScreen;
