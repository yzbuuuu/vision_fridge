// mainScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestDetectionRequest } from '../store/stateSlice/inventorySlice';
import { expireMap, itemMap } from '../services/itemMap';
import { itemImage } from '../img/imgService';

const MainScreen = ({ navigation }) => {
  const latestDetection = useSelector(state => state.inventory.latestDetection);
  const manuallyAdded = useSelector(state => state.manually?.items || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestDetectionRequest());
  }, [dispatch]);

  const data = latestDetection?.results?.map(item => ({
    id: item.class_id,
    name: itemMap[item.class_id],
    timestamp: item.timestamp,
    quantity: item.count,
    image: itemImage(item.class_id),
    editable: false, // 标识自动检测的数据不可编辑
    expiryDate: expireMap[item.class_id],
  })) || [];

  // 将手动添加的数据合并到自动检测的数据中，并标识可编辑
  const combinedData = data.concat(manuallyAdded.map(item => ({
    ...item,
    editable: true, // 标识手动添加的数据可编辑
  })));

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  const isExpired = (timestamp, expiryDays) => {
    const currentTime = new Date();
    const storageTime = new Date(timestamp);
    const timeDiff = currentTime - storageTime;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff > expiryDays;
  };

  const renderCard = ({ item }) => {
    const expired = isExpired(item.timestamp, item.expiryDate);

    return (
      <TouchableOpacity
        style={[styles.card, expired && styles.expiredCard]}
        onPress={() => navigation.navigate('ItemDetail', { item, editable: item.editable })}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, expired && styles.expiredText]}>{item.name}</Text>
          <Text style={[styles.timestamp, expired && styles.expiredText]}>
            存入时间: {formatTimestamp(item.timestamp)}
          </Text>
          <Text style={[styles.quantity, expired && styles.expiredText]}>数量: {item.quantity}</Text>
          {expired && <Text style={styles.expiredLabel}>已过保质期</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedData}
        renderItem={renderCard}
        keyExtractor={item => item.id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expiredCard: {
    borderColor: 'red',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  quantity: {
    fontSize: 12,
    color: '#888',
  },
  expiredText: {
    color: 'red',
  },
  expiredLabel: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default MainScreen;
