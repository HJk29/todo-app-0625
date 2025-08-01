import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TodoListScreen from '../screens/TodoListScreen';
import TodoWriteScreen from '../screens/TodoWriteScreen';
import TodoSearchScreen from '../screens/TodoSearchScreen';
import MyPageScreen from '../screens/MyPageScreen';

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
  ];
  
  export default tabConfig;