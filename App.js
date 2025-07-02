import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import tabConfig from './configs/tabConfig.js'; 
import { TodosProvider } from './components/TodosProvider.js';

// 네비게이션 스택
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// 앱 컴포넌트
export default function App() {

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find((config) => config.name === route.name)

      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size={size} color={color} />
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 23,
      fontWeight: "bold",
    },
    headerStyle: {
      elevation: 20,
      shadowColor: "#000",
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
    <TodosProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
          {tabConfig.map((routeConfig) => (
            <Tab.Screen
              key={routeConfig.name}
              name={routeConfig.name}
              component={routeConfig.component}
              options={{ title: routeConfig.title }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </TodosProvider>

  );
}
