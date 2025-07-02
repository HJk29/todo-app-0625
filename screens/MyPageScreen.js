import { View, Text } from 'react-native';

const MyPageScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>내 정보</Text>
    </View>
  );
};
export default MyPageScreen;