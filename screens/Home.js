import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'; // 정확한 파일 경로를 사용하세요.
import Correct from './screens/Correct';
import TextLearn from './screens/TextLearn';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window"); // 화면의 너비와 높이를 얻음
const Stack = createStackNavigator();

const IconPanel = ({ navigation }) => {
  return (
    <View style={styles.rightPanel}>
      <View style={styles.iconButton}>
        <Image
          source={require("./image/icon1.png")}
          style={styles.iconImage}
        />
      </View>
      <View style={styles.iconButton}>
        <Image
          source={require("./image/icon2.png")}
          style={styles.iconImage}
        />
      </View>
      <View style={styles.iconButton}>
        <Image
          source={require("./image/icon3.png")}
          style={styles.iconImage}
        />
      </View>
      <View style={styles.iconButton}>
        <Image
          source={require("./image/icon4.png")}
          style={styles.iconImage}
        />
      </View>
      <View style={styles.iconButton}>
        <Image
          source={require("./image/icon5.png")}
          style={styles.iconImage}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('App')}>
        <View style={styles.iconButton}>
          <Image
            source={require("./image/icon6.png")}
            style={styles.iconImage}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.undoRedoContainer}>
        <View style={styles.undoRedoButton}>
          <Image
            source={require("./image/undo.png")}
            style={styles.undoRedoImage}
          />
        </View>
        <View style={styles.undoRedoButton}>
          <Image
            source={require("./image/redo.png")}
            style={styles.undoRedoImage}
          />
        </View>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Correct" component={Correct} />
        <Stack.Screen name="TextLearn" component={TextLearn} />
      </Stack.Navigator>
      <IconPanel />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  rightPanel: {
    position: "absolute",
    right: 10,
    top: height * 0.1,
    width: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0c541",
    padding: 10,
    borderRadius: 10,
    height: "80%",
  },
  iconButton: {
    width: width * 0.04,
    height: width * 0.04,
    marginVertical: height * 0.005,
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  undoRedoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.14,
    marginBottom: height * 0.005,
  },
  undoRedoButton: {
    width: width * 0.04,
    height: width * 0.04,
    marginHorizontal: width * 0.005,
  },
  undoRedoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default App;
