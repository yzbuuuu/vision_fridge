// HistoryDetailScreen.jsx
import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {itemImage} from '../img/imgService';
import {expireMap, itemMap} from '../services/itemMap';

const HistoryDetailScreen = ({route}) => {
  const {item} = route.params;

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

  const renderCard = ({item}) => {
    const expired = isExpired(item.timestamp, expireMap[item.class_id]);
    return (
      <View style={[styles.card, expired && styles.expiredCard]}>
        <Image source={itemImage(item.class_id)} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, expired && styles.expiredText]}>
            {itemMap[item.class_id]}
          </Text>
          <Text style={[styles.timestamp, expired && styles.expiredText]}>
            存入时间: {formatTimestamp(item.timestamp)}
          </Text>
          <Text style={[styles.quantity, expired && styles.expiredText]}>
            数量: {item.count}
          </Text>
          {expired && <Text style={styles.expiredLabel}>已过保质期</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.detailImage} />
      <FlatList
        data={item.results}
        renderItem={renderCard}
        keyExtractor={(result, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  detailImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
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
    shadowOffset: {width: 0, height: 2},
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

export default HistoryDetailScreen;
