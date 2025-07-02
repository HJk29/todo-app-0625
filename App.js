import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useState, useRef} from "react";

import tabConfig from './configs/tabConfig.js';
import { dateToStr } from './utils/util.js';

const useTodosState = () => {
    const [todos, setTodos] = useState([]);
    const lastTodoIdRef = useRef(0);

    const addTodo = (newContent) => {
        const id = ++lastTodoIdRef.current;
        const newTodo = {
            id,
            content: newContent,
            regDate: dateToStr(new Date),
        }

        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    }

    return {todos, addTodo};
}


// 네비게이션 스택
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// 앱 컴포넌트
export default function App() {
  const todosState = useTodosState();
  console.log(todosState);

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({focused, color, size}) => {
      const routeConfig = tabConfig.find((config) => config.name === route.name)

      const iconName = focused ? routeConfig.focusedIcon : routeConfig.unfocusedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size ={size} color={color}/>
    },
    headerTitleAlign:"center",
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
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        {tabConfig.map((routeConfig) => (
          <Tab.Screen 
          key={routeConfig.name}
          name={routeConfig.name}
          component={routeConfig.component}
          options={{title: routeConfig.title }}
          initialParams={{ todosState }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
