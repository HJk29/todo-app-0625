import { StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect, useContext } from "react";
import tabConfig from './configs/tabConfig.js';
import { TodosProvider } from './components/TodosProvider.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoadingContext, {
  AppLoadingProvider,
} from "./components/AppLoadingProvider";

const { width, height } = Dimensions.get("window");

const CustomHeader = ({ title }) => {
  return (
    <>
      {/* 개발할 때 SafeAreaView는 필수 */}
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  )
}

// 네비게이션 스택
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppWithNavigation = () => {
  const { fontsLoaded } = useContext(AppLoadingContext);

  // 앱 컴포넌트

  if (!fontsLoaded) {
    return null;
  }

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
      fontWeight: "bold",
      fontFamily: "CookieRun-Bold",
    },
    tabBarStyle: {
      height: "8%"
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
            options={{
              title: routeConfig.title,
              header: () => <CustomHeader title={routeConfig.title} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AppLoadingProvider>
      <TodosProvider>
        <AppWithNavigation />
      </TodosProvider>
    </AppLoadingProvider>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox: {
    height: height * 0.05,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 15,
    fontFamily: "CookieRun-Bold",

  },
});