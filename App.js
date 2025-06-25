import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Home 화면 컴포넌트
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style ={{ fontSize: 50, fontWeight: "bold"}}>메인 화면</Text>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style ={{ fontSize: 50, fontWeight: "bold"}}>상세보기 화면</Text>
    </View>
  );
}

// 스택 네비게이터 생성
const Stack = createNativeStackNavigator();

// App 컴포넌트에 네비게이션 구조 적용
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
