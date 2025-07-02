
import { View, Text } from 'react-native';
const TodoListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>할일 리스트</Text>
    </View>
  );
};
export default TodoListScreen;