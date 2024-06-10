// HistoryDetailScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HistoryDetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.label}>物品名称:</Text>
        <Text style={styles.value}>{item.name}</Text>

        <Text style={styles.label}>检测时间:</Text>
        <Text style={styles.value}>{new Date(item.timestamp).toLocaleString()}</Text>

        <Text style={styles.label}>数量:</Text>
        <Text style={styles.value}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  value: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default HistoryDetailScreen;
