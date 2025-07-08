import { StyleSheet, ImageBackground, View, Text } from 'react-native';

const backgroundImage = require("../assets/images/todoAppBgImg.jpg")
const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <View style={styles.container}>
        {/* <Text style={{ fontSize: 50, fontWeight: 'bold' }}>메인 화면</Text> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});
export default HomeScreen;