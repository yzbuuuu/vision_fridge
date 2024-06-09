// ItemDetailScreen.jsx
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateItemSuccess} from '../store/stateSlice/manuallySlice'; // 假设你有一个更新的action
import {expireMap} from '../services/itemMap';

const ItemDetailScreen = ({route, navigation}) => {
  const {item, editable} = route.params;
  const dispatch = useDispatch();

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate || '');
  const [image, setImage] = useState(item.image);

  const handleUpdate = () => {
    dispatch(
      updateItemSuccess({
        ...item,
        name,
        quantity,
        expiryDate,
        image,
      }),
    );
    navigation.goBack();
  };

  const expiryDateCal = () => {
    console.log('expiryDateCal');
    const currentTime = new Date();
    const storageTime = new Date(item.timestamp);
    const timeDiff = currentTime - storageTime; // in milliseconds
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const itemShelfLife = expireMap[item.id];
    const remainingDays = itemShelfLife - daysDiff;
    const remainingHours = 24 - hoursDiff; // Calculate the remaining hours in the current day

    return `${remainingDays - 1}天${remainingHours - 1}小时/${itemShelfLife}天`;
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label}>物品名称</Text>
      {editable ? (
        <TextInput style={styles.input} value={name} onChangeText={setName} />
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
          value={expiryDateCal()}
          onChangeText={setExpiryDate}
        />
      ) : (
        <Text style={styles.value}>{expiryDateCal()}</Text>
      )}

      {editable && <Button title="更新" onPress={handleUpdate} />}
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
  },
});

export default ItemDetailScreen;
