import * as React from 'react';
import { View, Text, Button, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

// Home 화면
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>메인 화면</Text>
      <Button title="상세 페이지로 이동" onPress={() => navigation.navigate("Details")} />
      <Button title="할 일 작성" onPress={() => navigation.navigate("TodoWrite")} />
    </View>
  );
};

// 상세보기 화면
const DetailScreen = ({ navigation, route }) => {
  const {todoText} = route.params || '';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>상세보기 화면</Text>
      <Text style={{ fontSize: 40, fontWeight: "bold"}}>
        작성 내용: {todoText}
      </Text>
      <Button title="홈으로 이동" onPress={() => navigation.navigate("Home")} />
      <Button title="상세 페이지로 이동" onPress={() => navigation.push("Details")} />
    </View>
  );
};

// 할 일 작성 화면
const TodoWriteScreen = ({ navigation }) => {
  const [todos, setTodos] = useState('');

  const onPressFunction = () => {
    alert("작성한 내용: " + todos);
    navigation.navigate("Details", { todoText: todos });

  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <TextInput
        multiline
        onChangeText={setTodos}
        value={todos}
        placeholder="할 일을 작성해주세요"
        style={{
          flex: 0.2,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 2,
          marginBottom: 20,
        }}
      />
      <Pressable
        onPress={onPressFunction}
        style={{
          padding: 15,
          backgroundColor: "#2196F3",
          borderRadius: 10,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>작성 완료</Text>
      </Pressable>
    </View>
  );
};

// 네비게이션 스택
const Stack = createNativeStackNavigator();

// 앱 컴포넌트
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoWrite" component={TodoWriteScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
