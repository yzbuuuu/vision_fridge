import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import img1 from '../img/丝瓜.jpeg';
import img2 from '../img/苦瓜.jpeg';
import img3 from '../img/冬瓜.jpeg';
import img4 from '../img/洋葱.jpeg';
import img5 from '../img/6.jpeg';
import img6 from '../img/南瓜.jpeg';
import img7 from '../img/生菜.jpeg';
import img8 from '../img/21.jpeg';
import img9 from '../img/cabbage.jpeg';
import img10 from '../img/茄子.jpeg';
import img11 from '../img/西瓜.jpeg';
import img12 from '../img/菠萝.jpeg';
import img13 from '../img/芒果.jpeg';
import img14 from '../img/火龙果.jpeg';
import img15 from '../img/荔枝.jpeg';
import img16 from '../img/猕猴桃.jpeg';
import img17 from '../img/banana.jpeg';
import img18 from '../img/椰子.jpeg';
import img19 from '../img/樱桃.jpeg';
import recipe1 from '../img/肉末蒸冬瓜.jpeg';
import recipe2 from '../img/蒜蓉蚝油生菜.jpeg';
import recipe3 from '../img/西红柿炒丝瓜.jpeg';

const HomeScreen = () => {
  // 固定的温度和湿度数据
  const temperature = 25;
  const humidity = 70;

  // 固定的时令蔬菜数据
  const seasonalVegetables = [
    {id: 1, name: '丝瓜', image: img1},
    {id: 2, name: '苦瓜', image: img2},
    {id: 3, name: '冬瓜', image: img3},
    {id: 4, name: '洋葱', image: img4},
    {id: 5, name: '黄瓜', image: img5},
    {id: 6, name: '南瓜', image: img6},
    {id: 7, name: '生菜', image: img7},
    {id: 8, name: '西红柿', image: img8},
    {id: 9, name: '卷心菜', image: img9},
    {id: 10, name: '茄子', image: img10},
    {id: 11, name: '西瓜', image: img11},
    {id: 12, name: '菠萝', image: img12},
    {id: 13, name: '芒果', image: img13},
    {id: 14, name: '火龙果', image: img14},
    {id: 15, name: '荔枝', image: img15},
    {id: 16, name: '猕猴桃', image: img16},
    {id: 17, name: '香蕉', image: img17},
    {id: 18, name: '椰子', image: img18},
    {id: 19, name: '樱桃', image: img19},
  ];

  // 固定的菜谱数据
  const recipes = [
    {
      id: 1,
      name: '肉末蒸冬瓜',
      description: '清淡健康的炒菜',
      image: recipe1,
    },
    {
      id: 2,
      name: '蒜蓉蚝油生菜',
      description: '清淡健康的炒菜',
      image: recipe2,
    },
    {
      id: 3,
      name: '西红柿炒丝瓜',
      description: '清淡健康的炒菜s',
      image: recipe3,
    },
    // 更多菜谱...西红柿炒丝瓜
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherText}>温度: {temperature}°C</Text>
        <Text style={styles.weatherText}>湿度: {humidity}%</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>时令蔬菜</Text>
        <FlatList
          data={seasonalVegetables}
          horizontal
          renderItem={({item}) => (
            <View style={styles.vegetableCard}>
              <Image source={item.image} style={styles.vegetableImage} />
              <Text style={styles.vegetableName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>调理身体的菜谱</Text>
        <FlatList
          data={recipes}
          renderItem={({item}) => (
            <View style={styles.recipeCard}>
              <Image source={item.image} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeDescription}>{item.description}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  weatherContainer: {
    padding: 20,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  vegetableCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  vegetableImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  vegetableName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },
  recipeImage: {
    width: width - 40,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recipeName: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeDescription: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;
