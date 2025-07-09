import { StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from "react";
import tabConfig from './configs/tabConfig.js';
import { TodosProvider } from './components/TodosProvider.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const { width, height } = Dimensions.get("window");

const fetchFonts = () => {
  return Font.loadAsync({
    "CookieRun.font": require("./assets/fonts/CookieRun Bold.ttf")
  })
}

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



// 앱 컴포넌트
export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts(); //폰트 로드
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e); //폰트 로드 중 오류 발생 시 경고
      } finally {
        setFontLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    // 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
    SplashScreen.preventAutoHideAsync();

    loadFonts();
  }, []);

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
      fontFamily: "CookieRun.font",
    },
    tabBarStyle: {
      height: "8%"
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
              options={{
                title: routeConfig.title,
                header: () => <CustomHeader title={routeConfig.title} />
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </TodosProvider>

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
  },
});