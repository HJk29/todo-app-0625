import { View, Text } from 'react-native';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 50, fontWeight: 'bold' }}>메인 화면</Text>
    </View>
  );
};
export default HomeScreen;