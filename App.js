import * as React from 'react';
import { View, Text, Button, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


// Home 화면
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>메인 화면</Text>
    </View>
  );
};

const TodoSearchScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>할일 검색</Text>
    </View>
  );
}

const TodoListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>할일 리스트</Text>
    </View>
  );
}

const MyPageScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>내 정보</Text>
    </View>
  );
}

// 할 일 작성 화면
const TodoWriteScreen = ({ navigation }) => {
  const [todos, setTodos] = useState('');

  const onPressFunction = () => {
    alert("작성한 내용: " + todos);
    // navigation.navigate("Details", { todoText: todos });

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

  const tabConfig = [
    {
      name: "Home",
      title: "메인 홈",
      component: HomeScreen,
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
      iconComponent: MaterialCommunityIcons
    },
    {
      name: "TodoSearch",
      title: "할일 검색",
      component: TodoSearchScreen,
      focusedIcon: "search-sharp",
      unfocusedIcon: "search-outline",
      iconComponent: Ionicons
    },
    {
      name: "TodoWrite",
      title: "할일 작성",
      component: TodoWriteScreen,
      focusedIcon: "application-edit",
      unfocusedIcon: "application-edit-outline",
      iconComponent: MaterialCommunityIcons
    },
    {
      name: "TodoList",
      title: "할일 리스트",
      component: TodoListScreen,
      focusedIcon: "list-sharp",
      unfocusedIcon: "list-outline",
      iconComponent: Ionicons
    },
    {
      name: "Mypage",
      title: "내 정보",
      component: MyPageScreen,
      focusedIcon: "person-circle-sharp",
      unfocusedIcon: "person-circle-outline",
      iconComponent: Ionicons
    },
  ]

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({focused, color, size}) => {
      const routeConfig = tabConfig.find((config) => config.name === route.name)

      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size ={size} color={color}/>
    },
    tabBarLabelStyle: {
      fontSize: 12,
      paddingBottom: 10,
      fontWeight: "bold"
    },
    tabBarStyle: {
      height: 60
    },
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "#0163d2",
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        {tabConfig.map((routeConfig) => (
          <Tab.Screen 
          key={routeConfig.name}
          name={routeConfig.name}
          component={routeConfig.component}
          options={{title: routeConfig.title }}
          />
        ))}
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
