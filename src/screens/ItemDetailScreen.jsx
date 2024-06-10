import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateItemSuccess} from '../store/stateSlice/manuallySlice'; // 假设你有一个更新的action
import {expireMap} from '../services/itemMap';
import CustomPicker from '../components/CustomPicker'; // 导入自定义的 Picker 组件

const ItemDetailScreen = ({route, navigation}) => {
  const {item, editable} = route.params;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate || '');
  const [image, setImage] = useState(item.image);
  const [calculatedExpiry, setCalculatedExpiry] = useState('');

  useEffect(() => {
    setName(item.name);
    setQuantity(item.quantity);
    setExpiryDate(item.expiryDate || '');
    setImage(item.image);
  }, [item]);

  useEffect(() => {
    setCalculatedExpiry(manExpiryDateCal());
  }, [expiryDate]);

  const handleUpdate = () => {
    dispatch(
      updateItemSuccess({
        id: item.id, // 确保传递了id
        updatedItem: {
          name,
          quantity,
          expiryDate,
          image,
        },
      }),
    );
    console.log({
      ...item,
      name,
      quantity,
      expiryDate,
      image,
    });
    setIsEditing(false); // 取消编辑模式
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

  const manExpiryDateCal = () => {
    const currentTime = new Date();
    const storageTime = new Date(item.timestamp);
    const timeDiff = currentTime - storageTime; // in milliseconds
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const itemShelfLife = expiryDate;
    const remainingDays = itemShelfLife - daysDiff;
    const remainingHours = 24 - hoursDiff; // Calculate the remaining hours in the current day

    return `${remainingDays - 1}天${remainingHours - 1}小时/${itemShelfLife}天`;
  };

  const expiryDaysItems = [...Array(101).keys()].map(day => ({
    label: day.toString(),
    value: day,
  }));

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label}>物品名称</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      ) : (
        <Text style={styles.value}>{name}</Text>
      )}

      <Text style={styles.label}>数量</Text>
      {isEditing ? (
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
      {isEditing ? (
        <CustomPicker
          label="选择保质期"
          items={expiryDaysItems}
          onValueChange={setExpiryDate}
          initialVal={expiryDate}
        />
      ) : editable ? (
        <Text style={styles.value}>{calculatedExpiry}</Text>
      ) : (
        <Text style={styles.value}>{expiryDateCal()}</Text>
      )}

      {editable && (
        <Button
          title={isEditing ? '更新' : '编辑'}
          onPress={() => {
            if (isEditing) {
              handleUpdate();
            } else {
              setIsEditing(true);
            }
          }}
        />
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
  },
});

export default ItemDetailScreen;
