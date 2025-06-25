import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Home 화면 컴포넌트
const HomeScreen = () => {
  const navigation = useNavigation();
  //useNavigation: 복잡한 구조인 경우에만 필요하다.
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style ={{ fontSize: 50, fontWeight: "bold"}}>메인 화면</Text>
      <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const DetailScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style ={{ fontSize: 50, fontWeight: "bold"}}>상세보기 화면</Text>
      <Button title="홈으로 이동" onPress={() => navigation.navigate("Home")}/>
      <Button title="상세 페이지로 이동" onPress={() => navigation.push("Details")}/>
    </View>
  );
}

// 스택 네비게이터 생성
const Stack = createNativeStackNavigator();

// App 컴포넌트에 네비게이션 구조 적용
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
