import * as React from 'react';
import { View, Text, Button, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  const { todoText } = route.params || '';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>상세보기 화면</Text>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
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
const Tab = createBottomTabNavigator();

// 앱 컴포넌트
export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {
          backgroundColor: "#f4511e"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },}}>
        <Stack.Screen name="Home" 
        component={HomeScreen} 
        options={{
          title: "메인 홈",
          headerRight: () => (
            <Pressable onPress={() => alert("클릭됨!")}>
              <Text style={{color: "#fff", fontWeight: "bold"}}>Menu</Text>
            </Pressable>
          )
      }}
         />
        <Stack.Screen name="TodoWrite" component={TodoWriteScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 10,
          fontWeight: "bold"

        },
        tabBarStyle: {
          height: 60
        },
        tabBarActiveTintColor: "#black",
        tabBarInactiveTintColor: "#0163d2",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Pressable onPress={() => alert("클릭됨!")}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Menu</Text>
          </Pressable>
        ),
      }}>
        <Tab.Screen name="Home"
          component={HomeScreen}
          options={{
            title: "메인 홈",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home-variant"
                size={30}
                color="black"
              />
            )
          }}
        />
        <Tab.Screen
          name="TodoWrite"
          component={TodoWriteScreen}
          options={{
            title: "할일 작성", tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons 
              name="square-edit-outline" 
              size={30} 
              color="black" />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
